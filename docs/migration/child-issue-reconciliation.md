# Child Issue Migration Reconciliation

Reconciliation of migrated child-project PPW issues against existing PPW issues.
Part of [#114](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/114) (Milestone 12: Child-Project Issue Migration).

Scope: migrated PPW issues #192–#199 (created in #110–#111) against the 90 pre-migration PPW issues in `data/migration/political-pathology-workbench-open-issues-before-migration.json`.

---

## Migrated PPW issue index

| PPW issue | Source | Child issue | Target milestone |
|---|---|---|---|
| [#192](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/192) | SLW | [#183](https://github.com/ashitaka-emishi/sacrifice-law-workbench/issues/183) Revise reliability sampling design | Milestone 19 |
| [#194](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/194) | LMA | [#109](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/109) Define v4 corpus expansion architecture | Milestone 16 |
| [#195](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/195) | LMA | [#113](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/113) Create 48-document v4 core corpus inventory | Milestone 15 |
| [#196](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/196) | LMA | [#114](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/114) Create 75–100 document validation corpus inventory | Milestone 15 |
| [#197](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/197) | LMA | [#115](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/115) Create search-only reference corpus inventory | Milestone 15 |
| [#198](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/198) | LMA | [#119](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/119) Add raw text files for v4 core additions | Milestone 16 |
| [#199](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/199) | LMA | [#125](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/125) Update reliability sampling strategy for v4 corpus | Milestone 19 |

---

## Reconciliation findings

### Finding 1 — PPW #195/196/197 × PPW #137 (related scope, cross-linked)

**Migrated issues:** #195 (48-doc core inventory), #196 (75–100 doc validation inventory), #197 (search-only reference inventory) — all Milestone 15.

**Existing issue:** [PPW #137](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/137) — Create Lincoln corpus metadata record (Milestone 15).

**Finding:** #195–#197 define the three-tier corpus stratification that feeds directly into the Lincoln corpus metadata record (#137). They are not duplicates — #195–#197 establish the inventory contents per tier, while #137 creates the PPW corpus registry record that references them. Implement #195–#197 before #137.

**Action taken:** Cross-link comments added to #137, #195, #196, #197.

**Resolution:** No merge required. Implement in order: #195/#196/#197 → #137.

---

### Finding 2 — PPW #198 × PPW #143 (overlapping scope, cross-linked)

**Migrated issue:** #198 (Add raw text files for Lincoln v4 core corpus additions) — Milestone 16.

**Existing issue:** [PPW #143](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/143) — Import or reference Lincoln document metadata (Milestone 16).

**Finding:** Significant scope overlap. PPW #198 delivers the raw text files; PPW #143 imports/references the metadata for those same documents. Both target the Lincoln evidence module import. Not exact duplicates — #198 is file delivery, #143 is metadata record — but they must be sequenced: #198 before #143.

**Action taken:** Cross-link comments added to #143 and #198. No merge — maintaining them as separate issues preserves clear scope boundaries (files vs. metadata).

**Resolution:** Implement in order: #198 (raw text files) → #143 (metadata records).

---

### Finding 3 — PPW #194 × PPW #141/#143 (architectural prerequisite, cross-linked)

**Migrated issue:** #194 (Define Lincoln corpus expansion architecture) — Milestone 16.

**Existing issues:**
- [PPW #141](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/141) — Create Lincoln case corpus linkage (Milestone 16)
- [PPW #143](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/143) — Import or reference Lincoln document metadata (Milestone 16)

**Finding:** #194 is a prerequisite, not a duplicate. The three-tier stratification architecture it defines (core / validation / reference) determines which documents are included in the corpus linkage (#141) and which receive full metadata import (#143). Implementing #141 or #143 without #194 risks re-litigating corpus boundaries.

**Action taken:** Cross-link comments added to #141, #143, and #194.

**Resolution:** Implement in order: #194 (architecture) → #141/#143 (corpus linkage and metadata import).

---

### Finding 4 — PPW #192/#199 × Milestone 19 issues (no overlap)

**Migrated issues:** #192 (Sacrifice Law reliability sampling), #199 (Lincoln reliability sampling strategy) — both Milestone 19.

**Existing Milestone 19 issues:** #165–#172 (tracking, test fixtures for evidence-module/corpus/claim-promotion validation, generated index hardening, Python scoring fix).

**Finding:** No overlap. The existing M19 issues address PPW validation infrastructure and test fixtures. The migrated issues address corpus-specific reliability sampling design for SLW (#192) and Lincoln (#199). These are distinct concerns — the corpus sampling design feeds into the review-gate framework but doesn't duplicate the validation fixture or scoring issues.

**Resolution:** No action required. #192 and #199 stand as distinct M19 issues.

---

### Finding 5 — Evidence Chains milestone (#98–#103) vs. migrated issues (no overlap)

**Existing Evidence Chains issues:** #98 (detect orphaned passages/claims), #99 (require complete chain for gold cases), #100 (emit per-case chain JSON), #101 (auto-generate chain pages), #102 (render chain threading), #103 (derivedFrom/claimIds backfill).

**Finding:** No overlap with any migrated issue. Evidence Chains issues operate on existing PPW case data; migrated issues are about importing new evidence material from child repos.

**Resolution:** No action required.

---

## Summary

| Migrated issue | Overlap with existing PPW issue | Action |
|---|---|---|
| #192 | None | No action |
| #194 | #141, #143 (prerequisite) | Cross-linked |
| #195 | #137 (feeds into) | Cross-linked |
| #196 | #137 (feeds into) | Cross-linked |
| #197 | #137 (feeds into) | Cross-linked |
| #198 | #143 (overlapping scope) | Cross-linked; sequence #198 → #143 |
| #199 | None | No action |

No duplicate issues found. No existing PPW issues overwritten or silently re-scoped. All relationships are additive (prerequisite, feeds-into, or sequencing).
