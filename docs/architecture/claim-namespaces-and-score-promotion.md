# Claim Namespaces and Score Promotion

**Governing issue:** [PPW #317](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/317)  
**Audit date:** 2026-08-13

## Supported Claim References

PPW scores inherit their claim support through the linked interpretation's
`claimIds`.

Supported claim references are:

- native case claims: the local case `claimId`, resolved in that case's
  `claims.json`;
- evidence-module claims:
  `module:<originModuleId>:claim:<claimId>`, resolved through
  `data/claim-promotion/promotion-registry.json`.

Unqualified imported claim IDs are intentionally not accepted for included
scores because different modules can use overlapping local identifiers.

## Score Inclusion Gate

For scores where `includeInSubstantiveAnalysis` is `true`:

- every native claim must be `human-reviewed` or `approved`;
- every evidence-module claim must resolve to `promotionStatus:
  promoted-finding` and `reviewStatus: human-reviewed` or `approved`;
- draft, rejected, blocked, retired, and unresolved claims fail validation.

Scores excluded from substantive analysis may continue to reference draft or
blocked claims as visible workbench artifacts.

## Current State

Existing scores are legacy and excluded by PPW #316, so this gate does not
promote or reject current draft interpretations. It prevents future substantive
summaries from silently depending on unresolved native or cross-namespace claim
state.
