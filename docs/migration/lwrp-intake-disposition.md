# Lincoln War Research Project Intake Disposition

**Governing issue:** [PPW #305](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/305)  
**Source repository:** `ashitaka-emishi/lincoln-war-research-project`  
**Disposition date:** 2026-08-13  
**Disposition:** PPW-coordinated supplemental Lincoln study; do not register as a separate evidence module yet.

## Summary

The Lincoln War Research Project (LWRP) should be coordinated inside PPW as a
supplemental Gettysburg / war-obligation study under the existing
`american-civil-war-union` case and Lincoln evidence-module architecture.

LWRP overlaps directly with PPW's existing Lincoln boundaries:

- case: `american-civil-war-union`
- evidence module: `lincoln-metaphor-analysis`
- source family: Gettysburg Address witnesses, ceremony context, Lincoln wartime
  rhetoric, and limited reception evidence

The project should not become a separate PPW evidence module at this stage.
Its research question is narrower than the full Lincoln deep-case module, and
its current artifacts are best treated as source-provenanced supplemental
study records until PPW review gates decide which specific source, passage,
claim, or method artifacts should be imported.

## Intake Evidence

The inspected LWRP repository contains:

- a Quarto-backed project site and working paper;
- staged research goals for foundation, corpus acquisition, evidence coding,
  analysis, adversarial review, and publication;
- a source register with 42 source rows, including Gettysburg Address witnesses,
  ceremony material, comparative Lincoln texts, reception sources, and secondary
  scholarship records;
- public-domain and open-web source provenance fields with local raw/normalized
  paths, retrieval dates, checksums, rights status, acquisition method, and
  verification status;
- a claim register with nine thesis-level claims marked with local status values
  such as `approved-thesis` and `reviewed-approved-thesis`;
- explicit human gates for corpus approval, thesis approval, and publication
  approval.

The source repository records a corpus-acquisition approval by Andrew Hammer on
2026-07-16, limited to legally accessible public-domain or openly available
source texts and metadata. That approval does not approve interpretive claims,
final corpus boundaries, publication, or unverified quotations as PPW evidence.

## PPW Target Shape

Use PPW as the long-term coordination home for the LWRP work where the existing
architecture can preserve provenance and review state.

Recommended target representation:

| LWRP artifact family | PPW disposition |
|---|---|
| Quarto site, working paper, generated HTML, publication files | Reference only |
| Source register metadata | Candidate import as source-pack or corpus-extension records after rights/provenance review |
| Raw and normalized source texts | Candidate import only for public-domain/openly available materials with PPW source metadata and hashes |
| Gettysburg Address witness handling | Candidate extension of the Lincoln source family; preserve witness-specific identity |
| Dossier and claim inventory | Candidate draft-claim context only; do not promote as PPW findings |
| Review files and human-decision logs | Reference-only governance context unless PPW creates matching review artifacts |
| LWRP pipeline scripts and project scaffolding | Do not import |
| Methodology-paper track | Reference-only method case study; may inform PPW methodology notes after separate review |

The first PPW implementation should be a narrow source/provenance audit, not a
bulk import. If that audit passes, follow-up work can add selected source-pack
records or draft-claim context under `american-civil-war-union`.

## Gates

Before any LWRP content is treated as PPW evidence, PPW still needs:

1. **Source-rights gate** for each source row, especially derivative web pages,
   newspaper access paths, secondary works, and institutional transcripts.
2. **Provenance gate** confirming stable URLs, retrieval dates, hashes, and
   raw/normalized separation.
3. **Witness-identity gate** for Gettysburg Address copies so variants are not
   harmonized silently.
4. **Claim-promotion gate** before any LWRP thesis claim becomes a PPW finding.
5. **Publication gate** before PPW cites LWRP outputs as reviewed scholarship.
6. **Module-boundary gate** before creating a new evidence-module registry entry.

## Follow-Up Work

PPW follow-up issue
[#307](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/307)
audits the LWRP source register and recommends a minimal source-pack or
corpus-extension import plan for `american-civil-war-union`.

The follow-up should decide whether selected LWRP sources belong in:

- `data/cases/american-civil-war-union/source-pack.json`;
- an extension to the Lincoln corpus metadata;
- a draft-methodology note;
- reference-only documentation.

No immediate change to `data/evidence-modules/module-registry.json` is
recommended.

## Validation

This disposition changes documentation only. The repository-level validation
needed for this issue is a documentation smoke check plus `npm run validate` to
confirm no metadata assumptions were disturbed.
