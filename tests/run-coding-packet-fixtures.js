import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildCoderPacket, packetHash } from "../src-js/generate/generate-coder-packets.js";
import { validateCodingPackets } from "../src-js/validate/validate-coding-packets.js";

const policy = {
  policyId: "outcome-blind-coder-packet-v1",
  packetVersion: "v1.0",
  allowedCaseFields: ["caseId", "title", "subtype", "unitClass", "designStratum"],
  prohibitedCaseFields: ["outcome", "outcomeClass", "caseType", "comparabilityGroup", "samplingMetadata", "legacyScaffold"],
  prohibitedFieldFragments: ["outcome", "sampling", "score"],
  hashAlgorithm: "sha256"
};

const caseRecord = {
  caseId: "case-a",
  title: "Case A",
  subtype: "regime",
  unitClass: "political-formation",
  caseType: "calibration-case",
  designStratum: "political-formation:calibration-case",
  holdoutStatus: "sealed"
};

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function runFixture(name, mutatePacket, expectedErrorFragment) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `ppw-coding-packet-${name}-`));
  writeJson(path.join(root, "policies", "blinding-policy.json"), policy);
  const packet = buildCoderPacket({
    caseRecord,
    sourcePack: { sources: [{ sourceId: "source-a", title: "Source A", role: "primary-grounds" }] },
    passages: [{ passageId: "passage-a", sourceId: "source-a", locator: "p. 1", text: "Neutral evidence.", evidenceRole: "grounds" }],
    blindingPolicy: policy,
    codingRoundId: "round-fixture"
  });
  mutatePacket(packet);
  packet.packetHash = packetHash(packet);
  writeJson(path.join(root, "data", "coding", "packets", "case-a.json"), packet);

  const result = validateCodingPackets(root, [{ caseRecord }]);
  if (!expectedErrorFragment && result.errors.length === 0) {
    console.log(`PASS ${name}`);
    return 0;
  }
  if (expectedErrorFragment && result.errors.some((error) => error.includes(expectedErrorFragment))) {
    console.log(`PASS ${name}`);
    return 0;
  }
  console.error(`FAIL ${name}: expected ${expectedErrorFragment || "no errors"}, got ${JSON.stringify(result.errors)}`);
  return 1;
}

let failures = 0;
failures += runFixture("valid-outcome-blind-packet", () => {}, null);
failures += runFixture("invalid-prohibited-outcome-field", (packet) => {
  packet.payload.neutralCaseMetadata.outcome = "collapse";
}, "prohibited packet field");

if (failures > 0) process.exit(1);
console.log("All coding-packet fixtures validated as expected.");
