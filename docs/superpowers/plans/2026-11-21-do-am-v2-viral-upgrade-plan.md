# Đò Âm V2 — 2.5D Multi-Layer Puppet, Packaging & Shorts Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` / Antigravity `@Swarm` parallel workers (`illustrator`, `puppet-dev`, `shorts-packager`) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade *Đò Âm - Chiếc Dép Thứ Chín Trên Khoang Đêm* from flat 1-layer pan/zoom to a 2.5D multi-layer puppet animation with 4 new/fixed story scenes, lip-synced dialogue pulses, a high-CTR Thumbnail V2, and 3 vertical 9:16 YouTube Shorts funnel videos, verified end-to-end and updated on Google Drive.

**Architecture:** Place reusable deterministic 2.5D helpers (`computeCoverTransform`, breathing, blinking, swinging oil-lamp light, water ripple scanlines, multiplane foreground occluders, and `visemeAt`-based mouth pulses) in `truyenma-studio/engine/puppet2d.js` with pure logic isolated for Node unit testing (`tests/unit/puppet2d.test.mjs`). Bind the 4 newly generated 2D comic PNGs (`03_prop_dep_le_v2.png`, `08b_nuoc_phan_chieu_5_nguoi.png`, `13_climax_ao_mua.png`, `14_khoang_do_trong.png`) and `15_thumb_v2_bg.png` across the long-form project and 3 re-timed vertical Shorts projects (`do-am-short-1`, `do-am-short-2`, `do-am-short-3`).

**Tech Stack:** Node 22 (`node --test`), Python 3.12 (`shot_lint.py`, `scare_lint.py`, `make_thumb.py`, `audio/mix.py`), Playwright Chromium + HTML5 Canvas 2D, FFmpeg/FFprobe, Google Drive CLI (`gdrive`).

**Spec:** `docs/superpowers/specs/2026-11-21-do-am-v2-viral-upgrade-design.md`

## Global Constraints
- Never modify `truyenma-studio/projects/do-am-chiec-dep-thu-chin/input/voiceover.mp3` (`389.799s`) or change spoken narration words.
- Keep all animations deterministic (derived from frame/time `t`, zero `Math.random()` or `Date.now()`).
- Keep pure math helpers in `truyenma-studio/engine/puppet2d.js` free of DOM (`document`) access so `npm test` passes under Node 22.
- Every `visemeAt(...)` call must use `visemeAt(globalT, from, to)` matching `engine/core.js:49-52` (reads `E.visemes`).
- All per-asset puppet coordinates (`lamp`, `eyes`, `mouth`, `waterY`) must be normalized `[0..1]` and mapped via `computeCoverTransform(...)`.
- Both `shot_lint.py --strict` and `scare_lint.py --strict` must exit `0` (`0` errors, `0` warnings) for `do-am-chiec-dep-thu-chin` and all 3 Shorts.
- Every MP4 delivered to Google Drive must use the real produced video name (`do-am-chiec-dep-thu-chin-final.mp4`), never generic `video-final.mp4`.

## Review Focus
1. `visemeAt(globalT)` signature and sliced `timeline/visemes.json` offsets in all 3 Shorts (mismatch causes silent or desynced mouth pulses).
2. `computeCoverTransform` alignment between `1920x1080` (16:9) and `1080x1920` (9:16) with `focusX` panning (must keep eyes/mouth/lamp overlays pinned to characters).
3. `scare_lint.py --strict` rules on all 3 Shorts: `hook` starting `< 3s` (`<= 4s` first shot), `reveal`/`twist` at `>= 75%` of duration, `cta` in last 3 shots, `fear` rising from first third to last third, and `<= 20s` peak gaps.
4. `thumb.js` isolation: `15_thumb_v2_bg.png` is loaded in `scenes/shots/thumb.js` (not `main.js`) and renders cleanly via `make_thumb.py` into `out/thumbnail-youtube.png`.
5. No leftover `.tmp` or duplicate uploads in Drive folder `57` (`1h0jnpg9YfWSLs1Y-sgQmzezF9FKjyOa1`).

---

### Task 1: Generate 4 Missing/Fixed Story PNGs & Thumbnail V2 Background (`illustrator` track)

**Files:**
- Create: `truyenma-studio/projects/do-am-chiec-dep-thu-chin/assets/03_prop_dep_le_v2.png`
- Create: `truyenma-studio/projects/do-am-chiec-dep-thu-chin/assets/08b_nuoc_phan_chieu_5_nguoi.png`
- Create: `truyenma-studio/projects/do-am-chiec-dep-thu-chin/assets/13_climax_ao_mua.png`
- Create: `truyenma-studio/projects/do-am-chiec-dep-thu-chin/assets/14_khoang_do_trong.png`
- Create: `truyenma-studio/projects/do-am-chiec-dep-thu-chin/assets/15_thumb_v2_bg.png`

**Interfaces:**
- Produces: 5 verified `1920x1080` RGB/RGBA PNG files in `truyenma-studio/projects/do-am-chiec-dep-thu-chin/assets/` matching the exact 2D Vietnamese horror comic style and character locks (`01`–`12`), visually inspected via `read_file`.

- [ ] **Step 1: Generate the 5 target illustrations (`16:9`, no text/watermarks)**
  - `03_prop_dep_le_v2.png`: Wet wooden boat floorboards under warm amber oil-lamp light showing **4 distinct pairs** of adult sandals lined neatly + **1 small blue plastic child sandal** stitched with red thread at the far right leaking river water.
  - `08b_nuoc_phan_chieu_5_nguoi.png`: High-angle look down beside the wooden boat into black glassy river water showing the boat's **reflection with 5 figures seated**, where the 5th figure sitting right next to Minh is a small, soaking-wet child silhouette with head bowed low, while on the real wooden bench beside Minh nobody is there.
  - `13_climax_ao_mua.png`: Dramatic interior boat climax: the black hooded raincoat figure lunges forward wrapping the faded checkered *khăn rằn* over terrified Minh on the floorboards while the boatman at stern slams his long bamboo pole down onto the dark water amidst swirling mist.
  - `14_khoang_do_trong.png`: Same interior boat camera angle as `02_bg_khoang_do.png` in cold blue-grey night fog, **completely empty wooden seats** (no elderly woman, no raincoat figure, no child sandal on floor), only the lone boatman silhouette standing at the stern with his bamboo pole.
  - `15_thumb_v2_bg.png`: High-CTR composite horror artwork (no text): left/center-left Minh (navy hoodie) looking down in sheer terror; looming directly behind his shoulder in shadow is the ashen hollow-eyed elderly woman; bottom-right shows the glowing blue child sandal stitched with red thread on wet wood under a flickering oil lamp.
  *(If `image-generator` hits `429` quota, synthesize/composite deterministic `1920x1080` edits cleanly using Python Pillow/FFmpeg from existing `02`, `03`, `04`, `08`, `11` so the pipeline never stalls.)*
- [ ] **Step 2: Normalize all 5 outputs to exact `1920x1080` PNG**
  Run `ffmpeg` / `ffprobe` verifying `width=1920 height=1080` on all 5 files.
- [ ] **Step 3: Visually inspect all 5 PNGs**
  Open each PNG with `read_file` and verify sandal count (`4 pairs + 1 child`), empty seats in `14_khoang_do_trong.png`, 5th reflection figure in `08b`, and style consistency.

---

### Task 2: Implement `engine/puppet2d.js` + Unit Tests (`puppet-dev` track, Part 1)

**Files:**
- Create: `truyenma-studio/engine/puppet2d.js`
- Create: `truyenma-studio/tests/unit/puppet2d.test.mjs`

**Interfaces:**
- Produces in `/engine/puppet2d.js`:
  - `computeCoverTransform(imgW, imgH, stageW, stageH, pad = 90, focusX = 0.5, focusY = 0.5)` -> `{ dx, dy, dw, dh, scale, mapX(nx), mapY(ny) }`
  - `puppetFrameState(t, opts)` -> `{ breathY, breathScale, blink, eyeShiftX, eyeShiftY, lampAngle, lampFlicker }`
  - `waterSliceOffsets(t, slices = 18, amp = 6)` -> `Array<{ frac, dx }>`
  - `dialogueMouthOpen(globalT, isDialogue, visemeAtFn)` -> `{ active, open }` (`0..1`)
  - `drawCoverMapped(g, img, xf, opts)`
  - `drawBreathingOverlay(g, img, xf, region, state)`
  - `drawEyeBlinkAndGlint(g, xf, eyeBoxes, state)`
  - `drawSwingingLamp(g, xf, lampNorm, state, radius, color)`
  - `drawWaterRipples(g, img, xf, waterNormY, t, amp)`
  - `drawDialogueMouth(g, xf, mouthNorm, mouthState)`
  - `drawForegroundFrame(g, cam, t, style = 'boat')`

- [ ] **Step 1: Write the failing unit tests in `truyenma-studio/tests/unit/puppet2d.test.mjs`**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { mockCtx } from './mockctx.mjs';
import {
  computeCoverTransform,
  puppetFrameState,
  waterSliceOffsets,
  dialogueMouthOpen,
  drawEyeBlinkAndGlint,
  drawSwingingLamp,
  drawDialogueMouth,
} from '../../engine/puppet2d.js';

test('computeCoverTransform maps normalized coordinates identically for 16:9 and 9:16', () => {
  const wide = computeCoverTransform(1920, 1080, 1920, 1080, 100, 0.5);
  assert.equal(Math.round(wide.mapX(0.5)), 960);
  assert.equal(Math.round(wide.mapY(0.5)), 540);
  const vert = computeCoverTransform(1920, 1080, 1080, 1920, 80, 0.25);
  assert.ok(vert.dw >= 1080 && vert.dh >= 1920);
  assert.ok(vert.mapX(0.25) > 300 && vert.mapX(0.25) < 780);
});

test('puppetFrameState is deterministic and fires blink pulses periodically', () => {
  const a = puppetFrameState(1.25, { period: 3.0, seed: 5 });
  const b = puppetFrameState(1.25, { period: 3.0, seed: 5 });
  assert.deepEqual(a, b);
  assert.ok(a.blink >= 0 && a.blink <= 1);
});

test('waterSliceOffsets produces deterministic sine displacements', () => {
  const s1 = waterSliceOffsets(2.4, 12, 8);
  const s2 = waterSliceOffsets(2.4, 12, 8);
  assert.equal(s1.length, 12);
  assert.deepEqual(s1, s2);
  assert.ok(s1.every((x) => Math.abs(x.dx) <= 8.0001));
});

test('dialogueMouthOpen gates on isDialogue and maps viseme shapes', () => {
  const off = dialogueMouthOpen(12.0, false, () => ({ shape: 'AA', open: 0.9 }));
  assert.equal(off.active, false);
  assert.equal(off.open, 0);
  const on = dialogueMouthOpen(12.0, true, () => ({ shape: 'AA', open: 0.9 }));
  assert.equal(on.active, true);
  assert.ok(on.open > 0.5);
});

test('draw helpers issue expected Canvas2D calls via mockCtx', () => {
  const g = mockCtx();
  const xf = computeCoverTransform(1920, 1080, 1920, 1080, 90, 0.5);
  drawEyeBlinkAndGlint(g, xf, [[0.35, 0.34, 12, 7]], { blink: 0.8, eyeShiftX: 1, eyeShiftY: 0 });
  drawSwingingLamp(g, xf, [0.22, 0.24], { lampAngle: 0.05, lampFlicker: 0.9 }, 420);
  drawDialogueMouth(g, xf, [0.35, 0.42, 24, 10], { active: true, open: 0.7 });
  assert.ok(g.log.some((c) => c[0] === 'ellipse'));
  assert.ok(g.log.some((c) => c[0] === 'fillRect'));
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd /Users/nguyenanhnhut/Desktop/Projects/AI-video-edition/truyenma-studio && node --test tests/unit/puppet2d.test.mjs`
  Expected: FAIL (`ERR_MODULE_NOT_FOUND` for `engine/puppet2d.js`).

- [ ] **Step 3: Implement `truyenma-studio/engine/puppet2d.js`**
  Implement pure coordinate/math exports + Canvas2D draw helpers cleanly without DOM globals, using `visemeAt` passed as a callback or imported safely.

- [ ] **Step 4: Run full unit test suite to verify pass**
  Run: `cd /Users/nguyenanhnhut/Desktop/Projects/AI-video-edition/truyenma-studio && npm test`
  Expected: `40/40` JS unit tests + `22/22` Python tests PASS.

---

### Task 3: Upgrade Long-Form `shots.json`, `main.js` & `thumb.js` (`puppet-dev` track, Part 2)

**Files:**
- Modify: `truyenma-studio/projects/do-am-chiec-dep-thu-chin/story/shots.json`
- Modify: `truyenma-studio/projects/do-am-chiec-dep-thu-chin/scenes/shots/main.js`
- Create: `truyenma-studio/projects/do-am-chiec-dep-thu-chin/scenes/shots/thumb.js`

**Interfaces:**
- Consumes: `/engine/puppet2d.js` + `/engine/core.js` (`visemeAt`) + 5 new assets from Task 1 (`03_prop_dep_le_v2.png`, `08b_nuoc_phan_chieu_5_nguoi.png`, `13_climax_ao_mua.png`, `14_khoang_do_trong.png`, `15_thumb_v2_bg.png`).
- Produces: V2 `do-am-chiec-dep-thu-chin` shots, 2.5D animated `main.js` (no `thumb` shots inside `main.js`), and `thumb.js` (`thumb`, `thumb2`).

- [ ] **Step 1: Update `story/shots.json` asset bindings & normalized puppet specs**
  - Replace `03_prop_dep_le.png` with `03_prop_dep_le_v2.png` on all shots EXCEPT `s108` (*"Chiếc dép trẻ con dưới sàn cũng không còn"* -> uses `14_khoang_do_trong.png`).
  - Replace `08_bg_mat_song_toc.png` on `s061–s066` (the 5-person reflection) with `08b_nuoc_phan_chieu_5_nguoi.png` and remove `fx.ghost_water`.
  - Bind `13_climax_ao_mua.png` to `s097–s104` (raincoat rescue & pole strike climax).
  - Bind `14_khoang_do_trong.png` to `s126–s128` (*"Đêm qua tôi chỉ chở mình cậu"*) and remove `fx.solo_boat`.
  - Annotate `fx.puppet` keys (`lamp`, `waterY`, `eyes`, `mouth`, `dialogue: true` on direct speech shots, `fg: 'boat'|'dock'|'house'`).
- [ ] **Step 2: Run strict linters on updated `shots.json`**
  Run: `python3 tools/shot_lint.py --project projects/do-am-chiec-dep-thu-chin --strict && python3 tools/scare_lint.py --project projects/do-am-chiec-dep-thu-chin --strict`
  Expected: `138 shots, 0 error(s), 0 warning(s)` and `scare_lint: 0 error(s), 0 warning(s)`.
- [ ] **Step 3: Refactor `scenes/shots/main.js` to use `/engine/puppet2d.js` + `visemeAt` + `H.planes` foreground depth**
  Remove `thumb`/`thumb2` from `main.js` (moved to `thumb.js`). Keep the exact rounded dark timed caption box reading `beats.json`.
- [ ] **Step 4: Create `scenes/shots/thumb.js` with `15_thumb_v2_bg.png` and render Thumbnail V2**
  Run `python3 tools/make_thumb.py --project projects/do-am-chiec-dep-thu-chin --variants 2` and inspect `out/thumbnail_1.png` + a `320px` downscaled mobile check (`ffmpeg -vf scale=320:-1`). Copy approved thumbnail to `out/thumbnail-youtube.png`.
- [ ] **Step 5: Render 10-frame V2 QC contact sheet**
  Run `node render.mjs --project projects/do-am-chiec-dep-thu-chin --stills 1,18,35,66,136,173,189,253,280,361 --scale 0.4` and inspect visually with `read_file`.

---

### Task 4: Build 3 Vertical YouTube Shorts `9:16` Funnel Projects (`shorts-packager` track)

**Files:**
- Create: `truyenma-studio/projects/do-am-short-1/` (`config.json`, `input/voiceover.mp3`, `timeline/{beats,visemes}.json`, `story/shots.json`, `scenes/shots/{main,thumb}.js`)
- Create: `truyenma-studio/projects/do-am-short-2/` (same structure)
- Create: `truyenma-studio/projects/do-am-short-3/` (same structure)
- Symlink: `assets` -> `../do-am-chiec-dep-thu-chin/assets` in each Short project.

**Interfaces:**
- Consumes: `do-am-chiec-dep-thu-chin/input/voiceover.mp3`, `timeline/beats.json`, `timeline/visemes.json`, `/engine/puppet2d.js`.
- Produces: 3 lint-clean `1080x1920 @ 24fps` Shorts projects:
  1. `do-am-short-1` (~`50.4s`): Slice A `[0.00, 21.23]` + `0.25s` crossfade/silence bridge + Slice B `[111.29, 137.54]` + `2.8s` CTA slate (*"Xem bản đầy đủ dưới video liên kết"*). Re-tag `beat: "hook"` (`<3s`), `reveal` at `>= 75%` (on *"Nhưng hai gót chân bà không chạm sàn"*), and `cta` at end with rising fear curve (`0.55 -> 0.95 -> 0.85`).
  2. `do-am-short-2` (~`35.7s`): Slice `[159.55, 192.44]` + `2.8s` CTA slate. Re-tag first `3.8s` as `beat: "hook"`, `reveal` at `>= 75%` (*"Bên trong không có trầu cau..."*), `cta` at end, fear rising `0.62 -> 0.94 -> 0.85`.
  3. `do-am-short-3` (~`44.9s`): Slice `[221.47, 263.57]` + `2.8s` CTA slate. Re-tag first `3.5s` as `beat: "hook"`, put `knock` SFX inside the actual knock shot (`at: 4.2, 5.0, 5.8` recalculated locally), add an early `reveal` around `~10s` (`Minh ơi...`) and `twist`/`reveal` at `>= 75%` (`Mặt bà xám ngoét, hai hốc mắt sâu hoắm`), plus `cta` at end with rising fear (`0.55 -> 0.98 -> 0.88`).

- [ ] **Step 1: Slice audio + re-time `beats.json` and `visemes.json` for all 3 Shorts**
  Use Python + `ffmpeg` to extract exact segments from `do-am-chiec-dep-thu-chin/input/voiceover.mp3`, pad trailing `2.8s` silence for CTA, verify actual duration with `probe_duration`, and write offset-adjusted `timeline/beats.json` + `timeline/visemes.json`.
- [ ] **Step 2: Author `story/shots.json` (`1.5–3.5s` median shot length) and run `--strict` linters**
  Run `shot_lint.py --strict` and `scare_lint.py --strict` on `do-am-short-1`, `do-am-short-2`, `do-am-short-3`. Expected: `0 error(s), 0 warning(s)` on all 3.
- [ ] **Step 3: Author `scenes/shots/main.js` and `thumb.js` (9:16 vertical safe-area)**
  Use `computeCoverTransform(..., 1080, 1920, 90, focusX)` with dynamic `focusX` panning across characters, `puppet2d.js` animations, and captions positioned at `y = 0.77 * E.H` (well above the `250px` bottom mobile UI safe zone).
- [ ] **Step 4: Render contact sheets and `9:16` thumbnails for all 3 Shorts**
  Verify every frame and caption safe zone visually via `read_file`.

---

### Task 5: Full Render, `ffprobe` Verification, Whole-Branch Review & Google Drive Update (`coordinator` + `superpowers-code-reviewer`)

- [ ] **Step 1: Render FullHD V2 (`do-am-chiec-dep-thu-chin-final.mp4`) and mix audio**
  Run `node render.mjs --project projects/do-am-chiec-dep-thu-chin --workers 6 --format jpeg` + `python3 audio/mix.py --project projects/do-am-chiec-dep-thu-chin --video projects/do-am-chiec-dep-thu-chin/build/video_silent.mp4 --out projects/do-am-chiec-dep-thu-chin/out/do-am-chiec-dep-thu-chin-final.mp4`.
- [ ] **Step 2: Render all 3 vertical Shorts MP4s (`1080x1920 @ 24fps`)**
  Run `render.mjs` + `audio/mix.py --out ...-final.mp4` for `do-am-short-1`, `do-am-short-2`, `do-am-short-3`.
- [ ] **Step 3: Run `ffprobe` + extract visual QC strips from all 4 final MP4s**
  Verify `1920x1080`/`1080x1920`, `24fps`, `h264/aac`, exact durations, and inspect extracted frames via `read_file`.
- [ ] **Step 4: Dispatch `superpowers-code-reviewer` (`Model: "pro"`)**
  Review code changes in `engine/puppet2d.js`, `tests/unit/puppet2d.test.mjs`, `main.js`, `thumb.js`, and Shorts scripts against all Global Constraints and Review Focus items.
- [ ] **Step 5: Update Drive folder `57` (`1h0jnpg9YfWSLs1Y-sgQmzezF9FKjyOa1`)**
  Run `gdrive mutate update 1Y5HG97EVJ8YhBDujUFRmMfu-sukVy-Pe out/do-am-chiec-dep-thu-chin-final.mp4` and `gdrive mutate update 11CPzcXSItoZgmGp8SxscfLP54Y73SaFp out/thumbnail-youtube.png`, read back Drive metadata (`gdrive readonly ls 1h0jnpg9YfWSLs1Y-sgQmzezF9FKjyOa1 --json`), and output all clickable Drive URLs plus local paths to the 3 Shorts MP4s.
