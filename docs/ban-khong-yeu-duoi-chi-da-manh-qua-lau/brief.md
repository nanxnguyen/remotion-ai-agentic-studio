# Brief — ban-khong-yeu-duoi-chi-da-manh-qua-lau

## Identity
- vid: `ban-khong-yeu-duoi-chi-da-manh-qua-lau`
- slug: `ban-khong-yeu-duoi-chi-da-manh-qua-lau`
- composition id: `BanKhongYeuDuoiReel`
- profile: `story`
- platform: TikTok / Reels / Shorts (9:16, 1080×1920, 30 fps)
- duration: 45–55 s (user explicit override; includes speech, pauses, transitions, ending hold)
- voice route: `tbd` (placeholder — to be resolved after gate A; candidate from `vietnamese-voice-samples/previews/` or `vi-VN-NamMinhNeural` temporary via route 3)
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

## Hook (to be locked at gate A)
- Frame 0 cover must show the hook subject + text without sound.
- Hook clear within 3 s; re-hook at ~15–20 s.
- Payoff by ~8 s: the "che ô cho người khác cũng có ngày bị ướt" line.

## Phase references
- Research: user-supplied script is the primary source; research only audience language.
- Script: shot table with seconds, spoken line, on-screen text, image/action, accent words, delivery, source; timing in space-separated syllables (~3.7–4.2 syllables/s).
- Voice: `voice.json` canonical ordered map `{"s1": "..."}`; `voice-performance.proposed.json` sidecar; splits for pauses (`s6a`/`s6b`).