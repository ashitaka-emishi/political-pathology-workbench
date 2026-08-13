function addUnique(registry, objectType, id, path, errors, namespace = "global") {
  if (!id) return;
  const key = `${namespace}:${id}`;
  const previous = registry.get(key);
  if (previous) {
    errors.push(`${path}: duplicate ${objectType} id ${id}; first seen at ${previous.path}`);
  } else {
    registry.set(key, { objectType, id, path, namespace });
  }
}

function expectCase(label, objectCaseId, caseId, errors) {
  if (objectCaseId !== caseId) errors.push(`${label}: caseId ${objectCaseId} does not match containing case ${caseId}`);
}

export function validateRepositoryGraph(cases, errors) {
  const registry = new Map();
  for (const caseData of cases) {
    const { caseRecord, caseSlug, sourcePack, passages, claims, interpretations, scores, counterclaims, searchLogs, rivalExplanations } = caseData;
    const caseId = caseRecord.caseId;
    addUnique(registry, "case", caseId, `${caseSlug}/case.json`, errors);
    if (caseSlug !== caseId) errors.push(`${caseSlug}/case.json: directory slug does not match caseId ${caseId}`);
    if (sourcePack.caseId !== caseId) errors.push(`${caseSlug}/source-pack.json: caseId ${sourcePack.caseId} does not match ${caseId}`);

    const sourcesById = new Map((sourcePack.sources ?? []).map((source) => [source.sourceId, source]));
    const passagesById = new Map(passages.map((passage) => [passage.passageId, passage]));
    const claimsById = new Map(claims.map((claim) => [claim.claimId, claim]));
    const interpretationsById = new Map(interpretations.map((interpretation) => [interpretation.interpretationId, interpretation]));

    for (const source of sourcePack.sources ?? []) {
      addUnique(registry, "source", source.sourceId, `${caseSlug}/source-pack.json:${source.sourceId}`, errors, caseId);
    }
    for (const passage of passages) {
      addUnique(registry, "passage", passage.passageId, `${caseSlug}/passages.json:${passage.passageId}`, errors);
      expectCase(`${passage.passageId}`, passage.caseId, caseId, errors);
      if (!sourcesById.has(passage.sourceId)) errors.push(`${passage.passageId}: sourceId ${passage.sourceId} is not in source-pack.json`);
    }
    for (const claim of claims) {
      addUnique(registry, "claim", claim.claimId, `${caseSlug}/claims.json:${claim.claimId}`, errors);
      expectCase(`${claim.claimId}`, claim.caseId, caseId, errors);
      for (const passageId of claim.derivedFrom ?? []) {
        const passage = passagesById.get(passageId);
        if (!passage) continue;
        expectCase(`${claim.claimId} -> ${passageId}`, passage.caseId, caseId, errors);
      }
    }
    for (const interpretation of interpretations) {
      addUnique(registry, "interpretation", interpretation.interpretationId, `${caseSlug}/interpretations.json:${interpretation.interpretationId}`, errors);
      expectCase(`${interpretation.interpretationId}`, interpretation.caseId, caseId, errors);
      for (const claimId of interpretation.claimIds ?? []) {
        const claim = claimsById.get(claimId);
        if (!claim) continue;
        expectCase(`${interpretation.interpretationId} -> ${claimId}`, claim.caseId, caseId, errors);
      }
    }
    for (const score of scores) {
      addUnique(registry, "score", score.scoreId, `${caseSlug}/scores.json:${score.scoreId}`, errors);
      expectCase(`${score.scoreId}`, score.caseId, caseId, errors);
      const interpretation = interpretationsById.get(score.interpretationId);
      if (!interpretation) continue;
      if (score.caseId !== interpretation.caseId) errors.push(`${score.scoreId}: caseId ${score.caseId} does not match interpretation ${score.interpretationId} caseId ${interpretation.caseId}`);
      if (score.theoryId !== interpretation.theoryId) errors.push(`${score.scoreId}: theoryId ${score.theoryId} does not match interpretation ${score.interpretationId} theoryId ${interpretation.theoryId}`);
      if (score.variableId !== interpretation.variableId) errors.push(`${score.scoreId}: variableId ${score.variableId} does not match interpretation ${score.interpretationId} variableId ${interpretation.variableId}`);
      if (score.codebookVersion && interpretation.codebookVersion && score.codebookVersion !== interpretation.codebookVersion) {
        errors.push(`${score.scoreId}: codebookVersion ${score.codebookVersion} does not match interpretation ${score.interpretationId} codebookVersion ${interpretation.codebookVersion}`);
      }
    }
    for (const counterclaim of counterclaims) {
      addUnique(registry, "counterclaim", counterclaim.counterclaimId, `${caseSlug}/counterclaims.json:${counterclaim.counterclaimId}`, errors);
      expectCase(`${counterclaim.counterclaimId}`, counterclaim.caseId, caseId, errors);
    }
    for (const searchLog of searchLogs) {
      addUnique(registry, "search", searchLog.searchId, `${caseSlug}/search-log.json:${searchLog.searchId}`, errors);
    }
    for (const rival of rivalExplanations) {
      addUnique(registry, "rivalExplanation", rival.rivalExplanationId, `${caseSlug}/rival-explanations.json:${rival.rivalExplanationId}`, errors);
      expectCase(`${rival.rivalExplanationId}`, rival.caseId, caseId, errors);
    }
  }
}
