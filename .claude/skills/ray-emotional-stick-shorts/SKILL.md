---
name: ray-emotional-stick-shorts
description: Produce emotionally expressive Vietnamese stick-figure Shorts with polished multi-scene direction, character acting, natural voice and musical storytelling, based on ray-video-10-phut.
---

# Ray Emotional Stick Shorts

Specialization of [ray-video-10-phut](../ray-video-10-phut/SKILL.md). Preserve canonical `ray-pineline-worflow-agent` and repo gates; do not invent approvals or bypass pipeline. This skill specializes **30–45s, 9:16** films with approximately **12–20 purposefully distinct shots**. Reference aesthetic: approved V5 "Hai phần ăn, một người": white expressive stick figures, nearly black background, restrained amber accents, deeply emotional narration and piano.

## Rules

1. Read repository AGENTS/CLAUDE rules, canonical pipeline and parent skill before executing. Gate order: A → Content/Audio/D → Motion → E → B → C → final QA/eval.
2. Develop three hooks, choose one story question and visual motif. Script short conversational Vietnamese around the measured utterance durations, not forced reading speed.
3. Build a stable character bible: line widths, proportions, joint pivots, face/head orientation, prop attachment, screen direction and 5 expressive poses. Emotion lives in tiny gestures, anticipation and breathing, not random effects.
4. Create a shot list with each shot's narrative purpose, camera, actor action, continuity anchor, transition, audio and target timing. Establishing → medium → insert → reaction → visual metaphor → climax → release. Do not cut solely to increase shot count.
5. Use frame-driven easing and at most two predominant transition families: match cuts, camera continuity, prop transformation, intentional holds and selective J/L-cuts. Render boundary-frame strips to inspect jumps, flashes and disconnected props.
6. Use the frontend-design pass and mobile-safe captions, especially Vietnamese diacritics; reference layout tokens: near-black #08090B, white #F5F5F4, gray #85878A, amber #EF9E69. Deviate only with user approval.
7. Cast each speaker, audition Vietnamese pronunciation and emotion, measure actual audio, synchronize to shots and captions. Use Vbee AIVoice as the default and required narration provider for this skill. Never substitute HeyGen Paul or other providers unless the user explicitly requests a different voice. If Vbee cannot be synthesized, report the audio gate BLOCKED and do not label existing Paul or music-only clips as Vbee FULL video. Keep metadata/directions out of spoken text.
8. Compose a licensed/original subtle piano score tracking emotional stages. Duck below intelligible voice, verify true peak and integrated loudness as feasible, and **listen to final MP4**, not only a source WAV.
9. Use canonical Remotion build/render and review gates when accessible; record honest partial/previews if unavailable. Verify final MP4 has **both audible speech and music**; music-only file must never be labeled FULL.
10. Publishing and remote upload require distinct authorization. vidIQ import is not publishing. Save durable media IDs, not signed URLs, credentials or OAuth tokens.

Read [integrations](references/integrations.md), [creative direction](references/directing.md), and [video #12 production manifest](../../../docs/video-12-cho-duoc-lua-chon/README.md).

## Standard output

`docs/<vid>/brief.md`, `script.md`, `shot-list.csv`, `character-bible.md`, `design-spec.md`, `voice-sync.md`, `music-cues.md`, `motion-spec.md`, `transition-QA.md`, `asset-manifest.md`, `eval.md`; genuinely verified `out/<vid>-reel.mp4` when rendered. No channel name in narration unless user explicitly requests it.


## Mandatory vidIQ delivery contract (after every successful video)

Once final MP4 passes visual, spoken-voice and sound QA, upload **the complete AV file** into the user's vidIQ media library via `vidiq_video_upload`. Store its durable `uploadId` in `docs/<vid>/asset-manifest.md`. Call `vidiq_video_upload({uploadId})` to retrieve a fresh video URL whenever the user requests the result; never share an expiring S3 compose URL in preference to the vidIQ-hosted asset. In the final reply always provide a clickable **"Xem / tải video trên vidIQ"** link (the actual media URL returned by the upload action) and the upload ID so the signed link can be refreshed. Be transparent: the media URL is not a vidIQ dashboard URL and remains expiring; do not invent a permanent dashboard URL. If vidIQ import or QA fails, declare that the full deliverable is blocked and do not substitute piano-only/preview footage. Do not publish to YouTube unless separately authorized.

### Binary video archive
Store the final, reviewed MP4 at `docs/<vid>/final/<vid>-full-voice-piano.mp4` in the repository (or Git LFS / release asset when Git's size limits apply), with measured metadata + SHA-256 in the manifest. Do not assert the video is archived in GitHub based only on a README, screenshot, external URL, video job, or local MP4. Verify via repository file listing (or release asset) and perform playback verification from the archived artifact.

## Mandatory Vbee narration provider

Vbee is the **primary/default voice provider** for every NEW video in this skill, because the user has purchased a Vbee subscription. See `references/vbee-provider.md` and follow it. No automatic fallback to HeyGen, vidIQ TTS, system TTS, or silent voice. User must explicitly authorize a different provider.

Modes:
- **Automatic Chat → GitHub Actions → Vbee Batch (default):** use already-deployed HTTPS callback `https://iehmucsshklgjmxqyggp.supabase.co/functions/v1/vbee-batch-callback`; no separate `VBEE_WEBHOOK_URL` GitHub Secret is required. GitHub Actions reads `VBEE_APP_ID`, `VBEE_ACCESS_TOKEN` secrets, creates Vbee Batch voice using `scripts/vbee_tts.py`, polls `GET /v1/tts/requests/{requestId}`, immediately downloads audio, verifies MP3 with ffprobe, then blends with the visual/piano, archives fully voiced MP4 and uploads to vidIQ when connectors/workflows permit. This callback endpoint is a lightweight 204 acknowledgement only; the polling endpoint is authoritative. Real Batch synthesis with Thanh Long succeeded on 2026-10-23; workflow initially failed later on missing ffprobe, subsequently fixed. Do not claim fully assembled video until verified.
- **Manual Studio export (contingency only):** if automated Vbee route fails despite retries/real validation, the user can export MP3/WAV from Vbee Studio, but do not present it as the default.
- **Realtime API:** Not a valid default substitute; Vbee returned HTTP 400 `This feature is not supported in user package` in authenticated GitHub Actions on 2026-10-23, despite configured App ID/token. No retry loop or assumption that purchasing a higher package enables this endpoint. Realtime docs currently list specific female voices only; male Thanh Long requires Batch or Studio export.

Voice direction: warm, intimate, restrained melancholy with a hopeful turn; slow conversational cadence near 0.93–0.97x where supported, authentic Vietnamese pronunciation, breath and purposeful pauses (especially at hook and final sentence). Prefer testing HN – Thanh Long first, SG – Minh Hoàng as second male candidate where available. Always audition; voice identity/quality cannot be asserted before listening. Vbee studio voice may differ from API voice.

Gate: verify input audio exists and is Vbee-originated; measure duration and align 12–20 shots, captions and music; listen to FULL final MP4 and verify original piano behind narration. Publish none automatically. After completion upload the verified FULL MP4 to vidIQ, return current downloadable media link plus stable upload ID, and commit approved MP4/source manifests on the active GitHub branch automatically. If Vbee audio is unavailable, provide previews only with an explicit `BLOCKED_VBEE_VOICE` status.

## Hard duration gate: YouTube Shorts

All new Shorts must have a final, measured duration between **30.00 and 45.00 seconds** inclusive unless the user explicitly overrides it. Aim **37–41s** with a complete emotional arc, not stretched silence or arbitrary slow-motion; write enough authentic narration and distinct intentional acting beats to justify the duration. Validate with `ffprobe` on the exact final MP4 and block release if out of range. This applies to Vbee, piano, vidIQ delivery and GitHub archiving. YouTube has no guarantee of view count or mandatory optimal length: this is the creator's production requirement.

## Cross-conversation video storytelling memory: applies to EVERY topic (2026-10-24)

This skill's **mandatory script standard**, including when used in a different ChatGPT conversation, is `docs/standards/youtube-shorts-retention-universal.md`. **Never skip it based on topic**: love/healing, parents/family, grief, horror, school, life lessons and informational Shorts all require a compelling first frame, 3 candidate hooks, measurable real VO pacing, rising plot stakes or credible information reveals, memorable emotional or informational payoff, purposeful shots and a continuity/retention self-review before render. Follow the source doc rather than promising “million views” or inventing performance numbers; keep every new short within the user's 30–45s default unless explicitly overridden. Re-read current GitHub file in later chats; this note is a durable repo source pointer, not a claim that ChatGPT account Memory itself was modified.
