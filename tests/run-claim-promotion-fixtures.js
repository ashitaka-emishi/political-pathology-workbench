import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validatePromotionRecord } from "../src-js/validate/validate-claim-promotion.js";
import { validateDraftClaimRecord } from "../src-js/validate/validate-claim-promotion.js";
import { validateEvidenceModules } from "../src-js/validate/validate-evidence-modules.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fixturesBase = path.join(__dirname, "fixtures", "claim-promotion");

const caseIds = new Set(
  fs.readdirSync(path.join(root, "data", "cases"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
);

const { moduleIds } = validateEvidenceModules(root, caseIds);

let failures = 0;

function runDir(dir, validate) {
  for (const fileName of fs.readdirSync(dir).sort()) {
    const expectValid = fileName.startsWith("valid-");
    const expectInvalid = fileName.startsWith("invalid-");
    if (!expectValid && !expectInvalid) continue;

    const fixturePath = path.join(dir, fileName);
    const record = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
    const errors = [];
    const warnings = [];
    validate(record, new Set(), moduleIds, caseIds, errors, warnings, fixturePath);

    const passed = expectValid ? errors.length === 0 : errors.length > 0;
    if (passed) {
      console.log(`PASS ${fileName}`);
    } else {
      failures += 1;
      console.error(`FAIL ${fileName}: expected ${expectValid ? "no errors" : "at least one error"}, got ${JSON.stringify(errors)}`);
    }
  }
}

runDir(path.join(fixturesBase, "promotion"), validatePromotionRecord);
runDir(path.join(fixturesBase, "draft-claims"), validateDraftClaimRecord);

if (failures > 0) {
  console.error(`${failures} fixture(s) failed.`);
  process.exit(1);
}

console.log("All claim-promotion fixtures validated as expected.");
