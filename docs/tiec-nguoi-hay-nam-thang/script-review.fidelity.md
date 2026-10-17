# Gate A — Fidelity / sources / constraints

## Round 1

Reviewer: `script-reviewer-1` (clean context, lens a) · 2026-10-17. Inputs: `research.md`, `brief.md`, `script.md`, `voice.proposed.json`, canonical `voice.json`, `HANDOFF.md`, `production-contract.json`, the completed `thuong-hay-so-bat-dau-lai` brief/script, Gate A procedure, profile `story`, and the exact constraints relayed by the director. This is an independent review; no source artifact was edited and `pipeline.py` was not run.

### 1. Viewer-first read

I understood a compassionate distinction: five meaningful years can remain meaningful even when the relationship's present is hard to describe. I felt the empty-current-page beat, but the narration becomes an abstract thesis from s6 onward instead of letting the friend's present-day evidence carry the turn.

Attention can drop at approximately **26.0s**, at the start of s6: after the concrete friend/calendar sequence in s2–s5, three consecutive spoken beats (s6–s8) explain the meaning in abstractions (`script.md:20-22`).

### 2. Scores

| Criterion | Score | Evidence and judgment |
|---|---:|---|
| 1. Fidelity | **9.5/10** | Exact title is present in `brief.md:5`; Vietnamese, 8 scenes, 45–60s, `story`, `minimal-stick-figure`, Thanh Long, and resume boundary are explicit at `brief.md:6-9,51-56` and `production-contract.json:7-18,23-26,28-100`. `voice.proposed.json:2-8` is byte-identical to canonical `voice.json:2-8`; only s8 changes, as declared at `script.md:39-45`. No gratuitous s1–s7 rewrite found. |
| 2. Hook clear within 3s | **8.3/10** | Spoken tension begins in s1, but the strongest researched hook is H1 (`research.md:71-79`), not the chosen wording. More importantly, frame-0 text only says “LẦN CUỐI BẠN HẠNH PHÚC?” (`script.md:9,15`): with sound off it does not establish the five-year relationship or past-versus-present gap. |
| 3. Clarity / retellability | **9.0/10** | The point is retellable from `brief.md:14-16`; s7 distinguishes past meaning from compulsory continuation and s8 returns to the present (`script.md:21-22`). The ending has two nested questions, so the first can dilute the title question. |
| 4. Spoken naturalness | **8.5/10** | Vietnamese is generally conversational. s2 “Có người bạn...” is less idiomatic than “Có một người bạn...”; s6's standalone “Mà là...” is written-rhetorical; s6/s7/s8 have 23/22/31 space-separated syllables and exceed the reviewer's approximate one-breath threshold (`script.md:20-22,26`). |
| 5. Timing feasibility | **8.6/10** | Counts are correct: 19+20+14+17+13+23+22+31 = 159; 159/4.1 = 38.8s and planned shots total 47.6s (`script.md:24-31`). The target is feasible, but deliberate within-line clause pauses in s6–s8 are not represented by split voice keys or a `voice-expressive.json`; punctuation alone cannot guarantee them. |
| 6. Source / claim accuracy | **8.8/10** | Script tags resolve to `research.md`; s6 is qualified by “Có khi” and does not name a diagnosis, and the script contains no statistic or universal prevalence claim. The local voice reference exists and its SHA-256 matches `brief.md:53-54`. However, every shot says `durationSource: "measured-voice"` (`production-contract.json:36,45,54,63,72,81,90,99`) while the same contract says voice `generated: false` and timeline `finalized: false` (`production-contract.json:18,22`), which overstates current evidence. |
| 7. Visual feasibility | **9.2/10** | All eight scenes use feasible deterministic paper/calendar/stick-figure actions. The visual system and present-conversation character contract are consistent (`brief.md:34-41`; `script.md:15-22`). Actual phone legibility and motion quality remain unverified until rendered. |
| 8. Specificity / emotional impact | **8.7/10** | There are exactly three named highlights, a filled-past/empty-present contrast, sensory paper cues, and a 2.0s final hold (`script.md:29,33-37`). But the spoken close contains three consecutive `tell` lines (s6–s8), so the emotional turn is more explained than experienced. This sub-score is below the mandatory 9.0. |
| 9. Story profile content test | **9.1/10** | Situation (friend says five years), turn (answer goes backward / present stays blank), and ending (remove the number and ask about today) are earned; a consistent narrator/friend pair acts each beat (`brief.md:16-17`; `script.md:16-22`). Captions support rather than diagnose the scene. |

**Arithmetic mean: 8.86/10 → reported score 8.9/10. Verdict: `revise`.** The pass conditions also fail independently because specificity is below 9.0 and Trung tickets A1–A4 remain open.

### 3. Hook test

- First 3 seconds: the voice reaches the tension only as the second sentence begins; the frame-0 cover is immediate but generic. A cold viewer sees a happiness question, not yet the relationship/time dilemma.
- Research comparison: H1 is explicitly ranked strongest and carries the unique “five years / this month” contrast (`research.md:73-79`). The chosen hook is serviceable but less differentiated.
- Sound off: current headline omits both the relationship and time investment (`script.md:9`).
- Frame 0: it is not blank and does show the calendar/empty square, so the cover-image requirement itself passes (`script.md:7-10`).

### 4. Line-by-line show/tell and spoken test

| Shot | Show / tell | Spoken finding |
|---|---|---|
| s1 | **tell** | Abstract “cố gắng / hạnh phúc”; 19 syllables, one-breath boundary acceptable. |
| s2 | **show** | Concrete friend quote and “gần năm năm”; 20 syllables. “Có người bạn” is mildly written/elliptical. |
| s3 | **show** | Present-tense question plus observable silence; 14 syllables. |
| s4 | **show** | Trips, held hands, hard times; concrete enough for the three panels; 17 syllables. |
| s5 | **show** | Observable waiting and absence of a present-day answer; 13 syllables. |
| s6 | **tell** | Abstract causal interpretation (“điều giữ ta”, “nỗi sợ”, “vô nghĩa”); 23 syllables and an intended clause break inside one clip. |
| s7 | **tell** | Thesis/interpretation rather than a new observed act; 22 syllables and an intended release after sentence one. |
| s8 | **tell** | Reflective prompt/title; 31 syllables, two questions and intended slow clause boundaries inside one clip. |

Count: **4 tell / 4 show**; maximum tell run is **3 (s6–s8)**, which requires a fix under the Gate A procedure. No English token or difficult diacritic was found. The longest keys need split/configured phrasing rather than punctuation-only control.

### 5. Structure, fidelity, claims, and differentiation

- Situation: s2–s3. Turn/re-hook: s4 begins at ~15.5s and answers a present-tense question by moving backward. Ending: s7–s8. Climax and closing question occupy different shots (s7 vs s8), followed by a 2.0s visual hold.
- Contrast pair: filled past / empty present is carried from s1 through s7. Exactly three highlights are named at `script.md:33-37`.
- Mandated constraints and locations: exact title — `brief.md:5` and substantially repeated in s8; eight scenes — `brief.md:7`, `production-contract.json:28-100`; Vietnamese/45–60s — `brief.md:6`; story/minimal-stick-figure — `brief.md:7`; Thanh Long — `brief.md:51`; resume existing Video #08 — `brief.md:8`; non-diagnosis/no stay-leave instruction — `brief.md:9,15,32`; only proposed spoken change s8 — verified by byte comparison of both voice maps and documented at `script.md:39-45`.
- Claims: no statistic, clinical label, “most people” claim, or real-person attribution appears. `[F1]`–`[F7]`, `[I1]`–`[I4]`, and `[V1]`–`[V5]` used by the script all resolve in `research.md:29-45,60-69`. The s6 inference remains qualified by “Có khi”; s3/s5 silence is not equated with “hết yêu”.
- Duplicate differentiation: the completed video culminates in the “if you met today / would you choose” test (`docs/thuong-hay-so-bat-dau-lai/script.md:24`). Proposed s8 removes that test and instead removes the “five years” card, matching the distinct present-tense/calendar engine (`script.md:22,41-45`; `brief.md:43-47`). No kitchen, rice cooker, soup, spring onion, keys, habit loop, or “thương hay sợ” device remains. Differentiation passes.

### 6. Exhaustive fix tickets

| id | severity | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| A1 | **Trung** | `script.md:9,15`; s1 / frame 0 | Sound-off headline “LẦN CUỐI BẠN HẠNH PHÚC?” omits relationship duration and the unique past–present tension; research ranks H1 strongest at `research.md:73-79`. | Preserve spoken s1 verbatim, but replace frame-0/on-screen hook with **“NĂM NĂM BÊN NHAU. THÁNG NÀY CÒN GÌ ĐỂ KỂ?”** (or a phone-legible condensation retaining all three ideas: five years, this month, nothing/current gap). | `script-agent` | Frame-0 description and s1 on-screen text contain relationship + time span + present gap; a sound-off reader can state the dilemma; spoken s1 remains byte-identical. |
| A2 | **Trung** | `script.md:20-22`; s6–s8 | Three consecutive spoken lines are `tell`; the emotional close explains the thesis after the concrete s2–s5 sequence. | Change **s8 only** to a concrete action plus the exact title question: **“Nếu cất tấm thẻ ‘năm năm’ đi, ô lịch hôm nay còn điều gì của hai người? Bạn đang tiếc người ấy, hay tiếc những năm mình đã bỏ ra?”** Preserve s1–s7 byte-for-byte. | `script-agent` | Re-run the line pass: s8 is grounded in an observable card/calendar action, the exact user title is spoken, s1–s7 are unchanged, and no run exceeds two `tell` lines. |
| A3 | **Trung** | `script.md:20-22,26,49`; `voice.proposed.json:7-9`; keys s6/s7/s8 | Keys are 23/22/31 syllables. Delivery/visual notes require clause-level pauses, yet the proposal has one clip per scene and no expressive timing map. This relies on punctuation for cloned-voice pauses. | Keep eight **scenes** and all s1–s7 words, but either (a) split voice keys at sentence boundaries (`s6a/s6b`, `s7a/s7b`, `s8a/s8b`) with explicit 250–400ms timeline gaps, or (b) add an ordered `voice-expressive.json`/proposal encoding those pauses. Update the acceptance check so it no longer incorrectly requires exactly eight unsplit voice keys. | `script-agent` + later `voice-agent` | Every deliberate internal pause is a real split gap or expressive entry; no generated phrase exceeds ~20 syllables per breath; concatenated text reproduces the accepted spoken lines exactly; scene count remains 8. |
| A4 | **Trung** | `production-contract.json:18,22,36,45,54,63,72,81,90,99` | Contract simultaneously says audio is not generated/timeline not finalized and labels each current duration source “measured-voice”. That is unsupported status evidence and conflicts with the no-fabricated-duration constraint in `HANDOFF.md:25`. | Mark current shot duration source as **`provisional-estimate`** (or add separate `currentDurationSource` and `requiredFinalDurationSource` fields); switch to `measured-voice` only after clips exist and `ffprobe` values are recorded. | `video-director` | While `voice.generated` is false, no shot claims measured duration. After generation, each measured claim points to a recorded clip/ffprobe duration. |
| A5 | **Thấp** | `script.md:16`; s2 | “Có người bạn nói với mình” is understandable but less natural than everyday Vietnamese with the classifier. | If the explicit s1–s7 preservation lock is later relaxed, rewrite as **“Có một người bạn nói với mình: Bọn mình bên nhau gần năm năm rồi. Bây giờ dừng lại, tiếc lắm.”** Under the current lock, carry this as a low-risk spoken-naturalness note and do not change it. | `script-agent` | Either s2 remains byte-identical under the lock and the risk is recorded, or owner/director explicitly relaxes the lock and both script/voice proposal use the replacement. |

### 7. Three concrete weaknesses and replacement lines

1. Frame-0 copy is too generic. Replacement on-screen line: **“NĂM NĂM BÊN NHAU. THÁNG NÀY CÒN GÌ ĐỂ KỂ?”**
2. s8 remains conceptual and does not speak the exact title. Replacement spoken line: **“Nếu cất tấm thẻ ‘năm năm’ đi, ô lịch hôm nay còn điều gì của hai người? Bạn đang tiếc người ấy, hay tiếc những năm mình đã bỏ ra?”**
3. s2 is slightly elliptical. Conditional replacement spoken line: **“Có một người bạn nói với mình: Bọn mình bên nhau gần năm năm rồi. Bây giờ dừng lại, tiếc lắm.”** Do not apply while the s1–s7 preservation constraint remains locked.

### 8. Previous-round / resumed-handoff verification

There is no previous Gate A review round for this video. The resumed-handoff change is nevertheless verifiable:

- s1–s7 preserved against canonical `voice.json`: **yes**.
- s8 is the only proposed spoken change: **yes**.
- Old “gặp lại từ đầu / vẫn muốn chọn” test removed: **yes**.
- New ending is materially distinct from completed `thuong-hay-so-bat-dau-lai`: **yes**.
- Canonical `voice.json` remains unchanged pending Gate A: **yes**, as required by `brief.md:61` and `script.md:52`.

### 9. Could not verify

- I did not independently open the external URLs in `research.md`; this review verifies that every script claim resolves to an explicitly classified fact/inference/visual source in that file, not the underlying publications' full text.
- No audio exists for this video, so I could not hear Thanh Long delivery, confirm pauses, measure clip duration, CER, clipping, or pronunciation.
- I did not render or inspect frames, so phone legibility, safe-area behavior, motion quality, and the calendar metaphor's sound-off comprehension remain Gate D/visual-review work.
- I did not run `pipeline.py` and did not record any gate score.

**score: 8.9  verdict: revise**

Top fixes: **A1** make the frame-0 hook relationship/time-specific while preserving spoken s1; **A2** ground s8 in the visible card/calendar action and speak the exact title; **A3** encode real phrase pauses instead of relying on punctuation. A4 must also close before acceptance because the production contract currently claims unmeasured durations as measured.
