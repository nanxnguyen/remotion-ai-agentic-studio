# Voice Direction — so-bi-xem-la-ich-ky-khi-noi-khong

**Route:** local VieNeu clone, Thanh Long Nâng Cao; reference `docs/so-bi-xem-la-ich-ky-khi-noi-khong/voice-ref/refThanhLong.wav`. The canonical proposal is [voice.proposed.json](voice.proposed.json); all seven keys appear in that order and use one narrator only.

## Who is speaking to whom

The narrator says `Tôi` to one viewer who has stared at an ordinary request and felt compelled to answer at once. This is a trusted peer naming one night's action, not a manager, therapist, coach, or advocate arguing a case. The remembered sentence belongs only to the narrator's mind: one voice continues throughout, while quotation marks and mono italic distinguish it on screen.

## Performance personality and curve

Conversational, close, and restrained. Energy begins with a compressed admission (`s1`), becomes observational as objects accumulate (`s2–s3`), lowers into the re-hook (`s4–s5`), then becomes clear rather than louder at Send (`s6`). `s7` is warm and final; after the last word there is **1.80 s of actual timeline silence**. No whisper, sigh, staged laugh, character voice, forced humour, global speed change, or emotional automation is requested.

The planning rate is 4.1 syllables/s: 124 tokens / 30.24 s before explicit gaps. The performance plan has 1.75 s of executable phrase padding in `voice-expressive.proposed.json` and the final timeline hold is 1.80 s, for 33.79 s planned total. These are estimates, not measured clip durations. If final clips overflow, text changes before Gate A rather than time-stretching audio.

## Per-shot direction

| key | intent / emotion | emphasis | fast / slow | breath and pause placement | ending contour |
|---|---|---|---|---|---|
| s1 | Admit the reflex; contained exhaustion and quiet apprehension, never accusation. | **kiệt sức**, **sợ**, **không giúp được à?** | Quick enough to feel automatic until `kiệt sức`; remembered quote lower, plain. | No performed breath. 0.25 s assembly gap before `chỉ vì`; it is actual inserted silence, not punctuation. | Falls on the remembered question; it is not performed as another person. |
| s2 | Show an ordinary request turning into a reflex; matter-of-fact tension. | **Nhờ chút nhé?**, **sắp chạm**, **Ok** | Even opening, a little slower at the unsent `Ok`. | 0.25 s executable gap after the quoted request; no sigh. | Level, held for the next visual. |
| s3 | Let the list, lights, and coffee carry the cost; tired observation, not sadness. | **dài thêm**, **tắt dần**, **thứ ba**, **lạnh** | Three even observations; slow only at `đã lạnh`. | Two 0.12 s executable gaps between phrases; no audible environmental cue from TTS. | Flat on `lạnh`. |
| s4 | **RE-HOOK:** acknowledge the actual fear; restrained recognition. | **không sợ**, **bị xem**, **ích kỷ** | First sentence plain; direct admission slower but never whispered. | 0.24 s executable gap after `một việc.` | Closed and low on `ích kỷ`. |
| s5 | Make the waiting tangible; recognition without self-pity. | **rất nhỏ**, **giữ tôi lại**, **tối nay** | Observational opening, then settled waiting. | 0.25 s executable gap after the first sentence; no stretched vowel. | Downward and quiet. |
| s6 | **CLIMAX:** send a neutral capacity fact; calm resolve, no win. | **Lần này**, **không nhận thêm được**, **Mai** | Ordinary volume throughout; second sentence warm, not appeasing. | 0.24 s executable gap between the two refusal sentences; no engine-made send sound. | Level on `nhé`, no question lift. |
| s7 | Resolve by leaving; warm, settled certainty. | **đóng máy**, **đèn ấm**, **không phải kiệt sức**, **người tốt** | First two sensory facts simple; final truth unhurried and firm. | Two 0.14 s executable gaps; after clip, timeline holds exact 1.80 s of silence with BGM removed. | Stops on `tốt`; no fade, CTA, or added breath. |

## Voice-performance limits

- **Executable pause handoff:** director copies `voice-expressive.proposed.json` to `voice-expressive.json` with no text or gap change after Gate A. Voice then runs `gen-voice-clone.py` with that accepted JSON and the existing Thanh Long reference (the exact command is in `script.md` §Timing method). Each `pause_after` is assembled by FFmpeg after trim; it is not a punctuation inference, an Edge-TTS route, or a second narrator. Its per-key phrases join with exactly one ASCII space to the canonical `voice.proposed.json` value. Gap map: `s1 0.25 + s2 0.25 + s3 0.12 + 0.12 + s4 0.24 + s5 0.25 + s6 0.24 + s7 0.14 + 0.14 = 1.75 s`; `s7` then has a separate 1.80 s silent timeline hold.
- `intent`, `emotion`, `emphasis`, and `tempoIntent` are direction metadata only. The accepted `voice-expressive.json` is generated from this proposal with `gen-voice-clone.py --json ... --ref ...`, so its `pause_after` fields are real assembly padding under the same Thanh Long reference. VieNeu's supported controls remain local reference audio, seed, `denoise: false`, and assembled silence padding.
- Unsupported and not requested: `rate`, `pitch`, `volume`, `speed`, `atempo`, `style`, `directEmotion`, `actingCue`, and non-spoken cues. The voice agent may select a compliant take under the existing CER workflow; it must not make up a style control.
- Phrase text is joined with exactly one space and is required to reproduce each canonical proposed line byte-for-byte. Directions never appear in narration or captions.

## Tone probe / manual tone review — 2026-10-22

`python3 -X utf8 -I scripts/tone-probe.py --json docs/so-bi-xem-la-ich-ky-khi-noi-khong/voice.proposed.json` was **not run** because `scripts/tone-probe.py` is absent (recorded by director and confirmed before this review). Manual review replaces neither the unavailable tool nor a later listening pass.

| checked word / construction | sentence / key | verdict | rewrite action |
|---|---|---|---|
| `kiệt sức` + remembered judgement | s1 | Clear stake; only one loaded phrase, grounded in the required exact user line. | Kept verbatim; required wording. |
| `sợ` + `ích kỷ` | s4 | Two related tones but not a stacked melodramatic list; the re-hook needs the contrast. | Kept; removed any added “tệ/hèn/yếu đuối” wording. |
| `giữ tôi lại trước màn hình` | s5 | Replaces the prior abstract energy summary with a visible hand/desk action; not a diagnosis. | Rewritten and paired with the coffee-slide action. |
| `người tốt` | s7 | Potentially slogan-like if isolated. | Kept only after the concrete laptop/exit action and in first person; no imperative or self-love phrase. |
| whole script | s1–s7 | No risk word such as diagnosis, insult, absolute outcome, or forced act is present. | No rewrite required after manual pass. |

This manual table is final only for the missing tool condition; it does not claim two-model ASR tone-probe coverage.
