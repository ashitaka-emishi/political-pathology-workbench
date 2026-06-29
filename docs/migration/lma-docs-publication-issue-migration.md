# Lincoln Metaphor Analysis — Documentation, Publication, and Site Issue Migration

Migration record for LMA documentation, publication, and site issues into PPW.
Part of [#113](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/113) (Milestone 12: Child-Project Issue Migration).

Source data: `data/migration/lincoln-metaphor-analysis-open-issues.json`
Manifest entries: `data/migration/child-issue-migration-manifest.json` (sourceRepo: `ashitaka-emishi/lincoln-metaphor-analysis`, targetPpwIssue: 113)

All 12 entries carry disposition **`merge-into-ppw-issue`**: the child-repo publication site, release checklists, and version-specific site navigation are child-repo-specific artifacts. The child-repo GitHub Pages site remains live and is not duplicated in PPW. PPW will present Lincoln evidence-module content through its own unified Quarto site (Milestone 20), informed by the method documentation and corpus documentation in the child repo.

---

## Group 1 — v2 Publication and Method Documentation (LMA #78, #82, #84)

**Classification: leave-in-child / adapt-pattern**

These v2 artifacts (Stage 4M publication package, codebook revision notes, release checklist) are completed child-repo deliverables. The publication site at the child-repo GitHub Pages URL remains the authoritative home for this material. The codebook revision notes are the most transferable: they document methodology decisions that inform PPW evidence-module annotation standards.

| LMA issue | Title | PPW classification |
|---|---|---|
| [#78](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/78) | Update publication package for v2 Stage 4M | leave-in-child — child-repo publication site remains live |
| [#82](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/82) | Add Stage 4M codebook revision notes | adapt-pattern → PPW annotation methodology documentation (M20) |
| [#84](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/84) | Create v2 release checklist | leave-in-child — child-repo release artifact |

**Child-repo comment draft for Group 1**:

> This v2 publication/documentation issue has been inventoried as part of the PPW child-project issue migration ([ashitaka-emishi/political-pathology-workbench #113](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/113)).
>
> Disposition: **merge-into-ppw-issue** — the child-repo GitHub Pages site remains the authoritative home for v2 Stage 4M publication artifacts. Codebook revision notes will be referenced as methodology context when PPW Lincoln evidence-module documentation is developed (Milestone 20). No duplicate PPW site or issue has been created.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

## Group 2 — v3 Human Reliability Publication and Documentation (LMA #99–107)

**Classification: leave-in-child / adapt-pattern**

These v3 artifacts (human reliability report, Stage 4J adjudication results page, codebook revision notes, Stage 4H publication package, v3 release checklist) are child-repo publication deliverables. The child-repo site remains live. The methodology documentation (codebook revision notes, reliability report) is the most relevant to PPW: it records the inter-annotator design choices that inform PPW claim-promotion gate standards.

| LMA issue | Title | PPW classification |
|---|---|---|
| [#99](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/99) | Generate human reliability report | adapt-pattern → PPW reliability documentation (M19–20) |
| [#100](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/100) | Generate Stage 4J adjudication results page | leave-in-child — child-repo site page |
| [#101](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/101) | Generate Stage 4H/4J codebook revision notes | adapt-pattern → PPW annotation methodology documentation (M20) |
| [#106](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/106) | Update publication package for Stage 4H human reliability | leave-in-child — child-repo publication artifact |
| [#107](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/107) | Create v3 human reliability release checklist | leave-in-child — child-repo release artifact |

**Child-repo comment draft for Group 2**:

> This v3 publication/documentation issue has been inventoried as part of the PPW child-project issue migration ([ashitaka-emishi/political-pathology-workbench #113](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/113)).
>
> Disposition: **merge-into-ppw-issue** — the child-repo GitHub Pages site remains the authoritative home for v3 human reliability publication artifacts. Methodology documentation (reliability report, codebook revision notes) will be referenced when PPW Lincoln evidence-module documentation and reliability notes are developed (Milestones 19–20). No duplicate PPW site or issue has been created.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

## Group 3 — v4 Corpus Documentation and Site Navigation (LMA #124, #130, #131, #132)

**Classification: adapt → PPW Milestone 20 (Unified Site and Public Evidence Browser)**

These v4 documentation issues (corpus expansion impact report, site navigation update, publication package, release checklist) are the most forward-looking: they describe public-facing documentation for corpus expansion work that will also need to be represented in the PPW unified site. The child-repo site remains live, but PPW will also present Lincoln corpus evidence in its own evidence browser. These issues inform the Lincoln evidence-module pages in Milestone 20.

| LMA issue | Title | PPW classification |
|---|---|---|
| [#124](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/124) | Generate v4 corpus expansion impact report | adapt → PPW Lincoln case page / corpus summary (M20) |
| [#130](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/130) | Add v4 corpus documentation to site navigation | adapt → PPW unified site Lincoln navigation (M20) |
| [#131](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/131) | Update publication package for v4 corpus expansion | adapt → PPW Lincoln evidence-module public page (M20) |
| [#132](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/132) | Create v4 corpus expansion release checklist | adapt-pattern → PPW evidence-module release checklist (M20) |

**Child-repo comment draft for Group 3**:

> This v4 documentation/publication issue has been inventoried as part of the PPW child-project issue migration ([ashitaka-emishi/political-pathology-workbench #113](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/113)).
>
> Disposition: **merge-into-ppw-issue** — the child-repo GitHub Pages site remains live. The v4 corpus documentation and site navigation patterns from this issue will inform the Lincoln evidence-module pages in the PPW unified Quarto site (Milestone 20: Unified Site and Public Evidence Browser). No duplicate PPW site or issue has been created; the documentation concept will be adapted into PPW's evidence browser structure.
>
> This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

## Audit checklist

- [x] All 12 manifest entries scoped to PPW #113 inventoried
- [x] Every issue classified (leave-in-child / adapt-pattern / adapt)
- [x] No duplicate Quarto site introduced — child-repo GitHub Pages site remains live
- [x] Lincoln evidence-module pages planned under PPW Milestone 20
- [x] Publication-package issues distinguished from public pages vs. archival migration notes
- [x] Methodology documentation (codebook notes, reliability report) recorded for PPW reference
- [x] Comment drafts prepared for all 3 groups
- [ ] Maintainer approves and posts group comments on LMA issues
