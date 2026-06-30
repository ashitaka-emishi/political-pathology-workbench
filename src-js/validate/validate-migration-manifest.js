import fs from "node:fs";
import path from "node:path";
import { readJson, requireFields } from "./json.js";

const ISSUE_KINDS = new Set(["implementation", "tracking"]);
const DISPOSITIONS = new Set(["migrate-as-ppw-issue", "merge-into-ppw-issue", "defer-to-post-integration"]);

export function validateMigrationIssueRecord(issue, errors, label) {
  try {
    requireFields(label, issue, [
      "sourceRepo",
      "sourceIssue",
      "sourceTitle",
      "sourceUrl",
      "issueKind",
      "disposition",
      "targetMilestone",
      "rationale",
      "closureInstruction"
    ]);
  } catch (error) {
    errors.push(error.message);
    return;
  }

  if (!ISSUE_KINDS.has(issue.issueKind)) errors.push(`${label}: unsupported issueKind ${issue.issueKind}`);
  if (!DISPOSITIONS.has(issue.disposition)) errors.push(`${label}: unsupported disposition ${issue.disposition}`);
  if (issue.targetPpwIssue !== undefined && issue.targetPpwIssue !== null && typeof issue.targetPpwIssue !== "number") {
    errors.push(`${label}: targetPpwIssue must be a number or null`);
  }
}

export function validateMigrationManifest(root) {
  const errors = [];
  const warnings = [];
  const manifestPath = path.join(root, "data", "migration", "child-issue-migration-manifest.json");

  if (!fs.existsSync(manifestPath)) {
    return { errors, warnings };
  }

  let manifest;
  try {
    manifest = readJson(manifestPath);
  } catch (error) {
    errors.push(error.message);
    return { errors, warnings };
  }

  try {
    requireFields(manifestPath, manifest, ["manifestDate", "generatedBy", "targetRepository", "dispositions", "closureNote", "issues"]);
  } catch (error) {
    errors.push(error.message);
    return { errors, warnings };
  }

  if (!Array.isArray(manifest.issues)) {
    errors.push(`${manifestPath}: issues must be an array`);
    return { errors, warnings };
  }

  for (const issue of manifest.issues) {
    const label = `${manifestPath}:${issue.sourceRepo ?? "<unknown>"}#${issue.sourceIssue ?? "<unknown>"}`;
    validateMigrationIssueRecord(issue, errors, label);
  }

  return { errors, warnings };
}
