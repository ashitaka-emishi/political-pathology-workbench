import fs from "node:fs";
import path from "node:path";
import { readJson } from "../validate/json.js";
import { generateEvidenceIndexes } from "../generate/generate-evidence-indexes.js";
import { generateCaseEvidenceChains } from "../generate/generate-case-evidence-chains.js";

const root = process.cwd();
const casesDir = path.join(root, "data", "cases");
const theoriesDir = path.join(root, "theories");
const generatedDir = path.join(root, "data", "generated");

function listDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

function readArray(file) {
  if (!fs.existsSync(file)) return [];
  return readJson(file);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

const allCases = [];
const allSources = [];
const allPassages = [];
const allClaims = [];
const allInterpretations = [];
const allScores = [];
const allCounterclaims = [];
const allChains = [];

function indexBy(records, key) {
  return new Map(records.map((record) => [record[key], record]));
}

function buildCaseChain({ caseRecord, slug, sourcePack, passages, claims, interpretations, scores }) {
  const sourcesById = indexBy(sourcePack.sources, "sourceId");
  const passagesById = indexBy(passages, "passageId");
  const claimsById = indexBy(claims, "claimId");
  const scoresByInterpretationId = new Map();

  for (const score of scores) {
    if (!scoresByInterpretationId.has(score.interpretationId)) {
      scoresByInterpretationId.set(score.interpretationId, []);
    }
    scoresByInterpretationId.get(score.interpretationId).push(score);
  }

  return {
    caseId: caseRecord.caseId,
    caseSlug: slug,
    title: caseRecord.title,
    interpretations: interpretations.map((interpretation) => {
      const { claimIds = [], ...interpretationFields } = interpretation;
      return {
        ...interpretationFields,
        claims: claimIds.map((claimId) => {
          const claim = claimsById.get(claimId) ?? { claimId };
          const { derivedFrom = [], ...claimFields } = claim;
          return {
            ...claimFields,
            passages: derivedFrom.map((passageId) => {
              const passage = passagesById.get(passageId) ?? { passageId };
              return {
                ...passage,
                source: sourcesById.get(passage.sourceId) ?? null
              };
            })
          };
        }),
        scores: scoresByInterpretationId.get(interpretation.interpretationId) ?? []
      };
    })
  };
}

for (const slug of listDirs(casesDir)) {
  const caseDir = path.join(casesDir, slug);
  const caseRecord = readJson(path.join(caseDir, "case.json"));
  const sourcePack = readJson(path.join(caseDir, "source-pack.json"));
  const passages = readArray(path.join(caseDir, "passages.json"));
  const claims = readArray(path.join(caseDir, "claims.json"));
  const interpretations = readArray(path.join(caseDir, "interpretations.json"));
  const scores = readArray(path.join(caseDir, "scores.json"));
  const counterclaims = readArray(path.join(caseDir, "counterclaims.json"));

  allCases.push({ ...caseRecord, slug });
  allSources.push(...sourcePack.sources.map((source) => ({ ...source, caseId: caseRecord.caseId, caseSlug: slug })));
  allPassages.push(...passages.map((record) => ({ ...record, caseSlug: slug })));
  allClaims.push(...claims.map((record) => ({ ...record, caseSlug: slug })));
  allInterpretations.push(...interpretations.map((record) => ({ ...record, caseSlug: slug })));
  allScores.push(...scores.map((record) => ({ ...record, caseSlug: slug })));
  allCounterclaims.push(...counterclaims.map((record) => ({ ...record, caseSlug: slug })));
  allChains.push(buildCaseChain({ caseRecord, slug, sourcePack, passages, claims, interpretations, scores }));
}

const theoryIndex = listDirs(theoriesDir).map((slug) => {
  const manifest = readJson(path.join(theoriesDir, slug, "manifest.json"));
  return { ...manifest, slug };
});

writeJson(path.join(generatedDir, "all-cases.json"), allCases);
writeJson(path.join(generatedDir, "all-sources.json"), allSources);
writeJson(path.join(generatedDir, "all-passages.json"), allPassages);
writeJson(path.join(generatedDir, "all-claims.json"), allClaims);
writeJson(path.join(generatedDir, "all-interpretations.json"), allInterpretations);
writeJson(path.join(generatedDir, "all-scores.json"), allScores);
writeJson(path.join(generatedDir, "all-counterclaims.json"), allCounterclaims);
writeJson(path.join(generatedDir, "all-chains.json"), allChains);
fs.rmSync(path.join(generatedDir, "chains"), { recursive: true, force: true });
for (const chain of allChains) {
  writeJson(path.join(generatedDir, "chains", `${chain.caseSlug}.json`), chain);
}
writeJson(path.join(generatedDir, "case-index.json"), allCases.map(({ caseId, title, slug, outcome, goldCase, publicationStatus, sacredPoliticalOrderId, sacredPoliticalOrderName, sacredPoliticalOrderStrength, caseSelectionRole }) => ({
  caseId,
  title,
  slug,
  outcome,
  goldCase: Boolean(goldCase),
  publicationStatus,
  sacredPoliticalOrderId,
  sacredPoliticalOrderName,
  sacredPoliticalOrderStrength,
  caseSelectionRole
})));
writeJson(path.join(generatedDir, "theory-index.json"), theoryIndex);

// Cross-case comparison table JSON
const OUTCOME_CLUSTERS = [
  { outcomeId: "sacrificial-escalation",      label: "Sacrificial Escalation" },
  { outcomeId: "collapse",                    label: "Collapse" },
  { outcomeId: "hybrid-transitional",         label: "Hybrid / Transitional" },
  { outcomeId: "restrained-reordering",       label: "Restrained Reordering" },
  { outcomeId: "stagnation-frozen-pathology", label: "Stagnation / Frozen Pathology" },
  { outcomeId: "absorption-transformation",   label: "Absorption / Transformation" },
];
const DISPLAY_VARS = ["sacred-political-order-strength", "corrigibility"];

const scoresByCase = {};
for (const s of allScores) {
  if (!scoresByCase[s.caseId]) scoresByCase[s.caseId] = {};
  if (!scoresByCase[s.caseId][s.variableId]) scoresByCase[s.caseId][s.variableId] = [];
  scoresByCase[s.caseId][s.variableId].push(s.value);
}

const primaryInterpByCase = {};
for (const i of allInterpretations) {
  if (!primaryInterpByCase[i.caseId]) primaryInterpByCase[i.caseId] = i;
}

const comparisonTable = {
  generatedAt: new Date().toISOString().slice(0, 10),
  variables: DISPLAY_VARS,
  clusters: OUTCOME_CLUSTERS.map(({ outcomeId, label }) => {
    const cases = allCases
      .filter((c) => c.outcome === outcomeId)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((c) => {
        const interp = primaryInterpByCase[c.caseId] || {};
        const scores = {};
        for (const v of DISPLAY_VARS) {
          const vals = (scoresByCase[c.caseId] || {})[v];
          if (vals && vals.length > 0) {
            scores[v] = {
              values: vals,
              min: Math.min(...vals),
              max: Math.max(...vals),
              avg: vals.reduce((a, b) => a + b, 0) / vals.length,
            };
          } else {
            scores[v] = null;
          }
        }
        return {
          caseId: c.caseId,
          title: c.title,
          goldCase: Boolean(c.goldCase),
          scores,
          primaryMechanism: interp.mechanism || null,
          sacrificeHealth: interp.sacrificeHealth || null,
          sacrificeBoundedness: interp.sacrificeBoundedness || null,
        };
      });
    return { outcomeId, label, cases };
  }),
};

const crossCaseDir = path.join(root, "data", "cross-case");
writeJson(path.join(crossCaseDir, "comparison-table.json"), comparisonTable);

const evidenceResult = generateEvidenceIndexes(root);
const chainResult = generateCaseEvidenceChains(root);

console.log(`Generated indexes for ${allCases.length} cases, ${allClaims.length} claims, ${allScores.length} scores, and ${allCounterclaims.length} counterclaims.`);
console.log(`Generated evidence indexes for ${evidenceResult.moduleCount} modules, ${evidenceResult.corpusCount} corpora, ${evidenceResult.draftClaimCount} draft claims, ${evidenceResult.promotedClaimCount} promoted claims.`);
console.log(`Generated per-case evidence chains for ${chainResult.caseCount} cases.`);
