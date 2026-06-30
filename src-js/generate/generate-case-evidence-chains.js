import fs from "node:fs";
import path from "node:path";
import { readJson } from "../validate/json.js";

function readArray(file) {
  if (!fs.existsSync(file)) return [];
  const value = readJson(file);
  return Array.isArray(value) ? value : [];
}

function readObject(file) {
  if (!fs.existsSync(file)) return null;
  return readJson(file);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function buildNativeChain(caseDir) {
  const sourcePack = readObject(path.join(caseDir, "source-pack.json"));
  const passages = readArray(path.join(caseDir, "passages.json"));
  const claims = readArray(path.join(caseDir, "claims.json"));
  const interpretations = readArray(path.join(caseDir, "interpretations.json"));
  const scores = readArray(path.join(caseDir, "scores.json"));

  const sourceIds = new Set((sourcePack?.sources ?? []).map((s) => s.sourceId));
  const passageIds = new Set(passages.map((p) => p.passageId));
  const claimIds = new Set(claims.map((c) => c.claimId));
  const scoresByInterpId = new Map();
  for (const score of scores) {
    (scoresByInterpId.get(score.interpretationId) ?? scoresByInterpId.set(score.interpretationId, []).get(score.interpretationId)).push({
      scoreId: score.scoreId,
      value: score.value,
      reviewStatus: score.reviewStatus,
      variableId: score.variableId,
    });
  }

  const referencedPassageIds = new Set();
  const referencedClaimIds = new Set();
  const scoredInterpIds = new Set(scores.map((s) => s.interpretationId));

  const claimsById = new Map(claims.map((c) => [c.claimId, c]));
  const passagesById = new Map(passages.map((p) => [p.passageId, p]));

  const chainedInterpretations = interpretations.map((interp) => {
    const interpClaims = (interp.claimIds ?? []).map((claimId) => {
      referencedClaimIds.add(claimId);
      const claim = claimsById.get(claimId);
      if (!claim) {
        return { claimId, claimStatus: "native", linkStatus: "broken" };
      }
      const chainedPassages = (claim.derivedFrom ?? []).map((passageId) => {
        referencedPassageIds.add(passageId);
        const passage = passagesById.get(passageId);
        if (!passage) {
          return { passageId, linkStatus: "broken" };
        }
        return {
          passageId,
          linkStatus: "resolved",
          sourceId: passage.sourceId,
          sourceLinkStatus: sourceIds.has(passage.sourceId) ? "resolved" : "broken",
        };
      });
      return {
        claimId,
        claimStatus: "native",
        linkStatus: "resolved",
        reviewStatus: claim.reviewStatus,
        passages: chainedPassages,
        missingPassages: chainedPassages.length === 0 ? "no-derivedFrom" : null,
      };
    });

    return {
      interpretationId: interp.interpretationId,
      theoryId: interp.theoryId,
      variableId: interp.variableId,
      reviewStatus: interp.reviewStatus,
      claims: interpClaims,
      missingClaims: interpClaims.length === 0 ? "no-claimIds" : null,
      scores: scoresByInterpId.get(interp.interpretationId) ?? [],
      missingScores: scoredInterpIds.has(interp.interpretationId) ? null : "no-score",
    };
  });

  const orphanedPassages = passages
    .filter((p) => !referencedPassageIds.has(p.passageId))
    .map((p) => ({ passageId: p.passageId, sourceId: p.sourceId }));

  const orphanedClaims = claims
    .filter((c) => !referencedClaimIds.has(c.claimId))
    .map((c) => ({ claimId: c.claimId, reviewStatus: c.reviewStatus }));

  const orphanedInterpretations = interpretations
    .filter((i) => !scoredInterpIds.has(i.interpretationId))
    .map((i) => ({ interpretationId: i.interpretationId, variableId: i.variableId }));

  return {
    interpretations: chainedInterpretations,
    orphanedPassages,
    orphanedClaims,
    orphanedInterpretations,
  };
}

export function generateCaseEvidenceChains(root) {
  const casesDir = path.join(root, "data", "cases");
  const generatedCasesDir = path.join(root, "data", "generated", "cases");
  const draftClaimsData = readObject(path.join(root, "data", "claim-promotion", "draft-claims.json"));
  const draftClaims = Array.isArray(draftClaimsData?.draftClaims) ? draftClaimsData.draftClaims : [];
  const promotedClaims = readArray(path.join(root, "data", "claim-promotion", "promotion-registry.json"));
  const generatedAt = new Date().toISOString().slice(0, 10);

  const draftClaimsByCase = new Map();
  for (const claim of draftClaims) {
    const caseIds = claim.caseId ? [claim.caseId] : (claim.caseIds ?? []);
    for (const caseId of caseIds) {
      const list = draftClaimsByCase.get(caseId) ?? [];
      list.push({
        draftClaimId: claim.draftClaimId,
        claimStatus: "draft",
        originModuleId: claim.originModuleId,
        reviewStatus: claim.reviewStatus,
        scoreImpact: claim.scoreImpact,
      });
      draftClaimsByCase.set(caseId, list);
    }
  }

  const promotedClaimsByCase = new Map();
  for (const claim of promotedClaims) {
    const caseIds = claim.caseId ? [claim.caseId] : (claim.caseIds ?? []);
    for (const caseId of caseIds) {
      const list = promotedClaimsByCase.get(caseId) ?? [];
      list.push({
        promotionId: claim.promotionId,
        claimId: claim.claimId,
        claimStatus: "promoted",
        originModuleId: claim.originModuleId,
        promotionStatus: claim.promotionStatus,
        reviewStatus: claim.reviewStatus,
        limitations: claim.limitations ?? [],
        promotionBlockers: claim.promotionBlockers ?? [],
      });
      promotedClaimsByCase.set(caseId, list);
    }
  }

  let caseCount = 0;
  for (const slug of fs.readdirSync(casesDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort()) {
    const caseDir = path.join(casesDir, slug);
    const caseJsonPath = path.join(caseDir, "case.json");
    if (!fs.existsSync(caseJsonPath)) continue;

    const caseRecord = readJson(caseJsonPath);
    const caseId = caseRecord.caseId;
    const nativeChain = buildNativeChain(caseDir);
    const counterclaims = readArray(path.join(caseDir, "counterclaims.json")).map(
      ({ counterclaimId, claim, effect, targetClaimIds, sourceIds, rationale, reviewStatus }) => ({
        counterclaimId, claim, effect, targetClaimIds: targetClaimIds ?? [], sourceIds: sourceIds ?? [], rationale, reviewStatus,
      })
    );

    const generationWarnings = [];
    for (const interp of nativeChain.interpretations) {
      for (const claim of interp.claims) {
        if (claim.linkStatus === "broken") {
          generationWarnings.push(`broken claim link: ${claim.claimId} in interpretation ${interp.interpretationId}`);
        }
        for (const passage of claim.passages ?? []) {
          if (passage.linkStatus === "broken") {
            generationWarnings.push(`broken passage link: ${passage.passageId} in claim ${claim.claimId}`);
          }
          if (passage.sourceLinkStatus === "broken") {
            generationWarnings.push(`broken source link: sourceId ${passage.sourceId} for passage ${passage.passageId}`);
          }
        }
      }
    }
    if (generationWarnings.length > 0) {
      for (const w of generationWarnings) {
        process.stderr.write(`Warning [${caseId}]: ${w}\n`);
      }
    }

    const chainDoc = {
      caseId,
      generatedAt,
      generationWarnings,
      nativeChain,
      counterclaims,
      draftClaims: draftClaimsByCase.get(caseId) ?? [],
      promotedClaims: promotedClaimsByCase.get(caseId) ?? [],
    };

    writeJson(path.join(generatedCasesDir, slug, "evidence-chains.json"), chainDoc);
    caseCount += 1;
  }

  return { caseCount };
}
