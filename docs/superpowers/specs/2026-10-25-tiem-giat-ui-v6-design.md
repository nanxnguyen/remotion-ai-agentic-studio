# Laundry Horror V6 — Hybrid Cinematic Design Spec

**Status:** PROPOSED / awaiting owner approval (2026-10-25). **Decision already made by owner:** option B — Hybrid Cinematic, selective rebuild. This document does not authorize production, publishing, or replacing V5.

## Source of truth and scope
- Story: **Tiệm Giặt Ủi Nhận Đồ Từ Ngày Mai**, 60-second supernatural horror, Cô Thu (54), an unplugged spinning washer, tomorrow's 02:17 receipt, her phone, anticipatory reflection, locked machine, flooding, trapped-self phone image, outside double.
- V5 Drive archive #18: https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN ; MP4 https://drive.google.com/file/d/1REkgLXtROoxACwF0eFMJg9WeYA01kuZf/view?usp=drivesdk. Treat V5 as a comparison baseline, **not a QA-approved reference for continuity**.
- V5 report `docs/tiem-giat-ui-nhan-do-tu-ngay-mai/v5-fullhd60-production-delivery.md` states 1080×1920/60fps, original Vbee 16 MP3, and incomplete canonical repo gates. Existing code on PR #70 contains `storyboard.json`, `voice-lines.json`, Vbee workflow, and QA reports; **no dedicated Remotion composition currently exists**.
- Genuine original Vbee: Github Actions run `40172785416`, artifact `12590174732` (time-limited; download and verify early), voice code `hn_male_phuthang_stor_24k-stl`; never synthesize a replacement using other TTS without explicit approval.

## Why V6
Viewer must see the cause/action/result for important voiced beats: V5 still relies on upscaled still artwork and graphic overlays in some shots. Repetitive washer-side frames reduce escalation; reflection and reveal need clearly distinct, legible camera geography. Target is an engaging visual story, not a claimed/guaranteed algorithmic uplift.

## Intent / goals
1. Deliver **one cinematic Shorts master** 9:16, 1080×1920, 60fps, `<=60.000s`, H.264 yuv420p/AAC, no video freeze, clipped narration, text contamination, or misleading thumbnails. Native output dimensions/FPS are mandatory; source detail cannot be invented by upscaling.
2. Preserve exact story facts, protagonist identity and final switch; retain 16 verified Vbee MP3s and author all timings from measured durations.
3. Upgrade **at least the following 7 visual interactions** with time-coded BEFORE → ACT → RESULT and actual extracted MP4 proof: (a) unplugged cord + moving drum 0–2s; (b) mirrored smile ahead of actor 26–30s; (c) STOP pressed / rotation accelerates 30–34s; (d) tug / locked latch 34–38s; (e) water seal low→higher waterline 38–42s; (f) phone recording shows trapped Thu 42–48s; (g) double outside vs trapped original 48–60s.
4. Reduce shot repetition with at least three distinct shot families: macro prop/hand, interior tracking/OTS, POV inside drum/exterior rainy doorway. Character and props remain spatially coherent.
5. Native Vietnamese captions, normally 1–2 short lines; color ivory/amber/crimson to emphasize clues, safety away from Shorts/TikTok UI. Timecodes/storyboard borders exist *only* in review assets.
6. Run repository canonical video stages and factual review gates, structural tests, whole-MP4 decode, visual evidence sampling, full listen and truthful evidence manifest before declaring FINAL.

## Non-goals / forbidden shortcuts
- No plot rewrite, alternate ending, additional dialogue, or arbitrary AI presenter; no full rebuild of every shot unless a reused shot demonstrably fails continuity.
- No reliance on ken-burns or text alone to claim that a narrated physical action occurred. Not required: lifelike actor performance; 2D/2.5D with visible action is acceptable.
- No fabricated QA score, no publishing to YouTube/TikTok, no new numbered folder for the same film, no GitHub Releases (latest repo Ray override).
- No sharing/link permission changes; preserve existing Drive sharing state and all V5 assets.

## Alternatives considered
- **A: V5 polish only:** inexpensive, does not address missing action states (rejected).
- **B: Hybrid cinematic reconstruction (SELECTED):** reuse verified voice and good shots; create stateful 2D/2.5D composites or properly licensed short clips for action shots; frame-driven Remotion composition; balanced control, cost and continuity.
- **C: Whole-film generative motion:** high spend and identity drift (not selected).

## Character, continuity and look
- Thu: Vietnamese woman age 54; low bun with recognizable silver streak above right temple, moss-green top and dark apron; duplicate is visually identical except unsettling calm smile. This is the **canonical bible**, overriding inconsistent V5 source art; a style frame is not approval unless visually reviewed.
- Room geography: single shop; washer **frame left**, rainy storefront door **frame right**, consistent screen direction. Don't flip washer orientation between shots.
- Props: gray collared shirt, tomorrow 02:17 receipt in a readable native-text layer (customer Cô Thu), burgundy phone with a distinct crack; maintain consistent phone in reveal.
- LUT: dark cyan/teal shadows, warm practical highlights, deep but readable skin detail; restrained crimson accents at threat beats. Practical water/reflection light consistent with geography.
- Default transitions: **0.35–0.55 sec soft fade/crossfade** without face double-exposure or caption ghosting. Use eased sub-pixel moves; no shake, flash, or glitch shortcuts.
- Source assets: prefer independent clean vertical original art or clip states; mask/layer composites have explicit license/provenance. The 4×4 captioned storyboard is exclusively for review.

## Narrative / evidence design (time is provisional until actual Vbee mapping locked)
| Window | Narrative contribution | Required perceptible state |
|---|---|---|
| 00–06 HOOK | Impossible washer + shock | disconnected plug and washer visibly turning in same beat; human reaction follows |
| 06–14 BODY | Receipt from tomorrow / name | legible native type + Thu recognition |
| 14–26 BODY | Her own phone, warning | physical extraction, unique crack, empty apron pocket, waveform and whisper |
| 26–30 BODY | Reflection moves first | real Thu static mouth vs smiling mirrored double, sequentially observable |
| 30–34 CLIMAX | STOP fails | pressed button and accelerated drum proven across frames |
| 34–38 CLIMAX | Escape fails | hand grabs and physically pulls latch, door stays shut |
| 38–42 CLIMAX | Water arrives | dry rubber seal → drops → rising visible dark waterline on tiles |
| 42–48 CLIMAX | Phone impossible footage | identifiable phone screen showing same Thu pounding from inside washer |
| 48–56 PAYOFF | Mirror missing, outsider arrives | reflection vanishes, duplicate walks to glass entrance from rain |
| 56–60 PAYOFF | Identity swap | trapped original pounding from interior POV, double remains outside, sustained readable final frame |

## Technical architecture
- Real composition at `src/videos/tiem-giat-ui-v6/` with `index.ts`, `Reel.tsx`, `timeline.ts`, `shots/`, `assets.ts`, `typography.tsx`, `audio.ts`; register via `src/videos/registry.ts` only. Reuse existing `src/core` typed video contracts and scripts; inspect a current video definition before implementing.
- 3600 frames @60 fps, frame-deterministic layer animation and composite props, native caption timing; no wall-time randomness. Scene transitions may overlap but output duration must remain exact.
- Input contract: `storyboard.json`, media manifest with source rights and dimensions, `measured-timeline.json` with original MP3 SHA-256, and `voice-visual-evidence.json`. Asset paths resolve locally; missing files throw rather than silently render black.
- Media sources and actual Vbee files are stored in authorized runner/Drive/asset cache, **not checked into Git** unless licenses and policy explicitly permit. Git stores scripts, small configuration manifests, checks and documentation only.

## Acceptance / stop-ship criteria
- **P0 STORY ACTION:** all 7 critical interactions have reviewer-observed MP4 frame samples showing action causality, readable on a phone at 9:16; no still-only narration. Failure blocks FINAL.
- **P0 VOICE:** all 16 authentic Vbee hashes match artifact metadata; mapping fits 60s with no overlap that makes speech unintelligible or cuts a syllable; final mix reviewed end-to-end.
- **P0 CONTINUITY:** same Thu, clothing, washer layout, phone crack; no plot-breaking mirror/clone identity ambiguity.
- **P0 MEDIA:** 1080×1920/60, exact 3600 frames, <=60.000s, H264/AAC, ffprobe + full ffmpeg decode passed, no black/freeze/unsafe captions.
- **P0 PIPELINE:** `npm run verify`, `npm run test:visual`, `python3 -I scripts/pipeline.py audit tiem-giat-ui-v6`, and all canonical reviewer gates A/content/audio/D/motion/E/B/C have actual reports. Unrun gate = BLOCKED, never PASS.
- **P1 ART:** clearer native-resolution hero scenes, contrast and motion, atmospheric sound; comparison with V5 by same-frame contact sheets, no fabricated retention metrics.
- **DELIVERY:** final approved MP4 + 9:16 thumbnail + UTF-8 YouTube text uploaded as version V6 under the **existing #18 folder**. Read back IDs/MIME/size/URLs/checksum if available; preserve V5; do not publish.

## Risks & mitigations
- Voice artifact expires: fetch/checksum it at Task 1; if unavailable, rerun Batch with existing GitHub Secrets and record fresh run.
- Image-to-video identity drift: use controlled layered poses and matching reference character; reject inconsistent generated frames.
- Real 60fps vs interpolated movement: verify object/hand motion and 1–2fps contact sheet plus frame-level sequences; smooth fps alone never proves motion.
- High-res encoding/Drive size limit: use independent archival master and QA-equal distribution encode; test stream/framerate/duration and audit uploaded bytes; do not label re-encoded copy bit-identical.
- Repo pipeline vs local FFmpeg: create canonical Remotion video definition and run full workflow; if any audit blocked, keep V6 REVIEW and leave V5 intact.

## Decisions still for approval
This design selects B, keeps existing plot/voice and prioritizes 7 P0 action sequences; does not assume a paid image-to-video service is available. **Owner approval of design + plan** is required before code/asset implementation.
