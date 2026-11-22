---
name: doc-hud-video
description: "This skill should be used when the user wants a science documentary or deep-dive explainer video combining real open-source media (NOAA, NASA, Wikimedia Commons) with animated depth/scale HUD gauges, amber-accented lower-thirds, and 2D tiered infographics (the Tò Mò 1 style), e.g. \"make a deep ocean documentary video\", \"science video with depth gauge HUD\", \"documentary explainer in 9:16 or 16:9\", and Vietnamese requests such as \"làm video tài liệu khoa học kiểu Tò Mò 1\", \"video khám phá đại dương có thước độ sâu\", \"dựng video kiến thức kết hợp tư liệu thật và HUD\", \"làm video 2D kèm thước đo độ sâu\". Supports both 9:16 Shorts (1080x1920) and 16:9 Long-form (1920x1080 / 1440p) with Ken Burns motion, marine snow/particles, Vbee narration sync, and ambient/SFX audio."
metadata:
  version: "0.5.3"
  author: Thanh Hai Learn AI
---

# /doc-hud-video: Documentary Footage + Depth/Scale HUD & 2D Infographic

Combine **real Public Domain / CC documentary media** (ROV footage, NOAA/NASA/Wikimedia photos) with **code-drawn HUD overlays** (vertical depth/scale gauge, amber-accented lower-thirds, 2D tiered "building" infographics, Ken Burns motion, and deterministic particle layers). Works for both **9:16 Shorts/TikTok** (`1080x1920`, `45–75 s`) and **16:9 Long-form Documentary** (`1920x1080` or `2560x1440`, `3–18 min`).

## Golden Rules
1. **Ask video language & aspect ratio first** (`vi` / `en`; `9:16` Shorts or `16:9` Long-form) unless already specified.
2. **Hook in 0–5 s with the strangest real visual + central question.** Open directly on the most intriguing specimen or anomaly (e.g. *Magnapinna* at 6,000 m) with a concise curiosity question—never a channel logo or greeting.
3. **Real Media + Mandatory Visual Relevance Gate.** Fetch Public Domain / CC0 / CC-BY media from NOAA, NASA, MBARI, or Wikimedia/Wikipedia REST APIs using a compliant `User-Agent` (avoid HTTP 403/429). **Visually inspect every downloaded asset** before rendering; reject off-topic results (e.g., terrestrial fireflies returned for `"Bioluminescence"` in a deep-sea video).
4. **Enforce Aspect-Specific Safe Areas:**
   - **9:16 (`1080x1920`):** Place `DepthGaugeHud` in the **top-right** (`top: 150, right: 36`, height `~460 px`) so it never collides with TikTok/Shorts bottom-right action buttons; place `GoldLowerThird` at `bottom >= 280 px` (`left: 48`, `bottom: 300`); keep captions at `top: 165, left: 48, right: 190`.
   - **16:9 (`1920x1080`):** Place full-height `DepthGaugeHud16x9` on the right (`top: 150, right: 68`, height `760 px`), `GoldLowerThird16x9` at bottom-left (`left: 64, bottom: 64`), and captions at top-left (`top: 68, left: 64, maxWidth: 1320`).
5. **Anchor with a 2D Tiered Infographic (`Scene02`).** After the hook, present a 2D mental-model cross-section (e.g. *"ĐẠI DƯƠNG = MỘT TÒA NHÀ KHỔNG LỒ"*: 1-column stack for 9:16, 2-column horizontal layout for 16:9) before diving tier by tier.
6. **Vbee-First Narration, Word-Level Gold Captions & `-14 LUFS` Audio Mix.** Write clean Vietnamese TTS scripts (`script-vbee.txt` with numbers/units spelled out), measure real synthesized audio durations + word timestamps (`words.json` from Whisper/Vbee) before locking `timeline.ts`. Render **active-word highlight captions** (3–4 uppercase white words with thick black outline, active spoken word highlighted in bright gold `#facc15` with subtle `1.08x` pop, breaking cleanly at sentence punctuation or `> 0.5 s` pauses—matching `ui2d.js` `captions()`). Layer subtle ambient drone BGM (`volume ~0.26–0.28`) with transition SFX (`whoosh`, `sonar-ping`, `abyss-hit`) at `-14 LUFS`.
7. **Frame-Based Determinism & QA Gate.** Derive all Ken Burns pans, spring animations, gauge pointers, and particle drifts from Remotion `useCurrentFrame()` (never `Math.random()` or `Date.now()`). Verify with `ffprobe` + contact-sheet inspection before delivery.

## Stage 1: Intake (Skip What Is Known)
Confirm:
- **Topic & Scale Axis:** e.g. Ocean depth (`0 → 11.000 m`), Altitude/Space (`0 → 100 km+`), Historical timeline, or Anatomy/Size scale.
- **Format:** `9:16` Shorts (`45–75 s`) or `16:9` Long-form (`3–18 min`).
- **Media Source:** Open-source real media (NOAA/Wikimedia/NASA) or user-supplied clips.
- **Voiceover:** Vbee TTS (via GitHub Actions / local WAV) or music + caption demo.

## Stage 2: Media Sourcing & Relevance Audit
Read `references/hud-patterns.md` for the Wikimedia/Wikipedia REST API downloader pattern.
- Store verified assets in `public/images/<slug>/` (and audio in `public/audio/<slug>/`).
- Inspect every image dimensions and subject visually (`read_file` on image or contact sheet) to confirm subject accuracy, dark/clean framing, and zero watermarks.

## Stage 3: Scaffold & Timeline (`remotion-ai-agentic-studio`)
```bash
npm run video:new -- --slug <slug> --id <PascalCaseId> --scenes <N>
```
- Update `src/videos/<slug>/index.ts`: set `width: 1080, height: 1920` (9:16) or `width: 1920, height: 1080` (16:9), `fps: 30`.
- If Vbee audio exists, run `npm run voice:measure -- <slug> --out src/videos/<slug>/voice-durations.ts` and lock `timeline.ts` to measured frames.

## Stage 4: Build HUD Kit & Scenes
Implement `src/videos/<slug>/kit.tsx` using the patterns in `references/hud-patterns.md`:
- `DepthGaugeHud` / `ScaleGaugeHud`: piecewise-linear scale mapping (`0 → 200 → 1.000 → 4.000 → 6.000 → 11.000`) with smooth pointer interpolation (`#facc15` dot + triangle).
- `GoldLowerThird`: dark translucent card (`rgba(6, 11, 24, 0.86)`) with `6–8 px` `#f59e0b` left border and spring entrance.
- `WordHighlightCaption`: 3–4 word uppercase phrase centered in the lower safe zone (`bottom: 430` in 9:16 above `GoldLowerThird`, or `bottom: 185` in 16:9), white fill with thick black stroke, active spoken word highlighted in `#facc15` matching `words.json` timestamps.
- `OceanBuildingInfographic`: animated surface wave + color-graded tier cards revealing sequentially.
- `KenBurnsMedia` + `MarineSnowLayer`: smooth scale/translate pan + radial vignette + deterministic drifting particles.

## Stage 5: Verify, Render & Visual Inspection
```bash
npm run format && npm run lint && npm run format:check && npm run typecheck && npm run assets:validate
npx vitest run tests/videos/<slug>.test.ts
npx remotion render src/index.ts <CompositionId> out/<slug>.mp4 --log=error
```
Then verify the rendered MP4:
```bash
ffprobe -v error -show_entries format=duration,size -show_entries stream=codec_type,codec_name,width,height,r_frame_rate -of default=noprint_wrappers=1 out/<slug>.mp4
ffmpeg -y -i out/<slug>.mp4 -vf "fps=1/10,scale=480:-1,tile=3x2" -frames:v 1 /tmp/<slug>_grid.png
```
Inspect the contact sheet to confirm zero text overlap, readable captions, accurate pointer positions, and clean safe areas.

## Stage 6: Packaging & Delivery
- Deliver `out/<slug>.mp4` (or upload to Google Drive `Videos-shorts` when requested per `AGENTS.md`).
- Keep `src/videos/<slug>/` isolated and registered only in `src/videos/registry.ts`.
