# Integration review — xay-doi-minh-hay-chung-minh (gate E, Phase 5)

## Round 1

Read together second-by-second: `script.md` v2 + `content-pack.md` v1 + `voice.json` + `voice-report.md` (51.75s) + `assets-manifest.md` + `mix-plan.md` (59.20s, BGM offset +3.0s, dawn video 51.0s) + `join-notes.md` (s1 0.00 … s11 55.30 end 59.20) + board 4×4 + cover + style-hook/turn/end + motion-hook + drop-detail + details s2b/s5b/s9a/chip + `design-spec.md`. Profile `story`. Judged ONLY on what shows when combined; branch taste not re-scored.

Timeline (measured, trimmed T1): s1 0.00 · s2a 3.51 · s2b 7.89 · s3 11.23 · s4 16.28 · s5a1 20.69 · s5a2 21.99 · s5b 24.92 · s6 31.07 · s7a 35.28 · s7b 38.29 · s8 40.54 · s9a 45.12 · s9b 47.76 · s10 50.51 · s11 55.30 · end 59.20 (≤59.5 ✓). Voice 51.75s + holds 7.45s.

### What holds together

- Total 59.20s fits cap; protected silences intact (s9 gap 0.7, hold 1.0, final 2.0).
- H2 mechanics exact: window-off @s9a gap 2.30 (voice end 1.94 +0.36) ✓, hum-only hold s9b ✓, BGM −inf ✓.
- H3 mechanics exact: brick-soft @2.46 = "đất" onset ±0.15 ✓, chalk @4.64 voice-free ✓, dawn 51.0 ≈ s10 50.51 ±0.5 ✓.
- Continuity s5b→s6 (descend 0.4s → already grounded, orbit 90°) and brick chain s8→s9→s10 staged; no seating/phone-call contradiction (s7/s8 stand/squat/walk only).
- Cover reads muted (question + THẤY CHƯA? + ice window + figure gaze); board 16/16 keys present; text lines all ≤28 chars; captions bottom:224 with 210px clear.

### Tickets (exhaustive)

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| E01 | Cao | s8 4.58s insert crowding | script.md:36 lists 4 inserts (05:00 + shoes + dark road + desk lamp) in 4.38s voice + 0.20 tail; design-spec §5 allows ≤2 freezes; rub ≥0.5s on "Nó cũng có công" + pick 3.70–4.10 + stand + 3 caption chunks must share same 4.58s; join-notes:24 "No change" leaves script↔design conflict open; brick continuity (A15/A18) is load-bearing for s9/s10 | cut to 2 inserts (05:00 + desk lamp), staged 0–2.5s; reserve 2.5–4.58s for rub (≥0.5s) + pick + stand; time caption chunk 2 to insert boundary; script wording untouched | design (scene-agent staging) | ≤2 inserts; rub covers "Nó cũng có công" ≥0.5s; loose brick visible frame 0 at ladder foot; pick readable in last 0.4s |
| E02 | Trung | s6 3 cuts vs voice | voice-report s6 3.71s (+0.51 vs est 3.2); script.md:33 fixes cuts at 1.25/1.75/2.25 with orbit 0–1.2s + voice entry 0.30s ("Phía sau…" 0.30–1.28s); no word timestamps for "không"×3 — est-timed cuts likely land off-word after +0.5s drift; H1 turn load-bearing | faster-whisper timestamp s6; shift 3 cuts to measured "không" onsets ±0.15s; keep orbit 0–1.2s and 0.30s voice entry | audio-agent (timestamps) + director (timeline) | each cut within 5f of its "không" onset; thin-edge reveal complete by first "không" |
| E03 | Trung | s5b interior vs line | script.md:32: standing back-figure at sink, faucet + stream, basin, TV blue flicker, steam; detail-s5b-interior still: figure posture reads seated, no basin/faucet readable, TV flicker absent, steam ambiguous — while caption/voice says "đang rửa bát, cười theo ti vi" | restage interior: standing back-figure at counter, faucet + stream left, basin line, TV flicker wash on wall; other-household figure stays faceless; return face-cut (helmet on) unchanged | design | basin + faucet + stream readable at 480px width; figure standing; TV flicker visible; no face shown |
| E04 | Trung | s7b delivery vs H1 | script.md:35 s7b "Thấp hơn, chậm hơn s7a; dừng hẳn"; voice-report s7b 1.90s @4.74 syl/s = fastest clip vs s7a 2.61s @4.21; chalk blink 0.5s + tail 0.35 squeezed in 2.25s shot | keep clip (no regen possible per voice-report 403); hold full chalk blink + 0.35s tail; let jade "cho mình ở" linger through tail; no timeline stretch (59.20/59.5 budget) | voice/audio (accept) + design (hold) | chalk blink ≥0.5s visible; s7b tail ≥0.35s uncut |
| E05 | Trung | s9 H2 tempo vs intent | script.md:37–38 "Chậm nhất", "rơi ở tiếc"; voice s9a 1.94s @4.64 + s9b 1.75s @4.56 = among fastest clips | keep clips; let protected gap 0.7 + hold 1.0 carry the slowness; keep BGM −20/−26→−inf + hum-only hold; no stretch, no regen | director (accept) | gap 0.7 + hold 1.0 untouched; hum sole sound in hold; no BGM bleed into hold |
| E06 | Thấp | s5b chip reading time | content-pack.md:24 chip 4 lines (18/23/22/22 chars) @32px, window 0.6–4.8s (4.2s) in 6.15s shot; ~85 chars in 4.2s ≈ 20 chars/s — fast for 32px but chip is source tag, not spoken | keep window (fade ≥0.2s before cut, never in s6); sync pack 30→32px per J1 (text unchanged) | content (sync) + design | chip 0.6–4.8s @32px, fades before cut, clear of caption, ≤28 chars/line |
| E07 | Thấp | s9a wide vs brick readability | script.md:37 wide + "viên gạch … thấy rõ trong tay ở tiền cảnh"; detail-s9a-brick proves close-up readability, wide may shrink brick; design-spec §6 demands readable at 480px + rim-light note R3.6#3 | keep foreground hand/brick ≥~40px in wide with rim-light; window-off "tách" stays @gap 2.30 ✓; sign stays blazing | design | brick readable at 480px wide; window-off in gap; sign rực rọi vào bóng tối |
| E08 | Thấp | s10 3-action overlap | script.md:39 place 0.4–2.45 + bulbs/dawn 1.8–3.2 + jade/chalk 2.6–3.86 in 4.79s; brick-soft @2.46 ✓; chalk @4.64 voice-free with ~0.22s bleed into s11 @−26dB (AUD-N1 accepted) | freeze order: chalk starts ≥2.6 (after thud 2.46); dawn video 51.0 ≈ s10 50.51 ±0.5 ✓; no change | director/audio | thud ±0.15s of "đất"; chalk after thud; dawn within ±0.5s of s10 start |
| E09 | Thấp | s1 hum-only hook 0–3s | mix-plan:4 BGM offset +3.0 → 0–3.0s bulb-hum only (−28dB, quiet source) + voice s1 3.11s; motion (chase f0–20 + sweep + brick "cộp" f18) vs thin audio; tradeoff disclosed for dawn-on-time | accept tradeoff; optionally lift s1 hum to −24 (s9b level) for phone audibility; no BGM 0–3s | audio-agent | hum audible on phone or explicitly accepted; dawn 51.0 ±0.5 kept |
| E10 | Thấp | re-hook 20.69s / reveal 24.92s | join-notes:18 s5a1 HEADLINE at 20.69s (+0.7 vs 15–20s window); s5b answer at 24.92s (≈25s ✓); shot 1.30s (1.15 voice + 0.15 gap) | accept 0.7s drift (reveal on-time carries retention); keep hard cut + 0.15s gap; no stretch | director | re-hook headline full-frame; gap preserved; reveal ≤25.5s |
| E11 | Thấp | s2b silence under "bật cười" | script.md:27 laugh bed under "Có người bật cười", cut before "Nó á?"; manifest:32 laugh DROPPED (no licensed sample, never synthesize); voice internal pause 1.59–2.51s preserves silence-before-quote ✓ | accept silence; hand-wave 0–1.0s + gượng face detail + "Còn lâu" accent carry sting; reopen only on user-supplied licensed laugh | audio (accept) | no synthesized crowd; wave + face readable; pause preserved |
| E12 | Thấp | s11 two-worlds vs question + J2 | script.md:40 + style-end still: dead sen board left / jade chalk room right / figure center / headline "cho ai?"; pack says đậm (white) vs proto jade; push 1.00→1.03 then dead stop 2.0s pure silence | director decides jade (self-side system + dawn pairing); chalk completes 0–1.5s, hat off 0–0.8s; no SFX/BGM in final 2.0s | content (confirm jade, no wording change) + design | headline jade; final 2.0s pure silence; both worlds level, figure center |
| E13 | Thấp | global text fit + reading | pack audit: all caption/headline/chip lines ≤28 (max 27); cover 4-line 115–538px verified in still; captions bottom:224 / 210px clear; fastest rotation s8 3 chunks / 4.58s (~1.5s/chunk) lands on voice pauses 2.5–3.4s ✓ | keep multi-chunk CapSeg flipping on word onsets; build-time 210/224px check; s4 "minh hoạ" tag top-right of phone, clear of caption | design (build check) | no line ≥29; nothing in bottom 210px; chunk flips on measured word onsets |
| E14 | Thấp | s4 phone density | 4.21s voice in 4.41s shot: 2-chunk caption + viewer-list UI + "minh hoạ" tag + pin 5% + thumb scroll + fan bed (no sample — room tone carries) | keep layout; build-time density check (join carried); tag outside caption zone, ≥26px #8B93C9 | design | UI readable at 480px; tag unobstructed; caption never covers list |

### Story-profile check (story)

- Specificity: Tết / story-viewers / 05:00 / THẤY CHƯA? — concrete, held.
- Turn: s6 orbit-thin-edge + 3×"không" cuts → s7 split 100/10 — legible; E02 re-anchor needed for full hit.
- Pacing: 16 keys / 59.2s, punch (s5a1 1.3s) vs breath (s5b 6.15s, s9 holds) — variance good; s8 is the single crowding point (E01).
- Ending: question s11 isolated from climax s9 by s10, +2.0s pure silence, no CTA — correct for story.

### Score / verdict

- Score: **7.3/10** (H2/H3 mechanics exact and total fits cap, but s8 overload is blocking + 4 Trung open on turn/delivery/tempo/interior).
- Verdict: **revise** (1 Cao + 4 Trung open; pass needs ≥9 with zero open Cao/Trung).
- Fix-loop: round 1 exhaustive above; smallest close-out = E01 staging cut (design) + E02 timestamp shift (audio/director) + E03 restage (design) + E04/E05 written accepts; then re-verify at gate C (motion unproven s3/s6/s9/s10 + s4 density + 210/224px + J1/J2 sync carried).

## Round 2

Closure verification only (Round 1 judged 7.3 revise; no re-judge). Read: this file Round 1, design-spec §5/§6/§13, assets-manifest s6 anchors + s1 hum row, content-sync, join-notes starts, board + s5b-interior + s9a-brick + style-end stills.

- E01 CLOSED: design-spec §5 s8 row stages TWO inserts only (05:00 + desk lamp, 0–2.5s) + rub ≥0.5s on "Nó cũng có công" + pick 3.70–4.10 + stand in 2.5–4.58s + loose brick frame 0 at ladder foot; join-notes s8 confirms same; board s8 tile shows 05:00 + lamp (2 inserts) + ladder/foot brick.
- E02 CLOSED: manifest s6 anchors give shot-relative cuts 1.48/2.26/2.96 exactly on measured "không" onsets (±0.0, inside ±0.15); orbit 0–1.2s + 0.30s voice entry unchanged; thin-edge reveal done 0.28s before k1; 1.25s remains after cut 3 + tail (numbers only, director applies at build).
- E03 CLOSED: interior still shows STANDING faceless silhouette + basin on counter line + faucet/stream left + TV flicker wash upper-left + steam above basin; board s5b tile matches; return face-cut unchanged.
- E04 CLOSED: spec §5 s7 row holds FULL chalk blink ≥0.5s + tail ≥0.35s uncut; join-notes s7b keeps 2.25s shot with tail 0.35 (chalk 1.95 = voice end 1.90 +0.05); jade "cho mình ở" lingers through tail; no timeline stretch.
- E05 CLOSED: gap 0.7 + hold 1.0 + final 2.0s untouched in join-notes timeline; manifest s9a window-off @2.30 mid-gap + s9b hum-only hold trimmed to hold end, no bleed; content-sync confirms hum sole sound in hold.
- Regression holds: dawn video 51.0 ≈ s10 start 50.51 ±0.5; chip 0.6–4.8s @32px fades before cut (content-sync); final 2.0s pure silence; sign blazing in s9a-brick still + board s9b tile; style-end jade "cho ai?" + two worlds + figure center.
- NEW tickets: none (no new breakage found).

### Score / verdict

- Score: **9.0/10**
- Verdict: **pass**
