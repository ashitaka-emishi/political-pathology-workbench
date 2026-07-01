# Child Repository Inactive Notices

Prepared inactive notices for `sacrifice-law-workbench` and `lincoln-metaphor-analysis`.
Part of [#116](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/116) (Milestone 12: Child-Project Issue Migration).

**Do not apply these changes without maintainer approval.**

Both repositories remain open and publicly accessible. Both GitHub Pages sites remain published. These notices mark the repositories as inactive and direct users to PPW for new work, without deleting, archiving, or unpublishing anything.

PPW URL: https://github.com/ashitaka-emishi/political-pathology-workbench

---

## sacrifice-law-workbench

Repository: https://github.com/ashitaka-emishi/sacrifice-law-workbench
GitHub Pages site: https://ashitaka-emishi.github.io/sacrifice-law-workbench/

### 1. Repository description update

**Current description:**
> Reproducible corpus workbench testing Koenigsberg's Law of Sacrifice via Conceptual Metaphor Theory and LCC-style metaphor analysis across four historical cases: American Revolution, Napoleon, Lincoln, and Hitler. Quarto research site + manifest-driven Python pipeline.

**Proposed description:**
> [INACTIVE — superseded by Political Pathology Workbench] Reproducible corpus workbench for Koenigsberg's Law of Sacrifice via CMT and LCC-style metaphor analysis. Preserved as source history and audit provenance. New work at https://github.com/ashitaka-emishi/political-pathology-workbench

**How to apply:** Repository → Settings → General → Description.

---

### 2. README notice (insert after the first heading, before existing content)

```markdown
> **This repository is inactive.**
> Evidence work, implementation planning, documentation updates, and publication for this project have moved to the [Political Pathology Workbench](https://github.com/ashitaka-emishi/political-pathology-workbench). This repository is preserved as source history, citation context, and audit provenance. The GitHub Pages site remains published for reference.
>
> For new issues, follow-up work, or questions, please use the [PPW issue tracker](https://github.com/ashitaka-emishi/political-pathology-workbench/issues).
```

**How to apply:** Edit `README.md` — insert the block above immediately after the `# The Sacrifice Law Workbench` heading, before the existing description text.

---

### 3. GitHub Pages site notice

The site is Quarto-generated. The least-invasive way to add a notice is to prepend it to `index.qmd` (or equivalent landing page) as a callout block:

```markdown
::: {.callout-note}
## This site is retained for reference

This project has moved to the [Political Pathology Workbench](https://github.com/ashitaka-emishi/political-pathology-workbench). This site remains published for reference and citation. New work, documentation updates, and publication artifacts will appear at PPW.
:::
```

**How to apply:** Open `index.qmd` (or the site's landing page source) in the child repo and insert the callout at the top of the page body, before existing content. Re-render and push.

---

## lincoln-metaphor-analysis

Repository: https://github.com/ashitaka-emishi/lincoln-metaphor-analysis
GitHub Pages site: https://ashitaka-emishi.github.io/lincoln-metaphor-analysis/

### 1. Repository description update

**Current description:**
> Koenigsberg ideological fantasy analysis applied to Lincoln's corpus, 1838–1865

**Proposed description:**
> [INACTIVE — superseded by Political Pathology Workbench] Koenigsberg ideological fantasy analysis of Lincoln's corpus, 1838–1865. Preserved as source history and audit provenance. New work at https://github.com/ashitaka-emishi/political-pathology-workbench

**How to apply:** Repository → Settings → General → Description.

---

### 2. README notice (insert after the first heading, before existing content)

```markdown
> **This repository is inactive.**
> Evidence work, implementation planning, documentation updates, and publication for this project have moved to the [Political Pathology Workbench](https://github.com/ashitaka-emishi/political-pathology-workbench). This repository is preserved as source history, citation context, and audit provenance. The GitHub Pages site remains published for reference.
>
> For new issues, follow-up work, or questions, please use the [PPW issue tracker](https://github.com/ashitaka-emishi/political-pathology-workbench/issues).
```

**How to apply:** Edit `README.md` — insert the block above immediately after the `# Lincoln Metaphor Analysis` heading, before the existing description text.

---

### 3. GitHub Pages site notice

```markdown
::: {.callout-note}
## This site is retained for reference

This project has moved to the [Political Pathology Workbench](https://github.com/ashitaka-emishi/political-pathology-workbench). This site remains published for reference and citation. New work, documentation updates, and publication artifacts will appear at PPW.
:::
```

**How to apply:** Open the site's landing page source (`index.qmd` or equivalent) and insert the callout at the top of the page body, before existing content. Re-render and push.

---

## Checklist for maintainer

- [ ] Apply description update to `sacrifice-law-workbench`
- [ ] Apply README notice to `sacrifice-law-workbench`
- [ ] Apply GitHub Pages notice to `sacrifice-law-workbench` and re-render
- [ ] Apply description update to `lincoln-metaphor-analysis`
- [ ] Apply README notice to `lincoln-metaphor-analysis`
- [ ] Apply GitHub Pages notice to `lincoln-metaphor-analysis` and re-render
- [ ] Verify both GitHub Pages sites remain published after notice additions
- [ ] Verify both repositories remain publicly accessible
