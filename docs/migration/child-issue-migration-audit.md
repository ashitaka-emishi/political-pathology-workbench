# Child Issue Migration Audit

Final audit for Milestone 12: Child-Project Issue Migration.
Closes [#117](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/117).

Audit date: 2026-06-29
Sources: `data/migration/child-issue-migration-manifest.json`, `docs/migration/child-issue-migration-inventory.md`

---

## Summary counts

| Category | Count |
|---|---|
| Child issues inventoried | 49 |
| — sacrifice-law-workbench | 2 |
| — lincoln-metaphor-analysis | 47 |
| Migrated as new PPW issues | 7 |
| Merged into existing PPW migration coordination issues | 39 |
| — adapt / adapt-pattern (inform future PPW milestones) | 35 |
| — leave-in-child (child-repo-specific artifacts, no PPW equivalent) | 4 |
| Deferred (no PPW target yet) | 3 |
| Recommended for immediate closure | 0 |
| Maintainer decisions required | 3 (see below) |

**Totals check:** 7 + 39 + 3 = 49. Matches manifest. ✓

---

## Migrated as new PPW issues (7)

New PPW issues created from child-repo issues. Each links to its source for provenance.

| PPW issue | Source | Target milestone |
|---|---|---|
| [#192](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/192) — Revise reliability sampling design for Sacrifice Law corpus | SLW #183 | Milestone 19 |
| [#194](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/194) — Define Lincoln corpus expansion architecture | LMA #109 | Milestone 16 |
| [#195](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/195) — Create 48-document Lincoln v4 core corpus inventory | LMA #113 | Milestone 15 |
| [#196](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/196) — Create 75–100 document Lincoln validation corpus inventory | LMA #114 | Milestone 15 |
| [#197](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/197) — Create search-only Lincoln reference corpus inventory | LMA #115 | Milestone 15 |
| [#198](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/198) — Add raw text files for Lincoln v4 core corpus additions | LMA #119 | Milestone 16 |
| [#199](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/199) — Update reliability sampling strategy for Lincoln v4 corpus | LMA #125 | Milestone 19 |

Cross-link relationships documented in [child-issue-reconciliation.md](child-issue-reconciliation.md):
- PPW #195/196/197 feed into existing PPW #137 (Lincoln corpus metadata record, M15)
- PPW #198 is prerequisite for existing PPW #143 (import Lincoln document metadata, M16)
- PPW #194 is architectural prerequisite for existing PPW #141 and #143 (M16)

---

## Merged into PPW migration coordination issues (39)

These child-repo issues fold into the PPW Milestone 12 migration coordination issues rather than becoming standalone PPW issues. They are not duplicated; their patterns are documented as context for future PPW milestone work.

### Sub-classification: adapt / adapt-pattern (35)

Child-repo design decisions, schema definitions, and pipeline patterns that inform PPW work in Milestones 14–20. Documented in:
- [lma-tracking-corpus-issue-migration.md](lma-tracking-corpus-issue-migration.md) — LMA #134 (tracking context)
- [lma-pipeline-validation-issue-migration.md](lma-pipeline-validation-issue-migration.md) — LMA schema patterns (→ M14), pipeline patterns (→ M16), reliability patterns (→ M18–19)
- [lma-docs-publication-issue-migration.md](lma-docs-publication-issue-migration.md) — LMA methodology docs (→ M20)
- [sacrifice-law-workbench-issue-migration.md](sacrifice-law-workbench-issue-migration.md) — SLW #174 (tracking context)

### Sub-classification: leave-in-child (4)

Child-repo-specific pipeline command issues with no direct PPW equivalent. Child-repo artifacts are preserved; PPW will implement its own equivalents when the relevant milestones are reached.

| Issue | Reason |
|---|---|
| LMA #102 — Add Stage 4H and Stage 4J pipeline commands | Stage identifiers are child-repo-specific |
| LMA #103 — Integrate Stage 4H/4J into validation and status reporting | Status reporting is child-repo-specific |
| LMA #105 — Add Stage 4H and 4J test fixtures | Fixture paths target child-repo pipeline |
| LMA #127 — Add v4 corpus pipeline commands | Commands target child-repo pipeline |

---

## Deferred (3)

No PPW target issue created yet. Resume condition: PPW Milestone 19 (Validation, Generation, and Test Fixtures) foundations must exist before these are acted on.

| Source | Issue | Resume condition |
|---|---|---|
| LMA | [#85](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/85) — Tracking v2.0 Multi-Model Reliability Stress Test | After M19 validation fixture foundations |
| LMA | [#95](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/95) — Classify human coder disagreements | After M19 claim-promotion gate foundations |
| LMA | [#108](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/108) — Tracking v3.0 Human Inter-Annotator Reliability Study | After M19 validation fixture foundations |

---

## Maintainer decisions required

### Decision 1 — Post supersession comments on 49 child issues

**Document:** [child-repo-supersession-comments.md](child-repo-supersession-comments.md)

Ready-to-post comments are prepared for all 49 child issues. The maintainer must review and post each comment individually (or in groups as defined in that document). No comments have been posted automatically.

**Recommended action:** Review comments and post on child issues when ready to signal that migration is complete to collaborators or external readers.

### Decision 2 — Apply inactive notices to child repositories

**Document:** [child-repo-inactive-notices.md](child-repo-inactive-notices.md)

Prepared notices include: repository description updates, README blockquote notices, and Quarto callout blocks for GitHub Pages landing pages. Nothing has been applied to the child repos.

**Recommended action:** Apply description updates and README notices when ready to mark the repositories as inactive. Apply GitHub Pages callout blocks and re-render sites at the same time.

### Decision 3 — Deferred issue lifecycle

LMA #85, #95, and #108 are deferred with no PPW target yet. Once Milestone 19 work begins, the maintainer should decide whether to:
- Create new PPW issues for this work at that point, or
- Fold the context into the M19 tracking issue (#165).

**Recommended action:** Revisit when Milestone 19 (Validation, Generation, and Test Fixtures) is opened for implementation.

---

## Risks and unresolved dependencies

| Risk | Severity | Notes |
|---|---|---|
| PPW #195/196/197 scope may overlap with #137 if implemented independently | Low | Cross-link comments added; implement in order (#195–197 before #137) |
| PPW #198 and #143 may duplicate work if sequenced incorrectly | Low | Cross-link comments added; implement #198 before #143 |
| Deferred LMA issues (#85, #95, #108) may be forgotten when M19 opens | Low | Noted in M19 tracking issue #165 context; revisit at M19 kickoff |
| Child-repo GitHub Pages sites may re-render and lose notices if not pinned | Low | Only applicable after inactive notices are applied by maintainer |

---

## Migration deliverables index

| Document | Purpose |
|---|---|
| [child-issue-migration-inventory.md](child-issue-migration-inventory.md) | Human-readable inventory of all 49 child issues with dispositions |
| `data/migration/child-issue-migration-manifest.json` | Machine-readable manifest with full metadata per issue |
| [child-issue-label-and-milestone-map.md](child-issue-label-and-milestone-map.md) | Label and milestone mapping from child-repo to PPW |
| [sacrifice-law-workbench-issue-migration.md](sacrifice-law-workbench-issue-migration.md) | SLW issue migration record and comment drafts |
| [lma-tracking-corpus-issue-migration.md](lma-tracking-corpus-issue-migration.md) | LMA tracking + corpus-expansion migration record |
| [lma-pipeline-validation-issue-migration.md](lma-pipeline-validation-issue-migration.md) | LMA pipeline + validation migration record and classification |
| [lma-docs-publication-issue-migration.md](lma-docs-publication-issue-migration.md) | LMA docs + publication migration record |
| [child-issue-reconciliation.md](child-issue-reconciliation.md) | Reconciliation of migrated PPW issues vs. existing PPW issues |
| [child-repo-supersession-comments.md](child-repo-supersession-comments.md) | Ready-to-post comments for all 49 child issues |
| [child-repo-inactive-notices.md](child-repo-inactive-notices.md) | Inactive notices for child repos and GitHub Pages sites |

---

## Next recommended milestone

**Milestone 13: Architecture and Governance Baseline** — the next milestone in sequence. It establishes the evidence-module architecture documentation, claim-promotion policy, imported-project boundaries, and repository glossary that all downstream evidence-module work (Milestones 14–21) depends on.

Key Milestone 13 issues: #118 (tracking), #119 (evidence-module architecture), #120 (claim-promotion policy), #121 (imported-project boundaries), #122 (glossary), #123 (child-repo lifecycle).

**Milestone 12 completion status:** All 12 child migration issues (#106–#117) are closed. The three maintainer decisions above are the only remaining open items. The milestone can be considered complete from a PPW perspective; the maintainer actions (posting comments, applying inactive notices) are out-of-band and do not block Milestone 13 work.
