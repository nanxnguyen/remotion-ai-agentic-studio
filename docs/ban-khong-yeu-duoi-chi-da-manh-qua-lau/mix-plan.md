# Mix plan — ban-khong-yeu-duoi-chi-da-manh-qua-lau

Video `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · profile `story` · 9:16 1080×1920 @ **30 fps** ·
planned total **48.90 s** (3.9 syl/s planning rate; 46.58 / 50.66 s at 4.2 / 3.7).
Owner: `audio-agent` (Phase 3b). Implementation lands in `Reel.tsx` (Phase 7 / `scene-agent`), not here.

**Read this first — what is measured and what is not.**

| Item | Status |
|---|---|
| BGM file loudness, cue file peaks, cue placement against the `script.md` timeline | **measured** (commands and outputs below) |
| Voice clip loudness | **measured on 10 of 13 clips** at 00:15 on 2026-10-19; `s6` and `s10` were still rendering. See §2 — the bed gain must be re-derived from the final `voice-report.md`. |
| `OUTPUT_AUDIO_OFFSET_F` (the render's audio-track offset, `sound-design` §4.6 offset-one) | **not measured for this pipeline.** No constant is asserted here; §6 says how to measure it on the first render. |
| Integrated loudness of the finished video | **not measurable before Phase 8.** `scripts/pipeline.py` applies `loudnorm=I=-14:TP=-2.0:LRA=11` to the muxed track (`pipeline.py:1107`), so −14 LUFS ±1 and TP ≤ −1.5 dBTP are enforced by the render, not by this plan. The plan's job is the **relative** balance. |

---

## 1 · Phase 7 targets (from `brief.md` §Visual identity + `sound-design` §1)

| target | value | where checked |
|---|---|---|
| Final integrated loudness | **−14 LUFS** (render, `loudnorm=I=-14`) | `render-evidence.md`, `final-check.md` |
| Final true peak | **≤ −1.5 dBTP** (render normalises to −2.0) | same |
| BGM under voice | **12–18 dB** — voice window vs music-only hold window | `audio-review.md`, `render-evidence.md` |
| Duck while speaking | **a further 4–6 dB**, ramps **150–300 ms**, **no pumping** on short pauses | `audio-review.md` |
| SFX | every cue lands on a voice accent / an action, never masks a spoken word | `audio-review.md` |
| Closing | BGM cuts on the last word; **the 5.00 s post-word tail is silent** | `audio-review.md`, `final-check.md` |

---

## 2 · Measured voice level (the anchor for every gain below)

`ebur128=peak=true` on the clips that existed when this plan was written (voice-agent still running):

| clip | dur | I (LUFS) | TP (dBFS) | | clip | dur | I (LUFS) | TP (dBFS) |
|---|---|---|---|---|---|---|---|---|
| `s1` | 2.758 s | −19.8 | −2.2 | | `s5` | 1.736 s | −20.6 | −3.3 |
| `s2a` | 2.323 s | −20.8 | −4.5 | | `s7` | 2.809 s | −20.3 | −3.7 |
| `a1` | 2.556 s | −20.2 | −2.6 | | `s8` | 0.659 s | −20.5 | −4.4 |
| `s2b` | 1.958 s | −20.0 | −4.6 | | `s9` | 3.159 s | −20.3 | −2.8 |
| `s3` | 3.454 s | −20.1 | −2.4 | | `s4` | 2.112 s | −20.4 | −3.7 |

**n = 10 · I: −20.8 … −19.8 LUFS · mean −20.30 · spread 1.0 LU · TP best −2.2 dBFS.**
`s6` and `s10` are missing (`s6.mp3`, `s10.mp3` absent at measurement time). All clips 48 kHz mono —
Phase 7 must resample to 48 kHz stereo on the mix bus (carried from
`docs/chung-minh-de-lam-gi/audio-review.md` AR-05, same engine, same route).

---

## 3 · BGM bed

**File:** `bgm.mp3` — **measured** −20.1 LUFS integrated / TP −10.1 dBFS / LRA 1.5 LU over the 43.900 s
segment that plays (cut from file offset 3.500 s so the generator's own 3 s fade-in is not heard twice).

### 3.1 Base gain — the one number that must be re-derived at Phase 7

The rule is a relation, not a constant:

```
fileGain_dB = voiceMeanLUFS − 15.0 − (−20.1)        // 15 dB = middle of the 12–18 band
duckedGain = fileGain × 10^(−5.0/20)                // 5 dB extra duck, inside 4–6
```

| if voice clips land at | file gain | linear | ducked gain | ducked linear | gap under voice |
|---|---|---|---|---|---|
| **−20.30 LUFS (measured now, n=10)** | **−15.20 dB** | **0.1738** | −20.20 dB | 0.0977 | 15.0 dB un-ducked · 20.0 dB ducked |
| −16.0 LUFS (the −16 LUFS post-filter some videos in this repo apply) | −10.90 dB | 0.2851 | −15.90 dB | 0.1603 | same relation |

Lookup table for the other two band edges (use whichever lands nearest the intended feel):

| target gap | voice −20.30 LUFS | voice −16.0 LUFS |
|---|---|---|
| 12 dB (music as present as the contract allows) | −12.20 dB · 0.2455 | −7.90 dB · 0.4027 |
| **15 dB (chosen)** | **−15.20 dB · 0.1738** | **−10.90 dB · 0.2851** |
| 18 dB (music almost subliminal) | −18.20 dB · 0.1230 | −13.90 dB · 0.2018 |

**15 dB is chosen, not 12.** The narration is quiet, intimate and close-mic'd (TP −2.2 dBFS, mean
−20.3 LUFS); at 12 dB a −20 LUFS bed with a 1.5 LU loudness range would sit close enough to read as
part of the voice. 15 dB keeps the bed clearly under the line on a phone speaker, where the narration
dominates and the music is felt rather than heard — which is what `brief.md`'s "soft, intimate,
nocturnal" asks for. 18 dB would make it inaudible on phone speakers and waste the one continuous
sound in a video that is 33.4 % silence.

### 3.2 Level curve (un-ducked, in seconds — apply `interpolate` with `extrapolateLeft/Right: 'clamp'`)

| t (s) | frame | gain (at `fileGain` = 0.1738) | dB rel. base | what it is doing |
|---|---|---|---|---|
| 0.000 | 0 | 0.0000 | — | silence before the first frame; the cover is already composed |
| 1.200 | 36 | 0.1738 | 0 | 1.20 s fade-in, clear of `s1`'s first word (voice 0.000–2.821) |
| 32.809 | 984 | 0.1738 | 0 | start of `s8`'s 1.80 s hold — the bed is the only sound in that silence |
| 36.500 | 1095 | 0.2086 | +1.58 | +1.2× across the hold into `s9`, carrying the **L3 palette turn** |
| 41.555 | 1247 | 0.2086 | +1.58 | into the `s10` clause gap, where the cup goes down |
| 42.600 | 1278 | 0.2433 | +2.92 | +1.4× into the closing question — the warmest the bed gets |
| 43.033 | 1291 | 0.2433 | +2.92 | hold |
| **43.900** | **1317** | **0.0000** | — | **fade-out over 0.867 s; zero from here to the end of the file** |

The bed is **1.40× its base at its warmest** and never more. The rise across `s8`'s hold and the rise
into `s10` are the sound-design §1 "swell in holds/ending" requirement, and they are the *riser* role of
the §4.3 closing grammar — done with level, because `riser-cine.mp3` (0.0 dB peak cinematic riser)
would break the register `brief.md` fixes. Full rationale: `analysis/no-beat-sync.md`.

### 3.3 Ducking

- **Duck depth: 5.0 dB** (inside the 4–6 dB band). Combined with §3.1 this puts the bed 15.0 dB under
  voice in holds and 20.0 dB under voice while speaking.
- **Ramps: 200 ms** on both attack and release (inside 150–300 ms).
- **No pumping on short pauses — this is a rule, not a preference.** The shortest intra-clip pause in
  this script is **0.14 s** (inside `a2`); `a1` has 0.24 s, `s7` 0.24 s, `s5` 0.18 s, `s6` 0.18 s.
  A naive "duck while any voice frame is non-silent" gate with 200 ms ramps would dip and recover four
  or five times inside single sentences — audible pumping, and it would drag the bed up and down under
  the most intimate lines in the video.
  **Implementation:** the bed stays ducked from 200 ms **before** any clip starts until **0.40 s after
  the last clip ends**, then ramps up over 200 ms. Equivalently `isDucking(t) = ∃ clip c : c.from − 0.20 ≤ t ≤ c.end + 0.40`. Short gaps are absorbed by the hold; the long holds — `img1` 1.70 s, `s8` 1.80 s, `img2` 1.30 s, `s3` 1.05 s — are long enough for one clean, un-pumped recovery.
- SFX are **not** ducked with the bed. Each one already sits ≥ 10 dB under the voice's loudest sample
  and lands in a silence window, so ducking it would be inaudible work.

---

## 4 · SFX cue table

Offsets are **relative to the shot's start** (`sound-design` §4.5), never absolute frames. The absolute
column is the `script.md` §1 planning projection at 3.9 syl/s. `volume` is a multiplication coefficient,
preview-safe (all ≤ 1.0).

| # | shot | offset (s) | abs (s) | file | source | gain dB | volume | dur | durationInFrames | lands on | file peak → post-gain |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `s3` | **+4.16** | 16.100 | `sfx-rain-wash.mp3` | `transition/wind-swoosh-short` | −12.0 | 0.2512 | 0.90 s | **27** | `s3`'s 1.05 s hold — the withheld-message beat; rain running down the glass behind her, after `rất lâu … điện thoại` has stopped | −1.3 → **−13.3** |
| 2 | `a2` | **+1.56** | 18.660 | `sfx-drop-glass.mp3` | `fluid/water-drop-cave` | −8.0 | 0.3981 | 0.32 s | **10** | the tail of `a2` — one drop striking the window as `mưa rơi đều` lands | −4.9 → **−12.9** |
| 3 | `s5` | **+2.04** | 23.760 | `sfx-back-a.mp3` | `text/typewriter-hit-single` | −15.0 | 0.1778 | 0.28 s | **8** | `img1` beat 1 — first backspace | −0.4 → **−15.4** |
| 4 | `s5` | **+2.40** | 24.120 | `sfx-back-b.mp3` | `ui/switch-click-quick` | −16.5 | 0.1496 | 0.26 s | **8** | `img1` beat 2 — second backspace (different sample, §4.2) | −1.1 → **−17.6** |
| 5 | `s5` | **+2.74** | 24.460 | `sfx-back-a.mp3` | `text/typewriter-hit-single` | −18.5 | 0.1191 | 0.28 s | **8** | `img1` beat 3 — third backspace, quietest (descending ladder) | −0.4 → **−18.9** |
| 6 | `s5` | **+3.20** | 24.920 | `sfx-phone-down.mp3` | `paper/paper-move-quick` | −13.0 | 0.2239 | 0.40 s | **12** | `img1` close — the hand hesitates, then turns the phone face-down | −2.2 → **−15.2** |
| 7 | `s6` | **+2.31** | 27.700 | `sfx-screen-wake.mp3` | `ui/switch-light` | −9.0 | 0.3548 | 0.17 s | **5** | `s6`'s 0.679 s hold — the screen lights with the saved-name call. **No ring is played**; the silence after it is the unanswered call | −5.1 → **−14.1** |
| 8 | `s7` | **+3.28** | 31.400 | `sfx-umbrella-lift.mp3` | `fluid/sand-swish` | −10.0 | 0.3162 | 0.55 s | **17** | `s7`'s 0.843 s hold — the furled umbrella lifted out of her lap, **not opened**, after `phải là người ổn` stops | −5.1 → **−15.1** |
| 9 | `s9` | **+3.99** | 38.600 | `sfx-drop-fabric.mp3` | `fluid/water-splash` | −12.0 | 0.2512 | 0.30 s | **9** | `img2` hold — drops running off the edge of her wet sleeve, after `bị ướt` | −0.4 → **−12.4** |
| 10 | `s9` | **+4.49** | 39.100 | `sfx-light-turn.mp3` | `light/sparkle-touch` | −14.0 | 0.1995 | 0.60 s | **18** | **L3 — the one warm arrival**, the palette turning on the wet fabric. This is the §4.3 "sparkle" role, moved to where the storyboard's actual peak of light is | −1.5 → **−15.5** |
| 11 | `s10` | **+1.81** | 41.570 | `sfx-cup-down.mp3` | `glass/glass-plate-slide` | −9.0 | 0.3548 | 0.28 s | **8** | the **0.300 s clause gap** — the same hand sets the warm cup down beside the phone, *before* `Hôm nay có chuyện gì với bạn thế?` begins. The §4.3 "impact" role | −4.2 → **−13.2** |

**No cue has `durationInFrames` omitted.** All eleven are explicitly given, and none is longer than 5 s
after trim, so `sound-design` §4.1's long-sample rule does not bind — but every file is trimmed shorter
than its natural tail, so the explicit value is what keeps the sound from running past the action.

### 4.1 Why every cue is in a silence window

`script.md` §1 gives 13 spoken clips and 16.34 s of planned silence (33.4 % of the runtime). The cue
table is checked against that timeline by `analysis/check-cues.py` (re-runnable); its output is
`analysis/cue-check.txt` — **11/11 cues 100 % inside a silence window, 0 word overlaps, exit 0**:

| silence window | length | cues placed |
|---|---|---|
| after `s3` (0.26 intra + 1.05 hold) | 1.314 s | #1 |
| after `a2` (0.14 + 0.25) | 0.382 s | #2 |
| after `s5` (0.18 + 1.70, stages `img1`) | 1.875 s | #3, #4, #5, #6 |
| after `s6` (0.18 + 0.50) | 0.679 s | #7 |
| after `s7` (0.24 + 0.60) | 0.843 s | #8 |
| after `s9` (0.26 + 1.30, stages `img2`) | 1.560 s | #9, #10 |
| `s10` clause gap | 0.300 s | #11 |

Shortest headroom at either end of any window: **0.015 s** (`#11`, before the question). Longest cue
that could have crowded a neighbour: `#1` at 0.90 s in a 1.314 s window, 0.10 s clear of `a2`.

**Windows deliberately left empty, with the reason:**

| silence | length | why no cue |
|---|---|---|
| after `s1`, `s2a`, `a1`, `s2b` | 0.352 – 0.536 s | these clips open at 0.000 s — there is **no silence before `s1`** at all, and the shots in this run have no action with a sound (a nod, shoulders dropping, a glass that is already sitting there). The rain on the umbrella rim at frame 0 is a real foley opportunity, and it is refused: `s1` speaks from the first frame. The cover is carried by the bed alone. |
| `s8`'s hold | 1.801 s | `script.md` §3 for `s8`: *"the light holds; the room is still."* A transient here would contradict the shot. This silence is given to the **bed** instead — §3.2 starts the L3 swell here. |
| after `s4` | 0.649 s | the draft is left hanging unsent; nothing moves in the image. |
| after `s10` + END card | 5.000 s | **locked silence** (`script.md` §5, `voice-direction.md` §Ending behaviour). |

### 4.2 Anti-machine-gun discipline (`sound-design` §4.2 / S2)

The only repeated hits are the three `img1` backspaces, and they use **two different samples**
(`typewriter-hit-single` → `switch-click-quick` → `typewriter-hit-single`, verified as distinct md5) on a
**descending ladder** −15.0 / −16.5 / −18.5 dB, with the interval widening (0.36 s, 0.34 s) as the
deletion slows down. Three hits, not more: "the characters vanish one by one" is legible as a countable
rhythm, and a fourth would read as mechanical repetition.

---

## 5 · Level budget (measured, at the gains above)

| element | peak level | vs voice peak (−2.2 dBFS) |
|---|---|---|
| voice | −2.2 dBFS | — |
| loudest SFX (`#2`, `#9`) | −12.4 dBFS | **9.8 dB below** |
| BGM bed, ducked | TP −10.1 − 20.20 = −30.3 dBFS | **28.1 dB below** |
| BGM bed, un-ducked (holds) | TP −10.1 − 15.20 = −25.3 dBFS | **23.1 dB below** |
| BGM bed integrated, un-ducked | −20.1 − 15.20 = **−35.3 LUFS** | **15.0 dB under** the −20.3 LUFS voice |
| BGM bed integrated, ducked | −20.1 − 20.20 = **−40.3 LUFS** | **20.0 dB under** the voice |

Nothing exceeds 1.0 `volume`, so what Studio previews is what the render produces (no preview
clamping divergence, `sound-design` §4.1). The mix's loudest moment is a voice sample; the render's
`loudnorm=I=-14:TP=-2.0` then brings the whole thing to −14 LUFS without touching these ratios.

---

## 6 · `Reel.tsx` implementation contract

Sound is a **timeline-level asset, not a shot-level one** (`sound-design` §1): the table lives in one
place and every cue is a `<Sequence>` over it.

```ts
export const FPS = 30;
export const BGM_START_FROM_F = 105;          // 3.500 s into bgm.mp3 - past the generator's own 3s fade-in
export const BGM_FILE_GAIN = 0.1738;           // see mix-plan §3.1 - RE-DERIVE at Phase 7
export const BGM_DUCK = 0.5623;                // -5.0 dB
export const DUCK_RAMP_F = 6;                  // 200 ms, inside 150-300 ms
export const DUCK_HOLD_F = 12;                 // 0.40 s after the last clip - kills pumping on short pauses

// Bed level keyframes (frame, seconds, multiplier on BGM_FILE_GAIN)
export const BED = [
  [0, 0.0000], [36, 1.0000], [984, 1.0000], [1095, 1.2000],
  [1247, 1.2000], [1278, 1.4000], [1291, 1.4000], [1317, 0.0000],
];
```

- `<Audio src={staticFile('audio/ban-khong-yeu-duoi-chi-da-manh-qua-lau/bgm.mp3')} startFrom={BGM_START_FROM_F} volume={bedVolume(frame)} />`
  wrapped in the boolean inputProp **`bgm` (default `true`)** so the no-BGM version renders from the same
  timeline — `sound-design` §1. `props-nobgm.json` is `{"bgm": false}`.
- SFX entries keep the `{ from, src, volume }` schema unchanged; the whole table is
  `{ from: sfxFrom(SHOTS.<key>.from + OFFSET, '<file>'), src, volume, durationInFrames }`.
- **Peak-alignment formula** (`sound-design` §4.6), using the per-file peak lags measured in
  `assets-manifest.md` §2:
  `sfxFrom(targetF, src) = round(targetF − PEAK_F[src] − OUTPUT_AUDIO_OFFSET_F)`
  with `PEAK_F` = { rain-wash 4.9, drop-glass 2.3, back-a 2.4, back-b 0.4, phone-down 3.0,
  screen-wake 1.7, umbrella-lift 6.3, drop-fabric 3.0, light-turn 7.6, cup-down 3.0 }
  (values = measured peak seconds × 30, rounded).
- **`OUTPUT_AUDIO_OFFSET_F` is deliberately left as a named-but-unset constant.** This repo recorded
  1.28 f for Remotion 4.x + AAC 48 kHz mp4 (AAC encoder priming, 2048 samples), but that is a
  measurement of *another* render, and `sound-design` §4.6 forbids carrying an old constant across
  pipelines. Measure it on the first render: extract the audio, cross-correlate two or three sharp cues
  against the rendered track, and the residual after correction must be ≤ 0.5 f.
- `durationInFrames` is applied as in `sound-design` §4.1 and **is not offset-shifted** — the window
  moves as a whole.
- Nothing is scheduled at or after frame **1317** (43.900 s).

---

## 7 · Phase 7 re-check list (what the mix owner must re-derive)

1. **`BGM_FILE_GAIN` from the final `voice-report.md`.** The 0.1738 above is anchored to 10 of 13
   clips measured at 00:15. Re-derive with §3.1's formula; if the clips were normalised to −16 LUFS,
   the correct value is 0.2851, not 0.1738. **This is the single most likely thing to be wrong.**
2. **Re-base every cue offset onto the measured timeline.** Use the relative offsets in §4; if the
   measured rate falls outside 3.29–4.43 syl/s, `script.md` §5's elasticity applies (holds are cut
   before any speech), and the silence windows move with it. Re-run `analysis/check-cues.py` with the
   measured durations — it is the check, not a formality.
3. **Re-measure `OUTPUT_AUDIO_OFFSET_F`** (§6) and verify residuals ≤ 0.5 f on 2–3 probes.
4. **Confirm the 43.906 s cut and the silent tail** on the rendered file, not on the plan.
5. Confirm voice-clip loudness spread ≤ 2 LU on all 13 clips (`s2a` is currently the outlier at −20.8).

## 8 · Open issues

| # | issue | severity | owner | note |
|---|---|---|---|---|
| A-1 | `BGM_FILE_GAIN` depends on voice clips that are still being generated | **Trung** | Phase 7 mix owner | §7.1. Both values are given; the relation is the contract. |
| A-2 | No licensed **rain** sample and no licensed **ringtone** in the library | Thấp | audio-agent, closed by design | Rain is built from three real water/air samples; the call is expressed by a real switch click plus silence. Documented in `assets-manifest.md` §2. Downloading either would mean an unlicensed source. |
| A-3 | `sfx-phone-down` is a **gesture proxy** (`paper/` standing in for a phone on a surface) | Thấp | audio-agent | Declared in `assets-manifest.md` §2. Low risk: it sits in a 1.875 s silent hold at −15.2 dBFS. |
| A-4 | The frame-0 rain foley is refused because `s1` speaks from the first frame | Thấp | script-agent / director | Deliberate, not an oversight; recorded in §4.1. If the owner wants the cover silent for 0.5 s, that is a `script.md` change, not an audio change. |
| A-5 | `content-pack.md` §11.6 asks whether the audio branch emphasised `rất lâu` / `phải là người ổn` / `với bạn thế?` | Thấp | voice-agent (answer), gate E (confirm) | Voice emphasis is the voice-agent's call and was not checked here. What this branch *does* guarantee is that the foley around those three highlight beats never lands under the emphasised words: cues #1 (`s3`) and #8 (`s7`) sit in the silence **after** the last word of each clip, and cue #11 sits in the 0.300 s clause gap **before** `với bạn thế?` begins, so the question itself is spoken over silence. |