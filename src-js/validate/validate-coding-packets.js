import fs from "node:fs";
import path from "node:path";
import { readJson, requireFields } from "./json.js";
import { packetHash } from "../generate/generate-coder-packets.js";

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort().map((name) => path.join(dir, name));
}

function walk(value, visit, pointer = "") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visit, `${pointer}/${index}`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const childPointer = `${pointer}/${key}`;
    visit(key, childPointer);
    walk(child, visit, childPointer);
  }
}

function validatePacket(packetPath, policy, casesById, errors) {
  const packet = readJson(packetPath);
  requireFields(packetPath, packet, ["packetId", "caseId", "codingRoundId", "packetVersion", "blindingPolicyId", "packetHash", "includedFields", "excludedFields", "payload"]);
  if (packet.blindingPolicyId !== policy.policyId) errors.push(`${packetPath}: blindingPolicyId must be ${policy.policyId}`);
  if (packet.packetVersion !== policy.packetVersion) errors.push(`${packetPath}: packetVersion must be ${policy.packetVersion}`);
  if (packet.packetHash !== packetHash(packet)) errors.push(`${packetPath}: packetHash does not match canonical packet payload`);
  if (!casesById.has(packet.caseId)) errors.push(`${packetPath}: caseId ${packet.caseId} does not exist`);

  const prohibited = new Set(policy.prohibitedCaseFields);
  walk(packet.payload, (key, pointer) => {
    if (prohibited.has(key)) errors.push(`${packetPath}: prohibited packet field at payload${pointer}`);
    for (const fragment of policy.prohibitedFieldFragments ?? []) {
      if (key.toLowerCase().includes(fragment)) errors.push(`${packetPath}: packet field payload${pointer} contains prohibited fragment ${fragment}`);
    }
  });
}

export function validateCodingPackets(root, cases) {
  const errors = [];
  const policyPath = path.join(root, "policies", "blinding-policy.json");
  if (!fs.existsSync(policyPath)) return { errors };
  const policy = readJson(policyPath);
  requireFields(policyPath, policy, ["policyId", "packetVersion", "allowedCaseFields", "prohibitedCaseFields", "hashAlgorithm"]);
  if (policy.hashAlgorithm !== "sha256") errors.push(`${policyPath}: hashAlgorithm must be sha256`);

  const casesById = new Map(cases.map(({ caseRecord }) => [caseRecord.caseId, caseRecord]));
  const packetFiles = listJsonFiles(path.join(root, "data", "coding", "packets")).filter((file) => !file.endsWith(`${path.sep}manifest.json`));
  const packetIds = new Set();
  const packetCaseIds = new Set();
  for (const packetPath of packetFiles) {
    const packet = readJson(packetPath);
    if (packetIds.has(packet.packetId)) errors.push(`${packetPath}: duplicate packetId ${packet.packetId}`);
    packetIds.add(packet.packetId);
    packetCaseIds.add(packet.caseId);
    validatePacket(packetPath, policy, casesById, errors);
  }

  for (const { caseRecord } of cases) {
    if (caseRecord.holdoutStatus === "sealed" && !packetCaseIds.has(caseRecord.caseId)) {
      errors.push(`${caseRecord.caseId}: sealed holdout requires an outcome-blind coder packet before fresh holdout selection or coding`);
    }
  }

  const roundPath = path.join(root, "data", "coding", "rounds", "round-001.json");
  if (fs.existsSync(roundPath)) {
    const round = readJson(roundPath);
    requireFields(roundPath, round, ["codingRoundId", "status", "codebookVersion", "blindingPolicyId", "packetManifest", "assignmentManifest"]);
    if (round.blindingPolicyId !== policy.policyId) errors.push(`${roundPath}: blindingPolicyId must be ${policy.policyId}`);
    if (round.status !== "draft") errors.push(`${roundPath}: coding rounds require maintainer release before non-draft status`);
  }

  const eventsPath = path.join(root, "data", "coding", "holdout-events.json");
  if (fs.existsSync(eventsPath)) {
    const events = readJson(eventsPath);
    if (!Array.isArray(events)) errors.push(`${eventsPath}: expected an array`);
    for (const event of Array.isArray(events) ? events : []) {
      requireFields(eventsPath, event, ["eventId", "eventType", "date", "actor", "affectedCaseIds", "reviewStatus"]);
      if (["opened", "unblinded", "fresh-holdout-selected"].includes(event.eventType) && event.reviewStatus !== "approved") {
        errors.push(`${eventsPath}:${event.eventId}: ${event.eventType} requires approved maintainer review`);
      }
    }
  }

  return { errors };
}
