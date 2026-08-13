# Methodological Validation and Ontology Hardening

**Status:** active GitHub milestone
**GitHub milestone:** [Milestone 22: Methodological Validation and Ontology Hardening](https://github.com/ashitaka-emishi/political-pathology-workbench/milestone/22)
**Tracking issue:** [PPW #311](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/311)
**Consolidates:** `Milestone_ Methodological Validation & Ontology Hardening.md` and `PPW_methodological_validation_milestone.md`
**Prepared:** 2026-08-13

## Milestone Goal

Harden PPW from a provenance-aware interpretive workbench into a more
methodologically defensible comparative-research instrument.

This milestone addresses the highest-priority risks identified across both
project reviews:

- construct validity and observable coding boundaries;
- ontology consistency between theory variables and scores;
- separation of construct magnitude from confidence and evidence quality;
- prevention of outcome leakage and circular scoring;
- claim-promotion enforcement across namespaces;
- negative evidence, rival explanations, and disconfirmation searches;
- unit-of-analysis consistency and case comparability;
- independent coder records, reliability metrics, and adjudication;
- semantic validation in CI;
- theory falsifiability, bibliography, and intellectual genealogy.

The milestone should be considered complete when PPW can clearly distinguish:

1. what phenomenon is being measured;
2. which theory version defines the construct;
3. how strong the construct estimate is;
4. how confident PPW is in that estimate;
5. what evidence supports, qualifies, or challenges the claim;
6. whether the score was produced independently of the outcome being explained;
7. how reliable the coding process is across independent coders;
8. what would falsify or materially weaken the theory.

## Completion Criteria

The milestone is complete when:

- [ ] all scored variables resolve to variables defined in their referenced
      theory version;
- [ ] construct magnitude, confidence, and evidence quality are represented as
      separate concepts;
- [ ] `0` means substantive absence or minimum, while `null` / `unknown`
      represents insufficient evidence;
- [ ] core theoretical variables have operational definitions, observable
      indicators, exclusions, positive examples, negative examples, borderline
      examples, and coding rules;
- [ ] analytical scores cannot be derived from case outcome categories;
- [ ] scaffold, legacy, independently coded, adjudicated, and final scores are
      machine-distinguishable;
- [ ] promoted claims include documented supporting and disconfirming search
      efforts;
- [ ] evidence roles distinguish support, contradiction, qualification, context,
      background, and temporal counterexamples;
- [ ] major causal or mechanistic claims represent plausible rival explanations;
- [ ] cases declare unit class, case type, comparability groups, and selection
      role;
- [ ] development cases are separated from held-out evaluation cases;
- [ ] independent coder records can be stored, compared, and preserved after
      adjudication;
- [ ] reliability metrics can be generated from raw coder records;
- [ ] adjudication preserves original disagreement;
- [ ] major theory propositions include falsification criteria;
- [ ] theory-level references document the scholarly genealogy of major
      constructs;
- [ ] CI validates semantic relationships in addition to JSON structure;
- [ ] documentation distinguishes interpretive coding from validated
      measurement.

## Work Packages

### 1. Operationalize Core Constructs and Codebook Boundaries

**GitHub issue:** [PPW #312](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/312)

Convert normatively rich constructs into explicit coding rules without
discarding the project's theory.

Scope:

- define operational coding definitions for every core variable;
- separate normative judgment from observable empirical indicators where
  possible;
- add inclusion criteria, exclusion criteria, positive examples, negative
  examples, borderline examples, and insufficient-evidence rules;
- distinguish neighboring constructs, especially `corrigibility` and
  correction capacity;
- identify constructs that should be merged, split, deprecated, or renamed;
- version the codebook and reference versions from coder judgments.

Acceptance:

- independent coders can apply the codebook without inferring the theory's
  preferred conclusion;
- every scored variable has observable substantive anchors;
- neighboring constructs have explicit discriminant criteria;
- pilot coding produces actionable disagreement notes.

### 2. Redesign Score Semantics

**GitHub issue:** [PPW #313](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/313)

Separate substantive construct magnitude from confidence and evidence quality.

Scope:

- rewrite the generic `0-5` rubric so values represent construct intensity
  only;
- define `null` / `unknown` for insufficient evidence;
- preserve epistemic confidence as a separate field;
- decide whether evidence quality is separate from confidence;
- update schemas, validators, examples, generated views, and migration notes;
- migrate existing scores without losing traceability.

Acceptance:

- no score anchor is defined primarily by source count, repetition, or source
  quality;
- `0` means substantive absence or minimum, not lack of evidence;
- high-intensity/low-confidence and low-intensity/high-confidence cases can be
  represented cleanly;
- public outputs display magnitude and confidence separately.

### 3. Enforce Theory-to-Score Ontology Integrity

**GitHub issue:** [PPW #314](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/314)

Ensure every score variable resolves against the referenced theory version.

Scope:

- resolve `score.theoryId` to the active theory version;
- validate that `score.variableId` exists in that theory version;
- validate `caseId`, `interpretationId`, source references, passage references,
  definition references, and theory-version references;
- add explicit alias support only where intentional;
- add fixture tests for broken references.

Acceptance:

- CI fails when a score references an undefined theory variable;
- unresolved references fail closed or produce explicit validation errors;
- variable drift cannot silently enter analytical records.

### 4. Add Versioned Variable Lifecycle Metadata

**GitHub issue:** [PPW #315](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/315)

Make theory-variable renames, aliases, splits, merges, deprecations, and
retirements explicit.

Scope:

- define variable lifecycle statuses: `active`, `deprecated`, `retired`,
  `experimental`;
- add alias, replacement, deprecation, and compatibility metadata;
- preserve historical identifiers while requiring canonical IDs for new
  analytical records;
- produce migration warnings rather than silently rewriting historical data.

Acceptance:

- variable renaming is traceable;
- historical records retain their original identifiers;
- new records use canonical identifiers;
- deprecated identifiers warn or fail according to policy.

### 5. Prevent Outcome Leakage and Circular Scoring

**GitHub issue:** [PPW #316](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/316)

Keep explanatory-variable scores independent of the outcome categories they may
later help explain.

Scope:

- identify scores whose rationale references outcome categories or scaffolded
  outcome-derived logic;
- add score-origin metadata such as `scaffold`, `legacy`,
  `independent-coding`, `adjudicated`, and `final`;
- add `outcomeVisibleToCoder`;
- exclude scaffold and outcome-derived scores from substantive summaries by
  default;
- document blinding and recoding procedures;
- preserve prior scaffold values as historical/development traceability only.

Acceptance:

- no publishable score is derived from its case outcome category;
- scaffold scores are machine-identifiable and automatically excluded from
  substantive analysis;
- independently generated replacements are required for affected cases before
  publication-facing use.

### 6. Enforce Claim Promotion Across Namespaces

**GitHub issue:** [PPW #317](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/317)

Make score inclusion respect promotion state for both native PPW claims and
evidence-module claims.

Scope:

- document current claim ID namespaces;
- define canonical claim identity or explicit cross-namespace mappings;
- update promotion-registry lookups to resolve all supported claim types;
- fail closed when promotion state cannot be resolved;
- add diagnostics for orphaned or unresolved claim references;
- test promoted, draft, rejected, unresolved, and cross-namespace claims.

Acceptance:

- draft and rejected claims cannot silently contribute to included scores;
- unresolved promotion state produces a visible validation error or explicit
  exclusion;
- scoring summaries enforce claim-promotion policy consistently.

### 7. Require Disconfirming Evidence, Evidence Roles, and Rival Explanations

**GitHub issue:** [PPW #318](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/318)

Make challenges to PPW claims first-class research artifacts.

Scope:

- require search logs before claims reach promoted or validated status;
- support `confirming`, `disconfirming`, and `neutral` search purposes;
- record databases, corpora, query terms, result counts, inclusion criteria,
  exclusion criteria, included source IDs, and excluded source IDs where
  appropriate;
- add evidence roles such as `supporting`, `contradicting`, `qualifying`,
  `contextual`, `background`, `temporal-counterexample`, and `methodological`;
- define structured rival explanations with supporting and contradicting
  evidence;
- distinguish evidence compatible with PPW from evidence that discriminates
  between mechanisms.

Acceptance:

- promoted claims have both supporting and disconfirming search records;
- counterevidence is visible in generated outputs;
- major causal claims can reference rival explanations;
- at least one mature case demonstrates discriminating evidence across
  competing mechanisms.

### 8. Define Unit of Analysis, Case Types, and Holdout Evaluation

**GitHub issue:** [PPW #319](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/319)

Prevent heterogeneous cases from entering invalid comparisons and separate
theory-building from evaluation.

Scope:

- define the primary unit of analysis;
- distinguish political formations from historical episodes;
- define supported case classes, case relationships, and compatible variables;
- add unit class, case type, comparability group, selection role, and sampling
  metadata;
- define the target population, inclusion criteria, exclusion criteria, hard
  negatives, ambiguous cases, and held-out evaluation cases;
- define when a held-out case may be opened and under what protocol.

Acceptance:

- every case has an explicit unit class and case type;
- every score applies to a compatible unit type;
- development and evaluation cases are separated;
- held-out cases are protected from theory-development leakage;
- methodology documentation states what population-level claims are and are not
  supported.

### 9. Implement Independent Reliability and Adjudication Pipeline

**GitHub issue:** [PPW #320](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/320)

Store raw coder judgments separately from reconciled or adjudicated scores and
compute reliability from preserved coder records.

Scope:

- define frozen codebook-version identifiers for coding rounds;
- extend coder-score schemas for coder ID, codebook version, timestamp,
  confidence, unit ID, variable ID, and adjudication state;
- keep raw judgments immutable after submission;
- represent reconciliation and adjudication as separate artifacts;
- implement reliability calculations in `src-py/political_pathology/reliability/`;
- support ordinal reliability statistics such as Krippendorff's alpha;
- add pairwise agreement and disagreement summaries;
- add synthetic fixture datasets with known expected reliability values;
- document sample-size expectations and interpretation limits.

Acceptance:

- two or more independent coders can score the same unit without overwriting one
  another;
- raw judgments remain reconstructable after adjudication;
- reliability statistics are reproducibly generated;
- automated tests verify expected reliability outputs.

### 10. Harden CI, Falsifiability, and Theory Bibliography

**GitHub issue:** [PPW #321](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/321)

Make methodological invariants executable and strengthen the intellectual audit
trail behind PPW theory.

Scope:

- inventory npm and Python validation/test commands;
- run schema validation, fixture tests, scoring tests, promotion tests,
  reliability tests, and semantic relationship checks in CI;
- document the local command sequence that reproduces CI;
- add falsification criteria for major propositions;
- add theory-level references documenting the scholarly genealogy of major
  constructs;
- connect theory bibliography entries to variables or propositions where
  possible.

Acceptance:

- pull requests fail CI when methodological invariants are broken;
- local validation can reproduce the CI gate;
- major propositions say what evidence would weaken or falsify them;
- core constructs have traceable scholarly references.

## Recommended Order

The consolidated dependency chain is:

```text
operational definitions
  -> score semantics
  -> ontology/reference validation
  -> leakage prevention and claim-promotion enforcement
  -> reliability and adjudication
  -> case sampling and holdout evaluation
  -> theory falsifiability and publication-facing validation
```

Recommended issue order:

1. Operationalize core constructs and codebook boundaries.
2. Redesign score semantics.
3. Enforce theory-to-score ontology integrity.
4. Add versioned variable lifecycle metadata.
5. Prevent outcome leakage and circular scoring.
6. Enforce claim promotion across namespaces.
7. Require disconfirming evidence, evidence roles, and rival explanations.
8. Define unit of analysis, case types, and holdout evaluation.
9. Implement independent reliability and adjudication pipeline.
10. Harden CI, falsifiability, and theory bibliography.

## Exit Review

Before closing the milestone, answer:

- [ ] Can a new coder apply the codebook without consulting outcome labels?
- [ ] Can the coder distinguish `0` from `unknown`?
- [ ] Can every score variable resolve to a versioned theory variable?
- [ ] Can raw coder judgments be reconstructed and audited?
- [ ] Can reliability be calculated automatically?
- [ ] Can draft, rejected, or unresolved claims affect substantive scores?
- [ ] Does CI fail when scoring, ontology, promotion, or reliability invariants
      are violated?
- [ ] Are held-out cases protected from theory-development leakage?
- [ ] Are rival explanations explicitly testable?
- [ ] Can every publication-facing score be traced to admissible evidence, an
      operational definition, and a theory version?
