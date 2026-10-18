# Final check — dung-bien-tuoi-30-thanh-ban-an

| Check | Result | Evidence |
|---|---|---|
| Final MP4 exists | PASS | `out/dung-bien-tuoi-30-thanh-ban-an-trung-kien-nang-cao-reel.mp4` |
| Video contract | PASS | H.264, 1080×1920, 30fps, 1549 frames, 51.633333s |
| Audio contract | PASS | AAC, integrated `-14.7 LUFS`, peak `-1.9 dBFS` |
| BGM tail | PASS | BGM zero envelope `2.10s`; paper-wind foley `[1481,1505)`, longer clear tail |
| Deterministic frame plan | PASS | 16 current ranges from `timeline.ts`, no wall-clock/random marker |
| Visual still coverage | PASS | 48 current MP4 stills, 3 per shot under `out/qa/` |
| Gate B | OVERRIDE | Three independent reviews: 7.8, 7.7, 7.5 revise; director hard-cap override with accepted risks |
| Voice wording | CARRY | 11/16 CER-clean; five clone articulation risks remain explicitly open |
| Gate C | REVISE | Round 3 visual 8.2 passed; audio 6.8 and alignment 7.6 remain blocked by five voice wording risks |
| Final QA | PENDING | Must run only after Gate C |

## Verification notes

- `npx tsc --noEmit`: PASS.
- Targeted pipeline visual-motion regression test: PASS.
- `npm run test:visual`: repository baseline failure in `CuocGoiNhoReel` (golden pixel diff and stale frame 1418 beyond its 1308-frame composition); unrelated to this video.
- `npm run verify`: stops at existing Prettier failures across the repository, including pre-existing files and current video files; no format rewrite was applied while the video remains blocked at Gate C.
- `pipeline.py audit`: remaining historical Gate A report-path error uses backslashes in `status.json`; documented in `HANDOFF.md`.
