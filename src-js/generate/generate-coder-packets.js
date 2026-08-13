import crypto from "node:crypto";
import path from "node:path";
import { readJson } from "../validate/json.js";

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function packetHash(packet) {
  const hashInput = {
    packetVersion: packet.packetVersion,
    blindingPolicyId: packet.blindingPolicyId,
    includedFields: packet.includedFields,
    excludedFields: packet.excludedFields,
    payload: packet.payload
  };
  return `sha256:${crypto.createHash("sha256").update(canonicalJson(hashInput)).digest("hex")}`;
}

function compactObject(value) {
  return Object.fromEntries(Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined));
}

export function buildCoderPacket({ caseRecord, sourcePack, passages, blindingPolicy, codingRoundId }) {
  const neutralCaseMetadata = {};
  for (const field of blindingPolicy.allowedCaseFields) {
    if (caseRecord[field] !== undefined) neutralCaseMetadata[field] = caseRecord[field];
  }

  const packet = {
    packetId: `${codingRoundId}-${caseRecord.caseId}-packet`,
    caseId: caseRecord.caseId,
    codingRoundId,
    packetVersion: blindingPolicy.packetVersion,
    blindingPolicyId: blindingPolicy.policyId,
    includedFields: [
      "payload.neutralCaseMetadata",
      "payload.sources",
      "payload.passages"
    ],
    excludedFields: blindingPolicy.prohibitedCaseFields,
    payload: {
      neutralCaseMetadata,
      sources: (sourcePack.sources ?? []).map(({ sourceId, title, author, year, role }) => compactObject({ sourceId, title, author, year, role })),
      passages: passages.map(({ passageId, sourceId, locator, text, evidenceRole }) => compactObject({ passageId, sourceId, locator, text, evidenceRole }))
    }
  };
  packet.packetHash = packetHash(packet);
  return packet;
}

export function loadBlindingPolicy(root) {
  return readJson(path.join(root, "policies", "blinding-policy.json"));
}
