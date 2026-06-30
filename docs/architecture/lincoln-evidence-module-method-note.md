# Lincoln Evidence Module — Method Note

**Governing issue:** PPW #146  
**Evidence module:** `lincoln-metaphor-analysis`  
**Case:** `american-civil-war-union`  
**Milestone:** 16 — Lincoln Deep Case Evidence Module

---

## 1. Role of the Lincoln Module

The Lincoln evidence module (`lincoln-metaphor-analysis`) is a **deep single-case module**, not a comparative sample. Its purpose is to provide a thoroughly annotated primary evidence base for the `american-civil-war-union` case — tracing the causal mechanisms by which Lincoln's rhetorical architecture shaped the Union's sacred political order.

This distinguishes it from the Sacrifice Law Workbench (`sacrifice-law-workbench`), which includes Lincoln documents as one of four comparative cases under Koenigsberg's Law of Sacrifice. The two modules address different research questions:

| Module | Research question | Lincoln role |
|---|---|---|
| `lincoln-metaphor-analysis` | How did Lincoln's metaphor system construct the Union's moral framework? | Primary subject — deep single-case mechanism study |
| `sacrifice-law-workbench` | Does Koenigsberg's cross-case sacrifice law hold across political leaders? | One comparative case among four |

The two corpora are explicitly distinguished in `data/cases/american-civil-war-union/corpora/lincoln-deep-28.json`.

---

## 2. Relationship to `american-civil-war-union`

The Lincoln module feeds the `american-civil-war-union` case through three channels:

1. **Corpus metadata** — `data/corpora/lincoln-deep-28/documents.json` registers 36 documents in the core tier (28 confirmed v3 baseline + 8 planned v4 additions from LMA #113).
2. **Evidence-chain links** — `data/cases/american-civil-war-union/analysis/evidence-module-links.json` maps artifact families to PPW evidence-chain layers (passages, claims, interpretations, scores).
3. **Draft claims** — `data/claim-promotion/draft-claims.json` registers 4 conservative draft claim candidates derived from LMA cluster profiling.

No claims from this module have been reviewed or promoted into PPW findings.

---

## 3. Corpus Tiers

The lincoln-deep-28 corpus has three annotation tiers, defined in `documentTiers` blocks in `documents.json`:

| Tier | Target size | Annotation scope | Status |
|---|---|---|---|
| Core | 48 docs (36 registered) | Full pipeline: passages → claims → interpretations → scores | Inventory registered (PPW #195); passage import pending (PPW #143) |
| Validation | 75-100 docs total | Passage segmentation only; no claim extraction or scoring | Scope defined (PPW #196); specific documents pending LMA #114 |
| Reference | Open-ended | Search indexing only; no annotation | Scope defined (PPW #197); specific documents pending LMA #115 |

**What "core tier annotation" means in PPW:** A document in the core tier is eligible for full annotation — passage segmentation, metaphor cluster coding, claim candidate generation, and scoring. It does not mean that annotation is complete; all annotation work is scheduled for Milestone 16 (passages) and subsequent milestones (claims, scoring).

---

## 4. Artifact Levels

The module's artifact families and their PPW status are recorded in `data/corpora/lincoln-deep-28/artifact-index.json`. In summary:

| Artifact family | Disposition | Can generate draft claims | Status |
|---|---|---|---|
| Corpus metadata | Imported | No | Complete (PPW #195-#197, #143) |
| Raw text | Pending import | No | Milestone 16, PPW #198 |
| Passage records | Pending import | No | Milestone 16, PPW #143 |
| Metaphor cluster profiles | Pending import | Yes | Milestone 16, PPW #144 |
| Draft claims | Pending import | Yes | Milestone 16, PPW #145 (stub created) |
| Evidence-chain links | Partial | No | Structure created PPW #142 |
| Reliability artifacts | Reference only | No | Milestone 19, PPW #199 |
| Methodology docs | Reference only | No | Linked from this note |
| Pipeline scripts | Not imported | No | Child-repo specific |
| Publication site | Not imported | No | Child-repo site canonical |

---

## 5. Claim-Promotion Limits

All claims in `data/claim-promotion/draft-claims.json` carry `reviewStatus: draft` and `scoreImpact: candidate`. **No Lincoln metaphor claim has been reviewed or promoted into a PPW finding.**

Promotion requires:
1. Passage records imported and claims anchored to specific passages (PPW #143)
2. Inter-annotator reliability check completed (PPW #199, Milestone 19)
3. Claim-promotion gate passed (PPW #129, Milestone 18)

Until these prerequisites are met, Lincoln module claims must not be cited as PPW findings or used to justify case scores.

---

## 6. Child Repository

The lincoln-metaphor-analysis child repository (`ashitaka-emishi/lincoln-metaphor-analysis`) remains the canonical source for:
- Raw annotation records (Stage 4A model scoring, Stage 4H/4J human coding)
- Quarto publication site
- Pipeline scripts

The child-repo source is documented in `data/evidence-modules/lincoln-metaphor-analysis/provenance.json`. Open child-repo issues governing PPW work are tracked in `data/evidence-modules/lincoln-metaphor-analysis/source-issue-map.json`.

---

## 7. Related Documents

- `data/cases/american-civil-war-union/corpora/lincoln-deep-28.json` — case-corpus linkage
- `data/corpora/lincoln-deep-28/corpus.json` — corpus record
- `data/corpora/lincoln-deep-28/documents.json` — 36-document inventory with tier definitions
- `data/corpora/lincoln-deep-28/artifact-index.json` — all artifact families
- `data/cases/american-civil-war-union/analysis/evidence-module-links.json` — artifact-to-layer mapping
- `data/claim-promotion/draft-claims.json` — 4 draft claim candidates
- `docs/architecture/evidence-modules.md` — general evidence-module architecture
- `docs/architecture/claim-promotion.md` — claim-promotion gate design
- `docs/migration/lincoln-module-migration-audit.md` — Milestone 16 migration audit (PPW #147)
