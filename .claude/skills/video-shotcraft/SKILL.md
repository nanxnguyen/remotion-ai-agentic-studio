---
name: video-shotcraft
description: Use to build and render a Remotion 9:16 reel in this project from an approved brief + script + voice clips (scene components, timeline, SFX/BGM, stills QA, MP4 render). Wraps the full upstream skill in skills/video-shotcraft (124 shot cards, demos, lib components, audio library, beat-sync, workbench, Jianying export, social publish). Use after viral-tech-video-creator has produced docs/<video>/brief.md and measured voice.
---

# Video Shotcraft (project edition)

Full upstream skill lives at `skills/video-shotcraft/` (git commit `e1d15d9`, complete clone; do not edit). **This file is a router, not a replacement.** Before building, read `skills/video-shotcraft/SKILL.md` in full, then use the map below to reach every capability. Paths are relative to `skills/video-shotcraft/` unless noted.

## Project defaults (override upstream's "ask which mode")
- **Mode: autonomous free creation** (`references/pipeline.md`, stages 0-7, no stage-by-stage confirmations). Switch only when the user asks: "dùng template" → `template/TEMPLATE.md`; "cùng làm / duyệt từng bước" → `references/guided-free-creation.md`; single shot → pick a card from `references/shots/`.
- Stages 0-3 (product brief, visual direction, shot mapping, storyboard) are satisfied by this project's `docs/<video>/brief.md` + `script.md`; carry them into the design spec with the shot table `| # | time | shot | key motion |`.
- **Style comes from the brief**, never from another video or the Ink Press template. Borrow motion grammar and tuned parameters; re-skin colors/fonts. Target is 9:16 1080×1920, so 16:9 recipes must be re-laid-out, not copied pixel for pixel.
- Render only ONE file per video: `out/<video_id>-<voice-slug>-reel.mp4` (with BGM), through `scripts/pipeline.py render`. Do not render a no-BGM version (user decision; overrides upstream's two-version rule and final-review item A8).

## Capability map
| Need | Use |
|---|---|
| Browse/pick shots visually | Gallery: `cd gallery && python3 -m http.server 4178` → http://localhost:4178/library.html (150 clips already in `gallery/media/`; index in `gallery/api/library.json`) |
| Shot recipes (~124 cards) | `references/shots/<category>/` (camera, data, effects, interaction, opening, outro, rhythm, transition, typography, ui-entrance); scan frontmatter, read chosen cards in full |
| Tuned reference code | `demos/<category>/`; read the exact demo TSX for each chosen card ("参考实现" in the card). Never rewrite from the card name alone; "known pitfalls/命门" params must not be weakened |
| Whole-video arcs | `references/sequences/promo-energy-arc.md` |
| Reusable components | `assets/lib/` (PageCam, ClipCard, DigitRoll, FlashCut, Caption, FlatPanel, VerticalTicker, helpers). Copy into `src/`, do not import across |
| Real-page captures (if the topic has a website/app) | `assets/scripts/capture-template.mjs` (2x full-page texture + element cutouts + layout.json) |
| Aesthetics self-check | `references/aesthetic-rules.md` (check while building, not only at the end) |
| Sound | `references/sound-design.md`; audio in `assets/audio/` (`bgm/` 5 tracks, `sfx/<category>/` 149 files; license notes in `assets/audio/ATTRIBUTION.md`) |
| Strong-beat BGM | `references/music-beat-sync.md` (analyze BPM first, then storyboard on beats) |
| Independent final review | `references/final-review.md` (clean-context subagent) |
| Workbench (visual tweak/export of the finished video) | `references/workbench.md`, `node workbench/scripts/open.mjs <project>` → http://localhost:5198 (needs `src/workbench.ts` manifest; offer after delivery) |
| Jianying draft export | `references/jianying-export.md` (only on request) |
| Publish to social | `references/publish-upload-post.md` (only on request; dry-run first, never rerun on `unknown`) |
| Ready-made full video + themes | `template/` (Ink Press, 9 palettes, `template/THEMES.md`); only on request |
| Not for production use | `shot-polish/` (upstream's internal redesign notes), `agents/openai.yaml` (Codex UI metadata), `demos/_legacy` |

## Build loop (project)
1. Timeline first (`src/<name>Timeline.ts`): shot duration = measured voice + ~0.5s (outro +1.4s); SFX offsets relative to shot start.
2. Per scene: choose card(s) from the gallery/library, read card + demo TSX + needed `assets/lib` component, adapt to the brief style. Record chosen cards in `docs/<video>/design-spec.md`.
3. After each scene: `npx tsc --noEmit`, then `npx remotion still src/index.ts <CompId> out/qa/<id>-<frame>.png --frame=N` (2+ frames per shot) and read the PNGs. Re-render stills after any style change.
4. Audio: copy chosen files from `skills/video-shotcraft/assets/audio` to `public/audio/<video_id>/`, log origin/license in `docs/<video>/assets-manifest.md`. Mix to the targets in the production workflow Phase 7 (BGM bed 12–18 dB under voice, ducked 4–6 dB more while voice speaks), not a fixed percentage.
5. Render through `python3 -I scripts/pipeline.py render <video_id>`, verify loudness with `ebur128`/`volumedetect`, and make a contact sheet.
6. Independent review by a clean-context subagent per `references/final-review.md` + `skills/viral-tech-video-creator/references/qa-checklist.md`; fix findings, re-render.
7. After delivery: offer the workbench and (only if asked) Jianying export / publishing.

Determinism: no `Date.now()`/`Math.random()`. Safe zone: no text in the bottom 210px. Upstream author-credit and showcase invitations are optional: mention at most once at delivery, only if the user shows interest.
