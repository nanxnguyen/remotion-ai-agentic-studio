# Assets manifest — chung-minh-de-lam-gi (audio: BGM + SFX)

Files in `public/audio/chung-minh-de-lam-gi/` (disjoint with `sN.mp3` voice clips, which are voice-agent owned — read-only here).
Offsets are shot-relative seconds, ANCHORED round 1 to independent faster-whisper-small word timestamps (voice-report.md landed; TO FINALIZE cleared on all voice-placed cues).

## BGM
| file | origin | license | notes |
|---|---|---|---|
| `bgm.mp3` (65.43 s, 44.1 kHz stereo, -20.3 LUFS int, TPK -10.1 dBFS, LRA 1.5, peak -10.1 dBFS) | Self-synthesized: `scripts/gen-bgm-soft.py public/audio/chung-minh-de-lam-gi/bgm.mp3 65` (numpy 2.4.6 + ffmpeg, deterministic, no third-party audio; C–Am–F–G pad + soft arpeggio, 72 BPM) | Own work, no attribution needed | Quiet ambient bed for a sparse minimal story. Distinct use from camon (same generator, fresh render, 65 s). **No beat sync** (pad + gentle arp, no drum grid; story cuts are hard-cuts, not beat-cuts) → no beat_data.json / grid_drift.json. 65.43 s covers measured video 55.60 s with margin; no loop, no offset. |

Why not the library: all 5 `SC/assets/audio/bgm` tracks are drum-driven house/hip-hop (S1 wrong for a trầm-tĩnh-khuya introspective film). Rejected licensed-minimal alternative: none in library fits; own-work pad chosen.

## SFX (all trimmed from `skills/video-shotcraft/assets/audio/sfx/`, Mixkit license per `SC/assets/audio/ATTRIBUTION.md`; re-encoded 128k, 44.1 kHz stereo, fade-outs baked)
| file | source | dur | peak dB | role |
|---|---|---|---|---|
| `sfx-ting.mp3` | mech/metal-drop-scifi-small.mp3 (first 0.6 s, fade-out last 0.15 s) | 0.60 | -7.6 | tiny metal "ting" for s1 medal reveal (foley-first: real metal of the on-screen action) |
| `sfx-tap-a.mp3` | text/typewriter-hit-hard.mp3 (first 0.35 s, fade-out last 0.1 s) | 0.35 | -1.4 | medal "tách" tick, hits 1 + 3 (md5-distinct from tap-b, S2 alternation) |
| `sfx-tap-b.mp3` | text/typewriter-hit-soft.mp3 (first 0.35 s, fade-out last 0.1 s) | 0.35 | -2.9 | medal "tách" tick, hit 2 (softer middle, descending S2) |
| `sfx-applause.mp3` | crowd/applause-rhythmic-loop.mp3 (full 5.03 s, mix truncates) | 5.03 | -1.4 | soft applause bed for s4a only (the one bright moment); hard-truncated at voice end, nothing bleeds into the s4b hard cut |
| `sfx-drip-a.mp3` | fluid/water-drop-cave.mp3 (full 2.0 s) | 2.00 | -8.7 | s11 OPT-IN only (default OFF — protects pure-silence tail; see cue table) |
| `sfx-drip-b.mp3` | fluid/water-bubble.mp3 (first 0.35 s, fade-out last 0.1 s) | 0.35 | -9.2 | single "tóc" in the s9a tail gap (stands in for the scripted pair — sparse by design) |

DROPPED (do not fake, never synthesize): s2b laugh (only applause/clap/heartbeat exist in `sfx/crowd/` — no laughter); s2a chair-drag "két" (no licensed match); s4b AC-hum "rè" (silence IS the design — "im phăng phắc"); s6 footsteps + elevator "ting" (footsteps no source; ting opt-in identified below, default DROP); s7b heartbeat (director-dropped, silence + 0.40 s gap); s10 tag-sway (visual only); all transition whooshes (script cuts are hard cuts — "Cắt cứng" — sparse by design).
Unverified by ear: all trims judged by waveform/levels only; audio-reviewer must confirm ting reads as small metal (not sci-fi), drip-b reads as bathroom drip (not bubble), applause at -26 dB reads as distant warmth (not a loop).

## SFX cue table (ANCHORED round 1: independent faster-whisper-small beam ASR with word timestamps, replicated review anchors exactly; nearest-gap rule, +0.05 after word end; transient attacks never inside a vowel nucleus)
Word anchors: s1 "rồi," ends 0.84 → "sao" starts 1.20 (gap 0.84–1.20) · s3 "miên," ends 1.46 → "bằng" 1.74; "khen," ends 2.24 → "chức" 2.52; "danh," ends 3.12 → "bạn" 3.28 · s4a last word "tươi." ends 3.68 (clip 3.71) · s9a last word "nhìn." ends 3.68 (clip 3.78).
Measured shot starts: s1 0.00 · s2a 2.42 · s2b 6.05 · s3 9.44 · s4a 13.88 · s4b 17.84 · s5 21.94 · s6 24.58 · s7a 28.15 · s7b 31.46 · s8 35.18 · s9a 39.66 · s9b 43.74 · s10 47.07 · s11 50.26 · end 55.60.
| shot | offset s | file | gain dB (linear) | durationInFrames | lands on |
|---|---|---|---|---|---|
| s1 (voice 2.17) | 0.90 | sfx-ting | -18 (0.126) | 9 (ends 1.20 = "sao" onset; ~0 decayed tail past it — negligible) | AR-02 FIX: moved from 0.10 (was on "Được" [0.00–0.10]); attack sits mid-gap 0.84–1.20, zero SFX energy under first two words |
| s3 (voice 4.29) | 1.51 | sfx-tap-a | -18 (0.126) | 8 (ends 1.78; 0.04 bleed into "bằng" @1.74 at faded tail — negligible) | AR-03 FIX: noun-tail anchored ("miên," ends 1.46 +0.05; upgrades T6b(a) even-beat fallback — still 3 medals / 3 beats) |
| s3 | 2.29 | sfx-tap-b | -21 (0.089) | 7 (ends 2.52 = "chức" onset exactly) | AR-03 FIX: "khen," ends 2.24 +0.05, softer middle (S2 descending) |
| s3 | 3.13 | sfx-tap-a | -24 (0.063) | 5 (ends 3.30; 0.02 past "bạn" @3.28 at faded tail — negligible) | AR-03 FIX: "danh," ends 3.12 +0.05, quietest; voice ends 4.16, 1.0 s clear |
| s4a (voice 3.71) | 0.0 | sfx-applause | -26 (0.050) | 110 (timeline trimFrames 110f = 3.67s ≈ last word ends 3.68) | AR-03 CONFIRMED: texture bed, no transient alignment issue; hard-truncated at voice end, zero bleed into s4b |
| s9a (voice 3.78) | 3.70 (= last-word end 3.68 +0.02) | sfx-drip-b | -16 (0.158) | 11 (ends 4.07 within shot; ~0.27 into timeline gap, ends before s9b) | AR-03 FIX: was clip-end-anchored (3.80); re-anchored to ASR last-word end; single "tóc", attack post-voice |
| s11 | — | sfx-drip-a | — | — | OPT-IN default OFF. If director opts in: single drip-a @ voice_end −1.2, -28 dB, must fully decay by voice end; final 2.0 s stays pure silence regardless |
| s2b | — | (laugh) | — | — | DROPPED — no licensed laugh; hand-wave + text carry it (brief lesson 9) |
| s6 | — | (elevator ting) | — | — | DROPPED default; opt-in file = `sfx/light/chime-crystal.mp3` (licensed but decorative ⚠️ — needs in-context audition; never without it) |

## Mix-time voice correction (AR-01 — canonical clips untouched, applied at Phase 7 mixdown to the s7a stem only)
s7a measures -20.2 LUFS int (RMS -19.15 vs siblings ≈-15.3; peak -1.9 dBFS normal). Recipe: `volume=+3.8dB` then hard true-peak cap — naked +3.8 dB would push peak to +1.9 dBFS, so a limiter is MANDATORY, not optional: `ffmpeg -i s7a.mp3 -af "volume=3.8dB,alimiter=limit=0.841:attack=5:release=50:level_out=1"`. Post: -16.4 LUFS = voice mean exactly (within ±1 LU ✓), TP ≤ -1.5 dBTP ✓. Prefer this mix gain over voice-agent re-render (level issue, not defect — review §6). If voice-agent re-renders s7a instead, drop this recipe and re-verify LUFS.

## Open issues (round 1 fixes applied; R2 machine re-check pending)
1. s2b laugh: DROPPED (no licensed laugh; hand-wave + text carry it, brief lesson 9). Reopen only on user-supplied licensed laugh; never synthesize.
2. s9a pair → single drip: deliberate sparse reduction (see cue table); second "tóc" returns only if audio-reviewer finds the gap empty.
3. s11 drip: default OFF to protect the inviolable pure-silence tail. Opt-in rule in cue table.
4. AR-07 RESOLVED BY DROP: `sfx-keys.mp3` (typing bed) DELETED — source `text/keyboard.mp3` is 无法反查 in both `docs/audio-attribution.md` and `SC/assets/audio/ATTRIBUTION.md`; all licensed-confirmed typing-adjacent trims are < 2 s (`typewriter-digital` 1.85 s, `pen-write-paper` 1.47 s, `write-fast` 0.79 s) and cannot bed a 4.29 s voice without looping. s3 is carried by taps + BGM (sparser by design). ESCALATION for producer: (i) accept drop [recommended], or (ii) supply a licensed typing sample → cue re-lands at s3 offset 0.10 / -22 dB / 129 f. No unlicensed file ships.
5. AR-06 / AR-08: voice-agent owned (ASR watchlist syllables; s1 accepted-noise closed) — not audio scope.

## Verification 2026-10-17 (ffprobe + volumedetect + ebur128; round 0 + round 1 fix pass)
Round 0: 8 files verified, no clipping (hottest peaks keys -1.8, tap-a -1.4, applause -1.4 — all < 0 dBFS, all played ≤ -16 dB); BGM + SFX 44.1 kHz stereo; BGM -20.3 LUFS int / TPK -10.1 / LRA 1.5. Round 1: sfx-keys.mp3 DELETED (AR-07); remaining 7 files re-verified present with durations/peaks/srates exactly as tabled. No beat grid (pad, no drum beat — correctly skipped, not faked). Licences round 1: 6 trims = Mixkit with confirmed URL rows in `docs/audio-attribution.md` (+ BGM own work); keyboard-derived material fully removed — nothing unlicensed ships.
Voice clips (Thanh Long clone, read-only, NOT owned): 24 kHz mono (resample at mix per mix-plan AR-05 note); measured durations s1 2.17 · s2a 3.43 · s2b 3.14 · s3 4.29 · s4a 3.71 · s4b 3.65 · s5 2.34 · s6 3.37 · s7a 2.91 · s7b 3.32 · s8 4.28 · s9a 3.78 · s9b 2.93 · s10 2.89 · s11 3.34 (sum 49.55 s). Shot-start table recomputed from these; total video 55.60 s.

## Round 1 anchor evidence (audio-agent self-check; R2 machine re-check pending)
Independent faster-whisper-small beam ASR with word timestamps (local cached model, numpy input — repo venv `av` incompatibility bypassed read-only) replicated review anchors exactly (s1 gap 0.84–1.20; s3/s4a/s9a words in cue-table header). All cue attacks sit in inter-word gaps ≥ 0.16 s at +0.02…+0.05 after word end; no transient inside a vowel nucleus.
