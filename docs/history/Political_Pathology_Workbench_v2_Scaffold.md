# Political Pathology Workbench v2 Scaffold

**Status:** Draft / research spike scaffold  
**Repository name:** `political-pathology-workbench`  
**License posture:** MIT for original project-authored code, schemas, data structures, documentation, and analysis; third-party sources, quotations, excerpts, PDFs, and linked materials remain under their original rights.  
**Primary phase:** Public research spike, explicitly marked draft/incomplete where appropriate.

## 1. Purpose

The Political Pathology Workbench is an integrated research platform for studying how symbolic orders become embodied in institutions, how those institutions respond to crisis, and under what conditions they generate sacrifice, violence, reform, collapse, transformation, or stagnation.

The project is not merely a paper, spreadsheet, or website. It is intended to become a research operating system for political pathology: literature, theory, evidence, cases, scoring, AI-assisted analysis, validation, visualization, and publication.

The first implementation is a **research and architecture spike**, not the full platform. Its purpose is to de-risk the vision by proving that the core epistemic workflow can operate end-to-end.

## 2. Foundation Context

The workbench is aligned with the Foundation for the Study of Political Pathology's central question:

> How do human beings come to regard political communities as sacred objects worth dying and killing for?

The project extends Richard A. Koenigsberg's insight that political communities may function as imagined immortal collective bodies for which individual mortal bodies are sacrificed. The workbench places that insight into a broader comparative framework that asks why some symbolic orders produce sacrificial escalation while others reorder, collapse, transform, or stagnate.

## 3. Proposed Law and Revised Theory

### 3.1 Initial Proposed Law

> Every symbolic order seeks embodiment. Every embodied order tends toward self-preservation. Unless continually ordered toward transcendent truth, self-preservation becomes self-sacralization, and self-sacralization legitimizes sacrifice under conditions of perceived existential threat.

### 3.2 Revised General Theory of Political Pathology

> Political pathology occurs when an embodied symbolic order begins treating its own survival as sacred and responds to crisis by demanding sacrifice, suppressing correction, collapsing, freezing, or transforming into a successor order.

The cycle is therefore:

```text
Symbolic Order
  -> Institutional Embodiment
  -> Self-Preservation
  -> Crisis / Sacralization
  -> Outcome
```

The central question becomes:

> When a symbolic order comes under crisis, does it sacrifice, reform, collapse, transform, stagnate, or pass through a hybrid transition?

## 4. Outcome Taxonomy

| Outcome | Definition | Representative cases |
|---|---|---|
| Sacrificial Escalation | The collective becomes sacred, enemies become existential, and suffering, killing, or dying become morally required. | Nazi Germany; Imperial Japan; Revolutionary France; Khmer Rouge Cambodia |
| Restrained Reordering | The symbolic order reforms through pluralism, dissent, constitutional limits, anti-sacrificial memory, and distributed authority. | Postwar Germany; Switzerland; Canada; United States after Vietnam |
| Collapse | The symbolic order loses legitimacy, coherence, or command capacity. | Soviet Union Collapse; Weimar Republic; Afghanistan 2021; Western Roman Empire |
| Absorption / Transformation | The old order survives partially by being incorporated into a successor order. | Roman Empire to Christendom; British Empire to Commonwealth; Soviet Union to Russian Federation |
| Stagnation / Frozen Pathology | The system neither reforms nor collapses; it persists through repression, ritualized ideology, inertia, or fear. | North Korea; Brezhnev-era Soviet Union; Late Qing Dynasty |
| Hybrid / Transitional | Multiple outcomes occur in sequence or tension. | Late Ottoman Empire; Apartheid South Africa; Post-9/11 United States |

## 5. Phase 1 Objective: Integrated Research Spike

The spike proves the feasibility of an AI-assisted comparative research platform. It is done when:

1. Three theory versions exist as data.
2. Twenty balanced cases exist as structured case folders.
3. Five gold cases exist with at least moderate evidence traceability.
4. Nazi Germany demonstrates the full Source -> Passage -> Claim -> Interpretation -> Score -> Case Page chain.
5. JavaScript validation and index generation work.
6. Python analysis generates at least one scoring summary.
7. Quarto renders a lean public GitHub Pages site.
8. Draft, incomplete, and publication status labels appear in outputs.
9. Lincoln Metaphor Analysis and Sacrifice Law Workbench are documented as related pilot projects.
10. A working paper draft is generated or rendered from the site.

## 6. Users and Phasing

| Phase | User group | Design implication |
|---|---|---|
| Phase 1 | Andrew as lead researcher/engineer | Optimize for VS Code, Git, Codex, JSON, JS tooling, Python analysis, Quarto publishing. |
| Phase 2 | Andrew + Dr. Richard Koenigsberg | Add scholarly review artifacts, argument traceability, and review-ready outputs. |
| Phase 3 | Foundation collaborators | Add contribution workflow, review queues, data entry guides, and collaborator documentation. |
| Phase 4 | Outside scholars and public readers | Add public site polish, citations, reproducible datasets, review status, and explanatory materials. |

## 7. Theory Versions as Data

The workbench will not hard-code a single theory. Theories are versioned data objects that can be loaded, compared, scored, revised, and tested.

Initial theory set:

```text
theories/
  koenigsberg-immortal-body-v1/
  sacrifice-law-v1/
  general-theory-political-pathology-v1/
```

The conceptual progression is:

```text
Koenigsberg's Immortal Collective Body
  -> Sacrifice Law
  -> General Theory of Political Pathology
```

Each theory should include:

```text
theory.md
manifest.json
variables.json
outcomes.json
scoring-rubric.json
assumptions.json
references.json
```

## 8. Case Definition

A case is defined as:

> A symbolic order embodied in institutions and examined during a specific crisis, transition, or period of pressure.

Supported case subtypes:

```text
regime
war
revolution
movement
collapse
transition
civil-religion
empire
postwar-order
anti-sacrificial-movement
hybrid
```

This lets the platform compare Nazi Germany, the American Civil War, the Soviet collapse, the Civil Rights Movement, and the British Empire to Commonwealth transition without forcing them into a single historical object type.

## 9. Balanced Spike Case Set

The initial spike will include 20 cases:

1. Nazi Germany
2. Imperial Japan
3. Revolutionary France
4. American Civil War / Union
5. Soviet Communism
6. Maoist China
7. Confederacy
8. World War I Nationalisms
9. Khmer Rouge Cambodia
10. Postwar Germany
11. Switzerland
12. Canada
13. European Union
14. United States after Vietnam
15. Gandhian Indian Independence
16. Soviet Union Collapse
17. Western Roman Empire
18. British Empire to Commonwealth
19. North Korea
20. Post-9/11 United States

## 10. Gold Cases

Gold cases are the first fully traceable examples. They demonstrate the Traceable Epistemic Model and provide reference implementations for case data, source packs, passages, claims, interpretations, scores, review, and Quarto case pages.

Initial gold cases:

1. Nazi Germany
2. Imperial Japan
3. Postwar Germany
4. Soviet Union Collapse
5. United States after Vietnam

Each gold case should eventually contain:

- 3-5 sources
- 8-12 passages
- 8-12 claims
- coverage across multiple variables
- traceability from score back to evidence

The first thin end-to-end workflow focuses on **Nazi Germany -> Collective Immortality**, then expands to a full mini-assessment.

## 11. Traceable Epistemic Model

The Epistemic Model is a first-class subsystem. It represents knowledge as traceable relationships among sources, passages, claims, interpretations, scores, cases, theory versions, reviewers, and publication artifacts.

Core chain:

```text
Source
  -> Passage
  -> Claim
  -> Interpretation
  -> Variable Score
  -> Case Assessment
  -> Theory Evaluation
  -> Publication Artifact
```

The platform should make this kind of statement possible:

> Theory version X interprets Case Y using Evidence Z, producing Score A with Confidence B and Review Status C.

## 12. Standards and Methodological Alignments

The spike should be lightweight, but it should align with established standards and protocols where practical.

| Area | Standard / Method | Use in workbench |
|---|---|---|
| Research data principles | FAIR | Data should be findable, accessible, interoperable, and reusable. |
| Dataset packaging | Frictionless Data Package | Describe tabular exports and dataset bundles. |
| Source metadata | CSL JSON | Bibliographic item types and citation data. |
| General metadata | Dublin Core / DataCite | Metadata crosswalks for datasets, reports, and research objects. |
| Provenance | PROV-O / PAV-inspired | Track generatedBy, derivedFrom, reviewedBy, versionedBy, curatedBy. |
| Argument structure | Toulmin model | Claim, grounds, warrant, backing, qualifier, rebuttal, counterevidence. |
| Passage annotation | W3C Web Annotation-inspired | Connect passages to claims and annotations. |
| Controlled vocabulary | SKOS-inspired | Define variables, outcomes, and theory terms. |
| Historical/event modeling | CIDOC CRM-inspired | Model actors, institutions, events, periods, places, sources, outcomes. |
| Source text encoding | TEI-compatible future path | Preserve room for encoded speeches, documents, and archival texts. |
| JSON validation | JSON Schema Draft 2020-12 | Validate cases, sources, claims, interpretations, scores, theories. |
| RDF validation future path | SHACL | Later validation if JSON-LD/RDF is adopted. |
| Literature review | PRISMA-inspired | Track search terms, inclusion/exclusion, source screening. |
| Metaphor analysis | MIPVU | Preserve Lincoln project alignment for symbolic-language analysis. |
| Inter-rater reliability | Cohen's kappa / Krippendorff's alpha | Later agreement analysis for independent scorers. |
| Architecture governance | ADRs | Record architectural decisions and tradeoffs. |

## 13. Source Typing and Evidence Roles

Source type and evidence role must be separate.

- **Source type** describes what the source is. Use CSL JSON item types where possible: book, article-journal, speech, legislation, report, webpage, manuscript, etc.
- **Evidence role** describes how the source is used in an argument. Use a Toulmin-inspired vocabulary: grounds, warrant, backing, qualifier, rebuttal, counterevidence, context, corroboration.

Example:

```json
{
  "sourceId": "hitler-speech-1933-001",
  "cslType": "speech",
  "dcmiType": "Text",
  "evidenceRole": "grounds",
  "supportsVariable": "collective-immortality"
}
```

## 14. Source Access Policy

The project will be public from day one, but source access must be disciplined.

Allowed in the repository:

- public-domain texts
- open-access texts
- project-authored notes
- source metadata
- short evidence excerpts/passages when legally and ethically appropriate
- generated analytical artifacts

Not stored directly:

- full copyrighted books
- paywalled articles
- restricted PDFs
- large copyrighted corpora without permission

The project may store source metadata and passage references even when the full source text is not stored.

## 15. Source Packs

Use a global source library plus case-level source manifests.

```text
bibliography/
  sources.csl.json

data/
  sources/
    public-domain/
    open-access/
    restricted-metadata/

  cases/
    nazi-germany/
      case.json
      source-pack.json
      passages.json
      claims.json
      interpretations.json
      scores.json
```

A case source pack declares which global sources are used and why:

```json
{
  "caseId": "nazi-germany",
  "sources": [
    {
      "sourceId": "koenigsberg-nations-have-right-to-kill",
      "role": "theoretical-warrant",
      "access": "restricted-metadata-only"
    },
    {
      "sourceId": "hitler-speech-1933-001",
      "role": "primary-grounds",
      "access": "public-domain-or-open"
    }
  ]
}
```

## 16. Case Storage Pattern

Use case folders plus generated global indexes.

Humans edit case folders:

```text
data/cases/nazi-germany/
  case.json
  source-pack.json
  passages.json
  claims.json
  interpretations.json
  scores.json
```

JavaScript generates global indexes:

```text
data/generated/
  all-cases.json
  all-sources.json
  all-passages.json
  all-claims.json
  all-interpretations.json
  all-scores.json
  case-index.json
  theory-index.json
```

## 17. AI Claim Governance

AI-generated claims are candidate epistemic objects, not accepted knowledge. They must preserve provenance, generation context, evidentiary links, review status, reviewer identity, confidence, and final disposition.

Lifecycle:

```text
candidate -> pending-review -> accepted | revised | rejected | superseded
```

AI claim records should distinguish:

```text
createdBy: ai
reviewedBy: human
acceptedBy: human
derivedFrom: source / passage / prior claim
usedAs: grounds / warrant / backing / rebuttal / context
```

## 18. Human Review Model

Review is tiered, not a checkbox.

```text
light-review       = plausibility check
evidence-review    = claim is supported by cited passage
argument-review    = source -> claim -> interpretation -> score chain holds
scholarly-review   = includes counterarguments, alternatives, confidence, and score implications
```

Initial spike default: **argument-review**.

Review depth scales with epistemic risk.

## 19. Multi-Dimensional Review Risk

Risk is multi-dimensional and should be represented explicitly.

Risk dimensions:

- claim importance
- controversy
- evidence weakness
- publication exposure

Example:

```json
{
  "riskFactors": {
    "importance": "supports-theory-evaluation",
    "controversy": ["genocide", "race", "national-identity"],
    "evidenceWeakness": ["single-source-support", "indirect-passage-support"],
    "publicationExposure": "public-facing-output"
  },
  "reviewRisk": "high",
  "requiredReviewLevel": "scholarly-review"
}
```

## 20. Confidence Model

Confidence is a structured object:

```json
{
  "confidence": {
    "value": 0.82,
    "label": "high",
    "rationale": "Supported by multiple primary passages and secondary scholarship.",
    "uncertaintyFactors": [
      "translation-dependence",
      "contested-interpretation"
    ]
  }
}
```

This gives quantitative analysis, readable scholarly judgment, and explicit uncertainty.

## 21. Validation Gates

Validation should be phased and epistemic, not merely technical.

Hard failure:

- invalid JSON
- schema violations
- broken references
- missing required IDs
- missing theory version references

Hard failure for gold cases:

- missing Source -> Passage -> Claim -> Interpretation -> Score chain

Warning for partial cases:

- incomplete evidence traceability
- missing source passages
- weak claim support
- low confidence
- missing review notes

Hard failure for public output:

- unreviewed AI-generated claims used without explicit labeling

Warning:

- single-source claims
- contested claims without uncertainty factors
- high-risk claims without adequate review level

## 22. Audience and Publication Status

Each artifact declares both audience and publication status.

Audiences:

```text
private-draft
researcher-review
koenigsberg-review
foundation-internal
scholarly-review
public
archival
```

Publication statuses:

```text
draft
review
approved
published
deprecated
superseded
```

Example:

```json
{
  "artifactType": "case-report",
  "audience": "koenigsberg-review",
  "publicationStatus": "draft"
}
```

## 23. Public Repository Policy

The repository will be public from day one, but preliminary materials must be explicitly labeled.

Required labels and notices:

```text
README.md                  -> project status banner
site/index.qmd             -> research spike / draft notice
docs/status.md             -> status policy
site pages                 -> status labels
JSON records               -> reviewStatus and publicationStatus
```

Suggested notice:

> This project is an active research spike. Materials may be incomplete, provisional, or under review. Public availability does not imply scholarly finality.

## 24. Technology Strategy

The project is polyglot but disciplined.

| Layer | Technology | Role |
|---|---|---|
| JSON-native tooling | JavaScript | Validation, generation, transforms, CLI commands. |
| Type hints | `.d.ts` files and/or JSDoc | Type clarity without a heavy TypeScript build pipeline. |
| Validation | JSON Schema Draft 2020-12 | Validate research objects. |
| Academic analysis | Python | Statistics, scoring analysis, inter-rater reliability, charts, notebooks. |
| Publication | Quarto | GitHub Pages site, case pages, working papers, dashboards. |
| Orchestration | npm scripts + Makefile | JS-native commands plus cross-language build commands. |

## 25. JavaScript Layer

Use JavaScript for tooling, with TypeScript declaration files and/or JSDoc annotations.

```text
src-js/
  cli/
  validate/
  generate/
  theory-loader/
  site-data/

types/
  case.d.ts
  claim.d.ts
  source.d.ts
  passage.d.ts
  interpretation.d.ts
  score.d.ts
  theory.d.ts

schemas/
  case.schema.json
  claim.schema.json
  source.schema.json
  passage.schema.json
  interpretation.schema.json
  score.schema.json
  theory.schema.json
```

Rule:

> Research data is JSON. Validation is JSON Schema. Tooling is JavaScript. Type information is supplied by `.d.ts` files and/or JSDoc.

## 26. Python Layer

Use a hybrid Python package plus Quarto notebooks/pages.

```text
pyproject.toml

src-py/
  political_pathology/
    scoring/
    reliability/
    visualizations/
    dataframes/
    exports/

site/
  outputs/
    scoring-dashboard.qmd
    reliability-analysis.qmd
    case-comparison.qmd
```

Python modules handle reusable academic/analytical logic. Quarto consumes those modules for published outputs.

## 27. Quarto Site

The first publication output is a lean integrated GitHub Pages site.

```text
site/
  _quarto.yml
  index.qmd
  theory/
    proposed-law.qmd
    theory-versions.qmd
    outcomes.qmd
  methods/
    epistemic-model.qmd
    scoring-rubric.qmd
    review-model.qmd
  cases/
    index.qmd
    nazi-germany.qmd
    imperial-japan.qmd
    postwar-germany.qmd
    soviet-collapse.qmd
    united-states-after-vietnam.qmd
  outputs/
    scoring-dashboard.qmd
    working-paper.qmd
  references.qmd
```

Manual prose:

- theory essays
- methodology explanations
- working paper sections
- interpretive commentary

Generated content:

- case fact boxes
- evidence chains
- claim tables
- score tables
- confidence summaries
- outcome comparisons
- dashboards
- bibliographies

## 28. AI-Assisted Workflow

The spike proves a thin end-to-end workflow using one gold case:

```text
Source
  -> Passage
  -> Candidate Claim
  -> Human Review
  -> Interpretation
  -> Score
  -> Case Assessment
  -> Quarto Case Page
```

Initial focus:

```text
Nazi Germany -> Collective Immortality -> Full Mini-Assessment
```

The first balanced source pack should include:

- 1-2 Koenigsberg texts
- 2-3 Nazi primary sources
- 1 secondary scholarly source for historical context

## 29. Build Orchestration

Use npm scripts for JS-native commands and a root Makefile for cross-language orchestration.

Example npm scripts:

```json
{
  "scripts": {
    "validate": "node src-js/cli/validate.js",
    "generate": "node src-js/cli/generate-indexes.js",
    "site-data": "node src-js/cli/generate-site-data.js"
  }
}
```

Example Makefile targets:

```text
make validate
make generate
make analyze
make render
make build
make publish-preview
```

Build flow:

```text
validate JSON
  -> generate indexes
  -> run Python analysis
  -> render Quarto site
  -> publish GitHub Pages
```

## 30. Repository Structure

Proposed scaffold:

```text
political-pathology-workbench/
  README.md
  LICENSE
  NOTICE.md
  package.json
  pyproject.toml
  Makefile

  bibliography/
    sources.csl.json

  theories/
    koenigsberg-immortal-body-v1/
    sacrifice-law-v1/
    general-theory-political-pathology-v1/

  schemas/
    theory.schema.json
    case.schema.json
    source.schema.json
    passage.schema.json
    claim.schema.json
    interpretation.schema.json
    score.schema.json
    artifact.schema.json

  types/
    theory.d.ts
    case.d.ts
    source.d.ts
    passage.d.ts
    claim.d.ts
    interpretation.d.ts
    score.d.ts

  data/
    sources/
      public-domain/
      open-access/
      restricted-metadata/
    cases/
      nazi-germany/
      imperial-japan/
      postwar-germany/
      soviet-collapse/
      united-states-after-vietnam/
    generated/

  src-js/
    cli/
    validate/
    generate/
    theory-loader/
    site-data/

  src-py/
    political_pathology/
      scoring/
      reliability/
      visualizations/
      dataframes/
      exports/

  site/
    _quarto.yml
    index.qmd
    theory/
    methods/
    cases/
    outputs/
    references.qmd

  workflows/
    add-case/
    extract-claims/
    review-claims/
    score-case/
    generate-report/

  docs/
    adr/
    standards/
    methodology/
    source-access-policy.md
    status.md
    related-projects/
      lincoln-metaphor-analysis.md
      sacrifice-law-workbench.md

  .github/
    workflows/
      validate.yml
      render-site.yml
      publish-pages.yml
```

## 31. Related Projects

This workbench does not supersede the existing projects. It treats them as external pilot projects.

```text
docs/related-projects/
  lincoln-metaphor-analysis.md
  sacrifice-law-workbench.md
```

- **Lincoln Metaphor Analysis**: pilot for symbolic-language and metaphor-analysis methodology.
- **Sacrifice Law Workbench**: pilot for theory-as-code, sacrifice-centered modeling, and publication pipeline.
- **Political Pathology Workbench**: umbrella research platform that may later import from, interoperate with, or generalize those projects.

## 32. Initial Milestones

### Milestone 1: Repository scaffold

- Create repo structure.
- Add README, LICENSE, NOTICE, status policy, source access policy.
- Add ADR directory and initial ADRs.

### Milestone 2: Theory-as-data

- Add three theory folders.
- Add manifests, variables, outcomes, and scoring rubrics.
- Validate with JSON Schema.

### Milestone 1: Epistemic data model

- Add schemas for sources, passages, claims, interpretations, scores, artifacts.
- Implement JS validation and reference checks.

### Milestone 4: Gold case workflow

- Implement Nazi Germany -> Collective Immortality end-to-end.
- Add balanced source pack.
- Add passages, claims, interpretations, and scores.
- Add human review metadata.

### Milestone 5: Balanced case set

- Add 20 structured case folders.
- Add partial scoring for all cases.
- Add generated global indexes.

### Milestone 6: Python analysis

- Generate scoring summaries.
- Create outcome distribution tables.
- Prepare reliability-analysis stubs.

### Milestone 7: Quarto site

- Render lean integrated site.
- Add theory, methods, gold cases, scoring dashboard, working paper draft.
- Publish to GitHub Pages with draft/incomplete labels.

### Milestone 8: Spike review

- Evaluate whether the architecture proves the research vision.
- Identify what should become production-grade and what should remain experimental.

## 33. Initial ADRs

```text
docs/adr/
  0001-integrated-research-workbench.md
  0002-theory-as-versioned-data.md
  0003-traceable-epistemic-model.md
  0004-polyglot-js-python-quarto.md
  0005-source-access-policy.md
  0006-ai-claim-governance.md
  0007-risk-based-human-review.md
  0008-public-draft-repository.md
```

## 34. Immediate Implementation Tasks

1. Create `political-pathology-workbench` repository.
2. Add root docs and license files.
3. Add `schemas/` and initial JSON Schema files.
4. Add `types/` declaration files.
5. Add `src-js/cli/validate.js`.
6. Add `src-js/cli/generate-indexes.js`.
7. Add three theory manifests.
8. Add Nazi Germany case folder.
9. Add minimal source pack for Nazi Germany.
10. Add first passage, claim, interpretation, and score chain.
11. Add Quarto site skeleton.
12. Add GitHub Actions validation workflow.
13. Add draft/incomplete labels to site pages.
14. Add related project docs for Lincoln and Sacrifice.

## 35. Open Questions for Later

These do not block the v2 scaffold:

- Which exact Koenigsberg texts will seed the first source pack?
- Which Nazi primary sources are public-domain/open enough to include directly?
- Should the workbench eventually support JSON-LD/RDF export?
- Should evidence chains become nanopublication-compatible?
- What level of inter-rater reliability should be required before public claims become “approved”?
- How should competing theories be compared statistically?
- How should the Foundation brand or website relate to the public GitHub Pages site?

## 36. Standards Reference Links

These are included as implementation references, not as final scholarly citations.

- Quarto GitHub Pages publishing: https://quarto.org/docs/publishing/github-pages.html
- Quarto websites: https://quarto.org/docs/websites/
- JSON Schema Draft 2020-12: https://json-schema.org/draft/2020-12
- PROV-O: https://www.w3.org/TR/prov-o/
- CSL specification: https://docs.citationstyles.org/en/stable/specification.html
- CSL JSON: https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html
- Dublin Core: https://www.dublincore.org/specifications/dublin-core/
- DataCite metadata schema: https://schema.datacite.org/
- W3C Web Annotation Data Model: https://www.w3.org/TR/annotation-model/
- SKOS: https://www.w3.org/2004/02/skos/
- CIDOC CRM: https://cidoc-crm.org/
- TEI Guidelines: https://tei-c.org/guidelines/
- FAIR Principles: https://www.go-fair.org/fair-principles/
- Frictionless Data: https://frictionlessdata.io/
- PRISMA: https://www.prisma-statement.org/
- ADRs: https://adr.github.io/
