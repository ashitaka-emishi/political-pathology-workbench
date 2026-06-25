# Milestone 01 — Academic Rigor and Methodological Apparatus, v4

> Repository: `ashitaka-emishi/political-pathology-workbench`  
> Status: revised milestone scope with tightened core definitions  
> Purpose: convert the workbench from a structured research spike into a transparent comparative research methodology while preserving the project focus on political pathology.

## 1. Milestone Summary

The Political Pathology Workbench already has a strong scaffold: theory-as-data, structured case folders, traceable evidence chains, schemas, validation tooling, generated indexes, Python scoring stubs, and a Quarto publication skeleton.

This milestone strengthens the project by adding a more rigorous methodological apparatus and tightening the core conceptual vocabulary. The goal is not to prove the theory or redirect the project. The goal is to make the framework more academically credible, testable, corrigible, and reviewable.

The major refinements are:

1. Define **symbolic order** more narrowly so it does not mean all human culture.
2. Keep **political pathology** as the project focus.
3. Distinguish **symbolic field**, **symbolic order**, and **embodied institutional order**.
4. Add **Symbolic Order Strength** as a scoreable variable.
5. Refine **sacrifice** beyond blood sacrifice.
6. Define **pathology**, **embodiment**, **sacralization**, **collective immortality**, **corrigibility**, **personhood**, **crisis**, **health**, and outcome categories.
7. Add controlled vocabularies and validation rules.
8. Add literature-map, counterevidence, AI-use, source standards, and inter-coder reliability scaffolding.

## 2. Revised Project Focus

The project remains focused on political pathology.

Refined framing:

> Political pathology studies the conditions under which embodied symbolic orders generate destructive group behavior.

This avoids the overly broad claim that all symbolic orders are pathological. Symbolic orders are normal and necessary. Pathology emerges when an embodied symbolic order becomes self-protective, self-sacralizing, closed to correction, enemy-oriented, and willing to consume persons for its own continuation.

## 3. Revised Core Model

Earlier model:

```text
Symbolic Order → Institutional Embodiment → Self-Preservation → Sacralization → Sacrifice / Violence
```

Revised model:

```text
Symbolic Order
→ Institutional Embodiment
→ Emergent Group-Psychological Tendencies
→ Crisis / Pressure
→ Adaptive or Pathological Outcome
```

Possible outcomes:

1. Sacrificial Escalation
2. Restrained Reordering
3. Collapse
4. Absorption / Transformation
5. Stagnation / Frozen Pathology
6. Hybrid / Transitional Outcome

The workbench should allow cases to move through more than one outcome over time.

Example: Weimar Republic may be coded as collapse, followed by the rise of a sacrificial successor order. Imperial Japan may be coded as sacrificial escalation followed by collapse and postwar transformation.

## 4. Tightened Core Definitions

This section should be implemented in:

```text
docs/methodology/core-definitions.md
docs/methodology/scoring-codebook.md
docs/data-dictionary.md
```

The goal is to prevent key terms from becoming too broad, metaphorical, or rhetorically overloaded.

### 4.1 Symbolic Field

**Definition**

A symbolic field is the broad background of human meaning within which persons and communities live.

It includes ordinary cultural, linguistic, ritual, economic, familial, religious, and social meanings that shape human life.

**Examples**

- language
- kinship
- money
- calendars
- rituals
- myths
- customs
- status markers
- sacred/profane distinctions
- ordinary civic habits

**Methodological Note**

The symbolic field is usually not the unit of analysis. It is too broad. The workbench should analyze symbolic orders within symbolic fields.

### 4.2 Symbolic Order

**Definition**

A symbolic order is a durable structure of shared meaning that defines collective identity, legitimates authority, organizes memory and moral judgment, and specifies the goods for which members may be asked to sacrifice.

**Operational Indicators**

A symbolic order becomes analytically relevant when it does at least four things:

1. Defines a collective body.
2. Claims legitimacy.
3. Ranks values.
4. Authorizes or constrains sacrifice.

**Examples**

- the Nation
- the Republic
- the Revolution
- Christendom
- the Volk
- the Emperor-centered imperial order
- the Party as guardian of History
- the Constitution / Union
- the Company as “family” or “mission”
- the Church as institutional body

**False Positives**

Do not treat something as a strong symbolic order merely because:

- it has symbols;
- it has a name;
- people feel affinity;
- it has rituals;
- it has traditions;
- it has rules;
- it has a brand.

A symbolic order must organize identity, legitimacy, obligation, memory, moral judgment, and sacrifice.

### 4.3 Embodied Institutional Order

**Definition**

An embodied institutional order is the material, organizational, procedural, and bodily form through which a symbolic order gains the capacity to act.

**Examples**

- state
- army
- bureaucracy
- courts
- schools
- political party
- corporation
- church hierarchy
- police
- rituals
- monuments
- uniforms
- ceremonies
- HR systems
- metrics and incentives
- architecture and sacred space
- memorial practices

**Methodological Note**

Embodiment is where symbolic meaning gains coercive, disciplinary, economic, ritual, administrative, or sacrificial power.

### 4.4 Pathology

**Definition**

Pathology is a maladaptive condition in which an embodied symbolic order preserves itself at the expense of truth, correction, personhood, and human flourishing.

**Not Pathological by Itself**

The following are not automatically pathological:

- hierarchy
- authority
- ritual
- sacrifice
- sacred meaning
- strong identity
- institutional continuity
- loyalty
- tradition
- collective memory

**Pathological Deformation**

An embodied symbolic order becomes pathological when it:

- suppresses correction;
- denies truth;
- converts dissent into betrayal;
- absolutizes its own survival;
- consumes persons for institutional preservation;
- projects guilt or shame onto enemies;
- treats persons as expendable material;
- closes itself against repair.

### 4.5 Embodiment

**Definition**

Embodiment is the process by which a symbolic order becomes materially and socially instantiated through institutions, practices, roles, rituals, laws, offices, technologies, spaces, and bodies.

**Examples**

- Nation → flag, army, constitution, schools, monuments, cemeteries.
- Company mission → org chart, HR policy, metrics, equity, slogans, meetings.
- Church → liturgy, clergy, sacraments, buildings, calendar, discipline.
- Revolution → party, tribunal, militia, slogans, holidays, martyr cults.

**Key Criterion**

Embodiment gives a symbolic order durability, agency, enforcement power, and sacrificial capacity.

### 4.6 Institution

**Definition**

An institution is a durable pattern of roles, rules, practices, expectations, and authority that organizes behavior across time.

**Distinction**

An organization is a concrete body.

Examples:

- Apple
- the U.S. Army
- the Catholic Church
- Harvard University

An institution is a durable social pattern.

Examples:

- corporation
- military
- church
- university
- court
- market
- marriage
- state

A symbolic order may be embodied in multiple organizations and institutions at once.

### 4.7 Self-Preservation

**Definition**

Self-preservation is the tendency of an embodied order to maintain continuity, authority, boundaries, resources, memory, and legitimacy over time.

**Healthy Self-Preservation**

Healthy self-preservation protects continuity, responsibility, institutional memory, accountability, and the goods the order exists to serve.

**Pathological Self-Preservation**

Pathological self-preservation occurs when institutional survival becomes ultimate and overrides truth, correction, personhood, and human flourishing.

**Suggested Scale**

- ordinary continuity
- defensive preservation
- absolutized preservation
- sacrificial preservation

### 4.8 Sacralization

**Definition**

Sacralization is the elevation of a symbolic order, institution, leader, people, cause, memory, or territory into an object of ultimate concern whose preservation is treated as morally non-negotiable.

**Indicators**

- dissent becomes betrayal;
- enemies become profane, polluting, or existential;
- compromise becomes forbidden;
- sacrifice becomes honorable or necessary;
- criticism becomes desecration;
- preservation becomes a moral absolute;
- ordinary political failure becomes cosmic or sacred threat.

**False Positives**

Do not treat ordinary respect, patriotism, reverence, tradition, ritual, or solemn memory as sacralization unless preservation of the object becomes morally non-negotiable and resistant to correction.

### 4.9 Sacred Enemy

**Definition**

A sacred enemy is an opponent represented not merely as a rival, competitor, or threat, but as a contaminating, existential, or morally absolute danger to the symbolic order.

**Indicators**

- enemy as disease;
- enemy as pollution;
- enemy as traitor within;
- enemy as racial/class/religious contaminant;
- enemy as threat to destiny;
- enemy as obstacle to collective rebirth;
- enemy as profaner of sacred order.

**Examples**

- “racial enemy”
- “class enemy”
- “enemy of the people”
- “infidel invader”
- “traitor within”
- “disease in the body politic”

### 4.10 Collective Immortality

**Definition**

Collective immortality is the symbolic process by which mortal individuals experience participation in an enduring collective body that appears to survive beyond their own deaths.

**Indicators**

- the nation, people, revolution, church, or movement lives beyond individuals;
- death becomes meaningful because the collective continues;
- the dead are absorbed into national or sacred memory;
- sacrifice grants participation in historical continuity;
- individual mortality is mitigated through collective survival;
- the mortal body is offered so the imagined immortal body may live.

**Methodological Note**

Collective immortality is not simply group identity. It is group identity that symbolically mitigates mortality through the imagined endurance of the collective body.

### 4.11 Sacrifice

**Definition**

Sacrifice is the costly surrender of some human good — time, body, health, conscience, freedom, speech, family, agency, life, or moral innocence — for the sake of a perceived higher good.

**Healthy Sacrifice**

Healthy sacrifice is bounded, proportionate, truthful, corrigible, and ordered toward life.

Examples:

- exercise;
- parenthood;
- truthful service;
- temporary hardship for a legitimate common good;
- disciplined training;
- moral courage;
- civic contribution;
- vocation.

**Pathological Sacrifice**

Pathological sacrifice is coerced, concealed, unbounded, self-mutilating, or ordered toward the preservation of the symbolic order at the expense of persons.

Examples:

- dying for the imagined immortality of the nation;
- suppressing conscience for party, church, corporation, or movement;
- staying in a life-consuming company because exit feels impossible;
- surrendering health, family, dignity, speech, or moral agency for institutional preservation;
- accepting institutional harm as “just the cost of belonging.”

### 4.12 Personhood

**Definition**

Personhood refers to the human being as a moral, embodied, relational, truth-capable, conscience-bearing subject who must not be reduced to material for the preservation of an order.

**Why It Matters**

Political pathology must define what is harmed. If persons become expendable for the symbolic order, pathology is present or emerging.

### 4.13 Human Flourishing

**Definition**

Human flourishing refers to the conditions under which persons can live truthfully, relationally, bodily, morally, and meaningfully without being consumed by the systems they sustain.

**Indicators**

- bodily integrity;
- conscience;
- truthful speech;
- meaningful relationships;
- moral agency;
- dignified participation;
- capacity for correction and repair;
- non-expendability of persons.

### 4.14 Corrigibility

**Definition**

Corrigibility is the capacity of an embodied order to receive criticism, acknowledge error, revise itself, limit its own power, and repair harm without treating correction as existential threat.

**Healthy Signs**

- dissent is institutionalized;
- criticism is allowed;
- error can be admitted;
- leaders can be replaced;
- laws can be revised;
- victims can be heard;
- memory can be corrected;
- the institution can reform without collapse.

**Pathological Signs**

- dissent is betrayal;
- critics are enemies;
- error is denied;
- leaders are sacred;
- law exists only to protect power;
- victims are silenced;
- memory is falsified;
- correction is treated as destruction.

### 4.15 Crisis / Pressure

**Definition**

Crisis is a perceived or actual disruption that threatens the continuity, legitimacy, authority, identity, or survival of an embodied symbolic order.

**Types**

- military defeat;
- economic collapse;
- humiliation;
- demographic anxiety;
- legitimacy crisis;
- leadership crisis;
- cultural dislocation;
- institutional failure;
- loss of territory;
- moral scandal;
- technological disruption;
- status decline;
- internal fragmentation.

**Methodological Note**

Many orders do not reveal their pathology until pressured. Crisis should be coded as both objective condition and perceived symbolic threat where possible.

### 4.16 Emergent Group Psychology

**Definition**

Emergent group psychology refers to patterned collective tendencies of perception, memory, defense, desire, shame, guilt, loyalty, enemy-construction, and sacrifice that arise through institutions and the persons who inhabit them.

**Important Caution**

Do not claim that symbolic orders literally have minds. The workbench studies emergent patterns, not supra-personal consciousness.

**Possible Tendencies**

- self-preservation;
- boundary defense;
- memory formation;
- idealization;
- enemy construction;
- shame management;
- guilt displacement;
- loyalty demand;
- sacrifice demand;
- correction resistance;
- legitimacy defense;
- myth maintenance;
- crisis response.

### 4.17 Institutional Health

**Definition**

Institutional health is the condition in which an embodied symbolic order remains ordered toward truth, human flourishing, bounded sacrifice, correction, and legitimate common goods.

**Healthy Does Not Mean**

- conflict-free;
- secular;
- non-sacred;
- weak;
- non-hierarchical;
- non-ritualized;
- without duty;
- without sacrifice.

A healthy order may still have hierarchy, duty, sacrifice, ritual, authority, sacred memory, and strong identity.

The question is whether these remain ordered toward life, truth, personhood, and correction.

### 4.18 Common Good

**Definition**

The common good refers to goods that genuinely sustain the life, dignity, truthfulness, justice, and relational flourishing of persons within and beyond the order.

**Methodological Caution**

“The common good” can be used ideologically. A claim to serve the common good should be tested against actual effects on persons, truth, justice, and corrigibility.

### 4.19 Outcome Categories

#### Sacrificial Escalation

The order intensifies demand for suffering, killing, dying, life-consuming loyalty, or surrender of conscience.

#### Restrained Reordering

The order undergoes correction through law, dissent, memory, pluralism, institutional limits, or moral reform.

#### Collapse

The order loses legitimacy, coherence, authority, or command capacity.

#### Absorption / Transformation

The order survives by being reinterpreted, incorporated, or transmuted into a successor order.

#### Stagnation / Frozen Pathology

The order neither reforms nor collapses, but persists through repression, ritual, inertia, fear, dependency, or managed dysfunction.

#### Hybrid / Transitional

Multiple outcomes occur sequentially or simultaneously.

## 5. Add Variable: Symbolic Order Strength

Add a new variable:

```text
symbolic-order-strength
```

### Definition

Symbolic Order Strength measures the degree to which a symbolic order coherently organizes collective identity, legitimacy, obligation, memory, moral judgment, and sacrifice.

### Score Anchors

| Score | Meaning | Examples |
|---:|---|---|
| 0 | No coherent collective symbolic order is identifiable. Temporary coordination exists, but no shared “we,” legitimating story, or collective obligation. | Random strangers waiting at a bus stop; anonymous one-time transaction; people temporarily trapped in an elevator before group identity forms. |
| 1 | Weak or temporary symbolic order. Shared context exists, but it does not strongly define identity, loyalty, obligation, or sacrifice. | Casual hobby group; loose online forum; one-time concert crowd; coworking users without deep shared identity. |
| 2 | Shared identity exists but has limited authority over persons. Belonging matters, but obedience and sacrifice are weakly demanded. | Local sports fandom; alumni identity; neighborhood pride; professional networking group; ordinary company seen mostly as a job. |
| 3 | Durable symbolic order organizes identity, legitimacy, memory, and obligation but remains limited and corrigible. | Constitutional democracy under normal conditions; religious denomination with ordinary institutional life; stable profession; healthy civic association; company with bounded mission. |
| 4 | Strong symbolic order organizes belonging, duty, memory, and moral judgment. Members are expected to sacrifice meaningfully, though limits remain. | American Union during Civil War; Revolutionary France in crisis; military unit in combat; church under persecution; mission-driven company demanding major life subordination. |
| 5 | Totalizing symbolic order. The collective defines ultimate loyalty, sacred meaning, enemyhood, and the terms under which persons may be asked to suffer, kill, die, or surrender conscience. | Nazi Volksgemeinschaft; Imperial Japan at peak mobilization; Stalinist Soviet Communism; Maoist revolutionary purity; Khmer Rouge Cambodia; apocalyptic jihadist movements; Aztec cosmic-sacrificial order. |

## 6. Add or Refine Sacrifice Variables

Add or refine:

```text
sacrifice-demand
sacrifice-form
sacrifice-health
sacrifice-boundedness
sacrifice-consumption
```

Suggested controlled values for `sacrifice-form`:

```json
[
  "time",
  "labor",
  "health",
  "conscience",
  "family-life",
  "dignity",
  "speech",
  "agency",
  "economic-security",
  "bodily-risk",
  "blood-sacrifice",
  "death",
  "killing",
  "martyrdom",
  "ritual-sacrifice"
]
```

Suggested controlled values for `sacrifice-health`:

```json
[
  "healthy",
  "ambiguous",
  "pathological",
  "mixed",
  "unknown"
]
```

Suggested controlled values for `sacrifice-boundedness`:

```json
[
  "bounded",
  "partially-bounded",
  "unbounded",
  "unknown"
]
```

## 7. Dissertation-Style Rigor Additions Without Changing Project Focus

Do not redirect the project into a dissertation proposal. Instead, incorporate useful academic-review guardrails.

### 7.1 Scope Control

Add to research protocol:

> This workbench does not claim to explain all institutions, all violence, or all collective behavior. It studies how embodied symbolic orders may generate political pathology under identifiable conditions.

### 7.2 Causal Humility

Add to methodology:

> Symbolic orders do not mechanically cause violence. They structure the meanings, obligations, enemies, and sacrifices through which violence, restraint, collapse, transformation, or stagnation become intelligible.

### 7.3 Mechanism Clarity

For each case, require the proposed mechanism:

```json
{
  "mechanism": "collective-immortality-to-sacrifice",
  "mechanismSummary": "The national body is represented as enduring beyond individual mortality, making bodily sacrifice meaningful as participation in collective survival."
}
```

Suggested mechanism categories:

```json
[
  "collective-immortality-to-sacrifice",
  "sacred-enemy-escalation",
  "institutional-self-preservation",
  "anti-sacrificial-restraint",
  "pluralist-reordering",
  "constitutional-containment",
  "memory-driven-restraint",
  "legitimacy-collapse",
  "institutional-fragmentation",
  "symbolic-transformation",
  "frozen-pathology"
]
```

### 7.4 Literature Map

Create:

```text
docs/methodology/literature-map.md
```

Position the project against:

- political psychology;
- social identity theory;
- collective memory studies;
- nationalism studies;
- civil religion;
- psychohistory;
- institutional sociology;
- anthropology of ritual and sacrifice;
- Girardian sacrifice theory;
- Durkheimian sociology of the sacred;
- organizational psychology;
- trauma and memory studies;
- systems theory;
- political theology.

### 7.5 Theology Translation Policy

Create:

```text
docs/methodology/theological-translation-policy.md
```

Public methodology should translate theological categories into academically legible terms unless the target publication is explicitly theological.

| Theological / Metaphysical Register | Academic Register |
|---|---|
| Principalities and powers | embodied symbolic-institutional orders |
| Angels/demons | ordering intelligences / maladaptive feedback loops |
| Fallenness | pathological deformation |
| Redemption | reordering toward truth and life |
| Sacrifice | costly offering, bodily consumption, life-consuming demand |
| Idolatry | self-sacralization of an institution or symbolic order |

## 8. Required Methodology Documents

Create or update:

```text
docs/methodology/research-protocol.md
docs/methodology/core-definitions.md
docs/methodology/symbolic-order-definition.md
docs/methodology/sacrifice-refinement.md
docs/methodology/scoring-codebook.md
docs/methodology/case-selection.md
docs/methodology/evidence-standards.md
docs/methodology/counterevidence.md
docs/methodology/intercoder-reliability.md
docs/methodology/search-log-template.md
docs/methodology/ai-use-policy.md
docs/methodology/publication-status-policy.md
docs/methodology/literature-map.md
docs/methodology/theological-translation-policy.md
docs/data-dictionary.md
docs/provenance.md
```

## 9. Schema Improvements

### 9.1 Controlled Outcomes

```json
[
  "sacrificial-escalation",
  "restrained-reordering",
  "collapse",
  "absorption-transformation",
  "stagnation-frozen-pathology",
  "hybrid-transitional"
]
```

### 9.2 Controlled Review Status

```json
[
  "draft",
  "source-review",
  "evidence-review",
  "argument-review",
  "score-review",
  "human-reviewed",
  "approved",
  "rejected"
]
```

### 9.3 Controlled Publication Status

```json
[
  "private-note",
  "draft",
  "internal-review",
  "public-preview",
  "published",
  "withdrawn"
]
```

### 9.4 Add Symbolic Order Fields

Add to case schema:

```json
{
  "symbolicOrderId": "string",
  "symbolicOrderName": "string",
  "symbolicOrderDefinition": "string",
  "symbolicOrderStrength": "number",
  "symbolicOrderStrengthRationale": "string"
}
```

### 9.5 Add Mechanism Fields

Add to case or interpretation schema:

```json
{
  "mechanism": "string",
  "mechanismSummary": "string",
  "alternativeMechanisms": ["string"]
}
```

### 9.6 Add Sacrifice Fields

Add to interpretation or score schema:

```json
{
  "sacrificeForm": ["string"],
  "sacrificeHealth": "healthy | ambiguous | pathological | mixed | unknown",
  "sacrificeBoundedness": "bounded | partially-bounded | unbounded | unknown",
  "sacrificeTarget": "self | enemy | in-group | out-group | mixed | unknown"
}
```

### 9.7 Add Core Definition References

Add optional fields so scores and interpretations can point to the definitions they rely on:

```json
{
  "definitionRefs": ["symbolic-order", "sacralization", "collective-immortality"],
  "codebookVersion": "v1"
}
```

## 10. Counterevidence Requirements

Create:

```text
schemas/counterclaim.schema.json
data/cases/<case>/counterclaims.json
```

Counterclaim effects:

```json
[
  "contradicts",
  "qualifies",
  "limits",
  "complicates",
  "supports-alternative-explanation"
]
```

Validator should warn when a public-facing case has no counterclaims or qualifying evidence.

## 11. Case-Selection Protocol

Every case should state its role.

Suggested values:

```json
[
  "gold-case",
  "high-pathology-case",
  "countercase",
  "collapse-case",
  "transformation-case",
  "stagnation-case",
  "hybrid-case",
  "deferred-case",
  "rejected-case"
]
```

Each case should include:

```json
{
  "caseSelectionRole": "countercase",
  "selectionRationale": "Included because it has strong symbolic order and institutional embodiment but low sacrificial escalation.",
  "theoryTest": "Tests whether pluralism and distributed sovereignty restrain sacralization."
}
```

## 12. Validation Rules to Add

Update validation so it fails when:

1. Outcome is not in controlled vocabulary.
2. Review status is not in controlled vocabulary.
3. Publication status is not in controlled vocabulary.
4. Evidence role is not in controlled vocabulary.
5. A public or published claim depends only on placeholder passages.
6. A score references an interpretation that is not human-reviewed when the score is public.
7. A published score lacks confidence rationale.
8. An AI-created claim is marked public without human review.
9. A passage lacks a usable locator.
10. A source lacks citation metadata.
11. A symbolic order strength score lacks rationale.
12. A sacrifice-health classification lacks interpretation notes.
13. A case lacks case-selection role and selection rationale.
14. A high sacralization score lacks evidence of non-negotiability or resistance to correction.
15. A high collective immortality score lacks evidence of mortality-transcendence or enduring collective body language.
16. A high sacred-enemy score lacks evidence that the enemy is existential, contaminating, profaning, or morally absolute.
17. A high pathology score lacks evidence of harm to truth, correction, personhood, or human flourishing.
18. A high corrigibility score lacks evidence of actual institutional correction mechanisms.

Validation should warn when:

1. A case has only one source.
2. A claim is supported by only one passage.
3. A score has confidence below 0.5.
4. A case has no counterevidence.
5. A high-pathology case lacks a countercase comparison.
6. A symbolic order is scored 4 or 5 without evidence of obligation or sacrifice.
7. Sacralization is scored high merely from the presence of symbols.
8. Blood sacrifice is treated as the only form of sacrifice.
9. Theological register appears in public-facing files without academic translation notes.
10. Pathology is used as a synonym for “bad” without a defined mechanism.
11. Institution and organization are used interchangeably without explanation.
12. Crisis is asserted but not specified.
13. The common good is invoked without evidence of effects on persons.

## 13. CI / GitHub Actions

Add or update:

```text
.github/workflows/validate.yml
```

Minimum workflow:

```yaml
name: Validate Workbench

on:
  pull_request:
  push:
    branches: [master, main]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - run: npm run build
      - run: PYTHONPATH=src-py python3 -m political_pathology.scoring.summary
```

## 14. Implementation Phases

### Phase 1 — Core Definitions

Create:

```text
docs/methodology/core-definitions.md
docs/methodology/symbolic-order-definition.md
docs/methodology/sacrifice-refinement.md
```

Acceptance criteria:

- Symbolic field, symbolic order, and embodied institutional order are distinguished.
- Pathology is defined as maladaptive self-preservation at the expense of truth, correction, personhood, and human flourishing.
- Sacrifice is distinguished as healthy/pathological and bounded/unbounded.
- Blood sacrifice is treated as an extreme form, not the whole category.

### Phase 2 — Codebook and Case-Selection

Create/update:

```text
docs/methodology/scoring-codebook.md
docs/methodology/case-selection.md
docs/methodology/evidence-standards.md
```

Acceptance criteria:

- Every variable has definition, indicators, false positives, and score anchors.
- Every case category has selection logic.
- Every case must state what it tests.
- Definitions are reflected in scoring guidance.

### Phase 3 — Literature, AI, and Translation Policies

Create:

```text
docs/methodology/literature-map.md
docs/methodology/ai-use-policy.md
docs/methodology/theological-translation-policy.md
docs/provenance.md
```

Acceptance criteria:

- The project is positioned against relevant fields.
- AI use is clearly bounded.
- Theological language has an academic translation policy.
- Human-authored, AI-drafted, generated, provisional, and reviewed content are distinguished.

### Phase 4 — Schema Updates

Create/update:

```text
schemas/controlled-vocab.schema.json
schemas/counterclaim.schema.json
schemas/coder-score.schema.json
schemas/search-log.schema.json
schemas/case.schema.json
schemas/source.schema.json
schemas/passage.schema.json
schemas/claim.schema.json
schemas/interpretation.schema.json
schemas/score.schema.json
```

Acceptance criteria:

- Controlled outcomes enforced.
- Symbolic order fields supported.
- Mechanism fields supported.
- Sacrifice fields supported.
- Definition references supported.
- Counterclaims supported.
- Coder scores supported.

### Phase 5 — Validation and CI

Update:

```text
src-js/cli/validate.js
.github/workflows/validate.yml
```

Acceptance criteria:

- `npm run build` passes.
- CI runs on push and PR.
- New validation rules are enforced.
- Warnings flag thin evidence, missing counterevidence, unsupported high scores, unreviewed AI claims, vague pathology claims, and unsupported sacralization.

### Phase 6 — Review and Reliability Scaffolding

Create:

```text
docs/methodology/intercoder-reliability.md
data/coding/README.md
```

Acceptance criteria:

- Raw coder scores can be stored separately from reconciled scores.
- The reliability plan supports percent agreement now and Krippendorff’s alpha later.
- The workflow distinguishes AI draft, human review, and publication-ready status.

## 15. Updated Suggested GitHub Issues

### Issue 1 — Add tightened core definitions

Create `docs/methodology/core-definitions.md` and update the data dictionary.

### Issue 2 — Define symbolic order rigorously

Add symbolic-order methodology document, symbolic-order strength variable, and 0–5 score anchors.

### Issue 3 — Add sacrifice refinement

Add healthy/pathological sacrifice distinction, sacrifice form vocabulary, and validation warning against reducing sacrifice to blood sacrifice.

### Issue 4 — Define pathology and institutional health

Add codebook language distinguishing pathology from authority, hierarchy, ritual, strong identity, and ordinary sacrifice.

### Issue 5 — Add corrigibility and crisis definitions

Define correction capacity and crisis/pressure as scoreable or coded constructs.

### Issue 6 — Add research protocol and scope guardrails

Update methodology to preserve focus on political pathology while adding causal humility and scope limits.

### Issue 7 — Add literature map

Position the project against political psychology, social identity theory, nationalism studies, civil religion, psychohistory, Girard, Durkheim, institutional sociology, memory studies, and organizational psychology.

### Issue 8 — Add theological translation policy

Create a public-facing translation layer for theological concepts when needed.

### Issue 9 — Add controlled vocabularies and schema updates

Outcomes, statuses, evidence roles, source roles, mechanisms, symbolic order fields, sacrifice fields, and definition references.

### Issue 10 — Add counterevidence model

Create counterclaim schema and require cases to include qualifying or contrary evidence when public-facing.

### Issue 11 — Strengthen validation and CI

Update validator and add GitHub Actions.

### Issue 12 — Add inter-coder reliability scaffold

Create coder-score schema, coding folder, and reliability plan.

## 16. Non-Goals

Do not use this milestone to:

- change the project name or focus;
- turn the project into a dissertation proposal;
- claim to have proven a general theory;
- score all cases definitively;
- automate interpretation without human review;
- publish placeholder passages;
- reduce political pathology to blood sacrifice alone;
- treat all symbolic orders as pathological;
- treat symbolic orders as literal minds;
- treat sacrifice, hierarchy, ritual, or sacred meaning as inherently pathological.

## 17. Definition of Done

This milestone is complete when:

1. Symbolic order has a rigorous operational definition.
2. Symbolic field, symbolic order, and embodied institutional order are distinguished.
3. Symbolic order strength is scoreable from 0–5.
4. Pathology is defined narrowly.
5. Embodiment is defined.
6. Sacrifice is distinguished as healthy/pathological and bounded/unbounded.
7. Sacralization, sacred enemy, collective immortality, corrigibility, crisis, personhood, human flourishing, common good, and institutional health are defined.
8. Outcome categories are sharply defined.
9. The project preserves political pathology as the core focus.
10. Dissertation-style critiques are incorporated as methodological guardrails, not as a project redirect.
11. The scoring codebook defines every variable.
12. Case-selection logic prevents pure confirmation bias.
13. Counterevidence can be represented.
14. Controlled vocabularies are enforced.
15. Validation catches thin or unsafe scholarly claims.
16. CI runs the validation pipeline.
17. A new collaborator can add a case using documented standards.

## 18. Updated IDE / Codex Prompt

```text
You are working in the `political-pathology-workbench` repository.

Revise Milestone 01 to incorporate tightened conceptual definitions while preserving the project focus on political pathology.

Do not rename or redirect the project. Improve academic rigor by adding:

1. A core definitions document.
2. A rigorous definition of symbolic order.
3. A three-level distinction: symbolic field, symbolic order, embodied institutional order.
4. A Symbolic Order Strength variable with 0–5 anchors.
5. A narrow definition of pathology as maladaptive institutional self-preservation at the expense of truth, correction, personhood, and human flourishing.
6. Definitions for embodiment, institution, self-preservation, sacralization, sacred enemy, collective immortality, sacrifice, personhood, human flourishing, corrigibility, crisis, emergent group psychology, institutional health, common good, and outcome categories.
7. A sacrifice refinement distinguishing healthy vs pathological sacrifice, bounded vs unbounded sacrifice, and blood sacrifice as one extreme form.
8. Causal humility: symbolic orders do not mechanically cause violence; they structure meanings, obligations, enemies, and sacrifices.
9. A literature-map document.
10. A theological translation policy.
11. Controlled vocabularies, schema fields, counterevidence handling, definition references, and validation updates.

Start with documentation under `docs/methodology/`, then update schemas, then validation.

Preserve the Source → Passage → Claim → Interpretation → Score workflow.

After each phase run:

npm run build
PYTHONPATH=src-py python3 -m political_pathology.scoring.summary

Make small commits by phase.
```
