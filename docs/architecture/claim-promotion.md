# Claim Promotion Policy

Part of [#120](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/120) (Milestone 13: Architecture and Governance Baseline).

See also: [evidence-modules.md](evidence-modules.md) for the module boundary that defines where draft claims originate.

---

## Claim lifecycle

Claims, interpretations, and scores share a common `reviewStatus` field. The full lifecycle, in promotion order:

| Status | Meaning |
|---|---|
| `draft` | Initial entry; not reviewed; not publicly cited |
| `source-review` | Source text and locator verified against a physical or authoritative digital edition |
| `evidence-review` | Passage text confirmed; passage-to-claim derivation checked; `derivedFrom` links complete |
| `argument-review` | Claim argument reviewed for internal consistency and scope against the theory variable |
| `score-review` | Score value and confidence reviewed; score rationale documented |
| `human-reviewed` | A named human reviewer has signed off; all prior gates passed |
| `approved` | Ready for public publication on the PPW site |
| `rejected` | Blocked permanently; reason recorded in `reviewNote` |

Promotion is **sequential**: a claim cannot enter `argument-review` without passing `evidence-review`. A score cannot enter `score-review` without the linked claim being at `argument-review` or above.

**No imported annotation automatically becomes a PPW score.** Child-repo annotation artifacts (Stage 4A/4H/4J records, cluster profiles, adjudication decisions) establish the evidentiary basis for draft claims but must pass every gate above before appearing as a PPW finding or score.

---

## Promotion criteria (checkable requirements)

### `draft` → `source-review`

- [ ] Source text identified and cited with author, title, date, and edition.
- [ ] Source is in `bibliography/sources.csl.json` with a valid CSL-JSON entry.
- [ ] `locator` field in the passage record specifies page/section/paragraph.

### `source-review` → `evidence-review`

- [ ] Passage text confirmed against the cited edition (physical copy or authoritative digital facsimile).
- [ ] Edition-specific wording discrepancies noted in `reviewNote` or resolved.
- [ ] `derivedFrom` in the claim record lists all supporting passage IDs.
- [ ] Each listed passage is at `evidence-review` or above.

### `evidence-review` → `argument-review`

- [ ] Claim argument is internally consistent.
- [ ] Claim is scoped to the theory variable it supports (no overclaiming).
- [ ] Counterclaims or limitations are noted in `counterclaims.json` if applicable.
- [ ] `confidence.value` and `confidence.rationale` are present and defensible.

### `argument-review` → `score-review`

- [ ] Score value is justified against the theory variable definition and codebook.
- [ ] Score rationale documents why the value was chosen over adjacent values.
- [ ] `confidence.uncertaintyFactors` lists any remaining open questions.
- [ ] Linked interpretation record is at `argument-review` or above.

### `score-review` → `human-reviewed`

- [ ] A named human reviewer (`reviewedBy` field) has read the full chain: passage → claim → interpretation → score.
- [ ] All `uncertaintyFactors` are either resolved or accepted as residual uncertainty.
- [ ] `reviewNote` summarizes the reviewer's decision.

### `human-reviewed` → `approved`

- [ ] `publicationStatus` updated to `published` (or a milestone-gated equivalent).
- [ ] The finding is ready to appear on the PPW public site.

---

## Blocked and retired claims

**Blocked (`rejected`):** A claim that cannot be promoted due to unresolvable evidentiary, sourcing, or argument problems. Set `reviewStatus` to `rejected` and document the reason in `reviewNote`. Rejected claims remain in the data files for audit purposes and are excluded from scoring and site generation.

**Retired (soft block):** If a claim is superseded by a better-evidenced claim rather than being outright wrong, set `publicationStatus` to `retired` and add a `reviewNote` pointing to the superseding claim. Retired claims are excluded from scoring but preserved for provenance.

Neither blocked nor retired claims should be deleted from the data files.

---

## Effect of claim promotion on case scores

Scores are only included in PPW scoring summaries and site output when:

1. The linked claim is at `argument-review` or above.
2. The score itself is at `score-review` or above.
3. The `publicationStatus` of the score is not `draft` (i.e., is `published` or `approved`).

The Python scoring module (`src-py/political_pathology/scoring/summary.py`) filters on these conditions. Draft scores are computed during development but excluded from public output.

---

## Counterclaims and limitations

Counterclaims and limitations are attached to the case via `data/cases/<slug>/counterclaims.json`. They must reference the claim or score they qualify via `claimId` or `scoreId`. Promotion of a claim does not require counterclaims to be resolved — it requires only that they be documented. A promoted finding with documented counterclaims is more credible than one with none.

---

## Examples

### Lincoln deep corpus claim (standard promotion)

1. LMA corpus identifies a metaphor cluster in Lincoln's 1863 rhetoric (child-repo annotation artifact).
2. PPW creates `lincoln-claim-001` with `reviewStatus: draft`, `derivedFrom: [lincoln-passage-001]`.
3. Source text confirmed against Basler edition → `evidence-review`.
4. Claim scoped to `sacred-political-order-strength` variable → `argument-review`.
5. Score value 4/5 reviewed and rationale documented → `score-review`.
6. Human reviewer signs off → `human-reviewed`.
7. `publicationStatus` set to `published` → appears on PPW site.

### Sacrifice Law comparative claim (multi-case)

1. SLW corpus identifies shared metaphor pattern across Napoleon and Lincoln cases.
2. PPW creates `sacrifice-law-claim-001` with `derivedFrom` listing passages from both cases.
3. Each passage must independently reach `evidence-review` before the claim advances.
4. Comparative claim requires argument review to confirm cross-case scope is defensible.
5. Score reflects comparative strength, not single-case strength — rationale must state this.

### Blocked claim (insufficient review)

1. `lincoln-claim-003` is at `draft`; the supporting passage (`lincoln-passage-007`) has uncertain source text.
2. Source text cannot be confirmed: translation variant exists in two scholarly editions.
3. `reviewNote` on `lincoln-passage-007`: "text disputed between Basler (1953) and CW online; cannot advance until physical edition checked."
4. `lincoln-claim-003` stays at `draft`; `reviewStatus` is not advanced to `source-review`.
5. If the dispute is unresolvable, set `reviewStatus: rejected` on the passage; the claim then cannot be promoted and is also set to `rejected` with a cross-reference note.
