import fs from "node:fs";
import path from "node:path";
import { readJson } from "../validate/json.js";
import { deriveAnalyticalEligibility } from "../validate/validate-score-semantics.js";

const root = process.cwd();
const generatedDir = path.join(root, "data", "generated");
const siteDataDir = path.join(root, "site", "data");

fs.mkdirSync(siteDataDir, { recursive: true });

const caseIndex = readJson(path.join(generatedDir, "case-index.json"));
const theoryIndex = readJson(path.join(generatedDir, "theory-index.json"));
const scores = readJson(path.join(generatedDir, "all-scores.json"));
const counterclaims = readJson(path.join(generatedDir, "all-counterclaims.json"));

function countBy(records, field) {
  return records.reduce((counts, record) => {
    const key = record[field] ?? "missing";
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function caseForScore(score) {
  return caseIndex.find((record) => record.caseId === score.caseId);
}

const scoreEligibility = scores.map((score) => {
  const eligibility = deriveAnalyticalEligibility(score, { holdoutStatus: caseForScore(score)?.holdoutStatus });
  return { score, eligibility };
});

const measurementStatus = {
  storedScoreRecordCount: scores.length,
  substantiveScoreCount: scoreEligibility.filter(({ eligibility }) => eligibility.eligible).length,
  legacyScoreCount: scores.filter((score) => score.scoreOrigin === "legacy").length,
  independentlyCodedScoreCount: scores.filter((score) => score.scoreOrigin === "independent-coding").length,
  scoreCountByOrigin: countBy(scores, "scoreOrigin"),
  scoreCountByReviewStatus: countBy(scores, "reviewStatus"),
  analyticallyEligibleCount: scoreEligibility.filter(({ eligibility }) => eligibility.eligible).length,
  analyticallyExcludedCount: scoreEligibility.filter(({ eligibility }) => !eligibility.eligible).length,
  exclusionReasons: scoreEligibility.reduce((counts, { eligibility }) => {
    for (const reason of eligibility.reasons) counts[reason] = (counts[reason] ?? 0) + 1;
    return counts;
  }, {})
};

const payload = {
  status: "draft-research-repository",
  generatedAt: "repository-state",
  caseCount: caseIndex.length,
  theoryCount: theoryIndex.length,
  storedScoreRecordCount: scores.length,
  substantiveScoreCount: measurementStatus.substantiveScoreCount,
  legacyScoreCount: measurementStatus.legacyScoreCount,
  independentlyCodedScoreCount: measurementStatus.independentlyCodedScoreCount,
  counterclaimCount: counterclaims.length,
  measurementStatus,
  cases: caseIndex,
  theories: theoryIndex
};

fs.writeFileSync(path.join(siteDataDir, "workbench-summary.json"), `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(path.join(siteDataDir, "measurement-status.json"), `${JSON.stringify(measurementStatus, null, 2)}\n`);

const exportProfilesDir = path.join(siteDataDir, "export-profiles");
fs.mkdirSync(exportProfilesDir, { recursive: true });

function omit(record, fields) {
  const clone = { ...record };
  for (const field of fields) delete clone[field];
  return clone;
}

const sealedSafeCases = caseIndex.map((record) => {
  if (record.holdoutStatus !== "sealed") return record;
  return { ...omit(record, ["outcome", "outcomeClass"]), outcomeRedacted: true };
});

const profiles = {
  "internal-research": {
    profileId: "internal-research",
    distributionStatus: "internal",
    cases: caseIndex,
    measurementStatus
  },
  "coder-blinded": {
    profileId: "coder-blinded",
    distributionStatus: "draft-human-gated",
    cases: caseIndex.map((record) => omit(record, ["outcome", "outcomeClass", "goldCase", "caseSelectionRole", "evaluationRole", "holdoutStatus"])),
    measurementStatus
  },
  "review-preview": {
    profileId: "review-preview",
    distributionStatus: "internal-review",
    cases: sealedSafeCases,
    measurementStatus
  },
  "public": {
    profileId: "public",
    distributionStatus: "human-gated-public-preview",
    cases: sealedSafeCases,
    measurementStatus
  },
  "published-analysis": {
    profileId: "published-analysis",
    distributionStatus: "human-gated-published-analysis",
    cases: sealedSafeCases.filter((record) => record.publicationStatus === "published"),
    measurementStatus
  }
};

for (const [profileId, profile] of Object.entries(profiles)) {
  fs.writeFileSync(path.join(exportProfilesDir, `${profileId}.json`), `${JSON.stringify(profile, null, 2)}\n`);
}
console.log("Generated site/data/workbench-summary.json");
console.log("Generated site/data/measurement-status.json and export profiles");
