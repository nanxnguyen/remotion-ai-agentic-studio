---
name: auto-video-producer
description: "End-to-end automated Remotion video production skill: 100% voice-synced Vbee narration via GitHub Actions, high-quality expressive stickman/2D visuals, FullHD (1080x1920 or 1920x1080) H.264 render, and verified Google Drive delivery to Videos-shorts."
---

# Auto Video Producer (Full-Stack Remotion + Vbee GH Actions + FullHD + Google Drive)

Use this skill whenever the user asks to **automatically produce a complete, publication-ready video** from a topic, script, or brief—with 100% voice-to-visual synchronization, high-craft character animation, FullHD export, and Google Drive archival.

---

## Phase 1 — Script, Retention & Storyboard Contract

1. **Follow `docs/SHORTS_RETENTION_PLAYBOOK.md`:**
   - Draft 3 hook candidates; pick the strongest 0–2s visual + verbal hook.
   - Complete the opening premise within 4–6s; trigger a meaningful visual state change every **3–6s**.
   - Deliver an earned climax and concise visual payoff.
2. **Author `docs/<slug>/shotlist.json`:**
   - Each shot must include `id`, `start`, `end`, `duration_sec`, `pose`, `caption`, and `narration` (natural Vietnamese, punctuated for expressive Vbee pacing).
   - Validate before generating voice or scenes:
     ```bash
     node scripts/stickman-director/validate-storyboard.mjs docs/<slug>/shotlist.json
     ```
   - Ensure every `caption` is strictly single-line (`<= 42` chars) inside `PORTRAIT_SAFE_AREA`.

---

## Phase 2 — 100% Voice-Matched Vbee Narration via GitHub Actions

Never estimate or fake voice timing. Every scene's duration MUST be driven by the actual `ffprobe`-measured Vbee audio output.

1. **Trigger / Configure Vbee GitHub Action:**
   - Use the workflow template in [`references/vbee-github-action-template.yml`](references/vbee-github-action-template.yml) (or create `.github/workflows/<slug>-vbee.yml`).
   - Required GitHub Secrets / Vars:
     - `VBEE_ACCESS_TOKEN` (from `secrets.VBEE_ACCESS_TOKEN || secrets.VBEE_TOKEN || secrets.VBEE_API_KEY`)
     - `VBEE_APP_ID` (from `secrets.VBEE_APP_ID || secrets.VBEE_APPID`)
     - `VBEE_WEBHOOK_URL` (from `vars.VBEE_WEBHOOK_URL`)
   - The workflow runs:
     ```bash
     python3 scripts/gen-story-vbee-batch.py \
       --timeline docs/<slug>/shotlist.json \
       --out-dir public/audio/<slug> \
       --voice-code <voice_code> \
       --speed <speed> \
       --webhook-url "$VBEE_WEBHOOK_URL"
     ```
     Recommended voices: `hn_male_phuthang_stor_24k-stl` (storytelling male), `hn_male_thanhlong_talk_48k-fhg` (emotional male), or approved Vbee catalog voice.
2. **Verify 100% Slot Match:**
   - Download the workflow artifact (`<slug>-vbee`) into `public/audio/<slug>/`.
   - Confirm `public/audio/<slug>/measured-timeline.json` exists and every clip has `text === shot.narration`, nonzero `sha256`, and `audio_seconds`.
   - Measure durations into TypeScript:
     ```bash
     npm run voice:measure -- <slug> --out src/videos/<slug>/voice-durations.ts
     ```
   - Lock each Remotion scene's `durationInFrames` to `Math.ceil((audio_seconds + padSec) * 30)` (typically `padSec = 0.25`–`0.45`s for breathing/transitions). Audio must NEVER be clipped or overlap the next scene.

---

## Phase 3 — High-Quality Visuals & Expressive Character Animation

1. **Scaffold & Register:**
   ```bash
   npm run video:new -- --slug <slug> --id <VideoId> --scenes <N>
   ```
   Register only in `src/videos/registry.ts` (never directly in `src/Root.tsx`).
2. **Visual Craft & Character Quality Standards:**
   - Use [`src/animation/StickmanDirectorKit.tsx`](../../../src/animation/StickmanDirectorKit.tsx) (`DirectorStage`, `DirectorCharacter`, `KineticStroke`, `DirectorCaption`), [`src/animation/stickman-director.ts`](../../../src/animation/stickman-director.ts) (`directorPose`, `DIRECTOR_STYLES`, `interpolateKeyState`), and [`src/animation/character-motion.ts`](../../../src/animation/character-motion.ts) (`CharacterPuppet`, `locomotionPose`, `solveTwoBone`, `blendPose`).
   - **No static scenes:** Combine character pose/IK motion, expressive facial states (`shocked`, `happy`, `sad`, `angry`, `focused`, `calm`, `tired`), accessories (`scarf`, `beanie`), progressive kinetic strokes (`underline`, `arrow`, `polyline`), and atmospheric backdrops.
   - **Deterministic only:** Derive all motion from `useCurrentFrame()`. Never use `Math.random()` or `Date.now()`.
   - **Soft audio transitions:** Apply 0.35–0.55s fades and duck background music beneath Vbee narration so speech is crisp and intelligible.
3. **Pre-render Verification:**
   - Inspect key frames in Remotion Studio (`npm run studio`) or render still frames.
   - Run `npm run typecheck`, ESLint on the new video files, and `python3 -I scripts/pipeline.py audit <slug>`.

---

## Phase 4 — FullHD Render & Media QA

1. **Render FullHD MP4 (`1080×1920` for 9:16 Shorts or `1920×1080` for 16:9 Long-form):**
   ```bash
   npm run render -- --id <VideoId> --out out/<slug>-final.mp4
   ```
   (`scripts/video-render.mjs` enforces `--codec h264 --crf 18 --pixel-format yuv420p`.)
2. **Validate Output with `ffprobe`:**
   ```bash
   ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate -show_entries format=duration,size -of json out/<slug>-final.mp4
   ```
   Confirm:
   - `width=1080, height=1920` (Shorts) or `1920x1080` (Long-form), `fps=30`.
   - Both `video` (`h264`) and `audio` (`aac`) streams exist.
   - Total duration matches the sum of `measured-timeline.json` + padding.
   - Never commit `out/*.mp4` to Git.

---

## Phase 5 — Google Drive Delivery (`Videos-shorts`)

Follow [`docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md`](../../../docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md) and the **2026-10-25 Archive Override** (**NO GitHub Releases** for MP4 binaries):

1. **Locate Parent & Allocate Sequence Number:**
   - Parent Google Drive Folder ID: **`1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`** (`Videos-shorts`).
   - List all direct child folders matching `^([1-9][0-9]*)\.\s+(.+)\s+-\s+(\d{4}-\d{2}-\d{2})$`.
   - Compute `N = max(existing IDs) + 1` (never reuse IDs; if revising an existing video, reuse its folder).
   - Create folder: `<N>. <Video Title> - <YYYY-MM-DD>` (using `Asia/Ho_Chi_Minh` local date).
2. **Prepare & Upload All 3 Mandatory Deliverables:**
   - `video-final.mp4`: The FullHD QA-approved MP4 from Phase 4.
   - `thumbnail-youtube.png`: Original, high-contrast, story-specific artwork (`1080×1920` for Shorts, `>= 1280×720` for 16:9). Never a raw frame dump or stretched crop.
   - `youtube-title-description.txt`: UTF-8 file with `TITLE:`, `DESCRIPTION:`, `HASHTAGS:`, and optional `PINNED COMMENT:`.
   - Upload real bytes via `mcp__Google_Drive__upload_file` into the newly created folder ID.
3. **Verify & Report:**
   - Read back Drive metadata for all 3 files (nonzero byte size, MIME type, parent ID, `webViewLink`).
   - Return the verified **Google Drive Folder URL**, **Google Drive MP4 Viewer URL**, thumbnail/copy links, resolution/FPS/duration summary, and GitHub source commit/PR link.
   - Keep Drive files private and do NOT publish to YouTube/TikTok without explicit user approval.
