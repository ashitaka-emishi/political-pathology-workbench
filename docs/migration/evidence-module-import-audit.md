# Evidence Module Import Audit

**Milestone:** 15 — Evidence Module Metadata Import  
**Date:** 2026-06-30  
**Issues covered:** #135, #136, #137, #138, #139, #195, #196, #197 (open)  
**Governing tracking issue:** #134  

---

## 1. Scope

This audit summarises what was imported, referenced, or deferred in Milestone 15 for the two registered evidence modules:

| Module | ID | Type |
|---|---|---|
| Lincoln Metaphor Analysis | `lincoln-metaphor-analysis` | deep-case |
| Sacrifice Law Workbench | `sacrifice-law-workbench` | comparative |

It reconciles module records, corpus registry records, and migration manifest records, and recommends whether Milestone 16 (Lincoln Deep Case) and Milestone 17 (Sacrifice Law Comparative) may begin.

---

## 2. Module Metadata Imported

### 2.1 lincoln-metaphor-analysis (PPW #135)

| File | Status |
|---|---|
| `data/evidence-modules/lincoln-metaphor-analysis/module.json` | Created |
| `data/evidence-modules/lincoln-metaphor-analysis/import-map.json` | Created |
| `data/evidence-modules/lincoln-metaphor-analysis/provenance.json` | Created |
| `data/evidence-modules/lincoln-metaphor-analysis/reliability.json` | Created |
| `data/evidence-modules/lincoln-metaphor-analysis/source-issue-map.json` | Created |
| `data/evidence-modules/module-registry.json` (lincoln entry) | Updated |

**Module record summary:**
- `moduleType`: deep-case
- `provenanceStatus`: partial
- `reliabilityStatus`: pending
- `sourceIssueMigrationStatus`: in-progress
- `artifactClasses`: corpus, annotations, reliability-study, methodology, publication, pipeline-scripts
- `corpusIds`: [lincoln-deep-28]

### 2.2 sacrifice-law-workbench (PPW #136)

| File | Status |
|---|---|
| `data/evidence-modules/sacrifice-law-workbench/module.json` | Created |
| `data/evidence-modules/sacrifice-law-workbench/import-map.json` | Created |
| `data/evidence-modules/sacrifice-law-workbench/provenance.json` | Created |
| `data/evidence-modules/sacrifice-law-workbench/reliability.json` | Created |
| `data/evidence-modules/sacrifice-law-workbench/source-issue-map.json` | Created |
| `data/evidence-modules/module-registry.json` (slw entry) | Updated |

**Module record summary:**
- `moduleType`: comparative
- `provenanceStatus`: partial
- `reliabilityStatus`: pending
- `sourceIssueMigrationStatus`: in-progress
- `artifactClasses`: corpus, annotations, methodology, publication, pipeline-scripts
- `corpusIds`: [sacrifice-law-comparative-41]

---

## 3. Corpus Metadata Imported

### 3.1 lincoln-deep-28 (PPW #137)

| File | Status |
|---|---|
| `data/corpora/lincoln-deep-28/corpus.json` | Created |
| `data/corpora/lincoln-deep-28/documents.json` | Created (empty documents[]) in PPW #137; populated with 36 core entries in PPW #195; validation-tier scope and annotation definition added in PPW #196; reference-tier scope and annotation exclusion definition added in PPW #197 |
| `data/corpora/lincoln-deep-28/artifact-index.json` | Created |
| `data/corpora/corpus-registry.json` (lincoln-deep-28 entry) | Updated |

**Corpus record summary:**
- `corpusType`: deep-case; `corpusPurpose`: core
- `documentCount`: 28 (confirmed v3 baseline); `registeredDocumentCount`: 36 (28 confirmed + 8 planned v4 additions from LMA #113, registered by PPW #195)
- Three tiers documented: core (36 registered, 48-doc v4 target; gap of 12 pending LMA #113, PPW #195), validation (scope defined by PPW #196: 75-100 docs, passage-segmentation-only annotation, 9 candidate categories; additional documents pending LMA #114), reference (scope defined by PPW #197: open-ended count, search-only indexing, 6 candidate categories including contemporaneous-context docs; specific documents pending LMA #115)
- All status fields: pending / not-started

### 3.2 sacrifice-law-comparative-41 (PPW #138)

| File | Status |
|---|---|
| `data/corpora/sacrifice-law-comparative-41/corpus.json` | Created |
| `data/corpora/sacrifice-law-comparative-41/cases.json` | Created |
| `data/corpora/sacrifice-law-comparative-41/documents.json` | Created (empty documents[]) |
| `data/corpora/sacrifice-law-comparative-41/artifact-index.json` | Created |
| `data/corpora/corpus-registry.json` (slw entry) | Updated |

**Corpus record summary:**
- `corpusType`: comparative; `corpusPurpose`: core
- `documentCount`: 41 (manifest-driven pipeline output)
- 4 source cases; 2 confirmed PPW cases (american-civil-war-union, nazi-germany); 2 pending case mapping (American Revolution, Napoleon)
- All status fields: pending / not-started

---

## 4. Artifacts by Disposition

### 4.1 Referenced Only (will not be imported)

| Module | Artifact | Reason |
|---|---|---|
| lincoln-metaphor-analysis | Reliability artifacts (Stage 4H/4J human coding, adjudication records) | Reference-only; inform PPW review-gate design |
| lincoln-metaphor-analysis | Quarto publication site | Child-repo site remains live; PPW references it |
| lincoln-metaphor-analysis | Pipeline scripts | Child-repo-specific; inform PPW pipeline design only |
| sacrifice-law-workbench | Pre-v1 tracking context (SLW #174 → PPW #110) | Context recorded in PPW #110; not imported as data |
| sacrifice-law-workbench | Cross-case synthesis methodology | Link from PPW method notes; Quarto structure not copied |
| sacrifice-law-workbench | Quarto research site | Child-repo site remains live; PPW will have own module pages (PPW #176, #178) |
| sacrifice-law-workbench | Pipeline scripts | Child-repo-specific; inform PPW pipeline design (Milestone 19) |

### 4.2 Open in Milestone 15 (in progress)

These issues are within Milestone 15 scope but not yet closed:

| Artifact | PPW Issue | Scheduled Milestone |
|---|---|---|
| 36-doc core corpus inventory (28 confirmed + 8 planned v4 additions; 12-doc gap to 48-doc target pending LMA #113) | #195 | 15 |
| Validation tier scope, annotation definition, and 9 candidate categories (additional documents pending LMA #114) | #196 | 15 |
| Search-only reference corpus inventory (scope, annotation exclusion, and 6 candidate categories defined; specific documents pending LMA #115) | #197 | 15 |

PPW #195 substantially addressed (36 of 48 planned documents registered). PPW #196 substantially addressed (validation-tier scope and annotation level defined; specific additional documents pending LMA #114 resolution). PPW #197 substantially addressed (reference-tier scope, search-only annotation exclusion, and candidate categories defined; specific documents pending LMA #115 resolution).

### 4.3 Deferred to Milestone 16 (Lincoln)

| Artifact | PPW Issue | Scheduled Milestone |
|---|---|---|
| Define Lincoln corpus expansion architecture | #194 | 16 |
| Raw text files for v4 core additions | #198 | 16 |
| Passage records (segmented, stable IDs) | #143 | 16 |
| Draft claim candidates | #145 | 16 |
| Cluster profiles (Stage 4A annotation outputs) | #144 | 16 |

Note: PPW #194 (corpus expansion architecture) is a structural upstream of the #195–#197 inventories. If #194 and #195–#197 are in flight simultaneously, coordinate to avoid inventory work invalidating architecture decisions.

### 4.4 Deferred to Milestone 17 (Sacrifice Law)

| Artifact | PPW Issue | Scheduled Milestone |
|---|---|---|
| Corpus document metadata (titles, dates, sources) | — (no issue yet) | 17 |
| Corpus manifest (stratified corpus definition) | — (no issue yet) | 17 |
| Raw text files for the four-case corpus | — (no issue yet) | 17 |
| Draft comparative claims | #154 | 17 |

Note: PPW #138 created the per-corpus folder structure in Milestone 15 and is closed. The actual document-metadata and corpus-manifest import work for Milestone 17 has no PPW tracking issue yet; one must be created as part of Milestone 17 planning.

### 4.4 Deferred to Milestone 19 (Validation)

| Artifact | PPW Issue | Scheduled Milestone |
|---|---|---|
| Lincoln reliability sampling strategy (v4 corpus) | #199 | 19 |
| Sacrifice Law reliability sampling design | #192 | 19 |

### 4.5 Blocked (import cannot proceed without prerequisites)

| Module | Artifact | Blocker |
|---|---|---|
| lincoln-metaphor-analysis | Third-party corpus texts (scholarly commentary, translations) | Rights review per text required; unclear timeline |
| sacrifice-law-workbench | American Revolution corpus subset | PPW case mapping not confirmed (PPW #149-#151) |
| sacrifice-law-workbench | Napoleon corpus subset | PPW case mapping not confirmed (PPW #149-#151) |
| sacrifice-law-workbench | Nazi-era translated texts and apparatus | Rights review required for each translation |

---

## 5. Child Issue Migration Status

### 5.1 lincoln-metaphor-analysis

**Source repository:** ashitaka-emishi/lincoln-metaphor-analysis  
**Migration tracker:** PPW #111

| Category | Count | PPW Issues |
|---|---|---|
| Migrated as PPW issues | 6 | #194, #195, #196, #197, #198, #199 |
| Merged into coordination issues | 38 | PPW #112 (25 absorbed), PPW #113 (6 absorbed); 7 source issues in summary count but not individually listed (gap) |
| Deferred | 3 | LMA #85, #95, #108 |
| **Total** | **47** | |

**Known gap:** The `mergedCoordinationIssues` arrays in `source-issue-map.json` account for 31 of the 38 merged source issues (25 in PPW #112, 6 in PPW #113). The remaining 7 merged source issues are counted in the migration summary but not individually listed. This should be reconciled in a follow-up migration audit or during Milestone 19.

**Deferred issues:**
- LMA #85: Tracking v2.0 Multi-Model Reliability Stress Test — resume after Milestone 19 validation fixtures
- LMA #95: Classify human coder disagreements — resume after Milestone 19 claim-promotion gate foundations
- LMA #108: Tracking v3.0 Human IAA Study — resume after Milestone 19 validation fixtures

### 5.2 sacrifice-law-workbench

**Source repository:** ashitaka-emishi/sacrifice-law-workbench  
**Migration tracker:** PPW #110

| Category | Count | PPW Issues |
|---|---|---|
| Migrated as PPW issues | 1 | #192 |
| Merged into coordination issues | 1 | PPW #110 (SLW #174 absorbed) |
| Deferred | 0 | — |
| **Total** | **2** | |

---

## 6. Reconciliation: Module Records, Corpus Registry, and Migration Manifest

| Check | lincoln-metaphor-analysis | sacrifice-law-workbench |
|---|---|---|
| Module record exists in module-registry.json | ✓ | ✓ |
| Standalone module.json exists | ✓ | ✓ |
| Corpus registry entry exists | ✓ (lincoln-deep-28) | ✓ (sacrifice-law-comparative-41) |
| Per-corpus folder exists | ✓ | ✓ |
| provenance.json created | ✓ ppwMigrationIssue → #111 | ✓ ppwMigrationIssue → #110 |
| reliability.json created | ✓ reliabilityStatus: pending | ✓ reliabilityStatus: pending |
| source-issue-map.json created | ✓ 47 issues counted; 40 individually listed (7-issue gap in merged list) | ✓ 2 issues reconciled |
| import-map.json created | ✓ | ✓ |
| sourceIssueMigrationStatus | in-progress | in-progress |

---

## 7. Missing Source Issue Links

**lincoln-metaphor-analysis:**
- 7 source issues counted in `mergedIntoPpwCoordinationIssues: 38` but not individually listed in `mergedCoordinationIssues[].sourceIssuesAbsorbed`. These are in-scope for a follow-up reconciliation task.

**sacrifice-law-workbench:**
- No missing source issue links identified. The SLW source repository had only 2 open implementation issues at migration time.

---

## 8. Missing Provenance or Reliability Metadata

### 8.1 Lincoln

- **provenanceStatus: partial** — provenance.json documents the source repository and artifact families but does not yet include per-document provenance records (deferred to Milestone 16 import).
- **reliabilityStatus: pending** — Two child-repo reliability artifacts exist (v2 multi-model, v3 human IAA) but are reference-only. No PPW-native reliability assessment exists. Inter-annotator metrics cannot be independently verified by PPW until the review-gate framework (Milestone 19) is in place.
- **Rights gap** — Third-party commentary and translations in the Lincoln corpus are not individually rights-reviewed. Import of those texts is blocked until review is complete.

### 8.2 Sacrifice Law

- **provenanceStatus: partial** — provenance.json documents the source repository and artifact families but corpus-level provenance is incomplete (deferred to Milestone 17 import).
- **reliabilityStatus: pending** — No reliability artifacts exist in the sacrifice-law-workbench (the SLW reliability sampling design, SLW #183, was migrated to PPW #192 for Milestone 19). No baseline IAA data is available.
- **Case mapping gap** — American Revolution and Napoleon case mapping has not been confirmed in PPW. This blocks import of those corpus subsets and prevents caseIds from being marked complete.
- **Rights gap** — Nazi-era translated texts and scholarly apparatus require individual rights review before import.

---

## 9. Remaining Risks Before Artifact Import

| Risk | Module(s) | Severity | Governing Issue(s) |
|---|---|---|---|
| Third-party rights unreviewed — Lincoln | LMA | High | (no issue; manual task) |
| Third-party rights unreviewed — Nazi-era translations | SLW | High | (no issue; manual task) |
| American Revolution / Napoleon PPW case mapping not confirmed | SLW | High | #149, #150, #151 |
| 7 absorbed source issues (LMA) not individually listed in source-issue-map.json | LMA | Low | Follow-up reconciliation |
| Reliability sampling strategy not yet adapted to PPW | LMA, SLW | Medium | #199 (LMA), #192 (SLW) |
| LMA validation-tier documents[] has no individual documents yet — scope defined but specific selection pending LMA #114 | LMA | Low | #196 (substantially addressed: tier scope, annotation level, and 9 candidate categories defined in PPW #196; additional documents pending LMA #114 resolution) |
| LMA reference-tier documents[] has no individual documents yet — scope defined but specific selection pending LMA #115 | LMA | Low | #197 (substantially addressed: scope and annotation exclusion defined; documents pending LMA #115) |
| SLW documents[] array empty — no document-level metadata yet | SLW | Medium | No issue yet (SLW M17 import issue to be created) |
| lincoln-deep-28 core-tier documents[] partially populated (36 of 48 planned entries; 12-doc gap pending LMA #113 resolution) | LMA | Low | #195 (substantially addressed) |
| SLW raw-text import has no governing PPW issue (import-map.json ppwIssues: []) | SLW | Medium | (no issue; must be created for M17 planning) |
| No schemas govern per-corpus folder files (corpus.json, documents.json, artifact-index.json) | Both | Low | (infrastructure gap, out of scope M15) |

---

## 10. Recommendation: May Milestone 16 and Milestone 17 Begin?

### Milestone 16 — Lincoln Deep Case Evidence Module

**Recommendation: Conditionally proceed.**

The module-level and corpus-level metadata for Lincoln is in place (PPW #135, #137). Milestone 16 may begin, with the following condition:

- **PPW #195, #196, #197 substantially completed** (three-tier corpus inventories, closed in Milestone 15). Core-tier (36 registered), validation-tier (scope + 9 categories), and reference-tier (scope + 6 categories) are all defined in documents.json. Specific document selection for validation and reference tiers awaits LMA #114 and LMA #115 respectively; that follow-on work will be tracked as new PPW issues when those child-repo issues resolve.

The following Milestone 16 work is not blocked by any open prerequisite beyond #195-#197:
- Define corpus expansion architecture (PPW #194)
- Add raw text files (PPW #198)
- Import passage records (PPW #143)
- Import draft claims (PPW #145)
- Import cluster profiles (PPW #144)

Third-party rights review (scholarly commentary, translations) should be tracked as a parallel task; it does not block the core Lincoln public-domain text import.

### Milestone 17 — Sacrifice Law Comparative Evidence Module

**Recommendation: Case mapping prerequisite resolved; proceed only through review gates.**

The module-level and corpus-level metadata for Sacrifice Law is in place (PPW #136, #138). PPW #149-#151, #250, and #251 confirm the four source-case mappings and create reference-only subset links for Lincoln, Nazi Germany, American Revolution, and Napoleonic France. The remaining blocker is no longer case-folder coverage; it is passage-level evidence import, rights/provenance review, reliability design, and claim-promotion review.

**Remaining prerequisites before evidentiary use:**
1. Populate or reference passage-level evidence for the four mapped case targets.
2. Complete rights/provenance review, especially for Nazi-era translations and scholarly apparatus.
3. Complete reliability and claim-promotion gates before any Sacrifice Law candidate affects PPW findings or scores.

Rights review for Nazi-era translations should be initiated during Milestone 17 planning; it does not block the pre-1928 public-domain text subset.
