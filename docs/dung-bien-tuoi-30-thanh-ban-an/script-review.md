# Gate A — script review (director merge, round 1, 2026-10-17)

Lens reports: `script-review.a.md` (fidelity+sources — pass, 9), `script-review.b.md` (hook+impact — pass, 9.5), `script-review.c.md` (spoken+timing+feasibility — revise, 7.1).
Merged score = lowest lens = **7.1** · verdict **revise** (Trung tickets open). Fix round 1 dispatched to script-agent (same session).

## Programmatic checks (accepted)
- Mandatory line byte-identical across brief/script s5a+s5b/voice.proposed.json ✓
- 16/16 JSON keys match shot-table rows verbatim ✓ · all source cells resolve ✓ · zero invented stats ✓
- Syllable recount: 180 syl, all rows match; totals inside 40–60 s under 3.8–4.3 syl/s ✓

## Tickets to fix (whole list, one pass)

| id | Sev | Ticket | Evidence |
|---|---|---|---|
| C1 | Trung | Hold/gap list sums to **7.70 s**, not 7.55; correct totals to voice 43.9 s @4.1 + 7.70 → **51.60 s @4.1 / 49.56 @4.3 / 55.07 @3.8** in `script.md` totals block AND `brief.md` Content timing line | script.md:61, brief.md:23 |
| C2 | Trung | s2 delivery "từng dòng một nhịp" promises comma pauses inside ONE key — clone cannot pause. Either split keys (s2a/s2b style) or drop the comma-pause promise from delivery | script.md s2 row |
| C3 | Trung | Caption rows s3a (78 ch), s8 (72), s6a (71) exceed the 2-line caption readability rule as single chunks: restructure the on-screen text column as chunked per-key captions (or shorten), note max 2 lines × ~28 ch | script.md s3a/s6a/s8 |
| C4 | Thap | s8 mid-key sentence break has no guaranteed pause: add a note in the row's voice/mốc column to verify pause on the measured clip; split only if measured clip proves necessary | script.md s8 |
| C5 | Thap | Bookend consistency: cover says "ba mươi", closing card "30" — pick one form for the two bookends (spoken text unchanged) | script.md s1/s10 |
| A-1 | Thap | Relabel the three Tết questions source from "nguyên văn" to "gần nguyên văn" (brief claim-plan + s4b source cell); spoken line unchanged | brief.md:31, script.md:28 |
| A-2 | Thap | research sensory #9 salary phrase tagged F32 but text absent → tag "sourced seed + inference" (owner: research-agent; fix when touching research.md next — not script-agent) | research.md §4 |
| B-1 | Thap | s5a re-hook opens with the same surface words as s2 — do NOT change the mandated verbatim; differentiate via freeze-frame + delivery note (hồi âm) in the row | script.md s5a |
| B-2 | Thap | "chưa có địa vị" drifts from research wording "chưa địa vị" — align to source wording or mark dramatization | script.md row citing F-source |

## Closure (round 2 requires)
script-agent returns `id | fixed/not fixed/disagree | evidence` for ALL ids; new clean-context lens reviewers re-check with this file attached.

## Closure table (round 1 → round 2, 2026-10-17)

| id | fixed/not fixed/disagree | evidence |
|---|---|---|
| C1 | fixed | Totals + brief.md Timing → 7.70s holds; 51.60 @4.1 / 49.56 @4.3 / 55.07 @3.8; programmatic sum of 17 items = 7.70 ✓ |
| C2 | fixed (way B: drop comma-pause promise, no key split) | s2 delivery = "liền một hơi… không hứa nghỉ"; JSON s2 unchanged (13 syl) |
| C3 | fixed | s3a 4 chunks / s6a 2 / s8 3; every chunk verified `includes()` substring of the spoken line, ≤2 lines × ~28 ch |
| C4 | fixed | s8 voice cell: verify pause on measured clip; split s8a/s8b + timing shift plan if absent |
| C5 | fixed (chose "ba mươi") | s10 closing card "ĐỪNG BIẾN TUỔI BA MƯƠI THÀNH BẢN ÁN" matches cover; spoken unchanged |
| A-1 | fixed | claim-plan + s4b (+ s3a) relabelled "gần nguyên văn"; tone line corrected |
| A-2 | fixed (research-agent) | research.md §4 #9 retagged "sourced seed + inference" |
| B-1 | fixed | s5a keeps verbatim; freeze 0.4s + reverb-note + 0.45s gap; delivery "hồi âm trong đầu"; differentiates from s2 |
| B-2 | fixed (way B: mark dramatization) | s2 source cell + claim-plan row: "chưa có địa vị" = dramatization of F4 "chưa địa vị" |

voice.proposed.json unchanged (no spoken-line tickets). Re-hook s5a/s5b still byte-identical to the user's mandated line.

---

# Gate A — round 2 (2026-10-17)

Lens reports: `script-review.a2.md` (pass 9.0), `script-review.b2.md` (pass 9.5), `script-review.c2.md` (revise 8.5). Merged = **8.5 revise** (C2-1 Trung open).
All 9 round-1 tickets verified fixed by the round-2 reviewers (programmatic re-checks, not copied).

## New tickets — fix round 2

| id | Sev | Owner | Ticket |
|---|---|---|---|
| C2-1 | Trung | script-agent | s5a & s5b delivery cells say "gap 0.45s im trước vế 1" but the 0.45 s gap is BETWEEN the clauses (s5a→s5b); vế 1 is preceded by đuôi s4b 0.30 s → reword both cells to "giữa vế 1 và vế 2" so the mandated line's silence is not misplaced |
| C2-2 | Thap | script-agent | s3a image col: "bốn vạch… trùng bốn cụm từ được nói" — only 3 age clusters are spoken (18/25/30); reword (22 is read but tick sync is 3 clusters or state 4 ticks ≠ 4 spoken clusters) |
| C2-3 | Thap | script-agent | s4a mid-key break ("Tết đến.") lacks the verify-note/split decision that s8 got (C4) → add for consistency or state "đọc liền" explicitly |
| A2-1 | Thap | research-agent | research §4 #9's quoted sentence is real S1 text but not in cited F32 → re-point/add fact id |
| A2-2 | Thap | script-agent | the "Khi nào cưới?" rewording note landed only in brief, not in script s4b cell → mirror it |
| A2-3 | Thap | script-agent | s2 cell cites F5 (questions) which supports nothing in that row → correct citation (+ note "chưa nhà" = short form of F4) |
| A2-4 | Thap | script-agent | brief:17 quotes climax as "Dạo này, sống có vui không?" vs actual "Dạo này, bạn sống có vui không?" → fix quote |

## Carry notes for later gates (no script change)
- B2-1 (gate C watch): at 3.8 syl/s re-hook starts ≈20.0 s — outer edge; use authorized tail trims if the measured clone runs slow.
- B2-2 (gate C watch): protect s9b climax via light + 0.7 s gap and s6b "chì cọt dừng phắt" as the last sharp sound.
