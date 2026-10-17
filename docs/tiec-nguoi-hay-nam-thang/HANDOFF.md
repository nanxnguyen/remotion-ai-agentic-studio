# HANDOFF — Hybrid Local, Video 08 (`tiec-nguoi-hay-nam-thang`)

## Status — COMPLETE / READY (2026-10-17)

Final verified MP4 produced and **all review gates passed** under director control.
`pipeline.py check` → exit 0 (`ready`); `pipeline.py audit` → exit 0 (`ok`).
Nothing committed, pushed, or published — awaiting the owner's explicit per-video publish approval.

| gate | score | report |
|---|---|---|
| A script | 9.1 | script-review.md |
| content | 9.0 | content-pack-review.md |
| audio | 9.0 | audio-review.md |
| D design | 9.0 | design-review.md |
| E integration | 9.0 | integration-review.md |
| B tasks | 9.0 | task-review.md |
| C final MP4 | 9.0 | video-review.md (frame-bound) |

`status.json.review_valid` = all `true`.

## Deliverable

- MP4: `out/tiec-nguoi-hay-nam-thang-thanh-long-nang-cao-reel.mp4`
- 47.40 s (1422 f @30) · H.264/AAC · 1080×1920 · −13.9 LUFS
- fingerprint `3485059:1792232389887885600` (see `render-evidence.md`)
- Voice: `thanh-long-nang-cao` (VieNeu-TTS v3 Turbo), CER 0.000–0.075, **purchased license**
  (user-confirmed; ref `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav` committed per that
  authorization — earlier "local-only" doc claims were corrected).

## Stage evidence present

`voice-report.md`, `voice-final-asr.md`, `voice-clone-asr.md`, `mix-plan.md`, `qa-report.md`,
`final-check.md`, `render-evidence.md`, `eval.md` (Phase-10 retro, 7 sections).

## Carry-forward (non-blocking Thấp)

- Audio A-1: human Vietnamese listen-through of s8 (CER 0.075, just under 0.08) before publish.
- C-2/C-3/C-4: optional polish (s8 "four-legs" reading, s2/s3 near-identical poses, extra s8 margin).
- No BGM (voice-only, judged acceptable).
- `npm run verify` / `test:visual` cannot run (registry E404; `vitest`/`pixelmatch` not vendored) —
  test-only deps, do not block render.

## If resuming

1. Do NOT re-run completed stages; gates are already recorded and valid.
2. Any source change invalidates downstream reviews — re-render (`pipeline.py render`) then re-run
   the affected gate(s) with a clean-context reviewer and record scores yourself (never let a review
   subagent run `pipeline.py`).
3. Publish only on explicit owner approval (YouTube Shorts / Facebook Reels), one video at a time.