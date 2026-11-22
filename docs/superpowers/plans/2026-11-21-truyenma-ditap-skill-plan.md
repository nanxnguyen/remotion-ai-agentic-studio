# Truyện Ma Dị Tạp (`make-horror-video-ditap`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `engine/ditap.js`, unit tests, the `examples/ditap-demo` showcase project, and the `make-horror-video-ditap` skill into `plugins/truyen-ma-2d-studio` (`v0.2.0`), verified end-to-end and packaged cleanly.

**Architecture:** `engine/ditap.js` builds on existing `engine/core.js` (`E, V, clamp, lerp, ease, prog, noise, alpha, shade, circle, ring, rr, poly, seg, linGrad, radGrad, glow, veil, text, FONTS, layer, blurLayer, mood, visemeAt`) and `engine/horror.js` (`flicker, candle, incense, fogBank, darkness, heartbeatVignette, thumbText`) with zero duplicate math/color helpers. `truyenma-studio/` is the active workspace copy, mirrored cleanly into `plugins/truyen-ma-2d-studio/skills/make-horror-video/kit/` before running `update_verify_kit.py`, `build-plugin.sh`, and `validate_plugin.py`.

**Tech Stack:** Node 22 (`node --test`), Canvas 2D headless Chromium renderer (`render.mjs`), Python 3.12+ (`shot_lint.py`, `scare_lint.py`, `make_thumb.py`, `validate_plugin.py`).

**Spec:** `docs/superpowers/specs/2026-11-21-truyenma-ditap-skill-design.md`

## Global Constraints
- Deterministic rendering only: NEVER use `Math.random()` or `Date.now()`; derive every variation from `t`, `seed`, `noise()`, or `rng()`.
- Keep all plugin zip paths plain ASCII (`[A-Za-z0-9._/@+-]+`); `plugin.json` description `<= 1024` chars; skill `name` in frontmatter must match folder name `make-horror-video-ditap`.
- Never draw dark pill/rectangle boxes behind `ditapSubtitle`; burned-in subtitles use white fill + heavy dark stroke outline in lower safe zone.
- `ditapFigure` & `ditapBigFace` must support `16:9` and `9:16` cleanly via logical `E.W`, `E.H`, `V()`.
- Never emit or commit binary MP4s into Git history; example outputs in `ditap-demo` only keep small PNG/JPG inspection proof if appropriate (and `build-plugin.sh` excludes `*/build/*`).

## Review Focus
1. `faceless: true` on `ditapFigure` / `ditapBigFace`: must suppress eyes, eyebrows, nose, and mouth even if `expr`, `blindEye`, or `viseme` are simultaneously passed.
2. `blindEye: 'left' | 'right'`: must draw an opaque milky sphere without dark pupil dot while the healthy eye tracks `look`.
3. `ditapSubtitle` with empty, whitespace, or very long Vietnamese diacritic strings: empty/whitespace must return immediately without drawing stroke artifacts; long strings must split safely into `<= 2` lines.
4. `ditapTimedSubtitle(g, globalT, beats)` when `beats` is undefined/empty or `globalT` lies in a silence gap between beats: must safely no-op without throwing.
5. `examples/ditap-demo` shots + `thumb.js`: must have zero overlapping/gapped shot intervals, hook under 4s with no title card inside first 3s (`shot_lint.py --strict`), scare hush before peak (`scare_lint.py --strict`), and zero missing shots in `render.mjs --sheet`.

---

### Task 1: TDD `engine/ditap.js` + `tests/unit/ditap.test.mjs`

**Files:**
- Create: `truyenma-studio/tests/unit/ditap.test.mjs`
- Create: `truyenma-studio/engine/ditap.js`

**Interfaces:**
- Consumes from `./core.js`: `E, V, clamp, lerp, ease, prog, noise, alpha, shade, mix, circle, ring, rr, poly, seg, linGrad, radGrad, glow, veil, text, FONTS, layer, blurLayer, mood, visemeAt`
- Consumes from `./horror.js`: `flicker, candle, incense, fogBank, darkness, heartbeatVignette, thumbText`
- Produces in `./ditap.js`:
  - `export function ditapFigure(g, opts = {})`
  - `export function ditapBigFace(g, cx, cy, r, opts = {})`
  - `export function ditapAltar(g, cam, t, M, opts = {})`
  - `export function ditapVillageStreet(g, cam, t, opts = {})`
  - `export function ditapTitleCard(g, t, opts = {})`
  - `export function ditapSubtitle(g, str, opts = {})`
  - `export function ditapTimedSubtitle(g, globalT, beats, opts = {})`
  - `export function ditapThumbText(g, opts = {})`

- [ ] **Step 1: Write the failing unit tests** in `truyenma-studio/tests/unit/ditap.test.mjs` covering: deterministic rendering, `khanTang` mourning cloth + `scar` + `blindEye` + `faceless` guard, `ditapBigFace` visemes/mouths, `ditapAltar` & `ditapVillageStreet` 16:9 + 9:16 execution, `ditapTitleCard`, `ditapSubtitle` (empty no-op, no `fillRect` background pill, multi-word wrap), and `ditapTimedSubtitle` gap safety.
- [ ] **Step 2: Run test to verify RED**: `cd truyenma-studio && node --test tests/unit/ditap.test.mjs` (expected: FAIL on missing module `engine/ditap.js`).
- [ ] **Step 3: Implement `truyenma-studio/engine/ditap.js`** with clean small helpers, thick dark strokes (`#111216`), rounded pill shoulders & arms, expressive eyes (`wide` white circle + small pupil, blink lids, `blindEye`), brow scar, `khanTang` trailing bow, `faceless` mode, blurred atmospheric `ditapAltar` (hoành phi plaque, draped mirrors, candles), `ditapVillageStreet` (tile roofs, Vietnamese shop signs, bicycle, quang gánh, hazy karst hills), `ditapTitleCard`, `ditapSubtitle`, `ditapTimedSubtitle`, and `ditapThumbText`.
- [ ] **Step 4: Run tests to verify GREEN**: `cd truyenma-studio && npm test` (expected: all JS + Python tests pass).

### Task 2: `examples/ditap-demo` + Strict Lint & Sheet Render Verification

**Files:**
- Create: `truyenma-studio/examples/ditap-demo/config.json`
- Create: `truyenma-studio/examples/ditap-demo/story/shots.json`
- Create: `truyenma-studio/examples/ditap-demo/timeline/beats.json`
- Create: `truyenma-studio/examples/ditap-demo/scenes/cast.js`
- Create: `truyenma-studio/examples/ditap-demo/scenes/shots/demo.js`
- Create: `truyenma-studio/examples/ditap-demo/scenes/shots/thumb.js`

**Interfaces:**
- Consumes `engine/ditap.js` (`ditapFigure`, `ditapBigFace`, `ditapAltar`, `ditapVillageStreet`, `ditapTitleCard`, `ditapTimedSubtitle`, `ditapThumbText`) and `engine/horror.js` (`creep`, `punch`, `dread`, `heartbeatVignette`, `scareFlash`, `fogBank`).

- [ ] **Step 1: Author `config.json`, `story/shots.json` (8 shots, 0..24s), `timeline/beats.json` (sample Vietnamese dialogue/narration lines)** matching `shot_lint.py --strict` and `scare_lint.py --strict`.
- [ ] **Step 2: Implement `scenes/cast.js`, `scenes/shots/demo.js` (8 shots + burn-in captions), and `scenes/shots/thumb.js` (`thumb`, `thumb2`)**.
- [ ] **Step 3: Verify strict lints & visual render**:
  - `cd truyenma-studio && python3 tools/shot_lint.py --project examples/ditap-demo --strict`
  - `cd truyenma-studio && python3 tools/scare_lint.py --project examples/ditap-demo --strict`
  - `cd truyenma-studio && node render.mjs --project examples/ditap-demo --sheet --scale 0.5`
  - `cd truyenma-studio && python3 tools/make_thumb.py --project examples/ditap-demo --variants 2`
- [ ] **Step 4: Coordinator inspects `build/sheets/sheet_01.png` and `out/thumbnail_1.png` with `read_file`**, then deletes `examples/ditap-demo/build/` after confirming visual quality.

### Task 3: `make-horror-video-ditap` Skill & Plugin Docs Upgrade

**Files:**
- Create: `plugins/truyen-ma-2d-studio/skills/make-horror-video-ditap/SKILL.md`
- Create: `plugins/truyen-ma-2d-studio/skills/make-horror-video-ditap/references/ditap-playbook.md`
- Modify: `plugins/truyen-ma-2d-studio/.claude-plugin/plugin.json`
- Modify: `plugins/truyen-ma-2d-studio/README.md`
- Modify: `plugins/truyen-ma-2d-studio/CHANGELOG.md`
- Modify: `plugins/README.md`
- Modify: `plugins/truyen-ma-2d-studio/skills/make-horror-video/SKILL.md`
- Modify: `plugins/truyen-ma-2d-studio/skills/horror-story-writer/SKILL.md`
- Modify: `plugins/truyen-ma-2d-studio/skills/horror-package/SKILL.md`

- [ ] **Step 1:** Author `make-horror-video-ditap/SKILL.md` (Option C pipeline: 25–35 min Dạ Hành Dị Tạp folklore storytelling, exact character/set/caption/title-card recipe, 30-min asset reuse guide, Google Drive default delivery rule) & `references/ditap-playbook.md` (8-part script structure extracted from *Thần Trùng* / *Bùa Lỗ Ban* / *Thiên Linh Cái*, modern-tech trap motifs, identity twist, 4th-wall ending, minimal title formula, split-color thumbnail formula, pinned community comment template). Ensure frontmatter `name: make-horror-video-ditap` and `description <= 1024` chars, zero XML tags.
- [ ] **Step 2:** Update `plugin.json` to `0.2.0`, update `README.md`, `CHANGELOG.md`, `plugins/README.md`, and cross-references in sibling skills (`make-horror-video`, `horror-story-writer`, `horror-package`, `horror-engine-api.md` / `packaging.md` if needed — note check ownership cleanly!).

### Task 4: Sync Plugin Kit, Symlinks, Package Validation & Code Review

- [ ] **Step 1:** Sync `truyenma-studio/engine/ditap.js`, `tests/unit/ditap.test.mjs`, and `examples/ditap-demo/` (cleaned of `build/` and temp files) into `plugins/truyen-ma-2d-studio/skills/make-horror-video/kit/`.
- [ ] **Step 2:** Create symlinks:
  - `.claude/skills/make-horror-video-ditap` -> `../../plugins/truyen-ma-2d-studio/skills/make-horror-video-ditap`
  - `.agents/skills/make-horror-video-ditap` -> `../../.claude/skills/make-horror-video-ditap`
- [ ] **Step 3:** Run `cd plugins/truyen-ma-2d-studio && python3 scripts/update_verify_kit.py && bash scripts/build-plugin.sh && python3 scripts/validate_plugin.py`, plus `cd truyenma-studio && npm test`.
- [ ] **Step 4:** Invoke `superpowers-code-reviewer` (`Model: "pro"` / `"inherit"`) to audit the full change set and resolve any findings before final report.
