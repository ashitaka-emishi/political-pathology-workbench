import fs from "node:fs";
import path from "node:path";
import { readJson } from "../validate/json.js";
import { validateEvidenceModules } from "../validate/validate-evidence-modules.js";
import { validateCorpusRegistry } from "../validate/validate-corpus-registry.js";
import { validateClaimPromotion } from "../validate/validate-claim-promotion.js";
import { validateMigrationManifest } from "../validate/validate-migration-manifest.js";

const root = process.cwd();

function readArray(file) {
  if (!fs.existsSync(file)) return [];
  const val = readJson(file);
  return Array.isArray(val) ? val : [];
}

function readObject(file) {
  if (!fs.existsSync(file)) return null;
  try { return readJson(file); } catch { return null; }
}

// Case IDs for cross-reference checks
const casesDir = path.join(root, "data", "cases");
const caseIds = new Set(
  fs.readdirSync(casesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
);

// Run all validators to collect errors and warnings
const moduleResult = validateEvidenceModules(root, caseIds);
const corpusResult = validateCorpusRegistry(root, moduleResult.moduleIds, caseIds);
const claimResult = validateClaimPromotion(root, moduleResult.moduleIds, caseIds);
const migrationResult = validateMigrationManifest(root);

const allErrors = [
  ...moduleResult.errors,
  ...corpusResult.errors,
  ...claimResult.errors,
  ...migrationResult.errors,
];
const allWarnings = [
  ...moduleResult.warnings,
  ...corpusResult.warnings,
  ...claimResult.warnings,
  ...migrationResult.warnings,
];

// Evidence architecture counts
const modules = readArray(path.join(root, "data", "evidence-modules", "module-registry.json"));
const corpora = readArray(path.join(root, "data", "corpora", "corpus-registry.json"));
const artifactCount = corpora.reduce((sum, c) => sum + (c.documentCount ?? 0), 0);

// Claim promotion counts
const draftClaimsData = readObject(path.join(root, "data", "claim-promotion", "draft-claims.json"));
const draftClaims = Array.isArray(draftClaimsData?.draftClaims) ? draftClaimsData.draftClaims : [];
const promotionRegistry = readArray(path.join(root, "data", "claim-promotion", "promotion-registry.json"));
const byStatus = (status) => promotionRegistry.filter((r) => r.promotionStatus === status).length;

// Migration counts by disposition
const manifest = readObject(path.join(root, "data", "migration", "child-issue-migration-manifest.json"));
const manifestIssues = Array.isArray(manifest?.issues) ? manifest.issues : [];
const byDisposition = (d) => manifestIssues.filter((i) => i.disposition === d).length;

// Per-module summary
const moduleSummary = modules.map((m) => {
  const moduleCorpora = corpora.filter((c) => c.originModuleId === m.moduleId);
  const moduleDrafts = draftClaims.filter((c) => c.originModuleId === m.moduleId).length;
  const moduleRegistry = promotionRegistry.filter((r) => r.originModuleId === m.moduleId);
  return {
    moduleId: m.moduleId,
    moduleName: m.moduleName,
    corpusCount: moduleCorpora.length,
    artifactCount: moduleCorpora.reduce((sum, c) => sum + (c.documentCount ?? 0), 0),
    draftClaims: moduleDrafts,
    reviewedClaims: moduleRegistry.filter((r) => r.promotionStatus === "reviewed-claim").length,
    promotedFindings: moduleRegistry.filter((r) => r.promotionStatus === "promoted-finding").length,
    blockedClaims: moduleRegistry.filter((r) => r.promotionStatus === "blocked").length,
    claimPromotionPolicy: m.claimPromotionPolicy,
    reliabilityStatus: m.reliabilityStatus,
  };
});

// Output
console.log("=== PPW Evidence Module Validation Summary ===\n");

console.log("Evidence Architecture:");
console.log(`  Modules:    ${modules.length}`);
console.log(`  Corpora:    ${corpora.length}`);
console.log(`  Artifacts:  ${artifactCount} (registered documents)`);
console.log();

for (const m of moduleSummary) {
  console.log(`Module: ${m.moduleName} (${m.moduleId})`);
  console.log(`  Corpora: ${m.corpusCount}  Artifacts: ${m.artifactCount}`);
  console.log(`  Claims — draft: ${m.draftClaims}  reviewed: ${m.reviewedClaims}  promoted: ${m.promotedFindings}  blocked: ${m.blockedClaims}`);
  console.log(`  Promotion policy: ${m.claimPromotionPolicy}  Reliability: ${m.reliabilityStatus}`);
  console.log();
}

console.log("Claim Promotion (all modules):");
console.log(`  Draft:    ${draftClaims.length}`);
console.log(`  Reviewed: ${byStatus("reviewed-claim")}`);
console.log(`  Promoted: ${byStatus("promoted-finding")} (findings)`);
console.log(`  Blocked:  ${byStatus("blocked")}`);
console.log(`  Retired:  ${byStatus("retired")}`);
console.log();

console.log("Child Issue Migration:");
if (manifest) {
  console.log(`  Total issues in manifest: ${manifestIssues.length}`);
  console.log(`  migrate-as-ppw-issue:      ${byDisposition("migrate-as-ppw-issue")}`);
  console.log(`  merge-into-ppw-issue:      ${byDisposition("merge-into-ppw-issue")}`);
  console.log(`  defer-to-post-integration: ${byDisposition("defer-to-post-integration")}`);
} else {
  console.log("  No migration manifest found.");
}
console.log();

console.log(`Validation Warnings: ${allWarnings.length}`);
for (const w of allWarnings) console.log(`  ⚠ ${w}`);
console.log();

if (allErrors.length > 0) {
  console.error(`Validation Failures: ${allErrors.length}`);
  for (const e of allErrors) console.error(`  ✗ ${e}`);
  process.exit(1);
} else {
  console.log(`Validation Failures: 0 — all checks passed.`);
}
