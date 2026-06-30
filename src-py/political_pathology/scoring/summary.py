from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
SCORES_PATH = ROOT / "data" / "generated" / "all-scores.json"
INTERPRETATIONS_PATH = ROOT / "data" / "generated" / "all-interpretations.json"
PROMOTION_REGISTRY_PATH = ROOT / "data" / "claim-promotion" / "promotion-registry.json"
OUTPUT_PATH = ROOT / "site" / "outputs" / "scoring-summary.json"

# Promotion statuses whose claims are allowed to contribute to scores.
# draft-claim and blocked are explicitly excluded.
SCORABLE_PROMOTION_STATUSES = {"promoted-finding", "reviewed-claim"}


def load_scores() -> list[dict]:
    if not SCORES_PATH.exists():
        return []
    return json.loads(SCORES_PATH.read_text(encoding="utf-8"))


def load_interpretations() -> dict[str, list[str]]:
    """Return a map of interpretationId → [claimId, ...]."""
    if not INTERPRETATIONS_PATH.exists():
        return {}
    records = json.loads(INTERPRETATIONS_PATH.read_text(encoding="utf-8"))
    return {r["interpretationId"]: r.get("claimIds", []) for r in records}


def load_promotion_registry() -> dict[str, str]:
    """Return a map of claimId → promotionStatus for evidence-module claims."""
    if not PROMOTION_REGISTRY_PATH.exists():
        return {}
    records = json.loads(PROMOTION_REGISTRY_PATH.read_text(encoding="utf-8"))
    return {r["claimId"]: r["promotionStatus"] for r in records if "claimId" in r}


def classify_score(
    score: dict,
    interp_claims: dict[str, list[str]],
    promotion_status: dict[str, str],
) -> str:
    """
    Return 'include', 'exclude-draft-claim', or 'exclude-blocked' for a score.

    A score is excluded only when ALL of its underlying claims are tracked in
    the promotion registry at a non-scorable status (draft-claim or blocked).
    Scores with no promotion-registry claims are always included.
    """
    claim_ids = interp_claims.get(score.get("interpretationId", ""), [])
    # NOTE: registry_statuses will be empty until interpretations directly reference
    # evidence-module claim IDs (e.g. lma-draft-claim-001). Today, interpretations use
    # native PPW case claim IDs which are disjoint from the promotion registry's namespace,
    # so classify_score always returns "include" and excludedByPromotionFilter stays 0.
    registry_statuses = [promotion_status[cid] for cid in claim_ids if cid in promotion_status]

    if not registry_statuses:
        return "include"

    non_scorable = [s for s in registry_statuses if s not in SCORABLE_PROMOTION_STATUSES]
    if len(non_scorable) == len(registry_statuses):
        # "blocked" is an active editorial veto; prefer it over "draft-claim" (unreviewed)
        worst = "blocked" if "blocked" in non_scorable else "draft-claim"
        return f"exclude-{worst}"

    return "include"


def summarize_scores(
    scores: list[dict],
    interp_claims: dict[str, list[str]],
    promotion_status: dict[str, str],
) -> dict:
    by_case: dict[str, list[float]] = defaultdict(list)
    by_variable: dict[str, list[float]] = defaultdict(list)
    excluded: list[dict] = []

    for score in scores:
        verdict = classify_score(score, interp_claims, promotion_status)
        if verdict != "include":
            excluded.append({
                "scoreId": score.get("scoreId"),
                "caseId": score.get("caseId"),
                "reason": verdict,
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
        "excludedByPromotionFilter": len(excluded),
        "excludedScores": excluded,
        "caseAverages": {case_id: average(values) for case_id, values in sorted(by_case.items())},
        "variableAverages": {variable_id: average(values) for variable_id, values in sorted(by_variable.items())},
    }


def main() -> None:
    scores = load_scores()
    interp_claims = load_interpretations()
    promotion_status = load_promotion_registry()
    summary = summarize_scores(scores, interp_claims, promotion_status)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    excluded = summary["excludedByPromotionFilter"]
    print(
        f"Wrote {OUTPUT_PATH.relative_to(ROOT)} with {summary['scoreCount']} score(s)"
        + (f" ({excluded} excluded by promotion filter)." if excluded else ".")
    )


if __name__ == "__main__":
    main()
