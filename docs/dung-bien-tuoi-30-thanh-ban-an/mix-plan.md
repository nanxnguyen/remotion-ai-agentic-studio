# Mix plan — dung-bien-tuoi-30-thanh-ban-an

Phase 3b audio packet. The director should translate each relative offset to `SHOTS.<shot>.from + offset` in `Reel.tsx`; no absolute frame numbers are embedded here.

## Final audio fix round 2 — measured source and rule

The current voice snapshot was regenerated and measured with `npm run voice:measure -- dung-bien-tuoi-30-thanh-ban-an --out src/videos/dung-bien-tuoi-30-thanh-ban-an/voice-durations.ts`. The current rounded voice durations are: `s1 2.160`, `s2 3.327`, `s3a 4.236`, `s3b 1.975`, `s4a 3.381`, `s4b 2.348`, `s5a 1.661`, `s5b 2.498`, `s6a 3.476`, `s6b 3.087`, `s7a 3.266`, `s7b 1.749`, `s8 4.130`, `s9a 2.976`, `s9b 1.910`, `s10 1.797` seconds. Recompute any cue proof against these values before final render.

Every SFX cue below is post-voice. For a shot whose speech starts at relative time `t0`, the cue frame is `ceil((t0 + voice duration) × 30) + 1`; the first cue frame is therefore one complete 30 fps frame after the measured spoken end. Cue intervals are half-open `[start frame, start frame + durationInFrames)`, so the proof is deterministic and does not depend on wall-clock timing. `s1` retains its 0.150 s lead-in in `t0`.

## BGM bed

- File: `bgm.mp3`, measured duration 56.43s, 44.1 kHz stereo, native mean −22.6 dB, peak −10.1 dB.
- Bed: linear volume `0.30` (−10.5 dB) after a 1.0s fade-in. The final render applies a delivery loudness normalizer with a −1.5 dBTP ceiling.
- Voice duck: linear volume `0.165` while a voice clip is active, with 200 ms attack/release ramps. Keep short pauses from pumping by using the shot/key envelope rather than per-word toggles.
- Holds: return to `0.30` during intentional gaps; a gentle swell is allowed in the s9a→s9b gap, then return to `0.165` under the climax line.
- Ending: fade BGM to zero over 300 ms after the s10 spoken line so the planned final 2.4s is pure silence except for the paper-edge foley.
- No beat sync. Cuts and motion are voice-led; the generated track’s soft pulse is atmosphere only.

## SFX cue table

Gains are linear volume values with their dB equivalent. In this fix round, every SFX interval is post-voice: the cue starts at least one 30 fps frame after the measured spoken end for that shot. The shortened cues preserve only the audible tail/action accent that fits the shot hold; they must not be extended by the integration agent. `durationInFrames` is explicit for every cue; the >5s paper-wind source is never allowed to play unbounded.

| Shot | Offset from shot start | File | Gain | Duration | Lands on |
|---|---:|---|---:|---:|---|
| s1 | **71f / 2.367s** | `sfx-pencil-write.mp3` | 0.18 (−14.9 dB) | **5f** | red-circle pencil contact, after s1 voice; 1f clearance |
| s2 | **101f / 3.367s** | `sfx-pencil-write.mp3` | 0.16 (−15.9 dB) | **6f** | second red line tail, after s2 voice; 1f clearance |
| s3a | **130f / 4.333s** | `sfx-paper-slide.mp3` | 0.16 (−15.9 dB) | **6f** | ruler-entry tail in the s3a→s3b hold; fits the current 136f scene boundary |
| s3b | **61f / 2.033s** | `sfx-paper-slide.mp3` | 0.13 (−17.7 dB) | **5f** | second sheet tail, after s3b voice; 1f clearance |
| s4a | **103f / 3.433s** | `sfx-plate-slide.mp3` | 0.12 (−18.4 dB) | **7f** | bowl/chopstick tail in the s4a→s4b hold; 1f clearance |
| s5b | **76f / 2.533s** | `sfx-pen-drop.mp3` | 0.20 (−14.0 dB) | **9f** | pen “cộp” in the post-line hold; 1f clearance |
| s6b | **94f / 3.133s** | `sfx-macro-zoom.mp3` | 0.10 (−20.0 dB) | **7f** | short macro-reveal tail after the near-whisper line; 1f clearance |
| s7a | **99f / 3.300s** | `sfx-feed-swipe.mp3` | 0.13 (−17.7 dB) | **7f** | final swipe tail in the s7a→s7b hold; 1f clearance |
| s8 | **125f / 4.167s** | `sfx-paycheck-notify.mp3` | 0.10 (−20.0 dB) | **3f** | first notification tail, after s8 voice; system-speaks exception |
| s8 | **129f / 4.300s** | `sfx-paycheck-notify.mp3` | 0.075 (−22.5 dB) | **3f** | second notification tail, descending repeat volume |
| s9a | **91f / 3.033s** | `sfx-paper-wind.mp3` | 0.10 (−20.0 dB) | **19f** | paper/marks retracting in the post-line hold; 1f clearance |
| s10 | **58f / 1.933s offset** | `sfx-paper-wind.mp3` | 0.08 (−21.9 dB) | **24f / 0.800s** | final paper edge during the first 0.8s of the hold; leaves a longer quiet tail |

There is deliberately no SFX on s9b: the question “Dạo này, bạn sống có vui không?” needs the warm writing gesture and its silence. There is no riser→impact→sparkle stack at the end because the storyboard requires a quiet, non-triumphal close.

### AUD-004 interval proof

The measured voice durations used for this table are the current `voice-durations.ts` values, cross-checked against the current MP3 `ffprobe` output. For s1, the 0.15s lead-in is included before its spoken interval; all other keys start speech at shot-relative 0.000s. The cue start frame is `ceil(spoken-end-seconds × 30) + 1`, then each cue is bounded by the explicit frame count above. The resulting cue windows are all strictly after the corresponding spoken interval and fit the documented hold:

| Shot | Measured spoken interval (shot-relative) | Cue window(s) |
|---|---:|---:|
| s1 | 0.150–2.309s | 71–76f |
| s2 | 0.000–3.326s | 101–107f |
| s3a | 0.000–4.298s | 130–137f |
| s3b | 0.000–1.975s | 61–66f |
| s4a | 0.000–3.380s | 103–110f |
| s5b | 0.000–2.498s | 76–85f |
| s6b | 0.000–3.087s | 94–101f |
| s7a | 0.000–3.266s | 99–106f |
| s8 | 0.000–4.130s | 125–128f; 129–132f |
| s9a | 0.000–2.975s | 91–110f |
| s10 | 0.000–1.898s | 58–82f |

### Round-2 no-overlap proof

The following clearance values use the rounded durations above and are conservative relative to the exact MP3 durations. Each clearance is `cue start − spoken end`; every value is at least one 30 fps frame (0.0333 s). The cue end is shown as an exclusive frame bound.

| Shot | Spoken end | Cue offset | Cue window | Post-voice clearance | Result |
|---|---:|---:|---:|---:|---|
| s1 | 2.310s (0.150s lead-in + 2.160s) | 71f / 2.367s | [71f, 76f) | 0.057s | PASS |
| s2 | 3.327s | 101f / 3.367s | [101f, 107f) | 0.040s | PASS |
| s3a | 4.298s | 130f / 4.333s | [130f, 137f) | 0.035s | PASS |
| s3b | 1.975s | 61f / 2.033s | [61f, 66f) | 0.058s | PASS |
| s4a | 3.381s | 103f / 3.433s | [103f, 110f) | 0.052s | PASS |
| s5b | 2.498s | 76f / 2.533s | [76f, 85f) | 0.035s | PASS |
| s6b | 3.087s | 94f / 3.133s | [94f, 101f) | 0.046s | PASS |
| s7a | 3.266s | 99f / 3.300s | [99f, 106f) | 0.034s | PASS |
| s8 cue 1 | 4.130s | 125f / 4.167s | [125f, 128f) | 0.037s | PASS |
| s8 cue 2 | 4.130s | 129f / 4.300s | [129f, 132f) | 0.170s | PASS |
| s9a | 2.976s | 91f / 3.033s | [91f, 110f) | 0.057s | PASS |
| s10 | 1.898s | 58f / 0.800s | [58f, 82f) | 0.035s | PASS |

No cue window intersects its shot's spoken interval. The previously failing round-2 cases are explicitly repaired: `s3a` now starts at 130f (not 129f), `s6b` at 94f (not 80f), and `s10` at 58f (not 55f). `s10` ends at 82f / 2.733s, inside the planned 2.4s post-voice hold ending at 4.200s; the shortened paper-edge foley remains the stated exception to pure silence.

No cue is allowed to be moved earlier to recover the original visual-action timing without reopening AUD-004. The integrated implementation may use these cues only at the listed relative frame offsets.

## Final mix targets and AUD-005 pending acceptance

- **Current final render measured.** The integrated MP4 is `out/dung-bien-tuoi-30-thanh-ban-an-trung-kien-nang-cao-reel.mp4`; delivery loudness/peak, A/V duration, and the shortened ending tail are recorded in `render-evidence.md` and `final-check.md`. Source-stem proof remains separate from MP4 window verification.
- Integrated render: `ebur128` integrated loudness −14 LUFS ±1; `volumedetect`/true-peak check ≤ −1.5 dBTP.
- Voice-to-music gap: 12–18 dB in measured voice windows versus a music-only hold window.
- Ducking: additional 4–6 dB under speech with 150–300 ms attack/release ramps.
- SFX: every rendered SFX interval remains disjoint from each measured spoken interval; no unbounded sample playback; repeated notification descends in level.
- Ending: after the last s10 spoken sample, retain the planned 2.4s hold; BGM must be near-silent for at least 1.2s of that hold. The shortened paper-edge foley is permitted only in the first 0.8s of the hold, leaving at least 1.47s of absolute audio tail for final verification.
- Verification commands after integration: `ffprobe`, `ffmpeg -af ebur128=framelog=verbose`, and `ffmpeg -af volumedetect` on the rendered mix, with the audio reviewer recording measured windows and ramp timings. Naturalness and emotional fit remain “cannot verify by machine” until an optional human listen.
