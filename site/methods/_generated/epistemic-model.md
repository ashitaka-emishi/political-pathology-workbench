::: {.callout-warning}
Draft methods page. Epistemic model and evidence standards are provisional.
:::

The workbench models claims as traceable relationships among sources, passages, claims, interpretations, scores, cases, theory versions, reviewers, and publication artifacts.

Core chain:

```text
Source -> Passage -> Claim -> Interpretation -> Variable Score -> Case Assessment -> Theory Evaluation -> Publication Artifact
```

The methodological target is to make statements of this form auditable:

```text
Theory version X interprets Case Y using Evidence Z, producing Score A with Confidence B and Review Status C.
```

## Review Status Chain

Every record in the evidence chain carries a `reviewStatus` field. The allowed progression is:

`draft` → `source-review` → `evidence-review` → `argument-review` → `score-review` → `human-reviewed` → `approved`

A `rejected` status terminates a record without promotion. AI-generated claims and scores must reach `human-reviewed` or `approved` before appearing on public-facing pages.

## Evidence Standards

Evidence must preserve traceability from source metadata through passage, claim, interpretation, and score.

## Source Standards

Sources in case source packs should have citation metadata in `bibliography/sources.csl.json` unless they are explicit placeholders.

Do not commit full copyrighted books, paywalled articles, restricted PDFs, or large copyrighted corpora without permission.

## Passage Standards

Passages should include:

- source ID
- usable locator
- evidence role
- review status
- publication status

Placeholder passages must remain draft and must not support public-facing final claims.

## Evidence Roles

- `grounds`
- `warrant`
- `backing`
- `qualifier`
- `rebuttal`
- `counterevidence`
- `context`
- `corroboration`

Claims supported by a single passage should remain provisional unless reviewed with explicit confidence rationale.

## Counterclaim Integration

Counterevidence prevents the workbench from treating theory support as confirmation by default.

## Counterclaim Effects

- `contradicts`
- `qualifies`
- `limits`
- `complicates`
- `supports-alternative-explanation`

## Minimum Record

Counterclaims should include:

- `counterclaimId`
- `caseId`
- `claim`
- `effect`
- `targetClaimIds`
- `sourceIds`
- `rationale`
- `reviewStatus`
- `publicationStatus`

Public-facing cases should eventually include counterclaims or qualifying evidence.
