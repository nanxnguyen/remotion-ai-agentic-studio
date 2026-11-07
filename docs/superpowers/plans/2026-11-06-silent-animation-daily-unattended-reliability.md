# Silent Animation Daily Unattended Reliability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each scheduled Silent Animation Factory run independently and reliably produce an auditable original stickman 2K FINAL, archive verified MP4/thumbnail on Drive, and upload only Private to Olise without manual creative approvals, while failing visibly instead of silently when hard dependencies are unavailable.

**Architecture:** Keep **Silent Animation Factory V1.7+** as the creative controller, and GitHub Actions as the persistent long-running executor. Replace ChatGPT's ephemeral MP4→Drive file handoff with an authorized, resumable runner-side Drive writer. Add immutable SHA-linked full-video media/reviewer evidence, an event-driven repair state machine, and idempotent Private publishing with receipt reconciliation.

**Tech Stack:** Python 3.12 (unittest, Google Drive/YouTube API clients), Node.js 22, React/Remotion 4, FFmpeg/FFprobe, GitHub Actions, GitHub issue/artifact APIs and ChatGPT Automations.

**Spec:** `docs/superpowers/specs/2026-11-06-silent-animation-daily-reliability-design.md`

## Global Constraints

- Single existing ChatGPT automation `Silent Animation Daily`, **Enabled TU/TH/SA 08:00 Asia/Ho_Chi_Minh**. No duplicate cron.
- New, original motivational **stick-figure** 2D films; no Higgsfield/OpenArt/HeyGen. Audience-facing English.
- Actual movie **2560×1440, 30 FPS, 180–240s**, tested reference composition 210s/6,300 frames; highlight captions burn-in; original/rights-verified audio.
- 36 timed shots with 12–25 highlighted captions in current render manifest schema; avoid reusing example `the-missing-step-20261105.json` for new daily film.
- Script gate: quality≥85/100, growth≥38/50, hook≥12/15, logic≥12/15, no story-critical Blocker/Major. Separate script-audit from post-render media QA.
- Genuine post-render QA baseline plus at most **five changed full-film re-renders**. After attempt 05 only **subjective creative** deficiencies may use `PRIVATE_RELEASE_CREATIVE_OVERRIDE`; objective media, rights, caption and channel gates never bypassed.
- YouTube only `OLISE_MAN` / `UCY3n3Nlqyo6uI4GU8nuX-5g` / `privacy=private`; real exact SHA, Drive IDs, video ID + receipts required. Never Public/Unlisted.
- Do not claim runtime GPT-6 Extra High configured simply because it appears in a prompt; don't invent OAuth grants, reviewer capacity or results.
- User must consent once to any new Drive-writing OAuth scope; token values go only to encrypted GitHub Secrets.
- Implement **red → green** test cycles. Commit each task separately after independent verification. No implementation until this plan/design is reviewed.

## Review Focus (each covered by a corresponding task regression test)

1. **Duplicate manual+scheduled trigger** with same `film_id` → one durable run and at most one YouTube video (Task 2 + Task 6).
2. **Artifacts older than runner/reviewer session** or missing/untrusted SHA → never declare QA PASS, retain resumable status (Task 2 + Task 3).
3. **Drive HTTP 403, expired OAuth or partial resumable upload** → exact blocker or bounded retry, no ZIP passed as MP4 (Task 4).
4. **Unreliable subjective reviewer / missing audio coverage / fake five retries** → no release attestation; override only after six distinct SHA-bound real reviews (Task 3 + Task 5).
5. **YouTube video inserted but thumbnail update fails or job crashes** → persist the existing video ID and repair its thumbnail without duplicate upload (Task 5).

---

### Task 1: Reproduce current failures; establish a trustworthy preflight baseline

**Files:**
- Create: `scripts/silent_factory_doctor.py`
- Create: `tests/test_silent_factory_doctor.py`
- Modify: `.github/workflows/silent-factory-longform-render.yml`
- Review (do not broadly rewrite): `package.json`, `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: checked-out repository, tools, allowlisted channel config, presence-only secret indicators.
- Produces: `check_environment(*, dry_run: bool=True) -> dict` with version, composer, ffmpeg, expected trigger/branch, scoped auth availability and fail-code list; **never logs secrets**.

- [ ] **Step 1: Write failing tests** `test_detects_missing_ffprobe`, `test_rejects_missing_reviewer`, `test_detects_readonly_drive_token_as_writer`, `test_handles_multiple_changed_manifests` and `test_verifies_main_branch_trigger`.
- [ ] **Step 2: Run red**: `python -m unittest discover -s tests -p 'test_silent_factory_doctor.py' -v`; confirm new doctor tests fail before implementation.
- [ ] **Step 3: Reproduce the observed CI/render failures**: inspect `main` runs 42101077369 and 42101077313 or trigger a fresh diagnostic push if historical logs are unavailable. Capture exact failing step and runner stdout as artifact. Compare with successful 210s render 41975555991; do not assume Prettier explains the newest failure.
- [ ] **Step 4: Implement doctor and resilient job selection**: use GitHub event `before/after` diff or an explicit immutable job key; make a manifest-triggered render reject ambiguous commits and never silently choose an old story. Separate existing formatting debt from new-file errors; scope formatting fixes narrowly, put repository-wide Prettier cleanup in an independent PR if necessary.
- [ ] **Step 5: Run green**: doctor unittest, `python -m unittest discover -s tests -p 'test_silent_factory_executor.py' -v`, `npm run typecheck`, relevant `npx prettier --check`, and fresh Actions preflight; record failures as *baseline* vs *introduced*.
- [ ] **Step 6: Commit** `fix(silent-factory): reproducible executor preflight and trigger validation`.

### Task 2: Durable run identity, lock, state and restart recovery

**Files:**
- Create: `scripts/silent_factory_run_state.py`
- Create: `tests/test_silent_factory_run_state.py`
- Modify: `.github/workflows/silent-factory-longform-render.yml`

**Interfaces:**
- `make_run_key(local_date: str, film_slug: str) -> str`
- `transition(state: dict, event: str, evidence: dict) -> dict`
- `resume(state: dict, observed_actions: list[dict]) -> dict`
- Persist per-film status and `run_id, manifest_sha, attempt, artifact_id, rendered_sha, drive_ids, youtube_video_id` to a **durable GitHub issue/receipt**. Immutable GitHub Actions artifact stores actual media/report; do not rely on ChatGPT ephemeral storage.

- [ ] **Step 1: Write failing tests** for legal/illegal transitions, second start of same key, different SHA for same attempt, lost runner after render, duplicate callbacks, previous video uploaded with thumbnail pending, stale GitHub artifact and missing receipt.
- [ ] **Step 2: Run red**: `python -m unittest discover -s tests -p 'test_silent_factory_run_state.py' -v`.
- [ ] **Step 3: Implement state machine** `CREATED → SCRIPT_AUDITED → RENDERING → TECH_QA → CREATIVE_REVIEW → REPAIR_PENDING (0..5) → RELEASE_CLEARED → DRIVE_STAGED → PRIVATE_PREFLIGHT → UPLOADING_PRIVATE → UPLOADED_PRIVATE`; explicit `FAILED_RETRYABLE` and `BLOCKED_HARD_GATE`. Use per-film GitHub issue as durable status with artifact pointers and append-only SHA receipts.
- [ ] **Step 4: Wire concurrency and bounded retries** for render/network steps; never assume a commit created by `GITHUB_TOKEN` will trigger a new workflow. Chain steps within Actions or `workflow_run` with scoped permissions; only the ChatGPT connector job submission uses the proven external push trigger.
- [ ] **Step 5: Run green**: all state tests and a two-trigger collision simulation with exactly one durable `film_id`; confirm restart resumes from stored artifact instead of repeating an accepted upload.
- [ ] **Step 6: Commit** `feat(silent-factory): persist and resume one film run safely`.

### Task 3: Real independent full-film QA + genuine five-round creative repairs

**Files:**
- Create: `scripts/silent_factory_media_review.py`
- Create: `tests/test_silent_factory_media_review.py`
- Modify: `scripts/silent_factory_executor.py`
- Modify: `src/videos/silent-factory-longform/Reel.tsx`
- Modify: `.github/workflows/silent-factory-longform-render.yml`

**Interfaces:**
- `review_media(video: Path, story: dict, *, reviewer_id: str) -> dict`: return actual video SHA, measured full decode, shot/caption/audio coverage, `defects[shot_id,timecode,severity,fix]`, reviewer method and `technical_pass`/honest `creative_pass`.
- `plan_repairs(previous_review: dict, revision: int) -> dict`: concrete changed shot/camera/acting instructions only, no fake rating.
- `assert_release_basis(reviews: list[dict], hashes: list[str]) -> str`: creative PASS or owner-authorized Private override only with `attempt_00..05` distinct actual encoded hashes.

- [ ] **Step 1: Write failing tests** for wrong reviewer SHA, partial 36-shot coverage, sound unreviewed, missing caption cue, stagnant frames, unchanged SHA after a claimed fix, sixth repair prohibition and creative override with a hard IP failure.
- [ ] **Step 2: Run red**: `python -m unittest discover -s tests -p 'test_silent_factory_media_review.py' -v`.
- [ ] **Step 3: Build independent media review process**: FFmpeg fully decodes 6,300 frames and soundtrack; second reviewer analyzes **actual encoded** every shot using start/middle/end and relevant short clips/motion/hand-contact/camera metrics, all caption cue time ranges, plus five musical sections. Persist precisely what media was inspected; never claim continuous subjective review of every frame if only sampled. For story/acting semantic scoring, configure a **real available multimodal reviewer**, otherwise block with `REVIEWER_UNAVAILABLE` (no fabricated attestation).
- [ ] **Step 4: Implement edit→render→review loop**: correction changes source/story action, actual MP4 changes SHA, independent reviewer runs again, artifacts named `attempt_00..05`. If objective gates pass and subjective issues remain after fifth genuine fix, record `PRIVATE_RELEASE_CREATIVE_OVERRIDE` with `creative_qa_passed=false`; no hard-gate waiver.
- [ ] **Step 5: Run green**: deterministic fixture/video tests for 36 shots and captions; negative tests for silent/frozen/repeating shots; one small local smoke render and at least one **real full 210s** repair integration run on Actions. Confirm report includes video hash and all inspected timecodes.
- [ ] **Step 6: Commit** `feat(silent-factory): independent SHA-bound QA and five real correction cycles`.

### Task 4: Remove ephemeral file bridge using a reliable Drive writer

**Files:**
- Create: `scripts/silent_factory_drive_writer.py`
- Create: `tests/test_silent_factory_drive_writer.py`
- Modify: `.github/workflows/silent-factory-longform-render.yml`
- Review: `scripts/youtube_multi_channel.py` (retain its existing read-only `DRIVE_REFRESH_TOKEN`)

**Interfaces:**
- `upload_verified_media(video: Path, thumb: Path, folder_id: str, sha256: str) -> dict` returns `video_drive_id, thumbnail_drive_id, mime_type, size, verified_sha256` with **readback of real bytes**.
- New GitHub Secret `DRIVE_WRITE_REFRESH_TOKEN` only after owner consents to a Drive-writing scope and the runner successfully verifies access to the existing private folder.

- [ ] **Step 1: Write failing tests** for credential missing/403, ambiguous parent folder, resumable upload interrupted at 30%, Drive metadata claiming wrong MIME, duplicated content hash, ZIP mistaken as MP4 and checksum mismatch.
- [ ] **Step 2: Run red**: `python -m unittest discover -s tests -p 'test_silent_factory_drive_writer.py' -v`.
- [ ] **Step 3: Implement direct runner→Drive binary upload** with resumable chunks, finite exponential backoff+jitter, deterministic name/parent, SHA and readback size/MIME/download verification. Use `drive.file` only if it can access the required parent folder; otherwise document required explicit Drive-writer consent. Never expose refresh token. Keep the downloader's **read-only** grant separate.
- [ ] **Step 4: Integrate writer after full media acceptance**: stage verified `FINAL.mp4`, real story-specific thumbnail, QA receipt and metadata into Videos-shorts; do not treat artifact ZIP or thumbnail draft as FINAL.
- [ ] **Step 5: Run green**: mocked API tests then one real private Drive canary; confirm the existing uploader's read-only OAuth can **download** both newly uploaded binary files and their hash matches the reviewed movie.
- [ ] **Step 6: Commit** `feat(silent-factory): resumable verified Drive asset delivery`.

### Task 5: Idempotent Private YouTube publishing + truthful receipt reconciliation

**Files:**
- Modify: `scripts/silent_factory_release.py`
- Modify: `.github/workflows/silent-factory-private-release.yml`
- Modify: `scripts/youtube_multi_channel.py` only if necessary for targeted thumbnail repair
- Create: `tests/test_silent_factory_release.py`

**Interfaces:**
- `inspect_release(path: Path) -> dict`: all hard gates + exact SHA + canonical `OLISE_MAN` channel.
- `release_private(release: dict, receipt_path: Path) -> dict`: dry-run, no-duplicate check, post-insert receipt, thumbnail repair and read-only YouTube verification.

- [ ] **Step 1: Write failing tests** for wrong channel/Private mismatch, fake or missing independent reviewer, Drive SHA mismatch, YouTube duplicate, upload success + thumbnail failure, 429/503 network timeouts, lost receipt and non-unique release manifest.
- [ ] **Step 2: Run red**: `python -m unittest discover -s tests -p 'test_silent_factory_release.py' -v`.
- [ ] **Step 3: Make upload strongly idempotent**: channel-specific token, SHA marker, serialized upload per channel, save YouTube video ID immediately after `videos.insert`; on recovery `videos.list`/duplicate lookup must resume **thumbnail on same video ID**, not blindly create another video.
- [ ] **Step 4: Preserve truthful release decisions**: mandatory metadata/rights/burned-in English caption/media hash and independent QA proof; private creative exception only after five genuine repairs; reject `Public` or `Unlisted` on every path.
- [ ] **Step 5: Run green**: uploader and release tests; one real **dry-run** with verified Drive asset IDs; after approval evidence is complete, one **Private** test upload and readback of `privacyStatus=private`, channel ID, applied thumbnail, YouTube ID and source SHA.
- [ ] **Step 6: Commit** `fix(silent-factory): recoverable Private release with no duplicate uploads`.

### Task 6: Cron/plugin integration, observability and end-to-end acceptance

**Files:**
- Modify: `docs/silent-factory-unattended-executor.md`
- Modify: `docs/superpowers/specs/2026-11-06-silent-animation-daily-reliability-design.md` only if requirements change
- Create: `tests/test_silent_factory_end_to_end.py`
- Modify: **existing** Silent Animation Factory plugin skill and **existing** Silent Animation Daily automation **only after** verified deploy

**Interfaces:**
- `status(run_key: str) -> dict` exposes `CREATED/RENDERING/REPAIRING/DRIVE_STAGED/UPLOADED_PRIVATE/BLOCKED`, git run URL, exact stage and failure code.
- Keep `BEGIN:VEVENT / RRULE:FREQ=WEEKLY;BYDAY=TU,TH,SA`, `DTSTART 08:00`, `Asia/Ho_Chi_Minh`; no new job or misleading “all done” while worker runs.

- [ ] **Step 1: Write failing end-to-end mocks** for entire state path, duplicate concurrent trigger, new story Drive collision, renderer crash, reviewer missing, Drive 403, YouTube partial upload, published-video status and no background callback available.
- [ ] **Step 2: Run red**: `python -m unittest discover -s tests -p 'test_silent_factory_end_to_end.py' -v`.
- [ ] **Step 3: Add observability**: append-only per-run receipts, rendered SHA, independent QA method/timecodes, Drive IDs, YouTube ID, retry count, exact last blocker and GitHub Actions URL. Render/report “task triggered” and “movie uploaded” as different states.
- [ ] **Step 4: Deploy in stages**: PR and scoped CI; fresh push-trigger full 210s test; independent media QA test; Drive real binary canary; Private uploader dry-run; one Private upload. Validate role/secrets access without leaking values.
- [ ] **Step 5: Run fault-injection tests**: 429s, expired/invalid scopes, file-bridge unavailable, duplicate trigger, frozen shots, absent reviewer, corrupt audio, partial thumbnail and runner restart. Verify no accidental Public release or second upload.
- [ ] **Step 6: Run three sequential canary films** (manual trigger through the **same existing cron**, not new scheduled jobs) and require each to end in real Drive FINAL ID plus verified Olise Private ID. If not, keep system “not yet fully automated” and publish precise blockers.
- [ ] **Step 7: Update Silent Animation Factory plugin to point to the verified executor only after canaries**; update the one existing cron prompt with correct command/paths/retention/receipt recovery. Verify schedule and `Enabled` did not change.
- [ ] **Step 8: Commit** `docs(silent-factory): verified unattended operations and failure recovery` and link final GitHub run receipts.

## Self-review and implementation order

- The six tasks cover all design requirements: accurate baseline/CI (1), reliable orchestration (2), actual QA + 5 repairs (3), Drive writer (4), Private receipt (5), stable cron/monitoring/canaries (6).
- The five `Review Focus` cases each have explicit negative tests in Tasks 2–5.
- **Critical external dependency:** one-time owner authorization for Drive writer and an actually available independent multimodal reviewer compute/runtime. The plan cannot legitimately claim success or “zero errors” without these being satisfied.
- **Acceptance:** no fabricated QA, no duplicate uploads, no silent failure, verified Private release artifacts in **three** independent new-film runs; remaining failures bounded and visible with actionable error codes.

## Execution handoff

**Do not implement just because this plan has been saved.** Review this plan + the linked spec, then implement task-by-task using Superpowers TDD/systematic-debugging and `verification-before-completion`. Recommend **Native execution with one independent whole-branch review** when no separate subagent tool is available; use subagent-driven execution if proper isolated reviewer tools exist. Do not run an uncontrolled five-re-render cycle while debugging the Drive/auth path.
