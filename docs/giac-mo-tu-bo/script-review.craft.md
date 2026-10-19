# Script review — `giac-mo-tu-bo` · lens C (spoken naturalness · timing · visual feasibility · voice-direction feasibility)

Reviewer: `script-reviewer` (gate A), **clean context** — I did not write this packet, its brief, its hook candidates or its
voice files. **Lens C owns rubric items 4 (spoken naturalness), 5 (timing feasibility), 7 (visual feasibility in
Remotion) and 10 (voice-direction feasibility).** Items 1, 6, 9 are lens A (`script-review.hook.md`'s sibling
`script-review.fidelity.md`); items 2 and 8 are lens B (`script-review.hook.md`). I do **not** re-score those and do
**not** re-litigate their tickets (B1 Cao, B2 Trung, A1–A5 Thấp); I only record where my numbers agree with theirs.

**Runtime note (rule `01-status-truth.md`).** This runtime has **no shell / process-execution tool**, so I could not
re-run `python3 -I scripts/pipeline.py audit giac-mo-tu-bo` and could not run a scripted phrase-join check. The director
reports the audit ran → **`ok` (exit 0)**; I quote that and did not run `pipeline.py` (not my role). Every number below
is recomputed by hand from `script.md` §1/§1.1, `voice.proposed.json`, `voice-performance.proposed.json` or a cited
`file:line`, and I state which checks were done by eye rather than by tool.

**Writable-file note (rule `03-source-code.md`).** This file is the only artifact I write. I did not edit `script.md`,
the voice files or any source; all fixes below are proposals addressed to `script-agent`.

---

## Round 1 · lens C (spoken naturalness / timing / visual feasibility / voice-direction feasibility)

### 1 · Read as the viewer first (spoken lines only, at the planned durations)

Spoken spine at 3.9 syl/s (`script.md:35-54`): 0.00 promise→job · 3.07 the list · 6.40 the thin page · 9.21 the office ·
11.51 the habit · 13.76 `'Để khi nào rảnh.'` · 15.03 the finger that stops · 18.35 the notebook found · 23.36 dust ·
26.17 intact ink · 28.42 the pity · 31.58 the busier stranger · 34.85 the permission · 38.83 `Nhưng…` · 41.69 one
chord · 44.39 the buzzing chord · 47.29 the debt refused · 53.27 silence.

- **What I felt / understood (two lines).** *This is a list I wrote myself* — it is in my hands at 6 s and it is looked
  at again at 28 s by a finger that slows exactly where the handwriting starts to hurry; at 31.6 s the video stops
  accusing me. Then it stops trying to fix me: the chord is allowed to buzz, the voice refuses the word *debt* out
  loud, and there are 3.35 s of real silence with nothing asked of me.
- **The exact second attention could drop: ~9.2–11.3 s.** `s4` (9.21–11.26) is *by the packet's own instruction*
  "the least emotional read in the video" (`script.md:224`, `voice-direction.md:150`), and at 3.9 syl/s the next
  reward after the paper macro is not until `s5b` (13.76) and the re-hook (18.35). Second-likeliest: 23.4–26.2 s
  (`s8`/`s9`), where the viewer's own object is not the subject of either line. This is a *craft* observation, not a
  ticket: it is the price of the flat administrative read the story wants.

### 2 · Score table (lens C only)

| # | item | score | evidence (`file:line` / shot / key) |
|---|---|---:|---|
| 4 | **Spoken naturalness** (Vietnamese as people talk; no written register, no tongue-twisters, ≤ one breath) | **9** | All 17 keys are conversational Vietnamese with **no English term** anywhere (`voice.proposed.json:2-18`); longest single synthesis phrase is **11 syllables** (`s16` phrase 2), far inside one breath; every accent word is a substring of its own phrase and appears in that phrase's `emphasis` (`voice-performance.proposed.json:118-142, 246, 301, 333, 421, 461, 493, 525, 557, 589, 621`; check in §5). Held at 9 by C-08 (two telegraphic `[ADD]` fragments), C-09 (literal `'…'`/`…` in the TTS input) and C-07 (five zero-gap splices). |
| 5 | **Timing feasible for 50–60 s at ~4.1 syl/s** | **9** | Independent recount **175 = 129 owner + 46 `[ADD]`**; silence identity **2.60 + 5.80 + 2.80 = 11.20 s** reproduces exactly; totals **50.97 / 53.88 / 56.07 / 58.50 / 59.81 s** at 4.4 / 4.1 / 3.9 / 3.7 / 3.6; break-evens **4.510 / 3.586**; every structural mark recomputed and equal (`script.md:70-95`, tables §4 below). Fits at the repo convention rate 4.1 → **53.88 s**. Held at 9 by C-03 (wrong arithmetic in §7) and C-10 (the real tripwire, 3.17 syl/s, is not named). |
| 7 | **Visual feasibility in Remotion** | **8.5** | Every beat is a declared frame-driven scalar on vector/SVG plates: fixed ink-path vertices, seeded dust, one lanyard path, flap rotation, L2 = rotation + colour ramp of the same L0 parallelogram, fingertip pad deform + string displacement (`script.md:165-192`); no actor, no stock, no 3D, no `Date.now()`, no unseeded random (`script.md:186-189`). Held down by C-01 (prop-state contradiction across `s11`/`s12`/`s13`/`s16` + object-chain ledger) and C-04 (`s12` "stands and walks out of frame" is outside the declared asset class), plus two render-only reading dependencies (handwriting-legible-as-handwriting; the `s10` page recognisably the `s2` page). |
| 10 | **Voice-direction feasibility** (meaningful cues, exact phrase-to-canonical fidelity, unsupported controls declared, directions absent from speech/captions) | **9** | **33 phrases / 17 keys**: `" ".join(phrase.text) == voice.proposed.json[key]` verified **byte-for-byte for all 17 keys** by eye (§5) and enforced in tooling at `scripts/gen-voice-clone.py:146`; pause mechanism is entirely explicit (`pauseAfterSeconds` + the `s5a`/`s5b` split key; `s13`'s `…` text-only, `script.md:291`) with **no punctuation-only pause anywhere**; requested controls are exactly the engine's accepted set (`{denoise}` only, `gen-voice-clone.py:98-102`), `experimentalCues` disabled and **no `actingCue`** (`voice-performance.proposed.json:106-110`, rejected at `gen-voice-clone.py:117`); no direction/emotion/tempo text appears in any spoken line or caption chunk (checked against `script.md:249-268`). Held at 9 by C-06, C-07, C-09, C-11. |
| | **lens C mean** | **8.9** | `(9 + 9 + 8.5 + 9) / 4 = 8.875 → 8.9` · verdict **revise**, driven by open **C-01 (Trung)** and **C-02 (Trung)**; no item below 8. |

**Why not higher on items 4/5/10.** Each of those three sits at 9 for a *specific, verified* residue, not for effort:
C-08's two caption-register fragments are spoken to the listener; C-09's punctuation characters are inside the
synthesis input the CER gate will compare against; C-03 is a wrong number stated as arithmetic; C-10 leaves the
packet's real measurement floor unnamed. Nothing here is severe on its own; together they are the reason the mean is
8.9 rather than 9.2.

**Why not lower.** The residual defects are all documentation-grade except C-01/C-02; the timing identity is exact at
five rates, the reassembly is exact at 17 keys, and the visual plan is deterministic throughout.

---

### 3 · Spoken-register pass (item 4) — every key, one breath, read aloud

| key | line | syl | phrases | register / breath verdict |
|---|---|---:|---:|---|
| s1 | `Bạn từng nói mình sẽ học đàn. Rồi bạn đi làm.` | 11 | 2 | natural; two-clause spoken sentence, second clause 4 syl. ✅ |
| s2 | `Bạn đã lưu cả một danh sách những bài hát muốn chơi.` | 12 | 2 | natural, unhurried; `danh sách` syllable cluster is easy for TTS. ✅ |
| s3 | `Trang sổ mỏng, chữ bút bi xanh, viết dở.` | 9 | 2 | **telegraphic noun-phrase triad — reads as a printed caption, not speech** (C-08) |
| s4 | `Sáng nào cũng quẹt thẻ, hộp thư đầy.` | 8 | 2 | natural worn-routine cadence. ✅ |
| s5a | `Mỗi lần định mua đàn, bạn lại nghĩ:` | 8 | 2 | natural; the trailing colon is silent, harmless. ✅ |
| s5b | `'Để khi nào rảnh.'` | 4 | 1 | spoken-quote line works; **the quote marks are characters in the synthesis input** (C-09) |
| s6 | `Ngón tay khựng trên nút Mua ngay, rồi tắt màn hình.` | 11 | 2 | natural; `khựng` is idiomatic. **But `trên nút` says the finger is *on* the button while the frame says 6–8 px short** (C-02) |
| s7 | `Vài năm sau, trong một buổi dọn nhà, bạn tìm thấy cuốn sổ có danh sách ấy.` | 17 | 2 | long but breathes: 8 + 9, with a real 0.25 s gap at the comma. ✅ |
| s8 | `Bụi phủ kín bìa, một vệt tay kéo qua.` | 9 | 2 | **same telegraphic captioned register as s3** (C-08) |
| s9 | `Chữ viết ngày xưa vẫn còn nguyên.` | 7 | 2 | natural, steady. ✅ |
| s10 | `Bạn ngồi đọc, thấy thương người đã viết ra nó.` | 10 | 2 | natural; no tongue-twister. ✅ |
| s11 | `Người ấy đâu biết sau này mình sẽ bận đến thế.` | 11 | 2 | natural, conversational. ✅ |
| s12 | `Có thể hôm nay bạn không còn muốn trở thành nhạc công nữa.` | 13 | 2 | natural; longest clause 9 syl. ✅ |
| s13 | `Nhưng nếu vẫn thích âm thanh của cây đàn…` | 9 | 2 | natural; the one-word `Nhưng` phrase is a real TTS risk of odd intonation (the direction asks for it level — a *delivery* risk, not a text defect). **The `…` sits in the input** (C-09) |
| s14 | `Bạn có thể học một hợp âm.` | 7 | 2 | natural, small. ✅ |
| s15 | `Một hợp âm rè nhẹ, ngón ấn chưa quen.` | 9 | 2 | natural, tactile. ✅ |
| s16 | `Không phải để bù lại những năm đã qua. Chỉ để được vui với một điều mình từng yêu thích.` | 20 | 2 | natural two-sentence close; longest phrase 11 syl. ✅ |

**Result:** 0 tongue-twisters, 0 written-register English terms, 0 phrases longer than one breath. `tell`/`show` line
mapping is lens B's item 8 and I do not redo it; the two keys I flag are flagged for **register**, not for telling.

---

### 4 · Independent syllable and timing audit (item 5)

**Recount (per key, space-separated tokens, quotes/ellipsis excluded as non-syllables):**

| key | s1 | s2 | s3 | s4 | s5a | s5b | s6 | s7 | s8 | s9 | s10 | s11 | s12 | s13 | s14 | s15 | s16 | Σ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| mine | 11 | 12 | 9 | 8 | 8 | 4 | 11 | 17 | 9 | 7 | 10 | 11 | 13 | 9 | 7 | 9 | 20 | **175** |
| `script.md` | 11 | 12 | 9 | 8 | 8 | 4 | 11 | 17 | 9 | 7 | 10 | 11 | 13 | 9 | 7 | 9 | 20 | 175 ✅ |

Owner keys `s1 s2 s5a s5b s7 s9 s10 s11 s12 s13 s14 s16` = **129** ✅ · `[ADD]` keys `s3 s4 s6 s8 s15` = **46** ✅ —
identical to `script.md:12-13,57` and `voice-performance.proposed.json:32-35`.

**Silence identity, reproduced independently:** intra-clip `Σ pauseAfterSeconds` = 0.25+0.20+0.25+0.25+0.20+0.25+0.20+
0.25+0.20+0.25+0.30 = **2.60 s**; post-clip holds = 0.25+0.25+0.25+0.25+0+0.25+0.25+0.40+0.30+0.45+0.35+0.45+0.45+0.30+
0.70+0.35+0.55 = **5.80 s**; END card **2.80 s** → **11.20 s** ✅ (`script.md:30-32`, `voice-performance.proposed.json:37-40`).
Speech at 3.9 = **44.87 s** ✅ (my sum of the §1 speech column = 44.87).

**Totals and contract:**

| measured rate | 175 ÷ rate | + 11.20 s | total | inside 50–60 s | vs `script.md:70-77` |
|---:|---:|---:|---:|---|---|
| 4.4 | 39.77 | 11.20 | **50.97** | ✅ +0.97 over floor | identical ✅ |
| 4.2 | 41.67 | 11.20 | 52.87 | ✅ | identical ✅ |
| **4.1 (repo convention)** | 42.68 | 11.20 | **53.88** | ✅ +3.88 margin | identical ✅ |
| 3.9 (planning) | 44.87 | 11.20 | **56.07** | ✅ | identical ✅ |
| 3.7 | 47.30 | 11.20 | 58.50 | ✅ | identical ✅ |
| 3.6 | 48.61 | 11.20 | **59.81** | ✅ −0.19 under ceiling | identical ✅ |
| **3.586 (break-even)** | 48.80 | 11.20 | **60.00** | edge | ✅ |
| **4.510 (break-even)** | 38.80 | 11.20 | **50.00** | edge | ✅ |

Break-evens solved independently: `175/r + 11.20 = 50 → r = 4.5103`; `= 60 → r = 3.5861` ✅. Trim set: 1.85 s recovered
→ 9.35 s silence → floor bound `175/x + 9.35 = 60 → x = 3.4550` ✅. Extension set: +3.00 s → 14.20 s silence → ceiling
bound `175/x + 14.20 = 50 → x = 4.8883` ✅ (`script.md:321-337`).

**Structural marks, recomputed:** hook last syllable `11/rate` = 2.50 / 2.62 / 2.82 / 2.97 / 3.06 s; first payoff =
`s2` clip end = 5.48 / 5.73 / 6.15 / 6.47 / 6.64 s; re-hook = `s7` clip start = `63/rate + 2.20` = 16.52 / 17.20 /
18.35 / 19.23 / 19.70 s (my `63` = 11+12+9+8+8+4+11 and my `2.20` = the pre-`s7` holds and pauses, both exact);
END card start 53.27 s; total 56.07 s. All identical to `script.md:86-95` ✅. **No timing figure in §1 or §1.1 is wrong.**

**Per-key slot identity** (`script.md:35-54` vs `voice-performance.proposed.json:54-73`): every start/end pair matches
(spot-verified all 18 rows, e.g. `s14` 41.69–43.69, `s16` 47.29–52.72, `END` 53.27–56.07) and the last-word formula
`start + 9/rate + 0.30 + 11/rate` = 47.62 / 49.52 / 52.72 / 55.15 / 56.46 s is arithmetically correct ✅.

**One wrong number, not a timing figure (C-03):** `script.md:441-442` says "Owner lines alone are 129 syl = **32.06 s**
at 3.9 syl/s, which needs **17.9 s** of silence to clear the 50 s floor". `129 ÷ 3.9 = 33.08 s`, so the shortfall is
`50 − 33.08 = 16.92 s`, not 17.9 s. (32.06 s and 17.9 s are mutually consistent with **125** syllables, not 129.) No
downstream figure consumes either number — the operative silence budget is the correct 11.20 s — which is why this is
`Thấp` and not `Trung`.

**Feasibility caveat stated up front:** the 50–60 s fit is conditional on a measured rate inside **[3.586, 4.510]**
with no trim, **[3.455, 4.888]** with the elasticity sets. At the slowest *observed* value cited by the packet itself
(3.17 syl/s, `docs/chung-minh-de-lam-gi/voice-report.md`, cited at `script.md:493-494`) the total would be
`175/3.17 + 11.20 = 66.41 s`, and the full trim set would still leave **64.56 s** — outside 60 s. That is C-10.

---

### 5 · Voice-performance contract check (item 10)

**A. Phrase → canonical, byte-for-byte (done by eye; no shell available).** I concatenated the `phrases[].text` of all
17 keys with a single space and compared each against `voice.proposed.json`:

| key | phrases | join == canonical | key | phrases | join == canonical |
|---|---:|---|---|---:|---|
| s1 | 2 | ✅ | s10 | 2 | ✅ |
| s2 | 2 | ✅ | s11 | 2 | ✅ |
| s3 | 2 | ✅ | s12 | 2 | ✅ |
| s4 | 2 | ✅ | s13 | 2 | ✅ |
| s5a | 2 | ✅ | s14 | 2 | ✅ |
| s5b | 1 | ✅ | s15 | 2 | ✅ |
| s6 | 2 | ✅ | s16 | 2 | ✅ |
| s7 | 2 | ✅ | | | |
| s8 | 2 | ✅ | **total** | **33** | **17/17 ✅** |
| s9 | 2 | ✅ | | | |

Every boundary falls on a canonical single space (37 boundaries, all verified) — so a `""` join would merge two words
and fail the CER gate, exactly as `script.md:501-504` says. The same identity is enforced mechanically at
`scripts/gen-voice-clone.py:146-147` (`does not exactly reassemble canonical voice.json`) and key equality at `:133-138`.

**B. Pause mechanism.** **No punctuation-only pause exists anywhere**: the 11 intra-clip beats are `pauseAfterSeconds`
values (`voice-performance.proposed.json:193, 257, 312, 344, 376, 440, 504, 536, 568, 600, 632`), the `s5a`/`s5b` split is
a real key boundary with `pauseAfterSeconds 0.20` + a 0.25 s clip hold (`:250, 257, 281-282`), and `s13`'s `Nhưng` beat
is `pauseAfterSeconds 0.25` with the owner's `…` explicitly text-only (`:523-526`, `script.md:291`). ✅

**C. Controls and cues.** `engine.supportedControls = [referenceAudio, seed, denoise, silencePadding]`
(`voice-performance.proposed.json:9`) and the only control requested per phrase is `denoise: false`; `scripts/gen-voice-clone.py`
rejects every other control (`:98-102`) and any `actingCue` (`:117-118`), so nothing in the packet can be silently
ignored. `experimentalCues.enabled = false` with an empty list (`:106-110`). See C-11 for two accuracy nits in that
metadata block.

**D. Directions stay out of speech and captions.** I compared `script.md:249-268` (caption chunks) against
`voice.proposed.json` string by string: every caption chunk is a literal substring of its key's canonical line, and no
intent/emotion/tempo/emphasis string appears in any spoken line or caption. The three headline elements (`s1`, `s5b`,
`s15`) are on-screen text, not synthesis text. ✅ (Lens B's B4/B5 own the headline-vs-verbatim rule; not re-litigated.)

**E. Holds.** `Σ minimumPostClipHoldSeconds = 5.80 s` matches §1's column exactly (verified key by key), but
**no tool reads that field**: `grep` over `scripts/*.py` returns no occurrence of `minimumPostClipHold`, and
`gen-voice-clone.py` only ever pads *inside* a clip (`:430`, `apad=pad_dur={pause_after}` on **every** phrase including
the last). The 5.80 s therefore lives in the timeline (`src/videos/<slug>/timeline.ts` per-key `hold` arrays), not in
the voice tool. The packet says this (`:105`) — it is C-06, an obligation to be carried, not a defect in the numbers.

---

### 6 · Visual-feasibility audit (item 7)

| shot | what the plan asks Remotion to build | verdict |
|---|---|---|
| `s1` | frame 0 cover already composed (no fade, no logo); finger traces a fixed ink path; lanyard path moves; dust motes on a seeded scalar; push-in 1.00→1.03 | ✅ frame-driven, all declared (`script.md:138-152, 177-186`) |
| `s2` | page lower corner lifted and let fall; reverse-side ink as reversed ghosts; one line stopping mid-word | ✅ transform + fixed paths (reverse-side = mirrored copy of the path set) |
| `s3` | fibre dent under finger pressure; one line lighter (used-up pen); next page's strokes as a mirror image | ✅ scalars + mirrored paths |
| `s4` | hard fluorescent bar; badge reader; tray paper above the rim; inbox rows past the bottom edge; `minh hoạ` label | ✅ all rectangles/typography; label present (`script.md:209, 224`) |
| `s5a` | phone in an open palm; one scroll then stop; screen glow on the wrist; `minh hoạ` label | ✅ scroll = frame-indexed offset |
| `s5b` | screen dimmed, guitar gone grey, thumb motionless, office fluorescent bar mirrored in the dormant screen | ✅ declared; the cross-room reflection is a deliberate staging device, not an error |
| `s6` | thumb stops 6–8 px short; fingerprint in the glow; button does **not** change state; screen drops to locked grey; `minh hoạ` label | ✅ buildable — **but the spoken line contradicts it (C-02)** |
| `s7` | box flap two-segment rotation on a fixed curve; clean square in the dust; warm bar = rotation + colour ramp of the same L0 parallelogram | ✅ `script.md:182-183` — the best-specified beat in the packet |
| `s8` | dust film; one stroke pushed into a raised edge; cover darker under the stroke; motes lifting | ✅ seeded scalar + one advancing path |
| `s9` | intact ink; fold-line crossing without breaking a stroke; one mote landing | ✅ fixed paths |
| `s10` | torso from behind, knees up; finger trace speed as a function of ink-path curvature | ✅ `script.md:185` — no wall-clock time |
| `s11` | hand closes the notebook, rests flat, does not move for the whole line | ✅ — **but this is the first of four contradicting prop states (C-01)** |
| `s12` | **"the reader stands and walks out of frame"** + badge the only thing in the lower third | ⚠️ **outside the declared asset class** (no legs, no head, camera never above the collarbone, `script.md:171-175`) → C-04 |
| `s13` | **"the closed notebook being set down, edge-first, on the table"**; page edge riffles; one low note off-camera | ⚠️ contradicts `s12` ("open on the floor") and §6.4 → C-01 |
| `s14` | six nylon strings, one fret, one fingertip under 10 cm; fingertip pad deform + string displacement | ✅ `script.md:184, 196-203` |
| `s15` | string buzzing against the fret; 2 mm slip; string-shaped dent; L4 bounce | ✅ (buzz is a **sound**, dent is a one-directional scalar) |
| `s16` | notebook **open** on the boards, phone face-down, dust holding the box's shape, fingers curl once | ⚠️ fourth prop state (C-01) |
| `END` | frame holds, motes drift, no new element | ✅ |

**Determinism:** no `Date.now()`, no `Math.random()`, no stock footage, no live actor, no 3D render anywhere
(`script.md:186-189`); every micro-action is a frame-indexed property. This is the packet's strongest item-7 evidence
and it is why the item is 8.5 and not 8.

**Render-only dependencies I cannot settle here** (not defects, but they must be checked downstream): (a) eleven vector
ink paths per page must read as *handwriting* and never as *words* at phone size (`script.md:179`, `U3`); (b) the `s10`
page must be recognisably the `s2` page 22 s later or `CP1` degrades into "an old notebook" twice — lens B files this as
B7 and I agree it is render-only.

---

### 7 · Tickets

Severity: **Cao** = blocks the gate · **Trung** = must be closed before build · **Thấp** = improvement, does not block.
Owner is `script-agent` unless stated. No open Cao/Trung may remain for a pass.

`id | severity | where | evidence | concrete change | owner | acceptance check`

- **C-01 | Trung | `script.md:410` (§6.4 notebook row) vs `script.md:232` (`s11`), `:233` (`s12`), `:234` (`s13`), `:237` (`s16`); also `script.md:157-158` vs `:409`** | The notebook has **four contradictory states with no transition action**: `s11` closes it ("The hand closes the notebook, then comes to rest flat on the **closed** cover", `:232`); `s12` "leaving the notebook **open on the floor**" with no re-opening action between them (`:233`); `s13` is "Close on the **closed** notebook being set down, edge-first, **on the table**" — closed again, and moved from the floor to a table with no carrying action (`:234`); `s16` has it "**open** on the boards" (`:237`) — while §6.4 asserts the notebook was "**left open** `s12`, `s13`, `s16`" (`:410`), contradicting `:234` outright. The same paragraph's object chain (`:157-158`) lists the notebook as running `s1 → s2 → s3 → s8 → s9 → s10 → s11 → s16` — omitting `s7`, `s12` and `s13` — while §6.4 (`:409-410`) includes `s7`, `s12`, `s13` and puts the lanyard at `s6` and `s12`, which `:158` also omits. A scene builder cannot build `s12`–`s16` without inventing the transitions, and `s16`'s whole "the object that lost is the object left open in the light" reading (`:237`) depends on the final state. | Decide **one** prop-state ledger and write it once, e.g.: *"the notebook is closed at `s11` and **re-opened by the same hand at the top of `s12`** (a two-frame page-lift, no new object); it stays **open on the floorboards** through `s12`; at `s13` the same open notebook **is lifted from the floor and set down on the table, edge-first** (the lifting hand enters frame); `s16` shows it still **open on the boards** after the same hand carries it back — or, if that is too much motion, keep it open on the floor for `s12`, `s13` and `s16` and change `s13`'s cell from 'closed notebook being set down on the table' to 'the **open** notebook's page edge riffles as the hand shifts it'."* Then make `:157-158` and `:409-410` the **same** chain: notebook `frame 0 → s1 → s2 → s3 → s7 → s8 → s9 → s10 → s11 → s12 → s13 → s16`; lanyard `frame 0 → s1 → s4 → s6 → s12`. | script-agent | One ledger; every one of `s11`/`s12`/`s13`/`s16` names a notebook state consistent with its neighbours, every state change has a named action in the same or the preceding cell, and `§2.2`'s chain and `§6.4` list the same shots in the same order. |
- **C-02 | Trung | `voice.proposed.json:8` (`s6`) vs `script.md:201-203` (§2.4), `:227` (`s6` image), `:381-382` (§6.3); `brief.md:183,187`** | The spoken line says the finger froze **`trên` nút Mua ngay** — *on* the button — while the declared frame, and the shot's entire evidence value for `I1`/`U2`, is "The thumb comes down and **stops 6–8 px short of the button**", "the button **does not change state**" (`:227`, repeated `:201-203`, `:381-382`) and `brief.md:183,187` ("a finger **stopping short** of the button", "staged as *hovering*"). The voice and the frame assert opposite positions, and the mismatch is load-bearing: `U2` (whether a guitar was ever bought) stays unfilled **because** the finger never reaches a live button. A viewer at phone size may not see 6–8 px, but the audio says the finger touched the thing the packet's constraint argument says it must not touch. | Change the spoken word, keeping the key at **11 syllables**: `Ngón tay khựng **trước** nút Mua ngay, rồi tắt màn hình.` (7 + 4 = 11 ✅ — no timing change, `script.md:35-54` untouched). Propagate the same wording to `voice-performance.proposed.json:308` (phrase text) and `voice-direction.md:153`. If `trước` reads oddly for a screen, the alternatives that preserve 11 syl are `khựng **ngay trên** nút Mua ngay` (finger hovers over, never lands) or `khựng **cạnh** nút Mua ngay` — pick one and use it everywhere. | script-agent | The spoken text, the sidecar phrase text, `voice-direction.md` and the `s6` image cell all describe the same position; the reassembly check still passes (`" ".join(...) == voice.json`); `s6` is still 11 syllables so no timing figure changes. |
- **C-03 | Thấp | `script.md:441-442` (§7 "Cost, stated plainly")** | "Owner lines alone are 129 syl = **32.06 s** at 3.9 syl/s, which needs **17.9 s** of silence to clear the 50 s floor". `129 ÷ 3.9 = 33.08 s`; the shortfall is `50 − 33.08 = **16.92 s**`. Both printed numbers are consistent with 125 syllables, not 129. No downstream artifact uses them (the operative silence figure is the correct 11.20 s), which is why this is Thấp and not Trung — but it is arithmetic stated as arithmetic, in the paragraph whose whole job is to be checkable. | Rewrite: *"Owner lines alone are 129 syl = **33.08 s** at 3.9 syl/s, which needs **16.92 s** of silence to clear the 50 s floor; the five `[ADD]` lines bring that down to the 11.20 s of named silence in §5."* | script-agent | `129 ÷ 3.9` appears as 33.08 s and `50 − 33.08` as 16.92 s; the `[ADD]` budget sentence (46 syl = 26 %) is rechecked against 175 (`46/175 = 26.3 %`) and left as is. |
- **C-04 | Thấp | `script.md:233` (`s12` image cell) vs `script.md:171-175` (§2.3 camera law)** | `s12` opens "The reader **stands and walks out of frame**", but the declared hero is "**one hand (five fingers, one visible seam at the wrist), a forearm, a torso seen from behind or from the side, a knee, and a lanyard.** There is no head, no face, no hair and no profile anywhere" and "**the camera never rises above the collarbone**" (`:171-175`). There are no legs, no feet and no way to show a walk; `§6.3:391` repeats "the reader standing and leaving the frame". The intent (the reader leaves the page behind) is clear and buildable — the instruction just cannot be built as written without contradicting the asset class and the `U1` guarantee. | Re-stage in the vocabulary the video already has: *"The **knee and the torso rise out of frame** (camera never above the collarbone) — the hand carries the notebook down to the boards and lets it go, and the forearm and hand slide out of the lower frame; **`s12` and `s13` are the only two shots where no body part enters at all** except the hand that sets the open notebook down."* Keep "the badge from frame 0 is now the only thing in the lower third" unchanged. | script-agent | No shot in §3 describes an action requiring a head, a face or legs; `s12`'s exit is expressed as a frame-driven motion of the knee/torso/hand the asset class already declares. |
- **C-05 | Thấp | `script.md:261` (`s10` chunk 2), `script.md:263` (`s12` chunk 2); rule at `.agents/skills/ray-pineline-worflow-agent/SKILL.md:365`** | The locked caption rule is "≤ 2 lines, ≤ ~28 chars/line". Measured: `s10` c2 `thấy thương người đã viết ra nó.` = **32 chars**; `s12` c2 `còn muốn trở thành nhạc công nữa.` = **34 chars**; `s7` c2 `buổi dọn nhà, bạn tìm thấy` = **28 chars** (exactly at the limit). Two of the three longest chunks exceed the rule the same file states, and `script.md:244` repeats the rule. | Re-chunk: `s10` → c2 `thấy thương người` · c3 `đã viết ra nó.`; `s12` → c2 `còn muốn trở thành` · c3 `nhạc công nữa.` (or `không còn muốn` / `trở thành nhạc công nữa.`). Chunks stay word-for-word substrings of `voice.proposed.json` and no key gains a whole new sentence. | script-agent | Every chunk in §4 is ≤ ~28 chars and still a literal substring of its key's canonical line; the `s1`/`s5b`/`s15` headline replacements are untouched (B4/B5 own those). |
- **C-06 | Thấp | `voice-performance.proposed.json:121,153,185,217,249,281,304,336,368,400,432,464,496,528,560,592,624` (`minimumPostClipHoldSeconds`) vs `scripts/gen-voice-clone.py`** | The 17 hold values sum to exactly **5.80 s** and match §1's column key by key, but **no tool reads the field**: `grep` over `scripts/**/*.py` finds no `minimumPostClipHold` and no `hold`, and the only silence the voice tool creates is *inside* a clip — `apad=pad_dur={phrase.pause_after}` is applied to **every** phrase including the last (`gen-voice-clone.py:430`), i.e. `pauseAfterSeconds` and the post-clip hold are two different mechanisms. So all 5.80 s of holds (and the 2.80 s END card) are a **Join/timeline obligation**, and the repo convention for it is a per-key `hold` array in `src/videos/<slug>/timeline.ts`, not a sidecar field. The packet says this correctly (`:105`) — the risk is purely handoff. | Add one line to §5 and to `voice-direction.md`'s pause section: *"`minimumPostClipHoldSeconds` is a **timeline** obligation: `gen-voice-clone.py` pads only inside a clip, so the Join step must write these 17 values (Σ 5.80 s) plus the END card's 2.80 s into `src/videos/giac-mo-tu-bo/timeline.ts` as per-key `hold` values and prove Σ = 11.20 s against the measured clips."* | script-agent → video-director (Join) | §5 states the join obligation in one sentence, and the timeline file's `hold` values sum to 11.20 s against the measured clip ends. |
- **C-07 | Thấp | `voice-performance.proposed.json:129,138` (`s1`), `:161,170` (`s2`), `:225,234` (`s4`), `:408,417` (`s9`), `:471,480` (`s11`); mechanism at `scripts/gen-voice-clone.py:425-435`** | In five keys the phrase boundary has `pauseAfterSeconds 0.00`, so two **separately synthesised** utterances are spliced sample-adjacently (`adelay 0` + `apad 0` → `concat -c copy`, `:430-435`). The packet's design (`script.md:59-61`) is that these are two sentences joined *with no inserted silence* — deliberate — but a zero-gap junction of two independent TTS takes can click at the seam and can break mid-sentence prosody, and nothing in the plan measures it. The `_phrase` default of 0.3 s for non-final phrases (`:145`) does **not** soften this: every phrase in every key declares `pauseAfterSeconds` explicitly, so the default never applies and no key's last phrase carries a non-zero value. | Leave the design as is (0.00 s is a deliberate prosodic choice) but make the check explicit: *"voice-agent must confirm on the measured clips that each of the five 0.00 s junctions (`s1`, `s2`, `s4`, `s9`, `s11`) has no click and no audible prosodic break; if it does, the fix is 0.05–0.10 s of pad at that junction **or** re-synthesising that key's two phrases as one phrase — never a change to the words."* Add the five keys and Σ-duration expectation to the cross-phrase consistency row (`:74`). | script-agent (text) → voice-agent (check) | The limitation is stated with the five keys named; the voice report carries a pass/fail per junction and the plan's totals are unchanged or re-stated. |
- **C-08 | Thấp | `voice.proposed.json:4` (`s3`), `:10` (`s8`)** | These two `[ADD]` lines are unambiguous **written-register** fragments — comma-separated noun/adjective triads with no verb (`Trang sổ mỏng, chữ bút bi xanh, viết dở.` / `Bụi phủ kín bìa, một vệt tay kéo qua.`). Everything else in the packet is spoken Vietnamese; these two will be delivered by the clone as a list being read out, which is the register the packet elsewhere works hard to avoid (`voice-direction.md:150` "one worn routine", `:162` "said beside the action"). The `[ADD]` source is honest (`script.md:431,434`) — it is a *craft* problem, not a provenance one. | Give each a spoken hinge that costs no extra key: `s3` → **`Trang sổ mỏng quá, chữ bút bi xanh, viết dở.`** (10 syl, `+1` to the total — or keep 9 by `Trang sổ mỏng, chữ bút bi, viết dở.`) and `s8` → **`Bụi phủ kín hết bìa, một vệt tay kéo qua.`** (10 syl) or keep 9 with `Bụi phủ kín bìa, tay kéo một vệt qua.` Whichever is chosen, re-run §1's totals. | script-agent | Each of the two lines reads as a spoken clause (a verb or an intensifier the voice can lean on), and every §1 figure is recomputed for the new syllable total. |
- **C-09 | Thấp | `voice.proposed.json:7` (`s5b`, leading/trailing `'`), `:15` (`s13`, `…`)** | Both punctuation marks are **characters in the synthesis input** and therefore in the ASR/CER comparison input. The packet intends the quotes as "a remembered line, not a quote" (`script.md:226`) and the ellipsis as "kept in the text only and **not performed**" (`script.md:291`, `voice-direction.md:160`) — but the engine, not the packet, decides what a `…` does acoustically: if it renders as a pause, `s13`'s clip is longer than the 2.31 s of speech §1 budgets, and §1's `s13` slot (38.83–41.39) drifts. `norm()` in the CER gate strips non-word characters (`gen-voice-clone.py:56-57`), so the *comparison* is safe; the *duration* is not. | Add one sentence to §5/§9: *"`s5b`'s quote marks and `s13`'s `…` are text-only punctuation inside the synthesis input; voice-agent must report the measured `s5b`/`s13` clip durations against 1.03 s / 2.31 s and, if the `…` produced audible time, either accept the measured duration in §1 or strip the mark from the phrase text while keeping it in `voice.proposed.json`'s caption."* | script-agent → voice-agent | The report names the measured `s5b` and `s13` durations and says explicitly whether the ellipsis cost time; §1 is corrected if it did. |
- **C-10 | Thấp | `script.md:327-332` (§5 honest bound), `:493-494` (§9), `voice-performance.proposed.json:658`** | §5's bound is stated only as a *modelled* threshold: "Below ≈ 3.44 syl/s this packet cannot keep both the owner's 129 syllables and the 60 s ceiling". The packet's own §9 cites the same reference file measuring **3.17 syl/s** in `docs/chung-minh-de-lam-gi/voice-report.md` — below its own bound. I verified the consequence: at 3.17 the total is **66.41 s** and even the full 1.85 s trim set leaves **64.56 s**. So the tripwire is not hypothetical and should be named as evidence, with the escalation the packet already promises. (Lens B's B8 raises the hook-specific side of the same fact; I raise the duration side and do not re-litigate B8.) | Add to §5's "Honest bound": *"The cited same-reference reports have already measured **3.17 syl/s** (`chung-minh-de-lam-gi`) and 3.58–4.22 (`thuong-hay-so-bat-dau-lai`). At 3.17 the plan would total **66.41 s** and the full trim set would still leave **64.56 s**, so at or below ≈3.44 syl/s the director is asked to choose between a 60 s+ runtime and an owner word — never a silent cut."* | script-agent → video-director | §5 names the observed floor as evidence and states the escalation, so the first measured clip below 3.45 s triggers a decision instead of a surprise. |
- **C-11 | Thấp | `voice-performance.proposed.json:3` (`canonicalText`), `:9-15` (`engine` block), `:75` (`naturalnessEvidence`); mechanism at `scripts/gen-voice-clone.py:464, 507-513, 430`** | Three small metadata accuracies, all machine-checkable: (a) `canonicalText` points at `voice.proposed.json`, but with `--performance` the tool's default canonical input is `docs/<vid>/voice.json` (`:464`) and phase 3 copies `voice.proposed.json` → `voice.json` (`SKILL.md:313`), so the pointer goes stale exactly when it matters (the key/string identity itself is enforced at `:146`, so this is a pointer, not a silent hazard); (b) `supportedControls` lists `seed` as an engine control, but no seed is passed to `tts.infer` — determinism comes from `np.random.seed(seed)` before the call (`:509-512`); (c) `silencePadding` is not an engine control either: it is an ffmpeg `apad` applied in post-assembly (`:430`). The packet's governing rule — "any control not in `supportedControls` is an explicit limitation, never silently ignored" (`:15`) — is only as good as that list. | Reword the engine note: *"`seed`: applied as a global `np.random.seed(seed)` immediately before `tts.infer` — deterministic for a fixed seed, and not an inference parameter. `silencePadding`: implemented by ffmpeg `apad` during phrase assembly, not by the engine. `canonicalText` is re-pointed to `docs/giac-mo-tu-bo/voice.json` at the phase-3 copy."* | script-agent → video-director (copy step) | The engine note distinguishes engine parameters from tooling, and `canonicalText` names the file the run actually reads. |

**Ticket summary:** **2 Trung (C-01, C-02)** + **9 Thấp** + **0 Cao**. No ticket questions the syllable total, any §1/§1.1
figure, the reassembly, the pause mechanism or a constraint; C-02 is the only one that changes a spoken line, and it
does so at constant syllable count.

### 8 · Previous-round fixes verified

**N/A — round 1.** No `script-review.md` section for this vid existed before this file; the only siblings present are
`script-review.fidelity.md` (lens A) and `script-review.hook.md` (lens B), both written in this same round, so there
are no earlier tickets of mine to verify and I am not re-litigating A1–A5, B1, B2 or B3–B8.

**Cross-lens consistency check (so the director is not reconciling three different sets of numbers):** my independently
recomputed marks match lens B's — hook last syllable 2.50–3.06 s, first payoff 5.48–6.64 s, re-hook 16.52–19.70 s,
total 50.97–59.81 s — and my item-5 audit confirms that the `3.07 s` headline-clear number lens A/B flag is a
*fixed-number-vs-measured-rate* problem (B2's), **not** a timing-arithmetic error: 3.07 s is exactly right at 3.9 syl/s.

### 9 · What I could NOT verify

1. **`python3 -I scripts/pipeline.py audit giac-mo-tu-bo`** — no shell in this runtime. The director reports `ok`
   (exit 0); I did not re-run it and did not run `pipeline.py` at all.
2. **The scripted phrase-join check and the scripted syllable count** — no process execution. I did both by hand
   (17/17 keys, 33 boundaries, 175 syllables) and state that plainly rather than implying a tool ran; the tool's own
   enforcement is at `gen-voice-clone.py:146`.
3. **Any measured rate for this video** — none exists yet; §1's figures are plan values and the whole 50–60 s case is
   conditional on a measured rate inside [3.586, 4.510] (no trim) / [3.455, 4.888] (elasticity). C-10 is the tripwire.
4. **`docs/giac-mo-tu-bo/voice-ref/thanh-long-nang-cao-ref.wav`** — declared `pending` on all 17 shots by design
   (`voice-performance.proposed.json:20-29`); nothing claims it exists and I confirm it does not. The preview it will be
   cut from does exist (`vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3`).
5. **Whether the clone can actually deliver the per-key directions** — thinning rather than swelling at `s10`, the
   volume drop that *stops* at `s11`, the one-word level `Nhưng` at `s13`, and the 0.00 s junctions of C-07 are audio-gate
   outcomes. Nothing in a text file can settle them and `naturalnessEvidence` is honestly marked "not verified by
   listening" (`:75`).
6. **Every item-7 reading that exists only in the render** — handwriting legible-as-handwriting at phone size; the `s10`
   page recognisably the `s2` page (lens B's B7); the 6–8 px gap and the fluorescent reflection at `s5b`. Frames at gate
   D and the stills at build are the only evidence that counts.

### Return

`lens C score: 8.9  verdict: revise` — item 4 **9**, item 5 **9**, item 7 **8.5**, item 10 **9**; no item below 8;
blocked by **C-01 (Trung)** and **C-02 (Trung)**, both open.

Top 3 fixes:

1. **C-01** — settle the notebook/lanyard prop ledger: `s11` closes it, `s12` says "open on the floor" with no
   re-opening action, `s13` sets down a **closed** notebook *on a table* that was on the floor, `s16` shows it open —
   and §6.4's "left open `s12`, `s13`, `s16`" contradicts `s13` outright while §2.2's object chain (`:157-158`) omits
   `s7`/`s12`/`s13` that §6.4 includes.
2. **C-02** — `voice.proposed.json:8` says the finger froze **`trên`** nút Mua ngay while `s6`'s declared frame and
   `brief.md:183,187` say it stops **6–8 px short** (the carrier of `I1`/`U2`): change to `khựng **trước** nút Mua
   ngay` — **11 syllables unchanged**, so no §1 figure moves — and propagate to the sidecar phrase text and
   `voice-direction.md:153`.
3. **C-03** — `script.md:441-442`: `129 ÷ 3.9 = 33.08 s`, so the shortfall is **16.92 s**, not the printed 32.06 s /
   17.9 s (both printed numbers match 125 syllables).

Report path: `docs/giac-mo-tu-bo/script-review.craft.md`.
