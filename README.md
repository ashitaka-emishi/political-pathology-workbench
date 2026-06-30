# Political Pathology Workbench

**Site:** [ashitaka-emishi.github.io/political-pathology-workbench](https://ashitaka-emishi.github.io/political-pathology-workbench/)

> Status: active research repository. Materials may be incomplete, provisional, or under review. Public availability does not imply scholarly finality.

The Political Pathology Workbench is a research platform for studying how sacred political orders become embodied in institutions, how those institutions respond to crisis, and when they generate sacrifice, violence, reform, collapse, transformation, or stagnation.

This repository is the coordination home for the Political Pathology Workbench. It maintains theory-as-data, structured case folders, traceable evidence objects, validation tooling, evidence-module metadata, generated indexes, Python analysis stubs, and a Quarto publication site.

## Current Project Focus

- Keep source-to-score evidence chains machine-checkable and reproducible.
- Preserve clear boundaries between draft research objects, reviewed claims, and public-facing artifacts.
- Integrate evidence modules from related child repositories without silently promoting provisional claims.
- Generate site and data artifacts from canonical source records.
- Use GitHub milestones and issues as the active roadmap.

## Quick Start

```sh
npm run validate
npm run generate
python3 -m political_pathology.scoring.summary
```

For Python imports from the local source tree:

```sh
PYTHONPATH=src-py python3 -m political_pathology.scoring.summary
```

## Repository Map

- `docs/history/` keeps the original scaffold document for historical reference.
- `theories/` contains versioned theory records.
- `data/cases/` contains human-edited case folders.
- `data/generated/` contains generated indexes.
- `schemas/` contains JSON Schema draft files.
- `src-js/` contains validation and generation tooling.
- `src-py/` contains analytical Python modules.
- `site/` contains the Quarto site skeleton.

## License

Original project-authored code, schemas, data structures, documentation, and analysis are MIT licensed. Third-party sources, quotations, excerpts, PDFs, and linked materials remain under their original rights.
