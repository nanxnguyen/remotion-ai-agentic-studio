# Eval — cuoc-goi-nho-cua-me

Per-video retro (Phase 10, mandatory). Written from evidence in `status.json` (5 review entries, 9/9 stages done),
`voice-clone-asr.md` (v3), the 12 stills in `out/qa/`, render verification output and this session's command
log — not from memory.

## 1. Scope

| Field | Value |
|---|---|
| vid | `cuoc-goi-nho-cua-me` |
| profile | `story` (v2 flow: gates A/D/E/B/C; content-pack stage skipped by v2 design) |
| Voice route | slug `thanh-long-nang-cao` · engine **VieNeu-TTS v3 Turbo** (local clone) · authorization basis: **purchased voice license** — user confirmed the voice was bought (2026-10-17), so cloning + distribution are authorized. Reference `voice-ref/refThanhLong.wav` lives in this video's docs and is committed per that authorization. |
| Output | `out/cuoc-goi-nho-cua-me-thanh-long-nang-cao-reel.mp4` |
| Fingerprint | size:mtime `8912774:1792230196737464600` · md5 `29c6496bd84f354b3247d734c938e99a` |
| Duration | 43.70 s (1308 frames @ 30 fps) · H.264/AAC · 1080×1920 |
| Integrated loudness | −13.9 LUFS · true peak −1.5 dBFS (ebur128 on final MP4) |
| Script | **v3** — 149 từ: s5 20 (bỏ "chưa kịp reo hai tiếng" — số bịa), s7 22 (bỏ "Ngoài cửa, mưa vẫn gõ nhẹ" — suy diễn fact). Both removals were the round-2 reviewer's own soften options; applied before the mandated 8/8 clip regen. |

### Gate scores (as actually recorded — no scores invented)

| Gate | Status | Evidence |
|---|---|---|
| A script | **pass 9.1/10** (round 3) | `script-review.md` — round 3 appendix; rubric of round 2 kept, fidelity recovered 2.0/2.0 |
| D design | **pass 9.0/10** (round 4 confirm on new render) | `design-review.md` — design unchanged, 5 build fixes verified present (Be Vietnam 600, s8 "Đang gọi → Đã gọi lại ✓" sequence, CcCaps early-off in hold) |
| E integration | **pass 9.4/10** (round 3, new file) | `integration-review.md` — timeline 1308f = measured clips; boundaries verified on real MP4; 2 low tickets (E-t1 "Đang gọi" UI text while connected, E-t2 s8 reuse of TwoRoomsCall layout) accepted |
| B tasks | **pass 9.5/10** (round 3) | `task-review.md` — regen 8/8 (CER 0.012–0.037 ≤ 0.04), retime @4dp, testFrames derive fix, render verified |
| C final (MP4) | **pass 9.0/10** (round 3) | `video-review.md` — 12/12 extracted stills ĐẠT per shot; ASR ≤ 0.04 all; ebur128 clean; fingerprint-bound |

`status.json` histogram at delivery: A 9.1 · D 9.0 · E 9.4 · B 9.5 · C 9.0 — all `valid`, none overridden.
Human ear-listen (`pipeline.py listen`) not yet recorded — machine signals (ASR, ebur128, SFX offsets) are
green but do not replace an audition.

## 2. Where the time went

Rank order from this session's actual sequence (timestamps in `status.json.log`):

| rank | work item | est. min | note |
|---|---|---|---|
| 1 | Voice regen 8/8 clips (TTS + per-clip ASR, CER gate) | ~10 | VieNeu CPU; one cp1252 abort retried with `-X utf8` |
| 2 | Text sync round 3 (script.md / brief.md / voice.json / scenesB / scenesC / voice-expressive.json) | ~10 | 1 file per concern, no kit touches |
| 3 | Retime timeline.ts + testFrames derive fix + tsc | ~5 | 4dp raw values to avoid 1-frame ceil undershoot |
| 4 | Render + verify 43.70s + 12 still extraction + ebur128 | ~10 | `pipeline.py render` normalized + verified atomically |
| 5 | Round-3 review writing (5 gates) + stage bookkeeping | ~15 | reviews reference the new fingerprint |

## 3. Where the tokens went

| rank | sink | why it hurt |
|---|---|---|
| 1 | **Misreading `check` output** | Read `reviews=[] stages=[]` as "state was erased" and debugged a non-problem — the lists print what is *missing*; they were legitimately empty. Two re-runs + one status.json dump spent before reading `cmd_check`. |
| 2 | Whole-file reads | Read `timeline.ts` fully where the `raw[]` block was the only target. |
| 3 | Frame-by-frame image reads | 12 stills read individually; a contact sheet would have been cheaper. |

## 4. What worked well

- **Softening applied at the source**: removing the two inferred/fabricated lines before the regen meant the
  ASR, captions and script converged in one pass — no divergence between voice design and spoken clips.
- **CER gate tightened**: all 8 clips ≤ 0.04 (v2 had 0.046⚠ on s5). The worst sentence was exactly the one
  that got simplified.
- **Derived `testFrames`**: `[0, floor(T/2), T−1]` killed the whole class of "frame outside composition"
  render failures on future retimes.
- **4-decimal measured durations** in `timeline.ts` kept `ceil()` truthful (171.147 → 172f, not 171f).
- **`pipeline.py render`** did the compliant path end-to-end: normalize → H.264/AAC verify → render_check fingerprint.

## 5. Root-cause debt

| defect | one-line fix |
|---|---|
| `gen-voice-clone.py` prints Vietnamese → cp1252 UnicodeEncodeError on Windows | Always run with `python -X utf8 -I` (same convention as pipeline.py). |
| `voice-expressive.json` (stale draft) was the generator's **default** input — a future knob-less run would re-voice the wrong text | Synced it to canonical `voice.json` this session; long-term, generator should default to `voice.json`. |
| New `eval.md` delivery requirement surfaced only as a `check` failure | Phase 10 eval is mandatory per `.agents/rules/02-documentation.md` §38 — write it as soon as gate C passes, not when `check` says so. |
| `tests/golden` frames for CuocGoiNhoReel now stale after the retime (video legitimately changed) | Regen goldens for this composition with the diff explained in the PR; untracked by delivery check. |
| OneDrive/companion processes intermittently lock writes to `status.json` (`os.replace` WinError 5) | Retry the command; do not build retry wrappers. |

## 6. Next-video improvements

- After any text edit: update `script.md`, `brief.md`, `voice.json`, caption arrays and the stale comment in
  the same batch **before** the regen, so clips/ASR/captions are born consistent (paid off here — reuse it).
- Record the 5 gate reviews immediately after frames/audio stats exist, while the still numbers are still in head.
- Run `python -X utf8 -I scripts/pipeline.py audit <vid>` right after `check` — the rule requires exit 0 before the turn ends.
- Keep `testFrames` derived from TOTAL — never hardcode mid/last frame indices again.

## 7. Deliverable verdict

**Ship: YES (fingerprint 8912774:1792230196737464600) — with one human step remaining.**

- Verified by machine on the exact MP4: 43.70 s / 1308f H.264/AAC 1080×1920@30, −13.9 LUFS / −1.5 dBFS,
  ASR CER ≤ 0.04 on all 8 clips, 12/12 stills ĐẠT, captions/voice/script/brief in v3 agreement, SFX cues
  inside every (shorter) shot.
- All five gates A/D/E/B/C passed on the current fingerprint; no override used anywhere in this video.
- Remaining before social publish: **record the ear-listen** (`pipeline.py listen cuoc-goi-nho-cua-me --by ...`)
  confirming callbacks/chime pacing and BGM balance, and regen the stale golden frames for this composition.
- Accepted imperfections: ticket E-t1 (mock UI says "Đang gọi" while connected) and E-t2 (s8 reuses the
  TwoRoomsCall layout; callback state still explicit) — both low, disclosed, unblocking.
