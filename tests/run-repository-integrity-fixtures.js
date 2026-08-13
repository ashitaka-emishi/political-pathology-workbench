import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateRepositoryGraph } from "../src-js/validate/validate-repository-graph.js";
import { validateSchemaRegistry } from "../src-js/validate/validate-schema-registry.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(__dirname);

let failures = 0;

function assertFixture(name, passed, details = []) {
  if (passed) {
    console.log(`PASS ${name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${name}: ${JSON.stringify(details)}`);
  }
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function copySchema(targetRoot, schemaName) {
  fs.mkdirSync(path.join(targetRoot, "schemas"), { recursive: true });
  fs.copyFileSync(path.join(root, "schemas", schemaName), path.join(targetRoot, "schemas", schemaName));
}

function schemaRootWithPromotionRecord(record) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ppw-schema-fixture-"));
  copySchema(tempRoot, "claim-promotion.schema.json");
  copySchema(tempRoot, "controlled-vocab.schema.json");
  writeJson(path.join(tempRoot, "data", "claim-promotion", "promotion-registry.json"), [record]);
  return tempRoot;
}

const validPromotion = {
  promotionId: "prom-valid",
  claimId: "claim-valid",
  originModuleId: "module-valid",
  promotionStatus: "reviewed-claim",
  reviewStatus: "source-review"
};

{
  const result = validateSchemaRegistry(schemaRootWithPromotionRecord(validPromotion));
  assertFixture("schema-valid-promotion-record", result.errors.length === 0, result.errors);
}

{
  const result = validateSchemaRegistry(schemaRootWithPromotionRecord({ ...validPromotion, undeclaredField: true }));
  assertFixture(
    "schema-invalid-additional-property",
    result.errors.some((error) => error.includes("undeclaredField") && error.includes("additional property")),
    result.errors
  );
}

{
  const result = validateSchemaRegistry(schemaRootWithPromotionRecord({ ...validPromotion, claimId: undefined }));
  assertFixture(
    "schema-invalid-missing-required-field",
    result.errors.some((error) => error.includes("/0/claimId") && error.includes("missing required field")),
    result.errors
  );
}

function baseCase() {
  return {
    caseSlug: "case-a",
    caseRecord: { caseId: "case-a" },
    sourcePack: {
      caseId: "case-a",
      sources: [{ sourceId: "source-a" }]
    },
    passages: [{ passageId: "passage-a", caseId: "case-a", sourceId: "source-a" }],
    claims: [{ claimId: "claim-a", caseId: "case-a", derivedFrom: ["passage-a"] }],
    interpretations: [{
      interpretationId: "interpretation-a",
      caseId: "case-a",
      claimIds: ["claim-a"],
      theoryId: "theory-a",
      variableId: "variable-a",
      codebookVersion: "v1.1"
    }],
    scores: [{
      scoreId: "score-a",
      caseId: "case-a",
      interpretationId: "interpretation-a",
      theoryId: "theory-a",
      variableId: "variable-a",
      codebookVersion: "v1.1"
    }],
    counterclaims: [],
    searchLogs: [],
    rivalExplanations: []
  };
}

{
  const errors = [];
  validateRepositoryGraph([baseCase()], errors);
  assertFixture("graph-valid-chain", errors.length === 0, errors);
}

{
  const fixture = baseCase();
  fixture.claims.push({ claimId: "claim-a", caseId: "case-a", derivedFrom: ["passage-a"] });
  const errors = [];
  validateRepositoryGraph([fixture], errors);
  assertFixture("graph-invalid-duplicate-claim-id", errors.some((error) => error.includes("duplicate claim id claim-a")), errors);
}

{
  const fixture = baseCase();
  fixture.scores[0].variableId = "wrong-variable";
  const errors = [];
  validateRepositoryGraph([fixture], errors);
  assertFixture("graph-invalid-score-interpretation-variable", errors.some((error) => error.includes("does not match interpretation")), errors);
}

{
  const leakedCaseFiles = [];
  for (const slug of fs.readdirSync(path.join(root, "data", "cases")).sort()) {
    const casePath = path.join(root, "data", "cases", slug, "case.json");
    const record = JSON.parse(fs.readFileSync(casePath, "utf8"));
    if (Object.hasOwn(record, "sacredPoliticalOrderStrength") || Object.hasOwn(record, "sacredPoliticalOrderStrengthRationale")) {
      leakedCaseFiles.push(casePath);
    }
  }
  assertFixture("canonical-cases-no-top-level-scaffold-score", leakedCaseFiles.length === 0, leakedCaseFiles);
}

{
  const caseIndex = JSON.parse(fs.readFileSync(path.join(root, "data", "generated", "case-index.json"), "utf8"));
  const leakedCases = caseIndex.filter((record) => Object.hasOwn(record, "sacredPoliticalOrderStrength"));
  assertFixture("case-index-no-scaffold-score", leakedCases.length === 0, leakedCases.map((record) => record.caseId));
}

if (failures > 0) {
  console.error(`${failures} repository-integrity fixture(s) failed.`);
  process.exit(1);
}

console.log("All repository-integrity fixtures validated as expected.");
