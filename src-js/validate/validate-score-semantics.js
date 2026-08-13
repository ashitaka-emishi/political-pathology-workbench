const VALUE_SEMANTICS = new Set(["construct-magnitude", "unknown"]);
const SCORE_ORIGINS = new Set([
  "scaffold",
  "legacy",
  "outcome-derived",
  "independent-coding",
  "adjudicated",
  "final"
]);
const EXCLUDED_SCORE_ORIGINS = new Set(["scaffold", "legacy", "outcome-derived"]);
const ELIGIBLE_SCORE_ORIGINS = new Set(["independent-coding", "adjudicated", "final"]);
const ELIGIBLE_REVIEW_STATUSES = new Set(["human-reviewed", "approved"]);

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function validateUnitInterval(label, value, errors) {
  if (!isNumber(value) || value < 0 || value > 1) {
    errors.push(`${label}: must be a number from 0 to 1`);
  }
}

export function validateScoreSemantics(score, errors, warnings, label) {
  if (score.value === undefined) {
    errors.push(`${label}: missing required field(s): value`);
    return;
  }

  if (!score.valueSemantics) {
    errors.push(`${label}: missing required field(s): valueSemantics`);
  } else if (!VALUE_SEMANTICS.has(score.valueSemantics)) {
    errors.push(`${label}: unsupported valueSemantics ${score.valueSemantics}`);
  }

  if (score.value === null) {
    if (!score.unknownReason) {
      errors.push(`${label}: null value requires unknownReason`);
    }
    if (score.valueSemantics && score.valueSemantics !== "unknown") {
      errors.push(`${label}: null value must use valueSemantics \"unknown\" when valueSemantics is present`);
    }
  } else if (!isNumber(score.value) || score.value < 0 || score.value > 5) {
    errors.push(`${label}: value must be a number from 0 to 5 or null when unknown`);
  } else if (score.valueSemantics && score.valueSemantics !== "construct-magnitude") {
    errors.push(`${label}: numeric value must use valueSemantics \"construct-magnitude\" when valueSemantics is present`);
  }

  if (!score.confidence || typeof score.confidence !== "object" || Array.isArray(score.confidence)) {
    errors.push(`${label}: confidence must be an object`);
  } else {
    validateUnitInterval(`${label}.confidence.value`, score.confidence.value, errors);
    if (!score.confidence.label) {
      errors.push(`${label}: confidence.label is required`);
    }
    if (!score.confidence.rationale) {
      errors.push(`${label}: confidence.rationale is required`);
    }
  }

  if (score.evidenceQuality !== undefined) {
    if (!score.evidenceQuality || typeof score.evidenceQuality !== "object" || Array.isArray(score.evidenceQuality)) {
      errors.push(`${label}: evidenceQuality must be an object when present`);
    } else {
      validateUnitInterval(`${label}.evidenceQuality.value`, score.evidenceQuality.value, errors);
      for (const [dimension, value] of Object.entries(score.evidenceQuality.dimensions ?? {})) {
        validateUnitInterval(`${label}.evidenceQuality.dimensions.${dimension}`, value, errors);
      }
    }
  }

  if (score.value === 0 && score.confidence?.rationale?.toLowerCase().includes("no evidence")) {
    warnings.push(`${label}: value 0 should mean substantive absence/minimum; use value null for insufficient evidence`);
  }
}

export function isSubstantiveAnalysisScore(score) {
  return deriveAnalyticalEligibility(score).eligible;
}

export function deriveAnalyticalEligibility(score, context = {}) {
  const reasons = [];
  if (!ELIGIBLE_SCORE_ORIGINS.has(score.scoreOrigin)) reasons.push(`exclude-origin-${score.scoreOrigin ?? "missing"}`);
  if (score.outcomeVisibleToCoder !== false) reasons.push("exclude-outcome-visible");
  if (!ELIGIBLE_REVIEW_STATUSES.has(score.reviewStatus)) reasons.push(`exclude-review-${score.reviewStatus ?? "missing"}`);
  if (score.value === null) reasons.push("exclude-unknown-value");
  if (context.holdoutStatus === "sealed") reasons.push("exclude-sealed-holdout");
  if (score.publicationStatus === "withdrawn") reasons.push("exclude-withdrawn");
  return {
    eligible: reasons.length === 0,
    reasons,
    policyVersion: "analytical-eligibility-v1"
  };
}

export function validateScoreIndependence(score, errors, warnings, label, isPublicFacingScore = false, context = {}) {
  if (!SCORE_ORIGINS.has(score.scoreOrigin)) {
    errors.push(`${label}: scoreOrigin must be one of ${Array.from(SCORE_ORIGINS).join(", ")}`);
  }
  if (typeof score.outcomeVisibleToCoder !== "boolean") {
    errors.push(`${label}: outcomeVisibleToCoder must be boolean`);
  }
  if (typeof score.includeInSubstantiveAnalysis !== "boolean") {
    errors.push(`${label}: includeInSubstantiveAnalysis must be boolean`);
  }

  const eligibility = deriveAnalyticalEligibility(score, context);
  if (score.includeInSubstantiveAnalysis !== eligibility.eligible) {
    errors.push(`${label}: includeInSubstantiveAnalysis must equal derived eligibility ${eligibility.eligible}; reasons: ${eligibility.reasons.join(", ") || "eligible"}`);
  }

  if (isPublicFacingScore && !eligibility.eligible) {
    errors.push(`${label}: publication-facing scores must be independent of outcome-visible or scaffold-derived scoring`);
  }

  if (score.scoreOrigin === "outcome-derived") {
    warnings.push(`${label}: outcome-derived score requires independent replacement before publication-facing use`);
  }
}
