# Evidence Browser Publication Structure Audit

**Governing issue:** PPW #180
**Milestone:** 20 - Unified Site and Public Evidence Browser
**Audit date:** 2026-07-01

## Scope

This audit checks whether Milestone 20 copied child-repository publication structures into PPW in a way that creates duplicate Quarto navigation, duplicate sites, or conflicting public claims.

Child repositories reviewed through PPW metadata:

- `ashitaka-emishi/lincoln-metaphor-analysis`
- `ashitaka-emishi/sacrifice-law-workbench`

PPW site source reviewed:

- `site/_quarto.yml`
- `site/evidence/*.qmd`
- `site/cases/*.qmd`
- `site/pre-render.py`

Generated build outputs such as `site/_site/`, `site/.quarto/`, and `site/cases/_chains/*.md` are ignored by Git and are not source publication structures.

## Findings

| Check | Result | Notes |
|---|---|---|
| Duplicate Quarto site structure | None found | PPW has a single tracked `site/_quarto.yml`; no child `_quarto.yml`, child `site/`, or child navigation tree is tracked in PPW. |
| Child publication pages | Adapted or referenced | Lincoln and Sacrifice Law publication artifacts remain canonical in their child repositories. PPW adds its own evidence-module pages instead of copying child publication pages. |
| Site navigation | Unified | The PPW navbar links to the single `Evidence` section, which then links to module pages, Sacrifice Law case index, and claim-promotion status. |
| Draft/provisional claims | Guarded | Evidence pages state that draft claims and public support ratings are not findings unless promotion gates pass. |
| Follow-up cleanup issues | None required | No duplicate child publication source tree or conflicting public claim surface was found. |

## Disposition by Module

### Lincoln Metaphor Analysis

The child repository remains canonical for raw annotation records, reliability artifacts, pipeline scripts, and its publication site. PPW represents the module through:

- `site/evidence/lincoln-metaphor-analysis.qmd`
- `data/evidence-modules/lincoln-metaphor-analysis/`
- `data/corpora/lincoln-deep-28/`
- `docs/architecture/lincoln-evidence-module-method-note.md`

The PPW page is an adapted evidence-browser page, not a copy of the child repository site.

### Sacrifice Law Workbench

The child repository remains canonical for raw and normalized corpus files, annotation outputs, worklists, pipeline scripts, cross-case synthesis artifacts, and its publication site. PPW represents the module through:

- `site/evidence/sacrifice-law-workbench.qmd`
- `site/evidence/sacrifice-law-cases.qmd`
- `site/evidence/claim-promotion-status.qmd`
- `data/evidence-modules/sacrifice-law-workbench/`
- `data/corpora/sacrifice-law-comparative-41/`
- `docs/architecture/sacrifice-law-evidence-module-method-note.md`

The PPW pages are evidence-browser summaries and status views. They do not copy the child repository's Quarto publication structure.

## Publication Guardrails

The current site structure preserves the intended boundary:

1. Child-repository publication sites remain provenance references.
2. PPW owns the unified public evidence browser.
3. Draft evidence-module claims remain draft unless PPW promotion gates advance them.
4. Public support ratings are not shown unless claims are promoted.
5. Generated evidence-chain pages are produced from PPW data and do not duplicate child site navigation.

## Conclusion

No cleanup is required for Milestone 20 publication structure. The repository has a unified PPW site and does not track duplicate child-repository Quarto structures.
