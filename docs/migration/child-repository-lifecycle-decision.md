# Child Repository Lifecycle Decision

Decision record for [#186](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/186).

Decision date: 2026-07-01

## Decision

Both child repositories remain open, public, and unarchived as
reduced-maintenance provenance sources.

| Repository | Lifecycle state | Repository access | GitHub Pages | Issue tracker | New implementation work |
|---|---|---|---|---|---|
| `lincoln-metaphor-analysis` | Reduced-maintenance source | Open, public, not archived | Remains published | Provenance, maintenance, and deferred-source records only | PPW only |
| `sacrifice-law-workbench` | Reduced-maintenance source | Open, public, not archived | Remains published | Provenance and maintenance only | PPW only |

This chooses option 3 from #186 for both child repositories: keep open for
provenance and minor maintenance. It does not archive either repository, freeze
either repository through a GitHub setting, unpublish either GitHub Pages site,
or close child issues without maintainer approval.

## Rationale

The final evidence-module integration audit establishes PPW as the coordination
home for evidence-module metadata, claim promotion, generated indexes,
validation, and public evidence-browser pages. The child repositories still
carry source provenance that should remain inspectable:

- `lincoln-metaphor-analysis` remains the source history for Lincoln corpus
  files, multi-stage annotations, reliability-study artifacts, and publication
  context.
- `sacrifice-law-workbench` remains the source history for the Sacrifice Law
  corpus, pipeline artifacts, publication site, and comparative-corpus context.

Archiving now would make later notice application harder and could confuse
readers by implying the repositories are abandoned rather than superseded as
implementation homes. Keeping them fully active would also be misleading,
because forward-looking implementation now belongs in PPW.

## Allowed Future Child-Repo Work

Allowed work in child repositories:

- Applying maintainer-approved lifecycle notices to repository descriptions,
  READMEs, and GitHub Pages landing pages.
- Posting maintainer-approved final transition comments.
- Fixing broken links, citation issues, or minor typos in already-published
  artifacts.
- Answering provenance or source-history questions.
- Reopening lifecycle state only if a maintainer explicitly decides to do so.

Work that should happen in PPW:

- New evidence-module metadata, corpus records, claim-promotion records, or
  generated indexes.
- New publication or evidence-browser surfaces.
- New implementation planning for Lincoln or Sacrifice Law evidence-module
  work.
- New promoted findings or claim-review state changes.

## Deferred Child Issues

The deferred Lincoln issues remain open in `lincoln-metaphor-analysis` and
carry the `deferred` label:

| Source issue | Current state | Resume condition |
|---|---|---|
| [LMA #85](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/85) | Open, `deferred` | Revisit after PPW validation fixture foundations |
| [LMA #95](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/95) | Open, `deferred` | Revisit after PPW claim-promotion gate foundations |
| [LMA #108](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/108) | Open, `deferred` | Revisit after PPW validation fixture foundations |

When the relevant PPW foundations are ready, the maintainer should decide
whether these become new PPW issues or remain child-repository records.

## Follow-Up Actions

Repository actions are tracked separately and should not be performed by this
decision record:

- Post or adapt final repository-level transition comments from
  [`child-repository-final-comments.md`](child-repository-final-comments.md).
- Apply or adapt lifecycle notices from
  [`child-repo-inactive-notices.md`](child-repo-inactive-notices.md).
- Verify both child repositories remain public and both Pages sites remain
  published after notice changes.

Separate PPW follow-up issues were opened for these resulting repository
actions, one per child repository:

- [#289](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/289) - Apply reduced-maintenance transition actions for `lincoln-metaphor-analysis`
- [#290](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/290) - Apply reduced-maintenance transition actions for `sacrifice-law-workbench`

## Documentation Updates

This decision supersedes the earlier tentative language in
[`child-repository-supersession-plan.md`](child-repository-supersession-plan.md)
where archive decisions were deferred until Milestone 21. Milestone 21 now
chooses reduced-maintenance source status for both child repositories. A future
archive decision remains possible, but it is not the current lifecycle state.

## Acceptance Criteria Status

| Criterion | Status |
|---|---|
| Maintainer decision recorded for `lincoln-metaphor-analysis` | Met |
| Maintainer decision recorded for `sacrifice-law-workbench` | Met |
| Any resulting repository actions are opened as separate issues | Met |
| PPW documentation is updated to reflect the decision | Met |
