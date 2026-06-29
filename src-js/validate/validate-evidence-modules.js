import fs from "node:fs";
import path from "node:path";
import { readJson, requireFields } from "./json.js";

const MODULE_TYPES = new Set(["deep-case", "comparative"]);
const SOURCE_REPOSITORY_ROLES = new Set(["deep-case-module", "comparative-corpus-module"]);
const PROVENANCE_STATUSES = new Set(["full", "partial", "undocumented"]);
const RIGHTS_STATUSES = new Set(["open", "fair-use", "restricted", "unknown"]);
const RELIABILITY_STATUSES = new Set(["pending", "sampling-complete", "adjudicated", "certified"]);
const CLAIM_PROMOTION_POLICIES = new Set(["standard", "expedited", "deferred", "blocked"]);
const ISSUE_MIGRATION_STATUSES = new Set(["pending", "in-progress", "complete", "not-applicable"]);
const ARTIFACT_CLASSES = new Set(["corpus", "annotations", "reliability-study", "adjudication", "methodology", "publication", "pipeline-scripts"]);

export function validateEvidenceModules(root) {
  const errors = [];
  const warnings = [];
  const registryPath = path.join(root, "data", "evidence-modules", "module-registry.json");

  if (!fs.existsSync(registryPath)) {
    errors.push(`${registryPath}: missing evidence-module registry`);
    return { errors, warnings, moduleIds: new Set() };
  }

  let modules;
  try {
    modules = readJson(registryPath);
  } catch (error) {
    errors.push(error.message);
    return { errors, warnings, moduleIds: new Set() };
  }

  if (!Array.isArray(modules)) {
    errors.push(`${registryPath}: expected an array`);
    return { errors, warnings, moduleIds: new Set() };
  }

  const moduleIds = new Set();
  for (const moduleRecord of modules) {
    const label = `${registryPath}:${moduleRecord.moduleId ?? "<unknown>"}`;
    try {
      requireFields(label, moduleRecord, [
        "moduleId",
        "moduleName",
        "moduleType",
        "sourceRepository",
        "sourceRepositoryRole",
        "description",
        "provenanceStatus",
        "rightsStatus",
        "reliabilityStatus",
        "claimPromotionPolicy",
        "sourceIssueMigrationStatus"
      ]);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    if (moduleIds.has(moduleRecord.moduleId)) errors.push(`${label}: duplicate moduleId`);
    moduleIds.add(moduleRecord.moduleId);

    if (!MODULE_TYPES.has(moduleRecord.moduleType)) errors.push(`${label}: unsupported moduleType ${moduleRecord.moduleType}`);
    if (!SOURCE_REPOSITORY_ROLES.has(moduleRecord.sourceRepositoryRole)) errors.push(`${label}: unsupported sourceRepositoryRole ${moduleRecord.sourceRepositoryRole}`);
    if (!PROVENANCE_STATUSES.has(moduleRecord.provenanceStatus)) errors.push(`${label}: unsupported provenanceStatus ${moduleRecord.provenanceStatus}`);
    if (!RIGHTS_STATUSES.has(moduleRecord.rightsStatus)) errors.push(`${label}: unsupported rightsStatus ${moduleRecord.rightsStatus}`);
    if (!RELIABILITY_STATUSES.has(moduleRecord.reliabilityStatus)) errors.push(`${label}: unsupported reliabilityStatus ${moduleRecord.reliabilityStatus}`);
    if (!CLAIM_PROMOTION_POLICIES.has(moduleRecord.claimPromotionPolicy)) errors.push(`${label}: unsupported claimPromotionPolicy ${moduleRecord.claimPromotionPolicy}`);
    if (!ISSUE_MIGRATION_STATUSES.has(moduleRecord.sourceIssueMigrationStatus)) errors.push(`${label}: unsupported sourceIssueMigrationStatus ${moduleRecord.sourceIssueMigrationStatus}`);

    for (const artifactClass of moduleRecord.artifactClasses ?? []) {
      if (!ARTIFACT_CLASSES.has(artifactClass)) errors.push(`${label}: unsupported artifactClass ${artifactClass}`);
    }
  }

  return { errors, warnings, moduleIds };
}
