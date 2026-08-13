import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readJson } from "../src-js/validate/json.js";
import { validateTheoryVariableRecord } from "../src-js/validate/validate-theory-ontology.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "fixtures", "variable-lifecycle");

let failures = 0;

for (const fileName of fs.readdirSync(fixturesDir).sort()) {
  const expectValid = fileName.startsWith("valid-");
  const expectInvalid = fileName.startsWith("invalid-");
  if (!expectValid && !expectInvalid) continue;

  const fixturePath = path.join(fixturesDir, fileName);
  const fixture = readJson(fixturePath);
  const variableIds = new Set(fixture.variableIds);
  const errors = [];
  validateTheoryVariableRecord(fixture.variable, variableIds, errors, fixturePath);

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

console.log("All variable-lifecycle fixtures validated as expected.");
