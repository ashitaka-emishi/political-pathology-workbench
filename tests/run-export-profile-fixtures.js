import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const profilesDir = path.join(root, "site", "data", "export-profiles");
const measurementStatus = JSON.parse(fs.readFileSync(path.join(root, "site", "data", "measurement-status.json"), "utf8"));

function readProfile(name) {
  return JSON.parse(fs.readFileSync(path.join(profilesDir, `${name}.json`), "utf8"));
}

let failures = 0;
function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`FAIL ${message}`);
  }
}

const coderBlinded = readProfile("coder-blinded");
for (const record of coderBlinded.cases) {
  for (const forbidden of ["outcome", "outcomeClass", "goldCase", "caseSelectionRole", "evaluationRole", "holdoutStatus", "legacyScaffold"]) {
    assert(!(forbidden in record), `coder-blinded leaks ${forbidden} for ${record.caseId}`);
  }
}

const publicProfile = readProfile("public");
for (const record of publicProfile.cases.filter((caseRecord) => caseRecord.outcomeRedacted)) {
  assert(!("outcome" in record), `public profile leaks sealed outcome for ${record.caseId}`);
  assert(!("outcomeClass" in record), `public profile leaks sealed outcomeClass for ${record.caseId}`);
}

assert(Number.isInteger(measurementStatus.storedScoreRecordCount), "measurement status has stored score count");
assert(Number.isInteger(measurementStatus.substantiveScoreCount), "measurement status has substantive score count");
assert(measurementStatus.storedScoreRecordCount >= measurementStatus.substantiveScoreCount, "stored score count is not below substantive count");
assert(measurementStatus.legacyScoreCount === (measurementStatus.scoreCountByOrigin.legacy ?? 0), "legacy score count matches origin counts");

if (failures > 0) process.exit(1);
console.log("All export-profile leakage fixtures validated as expected.");
