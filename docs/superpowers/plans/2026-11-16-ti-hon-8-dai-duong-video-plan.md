# Ti Hon: Surviving 8 Prehistoric Oceans (16:9 Mascot Explainer) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a publication-ready, 1920x1080 (16:9), 24 fps animated explainer video (~8m02s / 481.5s) driven 100% by the user's uploaded Vbee Minh Quân audio using the `thanhhai-2d-studio` `mascot-explainer` + `make-2d-video` engine, featuring Mascot v0.7 ("Tí Hon"), 9 distinct underwater/beach environments, 8 prehistoric marine predators + modern blue whale/crab, custom ocean/comedy SFX, and verified Google Drive delivery.

**Architecture:** Build a new isolated project `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/` (leaving the earlier `projects/ti-rex-bo-tui` untouched). Whisper (`tools/transcribe.py` with `--script`) aligns all 73 narration paragraphs and word/viseme timings to the real 481.488s MP3; a deterministic shot-splitting planner subdivides long paragraphs into ~135 contiguous visual beats (median 2.5-3.8s, 0 `shot_lint.py --strict` warnings) split across modular JS scene files (`cast.js`, `props.js`, `sets/oceans.js`, `creatures.js`, and 6 act shot modules). Custom procedural WAV SFX supplement `audio/sfx.py` and `audio/music.py` in `audio/mix.py` at -14 LUFS before headless Chromium rendering and Drive archival.

**Tech Stack:** Node.js v22, Playwright Chromium (`thanhhai-2d-studio/render.mjs`), HTML5 Canvas 2D + `engine/{core,styles,rig2d,motion,fx2d,ui2d,explainer}.js`, Python 3.12 (`faster-whisper`, `numpy`, `scipy`, `tools/{transcribe,visemes,shot_lint}.py`, `audio/{dsp,sfx,music,mix}.py`), FFmpeg/FFprobe 9.0.1, `gdrive` CLI.

**Spec:** User screenplay (73 scene rows `#1`–`#72` including `#33b`, `#59b`; `#69` omitted) + uploaded Vbee Minh Quân 1.1x MP3 (`/Users/nguyenanhnhut/.gemini/antigravity/brain/3eddf361-0b9f-4c14-88be-88169dec8a4a/.user_uploaded/uploaded_media_1794845975402.mp3`, `481.488s`, `24000 Hz`, mono, `7,352,109` bytes) + `plugins/thanh-hai-learn-ai-2d-studio/skills/mascot-explainer/SKILL.md` + `docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md`.

---

## Global Constraints

- **Aspect, Resolution & FPS:** `16:9`, `1920x1080` (`1080p`), `24 fps`, H.264 (`crf 18`, `yuv420p`), AAC stereo audio normalized to `-14 LUFS`.
- **Narration Fidelity:** Keep all 73 Vbee narration paragraphs verbatim from the final Vbee block; never estimate durations — every shot boundary must come from `timeline/words.json` aligned to the uploaded `481.488s` MP3 (`>= 90%` word match).
- **Mascot v0.7 Identity ("Tí Hon"):** Green T-Rex, super-short arms, **orange scarf** with trailing `swing` physics, **helmet with glowing red `"VỀ NHÀ"` button on top**, agile tail reaching up (`tailPress`) to press the button, 7-shape Vietnamese lip-sync (`visemeAt`), `act()` anticipation/arcs/overshoot, `boilPose` for panic, cartoon-only damage (bandages, slime, freeze-frame cutaways — zero blood/gore).
- **Recurring Props & HUDs:**
  - 3 floats in order: yellow duck float (lost in #2) -> red-white striped ring float (bitten in #3 & shown in Cold Open #1) -> riveted gray iron float (sawed in half in #4).
  - Top-left **Survival Clock** (black box, yellow border, tabular digits; runs on splash, shows `∞` in #1, stops per round, freezes/cracks at `0:08` in #8).
  - Top-right **Lost Float Counter** (`PHAO ĐÃ MẤT: 0 -> 1 -> 2 -> 3`) using `tally` spring pop from Ocean #2 onward.
  - Time portal vortex (blue-purple swirl) at ocean entry/exit.
- **9 Distinct Environments:** Studio (`studio`), 1 Cambri (clear turquoise, yellow sand), 2 Ordovici (deep blue, angled rays), 3 Devon (dark moss green, muddy brown), 4 Permi (steel gray, orange industrial glow), 5 Tam Điệp (vast empty open blue), 6 Jura (near-black deep blue), 7 Phấn Trắng (cloudy turquoise shallow sea), 8 Mai ô xen (black-blue storm waves, gray sky), Present (sunny golden beach, clear water).
- **Typography & Safe Areas:** Vietnamese diacritics rendered cleanly (`Nunito` / `Montserrat` via `FONTS.ui`); burned-in `captions: true` kept in bottom strip (`y >= 1015`), all cards/labels/props kept clear of bottom subtitles (`y <= 930`) and HUD corners.
- **Determinism & Lint:** Zero `Math.random()` or `Date.now()` in any scene module (`rng()` / `noise()` only); `tools/shot_lint.py --strict` must pass `0 error(s), 0 warning(s)`.
- **Visual QC & Delivery:** Inspect every `--sheet` contact sheet PNG and key `--stills` before full render; create dedicated 16:9 `thumbnail-youtube.png` (never a raw frame with subtitles, clean bottom-right corner); deliver `video-final.mp4`, `thumbnail-youtube.png`, and `youtube-title-description.txt` to sequential folder `<N>. Tớ Sống Được Bao Lâu Ở Mỗi Đại Dương Tiền Sử - YYYY-MM-DD` inside Google Drive `Videos-shorts` (`1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`) using `--max 0`; no GitHub Release binaries and no auto-publishing.

## Review Focus

- **Script-to-Audio Alignment Drift on Phonetic Loanwords:** Vbee script spells species phonetically (`"A nô ma lô ca rít"`, `"En đô xê rát"`, `"Đăng cờ lơ ốt tê út"`, `"Hê li cô prai ôn"`, `"Xim bô xpôn đi lớt"`, `"Pờ li ô xo"`, `"Xi phắc ti nớt"`, `"Li vi a tan"`), whereas Whisper transcribes Latin spellings (`Anomalocaris`, `Endoceras`, `Helicoprion`, etc.). Task 1 & 2 verify word alignment anchors on non-loanword tokens around each cue so no beat shifts across the 8-minute timeline.
- **On-Screen Text vs Burned-In Caption Overlap:** With `captions: true`, `ui2d.captions` occupies the bottom center band (`~y=960-1060`). Task 3, 7, and 8 enforce a strict layout ceiling (`y <= 915`) for scale bars, comic signs, and news banners, verified by visual inspection of all contact sheets.
- **Shot Pacing Lint Failures on Multi-Sentence Paragraphs:** Several narration paragraphs run 9–16s (e.g. #16, #23, #29, #37, #49, #57). Task 2 splits them at Whisper sentence/clause timestamps into 2–4 sub-shots (`<= 6.5s` each) with alternating `size` tags so `shot_lint.py --strict` passes with zero `long-shot`, `repeat-size`, or `pacing` warnings.
- **Scene 1 vs Scene 21 Continuity & Mascot v0.7 Consistency:** Cold Open (#1–#2) takes place inside Ocean #3 (Devon moss-green water, red-white striped float, Dunkleosteus shadow) and must match Scene #21 visually when Tí Hon returns there. Task 7 shares the exact camera/float/Dunkleosteus parameters between `c00` and `s21`.
- **Long Render Time & Audio/Video Sync Drift (481.5s @ 24fps = ~11,556 frames):** Task 6 validates audio mix duration (`~481.5s`) before rendering, and Task 9 verifies `ffprobe` stream durations match within `< 0.1s` plus silence/black/freeze checks on the final MP4.

---

## File Structure

- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/config.json` — project config (`16:9`, `1080p`, `24 fps`, `vi`, `captions: true`, `-14 LUFS`)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/input/voiceover.mp3` — exact uploaded 481.488s Vbee MP3
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/input/script.txt` — exact 73-paragraph Vbee narration text
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/timeline/{words.json,sentences.json,transcript.txt,visemes.json}` — Whisper word/viseme timings
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/{sources.md,bible.md,shots.json,lint.json}` — verified scientific facts, Mascot v0.7 bible, ~135-shot plan
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/tools_build_shots.py` — deterministic script-paragraph + sub-beat shot planner reading `words.json`
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/audio_custom.py` & `audio/*.wav` — bespoke procedural ocean/comedy WAV SFX (`dsp.py`)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/cast.js` — Mascot v0.7 `drawTiHon` + `bigFaceTiHon`
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/props.js` — 3 floats, time portal, survival clock HUD, lost-float `tally`, scale silhouettes (human 1.7m, 7-seat car, bus), fossil/CT/X-ray/newspaper/chalkboard/ranking cards
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/sets/oceans.js` — 10 parallax environments (`studio`, 8 prehistoric oceans, `hientai` beach)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/creatures.js` — 8 prehistoric sea creatures + blue whale + krill + crab
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/01_intro.js` — Cold Open & Intro (#1–#6)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/02_oceans_1_2.js` — Cambri & Ordovici (#7–#20)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/03_oceans_3_4.js` — Devon & Permi (#21–#33b)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/04_oceans_5_6.js` — Tam Điệp & Jura (#34–#46)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/05_oceans_7_8.js` — Phấn Trắng & Mai ô xen (#47–#62)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/06_outro.js` — Present Beach, Ranked Recap & CTA (#63–#72)
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/thumbnail.mjs` — standalone 1920x1080 high-CTR thumbnail renderer -> `out/thumbnail-youtube.png`
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/out/youtube-title-description.txt` — UTF-8 YouTube metadata + chapters
- `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/out/video-final.mp4` — final QA-verified 1080p MP4

---

### Task 1: Project Initialization, Audio Ingestion, Whisper Alignment & Visemes

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/config.json`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/input/voiceover.mp3`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/input/script.txt`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/timeline/words.json`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/timeline/sentences.json`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/timeline/transcript.txt`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/timeline/visemes.json`

**Interfaces:**
- Consumes: `/Users/nguyenanhnhut/.gemini/antigravity/brain/3eddf361-0b9f-4c14-88be-88169dec8a4a/.user_uploaded/uploaded_media_1794845975402.mp3`, verbatim 73-paragraph Vbee script
- Produces: `config.json` (`duration: 481.49`), `timeline/{words.json,sentences.json,visemes.json}`

- [ ] **Step 1: Scaffold the new project without touching `projects/ti-rex-bo-tui`**

Run inside `thanhhai-2d-studio/`:
```bash
python3 tools/new_project.py \
  --name ti-hon-8-dai-duong \
  --voice "/Users/nguyenanhnhut/.gemini/antigravity/brain/3eddf361-0b9f-4c14-88be-88169dec8a4a/.user_uploaded/uploaded_media_1794845975402.mp3" \
  --aspect 16:9 --resolution 1080p \
  --title "Tớ Sống Được Bao Lâu Ở Mỗi Đại Dương Tiền Sử?" \
  --lang vi --captions
```
Expected: Creates `projects/ti-hon-8-dai-duong/config.json` with `"duration": 481.49` (or `481.488`) and copies the MP3 to `input/voiceover.mp3`.

- [ ] **Step 2: Write verbatim 73-paragraph `input/script.txt` and tune `config.json` caption/audio settings**

Write all 73 paragraphs from `Lời đọc Vbee bản final` separated by blank lines into `projects/ti-hon-8-dai-duong/input/script.txt`. Update `config.json` to set `"script": "input/script.txt"`, `"style": "midnight"`, `"fps": 24`, `"bars": null`, `"captionStyle": {"y": 1022, "size": 34, "max": 9}`, `"music": {"enabled": true, "gainDb": -17, "seed": 42}`, `"sfx": {"enabled": true, "gainDb": -6}`, `"loudness": -14`.

- [ ] **Step 3: Run Whisper word alignment and Vietnamese viseme extraction**

Run inside `thanhhai-2d-studio/`:
```bash
python3 tools/transcribe.py --project projects/ti-hon-8-dai-duong --script projects/ti-hon-8-dai-duong/input/script.txt --lang vi --model small
python3 tools/visemes.py --project projects/ti-hon-8-dai-duong
```
Expected: `script alignment: ... (>= 90%)`, `timeline/transcript.txt` ends near `481s`, and `timeline/visemes.json` is written.

- [ ] **Step 4: Verify paragraph-boundary integrity against `words.json`**

Run a short Python check verifying:
- `len(paragraphs) == 73`
- Word count of `words.json` equals total tokenized words of `input/script.txt`
- Every paragraph's `[start, end]` span is strictly monotonic and inside `[0, 481.49]`
- All phonetic species tokens (`A nô ma lô ca rít`, `En đô xê rát`, etc.) have valid interpolated timestamps flanked by matched Vietnamese anchor words (`"Đây là"`, `"Một trong"`, `"Mãi đến"`, etc.).

---

### Task 2: Scientific Sources, Mascot v0.7 Production Bible & Contiguous Shot Plan

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/sources.md`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/bible.md`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/tools_build_shots.py`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/shots.json`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/lint.json`

**Interfaces:**
- Consumes: `timeline/{words.json,sentences.json}`, `config.json`, 73-row scene spec
- Produces: `story/shots.json` (~135 contiguous shots covering `0.000` -> `482.988`, `music` array, per-shot `sfx`, `amb`, `params`), `story/bible.md`, `story/sources.md`

- [ ] **Step 1: Verify scientific claims via `search_web` and write `story/sources.md`**

Fact-check and cite primary sources/paleontology papers for all numeric claims in the script:
1. *Anomalocaris canadensis* (~508 Ma Burgess Shale, ~38 cm body excluding frontal appendages/tail fan, ~18 cm appendages, soft-prey preference).
2. *Endoceras* (~470 Ma Ordovician, 3 m fossil specimen, ~5.7 m 2015 estimated full shell length).
3. *Dunkleosteus terrelli* (~360 Ma Devonian, armored head shield + shearing bone blades, 2023 Engelman ~3.4–4 m chunkier reassessment vs older 5–10 m estimates).
4. *Helicoprion* (~270 Ma Permian, 5–8 m ratfish/chimaera relative, 2013 Idaho CT scan confirming lower-jaw tooth whorl).
5. *Cymbospondylus youngorum* (~246 Ma Triassic, >17 m, ~2 m skull, ~3M-year rapid gigantism after Permian extinction).
6. *Pliosaur* (~150 Ma Jurassic, 2023 Dorset 2 m skull with ~130 teeth, >12 m max pliosaurs).
7. *Xiphactinus audax* (~>80 Ma Cretaceous Western Interior Seaway, 5–6 m, Sternberg "fish-within-a-fish" 4.2 m / 1.9 m specimen).
8. *Livyatan melvillei* (~10 Ma Miocene Peru, 13.5–17.5 m, functional teeth on both jaws up to ~36 cm vs ~27 cm T-Rex crown/root tooth).
9. Blue Whale (*Balaenoptera musculus*) largest known animal, krill diet.

- [ ] **Step 2: Author `story/bible.md` locking Mascot v0.7 & 9-Ocean Visual Spec**

Document character proportions, hex palettes for all 9 worlds + Studio, 3-float progression, survival clock rules, HUD safe zones (`y <= 150` top corners, `y <= 915` bottom clear of captions), and scientific name on-screen badges.

- [ ] **Step 3: Write `tools_build_shots.py` to generate `story/shots.json` from real `words.json` boundaries**

Map each of the 73 script paragraphs to its exact `[start, end]` span in `words.json` (plus `1.5s` end buffer on shot #72 to match `total = duration + 1.5`), and split multi-beat paragraphs at exact sentence/clause word timestamps into **~135 sub-shots** so:
- Shot #1 splits into `c00a` (`0.0s -> ~3.4s`, `size: "wide"`, Devon moss sea + Tí Hon tiny on striped float) and `c00b` (`~3.4s -> end of #1`, `size: "close"`, camera dives underwater + giant Dunkleosteus shadow turns toward Tí Hon's feet) so `hook-slow` (`durs[0] > 4`) never triggers!
- Every multi-beat scene (#4, #5, #6, #7, #9, #10, #12, #14, #16, #17, #21, #22, #23, #26, #27, #29, #30, #32, #33b, #34, #36, #37, #39, #40, #41, #42, #43, #44, #46, #47, #48, #49, #51, #52, #54, #56, #57, #59, #59b, #61, #62, #63, #64, #67, #68, #70, #71, #72) splits cleanly into `2.0s–6.2s` sub-shots aligned to spoken clauses.
- No two consecutive shots exceed 3 of the same `size` (`wide`, `medium`, `close`, `insert`, `ots`, `top`, `data`, `blueprint`, `freeze`, `3d`, `title`, `end`).
- Every shot stores `params`: `{ sceneRef, beat, ocean, clockMode, clockText, lostFloats, bandages, onScreenText, ... }` plus exact `sfx`, `amb`, `in` transition (`cut|fade|dip|flash|whip|zoom`), and contiguous 12-segment `music` arc (`tension` -> `playful` -> `wonder` -> `mystery` -> `tension` -> `action` -> `dark` -> `playful` -> `epic` -> `calm` -> `triumph`).

- [ ] **Step 4: Run `shot_lint.py --strict` and verify zero errors & zero warnings**

Run inside `thanhhai-2d-studio/`:
```bash
python3 projects/ti-hon-8-dai-duong/tools_build_shots.py
python3 tools/shot_lint.py --project projects/ti-hon-8-dai-duong --strict
```
Expected: Exit code `0`, `0 error(s), 0 warning(s)`, median shot duration in `[2.2s, 3.8s]`, max shot `<= 6.5s`, first shot `<= 3.8s`.

---

### Task 3: Mascot v0.7 ("Tí Hon"), 3 Floats, Survival Clock HUD & Shared Props (`cast.js`, `props.js`)

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/cast.js`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/props.js`

**Interfaces:**
- Consumes: `/engine/{core,rig2d,motion,explainer,ui2d}.js`
- Produces:
  - `cast.js`: `drawTiHon(g, o)`, `bigFaceTiHon(g, x, y, r, o)`
  - `props.js`: `drawFloat(g, kind, o)`, `drawTimePortal(g, x, y, r, t, o)`, `drawSurvivalClock(g, info, o)`, `drawFloatTally(g, count, since)`, `drawScaleSilhouette(g, kind, x, y, s, label)`, `drawFossilCard(g, kind, t, o)`, `drawOceanStrip(g, t, o)`, `drawHud(g, info, state)`

- [ ] **Step 1: Implement `drawTiHon` & `bigFaceTiHon` (Mascot v0.7) in `scenes/cast.js`**

Include every v0.7 visual signature:
- Green chubby T-Rex silhouette (`#4fb856` / `#368a3d`), cream belly (`#f2eab0`), small orange dorsal ridges (`#ff8c3a`), crisp ink outline (`#0e1410`) + dynamic rim-light matching current ocean key light.
- **Orange scarf (`#f97316` with `#fb923c` highlight + `#c2410c` knot)** wrapped around neck with dual trailing ends driven by `swing` / `sin(t)` follow-through.
- **Safety helmet (`#eab308` dome + `#334155` visor brim + `#94a3b8` rim band)** with glowing red **"VỀ NHÀ"** button (`#ef4444`) on top that depresses when `tailPress > 0.85`, plus optional **headlamp beam** (`headlamp: true`) for Ocean #6 dark stomach scene (#45) and **goggles + labcoat** (`costume: 'scientist'`) for Intro #4.
- **Super-short T-Rex arms** (`poses`: `idle`, `talk`, `explain`, `point`, `panic`, `reach`, `wave`, `float`, `dogpaddle`, `shrug`, `celebrate`, `count`, `pointerStick`, `holdPhoto`, `coverHead`) + agile tail (`tailPress` `0..1` curving up over head to smash the red button).
- Full 7-shape Vietnamese lip-sync (`A|O|U|E|M|F|rest`), `exprAt` cross-fading (`happy|joy|smirk|shocked|scared|cry|worried|dizzy|determined|proud|confused`), `blink`, `saccade` eye look, `boilPose` shaking, `squash` impact compression, `bandages` (cross-bandage on head in #63), and `slime` drips (greenish goo in #40).

- [ ] **Step 2: Implement `scenes/props.js` (3 Floats, HUDs, Portals, Scales & Visual Gags)**

Build reusable frame-deterministic prop renderers:
- `drawFloat`: `'duck'` (yellow rubber duck ring with beak & wing), `'striped'` (red-white lifebuoy + `'broken'` torn debris mode), `'iron'` (riveted steel ring + `'halved'` sawed two-piece mode).
- `drawTimePortal`: animated blue-purple swirling vortex with dashed counter-rotating rings + suction rays.
- `drawSurvivalClock`: top-left (`x=36, y=28`) black panel with crisp `#FACC15` border, live tabular `MM:SS` readout, `stopped` stamp flash, `infinite` (`∞`) gold glow, and `cracked` (`0:08` shattered glass overlay for #61).
- `drawFloatTally`: top-right (`x=E.W-36, y=64`) using `tally`-style spring pop for `"PHAO ĐÃ MẤT: X"`.
- `drawScaleSilhouette`: `human` (1.7m gray silhouette + ankle marker for #3, outstretched arm for #10), `car7` (7-seat SUV ~4.7m), `bus` (school bus ~10m), `tiHonTiny`.
- `drawOceanStrip`, `drawDangerCard` (wrapping `explainer.dangerCard` in safe zone), `drawNewspaper`, `drawCtScan`, `drawXrayFossil`, `drawChalkboard`, `drawLeaderboard`.

- [ ] **Step 3: Smoke-render Mascot v0.7 + all 3 floats + HUDs via `render.mjs --stills`**

Create a temporary smoke shot or run after Task 4/7 stub and inspect PNG with `read_file` to verify Tí Hon's orange scarf, `"VỀ NHÀ"` helmet button, short arms, and zero overlap with bottom subtitle area (`y >= 950`).

---

### Task 4: 9 Distinct Worlds & Studio Backdrop (`scenes/sets/oceans.js`)

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/sets/oceans.js`

**Interfaces:**
- Consumes: `/engine/{core,fx2d}.js`
- Produces: `drawOceanWorld(g, worldId, t, cam, opts)` returning `{ rim, waterY, accent, palette }`

- [ ] **Step 1: Implement all 10 multi-plane parallax worlds matching the script's color/mood table**

Each world uses 3 parallax layers (`cam` depth `0.15`, `0.45`, `0.9`) with animated caustics/bubbles/particles (`rng` seeded, zero `Math.random`):
- `studio`: Clean bright sci-fi studio backdrop with ruler height chart & soft rim light (#3–#6).
- `cambri`: Clear turquoise `#0ea5e9 -> #2dd4bf`, golden sand seabed, plus surface cut (`surfaceMode: true`) showing barren rocky land with zero trees/dinosaurs (#7).
- `ordovici`: Deep sapphire `#0c2461 -> #1e40af`, angled volumetric god-rays, drifting plankton (#14–#20).
- `devon`: Dark moss green `#0f2e22 -> #1f4432`, murky brown silt seabed (#1–#2, #21–#26).
- `permi`: Industrial steel-gray `#1f2937 -> #374151`, warm amber/orange rim shafts (#27–#33b).
- `tamdiep`: Vast open cerulean `#0369a1 -> #0c4a6e`, eerily empty horizon & deep void below (#34–#40).
- `jura`: Abyssal near-black `#020617 -> #0b1a36`, plus `cliffDigMode` for 2023 UK Dorset cliff excavation & `mouthDarkMode` for inside Pliosaur's pitch-black jaws (#41–#46).
- `phantrang`: Cloudy shallow teal-green `#0d9488 -> #115e59`, limestone shelves + US map inset (#47–#53).
- `maioxen`: Stormy black-blue `#020617 -> #0f172a`, churning whitecap waves, gray storm sky, distant Peru coast (#54–#62).
- `hientai`: Sunny golden beach sky, warm sand shore, sparkling turquoise waves, distant horizon (#63–#72).

- [ ] **Step 2: Verify palette distinctness across all 10 worlds**

Ensure adjacent oceans have unmistakable hue/value contrast so viewers immediately recognize where Tí Hon is when scrubbing the timeline.

---

### Task 5: 8 Prehistoric Marine Creature Rigs + Blue Whale & Crab (`scenes/creatures.js`)

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/creatures.js`

**Interfaces:**
- Consumes: `/engine/core.js`
- Produces: `drawCreature(g, kind, o)` for `'anomalocaris' | 'endoceras' | 'dunkleosteus' | 'helicoprion' | 'cymbospondylus' | 'pliosaur' | 'xiphactinus' | 'livyatan' | 'bluewhale' | 'crab' | 'krill'`

- [ ] **Step 1: Build high-detail articulated 2.5D vector rigs for Oceans 1–4**

- `anomalocaris`: Segmented swimming lobes (`sin` wave), lateral tail fan, **two stalked compound eyes** (`look` direction), **two jointed spiny frontal appendages** with animated pinch (`pinch: 0..1`).
- `endoceras`: Long straight **conical shell** with chambered bands + dashed reconstruction mode (`dashedGhost: true` for 3m -> 5.7m reveal), **waving bundle of tentacles** (`sin` per tentacle).
- `dunkleosteus`: Heavy articulated **metallic armored skull plates** with specular sheen, **shearing bone blades** (no regular teeth), wide `jawOpen`, plus `chubbyRatio` (`0..1`) that smoothly morphs body from 5–10m sleek to 2023 chubby 4m ("Đăng mũm mĩm").
- `helicoprion`: Ratfish-like cartilaginous body, **animated spiral lower-jaw tooth-whorl** (`whorlRot`, `showGrowthCycle`, `whorlMode: 'jaw' | 'back' | 'tail'` for the 100-year placement gag!).

- [ ] **Step 2: Build high-detail articulated 2.5D vector rigs for Oceans 5–8 + Present**

- `cymbospondylus`: Sleek 17m+ dolphin-like ichthyosaur with elongated 2m snout, dorsal/caudal fins, submarine overhead silhouette mode (`shadowMode: true`).
- `pliosaur`: Massive 2m head on short muscular neck, **4 large paddle flippers** (`paddlePhase`), ~130-tooth hinged jaws (`jawOpen`), plus skeletal skull mode for 2023 UK excavation.
- `xiphactinus`: Giant silver tarpon-like bony fish, bulldog upturned lower jaw with jagged fangs, gulp animation, sweat-drop reaction mode (#52).
- `livyatan`: Massive prehistoric sperm whale with squared spermaceti melon, **blowhole spray** (`spray: 0..1`), **interlocking giant teeth on BOTH upper and lower jaws** (`jawOpen`), plus comparative 36cm vs 27cm T-Rex tooth props.
- `bluewhale` (pleated throat, huge tail fluke, baleen filter-feeding krill swarm) + `crab` (sideways scuttling on beach).

---

### Task 6: Custom Procedural SFX & Multi-Mood Audio Mix Verification (`audio_custom.py`)

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/audio_custom.py`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/audio/*.wav` (`splash.wav`, `bubbles.wav`, `quack.wav`, `crunch.wav`, `clang.wav`, `chainsaw.wav`, `sonar.wav`, `gulp.wav`, `glass_crack.wav`, `chalk.wav`, `card_flip.wav`, `boing.wav`, `rewind.wav`)

**Interfaces:**
- Consumes: `thanhhai-2d-studio/audio/dsp.py`, `story/shots.json`, `config.json`
- Produces: `audio/*.wav`, `build/music.wav`, `build/mix.wav`

- [ ] **Step 1: Write `audio_custom.py` using `audio/dsp.py` primitives**

Synthesize crisp, non-clipping 48 kHz stereo WAV SFX normalized to `-2 dBFS` matching every comedy/action beat in the script (rubber duck `"quác"`, iron float `"keng/coong"`, Helicoprion `"rrrrr"` metal saw, submarine `"píng"` sonar, `"rắc"` bone/float snap, `"RẦM"` chomp + clock glass shatter, `"boing"` spring, `"tua băng"` rewind).

- [ ] **Step 2: Run audio-only mix and validate duration, loudness, and ducking**

Run inside `thanhhai-2d-studio/`:
```bash
python3 projects/ti-hon-8-dai-duong/audio_custom.py
python3 audio/mix.py --project projects/ti-hon-8-dai-duong
ffprobe -v error -show_entries format=duration -of json projects/ti-hon-8-dai-duong/build/mix.wav
```
Expected: `mix.wav` duration matches `shots.json` duration (`~482.99s`), zero missing SFX paths, voice clearly intelligible over `-17 dB` music + `-9 dB` ducking.

---

### Task 7: Scene Modules — Intro & Oceans 1–4 (`01_intro.js`, `02_oceans_1_2.js`, `03_oceans_3_4.js`)

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/01_intro.js`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/02_oceans_1_2.js`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/03_oceans_3_4.js`

**Interfaces:**
- Consumes: `cast.js`, `props.js`, `sets/oceans.js`, `creatures.js`, `story/shots.json`
- Produces: Registered shots for Cold Open (#1–#2), Rewind & Rules (#3–#6), Ocean #1 Cambri (#7–#13), Ocean #2 Ordovici (#14–#20), Ocean #3 Devon (#21–#26), Ocean #4 Permi (#27–#33b).

- [ ] **Step 1: Implement `01_intro.js` (#1–#6)**

Include: no-logo immediate Cold Open in moss-green Devon sea on red-white striped float + underwater Dunkleosteus shadow (#1), panicked spin + short arms failing to reach helmet button + **freeze-frame** right before bite (#2), VHS rewind glitch into bright studio with ankle-height ruler (#3), goggles+labcoat + 8-ocean color strip + survival clock drop (#4), pop-in duck float / humming portal / red button + tail-press gag (#5), `"THẬT"` paper stamp / `"TỚ TỰ BẤM"` clock stamp / `0:08` shaking clock + blinking red Ocean #8 cell (#6).

- [ ] **Step 2: Implement `02_oceans_1_2.js` (#7–#20)**

Include: `#1 CAMBRI` card + portal splash + barren rocky land check with no trees (#7), stalked-eye shrimp approach (#8), `dangerCard` *Anomalocaris* + 18 cm ruler on spiny claws (#9), 38 cm vs adult forearm scale + Tí Hon still shorter (#10), thought-bubble soft worm ♥ vs hard shell ✕ (#11), double pinch (`"KẸP!" ×2`, `"CHÊ!"`) + proud head-knock (#12), `"∞ VÔ HẠN"` clock stamp + tail button suction (#13); `#2 ORDOVICI` electric-pole shell reveal to waving tentacles (#14), *Endoceras* squid/octopus family tree + `dangerCard` (#15), 3 m museum fossil -> dashed 5.7 m extension -> `"DÀI NHẤT"` medal (#16), > 7-seat car comparison (#17), tentacle hug 3-shake `"ĐỪNG ÔM!"` (#18), duck float decoy escape (#19), `12:00` clock + **`PHAO ĐÃ MẤT: 1`** + sinking duck float waving goodbye (#20).

- [ ] **Step 3: Implement `03_oceans_3_4.js` (#21–#33b)**

Include: `#3 DEVON` callback matching Cold Open exact framing (#21), *Dunkleosteus* metallic head + normal teeth ✕ vs bone blades ✓ (#22), old `"5-10 m"` book -> `"2023: ≈ 4 m"` chubby balloon morph -> `"ĐĂNG MŨM MĨM"` newspaper (#23), sinister POV from inside open jaws (#24), `"RẮC!"` impact frame + torn striped float shards (#25), `4:00` clock + **`PHAO ĐÃ MẤT: 2`** + crossing out `"MŨM MĨM"` -> `"NGUY HIỂM"` (#26); `#4 PERMI` riveted iron float clank + smug Tí Hon (#27), spinning tooth-whorl wake (#28), *Helicoprion* + ratfish tree + bus scale + spiral tooth-growth animation (#29), 100-year placement gag (back `?` -> tail `?` -> 2013 CT blue scan into lower jaw ✓) (#30), sparks flying off iron float (#31), sawed-in-half float + flashback X over `"Cắn đi"` (#32), `2:30` clock + **`PHAO ĐÃ MẤT: 3`** + dizzy eyes (#33), mid-episode recap grid showing 3 crossed floats + 3 of remaining 4 monsters longer than a school bus (#33b).

- [ ] **Step 4: Render contact sheets for Intro & Oceans 1–4 and inspect visually**

Run `--sheet --scale 0.45` and inspect generated `build/sheets/sheet_*.png` files with `read_file` to verify zero `"MISSING"` shots, clean framing, readable cards, and zero subtitle collisions.

---

### Task 8: Scene Modules — Oceans 5–8, Present, Ranked Recap & CTA (`04_oceans_5_6.js`, `05_oceans_7_8.js`, `06_outro.js`)

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/04_oceans_5_6.js`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/05_oceans_7_8.js`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/06_outro.js`

**Interfaces:**
- Consumes: `cast.js`, `props.js`, `sets/oceans.js`, `creatures.js`, `story/shots.json`
- Produces: Registered shots for Ocean #5 Tam Điệp (#34–#40), Ocean #6 Jura (#41–#46), Ocean #7 Phấn Trắng (#47–#53), Ocean #8 Mai ô xen (#54–#62), Present (#63–#65), Ranked Recap & Next-Ep Teaser (#66–#72).

- [ ] **Step 1: Implement `04_oceans_5_6.js` (#34–#46)**

Include: `#5 TAM ĐIỆP` empty blue sea + sunglasses + quick `"ĐẠI TUYỆT CHỦNG"` flash (#34), giant submarine shadow below (#35), *Cymbospondylus* dolphin compare + camera pull-back to >17m + 2m head vs 1.7m human (#36), `"KHỔNG LỒ ĐẦU TIÊN"` medal + 3M-year timeline + evolution race vs whale (#37), menu `"MỰC · CÁ · BÒ SÁT NHỎ HƠN"` (#38), chalkboard `"BÒ SÁT ✓ + NHỎ HƠN ✓ = BỮA TRƯA"` (#39), swallow & spit-out with slime + `1:15` (#40); `#6 JURA` distant sauropod wave -> abyssal crown (#41), 2023 UK cliff dig revealing 2m skull + 130 teeth (#42), flesh regrowth + crown + 4-paddle *Pliosaur* > bus (#43), tooth counter `1 … 20` -> jaws snap shut to black (#44), pitch-black interior + helmet flashlight revealing fellow trapped fish waving (#45), tail poking between teeth to hit `"VỀ NHÀ"` + `0:40` + `"KỶ LỤC"` trophy (#46).

- [ ] **Step 2: Implement `05_oceans_7_8.js` (#47–#62)**

Include: `#7 PHẤN TRẮNG` US map split by shallow seaway (`"TỚ Ở ĐÂY"`) + pull-back to 6m fanged fish (#47), *Xiphactinus* chomping everything + museum `"CÁ TRONG CÁ"` frame (#48), X-ray 4.2m / 1.9m + cartoon tummy-ache X-eyes (#49), glasses + pointer chalkboard `"ĐỪNG NUỐT THỨ TO BẰNG NỬA NGƯỜI MÌNH"` (#50), lightbulb + holding up `"CÁ TRONG CÁ"` photo (#51), 3-beat look (photo -> Tí Hon -> sweat drop -> swims away) (#52), `3:00` + `"THẮNG BẰNG TRÍ KHÔN"` (#53); `#8 MIOCEN` shaking red `#8` card + callback `0:08` clock + South America Peru map + stormy waves on tiny float (#54), black dorsal surface + blowhole spray soaking Tí Hon (#55), *Livyatan* overflowing danger bar + dual-jaw vs modern sperm whale skull compare + > bus (#56), 36cm tooth thud vs 27cm T-Rex tooth + `"RĂNG CẮN LỚN NHẤT (không tính ngà)"` (#57), Tí Hon tiptoeing shorter than single tooth (#58), small whale fleeing + terrifying bottom-up open-jaw POV (#59), holding up `"CÁ TRONG CÁ"` photo -> chomped in half (`"CHIÊU CŨ: THẤT BẠI"`) (#59b), deadpan `0:01` clock (#60), white impact flash + cracked `0:08` clock + callback Scene #6 checkmark ✓ (#61), dark mouth interior with frantic 4-tap tail hitting `"VỀ NHÀ"` into swirling portal (#62).

- [ ] **Step 3: Implement `06_outro.js` (#63–#72)**

Include: Sunny beach landing with head cross-bandage + passing crab ignoring Tí Hon (#63), distant Blue Whale blowhole + lineup comparison longer than all 8 monsters + krill filter-feeding + `"TÍ HON"` word pop (#64), Tí Hon retreating to build sandcastle (#65), 8-row blank leaderboard sliding in (#66), staggered card flips for ranks `#8 ∞` down to `#3 1:15` (#67), rank `#2 0:40` + shaking glowing red `#1 0:08` Livyatan with Tí Hon hiding behind board (#68), 8-ocean clickable-style grid + vector speech bubble `"BẠN CHỌN ĐẠI DƯƠNG SỐ MẤY?"` (drawn icon, no emoji glyph dependency) (#70), red `"ĐĂNG KÝ"` button pressed by tail -> `"ĐÃ ĐĂNG KÝ"` bell callback (#71), orange apocalypse sky + glowing meteor streak across sky behind wide-eyed Tí Hon -> clean cut to black (`"TẬP SAU: NGÀY CUỐI CÙNG CỦA KHỦNG LONG"`) (#72).

- [ ] **Step 4: Run full contact sheets, motion stills, and 35s preview render**

Run inside `thanhhai-2d-studio/`:
```bash
node render.mjs --project projects/ti-hon-8-dai-duong --sheet --scale 0.45
node render.mjs --project projects/ti-hon-8-dai-duong --stills 1.2,4.5,14.5,142.0,210.0,395.0,425.0,478.0 --scale 0.6
node render.mjs --project projects/ti-hon-8-dai-duong --from 0 --to 35 --scale 0.5
```
Visually inspect ALL generated contact sheet PNGs (`sheet_01.png..sheet_N.png`) and key action stills via `read_file`, fixing any framing, text truncation, or visual glitches before full render.

---

### Task 9: High-CTR 16:9 Thumbnail, FullHD 1080p Render, Final Media QA & YouTube Metadata

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/thumbnail.mjs`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/out/thumbnail-youtube.png`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/out/youtube-title-description.txt`
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/out/video-final.mp4`

**Interfaces:**
- Consumes: `scenes/cast.js`, `scenes/creatures.js`, `scenes/sets/oceans.js`, `build/mix.wav`, `story/shots.json`
- Produces: `1920x1080` `thumbnail-youtube.png`, `1920x1080` `video-final.mp4` (H.264 + AAC `-14 LUFS`), UTF-8 `youtube-title-description.txt`

- [ ] **Step 1: Build and visually inspect dedicated 16:9 `thumbnail.mjs` -> `out/thumbnail-youtube.png`**

Render a dedicated `1920x1080` composition (zero bottom subtitles, bottom-right duration badge zone kept clean): close-up panicked Mascot v0.7 Tí Hon (orange scarf + `"VỀ NHÀ"` helmet) on tiny float filling left/center-left vs towering open-jawed *Livyatan* (36 cm teeth) on right in stormy red-lit sea, giant bold `"8 GIÂY?!"` hook text with thick black outline + red danger glow + pointing arrow. Inspect PNG with `read_file`.

- [ ] **Step 2: Run full 1080p 24fps render and audio-video mux**

Run inside `thanhhai-2d-studio/` (in background if needed, monitoring progress):
```bash
node render.mjs --project projects/ti-hon-8-dai-duong --workers 4 --crf 18
python3 audio/mix.py --project projects/ti-hon-8-dai-duong --video projects/ti-hon-8-dai-duong/build/video_silent.mp4 --out projects/ti-hon-8-dai-duong/out/video-final.mp4
```

- [ ] **Step 3: Run media QA on `out/video-final.mp4`**

Run `ffprobe` (`1920x1080`, `h264`, `24 fps`, `aac`, `duration ~483s`), `ffmpeg` `blackdetect` / `freezedetect` / `silencedetect` / `ebur128`, extract 1-frame-per-20s contact sheet from `out/video-final.mp4`, and inspect visually with `read_file`.

- [ ] **Step 4: Write UTF-8 `out/youtube-title-description.txt` with exact chapters from `shots.json`**

Include curiosity-driven accurate Vietnamese title, hook summary (without spoiling the #8 `8s` winner upfront or next-episode teaser), exact `MM:SS` chapter timestamps for all 8 oceans + present + ranking derived directly from `story/shots.json`, hashtags, and pinned comment prompt matching #70.

---

### Task 10: Google Drive Delivery (`Videos-shorts`) & Phase-2 Shorts Handoff Note

**Files:**
- None modified in repo (verified uploads to Google Drive parent `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`)

**Interfaces:**
- Consumes: `out/video-final.mp4`, `out/thumbnail-youtube.png`, `out/youtube-title-description.txt`
- Produces: Numbered Drive folder `<N>. Tớ Sống Được Bao Lâu Ở Mỗi Đại Dương Tiền Sử - YYYY-MM-DD` with all 3 verified Drive files + URLs

- [ ] **Step 1: Query ALL existing folders in `Videos-shorts` (`--max 0`) and allocate `N = max + 1`**

Run:
```bash
gdrive readonly ls 1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D --max 0 --json
```
Parse `^([1-9][0-9]*)\.\s+` across all returned folders to compute `N = max(IDs) + 1`.

- [ ] **Step 2: Create sequential folder and upload all 3 deliverables**

Create `<N>. Tớ Sống Được Bao Lâu Ở Mỗi Đại Dương Tiền Sử - <YYYY-MM-DD>` (Asia/Ho_Chi_Minh date) inside `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D` and upload `video-final.mp4`, `thumbnail-youtube.png`, and `youtube-title-description.txt`.

- [ ] **Step 3: Read back Drive metadata to verify nonzero bytes & URLs**

Run `gdrive readonly ls <new_folder_id> --json` and confirm all 3 files exist with exact nonzero byte sizes. Do NOT publish to YouTube/TikTok or create GitHub Releases.

- [ ] **Step 4: (Phase 2 — Optional Follow-Up) Note the 6 Vertical Shorts Cutdowns**

After the main 16:9 episode is approved, the 6 Shorts listed in the script (`54–62`, `27–33`, `21–26`, `41–46`, `47–53`, `7–13`) can be generated as separate `9:16` projects once the short opening hook & subscribe outro Vbee lines are synthesized.

---

## Self-Review Notes

1. **Spec coverage:** All 73 spoken rows (`#1`–`#68`, `#33b`, `#59b`, `#70`–`#72`), Mascot v0.7 traits (green T-Rex, short arms, orange scarf, `"VỀ NHÀ"` helmet button pressed by tail), 3 floats, survival clock, lost-float tally, all 9 palettes, all 8 creatures + blue whale + crab, custom SFX, 1080p MP4, 16:9 thumbnail, YouTube chapters, and Google Drive delivery are mapped to tasks.
2. **Type & path consistency:** Every task references `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/` and verified `engine/*.js` / `tools/*.py` / `audio/*.py` entrypoints.
3. **Timing honesty:** Audio duration (`481.488s`) comes from `ffprobe` on the uploaded MP3; estimated `10:03` timings in the original table are explicitly superseded by `timeline/words.json`.
