# Data Dictionary

## Case Fields

- `caseId`: stable case identifier
- `title`: human-readable case title
- `subtype`: case subtype
- `outcome`: controlled outcome category
- `symbolicOrderId`: stable symbolic-order identifier
- `symbolicOrderName`: human-readable symbolic-order name
- `symbolicOrderDefinition`: short operational definition
- `symbolicOrderStrength`: 0-5 score
- `symbolicOrderStrengthRationale`: evidence-aware rationale
- `caseSelectionRole`: role in research design
- `selectionRationale`: reason for inclusion
- `theoryTest`: what the case tests

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
