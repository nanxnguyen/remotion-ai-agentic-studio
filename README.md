# remotion-ai-agentic-studio

An agent-ready Remotion studio for producing deterministic 9:16 videos with parallel research, script, voice, design, scene, QA, and review workflows.

![Agent Workflow Monitor](docs/assets/agent-workflow-monitor.png)

<p align="center"><em>Live production monitor for a 19-agent workflow with parallel branches and independent review gates.</em></p>

## Why this repository

- Build vertical videos with React, TypeScript, and Remotion.
- Keep timelines, narration, sound design, scenes, and evidence reproducible.
- Give Codex, Claude Code, Cursor, and Gemini CLI one shared set of repository instructions.
- Validate work through explicit production stages and independent review gates.
- Preserve deterministic rendering: animation is derived from frames, never wall-clock time or unseeded randomness.

## Quick start

Requirements: Node.js 22, npm, Python 3.12+, FFmpeg, and FFprobe.

```bash
npm install
npm run studio
```

Open the production monitor in another terminal:

```bash
npm run pipeline
```

Then visit <http://127.0.0.1:4180/>.

## Current architecture

- `src/` — Remotion compositions, scenes, timelines, and shared visual primitives.
- `scripts/pipeline.py` — production state, evidence, review gates, render verification, and monitor server.
- `docs/<video-id>/` — brief, research, script, design, review, and delivery evidence.
- `.claude/agents/` — optional Claude Code specialist-agent adapters.
- `skills/` — reusable video-production knowledge and shotcraft resources.

The repository is being migrated toward a typed video registry and portable agent instructions. Existing composition IDs and rendered output remain compatibility constraints during the migration.

## Verification

```bash
npx tsc --noEmit
python3 -m unittest scripts.test_pipeline scripts.test_monitor_ui scripts.test_voice_catalog
```

## License

Code is released under the [MIT License](LICENSE). Media assets may have separate attribution or redistribution terms; see the relevant asset manifests before reuse.
