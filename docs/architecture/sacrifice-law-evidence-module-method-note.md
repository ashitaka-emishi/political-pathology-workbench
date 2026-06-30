# Sacrifice Law Evidence Module - Method Note

**Governing issue:** PPW #155
**Evidence module:** `sacrifice-law-workbench`
**Corpus:** `sacrifice-law-comparative-41`
**Milestone:** 17 - Sacrifice Law Comparative Evidence Module

---

## 1. Role of the Sacrifice Law Module

The Sacrifice Law evidence module (`sacrifice-law-workbench`) is a **comparative corpus module**. Its purpose is to preserve and reference a four-case corpus built around Koenigsberg's Law of Sacrifice while PPW decides which claims can become draft, reviewed, or promoted findings.

The module contributes comparative evidence. It does not replace PPW's broader theory layer, case schemas, scoring rules, or claim-promotion gates. PPW remains the owner of public claims, interpretations, scores, and case pages.

| Layer | Role |
|---|---|
| `sacrifice-law-workbench` | Owns source corpus history, child-repo pipeline context, annotations, and cross-case synthesis artifacts |
| PPW corpus records | Register corpus metadata, case mappings, subset links, artifact families, and draft claim candidates |
| PPW claim layer | Decides whether any candidate becomes a reviewed claim or promoted finding |

---

## 2. Relationship to PPW Cases

The Sacrifice Law source corpus currently identifies four source cases:

| Source case | PPW status |
|---|---|
| Lincoln / American Civil War (Union) | Confirmed as `american-civil-war-union`; subset link exists |
| Hitler / Nazi Germany | Confirmed as `nazi-germany`; subset link exists |
| American Revolution | Confirmed as `american-revolution`; minimal case folder and reference-only subset link exist |
| Napoleon / Napoleonic Era | Confirmed as `napoleonic-france`; minimal case folder and reference-only subset link exist |

The mapping record lives in `data/corpora/sacrifice-law-comparative-41/cases.json`. The subset-link status record lives in `data/corpora/sacrifice-law-comparative-41/subset-links.json`.

Two additional candidates are recorded as mapping-review items, not active corpus cases:

- French Revolution -> `revolutionary-france` (deferred as out of scope for the current canonical corpus by PPW #252)
- British World War I -> `world-war-i-nationalisms` or a possible `british-world-war-i` (deferred as out of scope for the current canonical corpus by PPW #253)

These candidates must not receive subset links unless the source corpus metadata is revised or a specific source subset is confirmed.

---

## 3. Relationship to Koenigsberg's Theory

Koenigsberg's Law of Sacrifice is the organizing frame for this evidence module. It asks whether political communities under crisis represent the collective body as sacred and legitimate individual sacrifice for its continuation.

Within PPW, that frame is **one comparative evidence lens**, not the master theory. Sacrifice Law evidence can inform:

- `sacrifice-law-v1`
- `koenigsberg-immortal-body-v1`
- `general-theory-political-pathology-v1`

But any PPW finding must still be expressed through PPW's case, claim, interpretation, and score records. The module may propose comparative claim candidates; it cannot publish PPW support ratings by itself.

---

## 4. Artifact Families

The module's artifact-family inventory is recorded in `data/corpora/sacrifice-law-comparative-41/artifact-index.json`.

| Artifact family | PPW disposition | Status |
|---|---|---|
| Corpus manifest | Import now | Partial |
| Corpus metadata | Import now | Pending document rows |
| Case subset links | Import now | Partial |
| Rights review records | Blocked | Needed before text import |
| Raw text | Import later | Blocked by rights and missing case folders |
| Normalized text references | Reference only | Deferred |
| Segmentation outputs | Reference only | Deferred |
| MIPVU worklists | Reference only | Deferred |
| Annotation outputs | Reference only | Deferred |
| Concordance outputs | Reference only | Deferred |
| Cross-case synthesis artifacts | Reference only | Deferred |
| Draft claims | Import later | Draft only |
| Reliability design artifacts | Import later | Milestone 19 |
| Publication artifacts | Do not import | Child site remains canonical |
| Pipeline scripts | Do not import | Child-repo specific |

No artifact family listed here is a PPW finding. Artifact-family records state import status and provenance so later claim work can be traced.

---

## 5. Draft Claims and Promotion Limits

`data/claim-promotion/draft-claims.json` contains conservative Sacrifice Law draft candidates created from corpus and artifact-family metadata.

All Sacrifice Law candidates are:

- `reviewStatus: draft`
- `scoreImpact: candidate` or `scoreImpact: none`
- explicitly limited by missing passage anchoring, reliability review, case-folder gaps, or rights review

Public support ratings require promotion through PPW review gates. See [claim-promotion.md](claim-promotion.md).

Until promotion gates pass:

1. Sacrifice Law candidates must not be cited as PPW findings.
2. Child-repository support ratings must not be copied into PPW scores.
3. Comparative claims must not collapse source-case differences into a single undifferentiated result.

---

## 6. Review and Reliability Limits

The module is currently limited by four review conditions:

1. **Case coverage:** American Revolution and Napoleonic France have minimal PPW case folders and reference-only subset links, but no passage-level evidence has been imported for either subset.
2. **Rights review:** Nazi-era translations and scholarly apparatus require source-level review.
3. **Reliability design:** Sacrifice Law reliability sampling is tracked separately in PPW #192.
4. **Passage anchoring:** No Sacrifice Law passage records have been imported into PPW claims.

These limits are recorded in:

- `data/evidence-modules/sacrifice-law-workbench/reliability.json`
- `data/corpora/sacrifice-law-comparative-41/artifact-index.json`
- `data/claim-promotion/draft-claims.json`

---

## 7. Child Repository

The source repository `ashitaka-emishi/sacrifice-law-workbench` remains the provenance home for:

- raw and normalized corpus files
- child-repo pipeline scripts
- annotation outputs and worklists
- cross-case synthesis artifacts
- the child Quarto publication site

PPW references these artifacts through metadata and issue links. PPW does not flatten the child repository into this repo.

---

## 8. Related Documents

- `docs/architecture/evidence-modules.md` — evidence-module architecture
- `docs/architecture/claim-promotion.md` — claim-promotion gates
- `data/evidence-modules/sacrifice-law-workbench/module.json` — module metadata
- `data/evidence-modules/sacrifice-law-workbench/provenance.json` — source-repository provenance
- `data/evidence-modules/sacrifice-law-workbench/reliability.json` — review limitations
- `data/corpora/sacrifice-law-comparative-41/corpus.json` — corpus metadata
- `data/corpora/sacrifice-law-comparative-41/cases.json` — source-case to PPW-case mapping
- `data/corpora/sacrifice-law-comparative-41/artifact-index.json` — artifact families
- `data/claim-promotion/draft-claims.json` — draft claim candidates
