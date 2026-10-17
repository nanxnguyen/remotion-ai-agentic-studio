---
name: video-production
description: Produce or change a deterministic Remotion video through evidence-backed agent stages and review gates.
---

# Video production

Read `AGENTS.md` and the binding rules in `.agents/rules/` (README first), then the target manifest and `docs/<slug>/status.json`. Finish every turn on a video with `python3 -I scripts/pipeline.py audit <slug>`.

Run the stages in dependency order: intake and task plan; parallel research, content, and design; script; voice and audio; parallel scene implementation; integration; render; QA. The monitor models 19 roles, but a tool may execute roles sequentially when parallel workers are unavailable.

Each stage must leave evidence in the target `docs/<slug>/` directory. Update pipeline state only through `python3 -I scripts/pipeline.py`; never edit status JSON manually. Respect independent review gates and their recorded thresholds.

A stage is `done` only when its files exist and its guarding gate passed: `pipeline.py set <slug> <stage> done` refuses otherwise, and `pipeline.py show <slug>` must print no `⚠` before any review, gate, or delivery. Produce the missing file or reopen the stage; never work around a refusal. Media under `public/audio/` and `out/` is not in Git, so a status copied from another machine must be re-checked with `show` first.

Delivery ends with an automatic `docs/<slug>/eval.md` retro (time, tokens, evidence audit, next-video fixes) written without asking the user; `pipeline.py check` refuses without it. Apply each repository fix it names in the same session, test-first, unless it would weaken a gate or needs the user's machine or credentials.

Use the registry contract and frame-derived animation rules in `AGENTS.md`. Finish with `npm run verify`, visual comparison for visual changes, and a render only when requested or preparing a release.
