---
name: video-production
description: Produce or change a deterministic Remotion video through evidence-backed agent stages and review gates.
---

# Video production

Read `AGENTS.md`, then the target manifest and `docs/<slug>/status.json`.

Run the stages in dependency order: intake and task plan; parallel research, content, and design; script; voice and audio; parallel scene implementation; integration; render; QA. The monitor models 19 roles, but a tool may execute roles sequentially when parallel workers are unavailable.

Each stage must leave evidence in the target `docs/<slug>/` directory. Update pipeline state only through `python3 -I scripts/pipeline.py`; never edit status JSON manually. Respect independent review gates and their recorded thresholds.

Use the registry contract and frame-derived animation rules in `AGENTS.md`. Finish with `npm run verify`, visual comparison for visual changes, and a render only when requested or preparing a release.
