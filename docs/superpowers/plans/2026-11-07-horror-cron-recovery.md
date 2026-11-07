# Horror cron recovery implementation plan

Goal: eliminate stale runner conclusions and diagnose render/archive/upload independently.

Architecture: retain the existing 19:00 ChatGPT scheduler and push-triggered media queue; add a read-only capability evaluator. Preserve every media and Public QA gate.

- [x] Reproduce old billing lock and run fresh two-label smoke: both PASS on 2026-11-07.
- [x] Pin one 19:00 Asia/Ho_Chi_Minh schedule and require current evidence, checkpoints and same-film retries.
- [x] Write failing readiness tests, implement phase separation, check FFmpeg/FFprobe/CairoSVG and test OAuth scope parsing.
- [x] Review independently; fix missing CairoSVG check; rerun 16 regression tests and parse workflow YAML.
- [ ] Verify main-triggered capability audit and report exact current stage blockers.
- [ ] Real creative package -> media -> independent full review -> Drive -> verified new PUBLIC upload. No success claim before receipts.

Validation limitation: local GitHub clone cannot complete in the restricted network, so full npm run verify is unavailable (package.json missing in partial checkout). Related Python tests use actual fetched main renderer/tests and all pass. Run remote CI separately; do not equate these with full repository PASS.

Drive recovery: the real audit on 2026-11-07 reports drive_write_missing. Obtain owner-approved OAuth reauthorization through the existing OAuth client for Drive access, ensuring it reaches the existing Videos-shorts folder. Store replacement token privately in DRIVE_REFRESH_TOKEN; never post tokens in chat, logs, source or docs. A readonly token cannot gain write scope by retrying. Verify scope and actual parent-folder access before archive. This plan neither grants broader scope nor changes sharing.
