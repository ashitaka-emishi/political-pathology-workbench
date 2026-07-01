# Final Validation and Generation Audit

**Governing issue:** PPW #182
**Milestone:** 21 - Final Integration Audit and Repository Transition
**Audit date:** 2026-07-01

## Scope

This audit records the required full validation and generation commands for the evidence-module integration after Milestone 20 was completed.

Required commands from #182:

```bash
npm run validate
npm run generate
PYTHONPATH=src-py python3 -m political_pathology.scoring.summary
cd site && quarto render
```

## Results

| Command | Result | Notes |
|---|---|---|
| `npm run validate` | Passed | Validation passed for 3 theories, 22 cases, and 2 evidence modules. Existing warnings remain for thin-source/counterevidence coverage and gold-case human-review status. |
| `npm run generate` | Passed | Generated indexes for 22 cases, 25 claims, 26 scores, 20 counterclaims, 2 evidence modules, 2 corpora, 8 draft claims, 5 promoted-claim registry records, and 22 per-case evidence chains. |
| `PYTHONPATH=src-py python3 -m political_pathology.scoring.summary` | Passed | Wrote `site/outputs/scoring-summary.json` with 26 scores. |
| `cd site && quarto render` | Passed | Rendered 44 site pages and created `site/_site/index.html`. |

## Validation Warnings

The validation command passed while reporting the following warnings:

- `american-revolution`: case has no counterevidence yet.
- `canada`, `european-union`, `gandhian-indian-independence`, `north-korea`, and `switzerland`: case has only one source.
- `imperial-japan`, `nazi-germany`, `postwar-germany`, `soviet-union-collapse`, and `united-states-after-vietnam`: gold case has no human-reviewed or approved score.
- `napoleonic-france`: case has no counterevidence yet.
- `postwar-germany-claim-002`: claim is supported by only one passage.

These are existing validation warnings rather than command failures. No follow-up issue is required for #182 because the acceptance criteria require documenting failures, and no command failed.

## Generated-File Side Effects

The validation run produced expected generated-file churn:

- `npm run generate` and the site pre-render step updated `generatedAt` timestamps in tracked generated JSON/Markdown outputs.
- `quarto render` generated ignored build output under `site/_site/`, `site/.quarto/`, and `site/cases/_chains/`.
- The pre-render step emitted untracked generated case pages for `american-revolution` and `napoleonic-france`; these are generated site byproducts and are not part of the source audit artifact.

The PR for #182 intentionally commits this audit document only.

## Conclusion

All required validation, generation, Python scoring summary, and site-render commands passed on 2026-07-01. No failure follow-up issues were created.
