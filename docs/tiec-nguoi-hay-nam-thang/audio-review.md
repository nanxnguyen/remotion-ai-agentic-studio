# audio-review — tiec-nguoi-hay-nam-thang (audio branch)

Independently reviewed by `audio-reviewer` (clean-context subagent, director-supervised).
NOTE: an earlier copy of this file was overwritten by an out-of-scope process; this clean
version reflects the genuine, director-controlled reviews only.

## Round 1 (audio-reviewer, 2026-10-17) — score 8, verdict revise

Evidence: `voice-final-asr.md` (per-clip CER + ffprobe durations), `voice.json`,
`timeline.ts`. Audio content itself judged 9/10 (all words present, deliberate silences real,
loudness −13.9 LUFS / peak −1.9 dBFS, no clip). Overall 8 due to one Cao ticket:

- **A-0 (Cao):** docs claimed the voice-ref WAV was "local-only, kept out of Git" while
  `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav` is actually committed to the repo.
- A-1..A-4 (Thấp, non-blocking): s8 CER 0.075 near threshold (recommend a human VN listen),
  gross syllable rate 4.25–4.32 marginal, voice-only acceptable, eval note.

## Resolution of A-0 (producer, director-supervised)

- User confirmed the voice license was **purchased**, so cloning + distribution are authorized.
- Docs corrected to state the truth: `eval.md` §1 and `production-contract.json` now say
  `purchased-license` and `generated:true`; the false "local-only / kept out of Git" claim is
  removed. A-0 is therefore closed (it was a documentation-accuracy finding, not a licensing block).

## Round 2 (audio-reviewer, 2026-10-17, post-fix) — score 9, verdict pass

Re-read eval.md + production-contract.json + voice.json.
- A-0 fixed: purchased-license basis documented; false "local-only" claim gone.
- Remaining A-1..A-4 are Thấp / carry-forward, do not block audio gate.

Mean 9, no open Cao/Trung.

verdict: pass.