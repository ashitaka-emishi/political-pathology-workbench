# Lincoln Module Migration Audit — Milestone 16

**Governing issue:** PPW #147  
**Milestone:** 16 — Lincoln Deep Case Evidence Module  
**Date:** 2026-06-30  
**Issues covered:** #141, #142, #143, #144, #145, #146, #147, #194 (open), #198 (open)

---

## 1. Scope

This audit records what was created, updated, or deferred in Milestone 16 for the Lincoln evidence module (`lincoln-metaphor-analysis`) and the `american-civil-war-union` case. It accompanies the general evidence-module import audit (`docs/migration/evidence-module-import-audit.md`, Milestone 15).

---

## 2. Files Added or Changed

| File | Action | Governing Issue |
|---|---|---|
| `data/cases/american-civil-war-union/corpora/lincoln-deep-28.json` | Created | #141 |
| `data/cases/american-civil-war-union/analysis/evidence-module-links.json` | Created | #142 |
| `data/corpora/lincoln-deep-28/documents.json` | Updated (ppwSourceId mapping, 7 docs; ppwSourceMappingStatus; ppwInventoryIssues) | #143 |
| `data/cases/american-civil-war-union/source-pack.json` | Updated (5 new sources added) | #143 |
| `bibliography/sources.csl.json` | Updated (5 new Lincoln CSL-JSON entries) | #143 |
| `data/corpora/lincoln-deep-28/artifact-index.json` | Updated (cluster-profiles, evidence-chain-links, methodology-docs, pipeline-scripts, publication-site families added; canGenerateDraftClaims added to all) | #144 |
| `data/claim-promotion/draft-claims.json` | Created | #145 |
| `docs/architecture/lincoln-evidence-module-method-note.md` | Created | #146 |
| `docs/migration/lincoln-module-migration-audit.md` | Created (this file) | #147 |
| `data/corpora/lincoln-deep-28/corpus.json` | Updated (sourceIssueRefs, architecture note) | #194 |

---

## 3. Child Issues Migrated into Milestone 16

| Source Issue | Source Title | PPW Issue | Status |
|---|---|---|---|
| LMA #109 | Define v4 corpus expansion architecture | #194 | Closed — architecture expressed in documents.json tierDefinition blocks |
| LMA #109 (infra) | — | #141 | Closed — case corpus linkage created |
| LMA #109 (infra) | — | #142 | Closed — evidence-module case analysis link created |
| LMA #109 (infra) | — | #143 | Closed — document metadata ppwSourceId mapping added |
| LMA #109 (infra) | — | #144 | Closed — artifact-index expanded with cluster profiles and all artifact families |
| LMA #109 (infra) | — | #145 | Closed — 4 draft claim candidates created |
| LMA #109 (infra) | — | #146 | Closed — method note created |
| LMA #109 (infra) | — | #147 | Closed (this issue) |
| LMA #109 (infra) | Add raw text files | #198 | Open — deferred; depends on LMA #113 resolution |

---

## 4. Artifact Families — Disposition Summary

| Artifact Family | Disposition | Status |
|---|---|---|
| Corpus metadata (documents.json, 36 entries) | Imported | Complete |
| PPW source ID mappings (7 of 36 docs) | Imported (partial) | 29 docs unmapped; follow-on as source-pack grows |
| Case corpus linkage (lincoln-deep-28.json) | Imported | Complete |
| Evidence-chain link file | Imported (partial) | Structure complete; per-passage links require passage import |
| Raw text files | Pending | PPW #198, Milestone 16 — blocked on LMA #113 |
| Passage records | Pending | PPW #143 — scheduled Milestone 16 |
| Metaphor cluster profiles | Pending | PPW #144 — scheduled Milestone 16 |
| Draft claim candidates (4 stubs) | Imported (stub) | Anchored to documents, not yet to passages |
| Reliability artifacts | Reference only | PPW #199, Milestone 19 |
| Methodology docs | Reference only | Linked from method note (#146) |
| Pipeline scripts | Not imported | Child-repo specific |
| Publication site | Not imported | Child-repo site canonical |

---

## 5. Claims — Status

**Draft claims created:** 4  
**Claims reviewed:** 0  
**Claims promoted to findings:** 0

| Draft Claim ID | Cluster | Status | Primary blockers |
|---|---|---|---|
| lma-draft-claim-001 | Obligatory-frame | Draft | Passage import; reliability check; promotion gate |
| lma-draft-claim-002 | Body-organic | Draft | Passage import; contemporaneous baseline; promotion gate |
| lma-draft-claim-003 | Covenant-over-freedom | Draft | Passage import; cluster boundary definition; promotion gate |
| lma-draft-claim-004 | Sacrifice | Draft | Passage import; cross-register corpus; promotion gate |

No Lincoln module claim may be cited as a PPW finding until it has passed the claim-promotion gate (PPW #129, Milestone 18).

---

## 6. Claims Ready for Review in a Later Milestone

No claims are ready for review in Milestone 16 or 17. The conditions for readiness are:

1. Passage records imported and each claim anchored to specific passage IDs (PPW #143)
2. Inter-annotator reliability check completed (PPW #199, Milestone 19)
3. Claim-promotion gate designed and passed (PPW #129, Milestone 18)

Earliest realistic review: **Milestone 18** (after passage import in M16 and gate design in M18).

---

## 7. Remaining Risks

| Risk | Severity | Governing Issue(s) |
|---|---|---|
| 29 of 36 core documents have no PPW source ID — unmapped docs citable only by URL/edition | Low | Follow-on source-pack expansion (no issue yet) |
| Passage records not yet imported — draft claims are document-anchored, not passage-anchored | High | PPW #143 (passage import) |
| Validation and reference tier specific documents not yet selected | Medium | LMA #114 (validation), LMA #115 (reference) |
| 12-document gap in core tier (36 of 48 registered) | Medium | PPW #195 (substantially addressed); LMA #113 resolution pending |
| Raw text files not yet imported | Medium | PPW #198 — blocked on LMA #113 (which 12 docs to add) |
| Cluster-membership criteria and obligatory-frame / covenant-over-freedom boundary not yet formally defined for PPW | Medium | PPW #199 (reliability study, M19) |
| No claim-promotion gate design exists — all claims remain indefinitely at draft status | High | PPW #129 (M18) |

---

## 8. Recommendation: May Milestone 17 Begin?

Milestone 16 substantive issues (#141-#147) are closed. Issue #198 (raw text files) remains open but is blocked on LMA #113 and does not block Milestone 17.

**Milestone 17 (Sacrifice Law) prerequisite:** PPW #149-#151 (American Revolution and Napoleon case mapping) must be resolved before Milestone 17 artifact import can begin for those subsets. The Lincoln and Nazi Germany subsets of the SLW corpus can proceed without those issues.
