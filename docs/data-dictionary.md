# Data Dictionary

## Case Fields

- `caseId`: stable case identifier
- `title`: human-readable case title
- `subtype`: case subtype
- `outcome`: controlled outcome category
- `sacredPoliticalOrderId`: stable sacred-political-order identifier
- `sacredPoliticalOrderName`: human-readable sacred-political-order name
- `sacredPoliticalOrderDefinition`: short operational definition
- `sacredPoliticalOrderStrength`: 0-5 score
- `sacredPoliticalOrderStrengthRationale`: evidence-aware rationale
- `caseSelectionRole`: role in research design
- `selectionRationale`: reason for inclusion
- `theoryTest`: what the case tests

### Symbolic Order and Sacred Political Order

`symbolic order` is retained as a source-tradition term for broad structures of shared meaning. The workbench's operational unit is `sacred political order`: a political meaning structure organized around sacred objects, values, or persons whose violation is experienced as desecration. Active case data therefore uses `sacredPoliticalOrder*` fields. Older `symbolicOrder*` names are historical scaffold terminology, not current schema fields.

## Interpretation Fields

- `mechanism`: controlled mechanism category
- `mechanismSummary`: case-specific mechanism description
- `alternativeMechanisms`: plausible alternatives
- `definitionRefs`: core definitions used
- `codebookVersion`: scoring codebook version

## Sacrifice Fields

- `sacrificeForm`: controlled list of sacrificed goods
- `sacrificeHealth`: healthy, ambiguous, pathological, mixed, or unknown
- `sacrificeBoundedness`: bounded, partially-bounded, unbounded, or unknown
- `sacrificeTarget`: self, enemy, in-group, out-group, mixed, or unknown

## Counterclaim Fields

- `counterclaimId`: stable counterclaim identifier
- `effect`: contradicts, qualifies, limits, complicates, or supports alternative explanation
- `targetClaimIds`: claims affected by the counterclaim
- `sourceIds`: supporting source IDs

## Generated Evidence Chain Files

`make generate` writes resolved evidence chains to `data/generated/all-chains.json` and one per-case file under `data/generated/chains/{caseSlug}.json`.

Each chain file contains one case-level object:

- `caseId`: stable case identifier
- `caseSlug`: directory slug for the case
- `title`: human-readable case title
- `interpretations`: resolved interpretation records for the case

Each interpretation entry preserves the interpretation fields except `claimIds` and adds:

- `claims`: full claim records referenced by `claimIds`
- `scores`: full score records whose `interpretationId` matches the interpretation

Each claim entry preserves the claim fields except `derivedFrom` and adds:

- `passages`: full passage records referenced by `derivedFrom`

Each passage entry preserves the passage fields and adds:

- `source`: full source-pack record for the passage `sourceId`
