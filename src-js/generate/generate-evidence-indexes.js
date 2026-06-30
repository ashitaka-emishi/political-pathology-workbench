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

export function generateEvidenceIndexes(root) {
  const generatedDir = path.join(root, "data", "generated");
  const moduleRegistryPath = path.join(root, "data", "evidence-modules", "module-registry.json");
  const corpusRegistryPath = path.join(root, "data", "corpora", "corpus-registry.json");
  const draftClaimsPath = path.join(root, "data", "claim-promotion", "draft-claims.json");
  const promotionRegistryPath = path.join(root, "data", "claim-promotion", "promotion-registry.json");

  const modules = readArray(moduleRegistryPath);
  const corpora = readArray(corpusRegistryPath);
  const draftClaimsData = readObject(draftClaimsPath);
  const draftClaims = Array.isArray(draftClaimsData?.draftClaims) ? draftClaimsData.draftClaims : [];
  const promotedClaims = readArray(promotionRegistryPath);

  // evidence-module-index.json — one entry per registered module
  const evidenceModuleIndex = modules.map(({ moduleId, moduleName, moduleType, caseIds, corpusIds, claimPromotionPolicy, reliabilityStatus }) => ({
    moduleId,
    moduleName,
    moduleType,
    caseIds: caseIds ?? [],
    corpusIds: corpusIds ?? [],
    claimPromotionPolicy,
    reliabilityStatus,
  }));

  writeJson(path.join(generatedDir, "evidence-module-index.json"), evidenceModuleIndex);

  // case-corpus-index.json — three parallel views: by module, by corpus, by case
  const modulesByCaseId = {};
  const corporaByCaseId = {};

  for (const mod of modules) {
    for (const caseId of mod.caseIds ?? []) {
      (modulesByCaseId[caseId] ??= []).push(mod.moduleId);
    }
  }

  for (const corpus of corpora) {
    for (const caseId of corpus.caseIds ?? []) {
      (corporaByCaseId[caseId] ??= []).push(corpus.corpusId);
    }
  }

  const allCaseIds = [...new Set([...Object.keys(modulesByCaseId), ...Object.keys(corporaByCaseId)])].sort();

  const caseCorpusIndex = {
    generatedAt: new Date().toISOString().slice(0, 10),
    modules: modules.map(({ moduleId, corpusIds, caseIds }) => ({
      moduleId,
      corpusIds: corpusIds ?? [],
      caseIds: caseIds ?? [],
    })),
    corpora: corpora.map(({ corpusId, originModuleId, caseIds }) => ({
      corpusId,
      originModuleId,
      caseIds: caseIds ?? [],
    })),
    cases: allCaseIds.map((caseId) => ({
      caseId,
      moduleIds: (modulesByCaseId[caseId] ?? []).sort(),
      corpusIds: (corporaByCaseId[caseId] ?? []).sort(),
    })),
  };

  writeJson(path.join(generatedDir, "case-corpus-index.json"), caseCorpusIndex);

  // case-claim-promotion-index.json — draft and promoted claims grouped by case
  const draftClaimsByCase = {};
  for (const claim of draftClaims) {
    const caseIds = claim.caseId ? [claim.caseId] : (claim.caseIds ?? []);
    const entry = {
      draftClaimId: claim.draftClaimId,
      originModuleId: claim.originModuleId,
      reviewStatus: claim.reviewStatus,
      scoreImpact: claim.scoreImpact,
    };
    for (const caseId of caseIds) {
      (draftClaimsByCase[caseId] ??= []).push(entry);
    }
  }

  const promotedClaimsByCase = {};
  for (const claim of promotedClaims) {
    const caseIds = claim.caseId ? [claim.caseId] : (claim.caseIds ?? []);
    const entry = {
      promotionId: claim.promotionId,
      claimId: claim.claimId,
      originModuleId: claim.originModuleId,
      promotionStatus: claim.promotionStatus,
      reviewStatus: claim.reviewStatus,
    };
    for (const caseId of caseIds) {
      (promotedClaimsByCase[caseId] ??= []).push(entry);
    }
  }

  const allClaimCaseIds = [...new Set([...Object.keys(draftClaimsByCase), ...Object.keys(promotedClaimsByCase)])].sort();

  const caseClaimPromotionIndex = {
    generatedAt: new Date().toISOString().slice(0, 10),
    cases: allClaimCaseIds.map((caseId) => ({
      caseId,
      draftClaims: draftClaimsByCase[caseId] ?? [],
      promotedClaims: promotedClaimsByCase[caseId] ?? [],
    })),
  };

  writeJson(path.join(generatedDir, "case-claim-promotion-index.json"), caseClaimPromotionIndex);

  return {
    moduleCount: modules.length,
    corpusCount: corpora.length,
    draftClaimCount: draftClaims.length,
    promotedClaimCount: promotedClaims.length,
  };
}
