# Blinded Recoding Procedure

**Governing issue:** [PPW #316](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/316)  
**Audit date:** 2026-08-13

## Score-Origin Contract

Every score now declares:

- `scoreOrigin`: `scaffold`, `legacy`, `outcome-derived`,
  `independent-coding`, `adjudicated`, or `final`;
- `outcomeVisibleToCoder`: whether the scorer could see the case outcome;
- `includeInSubstantiveAnalysis`: whether the score may enter substantive
  summaries.

Existing repository scores are marked `legacy`, `outcomeVisibleToCoder: true`,
and `includeInSubstantiveAnalysis: false`. This preserves them as auditable
draft artifacts while preventing accidental use as publishable explanatory
variables.

## Publication Rule

Substantive summaries include only scores where:

- `includeInSubstantiveAnalysis` is `true`;
- `scoreOrigin` is not `scaffold`, `legacy`, or `outcome-derived`;
- `outcomeVisibleToCoder` is `false`.

Publication-facing scores must satisfy the same independence rule.

## Replacement Workflow

To replace a legacy score, create a blinded score packet that hides the case
outcome category and outcome cluster. The scorer should code the construct from
passages, claims, interpretations, and the scoring codebook only. A second pass
may adjudicate disagreements, but the final score must retain provenance showing
the independent or adjudicated origin.
