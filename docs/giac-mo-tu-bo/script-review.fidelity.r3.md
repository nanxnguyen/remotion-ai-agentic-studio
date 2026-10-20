# Gate A · Round 3 · Lens A — fidelity, source accuracy, owner constraints

**Video:** `giac-mo-tu-bo` · `GiacMoTuBoReel` · profile `story`
**Reviewer:** `script-reviewer` (clean context; wrote nothing in this packet)
**Scope:** rubric items **1 (fidelity)**, **6 (source accuracy / claims)**, **9 (story profile content test)**, owner-constraint compliance, and regression hunting across the R2-1…R2-13 fix pass. Items 2/3/4/5/7/8/10 belong to the round-3 hook and craft lenses and are not re-scored here; R2-7 (a lens-C ticket) is nevertheless re-checked because it is still open in the consolidated list.
**Verdict driver:** the files, not the producer's closure table.

## Inputs read

`request.md`, `owner-notes.md`, `research.md`, `brief.md`, `script.md`, `hook-options.md`, `voice.proposed.json`,
`voice-performance.proposed.json`, `voice-direction.md`, `script-review.md`, `script-review.fidelity.r2.md`; sibling
evidence re-read where a citation is load-bearing (`docs/thuong-hay-so-bat-dau-lai/voice-report.md:34`,
`docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/script-review.fidelity.md:502`, the sibling reference WAV).

## What I could not run

No shell/process execution in this runtime. **`python3 -I scripts/pipeline.py audit giac-mo-tu-bo` was not run by me**;
the director's recorded `ok` is accepted, not re-proven. Every syllable count, sum and byte-for-byte join below was
re-counted by eye and arithmetic, not by script. Nothing rendered or heard exists at gate A.

---

## 1 · Independent re-count

| check | result |
|---|---|
| Owner syllables | 7 (`s1`, after the declared `Ngày trước,` drop) + 12 (`s2`) + 12 (`s5a`+`s5b`) + 17 (`s7`) + 7 (`s9`) + 10 (`s10`) + 11 (`s11`) + 13 (`s12`) + 9 (`s13`) + 7 (`s14`) + 20 (`s16`) = **129** ✅ (`voice.proposed.json:2-18`) |
| `[ADD]` syllables | `s3` 9 + `s4` 8 + `s6` 11 + `s8` 9 + `s15` 9 = **46** ✅ |
| Total | **175** ✅; every per-key count agrees with `script.md:37-56` |
| Silence | inside 2.60 + post-clip 5.80 + END 2.80 = **11.20 s** ✅ (holds re-summed individually from `script.md:39-56`) |
| Totals | 50.97 / 52.87 / 53.88 / 56.07 / 58.50 / 59.81 s at 4.4 / 4.2 / 4.1 / 3.9 / 3.7 / 3.6 ✅ |
| Break-evens | 175/4.510 + 11.20 = 50.00; 175/3.586 + 11.20 = 60.00 ✅ |
| Phrases | 33 phrases / 17 keys; every join reproduces the canonical line with one space, including `s13`'s `…` ✅ (by eye) |

The timing spine has not regressed.

---

## 2 · R2 ticket verification (R2-1 … R2-13)

Legend: **closed** = the acceptance check is met on the files; **open** = a defect remains.

| id | closed? | evidence |
|---|---|---|
| **R2-1** plate vs strap | ✅ | `script.md:158-162` scopes immobility to the **badge plate** ("never landing again … there is no drop, no second settle, anywhere in the packet") and gives the **strap** a five-beat path (relaxes `s1` → torso `s4` → hangs `s6` → lower third `s12` → lower-left `s16`/`END`); `:253` repeats "the strap has finished settling and does not move again **in this shot**"; `:347` names the post-`s1` motion; `:503` repeats the plate/strap split; `hook-options.md:42-49` agrees. No sentence says the lanyard or coil "never moves". |
| **R2-2** `s1` text ledger | ✅ | `brief.md:82` now says "**only this string; the second sentence `Rồi bạn đi làm.` is never printed**"; `script.md:186-188, :292-296` say the same; `:286` reads "6 words instead of the spoken **7**"; `:620` restates "14 caption keys + 3 headline keys … `s1` is the **one named carve-out**". The `Rồi bạn đi làm.` caption claim is gone. |
| **R2-3** six 0.00 s joins | ✅ | `script.md:377-394` names exactly six — five **intra-key** joins (`s1`, `s2`, `s4`, `s9`, `s11`) plus the `s5a`→`s5b` split — and says the split butts at 0.00 s because `s5a`'s 0.20 s pause sits *inside* that clip; `:393-394` explicitly denies that any boundary with a hold is a junction. `voice-performance.proposed.json:664` is identical in substance. The old five-key-boundary list is gone. |
| **R2-4** headline count | ✅ | Exactly three headline keys remain: `s1` (`:252`), `s5b` (`:257`), `s15` (`:267`, `:317`). `s7` (`:259`), `s9` (`:261`), `s10` (`:262`), `s11` (`:263`), `s12` (`:264`), `s13` (`:265`), `s14` (`:266`), `s16` (`:268`) all read "— (caption only)". `:278` and `:321` state the three-key rule; `brief.md:88,91,95` say "caption only". |
| **R2-5** lanyard at the close | ✅ | `script.md:162` and `:174-175` put it at the **lower-left edge, badge plate face-up, outside the warm bar, small** at `s16`/`END`; the `s16` cell (`:268`) and `END` cell (`:269`) repeat the same position; `:503` and `:504` agree. |
| **R2-6** trim row | ✅ | `script.md:408-412` names `s13` **post-clip hold 0.30 → 0.25**, distinguishes `s13`'s untouched 0.25 intra-clause pause, and distinguishes `s3`'s two 0.25 values; the sum is stated as 1.85 s / 60.00 s at 3.455. |
| **R2-7** volume language | ❌ **open** | The general paragraph is fixed (`voice-direction.md:66-71`: "never from level … no line asks for level automation inside the take … any whole-line gain difference belongs to the **mix**"), but the per-shot layer still asks for level: `voice-direction.md:176` "**Volume thins** on `bận đến thế`"; `:171` `s6` "**quieter** and lower than everything before it"; `:175` `s10` "**quieter** than everything before it"; `script.md:258` `s6` "quieter and lower"; `:262` `s10` "slightly quieter"; and the executable sidecar, `voice-performance.proposed.json:481` (the `s11` phrase read by the voice-agent), "slower and lower; **drops in level** and stops". That contradicts `:16` (`volume` in `unsupportedControls`) and `:18` ("…is unavailable and is **requested nowhere in this file**"), and `:656`. The acceptance check "no sentence asks the engine for volume" fails. |
| R2-8 playback order | ✅ | `script.md:12-14` names the one move ("L3 is heard before L2"); `voice-direction.md:7-9` names it too. |
| R2-9 time ellipsis | ✅ | `script.md:175-184` says "every state and, **where the change is on screen**, the action that makes it. **The one change that is not a shot is the close** … a **time ellipsis**"; `:504` says "shut **off screen** across the `s3`→`s7` time ellipsis — nobody is seen closing it". No sentence now claims every change has an on-screen action. |
| R2-10 "band the engine produced" | ✅ | `script.md:592` "is the band this plan **models**"; `voice-direction.md:82-83` "the band this plan *models* … rather than describing what this run will produce"; the 3.17–4.45 evidence stays adjacent. |
| R2-11 `s15` clear formula | ✅ | `script.md:267` and `:317`: clear = `5 ÷ rate + 0.25` after the key's clip start, **1.53 s at 3.9 → 45.92 s absolute**, chunk 2 holds **≥ 1.0 s** (1.02 s at 3.9), no shared frame. `hook-options.md` no longer hard-codes it. |
| R2-12 END fallback | ✅ | `script.md:630` "**the card is never cut** — the owner's topic line is not deleted for a presentation problem. The fallback is to **reduce the type weight and shorten the dwell**, or move the card earlier"; escalate if E insists. |
| R2-13 `s3`/`s8` register | ✅ | `voice.proposed.json:4,10` = `Trang giấy mỏng quá, chữ viết tay, viết dở.` / `Bụi phủ kín hết bìa, tay kéo vệt qua.`; `script.md:254,260,304,310,525,528` and `voice-performance.proposed.json:192,384` agree; both 9 syl; captions are literal substrings. |

**Closed: 12 of 13. Open: R2-7 (Trung, carried from the craft lens).**

The four round-2 falsified claims are gone from the live packet: the false five-key-boundary list, the motionless
lanyard, the non-existent `Rồi bạn đi làm.` caption, and "the band the engine actually produced". Owner lines are all
present — L1 minus the documented opener, L2 `s2`, L3 `s1`, L4 split `s5a`/`s5b`, L5–L12 `s7,s9,s10,s11,s12,s13,s14,s16`
— with `s12`, `s13` (including `…`) and `s16` exact against `request.md:17-20`.

---

## 3 · NEW tickets (round 3 only; not previously filed)

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **N3-1** | **Trung** | `script.md:253` (delivery cell), `:504` (§6.4 notebook row) | The `s2` action is called "the page **turning**" (`:253`) and "page **turned** `s2`" (`:504`), while the same `s2` image cell says "the fingertips **lift the page's lower corner and let it fall**" and "**the badge plate still lies exactly where it lay at frame 0 — unmoved**"; `:467` (§6.3) says "the page's lower corner lifted and let fall". A builder who stages a page turn moves the badge plate that carries the frame-0 thesis, and contradicts R2-1's plate immobility. | In both places: "**the page's lower corner is lifted and let fall**"; in §6.4 "corner lifted `s2`". Do not use "page turned" for this beat. | script-agent | No file says `s2` turns the page; every `s2` action names the corner lift; the plate stays where frame 0 put it. |
| **N3-2** | Thấp | `script.md:17-18` | "`s5a` + `s5b` are owner line 4 split across a **real gap** … (`13.76 s`)". At 13.76 s the table gives `s5a` post-clip hold **0.00** and `s5b` start = `s5a` end; the real 0.20 s gap is `s5a`'s `pauseAfterSeconds` **inside** the clip (`:43`, `:387`, sidecar `:664`). The parenthetical invites a timeline builder to insert a hold at 13.76 s. | "…split into two keys because the **0.20 s gap sits inside `s5a`**; the two clips themselves butt at 13.76 s with 0.00 s between them." | script-agent | No sentence places a gap at the `s5a`→`s5b` boundary; the intro agrees with `:387` and sidecar `:664`. |
| **N3-3** | Thấp | `script.md:257` (`s5b` on-screen cell) | "the **only time the page's ink colour appears on a screen**" — but `s3` shows the same `#243A8C` ballpoint as ink on the page (`:254`, "the ink is the same blue ballpoint … **shown**"). Both are on screen; the "only time" claim is false as written. | "the only time the ink colour is used as a **graphic colour** rather than as ink on paper" (or delete the clause). | script-agent | No sentence denies the `s3` blue; the `s5b` claim names what is actually unique (use as a graphic colour). |
| **N3-4** | Thấp | `script.md:175-179`, `:504` | The notebook ledger calls the `s3`→`s7` cut a "**time ellipsis**" that runs *forward* ("open … → (time ellipsis; shut off screen) → `s7` closed"), but `s7` is the **finding** ("Vài năm sau … bạn tìm thấy", `:259`), i.e. a cut **back** to the moment the notebook is still shut in the box. As written the ledger implies the notebook was closed and re-boxed between `s3` and `s7`. | Name the direction once: "the `s3`→`s7` cut **returns to the finding** — the notebook is still shut in the box; it is a rewind to the moment before `s1`, not a forward ellipsis." Keep the shots and the plate states unchanged. | script-agent | The `s3`→`s7` cut is named as a return to the finding; no sentence implies a second close/pack; §6.4 and §2.2 agree. |

**Regression note.** N3-1 and N3-4 are wording introduced or left by the C-01/R2-1/R2-9 ledger fixes, which is exactly
the class of cross-row contradiction the previous rounds treated as blocking. N3-1 is Trung because it can move the
object that carries the cover thesis; N3-4 is Thấp because the shots are already coherent as a rewind and only the
ledger's time direction is wrong.

---

## 4 · Score (this lens)

| rubric item | score | evidence |
|---|---:|---|
| **1 · Fidelity** | **9.0** | No line is user-mandated (`request.md:31-33`); all 12 owner lines are present, `s12`/`s13`/`s16` exact (`voice.proposed.json:14-18` vs `request.md:17-20`); L1 loses only the declared 2-syllable opener; L3 is lifted into `s1` and L2 follows, named at `script.md:12-14`; the owner's `…` is text-only (`:265`, `:400`); 129 owner syllables. The two N3 wording defects do not touch an owner word. |
| **6 · Source accuracy / claims** | **8.8** | The claim plan (`brief.md:80-98`) is one claim → one source, every `[ADD]` is justified (`script.md:520-529`), inferences stay labelled (`I1` `:258`, `I3` `:262`, `I4` `:254`, `minh hoạ` `:255-256`), `U1`–`U5` stay unfilled (`research.md:69-73`), and the rate evidence is now correctly quoted (`:588-594`: 207 syl / 52.6 s = 3.9, per-clip 3.58–4.22; `chung-minh-de-lam-gi` 3.17–4.45). Remaining: the false "requested nowhere in this file" against `drops in level` (R2-7), the false "only time the ink colour appears" (N3-3), and the page-turn claim (N3-1). A claims pass cannot be 9 while a claim is contradicted by the same packet. |
| **9 · Story profile content test** | **9.0** | Profile rubric (`SKILL.md:323`): "A consistent character acting out the beat … Situation, turn, and ending feel earned; captions support the scene." Met: one hand/torso/knee figure inside the stated camera law (`script.md:196-199`), the situation `s1`–`s4`, the turn `s7` found → `s10`–`s11` pity → `s12` permission, the ending `s15` imperfect chord → `s16` refuses the debt, 14 caption keys + 3 headline keys with the one honest carve-out (`:620`). N3-4 is a ledger-direction defect, not a missing turn; it costs nothing here. |
| **Owner constraints** | **pass** | Duration: structured field 30–45 s (`request.md:23`) vs the owner's own line `50–60 giây` (`:8`); the conflict is recorded and the explicit owner duration is used (`brief.md:13-17`), which `SKILL.md:283` authorises ("an explicit user duration takes precedence"); every rate 3.586–4.510 lands inside it. No mandatory lines, no sources supplied (`request.md:31-37`). No CTA, no advice (`script.md:512-516`). `U1`–`U5` obeyed. `owner-notes.md:6,10` are now `done:` (the round-2 process defect is closed). |

**Lens overall = mean(9.0, 8.8, 9.0) = 8.9 / 10.**

This is not a constraint-compliance pass: the script itself is strong and unchanged. The packet that tells the voice
and scene agents how to build it is still not internally true in the one place the emotional core is performed
(R2-7) and in the `s2` action (N3-1).

---

## 5 · Previous-round fixes verified?

**Yes for 12 of 13.** R2-1 — R2-6 and R2-8 — R2-13 meet their acceptance checks with the quotes above.
**No for R2-7** — the acceptance check fails on `voice-performance.proposed.json:481`, `voice-direction.md:171,175,176`
and `script.md:258,262`. Three new wording defects were raised: N3-1 (Trung), N3-2/N3-3/N3-4 (Thấp).

---

## 6 · What this lens could not verify

- `python3 -I scripts/pipeline.py audit giac-mo-tu-bo` — **not run** (no shell). The director's `ok` is accepted, not
  re-proven.
- Whether the `s11` delivery actually thins (or clicks at the six 0.00 s joins) — that needs the synthesised clips and
  is the voice-agent's measurement; the packet can only name the right instruction and the right joins.
- Render-only facts: the cover collision at phone size, the `s2`/`s10` page identity, the forefinger in frames 0–15,
  and whether the `s2` corner lift reads as a turn at 9:16.
- The reference WAV: `docs/giac-mo-tu-bo/voice-ref/` contains no files; all 17 `referenceSelectionStatus` are honestly
  `pending`. The preview MP3 does exist at the pinned path. Not counted against this lens.
- Whether the `s3`→`s7` cut reads on screen as a deliberate rewind or as a continuity error — that is a gate-E
  question; N3-4 only asks the packet to name its own direction.

---

## 7 · Verdict

**revise.** Open **Trung: 2** — **R2-7** (volume language at the emotional core) and **N3-1** (`s2` "page turned" vs
the corner lift and the unmoved badge plate). Open **Thấp: 3** — N3-2, N3-3, N3-4. Lens overall **8.9**, below the
9.0 bar.

**Top 3 fixes, in order:**
1. **R2-7** — delete every level instruction: `voice-performance.proposed.json:481` "drops in level" → "thins and
   stops — no level automation"; `voice-direction.md:176` "Volume thins" → "The line **thins**"; `:171`/`:175`,
   `script.md:258`/`:262` and the matching sidecar phrases "quieter" → "**smaller** (closer, less air, fewer
   consonants); any level difference is clip gain in the mix, not the engine".
2. **N3-1** — replace "page turning" / "page turned `s2`" with "**the page's lower corner lifted and let fall**" in
   `script.md:253` and `:504`, so the badge plate cannot be staged as moving.
3. **N3-2 / N3-4** — say that the 0.20 s gap is **inside `s5a`** and the keys butt at 13.76 s, and name the `s3`→`s7`
   cut as a **return to the finding** (a rewind), not a forward ellipsis.
