# STORY-SPECIFIC_CTA_OUTRO_V1 — MANDATORY FOR FUTURE RAY VIDEOS

**Effective version:** Ray Phim Kể Chuyện v0.3.2.
**Scope:** Every future Ray video produced by this plugin (Shorts, Reel, TikTok and long-form), unless the user explicitly requests no CTA. Include exactly one story-specific closing CTA lasting **3.0–5.0 seconds** in the actual finished video. Apply to revision requests when the user asks to revise the closing sequence; do not silently re-edit old videos.

## Script writing / retention
1. Reserve an exclusive 3–5s beat at the **end** in the script, storyboard, story manifest and production timeline. It counts **inside** the film's existing total duration (55s, 60s, or user-given time cap), never adds time beyond it. The final reveal/twist must land before CTA starts; do not speak over an essential reveal.
2. The spoken text must invite **both** a like (e.g. “thả tim”) AND a follow/subscribe (“theo dõi”, “follow”, “đăng ký kênh”), chosen to match the destination and the user's writing style. No default fixed sentence: create and choose a new line adapted to the specific story's genre, stakes, ending imagery and emotion. Use short and natural Vietnamese wording, not generic marketing.
3. CTA should preserve the film's atmosphere: supernatural mystery = hushed and unsettling; tragic/emotional = intimate; adventure = uplifting; comic = playful; other genres get their own coherent treatment. No arbitrary horror diction on non-horror stories. Do not spoil the next story or make fabricated claims about upcoming episodes or guaranteed views.
4. Keep the last 3–5s comfortably spoken. If real Vbee MP3 takes too long, **rewrite the line shorter or retime earlier beats**; never crop phonemes or force an unnatural TTS speed solely to fit. Avoid a second redundant CTA.
5. Text/headline and narration subtitle have distinct roles. For Luxury Cinematic videos, optional headline can be “THẢ TIM · THEO DÕI”, while the lower subtitle must reproduce the exact spoken text. For other visual styles, adapt font/colors/layout to screenplay and keep short text readable in mobile safe zones.
6. Animate CTA gracefully with story-consistent motion (usually short fade/slide) and restrained SFX. Do not obscure the reveal, character, main evidence, or key action. No review timecode, storyboard badge, artificial black blocks or intrusive popup.
7. **Authentic Vbee + sync**: generate a dedicated CTA audio clip in the same approved voice or a story-motivated character voice, record `voiceCode`, real measured duration and SHA-256; place in voice-to-visual event map; accurately match subtitle segments to actual audio and duck BGM. A silent title card is not a sufficient replacement when the rest of the video has voice, unless user specifically requests silence.
8. **Final QA**: inspect the actual rendered last 8–10 seconds with audio. Verify the story payoff is understood, CTA includes like+subscribe/follow, measured length 3–5s, no dialogue overlap/old CTA, text precisely matches spoken voice, and MP4 duration still meets the user cap. Only then mark the CTA gate passed.

## Sample directions (creative references, NOT reusable defaults)
- Ghost story: “Nếu vẫn nghe tiếng gõ… thả tim và theo dõi nhé.”
- Mystery: “Bạn đoán đúng không? Thả tim và đăng ký để khám phá thêm.”
- Emotional: “Nếu chuyện này chạm đến bạn, hãy thả tim và theo dõi.”

All examples are optional; compose a different line suitable to each story. Future finished films should list `cta_duration_sec`, `cta_text`, `cta_voice_file`, `cta_voice_sha256`, `cta_start_sec`, `cta_subtitle_proof_frame` in their production evidence.
