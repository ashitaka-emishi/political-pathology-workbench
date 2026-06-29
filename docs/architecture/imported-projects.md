# Imported Project Boundaries

Part of [#121](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/121) (Milestone 13: Architecture and Governance Baseline).

See also: [evidence-modules.md](evidence-modules.md) for the module architecture; [claim-promotion.md](claim-promotion.md) for what may be promoted to a PPW score.

---

## Artifact classification legend

| Class | Meaning |
|---|---|
| **Import now** | Bring into PPW data files or registry as part of evidence-module migration (Milestones 15–17) |
| **Reference only** | Link to child-repo artifact by URL or provenance record; do not copy into PPW |
| **Import later** | Requires further review, schema work, or milestone foundation before import |
| **Do not import** | Child-repo-specific artifact; no PPW equivalent; leave in child repo |

---

## `lincoln-metaphor-analysis`

| Artifact class | Import decision | Notes |
|---|---|---|
| **Corpus document metadata** (title, date, author, source URL) | Import now | Via PPW corpus registry (Milestones 15–16); PPW #195–#197 |
| **Corpus inventory** (48-doc core, 75–100 doc validation, reference sets) | Import now | Three-tier structure defined in PPW #194; inventories in #195–#197 |
| **Raw text files** (segmented source texts) | Import now | Into `data/cases/american-civil-war-union/` source pack; PPW #198 |
| **Passage records** (segmented passages with stable IDs) | Import later | Requires PPW passage schema validation; import during Milestone 16 |
| **Cluster profiles** (metaphor cluster annotation outputs) | Import later | Represent as analysis artifacts in Milestone 16; PPW #144 |
| **Stage 4A annotations** (model scoring records) | Reference only | Child-repo annotation artifacts; referenced by provenance link from PPW claims |
| **Stage 4H/4J records** (human coding and adjudication decisions) | Reference only | Reliability artifacts; inform PPW review-gate design but do not become PPW data |
| **Inter-annotator agreement metrics** | Reference only | Methodology context; referenced from PPW method note (PPW #146) |
| **Draft claim candidates** | Import now | As PPW `claims.json` entries with `reviewStatus: draft`; PPW #145 |
| **Codebook and methodology docs** | Reference only | Link from PPW method note; do not copy Quarto structure |
| **Quarto site pages** | Do not import | Child-repo site remains live; PPW will have its own Lincoln module page (PPW #175) |
| **Pipeline scripts** (`src/`, `scripts/`) | Do not import | Child-repo-specific pipeline; inform PPW pipeline design (Milestone 19) |
| **Test fixtures** | Do not import | Child-repo-specific stage fixtures; inform PPW fixture design (Milestone 19) |
| **Reliability sampling design** | Import later | After PPW review-gate framework exists (Milestone 19); PPW #199 |

### Rights and provenance rules for Lincoln corpus texts

Lincoln's own writings (1838–1865) are in the public domain. Third-party texts in the child-repo corpus (scholarly commentary, translations, editorial apparatus) require review before import:

- Scholarly commentary and editorial apparatus are **reference only** until rights are confirmed.
- Translations of non-English sources require confirmation that the translation is public domain or licensed.
- All corpus texts imported to PPW must have a `bibliography/sources.csl.json` entry with publisher, edition, and access URL or archive reference.
- If a text's rights status is uncertain, record it as `reference only` in the PPW source pack with a `rightsNote` field pending resolution.

---

## `sacrifice-law-workbench`

| Artifact class | Import decision | Notes |
|---|---|---|
| **Corpus document metadata** | Import now | Via PPW corpus registry (Milestone 17); four-case corpus (American Revolution, Napoleon, Lincoln, Hitler) |
| **Corpus manifest** (manifest-driven pipeline output) | Import now | As PPW corpus registry entries; confirm case mapping first (PPW #149) |
| **Raw text files** | Import later | After PPW Sacrifice Law case mapping is confirmed (PPW #149–#151) |
| **Pre-v1 corpus expansion tracking context** | Reference only | SLW #174 context recorded in PPW #110; no separate import |
| **Reliability sampling design** | Import later | After PPW review-gate framework (Milestone 19); PPW #192 |
| **Quarto research site pages** | Do not import | Child-repo site remains live; PPW will have its own Sacrifice Law module pages (PPW #176, #178) |
| **Pipeline scripts** | Do not import | Child-repo-specific; inform PPW pipeline design |
| **Draft comparative claims** | Import later | After PPW Sacrifice Law corpus registry established (Milestone 17); PPW #154 |

### Rights and provenance rules for Sacrifice Law corpus texts

The Sacrifice Law corpus spans American Revolution, Napoleonic, Lincoln, and Nazi-era texts. Rights vary significantly:

- Texts from before ~1928 are generally in the public domain in the US; confirm by publication date.
- Nazi-era texts: some are out of copyright; translations and scholarly apparatus require review.
- Any text with uncertain rights status is **reference only** until confirmed.
- All imported texts must have a complete `bibliography/sources.csl.json` entry.

---

## Rules applying to both projects

1. **No blind Quarto merge.** Child-repo Quarto site structures (`_quarto.yml`, `site/` directories, page templates) must not be copied into PPW. PPW has its own site structure and navigation. Migrate content and reference artifacts; do not merge build configuration.

2. **Old publication structures stay in child repos.** Release checklists, publication package updates, and site-navigation changes from the child repos (LMA #107, #130–#132; SLW #183) are child-repo deliverables. PPW will produce its own publication artifacts for the evidence browser (Milestone 20).

3. **Provenance links are mandatory.** Every artifact imported to PPW must include a `sourceUrl` or `provenance` field pointing to its child-repo origin (issue, file path, or commit). This applies to corpus registry entries, source pack entries, passage records, and draft claims.

4. **Migrated child issues are documentation, not data.** The migration notes docs in `docs/migration/` record what was done; they do not constitute imported data. Actual data import happens through the PPW schema-validated pipeline.

5. **Staged import by milestone.** Import decisions marked "Import later" are gated on milestone foundations. Do not pre-import artifacts before the schema (Milestone 14), registry (Milestone 15), or module structure (Milestones 16–17) that validates them exists.
