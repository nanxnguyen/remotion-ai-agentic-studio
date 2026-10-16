# Script alt-2 — `ban-khong-yeu-duoi-chi-da-manh-qua-lau` (in-media-res)

- Author: `script-agent-alt-2` (parallel Phase 2a producer). Status: **alternative sequencing proposal for gate A**, not the primary `script.md`.
- Profile: `story`. Pattern: **In-media-res action** (`references/hook-engineering.md` L22 — "Begin inside a concrete event → stakes → earned outcome").
- Hook candidate: **research hook #4** — "the withheld message" (`research.md` L19). Deliberately *not* the candidate the primary selects (research.md L23 selects #1 direct address).
- Accepted inputs: `brief.md`, `research.md`. Written 2026-10-18.
- Comparison baseline: the **owner's original ordering** in `brief.md` L18–L27. The sibling's `script.md` did not exist on disk when I wrote this (`docs/<vid>/` held `status.json`, `brief.md`, `research.md`, `status.lock`; re-checked after writing — `script.md` still absent), so the comparison below is against the user's line order, not against the sibling's draft.
- This file is additive evidence for gate A. It is **not** one of the documents listed in `.agents/rules/02-documentation.md` D1, and it changes no stage state.

## Why this ordering exists (one paragraph)

The user's order explains the character before showing them: *everyone comes to you → you know how to comfort → but one night you sat alone → the withheld message → why → the truth → the umbrella*. That is a well-built explanatory arc, but it opens on a premise the viewer has to accept on trust ("mọi người thường tìm đến bạn" is an assertion, not an event), and it spends its most concrete image — a phone screen in a dark room — as the middle of the video, at ~18 s, where most of the attention is already spent. This variant reverses the first six lines: it puts the viewer *inside* the dark room with the phone glow and the hovering thumb at frame 0, lets them watch the message get written and never sent (payoff by ~6.5 s), and only then pulls back to reveal *why* this particular person is the one everybody runs to. The role becomes a reveal instead of a premise, and the same phone screen carries both the hook and the later payoff ("chính bạn lại ngồi rất lâu trước màn hình điện thoại" at ~16 s refers back to an image the viewer already saw, so the line lands as recognition, not as new information). The cost, stated plainly in the comparison section at the end: the word "Nhưng" in line 3 loses its original partner and has to lean on a different contrast, and the re-hook has to be carried by a reveal rather than by the owner's question placement.

---

## Frame 0 — the cover

**No fade from black, no title animation.** Frame 0 is already the shot: an extreme close-up, phone held about 30 cm from a face in an unlit room. The screen is the brightest object in frame and lights the jaw and one eye from below; the message bubble already contains the full text `Hôm nay mình mệt quá.` with the send key visible and unpressed. A thumb hovers a few millimetres above the keyboard.

- Cover on-screen text (safe zone, ≥54 px glyph height, nothing in the bottom 210 px): **`Một tin nhắn chưa gửi`**.
- With sound off the hook is complete at frame 0: the viewer sees a composed message that has not been sent, and the label says so.
- The chat bubble is a **scene prop**, not a recreated product UI, so no `minh hoạ` label is planned; `content-agent` to confirm this reading at its branch (brief.md L51 assumes no labels for this profile).
- First spoken word lands at **0.10 s** (0.10 s of silence lets the glow register — this is a hold, not dead air).

## Hook timing

| Window | What happens | Spoken / visible |
| --- | --- | --- |
| **0–1 s** | Frame 0 already carries the hook. Thumb hovering, send key unpressed, glow on the jaw. | Spoken: `Bạn muốn nhắn:` lands ≈0.9 s. Visible: the whole bubble is legible at 0.0 s. |
| **1–3 s** | The truthful promise: an intimate confession the viewer recognises. Curiosity gap opened — *she wants to say it, so why won't she send it?* | Spoken line complete at **2.32 s**; the on-screen text has not changed, so the sound-off and sound-on readings agree. |
| **3–8 s** | First concrete payoff — the message is never sent. Longest early hold (1.05 s) sits on `bạn lại thôi`. | `Rồi nghĩ một lúc, bạn lại thôi.` completes at **6.48 s**, holds to 7.53 s. Payoff lands ~1.5 s inside the 8 s deadline. |

## Re-hook (named)

**s6 — `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` · 16.00–20.87 s.** Type: **reveal**, not a repeated claim. The viewer has just watched the message get written and never sent (0–7.5 s) and then learned who this person is (7.5–16 s); this line says there was a night when it went on far longer, and it is *you*. The reveal word `chính bạn` runs ≈17.4–18.0 s and `rất lâu` ≈18.5–19.1 s (syllable boundaries at 3.6 syl/s from a 16.30 s speech start) — inside the ~15–20 s window. It resets attention by enlarging the stakes rather than by opening a new question, and s8 (`Vậy tại sao bạn không nhắn?`, 22.94–25.11 s) is the second push: the reason has not been given yet.

## Shot table

Column note: the 8 required columns are `# | seconds | spoken line | on-screen text | image/action | accent words | delivery | source`. `key` and `syl` are added so the timing math and the clip keys are auditable in the same table.

| # | key | seconds | syl | spoken line | on-screen text | image/action | accent words | delivery | source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `s1` | 0.00–2.67 · speech 2.22 (0.10–2.32) + hold 0.45 | 8 | Bạn muốn nhắn: 'Hôm nay mình mệt quá.' | Một tin nhắn chưa gửi | Extreme close-up, dark room; screen glow is the only key light, lighting the jaw and one eye from below; thumb hovering, send key unpressed; shallow depth of field, no face reveal yet. | `muốn nhắn`, `mệt quá` | Intimate, confessional, almost a whisper but not theatrical — the volume of someone reading their own unsent message aloud; stress `muốn nhắn`, let `mệt quá` fall rather than peak; unhurried typing pace; 0.10 s of silence before the first word so the glow registers; let the line trail off, it is unfinished on purpose. | research.md L19 hook #4; brief.md L21 (verbatim) |
| 2 | `s2` | 2.67–4.54 · speech 1.62 + hold 0.25 | 6 | Ngón tay dừng lại trên phím. | xong rồi · chưa gửi | Push in half a step on the thumb; the keyboard letters become legible; the cursor keeps blinking and nothing is typed. Cool screen light only — the room has no other source. | `dừng lại` | Quieter than s1, observational — the speaker is watching, not confessing; slow the pace a touch; a short breath in the middle of the line; the hold after it is the first sign something is being decided. | author add-on (not in user account) — gate A decides |
| 3 | `s3` | 4.54–7.53 · speech 1.94 (4.54–6.48) + hold 1.05 | 7 | Rồi nghĩ một lúc, bạn lại thôi. | nghĩ một lúc · thôi | **Highlight beat H1.** The thumb lifts away from the keyboard; the text in the bubble greys out as if deleted and the thread returns to an empty state; first glimpse of the face — one eye, tired, lit only by the now-empty screen. | `thôi` | The softest delivery in the first 8 s; `thôi` is said the way a hand lets go of something, trailing and unstressed; a visible pause inside the line before `bạn lại thôi`; then the longest early hold (1.05 s) — the deletion is the first payoff and it needs dead air to land. | research.md L19 hook #4; brief.md L22 (verbatim) |
| 4 | `s4` | 7.53–10.90 · speech 2.82 (7.73–10.55) + hold 0.35 | 11 | Mọi người thường tìm đến bạn mỗi khi có chuyện buồn. | tất cả tìm đến bạn | Cut to a memory: the same person on a sofa, phone in hand, another person's hand on her shoulder, listening; her face is the only one fully lit for the first time — but the light is *incoming* (a warm lamp behind her), not the cold screen glow of s1–s3. | `tìm đến bạn` | Warm, matter-of-fact, slightly forward in pace — the story shifts from confession to description and the speaker steps back half a step; small accent on `tìm đến bạn`; 0.20 s breath before the line to mark the time jump; no pathos yet. | research.md L12 inference (speaker is the emotional-support person in their circle); brief.md L18 (verbatim) |
| 5 | `s5` | 10.90–16.00 · speech 4.50 (11.05–15.55) + hold 0.45 | 18 | Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn. | người khác thấy ổn hơn | Three short cuts inside one shot: her hand patting a shoulder, a glass of water pushed across a table, a nod. She is competent and unhesitating; the camera stays on her hands, not her face. | `an ủi`, `thấy ổn hơn` | Confident and conversational, the briskest pace in the video (4.0 syl/s) because these are three things she can do without thinking; land each sentence as a small separate statement with a beat between them; the accent is on what the *other* person feels (`thấy ổn hơn`), not on her. | brief.md L19 (verbatim); research.md L8 audience language "che ô cho người khác", "người ổn" |
| 6 | `s6` | 16.00–20.87 · speech 4.17 (16.30–20.47) + hold 0.40 | 15 | Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại. | một tối · rất lâu | **Re-hook + contrast pair.** Return to the room from s1–s3, but the framing is now WIDE, not macro: one small figure on the edge of the bed, knees drawn up, phone face-up beside her, cold screen light on the wall. Same screen as the cover — the viewer recognises it. Light drops to the deepest navy of the video. | `chính bạn`, `rất lâu` | The emotional floor, spoken without self-pity and without a tremor — flat, honest, slightly heavier than everything before it (3.6 syl/s); `chính bạn` lands alone after a 0.30 s breath, then `rất lâu` is stretched, not stressed; 0.40 s of air after it, because this line should not be answered by the next shot. | brief.md L20 (verbatim); research.md L19 hook #4 (image reused as payoff) |
| 7 | `s7` | 20.87–22.94 · speech 1.67 (20.97–22.64) + hold 0.30 | 6 | Bên ngoài, mưa chạm cửa kính. | mưa chạm cửa kính | Hold on the same wide frame; the first rain hits the window behind her, inaudible to her but audible to us; a few drops crawl down the glass and catch the phone light. This is the umbrella/rain motif arriving as sound, not as an icon. | `mưa chạm cửa kính` | Almost stage-whispered, present tense, a sensory observation offered rather than performed; the pace returns to normal; the line should sound like a detail the speaker just noticed while remembering. | author add-on (not in user account) — gate A decides; motif from brief.md L41 |
| 8 | `s8` | 22.94–25.11 · speech 1.62 (23.09–24.71) + hold 0.40 | 6 | Vậy tại sao bạn không nhắn? | tại sao không nhắn? | Cut back to the tight phone close-up from s1 — same framing, same glow, but nothing is being typed now. The viewer is handed the same object with nothing new on it. | `tại sao`, `không nhắn` | Curious and direct, a real question asked to one person, not to the audience; the tone lifts slightly from s6 and makes it a puzzle rather than a lament; 0.15 s breath in; the hold after it is a gap of expectation, not a pause. | author add-on (not in user account) — gate A decides |
| 9 | `s9a` | 25.11–27.68 · speech 2.22 (25.46–27.68) + hold 0 | 8 | Không phải vì không có ai để nhắn. | không phải vì | Her hand closes over the phone and turns it face-down on the bed. Cut the light with it — the frame goes almost dark for the first time in the video. | `không phải` | Setting up the turn: level, measured, the delivery of someone who is about to correct you (3.6 syl/s); `Không phải` is clean and unhurried, no drama; 0.35 s breath in, **no hold out** — this key must cut straight into the silence so the gap reads as one thought. | brief.md L23 (verbatim) |
| 10 | `s9b` | 28.23–32.06 · speech 3.43 (28.23–31.66) + hold 0.40 | 12 | Mà vì bạn đã quen với việc mình phải là người ổn. | quen với việc là ổn | **Highlight beat H2.** After the 0.55 s silence, the amber accent from the brief appears for the first time in the whole video — a warm bedside lamp just switched on off-frame, on her hands resting open and empty on the sheet. She is not crying; she is tired, and the frame says so. | `quen`, `ổn` | The slowest, softest read in the video (3.5 syl/s), with no raised intensity anywhere — the weight is in the words, not the volume; `quen` is where the confession lives; `người ổn` is said to *her*, gently, as a diagnosis and a hug at once; 0.40 s of air after, and no music stinger on it. | brief.md L24 (verbatim); light from brief.md L42 |
| 11 | `s10` | 32.06–34.12 · speech 0.86 (32.06–32.92) + hold 1.20 | 3 | Bạn biết không… | ai sẽ hỏi bạn? | Static, warm frame; she lifts her head slightly toward the lamp as if someone just came into the room. Nothing else moves. The on-screen question does the work while the voice stops. | `biết không` | A held breath with three syllables on it; rising inflection on `không` that is left unresolved — **the pause after this line is a 1.20 s timeline gap, not the punctuation**; do not perform the ellipsis. | brief.md L25 (verbatim, ellipsis retained) |
| 12 | `s11` | 34.12–38.21 · speech 3.59 (34.27–37.86) + hold 0.35 | 14 | Người thường xuyên che ô cho người khác cũng có những ngày bị ướt. | che ô · vẫn bị ướt | **Highlight beat H3 (start).** The metaphor is shown, not labelled: a hand holding an umbrella out over someone else walking ahead; then the same hand lowering the umbrella and standing in the rain, hair and shoulder dark with water. Rain is subtle, never a downpour. | `che ô`, `bị ướt` | Open and warm with a small lift on `bị ướt` — this is the line that releases the video, so the pace comes up slightly (3.9 syl/s); it must not be sad, it must be *true*; hold the `che ô` phrase lightly, do not lean on it. | brief.md L26 (verbatim); metaphor from brief.md L41 |
| 13 | `s12` | 38.21–42.76 · speech 4.05 (38.21–42.26) + hold 0.50 | 15 | Và hộ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?' | hỏi một người vậy thôi | Same warm night; a second silhouette is now standing beside her under the same umbrella — only her shoulder is in frame, we never see the face. The question is said to her, and someone has arrived to ask it. | `một người hỏi`, the quoted question | Closing contour: falling, open-ended, addressed to her — not to the viewer and not to the camera; the quoted question is said at the pace of a real question, gently, with `với bạn thế` landing last and staying; 0.50 s of air after, then silence. | brief.md L27 (verbatim) |
| 14 | `—` | 42.76–47.81 · **silent hold 5.05 s, no clip** | 0 | *(no speech — no key is created)* | Bạn không yếu đuối, / bạn chỉ đã mạnh mẽ quá lâu. | **Ending hold.** 2.5 s of pure image: rain on the window, both figures under the umbrella, no movement, no music stinger. At ≈45.3 s the user's own theme line fades in (verbatim from brief.md L14, two stacked lines) and holds to the last frame. Nothing else is added. | `mạnh mẽ quá lâu` (on-screen only) | No voice at all. This silence is the delivery: it is the length of the hold, not a sound. | brief.md L14 theme line (verbatim, on-screen only); research.md L18 hook #5 (title line as resolution) |

### Row 14 note

The theme line is the user's own wording (brief.md L14) and is **on-screen only** — it adds zero spoken syllables and does not appear in `voice.json`. It exceeds the ≤6-word on-screen guideline as a single line, so `content-agent` must split it across two stacked caption lines (4 + 7 words) or three; flag raised here rather than silently broken.

## Contrast pair carrying the turn

**Spoken contrast (the one the script itself states, at rows 9–10):**
`Không phải vì không có ai để nhắn.` → `Mà vì bạn đã quen với việc mình phải là người ổn.`
Nobody to ask → many people, and the obstacle is inside her. The turn is carried by the split key: 0.55 s of real silence between two clips, so the correction arrives as a change of mind rather than a conjunction.

**Visual contrast (the one that makes the spoken one land):**
s1–s3, cold screen light *outgoing* — she composes and deletes → s4–s5, warm lamp light *incoming* — someone else is comforted by her → s6, the cold screen light again but this time she is the one alone in the wide frame. Same object, opposite direction.

## Sensory detail per beat

| Beat | See | Hear |
| --- | --- | --- |
| s1 (0.0–2.7) | screen glow on the jaw from below, thumb hovering, cursor blinking | voice close to the mic, quiet room tone |
| s3 (4.5–7.5) | text greying out as if deleted, one tired eye | the longest early silence |
| s4–s5 (7.5–16.0) | hand on a shoulder, a glass of water pushed across a table | rain starting somewhere outside |
| s6 (16.0–20.9) | one small figure on the edge of the bed, phone face-up, cold light on the wall | room tone, nothing human |
| s7 (20.9–22.9) | drops crawling down the glass, catching the screen light | rain hitting the window — first time we hear it |
| s9b (28.2–32.1) | the warm lamp switching on off-frame, her open empty hands on the sheet | the silence after it |
| s11–s12 (34.1–42.8) | umbrella lowered, hair and shoulder wet, a second silhouette beside her | rain on both of them |
| hold (42.8–47.8) | rain on the window, nothing moves | silence, then the room tone under the theme line |

## Highlight beats (3 of a maximum 3)

**H1 · `s3` · 4.54–7.53 s · "the message is never sent"**
Delivery: softest read of the first 8 s; `thôi` trails off; 0.5 s inside the line before `bạn lại thôi`; 1.05 s of air after.
Visual: the thumb lifts, the bubble greys out to empty, the first glimpse of one tired eye.
Light: the screen is the only source — the emptier the screen, the colder the face.

**H2 · `s9b` · 28.23–32.06 s · "quen với việc mình phải là người ổn"**
Delivery: slowest and softest read in the video (3.5 syl/s); weight on `quen`, then `người ổn` said to her as a diagnosis and a hug; no intensity, no tremor, no sting.
Visual: she turns the phone face-down and the frame goes almost dark; then the amber bedside lamp comes on off-frame onto her open, empty hands.
Light: **first appearance of the brief's warm amber accent in the entire video** — the turn from cold-blue to warm is the visual thesis.

**H3 · `s11`→`s12` · 34.12–42.76 s · "che ô … cũng có những ngày bị ướt"**
Delivery: the only lift in the script — pace up to 3.9 syl/s, a small rise on `bị ướt`, then immediately down to a falling, open-ended close; the quoted question is spoken at the pace of a real question.
Visual: the umbrella held out over someone else, then lowered into the rain; a second silhouette arrives beside her so the closing question is being *asked*, not just said.
Light: full warm amber, the umbrella edge catching a rim of light; rain stays subtle.

## Split keys

- `s9a` → **`s9b`**, with a **0.55 s silence gap inserted in the timeline between the two clips** (no third clip, no punctuation trick). The gap is the beat at the turn.
- `s10` (`Bạn biết không…`) keeps its ellipsis inside the clip for reading, but **the 1.20 s beat after it is a timeline gap**, not the ellipsis. A local clone voice cannot control the pause, so the pause is built in the timeline.
- **Renumbering note:** `brief.md` L61 names the split-key convention as `s6a`/`s6b`. This variant defers the turn to shot 9/10, so the same convention appears here as **`s9a`/`s9b`**. If gate A adopts the primary's key count, the keys must be renumbered consistently in `voice.proposed.json` and `voice-performance.proposed.json`; do not mix the two schemes in one file.
- No key is created for the ending hold (row 14) — it is silence, not speech.

---

## Timing proof

Unit = **space-separated syllables** (one token = one syllable, counted exactly as written, punctuation attached). Rate per shot is stated because the delivery changes; overall it must land inside the 3.7–4.2 syl/s band.

| key | syl | rate (syl/s) | speech (s) | holds + gap (s) | window |
| --- | --- | --- | --- | --- | --- |
| `s1` | 8 | 3.6 | 2.22 | 0.45 | 0.00–2.67 |
| `s2` | 6 | 3.7 | 1.62 | 0.25 | 2.67–4.54 |
| `s3` | 7 | 3.6 | 1.94 | 1.05 | 4.54–7.53 |
| `s4` | 11 | 3.9 | 2.82 | 0.35 | 7.53–10.90 |
| `s5` | 18 | 4.0 | 4.50 | 0.45 | 10.90–16.00 |
| `s6` | 15 | 3.6 | 4.17 | 0.40 | 16.00–20.87 |
| `s7` | 6 | 3.6 | 1.67 | 0.30 | 20.87–22.94 |
| `s8` | 6 | 3.7 | 1.62 | 0.40 | 22.94–25.11 |
| `s9a` | 8 | 3.6 | 2.22 | 0.35 | 25.11–27.68 |
| *gap* | 0 | — | 0 | 0.55 | 27.68–28.23 |
| `s9b` | 12 | 3.5 | 3.43 | 0.40 | 28.23–32.06 |
| `s10` | 3 | 3.5 | 0.86 | 1.20 | 32.06–34.12 |
| `s11` | 14 | 3.9 | 3.59 | 0.35 | 34.12–38.21 |
| `s12` | 15 | 3.7 | 4.05 | 0.50 | 38.21–42.76 |
| hold | 0 | — | 0 | 5.05 | 42.76–47.81 |

- **Total syllables: 129.** Of these, **111 are the user's ten mandatory lines, copied verbatim; 18 are my add-ons** (`Ngón tay dừng lại trên phím.` 6, `Bên ngoài, mưa chạm cửa kính.` 6, `Vậy tại sao bạn không nhắn?` 6). Every add-on is a sensory observation or a transition, never an emotional summary.
- **Total speech: 34.71 s** → mean rate **3.72 syl/s** (inside 3.7–4.2).
- **Holds inside shots: 7.50 s · split gap: 0.55 s · ending hold: 5.05 s → total silence 13.10 s.** (34.71 speech + 7.50 + 0.55 + 5.05 = 47.81 s.)
- **Planned total: 47.81 s ≈ 47.8 s.** Inside the user's 45–55 s override (brief.md L9), and it includes speech, pauses, transitions and the ending hold.
- **Risk flag for the voice stage (measured clips decide, never acceleration):** if every clip is measured at the fast end (4.1 syl/s) the speech total falls to 129/4.1 = **31.5 s** and the whole video to **44.6 s — below the 45 s floor**. The fix in that case is to lengthen the ending hold from 5.05 s to ≈8.4 s (or distribute ~0.4 s across the eight longest pauses), **never to speed up the audio**. Two lines (`s9b`, `s10`) are planned at 3.5 syl/s, below the 3.7 planning band; that is a deliberate choice for the softest lines and the voice stage must confirm it does not read as slow.

## Mandated-line verification (all ten, verbatim, in this variant's order)

| # | verbatim line | key | present |
| --- | --- | --- | --- |
| 1 | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | `s1` | ✔ |
| 2 | `Rồi nghĩ một lúc, bạn lại thôi.` | `s3` | ✔ |
| 3 | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | `s6` | ✔ |
| 4 | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | `s4` | ✔ |
| 5 | `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` | `s5` | ✔ |
| 6 | `Vậy tại sao bạn không nhắn?` | `s8` | ✔ (add-on, not mandated) |
| 7 | `Không phải vì không có ai để nhắn.` | `s9a` | ✔ |
| 8 | `Mà vì bạn đã quen với việc mình phải là người ổn.` | `s9b` | ✔ |
| 9 | `Bạn biết không…` | `s10` | ✔ (ellipsis character preserved) |
| 10 | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | `s11` | ✔ |
| 11 | `Và hộ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | `s12` | ✔ |

Rows 6 and the theme line in row 14 are the only non-mandated spoken/on-screen text and are marked as such. Every acting direction lives in the `delivery` column only; no spoken cell contains a direction, a parenthetical or a stage cue.

---

## Comparison against the owner's original ordering (brief.md L18–L27)

**Stronger here:** the hook. The owner's line 1 (`Mọi người thường tìm đến bạn…`) is an assertion about the viewer that must be believed before anything happens, so frame 0 carries a statement instead of an event and the first 3 s buy attention with a premise; this variant puts an unsent message under the viewer's thumb at frame 0, so the hook is a thing happening rather than a thing claimed, and the 1–3 s curiosity gap is concrete and answerable ("she wrote it and never sent it") rather than open. The withheld-message pair (rows 1–3) lands the first payoff at ~6.5 s, i.e. before either role-setting line has been spoken at all, where in the owner's order that same image only arrives after both of them; it also means the phone screen in line 3 at ~16 s is an image the viewer has already looked at, so `chính bạn lại ngồi rất lâu trước màn hình điện thoại` is recognised rather than introduced — recognition is the stronger form of that reveal. **Weaker here:** line 3's word `Nhưng` loses its original partner. In the owner's order it contrasts directly against `Bạn biết cách an ủi…` — *you comfort everyone, but* — which is the cleanest statement of the video's thesis and it sits exactly where a viewer expects a thesis. Here it has to lean on a weaker contrast (*you deleted the message, but you also sat a long time*) and a scene change to carry it, and the re-hook is a reveal rather than a question, which is the less reliable reset; the owner's `Bạn biết không…` also arrives with far more scene behind it here, which makes the `s10` silence longer and more exposed than in the original. Net: this ordering buys a materially stronger first eight seconds and pays for it with a softer mid-video hinge; the umbrella payoff and the closing question are unaffected either way.

## Open items for gate A

1. Three add-on lines (18 syllables, 14 % of the script) are mine, not the user's. If gate A prefers strict verbatim, drop `s2` (the finger) and `s7` (the rain) — that removes 12 syllables and 3.94 s, and the 47.8 s total becomes 43.9 s, **below the 45 s floor**, so a dropped add-on must be replaced by a longer hold, not by a faster read.
2. The ending-hold theme line is 11 words across two lines and needs `content-agent` to confirm it fits the caption component.
3. `s9a`/`s9b` versus the brief's `s6a`/`s6b` naming — pick one scheme for the whole video.
4. Whether a chat bubble counts as a scene prop (no `minh hoạ` label) is a `content-agent` call, not mine.
5. The 3.5 syl/s plan for `s9b`/`s10` is below the planning band; the voice stage must measure it before the timeline is fixed.