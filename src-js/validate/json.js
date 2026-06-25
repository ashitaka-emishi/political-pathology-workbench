import fs from "node:fs";

export function readJson(path) {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`${path}: ${error.message}`);
  }
}

export function requireFields(path, value, fields) {
  const missing = fields.filter((field) => value[field] === undefined || value[field] === null || value[field] === "");
  if (missing.length > 0) {
    throw new Error(`${path}: missing required field(s): ${missing.join(", ")}`);
  }
}
