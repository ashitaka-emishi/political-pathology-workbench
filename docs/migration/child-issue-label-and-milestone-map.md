# Child Issue Label and Milestone Map

Generated from child-repo issue inventory and PPW label/milestone audit on 2026-06-29.
Source: `data/migration/child-issue-migration-manifest.json`, `data/migration/issue-inventory-metadata.json`.

## Label Mapping

Every label appearing in the child-repo issue inventory is mapped to one or more PPW equivalents, or explicitly noted as dropped.

| Child label | Count | PPW label(s) | Notes |
|---|---|---|---|
| `codebook` | 1 | `documentation` | Codebook revision notes are methodology documentation |
| `corpus` | 27 | `corpus` | Direct match — PPW uses `corpus` for corpus registry and expansion work |
| `corpus-expansion` | 1 | `corpus-expansion` | Direct match |
| `data-schema` | 1 | `schema` | PPW uses `schema` for JSON schema and structured contract work |
| `docs` | 11 | `documentation` | PPW uses `documentation` (full word) |
| `human-adjudication` | 6 | `reliability`, `review-gates` | Human adjudication is a review-gate and reliability activity in PPW |
| `human-reliability` | 7 | `reliability` | Direct concept match — PPW `reliability` covers inter-annotator and human review |
| `inter-annotator` | 3 | `reliability` | Inter-annotator agreement is a reliability measurement |
| `metadata` | 7 | `metadata` | Direct match |
| `methodology` | 7 | `documentation` | Codebook and process governance → `documentation`; structural design decisions → `architecture` |
| `multi-model` | 2 | `reliability` | Multi-model comparison is a reliability design choice; no distinct PPW label |
| `pipeline` | 18 | `pipeline` | Direct match — PPW uses `pipeline` for build, generation, and validation pipeline work |
| `provenance` | 4 | `corpus`, `schema` | Provenance tracking spans corpus registry (`corpus`) and schema contracts (`schema`) |
| `publication-package` | 10 | `publication` | PPW uses `publication` for publication packaging and public artifact work |
| `reliability` | 3 | `reliability` | Direct match |
| `segmentation` | 1 | `pipeline` | Corpus segmentation is a pipeline activity |
| `selection-rationale` | 3 | `corpus`, `documentation` | Selection rationale is corpus scoping documentation |
| `sentence-ids` | 2 | `pipeline` | Sentence ID generation and stability are pipeline activities |
| `tracking` | 4 | `tracking` | Direct match — PPW uses `tracking` for milestone coordination issues |
| `v2` | 4 | *(drop)* | Version labels are child-repo-specific; use target PPW milestone instead |
| `v3` | 17 | *(drop)* | Version labels are child-repo-specific; use target PPW milestone instead |
| `v4` | 26 | *(drop)* | Version labels are child-repo-specific; use target PPW milestone instead |
| `validation` | 20 | `validation` | Direct match |

### Label mapping notes

- **Version labels** (`v2`, `v3`, `v4`): These tag child-repo release milestones, not PPW release milestones. Do not carry them into PPW. The destination PPW milestone conveys the same information.
- **`methodology`**: Apply `documentation` when the work is a codebook or process document; apply `architecture` when the work is a structural design decision with consequences for other PPW systems.
- **`human-adjudication`**: Map to both `reliability` and `review-gates` to preserve both dimensions — the inter-annotator measurement aspect and the gate-before-promotion aspect.
- **`provenance`**: Split by scope — corpus-level provenance tracking gets `corpus`; schema-defined provenance fields get `schema`.

---

## Milestone Mapping

Every child-repo milestone is mapped to its immediate PPW home (the Milestone 12 processing issue) and its ultimate PPW destination after migration work is complete.

| Child milestone | Issues | Immediate PPW home | Ultimate PPW destination | Notes |
|---|---|---|---|---|
| `Pre-v1 corpus expansion window` (SLW) | #174, #183 | [#110](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/110) — Milestone 12 | Milestone 17: Sacrifice Law Comparative Evidence Module | Reliability sampling (#183) → Milestone 19 after module foundations exist |
| `v2.0 — Multi-Model Reliability Stress Test` (LMA) | #78, #82, #84, #85 | [#113](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/113) — Milestone 12 | Milestone 20: Unified Site and Public Evidence Browser (docs/pub); Milestone 19 for deferred reliability tracking (#85) | #85 deferred until PPW validation fixtures exist |
| `v3.0 — Human Inter-Annotator Reliability Study` (LMA) | #92–#108 | [#112](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/112) (pipeline), [#113](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/113) (docs) — Milestone 12 | Milestone 19: Validation, Generation, and Test Fixtures (pipeline/schema/fixtures); Milestone 20 (publication/docs); Milestone 19 for deferred tracking (#108) | #95, #108 deferred |
| `v4.0 — Corpus Expansion and Stratified Validation Corpus` (LMA) | #109–#134 | [#111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111) (corpus/migrate), [#112](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/112) (pipeline/schema), [#113](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/113) (docs/pub) — Milestone 12 | Milestone 15: Evidence Module Metadata Import (metadata/schema); Milestone 16: Lincoln Deep Case Evidence Module (corpus implementation); Milestone 20 (publication) | Architecture (#109) → Milestone 16 |

### Tracking issue mapping

| Child tracking issue | Kind | PPW disposition | PPW target |
|---|---|---|---|
| SLW #174 — Track pre-v1 corpus expansion window | tracking | `merge-into-ppw-issue` | [#110](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/110) — become checklist context |
| LMA #85 — Tracking v2.0 Multi-Model Reliability Stress Test | tracking | `defer-to-post-integration` | TBD — Milestone 19 after validation fixtures |
| LMA #108 — Tracking v3.0 Human Inter-Annotator Reliability Study | tracking | `defer-to-post-integration` | TBD — Milestone 19 after validation fixtures |
| LMA #134 — Tracking v4.0 Corpus Expansion | tracking | `merge-into-ppw-issue` | [#111](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/111) — become checklist context |

---

## PPW Label Reference (used above)

The following PPW labels are referenced in mappings above. All are defined in `ashitaka-emishi/political-pathology-workbench`.

| PPW label | Description |
|---|---|
| `architecture` | Architecture records, boundaries, and design decisions |
| `corpus` | Corpus registry, expansion, and source set work |
| `corpus-expansion` | Corpus expansion planning and implementation |
| `documentation` | Improvements or additions to documentation |
| `metadata` | Roadmap label: metadata |
| `pipeline` | Build, generation, and validation pipeline work |
| `publication` | Publication packaging, site release, and public artifact work |
| `reliability` | Reliability, review-gate, and sampling methodology |
| `review-gates` | Roadmap label: review-gates |
| `schema` | JSON schema and structured contract work |
| `tracking` | Milestone tracking issue |
| `validation` | Validation, quality gates, and checks |

---

## Deferred issues and their label/milestone implications

Three issues are deferred (`defer-to-post-integration`) with no immediate PPW target issue:

| Source | Issue | Deferred reason | Resume condition |
|---|---|---|---|
| LMA | #85 — Tracking v2.0 reliability | PPW needs validation fixtures first | After Milestone 19 foundations |
| LMA | #95 — Classify human coder disagreements | PPW needs claim-promotion gates | After Milestone 19 foundations |
| LMA | #108 — Tracking v3.0 reliability | PPW needs validation fixtures first | After Milestone 19 foundations |

When these are resumed, apply labels: `reliability`, `tracking` (for tracking issues), `review-gates`, `validation` as appropriate to the specific work.
