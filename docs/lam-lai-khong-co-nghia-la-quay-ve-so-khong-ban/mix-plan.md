# Mix plan — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

Voice timeline (measured, frames @30fps):
- s1: 0–154 (voice 5.136s + 30f hold)
- s2: 154–323 (voice 5.616s + 30f hold)
- s3: 323–462 (voice 4.608s + 30f hold)
- s4: 462–599 (voice 4.536s + 30f hold)
- s5: 599–744 (voice 4.152s + 30f hold)
Total: 744 frames (24.8s) — wait, with -25% rate total 827 frames (27.6s). Use measured voice-durations.ts (827 frames incl. holds).

## BGM
- File: bgm.mp3 (111.5s, loops).
- Bed level: 14 dB below voice (short-term LUFS window).
- Ducking: additional 5 dB while voice speaks, 200 ms ramps; no pumping on short pauses.
- Mood arc: subdued (s1–s2) → warmer (s3–s4) → gentle (s5).

## SFX cue table
| frame (est.) | key | purpose | must not mask speech |
|---|---|---|---|
| 0 | (none) | cover lands | — |
| ~154 (s2 start) | sfx-sweep | transition into realization | yes (between s1/s2 gap) |
| ~323 (s3 start) | sfx-riser | re-hook lift | yes (gap) |
| ~462 (s4 start) | sfx-shimmer | highlight core line | yes (gap) |

## Mix targets (final render)
- Integrated loudness -14 LUFS ±1, true peak ≤ -1.5 dBTP.
- Voice vs music-only windows 12–18 dB.
- Each SFX on voice accent or BGM beat, never on spoken word.