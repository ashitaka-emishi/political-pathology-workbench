import fs from "node:fs";
import path from "node:path";
import { readJson, requireFields } from "./json.js";

const PROMOTION_STATUSES = new Set(["raw-artifact", "draft-claim", "reviewed-claim", "promoted-finding", "blocked", "retired"]);
const REVIEW_STATUSES = new Set(["draft", "source-review", "evidence-review", "argument-review", "score-review", "human-reviewed", "approved", "rejected"]);
const SCORE_IMPACT_DIRECTIONS = new Set(["increase", "decrease", "neutral", "unknown"]);

function hasEvidence(record) {
  return (record.sourceRefs ?? []).length > 0 || (record.passageRefs ?? []).length > 0 || (record.artifactRefs ?? []).length > 0;
}

export function validateClaimPromotion(root) {
  const errors = [];
  const warnings = [];
  const registryPath = path.join(root, "data", "claim-promotion", "promotion-registry.json");

  if (!fs.existsSync(registryPath)) {
    return { errors, warnings };
  }

  let records;
  try {
    records = readJson(registryPath);
  } catch (error) {
    errors.push(error.message);
    return { errors, warnings };
  }

  if (!Array.isArray(records)) {
    errors.push(`${registryPath}: expected an array`);
    return { errors, warnings };
  }

  const promotionIds = new Set();
  for (const record of records) {
    const label = `${registryPath}:${record.promotionId ?? "<unknown>"}`;
    try {
      requireFields(label, record, ["promotionId", "claimId", "originModuleId", "promotionStatus", "reviewStatus"]);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    if (promotionIds.has(record.promotionId)) errors.push(`${label}: duplicate promotionId`);
    promotionIds.add(record.promotionId);

    if (!PROMOTION_STATUSES.has(record.promotionStatus)) errors.push(`${label}: unsupported promotionStatus ${record.promotionStatus}`);
    if (!REVIEW_STATUSES.has(record.reviewStatus)) errors.push(`${label}: unsupported reviewStatus ${record.reviewStatus}`);
    if (record.scoreImpact?.expectedDirection && !SCORE_IMPACT_DIRECTIONS.has(record.scoreImpact.expectedDirection)) {
      errors.push(`${label}: unsupported scoreImpact.expectedDirection ${record.scoreImpact.expectedDirection}`);
    }

    if (record.promotionStatus === "blocked" && !hasEvidence(record) && !record.missingEvidenceReason) {
      errors.push(`${label}: blocked promotion lacks evidence refs and missingEvidenceReason`);
    }
  }

  return { errors, warnings };
}
