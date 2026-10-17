# Join notes — chung-minh-de-lam-gi (director, Phase 4)

Branches passed: script A 9.2 (round 2), content 9.5 (round 2), audio 9.3 (round 2), design D 9/10 (round 2). Gate order stands A → content → audio → D → E → B → C.

## Locked inputs (byte-exact since gate A; director does not touch)

- `voice.json`: 15 keys, Thanh-Long-Nang-Cao clone (route 2, authorized), totals 192 syllables, voice 49.55s, held + holds 6.05s = **55.60s** end.
- `script.md` (15 keys/12 shots), `content-pack.md` (15/15 joins byte-exact, s7a exact 16/20/16, chips s6 0.3–3.6s/s8 0.3–3.8s/s10 Tuổi Trẻ, no CTA, final 2.0s silence).
- `design-spec.md` stick system: bg `#060606`, white `#FAFAF7`, orange `#F58B4C`, prop grey `#8F8F8F`, ghost @20%, Lexend Bold headlines / Be Vietnam Pro SemiBold captions, flat shapes + opacity only (no gradient/blur), cards validated in `SC/gallery/api/library.json`, demo TSX read per shot.
- `assets-manifest.md` + `mix-plan.md` (measured shot starts, SFX cues, BGM plan).

## Measured timeline (shot starts, absolute frames @30fps)

| key | from (s) | from (f) | dur (s) | dur (f) | voice offset |
|---|---|---|---|---|---|
| s1 | 0.00 | 0 | 2.20 | 66 | 0 |
| s2a | 2.42 | 73 | 3.37 | 101 | 0 |
| s2b | 6.05 | 182 | 2.93 | 88 | 0 |
| s3 | 9.44 | 283 | 3.81 | 114 | 0 |
| s4a | 13.88 | 416 | 3.66 | 110 | 0 |
| s4b | 17.84 | 535 | 3.86 | 116 | 0 |
| s5 | 21.94 | 658 | 2.74 | 82 | 0 |
| s6 | 24.58 | 737 | 3.86 | 116 | 0 |
| s7a | 28.15 | 845 | 3.57 | 107 | 0 |
| s7b | 31.46 | 944 | 3.57 | 107 | 0 |
| s8 | 35.18 | 1055 | 4.10 | 123 | 0 |
| s9a | 39.66 | 1190 | 3.23 | 97 | 0 |
| s9b | 43.74 | 1312 | 3.33 | 100 | 0 |
| s10 | 47.07 | 1412 | 3.23 | 97 | 0 |
| s11 | 50.26 | 1508 | 5.41 | 162 | 0 |
| end | 55.60 | 1668 | — | — | — |

Comp duration: **1668f @30fps** (55.60s ≤ 59.5s cap).

## SFX cue table (shot-relative seconds → absolute frames; gains per manifest; all ≤ −16 dB; no SFX last 2.0s)

| shot | offset s | abs f | file | gain dB | frames | lands on |
|---|---|---|---|---|---|---|
| s1 | 0.90 | 27 | sfx-ting | −26 | 9 | ends 1.20 s "sao" onset (AR-02: no SFX under first two words) |
| s3 | 1.51 | 328 | sfx-tap-a | −22 | 8 | noun-tail "miên," |
| s3 | 2.29 | 351 | sfx-tap-b | −21 | 7 | noun-tail "khen," |
| s3 | 3.13 | 377 | sfx-tap-b | −24 | 5 | noun-tail "danh," |
| s4a | 0.00 | 416 | sfx-applause | −26 | 110 | whole shot (carries gap lift) |
| s9a | 3.70 | 1301 | sfx-drip-b | −16 | 11 | ends 4.07, before s9b |
| s8 | 0.00 | 1055 | (applause texture) | −26 | 123 | whole shot (bed carry) |
| s6 | — | — | sfx-ting opt-in | DROPPED default | — | no licensed audition |

BGM (mix-plan): `bgm.mp3` starts at video 0, no offset, no loop, truncate at end.
- 0 → 36f fade-in −inf → −11.1 dB (0.279)
- bed −11.1 dB during voice s1–s8; gap-lift −7.1 dB (0.442) in gaps/tails
- s9a down −18.1 dB (0.124) from 39.66; s9b −24.1 dB (0.062) from 43.74
- 46.67 → 47.07 fade −24.1 → −inf (s9b tail)
- s10 → s11: OFF (dry voice, starkest stretch)
- 53.60 → 55.60 pure silence (no BGM/SFX/voice)
s7a stem: `volume=+3.8dB` + `alimiter=limit=0.841` at mix (post −16.4 LUFS, TP ≤ −1.5). Voice clips 24kHz mono resampled at mix (aresample=44100 soxr, length-preserving).

## Per-key reconciliation (duration | on-screen | SFX/beat | mismatch → owner)

- s1 2.20s: HEADLINE 2 lines + medal + empty chair 20%. Ting ends before "sao". No branch change.
- s2a 3.62s: caption 3 chunks; desk/chair staging; typing bed starts. No change.
- s2b 3.18s: caption 3 chunks + speech bubble `nó thì làm được gì` (minh hoạ) + smirk close-up (T2: face ≥300px). Laugh dropped (AR voice memo: no licensed source → silence + gap). No change.
- s3 4.06s: caption 4 chunks + 3 medals drop "tách–tách–tách" (3 nhịp均匀, no word-level sync promise); tap-a/b/b at 1.51/2.29/3.13 +0.05 post-word-end. No change.
- s4a 3.91s: caption 4 chunks + white block "sáng rực" + sparse confetti + applause bed. No change.
- s4b 3.86s: caption 4 chunks + medals 60% opacity + empty chair. No change.
- s5 2.99s: HEADLINE (re-hook at 21.94s ≈ 19.8s @4.1 → acceptable drift; reveal on-time). Gap trimmed 0.30 per T1b fallback not needed (55.60 ≤ 59.5). No change.
- s6 3.86s: caption 3 chunks + chip spotlight 0.3–3.6s (fade before cut) + corridor shadows. No change.
- s7a 3.82s: caption exact 3 chunks + medal close-up + bubble (minh hoạ) + 2–3 white curve gloss (no gradient). No change.
- s7b 3.82s: caption 3 chunks + chest graphic (dashed) + medal out-of-frame fade + hum-only hold end. No change.
- s8 4.10s: caption 4 chunks + chip 0.3–3.8s (fade 0.3s before cut) + flat line-graph prop (no axis text). No change.
- s9a 3.48s: caption 3 chunks + mirror facing + question mark. Drip-b at 3.70 ends before s9b. No change.
- s9b 3.58s: caption 3 chunks + spotlight sweep onto chest + BGM −inf during 0.40 tail. No change.
- s10 3.48s: HEADLINE + `định giá` cam + thẻ giá (minh hoạ) pointing to faceless shadow + chip Tuổi Trẻ in-shot. BGM OFF. No change.
- s11 5.33s: HEADLINE + medal still in hand + hand on chest + empty chair turned + push-in 1.00→1.03 + **dead stop + pure silence 2.0s**. No SFX/BGM last 2.0s. No change.

## Mood/turn check

- H1 s4a→s4b (sáng rực → im phăng phắc) lands with applause→máy lạnh-rè handoff at gap 0.25. ✓
- H2 s7a→s7b (treo yên trên tường / nằm trong ngực) with gap 0.40 and hum-only tail. ✓
- H3 s9a→s9b (soi gương → đèn rọi vào ngực) with gap 0.30, s9b 0.40 hold then BGM off, final question isolated by s10, +2.0s silence. ✓
- No face on người chê (s2b) or bóng người nhận thẻ (s10) — matches brief.

## Mechanical director fixes (shared timeline/kit/Reel/Root only)

- Comp ID `ChungMinhDeLamGiReel`, 1668f, Root registration via `src/videos/registry.ts` (never edit Root directly), manifest `src/videos/chung-minh-de-lam-gi/index.ts` via `defineVideo`, timeline `src/videos/chung-minh-de-lam-gi/timeline.ts` from table above, kit `kit.tsx`, Reel `Reel.tsx` (BGM/SFX per table), voice.json read-only, workbench.ts.
- Early scaffold may start (layout only, no locked captions/audio sync) once proto + timeline exist.

## Carried tickets (all Thấp, non-blocking; re-verify at gate C)

content-pack T1 (s10 line split closed round 2), design N1–N3 (board-staging nits, build only), audio AR-06 voice-agent watchlist (ASR syllables), manifest AR-07 escalation note (drop accepted), script T1b fallback not needed (55.60 ≤ 59.5).
