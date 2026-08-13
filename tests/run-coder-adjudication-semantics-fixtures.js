import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateAdjudicationSemantics, validateCoderScoreSemantics } from "../src-js/validate/validate-coder-adjudication-semantics.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtures = JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures", "coder-adjudication-semantics", "fixtures.json"), "utf8"));

let failures = 0;
for (const fixture of fixtures) {
  const errors = [];
  if (fixture.kind === "coder-score") {
    validateCoderScoreSemantics(fixture.record, errors, fixture.name);
  } else {
    validateAdjudicationSemantics(fixture.record, errors, fixture.name);
  }
  const passed = fixture.valid ? errors.length === 0 : errors.some((error) => error.includes(fixture.expectedError));
  if (passed) {
    console.log(`PASS ${fixture.name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${fixture.name}: ${JSON.stringify(errors)}`);
  }
}

if (failures > 0) process.exit(1);
console.log("All coder/adjudication semantics fixtures validated as expected.");
