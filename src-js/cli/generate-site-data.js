import fs from "node:fs";
import path from "node:path";
import { readJson } from "../validate/json.js";

const root = process.cwd();
const generatedDir = path.join(root, "data", "generated");
const siteDataDir = path.join(root, "site", "data");

fs.mkdirSync(siteDataDir, { recursive: true });

const caseIndex = readJson(path.join(generatedDir, "case-index.json"));
const theoryIndex = readJson(path.join(generatedDir, "theory-index.json"));
const scores = readJson(path.join(generatedDir, "all-scores.json"));
const counterclaims = readJson(path.join(generatedDir, "all-counterclaims.json"));

const payload = {
  status: "draft-research-repository",
  generatedAt: new Date().toISOString(),
  caseCount: caseIndex.length,
  theoryCount: theoryIndex.length,
  scoreCount: scores.length,
  counterclaimCount: counterclaims.length,
  cases: caseIndex,
  theories: theoryIndex
};

fs.writeFileSync(path.join(siteDataDir, "workbench-summary.json"), `${JSON.stringify(payload, null, 2)}\n`);
console.log("Generated site/data/workbench-summary.json");
