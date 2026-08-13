# Case Selection

Every case should state its role in the research design.

## Case Selection Roles

- `gold-case`: reference implementation with fuller evidence chains
- `high-pathology-case`: expected strong pathology pattern
- `countercase`: strong sacred political order without expected sacrificial escalation
- `collapse-case`: tests legitimacy, coherence, or command failure
- `transformation-case`: tests absorption or successor-order transition
- `stagnation-case`: tests frozen pathology
- `hybrid-case`: tests mixed or sequential outcomes
- `deferred-case`: retained for later work
- `rejected-case`: rejected from current scope with rationale

## Required Fields

Each `case.json` should include:

- `caseSelectionRole`
- `selectionRationale`
- `theoryTest`
- `unitClass`
- `caseType`
- `designStratum`
- `comparabilityGroup`
- `outcomeClass`
- `evaluationRole`
- `holdoutStatus`
- `samplingMetadata`

This prevents the case set from becoming pure confirmation bias.

## Unit Classes

- `political-formation`: a regime, empire, civil religion, postwar order, or
  movement treated as an order-level unit.
- `historical-episode`: a bounded war, revolution, collapse, transition, or
  hybrid episode.
- `corpus-subset`: a source collection retained for later mapping rather than a
  directly scored case.

Scores should compare like with like by using `designStratum`, which starts
with the unit class and then names a pre-outcome design category such as regime,
war, revolution, collapse, or postwar order. `comparabilityGroup` remains as a
compatibility alias for `designStratum` and must not encode outcome labels.
Outcome labels stay in `outcomeClass`/`outcome` as restricted research-design
metadata and are excluded from coder-facing packets.

## Evaluation Roles

- `theory-development`: cases open for model-building and calibration.
- `holdout-evaluation`: sealed cases reserved for later evaluation.
- `open-evaluation`: evaluation cases already opened under protocol.
- `excluded`: rejected or retired cases.

Sealed holdouts must not contain claims, interpretations, or scores. They may
retain restricted registry metadata in `case.json`, but coder-facing packet
artifacts must be generated under `policies/blinding-policy.json` and must
exclude outcomes, outcome clusters, sampling expectations, scaffold scores,
prior conclusions, and holdout status. Fresh holdout selection, packet release,
opening, and unblinding remain maintainer approval gates.

## Current Holdouts

The American Revolution and Napoleonic France scaffolds are sealed
holdout-evaluation cases. They exist only to preserve canonical case IDs for
future evaluation and evidence-module mapping.
