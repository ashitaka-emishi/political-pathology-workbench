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
| Text pending import | 26 (confirmed documents; texts are public domain and will be added as source-pack grows) |
| Planned but not yet registered | 8 (lma-v4-001 through lma-v4-008; pending LMA #113) |
| Unspecified (gap to 48-doc target) | 12 (pending LMA #113 resolution) |

## Completed texts

- `lma-doc-008.txt` — Farewell Address at Springfield (February 11, 1861)
- `lma-doc-017.txt` — Gettysburg Address (November 19, 1863, Bliss copy)

## Pending texts (confirmed documents, public domain)

All remaining confirmed documents (lma-doc-001 through lma-doc-022, excluding lma-doc-008 and lma-doc-017) are public domain and will be added in follow-on work. Priority order follows `analyticalPriority` in `documents.json`.
