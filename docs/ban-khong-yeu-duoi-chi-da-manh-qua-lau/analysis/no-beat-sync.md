# Beat analysis — ban-khong-yeu-duoi-chi-da-manh-qua-lau: **no beat sync**

Video `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · profile `story` · 30 fps · planned total **48.90 s** at 3.9 syl/s.
Bed: `public/audio/ban-khong-yeu-duoi-chi-da-manh-qua-lau/bgm.mp3` (60.43 s file; the analysis ran on the
43.90 s segment that actually plays, cut from file offset 3.500 s).

## Verdict

**No beat sync. No `beat_data.json` is written.** Every candidate grid fails the `music-beat-sync` §3
acceptance test; `grid_drift.json` holds all candidates and the numbers behind this decision.

## What was measured

`music-beat-sync` §1, run with `~/.venvs/vieneu/bin/python` (librosa 1.0.0) on the played segment
(`analysis/grid_drift.json` is the machine output; the script that produced it is re-runnable from
`analysis/grid_drift.json`'s provenance fields).

| step | measurement | result |
|---|---|---|
| §1 `librosa.beat.beat_track(tightness=400, units="time")` | tempo scalar | **0.0** |
| §1 | beat sequence length | **0 beats** |
| §1 | least-squares equidistant grid fit | **not possible** — no beat sequence to fit |
| §2 | onset transients (`onset_detect`, hop 512) | 236 onsets, first at 0.0348 s |
| §2 | onset autocorrelation BPM peaks | **none** — no periodicity to lock onto |
| §3 | best candidate (`nominal arp 0.5x`, 288 BPM, t0 0.0348) | match **48.34 %** · mean err **5.97 ms** · drift **0.884 ms** · beat 0 on attack ✓ |
| §3 | all other candidates (144 / 72 / 288 BPM × t0 0.0 / 0.0348) | match **0.00 – 1.89 %** |

Thresholds: match ≥ 98 %, mean |error| < 10 ms, total drift < 5 ms, beat 0 on a real attack.
**The best candidate misses the match threshold by 49.66 points**; nothing else is close.

## Why

The bed is a sine pad with soft exponentially-decaying arpeggio plucks (`scripts/gen-bgm-soft.py`,
C–Am–F–G, nominal 72 BPM). There is no kick, no snare, no hi-hat and no percussive attack — the §2a
three-class transient detection has nothing to classify, and `beat_track` finds no periodic beat at all.
The 236 detected "onsets" are the individual pluck attacks, which are amplitude-modulated by the
exponential decay and by the 1.2 s pad swell underneath them, so they do not fall on any equidistant grid.

## What this changes downstream

- **No `beatF(n)` and no click track.** Shot boundaries and cues are pinned to the voice timeline, not to
  a music grid.
- Every SFX cue in `assets-manifest.md` lands on a **voice accent, a visual action or a named silence
  window** from `script.md` §1/§5 — never on "beat n".
- The narrative timing is voice-driven anyway: this video's cut list is set by 13 spoken clips and 16.34 s
  of planned silence, so a music grid would add nothing.
- Precedent in this repo: `docs/thuong-hay-so-bat-dau-lai/analysis/no-beat-sync.md` reached the same
  verdict for the same generator; this file adds the measured numbers the sibling did not record.

## The deliberate omission of riser → impact → sparkle (`sound-design` §4.3)

`sound-design` §4.3 prescribes the three-beat closing phrase **where the storyboard has a peak**. This
storyboard has no slam peak — `brief.md` fixes the register as *gentle, intimate, never theatrical* and
`voice-direction.md` §Ending behaviour locks 5.00 s of total post-word silence. The grammar is kept, but
each role is served by foley and light instead of cinema punctuation:

| §4.3 role | what plays here | why not the stock cue |
|---|---|---|
| riser (energy build) | **BGM level swell**, +2.0 dB across `s8`'s 1.80 s hold into `s9`, then +1.4 dB again into `s10` | `riser-cine.mp3` peaks at 0.0 dB and is a cinematic riser; it would break the intimate register and the "never theatrical" line in `brief.md` |
| impact (the landing) | **`sfx-cup-down.mp3`** at the `s10` clause gap, 41.570 s — the hand actually setting the cup down | this is the real foley of the on-screen action; a trailer impact would be a second, invented sound on top of it |
| sparkle (afterglow) | **`sfx-light-turn.mp3`** at 39.100 s, carrying **L3**, the one warm arrival where the palette turns | the storyboard's peak of light is at `s9`/`img2`, not at the end. Placing a `light/` sparkle in the closing tail would break the locked silence — the tail carries nothing at all |

**Nothing is scheduled after 43.906 s** (`script.md` §1 exact last-word time; `script.md` §5 and
`voice-direction.md` §Ending behaviour both require it).