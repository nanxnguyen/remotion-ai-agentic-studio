# Brief — so-bi-xem-la-ich-ky-khi-noi-khong

> Director intake — 2026-10-22. Runtime: Codex custom-role subagents; Phase 1 research and Phase 2 script may run in parallel, with Gate A only after both artifacts exist.

## Identity (director-owned)

- vid / slug: `so-bi-xem-la-ich-ky-khi-noi-khong`
- composition: `SoNoiKhongReel` (the numbered registry ID is assigned by `video:new` during build)
- profile and format: story · 1080×1920 · 30 fps · 5–7 shots · **30–40 seconds**, inclusive of pauses and final hold
- platform: TikTok / Reels / Shorts
- output: `out/so-bi-xem-la-ich-ky-khi-noi-khong-thanh-long-nang-cao-reel.mp4` — BGM version only
- narrator: first-person `Tôi` throughout.

## Mandatory user constraints (verbatim)

- Topic: **“Sợ bị xem là ích kỷ khi nói 'không'”** — nhận thêm việc dù đã kiệt sức vì sợ một câu phán xét.
- s1 / H1: **“Tôi nhận thêm việc dù đã kiệt sức, chỉ vì sợ một câu: 'Có thế cũng không giúp được à?'”**
- The quoted sentence is another person's remembered words: screen graphics/captions must distinguish it with quotation marks and a different type treatment. It remains narrated by the one narrator; do not create a second voice.
- Suggested thesis (rewrite allowed, meaning retained): saying no to one task is saying yes to your own remaining strength; someone who values you does not need your exhaustion as proof. End with one gentle, concrete refusal that can be said today.
- Viewer: working people 22–35 who accept requests from colleagues, managers, family or friends while overloaded because they fear seeming selfish or unhelpful. They need recognition and permission, not a communication-skills lesson.
- Frame 0 / cover: chat message **“Nhờ chút nhé?”** at **21:47**, thumb typing “Ok” then stopping; no black/blank opening.
- Required imagery: task list lengthens, office lights go out except one desk, third coffee; payoff sends a refusal, laptop closes, departure under daylight or warm streetlight.
- Tone: gentle, real, no villain, no advice list, no “hãy yêu bản thân”, no psychological diagnosis or unsupported statistics. No person other than narrator clearly faces camera.
- Visual contrast: the same finger types **“Ok”** while exhausted, then types/sends a gentle refusal.
- Final hold: ≥1.5 s of deliberate silence. No social publishing.

## Voice route (fixed)

- Provider: local VieNeu-TTS clone (route 2); voice slug: `thanh-long-nang-cao` / Thanh Long Nâng Cao.
- Reference copied to `docs/so-bi-xem-la-ich-ky-khi-noi-khong/voice-ref/refThanhLong.wav`; `md5 -q` result: `199de31c8281d895dd571e36fe464ed5`; `ffprobe` duration: `8.200000` s.
- Target delivery: fast but natural (+4–8% perceived pace through concise prose and short rests only); never time-stretch rendered speech. Maximum total speech budget: approximately 100–125 syllables at the user-provided 4.1 syllables/s heuristic; final timing comes from measured clips.

## Duplicate-topic check — cleared

- `ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu`: relationship masking/self-erasure to be loved; its phone deletion and dark intimate art must not be reused.
- `ban-khong-yeu-duoi-chi-da-manh-qua-lau`: emotional caretaker / umbrella metaphor and asking for support; do not reuse its hook, umbrella, rain, or “strong one” framing.
- `metkhong`: adult self-reliance and carrying everyday burdens late at night; do not reuse its childhood contrast, apartment-night cover, or “mệt không?” ending.
- This video uniquely stages the immediate decision in front of a 21:47 request, the feared selfishness judgement, a workload UI, and a concrete low-conflict refusal. Literal and semantic scan found no existing video centred on fear of saying no / refusing a request.

## Phase 0 evidence

- `scripts/preflight.py` missing — manual checks: ffmpeg `9.0.1`; Node `v22.22.3`; Remotion `4.0.534`; Chrome found at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`; `CHROME_EXECUTABLE` unset; `gen-voice-clone.py --help` exits 0; free space 67 GiB; `python3 -m unittest scripts.test_voice_catalog` exits 0.
- Missing scripts to record truthfully: `scripts/preflight.py`, `scripts/tone-probe.py`, `scripts/gen-voice-vc.py`.
- Pipeline Monitor reused at `http://127.0.0.1:4180/`.

## Production ownership

- Script agent owns creative sections and the shot table below; research agent owns `research.md`.
- Director owns status, accepted `voice.json`, shared timeline/Reel/index/registry integration, and delivery.
- No claim beyond a personal observation is planned; any illustrative UI must be labelled `minh hoạ` by content/design where needed.

## Creative sections — script-agent

### Viewer need

One overloaded working viewer needs recognition of the two-second reflex before an answer, and permission to make one calm capacity-based refusal without turning it into a lesson or a verdict about the requester.

### Retellable point

**Tôi không cần kiệt sức để chứng minh mình là người tốt; tối nay tôi chỉ trả lời đúng phần sức mình còn có.**

### Tone and story promise

- **Tone:** close, observant, gently relieved at the end; never accusatory, therapeutic, triumphant, or performatively sad.
- **Story spine:** one identifiable narrator hand meets a 21:47 request and automatic `Ok`; that same hand hovers, touches the third coffee, withdraws from Send, then sends one concrete refusal before closing the laptop into warm light.
- **Chosen hook:** `H1` in [hook-options.md](hook-options.md): the mandatory exact line plus a visible unsent `Ok`. The premise and every observable prop are user-supplied story facts (`research.md` F1–F3 / U1), not evidence about all viewers or workplaces.
- **First payoff:** by 5.13 s the reply is visibly unsent; work tabs surface at 7.8 s, then task rows make the capacity cost concrete. The viewer sees it rather than being told a diagnosis.
- **Re-hook:** `s4`'s second phrase lands at about 16.1 s and changes the question from “will I help?” to “what am I actually afraid of?”
- **Closing payoff:** `s6` sends a capacity-based refusal based on S2's low-conflict wording, as this narrator's one action only. It promises no reaction, relationship outcome, or cure.

### Claim plan

| ID | What appears | Claim status | Source | Guardrail |
|---|---|---|---|---|
| C1 | The narrator accepted work while exhausted because of a remembered judgement. | First-person story premise | `research.md` F1 / U1 | Never say the requester actually said it or would judge them now. |
| C2 | 21:47 chat, unsent `Ok`, task rows, lone desk, and third coffee. | User-supplied staged details | `research.md` F2–F3 / U1 | Synthetic workload UI is marked `minh hoạ` by Content/Design. |
| C3 | An overloaded workload can be named when pushing back. | Context for a personal refusal, not advice | `research.md` F4–F5 / S1–S2 | No universal outcome or “you should” claim. |
| C4 | The narrator pauses before replying rather than replying instantly. | Creative action informed by audience language | `research.md` F6 / S3, I1–I3 | No diagnosis, prevalence, or claim that delay solves anything. |
| C5 | The refusal is gentle and concrete. | Scripted first-person action | `research.md` U-4, I3 | The response is not presented as a template or guaranteed result. |

### Visual identity

**Director correction 2026-10-22 (binding user mandate).** The table below replaces the earlier cyan/coral proposal, which did not follow the mandated template language. Spoken lines, voice proposal and story are unchanged, so Gate A remains valid.

**Art-direction thesis — “the unsent reply under one warm desk lamp”:** a pure-black night-office story drawn only in white vector line and grey support, where a single stick figure, a minimal chat screen and a lengthening task list squeeze the frame until one orange action releases it. The orange belongs only to the moment the narrator acts (the paused `Ok`, then the refusal), never to decoration and never to another character.

| Token | Value / use |
|---|---|
| Ink black | `#000000` — the entire field; no gradients, no navy, no vignette texture |
| Line white | `#FFFFFF` — stick figure, chat strokes, task rows, headline; 9 px rounded strokes |
| Accent orange | `#F28C52` — one turning-point object/action per shot (paused thumb, sent tick, final lamp); never a general highlight |
| Support grey | `#BDBDBD` — timeline text, secondary rows, office geometry, remembered quote card |
| Deep grey | `#2A2A2A` — only for the closed-laptop / darkened-office masses at 1/3 size |

- **Character language:** one white vector stick figure, circular head r=44 on the 1080 canvas, head/body 1:4.2, 9 px rounded caps and joins, at least three poses (seated/typing, stopped, standing/closing laptop). A close-up hand is the same character's hand, drawn in the same line weight — never a realistic finger.
- **Fonts:** Be Vietnam Pro only (subset `vietnamese`): Black for the upper-third hook, Medium/SemiBold for captions, Italic for the remembered quote and the 21:47 timestamp. The remembered judgement stays in quotation marks and an italic/grey treatment, visibly distinct from narration and never treated as a second speaker.
- **Caption treatment:** at most two lines, left-aligned, above the bottom 210 px, body ≥68 px; the active accent word is orange at most once per shot. On-screen hook is not a verbatim caption: `KIỆT SỨC VẪN GÕ “OK”`.
- **Composition signature:** every shot is built around one screen-and-desk subject plus the character's hand; the camera never leaves the desk until the final exit. Chat UI is reduced to a speech bubble, a cursor and the `Ok` draft; the task list is abstract rows, labelled `minh hoạ`.
- **Motion:** cursor blink → stopped hand → task rows stack with restrained vertical pressure; only the same hand performs both `Ok` and the refusal. No glitch, no random transition, no fade from black. Camera progresses macro chat → desk-wide isolation → macro send → the character folding the laptop and walking out.
- **Light:** monochrome line work through `s5`; orange is earned first by the unsent draft/paused hand, then by the sent tick in `s6`, then by the final lamp and the character silhouette in `s7`.

### Distinction from existing videos

This is one time-stamped workplace-capacity choice, staged through an unsent chat and workload UI. It does not reuse the relationship-masking/deleted-message frame of `ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu`, the umbrella/caretaker/rain support metaphor of `ban-khong-yeu-duoi-chi-da-manh-qua-lau`, or the late-night self-reliance/“mệt không?” world of `metkhong` (`research.md` §7).

## Shot table — script-agent

| # | Seconds | Canonical VO | On-screen text | Action / camera / motion | SFX | Source | Owner |
| 1 | 0.00–5.13 | `s1` | `KIỆT SỨC VẪN GÕ “OK”`; at 1.70 s remembered mono-italic quote: `“Có thế cũng không giúp được à?”` | **Frame 0/cover:** 21:47 chat shows `Nhờ chút nhé?`; the same thumb types `O` → `Ok`, then freezes 2 px above Send. Macro push-in, no fade. | one notification ping; cursor tick dies at the stop | F1–F2 / U1 | script → design |
| 2 | 5.13–9.04 | `s2` | `“Nhờ chút nhé?”` · `21:47` | Same thumb hovers one breath above `Ok`; camera pulls back enough to reveal task tabs behind the phone. | soft keyboard tap; one restrained haptic | F2 / U1; I1 | script → design |
| 3 | 9.04–13.67 | `s3` | `VIỆC ĐANG ĐẦY` · `minh hoạ` on synthetic task UI | The same hand leaves Send, touches the cold rim of the third coffee, then returns to hover beside the unsent reply as rows extend and office bays darken. | task-row ticks, cup set down | F3 / U1; sensory details §4 | script → design |
| 4 | 13.67–17.81 | `s4` — **RE-HOOK** | `TÔI SỢ GÌ?` | The same index finger stays held over the blinking cursor while the remembered quote reflects across rows and collapses into it. No other person or face appears. | room tone drops; no new alert | F1 / U1; I1; U-2 | script → design |
| 5 | 17.81–22.21 | `s5` | `MỘT CHỮ “OK”` | Same finger withdraws from Send, slides the third coffee aside, and rests on the trackpad; `Ok` remains unsent. | coffee ceramic scrape; cursor blink | F3 / U1; I2 | script → design |
| 6 | 22.21–26.35 | `s6` — **CLIMAX** | `TỐI NAY TÔI KHÔNG NHẬN THÊM ĐƯỢC.` | Same macro framing as Shot 1: thumb clears `Ok`, types the refusal, and sends it. Sent tick turns screen-edge amber. | keys, one send click; no response notification | S2 / F5; I3; U-4 | script → design |
| 7 | 26.35–33.79 | `s7` + 1.80 s silent hold | `TỐI NAY, TÔI ĐÓNG MÁY.` | Same hand closes the laptop; camera follows it past the dark desk toward an amber corridor/street. Last 1.80 s: no VO/BGM, warm exit held still. | hinge click; distant warm street ambience, then silence | F3 / U1; I4 | script → design |
