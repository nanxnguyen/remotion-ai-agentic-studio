# Script review — gate A

## Round 1 — lens: spoken naturalness, timing & performance feasibility

Reviewer: `script-reviewer-3` (clean context; did not write the packet).
Video `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · profile `story` · 9:16 1080×1920 @30 fps · owner duration 45–55 s.
Files read: `brief.md`, `script.md`, `voice.proposed.json`, `voice-direction.md`, `voice-performance.proposed.json`, `research.md`, `hook-options.md`, `owner-notes.md`, `status.json`, `script.alt-1.md`, `script.alt-2.md`, plus the executable path `scripts/gen-voice-clone.py`, `scripts/validate_voice_performance.py`, `src/core/voice-timeline.ts`.
No command was run (this runtime has no shell tool). Every number below was recounted by hand from the files on disk.

---

## 0 · Read as the viewer first (spoken lines only, at the estimated durations)

**What I felt / understood.** By 4.45 s I knew the role the video is describing (I am the one people come to). Nothing countered me until `a1` at 8.04 s. I felt something for the first time at 27.9–31.6 s (`Mà vì bạn đã quen với việc mình phải là người ổn.`), and the video really landed at 38.4–41.4 s when the rain is put on my own shoulder in words, then at 41.4–47.1 s when the question is asked of me.

**Where attention can drop, by second.**
- **~32.2 s — highest risk.** `Bạn biết không…` (0.77 s) plus the 1.60 s hold is 2.37 s of near-nothing immediately after the video's biggest investment point (`s7`). The next new content is 8.5 s away.
- **~16.7 s.** `a2` (1.54 s of near-nothing) plus the 1.20 s withheld-message hold = 2.74 s, and the re-hook is still 1.6 s away.
- **~6.5 s.** The triad's third clause (`…thấy ổn hơn.`) lands with no counterweight; 0–7.79 s adds detail but never opposes the hook.
- **~45.3 s.** The tail is 4.20 s of total silence (§2.3). Visual + title card, so it is survivable, but it is longer than the documents admit.

**Retellable in one sentence?** Yes: *người luôn cầm ô cho người khác cũng có ngày mưa ướt, và xứng đáng được hỏi "Hôm nay có chuyện gì với bạn thế?"* Nothing in the ending needs the viewer to have seen the visuals.

---

## 1 · Spoken naturalness, line by line

Said silently as a Vietnamese speaker. "Breath unit" = the largest run between natural pauses; a comfortable breath is 10–13 syllables at this pace.

| key | line | breath units | verdict | why |
|---|---|---|---|---|
| `s1` | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | 11 | **natural** | Everyday Vietnamese. Owner verbatim. No TTS risk. |
| `s2` | `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` | 5 / 4 / 9 | **natural** | Three clean sentences, three breath units, longest is 9. No overload anywhere in the packet. |
| `a1` | `Vai người khác nhẹ hẳn xuống. Còn bạn đứng ngoài.` | 6 / 4 | **REJECT — written register** | `nhẹ hẳn xuống` is an emotional adverb glued to a body part; Vietnamese shoulders *hạ*, *chùng*, *rơi*, *xệ* — they do not get *nhẹ*. And `Còn bạn đứng ngoài.` without `thì` is clipped-literary; spoken it reads as a caption line, not speech. This is also contrast pair 1, the line the whole turn lands on. → **A-T2** |
| `s3` | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | 4 / 11 | **natural** | Longest breath in the video is 11 syllables — still inside one breath. Owner verbatim. |
| `a2` | `Mưa ngoài cửa sổ, đều đều.` | 4 / 2 | **sayable, register break** | A lyric fragment, not conversation; `đều đều` standing alone as an adverbial is poetic. Fine in this voiceover register (the file even says "said to the room"), but it is the one line a Vietnamese speaker would not choose to *say*. → **A-L6** (optional rewrite) |
| `s4` | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | 3 / 5 | **natural** | Owner verbatim. The single quotes are the owner's punctuation; engines read them as a quote boundary. |
| `s5` | `Rồi nghĩ một lúc, bạn lại thôi.` | 4 / 3 | **natural** | Owner verbatim. `lại thôi` is genuinely rueful, not self-pitying. |
| `a3` | `Ngón tay bấm xoá từng chữ.` | 4 / 2 | **sayable, vantage shift** | Grammatical and clear, but the subject jumps from "bạn" to `Ngón tay` in a video that addresses one person. Reads as narration of a screen, not as speech to the viewer. → **A-L7** (optional rewrite) |
| `s6` | `Không phải vì không có ai để nhắn.` | 5 / 3 | **natural** | Owner verbatim. |
| `s7` | `Mà vì bạn đã quen với việc mình phải là người ổn.` | 5 / 7 | **natural** | Owner verbatim, and the truest line in the packet is also the easiest to say. |
| `s8` | `Bạn biết không…` | 3 | **natural** | Owner's own `…` kept verbatim. A real breath-word, not a stage aside. |
| `s9` | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | 8 / 6 | **natural** | Owner verbatim. No tongue-twister; `thường xuyên` is the only multi-syllable cluster and it is routine. |
| `a4` | `Chiếc ô nghiêng đi. Mưa rơi lên vai bạn.` | 4 / 5 | **natural — best of the four** | `Chiếc ô nghiêng đi` is how a Vietnamese speaker describes a visible motion; `Mưa rơi lên vai bạn` stays in second person. |
| `s10` | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | 7 / 5 / 3 | **natural in text, broken in the plan** | The wording is fine. The *execution* splits the question after `gì` with 0.15 s of silence — see **A-T3**. |
| `END` | *(no voice key)* | — | **correct** | Silence is the delivery; the owner's title line is on-screen only. |

**Breath/overload sweep.** The largest single breath unit in the whole packet is 11 syllables (`s3` phrase 2). No line asks for more than one breath where one cannot be held, no tongue-twister, no English or unpronounceable term, no `()`/`[]`/`*` marker in spoken text, and nothing that reads as a caption except `a1` and, more mildly, `a2`. The **owner's register is excellent** — that deserves to be said plainly: 10/10 owner lines need no change.

---

## 2 · Timing arithmetic, recounted independently

### 2.1 Syllable recount from `voice.proposed.json`

| key | syl (recount) | script.md | match |
|---|---:|---:|:--:|
| `s1` | 11 | 11 | ✅ |
| `s2` | 18 | 18 | ✅ |
| `a1` | 10 | 10 | ✅ |
| `s3` | 15 | 15 | ✅ |
| `a2` | 6 | 6 | ✅ |
| `s4` | 8 | 8 | ✅ |
| `s5` | 7 | 7 | ✅ |
| `a3` | 6 | 6 | ✅ |
| `s6` | 8 | 8 | ✅ |
| `s7` | 12 | 12 | ✅ |
| `s8` | 3 | 3 | ✅ |
| `s9` | 14 | 14 | ✅ |
| `a4` | 9 | 9 | ✅ |
| `s10` | 15 | 15 | ✅ |
| **total** | **142** (owner `s1`–`s10` = 111, `[ADD]` `a1`–`a4` = 31) | 142 | ✅ |

### 2.2 Three rate cases (my computation)

| rate | speech 142 ÷ rate | + 13.05 s silence | total | inside 45–55 |
|---:|---:|---:|---:|:--:|
| **4.2 syl/s** | 33.81 | 13.05 | **46.86** | ✅ 1.86 s above the floor |
| **3.9 syl/s** (planning) | 36.41 | 13.05 | **49.46** | ✅ |
| **3.7 syl/s** | 38.38 | 13.05 | **51.43** | ✅ 3.57 s below the ceiling |

Intermediates 4.1 → 47.68, 4.0 → 48.55, 3.8 → 50.42 — all reproduce exactly. Silence sum re-added from the 14 holds: 0.35+0.25+0.70+0.45+1.20+0.35+0.45+0.90+0.45+0.55+1.60+0.90+0.70+1.80 = **10.65**, + 2.40 END = **13.05** = 26.39 % of 49.46 ✅.

### 2.3 Every per-shot second, re-derived from unrounded cumulative values at 3.9 syl/s

| key | start (mine) | script.md | speech end | next start | match |
|---|---:|---:|---:|---:|:--:|
| `s1` | 0.0000 | 0.00 | 2.8205 | 3.1705 → 3.17 | ✅ |
| `s2` | 3.1705 | 3.17 | 7.7859 | 8.0359 → 8.04 | ✅ |
| `a1` | 8.0359 | 8.04 | 10.5974 | 11.2974 → 11.30 | ✅ |
| `s3` | 11.2974 | 11.30 | 15.1436 | 15.5936 → 15.60 | ✅ |
| `a2` | 15.5936 | 15.60 | 17.1321 | 18.3321 → **18.33** | ✅ |
| `s4` (re-hook) | 18.3321 | 18.33 | 20.3831 | 20.7331 → 20.74 | ✅ |
| `s5` | 20.7331 | 20.74 | 22.5282 | 22.9782 → 22.98 | ✅ |
| `a3` | 22.9782 | 22.98 | 24.5166 | 25.4166 → 25.42 | ✅ |
| `s6` | 25.4166 | 25.42 | 27.4679 | 27.9179 → 27.92 | ✅ |
| `s7` | 27.9179 | 27.92 | 30.9951 | 31.5451 → 31.55 | ✅ |
| `s8` | 31.5451 | 31.55 | 32.3141 | 33.9141 → 33.92 | ✅ |
| `s9` | 33.9141 | 33.92 | 37.5045 | 38.4045 → 38.41 | ✅ |
| `a4` | 38.4045 | 38.41 | 40.7359 | 41.4359 → **41.41** | ✅ |
| `s10` | 41.4359 | 41.41 | 45.2603 | 47.0603 → 47.06 | ✅ |
| `END` | 47.0603 | 47.06 | — | 49.4603 → 49.46 | ✅ |

Structural marks re-derived: hook complete 2.82 s · first concrete proof `Bạn biết cách an ủi.` 4.4526 → **4.45** ✅ · payoff sentence 7.79 ✅ · hook at 4.2 / 3.7 = 2.62 / 2.97 ✅ · re-hook start 17.24 / 18.33 / 19.17 ✅ (inside the 15–20 s window at every modelled rate) · first proof 4.16 / 4.45 / 4.67 ✅.

**Every number in `script.md` §1 reproduces.** One labelling defect: the column headed `clip end s` actually holds *the next shot's start* (rows 1–14). Harmless arithmetic, wrong label.

### 2.4 The audio tail is 4.20 s, not 2.40 s

`script.md` §1 is right: the last word of `s10` ends at **45.26 s**, `s10`'s post-clip hold runs 45.26 → 47.06 (1.80 s), and the END card occupies 47.06 → 49.46 (**2.40 s**). So the silence after the final word is **1.80 + 2.40 = 4.20 s**, and the total silence of 13.05 s includes the 1.80 s.

But `voice-direction.md` §Ending behaviour says *"Then **2.40 s of real silence (47.06–49.46 s)** … BGM cuts out on the last word"*, and `script.md` §4 labels the 2.40 s row *"the required silent hold, BGM out, image only"* — which reads as if music runs until the END card. If BGM cuts on the last word, the mix is silent from 45.26 s, i.e. **4.20 s**. A join/motion/mix agent building from the prose will build a tail ~1.8 s short of the arithmetic. → **A-T4**

### 2.5 Elasticity: the stated recovery does not reproduce

`script.md` §4 lists six cuts and says *"That recovers 5.15 s"*. Summed: `s8` 0.60 + `a2` 0.50 + `a3` 0.40 + `a4` 0.30 + `a1` 0.25 + END 0.60 = **2.65 s**. The figure 5.15 s is wrong by 2.50 s. It matters because it is the only stated bound on how much of the 13.05 s of silence the plan can actually give back if a measured run comes out slower than 3.7 syl/s (e.g. at 3.3 syl/s the total is 56.08 s and 1.08 s must come out; 2.65 s is enough, but the file does not say so truthfully). → **A-T5**

Also unverifiable: §4's *"the previous 10-key draft spent 19.25 s = 41 %"* — that draft is not on disk, and 19.25 ÷ (28.46 + 19.25) = **40.3 %**, not 41 %. → **A-L10**

### 2.6 Is the silence motivated?

Yes for eleven of the fifteen rows. Motivated and dramaturgically earned: 0.70 after `a1` (the turn), 1.20 after `a2` (withheld message), 0.90 after `a3` (the deletion must be seen), 1.60 after `s8` (the breath before the payoff), 0.90 after `s9` (the umbrella must sink in), 1.80 + 2.40 after `s10`. Short and functional: 0.25–0.55 after the rest.
Two rows are **loads, not beats**, and are acceptable only because something else carries them: 0.45 after `s3` and 0.45 after `s6` both hold *after* a statement with no visual change named (`s6` names an incoming call that rings and stops — that one has motion; `s3` names only the cursor blinking, which is already in the clip). Nothing here is filler, so I do not open a ticket, but the 32.2 s span is the video's real exit point and the mix must not be empty there.

### 2.7 Is the fastest case still ≥ 45 s?

At the modelled floor of 4.2 syl/s: **46.86 s**, 1.86 s above the owner's floor, and the contingency (lengthen the END hold 2.40 → 5.20) recovers 2.80 s more, so the floor survives a run faster than 4.2 syl/s. Above 4.2 syl/s the packet is silent on the arithmetic and relies entirely on that same END-hold elasticity — acceptable, but it should be stated.

---

## 3 · Pause implementation — is every deliberate pause real?

Rule (`SKILL.md` Phase 2a; `gen-voice-clone.py:45` reads `pauseBefore/AfterSeconds` as real synthesized padding, `:146` enforces the reassembly): *never rely on punctuation alone*.

| deliberate pause | value | where it is implemented | verdict |
|---|---:|---|---|
| clause pauses inside clips (16 of them, 0.14–0.32 s) | 0.14–0.32 | `pauseAfterSeconds` on a non-final phrase — real post-synthesis silence inserted at assembly, **not** the punctuation | ✅ real |
| after `a2` (withheld-message beat) | 1.20 | `a2.minimumPostClipHoldSeconds = 1.2`, `postClipHoldPolicy: "timeline silence before the re-hook"` | ✅ real gap between clips |
| after `a3` | 0.90 | `a3.minimumPostClipHoldSeconds = 0.9` | ✅ |
| breath after `s8` | 1.60 | `s8.minimumPostClipHoldSeconds = 1.6`, `"never the punctuation"` | ✅ |
| hold after `s9` | 0.90 | `s9.minimumPostClipHoldSeconds = 0.9` | ✅ |
| after `s10` | 1.80 | `s10.minimumPostClipHoldSeconds = 1.8` | ✅ |
| END card hold | 2.40 | **prose only** — `s10.postClipHoldPolicy` mentions it in a string; there is no field for it | ⚠ **A-L8** |
| inside `s10`'s question | **0.15** | `pauseAfterSeconds` between `"'Hôm nay có chuyện gì"` and `"với bạn thế?'"` — while `voice-direction.md` says *"no pause inside"* | ❌ **A-T3** |
| inside `s1` | 0.22 | `pauseAfterSeconds`, while `voice-direction.md` says *"none inside"* | ⚠ **A-L9** |

All fourteen `minimumPostClipHoldSeconds` values match `script.md` §1 exactly (0.35/0.25/0.70/0.45/1.20/0.35/0.45/0.90/0.45/0.55/1.60/0.90/0.70/1.80). No split keys are needed this round because every dramatic beat lands on a shot boundary — that is a correct design, not a shortcut: `s8` in particular is a one-clause fragment with no honest internal split point.

---

## 4 · Phrase-to-canonical fidelity and the performance contract

The repo enforces this at `scripts/gen-voice-clone.py:146` (`" ".join(phrase.text …) != canonical_text` → hard error) and `scripts/validate_voice_performance.py`. I reproduced the check by hand for all 14 keys.

| key | phrases joined with one space | = `voice.proposed.json` |
|---|---|:--:|
| `s1` | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | ✅ |
| `s2` | `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` | ✅ |
| `a1` | `Vai người khác nhẹ hẳn xuống. Còn bạn đứng ngoài.` | ✅ |
| `s3` | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | ✅ |
| `a2` | `Mưa ngoài cửa sổ, đều đều.` | ✅ |
| `s4` | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | ✅ |
| `s5` | `Rồi nghĩ một lúc, bạn lại thôi.` | ✅ |
| `a3` | `Ngón tay bấm xoá từng chữ.` | ✅ |
| `s6` | `Không phải vì không có ai để nhắn.` | ✅ |
| `s7` | `Mà vì bạn đã quen với việc mình phải là người ổn.` | ✅ |
| `s8` | `Bạn biết không…` | ✅ |
| `s9` | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | ✅ |
| `a4` | `Chiếc ô nghiêng đi. Mưa rơi lên vai bạn.` | ✅ |
| `s10` | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | ✅ |

**14/14 byte-for-byte.** Also verified:
- Every phrase object uses only fields `gen-voice-clone.py:84-122` consumes (`text`, `tempoIntent`, `emphasis`, `pauseBeforeSeconds`, `pauseAfterSeconds`, `seed`, `controls`); no unknown field will be rejected.
- No `actingCue`, no `[cười]` / `[thở dài]` / `[hắng giọng]` anywhere; `experimentalCues.enabled = false`; `ACTING_CUE` at `gen-voice-clone.py:28` would reject them if they appeared.
- No unsupported engine control: every `controls` object is exactly `{"denoise": false}`; `rate/pitch/volume/atempo/style` appear only in `engine.unsupportedControls` and `postProcessingRestrictions`.
- No direction leaks into speech or captions: `voice.proposed.json` contains only words, and every caption chunk in `script.md` §3 reproduces the canonical words exactly (checked all 14 rows).
- `on-screen text` word counts: 6, 5, 4, 6, –, 5 (bubble), 3, 6, 6, 6, –, 6, 5, 6 — all ≤ 6 except the END card (**A-L11**).

**Is a `pending` reference acceptable at gate A?** In principle yes — a proposal may record a limitation it cannot resolve, and inventing a slug would be worse. **Here it is not acceptable**, because the pending state is not true on this machine: `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav` exists, `brief.md:10` names route 2 + that exact file + "benchmark selection confirmed by user", and `status.json`'s own log records *"route 2 Thanh Long reference accepted"*. As written, `gen-voice-clone.py` would resolve `pending voice-route benchmark` against the repo root and abort with `FileNotFoundError` on the first shot. → **A-C1**

---

## 5 · Scores

| item | score | evidence |
|---|---:|---|
| **3 · Clarity / retellability** | **8** | One-sentence retell is clean (§0). First counterweight only at 8.04 s (`a1`), first feeling at 27.92 s. Highest-risk exit at ~32.2 s: `s8` + 1.60 s hold = 2.37 s of near-nothing right after the video's biggest investment point; second at ~16.7 s (`a2` + 1.20 s hold = 2.74 s). Nothing at risk of misunderstanding; the risk is two loaded silences and a flat 0–7.79 s. |
| **4 · Spoken naturalness** | **7** | 10/10 owner lines natural and need no change; no breath unit exceeds 11 syllables; no tongue-twister, no unpronounceable term, no caption-shaped owner line. Against that: `a1` `nhẹ hẳn xuống` is an unnatural collocation on a body part and `Còn bạn đứng ngoài.` is clipped-literary — and `a1` is contrast pair 1 (**A-T2**); `a2` is a lyric fragment in a brief that says *conversational* (**A-L6**); `a3` shifts the subject from *bạn* to `Ngón tay` (**A-L7**); and the climax question is cut in half by 0.15 s (**A-T3**). Four notes across four added lines plus the climax = sayable, but not yet indistinguishable from speech. |
| **5 · Timing feasibility** | **8** | Every number in §1 reproduces: 142 syl, 13.05 s silence, 46.86 / 49.46 / 51.43 s at 4.2 / 3.9 / 3.7, all 14 per-shot starts, the re-hook inside 15–20 s at every rate, the first proof at 4.16 / 4.45 / 4.67. Inside 45–55 s at every modelled rate with a stated contingency, never accelerating audio. Held down by: a false recovery figure (2.65 s, not 5.15 s — **A-T5**), a tail described as 2.40 s when the arithmetic gives 4.20 s (**A-T4**), an unverifiable 41 % historical claim (**A-L10**), and no model above 4.2 syl/s. |
| **10 · Voice-direction feasibility** | **6** | Direction *quality* is 9-material: 14/14 keys carry intent, emotion, accentWords, tempoIntent, ending contour, hold and policy; pauses are real, never punctuation; no acting cue, no unsupported control; nothing leaks into speech or captions; 14/14 exact reassembly. But the contract **cannot be executed as handed over** — all 14 `reference` fields are `pending voice-route benchmark` while the brief and the status log record route 2 as accepted and the wav is on disk (**A-C1**); the climax question is split by 0.15 s against its own direction (**A-T3**); the END hold exists only as prose (**A-L8**); `s1`'s direction and the sidecar disagree about an internal pause (**A-L9**). One Cao away from 9. |

**Lens mean = (8 + 7 + 8 + 6) / 4 = 7.25 → 7.3.** Blocking outcome comes from the open tickets, not only the average.

---

## 6 · Visual feasibility at 1080×1920 (lens)

- **Deterministic-by-frames:** every ambient/structural element is buildable — rain beads and drips (`s1`, `s3`), lamp broken into moving dots on water (`a2`), cursor blink (`s3`), characters appearing/vanishing one by one (`s4`, `a3`), rain stopping mid-shot (`s7`), wet patch spreading (`a4`), rain thinning (`END`), and all three push-ins (1.00→1.03 / 1.04 / 1.05) are frame-driven. No `Date.now()`, no `Math.random()`, no live video is required by any of it.
- **Recreated UI** is correctly labelled `minh hoạ` on both cases (`s4` chat bubble, `s6` incoming call) and `s6`'s label is present in `script.md` even though `brief.md:51` says none are expected — keep the labels.
- **Safe zone / captions:** caption bottom edge at y ≈ 1710 px puts every glyph above the 1710 px line; longest caption line is 27 characters (`Người thường xuyên che ô cho`), under the 28 cap; two caption-free shots (`a2`, `s8`) are fine for a story profile.
- **The recurring human figure is the real risk.** `s3` "into her face", "the black screen reflects her eyes"; `a3` "the screen goes black and shows her face"; `s6` "Her face in the phone glow"; `s10` "she looks up"; `s5` "pulls her knees up"; `s1` "someone smaller beside her". No figure treatment is declared anywhere, and the thesis of the video is two pixels of shading — a **dry** collar at `s1` versus a **wet** patch spreading on the same collar at `a4`. A stylised figure can carry that; an unspecified one cannot be designed or costed. → **A-L12**
- **Continuity of the through-line object:** `s9`/`a4` say "Back on the street in the rain" without asserting it is the same street, umbrella, companion and collar as `s1`. Contrast pair 2 only reads if the viewer recognises the frame. → **A-L13**
- **Light arc:** "first warm amber" is claimed at `s7` and again at `s9`, while `s1` already has "one warm street lamp behind". The turn needs a distinguishable warmer source, not a repeated claim. → **A-L14**
- **Crossfades add no time.** Phase 4b compensates transitions against the measured voice spans, so the 49.46 s total survives a boundary transition at every cut. Checked, no ticket.

---

## 7 · Tickets

| id | severity | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **A-C1** | **Cao** | `voice-performance.proposed.json` — all 14 `shots.*.reference.source`; `voice-direction.md` §Voice reference (lines 9–17); `script.md` line 165; `status.json` `voice: "tbd"` + `paths.out: …-tbd` | `brief.md:10` names route 2 and `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav`, and `status.json` log 23:32:07 records "route 2 Thanh Long reference accepted" — but all 14 references read `pending voice-route benchmark`, and the stated reason (missing `vietnamese-voice-samples/previews/`) does not apply to a route that already has a cut local reference. `gen-voice-clone.py:521-523` resolves the source against the repo root and aborts with `FileNotFoundError`. The proposal is unexecutable and misstates this machine. | Set all 14 to `{"source": "docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav"}` (optionally with `startSeconds`/`durationSeconds`), set `referenceSelectionStatus` truthfully, set `engine.name` to the chosen VieNeu route, replace `benchmark.whyPending`/`status`/`selectedReference`/`resolvedReferencePath` with the real decision, and rewrite the §Voice reference section. If the user's confirmation does not actually exist, correct `brief.md:10` instead — one authoritative statement, five files agreeing. Director then runs `pipeline.py voice <vid> thanh-long`. | `script-agent` (+ `video-director` for `status.json`) | `python3 scripts/validate_voice_performance.py <vid>` passes after the director copies to `voice.json` / `voice-performance.json`; `gen-voice-clone.py` gets past `reference_for_shot` for `s1`; no `pending voice-route benchmark` string remains in `docs/<vid>/`; `status.json` `voice` and `paths.out` no longer say `tbd`. |
| **A-T2** | Trung | `a1` — `voice.proposed.json:4`, `script.md:64`, sidecar `shots.a1` | `nhẹ hẳn xuống` puts an emotional adverb on a body part; Vietnamese shoulders *hạ / chùng / rơi / xệ*. `Còn bạn đứng ngoài.` without `thì` is clipped-literary. This is contrast pair 1. | `Vai người khác hạ hẳn xuống. Còn bạn thì đứng ngoài.` (11 syl). Then update: `a1` speech 2.56 → **2.82 s**, slot 8.04–**11.56**, total at 3.9 **49.72 s**, at 4.2 **47.10 s**, at 3.7 **51.70 s**, re-hook `s4` start 18.59 s (still inside 15–20 s), and the §1 table + §5 count (142 → 143 syl). | `script-agent` | Recount from the JSON: `a1` = 11 tokens, grand total 143; every §1 second recomputed; `s4` start between 15.00 and 20.00 at all three rates; a native reader says the line without hesitating on either sentence. |
| **A-T3** | Trung | `s10` — sidecar `shots.s10.phrases[1].pauseAfterSeconds = 0.15` vs `voice-direction.md:83` "no pause inside" | The quoted question `'Hôm nay có chuyện gì với bạn thế?'` is 8 syllables, one breath, one contour — and it is the only rising contour in the video. 150 ms of silence after `gì` is about the length of a phrase-final stop, so the engine will very likely deliver two statements instead of one question. | Merge phrases 2 and 3: `"'Hôm nay có chuyện gì với bạn thế?'"` with `pauseAfterSeconds: 0.0`, keeping phrase 1's 0.30. Reassembly still exact. Alternatively raise the gap to ≥ 0.30 **and** correct `voice-direction.md`. | `script-agent` | `" ".join(phrases)` still equals the canonical `s10`; `s10.phrases` has 2 entries; `voice-direction.md` and the sidecar state the same pause plan; `scripts/validate_voice_performance.py` passes. |
| **A-T4** | Trung | `script.md` §4 row "2.40 END card" + `voice-direction.md` §Ending behaviour (line 64) + `voice-performance.proposed.json` `shots.s10.postClipHoldPolicy` | The last word ends at **45.26 s**; `s10`'s hold runs to 47.06 s; the END card runs 47.06–49.46 s. Silence after the final word is therefore **4.20 s**, not the 2.40 s the prose states, and "BGM cuts out on the last word" means the mix is dead from 45.26 s. | State the tail as one number in all three files: *"the last word ends at 45.26 s; BGM cuts there; `s10` post-clip hold 1.80 s (45.26–47.06); END card 2.40 s (47.06–49.46); total audio tail 4.20 s."* If a 2.40 s total tail was intended, set `s10.minimumPostClipHoldSeconds` to **0.60** and recompute the §1 table (total 48.26 s, still inside). | `script-agent` | The three files agree on one tail figure; `45.26 + hold + 2.40 = total` holds in `script.md` §1. |
| **A-T5** | Trung | `script.md` §4, "Too long" elasticity bullet | The six listed cuts recover 0.60+0.50+0.40+0.30+0.25+0.60 = **2.65 s**, not the stated 5.15 s. This is the only stated bound on how much silence the plan can return. | Replace "5.15 s" with **"2.65 s"** and add the check it enables: *"at 3.3 syl/s the total is 56.08 s; these cuts bring it to 53.43 s, inside the ceiling."* | `script-agent` | The six deltas sum to the stated recovery; the worst-case sentence re-derives from 142 ÷ 3.3 + 13.05 − 2.65. |
| **A-L6** | Thấp | `a2` — `voice.proposed.json:6`, `script.md:66` | `Mưa ngoài cửa sổ, đều đều.` is a lyric fragment; `đều đều` standing alone is poetic, not conversational, in a brief that asks for conversational delivery. The file itself calls it "said to the room". | Optional: `Mưa ngoài cửa sổ rơi đều đều.` (7 syl). Combined with **A-T2**: total 144 syl → 49.97 s at 3.9, 47.34 at 4.2, 51.97 at 3.7; re-hook `s4` 18.85 s. | `script-agent` | If changed, §1 and §5 recount to 144 and the re-hook stays inside 15–20 s; if not, keep and accept as a declared stylistic choice. |
| **A-L7** | Thấp | `a3` — `voice.proposed.json:9`, `script.md:69` | Subject switches from *bạn* to `Ngón tay` in a video that addresses one person; reads as narration of a screen rather than speech to the viewer. | Optional: `Bạn bấm xoá từng chữ một.` (7 syl). Combined with **A-L6**: total 145 syl → 50.23 s at 3.9, 47.57 at 4.2, 52.24 at 3.7; re-hook `s4` 19.11 s (still inside the window). | `script-agent` | Same recount check as **A-L6**. |
| **A-L8** | Thấp | `voice-performance.proposed.json` — no field for the END hold (only `s10.postClipHoldPolicy` prose) | The 2.40 s ending hold is a deliberate beat that exists only in a string, so a timeline builder reading the contract as data cannot see it. | Add a top-level `"ending": {"silentCardSeconds": 2.4, "postClipHoldSeconds": 1.8, "audioTailSeconds": 4.2, "elasticRange": [1.8, 5.2]}` next to `benchmark`. | `script-agent` | `json.load` on the file exposes the END hold as a number; the numbers agree with **A-T4**. |
| **A-L9** | Thấp | `voice-direction.md:70` (`s1` "none inside") vs sidecar `shots.s1.phrases[0].pauseAfterSeconds = 0.22` | The direction denies an internal pause the contract actually inserts. | Either set `s1.phrases[0].pauseAfterSeconds` to **0.0**, or change the direction cell to "no breath inside; 0.22 s clause gap between `bạn` and `mỗi khi`". | `script-agent` | Direction cell and sidecar state the same pause; `validate_voice_performance.py` passes. |
| **A-L10** | Thấp | `script.md` §4, "All 13.05 s of planned silence is motivated" paragraph | "the previous 10-key draft spent 19.25 s = 41 %" refers to a draft that is not on disk, and 19.25 ÷ (28.46 + 19.25) = **40.3 %**. | Restate as "≈40 %" or delete the historical figure; keep only the forward-looking elasticity list. | `script-agent` | No unverifiable number remains in §4. |
| **A-L11** | Thấp | `script.md` §2, `END` row — on-screen `bạn chỉ đã mạnh mẽ quá lâu.` | 7 space-separated words, over the ≤6-word per-element cap. The owner's title line is verbatim and cannot be cut (`script.alt-1.md:220` shows the alternative — dropping the repeated `Bạn` — breaking verbatim). | Declare the exception in §2/§6 rather than breaching the cap silently: "END card line 2 = 7 words, 27 characters, owner's verbatim title line, 2.40 s static card — a declared cap exception, not an oversight." | `script-agent` | The exception is written down where the cap is stated; the text stays verbatim. |
| **A-L12** | Thấp | `script.md` §2 `image/action` column — `s1`, `s2`, `s3`, `a3`, `s5`, `s6`, `s10` | The column is written as live action with no figure treatment declared ("into her face", "reflects her eyes", "Her face in the phone glow", "she pulls her knees up onto the bed", "she looks up"). The video's thesis is a dry collar at `s1` versus a spreading wet patch on the same collar at `a4`. | Add a `figure treatment` line to §2 (one consistent stylised figure across all 15 shots, no photoreal face) and pre-map the two body-state beats to a mechanism: dry = no rim highlight / no dark wash; wet = a dark wash driven by frame. Downgrade "her face" to "her head/figure" where a face cannot be delivered. | `script-agent` (art direction is the design-agent's at gate D) | Every shot's image can be drawn without a photo, an actor or stock footage; `s1` dry vs `a4` wet is expressible as a stated visual property. |
| **A-L13** | Thấp | `script.md` §2 — `s9` / `a4` rows | "Back on the street in the rain" does not assert it is the same street, umbrella, companion and collar as `s1`. Contrast pair 2 only lands if the viewer recognises the frame. | Mark `s9` and `a4` as *the same street, the same black umbrella, the same companion, the same collar* shown in `s1`, and add it to the CP2 row in §6. | `script-agent` | CP2 in §6 states the identity chain; the design-agent can map `s1`/`s9`/`a4` to one asset. |
| **A-L14** | Thấp | `script.md` §2 — `s7` and `s9` light notes | Both claim "the first warm amber", while `s1` already has "one warm street lamp behind". | Disambiguate: `s1` = the street's own cold-warm lamp; `s7` = first amber *interior*; `s9` = a distinct warmer source (the lamp seen from the other side / the amber headline accent) that visibly turns the palette. | `script-agent` | No two shots claim the same "first"; the palette turn at `s9` is stated as a distinct source. |
| **A-L15** | Thấp | `docs/<vid>/script.alt-1.md`, `script.alt-2.md` | Both still describe a primary that no longer exists (they quote 134 syl / 48.41 s, first proof 4.38 s, re-hook 18.44 s — the real `script.md` is 142 syl / 49.46 s / 4.45 s / 18.33 s). `SKILL.md` §Speed rule: the director picks one and deletes the rest from the handoff. | Delete both alt files, or have them refreshed against the current `script.md` before the packet is released to Phase 3. | `video-director` | No file in `docs/<vid>/` describes a different primary; a reader of any single file cannot be misled about the timeline. |

**Open: 1 Cao, 4 Trung, 10 Thấp.**

---

## 8 · What I could not verify

1. **No audio was rendered and nothing was listened to.** I have no hearing, no shell and no playback. Nothing here proves that any line *sounds* natural, warm, intimate or emotionally expressive. `voice-performance.proposed.json` itself says `"naturalnessEvidence": "not verified by listening"`; that label is correct and must survive to `audio-review.md`. Every "natural / sayable" verdict in §1 is my reading of the text as a Vietnamese speaker, not a measurement.
2. **Machine checks cannot prove natural delivery or emotion.** ASR/CER proves words, never prosody. `emphasis`, `tempoIntent`, `ending` and `emotion` in this file are *requests to a human reader of the plan*; whether the installed engine realises any of them is unknowable from here.
3. **The engine's real pause behaviour is unknown.** `pauseAfterSeconds` is asserted to be real padding in `gen-voice-clone.py`; I could not run it. Whether 0.14–0.32 s is enough for a clause break, and whether the engine adds its own tail silence after `s8`'s `…` (which would lengthen the 1.60 s hold rather than replace it), can only be seen in measured clips.
4. **Whether `s10` can carry a real rising question contour on this voice** — the one thing the climax depends on, and the reason **A-T3** matters. Only synthesis and listening can tell.
5. **`voice-ref/refThanhLong.wav` was located but not inspected.** I confirmed the path exists by glob; I could not `stat` it, check its size, format, duration, or that it is single-speaker and music-free as `brief.md:10` claims.
6. **The preview-catalogue test could not be run**, so I cannot say whether `scripts/test_voice_catalog.py` would pass on a machine that has `vietnamese-voice-samples/previews/`. I read `vietnamese-voice-samples/**` as returning no files at all here.
7. **No repository command was executed** — not `pipeline.py audit`, not `validate_voice_performance.py`, not `voice:measure`. I reproduced the reassembly contract by reading `gen-voice-clone.py:146` and applying it by hand, and I reproduced the timing arithmetic from `voice.proposed.json`. The director must still run the real commands.
8. **The measured rate is unknown.** Every second in this report is a 3.7–4.2 syl/s planning estimate. Phase 3b measurement will move all of them; only the holds and the elasticity absorb the difference.
9. **BGM and SFX coverage of the quiet spans** (≈16.7 s and ≈32.2 s) is out of scope here — the `audio` stage owns it, and whether those 2.7 s and 2.4 s read as tension or as a drop cannot be judged from the script alone.
10. **Visual feasibility stops at "buildable from frames".** Whether the stylised figure is *good* is gate D's judgement on frames I have not seen, and the actual retention behaviour of a 4.20 s silent tail can only be measured after publication, never by a script review.

---

## Round 2 — lens: spoken naturalness, timing & performance feasibility

Reviewer: `script-reviewer-r2-spoken` (clean context; wrote neither the packet nor round 1).
Video `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · profile `story` · 9:16 1080×1920 @30 fps · owner duration 45–55 s.
Read: `script-review.md`, this file's round 1, `brief.md`, `script.md`, `voice.proposed.json`, `voice-performance.proposed.json`, `voice-direction.md`, `status.json`, `hook-options.md`, `docs/<vid>/voice-ref/` (listing only), `.agents/rules/*`, `.agents/roles/script-reviewer.md`, `.agents/roles/voice-agent.md`, `.agents/skills/ray-pineline-worflow-agent/SKILL.md` (Phase 2a, Phase 2b, Gate A, last bullet of Common failure points), `scripts/gen-voice-clone.py` (lines 60–194), `scripts/validate_voice_performance.py`.

**No command was run.** This runtime has no shell or process tool. I could **not** run `pipeline.py audit` (and my role's own Return section and the director both forbid it here), `scripts/validate_voice_performance.py`, `scripts/gen-voice-clone.py`, `ffprobe`, or `python3 -m unittest scripts.test_voice_catalog`. Every number below was recounted by hand from the files on disk. Round 1's arithmetic was re-derived from scratch; I did not carry it forward.

### 1 · Closure table — every round-1 ticket in this lens

| id | sev (r1) | verdict | evidence I checked myself |
|---|---|---|---|
| **A-C1** | Cao | **CLOSED for gate A** (status.json clause still open, director-owned) | All **13** `shots.*.reference.source` values read `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav` (`voice-performance.proposed.json:75,106,137,168,190,221,252,283,314,345,376,398,429`); `referenceSelectionStatus: "selected"` on all 13; `engine.name` = "route 2 — local VieNeu clone (~/.venvs/vieneu)"; `benchmark.ownerConfirmed: false` and `ownerConfirmationEvidence` says so in writing; `benchmark.status` = "route selected — no pending state remains in this packet"; `voice-direction.md:9–17` rewritten to match. `grep` finds **zero** occurrences of `pending voice-route benchmark` in any packet file. `gen-voice-clone.py:180` accepts `source` alone as a reference field, and `:178` only rejects URL schemes, so the repo-relative path is executable. **Not closed:** `status.json:5` `"voice": "tbd"` and `status.json:9` `paths.out: "ban-khong-yeu-duoi-chi-da-manh-qua-lau-tbd"` still say `tbd` (ticket's own acceptance check). That file is director-owned and resolves at `pipeline.py voice <vid> thanh-long` after A passes — it does not block gate A, but it is not closed. |
| **A-T2** | Trung | **CLOSED** | `voice.proposed.json:4` = `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` — 10 tokens. `chùng` is the ordinary Vietnamese verb for shoulders dropping (*vai chùng*, *vai chùng xuống*), and `Còn bạn thì…` restores spoken register. Said silently: no hesitation on either sentence. The producer used its own variant, not my 11-token proposal — that is allowed, and the ticket's substantive check (recount, re-hook inside 15–20 s, native-readable) passes: see §2.3. |
| **A-T3** | Trung | **CLOSED** | `shots.s10.phrases` has **2** entries; the whole question `'Hôm nay có chuyện gì với bạn thế?'` is one phrase with `pauseAfterSeconds: 0.0`. `voice-direction.md:85`, `script.md:135` and `script.md:220` all say "no internal pause". Reassembly still exact (§5). |
| **A-T4** | Trung | **PARTIALLY closed → NEW-1** | The tail is now one number: `1.90 + 3.10 = 5.00 s` in `script.md:194`, `script.md:244`, `voice-direction.md:67`, `ending.audioTailSeconds`, `ending.audioTailNote`. Round 1's 4.20-vs-2.40 error is gone. **But the anchor that number hangs on is wrong:** `ending.lastWordEndsAtSeconds: 43.6`, `script.md:64`, `script.md:136`, `script.md:194` and `voice-direction.md:67` all place the last word at 43.60 s, while the packet's own §1 table prints 43.90 s for the same event (`script.md:37`, `voice-direction.md:54`). The acceptance check in its new form — `lastWord + hold + card = total` — fails by 0.30 s. → **NEW-1**. |
| **A-T5** | Trung | **PARTIALLY closed → NEW-3** | The false 5.15 s is gone and 2.60 s is real *for four of the five cuts listed*. `script.md:198` lists five steps totalling **3.10 s**, calls them "four", and asserts 2.60 s. Its worked example (3.0 syl/s → 58.67 → 56.07) is arithmetically right; its break-even sentence ("a 3.29 syl/s run back to exactly 55.00 s") is wrong — 3.29 syl/s gives 54.94 s before any cut. Severity drops Trung → Thấp: the residual error *understates* recoverable time by 0.50 s and cannot push the video out of band. |
| **A-L6** | Thấp | **CLOSED** | `a2` rewritten to `Ngoài cửa sổ, mưa rơi đều.` (`:7`) — 6 tokens, count unchanged, `đều đều` gone. Recount done throughout. Register nit kept as a weakness, not a ticket (§8 W2) — the ticket is closed, I do not re-litigate it. |
| **A-L7** | Thấp | **CLOSED** | `a3` no longer exists in speech. `voice.proposed.json` has 13 keys, none is `a3`; the beat is `img1`, image-only, staged inside `s5`'s 1.70 s hold (`script.md:129`, `noVoiceKeyShots` in the sidecar). The `Ngón tay` subject shift is gone with it. |
| **A-L8** | Thấp | **CLOSED** | `ending` (`:52–60`) exposes `postClipHoldSeconds`, `silentCardSeconds`, `audioTailSeconds` as data. A timeline builder reading the contract as data now sees the END hold. |
| **A-L9** | Thấp | **CLOSED** | `voice-direction.md:73` now states "**but a real 0.22 s clause gap between `bạn` and `mỗi`** (sidecar `pauseAfterSeconds`)", matching `shots.s1.phrases[0].pauseAfterSeconds = 0.22`. Direction and contract now agree. |
| **A-L10** | Thấp | **CLOSED** | The "previous 10-key draft spent 19.25 s = 41 %" claim is gone from §5; `grep` finds no `19.25` anywhere in the packet. |
| **A-L11** | Thấp | **CLOSED** | `script.md:265–267` declares the exception where the cap is stated: "7 words, one over this video's ≤ 6-word on-screen cap … not repaired by dropping the repeated `Bạn` … `content-agent` must split it as written". Text stays verbatim. |
| **A-L12** | Thấp | **CLOSED with one residual → NEW-6** | `script.md:97–111` §2.3 declares the hero as vector/SVG plates with a micro-action → frame-property table and states "The face is never required … it now says 'her head' or 'her figure'". `s6` and `img1` were downgraded. One instance survives: `script.md:125` still says "the black screen reflects her **eyes**". |
| **A-L13** | Thấp | **CLOSED** | `script.md:133` asserts the chain in the row itself — "The same street as frame 0 — **asserted, not implied**: the same scuffed black umbrella (identical metal tip), the same child beside her under the rim, the same collar" — and §6.1 CP2 lists `s1 frame 0 → s9 → img2 → s10`. |
| **A-L14** | Thấp | **CLOSED** | §2.1 publishes one light plan L0–L4 with exactly one "first" (**L1** at `a1`); `voice-direction.md:31` references ids only and never re-describes an arrival; §6.2:222 lists which shots carry a light beat. The duplicated "first warm amber" is gone. |
| **A-L15** | Thấp | **STILL OPEN** (director-owned) | `docs/<vid>/script.alt-1.md` and `script.alt-2.md` are still on disk and still describe a primary that no longer exists — `script.alt-1.md:107` still quotes "3.7 → 48.27 s · 3.9 → 46.58 s · 4.2 → 44.35 s (0.65 s under the owner's 45 s floor)", a band that contradicts the real `script.md` (46.58 / 48.90 / 50.66) and a *false* alarm (the real 4.2 case is 46.58 s, 1.58 s **above** the floor). The gap widened this round. Not mine to fix; it needs a director decision. |

**Round-1 tickets in this lens: 11 closed, 2 partially closed (A-T4, A-T5 — residuals become NEW-1, NEW-3), 1 still open (A-L15).** Open Cao in this lens: **none**.

### 2 · Independent recount from `voice.proposed.json`

#### 2.1 Space-separated syllables

| key | tokens (recount) | `script.md:23–39` | match |
|---|---:|---:|:--:|
| `s1` | 11 | 11 | ✅ |
| `s2a` | 9 | 9 | ✅ |
| `a1` | 10 | 10 | ✅ |
| `s2b` | 9 | 9 | ✅ |
| `s3` | 15 | 15 | ✅ |
| `a2` | 6 | 6 | ✅ |
| `s4` | 8 | 8 | ✅ |
| `s5` | 7 | 7 | ✅ |
| `s6` | 8 | 8 | ✅ |
| `s7` | 12 | 12 | ✅ |
| `s8` | 3 | 3 | ✅ |
| `s9` | 14 | 14 | ✅ |
| `s10` | 15 | 15 | ✅ |
| **total** | **127** = owner 111 + `[ADD]` 16 | 127 | ✅ |

`s2a + " " + s2b` = `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` — byte-for-byte owner line #2 from `brief.md:19`, so the split is fidelity-clean. Sidecar `ownerSyllables: 111` / `addedSyllables: 16` / `planningSyllables: 127` all reproduce.

#### 2.2 The published identity and the three totals

`Σ pauseAfterSeconds` re-added from the 13 shots (final phrases are all 0.0): 0.22+0.28+0.24+0.26+0.14+0.24+0.18+0.18+0.24+0.26+0.30 = **2.54** ✅
`Σ minimumPostClipHoldSeconds`: 0.30+0.25+0.30+0.35+1.05+0.25+0.40+1.70+0.50+0.60+1.80+1.30+1.90 = **10.70** ✅
END **3.10** → fixed silence **16.34 s** ✅; 16.34 ÷ 48.90 = **33.4 %** ✅.

| rate | 127 ÷ rate | + 16.34 | my total | packet | inside 45–55 |
|---:|---:|---:|---:|---:|:--:|
| 4.2 | 30.2381 | 16.34 | **46.578** | 46.58 ✅ | ✅ 1.58 s above the floor |
| 4.1 | 30.9756 | 16.34 | 47.316 | 47.32 ✅ | ✅ |
| 4.0 | 31.7500 | 16.34 | 48.090 | 48.09 ✅ | ✅ |
| **3.9** | 32.5641 | 16.34 | **48.904** | 48.90 ✅ | ✅ |
| 3.8 | 33.4211 | 16.34 | 49.761 | 49.76 ✅ | ✅ |
| 3.7 | 34.3243 | 16.34 | **50.664** | 50.66 ✅ | ✅ 4.34 s below the ceiling |

Break-even floor: `127/r = 45 − 16.34 = 28.66` → **r = 4.4319 → 4.43** ✅. Break-even ceiling: `127/r = 38.66` → **r = 3.2850 → 3.29** ✅ (the packet rounds 3.285 up to 3.29, which is the safe direction). `script.md:54`'s claim that the packet is inside 45–55 s for any measured rate in 3.29–4.43 reproduces. This is genuinely better than round 1: the band is now symmetric, both ends are derived, and there is a stated elasticity in each direction.

#### 2.3 Every per-shot start, hold and end, re-derived from unrounded values

`start(next) = start(prev) + syl/rate + pauseAfter + postClipHold`.

| key | start @4.2 | start @3.9 | start @3.7 | packet @3.9 |
|---|---:|---:|---:|:--:|
| `s1` | 0.0000 | 0.0000 | 0.0000 | ✅ |
| `s2a` | 3.1390 | 3.3405 | 3.4930 | ✅ 3.34 |
| `a1` | 5.8119 | 6.1782 | 6.4554 | ✅ 6.18 |
| `s2b` | 8.7329 | 9.2823 | 9.6981 | ✅ 9.28 |
| `s3` | 11.2257 | 11.9400 | 12.4805 | ✅ 11.94 |
| `a2` | 16.1071 | 17.0962 | 17.8446 | ✅ 17.10 |
| `s4` (re-hook) | 17.9257 | 19.0246 | 19.8562 | ✅ 19.02 |
| `s5` | 20.4705 | 21.7159 | 22.6584 | ✅ 21.72 |
| `s6` | 24.0171 | 25.3908 | 26.4303 | ✅ 25.39 |
| `s7` | 26.6019 | 28.1221 | 29.2724 | ✅ 28.12 |
| `s8` | 30.2990 | 32.0390 | 33.3557 | ✅ 32.04 |
| `s9` | 32.8133 | 34.6082 | 35.9665 | ✅ 34.61 |
| `s10` | 37.7067 | 39.7579 | 41.3103 | ✅ 39.76 |
| `END` | 43.4781 | 45.8041 | 47.5643 | ✅ 45.80 |
| **total** | **46.578** | **48.904** | **50.664** | ✅ 48.90 |

**Every hold reproduces**: 0.22/0.30/0.28/0.25/0.24/0.30/0.26/0.35/1.05/0.14/0.25/0.24/1.70/0.18/0.50/0.24/0.60/1.80/0.26/1.30/0.30/1.90/3.10 = 16.34 s, matching `script.md:169–192`'s silence table line for line (24 rows). Re-hook inside 15–20 s at **all three** rates ✅ (17.93 / 19.02 / 19.86).

Structural marks:
- hook complete (`s1` last syllable) = 11/r = **2.62 / 2.82 / 2.97** ✅ (≤3 s at every rate).
- `a1` first sentence, **word end** = a1 start + 5/r = **7.00 / 7.46 / 7.81** ✅ matches `script.md:61`, `brief.md:58`, `hook-options.md:100`, `voice-direction.md:38`. **With the real 0.24 s intra-clip gap counted**, the first payoff sentence is audible as *finished* at **7.24 / 7.70 / 8.05 s** — 8.05 s at 3.7 syl/s, i.e. **0.05 s past the 8 s deadline** at the slowest modelled rate. Under the "shot start" reading used in round 1 (`a1` itself starts 5.81 / 6.18 / 6.46) the window is comfortable. The packet never states which convention it uses; that is a one-line clarification, not a defect in the beat itself.
- **last word of `s10`** = s10 start + 7/r + 0.30 + 8/r = **41.58 / 43.90 / 45.66**. The packet prints **41.28 / 43.60 / 45.36** → see **NEW-1**.

#### 2.4 The 5.00 s tail reproduces — from 43.90, not 43.60

`43.90 + 1.90 + 3.10 = 48.90` ✅ and `48.90 − 43.90 = 5.00 s` ✅. The identity in `ending` is right *except* for its anchor: `43.60 + 1.90 + 3.10 = 48.60 ≠ 48.90`. Root cause is one line of arithmetic: `s10` has **two** phrases and a real 0.30 s `pauseAfterSeconds` **between** them, so "start + 15/r" is not the last-word end. The same error appears in all three rate columns, so it is systematic, not a typo.

#### 2.5 Is 16.34 s of non-speech motivated everywhere?

I audited all 24 rows individually. **22 of 24 are motivated.** The two that are not:
- **0.25 s before `a1`** — structural, not dramaturgical: it exists because owner line #2 was split. Legitimate (it is the H-01 mechanism), but it is a cost of the fix, not a beat.
- **1.05 s after `s3`** — the only hold longer than 0.60 s with nothing staged inside it, and the position was *created* by this round's fix: the S-06 change moved it from after `a2` to before `a2` (`script.md:177`). Its stated justification ("moved ahead of the whisper so the re-hook lands on a beat") describes intent, but no shot row stages anything at 16.05–17.10 s. → **NEW-5**.
Everything else earns itself: 1.70 s stages `img1`, 1.30 s stages `img2`, 1.80 s after `s8` is the breath before the metaphor, 1.90 s after `s10` leaves the question in the room, 3.10 s is the required card, and 0.14–0.35 s clause gaps are functional.

**Does the fastest case still clear the 45 s floor after trims?** Yes, with a real margin: at the fastest modelled rate the total is 46.58 s (1.58 s above the floor), and §5's "too short" elasticity can add 2.90 s (END 3.10 → 5.20, then `s8` 1.80 → 2.60), which holds the floor down to a measured ≈2.17 syl/s. Audio is never sped up and no owner word is ever cut — stated in `script.md:198` and `voice-direction.md:67` ("`s10` is never re-read faster, slower or with more feeling to fill it"). That is the correct policy. One gap: stretching the END hold changes the "5.00 s tail" figure (1.90 + 5.20 = 7.10 s) and nothing says so; whoever applies the elasticity must recompute §1.

### 3 · Spoken test — the 13 lines said silently as a Vietnamese speaker

"Breath unit" = the largest run between natural pauses; a comfortable breath at this pace is 10–13 syllables.

| key | line | breath units | verdict | why |
|---|---|---|---|---|
| `s1` | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | 6 / 5 | **natural** | Everyday Vietnamese, owner verbatim. No TTS risk. |
| `s2a` | `Bạn biết cách an ủi. Biết phải nói gì.` | 5 / 4 | **natural** | Two clean statements; the second is short enough that the split does not hurt the rhythm. |
| `a1` | `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` | 5 / 5 | **natural — fixed** | *Vai chùng xuống* is ordinary Vietnamese (shoulders slump/drop); `Còn bạn thì…` is how a person actually says it. Reads as observation, not as a caption. It is still narration register, which the packet declares and the captions make explicit. |
| `s2b` | `Biết làm sao để người khác thấy ổn hơn.` | 9 | **natural** | Owner verbatim; the 0.24–0.30 s gap inside is a phrase break, not a breath. |
| `s3` | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | 4 / 11 | **natural** | Longest breath in the video is 11 syllables (2.82 s at 3.9) — inside one breath, but at 3.7 syl/s it is 2.97 s of continuous speech, the one place the voice-agent may need a real breath around `trước màn hình`. Not a defect; a note for Phase 3b. |
| `a2` | `Ngoài cửa sổ, mưa rơi đều.` | 3 / 3 | **sayable, mild written register** | Much better than round 1's `đều đều`. The fronted locative is slightly written; a speaker would say `Bên ngoài cửa sổ, mưa rơi đều.` Kept as a weakness (W2), not a ticket — A-L6 is closed and I will not move the bar on it. |
| `s4` | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | 3 / 5 | **natural** | Owner verbatim; the quotes are the owner's punctuation and engines read them as a quote boundary. |
| `s5` | `Rồi nghĩ một lúc, bạn lại thôi.` | 4 / 3 | **natural** | Owner verbatim; `lại thôi` is rueful, not self-pitying. |
| `s6` | `Không phải vì không có ai để nhắn.` | 6 / 2 | **natural** | Owner verbatim. |
| `s7` | `Mà vì bạn đã quen với việc mình phải là người ổn.` | 4 / 8 | **natural** | Owner verbatim, and the truest line is the easiest to say. |
| `s8` | `Bạn biết không…` | 3 | **natural** | Owner's own `…` kept verbatim; a real breath-word. |
| `s9` | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | 8 / 6 | **natural** | Owner verbatim; `thường xuyên` is the only cluster and it is routine. No tongue-twister. |
| `s10` | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | 7 / 8 | **natural — fixed** | The question is now one clause, one breath, no internal gap. The only rising contour in the video. |
| `END` | *(no voice key)* | — | **correct** | Silence is the delivery. |

**Breath/overload sweep.** No line exceeds one breath. No written-register word in any owner line. No tongue-twister, no unpronounceable term, no English, no `()`/`[]`/`*` marker in spoken text, nothing that reads as a caption. Round 1's four spoken defects — `nhẹ hẵn xuống`, `Còn bạn đứng ngoài.`, the `đều đều` lyric fragment, the `Ngón tay` subject shift, and the cut climax question — are all resolved, and the two `[ADD]` lines that survive are natural.

#### 3.1 Does splitting owner line #2 across `s2a` / `a1` / `s2b` feel natural to hear?

**My judgement: yes, it holds — and I want to be precise about why, because it was the highest-risk change in the packet.**

The danger was that owner line #2 is an **anaphoric triad** (`Bạn biết…` / `Biết phải…` / `Biết làm sao…`) and inserting a foreign observation between clauses 2 and 3 could break the build. What saves it:
1. `a1`'s two sentences are each syntactically complete and start on a new subject (`Vai…`), so the ear registers a *beat*, not a broken sentence.
2. The real gap is 0.25 s of timeline silence plus a new subject — short enough that the listener hears a deliberate hitch rather than a stumble, long enough that it is not mistaken for the owner's own third clause.
3. The third clause is self-contained, so a viewer who missed the interruption still understands it.

The real cost, which the packet does not name: **`s2b` now arrives 3.10 s after the payoff and is directed as "the slowest clause of the line, weighted landing"** (`voice-direction.md:76`, `script.md:124`). Styling the *third* statement of a triad as the slowest and heaviest, 3.1 s after the video's one declared payoff beat, makes it compete with `a1` instead of landing after it. That is a delivery-direction problem, not a wording problem, and it is fixable without touching an owner word → **W1**.

### 4 · The 5.00 s tail and the BGM anchor — one defect, five locations

The tail is now one number and the number is right. The anchor it hangs on is wrong, and the packet contradicts itself about it:

| file | line | says |
|---|---|---|
| `script.md` | `:37` (§1 table, `clip end s` for row 13) | **43.90** ← correct |
| `script.md` | `:64` (§1.1 structural mark) | 41.28 / **43.60** / 45.36 |
| `script.md` | `:136` (END row) | "**BGM cuts on the last word at 43.60 s**" |
| `script.md` | `:194` (§5) | "The last word ends at 43.60 s, BGM cuts there" |
| `voice-direction.md` | `:54` (emotional turn 6) | "**39.76–43.90 s** (`s10`)" ← correct |
| `voice-direction.md` | `:67` (§Ending behaviour) | "The last word ends at **43.60 s**; BGM cuts at that instant; `s10`'s post-clip hold runs 1.90 s to **45.80 s**" ← 43.60 + 1.90 = 45.50, not 45.80; **one sentence, two incompatible numbers** |
| `voice-performance.proposed.json` | `:53` | `"lastWordEndsAtSeconds": 43.6` |

Correct value: **41.58 / 43.90 / 45.66** at 4.2 / 3.9 / 3.7. Consequence if built as written: the mix stage kills the BGM **0.30 s before the climax question ends**, i.e. under `chuyện gì với bạn thế?` — the one place in the video where the music must not drop.

### 5 · Performance contract, verified against the executable path

`gen-voice-clone.py:134` requires `set(sidecar shots) == set(canonical)`. Sidecar has 13, `voice.proposed.json` has 13 ✅. `:146` requires `" ".join(phrase.text) == canonical` — reproduced by hand for all 13:

| key | `" ".join(phrase.text)` | = `voice.proposed.json` |
|---|---|:--:|
| `s1` | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | ✅ |
| `s2a` | `Bạn biết cách an ủi. Biết phải nói gì.` | ✅ |
| `a1` | `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` | ✅ |
| `s2b` | `Biết làm sao để người khác thấy ổn hơn.` | ✅ |
| `s3` | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | ✅ |
| `a2` | `Ngoài cửa sổ, mưa rơi đều.` | ✅ |
| `s4` | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | ✅ |
| `s5` | `Rồi nghĩ một lúc, bạn lại thôi.` | ✅ |
| `s6` | `Không phải vì không có ai để nhắn.` | ✅ |
| `s7` | `Mà vì bạn đã quen với việc mình phải là người ổn.` | ✅ |
| `s8` | `Bạn biết không…` | ✅ |
| `s9` | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | ✅ |
| `s10` | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | ✅ |

**13/13 byte-for-byte.** Also confirmed:
- **No acting cue**: no `actingCue` field, no `[cười]`/`[thở dài]`/`[hắng giọng]`; `experimentalCues.enabled = false`. `:93` and `:117` would reject them.
- **No unsupported control**: every `controls` object is exactly `{"denoise": false}`; `rate/pitch/volume/speed/atempo/style` appear only inside `engine.unsupportedControls` and `postProcessingRestrictions`, which the generator never reads as controls. `:98–102` and `:119` would reject anything else.
- **No field the generator would reject**: every phrase object uses only `text`, `tempoIntent`, `emphasis`, `pauseBeforeSeconds`, `pauseAfterSeconds`, `seed`, `controls`. Shot-level extras (`referenceSelectionStatus`, `intent`, `emotion`, `accentWords`, `ending`, `minimumPostClipHoldSeconds`, `postClipHoldPolicy`) are not validated by the generator, so they cannot abort a run.
- **Pauses are real, never punctuation**: `pauseImplementation` (`:67`) is explicit, and every deliberate beat in `script.md:169–192` maps to a `pauseAfterSeconds` (inside a clip) or a `minimumPostClipHoldSeconds` (a real inter-clip gap). The `SKILL.md:299` split-key rule is satisfied by construction.
- **No direction leaks into speech or captions**: `voice.proposed.json` is words only; every caption chunk in `script.md:146–158` concatenates back to the canonical line exactly for all 13 keys, including `s10`'s two two-line chunks. No intent/emotion text appears in any caption.
- **Accent-word contract** (`voice-direction.md:93`): every `accentWords` entry appears in at least one `emphasis` array of its own key — verified for all 13; and the set matches `script.md` §3's accent column in every row.
- **`validate_voice_performance.py`**: needs `voice.json`, `voice-performance.json`, `voice-direction.md` (the first two arrive after gate A) and requires each canonical key to appear in `voice-direction.md`. All 13 keys appear (line 5 lists them all, the shot table has a row each) ✅.
- **Playback order**: `gen-voice-clone.py` walks the canonical file in insertion order; `voice.proposed.json`'s order is `s1 · s2a · a1 · s2b · s3 · a2 · s4 · s5 · s6 · s7 · s8 · s9 · s10`, identical to `keyPlan.order` and to `script.md:6` ✅. The `a1` key sitting between two halves of an owner line is unusual but declared in `keyPlan.ownerKeys`/`addedKeys`/`noVoiceKeyShots`.

**Is the voice reference now executable by `gen-voice-clone.py`?** On the code path I could read: **yes.** `reference_for_shot` (`:164–187`) accepts a `{"source": "<repo-relative path>"}` object and only rejects URL schemes and unknown reference fields; `_resolve_local` (`:440`, called at `:521`) resolves against the repo root, and `:522` raises `FileNotFoundError` only if the file is absent — I confirmed by directory listing that `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav` exists. I did **not** run ffmpeg, ffprobe or the synthesis.

**What still cannot be proven without running the engine:** ASR text and CER per key; every clip's real duration and the real measured syllable rate; `silencedetect` gaps; LUFS-I / true peak / clipping; word-alignment confidence; timbre consistency; whether the clone actually matches Thanh Long; whether VieNeu realises any `emphasis` / `tempoIntent` / rising question contour; whether it appends its own tail silence after `s8`'s `…` (which would lengthen the 1.80 s hold rather than replace it); whether 0.14–0.32 s clause gaps are audible as clause breaks; and whether the 8.20 s reference is clean, music-free and single-speaker. `naturalnessEvidence: "not verified by listening"` (`:43`) states this correctly and must survive into `audio-review.md`.

### 6 · NEW tickets

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **NEW-1** | **Trung** | `voice-performance.proposed.json:53` `ending.lastWordEndsAtSeconds`; `script.md:64`, `:136`, `:194`; `voice-direction.md:67` | The last word of `s10` ends at **43.90 s**, not 43.60 s: `s10` has two phrases (7 + 8 syl) with a real `pauseAfterSeconds: 0.30` between them, so the last word is at `39.7579 + 15/3.9 + 0.30 = 43.9041`. `43.60` is `start + 15/r`, i.e. it silently drops the intra-clip gap. Five locations carry the wrong anchor; two (`script.md:37`, `voice-direction.md:54`) carry the right one. `voice-direction.md:67` is internally impossible: "43.60 s … 1.90 s to 45.80 s". `ending` fails its own identity: `43.60 + 1.90 + 3.10 = 48.60 ≠ 48.90`. Built as written, BGM cuts 0.30 s before the climax question ends. | Change the anchor to **43.90 s** in all five places (and to **41.58 / 45.66** for the 4.2 and 3.7 columns of `script.md:64`), so that `lastWordEnds + postClipHold + silentCard = total` holds in every file. Do not change the 5.00 s tail — it is already correct. | `script-agent` | `ending.lastWordEndsAtSeconds + ending.postClipHoldSeconds + ending.silentCardSeconds == benchmark.totalSecondsAt3_9` (43.90 + 1.90 + 3.10 = 48.90); the same three numbers appear identically in `script.md` §1.1, §3 END row, §5, `voice-direction.md` §Ending behaviour and the sidecar; no file contains "43.60". |
| **NEW-2** | Thấp | `script.md:186` (§5), `:66` (§1), `voice-direction.md:59`, `:83`, sidecar `shots.s8.postClipHoldPolicy` | Round 1's packet had `s8` = `s10` = 1.80 s, so "the longest beat in the video" was defensible. This round raised `s10.minimumPostClipHoldSeconds` to **1.90 s**, so three surviving strings are now false: `script.md:186` "**the breath before the payoff — the longest beat in the video**", `voice-direction.md:83` "1.80 s … the longest beat in the video", sidecar `shots.s8.postClipHoldPolicy` "the longest beat in the video", and `voice-direction.md:59` "no dramatic pause longer than the 1.80 s after `s8`" (s10's hold is 1.90). Separately, "the breath before the payoff" contradicts `script.md:66` ("One beat is called the payoff in this document and nowhere else: **`a1`**") — the named payoff is 26 s earlier. | Cheapest correct fix: set `s10.minimumPostClipHoldSeconds` back to **1.80** and move the freed 0.10 s into the END card (**3.20 s**), which keeps the total at 48.90 s and the tail at 5.00 s exactly. Then relabel s8's hold "the longest hold between voiced clips before the resolution" everywhere, and delete "before the payoff" from all four strings. | `script-agent` | No two strings claim the same longest beat; `Σ postClipHold` still 10.70 s; `audioTailSeconds` still 5.00; the word "payoff" appears only for `a1` in every file. |
| **NEW-3** | Thấp | `script.md:198`; `voice-performance.proposed.json:59` `ending.elasticRange` | Five cuts are listed (`s8` −0.60, END −1.00, `img1` −0.60, `img2` −0.50, `s3` −0.40 = **3.10 s**) but the sentence says "Those **four** cuts recover **2.60 s** exactly"; and "a 3.29 syl/s run back to exactly 55.00 s" is false — 127 ÷ 3.29 + 16.34 = **54.94 s with no cut at all**, and 52.34 s after the listed cuts. Separately `ending.elasticRange: [1.8, 5.2]` matches no field in the packet (`postClipHoldSeconds` is 1.9, `silentCardSeconds` 3.1) and nothing says which quantity it bounds. | Either drop the `img2` step from the ordered list (leaving four cuts = 2.60 s) or restate "those five cuts recover 3.10 s"; correct the break-even sentence to "at 3.29 syl/s the total is 54.94 s with no cut; the exact break-even is 3.285 syl/s = 55.00 s"; and rename `elasticRange` to `silentCardElasticRange: [2.1, 5.2]` so it names what it bounds. | `script-agent` | Every listed delta appears in the stated sum; the break-even sentence re-derives from `127/3.29 + 16.34`; `json.load` exposes a field whose name says which hold it ranges. |
| **NEW-4** | Thấp | `voice-direction.md:17` vs sidecar `shots.*.reference.source`; `.agents/roles/voice-agent.md:9,18` | The direction tells the voice-agent to "cut the synthesis ref from the WAV above … (clean, music-free 6–8 s into `docs/<vid>/voice-ref/`)", but the sidecar now pins `reference.source` to `docs/<vid>/voice-ref/refThanhLong.wav` with **no** `startSeconds`/`durationSeconds`, and `voice-agent.md:9` makes the agent **read-only for `voice-performance.json`**. `gen-voice-clone.py:180–186,534–538` will not crop anything, so a re-cut written to a *different* filename is invisible to the contract and silently ignored — the run would use the uncropped 8.20 s file. This ambiguity could not exist in round 1 because the reference path did not exist. | State in §Voice reference: "**`docs/<vid>/voice-ref/refThanhLong.wav` is the synthesis reference and is used unmodified** (8.20 s, already inside the 6–8 s band). Do not create a second reference file: the agent is read-only for the sidecar, so a new filename would be ignored by `gen-voice-clone.py`. If a re-cut is genuinely needed, overwrite this exact path and report it to the director." | `script-agent` | The direction and `voice-agent.md` agree on which file is the synthesis reference; no instruction asks the agent to produce a file the contract cannot point at. |
| **NEW-5** | Thấp | `script.md:177` (§5 silence table), §3 `s3` row | The **1.05 s hold after `s3`** is now the only hold longer than 0.60 s in the packet that stages nothing: `img1` is staged in `s5`'s 1.70 s, `img2` in `s9`'s 1.30 s, `s8`'s 1.80 s leads into new content immediately, `s10`'s 1.90 s leads into the END card. This round's S-06 change moved it here from after `a2`, and the row's justification ("moved ahead of the whisper") describes intent rather than what is on screen at 16.05–17.10 s. It is the video's largest early attention hole after the payoff. | Name what the hold shows (`script.md` §3 `s3` row + §5): "the cursor blinking in the empty box, held; the phone screen dims once" — or shorten it to 0.70 s and give the 0.35 s to `s8`'s hold, recomputing §1. | `script-agent` | Every hold > 0.60 s has a named visual event inside it, or the row says it is a deliberate dark beat. |
| **NEW-6** | Thấp | `script.md:125` (`s3` image/action) vs §2.3 | §2.3 declares the hero faceless — "The face is never required: where this file previously said 'her face', it now says 'her head' or 'her figure'" — and `s6`/`img1` were correctly downgraded, but `s3` still says "the black screen reflects her **eyes**". A designer cannot build an eye reflection on a plate that has no face, and §2.3's claim that no row does this is false. | Change to "the black screen reflects her head, a dark shape" (matching `img1`'s wording). | `script-agent` | No row in §3 claims a face, an eye, or any photoreal feature after §2.3 declares the figure faceless. |

**Open after round 2: 0 Cao, 1 Trung (NEW-1), 5 Thấp (NEW-2…NEW-6), plus A-L15 still open for the director.**

### 7 · Scores

| item | r1 | **r2** | evidence |
|---|---:|---:|---|
| **3 · Clarity / retellability** | 8 | **9** | One-sentence retell is clean and now needs no visuals: *người luôn cầm ô cho người khác cũng có ngày mưa ướt, và xứng đáng được hỏi "Hôm nay có chuyện gì với bạn thế?"* The hook now opens a real, answerable question at 0–3 s (`Ai che ô cho bạn?` + the lit window she is not standing under), the payoff lands at 6.18–7.46 s, and the ending no longer depends on an unseen hand — `s10` pays the saved name from `s6` and the viewer never has to have seen anything. The two round-1 exit risks are reduced: the 1.60 s after `s8` is now 1.80 s but arrives 2.6 s later relative to the climax and is followed immediately by new content, and the old ~16.7 s hole moved to 16.05–17.10 s. Residual: the 1.05 s load (NEW-5) and `s2b`'s 3.1 s-delayed re-entry (W1). Nothing here is at risk of misunderstanding. |
| **4 · Spoken naturalness** | 7 | **9** | 11 owner keys verbatim, all natural, none needing a change; no breath unit over 11 syllables; no written-register word in owner speech; no tongue-twister, no unpronounceable term, no caption-shaped line, no acting marker. Round 1's five spoken defects are all fixed at the source (`a1` register, `a2` lyric fragment, `a3` subject shift, `a3`/`a4` removed from the track entirely, `s10`'s cut question). The `s2a`/`a1`/`s2b` split does not break the anaphora (§3.1). Two named residuals, neither a defect: `a2`'s fronted locative (W2) and `s3`'s 11-syllable run at the slowest rate (note for Phase 3b). |
| **5 · Timing feasibility** | 8 | **8** | The band itself is now solid: identity published and reproduced, 127 syl / 16.34 s / 46.58–48.90–50.66, both break-evens derived (4.43 / 3.29), all 13 starts and all 24 silence rows reproduce at three rates, the re-hook is inside 15–20 s at every rate, and the elasticity works in both directions without ever touching audio speed or an owner word. Held at 8 — not 9 — by one real, repeatable error: the last-word/BGM anchor is 0.30 s wrong in five locations and contradicts the correct value printed 27 lines above it in the same file (**NEW-1**, Trung), plus the elasticity sum (NEW-3) and one unmotivated hold (NEW-5). A timing document that tells the mix stage to cut the music under the climax question is not 9-material. |
| **10 · Voice-direction feasibility** | 6 | **8** | Direction *quality* is 9-material and the contract is now executable: 13/13 references point at a real local WAV, `referenceSelectionStatus: "selected"`, `engine.name` truthful, `ownerConfirmed: false` stated in writing with the evidence, `benchmark` carries no pending state, 13/13 byte-exact reassembly, no acting cue, no unsupported control, nothing leaking into speech or captions, every accent word backed by an `emphasis` array, every pause real and mapped to a field, and the END hold exposed as data. Held at 8 by the self-contradicting sentence in §Ending behaviour (**NEW-1** lands hardest here), an instruction the voice-agent cannot act on from the sidecar (**NEW-4**), the "longest beat" regression (**NEW-2**), and `elasticRange`'s undeclared referent (NEW-3). |

**Lens mean = (9 + 9 + 8 + 8) / 4 = 8.5.** Round 1 was 7.25.

### 8 · Weakness hunt (required even when improving)

1. **`s2b` is directed like a second climax.** It arrives 3.10 s after the video's one declared payoff and is styled "the slowest clause of the line, weighted landing" (`voice-direction.md:76`, `script.md:124`). Rewrite the direction (no owner word changes): *"`Biết làm sao để người khác thấy ổn hơn.` — even and unhurried; the weight sits on `thấy ổn hơn` but the pace must not drop, because a third statement delivered 3.1 s after the payoff reads as a rival climax. The line is already understood; let it confirm rather than announce."* (`script.md` §3 `s2b` delivery cell to match.)
2. **`a2` is the one line a Vietnamese speaker would not choose to say.** `Ngoài cửa sổ, mưa rơi đều.` → `Bên ngoài cửa sổ, mưa rơi đều.` (7 syl). Cost: 127 → **128** syl, total **49.16 s** @3.9 · **46.84** @4.2 · **50.93** @3.7 (all inside 45–55), `s2b` start 9.41 s, `s4` start 19.28 s, break-even floor 127 → 4.45 / ceiling 3.31. I am **not** filing this as a ticket — A-L6 is closed and I will not move the bar on it; this is here because the register nit is real and free to fix.
3. **The climax's asker is a word, not a person.** `s10` says `Và họ cũng cần một người hỏi` — "they". For a viewer who only has the audio, `họ` can attach to `mọi người` from `s1`. The packet fixes this *visually only* (the missed call from `s6`). Fix without touching speech: give `s6`'s caption the legible saved name (`minh hoạ` label already required, `script.md:130`) so the sound-off and transcript paths carry the same link the image carries. Routing hint: content/visual lens, not mine.
4. **`s8` has no on-screen text at all.** `script.md:132` gives it `—`, and `script.md:156` gives it no caption chunk 2. At 32.04–34.61 s a sound-off viewer has only the image for the video's most exposed beat. Cheapest fix: a two-word caption chunk (`Vẫn còn đây?`) is *not* available (no owner words), so use the on-screen text layer only — `Còn ai đó?` as a headline element for the 1.80 s hold, marked as narration-adjacent text, not a caption.
5. **`s3`'s 11-syllable clause is the one place the voice may run out of breath.** At 3.7 syl/s it is 2.97 s of continuous speech with no internal pause. Not a script defect; the voice-agent's own measurement will show it. Recorded so nobody is surprised at Phase 3b.

### 9 · What I could not verify

1. **No command was executed.** No `pipeline.py audit` (forbidden by both my role's Return section and the director's instruction for this round), no `validate_voice_performance.py`, no `gen-voice-clone.py`, no `ffprobe`, no `test_voice_catalog`. Every second in this report is hand arithmetic read off the files on disk; the director must run the real commands.
2. **The WAV's properties are the director's verification, not mine.** I confirmed `docs/<vid>/voice-ref/refThanhLong.wav` exists by listing the directory. Duration (8.20 s), sample rate, channel count and format are unverified by me; so is whether it is clean, music-free and single-speaker — which matters because the sidecar now uses it unmodified (see NEW-4).
3. **No audio was rendered and nothing was listened to.** Every "natural / sayable" verdict in §3 is my reading of the text as a Vietnamese speaker. ASR/CER proves words, never prosody; `emphasis`, `tempoIntent`, `ending` and `emotion` are requests to a human reader of the plan, and whether the installed VieNeu realises any of them is unknowable from here.
4. **The engine's real pause behaviour is unknown** — whether 0.14–0.32 s is enough for a clause break, and whether it appends its own silence after `s8`'s `…`.
5. **The measured rate is unknown.** Every second here is a 3.7–4.2 syl/s projection. Phase 3b will move all of them; only the holds and the elasticity absorb the difference.
6. **BGM/SFX coverage of the quiet spans** (≈16.05–17.10 s, ≈32.04–34.61 s) is the `audio` stage's job; whether those read as tension or as a drop cannot be judged from a script.
7. **Visual feasibility stops at "buildable from frames"**; whether the stylised figure is *good* is gate D's judgement on frames I have not seen. Frame-0 legibility at phone size and every retention claim are provable only after render and publication.
8. **Two packet files still describe a superseded primary** (`script.alt-1.md`, `script.alt-2.md`, A-L15) and `status.json:5,9,33` still carries the round-1 numbers ("14 keys, 142 syl, 46.86-51.43 s") and `voice: "tbd"`. All four are outside my writable set and outside this lens's tickets; the director owns them and they should be cleared before the packet is released to Phase 3.

---

## Round 3 — lens: spoken naturalness, timing & performance feasibility

Reviewer: `script-reviewer-r3-spoken` (clean context; wrote neither the packet nor rounds 1–2).
Video `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · profile `story` · 9:16 1080×1920 @30 fps · owner duration 45–55 s. Final round (cap 3).
Read: `script-review.md` (merged, rounds 1–2), this file's rounds 1–2, `brief.md`, `script.md`, `voice.proposed.json`, `voice-performance.proposed.json`, `voice-direction.md`, `hook-options.md`, `status.json`, `.agents/rules/README.md`, `.agents/roles/voice-agent.md`, `.agents/skills/ray-pineline-worflow-agent/SKILL.md` (Phase 2a/2b, Gate A, Common failure points), `scripts/gen-voice-clone.py:27,80–121,126–187,404–430`, and the three repo files the rate provenance cites (`docs/motion-design-lab/script.md:23`, `docs/xay-doi-minh-hay-chung-minh/voice-report.md:24`, `docs/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/audio-review.md:12`).

**No command was run.** This runtime has no shell or process tool. I could **not** run `pipeline.py audit` (forbidden by my role's Return section and by the director's instruction for this round), `scripts/validate_voice_performance.py`, `scripts/gen-voice-clone.py`, `ffprobe`, `ffmpeg`, `python3 -m unittest scripts.test_voice_catalog`, or `npm run voice:measure`. Every number below is hand arithmetic read off the files on disk, re-derived from scratch; I did not carry round 2's figures forward. The director must still run the real commands.

**Headline for the director:** the blocking defect of round 2 (the 43.60 s BGM anchor) is genuinely fixed and **every second a timeline builder would use now reproduces exactly from `voice.proposed.json`**. What is left in this lens is documentation truth in three cells — one stale JSON string, two rows dropped from an audit table, one direction that contradicts its own prose — **two of which were introduced by the round-3 fixes themselves**. All three are Thấp. The packet is one small documentation pass from passing this lens; I am not asking for another creative round.

### 1 · Read as the viewer first (spoken lines only, at the 3.9 syl/s planning rate)

**What I felt.** Something lands at **7.46 s** (`a1`) that I could not have predicted — the first time the video gives me something rather than confirming what I assumed. The gut punch is **28.12–31.44 s** (`s7`). The reversal is **34.61–38.46 s** (`s9`). The question is asked of me at **43.90 s** and then the room goes quiet.

**What I understood, in one sentence:** *người luôn cầm ô cho người khác cũng có ngày mưa ướt, và xứng đáng được hỏi "Hôm nay có chuyện gì với bạn thế?"* Nothing in that sentence requires having seen a frame.

**The exact seconds where attention can drop.**
- **16.05–17.10 s.** `s3`'s last word at 16.05, then 1.05 s, then `a2` (6 syllables) ending 18.77. That is **2.72 s** between two pieces of speech in which almost nothing new is said. NEW-5 gave the hold a *named visual* (cursor blinks twice, screen dims once) — which fixes it for a viewer, and does nothing for a listener or a reteller. Still the packet's largest early hole.
- **32.81–34.61 s.** `s8` (3 syllables) + **1.80 s** = 2.57 s immediately after the video's biggest investment, with new content 5.06 s away from the start of `s8`. Improved by round 2 (it now leads straight into content) but structurally unchanged.
- **43.90 s onward.** **5.00 s of silence.** Justified — it follows the question, and the END card carries the owner's title line as on-screen text — but it is the number I would watch in the retention data. Not a script-level judgement.

### 2 · Closure table — every round-1 and round-2 ticket in this lens, verified by its own acceptance check

| id | sev | verdict | what I checked myself |
|---|---|---|---|
| **A-C1** | Cao | **CLOSED for gate A** (`status.json` clause open, director-owned) | `grep` for `pending` across the packet finds **no** `pending voice-route benchmark`; the only hits are `voice-performance.proposed.json:20` ("no pending state remains") and `:471` ("an assumption pending measurement of this video's own clips", which is true and correctly labelled). All 13 `shots.*.reference.source` read `docs/…/voice-ref/refThanhLong.wav`; `referenceSelectionStatus: "selected"` ×13; `engine.name` truthful; `benchmark.ownerConfirmed: false` with the evidence in writing. **Not closed:** `status.json:5` `"voice": "tbd"` and `:9` `paths.out: "…-tbd"` — director-owned, resolves at `pipeline.py voice <vid> thanh-long`. Carried, not re-filed. |
| **A-T2** | Trung | **CLOSED** | `a1` = `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` — 10 tokens, recounted. `vai chùng xuống` is ordinary Vietnamese; `Còn bạn thì…` is spoken register. No hesitation on either sentence. |
| **A-T3** | Trung | **CLOSED** | `shots.s10.phrases` has **2** entries; `'Hôm nay có chuyện gì với bạn thế?'` is one phrase with `pauseAfterSeconds: 0.0`. `voice-direction.md:88`, `script.md:149`, `script.md:236` all say "no internal pause". Reassembly exact (§4). |
| **A-T4** | Trung | **CLOSED** | The tail is one number in five files and the sentence is no longer self-contradicting: `voice-direction.md:70` now reads "the last word of the video lands at **43.90 s** … `s10`'s post-clip hold runs 1.80 s to 45.70 s; the END card runs 3.20 s to 48.90 s. Post-word audio tail = 1.80 + 3.20 = 5.00 s". `43.90 + 1.80 + 3.20 = 48.90` ✔ and `48.90 − 43.90 = 5.00 s` ✔ (see §3.3). |
| **A-T5** | Trung | **CLOSED** | The false 5.15 s is gone; the list and the sum now agree (five cuts = **3.10 s**, `script.md:212`), and the sentence above it states the invariant it used to break: "Stretching the card also lengthens the 5.00 s post-word tail, so §1 must be recomputed at the measured rate" — the exact gap round 2 recorded. Residual in the break-even sentence only → **NEW-3 residual**, below. |
| **A-L6** | Thấp | **CLOSED** | `a2` = `Ngoài cửa sổ, mưa rơi đều.` — 6 tokens, `đều đều` gone. Not re-litigated; the register nit is recorded as a weakness (§7 W2). |
| **A-L7** | Thấp | **CLOSED** | No `a3` key exists in `voice.proposed.json` (13 keys, none is `a3`); the deletion is `img1`, image-only, staged in `s5`'s 1.70 s hold and listed in `keyPlan.noVoiceKeyShots`. |
| **A-L8** | Thấp | **CLOSED** | `ending` (`:52–62`) exposes `postClipHoldSeconds`, `silentCardSeconds`, `audioTailSeconds`, `silentCardElasticRange` as data. |
| **A-L9** | Thấp | **CLOSED** | `voice-direction.md:76` states the 0.22 s clause gap between `bạn` and `mỗi`, matching `shots.s1.phrases[0].pauseAfterSeconds = 0.22`. |
| **A-L10** | Thấp | **CLOSED** | `grep` finds no `19.25` and no "41 %" historical claim anywhere in the packet. |
| **A-L11** | Thấp | **CLOSED** | `script.md:283` declares the exception where the cap is stated ("7 words, one over this video's ≤ 6-word on-screen cap … must not drop `Bạn`"). Text verbatim. |
| **A-L12** | Thấp | **CLOSED** | `script.md:111–125` §2.3 declares the hero as vector/SVG plates, tabulates every micro-action as a frame-driven property, and answers "expressive close-ups without a face" by framing, posture, light and the still-life of the frame. No row in §3 claims a rendered face. |
| **A-L13** | Thấp | **CLOSED** | `script.md:147` asserts the chain in the row itself ("**The same street as frame 0 — asserted, not implied**"), and `script.md:106` names the object and body part in the frame-0 paragraph so §2.2 and `s9` cannot drift. |
| **A-L14** | Thấp | **CLOSED** | §2.1 publishes L0–L4 with exactly one "first" (**L1** at `a1`); `voice-direction.md:34` references ids only. |
| **A-L15** | Thấp | **STILL OPEN — not re-filed (director decision)** | `script.alt-1.md:107` still advertises "3.7 → 48.27 s · 3.9 → 46.58 s · 4.2 → 44.35 s (0.65 s under the owner's 45 s floor)" — a band that contradicts the real 46.58 / 48.90 / 50.66 and asserts a floor breach that does not exist. Both alt files remain. Per the director's standing decision, round-3 reviewers do not re-raise this. |
| **NEW-1** (spoken) | **Trung** | **CLOSED — fully** | The anchor is **43.90 s everywhere**. `ending.lastWordEndsAtSeconds: 43.9` and `bgmCutsAtSeconds: 43.9` (`:53–54`); `script.md:37` clip end 43.90; `script.md:47`/`:71` 41.58 / 43.90 / 45.66; `script.md:72` END starts 43.38 / 45.70 / 47.46; `script.md:150` "BGM cuts on the last word at 43.90 s"; `script.md:208` the identity; `voice-direction.md:70` the ending behaviour; `brief.md:60`; `hook-options.md:100`. `grep` finds **no** `43.60`, `43,60`, `41.28` or `45.36` in any producer-owned file. `lastWordEndsAt + postClipHold + silentCard = total` holds: 43.90 + 1.80 + 3.20 = 48.90 ✔. Acceptance check met in full. |
| **NEW-2** (spoken) | Thấp | **CLOSED** | `s10.minimumPostClipHoldSeconds = 1.8` (`:438`) and `ending.silentCardSeconds = 3.2` (`:57`); total 48.90 and tail 5.00 unchanged. The "longest" claim is corrected and *repeated identically* in all three places: `script.md:200`, `voice-direction.md:86`, `shots.s8.postClipHoldPolicy` (`:386`) all read "the longest hold between two voiced clips before the resolution … tied with the closing hold". **Caveat on the literal check:** NEW-2's acceptance check said "Σ postClipHold still 10.70 s" — that parenthetical was overtaken by the ticket's own prescribed fix (move 0.10 s from the hold to the card). The invariants the check existed to protect — total 48.90, tail 5.00 — hold exactly, and §1's TOTAL row now prints **10.60** correctly. I record this rather than pretend the wording matches. **Bonus fixed:** the word `payoff` is attached only to `a1` in every file I read (`script.md:77`, `:136`, `voice-direction.md:52`); no string anywhere calls `s8`'s hold "before the payoff". |
| **NEW-3** (spoken) | Thấp | **CLOSED 2/3, one residual** | (a) Every listed delta appears in the stated sum: five cuts, "Those five cuts recover **3.10 s**" ✔ — the "four"/2.60 s mismatch is gone. (c) `ending.silentCardElasticRange: [2.2, 5.2]` now names its referent and its note says it bounds `silentCardSeconds` only; `[2.2, 5.2]` matches §5's two moves (3.20 → 5.20 up, 3.20 → 2.20 down) ✔. (b) The break-even sentence is **still an exact-equality claim at a rounded rate**, in the same form round 2 rejected: "at 3.04 syl/s with all five applied the total is exactly 55.00 s". `127 ÷ 3.04 + 13.24 = 55.02 s`; the exact figure is **3.041 syl/s**. The 0.02 s is harmless and conservative (55.02 > 55.00 cannot push the video under the ceiling), and the neighbouring sentences are now correct (`3.285 → 55.00 s` ✔, `3.29 → 54.94 s` ✔, `3.0 → 58.67 / 55.57` ✔ — all four re-derived). Recorded as a residual of an existing ticket, **not** re-filed as a new one. |
| **NEW-4** (spoken) | Thấp | **CLOSED** | `voice-direction.md:17` now states the reference "is **used unmodified**: it carries no `startSeconds` / `durationSeconds`, so `gen-voice-clone.py` will not crop it. Do **not** create a second reference file under a different name … **overwrite this exact path** and report it to the director." Mirrored in `script.md:295` and `voice-performance.proposed.json:463`. I verified the claim against the code, not just the prose: `reference_for_shot` (`gen-voice-clone.py:164–187`) accepts `{"source": …}`, rejects URL schemes (`:178`) and unknown fields (`:180–182`), and with no crop keys returns `ReferencePlan(source, None, None)` → **no crop**. `voice-agent.md:9` confirms the agent is read-only for the sidecar and owns `docs/<vid>/voice-ref/`, so overwriting the pinned path is inside its rights. **Note for the director (not a ticket):** `voice-agent.md:18` still says generically "Cut the selected clean, music-free 6–8 s WAV ref into `docs/<vid>/voice-ref/`", which is now *narrower* than the direction's instruction. The direction is read-first and more specific, so it wins; the role file's generic sentence can stay. |
| **NEW-5** (spoken) | Thấp | **CLOSED** | `s3`'s 1.05 s hold is named in three places: `script.md:139` ("In the 1.05 s hold after the clip: the cursor blinks twice more and the screen dims once — that hold has a named visual, it is not empty air"), `script.md:191`, `voice-direction.md:80`. Audit of every hold > 0.60 s: `s3` 1.05 named ✔ · `s5` 1.70 stages `img1` ✔ · `s8` 1.80 names its frame ("hands on the closed umbrella; the light holds; the room is still") and is followed by new content ✔ · `s9` 1.30 stages `img2` ✔ · `s10` 1.80 → `s10`'s own last frame is named ("the same hand … tilts the rim back over her shoulder") ✔ · END 3.20 named ("the rain thins") ✔. No hold is empty air. |
| **NEW-6** (spoken) | Thấp | **CLOSED** | `script.md:139` now reads "the black screen reflects **her head as a dark shape**", matching `img1` (`script.md:143`, "the black screen shows her head as a dark shape"). `s6` reads "Her head in the phone glow". §2.3's claim that no row requires a face is now true for every row in §3. |
| **NEW-03** (fidelity, rate provenance) | Trung | **CLOSED** | I verified all three citations myself: `docs/motion-design-lab/script.md:23` says verbatim "Reference estimate is 4.1 syllables/s; this is a **planning baseline, not a measured rate**"; `docs/xay-doi-minh-hay-chung-minh/voice-report.md:24` reads "Total voice: **51.75 s** (194 syllables, avg **3.75 syl/s**)" (194 ÷ 51.75 = 3.749 ✔); `docs/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/audio-review.md:12` reads "syllable rate **~3.5–3.7 syl/s**". `voice-direction.md:32`, `script.md:297` and the sidecar's `limitations[7]` restate all three correctly, and `grep` finds no file calling any planning rate "measured". The 3.9 plan is correctly defended as already at the measured rate for this reference. |
| **W1** (round-2 weakness, claimed fixed) | — | **PARTIALLY closed → NEW-R3-3** | `voice-direction.md:79` and `script.md:138` now say `s2b` "settles after the payoff, it does not compete with it … no extra weight or slowing". **`voice-performance.proposed.json:175` still says `"tempoIntent": "slowest clause of the line, weighted landing"` and `:182` `"tempoIntent": "slow, weighted"`.** The file the voice-agent actually reads still directs the rival-climax delivery round 2 flagged. |
| **W2** (`a2`'s fronted locative) | — | open as a weakness, deliberately not a ticket | A-L6 is closed; I do not move the bar. See §7 W2. |
| **W3** (the saved name for a sound-off viewer) | — | addressed by the producer | `script.md:144`: "The saved name is legible at phone size and is never named." Good; no ticket was ever filed. |

**Round-1 + round-2 tickets in this lens: 18 closed (2 of them with a recorded caveat that does not change the invariant), 1 open and not re-filed (A-L15, director), 1 partial (W1 → NEW-R3-3), 1 partial with a 0.02 s residual (NEW-3). Open Cao: none. Open Trung: none.**

### 3 · Independent recount from `voice.proposed.json`

#### 3.1 Space-separated syllables (re-tokenised by hand from `voice.proposed.json:2–14`)

| key | my count | `script.md:25–39` | | key | my count | `script.md` |
|---|---:|---:|---|---|---:|---:|
| `s1` | 11 | 11 ✔ | | `s6` | 8 | 8 ✔ |
| `s2a` | 9 | 9 ✔ | | `s7` | 12 | 12 ✔ |
| `a1` | 10 | 10 ✔ | | `s8` | 3 | 3 ✔ |
| `s2b` | 9 | 9 ✔ | | `s9` | 14 | 14 ✔ |
| `s3` | 15 | 15 ✔ | | `s10` | 15 | 15 ✔ |
| `a2` | 6 | 6 ✔ | | **total** | **127** | 127 ✔ |
| `s4` | 8 | 8 ✔ | | owner `s1`–`s10` | **111** | 111 ✔ |
| `s5` | 7 | 7 ✔ | | `[ADD]` `a1`+`a2` | **16** | 16 ✔ |

`s2a + " " + s2b` = `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` — byte-for-byte owner line #2 (`brief.md:19`) ✔. Sidecar `ownerSyllables: 111` / `addedSyllables: 16` / `planningSyllables: 127` ✔.

#### 3.2 The identity and the three totals

`Σ pauseAfterSeconds` re-added from the 13 shots (every final phrase is 0.0): 0.22 + 0.28 + 0.24 + 0.26 + 0.14 + 0.24 + 0.18 + 0.18 + 0.24 + 0.26 + 0.30 = **2.54** ✔
`Σ minimumPostClipHoldSeconds`: 0.30 + 0.25 + 0.30 + 0.35 + 1.05 + 0.25 + 0.40 + 1.70 + 0.50 + 0.60 + 1.80 + 1.30 + 1.80 = **10.60** ✔
END card **3.20** → fixed silence **16.34 s** ✔; 16.34 ÷ 48.90 = **33.4 %** ✔.

| rate | 127 ÷ rate | + 16.34 | my total | packet | inside 45–55 |
|---:|---:|---:|---:|---:|:--:|
| **4.2** | 30.2381 | 16.34 | **46.578** | 46.58 ✔ | ✔ 1.58 s above the floor |
| 4.1 | 30.9756 | 16.34 | 47.316 | 47.32 ✔ | ✔ |
| 4.0 | 31.7500 | 16.34 | 48.090 | 48.09 ✔ | ✔ |
| **3.9** | 32.5641 | 16.34 | **48.904** | 48.90 ✔ | ✔ |
| 3.8 | 33.4211 | 16.34 | 49.761 | 49.76 ✔ | ✔ |
| **3.7** | 34.3243 | 16.34 | **50.664** | 50.66 ✔ | ✔ 4.34 s below the ceiling |

Break-evens: `127/r = 45 − 16.34 = 28.66` → **4.4319 → 4.43** ✔; `127/r = 38.66` → **3.2850** ✔ (packet prints 3.285 in the bullet and 3.29 in the table — both now correct and consistent with the sentence that uses 3.285).

#### 3.3 Every per-shot start, re-derived from unrounded values — `start(next) = start(prev) + syl/r + pauseAfter + postClipHold`

| key | start @4.2 | start @3.9 | start @3.7 | packet @3.9 |
|---|---:|---:|---:|:--:|
| `s1` | 0.0000 | 0.0000 | 0.0000 | ✔ |
| `s2a` | 3.1390 | 3.3405 | 3.4930 | ✔ 3.34 |
| `a1` | 5.8119 | 6.1782 | 6.4554 | ✔ 6.18 |
| `s2b` | 8.7329 | 9.2823 | 9.6981 | ✔ 9.28 |
| `s3` | 11.2257 | 11.9400 | 12.4805 | ✔ 11.94 |
| `a2` | 16.1071 | 17.0962 | 17.8446 | ✔ 17.10 |
| `s4` (re-hook) | 17.9257 | 19.0246 | 19.8562 | ✔ 19.02 |
| `s5` | 20.4705 | 21.7159 | 22.6584 | ✔ 21.72 |
| `s6` | 24.0171 | 25.3908 | 26.4303 | ✔ 25.39 |
| `s7` | 26.6019 | 28.1221 | 29.2724 | ✔ 28.12 |
| `s8` | 30.2990 | 32.0390 | 33.3557 | ✔ 32.04 |
| `s9` | 32.8133 | 34.6082 | 35.9665 | ✔ 34.61 |
| `s10` | 37.7067 | 39.7579 | 41.3103 | ✔ 39.76 |
| **last word** | **41.5781** | **43.9041** | **45.6643** | ✔ 41.58 / 43.90 / 45.66 |
| `END` start | 43.3781 | 45.7041 | 47.4643 | ✔ 43.38 / 45.70 / 47.46 |
| **total** | **46.5781** | **48.9041** | **50.6643** | ✔ 46.58 / 48.90 / 50.66 |

**Every per-shot start, every hold, the 43.90 s anchor and the 5.00 s tail reproduce exactly**, and the tail is not rounded: `48.9041 − 43.9041 = 5.0000 s`.

Structural marks, all re-derived:
- hook complete = `11/r` = **2.62 / 2.82 / 2.97** ✔ (≤ 3 s at every rate).
- first staged payoff = `a1Start + 5/r` = **7.0024 / 7.4603 / 7.8068** → **7.00 / 7.46 / 7.81** ✔; the next phrase inside `a1` starts 0.24 s later = **7.24 / 7.70 / 8.05** ✔, and `script.md:75` now states this convention **and** the 0.05 s overrun at the slowest modelled rate in words rather than rounding it away. Round 2's one-line clarification is done.
- owner line #2 complete (`s2b` end) = **10.88 / 11.59 / 12.13** ✔.
- re-hook `s4` start = **17.93 / 19.02 / 19.86** ✔ — inside 15–20 s at every rate.

**Is the silence motivated everywhere?** I audited all 25 rows the packet *should* list. Twenty-three are motivated and named; one is declared structural (`script.md:186`: the 0.25 s split gap "structural, not dramaturgical, and declared as such"); and **two rows are missing from the printed table** — see NEW-R3-2. Both missing rows are real and named elsewhere (`voice-direction.md:82` for `s4`'s 0.40 s; the sidecar's phrase field for `s5`'s 0.18 s), so no *timeline* is affected; but the table cannot support the sentence printed directly above it.

**Does the fastest case still clear the owner's 45 s floor?** Yes, with margin: **46.58 s** at 4.2 syl/s (1.58 s above the floor), and §5's "too short" elasticity adds **+2.80 s** (card 3.20 → 5.20, then `s8` 1.80 → 2.60) without ever touching audio speed or an owner word. The floor survives a measured rate as fast as **4.93 syl/s** (`127/r + 19.14 = 45`). The ceiling survives down to **3.29** uncut and **3.04** with all five cuts. Speech is never accelerated in either direction — stated at `script.md:214` and `voice-direction.md:70` ✔.

### 4 · The 13 spoken lines, said silently as a Vietnamese speaker

"Breath unit" = the largest run between natural pauses; a comfortable breath at this pace is 10–13 syllables.

| key | line | breath units | verdict | why |
|---|---|---|---|---|
| `s1` | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | 6 / 5 | **natural** | Everyday Vietnamese, owner verbatim. The 0.22 s clause gap after `bạn` is real and audible. |
| `s2a` | `Bạn biết cách an ủi. Biết phải nói gì.` | 5 / 4 | **natural** | Two statements; the second elliptical, exactly how a Vietnamese speaker lists capabilities. |
| `a1` | `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` | 5 / 5 | **natural** | *Vai chùng xuống* is ordinary (shoulders drop); `Còn bạn thì…` is how a person says it. Registers as an observation, not a caption. |
| `s2b` | `Biết làm sao để người khác thấy ổn hơn.` | 9 | **natural** | Owner verbatim, one clause, one breath. |
| `s3` | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | 4 / 11 | **natural — watch the breath** | Longest breath in the packet: 2.82 s at 3.9, **2.97 s at 3.7**. One breath, but the one place the voice may need a real breath around `trước màn hình`. Not a defect; a Phase 3b note, carried from round 2 unchanged. |
| `a2` | `Ngoài cửa sổ, mưa rơi đều.` | 3 / 3 | **sayable, mildly written** | Much better than round 1's `đều đều`. `Ngoài cửa sổ` as a fronted locative is slightly written (W2). |
| `s4` | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | 3 / 5 | **natural** | Owner verbatim; the straight quotes are the owner's punctuation and engines read them as a quote boundary. |
| `s5` | `Rồi nghĩ một lúc, bạn lại thôi.` | 4 / 3 | **natural** | Owner verbatim; `lại thôi` is rueful, not self-pitying. |
| `s6` | `Không phải vì không có ai để nhắn.` | 6 / 2 | **natural** | Owner verbatim. |
| `s7` | `Mà vì bạn đã quen với việc mình phải là người ổn.` | 4 / 8 | **natural** | Owner verbatim; the truest line is also the easiest to say. |
| `s8` | `Bạn biết không…` | 3 | **natural** | The owner's own `…` kept verbatim. A real breath-word, not a stage aside. |
| `s9` | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | 8 / 6 | **natural** | Owner verbatim; `thường xuyên` is routine. No tongue-twister. |
| `s10` | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | 7 / 8 | **natural** | The question is one clause, one breath, no internal gap. The only rising contour in the video. |
| `END` | *(no voice key)* | — | **correct** | Silence is the delivery. |

**Sweep.** No line exceeds one breath. **No written-register word in any owner line.** No tongue-twister, no English or unpronounceable term, no `()`/`[]`/`*` marker anywhere in spoken text, nothing that reads as a caption. All five spoken defects from round 1 remain fixed at source. This is a packet that can be said out loud without embarrassment, which is the whole of item 4.

#### 4.1 Does splitting owner line #2 across `s2a` / `a1` / `s2b` feel natural to hear?

**Yes — and round 3 made it more natural, in the prose, but not yet in the contract.** The timing was already right in round 2 (0.25 s of real timeline silence, a new syntactically complete subject on `a1`'s first sentence, and a self-contained third clause), and none of it changed. What changed is the *direction*: both prose files now forbid the rival-climax reading. What did not change is the sidecar, which still says `slowest clause of the line, weighted landing` — and the sidecar is the artifact the voice-agent reads when it synthesises. **NEW-R3-3.** Timing-wise nothing needs to move: the split is 2.84 s of real gap and the third clause arrives 3.10 s after the payoff, both inside what a Vietnamese listener would accept as a deliberate hitch.

### 5 · Performance contract, verified against the executable path

`gen-voice-clone.py:134` requires `set(sidecar shots) == set(canonical)` — sidecar 13, canonical 13 ✔. `:146` requires `" ".join(phrase.text) == canonical` — I reproduced it by hand for all 13:

| key | `" ".join(phrase.text)` | = `voice.proposed.json` |
|---|---|:--:|
| `s1` | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | ✔ |
| `s2a` | `Bạn biết cách an ủi. Biết phải nói gì.` | ✔ |
| `a1` | `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` | ✔ |
| `s2b` | `Biết làm sao để người khác thấy ổn hơn.` | ✔ |
| `s3` | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | ✔ |
| `a2` | `Ngoài cửa sổ, mưa rơi đều.` | ✔ |
| `s4` | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | ✔ |
| `s5` | `Rồi nghĩ một lúc, bạn lại thôi.` | ✔ |
| `s6` | `Không phải vì không có ai để nhắn.` | ✔ |
| `s7` | `Mà vì bạn đã quen với việc mình phải là người ổn.` | ✔ |
| `s8` | `Bạn biết không…` | ✔ |
| `s9` | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | ✔ |
| `s10` | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | ✔ |

**13/13 byte-for-byte.** Also confirmed this round, by reading the generator rather than the packet's description of it:
- **No acting cue.** No `actingCue`/`acting_cue` field; no `[cười]`/`[thở dài]`/`[hắng giọng]`. `ACTING_CUE` (`:28`) matches the spoken text at `:93`.
- **No unsupported control.** Every `controls` object is exactly `{"denoise": false}`; `:98–102` would reject anything else in `controls` and any `rate/pitch/vol/volume/atempo` key.
- **No field the generator would reject.** `_phrase` (`:84–121`) pops `text`/`t`, `controls`, `seed`, `pauseBeforeSeconds`/`pause_before`, `pauseAfterSeconds`/`pause_after`, `intent`, `emotion`, `tempoIntent`/`tempo_intent`, `emphasis` and raises on **anything left** (`:119–120`). Every phrase object in the sidecar uses a subset of that exact set ✔.
- **Pauses are real, never punctuation — and now I can prove the mechanism.** `:430` builds each phrase with `adelay=pause_before` and `apad=pad_dur=pause_after`, i.e. real ffmpeg padding, and it runs them through `TRIM` (`:27`) = `silenceremove=…-45dB,areverse,silenceremove…-45dB,areverse`, which **strips the engine's own leading and trailing silence before padding**. That validates the sidecar's `pauseImplementation` claim ("every measured clip duration contains speech plus its own clause pauses only") against the code — and it matters, because `docs/lam-lai-…/audio-review.md:13` records "TTS default trailing silence ~0.2 s per clip" on this machine. Without `TRIM` that would be up to 2.6 s of unmodelled time across 13 clips. It is trimmed. No ticket.
- **`minimumPostClipHoldSeconds` is not read by the generator** (no match in the file). It is a timeline obligation for the director at Phase 4a. The packet says exactly this (`pauseImplementation`, `voice-direction.md:70`); it is worth the director knowing that nothing downstream enforces it except `timeline.ts`.
- **No direction leaks into speech or captions.** `voice.proposed.json` is words only. Every caption chunk in `script.md:158–173` concatenates back to its canonical line exactly (checked all 13, including `s3`'s and `s10`'s two-line chunks); longest caption line is 28 characters (`trước màn hình điện thoại.`), at the ≤ 28 cap. No intent/emotion wording appears in any caption or on-screen text.
- **Accent words.** Every `accentWords` entry appears in the `emphasis` array of the phrase that actually contains it — verified for all 13 (`s6`'s `không có ai` is on phrase 1, which holds it; this was the fidelity lens's NEW-05 and it is fixed). `voice-direction.md:96`'s claim is true.
- **Playback order.** `gen-voice-clone.py` walks the canonical file in insertion order; `voice.proposed.json` order is `s1 · s2a · a1 · s2b · s3 · a2 · s4 · s5 · s6 · s7 · s8 · s9 · s10`, identical to `keyPlan.order`, `voice-direction.md:5`, `script.md:6` and `hook-options.md:5` ✔.

**Is the pinned reference executable?** On the code path I could read: **yes.** `reference_for_shot` (`:164–187`) takes `{"source": "docs/…/voice-ref/refThanhLong.wav"}`, rejects URL schemes (`:178`) and unknown reference fields (`:180–182`), and returns `ReferencePlan(source, None, None)` because no crop keys are present — so the file is used **whole**. `_resolve_local` (`:440`) resolves against the repo root; `:522` raises `FileNotFoundError` only if the file is absent, and the file is present. I did **not** run ffmpeg, ffprobe, or the synthesis.

**What still cannot be proven without running the engine:** ASR text and CER per key; every clip's real duration and the real measured syllable rate (which decides where the payoff actually lands); `silencedetect` gap measurements; LUFS-I / true peak / clipping; word-alignment confidence; timbre consistency across 13 clips; whether the clone actually matches Thanh Long; whether VieNeu realises any `emphasis`, `tempoIntent`, `ending` or the rising question contour on `s10` — the one thing the climax depends on; whether 0.14–0.30 s clause gaps are audible as clause breaks; whether the 8.20 s reference is clean, music-free and single-speaker (the director's `ffprobe` covers format, not content); and whether `s3`'s 11-syllable clause needs a real breath. `naturalnessEvidence: "not verified by listening"` states this correctly and must survive into `audio-review.md`. **Every "natural" verdict in §4 is my reading of the text as a Vietnamese speaker, not a measurement — ASR cannot hear.**

### 6 · NEW tickets (all Thấp; two introduced by the round-3 fixes themselves)

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **NEW-R3-1** | Thấp | `voice-performance.proposed.json:29` (`benchmark.identity`); `hook-options.md:91` | Round 3 moved 0.10 s from `s10`'s post-clip hold into the END card (1.90 → 1.80, 3.10 → 3.20). The move landed in `script.md` §1/§5/§8, `voice-direction.md:70`, `ending.*` and `brief.md:60` — and **not** in the sidecar's own identity string, which still decomposes the silence as `2.54 + 10.70 + 3.10`, contradicting `sumPostClipHoldSeconds: 10.6` **four lines below it** and `ending.postClipHoldSeconds: 1.8` / `silentCardSeconds: 3.2`. Nor in `hook-options.md:91`, whose "Payoff resolved" cell still reads `s10 + END card + **3.10 s tail**` while `hook-options.md:100` correctly says "post-word tail **5.00 s**" — the same file contradicts itself 9 lines apart. Neither figure can build a wrong timeline, but a builder reading `benchmark.identity` would build a 1.90 s hold and a 3.10 s card, i.e. exactly the configuration NEW-2 removed. | In `benchmark.identity`, change `10.70 + 3.10` to **`10.60 + 3.20`**. In `hook-options.md:91`, change `+ 3.10 s tail` to **`+ 5.00 s tail`** so the table agrees with `:100`. | `script-agent` | No producer-owned file contains `10.70`, `1.90 s hold` or `3.10 s tail`; `benchmark.identity` agrees with `sumPostClipHoldSeconds`, `ending.postClipHoldSeconds`, `ending.silentCardSeconds` and `script.md:19`. |
| **NEW-R3-2** | Thấp | `script.md:181–206` (§5 silence table) | The table prints **23 rows** and its footer asserts **16.34 s**, immediately under the sentence *"**Every one of the 16.34 s is a named beat. There is no unassigned hold.**"* The printed rows sum to **15.76 s**. Two rows are missing: **`s4`'s 0.40 s post-clip hold** (`voice-performance.proposed.json:261`; `voice-direction.md:82` still names it) and **`s5`'s 0.18 s intra-clip clause gap** (`shots.s5.phrases[0].pauseAfterSeconds`; `voice-direction.md:83` implies it). 15.76 + 0.40 + 0.18 = 16.34 exactly. `script.md` §1 is complete and correct — its pause column sums to 2.54 and its hold column to 10.60 + 3.20 — so this is the audit table losing rows during the 1.90 → 1.80 / 3.10 → 3.20 edit, not a wrong plan. Severity Thấp for the round-2 reason: it understates the silence, cannot push the video out of band, and no timeline is built from this table. | Insert the two rows back — `| 0.40 | after \`s4\` | clip boundary | the draft is left hanging |` between `:194` and `:195`, and `| 0.18 | inside \`s5\` | at the comma | the small shrug before it settles |` between `:194` and `:195` (either order, matching the JSON). | `script-agent` | The table has 25 rows and its cells sum to the printed **16.34 s**; `voice-direction.md:77–88` and the sidecar's 13 `minimumPostClipHoldSeconds` each appear exactly once. |
| **NEW-R3-3** | Thấp | `voice-performance.proposed.json:175` and `:182` vs `voice-direction.md:79` and `script.md:138` | The producer's round-3 claim was "W1 fixed: `s2b`'s delivery no longer competes with the payoff". Both prose files were corrected to *"Even — this clause settles after the payoff and must not compete with it … no extra weight or slowing"*. **The sidecar still reads `"tempoIntent": "slowest clause of the line, weighted landing"` and the phrase reads `"tempoIntent": "slow, weighted"`.** The contract the voice-agent synthesises from therefore still directs the third statement of an anaphoric triad, 3.10 s after the packet's one declared payoff, as the slowest, heaviest clause — the exact defect round 2 named. This is the same class as A-L9 (a direction cell and the sidecar disagreeing), which I closed in round 2 and scored against item 10. (`s7`'s `"slow, quiet, weighted landing"` at `:368` is correct and must not change — the gut punch *should* be weighted.) | Change `shots.s2b.tempoIntent` to **`"even, unhurried — the clause settles after the payoff and must not compete with it"`** and the phrase's `tempoIntent` to **`"even"`**, keeping `emphasis: ["thấy ổn hơn"]` and `ending: "full stop"` unchanged. No owner word, syllable count, pause or hold changes, so no second in §1 moves. | `script-agent` | The three places state the same delivery for `s2b`; `grep` finds no `weighted` on `s2b`; §1 and the totals are byte-identical before and after. |

**Open after round 3, this lens: 0 Cao, 0 Trung, 3 Thấp (NEW-R3-1 … NEW-R3-3), plus A-L15 open for the director (not re-filed).** One recorded residual on the closed NEW-3 (a 0.02 s exact-equality claim) and one caveat on NEW-2's literal wording; neither is re-filed.

### 7 · Weakness hunt (required even when passing)

1. **The two quietest stretches are still the packet's weak spots, and one of them is invisible to a listener.** 16.05–17.10 s is 2.72 s between the last word of `s3` and the last word of `a2` with almost nothing new said, and the thing that fills it (a cursor blinking twice, a screen dimming once) exists only in the frame. Free fix, no speech change: shorten `s3`'s hold to **0.80 s** and give the 0.25 s to `s8`'s hold (1.80 → 2.05 s), which leaves every total and every structural mark untouched except `a2`/`s4`, which move 0.25 s earlier — re-hook 18.77 s, still inside 15–20 s.
2. **`a2` is the one line a Vietnamese speaker would not choose to say.** `Ngoài cửa sổ, mưa rơi đều.` → **`Bên ngoài cửa sổ, mưa rơi đều.`** (7 syl). Cost: 127 → 128 syl, total **49.16 s** @3.9 · **46.84** @4.2 · **50.93** @3.7 (all inside 45–55), break-even floor 4.45 / ceiling 3.31, re-hook `s4` start 19.28 s. **I am not filing it** — A-L6 is closed and I will not move the bar on taste; it is here because the register nit is real and the fix is free.
3. **The climax's asker is still a word, not a person.** `s10` says `Và họ cũng cần một người hỏi` — "they". For a viewer who has only the audio, `họ` can attach to `mọi người` from `s1`. The packet closes this **visually only** (the missed call from `s6`). The audio-only link is now as strong as it can be without touching an owner word: `s6`'s on-screen text could carry the legible saved name (`minh hoạ` label already required, `script.md:144`) so the sound-off path carries the same link the image carries. Routing: content/visual lens, not mine.
4. **`s8` has no on-screen text at all** (`script.md:146` gives it `—`, and `script.md:170` gives it one caption line). At 32.04–34.61 s a sound-off viewer has only the image for the video's most exposed beat. No owner words are available for a caption, so the fix belongs in the on-screen text layer only — a two-word headline element for the 1.80 s hold, marked narration-adjacent, not a caption.
5. **`s3`'s 11-syllable clause is the one place the voice may run out of breath** — 2.97 s of continuous speech at 3.7 syl/s with no internal pause. Not a script defect; recorded so nobody is surprised at Phase 3b.
6. **`voice-direction.md:62` ("no dramatic pause longer than 1.80 s anywhere in the packet") is loose.** The END card is a 3.20 s silent hold and the post-word tail is 5.00 s. The same file calls it "the required silent hold", so the intent is clear and I do not file it; the sentence would be exact as "no *dramatic pause between voiced clips* longer than 1.80 s".

### 8 · Scores

| item | r1 | r2 | **r3** | evidence |
|---|---:|---:|---:|---|
| **3 · Clarity / retellability** | 8 | 9 | **9** | One-sentence retell is clean and needs no visuals (§1). The payoff lands 7.00 / 7.46 / 7.81 s; the ending pays `s6`'s saved name; the climax and the card are separate shots. Unchanged from round 2 — nothing in the round-3 fixes touched the spoken spine, and nothing regressed. Residual: the 2.72 s at 16.05–17.10 s and the 2.57 s at 32.81–34.61 s are silence a listener experiences as a hole even though both are now named beats on screen. |
| **4 · Spoken naturalness** | 7 | 9 | **9** | All 13 lines natural, no breath unit over 11 syllables, no written-register word in owner speech, no tongue-twister, no unpronounceable term, no caption-shaped line, no acting marker (§4). All five round-1 spoken defects stay fixed at source. The `s2a`/`a1`/`s2b` split still holds to hear, and its direction is now coherent in prose (§4.1). Two carried residuals, neither a defect: `a2`'s fronted locative (W2) and `s3`'s 11-syllable run at the slowest rate (Phase 3b note). I will not move the bar on taste. |
| **5 · Timing feasibility** | 8 | 8 | **8.5** | The band is now 10-material: identity published and reproduced in 4 files, 127 syl / 16.34 s / 46.58–48.90–50.66, **every per-shot start re-derived from the JSON at three rates**, both break-evens (4.43 / 3.285), the payoff convention stated once with its 0.05 s overrun disclosed, the **43.90 s** anchor in all five places with `+ 1.80 + 3.20 = 48.90` and a tail of exactly 5.0000 s, and an elasticity that works both ways without touching audio speed or an owner word (§3). Held below 9 by three documentation-truth residuals, **two of them introduced by this round's own fix**: the stale `benchmark.identity` decomposition and the stale hook-doc tail cell (**NEW-R3-1**), two rows dropped from the silence audit table that is the sole evidence for "there is no unassigned hold" (**NEW-R3-2**), and a 0.02 s exact-equality claim (NEW-3 residual). None can produce a wrong timeline, which is why this is 8.5 and not 8. |
| **10 · Voice-direction feasibility** | 6 | 8 | **8.5** | Direction quality is 9-material and the contract is now demonstrably executable: I re-verified the generator itself rather than the packet's description of it — 13/13 keys, 13/13 byte-exact reassembly (`:146`), no acting cue (`:93`), no unsupported control (`:98–102`), no field the phrase parser would reject (`:119–120`), reference resolved whole with no crop (`:164–187`), pauses as real ffmpeg padding **after** `TRIM` strips the engine's own trailing silence (`:27`, `:430`), nothing leaking into speech or captions, every accent word backed by the `emphasis` array of the phrase that contains it, provenance of the 3.9 rate correct and cited in three places I verified verbatim. Round 2's hard blocker (the impossible ending sentence) is gone and NEW-4 is properly resolved. Held below 9 by one contract field that still contradicts the prose the producer says it fixed (**NEW-R3-3**: `s2b` is still "slowest clause … weighted landing" in the sidecar) and by the stale identity string (**NEW-R3-1**) — i.e. the file the voice-agent reads is not yet fully consistent with the file a human reader reads. |

**Lens mean = (9 + 9 + 8.5 + 8.5) / 4 = 8.75 → 8.8.** (Round 1: 7.25. Round 2: 8.5.)

**Verdict for this lens: revise at 8.8** — below the 9.0 gate threshold, with **no Cao and no Trung ticket open**. The three NEW tickets are Thấp, so they do not block on severity; the score does. Fixing NEW-R3-1…3 is a documentation pass of well under an hour that moves items 5 and 10 to 9.5 and the lens to 9.3, which is the outcome I expect. I am not asking for a fourth creative round.

### 9 · What I could not verify

1. **No command was executed** — no `pipeline.py audit` (forbidden here by my role and by the director's instruction), no `validate_voice_performance.py`, no `gen-voice-clone.py`, no `ffprobe`/`ffmpeg`, no `voice:measure`, no `test_voice_catalog`. Every second here is hand arithmetic from the files on disk.
2. **The WAV's properties are the director's verification, not mine.** I confirmed the path exists by directory listing. 8.20 s / 24 kHz / mono / pcm_s16le is not mine, and neither is whether it is clean, music-free and single-speaker — which matters because the sidecar now uses it whole.
3. **No audio was rendered and nothing was listened to.** Every naturalness verdict is a reading, not a measurement.
4. **The engine's behaviour is unknown**: whether 0.14–0.30 s clause gaps read as clause breaks, whether it honours `emphasis` / `tempoIntent` / `s10`'s rising question contour, and whether it clips or drifts on 11-syllable clauses.
5. **The measured rate is unknown.** Every second here is a 3.7–4.2 syl/s projection; Phase 3b will move all of them, and only the holds and the elasticity absorb the difference. `minimumPostClipHoldSeconds` is not read by any script — it becomes the director's obligation in `timeline.ts`.
6. **BGM/SFX coverage of the quiet spans** (16.05–17.10 s, 32.81–34.61 s, and the 5.00 s tail) is the audio stage's job; whether they read as tension or as a drop cannot be judged from a script.
7. **Visual feasibility stops at "buildable from frames"** — whether the stylised figure is *good* is gate D's judgement on frames I have not seen; frame-0 legibility at phone size and every retention claim are provable only after render and publication.
8. **Director-owned items I observed and did not file**: `status.json:5,9` still `tbd` and `:33` still carries round-1 numbers; `script.alt-1.md` / `script.alt-2.md` still describe a superseded primary (A-L15, director decision); `brief.md:65` still names `s6a`/`s6b` as the split example, which is this packet's naming convention example rather than a claim about its keys — harmless, but it will read as stale to Phase 3.