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
