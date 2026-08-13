# Variable Lifecycle Metadata

**Governing issue:** [PPW #315](https://github.com/ashitaka-emishi/political-pathology-workbench/issues/315)  
**Audit date:** 2026-08-13

## Summary

Theory variable registries now declare lifecycle metadata for every variable:

- `status`: `active`, `deprecated`, `retired`, or `experimental`;
- `versionIntroduced`: theory version where the variable entered the registry;
- optional `aliases`, `replaces`, `replacedBy`, and `deprecationNote` fields;
- optional `compatibility.newRecordsPolicy` to distinguish canonical IDs from
  preserved historical identifiers.

## Rename Policy

The historical `symbolic-order-strength` identifier is preserved as a deprecated
variable. It points to `sacred-political-order-strength`, which is marked as the
active canonical score variable.

Validation does not rewrite historical records. Deprecated variables remain
resolvable and produce warnings when used in analytical records; retired
variables fail validation. Replacement and alias references must resolve inside
the same theory variable registry.

## Human Gate

This PR records lifecycle metadata and validation policy only. It does not
approve any variable rename as a reviewed research artifact beyond preserving the
existing repository decision to use `sacred-political-order-strength` in active
case records.
