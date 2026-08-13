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

## `lincoln-war-research-project`

**Disposition:** PPW-coordinated supplemental Lincoln study; do not register as
a separate evidence module yet. See
[`docs/migration/lwrp-intake-disposition.md`](../migration/lwrp-intake-disposition.md).

The Lincoln War Research Project overlaps with the existing
`american-civil-war-union` case and the `lincoln-metaphor-analysis` evidence
module. It should be coordinated inside PPW where possible, but its artifacts
need per-artifact provenance and review decisions before import.

| Artifact class | Import decision | Notes |
|---|---|---|
| **Source register metadata** | Import later | Candidate source-pack or corpus-extension input after source-rights and provenance audit |
| **Raw and normalized source texts** | Import later | Only public-domain/openly available materials with hashes, retrieval metadata, and witness-specific identity may be considered |
| **Gettysburg Address witness records** | Import later | Preserve copy-specific variants; do not harmonize Nicolay, Hay, Everett, Bancroft, and Bliss witnesses |
| **Dossier and claim inventory** | Import later | Candidate draft-claim context only; no PPW finding or score impact without claim-promotion review |
| **Review and human-decision logs** | Reference only | Governance context unless PPW creates matching review artifacts |
| **Methodology-paper artifacts** | Reference only | May inform PPW methodology notes after separate review |
| **Quarto site and generated publication files** | Do not import | LWRP site remains external; PPW has its own site structure |
| **Pipeline scripts and project scaffolding** | Do not import | Project-specific tooling; do not merge into PPW |

### Rights and provenance rules for LWRP intake

- Treat the 2026-07-16 LWRP corpus approval as source-repo authority to proceed
  with acquisition, not as PPW approval for claim promotion or publication.
- Verify each source row before import, including access URL, retrieval method,
  checksum, rights status, and raw/normalized separation.
- Preserve Gettysburg Address manuscript witnesses as distinct source records.
- Keep copyrighted secondary works as bibliographic/reference records only
  unless a lawful PPW use case is separately approved.

---

## `john-brown-metaphor-analysis`

**Disposition:** Planned PPW deep-case candidate; defer registry entry until
PPW source/corpus audit and case-boundary approval. See
[`docs/migration/jbma-intake-disposition.md`](../migration/jbma-intake-disposition.md).

John Brown Metaphor Analysis is a plausible future PPW deep-case module, but it
should not be folded into the existing Lincoln case. Its likely PPW target is a
new `john-brown-harpers-ferry` case with a later
`john-brown-metaphor-analysis` evidence module, pending maintainer approval.

| Artifact class | Import decision | Notes |
|---|---|---|
| **Source-register metadata** | Import later | Audit 20 source rows for rights, provenance, attribution, and witness class |
| **Raw and normalized corpus files** | Import later | Only approved source rows with verified acquisition and raw/normalized separation may be considered |
| **Passage locator and segmentation notes** | Import later | Candidate passage-audit input; exact quotations still need witness-level checks |
| **Textual-variant notes** | Import later | Preserve variant and transmission caveats before any coding |
| **Evidence matrix** | Do not import now | Source file is header-only at intake |
| **Claims register** | Do not import now | Source file is header-only at intake |
| **Approval and source-substitution notes** | Reference only | Governance context until re-expressed as PPW gates |
| **Quarto site and generated publication files** | Do not import | JBMA site remains external; PPW has its own site structure |
| **Pipeline scripts and project scaffolding** | Do not import | Project-specific tooling; do not merge into PPW |

### Rights and provenance rules for JBMA intake

- Treat source-repo corpus and source-substitution approvals as scoped source
  history, not PPW approval for evidence import, interpretation, or publication.
- Audit Brown authorship and attribution separately for autograph manuscripts,
  copied extracts, reported statements, government records, newspaper variants,
  and edited abolitionist pamphlet witnesses.
- Keep discovery-only, OCR-noisy, rights-blocked, and attribution-uncertain
  sources out of PPW evidence records until their gates are resolved.
- Do not create a PPW module-registry entry until the case boundary and initial
  source/corpus import plan are approved.

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
