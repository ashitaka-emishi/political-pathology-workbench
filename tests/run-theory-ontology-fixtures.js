import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readJson } from "../src-js/validate/json.js";
import { buildDefinitionRefs, validateDefinitionRefs, validateTheoryVariableReference } from "../src-js/validate/validate-theory-ontology.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fixturesDir = path.join(__dirname, "fixtures", "theory-ontology");

const theoryVariableIds = new Map();
for (const slug of fs.readdirSync(path.join(root, "theories")).sort()) {
  const theoryDir = path.join(root, "theories", slug);
  if (!fs.statSync(theoryDir).isDirectory()) continue;
  const manifest = readJson(path.join(theoryDir, "manifest.json"));
  const variables = readJson(path.join(theoryDir, "variables.json"));
  theoryVariableIds.set(manifest.theoryId, new Set(variables.map((variable) => variable.variableId)));
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
const allowedDefinitionRefs = buildDefinitionRefs(theoryVariableIds, mechanismIds);

let failures = 0;

for (const fileName of fs.readdirSync(fixturesDir).sort()) {
  const expectValid = fileName.startsWith("valid-");
  const expectInvalid = fileName.startsWith("invalid-");
  if (!expectValid && !expectInvalid) continue;

  const fixturePath = path.join(fixturesDir, fileName);
  const record = readJson(fixturePath);
  const errors = [];
  validateTheoryVariableReference(record, "variableId", theoryVariableIds, errors, fixturePath);
  validateDefinitionRefs(record.definitionRefs, allowedDefinitionRefs, errors, fixturePath);

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

console.log("All theory-ontology fixtures validated as expected.");
