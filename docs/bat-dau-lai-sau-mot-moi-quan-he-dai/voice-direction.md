# Voice direction — bat-dau-lai-sau-mot-moi-quan-he-dai

Route 2 · local VieNeu clone · **`thanh-long-nang-cao`** · reference
`docs/bat-dau-lai-sau-mot-moi-quan-he-dai/voice-ref/refThanhLong.wav`
(md5 `199de31c8281d895dd571e36fe464ed5`, 8.200 s — director-verified).
Canonical text: `voice.proposed.json`. Executable plan: `voice-performance.proposed.json`.

**Engine limits, stated once.** VieNeu accepts only a local reference, `seed`, `denoise` and explicit
silence padding. It has **no rate, pitch, volume, style or emotion control**. Everything below that
sounds like “pace” is either (a) a written phrase boundary, (b) a declared phrase gap, or (c) the
actor's read of the reference — never a post-process. Audio is **never** time-stretched, and no
breath sample is inserted; a pause is silence, not an inhale.

**Directions never enter speech or captions.** Every quotation in this file is direction, not text.
The only spoken words are the seven strings in `voice.proposed.json`; the only written words on
screen are `script.md` §3–§4. No accent mark, emotion label or pause notation appears in either.

---

## 1 · Who is speaking, and to whom

- **Speaker:** the narrator, first person “Tôi”, a few months out of a long relationship.
  Same age as the viewer, no seniority, no “I have healed” authority.
- **Addressed to:** **one person, a few weeks out**, sitting at the next table. Not the ex,
  not a crowd, not a camera. The narrator is not consoling them; they are reporting what their own
  hands did, because that is the only thing they are sure of.
- **Relationship:** peer-to-peer. The listener is allowed to recognise themselves; they are never
  told what they are feeling.
- **Personality:** dry, awake, warm only at the edges. Notices small physical things — the dry
  toothbrush, the receipt paper, steam on the face — and reports them without decorating them.
- **What this voice never does:** no advice, no consolation, no psychology vocabulary, no blame of
  the ex, no crying, no whisper-as-emotion, no smile in the voice, no vocal fry, no rising
  “therapy” cadence at the end of statements.

## 2 · Energy curve and restraint

```
s1  4/10  dry, level, a little tired — the body reports
s2  3/10  observational, quieter, no sadness
s3  4/10  deadpan; the first wry beat, never played as a joke
s4a 2/10  held, almost still — the lowest energy in the video
s4b 4/10  lean in; an honest question, slightly surprised by itself
s5  5/10  quiet decision; first warmth arrives in the room, not in the voice
s6  6/10  physical, calm, slowest line at the end — not happier, just present
```

The curve rises **once**, at `s5`–`s6`, and only because the light and the act rise. The voice never
“brightens” to signal recovery. `s6` is warmer in texture but **slower and flatter** than `s1`: the
ending is a fact (“no”), not an uplift.

**Restraint budget:** one wry beat (`s3`), one open question (`s4b`), one physical close (`s6`).
Everything else is reportage. If a take sounds moved by its own story, it is wrong.

## 3 · Per-shot direction

Pause values are the declared values in `voice-performance.proposed.json` and must not be re-timed
by the voice agent. “Gap” = inside-clip silence between two phrases; “tail” = timeline gap after the
clip.

| key | intent | emotion | emphasis (accent words) | fast / slow | breath & pause placement | ending contour |
|---|---|---|---|---|---|---|
| **s1** | Hook + cover: confess the habit before explaining it | dry, level, a little tired; no self-pity | **hai phần** · **thói quen** · **tính tiền** · **chỉ còn mình** | brisk on “Tôi vẫn mua hai phần ăn”; **slower from “Đến lúc tính tiền”**; last four words spaced | no breath before the first word; **0.14 s gap after “quen.”** (real padding, not the full stop); tail 0.50 s | falls flat on “mình”; no lift, no sigh, mouth closed |
| **s2** | Show the same habit in a second object | observational, quiet, zero sadness | **hai bàn chải** · **khô** · **còn ướt** | even; second sentence a touch quicker | **0.18 s gap after “chải.”**; tail 0.45 s | flat on “ướt”; no downward “sad” slope |
| **s3** | The first wry beat: the thumb remembers the message | deadpan, private; the smallest smile is in the listener, not in the voice | **hai ghế** · **gõ** · **Ăn gì chưa** · **xoá từng chữ** | even on the chairs; typed line **slower and softer**; “Rồi xoá từng chữ” dry | **0.16 s gap after “ghế.”**; **0.26 s gap before “Rồi”**; tail 0.85 s (the deletion is watched, not narrated) | stops on “chữ”; no sigh, no laugh |
| **s4a** | The body stops before the mind explains | held, almost still; the lowest energy | **một tối** · **đứng lại** · **trước quầy** | slow, one clause, one breath | no gap inside; **tail = 0.45 s freeze** — timeline silence, not punctuation | flat on “quầy”; the freeze does the work |
| **s4b** | **Re-hook:** replace “sad” with a real question | honest, slightly surprised by itself; not tearful | **không hẳn** · **tiếc** · **quên mất** · **một phần ăn** · **trông thế nào** | “Không hẳn vì tiếc.” quick and offhand; second sentence slower | **0.22 s gap after “tiếc.”**; tail 0.35 s | question contour **only** on “trông thế nào”; the rest stays level; no answer in the voice |
| **s5** | The decision is a hand, not a speech | quiet, ordinary, no triumph | **hai hộp** · **dừng** · **hộp thứ hai** · **một phần thôi** | even on the boxes; **slow on “dừng”**; “một phần thôi” one breath | **0.14 s gap after “quầy.”**; **0.30 s gap before “Rồi”**; tail 0.45 s | falls and stops on “thôi”; **no emphasis on “một”**, no lift of relief |
| **s6** | The payoff is a fact, not a cure | calm, physical, unbeautified; not happier | **một hộp** · **mở nắp** · **hơi cơm** · **ăn hết** · **nhẹ người** · **no** | plain first sentence; slower through the three physical beats; **slowest and plainest on the last line** | **0.14 s after “về.”**, **0.16 s after “mặt.”**, **0.32 s after “hết.”** (the only long beat inside a clip), **0.22 s after “người.”**; tail **1.80 s** | “Chỉ thấy no.” falls and stops; no rise, no breathy release, no CTA |

**Reading rule for the quoted message (`s3`):** “Ăn gì chưa.” is said as a real message to a real
person, not as a quote, not with air quotes. It is the only line in the video addressed to the ex,
and it is addressed to a phone that will not send it.

**Reading rule for the decision (`s5`):** “một phần thôi” is said to the vendor, at normal
conversational volume — the one line in the video that leaves the narrator's head. It must not sound
like a revelation.

## 4 · Highlight beats — voice + visual + light

Exactly three, matching `script.md` §5.2. No fourth.

| id | key | voice | visual | light |
|---|---|---|---|---|
| **HB1** | `s3` | deadpan; typed words slower and softer; “xoá từng chữ” flat; **no sigh, no laugh** | characters appear one at a time; thumb hovers; each vanishes at 0.12 s; second chair stacked with mail | cold tube + phone glow only — **coldest frame** |
| **HB2** | `s5` | quiet, level, one breath; **no emphasis on “một”** | hand stops flat on box #2, lifts, pushes it half an inch; `×1` prints | counter bulb clicks on at **35 %** as the vendor reaches for change — **first warmth** |
| **HB3** | `s6` | slowest, plainest line; falls and stops; the 1.80 s silence is the beat | empty box, crumpled `×1`, steam crossing the bulb cone, second chair still closed | pendant **40 → 100 %** over 1.2 s — **warmest frame**, earned by opening the lid |

`s4b` is the re-hook: it gets a question contour and a close-up, but **no new light** and is not a
highlight beat.

## 5 · Ending behaviour

- Last spoken word: **“no”**, ends at **32.47 s** (plan).
- **1.80 s** of timeline silence after it. No voice, no text, no music; BGM fades on the last word.
- No CTA, no title card, no whisper, no exhale. The frame holds on the empty box and the `×1`.
- If the measured `s6` runs long, shorten the **inside gaps** in the order given in `script.md`
  §1.1 — never the 1.80 s ending, never the words, never `atempo`.

## 6 · What the voice agent must not do

1. Do not add a breath, a sigh, a laugh, a hum or a vocal cue; non-spoken cues are disabled
   (`experimentalCues.enabled = false`).
2. Do not merge `s4a` and `s4b` into one clip; the 0.45 s freeze must stay a timeline gap.
3. Do not “improve” a pause with the punctuation already in the text; the declared pads are the only
   pauses.
4. Do not change a word to make a sentence smoother. If a phrase fails CER twice, report the exact
   phrase and the ASR output; do not paraphrase.
5. Do not time-stretch, pitch-shift or normalise one clip differently from the others.

---

## tone-probe.py missing — manual tone review

`scripts/tone-probe.py` **does not exist in this repository** (checked). The automated two-model
probe therefore could not be run. The manual pass below reads every line aloud and lists every
cluster where two or more marked tones sit on adjacent syllables, plus the two clusters that were
**rewritten before this table**. No RISK remains in the current `voice.proposed.json`.

| # | word / cluster | sentence | tones | verdict | rewrite |
|---|---|---|---|---|---|
| 1 | **nhẹ nhõm** (earlier draft of `s6`) | “Không thấy nhẹ nhõm.” | nặng + ngã — two glottalised tones on adjacent syllables (one falling, one rising) | **RISK — rewritten** | → **“nhẹ người”** (nặng + huyền): the huyền removes the second glottalised tone; current line: “Không thấy nhẹ người.” |
| 2 | **giá đỡ vẫn** (earlier draft of `s2`) | “giá đỡ vẫn hai bàn chải” | sắc + ngã + ngã — three high/rising tones in a row | **RISK — rewritten** | → **“giá đỡ có hai bàn chải”** (sắc + ngã + sắc): the second ngã is gone, so the two glottalised tones are no longer adjacent |
| 3 | xoá từng chữ | `s3` | sắc + huyền + ngã | OK — the huyền breaks the cluster | — |
| 4 | thấy nhẹ người | `s6` | sắc + nặng + huyền | OK — the nặng breaks the two high tones | — |
| 5 | hộp thứ hai | `s5` | nặng + sắc + ngang | OK | — |
| 6 | một phần thôi | `s5` | nặng + huyền + ngang | OK | — |
| 7 | mở nắp | `s6` | hỏi + sắc | OK — one rising tone only | — |
| 8 | trước quầy | `s4a` | sắc + huyền | OK | — |
| 9 | chỉ còn mình | `s1` | hỏi + huyền + huyền | OK | — |
| 10 | bàn chải | `s2` | huyền + hỏi | OK | — |
| 11 | đứng lại | `s4a` | sắc + nặng | OK | — |
| 12 | không hẳn vì tiếc | `s4b` | ngang + hỏi + huyền + sắc | OK | — |
| 13 | trông thế nào | `s4b` | ngang + sắc + huyền | OK | — |
| 14 | bốc lên mặt | `s6` | sắc + ngang + nặng | OK | — |
| 15 | giờ chỉ còn mình | `s1` | huyền + hỏi + huyền + huyền | OK | — |

**Result: 2 RISK clusters found, both rewritten out of the script; 0 RISK remain; 0 sentences
deferred.** The table covers every line in `voice.proposed.json` (s1, s2, s3, s4a, s4b, s5, s6).
Because the tool is missing, this is a **manual** check, not a machine pass, and it is reported as
such.

One owner-locked sequence is deliberately **not** a rewrite candidate: `s1` contains `Đến lúc tính`
(sắc + sắc + sắc). The line is verbatim by contract, so the script cannot repair it; if the clone
misreads it, that is an ASR/CER failure for `voice-agent` to report on that key, not a script edit.
