# Horror cron recovery implementation plan and evidence

Goal: eliminate stale runner conclusions and diagnose render/archive/upload independently, without relaxing QA.

- [x] Reproduce historical billing lock and rerun both runner labels: PASS.
- [x] Read back one exact19:00 Asia/Ho_Chi_Minh schedule, enabled; next_run_time remains null in service response.
- [x] Test first, implement phase-specific diagnostics and required FFmpeg/FFprobe/CairoSVG checks; independent review completed.
- [x] Current-main audit confirms19 related tests PASS and RENDER_READY_ARCHIVE_BLOCKED because Drive grant lacks write.
- [x] Add explicit least-privilege drive-archive OAuth mode and owner instructions, preserving readonly defaults and old local token.
- [x] Run full Python discovery:118 tests,117pass, one existing Olise pinned-channel test fails.
- [x] Run npm verify locally and remote CI: existing16-file Prettier violations remain; do not claim full repo PASS.
- [x] Exercise creative/review phase: preserve three draft audits73/36,85/42,89/44; no fake gate pass or manifest when novelty pending.
- [ ] Owner Google consent and actual target folder write verification.
- [ ] Genuine approved creative package, real Vbee/media, independent whole-film QA, Drive archive and new YouTube PUBLIC readback.

Architecture: keep the existing ChatGPT schedule and push-only production queue. Stage readiness is diagnostic and cannot approve artistic QA or publication.

Files: scripts/horror_factory_capabilities.py, tests/test_horror_factory_capabilities.py, .github/workflows/horror-factory-capability-audit.yml; scripts/horror_archive_oauth.py, scripts/youtube_oauth_setup.py, tests/test_horror_archive_oauth.py; docs/horror-drive-write-recovery.md; daily checkpoint docs/horror-factory-runs/2026-11-07.md.

No new paid service, alternate voice, old-video visibility change, Olise change, fake media, fake QA or duplicate scheduler.
