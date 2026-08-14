# Falsifiability and Theory Bibliography

**Governing issue:** [PPW #321](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/321)  
**Audit date:** 2026-08-13

## Proposition Contract

The theory layer is centered on the draft research question registry at
`research/research-questions.json`. The current organizing question is:

> Under what conditions do sacred political orders become pathological rather
> than corrigible, restrained, or transformable?

Theories should be treated as candidate explanations for that question, not as
assumptions the repository is organized to prove. Validation requires each
theory `construct-validity.json` record to point back to a registered research
question.

Each theory may define `propositions.json`. Every proposition must include:

- `propositionId`;
- proposition `text`;
- linked `variableIds`;
- at least one `falsificationCriteria` entry;
- `referenceIds` that resolve to `bibliography/sources.csl.json`.

Validation fails when a proposition references an undefined theory variable or
uncited bibliography source.

## Reference Links

Theory `references.json` records may link sources to:

- `supportsVariables`;
- `supportsPropositions`.

Validation fails when those links point outside the local theory variable or
proposition registry.

## Current Boundary

The current bibliography is intentionally sparse and uses the existing
Koenigsberg source as the documented genealogy anchor. This PR makes the audit
trail executable so later theory references can be added without weakening the
contract.
