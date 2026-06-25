# 0003: Traceable Epistemic Model

Status: accepted for scaffold

## Context

Scores and interpretations need to be auditable back to evidence.

## Decision

Model the chain Source -> Passage -> Claim -> Interpretation -> Score as first-class JSON records.

## Consequences

Validation can enforce broken-reference checks and gold cases can demonstrate full traceability.
