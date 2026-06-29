# Sacrifice Law Workbench Issue Migration

Migration record for open issues from `ashitaka-emishi/sacrifice-law-workbench` into PPW.
Part of [#110](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/110) (Milestone 12: Child-Project Issue Migration).

Source data: `data/migration/sacrifice-law-workbench-open-issues.json`
Manifest entries: `data/migration/child-issue-migration-manifest.json` (sourceRepo: `ashitaka-emishi/sacrifice-law-workbench`)

---

## Issue disposition table

| SLW issue | Title | Disposition | PPW target | Status |
|---|---|---|---|---|
| [#174](https://github.com/ashitaka-emishi/sacrifice-law-workbench/issues/174) | Track pre-v1 corpus expansion window | `merge-into-ppw-issue` | [PPW #110](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/110) — checklist context | Pending maintainer comment approval |
| [#183](https://github.com/ashitaka-emishi/sacrifice-law-workbench/issues/183) | Revise reliability sampling design for expanded corpus | `migrate-as-ppw-issue` | [PPW #192](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/192) — Milestone 19 | Pending maintainer comment approval |

---

## PPW issue mapping

### SLW #174 → PPW #110 (checklist context)

SLW #174 is a tracking issue for the pre-v1 corpus expansion window. Its corpus expansion context is directly relevant to PPW #110, which is the Milestone 12 migration coordination issue for Sacrifice Law work. Rather than creating a duplicate tracker, the tracking context from SLW #174 becomes background for PPW #110.

**Action taken:** SLW #174 recorded as source context in this document. No separate PPW tracking issue created.

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been inventoried as part of the PPW child-project issue migration ([ashitaka-emishi/political-pathology-workbench #110](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/110)).
>
> Disposition: **merge-into-ppw-issue** — the pre-v1 corpus expansion tracking context has been recorded in the PPW Sacrifice Law migration issue rather than recreated as a separate tracker.
>
> This issue will remain open until the PPW Sacrifice Law evidence module (Milestone 17) is established and the maintainer approves supersession. Do not close without maintainer approval.

---

### SLW #183 → PPW #192 (migrate-as-ppw-issue)

SLW #183 calls for revising reliability sampling design to account for the expanded Sacrifice Law corpus. This work remains relevant to PPW claim-promotion gates and corpus migration planning. A new PPW issue has been created to carry this work forward under the PPW review-gate and claim-promotion framework.

**Action taken:** Created [PPW #192](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/192) — "Revise reliability sampling design for Sacrifice Law corpus expansion" — assigned to Milestone 19: Validation, Generation, and Test Fixtures.

**Child-repo comment draft** (for maintainer approval — do not post without approval):

> This issue has been migrated to PPW as part of the child-project issue migration ([ashitaka-emishi/political-pathology-workbench #110](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/110)).
>
> Disposition: **migrate-as-ppw-issue** — the reliability sampling design work has been carried forward to [PPW #192 — Revise reliability sampling design for Sacrifice Law corpus expansion](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/192), targeted at Milestone 19: Validation, Generation, and Test Fixtures.
>
> Future reliability sampling work for the Sacrifice Law corpus should proceed in PPW using the PPW claim-promotion gate framework. This issue will remain open until the maintainer approves supersession. Do not close without maintainer approval.

---

## Audit checklist

- [x] All open SLW issues inventoried (2 of 2)
- [x] Every issue has a PPW disposition recorded in the manifest
- [x] PPW target issue created for `migrate-as-ppw-issue` entries (PPW #192)
- [x] Source links included in PPW target issue
- [x] PPW target issue uses PPW architecture language
- [x] Reliability issue tied to claim-promotion gates (PPW #192 references review-gate thresholds)
- [x] Corpus expansion issue tied to Sacrifice Law evidence module (Milestone 17 context in PPW #192)
- [x] Child-repo comment drafts prepared for maintainer approval
- [ ] Maintainer approves and posts comment on SLW #174
- [ ] Maintainer approves and posts comment on SLW #183
