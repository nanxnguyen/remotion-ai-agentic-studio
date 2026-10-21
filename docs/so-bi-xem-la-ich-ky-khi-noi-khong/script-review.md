## Round 1 — independent Gate A review (2026-10-22)

**Scope read:** `research.md`, `brief.md`, `script.md`, `hook-options.md`, `voice.proposed.json`, `voice-direction.md`, and `voice-performance.proposed.json`. This is an independent artifact review; no producer artifact was changed.

### Viewer-first read

I understand a person frozen before sending an automatic `Ok`, then noticing the concrete cost of that reflex and choosing one calm reply instead. The stopped thumb, cold coffee, and quiet laptop close make the desired feeling legible rather than turning the requester into a villain (`script.md:15-21`).

Attention is most likely to soften at **17.81 s / s5**: its “lấy nốt phần sức còn lại” summarizes the cost after `s3` has already shown it, instead of advancing the physical action (`script.md:19`).

### Hook engineering check

- **0–1 s:** the exact first frame is a live 21:47 chat with `Nhờ chút nhé?`, an already typed `Ok`, and the thumb stopped over Send; no logo or fade (`script.md:7`, `script.md:15`; `hook-options.md:15`). Its muted, upper-third hook text is `KIỆT SỨC VẪN GÕ “OK”`.
- **1–3 s:** the tension is: *why can this ordinary request make the narrator accept work while exhausted, and will that `Ok` be sent?* The required spoken opening and the on-screen remembered quote make it understandable without sound by 3 s (`script.md:15`; `hook-options.md:16`). A viewer with no context has a specific observable conflict, not a title card.
- **3–8 s payoff:** the unsent reply is visible by 5.13 s; task tabs arrive by 7.8 s (`hook-options.md:17`). This is a truthful first payoff, with no diagnosis, statistic, or promise about another person's reaction.
- **Winner comparison:** H1 beats rejected H2 because H2 has the timestamp/object but withholds the personal stake; H1 joins the required fear to the same concrete action (`hook-options.md:9-10`, `hook-options.md:20`). H1 is also stronger than H5, whose third-coffee payoff would not appear until after second 8 (`hook-options.md:11`).
- **Resolution:** `s6` changes the same thumb from `Ok` to a capacity-based refusal, and `s7` closes the laptop into a 1.80 s silent hold (`script.md:20-21`, `script.md:37-43`). This resolves the opening promise without claiming the relationship or workload is fixed.

### Line-by-line and spoken pass

| Key | show / tell | Spoken finding |
|---|---|---|
| s1 | tell (mandated) | The mandatory line is verbatim; its screen action supplies the concrete evidence. It is exactly 20 space-separated syllables, at the one-breath ceiling. |
| s2 | show | The request and hovering hand are concrete, but `đã chạm gần chữ Ok` is not idiomatic spoken Vietnamese. |
| s3 | show | Three sensory observations land naturally; task rows, extinguished bays, and cold coffee are drawable. |
| s4 | tell | The re-hook names the internal fear clearly at 13.67–17.81 s; it follows, rather than duplicates, the concrete cost. |
| s5 | tell | The contrast of a small `Ok` and remaining energy works emotionally, but `lấy nốt phần sức` is an abstraction after the prior visual proof. |
| s6 | show | A specific first-person refusal is speakable, neutral, and does not promise an outcome. |
| s7 | tell | The close contains two sensory actions before its earned first-person conclusion; the planned phrase breaks make the 22-syllable key speakable if they are made executable. |

There are two consecutive tell lines (`s4–s5`), never more than two. No line contains an English/TTS-pronunciation risk; no individual planned phrase is longer than a practical breath. Situation → cost (`s1–s3`) → turn/re-hook (`s4`) → action/climax (`s6`) → resolution/hold (`s7`) is clear. There are exactly three paired highlight beats (`s1`, `s4`, `s6`) and the climax is in a different shot from the no-CTA ending (`script.md:35-43`).

### Fidelity, claims, timing, and voice contract

- The mandated `s1` text is byte-for-byte present in both canonical sources (`brief.md:17`; `script.md:15`; `voice.proposed.json:2`). The quote remains one narrator's remembered words, with required quotation marks and mono-italic treatment rather than a second voice (`script.md:7`, `voice-direction.md:7`, `voice-performance.proposed.json:22`).
- All requested beats are present: the 21:47 cover, same-thumb contrast, task list, sole lit desk, third coffee, refusal/send, laptop close, warm exit, 7 shots, and the ≥1.5 s silent hold (`brief.md:21-25`; `script.md:15-21`). The workplace UI is labeled `minh hoạ` (`script.md:17`). The script avoids a villain, diagnosis, advice list, unsupported statistic, and the three prohibited prior-video visual systems (`brief.md:21-25`, `brief.md:99-101`).
- Every factual/contextual statement is mapped either to user story facts F1–F3/U1 or to the limited workplace context S1–S2; the conclusion is consistently a first-person action, not universal advice (`research.md:20-33`, `research.md:75-81`; `script.md:15-21`). No unsupported material claim was found.
- The declared count is correct: `20 + 15 + 18 + 16 + 15 + 16 + 22 = 122`; `122 / 4.1 = 29.76 s`, plus 1.75 s planned gaps and the 1.80 s hold = **33.31 s**, within the 30–40 s target (`script.md:23-33`, `voice-direction.md:13`). I independently concatenated every performance phrase with one space: all seven values are byte-identical to `voice.proposed.json`.
- Directions carry intent, emotion, emphasis, contour, and declared supported/unsupported engine controls; none contaminates speech or captions (`voice-direction.md:17-31`; `voice-performance.proposed.json:9-12`). The manual tone table exists and identifies/reviews every listed risk construction (`voice-direction.md:33-45`). The unavailable `tone-probe.py` is truthfully disclosed, so this review does not claim tool coverage.

### Score table

| Rubric item | Score | Evidence |
|---|---:|---|
| 1. Fidelity | 9.7 | Mandatory line, narrator, quote treatment, action constraints, and ending hold are explicitly specified (`brief.md:16-25`; `script.md:15-21`). |
| 2. Hook clear ≤3 s | 9.3 | Strong frame-0 action/text, truthful promise, payoff by 5.13/7.8 s, and justified H1-over-H2 choice (`script.md:7,15`; `hook-options.md:9-20`). |
| 3. Clarity / retellability | 9.2 | One night's automatic `Ok` becomes one specific refusal; ending resolves the original tension (`script.md:18-21`). |
| 4. Spoken naturalness | 8.0 | Conversational overall, but s2 has an unnatural construction (`script.md:16`). |
| 5. Timing feasibility | 9.2 | Verified 122-syllable/33.31 s plan is inside 30–40 s; final measured clips still control (`script.md:23-33`). |
| 6. Source accuracy | 9.4 | Claim plan and script keep sources/inferences bounded; no universal or diagnostic claim (`research.md:28-40,75-81`; `brief.md:71-79`). |
| 7. Visual feasibility in Remotion | 8.3 | Art direction, frame-0, safe-zone intent, and concrete props are feasible; s3–s4 lack an acting character hero in a story profile (`brief.md:81-97`; `script.md:17-18`). |
| 8. Specificity / emotional impact | 9.0 | Sensory props, same-finger contrast, three highlights, restrained turn, and 1.80 s hold are earned (`script.md:17-21,35-43`). |
| 9. Story profile content test | 7.8 | `story` requires a consistent character acting in every shot; s3 and s4 are objects/UI without the narrator acting (`.agents/skills/ray-pineline-worflow-agent/SKILL.md:338-340`; `script.md:17-18`). |
| 10. Voice direction feasibility | 7.7 | Direction and byte fidelity are good, but every internal clone pause is only in the performance proposal, not split keys or `voice-expressive.json` as the Gate-A pause contract requires (`script.md:15-21`; `voice-performance.proposed.json:23-106`). |
| **Overall mean** | **8.8** | **Revise: items 9 and 10 are below 8; open Trung tickets remain.** |

### Tickets

| id | severity | where | evidence | concrete required change | owner | acceptance check |
|---|---|---|---|---|---|---|
| A-R1-01 | Trung | `script.md:15-21`; `voice-performance.proposed.json:23-106` | The plan requires 0.12–0.25 s intra-key silences in every key, but there is no `voice-expressive.json` and no split canonical keys. Gate A requires a split key or a live `voice-expressive.json` entry for every intended cloned-voice pause; punctuation alone is not an execution plan. | Add a `voice-expressive.proposed.json` / accepted `voice-expressive.json` mechanism recognized by the voice stage, or split only the required phrase clips into executable keys while preserving each canonical line. Map every listed gap (including s7's 0.14/0.14 s) and keep the 1.80 s final hold as timeline silence. | script-agent (director to confirm accepted file route) | For every key, the executable phrase sequence + one-space joins reproduce `voice.proposed.json` byte-for-byte; the gap map sums to 1.75 s; no gap relies only on punctuation; planned total remains 33.31 s or within 30–40 s after a recalculation. |
| A-R1-02 | Trung | `script.md:17-18` (s3–s4) | The selected `story` profile requires a consistent character acting out **each** beat. s3 is props/UI only and s4 is quote/cursor only, so the protagonist disappears through the emotional turn. | Keep the no-face constraint, but revise s3 to show the same narrator's hand withdrawing from the third coffee/hovering beside the unfinished reply as rows lengthen, and s4 to keep that identifiable hand/finger held over the cursor as the quote collapses. Preserve the established phone/desk material world. | script-agent | Every shot table row names an observable action by the same narrator/hand; s3 and s4 add no second person, no face-to-camera, umbrella/rain, deleted-message, or `mệt không?` imagery. |
| A-R1-03 | Trung | `script.md:16`; `voice.proposed.json:3`; `voice-performance.proposed.json:36-39` | “Ngón tay tôi đã chạm gần chữ Ok” is not natural Vietnamese speech. | Replace the s2 canonical line with: `Tin nhắn chỉ viết: “Nhờ chút nhé?” Ngón tay tôi sắp chạm vào chữ Ok.` Update the matching script/performance phrase text and timing row. | script-agent | The three canonical surfaces match byte-for-byte; s2 stays at 15 space-separated syllables and its planned shot timing is recalculated. |
| A-R1-04 | Thấp | `script.md:19` (s5) | “lấy nốt phần sức còn lại” tells the cost immediately after s3's concrete proof. It does not break the story, but is the softest retention beat. | Consider replacing s5 with `Một chữ Ok nhìn rất nhỏ. Nhưng nó giữ tôi lại trước màn hình thêm tối nay.` if it fits the final rhythm; otherwise retain only with a stronger paired hand action from A-R1-02. | script-agent | If changed, canonical/performance/script copies remain byte-identical and total timing stays in range; if retained, the s5 action visibly advances beyond the already shown cold coffee/task rows. |

### Weakness hunt (three concrete rewrites)

1. s2 naturalness: `Ngón tay tôi đã chạm gần chữ Ok.` → `Ngón tay tôi sắp chạm vào chữ Ok.` (A-R1-03).
2. s5 abstraction: `Một chữ Ok, nhìn rất nhỏ, lại lấy nốt phần sức còn lại của tôi.` → `Một chữ Ok nhìn rất nhỏ. Nhưng nó giữ tôi lại trước màn hình thêm tối nay.` (A-R1-04; use only if timing retains the payoff).
3. s4’s disembodied reveal: `TÔI SỢ GÌ?` over quote/cursor only → retain that text but add the same held finger over the cursor while the quote folds away (A-R1-02); this is a visual rewrite required by the story-profile rule.

### Previous-round fixes and closure placeholder

No prior `script-review.md` section or producer closure table exists: **Round 1 / not applicable**.

| id | producer status | reviewer verification / evidence |
|---|---|---|
| A-R1-01 | pending | pending next fresh review |
| A-R1-02 | pending | pending next fresh review |
| A-R1-03 | pending | pending next fresh review |
| A-R1-04 | pending | pending next fresh review |

### Not verified from script artifacts

- Actual Thanh Long Nâng Cao naturalness, CER, phrase-assembly behaviour, measured clip durations, and whether the final silent 1.80 s contains truly no residual BGM/SFX.
- Rendered first-frame phone legibility, real safe-zone placement, mono-italic distinction at phone size, the same-finger continuity, or the absence of accidental second-person imagery.
- Source-page availability/current wording beyond the research packet, and post-publication stop-scroll or retention. A script-only review cannot prove either.
- `scripts/tone-probe.py` is absent and was not run (`voice-direction.md:33-45`); the manual table is evidence of review, not a substitute for unavailable tool output.

**score: 8.8  verdict: revise**

Top 3 fixes: A-R1-01 executable internal-pause contract; A-R1-02 visible same narrator in s3–s4; A-R1-03 natural s2 wording. Gate A cannot pass while either Trung ticket remains open.

## Round 1 — producer closure (2026-10-22)

All tickets were fixed together. This is producer evidence only; a fresh clean-context reviewer decides whether the Gate A fixes pass.

| id | fixed / not fixed / disagree | evidence |
|---|---|---|
| A-R1-01 | fixed | `voice-expressive.proposed.json` provides every executable `pause_after` phrase split; `voice-direction.md` §Voice-performance limits maps all nine gaps to **1.75 s** and the separate `s7` timeline hold to **1.80 s**. A read-only contract check joins each key with one ASCII space to `voice.proposed.json` and validates `gen-voice-clone.py` legacy-plan parsing. |
| A-R1-02 | fixed | `brief.md` Shot table rows 2–7 and `script.md` rows `s2–s7` now name the same thumb/hand in every beat. `s3` touches the third coffee and returns to the unfinished reply; `s4` holds over the cursor; no second person, face, umbrella, rain, deleted-message, or `mệt không?` image was introduced. |
| A-R1-03 | fixed | `script.md` `s2`, `voice.proposed.json` `s2`, `voice-performance.proposed.json` `s2`, and `voice-expressive.proposed.json` `s2` use exactly `Tin nhắn chỉ viết: “Nhờ chút nhé?” Ngón tay tôi sắp chạm vào chữ Ok.` It remains 15 tokens / 3.66 s plus 0.25 s. |
| A-R1-04 | fixed | Adopted the suggested stronger action: `s5` is now `Một chữ Ok nhìn rất nhỏ. Nhưng nó giữ tôi lại trước màn hình thêm tối nay.` The same finger slides the third coffee aside and rests on the trackpad (`script.md` `s5`). Timing recalculates to 124 tokens, 30.24 s speech, 1.75 s executable gaps, 1.80 s hold = **33.79 s**. |

## Round 2 — independent Gate A review (2026-10-22)

**Scope and method:** Fresh reviewer read `research.md`, `brief.md`, `script.md`, `hook-options.md`, `voice.proposed.json`, `voice-expressive.proposed.json`, `voice-direction.md`, `voice-performance.proposed.json`, and Round 1 plus its producer closure. I also performed the read-only phrase-contract check: every expressive and performance phrase sequence joins with one ASCII space to its canonical key; all seven keys matched, nine internal gaps total **1.75 s**, and the separate `s7` timeline hold is **1.80 s**.

### Viewer-first read

I feel the tiny, automatic `Ok` turning into a physical late-night trap: the stopped thumb, colder coffee, and shrinking office make the fear land before the refusal releases it. I understand one retellable point: tonight the narrator can name their remaining capacity without proving goodness through exhaustion (`script.md:15-21`).

The first plausible attention softening is **17.81 s / s5**, because its idea is still reflective after the very concrete s3; the coffee-slide and trackpad action now move the story forward enough that this is a non-blocking craft risk, not a broken beat (`script.md:19`).

### Hook engineering check

- **First second:** frame 0 is an observable 21:47 request, `Nhờ chút nhé?`, an already typed `Ok`, and the narrator's thumb stopped above Send—not a logo, blank, or title fade. The muted upper-third hook is `KIỆT SỨC VẪN GÕ “OK”` (`script.md:5-7,15`; `hook-options.md:9,15`).
- **First three seconds:** the required first-person line creates one truthful tension—why is this ordinary request enough to make an exhausted narrator accept, and will the `Ok` go out? The remembered words enter as a visibly quoted mono-italic memory at 1.70 s, not a second speaker (`script.md:7,15`; `brief.md:17-18`).
- **Payoff and resolution:** the `Ok` remains unsent at 5.13 s; work tabs are visible by about 7.8 s and the task-list/cold-coffee cost follows in s3. The same thumb sends one capacity-based reply in s6, then s7 closes the laptop and holds silence for 1.80 s (`hook-options.md:16-18`; `script.md:17,20-21`). This pays the promise without claiming the requester changes or the workload is solved.
- **Winner comparison:** H1 remains stronger than H2 because H2 gives the timestamp but withholds the personal stake; it also beats H5 in this cut because H5's coffee proof would miss the before-8-second payoff (`hook-options.md:9-11,20`). Hook is source-bounded to the user-supplied premise, not an unsupported workplace generalisation (`research.md:20-25,67-73`).

### Line-by-line, spoken, structure, and claims pass

| Key | show / tell | Result |
|---|---|---|
| s1 | tell (mandatory), visually grounded | Exact mandated line; 20 tokens is at the planned one-breath ceiling, with the stopped-thumb picture carrying it (`brief.md:17`; `script.md:15`). |
| s2 | show | Natural revised sentence, ordinary request, and hover action; 15 tokens (`script.md:16`; `voice.proposed.json:3`). |
| s3 | show | Hand touches the cold third coffee and returns to the unfinished reply while rows/lights change; three short sensory phrases (`script.md:17`; `brief.md:108`). |
| s4 | tell, earned re-hook | Same index finger stays over the cursor while the memory folds into it; names the contrast rather than diagnosing it (`script.md:18`; `brief.md:109`). |
| s5 | tell, action-anchored | The small `Ok` is abstract language, but sliding the third coffee aside and resting on the trackpad advances the physical choice (`script.md:19`; `brief.md:110`). |
| s6 | show | A specific, first-person refusal is typed and sent by the same thumb; no promised response (`script.md:20`; `research.md:37-40,77-81`). |
| s7 | show then earned tell | Laptop close and warm exit precede the final first-person conclusion; 1.80 s silence follows in its own hold (`script.md:21,29-33`). |

There are never more than two consecutive tell-led lines (s4–s5). Situation/cost are s1–s3, the re-hook is s4 at 13.67–17.81 s, climax is s6, and resolution is s7; the three highlight beats are H1/s1, H2/s4, H3/s6, with no CTA sharing the climax shot (`script.md:35-43`). Every factual/contextual statement remains a user-story fact, a cited limited workplace context, or clearly first-person creative inference; no diagnostic, statistic, universal result, villain, or unsupported claim appears (`brief.md:71-79`; `research.md:28-40,75-81`).

### Previous-round closure verification

| id | producer status | reviewer verification / evidence |
|---|---|---|
| A-R1-01 | fixed | **Verified.** `voice-expressive.proposed.json:2-31` has every intended phrase boundary; its `t` values reassemble all `voice.proposed.json:2-8` values exactly with one ASCII space. Its `pause_after` values total 1.75 s; `voice-direction.md:29-32` and `voice-performance.proposed.json:100-105` keep the 1.80 s ending hold separate. `gen-voice-clone.py:84-161,430` accepts legacy `t`/`pause_after`, rejects unsupported controls, validates phrase reassembly, and applies assembly padding. |
| A-R1-02 | fixed | **Verified.** Every shot now has the same narrator's visible hand/thumb action; specifically s3 touches the third coffee and returns to the reply, and s4 holds the index finger above the cursor (`brief.md:106-112`; `script.md:15-21`). The packet specifies no second voice/person, no face-to-camera, and none of the prohibited prior-video imagery (`brief.md:18,23,99-101`). |
| A-R1-03 | fixed | **Verified.** The natural s2 text is identical in `script.md:16`, `voice.proposed.json:3`, `voice-expressive.proposed.json:7-8`, and `voice-performance.proposed.json:37-38`: 15 tokens / 3.66 s plus its 0.25 s assembly gap (`script.md:16,27-31`). |
| A-R1-04 | fixed | **Verified.** s5 now uses the stronger time-bound action/result and slides the third coffee before resting on the trackpad (`script.md:19`; `brief.md:110`). The complete plan is 124 tokens / 30.24 s speech + 1.75 s gaps + 1.80 s hold = 33.79 s, inside 30–40 s (`script.md:27-33`; `voice-direction.md:13`). |

### Score table

| Rubric item | Score | Evidence |
|---|---:|---|
| 1. Fidelity | 9.8 | Mandatory s1 is verbatim; quotation is visibly memory, one narrator; required 21:47/task list/third coffee/refusal/warm exit/hold all remain (`brief.md:14-25`; `script.md:15-21`). |
| 2. Hook clear <=3 s | 9.5 | Literal frame-0 action plus sound-off hook, truthful 3–8 s payoff, and H1-over-H2/H5 comparison (`script.md:5-7,15`; `hook-options.md:9-20`). |
| 3. Clarity / retellability | 9.4 | Automatic `Ok` -> recognises fear -> concrete refusal -> laptop close is a single retellable arc (`script.md:18-21`). |
| 4. Spoken naturalness | 9.2 | The former s2 error is fixed; all phrases are conversational, pronounceable, and no planned phrase exceeds a practical breath (`script.md:15-21`; `voice.proposed.json:2-8`). |
| 5. Timing feasibility | 9.5 | Independently verified 124 tokens / 30.24 s + 1.75 s executable gaps + 1.80 s hold = 33.79 s; final measured clips still control (`script.md:23-33`; `voice-direction.md:13,29`). |
| 6. Source accuracy | 9.6 | Claims stay within U1/F1–F3, limited S1–S2 context, and marked personal inference; no outcome claim is made (`research.md:18-40,75-81`; `brief.md:71-79`). |
| 7. Visual feasibility in Remotion | 9.4 | Seven concrete hand/phone/desk actions, readable frame-0 intent, distinct light progression, and three restrained highlights are practical to stage; UI is marked `minh hoạ` (`brief.md:81-97,105-112`; `script.md:17,35-43`). |
| 8. Specificity / emotional impact | 9.3 | Each beat supplies a sensory/action anchor, the same-finger `Ok`/refusal contrast carries the turn, there are only three highlight beats, and the close earns 1.80 s silence (`script.md:15-21,35-43`). |
| 9. Story profile content test | 9.5 | The same character's hand acts in every shot; situation, turn, and ending are visible and earned without violating the no-face/no-second-voice constraint (`brief.md:105-112`; `script.md:15-21`). |
| 10. Voice direction feasibility | 9.5 | Intent/emphasis/tempo/pause/contour are meaningful per key; phrase joins are exact, controls are honestly limited, directions stay out of speech/captions, and the manual missing-tool disclosure/table is present (`voice-direction.md:15-46`; `voice-performance.proposed.json:9-12,23-106`). |
| **Mean / recorded score** | **9.47 / 9.4** | Recorded score is truncated, not rounded up. No Cao or Trung ticket is open. |

### Weakness hunt — non-blocking craft alternatives (not new tickets)

1. s5's `nhìn rất nhỏ` is slightly less idiomatic than `trông rất nhỏ`: `Một chữ “Ok” trông rất nhỏ. Nhưng nó giữ tôi lại trước màn hình thêm tối nay.` This is optional because the current action now carries the beat.
2. s2 can be even more colloquial: `Tin nhắn chỉ có: “Nhờ chút nhé?” Ngón tay tôi sắp chạm vào chữ Ok.` The accepted current line is already natural and needs no reopening.
3. s7 can tighten the warm image: `Tôi đóng máy. Ngoài cửa, đèn vẫn ấm. Tối nay, tôi không phải kiệt sức để được xem là người tốt.` The current wording is clear; this is rhythm preference, not a correction.

### What remains unverified

- Actual clone naturalness, CER, exact measured durations, phrase-assembly audio, and the absence of residual BGM/SFX in the 1.80 s hold require generated clips and audio review.
- Frame-0 phone readability, typography/safe-zone fit, same-hand visual continuity, and absence of an accidental second-person image require rendered stills/MP4 review.
- Stop-scroll, retention, and audience feeling after publication cannot be inferred from this script; H1 is an evidence-based creative choice, not a performance claim.
- `scripts/tone-probe.py` is absent. The required manual tone table is present and truthfully limits what it proves (`voice-direction.md:34-46`); it is not two-model tool evidence.

**score: 9.4  verdict: pass**

Top 3 carried-forward watch items: phrase assembly/CER on real clips; frame-0 text legibility and memory typography; final 1.80 s silence after mix. No open Cao/Trung items. Report: `docs/so-bi-xem-la-ich-ky-khi-noi-khong/script-review.md`.
