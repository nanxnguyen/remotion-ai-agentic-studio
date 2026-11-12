# Laundry Horror V6 Hybrid Cinematic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a stronger and verifiably production-ready V6 Vietnamese horror Short through selective action-shot reconstruction, authentic Vbee reuse, and canonical Remotion QA.

**Architecture:** Add one independent frame-deterministic video definition under `src/videos/tiem-giat-ui-v6/`, register in the shared registry, use clean scene assets plus animated composites for 7 P0 physical changes, and load the 16 measured authentic Vbee recordings. Gather scene-specific MP4 proof and run canonical pipeline gates before delivering into existing Drive folder #18.

**Tech Stack:** TypeScript/React, Remotion 4, Node 22, Python 3.12, FFmpeg/ffprobe, existing GitHub Actions Vbee Batch, Google Drive.

**Spec:** `docs/superpowers/specs/2026-10-25-tiem-giat-ui-v6-design.md`

## Global Constraints
- Vertical **1080×1920**, **60fps**, **3600 frames**, duration **<=60.000s**; H264/AAC.
- Preserve story, 16 Vbee MP3s and genuine SHA-256 provenance; no substituted voice.
- Clean source images, native Vietnamese text, 0.35–0.55s fades, no hard shake/glitch.
- Evidence for unplugged drum, reflection, STOP, latch, water, phone, and outside/inside double.
- Final requires pipeline gates A/content/audio/D/motion/E/B/C, `npm run verify`, `npm run test:visual`, whole-MP4 QA, actual listening, evidence manifest; unrun is blocked.
- Existing Drive folder #18 is reused. GitHub = source/QA only, **NO GitHub Releases**, no publishing/sharing changes.
- V5 is immutable comparison baseline. This is **an unapproved plan**, not authority to implement.

## Repo structure (create only after approval)
- `src/videos/tiem-giat-ui-v6/index.ts`: typed exported video definition.
- `src/videos/tiem-giat-ui-v6/Reel.tsx`: 3600-frame master composition.
- `src/videos/tiem-giat-ui-v6/timeline.ts`: visual + measured audio/caption slots.
- `src/videos/tiem-giat-ui-v6/shots/ActionBeats.tsx`: 7 action states.
- `src/videos/tiem-giat-ui-v6/shots/StoryBeats.tsx`: retained and refreshed non-P0 scenes.
- `src/videos/tiem-giat-ui-v6/typography.tsx`: native caption render / safe zone.
- `src/videos/tiem-giat-ui-v6/assets.ts`: manifest validation, shot asset locator.
- `src/videos/tiem-giat-ui-v6/audio.ts`: Vbee + music/foley frame placement.
- `src/videos/registry.ts`: composition registration.
- `docs/tiem-giat-ui-nhan-do-tu-ngay-mai/v6/`: asset manifest, proof matrix, QA, handoff.
- `tests/tiem-giat-ui-v6.test.ts`: timeline/registration/asset checks (adapt to current test runner).
- `scripts/verify-laundry-v6-media.py`: MP4 metadata, audio provenance and proof structure preflight.

## Review Focus: five likely edge cases
1. **Voice overflows 2s hook slots:** use actual Vbee durations, retime without clipping or intelligibility-breaking overlap → Task 2.
2. **Clip fades double-expose clone identity:** caption-independent fades with visible hold on reveal → Task 4.
3. **Missing/low-resolution licensed asset:** reject asset pack before render, preserve provenance → Task 1/3.
4. **Fake motion from upscaled still:** require three actual image states/clear layer state deltas and human visual review → Task 3/5.
5. **Drive upload size limit / wrong parent:** test distribution encode + folder verification without overwriting V5 → Task 7.

---

### Task 1: Recover, audit and lock usable assets (P0)

**Files:** Create `docs/tiem-giat-ui-nhan-do-tu-ngay-mai/v6/asset-manifest.json`, `docs/tiem-giat-ui-nhan-do-tu-ngay-mai/v6/voice-provenance.json`; tests `tests/tiem-giat-ui-v6.test.ts`.

**Interfaces:** Produces `AssetEntry {id, path, width, height, rights, sha256, role}` and `VoiceEntry {id, file, durationSec, sha256, voiceCode}`.

- [ ] Write failing fixture test: assets with missing `path`, `rights` or hash are rejected; 16 voice IDs must be unique and have measured duration/hash.
- [ ] Run existing test command (`npm run verify` or scoped test runner) and record intentional failure.
- [ ] Fetch Vbee Actions artifact `12590174732` while valid, unpack, verify 16 hashes; if expired, regenerate **only by genuine Vbee Batch** and record new run.
- [ ] Audit V5 references; list every retained, re-rendered, and disallowed low-detail/storyboard-baked source. Build asset manifest with expected independent clean sources.
- [ ] Make tests pass against valid fixture and commit manifest/provenance **without audio binaries**.

**Acceptance:** all required assets have rights/status; 16 authentic Vbee originals verifiable before timeline work.

### Task 2: Lock the story and measured temporal model

**Files:** Create `src/videos/tiem-giat-ui-v6/timeline.ts`, update `docs/tiem-giat-ui-nhan-do-tu-ngay-mai/v6/shotlist.md`; test `tests/tiem-giat-ui-v6.test.ts`.

**Interfaces:** Export `V6Shot {id,startFrame,endFrame,phase,assetId,caption,voiceId,actionId?}`, `buildV6Timeline(voice: VoiceEntry[]): V6Shot[]`.

- [ ] Failing tests: output begins frame 0, ends frame 3600, no gap; 0–6/6–30/30–48/48–60 phase boundaries, Vbee line end <= overall duration.
- [ ] Verify red; implement timeline using actual durations rather than assumptions or forced `atempo`.
- [ ] Include seven action keys and time markers matching design spec; update caption entries in native Vietnamese.
- [ ] Verify green; reviewer checks plot/casting/twist continuity; commit.

**Acceptance:** frame-exact edit decision list with measured audio and non-spoiling payoff.

### Task 3: Rebuild seven stateful story-critical actions

**Files:** Create `src/videos/tiem-giat-ui-v6/shots/ActionBeats.tsx`, `src/videos/tiem-giat-ui-v6/assets.ts`, shot-specific clean assets; test `tests/tiem-giat-ui-v6.test.ts`.

**Interfaces:** `ActionBeatProps {kind: 'drum'|'reflection'|'stop'|'latch'|'water'|'phone'|'swap', relativeFrame:number, durationFrames:number}`; validates `AssetEntry`.

- [ ] Failing tests for frame `before`, `contact`, `result` properties per seven kinds, avoiding all-identical states.
- [ ] Verify red; author layered scene/clip state assets with locked face, costume, props and room geometry.
- [ ] Implement driven behavior: plug disconnect plus independent rotating drum; asynchronous mirror smile; pressed STOP+rpm increase; latch tug without opening; monotonic waterline rise; phone screen playback; final separated double/original camera POV.
- [ ] Render 3 frames per action; check **actual pixels**, fail any that are indistinguishable or inconsistent.
- [ ] Run green tests; peer review state transitions and commit.

**Acceptance:** 21+ reviewed proof images from 7 events, no action proved by caption alone.

### Task 4: Assemble compliant Remotion film and audio

**Files:** Create `src/videos/tiem-giat-ui-v6/index.ts`, `Reel.tsx`, `shots/StoryBeats.tsx`, `typography.tsx`, `audio.ts`; modify `src/videos/registry.ts`; test `tests/tiem-giat-ui-v6.test.ts`.

**Interfaces:** `tiemGiatUiV6Video: AnyVideoDefinition`, `V6Reel()`; consumes `V6Shot[]`, all assets and 16 Vbee tracks.

- [ ] Failing tests: registry ID unique, 1080×1920/60/3600; no baked storyboard layer; no captions in UI occlusion zone; transitions between .35–.55s.
- [ ] Verify red; implement deterministic `Sequence` / `AbsoluteFill` and frame-based transforms, fade isolation for captions/clone faces.
- [ ] Place real MP3s by measured line starts; add SFX ducking and one continuous restrained ambient track; no TTS fallback.
- [ ] Run targeted tests and `npm run verify`; inspect hook, middle, reveal preview; commit.

**Acceptance:** composition plays 60s in Studio; native titles are readable and full voice is aligned.

### Task 5: Render film + evidence and complete canonical phase gates

**Files:** Create `docs/tiem-giat-ui-nhan-do-tu-ngay-mai/v6/voice-visual-evidence.json`, `docs/.../v6/gate-reports/`, `scripts/verify-laundry-v6-media.py`.

**Interfaces:** `verify_media(path: str, evidence: str) -> dict` emits observed codec/frame/duration and structural evidence errors.

- [ ] Add failing tests for wrong fps, wrong size, missing AAC, >60s, missing proof path, out-of-window proof timestamp.
- [ ] Implement detector with ffprobe/FFmpeg + sampled proof path inspection; structural checker must not call itself a human visual reviewer.
- [ ] Run canonical pipeline phases/reviewers A/content/audio/D/motion/E/B/C with real reports, record fails honestly; render through registry.
- [ ] Extract 1–2fps contact sheet, 21+ proof frames and transition boundary frames; watch/review each P0 event in native vertical output.
- [ ] Listen to entire narration/music mix with a documented review; rerender on changes and repeat all downstream QA.
- [ ] Run `npm run verify`, `npm run test:visual`, `python3 -I scripts/pipeline.py audit tiem-giat-ui-v6`; save real outputs, commit source + QA only.

**Acceptance:** **all P0 gates PASS with evidence**; otherwise mark V6 REVIEW/BLOCKED, not FINAL.

### Task 6: Platform-quality comparison and package

**Files:** Create `docs/.../v6/v5-v6-comparison.md`, `docs/.../v6/QA-FINAL.md`; create new independent cover and `youtube-title-description-v6.txt` in production assets (no video binaries in Git).

**Interfaces:** Consumes verified MP4, contact sheets, P0 proof, typography and Vbee result.

- [ ] Compare V5 and V6 0–6s, 26–48s and 48–60s at matched real times; note action clarity, shot variety and continuity with evidence frames.
- [ ] Run caption spelling/mobile-safe-zone checks and inspect thumbnail truthfulness; render cover 9:16 without revealing twist.
- [ ] Consolidate all gate verdicts and source hashes. No invented performance or human preference scores.
- [ ] Commit comparison+QA docs only if truthful, link real local master provenance.

**Acceptance:** review document explains precisely what changed and why it was accepted.

### Task 7: Upload V6 safely to Google Drive and hand off

**Files:** Create `docs/.../v6/delivery-manifest.md`; update production `HANDOFF.md` with final links.

**Interfaces:** consumes QA-approved MP4, cover, copy and SHA-256 checks.

- [ ] Write a failed-then-passed upload preflight fixture for wrong parent, missing package file, or size-limit path.
- [ ] **Reuse existing folder #18** `1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN`; do not create folder #19.
- [ ] Upload a new version `video-v6-final.mp4`, `thumbnail-v6.jpg`, `youtube-title-description-v6.txt` while keeping V5 intact; if large, create separately QA-verified H264/AAC distribution encode.
- [ ] Read back each Drive file ID, MIME, size, direct parent and stable viewer URL; verify actual uploaded bytes against distribution hash when supported.
- [ ] Commit Drive pointers and final QA manifest, do **not** create GitHub Releases or publish to YouTube/TikTok.
- [ ] Return verified Drive video and folder links plus relevant source PR; if upload fails, mark BLOCKED, never fabricate URL.

**Acceptance:** 3 real V6 files verified on Drive, earlier V5 remains intact, no unverified approval claim.

## Execution order / proof checkpoints
`1 asset+voice intake → 2 timeline lock → 3 seven action composites → 4 Remotion+audio → 5 gated render+QA → 6 packaging → 7 Drive verification`.
Task 3 and 4 require timeline/asset interfaces; don't parallelize the critical render.
Each task: red test → implementation → green test → review → commit. Reviewer may reject task; no skip.

## Self-review status
- Coverage: all 7 target actions, voice, technical constraints, canonical gates and Drive retention have owners.
- Hard blockers: expired Vbee artifact, missing rights/clean shots, or any failed gate must stop FINAL.
- **No implementation has been run. All checkboxes remain unchecked.**
