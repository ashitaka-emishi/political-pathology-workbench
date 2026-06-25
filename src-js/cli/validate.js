import fs from "node:fs";
import path from "node:path";
import { readJson, requireFields } from "../validate/json.js";

const root = process.cwd();
const errors = [];
const warnings = [];

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

function validateCase(caseDir, theoryIds) {
  const casePath = path.join(caseDir, "case.json");
  if (!fs.existsSync(casePath)) {
    addError(`${casePath}: missing case.json`);
    return null;
  }

  try {
    const caseRecord = readJson(casePath);
    requireFields(casePath, caseRecord, ["caseId", "title", "subtype", "outcome", "publicationStatus", "reviewStatus"]);

    const sourcePack = readJson(path.join(caseDir, "source-pack.json"));
    requireFields(path.join(caseDir, "source-pack.json"), sourcePack, ["caseId", "sources"]);
    if (!Array.isArray(sourcePack.sources)) addError(`${caseDir}/source-pack.json: sources must be an array`);

    const passages = readArray(path.join(caseDir, "passages.json"));
    const claims = readArray(path.join(caseDir, "claims.json"));
    const interpretations = readArray(path.join(caseDir, "interpretations.json"));
    const scores = readArray(path.join(caseDir, "scores.json"));

    const sourceIds = new Set(sourcePack.sources.map((source) => source.sourceId));
    const passageIds = new Set(passages.map((passage) => passage.passageId));
    const claimIds = new Set(claims.map((claim) => claim.claimId));
    const interpretationIds = new Set(interpretations.map((interpretation) => interpretation.interpretationId));

    for (const passage of passages) {
      requireFields(`${caseDir}/passages.json:${passage.passageId}`, passage, ["passageId", "caseId", "sourceId", "text", "evidenceRole", "reviewStatus"]);
      if (passage.caseId !== caseRecord.caseId) addError(`${passage.passageId}: caseId does not match ${caseRecord.caseId}`);
      if (!sourceIds.has(passage.sourceId)) addError(`${passage.passageId}: sourceId ${passage.sourceId} is not in source-pack.json`);
    }

    for (const claim of claims) {
      requireFields(`${caseDir}/claims.json:${claim.claimId}`, claim, ["claimId", "caseId", "claim", "derivedFrom", "createdBy", "reviewStatus"]);
      for (const passageId of claim.derivedFrom ?? []) {
        if (!passageIds.has(passageId)) addError(`${claim.claimId}: derivedFrom passage ${passageId} is missing`);
      }
      if (claim.createdBy === "ai" && ["accepted", "approved", "published"].includes(claim.publicationStatus)) {
        addWarning(`${claim.claimId}: AI-created claim is public-facing; verify explicit human review labels`);
      }
    }

    for (const interpretation of interpretations) {
      requireFields(`${caseDir}/interpretations.json:${interpretation.interpretationId}`, interpretation, ["interpretationId", "caseId", "claimIds", "theoryId", "variableId", "interpretation", "reviewStatus"]);
      if (!theoryIds.has(interpretation.theoryId)) addError(`${interpretation.interpretationId}: unknown theoryId ${interpretation.theoryId}`);
      for (const claimId of interpretation.claimIds ?? []) {
        if (!claimIds.has(claimId)) addError(`${interpretation.interpretationId}: claim ${claimId} is missing`);
      }
    }

    for (const score of scores) {
      requireFields(`${caseDir}/scores.json:${score.scoreId}`, score, ["scoreId", "caseId", "theoryId", "variableId", "interpretationId", "value", "confidence", "reviewStatus"]);
      if (!interpretationIds.has(score.interpretationId)) addError(`${score.scoreId}: interpretation ${score.interpretationId} is missing`);
      if (typeof score.value !== "number" || score.value < 0 || score.value > 5) addError(`${score.scoreId}: value must be a number from 0 to 5`);
    }

    if (caseRecord.goldCase && (passages.length === 0 || claims.length === 0 || interpretations.length === 0 || scores.length === 0)) {
      addWarning(`${caseRecord.caseId}: gold case is missing a complete evidence chain`);
    }

    return { caseRecord, passages, claims, interpretations, scores };
  } catch (error) {
    addError(error.message);
    return null;
  }
}

const theoryDirs = listDirs(path.join(root, "theories")).map((name) => path.join(root, "theories", name));
const theories = theoryDirs.map(validateTheory).filter(Boolean);
const theoryIds = new Set(theories.map((theory) => theory.theoryId));

const caseDirs = listDirs(path.join(root, "data", "cases")).map((name) => path.join(root, "data", "cases", name));
const cases = caseDirs.map((caseDir) => validateCase(caseDir, theoryIds)).filter(Boolean);

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validation passed for ${theories.length} theories and ${cases.length} cases.`);
