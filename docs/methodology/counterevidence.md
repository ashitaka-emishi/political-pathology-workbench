# Counterevidence

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

## Search Purposes

Search logs distinguish:

- `supporting`: searches intended to locate evidence for the claim;
- `disconfirming`: searches intended to locate evidence that weakens, qualifies,
  or falsifies the claim;
- `neutral`: exploratory searches that may support or challenge multiple
  mechanisms.

Promoted findings require both supporting and disconfirming search-log
references. Draft cases may record incomplete searches, but the gap must remain
visible until promotion.

## Rival Explanations

Rival explanations live in `rival-explanations.json` and record the competing
mechanism, supporting evidence, contradicting evidence, and the discriminator
that would decide between the PPW interpretation and the rival account.
