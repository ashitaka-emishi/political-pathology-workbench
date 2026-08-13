import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readJson } from "../src-js/validate/json.js";
import { buildDefinitionRefs, buildTheoryVariableRegistry, validateDefinitionRefs, validateMagnitudeAnchors, validateScoreableVariableReference, validateTheoryVariableReference } from "../src-js/validate/validate-theory-ontology.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fixturesDir = path.join(__dirname, "fixtures", "theory-ontology");

const theoryVariables = new Map();
for (const slug of fs.readdirSync(path.join(root, "theories")).sort()) {
  const theoryDir = path.join(root, "theories", slug);
  if (!fs.statSync(theoryDir).isDirectory()) continue;
  const manifest = readJson(path.join(theoryDir, "manifest.json"));
  const variables = readJson(path.join(theoryDir, "variables.json"));
  theoryVariables.set(manifest.theoryId, buildTheoryVariableRegistry(variables));
}

const mechanismIds = new Set([
  "collective-immortality-to-sacrifice",
  "sacred-enemy-escalation",
  "institutional-self-preservation",
  "anti-sacrificial-restraint",
  "pluralist-reordering",
  "constitutional-containment",
  "memory-driven-restraint",
  "legitimacy-collapse",
  "institutional-fragmentation",
  "symbolic-transformation",
  "frozen-pathology"
]);
const allowedDefinitionRefs = buildDefinitionRefs(theoryVariables, mechanismIds);

let failures = 0;

for (const fileName of fs.readdirSync(fixturesDir).sort()) {
  const expectValid = fileName.startsWith("valid-");
  const expectInvalid = fileName.startsWith("invalid-");
  if (!expectValid && !expectInvalid) continue;

  const fixturePath = path.join(fixturesDir, fileName);
  const record = readJson(fixturePath);
  const errors = [];
  const warnings = [];
  validateTheoryVariableReference(record, "variableId", theoryVariables, errors, warnings, fixturePath);
  validateDefinitionRefs(record.definitionRefs, allowedDefinitionRefs, errors, fixturePath);

  const passed = expectValid ? errors.length === 0 : errors.length > 0;
  if (passed) {
    console.log(`PASS ${fileName}`);
  } else {
    failures += 1;
    console.error(`FAIL ${fileName}: expected ${expectValid ? "no errors" : "at least one error"}, got ${JSON.stringify(errors)}`);
  }
}

{
  const errors = [];
  validateMagnitudeAnchors({
    "0": "No evidence in current record.",
    "1": "Marginal presence.",
    "2": "Low presence.",
    "3": "Moderate presence.",
    "4": "Strong presence.",
    "5": "Maximal presence."
  }, errors, "invalid-evidence-anchor");
  if (errors.length > 0) {
    console.log("PASS invalid-evidence-strength-anchor");
  } else {
    failures += 1;
    console.error("FAIL invalid-evidence-strength-anchor: expected at least one error");
  }
}

{
  const errors = [];
  validateScoreableVariableReference({
    theoryId: "general-theory-political-pathology-v1",
    variableId: "symbolic-order"
  }, "variableId", theoryVariables, errors, "invalid-non-scoreable-score");
  if (errors.length > 0) {
    console.log("PASS invalid-non-scoreable-score-variable");
  } else {
    failures += 1;
    console.error("FAIL invalid-non-scoreable-score-variable: expected at least one error");
  }
}

if (failures > 0) {
  console.error(`${failures} fixture(s) failed.`);
  process.exit(1);
}

console.log("All theory-ontology fixtures validated as expected.");
