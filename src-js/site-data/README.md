# Site Data

This directory is reserved for Quarto-facing data transforms.

`npm run site-data` writes `site/data/workbench-summary.json`,
`site/data/measurement-status.json`, and export profiles under
`site/data/export-profiles/`.

Export profiles separate internal research data from coder-blinded, review,
public-preview, and published-analysis surfaces. Public/export readiness remains
human-gated; generated files must not be treated as publication approval.
