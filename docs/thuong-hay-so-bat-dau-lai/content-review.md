# Content review — thuong-hay-so-bat-dau-lai (gate E)

## Round 1 (2026-10-16, reviewer: content-reviewer, clean context)

Inputs read in full: `script.md` v2 (10 shots / 13 keys, totals 207 syllables),
`brief.md`, `research.md`, `voice-report.md` (13/13 clips, voice 52.6s, video ~58.6s),
`design-spec.md`, `out/qa/thuong-hay-so-bat-dau-lai-board.png` (10 tiles),
`-cover.png`, `-style-hook/-turn/-end.png` (all opened full-size).
Gate D context: 8.8 + user override — judged independently; no deference.

Read-aloud at measured durations: no dead second except mild s9 density (~47–54s)
and s2–s3 8s routine setup (~4–9s, carried by "cạch" SFX + LED beat).

### Scores (story)

| item | score | evidence |
|---|---|---|
| emotional specificity | 9 | sensory per beat: LED Giữ ấm + hơi nước (s1), "cạch" (s2), từng cọng hành (s3), đũa khựng (s4a), "lạch cạch" + chạy ra cửa (s5), thở phào/vai hạ + đũa lạ (s6), một bát hai grade hội tụ (s7), treo chìa + nhìn lâu (s8), "Xin lỗi nha." + cùng một câu cãi + đĩa hành (s9), ngưỡng cửa + LED thở (s10). Minus: s2 wide slightly generic |
| turn | 10 | symmetric replay s5/s6 (same sentence, rewind 12f, warm→cold) + s7 split converge "y hệt nhau" + drop line "Có khi, mình cũng không biết." Textbook contrast-pair turn |
| pacing | 9 | re-hook question lands ~14–18s (window 15–20s OK); total ~58.6s in 40–60s; silence holds as split keys (s4 300ms, s6 400ms, s7 300ms, final 1.8–2.0s). Minus: s9 packs 3 inserts into 6.35s voice (E-T1) |
| ending | 9 | F2 verbatim is last spoken line, BGM off at "không?", pure hold 1.8–2.0s, static frame, two color codes balanced, no advice, no CTA. Earned via s8 (ngưỡng cửa) + s9 (ấm + mệt + trung tính) |
| requirements / credibility | 10 | F1 s1 + F2 s10 verbatim (script.md:12,24 vs brief.md:9-10); no ở/đi advice; no science terms/numbers; mock UI labelled "minh hoạ" (s9); no resemblance to gaplai/camon/cuoc-goi/metkhong/lan (s10 doorframe, not two-chairs+lamplight); claims sourced as user/inference per research §§2–3 |

**Mean 9.4. No item below 8. No Cao/Trung open → verdict: pass.**

Checks: cover + hook work sound-off (F1 full frame 0 + hand/bowls/jacket tell "two people");
each shot adds one new thing; one idea per shot; s5+s6 share one contrast device (1×, intentional);
viewer can retell: "same onion-picking bowl, some nights love some nights fear, identical outside —
so ask: met today knowing all, would you step in?"

### Fix list (all Thấp — carried forward, none blocks E)

- E-T1 | Thấp | script.md:23 / board s9 tile / ~47.2–53.9s | 3 inserts (~2.2s each) in 6.35s voice; quarrel insert has 3 bubble lines to read + "minh hoạ" label | concrete: keep 3 inserts, but insert (2) shows ONE enlarged line ≥64px at a time (already in design-spec §3 s9 locked params — enforce at build); do not add a 4th element | owner: design-agent (scene build) | acceptance: 3 QA stills (one per insert) readable at 1/3 phone size, "minh hoạ" label visible on (1)+(2)
- E-T2 | Thấp | script.md:19 / board s6 tile ("insert đũa lạ 0.6s mờ") | strange-chopsticks glimpse could read as a third person / affair hint | concrete: utensils + strange bowl only, heavy blur, no hand/face, 0.6s dissolve as specified; QA still must not show a person | owner: design-agent | acceptance: QA still of insert shows no human features
- E-T3 | Thấp | script.md:23 on-screen "Xin lỗi nha." · 00:47 | timestamp meaning unclear (00:47 = 12:47 AM? why?) | concrete: either justify (late-night apology after quarrel — fits) in design-spec or drop the timestamp; on-screen text only, no voice change | owner: script-agent | acceptance: timestamp kept with reason recorded or removed; voice.json untouched
- E-T4 | Thấp (observation, no change) | s2–s3 ~4.3–13.2s | two consecutive low-energy kitchen framings, similar palette; swipe risk | already mitigated by "cạch" cut + Nấu→Giữ ấm LED beat + settle top-down; build must keep those beats sharp | owner: scene-agent (via QA) | acceptance: s2 still shows LED transition moment

Earlier gates invalidated by these fixes: none (no voice/text-timing change; E-T3 is on-screen text only).
If E-T3 drops the timestamp, D needs no rerun (tile-level text, covered by E-T1 QA stills).
