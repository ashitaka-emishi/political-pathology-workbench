# Evidence Module Integration Release Candidate

Release preparation for [#187](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/187).

Prepared date: 2026-07-01

## Release Action Status

No Git tag or GitHub release has been created by this issue.

Tagging is a required human control point in the SDLC roadmap. This document
prepares the release notes, validation record, known limitations, and suggested
tagging checklist so the maintainer can approve or revise the release action.

Suggested release label:

```text
Evidence Module Integration Release Candidate - 2026-07-01
```

Suggested tag name, if the maintainer approves tagging:

```text
evidence-modules-2026-07-01
```

## Release Summary

This release candidate marks the structural completion of PPW's evidence-module
integration work through Milestone 21.

PPW is now the coordination home for:

- Evidence-module architecture and governance.
- Child issue migration records and source-project provenance.
- Evidence-module schemas, corpus registries, artifact records, and validation.
- Lincoln deep-case evidence-module metadata and site surfaces.
- Sacrifice Law comparative evidence-module metadata and site surfaces.
- Claim-promotion gates that distinguish draft, reviewed, promoted, blocked,
  and retired claim states.
- Generated evidence-module, case-corpus, case-claim-promotion, and evidence
  chain indexes.
- Unified public evidence-browser pages for imported modules.
- Child-repository transition decisions and prepared final comments.

The child repositories remain open, public, and unarchived as
reduced-maintenance provenance sources. Forward-looking implementation work
belongs in PPW unless a maintainer explicitly approves source-repository
maintenance or preservation work.

## Major Changes

### Architecture and Governance

- Added evidence-module architecture, claim-promotion policy, imported-project
  boundaries, and shared glossary documentation.
- Recorded child-repository lifecycle policy and final Milestone 21 lifecycle
  decision.
- Defined PPW as the platform-level coordination home while preserving child
  repositories as provenance sources.

### Child Issue Migration

- Inventoried 49 open child-project issues from `lincoln-metaphor-analysis` and
  `sacrifice-law-workbench`.
- Recorded migration dispositions in human-readable and machine-readable
  migration artifacts.
- Created or selected PPW targets for migrated work.
- Reconciled migrated issues with existing PPW issues.
- Marked deferred Lincoln issues with a `deferred` source-repository label.
- Prepared final child-repository comments and follow-up transition action
  issues.

### Evidence Modules

- Registered `lincoln-metaphor-analysis` as a deep single-case evidence module
  linked to `american-civil-war-union`.
- Registered `sacrifice-law-workbench` as a comparative corpus evidence module
  linked to mapped PPW cases.
- Added module metadata, import maps, provenance records, reliability records,
  source-issue maps, and corpus registry records.
- Added Lincoln and Sacrifice Law method notes and module migration audits.

### Claim Promotion and Evidence Chains

- Added claim-promotion data files and validation.
- Added generated module-to-case evidence indexes and per-case evidence chains.
- Promoted one Lincoln claim only to reviewed-claim status; it is not a
  promoted finding.
- Kept Sacrifice Law comparative claims in draft or blocked states until review,
  rights, passage, and reliability gates are satisfied.

### Validation and Site

- Added validation fixtures for evidence modules, corpora, claim promotion, and
  migration manifests.
- Hardened generated indexes against missing or partial data.
- Added evidence-module landing and module-specific public site pages.
- Added case-level evidence-module context rendering.
- Added Sacrifice Law case index and claim-promotion status page.
- Audited publication structure to avoid duplicating child-repository sites.

## Draft Claims Are Not Final Findings

This release candidate does not publish imported draft claims as final findings.

Current claim-promotion status:

| Status | Count | Release meaning |
|---|---:|---|
| Draft candidates | 8 | Registered for review; do not affect scoring. |
| Reviewed claim records | 1 | Reviewable PPW record; not a promoted finding. |
| Promoted findings | 0 | No evidence-module claim is final. |
| Blocked promotion records | 4 | Blocked by passage, reliability, rights, or methodological-boundary requirements. |
| Retired claims | 0 | None recorded. |

Case scores remain protected from unreviewed evidence-module draft claims.

## Known Limitations

- Some comparator cases still have thin source coverage or missing
  counterevidence.
- Several gold cases still lack human-reviewed or approved scores.
- Lincoln claims remain limited by incomplete passage-level anchoring and
  reliability adjudication.
- Sacrifice Law claims remain limited by rights review, passage import, and
  reliability gates.
- Sacrifice Law French Revolution and British World War I mappings remain
  deferred unless source metadata changes.
- The child repositories have not been modified by this release candidate;
  transition actions are tracked in separate follow-up issues.

## Deferred Work

Deferred source-repository issues:

- [LMA #85](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/85) - Tracking v2.0 Multi-Model Reliability Stress Test
- [LMA #95](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/95) - Classify human coder disagreements
- [LMA #108](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/108) - Tracking v3.0 Human Inter-Annotator Reliability Study

Transition follow-up issues opened from the lifecycle decision:

- [PPW #289](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/289) - Apply reduced-maintenance transition actions for `lincoln-metaphor-analysis`
- [PPW #290](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/290) - Apply reduced-maintenance transition actions for `sacrifice-law-workbench`

## Validation Record

The release-preparation validation commands are:

```bash
npm run validate
npm run generate
PYTHONPATH=src-py python3 -m political_pathology.scoring.summary
cd site && quarto render
```

Results on 2026-07-01:

| Command | Result | Notes |
|---|---|---|
| `npm run validate` | Passed | Validation passed for 3 theories, 22 cases, and 2 evidence modules. Existing warnings remain for thin-source/counterevidence coverage and gold-case human-review status. |
| `npm run generate` | Passed | Generated indexes for 22 cases, 25 claims, 26 scores, 20 counterclaims, 2 evidence modules, 2 corpora, 8 draft claims, 5 promoted-claim registry records, and 22 per-case evidence chains. |
| `PYTHONPATH=src-py python3 -m political_pathology.scoring.summary` | Passed | Wrote `site/outputs/scoring-summary.json` with 26 scores. |
| `cd site && quarto render` | Passed | Rendered 44 site pages and created `site/_site/index.html`. |

Validation warnings were unchanged from the final validation audit: some
comparator cases still have thin source coverage or missing counterevidence,
several gold cases still lack human-reviewed or approved scores, and
`postwar-germany-claim-002` remains supported by only one passage. These are
known release limitations, not command failures.

## Maintainer Tag Checklist

Before tagging, the maintainer should confirm:

- [ ] Release notes above are accurate.
- [ ] Known limitations are acceptable for a release candidate.
- [ ] Draft claims are clearly not final findings.
- [ ] Deferred work is intentionally deferred.
- [ ] Full validation commands pass.
- [ ] The desired tag name is approved.

If approved, create an annotated tag from `master` after the #187 PR is merged:

```bash
git switch master
git pull --ff-only origin master
git tag -a evidence-modules-2026-07-01 -m "Evidence module integration release candidate"
git push origin evidence-modules-2026-07-01
```

Optionally create a GitHub release from the tag using this document as release
notes. Do not tag before maintainer approval.

## Acceptance Criteria Status

| Criterion | Status |
|---|---|
| Release notes summarize architecture, child issue migration, evidence modules, claim-promotion gates, validation, and site changes | Met |
| Release notes list known limitations | Met |
| Release notes state that draft claims are not final findings | Met |
| Release notes identify remaining deferred work | Met |
| Maintainer approves release/tag action | Prepared for maintainer approval; no tag created because tagging requires a separate explicit control point |
