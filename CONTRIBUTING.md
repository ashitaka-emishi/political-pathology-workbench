# Contributing

This repository is an active research spike. Contributions should preserve the distinction between provisional research objects and reviewed scholarly claims.

## Ground Rules

- Keep draft, review, and publication status labels accurate.
- Do not commit full copyrighted books, paywalled articles, restricted PDFs, or large copyrighted corpora without explicit permission.
- Prefer source metadata and short legally appropriate passages until source access is clear.
- Preserve traceability from source to passage to claim to interpretation to score.
- Mark AI-assisted claims as candidate objects unless a human reviewer has accepted them.

## Local Checks

Run these before proposing changes:

```sh
npm run validate
npm run generate
PYTHONPATH=src-py python3 -m political_pathology.scoring.summary
```

If Quarto is installed, also run:

```sh
cd site && quarto render
```

## Adding a Case

Use `workflows/add-case/README.md` as the starting point. New cases should include:

- `case.json`
- `source-pack.json`
- `passages.json`
- `claims.json`
- `interpretations.json`
- `scores.json`

Empty arrays are acceptable for early placeholders, but gold cases should eventually contain a complete evidence chain.
