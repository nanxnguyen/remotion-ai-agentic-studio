# Script review — giac-mo-tu-bo · Gate A

Gate A reviewer: `script-reviewer`. Three clean-context lens reviewers ran in parallel in round 1
(they did not write the packet). Merged by `video-director`:

| lens | file | score | verdict |
|---|---|---:|---|
| A — fidelity / sources & claims / user constraints | `script-review.md` → `script-review.fidelity.md` | 9.2 | pass |
| B — hook engineering / specificity & emotional impact / structure | `script-review.hook.md` | 9.0 | **revise** |
| C — spoken naturalness / timing / voice-direction & visual feasibility | `script-review.craft.md` | 8.9 | **revise** |

**Merged gate A score = lowest lens = 8.9 → verdict `revise`** (below the 9 bar; also B1 Cao + three Trung open).
The lens files hold the full evidence; the consolidated tickets are below.

Locked context judged against: profile `story`, **duration 50–60 s** (owner prose override over the
structured 30–45 s field), voice route 2 `thanh-long-nang-cao` (≈4.1 syl/s), owner notes N1/N2.
Pass bar: overall ≥ 9, hook ≥ 9, specificity ≥ 9, no item < 8, no open Cao/Trung.

Independent facts the lenses confirmed: syllable recount **175 = 129 owner + 46 `[ADD]`**;
silence identity **2.60 + 5.80 + 2.80 = 11.20 s**; totals **50.97 / 53.88 / 56.07 / 58.50 / 59.81 s**
at 4.4 / 4.1 / 3.9 / 3.7 / 3.6 syl/s; break-evens **3.586 / 4.510**; phrase→canonical reassembly
**17/17 keys, 33 phrases, byte-for-byte**; all 12 owner lines survive (11 verbatim, L1 minus the
documented 2-syllable opener); no `U1–U5` filled; no mandatory lines existed.

---

## Round 1 · consolidated tickets

Severity: Cao = blocks the gate · Trung = must close before build · Thấp = improvement.

| id | sev | where | issue | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **B1** | **Cao** | `script.md:151,:154,:221,:295,:409,:432`; `voice-performance.proposed.json:122`; `hook-options.md:45-46` | The badge-covers-the-list event has **three incompatible timestamps**: already landed at frame 0 (`:151,:154`), drops inside `s1` at ~1.79 s (`:221`), lands during the 0.25 s post-`s1` hold (`:295`). Two readings falsify the cover's sound-off thesis. | Pick ONE instant. **Director decision: option A** — keep the canonical cover (badge already on the list at frame 0, which is the sound-off thesis); rewrite `s1`'s second movement to a new motion (strap settles flat; page corner lifts 1 mm; badge does not move); re-purpose the post-`s1` hold to a new named visual. Make all statements agree. | script-agent | All badge statements share one instant; §5's hold has a new named beat; `hook-options.md` matches. |
| **B2** | **Trung** | `script.md:162,:221,:251`; `brief.md:177`; `hook-options.md:56-57` | Headline clear hard-coded as "3.07 s"; the boundary is `11 ÷ rate + 0.25` = 2.75 / 2.87 / 3.07 / 3.22 / 3.31 s. §1.1 omits this mark. At rates faster than 3.9 the headline overlaps the first caption. | Replace the fixed number with the measured-boundary formula, keyed to measured clip ends; add the row to §1.1; propagate to brief/hook-options/§4. | script-agent | No file states a fixed 3.07 s clear; §1.1 carries it at five rates; no rate shows headline + caption in the same frame. |
| **C-01** | **Trung** | `script.md:410,:232,:233,:234,:237,:157-158,:409` | Notebook prop-state ledger contradictory: `s11` closes it, `s12` "open on the floor" (no re-open action), `s13` closed **on a table** (moved with no carry action), `s16` open; §6.4 says "left open `s12`,`s13`,`s16`"; §2.2's chain omits `s7`/`s12`/`s13`. | Write ONE prop-state ledger; every state change has a named action in the same or preceding cell; make §2.2's chain and §6.4 list the same shots in the same order. | script-agent | One ledger; `s11/s12/s13/s16` consistent; both chains identical. |
| **C-02** | **Trung** | `voice.proposed.json:8`; `script.md:201-203,:227,:381-382`; `brief.md:183,187` | Spoken `khựng **trên** nút Mua ngay` says the finger is ON the button; the frame says it stops **6–8 px short** and the button never changes state — load-bearing for `I1`/`U2`. | Change to `khựng **trước** nút Mua ngay` (11 syl preserved, no timing change); propagate to `voice-performance.proposed.json` phrase text, `voice-direction.md`, and the §3 image cell. | script-agent | Spoken text, sidecar phrase, voice-direction and image cell all say the same position; reassembly still passes; `s6` still 11 syl. |
| A1 | Thấp | `script.md:223` (`s3`) | `s3` speaks `chữ bút bi xanh` — blue ink is `I4`, a design choice never in the owner's account. | Make the colour image-only: `s3` → `Trang sổ mỏng, chữ viết tay, viết dở.` (or add an explicit design-choice clause to §7). | script-agent | `s3` spoken text has no colour word, or §7 carries the clause; §2.4 still shows no ownership cue. |
| A2 | Thấp | `script.md:493`; `voice-direction.md:73`; `voice-performance.proposed.json:658`; `brief.md:493` | Per-clip range cited as "3.58 to 4.01"; recounted max is **4.22** (s4a). | Rewrite all four to "3.58 to 4.22 (lines 17–27)". | script-agent | All four read 3.58–4.22; the 3.9 avg citation untouched. |
| A3 | Thấp | `brief.md:16` | Sibling "prose duration" analogy unverifiable (sibling has no `request.md`). | Rewrite: "…as the sibling video's explicit 45–55 s owner override shows, an explicit owner duration outranks the repo default." | script-agent | No unverifiable "prose" provenance. |
| A4 | Thấp | `script.md:489`; `voice-direction.md:71`; `voice-performance.proposed.json:658` | Cites `docs/motion-design-lab/script.md:23`, absent from the repo. | Re-cite the recoverable quote in `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/script-review.fidelity.md:502`, or drop the file+line. | script-agent | Each occurrence cites an existing path or drops it; rate plan unaffected. |
| A5 | Thấp | `brief.md:122` | "grep -r Manrope … no matches" is now self-referentially false (4 matches inside this brief). | Rewrite: "verified unused in any **other** repo file (excluding this brief: no matches)". | script-agent | Claim no longer contradicts its own file. |
| B3 | Thấp | `script.md:151-152,:221` | In the first second nothing acts except dust motes. | State that the forefinger's entry begins inside the first ~0.5 s (frames 0–15 contain a hand movement); give gate D's hook strip this acceptance check. | script-agent → design-agent | Frames 0–15 contain a named non-mote moving element. |
| B4 | Thấp | `script.md:244-247` | §4 preface says every chunk is word-for-word, but two headline replacements are not verbatim. | Reword the preface: caption chunks verbatim; the three headline elements replace the caption; name exactly the two permitted departures (`s1`, `s15`). | script-agent | §4 states verbatim vs headline and names the two departures. |
| B5 | Thấp | `script.md:266,:236` | `s15` (H3, sound payoff) headline covers only the first clause; `ngón ấn chưa quen.` has no on-screen text. | Keep the headline; add `ngón ấn chưa quen.` as a second caption chunk after the headline clears. | script-agent → content-agent | Every key with a voice line has a mute-complete text path, or is in the three-key headline exception list. |
| B6 | Thấp | `script.md:238,:450-453,:237` | END card restates the loss after `s16` refuses it; risk of re-opening the wound. | Keep the card; add an acceptance row: the card reads as the video's title over a resolved image (text only; light + flat hand unchanged); gate E confirms no grief re-introduced. | script-agent | Acceptance row exists; gate E records the result. |
| B7 | Thấp | `script.md:347,:179,:133-136`; `hook-options.md:45-46` | Specificity rests on two render-only readings; only (a) is obligated at D — nobody proves the `s2`/`s10` page identity. | Add §10 rows: D proves the cover collision at phone size; E (or scene stills) proves the `s10` page is recognizably the `s2` page with frames recorded side by side. | script-agent → design-agent/integration-reviewer | Both rows exist and carry recorded frames. |
| B8 | Thấp | `script.md:88,:98-101,:493-494` | "inside 3 s for every rate ≥ 3.667" is modelled, while the cited report measured 3.17. | Add one sentence naming the observed floor (3.17 `chung-minh-de-lam-gi`; 3.58–4.22 `thuong-hay-so-bat-dau-lai`), and state the ≤3 s spoken claim is conditional while the frame-0 headline is the rate-independent guarantee. | script-agent | §1.1 names the observed floor and distinguishes measurement from model. |
| C-03 | Thấp | `script.md:441-442` | `129 ÷ 3.9 = 33.08 s`, shortfall `16.92 s`; both printed numbers match 125 syllables. | Rewrite to 33.08 s / 16.92 s; recheck the `[ADD]` budget sentence against 175. | script-agent | Arithmetic correct. |
| C-04 | Thấp | `script.md:233` vs `:171-175` | `s12` says "stands and walks out of frame" but the asset class has no head/legs. | Re-stage in the declared vocabulary (knee/torso rise out of frame; hand carries the notebook down and lets go). | script-agent | No shot needs a head/face/legs; `s12` exit is frame-driven. |
| C-05 | Thấp | `script.md:261,:263` | Caption chunks `s10` c2 (32 chars) and `s12` c2 (34 chars) exceed the ≤ ~28 char rule. | Re-chunk both; chunks stay word-for-word substrings. | script-agent | Every chunk ≤ ~28 chars and a literal substring of its key. |
| C-06 | Thấp | `voice-performance.proposed.json` (`minimumPostClipHoldSeconds`) | The 5.80 s of holds are a Join obligation, not read by any tool. | Add one line to §5 + `voice-direction.md`: these 17 values + the 2.80 s END card must be written into `timeline.ts` as per-key holds and proven Σ = 11.20 s. | script-agent → video-director (Join) | §5 states the obligation; timeline holds sum to 11.20 s. |
| C-07 | Thấp | `voice-performance.proposed.json` (`s1,s2,s4,s9,s11`) | Five 0.00 s phrase junctions splice two TTS takes sample-adjacently; no measurement planned. | Keep 0.00 s but require voice-agent to confirm no click/prosodic break on those five keys (fix = 0.05–0.10 s pad or re-synthesise as one phrase, never change words). | script-agent → voice-agent | Limitation names the five keys; voice report carries a pass/fail per junction. |
| C-08 | Thấp | `voice.proposed.json:4,:10` | `s3`/`s8` are written-register noun/adjective triads with no verb. | Give each a spoken hinge costing no key (e.g. `s3` → `Trang sổ mỏng quá, chữ bút bi xanh, viết dở.`; `s8` → `Bụi phủ kín hết bìa, một vệt tay kéo qua.`); recompute §1. | script-agent | Each line reads as a spoken clause; §1 recomputed. |
| C-09 | Thấp | `voice.proposed.json:7,:15` | `s5b` quotes and `s13` `…` are in the synthesis input; a rendered ellipsis could lengthen `s13`. | Add a §5/§9 line: voice-agent reports measured `s5b`/`s13` durations vs 1.03 / 2.31 s and says whether the `…` cost time; strip it from the phrase text if it did. | script-agent → voice-agent | Report names both measured durations and the ellipsis outcome. |
| C-10 | Thấp | `script.md:327-332,:493-494` | §5's bound is modelled; the cited report measured 3.17 (→ 66.41 s, 64.56 s trimmed). | Add the observed floor as evidence and state the escalation (choose 60 s+ or an owner word, never a silent cut). | script-agent → video-director | §5 names the observed floor and the escalation. |
| C-11 | Thấp | `voice-performance.proposed.json:3,:9-15,:75` | Metadata: `canonicalText` points at `voice.proposed.json` (tool reads `voice.json`); `seed`/`silencePadding` are tooling, not engine controls. | Reword the engine note to distinguish engine parameters from tooling; re-point `canonicalText` at the phase-3 copy. | script-agent → video-director | Engine note distinguishes parameters from tooling; `canonicalText` names the real input. |

**Open Cao: 1 (B1). Open Trung: 3 (B2, C-01, C-02).** Open Thấp: A1–A5, B3–B8, C-03–C-11 — carried into
this fix pass (fix-in-one-pass discipline) but not by themselves gate blockers.

### What the reviewers could NOT verify
- `python3 -I scripts/pipeline.py audit` — reviewer runtimes had no shell; the director ran it → `ok` (exit 0).
- Anything rendered or heard (gate A is pre-render); the voice reference WAV does not exist yet (declared `pending`).
- `docs/motion-design-lab/script.md` (absent — see A4); the sibling's duration provenance (no `request.md` — see A3).

---

## Round 2 · three clean-context lenses

Round 2 re-ran all three lenses on the fixed packet (new reviewer agents, same protocol; none wrote or fixed anything).

| lens | file | score | verdict | open Trung |
|---|---|---:|---|---|
| A — fidelity / sources & claims / owner constraints | `script-review.fidelity.r2.md` | 8.8 | **revise** | NEW-1, NEW-2, NEW-3 |
| B — hook / specificity & emotional impact / structure | `script-review.hook.r2.md` | 9.0 | **revise** | T1, T2, T3 |
| C — spoken naturalness / timing / voice-direction & visual feasibility | `script-review.craft.r2.md` | 8.9 | **revise** | (C-07 carried) |

**Merged gate A score = 8.8 → `revise`.** Round-1 status: **22 of 24 closed** — only **B4** (headline list) and **C-07**
(join list) remain open, and both are the source of new contradictions.

What all three lenses independently reconfirmed: **175 syllables = 129 owner + 46 `[ADD]`** — silence **11.20 s** —
totals **50.97 / 52.87 / 53.88 / 56.07 / 58.50 / 59.81 s** — break-evens **3.586 / 4.510** — **17/17 keys, 33
phrases** byte-for-byte — every owner line present — `s6` still 11 syl and `trước` everywhere.

### Round 2 · consolidated tickets (deduplicated)

| id | sev | lens ids | issue | concrete change | acceptance check |
|---|---|---|---|---|---|
| **R2-1** | **Trung** | A NEW-1, B T3 | "The lanyard … never moves again … not anywhere in the packet" contradicts the same paragraph ("the strap's coil is still relaxing flat"), the `s1` cell, the post-`s1` hold and `s4`/`s6`/`s12`. | Scope immobility to the **badge plate**: the plate never lands again; the **strap** finishes relaxing flat in `s1`, straightens onto a torso at `s4`, hangs at `s6`, returns at `s12`. Fix `script.md:156-159`, `:242`, `:331`, `:470` and `hook-options.md:202`. | No sentence says the lanyard/coil "never moves"; the only immobile element named is the badge plate. |
| **R2-2** | **Trung** | A NEW-2, B T4 | Three statements disagree about `s1`'s on-screen text: `brief.md:82` promises a `Rồi bạn đi làm.` caption; `script.md:178` says the caption layer is empty; `:276` says "6 words instead of the spoken 8" (it is 7); `:585` claims 17/17 mute-complete. | There is no room for that caption (headline clears at the `s2` boundary). Delete the claim from `brief.md:82`; add the second-sentence omission to §4's named departures; `8` → **7**; restate `:585` as "14 caption keys + 3 headline keys, and `s1`'s second sentence is carried by the badge and by `s4`". | `brief.md` and `script.md` name the same on-screen strings for `s1`; arithmetic recomputes; no full-mute-complete claim for `s1`. |
| **R2-3** | **Trung** | A NEW-3, C C-07 | The "five 0.00 s junctions" list names key boundaries that have 0.25–0.45 s holds; the real 0.00 s joins are **inside** keys, plus the `s5a`→`s5b` boundary. Following the text literally would merge keys and break byte-for-byte. | Rewrite `script.md:361-365` and sidecar `:664` to name **six** 0.00 s joins: intra-key `s1`, `s2`, `s4`, `s9`, `s11` **plus the `s5a`→`s5b` boundary**. Fix = `pauseBeforeSeconds` inside a key; never a key merge, never a word change. | No key boundary with a hold is called a 0.00 s junction; each join is named by key and by the two phrases either side; no instruction can merge keys. |
| **R2-4** | **Trung** | B T1 | The packet says **three** headline keys and **two** departures, but §3 prints **six** headlines (`s7`, `s10`, `s14` extra). `s14`'s headline is an imperative while the delivery is "an offer, not advice". | Delete the headline strings from the `s7`/`s10`/`s14` on-screen cells → **"— (caption only)"**, matching §4; align `brief.md:88,91,95` to "caption". Do **not** declare more departures. | A search returns exactly three headline keys (`s1`, `s5b`, `s15`); §4 and §10's "only two departures" are literally true. |
| **R2-5** | **Trung** | B T2 | The lanyard's final state is absent from `s16`/`END` while §2.2 says it is "still on the boards". | **Director decision: keep it in frame at `s16`/`END`** — lower-left edge, badge plate **face-up**, outside the warm bar, small. Add it to the `s16` and `END` image cells and to §2.2's chain and §6.4. | `s12`, `s16`, `END`, §2.2 and §6.4 name the same final position; gate E stills can check it. |
| **R2-6** | **Trung** | C C-12 | The trim row `s13 0.25 → 0.20` cannot execute: `s13`'s post-clip hold is 0.30; its 0.25 is the intra-clause `Nhưng` pause. `s3` also has two 0.25 values. | Write the row as **`s13` post-clip hold 0.30 → 0.25 (−0.05)`** and say `s3`'s 0.25 is its post-clip hold. Keep 1.85 s / 3.455 floor. | Every trim row names the field; applying the set yields 9.35 s and 60.00 s at 3.455. |
| **R2-7** | **Trung** | C C-13 | `voice-direction.md` says "never from volume" then "volume drops on `bận đến thế`"; the engine declares volume unsupported. | Distinguish **whole-line level** (mix/clip gain) from **within-line dynamics**: the three beat lines are *smaller* (closer, less air, fewer consonants); the line *thins* on `bận đến thế`, no level automation. | No sentence asks the engine for volume; `s11` is performable without a volume parameter. |
| R2-8 | Thấp | A NEW-4 | "the owner's own order" is false: `s1` = L1+L3, then L2. | Name the L3-before-L2 move in the same sentence (`script.md:12-13`, `voice-direction.md:7-8`). | Wherever playback order is claimed, the reorder is named. |
| R2-9 | Thấp | A NEW-5 | "every state and the action that makes it" — the `s3`→`s7` close is a time ellipsis, not a shot; "shut exactly once" overclaims. | Add the time-ellipsis note once at `script.md:171`; restate §6.4 as "open on screen frame 0–`s3`, shut when lifted out at `s7`". | No sentence claims every state change has an on-screen action. |
| R2-10 | Thấp | A NEW-6 | "3.6–4.4 is the band the engine actually produced" contradicts the 3.17–4.45 evidence two lines above. | "…is the band this plan **models**; the same engine has measured 3.17–4.45 in this repo". | No file calls the model "produced"/"measured". |
| R2-11 | Thấp | B T5 | `s15`'s second chunk is drawn "after the headline clears" but no instant is defined. | Add the formula: clear at `5 ÷ rate + 0.25` after the key's clip start (**1.53 s at 3.9; 45.92 s absolute**), keyed to the measured end of phrase 1; chunk 2 holds ≥ 1.0 s. | Clear instant is a formula plus a planning-rate value; no frame shows both layers. |
| R2-12 | Thấp | B T6 | The END fallback "the card is cut" contradicts §8 (the owner's topic line is the card). | Fallback = reduce type weight/dwell or move the card earlier over the same resolved image; **the owner's text is never deleted**; escalate if E insists. | Fallback matches §8. |
| R2-13 | Thấp | C C-14 | `s3` `trang sổ` is written-register; `s8` `vệt tay kéo qua` nominalises the action. Both are `[ADD]`. | `s3` → `Trang giấy mỏng quá, chữ viết tay, viết dở.` and `s8` → `Bụi phủ kín hết bìa, tay kéo vệt qua.` (9 syl each; update canonical, sidecar phrases, §3 cells, §4 chunks, §7). | Same syllable count; captions literal substrings; canonical and sidecar agree. |

**Open Cao: 0. Open Trung: 7 (R2-1 … R2-7).** Thấp 6 (R2-8 … R2-13), fixed in the same pass.

**Rejected on purpose** (recorded so they are not re-litigated): lens B's weakness #2 rewrite of `s12`
(`…muốn làm nhạc công nữa.`) would edit an **owner line** — forbidden. Lens B's `s4` `…đầy quá.` (+1 syllable)
would move every mark and the 175 identity for a marginal gain — not adopted.

**Process note fixed with this round:** `owner-notes.md` N1/N2 were still `pending` while `brief.md:72` claimed they
were applied. The director marks them `done:` at this transition.

---

## Round 3 · three clean-context lenses (fix-round cap reached)

Round 3 re-ran all three lenses on the R2-fixed packet (three new reviewer agents; none wrote or fixed anything).

| lens | file | score | verdict | open Trung |
|---|---|---:|---|---|
| A — fidelity / sources & claims / owner constraints | `script-review.fidelity.r3.md` | 8.9 | **revise** | R2-7 (carried), N3-1 |
| B — hook / specificity & emotional impact / structure | `script-review.hook.r3.md` | 8.8 | **revise** | R3-1 |
| C — spoken naturalness / timing / voice-direction & visual feasibility | `script-review.craft.r3.md` | 8.9 | **revise** | C-R3-1, C-R3-2, C-R3-3 |

**Merged gate A score = 8.8 → `revise`.** Round 2 status: **13 of 13 closed on their stated acceptance**, but four
of those closures left prose residues that the acceptance checks did not test (`R2-3` → C-R3-1, `R2-5` → C-R3-3,
`R2-7` → R2-7 residue, `R2-11` → C-R3-4). No owner line, syllable, key or timing changed in this round.

All three lenses independently reconfirmed: **175 syllables = 129 owner + 46 `[ADD]`** — silence
**2.60 + 5.80 + 2.80 = 11.20 s** — totals **50.97 / 52.87 / 53.88 / 56.07 / 58.50 / 59.81 s** — break-evens
**3.586 / 4.510** — **17/17 keys, 33 phrases** byte-for-byte — every owner line present in order (with the declared
L3-before-L2 move) — `s6` 11 syllables and `trước` everywhere.

### Round 3 · consolidated tickets (deduplicated)

| id | sev | lens ids | issue | concrete change | acceptance check |
|---|---|---|---|---|---|
| **R3-A** | **Trung** | A R2-7 (carried), C C-R3-5 | "quieter" / "drops in level" still describes within-line performance in five places — `script.md:258,262`, `voice-direction.md:101,171,175`, sidecar `:305,:321,:434,:481` — while `voice-performance.proposed.json:16` declares `volume` unsupported. Lens C files it Thấp, lens A keeps it Trung at the emotional core; merged at the higher severity. | Replace every within-line level word: `s6` → "**smaller and lower**" / "loses energy and stops"; `s10` → "**smaller, closer**"; `s11` → "**loses energy and stops**". Any whole-line difference is **clip gain in the mix**, never an engine parameter. Keep `s11`'s "thins on `bận đến thế`". | `grep -ni "quieter\|drops in level"` returns nothing in `script.md`, `voice-direction.md`, `voice-performance.proposed.json`; `s10`/`s11` remain performable with `referenceAudio` + `denoise` only. |
| **R3-B** | **Trung** | A N3-1 | `s2`'s action is called "the page **turning**" (`script.md:253`) and "page **turned** `s2`" (`:504`), while the same cell says the fingertips "lift the page's lower corner and let it fall" and the badge plate is **unmoved**. A builder who stages a page turn moves the plate that carries the frame-0 thesis. | In both places: "**the page's lower corner is lifted and let fall**"; §6.4 row → "corner lifted `s2`". Never "page turned" for this beat. | No file says `s2` turns the page; every `s2` action names the corner lift; the plate stays where frame 0 put it. |
| **R3-C** | **Trung** | C C-R3-1, A N3-2 | `script.md:15` says `s5a` + `s5b` are "split across a **real gap** … (`13.76 s`)", and the `s5b` row (`:44`) is titled "the real split gap". At 13.76 s the boundary is **0.00 s**; the 0.20 s gap sits **inside `s5a`** after `Mỗi lần định mua đàn,` (≈12.79 s at 3.9). A voice-agent or timeline builder following the prose inserts 0.20 s at the boundary → 56.27 s and every mark shifts. | Rewrite `:15`: "`s5a` + `s5b` are owner line 4 split into two keys; the **0.20 s gap sits inside `s5a`** after `Mỗi lần định mua đàn,` and the split itself is **0.00 s** — the two clips butt at 13.76 s." Relabel the `s5b` row `:44` → "**the deferred sentence — 0.00 s boundary**". | `grep -n "split across" script.md` returns nothing; `:15`, §5 join 6 (`:387`) and sidecar `:664` agree; total remains **56.07 s at 3.9**. |
| **R3-D** | **Trung** | B R3-1, C C-R3-2 | §2.1 defines **`L0`** as "cold grey … **no warm light is in the frame**" and lists `s8`, `s9`, `s12`, `s13`, `s14`, `s16` among its shots — all post-`s7`. Their own cells say "motes lift into the **warm** light" (`:260`), "the **warm** bar sits across the fold" (`:261`), "the **warm** bar lying across a used page" (`:264`), "the **warm** rectangle holds" (`:268`); `:138` says `s1`–`s6` are the only cold frames. `s16` is additionally labelled "**Baseline `L0` state of the warm bar**" — an oxymoron. Read literally, the finale is cold. | §2.1: trim **`L0`**'s where-cell to the pre-turn shots (`s1`, `s2`, `s3`, `s5a`, `s5b`); add **one row `L2-held`** for `s8`, `s9`, `s12`, `s13`, `s14`, `s16`: "the same window, warm, unchanged from `L2`/`L3` — no arrival, no new light". Replace `s16`'s label with "**held `L2`/`L3` state, warm, unchanged**" and `:462`'s parenthetical with the same id. | §2.1 contains no id whose state text contradicts the shots it lists; every `L0` reference is pre-turn; `s16` and `END` resolve to one named warm state; a reader of §2.1 alone cannot produce a cold finale. |
| **R3-E** | **Trung** | C C-R3-3, B R3-2 | `s16`/`END` place the lanyard at the "**lower-left edge of the frame**" with **no y-range**. The packet reserves the bottom **210 px** of a 1920 px frame (`:279-280`; `brief.md:136-137`), so "edge" most naturally sits under platform chrome — and the plate is the hook's visual answer. Lens B files it Thấp, lens C Trung because R2-5's acceptance ("gate E stills can check it") is unexecutable without a coordinate; merged at the higher severity. | Add the range to `s16`, `END`, §2.2's chain (`:162`) and §6.4 (`:503`): "**plate centre y ≈ 1450–1620; the plate stays fully above y = 1710** — if the strap runs off-frame, the plate does not." | `s16` and `END` give a y-range above 1710 for the plate; gate E's 9:16 phone mock with platform chrome shows the plate unoccluded; no caption pill overlap. |
| R3-F | Thấp | C C-R3-4 | `s15`'s chunk-2 window is `4 ÷ rate`: 1.026 s at 3.9, 1.000 at 4.0, 0.976 at 4.1, 0.909 at 4.4. The claim "**≥ 1.0 s**" is unqualified. | Scope it: "**≥ 1.0 s at rates ≤ 4.0**; at faster measured rates the chunk holds into the 0.35 s post-clip hold". | The claim is true at every rate in the extension band or explicitly rate-scoped; headline and chunk 2 never share a frame. |
| R3-G | Thấp | C C-R3-6 | `175/4.95 + 14.20 = 49.5535` → **49.55**, not 49.56; `175/4.89 + 14.20 = 49.9873` → **49.99**, not 50.00. Exact bound `4.8883` is already **4.888**. | "**4.95 → 49.55 s; 4.89 → 49.99 s; the exact bound is 4.888**". | The line matches a recompute; the extension ceiling remains **4.888**. |
| R3-H | Thấp | A N3-3 | `s5b`'s cell calls the ink colour "the **only time the page's ink colour appears on a screen**", but `s3` shows the same `#243A8C` ballpoint as ink on the page. | "…the only time the ink colour is used as a **graphic colour** rather than as ink on paper". | No sentence denies `s3`'s blue; the `s5b` claim names what is unique. |
| R3-I | Thấp | A N3-4 | §2.2 calls the `s3`→`s7` cut a "**time ellipsis**" running forward, but `s7` is the **finding** ("Vài năm sau … bạn tìm thấy"); as written it implies the notebook was closed and re-boxed between `s3` and `s7`. | Name the direction once: "the `s3`→`s7` cut **returns to the finding** — the notebook is still shut in the box; it is a rewind to the moment before `s1`, not a forward ellipsis." Keep every shot and plate state. | The cut is named as a return to the finding; no sentence implies a second close or pack; §6.4 and §2.2 agree. |
| R3-J | Thấp | B R3-3 | §10's row title is the universal "Every key with a voice line has a mute-complete text path" with a ✅, while its own body says `s1` "is **not** fully readable as text". | Retitle: "**Every key with a voice line has a mute-complete text path, except the one named carve-out (`s1`)** — **16/17 ✅**"; body unchanged. | The title is literally true; the ✅ count matches the body; the carve-out is named in the title. |

**Open Cao: 0. Open Trung: 5 (R3-A … R3-E).** Thấp 5 (R3-F … R3-J), fixed in the same pass.

**Fix-round cap.** This is the third fix round. If any Trung ticket survives the next lens pass, the director
escalates in `HANDOFF.md` instead of opening a fourth round.

**What the reviewers could NOT verify (unchanged from round 2).** `pipeline.py audit` — reviewer runtimes have no
shell; the director runs it and records the result. Nothing rendered or heard exists at gate A; the voice reference
WAV is still `pending`. Lanyard occlusion against platform chrome and hand articulation both need stills, not prose.

### Round 3 · fix pass + director verification

`script-agent` closed **10 of 10** tickets in one pass (`R3-A` … `R3-J`). The director re-verified independently,
not from the producer's table:

| invariant | re-checked result |
|---|---|
| owner lines L1–L12 | 12/12 keys byte-equal to `request.md` (with the two declared moves: the `Ngày trước,` opener drop and `s1` = L1+L3) |
| syllables | **175** = 129 owner + 46 `[ADD]`; every per-key count in `script.md` §1 equals `voice.proposed.json` (s1 **11**, s2 12, s3 9, s4 8, s5a 8, s5b 4, s6 11, s7 17, s8 9, s9 7, s10 10, s11 11, s12 13, s13 9, s14 7, s15 9, s16 20) |
| §1 table arithmetic | ΣpauseAfter **2.60** + Σpost-clip hold **5.80** + END **2.80** = **11.20 s**; totals **50.97 / 52.87 / 53.88 / 56.07 / 58.50 / 59.81 s**; break-evens **3.586 / 4.510** |
| performance phrases | 17 keys, **33 phrases**, `" ".join(phrases)` byte-equal to the canonical line for all 17 |
| accent words | **39**, all Vietnamese |
| light plan | §2.1 now `L0` = `s1 s2 s3 s5a s5b` · `L1` = `s4 s6` · `L2` = `s7` · `L3` = `s10 s11` · `L4` = `s15` · **`L2-held`** = `s8 s9 s12 s13 s14 s16` — no shot twice, none missing, and `s1`–`s6` remain the only cold frames |
| banned strings | 0 hits for `split across`, `page turn`, `baseline state of the warm bar`, `drops in level`, `49.56`, `time ellipsis`; the only remaining "quieter" instances are explicit negations (`voice-direction.md:70`, `script.md:267`) |
| audit | `python3 -I scripts/pipeline.py audit giac-mo-tu-bo` → **ok** (exit 0) |

**Director wording fix D-1 (recorded, one clause).** `script-agent` applied `R3-I` verbatim, including the phrase "a
rewind to the moment before `s1`", which the agent itself flagged as readable as story chronology. The director
replaced it with "the shot order goes **back to the present finding**, not forward, so this is not a forward time
ellipsis" in `script.md` §2.2 and aligned §6.4 to "cuts back to the present finding, not forward". No shot, line,
timing or caption changed. The director also corrected the round-3 `pipeline.py` stage note, which had mis-labelled
`C-R3-1` as the volume residue; the authoritative ticket set is the table above.
