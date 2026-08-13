from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
SCORES_PATH = ROOT / "data" / "generated" / "all-scores.json"
INTERPRETATIONS_PATH = ROOT / "data" / "generated" / "all-interpretations.json"
PROMOTION_REGISTRY_PATH = ROOT / "data" / "claim-promotion" / "promotion-registry.json"
ANALYTICAL_ELIGIBILITY_POLICY_PATH = ROOT / "policies" / "analytical-eligibility-policy.json"
OUTPUT_PATH = ROOT / "site" / "outputs" / "scoring-summary.json"

DEFAULT_ANALYTICAL_ELIGIBILITY_POLICY = {
    "policyId": "analytical-eligibility-v1",
    "scoreBaseEligibility": {
        "allowedScoreOrigins": ["independent-coding", "adjudicated", "final"],
        "requiredOutcomeVisibleToCoder": False,
        "requiredReviewStatuses": ["human-reviewed", "approved"],
        "allowNullValues": False,
        "excludedHoldoutStatuses": ["sealed"],
        "excludedPublicationStatuses": ["withdrawn"],
    },
    "evidenceEligibility": {
        "allowedNativeClaimReviewStatuses": ["human-reviewed", "approved"],
        "excludedNativeClaimPublicationStatuses": ["withdrawn"],
        "requiredModulePromotionStatus": "promoted-finding",
        "allowedModuleReviewStatuses": ["human-reviewed", "approved"],
    },
}


def load_analytical_eligibility_policy() -> dict:
    if not ANALYTICAL_ELIGIBILITY_POLICY_PATH.exists():
        return DEFAULT_ANALYTICAL_ELIGIBILITY_POLICY
    return json.loads(ANALYTICAL_ELIGIBILITY_POLICY_PATH.read_text(encoding="utf-8"))


ANALYTICAL_ELIGIBILITY_POLICY = load_analytical_eligibility_policy()
SCORE_BASE_ELIGIBILITY = ANALYTICAL_ELIGIBILITY_POLICY["scoreBaseEligibility"]
EVIDENCE_ELIGIBILITY = ANALYTICAL_ELIGIBILITY_POLICY["evidenceEligibility"]
ELIGIBLE_SCORE_ORIGINS = set(SCORE_BASE_ELIGIBILITY["allowedScoreOrigins"])
ELIGIBLE_REVIEW_STATUSES = set(SCORE_BASE_ELIGIBILITY["requiredReviewStatuses"])
ELIGIBLE_NATIVE_CLAIM_REVIEW_STATUSES = set(EVIDENCE_ELIGIBILITY["allowedNativeClaimReviewStatuses"])
EXCLUDED_NATIVE_CLAIM_PUBLICATION_STATUSES = set(EVIDENCE_ELIGIBILITY["excludedNativeClaimPublicationStatuses"])
ELIGIBLE_MODULE_CLAIM_REVIEW_STATUSES = set(EVIDENCE_ELIGIBILITY["allowedModuleReviewStatuses"])


def load_scores() -> list[dict]:
    if not SCORES_PATH.exists():
        return []
    return json.loads(SCORES_PATH.read_text(encoding="utf-8"))


def load_interpretations() -> list[dict]:
    if not INTERPRETATIONS_PATH.exists():
        return []
    return json.loads(INTERPRETATIONS_PATH.read_text(encoding="utf-8"))


def load_claims() -> list[dict]:
    claims_path = ROOT / "data" / "generated" / "all-claims.json"
    if not claims_path.exists():
        return []
    return json.loads(claims_path.read_text(encoding="utf-8"))


def load_cases() -> dict[str, dict]:
    cases_path = ROOT / "data" / "generated" / "all-cases.json"
    if not cases_path.exists():
        return {}
    return {record["caseId"]: record for record in json.loads(cases_path.read_text(encoding="utf-8"))}


def load_promotion_registry() -> list[dict]:
    if not PROMOTION_REGISTRY_PATH.exists():
        return []
    return json.loads(PROMOTION_REGISTRY_PATH.read_text(encoding="utf-8"))


def parse_module_claim_ref(claim_id: str) -> tuple[str, str] | None:
    parts = claim_id.split(":")
    if len(parts) == 4 and parts[0] == "module" and parts[2] == "claim":
        return parts[1], parts[3]
    return None


def derive_analytical_eligibility(score: dict, case_record: dict | None = None) -> list[str]:
    reasons: list[str] = []
    if score.get("scoreOrigin") not in ELIGIBLE_SCORE_ORIGINS:
        reasons.append(f"exclude-origin-{score.get('scoreOrigin', 'missing')}")
    if score.get("outcomeVisibleToCoder") is not SCORE_BASE_ELIGIBILITY["requiredOutcomeVisibleToCoder"]:
        reasons.append("exclude-outcome-visible")
    if score.get("reviewStatus") not in ELIGIBLE_REVIEW_STATUSES:
        reasons.append(f"exclude-review-{score.get('reviewStatus', 'missing')}")
    if not SCORE_BASE_ELIGIBILITY["allowNullValues"] and score.get("value") is None:
        reasons.append("exclude-unknown-value")
    if case_record and case_record.get("holdoutStatus") in SCORE_BASE_ELIGIBILITY["excludedHoldoutStatuses"]:
        reasons.append("exclude-sealed-holdout")
    if score.get("publicationStatus") in SCORE_BASE_ELIGIBILITY["excludedPublicationStatuses"]:
        reasons.append("exclude-withdrawn")
    return reasons


def classify_analytical_eligibility(
    score: dict,
    interpretations: list[dict],
    claims: list[dict],
    promotion_registry: list[dict],
    case_record: dict | None = None,
) -> str:
    base_reasons = derive_analytical_eligibility(score, case_record)
    if base_reasons:
        return base_reasons[0]

    interpretation = next((record for record in interpretations if record.get("interpretationId") == score.get("interpretationId")), None)
    if not interpretation:
        return "exclude-unresolved-interpretation"

    claims_by_id = {claim.get("claimId"): claim for claim in claims}
    promotions_by_key = {
        (promotion.get("originModuleId"), promotion.get("claimId")): promotion
        for promotion in promotion_registry
    }

    for claim_id in interpretation.get("claimIds", []):
        native_claim = claims_by_id.get(claim_id)
        if native_claim:
            review_status = native_claim.get("reviewStatus", "missing")
            if review_status not in ELIGIBLE_NATIVE_CLAIM_REVIEW_STATUSES:
                return f"exclude-native-claim-{review_status}"
            if native_claim.get("publicationStatus") in EXCLUDED_NATIVE_CLAIM_PUBLICATION_STATUSES:
                return "exclude-native-claim-withdrawn"
            continue

        module_ref = parse_module_claim_ref(claim_id)
        if not module_ref:
            return "exclude-unresolved-claim"

        promotion = promotions_by_key.get(module_ref)
        if not promotion:
            return "exclude-unresolved-module-claim"
        if (
            promotion.get("promotionStatus") != EVIDENCE_ELIGIBILITY["requiredModulePromotionStatus"]
            or promotion.get("reviewStatus") not in ELIGIBLE_MODULE_CLAIM_REVIEW_STATUSES
        ):
            return f"exclude-module-claim-{promotion.get('promotionStatus', 'missing')}"

    return "include"


def classify_score(
    score: dict,
    interpretations: list[dict],
    claims: list[dict],
    promotion_registry: list[dict],
    cases_by_id: dict[str, dict],
) -> str:
    """
    Return 'include' or an explicit exclusion reason for a score.

    Scores must pass derived eligibility, then all claim dependencies must fail
    closed unless native claims are reviewed or module claims are promoted.
    """
    verdict = classify_analytical_eligibility(
        score,
        interpretations,
        claims,
        promotion_registry,
        cases_by_id.get(score.get("caseId", "")),
    )
    if verdict == "include" and score.get("includeInSubstantiveAnalysis") is not True:
        return "exclude-stored-not-substantive-analysis"
    return verdict


def summarize_scores(
    scores: list[dict],
    interpretations: list[dict],
    claims: list[dict],
    promotion_registry: list[dict],
    cases_by_id: dict[str, dict],
) -> dict:
    by_case: dict[str, list[float]] = defaultdict(list)
    by_variable: dict[str, list[float]] = defaultdict(list)
    excluded: list[dict] = []
    exclusion_counts: dict[str, int] = defaultdict(int)

    for score in scores:
        verdict = classify_score(score, interpretations, claims, promotion_registry, cases_by_id)
        if verdict != "include":
            exclusion_counts[verdict] += 1
            excluded.append({
                "scoreId": score.get("scoreId"),
                "caseId": score.get("caseId"),
                "reason": verdict,
            })
            continue
        if score.get("value") is None:
            excluded.append({
                "scoreId": score.get("scoreId"),
                "caseId": score.get("caseId"),
                "reason": "exclude-unknown-value",
            })
            continue
        value = float(score["value"])
        by_case[score["caseId"]].append(value)
        by_variable[score["variableId"]].append(value)

    def average(values: list[float]) -> float:
        return round(sum(values) / len(values), 2) if values else 0.0

    included_count = len(scores) - len(excluded)
    return {
        "scoreCount": included_count,
        "excludedScoreCount": len(excluded),
        "exclusionCounts": dict(sorted(exclusion_counts.items())),
        "excludedScores": excluded,
        "caseAverages": {case_id: average(values) for case_id, values in sorted(by_case.items())},
        "variableAverages": {variable_id: average(values) for variable_id, values in sorted(by_variable.items())},
    }


def main() -> None:
    scores = load_scores()
    interpretations = load_interpretations()
    claims = load_claims()
    promotion_registry = load_promotion_registry()
    cases_by_id = load_cases()
    summary = summarize_scores(scores, interpretations, claims, promotion_registry, cases_by_id)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    excluded = summary["excludedScoreCount"]
    print(
        f"Wrote {OUTPUT_PATH.relative_to(ROOT)} with {summary['scoreCount']} score(s)"
        + (f" ({excluded} excluded by eligibility policy)." if excluded else ".")
    )


if __name__ == "__main__":
    main()
