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

export function buildDefinitionRefs(theoryVariableIds, mechanismIds) {
  const refs = new Set(CORE_DEFINITION_REFS);
  for (const variableIds of theoryVariableIds.values()) {
    for (const variableId of variableIds) refs.add(variableId);
  }
  for (const mechanismId of mechanismIds) refs.add(mechanismId);
  return refs;
}

export function validateTheoryVariableReference(record, fieldName, theoryVariableIds, errors, label) {
  const theoryId = record.theoryId;
  const variableId = record[fieldName];

  if (!theoryVariableIds.has(theoryId)) {
    errors.push(`${label}: unknown theoryId ${theoryId}`);
    return;
  }

  if (!theoryVariableIds.get(theoryId).has(variableId)) {
    errors.push(`${label}: ${fieldName} ${variableId} is not defined by theory ${theoryId}`);
  }
}

export function validateDefinitionRefs(refs, allowedDefinitionRefs, errors, label) {
  for (const ref of refs ?? []) {
    if (!allowedDefinitionRefs.has(ref)) {
      errors.push(`${label}: definitionRef ${ref} is not a known theory variable, mechanism, or core definition`);
    }
  }
}
