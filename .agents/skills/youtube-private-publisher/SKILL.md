---
name: youtube-private-publisher
description: Route Superpowers-style work on private YouTube uploads to the canonical project skill.
---

# Superpowers-compatible entry point

Read `.claude/skills/youtube-private-publisher/SKILL.md` as the **canonical instructions**. Follow its plan, test, dry-run, explicit approval, Private-only upload and verification stages in order.

The uploader and GitHub Actions workflow live in the repository. This entry point does not modify the globally installed Superpowers plugin, add direct YouTube publishing powers to ChatGPT, or grant credential access. If a runtime cannot dispatch GitHub Actions, show the precise `gh workflow run` command rather than claiming it ran.
