# Sống Chậm Lại — 365 Ngày Của Mẹ Và 7 Ngày Phép Của Con (15-Min 16:9 Video) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or Swarm workers to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete 16:9 (`1920x1080`, 24fps, ~15:00) `thanhhai-2d-studio` production project and Vbee-ready `shotlist.json` for `song-cham-lai-365-ngay-cua-me` from the audited FINAL v2 script (`docs/song-cham-lai-365-ngay-cua-me/script.md`).

**Architecture:** Use `thanhhai-2d-studio` (`render.mjs` + `engine/core.js` + `engine/styles.js` + `engine/chibi.js`) for deterministic 2.5D canvas rendering at `1920x1080` 24fps, paired with `docs/song-cham-lai-365-ngay-cua-me/shotlist.json` validated for Vbee Batch TTS (`scripts/gen-story-vbee-batch.py`). Visual palette contrasts cold city Midnight Navy (`#0F172A`, `#38BDF8`) with warm rural Amber (`#291811`, `#F59E0B`, `#FDE68A`).

**Tech Stack:** Node 22, Python 3.12, `thanhhai-2d-studio` (`render.mjs`, Playwright Chromium, FFmpeg), `scripts/stickman-director/validate-storyboard.mjs`.

**Spec:** `docs/song-cham-lai-365-ngay-cua-me/script.md` & `docs/song-cham-lai-365-ngay-cua-me/shotlist.md`

## Global Constraints
- Resolution & FPS: `1920x1080` (16:9), `24` fps, `style: "midnight"`, `loudness: -14`.
- Deterministic frame rendering only (`player.html` / `render.mjs`): no `Math.random()` or `Date.now()`.
- Every scene text/caption must have full Vietnamese diacritics and stay inside 16:9 safe zones.
- No `git push` or YouTube/Drive upload without explicit user approval.

## Review Focus
- `shotlist.json` must pass `validate-storyboard.mjs` with zero errors and exact text parity with `narration-vbee.txt`.
- `thanhhai-2d-studio` `render.mjs --project projects/song-cham-lai-365-ngay-cua-me --sheet` must boot with `window.READY === true` and zero `[pageerror]` / `missing` shot errors across all 25 shots.
- Visual props from the audit (red-circled calendar with pencil notes, freezer bags with red/blue rubber bands, 19:45 clock & laptop close, jar of pork floss wrapped in old calendar) must be clearly drawn.

---

### Task 1: Vbee Storyboard JSON (`vbee-prep`)
**Files:**
- Create: `docs/song-cham-lai-365-ngay-cua-me/shotlist.json`
- Verify: `node scripts/stickman-director/validate-storyboard.mjs docs/song-cham-lai-365-ngay-cua-me/shotlist.json`

### Task 2: 2D Studio Project & Background Sets (`studio-sets`)
**Files:**
- Create: `thanhhai-2d-studio/projects/song-cham-lai-365-ngay-cua-me/config.json`
- Create: `thanhhai-2d-studio/projects/song-cham-lai-365-ngay-cua-me/scenes/sets/backgrounds.js`

### Task 3: 25-Shot Builder, Scenes & Sheet Verification (`studio-shots`)
**Files:**
- Create: `thanhhai-2d-studio/projects/song-cham-lai-365-ngay-cua-me/story/shots.json`
- Create: `thanhhai-2d-studio/projects/song-cham-lai-365-ngay-cua-me/scenes/shots/*.js` (Hook + Chapters 1–6)
- Verify: `cd thanhhai-2d-studio && node render.mjs --project projects/song-cham-lai-365-ngay-cua-me --sheet`
