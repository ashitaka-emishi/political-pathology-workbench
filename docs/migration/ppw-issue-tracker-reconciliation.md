# PPW Issue Tracker Reconciliation

Final issue-tracker reconciliation for [#184](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/184).

Audit date: 2026-07-01

Sources checked:

- `data/migration/child-issue-migration-manifest.json`
- `docs/migration/child-issue-migration-audit.md`
- `docs/migration/child-issue-reconciliation.md`
- `data/evidence-modules/lincoln-metaphor-analysis/source-issue-map.json`
- `data/evidence-modules/sacrifice-law-workbench/source-issue-map.json`
- Live GitHub issue metadata for PPW Milestones 13, 15, 16, 19, 20, and 21

---

## Summary

The PPW issue tracker is reconciled for the child-issue migration and final
evidence-module integration pass.

- The seven original standalone migrated PPW issues are closed and assigned to
  the expected PPW milestones. Two later reliability successor issues, #300 and
  #301, are open in Milestone 21 for resumed LMA tracker migration.
- Each standalone migrated issue body retains child-source provenance.
- No duplicate active migrated issues remain open.
- The remaining open deferred LMA trackers now have PPW-native successor issues
  after PPW #165 recorded Milestone 19 complete: LMA #85 maps to PPW #300 and
  LMA #108 maps to PPW #301. A `deferred` label remains on each source issue in
  `lincoln-metaphor-analysis` until maintainer-approved supersession comments
  and closures are posted.
- Milestone tracking issues now reflect the current state for the evidence
  module integration milestones checked in this audit.
- Remaining open work is limited to Milestone 21 transition tasks: final child
  comments, child-repository lifecycle decision, and integration release/tag
  preparation.

## Standalone Migrated Issues

| PPW issue | Source issue | Expected milestone | Live state | Provenance |
|---|---|---|---|---|
| [#192](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/192) | [SLW #183](https://github.com/ashitaka-emishi/sacrifice-law-workbench/issues/183) | Milestone 19 | Closed | Present in issue body |
| [#194](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/194) | [LMA #109](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/109) | Milestone 16 | Closed | Present in issue body |
| [#195](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/195) | [LMA #113](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/113) | Milestone 15 | Closed | Present in issue body |
| [#196](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/196) | [LMA #114](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/114) | Milestone 15 | Closed | Present in issue body |
| [#197](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/197) | [LMA #115](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/115) | Milestone 15 | Closed | Present in issue body |
| [#198](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/198) | [LMA #119](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/119) | Milestone 16 | Closed | Present in issue body |
| [#199](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/199) | [LMA #125](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/125) | Milestone 19 | Closed | Present in issue body |
| [#300](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/300) | [LMA #85](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/85) | Milestone 21 | Open | Present in issue body |
| [#301](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/301) | [LMA #108](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/108) | Milestone 21 | Open | Present in issue body |

The original duplicate analysis in
[`child-issue-reconciliation.md`](child-issue-reconciliation.md) remains valid:
#194, #195-#197, and #198 were sequencing or prerequisite relationships, not
duplicates requiring issue merges. #192 and #199 remained distinct
reliability-sampling issues.

## Deferred Child Issues

| Source issue | Disposition | Live label | PPW target | Resume condition |
|---|---|---|---|---|
| [LMA #85](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/85) | `migrate-as-ppw-issue` after original `defer-to-post-integration` | `deferred` | [PPW #300](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/300) | Satisfied by PPW #165 closure |
| [LMA #108](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/108) | `migrate-as-ppw-issue` after original `defer-to-post-integration` | `deferred` | [PPW #301](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/301) | Satisfied by PPW #165 closure |

PPW #300 and #301 are successor issues, not literal duplicates of the LMA
trackers. Posting supersession comments and closing LMA #85/#108 remains an
explicit maintainer decision. This audit created the `deferred` label in
`ashitaka-emishi/lincoln-metaphor-analysis` and applied it to the source issues
so the child tracker matches the migration disposition until that approval is
given. LMA #95 was later completed in the child repository and is no longer part
of the open deferred set. The reliability successor records are visible in
`data/migration/child-issue-migration-manifest.json`,
`data/evidence-modules/lincoln-metaphor-analysis/source-issue-map.json`,
[`child-repo-supersession-comments.md`](child-repo-supersession-comments.md),
and [`child-repository-supersession-plan.md`](child-repository-supersession-plan.md).

## Tracking Issue Corrections

The Milestone 13 tracker,
[#118](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/118),
was closed but still had unchecked child issue boxes for #119-#123. This audit
updated the tracker body to check all five closed child issues and record that
the completion definition was met.

Other checked trackers already matched live issue state:

| Tracker | Milestone | Status |
|---|---|---|
| [#105](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/105) | Milestone 12 | Closed and checked |
| [#134](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/134) | Milestone 15 | Closed and checked |
| [#140](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/140) | Milestone 16 | Closed and checked |
| [#165](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/165) | Milestone 19 | Closed and checked |
| [#173](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/173) | Milestone 20 | Closed and checked |
| [#181](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/181) | Milestone 21 | Open; #182 and #183 checked, #184-#187 remain |

## Remaining Work

Issue #184 does not require closing, merging, or relabeling duplicate migrated
issues. The remaining tracker work belongs to later Milestone 21 issues and the
resumed reliability successor issues created from #297:

- [#185](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/185) prepares final child-repository comments.
- [#186](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/186) records the child-repository lifecycle decision.
- [#187](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/187) tags or prepares the integration release.
- [#300](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/300) resumes the LMA #85 multi-model reliability migration.
- [#301](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/301) resumes the LMA #108 human inter-annotator reliability migration.

## Acceptance Criteria Status

| Criterion | Status |
|---|---|
| Migrated issues have correct milestones | Met |
| Migrated issues have source links | Met |
| Duplicate migrated issues are closed or merged only with maintainer approval | Met; no duplicate merge required |
| Deferred issues are labeled | Met for LMA #85 and #108 pending maintainer-approved supersession closure; PPW successor issues are #300 and #301 |
| Tracking issues reflect current state | Met after updating #118 |
| Child-source provenance is visible | Met |
