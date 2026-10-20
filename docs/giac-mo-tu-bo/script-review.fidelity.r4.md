# Script review — fidelity / claims / profile lens — round 4 (final)

**Video:** `giac-mo-tu-bo` · **Profile:** story · **Gate:** A · **Round:** 4 (hard cap)
**Reviewer:** `script-reviewer`, clean context, lens A only
**Scope:** rubric 1 (fidelity), 6 (source accuracy / claims), 9 (story-profile content test), owner constraints.
Item 8 (specificity) is scored only as a corroborating read — lenses B and C own it.
**Writable file:** this report only. Nothing else in the repository was edited.

**Verdict driver.** Round 3 left 10 tickets (R3-A…R3-J) claimed closed and a merged 8.8. This round re-checks each
ticket on its stated acceptance check, independently re-counts the whole contract, hunts regressions from the round-3
edits, and raises only genuinely new findings. Result: **10/10 closed on the stated checks, 0 Cao, 0 Trung, 4 Thấp.**

---

## 0 · First read, as the viewer (before the rubric)

I read the 17 spoken lines in playback order at the §1 durations, without the shot table.

- **What I felt/understood in two lines:** a small, specific ache — a list written in hope, a finger that stops 6–8 px
  short of a button, dust holding the shape of a box — and then relief that the ending refuses the debt instead of
  asking for resolve. The point is retellable in one sentence: *“Mình từng có một danh sách những bài hát muốn chơi,
  và mình vẫn còn nhớ nó nằm ở đâu.”*
- **Where attention could drop:** 9.21–14.78 s (office → phone: `s4`–`s5b`) if the images are ordinary, and
  34.85–41.39 s (`s12`–`s13`) because the permission and the pivot are abstract. On paper both are protected: the first
  block has three concrete actions (badge, inbox, thumb) and the 0.20 s gap inside `s5a`; the second lands on the
  single off-camera note at `s13`. This is a lens-B/C question; I record it, I do not re-score it here.

The script is not a summary of the owner's text. It is the owner's text staged on one object with five sensory
`[ADD]` lines. That is the thing this lens exists to protect.

---

## 1 · What I could and could not run

- **Not run: `python3 -I scripts/pipeline.py audit giac-mo-tu-bo`.** This runtime has no shell or process-execution
  tool. The director's recorded result — `ok` (exit 0) — is at `script-review.md:171`; **I quote it and do not
  re-prove it**.
- **Not run: any audio, timeline or render check.** `docs/giac-mo-tu-bo/voice-ref/` still has no WAV (all 17
  `referenceSelectionStatus: "pending"`, `voice-performance.proposed.json:117` and the same field on every shot),
  `voice.json` does not exist, there is no `src/videos/giac-mo-tu-bo/timeline.ts`, and no MP4 exists. Every measured
  duration, hold, ASR result and frame fact below is therefore **a document claim, not a measurement**.
- **Run: independent arithmetic and byte comparison by reading the files.** Every number in §2 below was recomputed
  from `voice.proposed.json`, `voice-performance.proposed.json`, `script.md` §1/§5 and `request.md`, not copied from
  `script-review.md`.

---

## 2 · Independent re-count (the contract, recomputed)

### 2.1 Syllables — 175 = 129 owner + 46 `[ADD]`

| key | syl | owner/ADD | key | syl | owner/ADD |
|---|---:|---|---|---:|---|
| s1 | 11 | owner (L1+L3) | s10 | 10 | owner (L7) |
| s2 | 12 | owner (L2) | s11 | 11 | owner (L8) |
| s3 | 9 | `[ADD]` | s12 | 13 | owner (L9) |
| s4 | 8 | `[ADD]` | s13 | 9 | owner (L10) |
| s5a | 8 | owner (L4a) | s14 | 7 | owner (L11) |
| s5b | 4 | owner (L4b) | s15 | 9 | `[ADD]` |
| s6 | 11 | `[ADD]` | s16 | 20 | owner (L12) |
| s7 | 17 | owner (L5) | **total** | **175** | **129 + 46** |
| s8 | 9 | `[ADD]` | s9 | 7 | owner (L6) |

Owner sum: 11+12+8+4+17+7+10+11+13+9+7+20 = **129**. `[ADD]` sum: 9+8+11+9+9 = **46**. Unit is the repo's
space-separated token, and every per-key count equals the count of tokens in `voice.proposed.json`.

### 2.2 Owner lines L1–L12, verbatim

`request.md:9-20` is the source. There are **no mandatory lines** (`request.md:31-33` says “(none)”), so this is a
fidelity check on the supplied narration, not a legal verbatim gate. Two moves are declared and only two:

| owner line | text as supplied | where it is heard | verbatim? |
|---|---|---|---|
| L1 | `Ngày trước, bạn từng nói mình sẽ học đàn.` | `s1` | **yes except the declared 2-syllable opener `Ngày trước,`** (`script.md:14-17`) |
| L2 | `Bạn đã lưu cả một danh sách những bài hát muốn chơi.` | `s2` | **yes** |
| L3 | `Rồi bạn đi làm.` | `s1`, second sentence | **yes**; heard before L2 (declared at `script.md:12-14`) |
| L4 | `Mỗi lần định mua đàn, bạn lại nghĩ: ‘Để khi nào rảnh.’` | `s5a` + `s5b`, 0.00 s boundary | **yes in words**; the quote glyphs are ASCII `'…'` in `voice.proposed.json:7`, typographic `‘…’` in `request.md:12` |
| L5 | `Vài năm sau, trong một buổi dọn nhà, bạn tìm thấy cuốn sổ có danh sách ấy.` | `s7` | **yes** |
| L6 | `Chữ viết ngày xưa vẫn còn nguyên.` | `s9` | **yes** |
| L7 | `Bạn ngồi đọc, thấy thương người đã viết ra nó.` | `s10` | **yes** |
| L8 | `Người ấy đâu biết sau này mình sẽ bận đến thế.` | `s11` | **yes** |
| L9 | `Có thể hôm nay bạn không còn muốn trở thành nhạc công nữa.` | `s12` | **yes** |
| L10 | `Nhưng nếu vẫn thích âm thanh của cây đàn…` | `s13` | **yes**, including the owner's `…` |
| L11 | `Bạn có thể học một hợp âm.` | `s14` | **yes** |
| L12 | `Không phải để bù lại những năm đã qua. Chỉ để được vui với một điều mình từng yêu thích.` | `s16` | **yes** |

The L3-before-L2 reorder is a reordering of two owner lines, not a rewrite: no claim is added, removed or changed
(“you said you would learn; then you went to work; you had saved a list”). The `…` is kept in the canonical text and is
**not performed** — `s13`'s beat is the 0.25 s `pauseAfterSeconds` after `Nhưng` (`script.md:269`,
`voice-performance.proposed.json:539`).

### 2.3 Silence — 11.20 s

`pauseAfterSeconds` sum: 0.25 (`s3`) + 0.20 (`s5a`) + 0.25 (`s6`) + 0.25 (`s7`) + 0.20 (`s8`) + 0.25 (`s10`) +
0.20 (`s12`) + 0.25 (`s13`) + 0.20 (`s14`) + 0.25 (`s15`) + 0.30 (`s16`) = **2.60 s**.
Post-clip holds: 0.25+0.25+0.25+0.25+0.00+0.25+0.25+0.40+0.30+0.45+0.35+0.45+0.45+0.30+0.70+0.35+0.55 = **5.80 s**.
END card = **2.80 s**. Total **11.20 s**. The identity `175 ÷ rate + 11.20` reproduces every total:

| rate | 175 ÷ rate | + 11.20 | total | inside 50–60 |
|---:|---:|---:|---:|---|
| 4.4 | 39.77 | 11.20 | **50.97** | ✅ |
| 4.2 | 41.67 | 11.20 | **52.87** | ✅ |
| 4.1 | 42.68 | 11.20 | **53.88** | ✅ |
| 3.9 | 44.87 | 11.20 | **56.07** | ✅ |
| 3.7 | 47.30 | 11.20 | **58.50** | ✅ |
| 3.6 | 48.61 | 11.20 | **59.81** | ✅ |

Break-evens: 175 ÷ (50 − 11.20) = **4.510**; 175 ÷ (60 − 11.20) = **3.586**. Trim extreme:
175 ÷ 3.455 + 9.35 = **60.00**. Extension extreme: 175 ÷ 4.888 + 14.20 = **50.00**; 4.89 → 49.99, 4.95 → 49.55.
Structural marks: hook 11 ÷ 3.9 = 2.82 (3.07 at 3.586, 3.47 at 3.17); first payoff 23 ÷ 3.9 + 0.25 = **6.15**;
re-hook 63 ÷ 3.9 + 2.20 = **18.35**; chord 146 ÷ 3.9 + 6.95 = **44.39**; last word 52.72; END 53.27–56.07. All match.

### 2.4 Performance phrases — 33 / 17, byte-for-byte

17 keys, 2 phrases each except `s5b` (1) = **33**. I joined each key's `text` values with exactly one space and
compared to `voice.proposed.json`: all 17 match. The two joins that could break are `s1`
(`Bạn từng nói mình sẽ học đàn.` | `Rồi bạn đi làm.`) and `s13` (`Nhưng` | `nếu vẫn thích âm thanh của cây đàn…`);
both are exact. `s5b`'s single phrase is exact. No phrase boundary splits a word; no phrase contains a direction.

---

## 3 · Round-3 tickets — verified on their acceptance checks

| id | acceptance check (round 3) | result on the files | status |
|---|---|---|---|
| **R3-A** | `grep -ni "quieter\|drops in level"` returns nothing in `script.md`, `voice-direction.md`, `voice-performance.proposed.json`; `s10`/`s11` performable with `referenceAudio` + `denoise` only | grep over the live packet: the only hits are explicit negations — `voice-direction.md:70` “not a quieter gain”, `script.md:267` “not made louder or quieter anywhere”. No sidecar phrase asks for level; `s11`'s phrase reads “loses energy and stops — no breath, no trail-off” (`:481`) | **met**; one prescribed wording survives → **N4-1** |
| **R3-B** | no file says `s2` turns the page; every `s2` action names the corner lift; the plate stays where frame 0 put it | `script.md:257` “the fingertips **lift the page's lower corner and let it fall**”; `:509` “corner lifted `s2`”; grep `page turn` → only old review files, no live packet | **met** |
| **R3-C** | no “split across”; `:15`, §5 join 6 and sidecar `:664` agree; total 56.07 | `script.md:15` “the **0.20 s gap sits inside `s5a`** … the split itself is **0.00 s** — the two clips butt at 13.76 s”; `:45` row title “the deferred sentence — 0.00 s boundary”; `:391` join 6; `voice-performance.proposed.json:664` identical | **met** |
| **R3-D** | §2.1 has no id whose state contradicts the shots it lists; every `L0` reference is pre-turn; `s16` and `END` resolve to one named warm state; a reader of §2.1 alone cannot produce a cold finale | `L0` = `s1 s2 s3 s5a s5b` only (`:133`); `L2-held` = `s8 s9 s12 s13 s14 s16` (`:138`); `s16` “Held `L2`/`L3` state” (`:272`); `END` in §6.2 “`s16`/`END` … held `L2`/`L3`” (`:467`). **`END` is not in §2.1's where-cell** | **met for the acceptance**; completeness gap → **N4-4** |
| **R3-E** | `s16` and `END` give a y-range above 1710; gate E can check it | `s16` and `END`: “plate centre y ≈ 1450–1620, fully above y = 1710”; §2.2 `:164-166`; §6.4 `:508` — four places agree | **met** |
| **R3-F** | the `s15` chunk-2 claim is rate-scoped or holds into the 0.35 s hold | `script.md:321` “**≥ 1.0 s at rates ≤ 4.0**; at faster measured rates the chunk holds into the 0.35 s post-clip hold (46.94 − 45.92 = 1.02 s at 3.9)” | **met** |
| **R3-G** | 4.95 → 49.55, 4.89 → 49.99, exact bound 4.888 | `script.md:434` “4.89 → 49.99 s; 4.95 → 49.55 s, so 4.89 is the bound”; recompute matches | **met** |
| **R3-H** | no sentence denies `s3`'s blue; the `s5b` claim names what is unique | `script.md:261` “the only time the ink colour is used as a **graphic colour** rather than as ink on paper” | **met** |
| **R3-I** | the cut is named as a return to the finding; no second close/pack; §2.2 and §6.4 agree | `script.md:180-182` “returns to **the finding** … not forward, so this is not a forward time ellipsis”; `:509` “cuts back to the present finding, not forward”. The words “time ellipsis” survive only inside that negation | **met** (see §6 note on the director's “0 hits” row) |
| **R3-J** | the §10 row title is literally true and the ✅ count matches | `script.md:625` “**except the one named carve-out (`s1`)** — **16/17 ✅**”; body names `s1` and the two departures | **met** |

**10 of 10 closed on the stated acceptance checks.** The round-3 lens A's two blocking items (R2-7 volume language,
N3-1 page-turn) are both gone as executable instructions.

---

## 4 · Regression hunt on what the round-3 edits touched

| area touched in round 3 | what I re-checked | result |
|---|---|---|
| §2.1 light plan | every `L0` reference; every shot id's light state; `s16`/`END` | `L0` only `s1 s2 s3 s5a s5b`; `L1` `s4 s6`; `L2` `s7`; `L3` `s10 s11`; `L4` `s15`; `L2-held` `s8 s9 s12 s13 s14 s16`. `END` is absent from the row but named in §6.2 → **N4-4**, not a contradiction |
| lanyard y-coordinate | `s16`, `END`, §2.2 chain, §6.4 | all four say **y ≈ 1450–1620, fully above 1710**, plate face-up, strap may leave frame, plate may not |
| `s5a`→`s5b` split prose | intro, table row title, §5 join 6, sidecar `:664`, `voice-direction.md:172` | all say 0.20 s **inside `s5a`**, boundary **0.00 s** at 13.76; no live sentence says otherwise |
| mute-complete 16/17 | §10 title + body; three headline keys; `s1` carve-out | title 16/17, body names `s1` and the two named departures (`s1` drops `mình`; `s15` headline → caption); 14 caption keys + 3 headline keys = 17 |
| `s3`→`s7` cut direction (D-1) | §2.2, §6.4, notebook ledger | both say **back to the present finding**, not forward; no second close, no re-packing; the plate states are unchanged |
| restated facts in `brief.md` / `hook-options.md` / `voice-direction.md` | cover paragraph word-for-word; hook rates; re-hook window; duration; 3.9 provenance | cover paragraph identical (`brief.md:170-180` = `script.md:148-158`); hook 2.50–3.06 s and re-hook 16.52–19.70 s agree; 50–60 s conflict recorded at `brief.md:13-17`; no contradiction found |
| **new** cross-file staging wording | `voice-direction.md:121` says the finger stops **mid-word**; `:177`, `script.md:266`, `:487` say **mid-line** | **N4-2** (Thấp) |
| **new** internal duration | `script.md:453` “the screen goes dark for **2.32 s**” | not derivable from §1/§3 → **N4-3** (Thấp) |

No owner word, caption chunk, accent list, timing row or silence value was changed by any round-3 fix. The 56.07 s
planning total still holds.

---

## 5 · NEW tickets (round 4 only; none previously filed)

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **N4-1** | **Thấp** | `voice-direction.md:178` (`s11` row) | The row still reads “**Volume** **thins** on `bận đến thế` — the last three words lose energy and **stop there** (no level automation inside the take)”. The parenthetical denies the control the noun names, and the same file's rule says “no line asks for level automation inside the take” (`:66-72`). Round 3's own top fix named this exact string, but only the `quieter` / `drops in level` instances were changed. | “The line **thins** on `bận đến thế` — the last three words lose energy and **stop there** (no level automation inside the take) — **never a whisper, never a trail-off**.” | `script-agent` | No sentence in `voice-direction.md` attributes a level change to the voice; the only “volume” token left is the engine-capability negation at `:68`; `s11` still thins and stops |
| **N4-2** | **Thấp** | `voice-direction.md:121` | “the 0.25 s gap inside the line is where the finger stops **mid-word**.” The staging is explicit everywhere else: `voice-direction.md:177` “stops **mid-line**”; `script.md:266` “**stops mid-line**”; `script.md:487` “the finger stopping **mid-line**”. “Mid-word” belongs to the unfinished line of *writing* at `s2` (`script.md:257`, `:474`), not to the finger at `s10`. | “the 0.25 s gap inside the line is where the finger stops **mid-line**.” | `script-agent` | `voice-direction.md:121` says mid-line; every remaining `mid-word` describes the `s2` writing, not the `s10` finger; §6.3 and the `s10` row agree |
| **N4-3** | **Thấp** | `script.md:453` | “the screen goes dark for **2.32 s** before the notebook returns.” From §1: `s6` is 15.03–18.10 and `s7` starts 18.35. The side button is pressed at `tắt` (8 syllables into `s6` = 15.03 + 2.05 = **17.08**), so the dark interval to 18.35 is **1.27 s**; even counting from the `Mua ngay,` gap (16.82) it is **1.53 s**. No pair of §1 rows produces 2.32. | Delete the fixed number or replace it with the derivation: “the screen is dark from the button press to `s7`'s first frame — **1.27 s at 3.9 syl/s**, bounded by the 0.25 s `s6` hold”. | `script-agent` (timing detail; lens C/director may prefer deletion) | The sentence's duration is either removed or matches a recompute from §1 and §3; no downstream row keys to 2.32 |
| **N4-4** | **Thấp** | `script.md:138` | §2.1's `L2-held` where-cell is `s8, s9, s12, s13, s14, s16`; `END` is the 18th shot row (`:273`) and §6.2 assigns it the same held state (“`s16`/`END` … held `L2`/`L3`”, `:467`), but §2.1 — the document that says the light ids are “published once, here” (`:126-129`) — omits it. The director's “none missing” row (`script-review.md:169`) is therefore not literally true. | Add `END` to the `L2-held` where-cell: “`s8`, `s9`, `s12`, `s13`, `s14`, `s16`, `END`”. | `script-agent` | every shot id in §3 (`s1`–`s16` + `END`) appears exactly once in §2.1; a reader of §2.1 alone can state the END card's light |

**Why none of these is Trung.** N4-1 is a noun, not an executable request — the operative instruction (“lose energy and
stop”) is correct and the parenthetical denies automation. N4-2 changes no staging row; the authoritative `s10` cell
already says mid-line. N4-3 is a parenthetical duration in a structural self-check; no contract row, timing row or
acceptance row uses it. N4-4 is an omission, not a contradiction: §6.2 assigns `END` correctly. All four are fixable in
one pass and none changes a word, a caption, a silence or a total.

---

## 6 · Weakness hunt — what I would still change if the packet were reopened

Besides the four tickets, five things a strict reader notices. None blocks; I record them so the director does not
mistake silence for approval.

1. **`s5b` quote glyphs.** `request.md:12` uses `‘Để khi nào rảnh.’`; `voice.proposed.json:7` and the caption use ASCII
   `'Để khi nào rảnh.'`. Words are identical, so this is not a fidelity loss; on a phone the straight quotes are the
   only typographic downgrade in an otherwise typeset packet. If a later edit touches the canonical file, use the
   owner's glyphs. *(No ticket: changing the canonical text now would force a sidecar re-join for zero spoken
   difference.)*
2. **`brief.md:196` “ten to eleven lines”** vs `script.md:149` “eleven short lines”. A hedge, not a contradiction; the
   design is eleven.
3. **The director's “0 hits for `time ellipsis`”** (`script-review.md:170`) is literally false: `script.md:182`
   contains “this is not a forward time ellipsis”. The phrase appears only as an explicit negation, so R3-I's semantic
   acceptance still passes; the table should say “0 hits outside the negation” rather than “0 hits”.
4. **The lanyard's y-range is the one number no document can prove** until gate E stills exist. The packet now gives
   gate E a checkable value; that is all this lens can ask.
5. **The `s1` headline drops `mình`.** It is declared (`script.md:290-291`) and is the right call for a 6-word
   headline; a reader comparing it to the spoken line will see the drop, and the declaration is the mitigation.

The rewritten lines are in N4-1…N4-4. If I had to add a sixth: `voice-direction.md:102` says `s5b` is “said small,
quick and dismissive” — good — but the shot row's first clause says “flat and deliberately the least emotional passage
in the video”, which could be read as applying to `s5b` too. The turn depends on `s5b` being *small*, not *flat*; the
row's later clause corrects it. I leave it as an observation, not a ticket.

---

## 7 · Score (this lens)

| rubric item | score | evidence |
|---|---:|---|
| **1 · Fidelity** | **9.2** | 12/12 owner lines present; 129 owner syllables recounted; only the declared opener drop and the declared `s1` = L1+L3 merge; L3-before-L2 is a reorder of two owner lines with no claim changed; the `…` is text-only and never performed; no mandatory lines exist (`request.md:31-33`). The `s5b` quote-glyph normalization is noted, not scored. |
| **6 · Source accuracy / claims** | **9.0** | Every one of C1–C17 (`brief.md:82-98`) maps to `S1` or a named fact; all five `[ADD]` lines are justified one-to-one (`script.md:526-538`); `I1` (`:262`), `I3` (`:266`), `I4` (`:258`) are labelled as inferences; `U1–U5` stay unfilled (`research.md:69-73`); the rate provenance is correctly quoted (`script.md:588-603`: 207 syl / 52.6 s = 3.9, per-clip 3.58–4.22; 3.17–4.45). The residual engine noun (N4-1) and the internal 2.32 (N4-3) are not world claims, so they cost 0.1–0.2, not the bar. |
| **9 · Story-profile content test** | **9.1** | Profile rubric (`SKILL.md:338`): “A consistent character acting out the beat … Situation, turn, and ending feel earned; captions support the scene.” Met: one hand/torso/knee figure inside the camera law (`script.md:206-210`), situation `s1`–`s4`, turn `s7` found → `s10`–`s11` pity → `s12` permission, ending `s15` imperfect chord → `s16` refuses the debt; 14 caption keys + 3 headline keys with the one honest `s1` carve-out; no CTA, no advice, no diagnosis (`:512-519`). |
| **8 · Specificity / emotional impact** *(corroboration only; B/C own it)* | **9.1** | 18/18 beats carry a see-or-hear detail (`:470-497`); the contrast pair `CP1` is the same page/ink framed twice (`:446`); exactly three highlights (`:456-468`); 3.35 s of real silence after the close (`:520-521`). The one soft beat is the abstract `s12`–`s13` block, which the off-camera note rescues. |
| **Owner constraints** | **pass** | Duration: the structured field says 30–45 s (`request.md:23`) but the owner's own topic line says 50–60 giây (`:8`); the conflict is recorded and the explicit owner duration is used (`brief.md:13-17`), which `SKILL.md:296` authorises. Every rate 3.586–4.510 lands inside 50–60 s. No mandatory lines, no sources supplied. No CTA. `U1`–`U5` obeyed. `owner-notes.md` N1/N2 are `done:`. |

**Lens overall = mean(9.2, 9.0, 9.1) = 9.1 / 10.**

This is not a constraint-compliance 9. The script itself earns it: the situation, the turn and the ending are carried
on one object, the owner's words are intact, every inference is labelled, and the profile's “earned” test is met. The
four remaining items are document hygiene below the blocking bar.

---

## 8 · Previous-round fixes verified?

**Yes — 10 of 10 on the stated acceptance checks**, with two caveats the director should read:

- **R3-A** is met by its own grep and by the sidecar, but the round-3 reviewer's prescribed edit to
  `voice-direction.md:176` (“Volume thins” → “The line thins”) was not applied. That survivor is **N4-1**, filed Thấp,
  not a reopened ticket.
- **R3-D** is met for `s16` and `L0`, but `END` is missing from §2.1's `L2-held` row. That is **N4-4**, filed Thấp.

No regression was found in the six areas the round-3 edits touched: the light plan, the lanyard y-value, the
`s5a`→`s5b` prose, the 16/17 mute-complete row, the `s3`→`s7` cut direction, and the facts restated in `brief.md`,
`hook-options.md` and `voice-direction.md`.

---

## 9 · What this lens could not verify

- **`python3 -I scripts/pipeline.py audit giac-mo-tu-bo` was not run by me.** The director's `ok` (exit 0) is quoted
  from `script-review.md:171`, not re-proven.
- **Any audio fact.** No WAV, no `voice.json`, no measured clip duration, no ASR/CER, no loudness, no silence sum on a
  real track. The 11.20 s and every total above are the plan; `voice-agent` and Join must replace them with measured
  values (the packet says so itself, `script.md:374-379`).
- **Any render fact.** The cover collision at phone size, the `s2`/`s10` page identity, the forefinger in frames 0–15,
  the lanyard occlusion, the `s2` corner lift reading as a lift rather than a turn — all gate D/E facts. The packet is
  honest about them (`script.md:636` marks the page-identity row ⏳).
- **Whether `s11` actually thins**, and whether the six 0.00 s joins click. That is the voice-agent's measurement;
  this lens can only confirm the instruction and the joins are now written correctly.
- **The 2.32 s sentence's origin.** I can prove it is not derivable from §1/§3 as they stand; I cannot know whether it
  was computed against an older timing. N4-3 asks for deletion or derivation, not for a re-plan.

---

## 10 · Verdict

**pass — this lens.** Lens score **9.1**; **0 Cao, 0 Trung, 4 Thấp** (N4-1…N4-4). The merged gate still needs
lens B (hook ≥ 9) and lens C (specificity ≥ 9) and the director's `pipeline.py review <vid> A 9.1 …` + `gate` step;
this report does not claim those.

**Top 3 fixes, in order (none blocking):**
1. **N4-1** — `voice-direction.md:178`: “**Volume** **thins**” → “The line **thins**”. One word; removes the last
   level noun from the emotional core.
2. **N4-2** — `voice-direction.md:121`: “mid-word” → “**mid-line**”, so the direction sheet matches the `s10` row and
   §6.3.
3. **N4-3 / N4-4** — delete or derive the 2.32 s at `script.md:453`, and add `END` to the `L2-held` row at
   `script.md:138`. Both are one-line edits that make the self-check literally true.
