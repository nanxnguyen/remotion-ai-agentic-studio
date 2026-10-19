# Brief — ban-khong-yeu-duoi-chi-da-manh-qua-lau

## Identity
- vid: `ban-khong-yeu-duoi-chi-da-manh-qua-lau`
- slug: `ban-khong-yeu-duoi-chi-da-manh-qua-lau`
- composition id: `BanKhongYeuDuoiReel`
- profile: `story`
- platform: TikTok / Reels / Shorts (9:16, 1080×1920, 30 fps)
- duration: 45–55 s (user explicit override; includes speech, pauses, transitions, ending hold)
- voice route: route 2 — local VieNeu-TTS clone using reference `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav` (copied from `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav`; director-verified with `ffprobe`: 8.20 s, 24 kHz, mono, pcm_s16le). Voice name: **Thanh Long** — **selected by `video-director`, not confirmed by the owner** (owner notes N1/N2 of 2026-10-18 23:18 contained only "hi"). Reason: the identical reference and engine already produced two delivered videos in this repo (`thuong-hay-so-bat-dau-lai`, `ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu`, both voice slug `thanh-long-nang-cao`), and the brief's delivery profile (gentle, intimate, conversational, never theatrical) matches it. Local engine `~/.venvs/vieneu` is installed; no preview catalogue `vietnamese-voice-samples/previews/` exists on this machine, so no fresh benchmark was possible. Output voice slug `thanh-long-nang-cao`, applied with `pipeline.py voice` after gate A passes. This line is director-owned; phase-2 producers must not edit it.
- output: `out/ban-khong-yeu-duoi-chi-da-manh-qua-lau-<voice>-reel.mp4`

## User constraints (verbatim, keep exactly)
Title / theme line: "Bạn không yếu đuối, bạn chỉ đã mạnh mẽ quá lâu"
Topic: Kiệt lực cảm xúc · Khao khát được dựa vào ai đó
Mandatory spoken text (Vietnamese, keep wording verbatim in `voice.json` and captions):

> Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.
> Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.
> Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.
> Bạn muốn nhắn: 'Hôm nay mình mệt quá.'
> Rồi nghĩ một lúc, bạn lại thôi.
> Không phải vì không có ai để nhắn.
> Mà vì bạn đã quen với việc mình phải là người ổn.
> Bạn biết không…
> Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.
> Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'

## Viewer need & retellable point
- One viewer need: the person who is always the "strong one" needs permission to be tired and to ask for help.
- Retellable point: even the person who holds the umbrella for others gets rained on — and deserves someone to ask, "how are you today?"

## Tone & personality
- Tone: gentle, intimate, conversational, emotionally expressive but not theatrical; reassuring, soft close.
- Speaker addresses one person ("bạn") directly.
- No forced humor, no exaggerated sadness/whispering. Varied intonation, meaningful emphasis, natural breaths.
- Delivery per shot: curious at start → reassuring in middle → soft, open ending.

## Visual identity (story profile)
- Hero of each shot: a consistent person (the "strong one") acting out the beat, with expressive close-ups where useful (story rubric).
- Visual metaphor: holding an umbrella / getting rained on, quiet evening, phone screen glow, a hand reaching out.
- Palette: deep navy + soft grey + warm accent (amber/soft gold) for the "someone asking about you" turn; rain texture subtle, not literal downpour.
- Fonts: Google Fonts with `vietnamese` subset; caption ≥ 54 px glyph height, auxiliary ≥ 32 px; no text in bottom 210 px.
- Motion: frame-driven, easing springs, crossfades at boundaries, no `Date.now()` / `Math.random()`.
- Captions: phone-readable chunks (≤ 2 lines, ≤ ~28 chars/line), accent words matching highlight beats.
- Sound: one BGM (12–18 dB below voice), ducked 4–6 dB while voice speaks, SFX on voice accents / BGM beats, no masking of spoken words.
- How it differs from earlier videos: first "emotional exhaustion / strong person needs support" story in this repo; umbrella/rain metaphor; soft ending hold instead of a CTA punch.

## Source / claim plan
- No factual claims requiring external sources (personal/emotional story; user-supplied account is the primary source). Claims table will be empty/short.
- Any recreated UI/diagram marked `minh hoạ` — none expected for this story profile.

## Hook (locked at gate A · candidate `H1`)
- Chosen candidate: **`H1`** — direct address, `research.md` five-hooks #1 (`hook-options.md`, which compares `H1`/`H2`/`H3`/`H4`; research #3 is held as the umbrella payoff, not an opener). Rejected: `H2` (in-media-res — climax-first, no payoff before 8 s → kept as the re-hook `s4`), `H3` (title line — a verdict that closes the gap and reads as a title card → kept as the silent END card), `H4` (contrast one-liner — pays at 4.76–5.41 s, but its 1–3 s window opens no gap and it burns the `Nhưng` hinge in the first 5 s → kept as `s2a`→`a1`→`s2b`).
- **0–1 s frame** — canonical description, reproduced word for word from `script.md` §2.2 and `hook-options.md` §H1:
  > Frame 0 **is** the cover — already composed, no fade from black, no logo, no title animation. 9:16 night street, mid-shot. **She holds the black umbrella out over the person beside her — a child, about her shoulder height — and it is tilted a few degrees toward them, so the rim's shadow falls across them and not across her.** Her right shoulder and the outside of her sleeve are already dark with rain, a wet stripe from shoulder to elbow; **she has not noticed and does not adjust.** The child's shoulder under the rim is dry. The contrast is carried by value and sheen rather than by a caption: **a wet sheen and a darker tone down her right sleeve, matte and dry on the child's coat and on the shoulder under the rim; wet sheen on the pavement below.** Water beads on the rim and drips off the lower edge. **Across the street one lit apartment window glows warm — a warmth she is not standing under.** One cold-warm sodium street lamp behind; deep navy and soft grey everywhere else. Slow push-in 1.00→1.03.
- **1–3 s promise (truthful, answerable gap):** `s1` = `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` — 11 syllables, clip 0.00–3.34 s, hook complete at **2.62 / 2.82 / 2.97 s** at 4.2 / 3.9 / 3.7 syl/s. The viewer holds one question — *who holds the umbrella over you?* — raised by the headline **`Ai che ô cho bạn?`** (5 words, upper third, safe zone, clears on the `s1`→`s2a` boundary) and by the lit window she is not standing under; answered at `s10` and on the END card.
- **3–8 s payoff:** the one beat called the payoff in this packet, **`a1`** = `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.`, lands at **7.00 / 7.46 / 7.81 s** — inside the window at every rate. Owner line #2 is split into `s2a` + `s2b`, two verbatim halves, with `a1` between them across a real 0.25 s gap.
- **Re-hook:** `s4`, clip **19.02–21.72 s** (17.93 / 19.02 / 19.86 s across the rate band) — owner line #4, the words she almost sent.
- **Payoff resolution:** `s10` (39.76–45.70 s, last word at **43.90 s**) pays the cover's question with the saved name from `s6`, then the **END title card** carries the owner's title line, silent, **45.70–48.90 s** (post-word audio tail 5.00 s). Total **48.90 s** at the 3.9 syl/s planning rate; **46.58 s** at 4.2 and **50.66 s** at 3.7; inside 45–55 s for any measured rate between 3.29 and 4.43 syl/s.

## Phase references
- Research: user-supplied script is the primary source; research only audience language.
- Script: shot table with seconds, spoken line, on-screen text, image/action, accent words, delivery, source; timing in space-separated syllables (~3.7–4.2 syllables/s).
- Voice: `voice.json` canonical ordered map `{"s1": "..."}`; `voice-performance.proposed.json` sidecar; splits for pauses (`s6a`/`s6b`).