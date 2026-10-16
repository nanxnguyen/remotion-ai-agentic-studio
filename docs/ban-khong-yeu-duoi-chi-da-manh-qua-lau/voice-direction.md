# Voice Direction — ban-khong-yeu-duoi-chi-da-manh-qua-lau

**Video ID:** ban-khong-yeu-duoi-chi-da-manh-qua-lau · **Profile:** story — one consistent person acting out each beat, expressive close-ups
**Canonical text:** `voice.proposed.json` — **14 keys**, played back in file order:
`s1 · s2 · a1 · s3 · a2 · s4 · s5 · a3 · s6 · s7 · s8 · s9 · a4 · s10`
(`s1`–`s10` are the owner's ten mandatory lines, verbatim and in the owner's original order; `a1`–`a4` are the four `[ADD]` sensory connectors marked in `script.md` §5. `scripts/gen-voice-clone.py` walks this file in insertion order, so the interleaved `a`-keys play back in the written order.) The director copies an accepted proposal to `voice.json`.
The END title card is **not** a key: it is silence, not speech.

## Voice reference — `pending`, and why

**Status: `pending voice-route benchmark`. No preview slug is named in any phase-2 file, and none may be invented.**

`vietnamese-voice-samples/previews/` **does not exist on this machine**: the parent directory `vietnamese-voice-samples/` contains only `.DS_Store`, and the path `vietnamese-voice-samples/previews/` returns "File not found". That directory is local-only and git-ignored, and `scripts/test_voice_catalog.py` skips its assertion when it is absent — so a missing preview catalogue is an expected state, not a defect.

Two checks the workflow normally requires could **not be run**: `ls vietnamese-voice-samples/previews/` and `python3 -m unittest scripts.test_voice_catalog`. This runtime exposes no shell or process-execution tool (only browser, chrome-devtools, claude-mem, codegraph, context7, figma, firecrawl, opencode and playwright), so neither command could be executed; the statement above comes from reading the filesystem directly, not from running a command.

**Limitation carried to gate A and to `voice-agent`:** the selection of "gentle, intimate, conversational, emotionally expressive but never theatrical" cannot be made or scored here. `voice-performance.proposed.json` therefore keeps `reference.source = "pending voice-route benchmark"` and `referenceSelectionStatus = "pending"` on all fourteen shots, and `status.json` `voice` stays `tbd`. Whoever resolves the voice route must (a) confirm the preview catalogue on a machine that has it, (b) run the catalogue test, (c) benchmark the candidates named in `.agents/roles/voice-agent.md` on the same 15–20 s passage of this script — which now exists in a stable form — and (d) then fill all fourteen `reference` fields and `voice-direction.md` §Voice reference with the same slug.

## Audience addressed

One person ("bạn") — the viewer who is always the "strong one", the one friends come to when they are sad, the one who comforts and never asks to be comforted. Singular, addressed directly, never "chúng ta", never an audience.

## Speaker relationship

A trusted, gentle friend who has been on both sides of the umbrella — someone who has held it for others and now quietly says: *you can be rained on too.* Peer to peer: not a teacher, not a therapist, not a coach. Warm, equal, non-judgmental.

## Overall delivery personality

Gentle, intimate, conversational, emotionally expressive but **never theatrical**. Reassuring. Varied intonation, meaningful emphasis, natural breaths, no uniform reading cadence. **No forced humour, no exaggerated sadness, no whispering.** Curiosity at the start → reassurance in the middle → a soft, open ending. Expressiveness comes from *where the voice slows and where it stops*, not from volume.

## Energy curve (planning rate 3.9 syl/s, `script.md` §1)

| span | what happens | energy |
|---|---|---|
| 0.00–3.17 s (`s1`) | the hook — naming the viewer | lightest, quickest read in the video |
| 3.17–8.04 s (`s2`) | what the viewer already does | warm and steady, three flat statements |
| 8.04–15.60 s (`a1` → `s3`) | the effect, then the turn | pace falls; the navy drops out of the frame |
| 15.60–25.42 s (`a2` → `s5` → `a3`) | the room, the re-hook, the give-up | the floor: almost nothing happening in the voice |
| 25.42–33.92 s (`s6` → `s7` → `s8`) | the correction, the truth, the breath-word | quiet recognition, then one held fragment |
| 33.92–41.41 s (`s9` → `a4`) | the umbrella landing | warm; the image does the work |
| 41.41–47.06 s (`s10`) | the question | warmest and most open, at **normal** volume |
| 47.06–49.46 s (END) | silent hold | no voice at all |

## Emotional turns

1. **8.04–11.30 s (`a1`)** — the proof becomes visible: other people sink, she stands outside. Said observationally; the pathos is in the image.
2. **11.30 s (`s3`)** — `Nhưng` plainly, no drama. The hinge of the video.
3. **18.33 s (`s4`)** — the re-hook: the words she almost sent. Tender, hesitant, said in her imagined voice.
4. **25.42 → 27.92 s (`s6`)** — correcting an assumption: level, then a small lowering on `không có ai`.
5. **27.92–31.55 s (`s7`)** — the gut punch. `quen` unstressed (she does not know she is confessing); the weight on `phải là người ổn`, volume dropping on the last two words — **to a stop, not to a whisper**.
6. **41.41–47.06 s (`s10`)** — the only rising contour in the video: a real question, said to the viewer.

## Restraint

- **No whisper anywhere.** The quiet passages are close and unhurried, not stage breaths.
- No music swell under a line; no dramatic pause longer than the 1.60 s after `s8`.
- No repetition for effect except the single gentle `đều đều` in `a2`.
- No advice, no diagnosis, no "bạn cần phải…", no "bạn mạnh lắm". The video describes, then asks.
- **No CTA**, no follow/comment, no handle, no end-card sign-off.
- The owner's own `…` in `s8` is kept verbatim in the text, and the dramatic beat around it is **timeline silence**, never a drawn-out vowel.

## Ending behaviour

The last words of `s10` are said at an even, settled volume and simply **stop** — the audio does not fade to silence on the words. BGM cuts out on the last word. Then **2.40 s of real silence (47.06–49.46 s)**: no speech, no music, only the image continuing (the umbrella tilted back over her, the warm cup, the rain thinning). The breath is not filled by anything. If a measured run lands under 45 s, the fix is this hold (elastic 2.40 → up to 5.20 s); `s10` is never re-read faster, slower or with more feeling to fill it.

## Shot direction

| key | intent | emotion | accent words | fast / slow sections | breath & pause placement | ending contour |
|---|---|---|---|---|---|---|
| s1 | Name the viewer's role; the hook must read without sound | Curious, warm, direct, slightly rueful | **tìm đến bạn** · **chuyện buồn** | **Fast:** `Mọi người thường` · **Settles:** `tìm đến bạn` | Breath **before** the clip; none inside; hard stop after `buồn.` | Flat, level — a statement, not a question |
| s2 | Reassure by stating a known fact about them | Reassuring, matter-of-fact | **an ủi** · **thấy ổn hơn** | Conversational; each of the three sentences lands separately; weight on `ổn hơn` | None inside; 0.25 s real silence after | Full stop |
| a1 | Show the effect, and plant the contrast the turn lands on | Observational, quiet | **nhẹ hẳn xuống** · **đứng ngoài** | Even; `Còn bạn đứng ngoài.` slightly lower | 0.70 s real silence after — **the largest early beat** | Falling, leaves the floor open for `Nhưng` |
| s3 | The turn: alone with the phone | Quiet tension, held under control | **một tối** · **rất lâu** · **trước màn hình điện thoại** | **Slowest so far:** enters moving, slows through `ngồi rất lâu` so the duration is audible | 0.45 s real silence after | Flat, no lift on `thoại.` |
| a2 | Put the room's sound in the story | Quietest so far, almost said to the room | **đều đều** | Slowest, even, no rubato | 1.20 s real silence after — the withheld-message beat | Level, trailing slightly |
| s4 | **Re-hook:** say the message she cannot send | Hesitant, intimate, tender | **mệt quá** · **nhắn** | Slower than `s3`; the quoted message softer than the narration | 0.35 s real silence after; the draft is left hanging | Falling on `quá.'`, no fade |
| s5 | Give the verdict on her own small decision | Rueful, close to a shrug — never self-pity | **một lúc** · **lại thôi** | Light on `Rồi nghĩ một lúc`, then settling down on `bạn lại thôi` | 0.45 s real silence after | Settles downward, closes the beat |
| a3 | Report the twist: she deleted it, letter by letter | Plain — the image carries the emotion, the voice does not | **bấm xoá** · **từng chữ** | Deliberate and slow; no rubato | 0.90 s real silence after — the deletion must be seen before anyone corrects the assumption | Hard stop after `chữ.` |
| s6 | Correct an assumption the viewer is already making | Gentle, direct, looking at the viewer | **không có ai** · **nhắn** | Level on the first four words, then a slight emphasis and a small lowering | 0.45 s real silence after | Falling — leaves the answer to `s7` |
| s7 | Say the true reason she did not send it | The truest, quietest, least performed line in the video | **đã quen** · **phải là người ổn** | **Slowest real line;** `quen` deliberately unstressed | 0.55 s real silence after — the recognition lands in it | Volume drops on `người ổn` and **stops; never a whisper** |
| s8 | Ask whether anyone is still there | Natural, conversational — not a stage aside | **biết** · **không…** | Short and unhurried; the ellipsis is **not** performed | **1.60 s of real timeline silence after — the longest beat in the video.** No pause inside | Unresolved — falls and waits |
| s9 | Deliver the metaphor honestly | Warm, not poeticising | **che ô** · **cũng** · **bị ướt** | Conversational through the first half, **slowing on `cũng có những ngày bị ướt`** so the reversal is audible rather than announced | 0.90 s real silence after — the umbrella landing needs to sink in | Flat landing on `ướt.` |
| a4 | Make the metaphor visible; finish contrast pair 2 | Quiet, almost clinical — stating a physical fact is the point | **nghiêng đi** · **rơi lên vai bạn** | Level on both sentences; `Mưa rơi lên vai bạn` quieter than the first | 0.70 s real silence after | Falling — hands the frame to `s10` |
| s10 | Ask the viewer the question nobody asks them | Warmest and most open in the video, still not loud | **một người hỏi** · **Hôm nay có chuyện gì** | Unhurried through the setup, then **the quoted question at normal volume with a real question contour** — the only rising contour in the video | **1.80 s of real silence after**; no pause inside; the voice then stops completely | **Rising, then held open** — the only question-shaped ending; the final `thế?` falls, it never rises into a call to action |

## Production-metadata note

Every direction above is production metadata. **None of it appears in `voice.proposed.json` or in any caption chunk.** Spoken text and captions remain exactly the canonical values in `voice.proposed.json`; acting notes live only in the `delivery` columns and in `voice-performance.proposed.json`.
