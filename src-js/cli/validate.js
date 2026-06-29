import fs from "node:fs";
import path from "node:path";
import { readJson, requireFields } from "../validate/json.js";
import { validateEvidenceModules } from "../validate/validate-evidence-modules.js";
import { validateCorpusRegistry } from "../validate/validate-corpus-registry.js";
import { validateClaimPromotion } from "../validate/validate-claim-promotion.js";
import { validateMigrationManifest } from "../validate/validate-migration-manifest.js";

const root = process.cwd();
const errors = [];
const warnings = [];

const VOCAB = {
  outcomes: new Set(["sacrificial-escalation", "restrained-reordering", "collapse", "absorption-transformation", "stagnation-frozen-pathology", "hybrid-transitional"]),
  reviewStatuses: new Set(["draft", "source-review", "evidence-review", "argument-review", "score-review", "human-reviewed", "approved", "rejected"]),
  publicationStatuses: new Set(["private-note", "draft", "internal-review", "public-preview", "published", "withdrawn"]),
  evidenceRoles: new Set(["grounds", "warrant", "backing", "qualifier", "rebuttal", "counterevidence", "context", "corroboration"]),
  sourceRoles: new Set(["primary-grounds", "secondary-context", "theoretical-warrant", "background-theory", "theoretical-background", "counterevidence", "corroboration"]),
  mechanisms: new Set(["collective-immortality-to-sacrifice", "sacred-enemy-escalation", "institutional-self-preservation", "anti-sacrificial-restraint", "pluralist-reordering", "constitutional-containment", "memory-driven-restraint", "legitimacy-collapse", "institutional-fragmentation", "symbolic-transformation", "frozen-pathology"]),
  sacrificeForms: new Set(["time", "labor", "health", "conscience", "family-life", "dignity", "speech", "agency", "economic-security", "bodily-risk", "blood-sacrifice", "death", "killing", "martyrdom", "ritual-sacrifice"]),
  sacrificeHealth: new Set(["healthy", "ambiguous", "pathological", "mixed", "unknown"]),
  sacrificeBoundedness: new Set(["bounded", "partially-bounded", "unbounded", "unknown"]),
  sacrificeTargets: new Set(["self", "enemy", "in-group", "out-group", "mixed", "unknown"]),
  caseSelectionRoles: new Set(["gold-case", "high-pathology-case", "countercase", "collapse-case", "transformation-case", "stagnation-case", "hybrid-case", "deferred-case", "rejected-case"]),
  counterclaimEffects: new Set(["contradicts", "qualifies", "limits", "complicates", "supports-alternative-explanation"])
};

function isPublicFacing(publicationStatus) {
  return ["public-preview", "published"].includes(publicationStatus);
}

function validateEnum(label, value, allowed) {
  if (value !== undefined && !allowed.has(value)) addError(`${label}: unsupported value ${value}`);
}

function validateEnumArray(label, values, allowed) {
  for (const value of values ?? []) {
    validateEnum(label, value, allowed);
  }
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

function readArray(file) {
  if (!fs.existsSync(file)) return [];
  const value = readJson(file);
  if (!Array.isArray(value)) {
    throw new Error(`${file}: expected an array`);
  }
  return value;
}

function validateTheory(theoryDir) {
  const manifestPath = path.join(theoryDir, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    addError(`${manifestPath}: missing theory manifest`);
    return null;
  }
  try {
    const manifest = readJson(manifestPath);
    requireFields(manifestPath, manifest, ["theoryId", "title", "version", "status", "publicationStatus"]);
    return manifest;
  } catch (error) {
    addError(error.message);
    return null;
  }
}

function validateCase(caseDir, theoryIds, bibliographyIds) {
  const casePath = path.join(caseDir, "case.json");
  if (!fs.existsSync(casePath)) {
    addError(`${casePath}: missing case.json`);
    return null;
  }

  try {
    const caseRecord = readJson(casePath);
    requireFields(casePath, caseRecord, ["caseId", "title", "subtype", "outcome", "publicationStatus", "reviewStatus", "sacredPoliticalOrderId", "sacredPoliticalOrderName", "sacredPoliticalOrderDefinition", "sacredPoliticalOrderStrength", "sacredPoliticalOrderStrengthRationale", "caseSelectionRole", "selectionRationale", "theoryTest"]);
    validateEnum(`${caseRecord.caseId}.outcome`, caseRecord.outcome, VOCAB.outcomes);
    validateEnum(`${caseRecord.caseId}.reviewStatus`, caseRecord.reviewStatus, VOCAB.reviewStatuses);
    validateEnum(`${caseRecord.caseId}.publicationStatus`, caseRecord.publicationStatus, VOCAB.publicationStatuses);
    validateEnum(`${caseRecord.caseId}.caseSelectionRole`, caseRecord.caseSelectionRole, VOCAB.caseSelectionRoles);
    if (typeof caseRecord.sacredPoliticalOrderStrength !== "number" || caseRecord.sacredPoliticalOrderStrength < 0 || caseRecord.sacredPoliticalOrderStrength > 5) addError(`${caseRecord.caseId}: sacredPoliticalOrderStrength must be a number from 0 to 5`);

    const sourcePack = readJson(path.join(caseDir, "source-pack.json"));
    requireFields(path.join(caseDir, "source-pack.json"), sourcePack, ["caseId", "sources"]);
    if (!Array.isArray(sourcePack.sources)) addError(`${caseDir}/source-pack.json: sources must be an array`);

    const passages = readArray(path.join(caseDir, "passages.json"));
    const claims = readArray(path.join(caseDir, "claims.json"));
    const interpretations = readArray(path.join(caseDir, "interpretations.json"));
    const scores = readArray(path.join(caseDir, "scores.json"));
    const counterclaims = readArray(path.join(caseDir, "counterclaims.json"));

    const sourceIds = new Set(sourcePack.sources.map((source) => source.sourceId));
    const passageIds = new Set(passages.map((passage) => passage.passageId));
    const claimIds = new Set(claims.map((claim) => claim.claimId));
    const interpretationIds = new Set(interpretations.map((interpretation) => interpretation.interpretationId));

    for (const source of sourcePack.sources) {
      validateEnum(`${caseRecord.caseId}.source.${source.sourceId}.role`, source.role, VOCAB.sourceRoles);
      if (!bibliographyIds.has(source.sourceId)) addError(`${caseRecord.caseId}: source ${source.sourceId} lacks citation metadata in bibliography/sources.csl.json`);
    }

    for (const passage of passages) {
      requireFields(`${caseDir}/passages.json:${passage.passageId}`, passage, ["passageId", "caseId", "sourceId", "locator", "text", "evidenceRole", "reviewStatus"]);
      validateEnum(`${passage.passageId}.evidenceRole`, passage.evidenceRole, VOCAB.evidenceRoles);
      validateEnum(`${passage.passageId}.reviewStatus`, passage.reviewStatus, VOCAB.reviewStatuses);
      validateEnum(`${passage.passageId}.publicationStatus`, passage.publicationStatus, VOCAB.publicationStatuses);
      if (passage.caseId !== caseRecord.caseId) addError(`${passage.passageId}: caseId does not match ${caseRecord.caseId}`);
      if (!sourceIds.has(passage.sourceId)) addError(`${passage.passageId}: sourceId ${passage.sourceId} is not in source-pack.json`);
      if (isPublicFacing(passage.publicationStatus) && passage.text.includes("placeholder")) addError(`${passage.passageId}: public-facing passage contains placeholder text`);
    }

    for (const claim of claims) {
      requireFields(`${caseDir}/claims.json:${claim.claimId}`, claim, ["claimId", "caseId", "claim", "derivedFrom", "createdBy", "reviewStatus"]);
      validateEnum(`${claim.claimId}.reviewStatus`, claim.reviewStatus, VOCAB.reviewStatuses);
      validateEnum(`${claim.claimId}.publicationStatus`, claim.publicationStatus, VOCAB.publicationStatuses);
      for (const passageId of claim.derivedFrom ?? []) {
        if (!passageIds.has(passageId)) addError(`${claim.claimId}: derivedFrom passage ${passageId} is missing`);
      }
      if (claim.createdBy === "ai" && isPublicFacing(claim.publicationStatus) && !["human-reviewed", "approved"].includes(claim.reviewStatus)) {
        addError(`${claim.claimId}: public-facing AI-created claim lacks human review`);
      }
      if ((claim.derivedFrom ?? []).length === 1) {
        addWarning(`${claim.claimId}: claim is supported by only one passage`);
      }
    }

    for (const interpretation of interpretations) {
      requireFields(`${caseDir}/interpretations.json:${interpretation.interpretationId}`, interpretation, ["interpretationId", "caseId", "claimIds", "theoryId", "variableId", "interpretation", "reviewStatus"]);
      validateEnum(`${interpretation.interpretationId}.reviewStatus`, interpretation.reviewStatus, VOCAB.reviewStatuses);
      validateEnum(`${interpretation.interpretationId}.publicationStatus`, interpretation.publicationStatus, VOCAB.publicationStatuses);
      validateEnum(`${interpretation.interpretationId}.mechanism`, interpretation.mechanism, VOCAB.mechanisms);
      validateEnumArray(`${interpretation.interpretationId}.alternativeMechanisms`, interpretation.alternativeMechanisms, VOCAB.mechanisms);
      validateEnumArray(`${interpretation.interpretationId}.sacrificeForm`, interpretation.sacrificeForm, VOCAB.sacrificeForms);
      validateEnum(`${interpretation.interpretationId}.sacrificeHealth`, interpretation.sacrificeHealth, VOCAB.sacrificeHealth);
      validateEnum(`${interpretation.interpretationId}.sacrificeBoundedness`, interpretation.sacrificeBoundedness, VOCAB.sacrificeBoundedness);
      validateEnum(`${interpretation.interpretationId}.sacrificeTarget`, interpretation.sacrificeTarget, VOCAB.sacrificeTargets);
      if (!theoryIds.has(interpretation.theoryId)) addError(`${interpretation.interpretationId}: unknown theoryId ${interpretation.theoryId}`);
      for (const claimId of interpretation.claimIds ?? []) {
        if (!claimIds.has(claimId)) addError(`${interpretation.interpretationId}: claim ${claimId} is missing`);
      }
      if (interpretation.sacrificeHealth && !interpretation.interpretation) addError(`${interpretation.interpretationId}: sacrifice-health classification lacks interpretation notes`);
    }

    for (const score of scores) {
      requireFields(`${caseDir}/scores.json:${score.scoreId}`, score, ["scoreId", "caseId", "theoryId", "variableId", "interpretationId", "value", "confidence", "reviewStatus"]);
      validateEnum(`${score.scoreId}.reviewStatus`, score.reviewStatus, VOCAB.reviewStatuses);
      validateEnum(`${score.scoreId}.publicationStatus`, score.publicationStatus, VOCAB.publicationStatuses);
      if (!interpretationIds.has(score.interpretationId)) addError(`${score.scoreId}: interpretation ${score.interpretationId} is missing`);
      if (typeof score.value !== "number" || score.value < 0 || score.value > 5) addError(`${score.scoreId}: value must be a number from 0 to 5`);
      if (isPublicFacing(score.publicationStatus) && !["human-reviewed", "approved"].includes(score.reviewStatus)) addError(`${score.scoreId}: public-facing score references an interpretation that is not human-reviewed`);
      if (score.publicationStatus === "published" && !score.confidence?.rationale) addError(`${score.scoreId}: published score lacks confidence rationale`);
      if (score.confidence?.value < 0.5) addWarning(`${score.scoreId}: score confidence is below 0.5`);
      if (score.value >= 4 && score.variableId === "sacred-political-order-strength" && !caseRecord.sacredPoliticalOrderStrengthRationale) addWarning(`${score.scoreId}: high sacred-political-order score lacks obligation or sacrifice rationale`);
      if (score.value >= 4 && ["sacralization", "collective-immortality", "sacred-enemy", "pathology", "corrigibility"].includes(score.variableId) && !(score.definitionRefs ?? []).includes(score.variableId)) addWarning(`${score.scoreId}: high ${score.variableId} score should cite its definition`);
    }

    for (const counterclaim of counterclaims) {
      requireFields(`${caseDir}/counterclaims.json:${counterclaim.counterclaimId}`, counterclaim, ["counterclaimId", "caseId", "claim", "effect", "targetClaimIds", "sourceIds", "rationale", "reviewStatus", "publicationStatus"]);
      validateEnum(`${counterclaim.counterclaimId}.effect`, counterclaim.effect, VOCAB.counterclaimEffects);
      validateEnum(`${counterclaim.counterclaimId}.reviewStatus`, counterclaim.reviewStatus, VOCAB.reviewStatuses);
      validateEnum(`${counterclaim.counterclaimId}.publicationStatus`, counterclaim.publicationStatus, VOCAB.publicationStatuses);
      for (const claimId of counterclaim.targetClaimIds ?? []) {
        if (!claimIds.has(claimId)) addError(`${counterclaim.counterclaimId}: target claim ${claimId} is missing`);
      }
    }

    if (caseRecord.goldCase && (passages.length === 0 || claims.length === 0 || interpretations.length === 0 || scores.length === 0)) {
      addWarning(`${caseRecord.caseId}: gold case is missing a complete evidence chain`);
    }
    if (sourcePack.sources.length === 1) addWarning(`${caseRecord.caseId}: case has only one source`);
    if (counterclaims.length === 0) addWarning(`${caseRecord.caseId}: case has no counterevidence yet`);

    return { caseRecord, passages, claims, interpretations, scores, counterclaims };
  } catch (error) {
    addError(error.message);
    return null;
  }
}

const theoryDirs = listDirs(path.join(root, "theories")).map((name) => path.join(root, "theories", name));
const theories = theoryDirs.map(validateTheory).filter(Boolean);
const theoryIds = new Set(theories.map((theory) => theory.theoryId));
const bibliographyPath = path.join(root, "bibliography", "sources.csl.json");
const bibliography = fs.existsSync(bibliographyPath) ? readJson(bibliographyPath) : [];
const bibliographyIds = new Set(bibliography.map((source) => source.id));

const caseDirs = listDirs(path.join(root, "data", "cases")).map((name) => path.join(root, "data", "cases", name));
const cases = caseDirs.map((caseDir) => validateCase(caseDir, theoryIds, bibliographyIds)).filter(Boolean);

const evidenceModuleResult = validateEvidenceModules(root);
for (const e of evidenceModuleResult.errors) errors.push(e);
for (const w of evidenceModuleResult.warnings) warnings.push(w);

const corpusRegistryResult = validateCorpusRegistry(root, evidenceModuleResult.moduleIds);
for (const e of corpusRegistryResult.errors) errors.push(e);
for (const w of corpusRegistryResult.warnings) warnings.push(w);

const claimPromotionResult = validateClaimPromotion(root);
for (const e of claimPromotionResult.errors) errors.push(e);
for (const w of claimPromotionResult.warnings) warnings.push(w);

const migrationManifestResult = validateMigrationManifest(root);
for (const e of migrationManifestResult.errors) errors.push(e);
for (const w of migrationManifestResult.warnings) warnings.push(w);

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validation passed for ${theories.length} theories, ${cases.length} cases, ${evidenceModuleResult.moduleIds.size} evidence modules.`);
