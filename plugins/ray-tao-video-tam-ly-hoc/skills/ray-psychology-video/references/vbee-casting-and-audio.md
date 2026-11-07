# Vbee voice casting per psychology script

## Principle

**Never assign Thanh Long by default.** Choose the best real, licensed voice for the specific script and compare 1–3 clips of the same 6–12-second excerpt when possible. Voices available in public catalog are not necessarily enabled on the account; check authorized API access and the user's commercial subscription terms at production time. Commercial license unresolved ⇒ no publication, and be explicit if only a draft.

Verified publicly listed Vbee candidates in Oct 2026 (catalog may change):

| Voice | voiceCode | Intended audition |
| --- | --- | --- |
| **Thanh Mai Pro (Beta)** | `sg_female_thanhmai_yt_24k-pre` | Warm, natural Southern female, podcast-like explanation; first *candidate* for psychological education |
| **Thảo Trinh** | `sg_female_thaotrinh_full_48k-fhg` | Gentle Southern female, slower reflective/meditative content |
| **Tường Vy** | `sg_female_tuongvy_call_44k-fhg` | Friendly, close conversational guidance |
| **Hà Chi** | `hn_female_hachi_book_22k-vc` | Clear professional Northern female explainer |
| **Minh Quân Pro (Beta)** | `hn_male_minhquan_yt_24k-pre` | Youthful Northern male for energetic explanatory Shorts |
| **Thanh Long** | `hn_male_thanhlong_talk_48k-fhg` | Cinematic emotional storytelling, not forced on psychology videos |

Voice catalogue reference: `https://vbee.vn/api/v1/voices?language_code=vi-VN&limit=100&offset=0&active=true`. Vbee may charge premium voices at higher credits. Do not invent additional voice IDs. Public demo recordings are **not** substitutes for commercial narration. No cloning a real person's voice without authority.

## Proven #27 test — actual audio exists

- Thanh Mai Pro short audition: https://drive.google.com/file/d/1LWBXMGsffChCqv3MDJfCuRXlau73lux1/view
- Thảo Trinh short audition: https://drive.google.com/file/d/1o3eTCYqgdEuBhZKD8zJXKI1rcNYfyk6n/view
- Thanh Mai Pro full script: https://drive.google.com/file/d/1cjqc9wCBM4_5lurS1vnW0Ssf1EOYu3Vb/view
- Rendered V2 voice-swap REVIEW: https://drive.google.com/file/d/1w-wUeJO-t2csoiUN7brFoDq8LKg1Vqwe/view

That prior selection was based on voice profile and user preference to replace Thanh Long; **not a blind-A/B listening superiority guarantee**. Independently audition/approve every new story.

## Steps

1. Inspect POV, audience, emotional intensity, speed and diction. Draft 2–3 candidate voice profiles or exact codes from live catalog.
2. Generate genuine auditions through the authorized protected Vbee environment (e.g. GitHub Actions secrets; NEVER print tokens). Keep samples with `voiceCode`, model tier and sample provenance. If failed, don't silently swap in Edge TTS, ElevenLabs or a fabricated file marked Vbee.
3. Listen with same content at matched loudness, rate vocal clarity (Vietnamese diacritics/pronunciation), engagement, natural pause and appropriateness. Choose one voice and record why. If audition wasn't independently listened to, say "provisional".
4. Render **full canonical script** on chosen Vbee voice. FFprobe audio, check sample rate measured rather than inferred from `voiceCode` string, byte count, SHA-256, source run/artifact, and document license status. Never re-use the previous episode's source audio as the new story's narration.
5. Create phrase boundaries/word markers from this **exact** MP3. Remove only genuinely unintentional gaps (normally 0.12–0.40s), preserve consonants/pauses, avoid mechanical speeding and distorted pitch. Regenerate scene timing and captions if voice changes. If temporary **voice-swap preview** keeps previous video timeline, label that **REVIEW**, do not claim words/scene synchronization is verified.
6. CTA narration in same selected voice, unless user directs otherwise. Music/SFX licensed or created in-house; duck beneath dialogue, avoid clipping. Verify complete final mix and subtitles in real playable MP4.

## `voice-cast.json` minimum

See `references/templates/voice-cast.json`; include provider, exact voiceCode, name, locale, audition files, selection reason, track SHA256, source/rights, measured sample rate and duration, human listening and final approval status.
