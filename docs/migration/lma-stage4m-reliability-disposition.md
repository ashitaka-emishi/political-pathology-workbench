# LMA Stage 4M Multi-Model Reliability Disposition

Issue: [PPW #300](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/300)
Source tracker: [LMA #85](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/85)
Source repository inspected: `ashitaka-emishi/lincoln-metaphor-analysis` (`main`, temporary clone, 2026-08-13)
Successor execution issue: [PPW #303](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/303)

## Decision

LMA Stage 4M is a PPW reference and method-design source, not a PPW reliability
finding. The current source artifacts show a complete, validated workflow design
for an AI-assisted multi-model stress test, but no validated external model
submissions. PPW therefore records the current Stage 4M outputs as
`reference-only` and may use selected contracts or fixtures to inform later PPW
validation work. No model agreement, disagreement, consensus, correction
candidate, score, claim, or publication statement is promoted by this migration.

The next implementation step is not data import. It is a separately scoped
external model-review pilot in PPW #303, with explicit run provenance,
blind-review constraints, validation, and maintainer gates.

## Source Artifact Inventory

| Artifact family | Source paths | Observed state | PPW disposition |
|---|---|---|---|
| Packet generator and workflow scripts | `scripts/stage4m/*.js` | Complete child-repo workflow: packet generation, ingestion, comparison, disagreement classification, adjudication queue, consensus report, results page, validation, and write guard | Reference-only design pattern; do not import scripts verbatim |
| Model output schema | `schemas/stage4m-model-output.schema.json` | Canonical contract for JSON/CSV model submissions | Fixture/schema reference for PPW #303; no PPW schema adoption yet |
| Blind input packets | `data/reliability/model-input-packets/*` | Packet `stage4m_0b71d40df438058f`, generated 2026-06-19, with 55 sentence-identification units, 51 field-agreement units, 106 seeded rows, and 5 documents | Reference-only packet candidate for PPW #303; do not treat as PPW evidence |
| Model submissions | `data/reliability/model-output-submissions/` | No validated external model submissions present in the inspected source state | Execution gap; PPW #303 must collect or explicitly defer submissions |
| Comparison outputs | `data/reliability/model-comparison/*` | Generated no-submission/insufficient-evidence states: 0 runs, 0 normalized items, 12 insufficient-evidence fields | Reference-only status records; no reliability metric available |
| Adjudication queue | `data/reliability/model-adjudication/*` | Queue exists but contains 0 items because no model submissions exist | Reference-only structure; no human-review item exists yet |
| Methodology and results pages | `docs/methodology/multi-model-reliability.md`, `docs/methodology/multi-model-reliability-results.md`, `docs/methodology/model-review-instructions.md`, `docs/methodology/stage4m-codebook-revision-notes.md` | Methodology, limits, operator workflow, and no-submission results are documented in the child repo | Reference from PPW method notes; do not copy child Quarto publication structure |
| Tests and fixtures | `tests/stage4m-*.test.js`, `tests/fixtures/stage4m/*` | Child-repo fixtures cover valid/invalid submissions, agreement/disagreement, adjudication, results, packets, commands, methodology, and write guards | May inform later PPW fixture design; do not import until a PPW validation need is explicit |

## Review Gates And Limits

- Stage 4M is AI-assisted model reliability, not human inter-annotator
  reliability.
- Model agreement is diagnostic and cannot become historical evidence,
  independent corroboration, a promoted PPW claim, or a score input.
- Stage 4A, Stage 4B, PPW evidence chains, claims, and scores remain immutable
  unless a separate human-approved review/migration issue authorizes a change.
- Any model-run artifact must preserve packet ID/hash, prompt hash, model and
  provider metadata, operator, run date, and relevant settings.
- Source issue closure remains maintainer-gated. LMA #85 should be described as
  migrated or superseded by PPW successor issues, not duplicated.

## Follow-Up

PPW #303 should run or explicitly defer a small external model-review pilot. It
should decide, after validated submissions exist, whether any resulting
artifacts stay in the child repository as reference records, become PPW fixture
candidates, or require additional review-gate issues. Until then, PPW should
keep `lincoln-metaphor-analysis` reliability status at `pending`.
