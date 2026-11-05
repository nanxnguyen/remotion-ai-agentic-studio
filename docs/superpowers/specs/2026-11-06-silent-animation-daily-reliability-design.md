# Silent Animation Daily — Unattended Reliability Design

**Date:** 2026-11-06
**Status:** Proposed; implementation requires plan review
**Owner's objective:** One new original motivational 2D stick-figure film per scheduled trigger, natively rendered at 2560x1440 / 30fps / 180–240 seconds with real English highlighted captions, licensed/original soundtrack, verified final thumbnail/metadata, stored on private Google Drive and published to **Olise @olise-man** as **Private**, all without manual creative approval.

## Observed baseline (verified against repository main and active ChatGPT task)

- ChatGPT Automation **Silent Animation Daily** is Enabled, `Asia/Ho_Chi_Minh`, `RRULE:FREQ=WEEKLY;BYDAY=TU,TH,SA`, 08:00. The task selects **Silent Animation Factory V1.7** as creative workflow. Do not create another recurring scheduler or claim user-selected thinking effort is locked at runtime.
- PR #103 is merged into `main`. `src/videos/silent-factory-longform` and `.github/workflows/silent-factory-longform-render.yml` render the registered `SilentFactoryLongform` composition from a 36-shot JSON, 6,300 frames, 210 seconds.
- A prior native-2K render succeeded with full technical decode in Actions run 41975555991; `scripts/silent_factory_executor.py` records `creative_independent_review_complete=false` and `video_final_certified=false`. This is **technical success, not release clearance**.
- `scripts/silent_factory_release.py` and `.github/workflows/silent-factory-private-release.yml` are present, with SHA/review metadata checks and a Private-only existing uploader.
- **Root cause / confirmed failure:** `files__manage_library` handling a container MP4 path returned `container_session_expired`; the upload of a GitHub ZIP and some smaller file references succeeded. The current `DRIVE_REFRESH_TOKEN` used by `scripts/youtube_multi_channel.py` is Drive **read-only**. Neither the ZIP nor a thumbnail ID is a real Drive MP4 ID. A durable file-transfer path is missing.
- **Missing implementation:** no independently run full-film semantic/creative reviewer, and no persistently resumable controller that can perform up to five **genuine** changed 210-second renders and recover after task/runner termination.
- **Additional uncertainty:** recent `main` workflow runs 42101077313 (render) and 42101077369 (CI) concluded failure; detailed latest logs were unavailable through the connector when checked. Prior CI had baseline repository-wide Prettier errors. **Do not presume these newer failures share the same root cause.** Obtain reproducible failure evidence before touching production.
- Connector GitHub exposes file writes but not direct `workflow_dispatch`; the verified push-trigger approach remains valid for film job submissions. `GITHUB_TOKEN`-originated commits do **not** automatically trigger further workflows: use in-workflow jobs or `workflow_run`, not token-based recursive push assumptions.

## Goals / success contract

1. A single **durable** run identified by `film_id` and `attempt`, recoverable after ChatGPT task exit, runner failure, API timeout and retry. Exactly one Private YouTube upload per final video SHA; a thumbnail repair must **never** reupload the video.
2. Plugin still owns trend research, anti-duplicate check, new story/audit, creative decisions, editing instructions and scorecard. A connected runner does rendering, independent reviewer process, storage and final delivery. ChatGPT task initiates, observes or reports; it must not be assumed to run for hours.
3. A pass requires actual source/media inspection, 2560x1440/30fps, 180–240s, full decode, correct caption timing and burn-in, safe audio levels, original/licensed source, real Drive MP4 + thumbnail IDs/readback and YouTube Private ID/channel verification.
4. Initial independent semantic/creative review and up to **five actual** revised full-video renders (`attempt_00..05`). If creative subjective issues remain at attempt 05, owner permits `PRIVATE_RELEASE_CREATIVE_OVERRIDE` only when independent review happened and **all technical, rights and channel gates pass**. Never mark creative PASS falsely.
5. Observable failure: stable error code, per-step log, artifact/hash/receipt, bounded retry and notification/status; missing credentials or rights fail **closed** instead of silent success.
6. Zero new cron duplicates. Retain Tuesday/Thursday/Saturday 08:00 `Asia/Ho_Chi_Minh`. No Public/Unlisted uploads, no Higgsfield/OpenArt/HeyGen, no monetization/view guarantee.

## Non-goals

- Guaranteeing a zero-error cloud system, an exact YouTube view count, Public publishing, or user-independent creation of unavailable OAuth grants.
- Treating a contact sheet alone as full independent audiovisual storytelling review, or treating 5 repeated commits of unchanged MP4 as 5 corrections.
- Replacing the existing plugin creative workflow with a separate GitHub-only content generator.

## Architecture choice and trade-offs

- **Prompt-only / ChatGPT temporary container:** simple but already empirically unreliable (`container_session_expired`) and not durable across runs. Reject as primary production path.
- **Artifact ZIP → ChatGPT session → Drive:** useful for manual debugging; not production-stable and needs a live, same-session bridge. Keep as fallback only.
- **Chosen:** persist the job + state and artifacts in GitHub-controlled resources; use GitHub Actions with a separately authorized Drive **write** token (one-time OAuth owner consent), resumable binary upload and readback. Drive read-only token continues in existing YouTube uploader. The film review runs independently on the actual video; each stage checks signed/hashed evidence. An Actions job group is responsible for delivery even after the ChatGPT automation turn ends. This removes the ephemeral container from the critical publishing path.

**Credential constraint:** granting write access is a one-time owner authorization; neither the plugin nor plan can generate it. Prefer least-privilege `drive.file` with verified ability to create within the preapproved Videos-shorts folder; otherwise obtain a narrowly dedicated Drive writer OAuth grant with documented scope. Keep refresh tokens in GitHub encrypted Secrets, never repo files or logs.

## State and component contracts

`run_key = <local-date>/<film-slug>` with `manifest_sha`; state transitions:
`CREATED → SCRIPT_AUDITED → RENDERING → TECH_QA_PASSED → CREATIVE_REVIEW → (REPAIR_PENDING → RENDERING)* → RELEASE_CLEARED → DRIVE_STAGED → PRIVATE_PREFLIGHT → UPLOADING_PRIVATE → UPLOADED_PRIVATE`.
Hard failures move to `FAILED_RETRYABLE` or `BLOCKED_HARD_GATE`. Duplicate source SHA transitions to `ALREADY_UPLOADED_PRIVATE` only after a read-only API verification of same channel and privacy.

State is checkpointed in one durable per-film GitHub issue/receipt plus immutable Actions artifact SHA references; write a `run-id` and `video_sha` to every step. GitHub Actions issue updates do not require recursively triggering workflows. Ensure per-film concurrency and a channel-wide upload lock/duplicate reconciliation.

- **Starter:** Silent Animation Factory V1.7 plugin produces one unique `config/silent-factory/jobs/<date>-<slug>.json` on `main` using the existing connector; push starts the worker. New story must be independently script-audited before render.
- **Render:** existing Remotion/FFmpeg workflow, extended to capture exact frame count, actual burn-in evidence and provenance of original audio.
- **Independent QA:** different reviewer code/process and bounded real-video coverage (full technical frame/audio decode, actual encoded all-shot motion/contact/boundary samples, all caption cues and audio sections; visual semantic reviewer clearly distinguishes sampled inspection from continuously watched frames). If a genuine multimodal reviewer runtime is unavailable, record the blocker and do not fabricate attestation.
- **Repair:** reviewer defects are concrete `shot_id`, `timecode`, `severity`, `expected_visible_change`; regenerate only changed sources and full encoded MP4, confirm new SHA and coverage, up to five real rounds.
- **Drive:** upload actual MP4/JPEG using authorized writer, resumable uploads with retries, verify mime, size, MD5 where available, and via independent readback SHA comparison.
- **Release:** reuse Private-only uploader and its receipt. A completed receipt includes full video ID, channel ID, privacy, thumbnail status and source SHA; partial thumbnail failure resumes the same YouTube video.

## Risk controls and test acceptance

- Input duplicates, racing cron/manual triggers and action retries → one run/film, one Private upload by SHA, receipt-first reconciliation.
- Network 429/5xx → finite exponential backoff with jitter; invalid OAuth / 403 insufficientScope → fail clearly and notify, never loop forever.
- GitHub runner killed during upload → resumable Drive upload; upload receipt/YouTube lookup on resumption; do not upload duplicates.
- Reviewer absent, reviews different SHA or skips the soundtrack → fails release gate. Five repairs do not waive hard gates.
- CI baseline formatting debt → reproduce from `main`, isolate new-file defects, repair existing baseline separately before enforcing green branch protection.
- End-to-end criterion: one newly generated **nonduplicated** film reaches Drive and real Olise **Private** YouTube ID; perform three sequential manual-trigger dry/canary runs and fault-injection tests for transfer, reviewer, OAuth, duplicates, and runner restart. A scheduled run alone is not acceptance.
- Operational objective is **no silent failure or duplicate publish**; true zero faults is not a defensible guarantee.

## Scope for implementation plan

Plan at `docs/superpowers/plans/2026-11-06-silent-animation-daily-unattended-reliability.md` covers baseline diagnosis, durable run state, independent QA/repair, reliable Drive writer, Private publisher reconciliation, cron/skill wiring and three full canary verifications. Do not mutate the active cron during planning.
