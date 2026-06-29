# Human-Review Checklist

`human-reviewed` is the minimum threshold for public-facing scholarly credibility. Records below this status must not appear on public-facing pages. This document specifies what a human reviewer must verify before advancing any record to `human-reviewed`.

The review chain is: `draft` → `source-review` → `evidence-review` → `argument-review` → `score-review` → `human-reviewed` → `approved`.

---

## General requirements (all record types)

- [ ] The record's `reviewNote` has been read and all items flagged are resolved or explicitly accepted as documented uncertainty
- [ ] The record's `publicationStatus` is consistent with intended use
- [ ] The `codebookVersion` matches the current codebook

---

## Passage checklist

A passage at `argument-review` can advance to `human-reviewed` when all of the following are confirmed by a human reviewer:

### Source verification
- [ ] The passage text has been verified against a physical or authoritative digital edition, not just a secondary reproduction
- [ ] The locator is precise: page number, article/section number, and edition are all confirmed against the actual source
- [ ] Any edition-specific wording noted in the `locator` or `reviewNote` has been verified (e.g., "physical library verification" flags mean this is pending)
- [ ] For translated sources: the English text has been checked against the translation cited, and the translation is identified as either (a) official, (b) scholarly with stated credentials, or (c) working translation with specific uncertainty documented
- [ ] No material discrepancy exists between the passage text in the record and the source text

### Evidence role
- [ ] The `evidenceRole` value (`grounds`, `warrant`, `backing`, `rebuttal`, `qualifier`) is correct given the passage's function in the claim chain
- [ ] The passage is not being used to support a claim it does not actually make

---

## Claim checklist

A claim at `argument-review` can advance to `human-reviewed` when:

### Derivation
- [ ] All passages cited in `derivedFrom` have been verified (see passage checklist) or their unverified status is explicitly accepted
- [ ] The claim text accurately represents what the passages say — it does not overstate or understate the passage evidence
- [ ] The inferential step from passages to claim is stated and is logically valid

### Confidence
- [ ] The confidence value and label are proportionate to the evidence quality
- [ ] All uncertainty factors in the claim's `reviewNote` have been reviewed; any that have been resolved are noted

### Counterclaims
- [ ] Any counterclaims in `counterclaims.json` have been read and the claim's `reviewNote` addresses them or the interpretation does

---

## Interpretation checklist

An interpretation at `argument-review` can advance to `human-reviewed` when:

### Mechanism assignment
- [ ] The mechanism (`mechanism` field) is correctly identified and is the best fit from the valid vocabulary
- [ ] At least one alternative mechanism has been considered; the reason for rejecting it is either stated in the interpretation's rationale or is obvious from the passage evidence

### Variable values
- [ ] `sacrificeHealth` is one of the valid values and is defensible from the passages cited
- [ ] `sacrificeBoundedness` is one of the valid values and is defensible
- [ ] `sacrificeTarget` is one of the valid values and is defensible
- [ ] The `corrigibility` value (if present) reflects the actual institutional architecture, not the normative ideal

### Claims support
- [ ] All claims cited in `supportingClaims` (or `derivedFrom`) have been reviewed and the interpretation does not outrun the claim evidence
- [ ] The confidence value is proportionate to the evidence and does not exceed the passage-level verification status

---

## Score checklist

A score at `score-review` can advance to `human-reviewed` when:

### Score value
- [ ] The numeric value is defensible on the 0–5 scale per the codebook definition for that variable
- [ ] The score is consistent with the interpretation's mechanism and variable values
- [ ] Any flags in `reviewNote` about holding the score (e.g., "hold until chain expansion") have been resolved or explicitly accepted

### Confidence
- [ ] The confidence value and label are proportionate to the evidence
- [ ] All uncertainty factors are documented in `confidence.uncertaintyFactors`
- [ ] The confidence rationale explains why the value is not higher (i.e., what would need to change to raise it)

### Cross-case consistency
- [ ] The score value is consistent with comparable cases at similar scale levels (e.g., a corrigibility=1 score should be compared against nazi-germany-score-003 to confirm comparability)
- [ ] The human reviewer has noted any cross-case comparisons that were considered

---

## Advancing to `approved`

`approved` is reserved for records that have passed human-reviewed and have been explicitly approved for publication. Approval requires:

- [ ] The lead researcher (Andrew Hammer) has personally reviewed the human-reviewed record
- [ ] Any remaining uncertainty factors are either resolved or explicitly accepted as documented limitations in the working paper
- [ ] The record is marked `publicationStatus: final` or `publication-ready`

---

## Procedure

1. Open `docs/review/gold-case-review-status.md` and find the record to review
2. Work through the relevant checklist above
3. For each item checked: if the item is satisfied, tick the checkbox. If it requires changes, make them and note in the record's `reviewNote` what was changed and why.
4. When all items in the checklist are satisfied, advance the record's `reviewStatus` to `human-reviewed`
5. Update `gold-case-review-status.md` to reflect the new status
