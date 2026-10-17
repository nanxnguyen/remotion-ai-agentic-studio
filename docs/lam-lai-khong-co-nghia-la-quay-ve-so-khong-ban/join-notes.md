# Join notes — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

Phase 4 join by video-director. All three branches passed (content 9, audio 9, design 8.5).

## Per-key reconciliation

| key | duration (s) | frames | on-screen text | SFX/beat | mismatch → owner |
|---|---|---|---|---|---|
| s1 | 5.136 | 0–154 | HEADLINE (cover) | none | none |
| s2 | 5.616 | 154–323 | caption only | sfx-sweep at 154 (gap) | none |
| s3 | 4.608 | 323–462 | caption only (re-hook) | sfx-riser at 323 (gap) | none |
| s4 | 4.536 | 462–599 | HEADLINE core line | sfx-shimmer at 462 (gap) | none |
| s5 | 4.152 | 599–744 | caption only (closure) | none | none |

Total: 744? Actually 827 frames incl. holds (27.6s). Measured voice-durations.ts = 827 frames.

## Checks
- On-screen text & caption chunks fit frame layout and safe zone (bottom:224) — content-pack.md §Per-key.
- Cover text matches style-cover.png (headline hook) — yes.
- Highlight beats (s4 core line) have hold (30f) and SFX cue — yes.
- BGM mood/energy arc: subdued→warm→gentle matches story turn — mix-plan.md.
- Hook motion pace vs voice: fade-in 15–20f < voice lead; ok.

## Mismatches
- None blocking. Thấp: caption chunk lengths to be verified against final frames at QA. Font swap (system-ui→Be Vietnam Pro) carried to build.