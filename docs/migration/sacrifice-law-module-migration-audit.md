# Sacrifice Law Module Migration Audit

**Governing issue:** PPW #156
**Tracking issue:** PPW #148
**Source roadmap item:** Milestone 4, Issue 4.8
**PPW milestone:** Milestone 17 - Sacrifice Law Comparative Evidence Module
**Source repository:** `ashitaka-emishi/sacrifice-law-workbench`

This audit records the Sacrifice Law evidence-module state after PPW #149 through PPW #155. It covers files added or changed, issue migration status, artifact-family disposition, draft claim status, review readiness, and remaining risks.

## 1. Files Added or Changed

### Evidence-Module Metadata

| File | Status | Notes |
|---|---|---|
| `data/evidence-modules/sacrifice-law-workbench/module.json` | Added before Milestone 17; confirmed in #149 | Registers the module ID, source repository, and PPW integration metadata. |
| `data/evidence-modules/sacrifice-law-workbench/provenance.json` | Added before Milestone 17; confirmed in #149 | Preserves source-project provenance and repository boundaries. |
| `data/evidence-modules/sacrifice-law-workbench/import-map.json` | Added before Milestone 17; confirmed in #149 | Records import/reference mapping from the child project into PPW. |
| `data/evidence-modules/sacrifice-law-workbench/reliability.json` | Added before Milestone 17; confirmed in #149 | Records reliability limitations and the later reliability-design dependency. |
| `data/evidence-modules/sacrifice-law-workbench/source-issue-map.json` | Added before Milestone 17 | Records child-project issue migration from SLW #174 and SLW #183. |

### Comparative Corpus Records

| File | Status | Notes |
|---|---|---|
| `data/corpora/sacrifice-law-comparative-41/corpus.json` | Added before Milestone 17; updated/confirmed in #149 | Registers the comparative corpus and source module. |
| `data/corpora/sacrifice-law-comparative-41/cases.json` | Added before Milestone 17; updated in #149 | Maps source cases to confirmed or proposed PPW case IDs. |
| `data/corpora/sacrifice-law-comparative-41/documents.json` | Added before Milestone 17; updated/confirmed in #149 | Holds document-level corpus metadata placeholders and provenance notes. |
| `data/corpora/sacrifice-law-comparative-41/subset-links.json` | Added before Milestone 17; updated in #150 and #151 | Links existing PPW cases to Sacrifice Law corpus subsets. |
| `data/corpora/sacrifice-law-comparative-41/artifact-index.json` | Added before Milestone 17; updated in #149, #150, #151, and #153 | Records artifact families, disposition, import status, rights status, and review status. |

### Claim and Documentation Records

| File | Status | Notes |
|---|---|---|
| `data/claim-promotion/draft-claims.json` | Updated in #154 | Adds Sacrifice Law draft comparative claim candidates and keeps them below promotion gates. |
| `docs/architecture/sacrifice-law-evidence-module-method-note.md` | Added in #155 | Defines the module method, case boundaries, artifact-family status, and promotion limits. |
| `docs/migration/sacrifice-law-workbench-issue-migration.md` | Added before Milestone 17 | Records child-project issue migration from the source repository. |
| `docs/migration/sacrifice-law-module-migration-audit.md` | Added in #156 | This audit. |

### Workflow Collateral

| File | Status | Notes |
|---|---|---|
| `.agents/skills/sdlc-workflow/SKILL.md` | Updated in #153 | Clarifies ordered multi-issue SDLC batches and merge-after-each-issue behavior. This is workflow collateral, not Sacrifice Law evidence. |

## 2. PPW Milestone Issue Status

| PPW issue | Status | Migration role |
|---|---|---|
| #149 | Complete | Confirmed PPW case mapping for the Sacrifice Law corpus. |
| #150 | Complete | Created the Lincoln / American Civil War (Union) subset link. |
| #151 | Complete | Created subset links for existing PPW cases, including Nazi Germany. |
| #152 | Complete | Created follow-up issues for missing Sacrifice Law target cases. |
| #153 | Complete | Represented Sacrifice Law artifact families. |
| #154 | Complete | Created draft comparative claim candidates. |
| #155 | Complete | Added the evidence-module method note. |
| #156 | Complete | Adds this migration audit. |

Follow-up issues carried forward from #152 and tracked by #148:

| PPW issue | Status | Purpose |
|---|---|---|
| #250 | Complete | Created the American Revolution PPW case folder and reference-only Sacrifice Law subset link. |
| #251 | Complete | Created the Napoleonic France PPW case folder and reference-only Sacrifice Law subset link. |
| #252 | Complete | Reviewed French Revolution and deferred it as out of scope for the current canonical Sacrifice Law corpus. |
| #253 | Complete | Reviewed British World War I and deferred it as out of scope for the current canonical Sacrifice Law corpus. |

## 3. Child-Project Issue Migration

Child-project issue migration is recorded in `data/evidence-modules/sacrifice-law-workbench/source-issue-map.json` and `docs/migration/sacrifice-law-workbench-issue-migration.md`.

| Source issue | PPW disposition | PPW target | Status |
|---|---|---|---|
| SLW #174 - Track pre-v1 corpus expansion window | `merge-into-ppw-issue` | PPW #110 | Recorded as coordination context; no duplicate PPW tracker created. |
| SLW #183 - Revise reliability sampling design for expanded corpus | `migrate-as-ppw-issue` | PPW #192 | Migrated to Milestone 19 reliability and validation work. |

## 4. Artifact-Family Disposition

The canonical artifact-family inventory is `data/corpora/sacrifice-law-comparative-41/artifact-index.json`.

| Artifact family | Disposition | Import status | Current PPW location or status |
|---|---|---|---|
| `corpus-manifest` | `import-now` | `partial` | `data/corpora/sacrifice-law-comparative-41/corpus.json`; blocked for proposed cases until case folders exist. |
| `corpus-metadata` | `import-now` | `pending` | `data/corpora/sacrifice-law-comparative-41/documents.json`; document rows remain incomplete. |
| `case-subset-links` | `import-now` | `partial` | `data/corpora/sacrifice-law-comparative-41/subset-links.json`; only existing PPW cases are linked. |
| `rights-review-records` | `blocked` | `blocked` | Not imported; needed before text import. |
| `raw-text` | `import-later` | `blocked` | Not imported; blocked by rights review and missing case folders. |
| `normalized-text-references` | `reference-only` | `deferred` | Not imported; provenance and reliability review remain pending. |
| `segmentation-outputs` | `reference-only` | `deferred` | Not imported; pending reliability review. |
| `mipvu-worklists` | `reference-only` | `deferred` | Not imported; pending reliability review. |
| `annotation-outputs` | `reference-only` | `deferred` | Not imported; pending reliability review. |
| `concordance-outputs` | `reference-only` | `deferred` | Not imported; reference-only child-repo artifact family. |
| `cross-case-synthesis-artifacts` | `reference-only` | `deferred` | Not imported; may inform later review but is not a PPW finding. |
| `draft-claims` | `import-later` | `deferred` | Candidate claims are represented in `data/claim-promotion/draft-claims.json`; promotion remains blocked. |
| `reliability-design-artifacts` | `import-later` | `deferred` | PPW reliability status is in `data/evidence-modules/sacrifice-law-workbench/reliability.json`; detailed design is Milestone 19 work. |
| `publication-artifacts` | `do-not-import` | `referenced` | Child Quarto/site publication remains canonical in the source repository. |
| `pipeline-scripts` | `do-not-import` | `referenced` | Child-repo scripts remain in `sacrifice-law-workbench`. |
| `pre-v1-tracking` | `reference-only` | `referenced` | Tracked as migration context, not imported artifact content. |

## 5. Case Mapping State

| Source case | PPW case state | Current status |
|---|---|---|
| Lincoln / American Civil War (Union) | `american-civil-war-union` exists | Confirmed; subset link exists. |
| Hitler / Nazi Germany | `nazi-germany` exists | Confirmed; subset link exists, with rights review required for Nazi-era translations and scholarly apparatus. |
| American Revolution | `american-revolution` exists | Confirmed; minimal case folder and reference-only subset link exist. |
| Napoleon / Napoleonic Era | `napoleonic-france` exists | Confirmed; minimal case folder and reference-only subset link exist. |
| French Revolution | Candidate `revolutionary-france` | Deferred as out of scope for the current canonical corpus by PPW #252; no subset link should be created unless source metadata changes. |
| British World War I | Candidate `world-war-i-nationalisms` or `british-world-war-i` | Deferred as out of scope for the current canonical corpus by PPW #253; no subset link or new case folder should be created unless source metadata changes. |

## 6. Draft Claim State

Sacrifice Law draft candidates live in `data/claim-promotion/draft-claims.json`. All remain draft.

| Draft claim | Scope | Review status | Score impact | Review readiness |
|---|---|---|---|---|
| `slw-draft-claim-001` | Cross-case | `draft` | `candidate` | Not ready for review; requires passage-level evidence, proposed case resolution, and reliability/promotion gates. |
| `slw-draft-claim-002` | Single case: `american-civil-war-union` | `draft` | `candidate` | Not ready for review; requires passage anchoring and review against Lincoln metaphor-analysis overlap. |
| `slw-draft-claim-003` | Single case: `nazi-germany` | `draft` | `candidate` | Not ready for review; requires rights/provenance review and passage anchoring. |
| `slw-draft-claim-004` | Cross-case coverage blocker | `draft` | `none` | Not an evidentiary claim; four-case scaffold exists, but passage evidence and review gates remain incomplete. |

No Sacrifice Law claim is ready to become a public PPW finding in Milestone 17. Later review can begin only after case-folder coverage, rights/provenance review, passage anchoring, and reliability design are completed.

## 7. Comparative Claims Ready for Later Review

No comparative claim is ready for formal review yet.

The closest later-review candidates are:

- `slw-draft-claim-001`, after passage-level evidence is anchored for all four mapped case targets.
- `slw-draft-claim-002`, after Lincoln subset passages are anchored and overlap with Lincoln metaphor-analysis candidates is reviewed.
- `slw-draft-claim-003`, after Nazi Germany rights/provenance constraints and passage anchoring are resolved.

These are candidate review paths, not promotion decisions.

## 8. Remaining Risks

1. **Case coverage risk:** American Revolution and Napoleonic France have only minimal scaffolds and no passage evidence.
2. **Candidate mapping risk:** French Revolution and British World War I are deferred as out of scope for the current canonical corpus and must not receive subset links without revised source-corpus evidence.
3. **Rights risk:** Nazi-era translations and scholarly apparatus require source-level rights review before text import.
4. **Provenance risk:** Several artifact families have only partial provenance records in PPW and still rely on child-repository context.
5. **Reliability risk:** Reliability sampling for the expanded Sacrifice Law corpus is deferred to PPW #192.
6. **Claim-promotion risk:** Draft claims lack passage anchoring and cannot affect scores or public findings.
7. **Publication boundary risk:** Child-repo publication artifacts and pipeline scripts are referenced but intentionally not imported into PPW.

## 9. Audit Conclusion

Milestone 17 has enough metadata to represent the Sacrifice Law module as a PPW comparative evidence module without publishing final support ratings. The remaining work is explicitly bounded: create or reject missing case targets, resolve candidate mappings, complete rights/provenance review, anchor passages, and run reliability and claim-promotion gates in later milestones.
