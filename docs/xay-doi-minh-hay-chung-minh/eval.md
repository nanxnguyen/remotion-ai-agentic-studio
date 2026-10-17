# Eval — xay-doi-minh-hay-chung-minh (delivery retro)

Scope: the local Windows delivery session that turned this code-complete video into
`out/xay-doi-minh-hay-chung-minh-thanh-long-nang-cao-reel.mp4` (59.22s, 1080x1920@30,
H.264/AAC, 16.1 MB). Voice route changed at the user's request: HoaiMy (never generated)
-> **Thanh Long Nâng Cao** cloned from `docs/*/voice-ref/refThanhLong.wav` via
VieNeu-TTS v3 Turbo, 16/16 clips ASR-verified (see `voice-clone-asr.md`).

Times are wall-clock estimates from file mtimes and command logs; token figures are
relative (no per-tool metering was available in this harness).

## Where the time went

| Rank | Work item | Est. time | Notes |
|---|---|---|---|
| 1 | Voice pipeline bring-up | ~12-15 min | venv create + pip install vieneu/faster-whisper (~600 MB deps), HF model download, then **3 failed runs** on Windows cp1252 `UnicodeEncodeError` (console print of Vietnamese ASR text). Actual generation after unblock: only ~5 min (s1 11:40 -> s11 11:45). |
| 2 | Render toolchain debugging | ~8-10 min | 3 attempts: `scripts/video-render.mjs` spawnSync breaks on this project path (space + Vietnamese diacritics); Chrome Headless Shell 120 MB download then 25 s connect timeout; unblocked only by `CHROME_EXECUTABLE` -> system Chrome. |
| 3 | QA verification | ~6-8 min | blackdetect, 16-shot frame montage, 3 faster-whisper runs on CPU (full video, BGM-only, tail) incl. chasing one ASR hallucination ("subscribe kênh..." on instrumental BGM tail). |
| 4 | Exploration / reads | ~3-5 min | Full `status.json` (477 lines), voice scripts, `pipeline.py` sections, git archaeology for "deleted" audio (result: clips were **never** committed — wasted look). |

Net: once voice files existed, the remaining path (render ~2 min, verify, rename, status
update) was cheap. **~60% of session time was environment/tooling debt, not production.**

## Where the tokens went

| Rank | Sink | Why it hurt |
|---|---|---|
| 1 | Verbose command output | Render progress spam (1776 frames), pip install logs, ffprobe JSON dumps — each retry re-read the whole blob. |
| 2 | Failure loops | 3x encoding retries + 3x render attempts; every retry re-consumed context with near-identical output. |
| 3 | Large file reads | `status.json` (477 lines) read in full where a `grep` on stages/log tail would do; `pipeline.py` read in 4 slices to reverse-engineer `voice`/`verify`/`set`. |
| 4 | Git archaeology | ~6 git log/show commands proving a negative (no deleted voice files). Working tree was already clean — one `git log -- <path>` would have sufficed. |

## What worked well

- Video module was truly code-complete (typecheck/lint green, all BGM/SFX present); no scene work needed.
- VieNeu-TTS clone route: model cached, per-phrase ASR retry loop gave CER-verified clips in one pass once unblocked.
- Final render: ~2 min for 1776 frames with cached bundle; ASR-on-final-MP4 proved voice/script/sync end-to-end.

## Root-cause debt (fix these and the next video is 1-2 h, not half a day)

1. **Windows-host incompatibilities** (all three bit this session):
   - `scripts/video-render.mjs`: `spawnSync(..., {shell: true})` breaks on paths with spaces/diacritics -> use `execFile` with an argv array (no shell) or quote via `JSON.stringify`.
   - `scripts/pipeline.py`: unconditional `import fcntl` -> every `voice`/`verify`/`set` transition had to be hand-replicated. Fix: `try: import fcntl / except ImportError: use msvcrt.locking` (or `portalocker`).
   - `scripts/gen-voice*.py`: stdout print of Vietnamese text crashes cp1252 consoles. Fix: permanent `sys.stdout.reconfigure(encoding="utf-8", errors="replace")` at import (tried during the session, reverted to keep diffs minimal — keep it next time).
2. **Voice stage ran way too late.** It sat `in_progress` since 00:03 while build was done, and only blocked at render. Generate voice right after gate A; wire a fallback chain VieNeu clone -> edge-tts -> hard block with a clear error (the documented edge-tts 403 was discovered only at render time).
3. **Standing toolchain, not per-session**: the repo scripts already assume `~/.venvs/vieneu` — create it once on this machine and leave it; document `CHROME_EXECUTABLE=C:\Program Files\Google\Chrome\Application\chrome.exe` in AGENTS.md to skip the 120 MB headless-shell download + timeout.
4. **No clip-vs-shot fit check.** `timeline.ts` is byte-locked to measured **HoaiMy** durations (51.75s), but the delivered voice was Thanh Long (every clip happened to be shorter, so nothing truncated). Add a tiny checker (ffprobe all `s*.mp3`, assert `duration + voiceOffset/30 <= shot duration`) and fail the render when a clip overflows.
5. **Token discipline**: add `--loglevel error` to render invocations in docs/scripts; prefer `grep -n`/targeted reads over whole-file reads of `status.json`; when `git status` is clean, skip history spelunking.

## Deliverable verdict

Ship: **yes** — 16/16 shots visually correct (montage QA), no black frames, 16/16 voice
clips fit their shot windows, full-script ASR on the final MP4 matches (CER-level noise
only), BGM instrumental with no watermark. The one scary ASR tail segment
("subscribe kênh...") was proven a hallucination on instrumental audio (BGM-only ASR =
no speech; isolated tail = garbage), not baked audio.

Residual known imperfections (accepted): a few TTS pronunciation nuances flagged in
`voice-clone-asr.md` (e.g. gach->gap, phai->phai tones), inaudible to normal listeners;
qa stage left `in_progress` in `status.json` (no stills QA was run this session).
