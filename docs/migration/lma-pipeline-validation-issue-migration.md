# Lincoln Metaphor Analysis — Pipeline, Validation, and Fixture Issue Migration

Migration record for LMA pipeline, validation, and fixture issues into PPW.
Part of [#112](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/112) (Milestone 12: Child-Project Issue Migration).

Source data: `data/migration/lincoln-metaphor-analysis-open-issues.json`
Manifest entries: `data/migration/child-issue-migration-manifest.json` (sourceRepo: `ashitaka-emishi/lincoln-metaphor-analysis`, targetPpwIssue: 112)

All 25 entries carry disposition **`merge-into-ppw-issue`**: the work is relevant but the child-repo pipeline commands, stage identifiers, and fixture paths are child-repo-specific. No new PPW issues are created for these; instead they are classified below as **adapt**, **defer**, or **leave-in-child** and their patterns recorded as context for future PPW milestone work.

---

## Group 1 — v3 Human Reliability Pipeline (LMA #92–105)

**Classification: leave-in-child / adapt-pattern**

These issues represent completed or in-progress v3 reliability pipeline work (Stage 4H human coding, Stage 4J adjudication). The pipeline ran inside the child repo using child-repo-specific stage identifiers and scripts. PPW will not import Stage 4H/4J as-is; instead, their patterns inform the PPW claim-promotion and review-gate framework (Milestone 18).

| LMA issue | Title | PPW classification |
|---|---|---|
| [#92](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/92) | Ingest and validate human coder submissions | adapt-pattern → PPW review-gate ingestion (M18) |
| [#93](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/93) | Compute two-human inter-annotator agreement metrics | adapt-pattern → PPW reliability metrics (M19) |
| [#94](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/94) | Compare human coder outputs against Stage 4A reference | adapt-pattern → PPW claim-comparison gate (M18) |
| [#96](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/96) | Generate Stage 4J human adjudication queue | adapt-pattern → PPW adjudication queue (M18) |
| [#97](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/97) | Define Stage 4J adjudication decision schema | adapt-pattern → PPW adjudication schema (M14) |
| [#98](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/98) | Ingest Stage 4J adjudication decisions | adapt-pattern → PPW adjudication ingestion (M18) |
| [#102](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/102) | Add Stage 4H and Stage 4J pipeline commands | leave-in-child — stage identifiers are child-repo-specific |
| [#103](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/103) | Integrate Stage 4H and 4J into validation and status reporting | leave-in-child — status reporting is child-repo-specific |
| [#104](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/104) | Add guardrails preventing Stage 4H/4J from overwriting Stage 4A | adapt-pattern → PPW review-gate write-protection (M18) |
| [#105](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/105) | Add Stage 4H and 4J test fixtures | leave-in-child — fixtures target child-repo stage paths |

**Child-repo comment draft for Group 1** (for maintainer approval — apply to each issue individually or as a batch comment):

> This issue is part of the v3 human reliability pipeline (Stage 4H/4J) and has been inventoried as part of the PPW child-project issue migration ([ashitaka-emishi/political-pathology-workbench #112](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/112)).
>
> Disposition: **merge-into-ppw-issue** — the pipeline patterns from this issue inform PPW claim-promotion and review-gate design (Milestones 14, 18, 19), but the child-repo-specific stage identifiers and fixture paths are not carried into PPW verbatim. No duplicate PPW issue has been created.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

## Group 2 — v4 Corpus Schema (LMA #110–112)

**Classification: adapt → PPW Milestone 14 (Schema and Registry Foundation)**

These schema definitions (corpus document metadata, corpus inventory, provenance and source authority register) are directly applicable to PPW JSON schema design. Their structure should inform PPW corpus registry schema in Milestone 14.

| LMA issue | Title | PPW classification |
|---|---|---|
| [#110](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/110) | Create corpus document metadata schema | adapt → PPW corpus registry schema (M14) |
| [#111](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/111) | Create corpus inventory schema | adapt → PPW corpus registry schema (M14) |
| [#112](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/112) | Create corpus provenance schema and source authority register | adapt → PPW provenance schema + `bibliography/sources.csl.json` (M14) |

**Child-repo comment draft for Group 2**:

> This schema issue has been inventoried as part of the PPW child-project issue migration ([ashitaka-emishi/political-pathology-workbench #112](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/112)).
>
> Disposition: **merge-into-ppw-issue** — the schema design from this issue informs PPW corpus registry and provenance schema work in Milestone 14: Schema and Registry Foundation. No duplicate PPW issue has been created; the schema pattern will be adapted when Milestone 14 schema work begins.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

## Group 3 — v4 Corpus Pipeline and Fixtures (LMA #116–129, #133)

**Classification: adapt / defer → PPW Milestone 16 (Lincoln Deep Case Evidence Module)**

These pipeline, segmentation, validation, and fixture issues represent the operational implementation needed to ingest and process the expanded v4 corpus. The specific scripts and commands are child-repo-specific, but the pipeline architecture and validation patterns inform PPW corpus ingestion and segmentation work in Milestone 16.

| LMA issue | Title | PPW classification |
|---|---|---|
| [#116](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/116) | Implement v4 corpus inventory creation script | adapt → PPW corpus registry import (M16) |
| [#117](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/117) | Validate v4 corpus inventories | adapt → `npm run validate` corpus checks (M16) |
| [#118](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/118) | Validate v4 corpus provenance | adapt → PPW provenance validation (M16) |
| [#120](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/120) | Implement v4 corpus ingestion pipeline | adapt → PPW corpus ingestion (M16) |
| [#121](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/121) | Segment v4 core corpus and assign stable sentence IDs | adapt → PPW passage segmentation (M16) |
| [#122](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/122) | Validate v4 sentence ID stability | adapt → PPW passage ID stability checks (M16) |
| [#123](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/123) | Generate v4 corpus coverage report | defer → PPW reporting (M20) |
| [#126](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/126) | Create light annotation template for v4 validation corpus | adapt → PPW validation-tier annotation template (M16) |
| [#127](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/127) | Add v4 corpus pipeline commands | leave-in-child — commands target child-repo pipeline |
| [#128](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/128) | Integrate v4 corpus checks into validation and status reporting | adapt → `npm run validate` extensions (M16) |
| [#129](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/129) | Protect v1 corpus and Stage 4 annotations during v4 expansion | adapt → PPW write-protection and schema constraints (M16) |
| [#133](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/133) | Add v4 corpus pipeline test fixtures | adapt → PPW test fixtures under `src-js/` or `src-py/` (M19) |

**Child-repo comment draft for Group 3**:

> This pipeline/validation issue has been inventoried as part of the PPW child-project issue migration ([ashitaka-emishi/political-pathology-workbench #112](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/112)).
>
> Disposition: **merge-into-ppw-issue** — the pipeline and validation patterns from this issue inform PPW corpus ingestion, segmentation, and validation work in Milestone 16: Lincoln Deep Case Evidence Module (and Milestone 19 for fixtures). Child-repo-specific pipeline commands are not carried into PPW verbatim. No duplicate PPW issue has been created.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

## Audit checklist

- [x] All 25 manifest entries scoped to PPW #112 inventoried
- [x] Every issue classified (adapt / defer / leave-in-child)
- [x] No child-repo-specific command migrated verbatim
- [x] Schema patterns (Group 2) recorded for PPW Milestone 14 context
- [x] Pipeline/fixture patterns (Group 3) recorded for PPW Milestone 16 context
- [x] Reliability pipeline patterns (Group 1) recorded for PPW Milestones 18–19 context
- [x] Comment drafts prepared for all 3 groups
- [ ] Maintainer approves and posts group comments on LMA issues
