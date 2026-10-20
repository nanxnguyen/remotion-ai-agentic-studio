# Gate A · Round 2 · Lens A — fidelity, source accuracy, owner constraints

**Video:** `giac-mo-tu-bo` · `GiacMoTuBoReel` · profile `story`
**Reviewer:** `script-reviewer` (clean context; did not write or fix this packet)
**Scope:** rubric items **1 (fidelity)**, **6 (source accuracy / claims)**, **9 (story profile content test)**, plus
owner-constraint compliance and regression hunting in the 24-ticket fix pass. Items 2/3/4/5/7/8/10 are the other
Round-2 lenses' scope and are not re-scored here.
**Verdict driver:** the round-1 closure table is checked against the files, not against the producer's claim.

## Inputs read

`request.md`, `owner-notes.md`, `research.md`, `brief.md`, `script.md`, `hook-options.md`, `voice.proposed.json`,
`voice-performance.proposed.json`, `voice-direction.md`, `script-review.md`, and the three round-1 lens files
(`script-review.fidelity.md`, `.hook.md`, `.craft.md`). Sibling evidence re-read where a fix cites it:
`docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/{brief.md:9, script-review.fidelity.md:502}`.

## What I could not run

No shell/process execution in this runtime. **`python3 -I scripts/pipeline.py audit` was not run by me**; the
director's recorded run is `ok` and is not re-verified here. All syllable counts, sums, holds and byte-for-byte
phrase joins below were re-counted by eye/arithmetic, not by script.

---

## 1 · Independent re-count (arithmetic only)

| check | result |
|---|---|
| Owner syllables | 7 (`s1`, after dropping `Ngày trước,`) + 12 + 12 (`s5a`+`s5b`) + 17 + 7 + 10 + 11 + 13 + 9 + 7 + 20 = **129** ✅ (`voice.proposed.json:2-18`) |
| `[ADD]` syllables | 9 + 8 + 11 + 9 + 9 = **46** ✅ |
| Total | **175** ✅; per-key counts match §1 (`script.md:37-53`) |
| Silence | 2.60 inside + 5.80 holds + 2.80 card = **11.20 s** ✅ (`script.md:31-32`) |
| Totals | 175/4.4+11.2 = 50.97 · /4.2 = 52.87 · /4.1 = 53.88 · /3.9 = 56.07 · /3.7 = 58.50 · /3.6 = 59.81 ✅ |
| Break-evens | 175/4.510+11.2 = 50.00; 175/3.586+11.2 = 60.00 ✅ |
| Phrase join | 33 phrases / 17 keys; every join reproduces its line with one space, including `s13`'s `…` ✅ (by eye) |
| Owner lines present | L1–L12 all present, verbatim except L1's declared opener drop; `s13` keeps the owner's `…` in text only ✅ |

The timing spine is sound and has not regressed.

---

## 2 · Round-1 ticket verification

Legend: **closed** = acceptance check met by the files; **not closed** = a defect remains.

| id | closed? | evidence |
|---|---|---|
| **A1** | ✅ | `script.md:244` speaks `Trang sổ mỏng quá, chữ viết tay, viết dở.` — no colour word; `voice.proposed.json:4` identical; `script.md:244` marks the blue `#243A8C` **"shown, never said"**; `voice-performance.proposed.json:183` repeats "The ink colour is carried by the image only". |
| **A2** | ✅ | `script.md:556-557` "per-clip values from **3.58 to 4.22** (lines 17–27)"; `voice-direction.md:75` `3.58–4.22`; `voice-performance.proposed.json:661` `3.58 to 4.22`. No production file says 4.01 (only review files). |
| **A3** | ✅ | `brief.md:13-16` records the conflict and the override, and cites the sibling's real `45–55 s` line (`docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/brief.md:9`). |
| **A4** | ✅ | `script.md:552-554`, `voice-direction.md:71-73`, `voice-performance.proposed.json:661` now cite `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/script-review.fidelity.md:502`; I read that line — it contains the verbatim "4.1 syllables/s … planning baseline, not a measured rate" quotation. `motion-design-lab` remains only in review files. |
| **A5** | ✅ | `brief.md:122-124`: "zero hits in any `*.tsx/ts/json/css`, and the only text hits are this brief's own four uses plus the two review files that quote this sentence". Repo-wide grep: 6 hits = 4 in `brief.md` + `script-review.md:41` + `script-review.fidelity.md:91`. **Accurate.** |
| **B1** | ✅ (badge) | Badge statements now share frame 0: `script.md:150-151`, `:156`, `:242`, `:331`, `voice-performance.proposed.json:125`, `hook-options.md:45-48`, `brief.md:185`. The 0.25 s hold has a new named beat (`script.md:331`: page corner falls back, strap finishes settling flat, badge has not moved). **But the fix's wording for the lanyard regressed — NEW-1.** |
| **B2** | ✅ | `script.md:89` and `:181-182` state `11 ÷ rate + 0.25` with 2.75/2.87/3.07/3.22/3.31 and "3.07 s is only its value at the planning rate and is never hard-coded"; propagated to `:242`, `:286`, `brief.md:182`, `hook-options.md:62-64`. |
| **C-01** | ✅ (notebook) | `script.md:170-176` now carries one ledger (open frame 0 → `s3` → **closed** `s7` → **opened at the same page** `s9` → open `s12` → open `s13` → open `s16`), and §6.4 `:471` lists the same shots in the same order. The old contradictions (`s12` open with no re-open, `s13` on a table, §6.4 "left open") are gone. Two wording gaps remain — NEW-4, NEW-5. |
| **C-02** | ✅ | `voice.proposed.json:8` `Ngón tay khựng **trước** nút Mua ngay, rồi tắt màn hình.`; `script.md:248` "**stops 6–8 px short**"; `voice-direction.md:165` "`trước nút` … never reaches the button"; `voice-performance.proposed.json:311` identical. No production file says `trên nút`. |
| **B3** | ✅ | `script.md:160-161` forefinger enters from the lower right inside **frames 0–15**; `:242` "Two movements: inside the first 0.5 s (frames 0–15)"; acceptance row `:594`. |
| **B4** | ❌ | The two departures are named (`script.md:273-280`) but the ledger is wrong and incomplete: `:276` says "6 words instead of the spoken **8**" (the spoken first sentence is **7** words), and the whole second sentence `Rồi bạn đi làm.` is also absent from the screen but is **not** named as a departure. **NEW-2.** |
| **B5** | ✅ | `script.md:301`: `s15` second chunk `ngón ấn chưa quen.` drawn after the headline clears; `:257` delivery keeps the whole line readable. |
| **B6** | ✅ | `script.md:595` acceptance row: card is "the video's **title over a resolved image** … **Gate E confirms no grief is re-introduced**". |
| **B7** | ✅ (substance) | `script.md:596` carries both obligations in one row, honestly marked **⏳ open**: D proves the cover collision on `out/qa/<vid>-cover.png`; E proves `s2`/`s10` page identity with side-by-side frames. One combined row rather than two; substance is covered. |
| **B8** | ✅ | `script.md:98-107` names the modelled 3.667 threshold, the 3.586 edge (3.07 s) and the **observed** 3.17 (3.47 s), and separates the rate-dependent spoken claim from the rate-independent frame-0 headline; `:586`; `voice-performance.proposed.json:661-662`. |
| **C-03** | ✅ | `script.md:502-504`: 129 ÷ 3.9 = **33.08 s**, shortfall **16.92 s**, `[ADD]` **46 syl = 26 %** (46/175). All three recompute. |
| **C-04** | ✅ | `script.md:254` re-stages `s12` inside §2.3: "no head, no face, no legs, nobody walks … knee dips and the torso rises out of the top of frame". |
| **C-05** | ✅ | `script.md:296-298`: `s10` chunks 13/17/14 chars, `s12` 13/18/24 chars, all ≤ 28 and literal substrings joined by a space. |
| **C-06** | ✅ | `script.md:354-359`, `voice-direction.md:136-141`, `voice-performance.proposed.json:663`: 17 holds + 2.80 s card written into `timeline.ts` as per-key holds, sum proven 11.20 s. |
| **C-07** | ❌ | **Not closed.** The named junctions are wrong. See NEW-3. |
| **C-08** | ✅ | `s3` now `…mỏng **quá**, …` (`voice.proposed.json:4`) and `s8` now `Bụi phủ kín **hết** bìa` (`:10`) — 9 syl each, total still 175; hinges are delivered as spoken stress (`voice-performance.proposed.json:186, 368`). The re-chosen hinges are 9/9 syl rather than the ticket's 10-syl examples, which is *better* for timing and needs no further change. |
| **C-09** | ✅ | `script.md:367-371` + `voice-performance.proposed.json:665`: `s5b` 1.03 s and `s13` 2.31 s to be measured, ellipsis outcome reported, strip-from-both rule stated. |
| **C-10** | ✅ | `script.md:388-393`: 3.17 → **66.41 s**, **64.56 s** with the 1.85 s trim set, escalation to director/owner, never a silent cut or speed-up; mirrored at `voice-direction.md:79-82` and `voice-performance.proposed.json:662`. |
| **C-11** | ✅ | `voice-performance.proposed.json:3-4` points `canonicalText` at `voice.json` with the Phase-3-wins note; `:10-18` separates **engineParameters** (`referenceAudio`, `denoise`) from **toolingParameters** (`seed`, `silencePadding`) and lists every unsupported control. |

**Closed: 22 of 24. Not closed: B4, C-07.**

---

## 3 · NEW tickets (introduced or exposed by this fix pass)

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **NEW-1** | **Trung** | `script.md:156-158`; related `:159`, `:242`, `:470`; `hook-options.md:202` | "the work lanyard lies settled across the lower third of the open page, and it **never moves again — not in the cover, not in `s1`, not anywhere in the packet**. There is no drop, no landing and no second settle." Two lines later the same bullet says "the **strap's coil is still relaxing flat**" (`:159`); the `s1` cell says "the **strap's coil relaxes and settles flat**" (`:242`); `hook-options.md:202` says "strap settling flat"; and `:169-170` / `:470` straighten the same lanyard onto a torso at `s4` and hang it at `s6`. §6.4 `:470` adds a third version — "**never moves in `s1`**". The badge is static; the lanyard is not. The B1 fix replaced one contradiction with another, in the exact sentence gate D will read. | Distinguish **badge** from **strap**: *"**The badge never moves again**: it is on the list at frame 0 and still there in `s2`. The **strap** has exactly two movements left — its coil finishes relaxing flat during `s1`, and at `s4` the same strap is straightened around a torso; the badge plate itself never changes position on the page."* Then make `:470` say "its coil finishes relaxing flat in `s1` → straightens onto a torso at `s4` → hangs at `s6` → lower third at `s12`", and add the lanyard to the `s16` cell (`:258`) or drop "still on the boards" from `:169`. | script-agent | Every sentence about the lanyard distinguishes **plate** from **strap**; no sentence says the lanyard is motionless while another says its coil moves; D's hook strip and E's `s16` frame can be judged against one description. |
| **NEW-2** | **Trung** | `script.md:273-280`, `:276`, `:178`, `:286`; `brief.md:82`; `script.md:585` | Three statements disagree about the hook's text. (a) `brief.md:82` (claim plan, on-screen column): "cover headline `Bạn từng nói sẽ học đàn.`; **caption `Rồi bạn đi làm.`**". (b) `script.md:178`: "the caption layer is **empty** for `s1`"; `:286` gives only the headline. (c) `script.md:585`: "**17/17** keys are readable with the sound off". Only the first sentence is on screen; the second sentence appears in no text layer at all. Separately, `:276` claims the headline is "6 words instead of the spoken **8**" — the spoken first sentence is **7** space-separated syllables. | Choose the honest option (there is no room for a caption: the headline clears at the clip end + 0.25 s, which is `s2`'s first frame): **delete the `Rồi bạn đi làm.` caption claim from `brief.md:82`** and add the second-sentence omission to §4's named departures ("`s1` drops `mình` **and the whole second sentence, which the image and `s4` carry**"); change `:276` to "**7** words"; change `:585` to "14 captions + 3 headlines, and `s1`'s second sentence is carried by the badge and by `s4`". | script-agent | `brief.md` and `script.md` name the same on-screen strings for `s1`; the word count recomputes; §4's departure list covers every omission; §10 stops claiming a full mute-complete path for `s1`. |
| **NEW-3** | **Trung** | `script.md:361-365`; `voice-performance.proposed.json:664` | "**Five junctions have no padding at all** … `s1`→`s2`, `s2`→`s4`, `s4`→`s9`, `s9`→`s11` and `s11`→`s12` each butt a clip directly against the next, so the two TTS takes are spliced sample-adjacently." None of these is a junction: `s1`→`s2` has a **0.25 s** hold (`script.md:37`, sidecar `:124`); `s2`→`s4` has `s3` between them and two holds (`:38-40`); `s4`→`s9` has `s5a`, `s5b`, `s6`, `s7`, `s8` between them (`:40-46`); `s9`→`s11` has `s10` and a **0.45 s** hold (`:46-48`); `s11`→`s12` has a **0.45 s** hold (`:48`). The real 0.00 s joins are the **intra-key phrase joins inside `s1`, `s2`, `s4`, `s9`, `s11`** — every phrase pair there is `pauseAfterSeconds: 0.0` + `pauseBeforeSeconds: 0.0` with `phraseJoin: " "` (sidecar `:20, :126-145, :158-177, :222-241, :405-424, :469-488`). `voice-direction.md:159` already states the `s1` join correctly ("separate synthesis phrases joined with **no silence**"), so the packet knows the right form. **If the instruction is followed literally, the `s1`→`s2` case would "re-synthesise the two lines as one phrase" and merge two keys, breaking the byte-for-byte rule at `script.md:565-569`.** | Rewrite both to: *"**Five joins are 0.00 s, all inside keys**: `s1` (`Bạn từng nói mình sẽ học đàn.`‖`Rồi bạn đi làm.`), `s2` (`…danh sách`‖`những bài hát…`), `s4` (`Sáng nào cũng quẹt thẻ,`‖`hộp thư đầy.`), `s9` (`Chữ viết ngày xưa`‖`vẫn còn nguyên.`), `s11` (`Người ấy đâu biết sau này`‖`mình sẽ bận đến thế.`). The voice-agent checks each of these five intra-key splices on the assembled track; the fix is a 0.05–0.10 s **pauseBeforeSeconds** inside the key, never a merge of two keys and never a word change."* | script-agent → voice-agent | No file calls a key boundary with a nonzero hold a 0.00 s junction; the five joins are named by key **and** by the two phrases either side; the voice report can carry one pass/fail per named join; no instruction can merge two keys. |
| **NEW-4** | Thấp | `script.md:12-13`; `voice-direction.md:7-8` | "`s1`, `s2`, … are the owner's own lines **in the owner's own order**". The owner's order is L1, L2, L3 (`request.md:9-11`); the video is L1+L3 in `s1`, then L2 in `s2`. The merge is documented on the next line; the **reorder is not**, and the sentence claims the opposite. | "…are the owner's own lines (129 syllables) in the owner's order **except that L3 is lifted into the hook and L2 follows it** (`s1` = L1+L3; `s2` = L2)." | script-agent | Wherever playback order is claimed, the L3-before-L2 move is named in the same sentence. |
| **NEW-5** | Thấp | `script.md:171-172`, `:471` | §2.2 says the notebook ledger lists "**every state and the action that makes it**", and §6.4 says "It is **shut exactly once** (`s7`–`s8`)". The notebook is open at `s3` and shut in a box at `s7`; no shot closes or packs it. The transition is the years the video skips, not an on-screen action. | Add once, at `:171`: "(`s3`→`s7` is the only state change the video does **not** show: the notebook was closed and boxed during the years it skips — a time ellipsis, not a shot)"; change "shut exactly once" to "**open on screen at frame 0–`s3`, shut when it is lifted out at `s7`**". | script-agent | No sentence claims every state change has an on-screen action; the time jump is named once; no scene cell must invent a close. |
| **NEW-6** | Thấp | `script.md:559-560`; `voice-direction.md:76-77` | "3.6–4.4 is **the band the engine actually produced**" — the sentence immediately before reports the same engine at **3.17–4.45** (`:558`), and §5 uses 3.17 as the observed floor. The five-rate table is a model, not a measurement. | "3.6–4.4 is **the band this plan models**; the same engine has measured 3.17–4.45 in this repo, and §5 carries the 3.17 escalation." | script-agent | No file calls the 3.6–4.4 model "produced"/"measured"; the 3.17–4.45 evidence and the escalation stay adjacent. |

Severity note: NEW-1/2/3 each leave a **build-affecting contradiction** between two files or two paragraphs that a
downstream agent reads as instructions — hence Trung. NEW-4/5/6 are accuracy improvements that do not change output.

---

## 4 · Score (this lens)

| rubric item | score | evidence |
|---|---:|---|
| **1 · Fidelity** | **9.0** | No line is user-mandated (`request.md:31-33`), and every one of the owner's 12 lines appears verbatim: L1 minus the declared opener (`script.md:242`), L2 `:243`, L3 merged on `:242`, L4 split across `s5a`/`s5b` `:246-247`, L5–L12 `:249-258`. Recount = 129 owner syllables, 175 total. The ellipsis is kept in text and never performed (`:255`). The L3-before-L2 reorder serves the 3 s hook and does not change meaning; the *claim* that order is unchanged is a wording defect (NEW-4), not a fidelity loss. |
| **6 · Source accuracy / claims** | **8.5** | The claim plan (`brief.md:80-98`) is genuinely strong: every claim carries `S1` or a named `F`/`I`, the five `[ADD]` lines are justified one-to-one (`script.md:490-500`), and inferences are labelled rather than asserted (`I1` at `:248`, `I3` at `:252`, ink as `I4` at `:244`, `minh hoạ` labels at `:245-246`). Research keeps external snippets to language evidence only (`research.md:6-8, 31-32`). But four assertions are contradicted by the packet's own data: the five "0.00 s junctions" (NEW-3), the perfectly static lanyard (NEW-1), the `s1` caption that does not exist (NEW-2), and "the band the engine actually produced" against 3.17–4.45 (NEW-6). A claims pass cannot score 9 while a claim is falsified two lines below it. |
| **9 · Story profile content test** | **9.0** | Profile rubric (SKILL.md:323): "a consistent character acting out the beat … situation, turn, and ending feel earned; captions support the scene." Met: one consistent hand/torso/knee figure inside a stated camera law (`script.md:194-196`), the situation (`s1`–`s4`), the turn (`s7` found → `s10`–`s11` pity → `s12` permission), the ending (`s15` imperfect chord → `s16` refuses the debt), and 14 keys caption-carried + 3 headline-carried (`:585`). The only profile-level weakness is the `s1` text gap in NEW-2, which costs no more than this score. |
| **Owner constraints** | **pass** | Duration: the structured field says 30–45 s (`request.md:23`) but the owner's own topic line says `50–60 giây` (`request.md:8`); the conflict is recorded and the explicit owner duration is used (`brief.md:13-17`), and every rate 3.586–4.510 lands inside it. No mandatory lines, no sources supplied (`request.md:31-37`) — both respected. No CTA, no advice (`script.md:480-482`). `U1`–`U5` carried and obeyed (`:593`). Owner notes N1/N2 are **still `pending`** in `owner-notes.md:6,10` while `brief.md:72` says they are applied — see §6. |

**Lens overall = mean(9.0, 8.5, 9.0) = 8.8 / 10.**

The 9/10 bar is not met, and the failure is not "effort" or "constraint compliance": the script itself is strong and
unchanged; the packet that tells the next agents how to build it is not yet internally true.

---

## 5 · Previous-round fixes verified?

**Yes for 22 of 24.** A1–A5, B1–B3, B5–B8, C-01–C-06, C-08–C-11 are visible in the files with the quotes above.
**No for B4 and C-07** — both acceptance checks fail on the files as written. Three further defects were introduced
or exposed by the same pass (NEW-1, NEW-2, NEW-3).

---

## 6 · Process observation for the director (not a script ticket)

- `owner-notes.md:6,10` still reads **`pending`** for N1/N2, while `brief.md:72` states "Owner notes N1/N2 applied".
  `brief.md:75-76` says the marking is left to `video-director`; that marking is still owed before the packet can be
  called truthful under rule 01. No script change is required.
- `voice-performance.proposed.json:23-32` and all 17 `referenceSelectionStatus` fields are honestly `pending`; the
  reference WAV does not exist. That is declared, not hidden, and is not counted against this lens.

---

## 7 · What this lens could not verify

- `python3 -I scripts/pipeline.py audit` — **not run** (no shell). The director's recorded `ok` is accepted, not
  re-proven.
- Whether the five intra-key joins actually click or break prosody — that needs the rendered/synthesised clips and is
  the voice-agent's measurement; the packet can only name the right joins (NEW-3).
- Anything only the render can prove: the badge-on-list collision at phone size, the `s2`/`s10` page identity, the
  forefinger's visibility in frames 0–15.
- Whether `S1`'s owner prose was supplied exactly as quoted in `request.md` beyond the monitor record — `S1` is the
  primary source and no second copy exists.

---

## 8 · Verdict

**revise.** Open **Trung: 3** (NEW-1, NEW-2, NEW-3) + **B4** and **C-07** not closed. Open **Thấp: 3** (NEW-4,
NEW-5, NEW-6). Lens overall **8.8**, below the 9.0 bar.

**Top 3 fixes, in order:**
1. **NEW-1** — separate the static **badge** from the moving **strap** in `script.md:156-158` and `:470`; delete the
   "never moves … anywhere in the packet" absolute.
2. **NEW-3 / C-07** — rename the five 0.00 s joins as **intra-key phrase joins inside `s1`, `s2`, `s4`, `s9`, `s11`**
   in `script.md:361-365` and `voice-performance.proposed.json:664`; remove every instruction that could merge two keys.
3. **NEW-2 / B4** — make `brief.md:82` and `script.md:178, 273-280, 585` agree that `s1` shows only the 6-word
   headline, that the second sentence is carried by the image and `s4`, and that the spoken first sentence is **7**
   words, not 8.

If those three close and the three Thấp items are fixed, this lens has no remaining Cao/Trung and the script's
fidelity/source layer would score ≥ 9.
