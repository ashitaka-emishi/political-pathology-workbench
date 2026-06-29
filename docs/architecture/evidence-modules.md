# Evidence-Module Architecture

Part of [#119](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/119) (Milestone 13: Architecture and Governance Baseline).

---

## Project roles

### PPW — the umbrella platform

`political-pathology-workbench` (PPW) is the authoritative home for:

- Scored, reviewed, and promoted theoretical findings.
- Case-level claim chains and interpretations.
- Cross-case synthesis and theoretical scoring.
- Public site, methodology documentation, and citation artifacts.
- Issue tracking, milestone coordination, and validation pipeline.

PPW owns the **public theory/case/score layers**. All claims that appear on the PPW site have passed PPW claim-promotion gates and are owned by the PPW schema.

### `lincoln-metaphor-analysis` — deep single-case evidence module

This repository is a **deep single-case evidence module** covering Abraham Lincoln's rhetoric (1838–1865). It holds:

- A multi-tier annotated corpus (core, validation, and reference sets).
- Stage-by-stage annotation artifacts: segmentation, clustering, inter-annotator reliability studies, adjudication records.
- Quarto publication artifacts and methodology documentation for the Lincoln case.

The child repository retains its site and history as source context and audit provenance. New Lincoln corpus work and evidence claims are coordinated through PPW Milestones 15–16.

### `sacrifice-law-workbench` — comparative corpus evidence module

This repository is a **comparative corpus evidence module** covering multiple historical cases under Koenigsberg's Law of Sacrifice (American Revolution, Napoleon, Lincoln, Hitler). It holds:

- A multi-case stratified corpus with manifest-driven pipeline.
- Corpus expansion and reliability sampling artifacts.
- Quarto research site for cross-case synthesis.

The child repository retains its site and history. New Sacrifice Law corpus work is coordinated through PPW Milestones 17 and 19.

---

## Why imported repositories are not flattened

Importing the child-repo corpora, annotations, and pipeline artifacts into a single PPW monorepo would:

1. **Destroy provenance depth.** Git blame, issue history, and per-commit annotation rationale exist only in the child repos. Merging loses this without a custom migration strategy.
2. **Create unstable artifact paths.** Downstream citations, Quarto site links, and bibliography entries point to child-repo URLs. Flattening breaks them silently.
3. **Mix annotation-layer and theory-layer concerns.** Raw corpora, inter-annotator studies, and segmentation scripts belong in module-level repositories; they would clutter and confuse the PPW schema and validation pipeline.
4. **Prevent independent module evolution.** A child module may need corpus expansion, reliability re-runs, or schema revisions that don't affect the PPW theory layer. Separation keeps blast radii small.

---

## Data flow

The pipeline from raw source to promoted PPW finding:

```
Source text (child repo: raw corpus file)
  └─> Corpus Artifact (child repo: segmented, ID-stable passage)
        └─> Annotation (child repo: claim candidate, cluster profile)
              └─> Analysis (child repo: adjudication, reliability record)
                    └─> Draft Claim (PPW: claims.json, status=draft)
                          └─> Reviewed Claim (PPW: claims.json, status=score-review)
                                └─> Promoted Finding (PPW: claims.json, status=argument-review+)
                                      └─> Interpretation (PPW: interpretations.json)
                                            └─> Score (PPW: scores.json)
```

**Module boundary:** The boundary between child-repo and PPW lies between _Analysis_ and _Draft Claim_. Everything to the left of that boundary stays in the evidence module and is referenced by provenance link. Everything to the right is owned by PPW schemas and subject to PPW validation and claim-promotion gates.

---

## How evidence modules feed PPW cases

Evidence modules contribute to PPW through four linkage types:

| Linkage | PPW artifact | Module artifact referenced |
|---|---|---|
| Corpus registry entry | `data/generated/corpus-registry.json` | Child-repo corpus inventory or manifest |
| Source pack entry | `data/cases/<slug>/source-pack.json` | Child-repo raw text file (URL or path reference) |
| Draft claim | `data/cases/<slug>/claims.json` | Child-repo annotation record (provenance link) |
| Method note | `site/methods/*.qmd` | Child-repo methodology doc (cross-reference) |

Promoted claims, interpretations, and scores in `data/cases/<slug>/` are PPW-native — they reference module artifacts but are not copied from them.

---

## Non-goals

The following are explicitly out of scope for PPW and belong in the evidence modules:

- Running inter-annotator reliability studies or adjudication pipelines.
- Maintaining raw corpus segmentation scripts or sentence-ID generation tools.
- Hosting per-study Quarto publication sites (these remain in the child repos).
- Managing child-repo GitHub Pages deployments.
- Owning child-repo issue trackers after migration is complete.
- Duplicating child-repo corpus files (PPW references them by provenance link, not by copy).
