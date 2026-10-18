# Voice report — dung-bien-tuoi-30-thanh-ban-an

Round 3 final voice evidence, 2026-10-18. Scope is the 16 narration clips, `voice-clone-asr.md`, and `voice-durations.ts`. `voice.json`, `voice-expressive.json`, `timeline.ts`, BGM/SFX, and mix-plan files were not edited.

## Route and checks

- Route: local VieNeu-TTS v3 Turbo clone with `voice-ref/refTrungKien.wav`.
- Targeted regeneration: only `s1,s3a,s4a,s4b,s6a,s6b,s8,s10`, up to 8 seeds each; selected seeds `1,3,1,0,0,0,1,1` respectively.
- Common gain normalisation: one filter for all 16 clips, `loudnorm=I=-21:TP=-2:LRA=9`, retaining mono 24 kHz MP3.
- `ffprobe` duration, PCM faster-whisper `small` CER, `silencedetect=noise=-45dB:d=0.6`, `ebur128=peak=true`, and true-peak evidence were rerun after normalisation.

## Per-clip measurements

| shot | duration s | syl/s | CER | LUFS | true peak dBTP | silence >0.6 s | result / issue |
|---|---:|---:|---:|---:|---:|---|---|
| s1 | 2.159042 | 4.169 | 0.294 | -21.4 | -3.0 | none | FAIL; initial word/number |
| s2 | 3.326333 | 3.908 | 0.000 | -21.3 | -5.5 | none | PASS |
| s3a | 4.297958 | 3.955 | 0.405 | -21.4 | -5.2 | none | FAIL; number sequence/verb |
| s3b | 1.974625 | 4.051 | 0.129 | -21.4 | -2.9 | none | FAIL; ASR regression after normalisation |
| s4a | 3.380292 | 3.846 | 0.094 | -21.4 | -5.1 | none | FAIL; initial phrase/`cỗ` |
| s4b | 2.347667 | 3.834 | 0.024 | -21.4 | -4.5 | none | PASS CER |
| s5a | 1.660833 | 4.215 | 0.000 | -21.4 | -3.8 | none | PASS |
| s5b | 2.497958 | 4.404 | 0.000 | -22.1 | -2.5 | none | PASS |
| s6a | 3.475083 | 4.316 | 0.101 | -21.6 | -6.2 | none | FAIL; `ba mươi` rendered as `30` |
| s6b | 3.086917 | 4.211 | 0.174 | -21.2 | -4.8 | none | FAIL; key phrase |
| s7a | 3.265958 | 4.287 | 0.038 | -21.5 | -5.0 | none | PASS |
| s7b | 1.748208 | 4.576 | 0.032 | -21.4 | -3.6 | none | PASS |
| s8 | 4.129958 | 3.874 | 0.058 | -21.3 | -5.5 | none | FAIL; first clause/name |
| s9a | 2.975458 | 4.033 | 0.000 | -21.4 | -2.6 | none | PASS |
| s9b | 1.909667 | 3.666 | 0.276 | -21.9 | -2.5 | none | FAIL; ASR regression after normalisation |
| s10 | 1.897958 | 4.215 | 0.257 | -22.7 | -2.4 | none | FAIL; `bản án`→`bản ảnh` |

## Summary and closure

- 16/16 clips exist and decode; total voice duration is **43.737 s**. With the documented 7.700 s of holds/gaps, the expected video budget is approximately **51.437 s**.
- Final loudness range is **-21.2…-22.7 LUFS**, spread **1.5 LU**, meeting the `<=2 LU` target. True peak range is **-2.4…-6.2 dBTP**, meeting `<=-1.5 dBTP`. No clip has an internal silence over 0.6 s.
- Final PCM ASR pass count is **7/16**. The targeted ASR ticket is only partially closed: `s4b` passes, while `s1,s3a,s4a,s6a,s6b,s8,s10` remain over CER 0.04. `s3b` and `s9b` also fail in the final post-normalisation measurement, so the packet is not an audio-gate pass.

| ID | status | evidence |
|---|---|---|
| AUD-001 | **partial / open** | `s4b` now passes at CER 0.024; `s1` 0.294, `s3a` 0.405, `s6a` 0.101, `s6b` 0.174, `s10` 0.257 remain over threshold. |
| AUD-002 | **partial / open** | `s8` remains 0.058; `s9b` was previously 0.034 but is 0.276 after final normalisation, so the paired requirement is not met. |
| AUD-003 | **fixed** | All 16 clips use the same loudnorm configuration; spread 1.5 LU and true peaks are all <=-2.4 dBTP. |
| AUD-006 | **open** | `s6b` remains CER 0.174; rate is documented at 4.211 syl/s. |

This report does not claim naturalness, accent/tone quality, emotional fit, breaths, clicks, or robotic-artifact absence; those require listening. Integrated mix tickets AUD-004/AUD-005 remain outside this voice-only scope.
