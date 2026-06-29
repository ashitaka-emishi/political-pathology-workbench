# Political Pathology Workbench

**Site:** [ashitaka-emishi.github.io/political-pathology-workbench](https://ashitaka-emishi.github.io/political-pathology-workbench/)

> Status: active research spike. Materials may be incomplete, provisional, or under review. Public availability does not imply scholarly finality.

The Political Pathology Workbench is a research platform for studying how symbolic orders become embodied in institutions, how those institutions respond to crisis, and when they generate sacrifice, violence, reform, collapse, transformation, or stagnation.

This repository is the v2 scaffold implementation. It sets up theory-as-data, structured case folders, traceable evidence objects, validation tooling, Python analysis stubs, and a lean Quarto publication site.

## Current Spike Goals

- Represent three theory versions as data.
- Maintain a balanced initial set of twenty cases.
- Demonstrate a thin Source -> Passage -> Claim -> Interpretation -> Score chain for Nazi Germany.
- Generate global JSON indexes from case folders.
- Provide draft Quarto pages for public review.

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
