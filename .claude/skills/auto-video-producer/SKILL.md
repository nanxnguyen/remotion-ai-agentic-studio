---
name: auto-video-producer
description: "End-to-end automated Remotion & 2D Studio video production skill: MANDATORY use of plugins/thanh-hai-learn-ai-2d-studio (cinematic 2.5D stickman/mascot rig, animation principles, 7-shape Vietnamese lip-sync, expressive hands, 36 SFX & music), 100% voice-synced Vbee narration via GitHub Actions, FullHD (1080x1920 or 1920x1080) H.264 render, and verified Google Drive delivery to Videos-shorts."
---

# Auto Video Producer (Thanh Hai 2D Studio + Vbee GH Actions + FullHD + Google Drive)

Use this skill whenever the user asks to **automatically produce a complete, publication-ready video** from a topic, script, or brief—with **mandatory integration of `plugins/thanh-hai-learn-ai-2d-studio`**, 100% Vbee voice synchronization, FullHD export, and Google Drive archival.

---

## Mandatory Plugin Dependency: `plugins/thanh-hai-learn-ai-2d-studio`

Every video produced with this skill **MUST** use [`plugins/thanh-hai-learn-ai-2d-studio`](../../../plugins/thanh-hai-learn-ai-2d-studio/README.md) as the visual, animation, and sound craft engine:

1. **Select the matching `thanh-hai-learn-ai-2d-studio` format skill based on the script:**

| Script / Topic Pattern | Mandatory Sub-Skill | Key Format Mechanics & Tools |
| :--- | :--- | :--- |
| **Transformation / Timeline:** *"Sự tiến hoá của..."*, *"Từ bé đến già"*, *"Lịch sử / qua các thời kỳ"*, *"Triệu năm trước"* | **[`evolution-video`](../../../plugins/thanh-hai-learn-ai-2d-studio/skills/evolution-video/SKILL.md)** | 6–10 stages, rolling counter (`age` / `year` / `ago`), `tools/evolution_plan.py`, `engine/evolve.js`, `ageLook` / `creature`, morph burst + full lineup payoff. |
| **Funny / High-Energy Mascot Explainer:** *"Cảm giác bị..."*, *"Đánh nhau với..."*, *"Mọi cách để..."*, *"Hành trình qua..."*, *"Top N..."* | **[`mascot-explainer`](../../../plugins/thanh-hai-learn-ai-2d-studio/skills/mascot-explainer/SKILL.md)** | Original channel mascot (`dog`/`cat`/`bear`), cold-open worst moment, `tools/explainer_plan.py`, `dangerCard` stat bars, comic hits (`ouch`), running-gag `tally`, ranked recap. |
| **Emotional / Psychology / Narrative Stickman:** Kể chuyện cảm xúc, tâm lý học, bài học cuộc sống, kịch tính 2.5D | **[`make-2d-video`](../../../plugins/thanh-hai-learn-ai-2d-studio/skills/make-2d-video/SKILL.md)** | Rim-lit stickman, 2.5D dark/moody scenes, close-ups, time-freeze punchlines, charts/blueprints, Remotion `StickmanDirectorKit`. |
2. **Mandatory Animation & Lip-Sync Principles (`v0.3`–`v0.5`):**
   - **Character Quality:** Dark/stylized 2.5D environments with rim-lit stickman or custom channel mascot, close-ups, time-freeze punchlines, motion charts/blueprints, or low-poly 3D accents.
   - **12-Principle Motion:** Anticipation, arcs, overshoot & follow-through (hair/coat trailing), squash & stretch on jumps/landings, and hold frames before key lines.
   - **Vietnamese 7-Shape Lip-Sync:** Sync character mouth shapes to Vietnamese syllables (initial consonant, rhyme, final consonant).
   - **Expressive Hands:** Pointing, open palm, fist, thumbs-up, waving, holding props in medium and close-up shots.
   - **Style Selection (`video-styles`):** Choose from the 5 canonical palettes (*Cinematic Dusk, Midnight Blue, Golden Hour, Neon Noir, Soft Storybook*) or a locked custom palette.
   - **Sound & SFX (`video-sound`):** Layer background music + relevant effects from the 36 built-in SFX, ducked cleanly underneath Vbee speech.

---

## Phase 1 — Script, Retention & Storyboard Contract

1. **Follow `docs/SHORTS_RETENTION_PLAYBOOK.md`:**
   - Draft 3 hook candidates; pick the strongest 0–2s visual + verbal hook (never open with a logo).
   - Complete the opening premise within 4–6s; trigger a meaningful visual state/framing change every **3–6s** (avoid back-to-back identical shot sizes).
   - Deliver an earned climax and concise visual payoff.
2. **Author `docs/<slug>/shotlist.json`:**
   - Each shot must include `id`, `start`, `end`, `duration_sec`, `pose`, `caption`, and `narration` (natural Vietnamese, punctuated for expressive Vbee pacing).
   - Validate before generating voice or scenes:
     ```bash
     node scripts/stickman-director/validate-storyboard.mjs docs/<slug>/shotlist.json
     ```
   - Ensure every `caption` breaks cleanly at semantic boundaries (`<= 42` chars for 9:16 single-line safe area, full Vietnamese diacritics).

---

## Phase 2 — 100% Voice-Matched Vbee Narration via GitHub Actions

Never estimate or fake voice timing. Every scene's duration MUST be driven by the actual `ffprobe`-measured Vbee audio output.

1. **Trigger / Configure Vbee GitHub Action:**
   - Use [`references/vbee-github-action-template.yml`](references/vbee-github-action-template.yml) (or `.github/workflows/auto-video-vbee.yml`).
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
2. **Verify 100% Slot Match:**
   - Download the workflow artifact (`<slug>-vbee`) into `public/audio/<slug>/`.
   - Confirm `public/audio/<slug>/measured-timeline.json` exists and every clip has `text === shot.narration`, nonzero `sha256`, and `audio_seconds`.
   - Measure durations into TypeScript:
     ```bash
     npm run voice:measure -- <slug> --out src/videos/<slug>/voice-durations.ts
     ```
   - Lock each scene's `durationInFrames` to `Math.ceil((audio_seconds + padSec) * 30)` so audio NEVER clips or overlaps the next scene.

---

## Phase 3 — Visual Production with `thanh-hai-learn-ai-2d-studio`

1. **Scaffold & Register:**
   - Use `npm run video:new -- --slug <slug> --id <VideoId> --scenes <N>` for Remotion compositions (`src/videos/registry.ts`) and/or `plugins/thanh-hai-learn-ai-2d-studio/skills/make-2d-video/kit/` for 2D studio rigs, lip-sync, and sound synthesis.
2. **Pre-Render Quality Gates:**
   - Verify 0–3s hook, shot-size variety, Vietnamese diacritics (Nunito/Inter font coverage), and deterministic frame math (no `Math.random()` or `Date.now()`).
   - Run `npm run typecheck`, ESLint, and `plugins/thanh-hai-learn-ai-2d-studio/scripts/build-plugin.sh` when modifying plugin assets.

---

## Phase 4 — FullHD Render & Media QA

1. **Render FullHD MP4 (`1080×1920` for 9:16 Shorts or `1920×1080` for 16:9 Long-form):**
   ```bash
   npm run render -- --id <VideoId> --out out/<slug>-final.mp4
   ```
   (`--codec h264 --crf 18 --pixel-format yuv420p`.)
2. **Validate Output with `ffprobe`:**
   ```bash
   ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate -show_entries format=duration,size -of json out/<slug>-final.mp4
   ```
   Confirm `1080x1920` or `1920x1080`, `30 fps`, `h264` video + `aac` audio, and duration matching `measured-timeline.json` + holds.

---

## Phase 5 — Google Drive Delivery (`Videos-shorts`)

Follow [`docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md`](../../../docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md) and the **2026-10-25 Archive Override** (**NO GitHub Releases** for MP4 binaries):

1. **Locate Parent & Allocate Sequence Number:**
   - Parent Google Drive Folder ID: **`1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`** (`Videos-shorts`).
   - Run `gdrive readonly ls 1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`, parse `^([1-9][0-9]*)\.\s+(.+)\s+-\s+(\d{4}-\d{2}-\d{2})$`, allocate `N = max(existing IDs) + 1`.
   - Create folder: `<N>. <Video Title> - <YYYY-MM-DD>` (`Asia/Ho_Chi_Minh`).
2. **Upload & Verify 3/3 Deliverables:**
   - `video-final.mp4` (`video/mp4`)
   - `thumbnail-youtube.png` (`image/png`, `1080×1920` for Shorts or `>= 1280×720` for 16:9)
   - `youtube-title-description.txt` (`text/plain`, UTF-8)
   - Read back Drive metadata (`gdrive readonly ls <folder_id> --json`) to confirm nonzero bytes and return verified Drive URLs.
   - Keep Drive files private and do NOT publish to YouTube/TikTok without explicit user approval.
