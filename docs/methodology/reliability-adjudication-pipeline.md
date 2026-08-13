# Reliability and Adjudication Pipeline

**Governing issue:** [PPW #320](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/320)  
**Audit date:** 2026-08-13

## Raw Coder Scores

Raw coder judgments are stored as `coder-score` records with:

- `coderId`, `codingRoundId`, `codebookVersion`, and `timestamp`;
- `unitId`, `unitClass`, `caseId`, `theoryId`, and `variableId`;
- numeric `value`, numeric `confidence`, and `adjudicationState`.

Raw submitted scores use `adjudicationState: raw-submitted`. They are the only
records used to compute reliability statistics.

## Adjudication

Adjudications are separate artifacts. They reference the raw `coderScoreId`
inputs, record the adjudicator, and store an adjudicated value plus rationale.
Adjudicated records do not overwrite raw coder submissions.

## Reproducible Metrics

The Python reliability module computes:

- exact pairwise agreement;
- mean absolute pairwise difference.

Synthetic fixtures in `tests/fixtures/reliability/` provide known expected
values and run through:

```bash
PYTHONPATH=src-py python3 -m political_pathology.reliability.fixtures
```
