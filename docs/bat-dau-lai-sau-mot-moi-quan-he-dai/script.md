# Script — Bắt đầu lại sau một mối quan hệ dài

**Video:** `bat-dau-lai-sau-mot-moi-quan-he-dai` · **Profile:** `story` · **Comp:** `BatDauLaiSauMoiQuanHeDaiReel`
**Format:** 9:16 · 1080×1920 · 30 fps · **7 shots / 7 voice keys**
**Duration:** **30–40 s (owner override)** — planned **34.27 s** at 4.30 syl/s, **33.07 s** at 4.50, **35.58 s** at 4.10, **37.03 s** at 3.90.
**Hook candidate:** **H1** (`hook-options.md` §H1) — the owner's mandated opening, verbatim.
**Re-hook:** **`s4b` starts at 16.68 s** — new question: *một phần ăn thì trông thế nào?*
**Narration:** first person **“Tôi”**, one listener, no address to a crowd, no CTA.
**Voice:** route 2 local VieNeu clone, `thanh-long-nang-cao`; reference `docs/bat-dau-lai-sau-mot-moi-quan-he-dai/voice-ref/refThanhLong.wav`.

---

## 1 · Timing budget

**Unit:** one space-separated token = one syllable (repo convention). **Planning rate: 4.30 syl/s** — the owner's line is the fast end of Thanh Long and the script is written short instead of time-stretched. Measured baseline in this repo is ≈4.1; 4.3 is a **planning** figure, not a measurement.

**Silence model.** Every pause below is real and declared:
- `pauseAfterSeconds` inside a key = silence padding **between two phrases of the same clip** (supported by the engine);
- `minimumPostClipHold` = a **timeline gap between two clips**;
- the ending = **1.80 s of timeline silence** after the last word.
No beat is created by punctuation, an ellipsis or a comma. `s4a`/`s4b` are **separate keys** precisely because the 0.45 s freeze must be audible and frame-accurate.

**Identity:**

```
planningTotal(rate) = Σ(syl ÷ rate) + 2.24 (inside-clip pauses) + 4.85 (post-clip holds incl. 1.80 ending) + 0.20 (lead-in)
                    = Σ(syl ÷ rate) + 7.29 s
```

| # | key | syl | speech s @4.30 | inside pauses s | clip end s | post-clip hold s | next starts s | slot s |
|---|---|---:|---:|---:|---:|---:|---:|---|
| 1 | **s1** · HOOK / COVER | 19 | 4.419 | 0.14 | 4.76 | 0.50 | 5.26 | 0.20–4.76 |
| 2 | s2 | 16 | 3.721 | 0.18 | 9.16 | 0.45 | 9.61 | 5.26–9.16 |
| 3 | s3 | 15 | 3.488 | 0.42 | 13.52 | 0.85 | 14.37 | 9.61–13.52 |
| 4 | s4a · freeze | 8 | 1.860 | 0.00 | 16.23 | **0.45 freeze** | 16.68 | 14.37–16.23 |
| 5 | **s4b** · RE-HOOK | 16 | 3.721 | 0.22 | 20.62 | 0.35 | 20.97 | 16.68–20.62 |
| 6 | s5 | 19 | 4.419 | 0.44 | 25.83 | 0.45 | 26.28 | 20.97–25.83 |
| 7 | **s6** · PAYOFF | 23 | 5.349 | 0.84 | **32.47** | **1.80 ending** | **34.27** | 26.28–32.47 |
| | **TOTAL** | **116** | **26.977** | **2.24** | | **4.85** | | **34.27** |

**Last word = 32.47 s. Video ends = 34.27 s.** The 1.80 s after `s6` is pure timeline silence; BGM fades out on the last word and is gone before the hold begins.

### 1.1 Rate band (the packet must stay inside 30–40 s)

| measured rate | speech = 116 ÷ rate | + 7.29 s fixed | **total** | inside 30–40 s |
|---:|---:|---:|---:|---|
| 4.50 syl/s | 25.78 | 7.29 | **33.07 s** | ✅ |
| **4.30 (plan)** | 26.98 | 7.29 | **34.27 s** | ✅ |
| 4.10 syl/s | 28.29 | 7.29 | **35.58 s** | ✅ |
| 3.90 syl/s | 29.74 | 7.29 | **37.03 s** | ✅ |
| 3.60 syl/s | 32.22 | 7.29 | **39.51 s** | ✅ 0.49 s headroom |
| 3.52 syl/s | 32.95 | 7.29 | **40.24 s** | ❌ — elasticity below |

Break-even: **40 s at 3.55 syl/s** (3.546), **30 s at 5.11 syl/s** (5.108). The plan is safe across the entire plausible measured band (3.6–4.5). If a clip measures slower than 3.55, cut in this order — never the words, never shorten the 1.80 s ending, never `atempo`: s3 tail 0.85 → 0.55 (−0.30), s1 tail 0.50 → 0.30 (−0.20), s5 inside pause 0.30 → 0.18 (−0.12), s2 tail 0.45 → 0.35 (−0.10), s4b tail 0.35 → 0.25 (−0.10) = **−0.82 s**, which brings 3.50 syl/s to **39.61 s** and moves the slow-side floor to ≈3.46 syl/s. If it measures faster than 5.11, do not cut a word and do not slow the audio: the 30 s bound is a **floor**, so add the shortfall to the lead-in (0.20 s) and, if still short, to the ending hold above 1.80 s. The ending may grow, never shrink.

---

## 2 · Frame 0 = cover (canonical description)

> **Frame 0 is the cover.** No fade from black, no logo, no title animation. 9:16, eye level across a rice-shop counter at dusk. **Two identical white takeaway boxes sit on wet stainless steel**, six inches apart; the right-hand box has a **red elastic band** around it. Steam still escapes the folded lip of the left box. A narrow thermal receipt is **mid-print**, curling up out of the printer slot, the digits `×2` already legible. **The narrator's right hand is still in frame, having just laid a second pair of wooden chopsticks on top of the right-hand box — fingers open, not yet withdrawn.** The vendor's out-of-focus hand waits beside the second box. Cool tube light from above, dusk-blue street behind, one small red price card at the edge. Locked-off; the only motion is the printer and the steam. **Hook block, lower third, four lines, Lora 500 at 76 px, bottom edge y = 1430, the frame's only text:**
> `Tôi vẫn mua hai phần ăn`
> `theo thói quen.`
> `Đến lúc tính tiền mới nhớ`
> `giờ chỉ còn mình.`

**Hook-block fit rule.** 76 px is the target, not a locked size. The block is set to a **912 px measure** (`x = 84` on both sides) and shrinks uniformly until every line sits on one line — **floor 64 px, never a mid-word break, never a fifth line**. At 76 px the longest line (`Đến lúc tính tiền mới nhớ`, 26 characters) is at the edge of that measure, so `design-agent` must **measure** the set line and fit it, not eyeball it. If the block goes below 64 px to fit, the fallback is to widen the measure to `x = 60` (960 px) before shrinking further.

The cover is readable with the sound off: two boxes + a hand adding a second pair of chopsticks + `×2` + the word **“hai”** in line 1. The hook text is the spoken line verbatim, so nothing is written twice and nothing is promised that the video does not pay.

---

## 3 · Shot table

`seconds` = the key's slot including its inside-clip pauses. `source` resolves to `research.md` ids, the owner brief, or is marked **design** (invented staging, not a factual claim). “CP1” is the one contrast pair, defined in §5.

| # | seconds | VO exact text | on-screen text | image / action | camera / motion | SFX | accent words | delivery | source | scene owner |
|---|---|---|---|---|---|---|---|---|---|---|
| **s1 · HOOK · COVER** | 0.20–4.76 · 19 syl · 4.42 s + 0.14 | Tôi vẫn mua hai phần ăn theo thói quen. Đến lúc tính tiền mới nhớ giờ chỉ còn mình. | hook block (§2): `Tôi vẫn mua hai phần ăn` / `theo thói quen.` / `Đến lúc tính tiền mới nhớ` / `giờ chỉ còn mình.` | §2. Two boxes; the right one banded red; the hand adds a second pair of chopsticks; the printer spits `×2`; the vendor's hand waits | Locked-off, 1.00→1.02 push over the whole key; one rack focus from the printer to the hand at 2.3 s; hard cut out | Printer whirr, box set on steel, thin plastic bag, street at dusk | **hai phần** · **thói quen** · **tính tiền** · **chỉ còn mình** | Intent: confession, not complaint — the body reports before the mind does. Emotion: dry, level, a little tired. Pace: brisk on “Tôi vẫn mua hai phần ăn”, **slower from “Đến lúc tính tiền”**, the four last words spaced and quiet. **0.14 s real gap after “quen.”**, no breath before the first word. Ending: falls flat on “mình”, no lift, no sigh. | owner brief §User constraints (C1, verbatim) · research `C1` (user) | `scene-agent-1` |
| **s2** | 5.26–9.16 · 16 syl · 3.72 s + 0.18 | Về đến nhà, giá đỡ có hai bàn chải. Một cái khô, một cái còn ướt. | captions §4 | Bathroom shelf at eye level, hard side light: a ceramic holder with two brushes. **One dry, its bristles stiff and furred; one wet, a bead of water on the handle.** The tap drips once. The narrator's sleeve enters at the edge, takes nothing | Locked-off, 1.00→1.03; rack focus from the dry brush to the wet one at 7.4 s; hard cut on the drip | Single tap drip, tile room tone, faint fridge hum through the wall | **hai bàn chải** · **khô** · **còn ướt** | Intent: show the residue without naming it. Emotion: observational, no sadness. Pace: even; **0.18 s gap after “chải”** so the two objects land separately. The second sentence slightly quicker, then stop. Ending: flat on “ướt”, mouth closed. | owner brief (visual list) · research `P3` (prop) · `C1` (user) — detail invented, **design** | `scene-agent-1` |
| **s3** | 9.61–13.52 · 15 syl · 3.49 s + 0.42 | Bàn ăn vẫn kê hai ghế. Tôi gõ: Ăn gì chưa. Rồi xoá từng chữ. | captions §4; `CHƯA GỬI` in Be Vietnam Pro, 34 px, under the phone — appears the moment the last character of `Ăn gì chưa` lands (12.33 s at plan), holds through the 0.26 s gap, disappears on the first backspace (12.59 s); the field then clears at 0.12 s per character, empty by 13.79 s, inside the 0.85 s tail | The dining table, two chairs. **The second chair holds a stack of folded mail, squared to the table edge.** A phone in the narrator's hand: the words `Ăn gì chưa` appear one character at a time, thumb hovers, then backspace — **each character vanishes, one per 0.12 s**, until the field is empty | Locked-off wide, then 1.00→1.03 push into the phone; rack focus from the second chair to the screen at 10.7 s; **no cut inside the deletion** | Keyboard ticks (soft), one chair creak, phone vibration off | **hai ghế** · **gõ** · **Ăn gì chưa** · **xoá từng chữ** | Intent: the habit does the typing. Emotion: deadpan, private, the first wry beat — never played as a joke. Pace: even on the chairs; **0.16 s gap**, then the typed line **slower and softer**, as if the thumb is remembering; **0.26 s gap before “Rồi”**; “xoá từng chữ” flat and dry. Ending: stops on “chữ”, no sigh. | owner brief (visual list) · research `P5` (prop) · `C1` (user); the message text is **design**, not quoted from the owner | `scene-agent-1` |
| **s4a · freeze / pre-roll** | 14.37–16.23 · 8 syl · 1.86 s + 0.00 | Có một tối, tôi đứng lại trước quầy. | captions §4 | Back at the same counter, wider and later: the tube light is colder, the street darker. **Two boxes again, but the narrator's hands are at their sides; the red-banded box is closer to the vendor.** A customer's shadow crosses the steel behind | Locked-off, 1.00→1.01. **At the last word the frame freezes for 0.45 s** — steam stops mid-curl, the vendor's hand stops mid-reach. Hard cut out of the freeze | Room tone drops; one motorcycle outside; the printer silent | **một tối** · **đứng lại** · **trước quầy** | Intent: the moment the body stops before the mind explains. Emotion: quiet, held, no drama. Pace: slow, one clause, one breath. **No pause inside; the freeze is after the line, not in it.** Ending: flat on “quầy”, then the 0.45 s freeze does the work. | owner brief (counter) · research `P1` (prop) · `C5` (inference, image only) | `scene-agent-2` |
| **s4b · RE-HOOK** | 16.68–20.62 · 16 syl · 3.72 s + 0.22 | Không hẳn vì tiếc. Mà vì tôi quên mất một phần ăn thì trông thế nào. | captions §4 | Close-up on the two boxes after the cut: **the red band, a wet ring under the left box, the narrator's right index finger resting on the lid of box #2 and not pressing.** The vendor's hand waits, out of focus | Locked-off, 1.00→1.02; one rack focus from the finger to the red band at 17.9 s; hard cut out | Paper lid creaking as the steam condenses; distant till drawer; no music hit | **không hẳn** · **tiếc** · **quên mất** · **một phần ăn** · **trông thế nào** | Intent: **the re-hook — replace “sad” with a real question.** Emotion: honest, slightly surprised by itself. Pace: “Không hẳn vì tiếc.” quick and offhand; **0.22 s gap**; the second sentence slower, with a genuine question contour only on “trông thế nào”, not on the whole line. Ending: the question stays open; no answer in the voice. | owner thesis (`C12`, user) · research `I2` (inference) + `I7` (design, no source) — **not** a claim about anyone else | `scene-agent-2` |
| **s5** | 20.97–25.83 · 19 syl · 4.42 s + 0.44 | Hai hộp nằm sẵn trên quầy. Tay tôi dừng trên hộp thứ hai. Rồi tôi nói: một phần thôi. | captions §4; receipt `×1` prints at 24.9 s | **CP1.** The vendor sets both boxes down. The narrator's hand moves to box #2, **stops flat on the lid**, lifts, settles back. The vendor waits. Then the hand pushes box #2 half an inch away. **The printer prints a new receipt: `×1`.** Above, the counter bulb **clicks on at 35 %** — first warmth, motivated by the vendor reaching for change | Locked-off, 1.00→1.03; rack focus from the hand to the printer at 24.7 s; **hard cut on the printer tear** | Box on steel, printer whirr, bulb click, coins on steel | **hai hộp** · **dừng** · **hộp thứ hai** · **một phần thôi** | Intent: the decision is a hand, not a speech. Emotion: quiet, ordinary, no triumph. Pace: even on the boxes; **0.14 s gap after “quầy”**; “Tay tôi dừng trên hộp thứ hai” **slows on “dừng”**; **0.30 s gap before “Rồi”**; “một phần thôi” **quiet, level, one breath**, no emphasis on “một”. Ending: falls and stops; the bulb click is the only answer. | owner brief (two boxes, hesitation, payoff) · research `P1`, `P2`, `P9` · `C12` (user) — CP1 | `scene-agent-2` |
| **s6 · PAYOFF · HOLD** | 26.28–32.47 · 23 syl · 5.35 s + 0.84 | Tôi mang một hộp về. Ngồi xuống, mở nắp, hơi cơm bốc lên mặt. Ăn hết. Không thấy nhẹ người. Chỉ thấy no. | captions §4 | **CP1 closes.** The same box on the home table, the receipt `×1` under it. The narrator sits — **the second chair is still stacked with mail**. The lid opens; steam crosses the pendant bulb's cone; **the grade warms 40 → 100 % over 1.2 s** as the steam rises. Chopsticks lift, the box empties. The last frame holds on the empty box, the crumpled `×1`, the closed second chair | Locked-off, 1.00→1.03; one rack focus from the steam to the receipt at 29.6 s; **no cut after the last line** | Lid pop, steam hiss, chopsticks on paper, quiet room, pendant hum | **một hộp** · **mở nắp** · **hơi cơm** · **ăn hết** · **nhẹ người** · **no** | Intent: the payoff is a fact, not a cure. Emotion: calm, physical, unbeautified. Pace: “Tôi mang một hộp về.” plain; **0.14 s gap**; “Ngồi xuống, mở nắp, hơi cơm bốc lên mặt.” slower, three physical beats; **0.16 s gap**; “Ăn hết.” **short, flat**; **0.32 s gap** — the only long beat inside a clip; “Không thấy nhẹ người.” level, no disappointment; **0.22 s gap**; “Chỉ thấy no.” **the slowest and plainest line in the video, then stop.** Ending: no rise, no relief, no CTA; 1.80 s of real silence. | owner brief (one portion, light warms) · research `P6` (prop) · `C12` (user) — the feeling is the narrator's own, not a general claim | `scene-agent-2` |

---

## 4 · Caption chunks (proposal — `content-agent` locks the final set)

Lora 500, 66 px, `#EDE6D8`, left at x = 84, max 2 lines, ≤ 28 characters per line, block bottom edge y = 1690. Hook block is the exception (§2). Words are reproduced word-for-word from `voice.proposed.json`; no caption adds a claim.

| key | chunk 1 | chunk 2 | chunk 3 |
|---|---|---|---|
| s1 | *(hook block, §2 — not a second caption layer)* | | |
| s2 | `Về đến nhà, giá đỡ` / `có hai bàn chải.` | `Một cái khô,` / `một cái còn ướt.` | |
| s3 | `Bàn ăn vẫn kê hai ghế.` | `Tôi gõ: Ăn gì chưa.` | `Rồi xoá từng chữ.` |
| s4a | `Có một tối, tôi đứng lại` / `trước quầy.` | | |
| s4b | `Không hẳn vì tiếc.` | `Mà vì tôi quên mất một` / `phần ăn thì trông thế nào.` | |
| s5 | `Hai hộp nằm sẵn trên quầy.` | `Tay tôi dừng trên` / `hộp thứ hai.` | `Rồi tôi nói: một phần thôi.` |
| s6 | `Tôi mang một hộp về.` | `Ngồi xuống, mở nắp,` / `hơi cơm bốc lên mặt.` | `Ăn hết.` · `Không thấy nhẹ người.` · `Chỉ thấy no.` |

`s6`'s final caption chunk is split at its three sentences, timed to the declared gaps before them
(0.16 s, 0.32 s, 0.22 s), so the caption never runs ahead of the voice.

---

## 5 · Structure

### 5.1 Contrast pair (the turn)

**CP1 — “hai → một”.** It is the only pair the video needs, and it is physical, not verbal:
`×2` receipt + second pair of chopsticks + two brushes + two chairs + two boxes **→** `×1` receipt + one box + one empty chair still stacked with mail.
It is planted in frame 0, reversed at **s5** (the hand stops; the printer prints `×1`) and closed at **s6** (the `×1` lies under the open box in warm light). The narration never says “hai thì ra một”; the receipt does.

Secondary, never named: **dry / wet** (s2) — the second brush is dry because nobody uses it, the first is wet because the narrator still does. It is a detail of CP1, not a second thesis.

### 5.2 Three named highlight beats (max 3)

| id | shot | delivery | visual | light |
|---|---|---|---|---|
| **HB1** | **s3** — `Tôi gõ: Ăn gì chưa. Rồi xoá từng chữ.` | deadpan, the typed words slower and softer, “xoá từng chữ” flat; no sigh, no laugh | the words appear one character at a time; the thumb hovers; each character vanishes at 0.12 s; the second chair stacked with mail behind | cold tube only; phone glow on the hand — **the coldest frame in the video** |
| **HB2** | **s5** — `Rồi tôi nói: một phần thôi.` | quiet, level, one breath, **no emphasis on “một”** — the decision is small on purpose | the hand stops flat on box #2, lifts, pushes it half an inch away; the vendor waits; `×1` prints | **first warmth:** the counter bulb clicks on at 35 %, motivated by the vendor reaching for change |
| **HB3** | **s6** — `Chỉ thấy no.` | the slowest, plainest line; falls and stops; the 1.80 s silence is the beat | the empty box, the crumpled `×1`, steam crossing the bulb cone, the second chair still closed | **the palette turns:** pendant 40 → 100 % over 1.2 s as the steam rises; warmest frame, earned by opening the lid |

`s4b` is the re-hook, not a fourth highlight: it gets a question contour and a close-up, but no new light.

### 5.3 Sensory detail — one per beat

`s1` steam, the red band, the second pair of chopsticks, the printer's `×2` · `s2` the stiff dry bristles vs the wet handle, one tap drip · `s3` the mail squared on the second chair, the character-by-character deletion, the keyboard tick · `s4a` the freeze mid-steam, the vendor's hand stopped mid-reach · `s4b` the fingertip on the lid, the wet ring under the box, the red band · `s5` the lid under the palm, the half-inch push, the bulb click, the `×1` · `s6` the lid pop, steam on the face, the empty box, the `×1` under it, the closed second chair.

### 5.4 Re-hook and attention resets

- **0–3 s:** the hook is clear from frame 0 (two boxes + second chopsticks + `×2` + the word “hai”); the first clause is complete at **2.29 s**. **The full 19-syllable line cannot finish inside 3 s at any natural rate** (it needs 4.42 s at 4.3 syl/s; even 4.5 syl/s gives 4.22 s) — that is a property of the owner's mandated sentence, not a missing hook. What matters at 0–3 s is that the viewer can already read the whole line on screen (it is up from frame 0, four lines, readable in ~2.5 s) and has heard the behaviour stated by 2.29 s. No owner word is cut to win a stopwatch.
- **5.26–8.0 s — first payoff:** the `×2` is cashed as a *pattern*, not repeated as a line. The hard cut lands on the brush holder at 5.26 s and, before 8.0 s, the viewer has seen a second object the habit still owns — one brush dry and furred, one wet, no explanation. The hook's promise (“my body still lives in twos”) is answered with an image well inside the 8 s window; the sentence itself completes at 9.16 s.
- **~9.6 s:** scene change inside the same beat — the bathroom gives way to the dining table; a third object carries the habit.
- **~14.4 s:** hard cut back to the counter, colder and wider.
- **16.68 s — named re-hook:** the freeze ends and the close-up asks the new question *“một phần ăn thì trông thế nào?”*. This is the attention reset for the second half; it sits inside the 15–20 s window at 4.3 syl/s and at every modelled rate.
- **20.97 s:** the decision (s5), then the payoff (s6) — no new information after the last line, only the hold.

### 5.5 Ending

The last spoken word is **“no”** at **32.47 s**. Then **1.80 s** with no voice, no text, no music: the empty box, the receipt, the steam settling. There is **no CTA anywhere in the video**, so the climax and a CTA cannot share a shot. Nothing promises the viewer will be fine; the last line refuses the uplift on purpose (“Không thấy nhẹ người. Chỉ thấy no.”).

---

## 6 · Sources and claims

`research.md` exists (read 2026-10-22). The script uses **no statistic and no named psychological concept**. The mechanism in the research (habit is context-cued and automatic — `F3`; long relationships build routines — `F1`) is **staged, not spoken**: the counter, the receipt, the brush holder and the second chair are the context; no line tells the viewer a fact about people in general.

| id | what the viewer sees/hears | type | source |
|---|---|---|---|
| S-1 | “Tôi vẫn mua hai phần ăn theo thói quen…” | **user, verbatim** | `brief.md` §User constraints; `research.md` C1 |
| S-2 | two boxes, second chopsticks, `×2`, two brushes, two chairs, typed-then-deleted message | first-person detail of this narrator; **design** | `brief.md` visual list; `research.md` P1/P3/P5, C1 |
| S-3 | “một phần ăn thì trông thế nào?” / one box, `×1`, eaten | **owner thesis**, dramatised | `brief.md` thesis; `research.md` C12 |
| S-4 | the feeling at the end (“không thấy nhẹ người… chỉ thấy no”) | the narrator's own sensation, **not** a claim about anyone else | owner brief; `research.md` I7 (design, explicitly unsourced) |
| — | **not present:** durations, frequencies, “most people”, diagnosis, “chữa lành”, “buông bỏ”, “rồi sẽ ổn” | — | `research.md` §Claims we must NOT make (1–10) |

**Deliberate omissions:** no hotline (research F10/C14), no stage model, no “8 years”, no “3 months”, no gender of the ex — the typed line is **“Ăn gì chưa.”** with no pronoun, per `research.md` §Unknowns.

---

## 7 · Differentiation guard

Checked against `src/Main.tsx`, `src/videos/*`, and the briefs of `thuong-hay-so-bat-dau-lai`, `tiec-nguoi-hay-nam-thang`, `ban-khong-yeu-duoi-chi-da-manh-qua-lau`, `metkhong`, `camon`. **`gaplai` has no `brief.md` and no `src/gaplai/` in this repo now** (checked); its palette and composition survive only as secondary descriptions in `docs/metkhong/brief.md:16` and `docs/cuoc-goi-nho-cua-me/design-spec.md:151`, and the comparison below uses those, not a first-party brief.

| forbidden reuse | this script |
|---|---|
| two bowls facing each other / rice cooker / “nhặt hành” | **none** — takeaway boxes, receipt printer, stainless counter |
| facing-chair composition | **none** — the second chair is beside the table, stacked with mail, never framed opposite a seated figure |
| calendar / year cards / stick figures | **none** |
| rain, umbrella, “che ô” | **none** |
| Inter / Lexend / Literata | **none** — Lora + Be Vietnam Pro + JetBrains Mono |
| gold `#d4a574`, son-red `#FF5A36`, periwinkle `#9DB4FF` | **none** — palette in `brief.md` §5 |
| a CTA, a moral, a “healing” arc | **none** — last line refuses the uplift |

`src/ClaudeMem.tsx` is **not present** in this repository (checked); no comparison is claimed against it.

---

## 8 · Acceptance check (self-run, read-only)

- **Mandated line:** `s1` = the owner's sentence, character-for-character, including both full stops. ✅
- **Syllables:** 19 + 16 + 15 + 8 + 16 + 19 + 23 = **116**. ✅
- **Timing:** 34.27 s at 4.30; 33.07 / 35.58 / 37.03 / 39.51 at 4.50 / 4.10 / 3.90 / 3.60 — all inside 30–40. ✅
- **Keys vs shots:** 7 keys, 7 rows, 1:1. `s4a`/`s4b` are two shots (wide → close) and two keys, so the freeze is a real 0.45 s gap. ✅
- **Phrase join:** every key's phrases joined with one space reproduce `voice.proposed.json` byte-for-byte — machine-checked against the actual files (§8.1), not asserted from the sidecar text. ✅
- **Directions out of speech:** no emotion word, no accent mark, no pause notation appears in any spoken line or caption. ✅
- **Hook:** frame 0 carries two boxes + second chopsticks + `×2` + “hai”; first clause complete at 2.29 s; the full line is on screen from frame 0 and takes 4.42 s to say — the mandated sentence cannot finish in 3 s, so the sound-off text carries the whole hook while the voice states the behaviour by 2.29 s. ✅
- **Re-hook:** 16.68 s, new question, inside 15–20 s. ✅
- **Highlight beats:** exactly three (HB1–HB3), each with delivery + visual + light. ✅
- **Silence:** 1.80 s ending; no CTA. ✅
- **Claims:** zero statistics, zero diagnosis, zero generalisation; every row's `source` resolves. ✅

### 8.1 Machine check — raw result (actual files, 2026-10-22)

Read-only check: both JSON files were parsed from disk in a browser context (`file://`), not retyped.
The run predates a prose-only edit to the rate-band sentence in `limitations` (5.06 → 5.11); no
`text` field, key or canonical string changed, so the join, syllable and timing rows still describe
the current files. No machine check was possible after that edit in this runtime (see the audit note
below); the edited line is a single JSON string value and the surrounding structure is unchanged.

```
{"voiceKeys":["s1","s2","s3","s4a","s4b","s5","s6"],
 "perfKeys":["s1","s2","s3","s4a","s4b","s5","s6"],
 "keyOrderMatch":true,
 "joins":{"s1":true,"s2":true,"s3":true,"s4a":true,"s4b":true,"s5":true,"s6":true},
 "exact":true,
 "syl":{"s1":19,"s2":16,"s3":15,"s4a":8,"s4b":16,"s5":19,"s6":23},
 "totalSyl":116,"inside":2.24,"tails":4.85,"speech":26.977,
 "total":34.267,"declared":34.267,"timingMatch":true}
```

- **Not verified here (needs the voice stage):** actual measured rate, ASR/CER, naturalness, and
  whether the local engine renders the 0.14/0.18/0.16/0.26/0.22/0.30/0.14/0.16/0.32/0.22 s phrase
  gaps as silence rather than clipping the last consonant. `voice-agent` and `audio-reviewer` own
  that evidence.

**Audit:** `python3 -I scripts/pipeline.py audit bat-dau-lai-sau-mot-moi-quan-he-dai` could **not** be run in this runtime. The Code Mode catalog has no `bash`/process tool; the only server-side JS escape (`browser_run_code_unsafe`) runs in a VM where both `process` and `require` are undefined, and `browser.tabs.open` rejects `file://` URLs. This is recorded as not run, **not** as passed; the director must run it before recording the script stage.
