# Agent Guide

This is the canonical instruction file for every coding agent working in this repository.

## Mission

Build deterministic 9:16 Remotion videos while preserving each video's visual identity. Share infrastructure, contracts, and tooling—not palettes, story concepts, or scene art direction.

## Required workflow

1. Read the relevant video manifest in `src/videos/<slug>/index.ts` and its evidence in `docs/<slug>/`.
2. Use `src/videos/registry.ts` as the only composition catalog. Never register a composition directly in `Root.tsx`.
3. Derive animation from Remotion frames. Never use wall-clock time or unseeded randomness.
4. Keep composition IDs, dimensions, frame rate, duration, image treatment, and audio placement backward compatible unless the task explicitly changes them.
5. Add or update tests before implementation. Run `npm run verify` before handoff.
6. For visual changes, run `npm run test:visual` and inspect the diff output.
7. Keep secrets, personal voice previews, render output, and unlicensed media out of Git.

## Video production rules (mandatory)

Every agent and tool that works on a video (Claude Code, Codex, OpenCode, Cursor, Gemini, …) must run the full phase/stage/gate workflow in [`.claude/skills/ray-pineline-worflow-agent/SKILL.md`](.claude/skills/ray-pineline-worflow-agent/SKILL.md) without skipping any step (see rule 6 in `.agents/rules/README.md`), and must follow [.agents/rules/](.agents/rules/README.md): truthful status for the monitor, complete documents for every phase, `src/` ownership and timeline rules, and handoff discipline. Run `python3 -I scripts/pipeline.py audit <vid>` before ending any turn on a video; it must exit 0 or every remaining error goes into `docs/<vid>/HANDOFF.md`.

## Commands

```bash
npm install
npm run studio
npm run video:new -- --slug my-video --id MyVideoReel --scenes 8
npm run voice:measure -- my-video --out src/videos/my-video/voice-durations.ts
npm run verify
npm run test:visual
npm run pipeline
```

Runtime baseline: Node 22, npm, Remotion 4.0.534, Python 3.12+, FFmpeg, and FFprobe.

## Architecture boundaries

- `src/core/`: typed video/timeline/audio contracts. No video-specific styling.
- `src/videos/<slug>/`: manifest, Reel, timeline, scenes, and theme owned by one video.
- `src/videos/registry.ts`: single source of truth for Studio, tests, and automation.
- `scripts/`: scaffolding and the Python production/review pipeline.
- `.agents/skills/`: portable production skills. Tool-specific directories are adapters only.
- `tests/golden/`: pre-migration reference frames for perceptual regression checks.

Some video manifests currently adapt legacy scene modules while those modules migrate incrementally. Do not combine visual systems merely to finish that move.

## CodeGraph

Prefer CodeGraph for structural questions: symbol definition, callers/callees, impact, traces, and focused context. Use text search for literal strings and comments. If the index reports pending files, read only those changed files directly. Initialize a fresh clone with `codegraph init -i` when CodeGraph is installed.

## Language and safety

Communicate with the project owner in Vietnamese. Keep code, public documentation, and commit messages in English. Do not publish credentials, personal media, generated MP4s, or assets without clear redistribution rights.
