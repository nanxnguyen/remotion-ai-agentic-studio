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
- Chosen candidate: **`H1`** — direct address, `research.md` five-hooks #1 (`hook-options.md`, which compares `H1`/`H2`/`H3`/`H4`). Rejected: `H2` (in-media-res, spends the climax in second one and is not understandable sound-off → kept as the re-hook `s4`), `H3` (title line — a conclusion, and a title card in second one → kept as the silent END title card), `H4` (contrast one-liner — the right contrast, too late as an opener → kept as `s2`→`a1`→`s3`).
- **0–1 s frame:** frame 0 *is* the cover, fully composed, no fade from black and no logo — she holds a black umbrella over someone else in the rain, water beading on the rim, and **her own shoulders are still dry**. Safe-zone headline (upper third, 6 words): `Mọi người tìm bạn khi buồn.`
- **1–3 s promise (truthful):** `s1` = `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` — 11 syllables, clip 0.00–2.82 s, hook complete at **2.82 s** (2.62 s at 4.2 syl/s, 2.97 s at 3.7 syl/s).
- **3–8 s payoff:** `s2` — the recognition `Bạn biết cách an ủi.` lands at **4.45 s**; the full triad completes at **7.79 s**; `a1` at 8.04 s makes it visible (contrast pair 1).
- **Re-hook:** `s4`, clip **18.33–20.74 s** (17.24–19.17 s across the rate band) — owner line #4, the words she almost sent: `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` Its answer, `a3` (the deletion, 22.98–25.42 s), opens the second half.
- **Payoff resolution:** `s10` asks the viewer the question nobody asks them (41.41–47.06 s); the **END title card** carries the owner's title line, silent, for **47.06–49.46 s**. Total **49.46 s** at the 3.9 syl/s planning rate; **46.86 s** at 4.2 and **51.43 s** at 3.7 — inside 45–55 s at every rate. Full per-shot budget, silence elasticity and the four `[ADD]` sensory connectors in `script.md`.

## Phase references
- Research: user-supplied script is the primary source; research only audience language.
- Script: shot table with seconds, spoken line, on-screen text, image/action, accent words, delivery, source; timing in space-separated syllables (~3.7–4.2 syllables/s).
- Voice: `voice.json` canonical ordered map `{"s1": "..."}`; `voice-performance.proposed.json` sidecar; splits for pauses (`s6a`/`s6b`).