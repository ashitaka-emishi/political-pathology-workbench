# Lincoln Metaphor Analysis — Tracking and Corpus-Expansion Issue Migration

Migration record for LMA tracking and corpus-expansion issues into PPW.
Part of [#111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111) (Milestone 12: Child-Project Issue Migration).

Source data: `data/migration/lincoln-metaphor-analysis-open-issues.json`
Manifest entries: `data/migration/child-issue-migration-manifest.json` (sourceRepo: `ashitaka-emishi/lincoln-metaphor-analysis`, targetPpwIssue: 111)

---

## Issue disposition table

| LMA issue | Title | Disposition | PPW target | Target milestone |
|---|---|---|---|---|
| [#134](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/134) | Tracking - v4.0 Corpus Expansion and Stratified Validation Corpus | `merge-into-ppw-issue` | [PPW #111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111) — checklist context | Milestone 12 |
| [#109](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/109) | Define v4 corpus expansion architecture | `migrate-as-ppw-issue` | [PPW #194](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/194) | Milestone 16 |
| [#113](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/113) | Create 48-document v4 core corpus inventory | `migrate-as-ppw-issue` | [PPW #195](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/195) | Milestone 15 |
| [#114](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/114) | Create 75–100 document validation corpus inventory | `migrate-as-ppw-issue` | [PPW #196](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/196) | Milestone 15 |
| [#115](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/115) | Create search-only reference corpus inventory | `migrate-as-ppw-issue` | [PPW #197](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/197) | Milestone 15 |
| [#119](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/119) | Add raw text files for v4 core additions | `migrate-as-ppw-issue` | [PPW #198](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/198) | Milestone 16 |
| [#125](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/125) | Update reliability sampling strategy for v4 corpus | `migrate-as-ppw-issue` | [PPW #199](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/199) | Milestone 19 |

---

## PPW issue mapping details

### LMA #134 → PPW #111 (checklist context)

LMA #134 is the v4.0 tracking issue for corpus expansion and stratified validation corpus work. Its tracking context becomes background for PPW #111, which coordinates the migration of all LMA corpus-expansion issues. No separate PPW tracking issue created.

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been inventoried as part of the PPW child-project issue migration ([ashitaka-emishi/political-pathology-workbench #111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111)).
>
> Disposition: **merge-into-ppw-issue** — the v4.0 corpus expansion tracking context has been recorded in the PPW Lincoln corpus migration issue. Individual corpus-expansion work items have been migrated to dedicated PPW issues under Milestones 15, 16, and 19.
>
> This issue will remain open until the PPW Lincoln evidence module (Milestone 16) is established and the maintainer approves supersession. Do not close without maintainer approval.

---

### LMA #109 → PPW #194 (Milestone 16)

Architecture issue. The v4 corpus stratification design (core / validation / reference tiers) is adapted into a PPW architecture record for the Lincoln evidence module.

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been migrated to PPW as part of the child-project issue migration ([ashitaka-emishi/political-pathology-workbench #111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111)).
>
> Disposition: **migrate-as-ppw-issue** — the v4 corpus architecture work has been carried forward to [PPW #194 — Define Lincoln corpus expansion architecture for PPW evidence module](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/194), targeted at Milestone 16: Lincoln Deep Case Evidence Module.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

### LMA #113 → PPW #195 (Milestone 15)

48-document core corpus inventory. Becomes PPW corpus registry entries for the fully-annotated Lincoln set.

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been migrated to PPW as part of the child-project issue migration ([ashitaka-emishi/political-pathology-workbench #111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111)).
>
> Disposition: **migrate-as-ppw-issue** — the 48-document core corpus inventory work has been carried forward to [PPW #195 — Create 48-document Lincoln v4 core corpus inventory](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/195), targeted at Milestone 15: Evidence Module Metadata Import.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

### LMA #114 → PPW #196 (Milestone 15)

75–100 document validation corpus inventory. Becomes PPW registry entries for the validation tier.

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been migrated to PPW as part of the child-project issue migration ([ashitaka-emishi/political-pathology-workbench #111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111)).
>
> Disposition: **migrate-as-ppw-issue** — the validation corpus inventory work has been carried forward to [PPW #196 — Create 75–100 document Lincoln validation corpus inventory](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/196), targeted at Milestone 15: Evidence Module Metadata Import.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

### LMA #115 → PPW #197 (Milestone 15)

Search-only reference corpus inventory. Becomes PPW registry entries for the reference tier (no annotation).

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been migrated to PPW as part of the child-project issue migration ([ashitaka-emishi/political-pathology-workbench #111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111)).
>
> Disposition: **migrate-as-ppw-issue** — the reference corpus inventory work has been carried forward to [PPW #197 — Create search-only Lincoln reference corpus inventory](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/197), targeted at Milestone 15: Evidence Module Metadata Import.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

### LMA #119 → PPW #198 (Milestone 16)

Raw text files for v4 core corpus. Becomes PPW source-pack entries for the Lincoln evidence module.

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been migrated to PPW as part of the child-project issue migration ([ashitaka-emishi/political-pathology-workbench #111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111)).
>
> Disposition: **migrate-as-ppw-issue** — the raw text file work has been carried forward to [PPW #198 — Add raw text files for Lincoln v4 core corpus additions](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/198), targeted at Milestone 16: Lincoln Deep Case Evidence Module.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

### LMA #125 → PPW #199 (Milestone 19)

Reliability sampling strategy update for the expanded v4 corpus. Carries forward to PPW claim-promotion gate framework.

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been migrated to PPW as part of the child-project issue migration ([ashitaka-emishi/political-pathology-workbench #111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111)).
>
> Disposition: **migrate-as-ppw-issue** — the reliability sampling strategy work has been carried forward to [PPW #199 — Update reliability sampling strategy for Lincoln v4 corpus](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/199), targeted at Milestone 19: Validation, Generation, and Test Fixtures.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

## Audit checklist

- [x] All 7 manifest entries scoped to PPW #111 inventoried
- [x] LMA #134 (tracking) merged as context; no duplicate tracker created
- [x] PPW issues created for all 6 `migrate-as-ppw-issue` entries (PPW #194–#199)
- [x] All PPW issues include source provenance links
- [x] All PPW issues use PPW architecture language
- [x] Corpus issues tied to Lincoln evidence module milestones (15, 16)
- [x] Reliability issue tied to PPW claim-promotion gates (Milestone 19)
- [x] Comment drafts prepared for all 7 LMA issues
- [ ] Maintainer approves and posts comments on LMA #134, #109, #113, #114, #115, #119, #125
