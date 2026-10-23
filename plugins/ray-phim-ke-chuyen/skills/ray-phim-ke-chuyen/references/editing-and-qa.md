# Editing / QA — source-preserving edits + final-video review

Read [mandatory preflight quality gates](preflight-quality-gates.md) and the retention/typography contract before NEW_FILM or full rerender. Each film must pass script, performance, voice-to-action, design and final playback gates before reporting FINAL.

## Scope precedence

- **VOICE_ONLY** when user asks to change only voice: preserve exact video frames, FPS, aspect, transitions, colors, burned captions, total duration. Do not silently rebuild visuals. Update only changed Vbee speech scenes; copy original video stream when feasible.
- **VISUAL/TYPE/MOTION revision**: preserve approved story and genuine audio stems unless script changes. Edit affected scene/track only; re-render all only if transition/frame interdependency requires it. **Changed script requires changed Vbee recording and captions**; never keep old voice with new text.
- **NEW_FILM**: first lock Hook–Body–Climax–Payoff script, acting shotlist, type system and audio cue map. Require low-res **real-voice animatic** before full final export.

## Voice-only procedure

1. Probe source streams/duration/FPS; snapshot file checksum and provenance.
2. Obtain approved exact spoken transcript and measured original TTS file, including scene slot, speaker and timing.
3. Generate ONLY changed authentic Vbee lines, save request/artifact evidence and MP3 timing. If old BGM and voice were mixed inseparably, do not pretend soundtrack can be retained by removing only the voice; use separately available stems or explain replacement.
4. Mix narration with independently available licensed BGM and planned SFX. Use `scripts/replace_narration.py` in copy-video mode, then `scripts/verify_video.py` and verify packet equality/stream metadata.
5. Listen carefully to changed phrase, preceding and following slots and final tail. Match burned captions if user permitted visual edit; otherwise disclose mismatch rather than silently rewriting images.

## Full-film / visual QA sequence

- Before render: `python3 scripts/preflight_story_video.py --timeline <approved-timeline.json> --max-seconds 60` (add `--voice-manifest` and `--check-assets` for full validation). No 'pass' if missing script, voice, actor beats, SFX, approved ending or source assets.
- Preview: render a short timed sample/animatic using the **actual voice** and watch it, don't infer performance from contact-sheet stills. Check character continuity, separate reactions and natural acting, gaze and hands; if only 2D pose swaps, state it.
- Audio: assess phrase-level mouth/action match; appropriate emotion from performance/pacing, audible female roles as separate dialogue, clip tails not cut, soundtrack ducking, peaks without distortion, film SFX corresponding to video frames.
- Cinematic subtitles: correct Vietnamese spelling/diacritics, mobile-safe readable hierarchy, 1–2 lines, no blocking eyes/hands/key ticket, timed keyword emphasis, no accidental duplicate titles.
- Transitions: watch every boundary (no unmotivated whip, ghosting, awkward frozen gap or repetitive zoom); use fade/dissolve/match-cut/cut-on-bell selectively.
- Final: FFprobe video+audio, width/height, FPS, true duration <=60.000s; inspect initial 3 seconds and EVERY transition/voice change plus ending 5 seconds; make sure no silent/frozen frames, black flash unless intentional, missing props, extra hands or voice double-up. Capture contact sheet + reviewer findings; report exact remaining limitations.
- Repo-specific: `AGENTS.md`, `npm run verify`, `npm run test:visual` and `python3 -I scripts/pipeline.py audit <vid>` remain required where applicable; never invent passing results.

## Honest delivery

Provide only links to actual verified files (MP4 preview/project). Label GitHub Release as archived only when the actual MP4 binary is there and the asset URL/SHA/size have been checked. Draft Release is private storage, **not** publication. No unsupported claims of fluid full-body acting, phoneme-perfect lip sync, or re-recorded emotionally expressive Vbee when only gain/tempo edits occurred.
