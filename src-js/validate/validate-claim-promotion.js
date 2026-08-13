import fs from "node:fs";
import path from "node:path";
import { readJson, requireFields } from "./json.js";

const PROMOTION_STATUSES = new Set(["raw-artifact", "draft-claim", "reviewed-claim", "promoted-finding", "blocked", "retired"]);
const REVIEW_STATUSES = new Set(["draft", "source-review", "evidence-review", "argument-review", "score-review", "human-reviewed", "approved", "rejected"]);
const SCORE_IMPACT_DIRECTIONS = new Set(["increase", "decrease", "neutral", "unknown"]);
const ACTIVE_REVIEW_STATUSES = new Set(["human-reviewed", "approved"]);
const DRAFT_SCORE_IMPACTS = new Set(["candidate", "none"]);

function hasEvidence(record) {
  return (record.sourceRefs ?? []).length > 0 || (record.passageRefs ?? []).length > 0 || (record.artifactRefs ?? []).length > 0;
}

export function validatePromotionRecord(record, promotionIds, moduleIds, caseIds, errors, warnings, label) {
  try {
    requireFields(label, record, ["promotionId", "claimId", "originModuleId", "promotionStatus", "reviewStatus"]);
  } catch (error) {
    errors.push(error.message);
    return;
  }

  if (promotionIds.has(record.promotionId)) errors.push(`${label}: duplicate promotionId`);
  promotionIds.add(record.promotionId);

  if (!PROMOTION_STATUSES.has(record.promotionStatus)) errors.push(`${label}: unsupported promotionStatus ${record.promotionStatus}`);
  if (!REVIEW_STATUSES.has(record.reviewStatus)) errors.push(`${label}: unsupported reviewStatus ${record.reviewStatus}`);
  if (record.scoreImpact?.expectedDirection && !SCORE_IMPACT_DIRECTIONS.has(record.scoreImpact.expectedDirection)) {
    errors.push(`${label}: unsupported scoreImpact.expectedDirection ${record.scoreImpact.expectedDirection}`);
  }

  if (moduleIds.size > 0 && !moduleIds.has(record.originModuleId)) {
    errors.push(`${label}: unknown originModuleId ${record.originModuleId}`);
  }
  if (record.caseId && caseIds.size > 0 && !caseIds.has(record.caseId)) {
    errors.push(`${label}: unknown caseId ${record.caseId}`);
  }

  if (record.promotionStatus === "promoted-finding" && !ACTIVE_REVIEW_STATUSES.has(record.reviewStatus)) {
    errors.push(`${label}: promoted-finding requires reviewStatus human-reviewed or approved`);
  }

  if (record.promotionStatus === "blocked" && !hasEvidence(record) && !record.missingEvidenceReason) {
    errors.push(`${label}: blocked promotion lacks evidence refs and missingEvidenceReason`);
  }

  if (record.promotionStatus !== "raw-artifact" && record.promotionStatus !== "blocked" && !hasEvidence(record)) {
    warnings.push(`${label}: non-raw-artifact claim lacks source/passage/artifact references`);
  }

  for (const id of record.caseIds ?? []) {
    if (caseIds.size > 0 && !caseIds.has(id)) errors.push(`${label}: unknown caseId ${id} in caseIds`);
  }
}

export function validateDraftClaimRecord(claim, draftIds, moduleIds, caseIds, errors, warnings, label) {
  try {
    requireFields(label, claim, ["draftClaimId", "originModuleId", "claim", "reviewStatus", "scoreImpact"]);
  } catch (error) {
    errors.push(error.message);
    return;
  }

  if (draftIds.has(claim.draftClaimId)) errors.push(`${label}: duplicate draftClaimId`);
  draftIds.add(claim.draftClaimId);

  if (moduleIds.size > 0 && !moduleIds.has(claim.originModuleId)) {
    errors.push(`${label}: unknown originModuleId ${claim.originModuleId}`);
  }

  const singleCaseId = claim.caseId || null;
  const multiCaseIds = Array.isArray(claim.caseIds) ? claim.caseIds : [];
  if (!singleCaseId && multiCaseIds.length === 0) {
    errors.push(`${label}: must specify caseId or caseIds`);
  }
  if (singleCaseId && multiCaseIds.length > 0) {
    warnings.push(`${label}: both caseId and caseIds are set; caseId takes precedence`);
  }
  if (singleCaseId && caseIds.size > 0 && !caseIds.has(singleCaseId)) {
    errors.push(`${label}: unknown caseId ${singleCaseId}`);
  }
  for (const id of multiCaseIds) {
    if (caseIds.size > 0 && !caseIds.has(id)) errors.push(`${label}: unknown caseId ${id} in caseIds`);
  }

  if (!REVIEW_STATUSES.has(claim.reviewStatus)) {
    errors.push(`${label}: unsupported reviewStatus ${claim.reviewStatus}`);
  }

  if (!DRAFT_SCORE_IMPACTS.has(claim.scoreImpact)) {
    errors.push(`${label}: draft claim has active scoreImpact "${claim.scoreImpact}"; only "candidate" or "none" are permitted`);
  }

  if ((claim.sourceArtifacts ?? []).length === 0) {
    warnings.push(`${label}: draft claim has no sourceArtifacts`);
  }
}

function validatePromotionRegistry(registryPath, moduleIds, caseIds, errors, warnings) {
  if (!fs.existsSync(registryPath)) return;

  let records;
  try {
    records = readJson(registryPath);
  } catch (error) {
    errors.push(error.message);
    return;
  }

  if (!Array.isArray(records)) {
    errors.push(`${registryPath}: expected an array`);
    return;
  }

  const promotionIds = new Set();
  for (const record of records) {
    const label = `${registryPath}:${record.promotionId ?? "<unknown>"}`;
    validatePromotionRecord(record, promotionIds, moduleIds, caseIds, errors, warnings, label);
  }
}

function validateDraftClaims(draftClaimsPath, moduleIds, caseIds, errors, warnings) {
  if (!fs.existsSync(draftClaimsPath)) return;

  let data;
  try {
    data = readJson(draftClaimsPath);
  } catch (error) {
    errors.push(error.message);
    return;
  }

  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    errors.push(`${draftClaimsPath}: expected an object with a draftClaims array`);
    return;
  }

  const claims = data.draftClaims;
  if (!Array.isArray(claims)) {
    errors.push(`${draftClaimsPath}: draftClaims must be an array`);
    return;
  }

  const draftIds = new Set();
  for (const claim of claims) {
    const label = `${draftClaimsPath}:${claim.draftClaimId ?? "<unknown>"}`;
    validateDraftClaimRecord(claim, draftIds, moduleIds, caseIds, errors, warnings, label);
  }
}

export function buildClaimPromotionIndex(root) {
  const registryPath = path.join(root, "data", "claim-promotion", "promotion-registry.json");
  const index = {
    byModuleClaim: new Map(),
    ambiguousClaimIds: new Set()
  };
  if (!fs.existsSync(registryPath)) return index;

  const records = readJson(registryPath);
  if (!Array.isArray(records)) return index;

  const claimIdsSeen = new Set();
  for (const record of records) {
    if (!record.originModuleId || !record.claimId) continue;
    const namespacedKey = `${record.originModuleId}:${record.claimId}`;
    index.byModuleClaim.set(namespacedKey, record);
    if (claimIdsSeen.has(record.claimId)) index.ambiguousClaimIds.add(record.claimId);
    claimIdsSeen.add(record.claimId);
  }
  return index;
}

function parseModuleClaimRef(claimId) {
  const match = /^module:([^:]+):claim:(.+)$/.exec(claimId);
  if (!match) return null;
  return {
    originModuleId: match[1],
    claimId: match[2]
  };
}

export function validateScoreClaimPromotion(score, interpretation, claimsById, promotionIndex, errors, label) {
  if (score.includeInSubstantiveAnalysis !== true) return;

  if (!interpretation) {
    errors.push(`${label}: included score cannot resolve interpretation ${score.interpretationId}`);
    return;
  }

  for (const claimId of interpretation.claimIds ?? []) {
    const nativeClaim = claimsById.get(claimId);
    if (nativeClaim) {
      if (!ACTIVE_REVIEW_STATUSES.has(nativeClaim.reviewStatus)) {
        errors.push(`${label}: included score references native claim ${claimId} with reviewStatus ${nativeClaim.reviewStatus}; human-reviewed or approved is required`);
      }
      if (nativeClaim.publicationStatus === "withdrawn") {
        errors.push(`${label}: included score references withdrawn native claim ${claimId}`);
      }
      continue;
    }

    const moduleRef = parseModuleClaimRef(claimId);
    if (!moduleRef) {
      errors.push(`${label}: included score references unresolved claim ${claimId}; use native case claim IDs or module:<originModuleId>:claim:<claimId> refs`);
      continue;
    }

    const promotion = promotionIndex.byModuleClaim.get(`${moduleRef.originModuleId}:${moduleRef.claimId}`);
    if (!promotion) {
      errors.push(`${label}: included score references unresolved evidence-module claim ${claimId}`);
      continue;
    }
    if (promotion.promotionStatus !== "promoted-finding" || !ACTIVE_REVIEW_STATUSES.has(promotion.reviewStatus)) {
      errors.push(`${label}: included score references evidence-module claim ${claimId} with promotionStatus ${promotion.promotionStatus} and reviewStatus ${promotion.reviewStatus}; promoted-finding plus human-reviewed/approved is required`);
    }
  }
}

export function validateClaimPromotion(root, moduleIds = new Set(), caseIds = new Set()) {
  const errors = [];
  const warnings = [];

  validatePromotionRegistry(
    path.join(root, "data", "claim-promotion", "promotion-registry.json"),
    moduleIds, caseIds, errors, warnings
  );
  validateDraftClaims(
    path.join(root, "data", "claim-promotion", "draft-claims.json"),
    moduleIds, caseIds, errors, warnings
  );

  return { errors, warnings };
}
