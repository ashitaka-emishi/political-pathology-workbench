import fs from "node:fs";
import path from "node:path";
import { readJson, requireFields } from "./json.js";

const CORPUS_TYPES = new Set(["deep-case", "comparative"]);
const CORPUS_PURPOSES = new Set(["core", "validation", "reference"]);
const RIGHTS_STATUSES = new Set(["open", "fair-use", "restricted", "unknown"]);
const NORMALIZATION_STATUSES = new Set(["pending", "partial", "complete"]);
const SEGMENTATION_STATUSES = new Set(["pending", "in-progress", "complete"]);
const ANNOTATION_STATUSES = new Set(["pending", "partial", "complete"]);
const RELIABILITY_STATUSES = new Set(["pending", "sampling-complete", "adjudicated", "certified"]);
const CLAIM_PROMOTION_STATUSES = new Set(["not-started", "in-progress", "complete", "blocked"]);
const ISSUE_MIGRATION_STATUSES = new Set(["pending", "in-progress", "complete", "not-applicable"]);

export function validateCorpusRegistry(root, moduleIds) {
  const errors = [];
  const warnings = [];
  const registryPath = path.join(root, "data", "corpora", "corpus-registry.json");

  if (!fs.existsSync(registryPath)) {
    errors.push(`${registryPath}: missing corpus registry`);
    return { errors, warnings };
  }

  let corpora;
  try {
    corpora = readJson(registryPath);
  } catch (error) {
    errors.push(error.message);
    return { errors, warnings };
  }

  if (!Array.isArray(corpora)) {
    errors.push(`${registryPath}: expected an array`);
    return { errors, warnings };
  }

  const corpusIds = new Set();
  for (const corpus of corpora) {
    const label = `${registryPath}:${corpus.corpusId ?? "<unknown>"}`;
    try {
      requireFields(label, corpus, [
        "corpusId",
        "corpusName",
        "corpusType",
        "originModuleId",
        "corpusPurpose",
        "rightsStatus",
        "normalizationStatus",
        "segmentationStatus",
        "annotationStatus",
        "reliabilityStatus",
        "claimPromotionStatus",
        "sourceIssueMigrationStatus"
      ]);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    if (corpusIds.has(corpus.corpusId)) errors.push(`${label}: duplicate corpusId`);
    corpusIds.add(corpus.corpusId);

    if (!CORPUS_TYPES.has(corpus.corpusType)) errors.push(`${label}: unsupported corpusType ${corpus.corpusType}`);
    if (!CORPUS_PURPOSES.has(corpus.corpusPurpose)) errors.push(`${label}: unsupported corpusPurpose ${corpus.corpusPurpose}`);
    if (!RIGHTS_STATUSES.has(corpus.rightsStatus)) errors.push(`${label}: unsupported rightsStatus ${corpus.rightsStatus}`);
    if (!NORMALIZATION_STATUSES.has(corpus.normalizationStatus)) errors.push(`${label}: unsupported normalizationStatus ${corpus.normalizationStatus}`);
    if (!SEGMENTATION_STATUSES.has(corpus.segmentationStatus)) errors.push(`${label}: unsupported segmentationStatus ${corpus.segmentationStatus}`);
    if (!ANNOTATION_STATUSES.has(corpus.annotationStatus)) errors.push(`${label}: unsupported annotationStatus ${corpus.annotationStatus}`);
    if (!RELIABILITY_STATUSES.has(corpus.reliabilityStatus)) errors.push(`${label}: unsupported reliabilityStatus ${corpus.reliabilityStatus}`);
    if (!CLAIM_PROMOTION_STATUSES.has(corpus.claimPromotionStatus)) errors.push(`${label}: unsupported claimPromotionStatus ${corpus.claimPromotionStatus}`);
    if (!ISSUE_MIGRATION_STATUSES.has(corpus.sourceIssueMigrationStatus)) errors.push(`${label}: unsupported sourceIssueMigrationStatus ${corpus.sourceIssueMigrationStatus}`);

    if (moduleIds && !moduleIds.has(corpus.originModuleId)) {
      errors.push(`${label}: originModuleId ${corpus.originModuleId} is not in the evidence-module registry`);
    }
  }

  return { errors, warnings };
}
