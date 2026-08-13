import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { classifyAnalyticalEligibility } from "../src-js/validate/validate-score-semantics.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtures = JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures", "analytical-eligibility", "fixtures.json"), "utf8"));

let failures = 0;

for (const fixture of fixtures) {
  const verdict = classifyAnalyticalEligibility({
    score: fixture.score,
    interpretations: fixture.interpretations,
    claims: fixture.claims,
    promotionRegistry: fixture.promotionRegistry,
    caseRecord: fixture.case
  });
  if (verdict.reason === fixture.expected) {
    console.log(`PASS ${fixture.name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${fixture.name}: expected ${fixture.expected}, got ${verdict.reason}`);
  }
}

if (failures > 0) {
  console.error(`${failures} analytical-eligibility fixture(s) failed.`);
  process.exit(1);
}

console.log("All analytical-eligibility fixtures validated as expected.");
