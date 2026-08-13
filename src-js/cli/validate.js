import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { readJson, requireFields } from "../validate/json.js";
import { validateCodingPackets } from "../validate/validate-coding-packets.js";
import { validateEvidenceModules } from "../validate/validate-evidence-modules.js";
import { validateCorpusRegistry } from "../validate/validate-corpus-registry.js";
import { buildClaimPromotionIndex, buildSearchLogIndex, validateClaimPromotion, validateScoreClaimPromotion, validateSearchLogRecord } from "../validate/validate-claim-promotion.js";
import { validateMigrationManifest } from "../validate/validate-migration-manifest.js";
import { validateRepositoryGraph } from "../validate/validate-repository-graph.js";
import { validateSchemaRegistry } from "../validate/validate-schema-registry.js";
import { validateScoreIndependence, validateScoreSemantics } from "../validate/validate-score-semantics.js";
import { buildDefinitionRefs, buildTheoryVariableRegistry, validateDefinitionRefs, validateMagnitudeAnchors, validateScoreableVariableReference, validateTheoryVariableRecord, validateTheoryVariableReference } from "../validate/validate-theory-ontology.js";

const root = process.cwd();
const errors = [];
const warnings = [];

const VOCAB = {
  outcomes: new Set(["sacrificial-escalation", "restrained-reordering", "collapse", "absorption-transformation", "stagnation-frozen-pathology", "hybrid-transitional"]),
  reviewStatuses: new Set(["draft", "source-review", "evidence-review", "argument-review", "score-review", "human-reviewed", "approved", "rejected"]),
  publicationStatuses: new Set(["private-note", "draft", "internal-review", "public-preview", "published", "withdrawn"]),
  evidenceRoles: new Set(["supporting", "contradicting", "qualifying", "contextual", "background", "temporal-counterexample", "methodological", "grounds", "warrant", "backing", "qualifier", "rebuttal", "counterevidence", "context", "corroboration"]),
  sourceRoles: new Set(["primary-grounds", "secondary-context", "theoretical-warrant", "background-theory", "theoretical-background", "counterevidence", "corroboration"]),
  mechanisms: new Set(["collective-immortality-to-sacrifice", "sacred-enemy-escalation", "institutional-self-preservation", "anti-sacrificial-restraint", "pluralist-reordering", "constitutional-containment", "memory-driven-restraint", "legitimacy-collapse", "institutional-fragmentation", "symbolic-transformation", "frozen-pathology"]),
  sacrificeForms: new Set(["time", "labor", "health", "conscience", "family-life", "dignity", "speech", "agency", "economic-security", "bodily-risk", "blood-sacrifice", "death", "killing", "martyrdom", "ritual-sacrifice"]),
  sacrificeHealth: new Set(["healthy", "ambiguous", "pathological", "mixed", "unknown"]),
  sacrificeBoundedness: new Set(["bounded", "partially-bounded", "unbounded", "unknown"]),
  sacrificeTargets: new Set(["self", "enemy", "in-group", "out-group", "mixed", "unknown"]),
  caseSelectionRoles: new Set(["gold-case", "high-pathology-case", "countercase", "collapse-case", "transformation-case", "stagnation-case", "hybrid-case", "deferred-case", "rejected-case"]),
  unitClasses: new Set(["political-formation", "historical-episode", "corpus-subset"]),
  caseTypes: new Set(["calibration-case", "positive-pathology-case", "hard-negative-case", "collapse-case", "transformation-case", "stagnation-case", "ambiguous-or-mixed-case", "holdout-case", "excluded-case"]),
  evaluationRoles: new Set(["theory-development", "holdout-evaluation", "open-evaluation", "excluded"]),
  holdoutStatuses: new Set(["not-held-out", "sealed", "opened", "retired"]),
  counterclaimEffects: new Set(["contradicts", "qualifies", "limits", "complicates", "supports-alternative-explanation"]),
  searchPurposes: new Set(["supporting", "disconfirming", "neutral"])
};

function isPublicFacing(publicationStatus) {
  return ["public-preview", "published"].includes(publicationStatus);
}

function shouldErrorOnGoldEvidenceOrphan(caseRecord) {
  return Boolean(caseRecord.goldCase);
}

function addCaseEvidenceIssue(caseRecord, message, shouldError) {
  if (shouldError) {
    addError(`${caseRecord.caseId}: ${message}`);
  } else {
    addWarning(`${caseRecord.caseId}: ${message}`);
  }
}

function hasHumanReviewedScore(scores) {
  return scores.some((score) => ["human-reviewed", "approved"].includes(score.reviewStatus));
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

function validateGeneratedChainPagesAreUntracked() {
  if (!fs.existsSync(path.join(root, ".git"))) return;
  const tracked = execFileSync("git", ["ls-files", "site/cases/_chains/*.md"], {
    cwd: root,
    encoding: "utf8"
  }).trim().split("\n").filter(Boolean);
  for (const file of tracked) {
    addError(`${file}: generated chain markdown must not be committed; run site/pre-render.py to regenerate it`);
  }
}

function requireNonEmptyArray(label, value, fieldName) {
  if (!Array.isArray(value) || value.length === 0) {
    addError(`${label}: ${fieldName} must be a non-empty array`);
    return false;
  }
  return true;
}

function validateSourceRefs(label, sourceIds, bibliographyIds, fieldName) {
  if (!Array.isArray(sourceIds)) return;
  for (const sourceId of sourceIds) {
    if (!bibliographyIds.has(sourceId)) addError(`${label}: ${fieldName} ${sourceId} lacks citation metadata in bibliography/sources.csl.json`);
  }
}

function validateConstructValidity(theoryDir, manifest, variables, propositionIds, bibliographyIds) {
  const constructValidityPath = path.join(theoryDir, "construct-validity.json");
  if (!fs.existsSync(constructValidityPath)) {
    addError(`${constructValidityPath}: missing construct-validity file`);
    return;
  }

  const constructValidity = readJson(constructValidityPath);
  requireFields(constructValidityPath, constructValidity, ["constructValidityId", "theoryId", "status", "variables", "propositions"]);
  if (constructValidity.theoryId !== manifest.theoryId) addError(`${constructValidityPath}: theoryId ${constructValidity.theoryId} does not match manifest ${manifest.theoryId}`);
  validateEnum(`${constructValidityPath}.status`, constructValidity.status, VOCAB.reviewStatuses);

  const variableAnalyses = constructValidity.variables ?? {};
  const scoreableVariables = variables.filter((variable) => variable.status === "active" && variable.measurementRole === "scoreable");
  for (const variable of scoreableVariables) {
    const label = `${constructValidityPath}:variables.${variable.variableId}`;
    const analysis = variableAnalyses[variable.variableId];
    if (!analysis) {
      addError(`${label}: missing construct-validity analysis for scoreable variable`);
      continue;
    }

    const anchors = analysis.scholarlyAnchors ?? [];
    if (anchors.length < 2 && typeof analysis.noveltyJustification !== "string") {
      addError(`${label}: requires at least two scholarlyAnchors or an explicit noveltyJustification`);
    }
    validateSourceRefs(label, anchors, bibliographyIds, "scholarlyAnchor");
    validateSourceRefs(label, analysis.competingTraditions ?? [], bibliographyIds, "competingTradition");
    requireNonEmptyArray(label, analysis.neighboringConcepts, "neighboringConcepts");
    for (const [index, neighbor] of (analysis.neighboringConcepts ?? []).entries()) {
      requireFields(`${label}.neighboringConcepts[${index}]`, neighbor, ["concept", "overlap", "discriminantBoundary"]);
    }
  }

  const propositionAnalyses = constructValidity.propositions ?? {};
  for (const propositionId of propositionIds) {
    const label = `${constructValidityPath}:propositions.${propositionId}`;
    const analysis = propositionAnalyses[propositionId];
    if (!analysis) {
      addError(`${label}: missing proposition validity analysis`);
      continue;
    }
    requireNonEmptyArray(label, analysis.scopeConditions, "scopeConditions");
    requireNonEmptyArray(label, analysis.rivalHypotheses, "rivalHypotheses");
    requireNonEmptyArray(label, analysis.expectedObservations, "expectedObservations");
    requireNonEmptyArray(label, analysis.counterObservations, "counterObservations");
    requireNonEmptyArray(label, analysis.discriminatingPredictions, "discriminatingPredictions");
    validateSourceRefs(label, analysis.referenceIds ?? [], bibliographyIds, "referenceId");
  }
}

function validateTheory(theoryDir, bibliographyIds) {
  const manifestPath = path.join(theoryDir, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    addError(`${manifestPath}: missing theory manifest`);
    return null;
  }
  try {
    const manifest = readJson(manifestPath);
    requireFields(manifestPath, manifest, ["theoryId", "title", "version", "status", "publicationStatus"]);
    validateEnum(`${manifest.theoryId}.status`, manifest.status, VOCAB.reviewStatuses);
    validateEnum(`${manifest.theoryId}.publicationStatus`, manifest.publicationStatus, VOCAB.publicationStatuses);
    const variablesPath = path.join(theoryDir, "variables.json");
    const variables = readArray(variablesPath);
    const variableIds = new Set();
    for (const variable of variables) {
      const label = `${variablesPath}:${variable.variableId ?? "<unknown>"}`;
      requireFields(label, variable, ["variableId", "label", "description", "status", "versionIntroduced"]);
      if (variableIds.has(variable.variableId)) addError(`${variablesPath}: duplicate variableId ${variable.variableId}`);
      variableIds.add(variable.variableId);
    }
    for (const variable of variables) {
      validateTheoryVariableRecord(variable, variableIds, errors, `${variablesPath}:${variable.variableId}`);
    }
    const variableRegistry = buildTheoryVariableRegistry(variables);
    const propositionIds = new Set();
    const propositionsPath = path.join(theoryDir, "propositions.json");
    if (fs.existsSync(propositionsPath)) {
      const propositions = readArray(propositionsPath);
      for (const proposition of propositions) {
        const label = `${propositionsPath}:${proposition.propositionId ?? "<unknown>"}`;
        requireFields(label, proposition, ["propositionId", "text", "variableIds", "falsificationCriteria", "referenceIds"]);
        if (propositionIds.has(proposition.propositionId)) addError(`${propositionsPath}: duplicate propositionId ${proposition.propositionId}`);
        propositionIds.add(proposition.propositionId);
        for (const variableId of proposition.variableIds ?? []) {
          if (!variableRegistry.has(variableId)) addError(`${label}: variableId ${variableId} is not defined in variables.json`);
        }
        if ((proposition.falsificationCriteria ?? []).length === 0) addError(`${label}: falsificationCriteria must not be empty`);
        for (const sourceId of proposition.referenceIds ?? []) {
          if (!bibliographyIds.has(sourceId)) addError(`${label}: referenceId ${sourceId} lacks citation metadata in bibliography/sources.csl.json`);
        }
      }
    }

    validateConstructValidity(theoryDir, manifest, variables, propositionIds, bibliographyIds);

    const referencesPath = path.join(theoryDir, "references.json");
    if (fs.existsSync(referencesPath)) {
      const references = readArray(referencesPath);
      for (const reference of references) {
        const label = `${referencesPath}:${reference.sourceId ?? "<unknown>"}`;
        requireFields(label, reference, ["sourceId", "role"]);
        if (!bibliographyIds.has(reference.sourceId)) addError(`${label}: sourceId lacks citation metadata in bibliography/sources.csl.json`);
        for (const variableId of reference.supportsVariables ?? []) {
          if (!variableRegistry.has(variableId)) addError(`${label}: supportsVariables ${variableId} is not defined in variables.json`);
        }
        for (const propositionId of reference.supportsPropositions ?? []) {
          if (!propositionIds.has(propositionId)) addError(`${label}: supportsPropositions ${propositionId} is not defined in propositions.json`);
        }
      }
    }

    const rubricPath = path.join(theoryDir, "scoring-rubric.json");
    if (fs.existsSync(rubricPath)) {
      const rubric = readJson(rubricPath);
      if (rubric.valueSemantics !== "construct-magnitude") addError(`${rubricPath}: valueSemantics must be construct-magnitude`);
      if (rubric.unknownValue !== null) addError(`${rubricPath}: unknownValue must be null`);
      validateMagnitudeAnchors(rubric.scale?.anchors, errors, `${rubricPath}:scale.anchors`);
      for (const variableId of rubric.variables ?? []) {
        const variable = variableRegistry.get(variableId);
        if (!variable) {
          addError(`${rubricPath}: scoring-rubric variable ${variableId} is not defined in variables.json`);
        } else if (["deprecated", "retired"].includes(variable.status)) {
          addError(`${rubricPath}: scoring-rubric variable ${variableId} is ${variable.status}; use canonical active variables for new analytical records`);
        } else if (variable.measurementRole !== "scoreable") {
          addError(`${rubricPath}: scoring-rubric variable ${variableId} has measurementRole ${variable.measurementRole ?? "unspecified"}; only scoreable variables belong in scoring rubrics`);
        }
      }
    }
    const measurementSpecPath = path.join(theoryDir, "measurement-spec.json");
    if (fs.existsSync(measurementSpecPath)) {
      const measurementSpec = readJson(measurementSpecPath);
      requireFields(measurementSpecPath, measurementSpec, ["measurementSpecId", "theoryId", "version", "valueSemantics", "generalAnchors", "variables"]);
      if (!Object.hasOwn(measurementSpec, "unknownValue")) addError(`${measurementSpecPath}: missing required field unknownValue`);
      if (measurementSpec.theoryId !== manifest.theoryId) addError(`${measurementSpecPath}: theoryId ${measurementSpec.theoryId} does not match manifest ${manifest.theoryId}`);
      if (measurementSpec.valueSemantics !== "construct-magnitude") addError(`${measurementSpecPath}: valueSemantics must be construct-magnitude`);
      if (measurementSpec.unknownValue !== null) addError(`${measurementSpecPath}: unknownValue must be null`);
      validateMagnitudeAnchors(measurementSpec.generalAnchors, errors, `${measurementSpecPath}:generalAnchors`);
      const scoreableVariableIds = variables.filter((variable) => variable.measurementRole === "scoreable" && variable.status === "active").map((variable) => variable.variableId);
      for (const variableId of scoreableVariableIds) {
        const variableSpec = measurementSpec.variables?.[variableId];
        if (!variableSpec) {
          addError(`${measurementSpecPath}: missing measurement spec for scoreable variable ${variableId}`);
          continue;
        }
        validateMagnitudeAnchors(variableSpec.anchors, errors, `${measurementSpecPath}:variables.${variableId}.anchors`);
      }
    }
    return { ...manifest, variables: variableRegistry };
  } catch (error) {
    addError(error.message);
    return null;
  }
}

function validateCase(caseDir, theoryIds, theoryVariables, allowedDefinitionRefs, bibliographyIds, claimPromotionIndex) {
  const caseSlug = path.basename(caseDir);
  const casePath = path.join(caseDir, "case.json");
  if (!fs.existsSync(casePath)) {
    addError(`${casePath}: missing case.json`);
    return null;
  }

  try {
    const caseRecord = readJson(casePath);
    requireFields(casePath, caseRecord, ["caseId", "title", "subtype", "outcome", "outcomeClass", "publicationStatus", "reviewStatus", "sacredPoliticalOrderId", "sacredPoliticalOrderName", "sacredPoliticalOrderDefinition", "caseSelectionRole", "selectionRationale", "theoryTest", "unitClass", "caseType", "designStratum", "comparabilityGroup", "evaluationRole", "holdoutStatus", "samplingMetadata"]);
    validateEnum(`${caseRecord.caseId}.outcome`, caseRecord.outcome, VOCAB.outcomes);
    validateEnum(`${caseRecord.caseId}.outcomeClass`, caseRecord.outcomeClass, VOCAB.outcomes);
    validateEnum(`${caseRecord.caseId}.reviewStatus`, caseRecord.reviewStatus, VOCAB.reviewStatuses);
    validateEnum(`${caseRecord.caseId}.publicationStatus`, caseRecord.publicationStatus, VOCAB.publicationStatuses);
    validateEnum(`${caseRecord.caseId}.caseSelectionRole`, caseRecord.caseSelectionRole, VOCAB.caseSelectionRoles);
    validateEnum(`${caseRecord.caseId}.unitClass`, caseRecord.unitClass, VOCAB.unitClasses);
    validateEnum(`${caseRecord.caseId}.caseType`, caseRecord.caseType, VOCAB.caseTypes);
    validateEnum(`${caseRecord.caseId}.evaluationRole`, caseRecord.evaluationRole, VOCAB.evaluationRoles);
    validateEnum(`${caseRecord.caseId}.holdoutStatus`, caseRecord.holdoutStatus, VOCAB.holdoutStatuses);
    if (caseRecord.evaluationRole === "holdout-evaluation" && caseRecord.holdoutStatus === "not-held-out") addError(`${caseRecord.caseId}: holdout-evaluation cases must not use holdoutStatus not-held-out`);
    if (caseRecord.holdoutStatus === "sealed" && !caseRecord.holdoutProtocol) addError(`${caseRecord.caseId}: sealed holdout requires holdoutProtocol`);
    if (caseRecord.outcomeClass !== caseRecord.outcome) addError(`${caseRecord.caseId}: outcomeClass must match outcome until outcome migration completes`);
    if (!caseRecord.designStratum?.startsWith(`${caseRecord.unitClass}:`)) addError(`${caseRecord.caseId}: designStratum must start with unitClass`);
    if (VOCAB.outcomes.has(caseRecord.designStratum?.split(":").at(-1))) addError(`${caseRecord.caseId}: designStratum must not encode an outcome class`);
    if (caseRecord.comparabilityGroup !== caseRecord.designStratum) addError(`${caseRecord.caseId}: comparabilityGroup must equal pre-outcome designStratum`);
    if (!caseRecord.samplingMetadata?.targetPopulation || !Array.isArray(caseRecord.samplingMetadata?.inclusionCriteria) || !Array.isArray(caseRecord.samplingMetadata?.exclusionCriteria)) {
      addError(`${caseRecord.caseId}: samplingMetadata requires targetPopulation, inclusionCriteria, and exclusionCriteria`);
    }
    if (Object.hasOwn(caseRecord, "sacredPoliticalOrderStrength") || Object.hasOwn(caseRecord, "sacredPoliticalOrderStrengthRationale")) {
      addError(`${caseRecord.caseId}: case-level analytical score fields are prohibited; preserve old values only under legacyScaffold with analyticalUse prohibited`);
    }
    if (caseRecord.legacyScaffold?.analyticalUse !== undefined && caseRecord.legacyScaffold.analyticalUse !== "prohibited") {
      addError(`${caseRecord.caseId}: legacyScaffold.analyticalUse must be prohibited`);
    }

    const sourcePack = readJson(path.join(caseDir, "source-pack.json"));
    requireFields(path.join(caseDir, "source-pack.json"), sourcePack, ["caseId", "sources"]);
    if (!Array.isArray(sourcePack.sources)) addError(`${caseDir}/source-pack.json: sources must be an array`);

    const passages = readArray(path.join(caseDir, "passages.json"));
    const claims = readArray(path.join(caseDir, "claims.json"));
    const interpretations = readArray(path.join(caseDir, "interpretations.json"));
    const scores = readArray(path.join(caseDir, "scores.json"));
    const counterclaims = readArray(path.join(caseDir, "counterclaims.json"));
    const searchLogs = readArray(path.join(caseDir, "search-log.json"));
    const rivalExplanations = readArray(path.join(caseDir, "rival-explanations.json"));

    if (caseRecord.caseId !== caseSlug) addError(`${casePath}: caseId ${caseRecord.caseId} does not match directory slug ${caseSlug}`);
    if (sourcePack.caseId !== caseRecord.caseId) addError(`${caseDir}/source-pack.json: caseId ${sourcePack.caseId} does not match ${caseRecord.caseId}`);

    const sourceIds = new Set(sourcePack.sources.map((source) => source.sourceId));
    const passageIds = new Set(passages.map((passage) => passage.passageId));
    const claimIds = new Set(claims.map((claim) => claim.claimId));
    const interpretationIds = new Set(interpretations.map((interpretation) => interpretation.interpretationId));
    const claimsById = new Map(claims.map((claim) => [claim.claimId, claim]));
    const interpretationsById = new Map(interpretations.map((interpretation) => [interpretation.interpretationId, interpretation]));
    const searchLogIds = new Set();
    const referencedPassageIds = new Set();
    const referencedClaimIds = new Set();
    const scoredInterpretationIds = new Set();

    if (caseRecord.holdoutStatus === "sealed") {
      if (claims.length > 0 || interpretations.length > 0 || scores.length > 0) {
        addError(`${caseRecord.caseId}: sealed holdout cannot contain claims, interpretations, or scores`);
      }
      if (caseRecord.outcome && caseRecord.legacyScaffold?.sacredPoliticalOrderStrengthRationale?.toLowerCase().includes("outcome")) {
        addWarning(`${caseRecord.caseId}: sealed holdout retains scaffold outcome metadata; keep it out of theory-development workflows until opened`);
      }
    }

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
        referencedPassageIds.add(passageId);
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
      validateTheoryVariableReference(interpretation, "variableId", theoryVariables, errors, warnings, `${caseDir}/interpretations.json:${interpretation.interpretationId}`);
      for (const claimId of interpretation.claimIds ?? []) {
        referencedClaimIds.add(claimId);
        if (!claimIds.has(claimId)) addError(`${interpretation.interpretationId}: claim ${claimId} is missing`);
        const claim = claimsById.get(claimId);
        if (claim?.caseId !== interpretation.caseId) addError(`${interpretation.interpretationId}: claim ${claimId} caseId ${claim?.caseId} does not match interpretation caseId ${interpretation.caseId}`);
      }
      if (interpretation.sacrificeHealth && !interpretation.interpretation) addError(`${interpretation.interpretationId}: sacrifice-health classification lacks interpretation notes`);
    }

    for (const score of scores) {
      requireFields(`${caseDir}/scores.json:${score.scoreId}`, score, ["scoreId", "caseId", "theoryId", "variableId", "interpretationId", "valueSemantics", "confidence", "reviewStatus", "scoreOrigin", "outcomeVisibleToCoder", "includeInSubstantiveAnalysis"]);
      validateEnum(`${score.scoreId}.reviewStatus`, score.reviewStatus, VOCAB.reviewStatuses);
      validateEnum(`${score.scoreId}.publicationStatus`, score.publicationStatus, VOCAB.publicationStatuses);
      scoredInterpretationIds.add(score.interpretationId);
      if (!interpretationIds.has(score.interpretationId)) addError(`${score.scoreId}: interpretation ${score.interpretationId} is missing`);
      const interpretation = interpretationsById.get(score.interpretationId);
      if (interpretation) {
        if (score.caseId !== interpretation.caseId) addError(`${score.scoreId}: caseId ${score.caseId} does not match interpretation ${score.interpretationId} caseId ${interpretation.caseId}`);
        if (score.theoryId !== interpretation.theoryId) addError(`${score.scoreId}: theoryId ${score.theoryId} does not match interpretation ${score.interpretationId} theoryId ${interpretation.theoryId}`);
        if (score.variableId !== interpretation.variableId) addError(`${score.scoreId}: variableId ${score.variableId} does not match interpretation ${score.interpretationId} variableId ${interpretation.variableId}`);
        if (score.codebookVersion && interpretation.codebookVersion && score.codebookVersion !== interpretation.codebookVersion) addError(`${score.scoreId}: codebookVersion ${score.codebookVersion} does not match interpretation ${score.interpretationId} codebookVersion ${interpretation.codebookVersion}`);
      }
      validateTheoryVariableReference(score, "variableId", theoryVariables, errors, warnings, `${caseDir}/scores.json:${score.scoreId}`);
      validateScoreableVariableReference(score, "variableId", theoryVariables, errors, `${caseDir}/scores.json:${score.scoreId}`);
      validateDefinitionRefs(score.definitionRefs, allowedDefinitionRefs, errors, `${caseDir}/scores.json:${score.scoreId}`);
      validateScoreSemantics(score, errors, warnings, `${caseDir}/scores.json:${score.scoreId}`);
      validateScoreIndependence(score, errors, warnings, `${caseDir}/scores.json:${score.scoreId}`, isPublicFacing(score.publicationStatus), { holdoutStatus: caseRecord.holdoutStatus });
      validateScoreClaimPromotion(score, interpretationsById.get(score.interpretationId), claimsById, claimPromotionIndex, errors, `${caseDir}/scores.json:${score.scoreId}`);
      if (isPublicFacing(score.publicationStatus) && !["human-reviewed", "approved"].includes(score.reviewStatus)) addError(`${score.scoreId}: public-facing score references an interpretation that is not human-reviewed`);
      if (score.publicationStatus === "published" && !score.confidence?.rationale) addError(`${score.scoreId}: published score lacks confidence rationale`);
      if (score.confidence?.value < 0.5) addWarning(`${score.scoreId}: score confidence is below 0.5`);
      if (typeof score.value === "number" && score.value >= 4 && score.variableId === "sacred-political-order-strength" && !score.confidence?.rationale) addWarning(`${score.scoreId}: high sacred-political-order score lacks score-level rationale`);
      if (typeof score.value === "number" && score.value >= 4 && ["sacralization", "collective-immortality", "sacred-enemy", "pathology", "corrigibility"].includes(score.variableId) && !(score.definitionRefs ?? []).includes(score.variableId)) addWarning(`${score.scoreId}: high ${score.variableId} score should cite its definition`);
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

    for (const searchLog of searchLogs) {
      requireFields(`${caseDir}/search-log.json:${searchLog.searchId ?? "<unknown>"}`, searchLog, ["searchId", "date", "query", "database", "purpose"]);
      validateSearchLogRecord(searchLog, errors, `${caseDir}/search-log.json:${searchLog.searchId ?? "<unknown>"}`);
      if (searchLogIds.has(searchLog.searchId)) addError(`${caseDir}/search-log.json: duplicate searchId ${searchLog.searchId}`);
      searchLogIds.add(searchLog.searchId);
      validateEnum(`${searchLog.searchId}.purpose`, searchLog.purpose, VOCAB.searchPurposes);
      for (const sourceId of searchLog.includedSourceIds ?? []) {
        if (!sourceIds.has(sourceId)) addError(`${searchLog.searchId}: includedSourceId ${sourceId} is not in source-pack.json`);
      }
    }

    for (const rival of rivalExplanations) {
      requireFields(`${caseDir}/rival-explanations.json:${rival.rivalExplanationId ?? "<unknown>"}`, rival, ["rivalExplanationId", "caseId", "explanation", "targetClaimIds", "supportingEvidenceIds", "contradictingEvidenceIds", "discriminatingEvidence", "reviewStatus", "publicationStatus"]);
      validateEnum(`${rival.rivalExplanationId}.reviewStatus`, rival.reviewStatus, VOCAB.reviewStatuses);
      validateEnum(`${rival.rivalExplanationId}.publicationStatus`, rival.publicationStatus, VOCAB.publicationStatuses);
      if (rival.caseId !== caseRecord.caseId) addError(`${rival.rivalExplanationId}: caseId does not match ${caseRecord.caseId}`);
      for (const claimId of rival.targetClaimIds ?? []) {
        if (!claimIds.has(claimId)) addError(`${rival.rivalExplanationId}: target claim ${claimId} is missing`);
      }
      const counterclaimIds = new Set(counterclaims.map((counterclaim) => counterclaim.counterclaimId));
      const evidenceIds = new Set([...passageIds, ...sourceIds, ...searchLogIds, ...counterclaimIds]);
      for (const evidenceId of [...(rival.supportingEvidenceIds ?? []), ...(rival.contradictingEvidenceIds ?? [])]) {
        if (!evidenceIds.has(evidenceId)) addError(`${rival.rivalExplanationId}: evidence id ${evidenceId} is not a passage, source, search log, or counterclaim`);
      }
      if ((rival.supportingEvidenceIds ?? []).length === 0 || (rival.contradictingEvidenceIds ?? []).length === 0) {
        addWarning(`${rival.rivalExplanationId}: rival explanation should include both supporting and contradicting evidence`);
      }
    }

    for (const passage of passages) {
      if (!referencedPassageIds.has(passage.passageId)) {
        addCaseEvidenceIssue(
          caseRecord,
          `passage ${passage.passageId} is not cited by any claim derivedFrom`,
          isPublicFacing(caseRecord.publicationStatus) || shouldErrorOnGoldEvidenceOrphan(caseRecord)
        );
      }
    }

    for (const claim of claims) {
      if (!referencedClaimIds.has(claim.claimId)) {
        addCaseEvidenceIssue(
          caseRecord,
          `claim ${claim.claimId} is not referenced by any interpretation claimIds`,
          (caseRecord.goldCase && isPublicFacing(caseRecord.publicationStatus)) || shouldErrorOnGoldEvidenceOrphan(caseRecord)
        );
      }
    }

    for (const interpretation of interpretations) {
      if (!scoredInterpretationIds.has(interpretation.interpretationId)) {
        addCaseEvidenceIssue(
          caseRecord,
          `interpretation ${interpretation.interpretationId} is not covered by any score interpretationId`,
          caseRecord.publicationStatus === "published" || shouldErrorOnGoldEvidenceOrphan(caseRecord)
        );
      }
    }

    if (caseRecord.goldCase && (passages.length === 0 || claims.length === 0 || interpretations.length === 0 || scores.length === 0)) {
      addError(`${caseRecord.caseId}: gold case is missing a complete evidence chain`);
    }
    if (caseRecord.goldCase && !hasHumanReviewedScore(scores)) {
      addCaseEvidenceIssue(
        caseRecord,
        "gold case has no human-reviewed or approved score",
        isPublicFacing(caseRecord.publicationStatus)
      );
    }
    if (sourcePack.sources.length === 1) addWarning(`${caseRecord.caseId}: case has only one source`);
    if (counterclaims.length === 0) addWarning(`${caseRecord.caseId}: case has no counterevidence yet`);

    return { caseRecord, caseSlug, sourcePack, passages, claims, interpretations, scores, counterclaims, searchLogs, rivalExplanations };
  } catch (error) {
    addError(error.message);
    return null;
  }
}

const schemaRegistryResult = validateSchemaRegistry(root);
for (const e of schemaRegistryResult.errors) errors.push(e);

const bibliographyPath = path.join(root, "bibliography", "sources.csl.json");
const bibliography = fs.existsSync(bibliographyPath) ? readJson(bibliographyPath) : [];
const bibliographyIds = new Set(bibliography.map((source) => source.id));
const theoryDirs = listDirs(path.join(root, "theories")).map((name) => path.join(root, "theories", name));
const theories = theoryDirs.map((theoryDir) => validateTheory(theoryDir, bibliographyIds)).filter(Boolean);
const theoryIds = new Set(theories.map((theory) => theory.theoryId));
const theoryVariables = new Map(theories.map((theory) => [theory.theoryId, theory.variables]));
const allowedDefinitionRefs = buildDefinitionRefs(theoryVariables, VOCAB.mechanisms);

const caseDirs = listDirs(path.join(root, "data", "cases")).map((name) => path.join(root, "data", "cases", name));
const caseIds = new Set(caseDirs.map((dir) => path.basename(dir)));
const claimPromotionIndex = buildClaimPromotionIndex(root);
const cases = caseDirs.map((caseDir) => validateCase(caseDir, theoryIds, theoryVariables, allowedDefinitionRefs, bibliographyIds, claimPromotionIndex)).filter(Boolean);
validateRepositoryGraph(cases, errors);
const searchLogIndex = buildSearchLogIndex(cases);
for (const searchId of searchLogIndex.duplicateIds) errors.push(`search-log: duplicate repository searchId ${searchId}; namespace search IDs by case or corpus`);

const codingPacketResult = validateCodingPackets(root, cases);
for (const e of codingPacketResult.errors) errors.push(e);

const evidenceModuleResult = validateEvidenceModules(root, caseIds);
for (const e of evidenceModuleResult.errors) errors.push(e);
for (const w of evidenceModuleResult.warnings) warnings.push(w);

const corpusRegistryResult = validateCorpusRegistry(root, evidenceModuleResult.moduleIds, caseIds);
for (const e of corpusRegistryResult.errors) errors.push(e);
for (const w of corpusRegistryResult.warnings) warnings.push(w);

const claimPromotionResult = validateClaimPromotion(root, evidenceModuleResult.moduleIds, caseIds, searchLogIndex);
for (const e of claimPromotionResult.errors) errors.push(e);
for (const w of claimPromotionResult.warnings) warnings.push(w);

const migrationManifestResult = validateMigrationManifest(root);
for (const e of migrationManifestResult.errors) errors.push(e);
for (const w of migrationManifestResult.warnings) warnings.push(w);

validateGeneratedChainPagesAreUntracked();

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validation passed for ${theories.length} theories, ${cases.length} cases, ${evidenceModuleResult.moduleIds.size} evidence modules.`);
