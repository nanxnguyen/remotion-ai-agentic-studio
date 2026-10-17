# Lens C — spoken + timing + feasibility

Round 1 · reviewer: `script-reviewer` lens (c) · clean context · date 2026-10-17

## Verdict: **revise** — score **7.1/10**

Programmatic recount confirms all 16 rows' syllable counts, running totals and per-row seconds @4.1 are exactly correct (table = recount on every row, 180/180). The failures are elsewhere: a hold/gap sum that doesn't add up, a delivery beat that leans on commas a clone cannot produce, and caption rows too long for the 2-line / ~28-char rule.

## Programmatic recount table (space-separated tokens of `voice.proposed.json`)

| row | table-syl | recount-syl | match | table cum | recount cum | match | s @4.1 (table = rec/4.1) |
|---|---|---|---|---|---|---|---|
| s1 | 9 | 9 | OK | 9 | 9 | OK | 2.20 ✓ |
| s2 | 13 | 13 | OK | 22 | 22 | OK | 3.17 ✓ |
| s3a | 17 | 17 | OK | 39 | 39 | OK | 4.15 ✓ |
| s3b | 8 | 8 | OK | 47 | 47 | OK | 1.95 ✓ |
| s4a | 13 | 13 | OK | 60 | 60 | OK | 3.17 ✓ |
| s4b | 9 | 9 | OK | 69 | 69 | OK | 2.20 ✓ |
| s5a | 7 | 7 | OK | 76 | 76 | OK | 1.71 ✓ |
| s5b | 11 | 11 | OK | 87 | 87 | OK | 2.68 ✓ |
| s6a | 15 | 15 | OK | 102 | 102 | OK | 3.66 ✓ |
| s6b | 13 | 13 | OK | 115 | 115 | OK | 3.17 ✓ |
| s7a | 14 | 14 | OK | 129 | 129 | OK | 3.41 ✓ |
| s7b | 8 | 8 | OK | 137 | 137 | OK | 1.95 ✓ |
| s8 | 16 | 16 | OK | 153 | 153 | OK | 3.90 ✓ |
| s9a | 12 | 12 | OK | 165 | 165 | OK | 2.93 ✓ |
| s9b | 7 | 7 | OK | 172 | 172 | OK | 1.71 ✓ |
| s10 | 8 | 8 | OK | 180 | 180 | OK | 1.95 ✓ |
| **total** | **180** | **180** | OK | — | — | — | 43.90 ✓ |

Voice-span mốc column (6.02, 10.47 … 51.61) recomputed from cum-syl/4.1 + listed gaps: matches within rounding on every key.

**Grand-total recount (worst cases):** voice 180 syl → 43.90 s @4.1 · 41.86 s @4.3 · 47.37 s @3.8. Holds/gaps as actually listed sum to **7.70 s** (script.md:61 claims 7.55 s — see C1). Video = **51.60 s @4.1 · 49.56 s @4.3 · 55.07 s @3.8** — all three inside 40–60 s ✓ (closing silence 2.4 s inside the 1.5–2.5 s budget ✓).

## Ticket table

| id | Cao/Trung/Thap | ticket | evidence |
|---|---|---|---|
| C1 | Trung | Hold/gap list sums to 7.70 s, not the claimed 7.55 s; totals ~51.5/49.4/54.9 should be ~51.6/49.6/55.1. Off-by-0.15 s = 4–5 frames the timeline author will inherit; error is copied into brief.md:23. | script.md:61–62, brief.md:23; itemized sum 0.15+0.25+0.25+0.30+0.25+0.30+0.30+0.45+0.35+0.40+0.30+0.30+0.30+0.30+0.70+0.40+2.40 = **7.70** |
| C2 | Trung | s2 delivery "từng dòng một nhịp, nặng dần ở dòng ba" promises a beat per line inside ONE key — the clone cannot make the two comma pauses. Beat timing must be a key split or the promise must be dropped. | s2 (voice.proposed.json single key; commas only at "chưa nhà,"/"chưa kết hôn,"; no gap listed for s2-internal beats) |
| C3 | Trung | Caption rows exceed the 2-line/~28-char rule as one caption per key ("mỗi key một lần đổi"): s3a 78 chars, s8 72, s6a 71; borderline s2 57, s4a 56, s7a 56. At Nunito Sans Bold 56–60 px on 1080 px, 2 lines ≈ 50–56 chars — these will not fit or will crowd the pill. | shot table rows s3a/s6a/s8 (and s2/s4a/s7a); char counts from voice.proposed.json; caption spec brief.md:62 |
| C4 | Thap | s8 contains a mid-key sentence break ("Không phải bạn không tiết kiệm. Lương về…") with no guaranteed pause; no gap planned there, so acceptable — but the "ting"×2 SFX and the two-sentence read must be checked against the real clip (ffprobe/ASR) and, if the clone rushes it, split s8 into two keys rather than adding punctuation hopes. | s8 (period mid-key; hold/gap list has only "đuôi s8 0.30") |
| C5 | Thap | Visual "ba mươi" vs "30" not consistent across the bookends: cover headline spells "Tuổi ba mươi," while the closing card reads "ĐỪNG BIẾN TUỔI 30 THÀNH BẢN ÁN". Spoken text is consistent (always spelled out ✓); pick one visual convention for the two thesis frames. | s1 headline row vs s10 CARD row |

## Checklist results

- **Syllable math:** all 16 rows and running totals verified programmatically — exact match. Estimated seconds = syl/4.1 on every row. Grand total in range @3.8/@4.1/@4.3 ✓ (only the hold-sum arithmetic fails: C1).
- **Spoken naturalness:** every line reads as quiet friend-talk; no bookish phrasing, no consonant clusters, no diacritic typos found ("kẻ tay", "tẽ", "dạ quang", "nhất thiết" all correct); numbers always spelled in speech ("mười tám", "ba mươi") and never as digits ✓ (see C5 for on-screen only).
- **Clone pause rule:** all six intentional pauses are real split keys (s3a/b, s4a/b, s5a/b, s6a/b, s7a/b, s9a/b) with gaps in the timeline ✓; s4b's three questions are explicitly "một hơi" so its "?" marks demand no pause ✓; s2's delivery is the one place a comma-beat is still assumed (C2). Re-hook rhythm (gap 0.45 + silence 0.35) and climax rhythm (gap 0.70 + silence 0.40 + 2.4 s pure silence) are key-backed, unbroken ✓.
- **Visual feasibility:** all 10 shots are single-plane graphite/red-pen/highlighter on grid paper — stroke-dashoffset draw-ons, mask reveals, one macro zoom, a 1.00→1.03 push-in; nothing photoreal, no impossible camera move. Caption 56–60 px ≥54 px ✓, pill at `bottom: 224` clears the 210 px safe zone ✓, no text in the bottom 210 px ✓; cover bands 6–26/30–62/66–82/84–100% don't overlap ✓. Only caption length is infeasible as written (C3).
- **Cover / keys:** frame 0 is concrete (subject, headline, ruler with circled wet-ink 30, character pose, motion order) ✓; hook on-screen text is the spoken line in HEADLINE form replacing the caption — no wasteful double display ✓; 16 keys ↔ 10 shots mapping is consistent, every a/b split sits where a pause is claimed ✓.
- **Pacing:** holds/gaps list matches the claimed total only after fixing C1; climax s9b gets 0.7 s lead gap + 0.4 s trailing silence + separate closing shot + 2.4 s pure silence — breathing room is genuine ✓.

## One-line summary

Perfect syllable bookkeeping and strong clone-safe key splitting, but fix the 7.55→7.70 s hold-sum arithmetic, remove the comma-beat promise in s2, and plan chunked captions for the 70+ char rows before passing.
