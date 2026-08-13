const VALUE_SEMANTICS = new Set(["construct-magnitude", "unknown"]);

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function validateConfidence(confidence, errors, label) {
  if (!confidence || typeof confidence !== "object" || Array.isArray(confidence)) {
    errors.push(`${label}: confidence must be an object`);
    return;
  }
  if (!isNumber(confidence.value) || confidence.value < 0 || confidence.value > 1) {
    errors.push(`${label}: confidence.value must be a number from 0 to 1`);
  }
  if (!confidence.label) errors.push(`${label}: confidence.label is required`);
  if (!confidence.rationale) errors.push(`${label}: confidence.rationale is required`);
}

export function validateCoderScoreSemantics(record, errors, label) {
  if (!VALUE_SEMANTICS.has(record.valueSemantics)) errors.push(`${label}: valueSemantics must be construct-magnitude or unknown`);
  if (record.value === null) {
    if (record.valueSemantics !== "unknown") errors.push(`${label}: null value must use valueSemantics unknown`);
    if (!record.unknownReason) errors.push(`${label}: null value requires unknownReason`);
  } else if (!isNumber(record.value) || record.value < 0 || record.value > 5) {
    errors.push(`${label}: value must be a number from 0 to 5 or null`);
  } else if (record.valueSemantics !== "construct-magnitude") {
    errors.push(`${label}: numeric value must use valueSemantics construct-magnitude`);
  }
  if (!record.coderRationale) errors.push(`${label}: coderRationale is required`);
  if (!record.packetRef?.packetId || !record.packetRef?.packetHash) errors.push(`${label}: packetRef requires packetId and packetHash`);
  validateConfidence(record.confidence, errors, label);
}

export function validateAdjudicationSemantics(record, errors, label) {
  if (!VALUE_SEMANTICS.has(record.valueSemantics)) errors.push(`${label}: valueSemantics must be construct-magnitude or unknown`);
  if (record.adjudicatedValue === null) {
    if (record.valueSemantics !== "unknown") errors.push(`${label}: null adjudicatedValue must use valueSemantics unknown`);
    if (!record.unknownReason) errors.push(`${label}: null adjudicatedValue requires unknownReason`);
    if (record.decisionState === "adjudicated") errors.push(`${label}: adjudicated decisionState requires a numeric adjudicatedValue`);
  } else if (!isNumber(record.adjudicatedValue) || record.adjudicatedValue < 0 || record.adjudicatedValue > 5) {
    errors.push(`${label}: adjudicatedValue must be a number from 0 to 5 or null`);
  } else if (record.valueSemantics !== "construct-magnitude") {
    errors.push(`${label}: numeric adjudicatedValue must use valueSemantics construct-magnitude`);
  }
  if (record.confidence) validateConfidence(record.confidence, errors, label);
}
