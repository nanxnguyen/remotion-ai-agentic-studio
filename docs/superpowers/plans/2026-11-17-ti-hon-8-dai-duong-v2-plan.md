# Ti Hon: 8 Prehistoric Oceans v2 Cinematic Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/` visuals, staging, camera work, 3D low-poly hero shots, and creature/mascot anatomy to cinematic quality matching the approved v2 Production Spec & Master Shot List, re-render 1080p MP4, and update the existing Google Drive folder `#54` deliverable.

**Architecture:** Keep the verified `481.488s` Vbee audio, `timeline/{words,sentences,visemes}.json`, and `audio/*.wav` + `build/mix.wav` intact (zero narration timing drift). Expand `tools_build_shots.py` to ~152–160 contiguous shots matching Part C of the Production Spec (`beatHold`, `twos`, `mblur: 5`, `blurLayer` DoF, 4 `three-kit.js` 3D shots, diverse OTS/POV/close/blueprint/freeze framings), upgrade `cast.js`, `props.js`, `sets/oceans.js`, and `creatures.js` with 2.5D gradient shading + rim lights + caustics + foreground blur, and rebuild `scenes/shots/*.js`.

**Tech Stack:** Node.js v22, Playwright Chromium (`render.mjs`), Canvas 2D + `three-kit.js` (`THREE` + UnrealBloom), `engine/{core,motion,fx2d,ui2d,explainer}.js`, Python 3.12 (`tools/shot_lint.py`, `audio/mix.py`), FFmpeg/FFprobe, `gdrive` CLI.

**Spec:** `/Users/nguyenanhnhut/Desktop/Projects/AI-video-edition/docs/superpowers/specs/2026-11-17-ti-hon-8-dai-duong-v2-production-spec.md`

## Global Constraints

- **Preserve Audio & Timing Truth:** Do not alter `input/voiceover.mp3` (`481.488s`), `input/script.txt` (73 paragraphs), or `timeline/*`. Every shot transition maps strictly to `timeline/words.json`.
- **16:9 Clean Output:** `1920x1080`, `24 fps`, `"bars": "none"`, `"style": "dusk"`, `"captions": true` (`y = 1005`, backed by a subtle bottom gradient scrim so subtitles read cleanly on bright sand/beach scenes without colliding with props kept at `y <= 905`).
- **Mascot v0.7 & Prop Continuity:** Green T-Rex with gradient shading, short arms, **orange scarf** with `swingFrom` physics, **helmet with glowing red `"VỀ NHÀ"` button**, tail press `tailPress`; 3 floats lost sequentially (`duck` -> `striped` -> `iron` -> `tiny`); `PHAO ĐÃ MẤT` shown from Ocean #2 (`#14`) onward.
- **Strict Shot Lint & Determinism:** `tools/shot_lint.py --strict` MUST exit `0` (`0 error(s), 0 warning(s)` — note: never combine `"timing": "twos"` and `"mblur"` on the same shot, keep `<= 3` `size: "freeze"` shots, keep shot durations in `0.5s..6.5s`). Zero `Math.random()` or `Date.now()`.
- **Drive Update Rule:** Update existing file(s) inside Drive folder `#54` (`19OCnw2cZ7EPhptrY5DEUp71Yag0jACYg`) using `gdrive mutate update` — never allocate a new numbered folder for a revision of the same video.

## Review Focus

- **3D WebGL (`three-kit.js`) + 2D `overlay()` Sync & SwiftShader Performance:** Verify all 4 `kind: '3d'` shots (`s04c`, `s29a`, `s42a`, `s72a`) boot cleanly in `player.js`, render deterministic camera `dolly`/`orbit` moves, composite cleanly under `overlay(g)` HUD/captions, and do not throw WebGL disposal errors across transitions.
- **`twos` vs `mblur` & `freeze` Cap Lint Traps:** `shot_lint.py --strict` warns if `size == 'freeze'` exceeds 3 total shots or if a shot combines `"timing": "twos"` and `"mblur"`. Task 1 enforces strict validation rules in `tools_build_shots.py`.
- **`blurLayer` Performance & Canvas State Isolation:** `blurLayer()` uses offscreen canvas pools in `core.js`; Task 3 & 5 ensure `g.save()/restore()` wraps every custom transform/clip/composite mode so no global alpha/filter leaks into subsequent shots or `captions`.
- **True Screen-Direction Continuity Across New OTS/POV Cuts:** Verify `#1a/#1b/#1c -> #2a/#2b` and `#21b -> #24 -> #25` keep coherent gaze direction and float/creature placement.
- **Exact Word-Beat Alignment (`beatHold` & `act`):** Ensure `beatHold(t, at, 8)` trigger times lie cleanly within `[0.3, dur - 0.3]` of the owning sub-shot so freeze holds never bleed past a cut.

---

### Task 1: Upgrade Shot Planner (`tools_build_shots.py`) for Master Shot List v2

**Files:**
- Modify: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/tools_build_shots.py`
- Regenerate: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/shots.json`
- Regenerate: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/lint.json`

**Interfaces:**
- Consumes: `timeline/words.json`, `input/script.txt`, `config.json`
- Produces: ~155-shot `story/shots.json` with `timing: "twos"` (comedy), `mblur: 5` (fast falls/lunges), `in` transitions (`cut|whip|flash|zoom|dip`), `params.{sceneTag,beat,totalBeats,ocean,clockText,clockMode,lostFloats,mod,beatAt}`, and `0`-warning `lint.json`.

- [ ] **Step 1: Update `tools_build_shots.py` split table, `size` sequence, `timing`/`mblur` flags, and `in` transitions**

Map every sub-shot in Part C (`s01a/b/c`, `s02a/b`, ..., `s72a/b`), keeping `lostFloats: null` for `tag <= 13` (shown from `#14` onward per spec), marking 4 `3d` shots (`s04c`, `s29a`, `s42a`, `s72a`), and keeping `size === 'freeze'` count `<= 2` (`s02b`, `s61a`).

- [ ] **Step 2: Run `tools_build_shots.py` and `tools/shot_lint.py --strict`**

Run inside `thanhhai-2d-studio/`:
```bash
python3 projects/ti-hon-8-dai-duong/tools_build_shots.py
python3 tools/shot_lint.py --project projects/ti-hon-8-dai-duong --strict
```
Expected: `shot_lint: ~154 shots, 0 error(s), 0 warning(s)`.

---

### Task 2: Upgrade Mascot v0.7 (`cast.js`) & Cinematic Props/HUDs (`props.js`)

**Files:**
- Modify: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/cast.js`
- Modify: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/props.js`

**Interfaces:**
- Produces `cast.js`: `drawTiHon(g, o)` (multi-stop gradient body shading, dynamic scarf `swing`, red `"VỀ NHÀ"` button pulse, `boil` support, headlamp cone, labcoat, sunglasses, glasses, sweat drops), `bigFaceTiHon(g, x, y, r, o)` (blurred ocean backdrop option + rim crescent + sweat + pupil dilation).
- Produces `props.js`: `drawSubtitleScrim(g)`, `drawFloat` (glossy duck, roped striped ring, brushed-metal riveted iron ring), `drawTimePortal`, `drawSurvivalClock` (analog mini dial + glass crack shards), `drawHud`, `drawCreatureCard`, `drawScaleSilhouette`, `drawMuseumFrame`, `drawBookAndNews`, `drawCtScanOverlay`, `drawXrayFrame`, `drawChalkboard`, `drawLeaderboard` (with creature badge icons).

- [ ] **Step 1: Upgrade `scenes/cast.js` with volumetric gradients, dynamic scarf & `bigFaceTiHon` enhancements**
- [ ] **Step 2: Upgrade `scenes/props.js` with subtitle contrast scrim, detailed 3-float shading & v2 storytelling props**

---

### Task 3: Upgrade 10 Environments (`sets/oceans.js`) with 3-Plane `blurLayer` DoF & Caustics

**Files:**
- Modify: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/sets/oceans.js`

**Interfaces:**
- Produces: `drawOceanWorld(g, worldId, t, cam, opts)` returning `{rim, waterY, accent, palette}`, plus `drawOceanForeground(g, worldId, t, cam)` using `blurLayer(g, 10, ..., cam, 1.65)` for shallow depth-of-field framing after midground actors draw!

- [ ] **Step 1: Add animated underwater caustics, volumetric sun shafts, stormy lightning/waves, and `drawOceanForeground` (`blurLayer`) for all 10 worlds**

---

### Task 4: Upgrade Creature Rigs (`creatures.js`) to 2.5D Volumetric Shading & Articulated Props

**Files:**
- Modify: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/creatures.js`

**Interfaces:**
- Produces: `drawCreature(g, kind, o)` with multi-stop gradients, anatomical gill slits / fin rays / armor bevels / specular tooth highlights / articulated jaws / spiral tooth-growth animation (`helicoprion`), chubby morph (`dunkleosteus`), skeletal skull & tooth comparison props (`drawToothProp`, `drawSkullCompare`, `drawLineupSilhouettes`).

- [ ] **Step 1: Upgrade all 8 prehistoric sea creatures + blue whale + krill + crab + comparative skull/tooth props**

---

### Task 5: Build 4 Low-Poly 3D Shots (`00_3d_hero.js`) & Rebuild All 6 Cinematic Shot Modules (`01..06.js`)

**Files:**
- Create: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/00_3d_hero.js`
- Rewrite: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/01_intro.js`
- Rewrite: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/02_oceans_1_2.js`
- Rewrite: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/03_oceans_3_4.js`
- Rewrite: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/04_oceans_5_6.js`
- Rewrite: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/05_oceans_7_8.js`
- Rewrite: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/scenes/shots/06_outro.js`

**Interfaces:**
- Consumes: `cast.js`, `props.js`, `sets/oceans.js`, `creatures.js`, `/engine/{core,motion,fx2d,ui2d,explainer,three-kit}.js`
- Produces: 100% shot coverage of `shots.json` matching every composition, camera trajectory, `blurLayer` foreground, `beatHold`, `impact`, and gag in Part C of the Production Spec.

- [ ] **Step 1: Implement `00_3d_hero.js` (4 `three-kit.js` shots: `s04c`, `s29a`, `s42a`, `s72a` with `overlay(g)` integration)**
- [ ] **Step 2: Rewrite `01_intro.js` & `02_oceans_1_2.js` (including `submerge` camera dive, `freeze` drops, soap-slip + waving duck float, double-pinch + head knock)**
- [ ] **Step 3: Rewrite `03_oceans_3_4.js` & `04_oceans_5_6.js` (inside-Dunkleosteus jaw POV, balloon morph + newspaper spin, spiral tooth growth + CT scan, 3M-year race, Pliosaur 1..20 -> pitch black + flashlight + tail poking between clenched teeth)**
- [ ] **Step 4: Rewrite `05_oceans_7_8.js` & `06_outro.js` (US seaway map, X-ray fish-in-fish cartoon wriggle, 36cm vs 27cm tooth, tiptoe gag, Jaws bottom-up POV, cracked `00:08` clock, 4-tap tail escape, beach bellyflop + sandcastle, 8-row creature-icon leaderboard, meteor close-up)**

---

### Task 6: Visual Verification & Polish (`--sheet`, 3D `--stills`, 35s Preview)

**Files:**
- Inspect: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/build/sheets/sheet_*.png`
- Inspect: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/build/stills/*.png`

- [ ] **Step 1: Render full contact sheet (`--sheet --scale 0.45`) and key 3D/action stills (`--stills`)**
- [ ] **Step 2: Read every generated sheet PNG and fix any 3D/blurLayer/text-overlap defects before final render**

---

### Task 7: Final 1080p Render, Audio Mux, Media QA & Update Drive Folder `#54`

**Files:**
- Regenerate: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/out/video-final.mp4`
- Inspect: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/build/final_mp4_qa_v2.png`
- Update Drive file ID: `1k7lChdOsGupsUzCKsPcndfxirkqv3Iv1` inside folder `19OCnw2cZ7EPhptrY5DEUp71Yag0jACYg`

- [ ] **Step 1: Run full 1080p render (`node render.mjs --project projects/ti-hon-8-dai-duong --workers 4 --crf 18`)**
- [ ] **Step 2: Mux audio (`audio/mix.py --video ... --out out/video-final.mp4`), run `ffprobe` + `blackdetect`/`freezedetect`/`silencedetect`, inspect `final_mp4_qa_v2.png`**
- [ ] **Step 3: Update `video-final.mp4` in Drive folder `#54` via `gdrive mutate update 1k7lChdOsGupsUzCKsPcndfxirkqv3Iv1 ...` and verify byte size readback**
