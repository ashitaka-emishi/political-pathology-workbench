import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateModuleRecord } from "../src-js/validate/validate-evidence-modules.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fixturesDir = path.join(__dirname, "fixtures", "evidence-modules");

const caseIds = new Set(
  fs.readdirSync(path.join(root, "data", "cases"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
);

let failures = 0;

for (const fileName of fs.readdirSync(fixturesDir).sort()) {
  const expectValid = fileName.startsWith("valid-");
  const expectInvalid = fileName.startsWith("invalid-");
  if (!expectValid && !expectInvalid) continue;

  const fixturePath = path.join(fixturesDir, fileName);
  const moduleRecord = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  const errors = [];
  validateModuleRecord(moduleRecord, new Set(), caseIds, errors, fixturePath);

  const passed = expectValid ? errors.length === 0 : errors.length > 0;
  if (passed) {
    console.log(`PASS ${fileName}`);
  } else {
    failures += 1;
    console.error(`FAIL ${fileName}: expected ${expectValid ? "no errors" : "at least one error"}, got ${JSON.stringify(errors)}`);
  }
}

if (failures > 0) {
  console.error(`${failures} fixture(s) failed.`);
  process.exit(1);
}

console.log("All evidence-module fixtures validated as expected.");
