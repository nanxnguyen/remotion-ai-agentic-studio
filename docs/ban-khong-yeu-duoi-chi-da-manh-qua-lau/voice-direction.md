# Voice Direction — ban-khong-yeu-duoi-chi-da-manh-qua-lau

**Video ID:** ban-khong-yeu-duoi-chi-da-manh-qua-lau · **Profile:** story — one consistent stylised figure (asset class: `script.md` §2.3) acting out each beat
**Canonical text:** `voice.proposed.json` — **13 keys**, played back in file order:
`s1 · s2a · a1 · s2b · s3 · a2 · s4 · s5 · s6 · s7 · s8 · s9 · s10`
(`s1`–`s10` are the owner's ten mandatory lines, verbatim and in the owner's original order; `a1` and `a2` are the two `[ADD]` sensory connectors justified in `script.md` §7. `scripts/gen-voice-clone.py` walks the file in insertion order, so this is the playback order.)
`img1`, `img2` and `END` are **shot rows with no voice key** — they are staged inside the post-clip holds of `s5`, `s9` and `s10` respectively, and they carry no speech at all.

## Voice reference — route 2, Thanh Long

**All thirteen `reference` fields in `voice-performance.proposed.json` are `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav`.** `referenceSelectionStatus` is `selected`; nothing in the packet says `pending`.

- **Route:** 2 — local VieNeu clone (`~/.venvs/vieneu`), reference read from the local WAV above. No external upload, no API voice.
- **Why this reference:** consistency with the videos already delivered in this repo that use the identical reference file — `docs/cuoc-goi-nho-cua-me/voice-ref/`, `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav`, `docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/voice-ref/`. Thanh Long is this repo's established local read for a gentle conversational delivery.
- **This is a director decision, not an owner confirmation.** `owner-notes.md` contains two "hi" notes and no voice instruction of any kind. Nothing in this packet claims the owner chose a voice.
- **Machine facts:** `vietnamese-voice-samples/previews/` does **not** exist on this machine, so no preview catalogue is available and none is cited; `docs/<vid>/voice-ref/refThanhLong.wav` exists (director-verified: 8.20 s, 24 kHz, mono, pcm_s16le). I could not run `ffprobe`, `ls` or `python3 -m unittest scripts.test_voice_catalog` — this runtime has no shell or process-execution tool — so the WAV's properties above are the director's verification, not mine.
- **Reference handling (`NEW-4`).** The pinned `reference.source` is the synthesis reference and is **used unmodified**: it carries no `startSeconds` / `durationSeconds`, so `gen-voice-clone.py` will not crop it. Do **not** create a second reference file under a different name — the sidecar is read-only for `voice-agent`, so a new filename would be invisible to the contract and the run would silently use the uncropped audio. If a re-cut is genuinely needed, **overwrite this exact path** and report it to the director.
- **Left to `voice-agent`:** run the CER/ASR gate and keep all thirteen shots on one voice. `status.json` `voice`/`paths.out` and the voice line in `brief.md` are director-owned and already corrected.

## Audience addressed

One person ("bạn") — the viewer who is always the "strong one", the one friends come to when they are sad, the one who comforts and never asks to be comforted. Singular, addressed directly, never "chúng ta", never an audience.

## Speaker relationship

A trusted, gentle friend who has been on both sides of the umbrella — someone who has held it for others and now quietly says: *you can be rained on too.* Peer to peer: not a teacher, not a therapist, not a coach. Warm, equal, non-judgmental.

## Overall delivery personality

Gentle, intimate, conversational, emotionally expressive but **never theatrical**. Reassuring. Varied intonation, meaningful emphasis, natural breaths, no uniform reading cadence. **No forced humour, no exaggerated sadness, no whispering.** Curiosity at the start → reassurance in the middle → a soft, open ending. Expressiveness comes from *where the voice slows and where it stops*, not from volume.

**Planning rate is 3.9 syl/s (`NEW-03`).** 4.1 syl/s is this repo's **planning convention, not a measurement** (`docs/motion-design-lab/script.md:23`); the measured Thanh-Long runs here sit lower — `docs/xay-doi-minh-hay-chung-minh/voice-report.md:24` gives 194 syllables over 51.75 s = **3.75 syl/s**, and `docs/lam-lai-…/audio-review.md:12` gives ≈3.5–3.7. **The 3.9 plan is therefore already at the measured rate for this reference**, and the intimate register is carried by holds, emphasis and light rather than by slowing the voice down. No direction in this packet requests a pace the engine cannot deliver.

**Light plan: `script.md` §2.1 is the single source.** This file references the ids `L0`–`L4` and never re-describes or re-claims an arrival. There is exactly **one** arrival in the packet, **L1** at `a1`; `s7` is L2 and `s9`→`img2` is L3 — the same sliver widening, not new light.

## Energy curve (planning rate 3.9 syl/s; the full identity is `script.md` §1)

| span | what happens | energy |
|---|---|---|
| 0.00–3.34 s (`s1`) | the hook — naming the viewer | lightest, quickest read in the video |
| 3.34–11.94 s (`s2a` → `a1` → `s2b`) | what the viewer already does, the payoff at 7.46 s, the last clause of the line | warm and steady, with one deliberate drop at `a1` and a level landing at `s2b` |
| 11.94–19.02 s (`s3` → `a2`) | the turn, then the room | pace falls; the navy drains out of the frame |
| 19.02–25.39 s (`s4` → `s5`) | the re-hook and the give-up | hesitant; the frame's longest early silence belongs to `img1` |
| 25.39–32.04 s (`s6` → `s7`) | the correction, then the truth | quiet recognition; L2 widens |
| 32.04–34.61 s (`s8`) | one held fragment | the breath before the metaphor |
| 34.61–39.76 s (`s9`) | the umbrella landing | warm; L3 turns the palette |
| 39.76–45.70 s (`s10`) | the question | warmest and most open, at **normal** volume |
| 45.70–48.90 s (END) | silent | no voice at all |

## Emotional turns

1. **6.18–9.28 s (`a1`)** — the payoff becomes visible: other people sink, she stands outside. Observational; the pathos is in the image, not the delivery. **This is the only beat called the payoff anywhere in the packet.**
2. **11.94 s (`s3`)** — `Nhưng` plainly, no drama. The hinge.
3. **19.02 s (`s4`)** — the re-hook: the words she almost sent. Tender, hesitant, said in her imagined voice.
4. **25.39–27.62 s (`s6`)** — correcting an assumption: level, then a small lowering on `không có ai`.
5. **28.12–31.44 s (`s7`)** — the gut punch. `quen` unstressed (she does not know she is confessing); the weight on `phải là người ổn`, volume dropping on the last two words — **to a stop, not to a whisper**.
6. **39.76–43.90 s (`s10`)** — one clause, one breath, no internal pause: a real question said to the viewer, and the only rising contour in the video.

## Restraint

- **No whisper anywhere.** The quiet passages are close and unhurried, not stage breaths.
- No music swell under a line; no dramatic pause longer than **1.80 s** anywhere in the packet.
- No repetition for effect anywhere in this packet.
- No advice, no diagnosis, no "bạn cần phải…", no "bạn mạnh lắm". The video describes, then asks.
- **No CTA**, no follow/comment, no handle, no end-card sign-off.
- The owner's own `…` in `s8` is kept verbatim in the text, and the dramatic beat around it is **timeline silence**, never a drawn-out vowel.

## Ending behaviour

The last words of `s10` are said at an even, settled volume and simply **stop** — the audio does not fade to silence on the words. `s10` is two phrases with a real 0.30 s `pauseAfterSeconds` **between** them, so its clip ends — and the last word of the video lands — at **43.90 s** (41.58 / 43.90 / 45.66 s at 4.2 / 3.9 / 3.7 syl/s). **BGM cuts at that instant.** `s10`'s post-clip hold runs 1.80 s to 45.70 s; the END card runs 3.20 s to 48.90 s. **Post-word audio tail = 1.80 + 3.20 = 5.00 s** of total silence, with only the image continuing (the rim tilted back, the warm cup, the missed call still lit, the rain thinning). If a measured run lands under 45 s, the fix is this tail (END card elastic 3.20 → up to 5.20 s); `s10` is never re-read faster, slower or with more feeling to fill it.

## Shot direction

| key | intent | emotion | accent words | fast / slow sections | breath & pause placement | ending contour |
|---|---|---|---|---|---|---|
| s1 | Name the viewer's role; the cover must read without sound | Curious, warm, direct, slightly rueful | **tìm đến bạn** · **chuyện buồn** | **Fast:** `Mọi người thường` · **Settles:** `tìm đến bạn` | No breath before the clip and none inside the line, **but a real 0.22 s clause gap between `bạn` and `mỗi`** (sidecar `pauseAfterSeconds`); hard stop after `buồn.` | Flat, level — a statement, not a question |
| s2a | Set up what the viewer already does; the payoff lands next | Reassuring, matter-of-fact | **an ủi** · **nói gì** | Two statements, each landing on its own; the second marginally quicker | No breath inside; **0.25 s real gap after the clip** so `a1` lands on it — structural (the owner-line split), not dramaturgical | Flat, waiting |
| a1 | **THE PAYOFF** — make the effect visible; plant CP1 | Observational, quiet | **chùng xuống** · **đứng ngoài** | Even; `Còn bạn thì đứng ngoài.` slightly lower | No breath inside; 0.30 s real silence after — the turn needs air | Falling, leaves the floor open for `s2b` |
| s2b | Land the last clause of owner line #2 | Even, unhurried | **thấy ổn hơn** | **Even — this clause settles after the payoff and must not compete with it**; a natural emphasis on `thấy ổn hơn`, no extra weight or slowing | No pause inside; 0.35 s real silence after, before `Nhưng` | Level, closing |
| s3 | The turn: alone with the phone | Quiet tension, held under control | **một tối** · **rất lâu** · **trước màn hình điện thoại** | **Slowest so far:** enters moving, slows through `ngồi rất lâu` so the duration is audible | Real silence at the comma inside the clip; **1.05 s real silence after, before `a2`** — the cursor blinks twice and the screen dims once inside it | Flat, no lift on `thoại.` |
| a2 | Put the room's sound into the story | Quiet, close — said as if the narrator had just noticed it, **still to one listener, never stage-voiced** | **mưa rơi đều** | Slowest, even, no rubato | 0.25 s real silence after — the re-hook lands on this beat, not out of a fade | Level, trailing slightly |
| s4 | **RE-HOOK:** say the message she cannot send | Hesitant, intimate, tender | **mệt quá** · **nhắn** | Slower than `a2`; the quoted message softer than the narration | 0.40 s real silence after; the draft is left hanging | Falling on `quá.'`, no fade |
| s5 | Give the verdict on her own small decision | Rueful, close to a shrug — never self-pity | **nghĩ một lúc** · **lại thôi** | Light on the first clause, then settling down | **1.70 s real silence after, and that hold is where `img1` is staged** — no voice at all | Settles downward, closes the beat |
| s6 | Correct an assumption the viewer is already making | Gentle, direct, looking at the viewer | **không có ai** | Level on the first four words, then a slight emphasis and a small lowering | 0.50 s real silence after — the unanswered call hangs | Falling — leaves the answer to `s7` |
| s7 | **The gut punch** — say the true reason she did not send it | The truest, quietest, least performed line in the video | **đã quen** · **phải là người ổn** | **Slowest real line;** `quen` deliberately unstressed | 0.60 s real silence after — the recognition lands in it | Volume drops on `người ổn` and **stops; never a whisper** |
| s8 | Ask whether anyone is still there | Natural, conversational — not a stage aside | **không…** | Short and unhurried; the ellipsis is **not** performed | **1.80 s of real timeline silence after — the longest hold between two voiced clips before the resolution, tied with the closing hold.** No pause inside | Unresolved — falls and waits |
| s9 | Deliver the metaphor honestly | Warm, not poeticising | **che ô** · **cũng** · **bị ướt** | Conversational through the first clause, **slowing on `cũng có những ngày bị ướt`** so the reversal is audible rather than announced | **1.30 s real silence after, and that hold is where `img2` is staged** | Flat landing on `ướt.` |
| s10 | **The climax** — ask the viewer the question nobody asks them | Warmest and most open in the video, still not loud | **một người hỏi** · **với bạn thế?** | Unhurried through the setup, then **the quoted question as one clause, one breath, no internal pause, at normal volume with a real question contour** — the only rising contour in the video | **1.80 s of real silence after**; no pause inside; the voice then stops completely | **Rising, then held open** — the only question-shaped ending; the final `thế?` falls, it never rises into a call to action |

## Production-metadata note

Every direction above is production metadata. **None of it appears in `voice.proposed.json` or in any caption chunk.** Spoken text and captions remain exactly the canonical values in `voice.proposed.json`; acting notes live only in the `delivery` columns of `script.md` §3 and in `voice-performance.proposed.json`.

**Phrase join rule (`F-05`).** Phrase texts are joined with **exactly one space** — `" ".join(phrase.text) == voice.proposed.json[key]`, byte-for-byte — and that join is verified against the canonical file before generation. Every phrase boundary in this packet falls on a canonical space, so an assembler that joins with `""` would merge two words and fail the CER gate.

**Accent words (`F-11`, `NEW-05`).** The accent set for each key is one identical string list in `script.md` §3, in this table, and in `voice-performance.proposed.json` (`accentWords` plus the per-phrase `emphasis` arrays). Every accent word appears in the `emphasis` array of the phrase that actually contains it.
