# Gate A delivery review — lens C

Reviewer: `script-reviewer-3` (clean context) · 2026-10-17  
Lens: spoken Vietnamese naturalness, space-token timing, TTS pause risk, and visual feasibility. The full Gate A rubric was still scored.  
Inputs: `research.md`, `brief.md`, `script.md`, `voice.proposed.json`, `design-spec.md`, `production-contract.json`, current manifest/timeline/scaffold, the primary Phase 2 workflow, and the user constraints in the dispatch.  
Constraint reminder: eight scenes; 45–60 seconds; Thanh Long estimate 4.1 space-tokens/s; local clone pauses cannot depend on punctuation; minimal stick figure; 1080×1920 at 30 fps.

## Verdict

**score: 8.7/10 · verdict: revise**

The story is coherent, compassionate, and technically renderable, but it does not pass Gate A yet. The audible hook is not the strongest researched hook, three late voice keys exceed the one-breath guideline, deliberate internal pauses/highlight changes are not encoded as real clip gaps or expressive instructions, and s8 is both verbally and visually overloaded. Specificity/emotional impact is 8.8, below the required 9.0. Open `Trung` tickets remain.

## Viewer-first read

I felt a quiet, non-judgmental recognition: the friend can vividly describe the past but cannot say much about the present. I understood the close as: old years can remain meaningful without requiring more unhappy years.

Attention can first drop at about **24.9s**, the start of s6. The film has just shown a strong filled-past/empty-present contrast, then s6–s8 become three consecutive abstract `tell` lines instead of developing that concrete moment (`script.md:19-22`).

## Hook test

- At 4.1 tokens/s, the first 3 seconds contain roughly the first 12 tokens: “Bạn thường kể mình đã cố gắng bao lâu. Nhưng lần cuối…”. Tension is present, but the relationship/past-versus-present premise is still unspecified. The spoken question only completes around 4.6s (`script.md:15`).
- Frame 0 text, **“LẦN CUỐI BẠN HẠNH PHÚC?”**, is readable without sound and shows a subject/calendar in the written plan (`script.md:7-9`). It carries a broad emotional question, not the more distinctive five-years/current-month tension.
- Research explicitly ranks H1 strongest: **“Năm năm bên nhau. Nhưng nếu chỉ kể chuyện của tháng này, bạn còn gì để kể?”** (`research.md:71-78`). The chosen hook is not one of the five researched candidates and is weaker than H1/H2 in specificity.
- The described cover is feasible in Remotion. The current scaffold is not yet a valid cover: `enter` evaluates to 0 at frame 0, making the whole scene transparent (`src/videos/tiec-nguoi-hay-nam-thang/scenes.tsx:32-35`). This is a downstream implementation gap, not evidence that the written cover is impossible.

## Independent line recount, breath, and timing

Counts below were recomputed from `voice.proposed.json` by splitting on spaces. They agree with the script total: **159 tokens**, pure voice **38.78s** at 4.1 tokens/s.

| Key | Exact tokens | Voice @4.1 | Planned shot | Start–end | Show/tell | Breath and local-clone assessment |
|---|---:|---:|---:|---:|---|---|
| s1 | 19 | 4.63s | 5.5s | 0.0–5.5s | tell | At the one-breath ceiling. Spoken Vietnamese is mostly natural, but the comma in “hạnh phúc, là khi nào” invites an artificial break and is unnecessary. |
| s2 | 20 | 4.88s | 5.7s | 5.5–11.2s | show | Borderline one breath but conversational. “Có người bạn…” is acceptable; “Một người bạn…” is slightly more direct. |
| s3 | 14 | 3.41s | 4.3s | 11.2–15.5s | show | Natural. The intended silence is safely after the generated clip, not dependent on punctuation (`script.md:17`). |
| s4 | 17 | 4.15s | 5.2s | 15.5–20.7s | show | Re-hook begins at 15.5s. Two sentence fragments can sound clipped in TTS; the subject is recoverable from s3 but should be made explicit. |
| s5 | 13 | 3.17s | 4.2s | 20.7–24.9s | show | Natural and comfortably breathable. The stillness fits the 1.03s tail. |
| s6 | 23 | 5.61s | 6.7s | 24.9–31.6s | tell | Over the ~20-token line guideline. “điều giữ ta… bỗng thành vô nghĩa” is written/essay register. A sound is required “between clauses”, but only one clip exists (`script.md:20`; `voice.proposed.json:7`). |
| s7 | 22 | 5.37s | 6.4s | 31.6–38.0s | tell | Over one breath. The delivery changes after sentence one and a release sound must land there, but punctuation in one clone clip cannot guarantee the needed gap (`script.md:21`; `voice.proposed.json:8`). |
| s8 | 31 | 7.56s | 9.6s | 38.0–47.6s | tell | Too long as one local-clone key. It stacks three operations—remove the number, inspect today, contrast person/time—and asks two questions. “Slow through clause boundaries” relies on punctuation with no split key (`script.md:22`; `voice.proposed.json:9`). |

There are **three consecutive tell lines (s6–s8)**, which triggers a fix under the Gate A inspection rule. s8 is too long in its present one-key form. Its individual sentences are under 20 tokens (17 and 14), but the clone receives one 31-token unit and no reliable semantic gap.

## Runtime and holds

- Planned shots total **47.6s**, inside 45–60s (`script.md:24-31`). The 8.82s difference from estimated speech is plausible as timeline tail holds: s1 0.87s, s2 0.82s, s3 0.89s, s4 1.05s, s5 1.03s, s6 1.09s, s7 1.03s, s8 2.04s.
- Rate sensitivity remains safe before measured audio: at 3.7 tokens/s, 159 tokens take 42.97s and the same holds give about 51.8s; at 4.2 tokens/s the result is about 46.7s.
- The re-hook starts at **15.5s**, correctly inside the 15–20s window (`script.md:18,30`).
- The final 2.0s visual silence is correctly specified after the final word (`script.md:22`). It is not punctuation-dependent.
- The current provisional code does not implement the reviewed timing. It totals **52.6s**, and gives s8 only 252 frames/8.4s (`timeline.ts:1-7`). A 7.56s estimated clip plus a 2.0s final hold needs about 287 frames/9.57s. Therefore the current s8 cannot preserve the stated closing hold; measured-voice retiming is mandatory.

## Structure, contrast, and highlight inspection

- Situation: s1–s3 establish duration, the friend, and the unanswered present-tense question.
- Re-hook/turn setup: s4 at 15.5s reveals that the answer moves backward in time; s5 exposes the blank present.
- Meaning turn: s6–s7 separates fear of wasted years from the idea that those years already mattered.
- Ending: s8 removes “five years” and asks what remains today. It is retellable, neutral, and contains no CTA or stay/leave instruction.
- Contrast pair: filled past / empty present is consistent across `brief.md:41` and `script.md:18-22`.
- Exactly three highlights are named (`script.md:33-37`), satisfying the quantity cap. Their visual ideas are paired, but the proposed voice map cannot reliably execute the internal delivery changes because there is neither split audio nor `voice-expressive.json`.
- Climax and close are distinct enough conceptually: s7 states the meaning turn; s8 asks the closing question. The 2.0s closing hold is explicit.

## Fidelity and claims

- No exact mandatory spoken sentence was supplied in the dispatch packet. The enforceable user constraints are the eight-scene structure, 45–60s target, Thanh Long timing basis, pause limitation, minimal-stick-figure treatment, and 1080×1920/30 output. The proposal satisfies these on paper (`brief.md:5-9`, `production-contract.json:7-11,20-27,28-100`).
- The brief title is preserved in the ending idea; `voice.proposed.json` matches the spoken column byte-for-byte for s1–s8 (`script.md:15-22`; `voice.proposed.json:2-9`).
- The script's note that s1–s7 are preserved verbatim from the resumed handoff is internally stated (`script.md:39-45`), but no owner-authored original transcript or mandatory-line list was provided, so that provenance cannot be independently verified.
- Claims remain appropriately qualified. “Có khi” marks inference; the script does not diagnose sunk cost, generalize from five years, or tell the viewer to stay/leave. The meaning and reflective-prompt claims resolve to `[F1][F2][F5][I2][I3]` in `research.md:31-45`.

## Visual feasibility

- s1–s7 are feasible with simple SVG figures, calendar cards, rectangles, and frame-derived transforms. The visual grammar is consistent with a minimal-stick-figure story (`brief.md:34-41`; `design-spec.md:3-13`).
- s8 as written is technically drawable but editorially overloaded: protagonist, fork, two branches, silhouette, calendar, removable card, central current-day square, headline, and state changes compete in one shot (`script.md:22`). It also conflicts with the design rule “one focal subject per frame” (`design-spec.md:3`). The fork visually implies a binary choice even though the narration and brief avoid choosing.
- The current scaffold confirms that the simple motifs are implementable, but it does not yet implement the reviewed story actions. Its s8 contains a figure, fork and calendar only (`scenes.tsx:40-45`); there is no silhouette, card removal, or centered current-day reveal. Frame 0 is transparent as noted above. These are expected prebuild gaps, but they prevent treating the current render as proof.
- Final dimensions and fps are correctly registered at 1080×1920/30 (`src/videos/tiec-nguoi-hay-nam-thang/index.ts:4-13`).

## Score table

| Rubric item | Score | Evidence |
|---|---:|---|
| 1. Fidelity | 9.2 | Eight scenes, format, duration target, profile and voice route are preserved (`brief.md:5-9,49-56`; `production-contract.json:7-27`). No independently supplied verbatim spoken line was available. |
| 2. Hook clear ≤3s | 8.4 | Tension starts early, and frame-0 text is readable in the plan (`script.md:7-15`), but the spoken relationship premise is incomplete at 3s and research ranks the more specific H1 strongest (`research.md:71-78`). |
| 3. Clarity / retellability | 9.1 | Situation → past/present gap → meaning turn → reflective close is easy to retell (`brief.md:13-17`; shots s1–s8). |
| 4. Spoken Vietnamese naturalness | 8.1 | s1 comma, s4 fragments, essay-register s6, and 22–31-token late keys weaken speech naturalness (`script.md:15,18,20-22`). |
| 5. Timing feasibility | 8.3 | 159 tokens and 47.6s are sound estimates, but s6–s8 need split keys, and current s8 code is 1.17s short of voice+closing hold (`script.md:24-31`; `timeline.ts:1-7`). |
| 6. Source accuracy | 9.2 | All substantive inferences are qualified and resolve to research; no unsupported statistic/diagnosis appears (`research.md:29-45`; `script.md:20-22`). |
| 7. Visual feasibility | 8.2 | Core SVG/calendar language is feasible, but s8 violates one-focal-subject discipline and current frame 0 renders transparent (`design-spec.md:3`; `scenes.tsx:32-45`). |
| 8. Specificity / emotional impact | 8.8 | Strong paper sounds, stopped hand, memory panels, filled/empty contrast, three highlights and final hold (`script.md:15-22,33-37`), but s6–s8 form an abstract three-line run and the close explains more than it lets the empty present land. |
| 9. Story profile content test | 8.7 | A consistent friend/narrator story earns its turn, but s8 shifts from character action to a diagram-like fork with too many semantic objects (`brief.md:13-17`; `script.md:22`). |

Mean: **8.67 → 8.7**. Pass conditions are not met: overall <9, hook <9, specificity <9, and open `Trung` tickets remain.

## Exhaustive fix tickets

| ID | Severity | Where | Evidence / failure | Concrete change | Owner | Acceptance check |
|---|---|---|---|---|---|---|
| A-C1 | Trung | `script.md:15`, s1 / frame 0 | The first 3s do not yet identify the distinctive five-year/current-month tension; chosen hook is weaker than research H1. | Replace the spoken and frame-0 hook with researched H1: **“Năm năm bên nhau. Nhưng nếu chỉ kể chuyện của tháng này, bạn còn gì để kể?”** (17 tokens). Keep the off-centre friend and filled-past/empty-current calendar. | `script-agent` | At 4.1 tokens/s, the first 3s reaches the “tháng này” tension; frame 0 displays the same complete question and remains understandable muted. |
| A-C2 | Trung | `script.md:20-21`; `voice.proposed.json:7-8`, s6/s7 | s6=23 and s7=22 tokens exceed the one-breath guideline. Required between-clause sound/release and warmth change are punctuation-only in single clone clips. | Use within-scene split keys: s6a **“Có khi mình ở lại không hẳn vì người ấy.”** (10), s6b **“Mình sợ năm năm qua hóa thành vô nghĩa.”** (9); s7a **“Nhưng những năm đó đã có ý nghĩa rồi.”** (9), s7b **“Không cần thêm vài năm không vui để chứng minh nữa.”** (11). Add explicit 0.25–0.40s timeline gaps for the named SFX/hold. | `script-agent` | Every generated key is ≤20 tokens; script and proposed voice map match byte-for-byte; the gaps are named in seconds/frames and do not depend on punctuation. Eight visual scenes remain eight scenes. |
| A-C3 | Trung | `script.md:22`; `voice.proposed.json:9`, s8 | s8 is 31 tokens/7.56s in one clip, asks two questions, carries three logical operations, and requests slow clause boundaries that the clone cannot guarantee. | Keep Scene8 but split and shorten: s8a **“Tạm bỏ con số năm năm đi.”** (7), s8b **“Hôm nay, hai người còn gì để kể?”** (8), s8c **“Bạn tiếc người ấy, hay tiếc quãng thời gian đã qua?”** (11). Encode real gaps of roughly 0.3s and 0.4s, then keep the 2.0s final visual silence. | `script-agent` | Three keys are each one breath; the two internal gaps are explicit; the final hold begins only after s8c ends; measured total remains 45–60s. |
| A-C4 | Trung | `script.md:22`; `design-spec.md:3,11`, s8 visual | The fork composition has too many focal objects and visually suggests a forced person-vs-calendar choice despite the neutral ending. | Remove the fork and branch icons. Center one friend holding the empty current-day frame; lift the “5 NĂM” card away; keep old pages dimly at the margins. Let the empty present, not two paths, carry the question. | `script-agent` for shot description; later `design-agent` | Shot card has one focal subject, no choice is shown, all three spoken sub-beats have one simple visual state change, and the final still remains legible for 2.0s. |
| A-C5 | Thấp | `script.md:15`, s1 | “hạnh phúc, là khi nào” contains an unnatural written comma and can induce a clone hesitation in the wrong place. | If A-C1 is not adopted, change to **“Nhưng lần cuối bạn thấy hạnh phúc là khi nào?”** with no comma. | `script-agent` | Text matches the voice map and contains no comma between complement and copula. |
| A-C6 | Thấp | `script.md:18`, s4 | “Rồi kể…” and “Những lần…” are back-to-back fragments; TTS may sound list-like rather than like a friend continuing a story. | Replace with **“Rồi bạn ấy kể chuyện cũ: những chuyến đi, những lần nắm tay nhau vượt qua chuyện khó.”** (18 tokens). | `script-agent` | One grammatical sentence, ≤20 tokens, meaning/source unchanged, and re-hook still starts at 15–20s after retiming. |
| A-C7 | Trung (downstream) | `timeline.ts:1-7`, s8 | Current s8 is 252f/8.4s, while the reviewed one-clip estimate plus required close is about 287f/9.57s. The 2.0s hold cannot fit. | After local generation, set Scene8 to measured durations of its split keys + explicit internal gaps + 60f closing hold; recompute all subsequent spans/total without stretching audio. | `video-director` / audio integration owner | `ffprobe` table accounts for every clip and gap; final s8 has a true 60f post-voice hold; total is 1350–1800 frames. |
| A-C8 | Trung (downstream) | `scenes.tsx:32-35`, frame 0 | `opacity: enter` is 0 at f0, contradicting the required no-fade cover. The current `Math.sin` idle bob also conflicts with the brief's held-stillness/no-idle-bob distinction (`brief.md:39,46`). | Render s1 headline, figure and calendar at full opacity/settled position on f0; animate only subordinate calendar marks after f0. Remove continuous idle bob and use deliberate, finite frame-derived gestures. | `scene-agent` | Render frame 0 at 1080×1920: full hook and subject are visible with no fade; dense-frame inspection shows no perpetual bob. |

## Three highest-priority fixes

1. Split and shorten s6–s8 so all semantic pauses are real gaps, not punctuation in a clone clip.
2. Replace s1 with the research-ranked H1 and put the same full tension on frame 0.
3. Simplify s8 to one empty-present composition and retime it from measured clips while preserving the 60-frame final hold.

## Previous-round verification

- No prior `script-review.md` round or producer closure table exists in the supplied target directory, so there are no earlier Gate A tickets to mark fixed/not fixed.
- The script documents one resumed-handoff change: s8 no longer uses the overlapping “nếu hôm nay gặp lại từ đầu…” test (`script.md:39-45`). **Verified yes** against the quoted previous text in that file; the replacement is distinct from the old video's meet-again test. The owner provenance of that quoted previous text could not be independently verified.

## Could not verify

- No generated Thanh Long clips were supplied, so actual pronunciation, breath, silence, ASR, and `ffprobe` durations cannot be verified.
- No `voice-expressive.json` or equivalent proposed delivery file exists, so the written delivery directions cannot be treated as executable evidence.
- No finished style frames, hook motion strip, muted-phone render, or current frame-0 still was supplied; visual judgments are based on the shot plan and scaffold source only. Gate D remains pending by design (`design-spec.md:15`).
- No previous Gate A report/closure table was available.

No pipeline command was run, and no artifact other than this delivery report was edited.
