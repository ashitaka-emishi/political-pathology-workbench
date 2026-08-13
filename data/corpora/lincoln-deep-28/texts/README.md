# Lincoln Corpus — Raw Text Files

**Governing issue:** PPW #198  
**Corpus:** `lincoln-deep-28`

## Format

Each document is stored as a plain `.txt` file named `<documentId>.txt` (e.g., `lma-doc-017.txt`). Files use UTF-8 encoding with Unix line endings.

Text content follows these conventions:
- Verbatim transcription from the authoritative source listed in the document's `sourceEdition` field in `documents.json`
- No editorial markup, footnotes, or editorial apparatus
- Paragraph breaks preserved as blank lines
- Em-dashes as `—`, ellipses as `…`
- Source and provenance metadata recorded in `source-pack.json`, not in the text file

## Status

| Status | Count |
|---|---|
| Text complete | 2 |
| Text pending import | 34 (remaining PPW-registered metadata records; texts are public domain and will be added as source-pack grows) |
| LMA v4 core source inventory records pending PPW metadata/text import | 12 (source inventory complete in LMA; PPW import pending) |
| LMA v4 validation/reference source inventory records pending PPW import | 96 (78 validation-tier records and 18 additional reference-tier records; inventory complete in LMA, PPW import/review pending) |

## Completed texts

- `lma-doc-008.txt` — Farewell Address at Springfield (February 11, 1861)
- `lma-doc-017.txt` — Gettysburg Address (November 19, 1863, Bliss copy)

## Pending texts (confirmed documents, public domain)

All remaining PPW-registered documents are public domain and will be added in follow-on work. Priority order follows `analyticalPriority` in `documents.json`. LMA v4 inventory completion does not by itself create reviewed PPW text, passage, annotation, score, or claim-promotion records.
