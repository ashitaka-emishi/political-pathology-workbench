# John Brown Metaphor Analysis Intake Disposition

**Governing issue:** [PPW #306](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/306)  
**Source repository:** `ashitaka-emishi/john-brown-metaphor-analysis`  
**Disposition date:** 2026-08-13  
**Disposition:** Planned PPW deep-case candidate; defer registry entry until PPW source/corpus audit and case-boundary approval.

## Summary

John Brown Metaphor Analysis (JBMA) is a plausible future PPW deep-case evidence
module, but it should not be registered in PPW yet.

The source repository has moved beyond its initial migration reset: it now
contains a limited corpus-acquisition approval, 20 source-register rows, Goal 20
segmentation notes, textual-variant notes, and source-substitution decisions.
However, the active evidence matrix and claims register remain header-only.
That means PPW can coordinate the intake path now, but should defer data import,
case registration, module registration, and claim-promotion work until a
PPW-native audit confirms what can safely move.

## Intake Evidence

The inspected JBMA repository contains:

- a governed research question about John Brown's metaphor, biblical allusion,
  religious typology, violence, failure, and death;
- a migration report documenting reset from a copied Lincoln War Research
  Project scaffold;
- corpus approval dated 2026-07-21, limited to Goal 10 acquisition and not to
  interpretation, thesis, findings, or publication;
- a 20-row source register with provenance, rights, verification, authorship,
  and attribution-caveat fields;
- source records spanning Brown-authored or Brown-attributed writings,
  manuscript copies, reported courtroom statements, government records,
  newspaper variants, repository transcriptions, and finding aids;
- Goal 20 completion notes reporting passage locator conventions and 21 working
  passage assignments;
- explicit human gates for corpus approval, source substitution approval,
  codebook approval, thesis approval, methodology findings approval, and
  publication approval;
- no active evidence-matrix rows and no active claim rows.

The README still says no John Brown corpus has yet been approved or acquired.
That top-level status appears stale relative to later dated notes and source
register state. PPW intake should rely on artifact-level records and preserve
this source-status inconsistency as a review item.

## PPW Target Shape

PPW should become the long-term coordination home if the maintainer wants John
Brown handled inside the workbench, but only after the case and module boundary
are explicitly approved.

Recommended identifiers, pending review:

| Boundary | Recommendation |
|---|---|
| PPW case ID | `john-brown-harpers-ferry` |
| PPW evidence module ID | `john-brown-metaphor-analysis` |
| Module type | `deep-case` |
| Initial case relationship | New case, not an extension of `american-civil-war-union` |
| Claim status | Draft-only until PPW claim-promotion gates pass |

The recommended case boundary should focus on John Brown's symbolic
self-understanding around antislavery violence, Harpers Ferry, trial,
imprisonment, and death. It should not be folded into the Lincoln case simply
because both belong to Civil War-era political theology.

## Artifact Disposition

| JBMA artifact family | PPW disposition |
|---|---|
| Source-register metadata | Import later after PPW source/corpus audit |
| Raw and normalized corpus files | Import later only for approved source rows with rights/provenance review |
| Passage locator conventions and segmentation notes | Import later as possible passage-audit input |
| Textual-variant notes | Import later or reference-only, depending on witness audit |
| Evidence matrix | No import now; source file is header-only |
| Claims register | No import now; source file is header-only |
| Source-substitution and corpus approvals | Reference-only governance context unless re-expressed as PPW gates |
| Quarto site, working paper, generated publication files | Do not import |
| Pipeline scripts and project scaffolding | Do not import |
| Methodology-paper track | Reference-only method context pending separate review |

## Gates

Before JBMA becomes active PPW evidence, PPW needs:

1. **Case-boundary approval** for `john-brown-harpers-ferry` or another
   maintainer-approved case ID.
2. **Corpus/source audit** of all JBMA source rows, including rights status,
   acquisition method, hashes, attribution caveats, and witness class.
3. **Attribution gate** for manuscript copies, reported statements, edited
   pamphlets, newspaper variants, and repository transcriptions.
4. **Textual-verification gate** before any quotation or passage coding is used
   as PPW evidence.
5. **Module-registry gate** before adding `john-brown-metaphor-analysis` to
   `data/evidence-modules/module-registry.json`.
6. **Claim-promotion gate** before any interpretation affects PPW findings or
   scores.
7. **Publication gate** before PPW presents JBMA output as reviewed scholarship.

## Follow-Up Work

PPW follow-up issue
[#309](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/309)
audits the JBMA source register and case boundary before any module scaffold or
data import. The follow-up should decide whether to create:

- `data/cases/john-brown-harpers-ferry/`;
- `data/evidence-modules/john-brown-metaphor-analysis/`;
- a John Brown corpus registry entry;
- reference-only related-project documentation;
- narrower issues for source-pack, passage, and draft-claim work.

No immediate change to `data/evidence-modules/module-registry.json` is
recommended.

## Validation

This disposition changes documentation only. The repository-level validation
needed for this issue is a documentation smoke check plus `npm run validate` to
confirm no metadata assumptions were disturbed.
