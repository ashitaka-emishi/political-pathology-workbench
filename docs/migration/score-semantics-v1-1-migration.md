# Score Semantics v1.1 Migration

**Governing issue:** [PPW #313](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/313)  
**Migration date:** 2026-08-13

## Summary

PPW score semantics now distinguish construct magnitude from confidence and
evidence quality.

The `value` field means substantive construct magnitude only. It no longer
means the strength, quantity, or quality of evidence. Scores that cannot assign
a substantive construct magnitude should use `value: null`,
`valueSemantics: "unknown"`, and `unknownReason`.

Existing numeric score records were migrated mechanically:

- `codebookVersion` changed from `v1` to `v1.1`;
- `valueSemantics: "construct-magnitude"` was added to each numeric score;
- no numeric score values, confidence values, rationales, review statuses, or
  publication statuses were changed.

## Validation Rules

The validator now enforces:

- every score declares `valueSemantics`;
- numeric values must use `construct-magnitude`;
- `null` values must use `unknown` and provide `unknownReason`;
- `confidence.value` must be a number from 0 to 1;
- `confidence.label` and `confidence.rationale` are required;
- optional `evidenceQuality.value` and dimensions must be numbers from 0 to 1.

Generated comparison indexes ignore `null` score values when calculating
numeric min, max, and average fields.

## Human Review Boundary

This migration does not recode, approve, or publish any score. It records the
semantics under which current draft and score-review records should be
understood. Any substantive recoding, confidence revision, evidence-quality
assessment, or promotion remains a separate review-gated action.
