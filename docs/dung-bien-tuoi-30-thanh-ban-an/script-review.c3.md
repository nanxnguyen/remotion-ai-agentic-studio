# Gate A — lens (c) spoken naturalness + syllable timing + visual feasibility · round 3 (clean context)

File: `script-review.c3.md` · 2026-10-17 · scope: verify round-2 fixes (C2-1..C2-3 + carried) + final sweep.
Inputs read: `script-review.md`, `script.md`, `voice.proposed.json`, `brief.md`, skill Phase 2 timing rules.
Method: programmatic recount (`16 keys`, syllables = space tokens), mốc continuity check, hold-list sum, substring check on caption chunks.

## Closure table (round 2 → round 3)

| id | fixed / not fixed / disagree | evidence (programmatic) |
|---|---|---|
| C2-1 | **fixed** | Both cells now say **"giữa vế 1 và vế 2"**: s5a delivery `im lặng 0.45s giữa vế 1 và vế 2 (sau câu này, trước vế 2 — phần im trước vế 1 là đuôi s4b 0.30s)` · s5b delivery `gap 0.45s im giữa vế 1 và vế 2 (chính là phần lặng trước câu này, không phải trước vế 1), lặng 0.35s sau`. Matches hold item `gap s5a→s5b 0.45` + `đuôi s4b 0.30`. No cell places 0.45 before vế 1. |
| C2-2 | **fixed** | s3a image col = `ba vạch tuổi được nói — 18 · 25 · 30 … vạch 22 không có cụm từ riêng nên hiện cùng lượt với vạch 18 … (4 vạch trên thước, 3 vạch khớp lời)`. Spoken ages in s3a = 18/25/30 (**3** clusters) vs ruler ticks 18·22·25·30 (**4**) — stated explicitly, factually consistent with the spoken line. |
| C2-3 | **fixed** | s4a voice cell declares `chủ ý ĐỌC LIỀN một hơi, KHÔNG cần pause và KHÔNG tách key … timeline không bù hold` — read-straight, no pause promise, no unbacked gap. Consistent with clone (no punctuation pauses) and with hold list (no s4a→s4b split beyond the declared 0.30 tail). |
| carry B2-1 / B2-2 | noted, no change | re-hook mốc 18.64 s @4.1 (brief "~18.6s") ✓; gap s9a→s9b 0.70 + s6b last sharp sound intact ✓. |
| carry C1 (re-check) | still correct | hold list = 17 items, programmatic sum **7.70 s** (0.15+0.25+0.25+0.30+0.25+0.30+0.30+0.45+0.35+0.40+0.30+0.30+0.30+0.30+0.70+0.40+2.40); script totals + brief:23 both say 7.70 / 51.60 / 49.56 / 55.07. |

## Syllable recount (all 16 keys, from `voice.proposed.json`, checked against shot-table `âm tiết (cộng dồn)` and `voice @4.1` seconds)

| key | syl | cum | s | | key | syl | cum | s |
|---|---|---|---|---|---|---|---|---|
| s1 | 9 | 9 | 2.20 | | s6a | 15 | 102 | 3.66 |
| s2 | 13 | 22 | 3.17 | | s6b | 13 | 115 | 3.17 |
| s3a | 17 | 39 | 4.15 | | s7a | 14 | 129 | 3.41 |
| s3b | 8 | 47 | 1.95 | | s7b | 8 | 137 | 1.95 |
| s4a | 13 | 60 | 3.17 | | s8 | 16 | 153 | 3.90 |
| s4b | 9 | 69 | 2.20 | | s9a | 12 | 165 | 2.93 |
| s5a | 7 | 76 | 1.71 | | s9b | 7 | 172 | 1.71 |
| s5b | 11 | 87 | 2.68 | | s10 | 8 | **180** | 1.95 |

- **Grand total = 180 syl**; 16/16 table cells match (per-key + cumulative + seconds @4.1, all ±0.00); 16/16 JSON keys match spoken-line cells verbatim; mandatory line s5a+s5b byte-identical to brief:5 ✓.
- Totals: voice 180/4.1 = 43.90 s → **51.60 s**; 180/4.3 = 41.86 → **49.56 s**; 180/3.8 = 47.37 → **55.07 s** — all in 40–60 s ✓.
- Mốc continuity: 16/16 rows `span = lead + syl/4.1 + tail` and each start = previous end; last end 51.61 (0.01 rounding of 43.902, matches "~51.60"). No mismatch.

## Final sweep (round-3 scope)

- **Diacritics / ASR risk:** all 16 keys NFC-normalized, no digits, no double spaces; risk list (`tội danh`, `lên quản lý`, `kẻ tay`, `nhầm đường à`, `chưa kịp giữ`, `sống có vui không`, `bản án`) retained at script:83.
- **Pause promises vs clone:** none left. s2 "liền một hơi… không hứa nghỉ" ✓; s4b "ba câu liền một hơi" (script:81) ✓; s3b/s6b/s9a/s9b delivery wording is take-selection goal only (script:7), no pause promise; every deliberate pause is a split key with its gap in the hold list (s3a/s3b, s4a/s4b, s5a/s5b, s6a/s6b, s7a/s7b, s9a/s9b) ✓.
- **Caption chunks:** s3a 4 chunks (19/18/18/20 ch), s6a 2 (35+35 → documented 2-line split), s8 3 (31/22/17 → documented 2-line split) — every chunk `in_line = True` (verbatim substring), ≤2 lines × ~28 ch ✓; short rows (s2 57, s4a 56, s7a 56, s9a 50) covered by script:8 + script:82 for content-agent chunking.
- **Naturalness of changed lines:** only annotation/delivery cells changed this round (no spoken line touched — `voice.proposed.json` unchanged, verified). New C2-1/2/3 wording reads as correct production Vietnamese, unambiguous about who holds the 0.45 s.
- **Cover frame 0:** script:13 `hiện đủ ngay frame 0 (không gõ chữ)` + totals:63 `headline đủ từ frame 0` + "tắt tiếng hiểu ngay" ✓; closing card bookend = "ba mươi" (C5) ✓.
- **Feasibility:** freeze/ink/push-in motion all frame-derived with stated windows (0–0.5s ruler, 0.4–1.2s stroke, mask 0.6s, push-in 1.00→1.03); no wall-clock, no unseeded randomness.

## NEW tickets (round 3)

| id | Sev | Owner | Ticket | Why missed before |
|---|---|---|---|---|
| C3-1 **NEW** | Thap | script-agent → Phase 4 director (row note) | s5a `freeze toàn khung 0.4s` is **not** in the hold list and the row does not state whether the freeze **overlaps** the start of the s5a clip or precedes it (mốc gives s5a voice 18.64–20.80 with **0 s** lead, so the reverb tail + freeze have no allocated silence). Add one clause in the s5a voice/image cell: freeze is picture-only, playing under the first 0.4 s of speech (keeps 18.64 / 7.70 / 51.60) — or, if a pre-speech beat is wanted, add 0.40 s lead-in (total 52.00 @4.1, re-hook 19.04 / ≈20.4 @3.8 → outside the 15–20 s window, so the overlap reading is the recommended one). | Round 1/2 lens (c) tracked the 0.45 s gap *label* (C2-1), not whether the freeze consumes timeline; verified now by mốc-continuity script (no item, no lead). |
| C3-2 **NEW** | Thap | script-agent | brief:64 `Ẩn dụ hình theo cảnh: **s0** cover …` — key `s0` does not exist (cover = **s1** in script/registry); relabel to "cover (s1)" so design/scene agents do not map a non-existent shot id. Spoken text unchanged. | Prose line in brief's style section; rounds 1–2 read brief for claims/timing, not shot-id mapping. |

Carry-forward (unchanged, gate-C watches): B2-1 re-hook @3.8 ≈20.0 s outer edge (C3-1, if solved by overlap, does not worsen it); B2-2 protect s9b 0.70 gap + s6b last sharp sound.

## Verdict

**PASS** — 9.0/10 (lens c).
No Cao/Trung open: all three round-2 tickets fixed and re-verified programmatically; 2 new Thap tickets carried (C3-1 → director at Phase 4 join/timeline, C3-2 → script-agent's next touch of brief; neither blocks gate A).
Root-cause note for the round: the recurring lens-(c) tickets all came from **silence being described in prose but not accounted in the hold list**; the hold list + mốc-continuity check (script:61 + per-row `lead+syl/4.1+tail`) is the acceptance check to run for any future timing wording change.
