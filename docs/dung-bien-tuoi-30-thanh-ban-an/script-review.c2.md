# Lens C round 2 — spoken naturalness + syllable timing + visual feasibility (2026-10-17)

Round-1 report: `script-review.md` (closure table). Scope: verify C1–C5 programmatically, recount all 16 keys, re-sweep changed lines + new elements.

## 1. Closure verification (round-1 tickets)

| id | verdict | evidence (recounted, not copied) |
|---|---|---|
| C1 | **verified fixed** | Hold list = 17 items, programmatic sum = **7.70** (0.15+0.25+0.25+0.30+0.25+0.30+0.30+0.45+0.35+0.40+0.30+0.30+0.30+0.30+0.70+0.40+2.40). Totals arithmetic: 180/4.1=43.90+7.70=**51.60** · 180/4.3=41.86+7.70=**49.56** · 180/3.8=47.37+7.70=**55.07** — matches `script.md` Totals (L61–62) and `brief.md` L23. |
| C2 | **verified fixed** | s2 delivery = "Liền một hơi, đều, **không** hứa nghỉ giữa các dòng; nặng dần ở dòng ba"; image col adds "ba dòng chỉ 'ngắt' trên hình, không trong audio"; L81 expands "dấu hai chấm/ngoặc kép trong s2/s3a/s4b/s7b chỉ để caption, **không** dự định ngắt". No comma-pause promise anywhere; JSON s2 unchanged (13 syl). |
| C3 | **verified fixed** | Every chunk programmatic `includes()` substring of the spoken line: s3a 4 chunks 19/18/18/20 ch (all 1 line @28 ch); s6a 2 chunks 35 ch each (→2 lines; stated breaks 22+12 and 25+9 ✓); s8 3 chunks 31/22/17 ch (s8-c1 break 20+10 ✓). Chunk concat in order covers each spoken line modulo inter-chunk whitespace. |
| C4 | **verified fixed** | s8 voice cell carries verify-note + full split plan: "verify pause trên clip đo được; nếu clip không có pause thì tách s8a/s8b gap 0.3s, bù 0.3s từ đuôi s7b; mọi mốc từ s9a dịch theo" — budget-conserving (đuôi s7b 0.30 exists in hold list). |
| C5 | **verified fixed** | Cover headline "Tuổi ba mươi," + s10 CARD "ĐỪNG BIẾN TUỔI **BA MƯƠI** THÀNH BẢN ÁN" — both bookends "ba mươi"; spoken lines unchanged (s1 "ba mươi", s10 "ba mươi"); brief L38 notes user theme "30" kept in header only, as allowed. |

## 2. Syllable recount (programmatic, space-separated tokens)

`voice.proposed.json` vs Totals block vs running cumulative in shot table:

s1 9→9 · s2 13→22 · s3a 17→39 · s3b 8→47 · s4a 13→60 · s4b 9→69 · s5a 7→76 · s5b 11→87 · s6a 15→102 · s6b 13→115 · s7a 14→129 · s7b 8→137 · s8 16→153 · s9a 12→165 · s9b 7→172 · s10 8→180

**Grand total 180 syl — 16/16 per-key match, 16/16 cumulative match, 0 mismatches.** All 16 JSON keys byte-equal the spoken-line column. Mandated line verbatim (s5a+s5b) ✓.

- Voice pure: 43.90 s @4.1 · 41.86 @4.3 · 47.37 @3.8
- + 7.70 holds: **51.60 / 49.56 / 55.07** — all inside 40–60 s at 3.8–4.3 syl/s.
- Spot-check slot arithmetic: s5a 18.64–20.80 = 1.71+0.45 ✓ · s6a 23.83–27.89 = 3.66+0.40 ✓ · s8 37.32–41.52 = 3.90+0.30 ✓ · s9a 41.52–45.15 = 2.93+0.70 ✓ (s10 end 51.61 vs 51.60 = rounding, not a ticket).

## 3. Re-sweep (changed lines + new elements)

- **s2 delivery (changed):** "liền một hơi… không hứa nghỉ" — honest for a clone that cannot pause on punctuation; matches skill Phase-2 rule (pause = split key only). Natural as a take-selection target.
- **Caption chunks (changed):** all verbatim substrings, ≤2 lines × ~28 ch; sequential reveal follows speech order (s3a chunks 1–4 in utterance order; s8 chunk1 ≈9 syl ≈2.2 s — enough air before chunk2). Feasible at 56–60 px caption size.
- **Freeze 0.4 s (s5a):** sits inside the 1.71 s voice shot (visual freeze, not timeline hold) — no timing budget impact; reverb handled at mix per row note. Feasible.
- **C4 split plan (s8):** borrows exactly the 0.30 s that exists as đuôi s7b; all later mốc shift by the same delta — self-consistent.
- **Cover frame 0:** headline + ruler + "30" circled + character all "đủ ngay frame 0", animation starts after (0.4–1.2 s circle draw) — hook understandable sound-off. ✓
- **Diacritics:** clean on all changed Vietnamese text — "liền một hơi", "ba dòng chỉ 'ngắt' trên hình", "kẻ tay", "nhầm đường à", "chưa kịp giữ", "dạ quang", "cọt kẹt", "sột soạt", "tẽ ngòi", "sống có vui không" — no missing or wrong-tone characters found.
- **s4b/s3a/s7b colon-comma handling:** L81 blanket rule covers them; s4b explicitly "ba câu liền một hơi" — no unfulfillable pause promise.

## 4. New tickets

| id | Sev | ticket | evidence |
|---|---|---|---|
| C2-1 | Trung | Delivery cells of **both** s5a and s5b say "gap 0.45s im trước **vế 1**" — the only 0.45 s gap in the hold list is **s5a→s5b** (between vế 1 and vế 2); vế 1 is preceded by đuôi s4b **0.30 s**. A timeline/content agent following the row notes would put the silence before the mandated line instead of after it, shifting the re-hook. Reword both cells to "gap 0.45s sau vế 1 / trước vế 2" (keep hold list unchanged) | script.md L29 s5a delivery, L30 s5b delivery vs L61 "gap s5a→s5b 0.45" + L80 |
| C2-2 | Thap | s3a image column: "bốn vạch 'lách' hiện lần lượt **trùng bốn cụm từ được nói** (18 · bỏ qua 22 … · 25 · 30)" — only **three** age clusters are spoken (mười tám / hai mươi lăm / ba mươi); the sentence is self-contradictory and "22" cannot be speech-synced. Reword: 3 vạch khớp lời nói (18 · 25 · 30); vạch 22 hiện cùng lượt với vạch 18 (không có lời nói) | script.md L25 s3a image/action |
| C2-3 | Thap | s4a has the same unverified mid-key sentence break ("Tết đến. Mâm cỗ…") that C4 flagged for s8, with no verify-note or split plan. Either add a one-line verify-note (regen as s4a1/s4a2 only if measured clip shows no boundary) or explicitly state "không cần pause, đọc liền" so the direction is decided | script.md L27 s4a; cf. C4 handling on L35 s8 |

## 5. Verdict

**revise** — closure 5/5 verified fixed and recount clean (180 syl, totals exact), but one **Trung** ticket (C2-1: contradictory gap label on the mandated re-hook beat) plus two **Thap** must clear before pass.

**Score: 8.5 / 10** (≥9 blocked by C2-1 Trung).
