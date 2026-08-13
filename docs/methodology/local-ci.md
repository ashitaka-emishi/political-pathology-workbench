# Local CI

**Governing issue:** [PPW #321](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/321)  
**Audit date:** 2026-08-13

Run the pull-request validation gate locally with:

```bash
npm run ci:local
```

This runs:

- repository validation;
- JavaScript fixture tests;
- claim-promotion, scoring, ontology, lifecycle, and reliability fixtures;
- generated index refresh;
- generated site data refresh;
- Python scoring summary generation;
- whitespace checks with `git diff --check`.
- generated-artifact cleanliness checks with `git diff --exit-code`.

The GitHub `Validate` workflow mirrors this sequence for pull requests and
pushes to `master`.
