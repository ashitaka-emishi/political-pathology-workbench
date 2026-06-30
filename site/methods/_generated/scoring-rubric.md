::: {.callout-warning}
Draft scoring codebook. All scores and variable definitions are provisional.
:::

Scores use a 0-5 scale. All public-facing scores require confidence metadata, review status, definition references, and a codebook version.

## General Anchors

| Score | Meaning |
|---:|---|
| 0 | No evidence in the current record. |
| 1 | Weak or indirect evidence. |
| 2 | Partial evidence with substantial uncertainty. |
| 3 | Moderate evidence with traceable support. |
| 4 | Strong evidence with caveats. |
| 5 | Strong, repeated, directly traceable evidence. |

## Required Score Metadata

- `confidence.value`
- `confidence.label`
- `confidence.rationale`
- `reviewStatus`
- `definitionRefs`
- `codebookVersion`

## Core Variables

### sacred-political-order-strength

Measures how coherently a sacred political order organizes collective identity, legitimacy, obligation, memory, moral judgment, and sacrifice around its sacred objects, values, or persons. See `symbolic-order-definition.md`.

False positive: high symbolic visibility without identity, legitimacy, obligation, memory, moral judgment, and sacrifice.

### sacralization

Measures whether an order, institution, leader, people, cause, memory, or territory is treated as morally non-negotiable and resistant to correction.

False positive: solemn memory or respect without non-negotiability.

### collective-immortality

Measures whether mortal individuals are symbolically linked to an enduring collective body whose continuation gives meaning to death or sacrifice.

False positive: ordinary group belonging without mortality-transcendence.

### sacred-enemy

Measures whether an opponent is represented as contaminating, existential, profaning, or morally absolute.

False positive: ordinary rivalry or strategic threat.

### corrigibility

Measures whether criticism, error acknowledgement, leadership replacement, legal revision, victim testimony, and repair can occur without being treated as existential threat.

False positive: formal review channels that cannot correct real harm.

### pathology

Measures maladaptive self-preservation at the expense of truth, correction, personhood, and human flourishing.

False positive: using pathology as a synonym for bad politics, hierarchy, authority, ritual, sacrifice, or strong identity.
