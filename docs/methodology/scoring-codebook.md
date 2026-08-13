# Scoring Codebook

**Current codebook version:** `v1.1`
**Operational-boundary revision:** PPW #312
**Score-semantics revision:** PPW #313

Scores use a `0-5` scale. All public-facing scores require confidence
metadata, review status, definition references, and a codebook version.

## Score Semantics

The `value` field represents substantive construct magnitude only. It does not
represent evidence quantity, evidence quality, or confidence.

Use `value: null` when the current record cannot support a construct-magnitude
estimate. Do not encode insufficient evidence as `0`.

Confidence remains separate in `confidence`. Evidence-chain quality may be
recorded separately in `evidenceQuality` when a score needs to distinguish
source coverage, directness, diversity, or similar evidence-quality dimensions
from confidence in the estimate.

These semantics do not by themselves promote any score to reviewed, approved,
or publication-ready status.

## General Magnitude Anchors

| Score | Construct-magnitude meaning |
|---:|---|
| `null` | Unknown or insufficient evidence; no substantive magnitude assigned. |
| 0 | Substantive absence or minimum of the construct in the coded unit and period. |
| 1 | Marginal or residual presence. |
| 2 | Low or partial presence. |
| 3 | Moderate presence. |
| 4 | Strong but not maximal presence. |
| 5 | Maximal or near-maximal presence under the variable definition. |

## Required Score Metadata

- `confidence.value`
- `confidence.label`
- `confidence.rationale`
- `reviewStatus`
- `definitionRefs`
- `codebookVersion`

Optional score metadata:

- `valueSemantics`
- `unknownReason`
- `evidenceQuality.value`
- `evidenceQuality.dimensions`
- `evidenceQuality.rationale`

## Coder Decision Protocol

1. Identify the case unit and period being coded.
2. Identify the variable and theory reference.
3. Collect admissible source, passage, claim, and interpretation records.
4. Apply the variable's inclusion and exclusion criteria before assigning a
   value.
5. Record counterevidence, rival readings, or missing evidence before moving a
   score beyond draft.
6. Record confidence separately from the score value.
7. Use `value: null` with `unknownReason` rather than assigning `0` when
   evidence does not establish the construct.

## Core Variable Profiles

### `sacred-political-order-strength`

Measures how coherently a sacred political order organizes collective identity,
legitimacy, obligation, memory, moral judgment, and sacrifice around sacred
objects, values, persons, texts, institutions, or histories.

Conceptual definition:

A sacred political order is strong when the order's sacred objects or values are
durably embedded in public authority, collective identity, moral language,
institutional practice, and sacrifice expectations.

Observable indicators:

- official texts, rituals, institutions, or public narratives define a shared
  collective body;
- authority is legitimated by reference to a sacred object, founding value,
  leader, constitution, people, revolution, race, party, memory, or divine
  order;
- violation of the sacred object is treated as desecration, betrayal, pollution,
  treason, or existential threat;
- sacrifice, duty, discipline, or death is represented as meaningful because it
  preserves or fulfills the order;
- institutions repeatedly reproduce the sacred order through law, education,
  ceremony, oath, monument, propaganda, doctrine, or public memory.

Inclusion criteria:

- evidence must show more than symbolic visibility;
- the sacred object must organize identity, legitimacy, obligation, memory, or
  sacrifice;
- institutional or public-authority embodiment should be identified when
  possible.

Exclusion criteria:

- ordinary patriotism, pride, ceremony, branding, or group affinity without
  non-negotiable sacred status;
- isolated rhetoric not connected to durable collective meaning or authority;
- private belief with no evidence of public or institutional ordering.

Positive example:

- a constitutional or revolutionary order that defines the people, legitimates
  authority, names sacred founding values, and frames sacrifice as duty to the
  enduring collective body.

Negative example:

- a state ceremony using flags and solemn language while leaving political
  authority, dissent, and policy revision fully ordinary and negotiable.

Borderline example:

- a civic memory practice that is emotionally powerful but lacks evidence that
  violation would be treated as desecration or existential betrayal.

Coding decision rules:

- code the strength of the order in the defined case period, not its later
  reputation;
- distinguish sacred-order coherence from source availability;
- do not infer maximum strength from violence alone;
- record whether the evidence describes design, public rhetoric, institutional
  practice, or lived reception.

Insufficient evidence:

- use a low-confidence or unknown disposition when sources identify symbols but
  do not show how they organize legitimacy, obligation, and sacrifice.

### `sacralization`

Measures whether an order, institution, leader, people, cause, memory, or
territory is elevated into an object of ultimate concern whose preservation is
treated as morally non-negotiable.

Conceptual definition:

Sacralization is the process by which a political object becomes resistant to
ordinary correction because its violation is framed as desecration or betrayal,
not merely disagreement or harm.

Observable indicators:

- rhetoric of holiness, purity, destiny, providence, martyrdom, consecration,
  contamination, betrayal, or ultimate obligation;
- legal, ritual, or institutional protection that places an object beyond
  ordinary revision;
- claims that criticism of the object is disloyal, profane, treasonous, or
  existentially dangerous;
- sacrificial demands justified by preserving the sacred object.

Inclusion criteria:

- evidence must show non-negotiability or heightened moral inviolability;
- the object being sacralized must be identifiable;
- the case record should distinguish sacralizing rhetoric from institutional
  enforcement where possible.

Exclusion criteria:

- solemn memory, respect, grief, mourning, ritual, reverence, or patriotism by
  itself;
- strong policy commitment that remains corrigible;
- symbolic language used conventionally without evidence of non-negotiability.

Positive example:

- a movement treats its founding cause as beyond compromise and frames dissent
  as betrayal of the sacred dead.

Negative example:

- a legislature praises a national tradition while openly debating whether to
  amend or abandon the policy associated with it.

Borderline example:

- wartime memorial language that consecrates sacrifice but does not clearly
  restrict later criticism or policy revision.

Coding decision rules:

- identify the object being sacralized before scoring;
- distinguish sacralization from sacred-political-order strength: sacralization
  can target one object, while order strength concerns the broader ordering
  system;
- require evidence of non-negotiability before treating reverent language as
  sacralization.

Insufficient evidence:

- do not code sacralization from ceremonial intensity alone.

### `collective-immortality`

Measures whether mortal individuals are symbolically linked to an enduring
collective body whose continuation gives meaning to death, suffering, or
sacrifice.

Conceptual definition:

Collective immortality is the symbolic process by which persons locate their
finite lives in an imagined collective body that outlives them.

Observable indicators:

- claims that the nation, people, revolution, church, race, party, constitution,
  or cause lives through individual deaths;
- rhetoric that the dead continue in, speak through, or obligate the living
  collective;
- martyr, ancestor, blood, rebirth, resurrection, inheritance, or immortality
  language;
- ceremonies or institutions that bind individual death to collective endurance.

Inclusion criteria:

- evidence must connect mortality to collective continuation;
- the enduring collective body must be identifiable;
- the record should show how death or sacrifice acquires meaning through that
  body.

Exclusion criteria:

- ordinary group identity without mortality-transcendence;
- commemoration that honors the dead without connecting them to collective
  endurance;
- tactical willingness to die without symbolic continuation.

Positive example:

- public rhetoric states that the dead gave their lives so the nation or cause
  might live and places duty on the living to preserve that body.

Negative example:

- a casualty report praises bravery but treats death as military loss rather
  than participation in an enduring collective.

Borderline example:

- a memorial implies continuity between dead and living but does not clearly
  state that the collective body survives through sacrifice.

Coding decision rules:

- separate collective immortality from generic sacrifice;
- identify whether the immortal body is national, racial, religious,
  revolutionary, constitutional, or institutional;
- record whether the evidence is official, popular, ritual, literary, or
  retrospective.

Insufficient evidence:

- do not infer collective immortality from death counts, casualty scale, or
  heroism language alone.

### `sacred-enemy`

Measures whether an opponent is represented not merely as a rival, competitor,
or strategic threat, but as a contaminating, existential, profaning, or morally
absolute danger to the sacred political order.

Conceptual definition:

A sacred enemy is an enemy whose existence or action is portrayed as violating
the sacred object or threatening the moral survival of the order.

Observable indicators:

- enemy language of pollution, contamination, disease, treason, blasphemy,
  corruption, vermin, evil, existential danger, or metaphysical threat;
- claims that compromise with the enemy would desecrate or betray the sacred
  order;
- ritual, legal, or institutional practices that mark the enemy as outside the
  moral community;
- demands for purification, extermination, sacrifice, cleansing, or permanent
  exclusion.

Inclusion criteria:

- the enemy must be linked to a sacred object or order;
- the threat must be morally absolute or contaminating, not merely strategic;
- evidence should identify who counts as the enemy and why.

Exclusion criteria:

- ordinary military, electoral, diplomatic, or ideological rivalry;
- harsh criticism without sacred-object violation;
- fear of material harm without moral contamination or existential-sacred
  framing.

Positive example:

- a regime describes an internal minority or opposition group as a pollutant
  whose existence profanes the nation and must be removed.

Negative example:

- a state identifies another state as a dangerous adversary while preserving
  ordinary diplomatic and moral categories.

Borderline example:

- emergency rhetoric calls an opponent existentially dangerous but does not
  specify contamination, desecration, or moral exclusion.

Coding decision rules:

- distinguish sacred enemy construction from ordinary threat perception;
- record whether the enemy is internal, external, symbolic, institutional, or
  imagined;
- look for links between enemy construction and sacrifice, repression, or
  purification.

Insufficient evidence:

- do not code sacred enemy from the existence of conflict alone.

### `corrigibility`

Measures whether an embodied order can receive criticism, acknowledge error,
revise itself, limit its own power, replace leadership, repair harm, and hear
victim testimony without treating correction as existential threat.

Conceptual definition:

Corrigibility is a property of an order's relationship to truth and correction.
It asks whether correction can become authoritative within the order rather than
being suppressed as betrayal.

Observable indicators:

- protected dissent, opposition, appeal, review, investigation, audit, or
  whistleblowing channels;
- legal or institutional mechanisms that can reverse policy errors or limit
  concentrated power;
- leadership replacement without sacred crisis;
- public acknowledgement of wrongdoing;
- victim testimony or counter-memory entering official repair processes;
- successful correction under pressure, not only formal capacity on paper.

Inclusion criteria:

- evidence must connect correction mechanisms to real authority or practice;
- formal procedures count more strongly when they can alter decisions, repair
  harm, or constrain power;
- correction should be possible without destroying the order's legitimacy.

Exclusion criteria:

- nominal review bodies with no power to correct real harm;
- purges, scapegoating, or tactical concessions presented as correction;
- reforms that preserve the sacred order by denying truth, personhood, or harm.

Positive example:

- a constitutional order protects dissent, limits amendment of core rights,
  allows leadership replacement, and provides enforceable review of state
  action.

Negative example:

- a party-state labels criticism as treason and treats error acknowledgement as
  existential betrayal of the leader, party, or revolution.

Borderline example:

- a regime permits limited technocratic policy correction while forbidding
  challenge to the sacred legitimacy of the order itself.

Coding decision rules:

- distinguish **corrigibility** from **correction capacity**:
  - correction capacity is the presence of mechanisms that might correct error;
  - corrigibility is the order-level ability to let those mechanisms become
    authoritative without sacred panic or repression;
- evaluate both institutional design and demonstrated practice where possible;
- do not equate stability with corrigibility;
- do not equate collapse after reform with absence of all corrigibility; record
  whether correction was attempted and why it failed.

Insufficient evidence:

- do not assign high corrigibility from constitutional text alone when practice
  is unknown and the case question concerns operation rather than design.

### `pathology`

Measures maladaptive self-preservation by an embodied sacred political order at
the expense of truth, correction, personhood, and human flourishing.

Conceptual definition:

Pathology is not strong meaning, hierarchy, sacrifice, or institutional
continuity by itself. It is a deformation in which preserving the order becomes
more authoritative than truth, repair, persons, or life.

Observable indicators:

- dissent, truth-telling, or victim testimony is suppressed as betrayal;
- persons are treated as expendable material for institutional or sacred-order
  preservation;
- sacrifice demands become coerced, concealed, unbounded, or self-mutilating;
- guilt, shame, or threat is projected onto a sacred enemy;
- correction mechanisms are disabled, captured, ritualized, or punished;
- the order preserves its identity by denying reality, harm, or moral limits.

Inclusion criteria:

- evidence must show maladaptive preservation of the order;
- the harm must involve truth, correction, personhood, or human flourishing;
- the sacred or institutional object being preserved should be identifiable.

Exclusion criteria:

- bad policy, ordinary conflict, hierarchy, authority, ritual, sacrifice,
  sacred memory, strong identity, or institutional survival by itself;
- tragic loss without evidence that the order consumed persons for its own
  preservation;
- moral disagreement with the order absent evidence of pathological mechanism.

Positive example:

- an order responds to crisis by suppressing truth, defining dissenters as
  traitors, demanding escalating sacrifice, and treating persons as disposable
  instruments of sacred preservation.

Negative example:

- an order faces crisis, admits error, preserves persons as moral subjects, and
  reforms without treating correction as desecration.

Borderline example:

- a wartime order demands costly sacrifice but preserves public truth,
  proportionality, dissent channels, and bounded war aims.

Coding decision rules:

- identify the preservation mechanism before coding pathology;
- code pathology separately from outcome severity;
- do not infer pathology from defeat, collapse, violence, or intensity alone;
- record disconfirming evidence where correction, truthfulness, or bounded
  sacrifice persists.

Insufficient evidence:

- do not code pathology when sources show harm but not the mechanism tying harm
  to sacred-order self-preservation.

## Pilot Coding Notes

Issue #312 establishes operational boundaries for codebook use. A separate
pilot-coding round should test whether multiple coders can apply these profiles
consistently. Use
[`codebook-pilot-worksheet.md`](codebook-pilot-worksheet.md) to capture coder
judgments and actionable disagreement notes. Pilot records should preserve:

- coder identifier or pseudonym;
- codebook version;
- case, source, passage, claim, interpretation, and variable identifiers;
- raw score;
- confidence;
- rationale;
- uncertainty factors;
- disagreement notes.

Observed disagreement should be classified as:

- unclear construct definition;
- missing source evidence;
- ambiguous case period;
- neighboring-construct confusion;
- confidence versus magnitude confusion;
- outcome-leakage risk;
- source-rights or provenance limitation.

Those disagreement categories should feed PPW #313, #314, #319, and #320 rather
than being silently resolved in this issue.
