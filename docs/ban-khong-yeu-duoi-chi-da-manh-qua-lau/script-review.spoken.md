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