# Coding Data

Store raw coder records here, separate from reconciled case scores.

Raw coder data should preserve coder identity, codebook version, definition references, timestamp, score value, confidence, and adjudication status.

Outcome-blind packet artifacts live under `data/coding/packets/`. They are
generated from neutral case metadata and source/passages only, then hashed so
the project can reconstruct exactly what a coder saw. Coding rounds and
assignment manifests stay draft until a maintainer approves packet release.
