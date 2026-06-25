# Agent Instructions

Use the repo skill `.agents/skills/sdlc-workflow` for issue-directed branch, pull request, review, merge, and issue-tracking workflows.

Treat `sdlc`, `sldc`, and `$sdlc-workflow` as requests to use that workflow. This repository uses `master` as the default branch.

When an AI agent materially performs commit work, include the correct `Co-authored-by` trailer:

- Codex: `Co-authored-by: OpenAI Codex <codex@openai.com>`
- Claude: `Co-authored-by: Claude <noreply@anthropic.com>`

Do not use a generic AI trailer, and do not include both Codex and Claude unless both materially contributed to the same commit.
