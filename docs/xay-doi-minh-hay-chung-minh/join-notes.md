# Join notes — xay-doi-minh-hay-chung-minh (director, Phase 4)

Branches passed: content 9.9, audio 9.0 (round 2), D 9.0 (round 2). Gate A 9.0 stands; voice.json untouched since A (16 keys, byte-exact s9a/s9b).

## Timeline (measured HoaiMy voice + AUD-T1 trimmed holds, total 59.20s ≤ 59.5)

Voice measured: s1 3.11 · s2a 4.13 · s2b 2.99 · s3 4.85 · s4 4.21 · s5a1 1.15 · s5a2 2.63 · s5b 5.90 · s6 3.71 · s7a 2.61 · s7b 1.90 · s8 4.38 · s9a 1.94 · s9b 1.75 · s10 4.59 · s11 1.90 = 51.75s.
Holds (trimmed T1): s1 tail 0.40 · s2a→s2b gap 0.25 · s2b tail 0.35 · s3 tail 0.20 · s4 tail 0.20 · s5a1→s5a2 gap 0.15 (trimmed) · s5a2 tail 0.30 · s5b tail 0.25 (trimmed) · s6 lead-in 0.30 + tail 0.20 · s7a→s7b gap 0.40 · s7b tail 0.35 (trimmed) · s8 tail 0.20 · s9a→s9b gap 0.70 (protected) · s9b hold 1.00 (protected) · s10 tail 0.20 · final silence 2.00 (protected) = 7.45s.
Starts: s1 0.00 · s2a 3.51 · s2b 7.89 · s3 11.23 · s4 16.28 · s5a1 20.69 · s5a2 21.99 · s5b 24.92 · s6 31.07 · s7a 35.28 · s7b 38.29 · s8 40.54 · s9a 45.12 · s9b 47.76 · s10 50.51 · s11 55.30 · end 59.20.

## Per-key reconciliation (duration | on-screen | frame | SFX/beat | mismatch → owner)

- s1 3.51s: HEADLINE 4 dòng + sign THẤY CHƯA? + window. Bulb-hum bed 105f (trimmed to shot+tail, no bleed). BGM offset +3.0s → 0–3.0s hook has hum only (AUD-T2 tradeoff, disclosed fallback). Mechanical: director sets BGM offset in Reel. No branch change.
- s2a 4.38s: caption 2 chunks + tag 10 năm trước + mâm Tết. Glass-clink → 4.18 (voice end 4.13 +0.05, 8f trim, ~0.07s tail into s2b at -22dB negligible). Owner audio-agent DONE.
- s2b: caption + gượng face detail (D01). Laugh DROPPED (AUD-T8). Silence-before-"Nó á?" lives in clip pause 1.59–2.51 (normal phrasing). No change.
- s3 5.05s: caption + NÓ Á? CÒN LÂU carving + 3 nhãn gạch. 4 cues → 0.41/1.37/2.15/2.85 (+0.05 noun-ends, ±0.15 ✓). Brick overshoot+squash+dust proven in drop-detail. No change.
- s4 4.41s: caption + UI Người xem + minh hoạ + pin 5%. Phone final density = build-time check (review cannot-verify). No change.
- s5a1 1.30s: HEADLINE re-hook at 20.69s (~20.7s, inside 15–20s window +0.7s drift from estimate — acceptable, reveal still ~25s). Gap trimmed 0.15. No change.
- s5a2 2.93s: caption + thang cót két (no sample — hand-wave equivalent, hum/room carries). No change.
- s5b 6.15s: caption 3 chunks + chip 32px top-right (D07, J1: spec §3 bumped 30→32 — content-pack.md still says 30px; CONTENT-agent sync at build, mechanical text-size only, no wording change) + interior + return face. Chip zone 0.6–4.8s clear. No change.
- s6 4.21s: caption + orbit 90° thin-edge reveal in 1.2s before first "không" + cuts on 3 "không". Motion unproven until scenes (carried risk). No change.
- s7a 3.01s: caption sen accent + split sáng/tối 100/10. Zero jade verified (D05). Sweep band y930–1070 excludes sign (D11). No change.
- s7b 2.25s: caption ngọc accent + chalk blink ONLY here. Chalk 1.95 (tail 0.35, 11f trim, ~0.07s into s8 at -26dB negligible). J1/J2 logged. No change.
- s8 4.58s: caption + viên nền + 05:00 + loose brick at ladder foot from frame0 (D03, A18: xoa ≥0.5s phủ "Nó cũng có", nhặt 3.70–4.10 — staging note for scene-agent, script wording untouched). No change.
- s9a 2.64s: HEADLINE v1 (ice "có thể đã quên") + window-off "tách" @ gap (voice end 1.94, cue 2.30 ✓) + brick in foreground hand readable (D04, R3.6#3 rim-light note for scenes). No change.
- s9b 2.75s: HEADLINE full + sign vẫn rực + quầng thu hẹp + lặng 1.0s (hum only, BGM -inf). Mandatory final-merge "tiết" accepted-noise (AUD-T6 Thấp, director accepts accent rendering — no regen possible). No change.
- s10 4.79s: caption ngọc + đặt gạch (brick 2.46 = "đất" onset ±0.15 ✓) + dawn ngọc + chalk draw (chalk 4.64 = clip end +0.05 voice-free ✓; ~0.22s bleed into s11 at -26dB inaudible — AUD-N1 Thấp carried). BGM dawn entry video 51.0s ≈ s10 start 50.51 ±0.5 ✓. No change.
- s11 3.90s: HEADLINE "cho ai?" (J2: design renders jade, pack says white-bold — DIRECTOR DECIDES jade, matches "xây cho mình" system + dawn world; content-agent confirms at build, no wording change) + tháo mũ cầm tay + door/chair/window chalk + push-in 1.00→1.03 + lặng thuần 2.0s (no SFX/BGM). No change.

## Mood check

BGM night pad 0–48s file → video 3.0–51.0 + dawn C-major from 51.0: hook (0–3s) hum-only is thinner than brief lead but acceptable tradeoff for dawn-on-time; alternative (offset 0, dawn 3s early in s9b hold) rejected. Hook motion pace (bulb chase + sweep + brick drop) vs voice 3.11s fits 3.51s shot. Turn s6–s7 still vs voice holds fit. No branch change.

## Mechanical director fixes (shared timeline/Reel only)

- BGM offset +3.0s, fade table per mix-plan; SFX offsets per manifest anchored table; holds per timeline above; caption component multi-chunk (pack note → design Caption.tsx CapSeg already supports); cover 4-line fit 115–538px (pack note → headline 84–88px verified in cover still); tag 10 năm trước placement (pack note → board reserves top-left, build keeps clear of chip).
- Registry: no src/videos/<slug> manifest yet (legacy proto layout). task-planner will create manifest via video:new-equivalent + Reel/timeline/kit/Root wiring WITHOUT mixing visual systems; scenes adapt proto grammar only.

## Carried tickets (all Thấp, non-blocking, re-verify at C)

A18 (s8 xoa/nhặt staging) · AUD-T6 (s9b accent) · AUD-T7 (s7b 4.74 speed) · AUD-T9 (residual CERs) · AUD-N1 (chalk bleed) · D14/J2 (jade "cho ai?", decided jade) · J1 (chip 32px sync) · J3 (dropY scale) · s3/s6/s9/s10 motion unproven · s4 phone density · exact 210/224px build check.
