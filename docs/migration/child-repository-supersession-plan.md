# Child Repository Supersession Plan

Part of [#123](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/123) (Milestone 13: Architecture and Governance Baseline).

Defines the recommended lifecycle state for each child repository after Milestone 12 migration is complete. See the [child-issue migration audit](child-issue-migration-audit.md) for the full migration summary.

---

## Recommended lifecycle states

### `sacrifice-law-workbench` → **Reduced-maintenance source**

| Dimension | Recommendation |
|---|---|
| Repository | Open, publicly accessible, not archived |
| GitHub Pages site | Remains published |
| Issue tracker | Reduced maintenance — no new implementation issues; migration and provenance questions only |
| Commits | Frozen except for: (a) inactive notice application, (b) critical fixes to existing published artifacts |
| New implementation work | PPW only (Milestones 17, 19) |
| Provenance role | Authoritative source for Sacrifice Law corpus texts, pipeline artifacts, and publication history |

**Rationale:** The Sacrifice Law corpus spans four cases and its structure (comparative corpus, manifest-driven pipeline) is distinct enough from PPW to warrant preservation as a standalone reference. The GitHub Pages site is the citation anchor for existing Quarto publications. Freezing commits prevents drift that would complicate future provenance verification.

**Work that remains appropriate in this repo:**
- Applying the inactive notice (README, description, Pages callout) per [child-repo-inactive-notices.md](child-repo-inactive-notices.md).
- Responding to citation or provenance questions from collaborators.
- Fixing broken links or minor typos in published artifacts.

**Work that should happen only in PPW:**
- New corpus issues, claim work, or reliability design (Milestones 17, 19).
- Publication of new findings or comparative analysis.
- New issue creation (except provenance/maintenance).

---

### `lincoln-metaphor-analysis` → **Reduced-maintenance source**

| Dimension | Recommendation |
|---|---|
| Repository | Open, publicly accessible, not archived |
| GitHub Pages site | Remains published |
| Issue tracker | Reduced maintenance — 47 open issues are migrated or deferred; no new implementation issues |
| Commits | Frozen except for: (a) inactive notice application, (b) critical fixes to existing published artifacts |
| New implementation work | PPW only (Milestones 15–16, 19) |
| Provenance role | Authoritative source for Lincoln corpus texts, multi-stage annotation records (Stage 4A/4H/4J), reliability study artifacts, and publication history |

**Rationale:** The Lincoln corpus has deep annotation history (three stages, inter-annotator reliability studies, adjudication records) that is the evidentiary basis for PPW Lincoln claims. This history must remain in-place and citable. Archiving or deleting the repo would sever the provenance chain. Reduced maintenance preserves the record while directing new work to PPW.

**Work that remains appropriate in this repo:**
- Applying the inactive notice per [child-repo-inactive-notices.md](child-repo-inactive-notices.md).
- Responding to citation or provenance questions.
- Fixing broken links or minor typos in published artifacts.

**Work that should happen only in PPW:**
- New corpus expansion or annotation (Milestones 15–16).
- New claim or reliability work (Milestones 16, 19).
- Publication of new Lincoln evidence findings (Milestone 20).
- New issue creation (except provenance/maintenance).

---

## Why not archive?

GitHub's "archive" state makes a repository read-only and adds an archived banner, which achieves some of the same signaling. However:

1. **Maintainer may need to apply the inactive notice**, which requires a commit. Archiving before the notice is applied would require un-archiving first.
2. **The GitHub Pages site stops updating when a repo is archived** if the Pages workflow uses `push` triggers — the site would remain at its last published state but could not be re-rendered. This is acceptable but should be a deliberate decision, not an accidental side effect.
3. **Archiving sends a stronger signal than intended.** "Archived" implies the project is abandoned. "Reduced-maintenance source" is more accurate: the project is complete as a child repo and its outputs are being used by PPW.

**Recommended sequence:** Apply inactive notices first (per maintainer checklist in [child-repo-inactive-notices.md](child-repo-inactive-notices.md)). Revisit archiving at Milestone 21 (Final Integration Audit) when the PPW evidence browser is live and the child-repo site can be permanently superseded.

---

## Deferred issues in child repos

Three LMA issues are deferred with no current PPW target:

| Issue | Status | Resume condition |
|---|---|---|
| LMA [#85](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/85) — Tracking v2.0 reliability | deferred | After Milestone 19 (validation fixtures) |
| LMA [#95](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/95) — Classify human coder disagreements | deferred | After Milestone 19 (claim-promotion gates) |
| LMA [#108](https://github.com/ashitaka-emishi/lincoln-metaphor-analysis/issues/108) — Tracking v3.0 reliability | deferred | After Milestone 19 (validation fixtures) |

These issues should remain open in the child repo until Milestone 19 foundations exist. At that point, the maintainer should decide whether to create new PPW issues or fold the context into the M19 tracking issue (#165).

---

## Maintainer decision points

Before any state change is applied to a child repository, the maintainer must approve:

- [ ] **Inactive notice application** — README, description, and Pages callout (per [child-repo-inactive-notices.md](child-repo-inactive-notices.md))
- [ ] **Supersession comment posting** — 49 comments on child issues (per [child-repo-supersession-comments.md](child-repo-supersession-comments.md))
- [ ] **Archive decision** — defer to Milestone 21; do not archive before PPW evidence browser is live
- [ ] **Deferred issue lifecycle** — revisit LMA #85, #95, #108 when Milestone 19 opens

No child repository should be archived, deleted, or unpublished without explicit maintainer approval at each step.
