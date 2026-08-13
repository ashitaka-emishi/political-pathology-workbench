# Reliability and Adjudication Pipeline

**Governing issue:** [PPW #320](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/320)  
**Audit date:** 2026-08-13

## Raw Coder Scores

Raw coder judgments are stored as `coder-score` records with:

- `coderId`, `codingRoundId`, `codebookVersion`, and `timestamp`;
- `unitId`, `unitClass`, `caseId`, `theoryId`, and `variableId`;
- `value` as either a 0-5 construct magnitude or `null` when the coder cannot
  assign a magnitude;
- `valueSemantics`, `unknownReason` for null values, `definitionRefs`,
  `coderRationale`, `packetRef`, `evidenceRefs`, object-shaped `confidence`,
  and `adjudicationState`.

Raw submitted scores use `adjudicationState: raw-submitted`. They are the only
records used to compute reliability statistics.

## Adjudication

Adjudications are separate artifacts. They reference the raw `coderScoreId`
inputs, record the adjudicator, and store an adjudicated value plus rationale.
They use the same `valueSemantics` and unknown-value rules as raw coder scores:
unresolved adjudications may keep `adjudicatedValue: null` with an
`unknownReason`, while resolved adjudications require a numeric construct
magnitude. Adjudicated records do not overwrite raw coder submissions.

Each adjudication must preserve disagreement geometry: `inputRange`,
`absoluteDisagreement`, and at least one disagreement category. Supported
categories are `evidence-selection`, `construct-boundary`, `temporal-scope`,
`source-interpretation`, `scale-boundary`, `missing-evidence`,
`codebook-ambiguity`, and `other`. The lineage validator requires all raw inputs
to share the same coding round, unit, case, theory, variable, and codebook
version. Final/adjudicated score records must reference exactly one valid
adjudication and match its adjudicated value semantics. Self-adjudication is
allowed only with an explicit caveat.

## Reproducible Metrics

The Python reliability module computes:

- explicit `ok` vs `insufficient-data` status;
- known-pair counts separate from all assignment pairs;
- exact pairwise agreement;
- mean absolute pairwise difference;
- Krippendorff-style ordinal alpha using squared distance on the 0-5
  construct-magnitude scale;
- by-variable reports;
- expected/completed assignments, missing coder assignments, and missingness
  rate.

The metric function rejects duplicate active submissions for the same
`codingRoundId`/`coderId`/`unitId`/`variableId` and refuses to pool records
from incompatible `codebookVersion` values. Superseded submissions may be kept
for audit if a newer record names `supersedesCoderScoreId`.

Synthetic fixtures in `tests/fixtures/reliability/` provide known expected
values and run through:

```bash
PYTHONPATH=src-py python3 -m political_pathology.reliability.fixtures
```
