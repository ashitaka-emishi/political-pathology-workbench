# Political Pathology Workbench — Claude Instructions

## SDLC Skill

When the user types `sdlc`, `sldc`, or `$sdlc-workflow` — with or without a following issue number or `next` — read and follow `.agents/skills/sdlc-workflow/SKILL.md` in full before taking any action. That file is the authoritative workflow definition. Key points from it:

- `sdlc next` / `sldc next`: inspect open issues and milestone ordering, recommend the next issue, and **stop for user confirmation** before branching or editing anything.
- `sdlc <N>` / `sldc <N>`: run the state helper, determine the smallest correct continuation for that issue, and proceed accordingly.
- Always run the state helper first: `python3 .agents/skills/sdlc-workflow/scripts/sdlc_state.py inspect-issue <N> --repo ashitaka-emishi/political-pathology-workbench --cwd .`
- Use `Co-authored-by: Claude <noreply@anthropic.com>` (not the Codex trailer) when Claude materially performs the work.
- Open PRs as ready, not draft. Do not merge or close issues without explicit user instruction.
- Squash merge only.

## Repository

**GitHub:** `ashitaka-emishi/political-pathology-workbench`  
**Site:** GitHub Pages via Quarto  
**Primary branch:** `master`

## Validation Pipeline

Run only the steps relevant to the blast radius of a change:

```bash
npm run validate          # schema + referential integrity (always run for data or schema changes)
npm run generate          # rebuild generated JSON indexes
PYTHONPATH=src-py python3 -m political_pathology.scoring.summary  # Python scoring (for scoring changes)
cd site && quarto render  # full site build (for site or template changes)
```

For data-only changes, `npm run validate && npm run generate` is usually sufficient.

## Key Directories

| Path | Contents |
|---|---|
| `data/cases/<slug>/` | Per-case evidence files: `case.json`, `passages.json`, `claims.json`, `interpretations.json`, `scores.json`, `counterclaims.json`, `source-pack.json` |
| `schemas/` | JSON Schema definitions for all object types |
| `src-js/cli/` | Validation and generation CLI scripts |
| `src-py/political_pathology/` | Python scoring and analysis modules |
| `theories/` | Versioned theory manifests |
| `site/` | Quarto site source; `site/cases/_chains/` holds case chain pages |
| `data/generated/` | Generated JSON indexes (committed, rebuilt by `npm run generate`) |
| `bibliography/sources.csl.json` | CSL-JSON citation metadata for all sources |
| `.agents/skills/sdlc-workflow/` | SDLC workflow skill (shared with Codex) |

## Branch Naming

- `fix/<issue-number>-<short-slug>`
- `feature/<issue-number>-<short-slug>`
- `docs/<issue-number>-<short-slug>`
- `chore/<issue-number>-<short-slug>`

## Active Milestones

- **Evidence Chains** (milestone #11): issues #98–#103 — making Source → Passage → Claim → Interpretation → Score traceable and navigable.
