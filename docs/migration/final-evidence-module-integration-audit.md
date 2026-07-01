# Final Evidence Module Integration Audit

**Governing issue:** PPW #183
**Milestone:** 21 - Final Integration Audit and Repository Transition
**Audit date:** 2026-07-01

## Scope

This audit summarizes the evidence-module integration work completed across the PPW migration sequence. It covers child-issue migration, architecture and governance, schema and registry foundation, metadata import, Lincoln and Sacrifice Law module integration, claim promotion, validation/generation, public evidence-browser pages, and remaining transition risks.

The immediate validation baseline is PPW #182, documented in `docs/migration/final-validation-generation-audit.md`.

## Milestone Coverage

| Milestone | Tracker | Status | Integration outcome |
|---|---|---|---|
| Milestone 12 - Child-Project Issue Migration | #105 | Closed | Child project issues were inventoried, mapped, migrated, reconciled, and audited. |
| Milestone 13 - Architecture and Governance Baseline | #118 | Closed | Evidence-module boundaries, claim-promotion policy, imported-project boundaries, glossary, and child-repository lifecycle plan were documented. |
| Milestone 14 - Schema and Registry Foundation | #124 | Closed | Evidence-module, corpus, artifact, claim-promotion, and migration-manifest schemas were added and wired into validation. |
| Milestone 15 - Evidence Module Metadata Import | #134 | Closed | Lincoln and Sacrifice Law module folders, corpus records, registries, and import audit were created. |
| Milestone 16 - Lincoln Deep Case Evidence Module | #140 | Closed | Lincoln case/corpus links, metadata, artifact-family records, draft candidates, method note, and module audit were created. |
| Milestone 17 - Sacrifice Law Comparative Evidence Module | #148 | Closed | Sacrifice Law case mappings, subset links, artifact families, draft candidates, method note, and module audit were created. |
| Milestone 18 - Claim Promotion and Evidence Chains | #157 | Closed | Claim-promotion files, validators, indexes, evidence chains, pilot review records, and counterclaim attachment work were completed. |
| Milestone 19 - Validation, Generation, and Test Fixtures | #165 | Closed | Evidence-module fixtures, corpus fixtures, claim-promotion fixtures, generated-index hardening, validation summary, scoring filter, and reliability sampling updates were completed. |
| Milestone 20 - Unified Site and Public Evidence Browser | #173 | Closed | Evidence-module site pages, case evidence-chain rendering, Sacrifice Law case index, claim-promotion status page, and publication-structure audit were completed. |
| Milestone 21 - Final Integration Audit and Repository Transition | #181 | In progress | #182 is complete; #183 records this final evidence-module integration audit. Repository-transition issues #184-#187 remain. |

## Architecture and Governance Documents

Created or updated architecture and governance files:

- `docs/architecture/evidence-modules.md`
- `docs/architecture/claim-promotion.md`
- `docs/architecture/imported-projects.md`
- `docs/architecture/glossary.md`
- `docs/architecture/lincoln-evidence-module-method-note.md`
- `docs/architecture/sacrifice-law-evidence-module-method-note.md`
- `docs/migration/child-repository-supersession-plan.md`
- `docs/migration/evidence-browser-publication-structure-audit.md`

Disposition: PPW is the coordination home for evidence-module metadata, claim promotion, generated indexes, validation, and public evidence-browser pages. Child repositories remain provenance homes for raw pipelines, source publication sites, and child-specific artifacts unless explicitly imported through PPW metadata.

## Schemas Created

Evidence-module integration relies on the following schema files:

- `schemas/evidence-module.schema.json`
- `schemas/corpus-registry.schema.json`
- `schemas/corpus-artifact.schema.json`
- `schemas/claim-promotion.schema.json`
- `schemas/child-issue-migration-manifest.schema.json`
- Existing shared PPW schemas such as `case.schema.json`, `claim.schema.json`, `counterclaim.schema.json`, `interpretation.schema.json`, `passage.schema.json`, `score.schema.json`, `source.schema.json`, and `theory.schema.json`

Validation wiring was completed in Milestone 14 and exercised by the final validation audit in #182.

## Registries and Module Metadata

Registry and evidence-module metadata files:

- `data/evidence-modules/module-registry.json`
- `data/corpora/corpus-registry.json`
- `data/evidence-modules/lincoln-metaphor-analysis/module.json`
- `data/evidence-modules/lincoln-metaphor-analysis/import-map.json`
- `data/evidence-modules/lincoln-metaphor-analysis/provenance.json`
- `data/evidence-modules/lincoln-metaphor-analysis/reliability.json`
- `data/evidence-modules/lincoln-metaphor-analysis/source-issue-map.json`
- `data/evidence-modules/sacrifice-law-workbench/module.json`
- `data/evidence-modules/sacrifice-law-workbench/import-map.json`
- `data/evidence-modules/sacrifice-law-workbench/provenance.json`
- `data/evidence-modules/sacrifice-law-workbench/reliability.json`
- `data/evidence-modules/sacrifice-law-workbench/source-issue-map.json`

Current registered modules:

| Module | Type | Corpus IDs | Active PPW case links |
|---|---|---|---|
| `lincoln-metaphor-analysis` | Deep single-case module | `lincoln-deep-28` | `american-civil-war-union` |
| `sacrifice-law-workbench` | Comparative corpus module | `sacrifice-law-comparative-41` | `american-civil-war-union`, `american-revolution`, `nazi-germany`, `napoleonic-france` |

## Child Issues Migrated

Child-issue migration artifacts:

- `docs/migration/child-issue-migration-inventory.md`
- `docs/migration/child-issue-label-and-milestone-map.md`
- `docs/migration/child-issue-reconciliation.md`
- `docs/migration/child-issue-migration-audit.md`
- `docs/migration/lma-tracking-corpus-issue-migration.md`
- `docs/migration/lma-pipeline-validation-issue-migration.md`
- `docs/migration/lma-docs-publication-issue-migration.md`
- `docs/migration/sacrifice-law-workbench-issue-migration.md`
- `data/migration/lincoln-metaphor-analysis-open-issues.json`
- `data/migration/sacrifice-law-workbench-open-issues.json`

Issue trackers closed for migration and integration include #105, #118, #124, #134, #140, #148, #157, #165, and #173. Milestone 21 tracker #181 remains open for final repository-transition work.

## Lincoln Module Files

Lincoln deep-case module files:

- `data/corpora/lincoln-deep-28/corpus.json`
- `data/corpora/lincoln-deep-28/documents.json`
- `data/corpora/lincoln-deep-28/artifact-index.json`
- `data/corpora/lincoln-deep-28/texts/README.md`
- `data/corpora/lincoln-deep-28/texts/lma-doc-008.txt`
- `data/corpora/lincoln-deep-28/texts/lma-doc-017.txt`
- `data/cases/american-civil-war-union/corpora/lincoln-deep-28.json`
- `data/cases/american-civil-war-union/analysis/evidence-module-links.json`
- `docs/architecture/lincoln-evidence-module-method-note.md`
- `docs/migration/lincoln-module-migration-audit.md`
- `site/evidence/lincoln-metaphor-analysis.qmd`

Lincoln status: corpus metadata and selected raw-text additions are represented; passage import, complete reliability adjudication, and full claim promotion remain gated.

## Sacrifice Law Module Files

Sacrifice Law comparative module files:

- `data/corpora/sacrifice-law-comparative-41/corpus.json`
- `data/corpora/sacrifice-law-comparative-41/cases.json`
- `data/corpora/sacrifice-law-comparative-41/documents.json`
- `data/corpora/sacrifice-law-comparative-41/subset-links.json`
- `data/corpora/sacrifice-law-comparative-41/artifact-index.json`
- `data/cases/american-civil-war-union/corpora/sacrifice-law-lincoln-subset.json`
- `data/cases/american-revolution/corpora/sacrifice-law-american-revolution-subset.json`
- `data/cases/nazi-germany/corpora/sacrifice-law-hitler-subset.json`
- `data/cases/napoleonic-france/corpora/sacrifice-law-napoleon-subset.json`
- `docs/architecture/sacrifice-law-evidence-module-method-note.md`
- `docs/migration/sacrifice-law-module-migration-audit.md`
- `site/evidence/sacrifice-law-workbench.qmd`
- `site/evidence/sacrifice-law-cases.qmd`

Sacrifice Law status: four canonical source-case mappings are represented. French Revolution and British World War I are deferred mapping-review candidates, not active corpus subsets.

## Claim Promotion Files and Current Status

Claim-promotion files:

- `data/claim-promotion/draft-claims.json`
- `data/claim-promotion/promotion-gates.json`
- `data/claim-promotion/promotion-registry.json`
- `data/claim-promotion/reviewed-claims.json`
- `data/claim-promotion/promoted-claims.json`
- `data/claim-promotion/retired-claims.json`
- `site/evidence/claim-promotion-status.qmd`
- `site/evidence/_generated/claim-promotion-summary.md`

Current claim status counts:

| Status | Count | Notes |
|---|---:|---|
| Draft candidates | 8 | Four Lincoln candidates and four Sacrifice Law candidates are registered as draft candidates. |
| Reviewed claim records | 1 | One Lincoln promotion-registry record is at `reviewed-claim`; it is not a promoted finding. |
| Promoted findings | 0 | No evidence-module claim is promoted as a final PPW finding. |
| Blocked promotion records | 4 | Sacrifice Law promotion records remain blocked by passage, reliability, rights, or methodological-boundary requirements. |
| Retired claims | 0 | No retired evidence-module claims are recorded. |

Draft claims do not drive public scores. Public support ratings require explicit promotion through PPW claim gates.

## Generated Indexes and Site Outputs

Generated index files:

- `data/generated/evidence-module-index.json`
- `data/generated/case-corpus-index.json`
- `data/generated/case-claim-promotion-index.json`
- `data/generated/all-chains.json`
- `data/generated/cases/*/evidence-chains.json`
- `data/generated/chains/*.json`
- Existing PPW generated indexes including `all-cases.json`, `all-claims.json`, `all-counterclaims.json`, `all-interpretations.json`, `all-passages.json`, `all-scores.json`, `all-sources.json`, `case-index.json`, and `theory-index.json`

Evidence-browser site pages:

- `site/evidence/index.qmd`
- `site/evidence/lincoln-metaphor-analysis.qmd`
- `site/evidence/sacrifice-law-workbench.qmd`
- `site/evidence/sacrifice-law-cases.qmd`
- `site/evidence/claim-promotion-status.qmd`

Case-page rendering now includes evidence-module context and claim-status context where case-level corpus and claim-promotion data exist.

## Validation Baseline

The final validation audit in #182 reports:

- `npm run validate`: passed with existing warnings documented.
- `npm run generate`: passed.
- `PYTHONPATH=src-py python3 -m political_pathology.scoring.summary`: passed.
- `cd site && quarto render`: passed, rendering 44 site pages.

No command failures were recorded in #182, and no failure follow-up issues were required.

## Remaining Blocked or Deferred Work

Known remaining risks and deferrals:

1. **Human-review status risk:** Several gold cases still lack human-reviewed or approved scores, as documented in the #182 validation warnings.
2. **Thin-source/counterevidence coverage:** Some comparator cases have only one source or no counterevidence yet.
3. **Lincoln passage and reliability gates:** Lincoln module claims remain limited by incomplete passage-level anchoring and reliability adjudication.
4. **Sacrifice Law rights and passage gates:** Nazi-era translations/apparatus require rights review, and Sacrifice Law passage records remain unimported.
5. **Sacrifice Law mapping deferrals:** French Revolution and British World War I remain out of scope for the current canonical Sacrifice Law corpus unless source metadata changes.
6. **Repository-transition work:** Milestone 21 issues #184-#187 remain open for PPW tracker reconciliation, child-repository final comments, child-repository lifecycle decision, and integration release preparation.

## Conclusion

The evidence-module integration is structurally complete through Milestone 20 and validated in #182. PPW now contains the architecture, schemas, registries, module metadata, claim-promotion controls, generated indexes, and unified site surfaces needed to serve as the coordination home for the integrated Lincoln and Sacrifice Law evidence modules. Remaining work is transition/governance work under Milestone 21 plus already documented evidence-review and promotion gates.
