# 03 · Source code rules for `src/`

## C1 · Ownership

- A video's code lives only in `src/videos/<slug>/`. Never edit another video's folder, palette, scenes or timeline to finish your own.
- `src/core/` is shared infrastructure (contracts, `FitText`, `defineVoiceTimeline`, audio tracks): no video-specific styling. Change it only test-first with `tests/core/`, and keep every existing video rendering the same (`npm run test:visual`).
- Inside one video, each writable file has exactly one owner. Only `video-director` edits `kit.tsx`, `timeline.ts`, `Reel.tsx`, `index.ts`, `voice-durations.ts` and `docs/<vid>/voice.json`; each `scene-agent-N` edits only its assigned scene file. Need a change in a file you do not own? Put the request in your return; do not edit it.
- Register compositions only in `src/videos/registry.ts` via the video's `index.ts`. Never in `src/Root.tsx`.

## C2 · Timeline from measured voice

- Durations come from real clips: `npm run voice:measure -- <vid> --out src/videos/<slug>/voice-durations.ts`, then build `timeline.ts` with `defineVoiceTimeline` from `src/core` (holds and lead-ins as explicit frames per key).
- Hand-typed frame counts or `PROPOSED_FRAMES` are allowed only before the voice stage is done. `build` cannot be `done` while any remain.
- Regenerating any clip means re-running `voice:measure` and reopening `build` (`set <vid> build in_progress`).

## C3 · Text on screen

- Spoken lines, captions and on-screen text are copied verbatim from `voice.json` and `content-pack.md` (diacritics included). Never reword them in code.
- Variable-length text (headline, caption chunk, label) uses `FitText` / `fitFontSize` with explicit `maxWidth`, `maxLines`, `minFontSize`, `maxFontSize`. Load the font first (Google Fonts with the `vietnamese` subset); measuring on a fallback font clips diacritics.
- A `FitText overflow` warning in a render or still log is a Cao QA issue: shorten the chunk (content owner), add a line, or widen the box. Never lower `minFontSize` below the readability floor (captions ≥ 54 px glyph height, auxiliary ≥ 32 px).
- No text in the bottom 210 px.

## C4 · Determinism

- Animation derives from `useCurrentFrame()` and the timeline. No `Date.now()`, `new Date()`, `Math.random()` or unseeded randomness; use Remotion's `random(seed)`.
- No network fetches at render time. Assets live in `public/` with a licence entry in `assets-manifest.md`.
- Keep composition id, size (1080×1920), fps (30) and audio placement backward compatible unless the task explicitly changes them.

## C5 · Verification before handoff

- Code change: `npm run verify` (lint, format, typecheck, unit tests, Python tests). Visual change: `npm run test:visual` and read the diff images.
- Scene work: render and read the stills for your shots (beginning, middle, boundary) and return their paths.
- Report pre-existing failures as pre-existing, with the command output; never claim a check passed that you did not run.
