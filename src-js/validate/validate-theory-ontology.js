export const CORE_DEFINITION_REFS = new Set([
  "sacred-political-order",
  "sacralization",
  "collective-immortality",
  "sacred-enemy",
  "corrigibility",
  "pathology",
  "sacrifice",
  "personhood",
  "human-flourishing",
  "crisis",
  "institutional-health",
  "common-good"
]);

export const VARIABLE_LIFECYCLE_STATUSES = new Set([
  "active",
  "deprecated",
  "retired",
  "experimental"
]);

export const VARIABLE_COMPATIBILITY_POLICIES = new Set([
  "canonical-required",
  "historical-preserved"
]);

export const MEASUREMENT_ROLES = new Set([
  "scoreable",
  "derived",
  "mechanism-only",
  "descriptive",
  "experimental",
  "not-scored"
]);

const EVIDENCE_STRENGTH_ANCHOR_PATTERN = /\b(no evidence|weak evidence|moderate evidence|strong evidence|traceable evidence|evidence quality)\b/i;

function requireStringArray(record, fieldName, errors, label) {
  if (record[fieldName] === undefined) return;
  if (!Array.isArray(record[fieldName])) {
    errors.push(`${label}: ${fieldName} must be an array`);
    return;
  }
  for (const value of record[fieldName]) {
    if (typeof value !== "string" || value.length === 0) {
      errors.push(`${label}: ${fieldName} entries must be non-empty strings`);
    }
  }
}

export function buildTheoryVariableRegistry(variables) {
  return new Map(variables.map((variable) => [variable.variableId, variable]));
}

export function validateTheoryVariableRecord(variable, variableIds, errors, label) {
  if (!VARIABLE_LIFECYCLE_STATUSES.has(variable.status)) {
    errors.push(`${label}: status ${variable.status} is not a supported variable lifecycle status`);
  }
  if (typeof variable.versionIntroduced !== "string" || variable.versionIntroduced.length === 0) {
    errors.push(`${label}: versionIntroduced must be a non-empty string`);
  }

  requireStringArray(variable, "aliases", errors, label);
  requireStringArray(variable, "replaces", errors, label);
  requireStringArray(variable, "replacedBy", errors, label);

  for (const fieldName of ["aliases", "replaces", "replacedBy"]) {
    for (const relatedId of variable[fieldName] ?? []) {
      if (relatedId === variable.variableId) {
        errors.push(`${label}: ${fieldName} must not reference the variable itself`);
      } else if (!variableIds.has(relatedId)) {
        errors.push(`${label}: ${fieldName} references unknown variable ${relatedId}`);
      }
    }
  }

  if (["deprecated", "retired"].includes(variable.status)) {
    if (!Array.isArray(variable.replacedBy) || variable.replacedBy.length === 0) {
      errors.push(`${label}: ${variable.status} variables must declare replacedBy`);
    }
    if (typeof variable.deprecationNote !== "string" || variable.deprecationNote.length === 0) {
      errors.push(`${label}: ${variable.status} variables must include deprecationNote`);
    }
  }

  if (variable.compatibility !== undefined) {
    if (typeof variable.compatibility !== "object" || Array.isArray(variable.compatibility) || variable.compatibility === null) {
      errors.push(`${label}: compatibility must be an object`);
    } else if (!VARIABLE_COMPATIBILITY_POLICIES.has(variable.compatibility.newRecordsPolicy)) {
      errors.push(`${label}: compatibility.newRecordsPolicy must be one of ${Array.from(VARIABLE_COMPATIBILITY_POLICIES).join(", ")}`);
    }
  }

  if (variable.measurementRole !== undefined && !MEASUREMENT_ROLES.has(variable.measurementRole)) {
    errors.push(`${label}: measurementRole must be one of ${Array.from(MEASUREMENT_ROLES).join(", ")}`);
  }
}

export function buildDefinitionRefs(theoryVariables, mechanismIds) {
  const refs = new Set(CORE_DEFINITION_REFS);
  for (const variableRegistry of theoryVariables.values()) {
    for (const variableId of variableRegistry.keys()) refs.add(variableId);
  }
  for (const mechanismId of mechanismIds) refs.add(mechanismId);
  return refs;
}

export function validateTheoryVariableReference(record, fieldName, theoryVariables, errors, warnings, label) {
  const theoryId = record.theoryId;
  const variableId = record[fieldName];

  if (!theoryVariables.has(theoryId)) {
    errors.push(`${label}: unknown theoryId ${theoryId}`);
    return;
  }

  const variable = theoryVariables.get(theoryId).get(variableId);
  if (!variable) {
    errors.push(`${label}: ${fieldName} ${variableId} is not defined by theory ${theoryId}`);
    return;
  }

  if (variable.status === "deprecated") {
    const replacement = variable.replacedBy?.length ? `; use ${variable.replacedBy.join(", ")} for new analytical records` : "";
    warnings.push(`${label}: ${fieldName} ${variableId} is deprecated${replacement}`);
  }
  if (variable.status === "retired") {
    errors.push(`${label}: ${fieldName} ${variableId} is retired and cannot be used in analytical records`);
  }
}

export function validateScoreableVariableReference(record, fieldName, theoryVariables, errors, label) {
  const theoryId = record.theoryId;
  const variableId = record[fieldName];
  const variable = theoryVariables.get(theoryId)?.get(variableId);
  if (!variable) return;
  if (variable.measurementRole !== "scoreable") {
    errors.push(`${label}: ${fieldName} ${variableId} has measurementRole ${variable.measurementRole ?? "unspecified"} and cannot receive a formal score`);
  }
}

export function validateMagnitudeAnchors(anchors, errors, label) {
  for (const key of ["0", "1", "2", "3", "4", "5"]) {
    if (typeof anchors?.[key] !== "string" || anchors[key].length === 0) {
      errors.push(`${label}: anchor ${key} must be defined`);
    } else if (EVIDENCE_STRENGTH_ANCHOR_PATTERN.test(anchors[key])) {
      errors.push(`${label}: anchor ${key} uses evidence-strength language instead of construct-magnitude language`);
    }
  }
}

export function validateDefinitionRefs(refs, allowedDefinitionRefs, errors, label) {
  for (const ref of refs ?? []) {
    if (!allowedDefinitionRefs.has(ref)) {
      errors.push(`${label}: definitionRef ${ref} is not a known theory variable, mechanism, or core definition`);
    }
  }
}
