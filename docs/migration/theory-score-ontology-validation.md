# Theory-to-Score Ontology Validation

**Governing issue:** [PPW #314](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/314)  
**Audit date:** 2026-08-13

## Summary

PPW validation now checks that score and interpretation `variableId` values are
defined by the referenced `theoryId`.

Before this audit, case scores used these general-theory variables:

- `sacred-political-order-strength`
- `corrigibility`
- `collective-immortality`

The general-theory variable list defined `corrigibility`, but it still carried
the older `symbolic-order-strength` identifier and did not define
`sacred-political-order-strength` or `collective-immortality`. The source theory
now defines both identifiers used by active PPW scores.

## Validation Scope

The validator now enforces:

- each theory manifest has a readable `variables.json`;
- theory variable records include `variableId`, `label`, and `description`;
- duplicate variable IDs in a theory fail validation;
- interpretation `variableId` values resolve to the referenced theory;
- score `variableId` values resolve to the referenced theory;
- score `definitionRefs` resolve to a known theory variable, mechanism, or core
  definition.

## Boundary

This issue does not introduce alias, replacement, deprecation, or lifecycle
metadata. That remains PPW #315. The older `symbolic-order-strength` identifier
is retained as a defined historical/general-theory variable until #315 decides
whether it should become an alias, deprecated variable, or retired identifier.
