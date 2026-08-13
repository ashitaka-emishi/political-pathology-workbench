# Empirical Validation, Blinded Coding, and Instrument Calibration

This milestone consolidates two August 13, 2026 deep-review documents:

- `PPW_NEXT_MILESTONE_DEEP_REVIEW_FIXES.md`
- `PPW_second_deep_review_next_milestone.md`

The reviews agree on the same central diagnosis: PPW now has stronger schemas,
review gates, score semantics, holdout metadata, claim-promotion controls, and
baseline reliability machinery, but the next risk is cross-object divergence.
A record can be locally valid while the full research chain containing it is
globally inconsistent, outcome-leaking, or analytically over-eligible.

## Milestone Goal

Move PPW from a schema-rich and methodologically guarded workbench to an
end-to-end auditable comparative coding instrument.

The milestone is complete when PPW can state that every analytical result is
derived from schema-valid, uniquely identified, semantically compatible research
objects; analytical inclusion is computed from verifiable evidence and review
lineage; outcome-derived and legacy values cannot leak through case metadata or
generated exports; JavaScript validation and Python analysis apply the same
eligibility policy; and final scores are reconstructible from version-locked
codebooks, blinded coder packets, independent coder judgments, reliability
reports, and adjudication records.

## What This Milestone Does Not Reopen

This milestone builds on, rather than redesigns, the previous methodological
hardening work:

- construct magnitude remains separate from confidence and evidence quality;
- `null` remains the representation for unknown or insufficient evidence;
- legacy and outcome-visible scores remain excluded from substantive analysis;
- claim promotion remains a methodological gate;
- raw coder judgments remain separate from adjudication;
- sealed holdouts remain protected until a maintainer explicitly opens them;
- implementation merges do not constitute publication, promotion, or reviewed
  research-artifact approval.

## Consolidated Workstreams

### 1. Repository Graph Integrity

Activate canonical JSON Schema validation in CI, build a global identity and
referential-integrity registry, and validate score-to-source chains as one
semantic object.

Core invariants:

- every canonical JSON artifact conforms to its declared schema;
- every ID is unique within an explicit namespace policy;
- directory slugs and declared object IDs agree;
- score, interpretation, claim, passage, source, theory, variable, and codebook
  references resolve unambiguously;
- score lineage cannot switch case, theory, variable, or incompatible codebook
  context midway.

### 2. Canonical Measurement Semantics

Establish a single machine-readable measurement specification. The active
rubric, codebook, score schema, coder-score schema, adjudication schema,
validators, generated summaries, and public documentation must agree that:

- score values represent construct magnitude;
- `0` means substantive absence or minimum, not no evidence;
- insufficient evidence resolves to `null` with an unknown reason;
- confidence and evidence quality are separate from magnitude;
- only variables with an explicit scoreable role can receive governed scores.

### 3. Analytical Eligibility and Review-State Propagation

Replace self-declared analytical inclusion with derived eligibility. A stored
assertion such as `includeInSubstantiveAnalysis` may remain as a declaration, but
CI must compute whether a score is eligible from lineage, review state, origin,
blinding, claim promotion, coder records, adjudication, and holdout status.

Review, workflow, and publication states should be orthogonal and transition
checked. Higher-level artifacts must not be more mature than their dependencies
unless an explicit policy allows it.

### 4. Outcome-Blind Coding and Holdout Safety

Split neutral case metadata from restricted outcome and research-design
metadata. Coder-facing packets must exclude outcome labels, outcome-correlated
comparability groups, legacy scaffold scores, sampling expectations, and prior
review conclusions.

Current sealed holdouts are useful pipeline tests, but because outcome and
scaffold values have appeared in repository history, they should not be treated
as pristine unseen tests for maintainers who have already encountered those
values. Fresh holdout rounds require the blinding architecture first.

### 5. Cross-Language Policy Parity

JavaScript validation and Python analytical summaries must share the same
eligibility policy or prove parity through shared conformance fixtures. Unresolved
evidence governance must fail closed in every analytical path.

### 6. Reliability and Adjudication

Raw coder records and adjudications must support `null` / unknown values,
coding-round provenance, packet hashes, codebook hashes, missingness reporting,
duplicate-submission detection, ordinal chance-corrected reliability, and
adjudication lineage.

No-data states must be distinct from poor reliability. Different codebook
versions must not be pooled without an explicit migration rule.

### 7. Empirical Calibration Release

The milestone should produce a small calibration release before any broad
recoding or holdout opening:

- choose development calibration cases;
- create blind packets;
- collect at least two independent human coder submissions where required;
- compute reliability by variable;
- adjudicate preserved disagreements;
- exercise disconfirming search logs and rival explanations;
- produce at least one non-legacy score eligible for substantive analysis.

### 8. Public Status and Theory Validity

Generated and public-facing outputs must distinguish stored score records from
substantive measurements. Theory files should also expand construct genealogy,
scope conditions, rival hypotheses, and discriminating predictions so PPW can
separate its explanatory claims from neighboring theories.

## Deduplicated Child Issue Map

1. Enforce schema, identity, and semantic-chain integrity.
2. Canonicalize scoring semantics, measurement roles, and codebook versions.
3. Remove case-level analytical-score duplication.
4. Derive analytical eligibility and normalize review/publication state.
5. Unify JavaScript and Python eligibility policy.
6. Implement outcome-blind coding packets and holdout-safe metadata.
7. Align raw coder and adjudication schemas with score v1.1.
8. Upgrade reliability statistics, missingness, and duplicate controls.
9. Validate adjudication lineage and disagreement categories.
10. Resolve promotion searches and harden search-log integrity.
11. Add export profiles and public/status leakage tests.
12. Run a real multi-coder calibration study and first substantive release.
13. Expand construct genealogy, scope conditions, and rival predictions.

## Completion Criteria

- All child issues are closed.
- The milestone exit review below is answered.
- Any research-artifact promotion, human reliability acceptance, source-rights
  decision, external export, publication approval, or reviewed tag remains a
  separate explicit maintainer action unless handled by a dedicated review issue.

## Exit Review

- Is there one active score-semantic specification?
- Can any generated or public file expose a legacy scaffold as an analytical
  score?
- Can coders and adjudicators submit `unknown` without choosing a number?
- Can PPW reconstruct exactly what each coder saw?
- Can PPW prove coder packets omitted outcome-derived information?
- Do JavaScript and Python agree on every eligibility fixture?
- Does unresolved claim or promotion state fail closed?
- Does no reliability data produce an undefined/insufficient status rather than
  `0.0`?
- Are duplicate and missing coding assignments detected?
- Does every scoreable variable have variable-specific magnitude anchors?
- Has a real human multi-coder calibration round been completed?
- Are design strata independent of outcome labels?
- Have sealed holdouts remained unopened during calibration?
- Do at least two mature cases contain disconfirming searches and rival
  explanations?
- Is there at least one score eligible for substantive analysis?
- Can every eligible score be traced through raw coder records, adjudication,
  final score, and admissible evidence?
- Do site summaries distinguish stored score records from substantive scores?
- Does each core construct have a credible scholarly genealogy and
  discriminant-validity argument?
