const VALUE_SEMANTICS = new Set(["construct-magnitude", "unknown"]);

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
