# Repository Glossary

Part of [#122](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/122) (Milestone 13: Architecture and Governance Baseline).

Defines shared terms used across architecture docs, schemas, migration docs, and the PPW site. For theory-level definitions (sacred political order strength, corrigibility, sacrifice, etc.) see `site/methods/glossary.qmd`.

---

## Symbolic order

**Source-tradition term.** A structure of shared meaning that organizes collective identity, authority, obligation, and sacrifice within a political community. PPW retains this phrase only when discussing the intellectual background for the project.

The active case schema no longer uses `symbolicOrder*` field names. Cases use `sacredPoliticalOrder*` because the workbench's operational unit of analysis is a sacred political order, not the broader symbolic field.

*Historical note:* earlier scaffold documents used `symbolicOrder*` field names. Those remain only in `docs/history/` or in explicit lineage discussions.

---

## Sacred political order

**Workbench unit of analysis.** A durable structure of shared political meaning organized around sacred objects, values, or persons — things whose violation is experienced collectively as desecration. See `site/methods/glossary.qmd` for the full theory definition.

In practice: every case in PPW currently uses *sacred political order* as the operative analytical unit. The schema, validator, data dictionary, and site prose all use the `sacredPoliticalOrder*` field family.

*Schema fields:* `sacredPoliticalOrderId`, `sacredPoliticalOrderName`, `sacredPoliticalOrderDefinition`, `sacredPoliticalOrderStrength`, and `sacredPoliticalOrderStrengthRationale` in `case.schema.json`.

---

## Evidence module

A source repository (`lincoln-metaphor-analysis`, `sacrifice-law-workbench`) that provides corpus artifacts, annotations, and analysis outputs to PPW. An evidence module owns the corpus/provenance/annotation layer; PPW owns the promoted claim/interpretation/score layer. See [evidence-modules.md](evidence-modules.md).

---

## Corpus

The set of source texts selected for annotation and analysis within a case or evidence module. A corpus is defined by a selection rationale and is registered in the PPW corpus registry. PPW distinguishes:

- **Core corpus**: fully annotated (passages, claims, scores).
- **Validation corpus**: lighter annotation; used for reliability sampling.
- **Reference corpus**: indexed for search only; not annotated.

*Schema:* `corpus-registry.schema.json` (Milestone 14).

---

## Artifact

Any structured output produced by a pipeline step or analysis process. In PPW, artifacts include corpus inventories, cluster profiles, reliability metrics, and adjudication records. Artifacts are referenced by provenance link from PPW data files; they are not promoted to PPW claims unless they pass claim-promotion gates.

*Contrast with:* a *promoted finding*, which has passed all review gates and is owned by PPW schemas.

---

## Passage

A specific excerpt from a corpus document, segmented and assigned a stable ID, used as the primary evidentiary unit for a claim. Passages are stored in `data/cases/<slug>/passages.json` and linked to claims via `derivedFrom`.

*Schema:* `passage.schema.json`. *Status lifecycle:* `draft` → `source-review` → `evidence-review` → … (see [claim-promotion.md](claim-promotion.md)).

---

## Claim

A structured assertion that a passage or set of passages provides evidence for or against a theory variable. Claims are stored in `data/cases/<slug>/claims.json`. A claim is not a PPW finding until it passes the full promotion lifecycle.

*Schema:* `claim.schema.json`.

---

## Counterclaim

A structured objection to a claim, recording evidence that qualifies, limits, or contradicts the claim without necessarily blocking promotion. Stored in `data/cases/<slug>/counterclaims.json`. Documented counterclaims increase credibility; they do not automatically block promotion.

*Schema:* `counterclaim.schema.json`.

---

## Interpretation

A structured statement connecting one or more claims to a theory variable and explaining how the evidence supports or qualifies the variable assessment. Stored in `data/cases/<slug>/interpretations.json`. An interpretation is the argumentative layer between claims and scores.

*Schema:* `interpretation.schema.json`.

---

## Score

A numeric assessment of a theory variable for a specific case, grounded in a reviewed interpretation. Stored in `data/cases/<slug>/scores.json`. Scores appear in PPW site output only when at `score-review` or above and `publicationStatus` is not `draft`.

*Schema:* `score.schema.json`.

---

## Promotion gate

A required review step a claim, interpretation, or score must pass before advancing to the next `reviewStatus`. Each gate has checkable criteria. See [claim-promotion.md](claim-promotion.md) for the full gate sequence and criteria.

---

## Reliability status

The degree to which annotation outputs have been verified through inter-annotator agreement, adjudication, or human review. In PPW, reliability is recorded in `confidence.value`, `confidence.uncertaintyFactors`, and the gate progression. Child-repo reliability artifacts (Stage 4H/4J records, IAA metrics) inform PPW gate decisions but do not automatically satisfy them.

---

## Provenance

The documented chain of origin for a corpus text or analysis artifact: source publication, edition, access method, and child-repo reference. Provenance is mandatory for all corpus texts and imported artifacts. Recorded in `bibliography/sources.csl.json` and `source-pack.json`.

---

## Comparative corpus

A corpus spanning multiple political cases used to test a theory variable across contexts. The Sacrifice Law corpus (`sacrifice-law-workbench`) is a comparative corpus covering American Revolution, Napoleon, Lincoln, and Hitler cases.

*Contrast with:* deep case corpus.

---

## Deep case corpus

A corpus focused on a single political actor, movement, or period at depth — multiple documents, multiple annotation passes, multiple stages of reliability checking. The Lincoln corpus (`lincoln-metaphor-analysis`) is a deep case corpus.

*Contrast with:* comparative corpus.

---

## Source repository

The original authoritative repository where corpus texts, annotations, and analysis artifacts reside. For PPW, source repositories are `lincoln-metaphor-analysis` and `sacrifice-law-workbench`. Source repositories are referenced by provenance link; they are not replaced or deleted.

*Synonym:* child repository (for source repositories that have been migrated to PPW).

---

## Child repository

A source repository whose actionable issues have been migrated to PPW under Milestone 12. After migration, a child repository is preserved as source history, citation context, and audit provenance, but new implementation work is coordinated through PPW. See [child-repository-supersession-plan.md](../migration/child-repository-supersession-plan.md).

---

## Imported artifact

An artifact from a child repository that has been brought into PPW data files (corpus registry entry, source pack entry, draft claim, passage record). All imported artifacts must carry a provenance link to their child-repo origin and pass applicable PPW schema validation.

*Contrast with:* a *referenced artifact*, which is linked to but not copied into PPW.

---

## Promoted finding

A claim that has passed the full review lifecycle (`human-reviewed` or `approved`) and is owned by PPW schemas as a public theoretical finding. Promoted findings appear in PPW site output, scoring summaries, and citation artifacts. No child-repo annotation automatically becomes a promoted finding.
