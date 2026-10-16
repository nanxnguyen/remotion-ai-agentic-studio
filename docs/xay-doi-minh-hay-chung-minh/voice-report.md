# Voice report (xay-doi-minh-hay-chung-minh)

Route: fallback edge-tts `vi-VN-HoaiMyNeural` (brief §Giọng; Cam clone NOT authorized, no clone attempted). 16 clips in `public/audio/xay-doi-minh-hay-chung-minh/s*.mp3` measured as-is; nothing overwritten. ASR detail: `voice-clone-asr.md`.

| shot | duration s | syl/s (syl) | CER adj | issues |
|---|---|---|---|---|
| s1 | 3.11 | 4.50 (14) | 0.000 | fast but clean; no gap; peak −4.8 dB |
| s2a | 4.13 | 3.63 (15) | 0.000 | digit artifact only; no gap |
| s2b | 2.99 | 2.67 (8) | 0.067 | 0.91 s internal pause at 1.6–2.5 s (colon before quote — matches script's silence-before-"Nó á?"); bật→bực ASR vowel confusion |
| s3 | 4.85 | 3.51 (17) | 0.080 | lương→Luân, gạch→gặp (ASR finals); no gap >0.6 s |
| s4 | 4.21 | 3.80 (16) | 0.014 | "story" correct; no gap |
| s5a1 | 1.15 | 4.36 (5) | 0.000 | clean |
| s5a2 | 2.63 | 4.19 (11) | 0.089 | tối→tuối, gạch→gặp (ASR); no gap |
| s5b | 5.90 | 3.22 (19) | 0.013 | 0.90 s pause at 3.3–4.2 s (period between sentences, normal phrasing); ti vi→TV orthographic; no split needed (A14: phrases separated) |
| s6 | 3.71 | 3.50 (13) | 0.017 | clean; no gap |
| s7a | 2.61 | 4.21 (11) | 0.000 | digit artifact only; no gap |
| s7b | 1.90 | 4.74 (9) | 0.108 | fastest clip; căn→đăng, ở→nhở — worst CER, likely ASR on fast short clip; no gap |
| s8 | 4.38 | 3.65 (16) | 0.078 | 0.88 s pause at 2.5–3.4 s (period, normal); Câu→tôi onset confusion; "còn lâu", "có công" correct |
| s9a | 1.94 | 4.64 (9) | 0.000 | mandatory line v1 perfect; no gap |
| s9b | 1.75 | 4.56 (8) | 0.031 | tiếc→tiết final-merge only; 1.0 s hold lives in timeline, not clip |
| s10 | 4.59 | 3.26 (15) | 0.044 | 0.89 s pause at 2.6–3.5 s (period, normal); gạch→gặt only; no split needed (A14) |
| s11 | 1.90 | 4.22 (8) | 0.088 | gạch→gặt only (edit distance inflated by ch→t); no gap |

- Total voice: **51.75 s** (194 syllables, avg 3.75 syl/s, within 3.7–4.2 budget).
- Loudness: mean −17.5…−19.0 dB (1.5 dB spread, consistent), max peak −3.3…−6.1 dB — **no clipping** on any clip. Single voice throughout, timbre consistent.
- Silence: 4 internal gaps >0.6 s (s2b, s5b, s8, s10, all ~0.9 s at punctuation boundaries) — normal TTS phrasing, not defects.
- Timeline hint: voice 51.75 s + 7.9 s holds/gaps (script.md) = **~59.6 s**, near the 60 s max. If over after join: trim s5a1 gap/tails first per script.md; do not touch s9 gap 0.7 s, 1.0 s hold after s9b, or final 2.0 s silence.
- Regenerated keys: **none**. Regen attempted for failing keys via `scripts/gen-voice-expressive.py --voice vi-VN-HoaiMyNeural` to a lab dir — edge-tts service returned **403** (`WSServerHandshakeError` on speech.platform.bing.com, 12/12 retries failed), so no audio was produced and `public/` is untouched. Additionally, regen with identical text/voice/rate reproduces identical audio, so the CER>0.04 items (all small-model vowel/final-consonant confusions, one borderline at 0.044) are not fixable by re-running. Proposals for director (require voice.json text change, not done here): none mandatory — all script watch-words ("story", "Còn lâu", "Tết", "đặt") are correct; "gạch"/"tiếc"/"rửa bát" finals reflect the voice's Southern merging and ASR hears them consistently.
- Cannot-verify list (machine only, no human listen): tones/accents on every clip; whether s7b at 4.74 syl/s sounds rushed; whether "tiết" in mandatory s9b or "gặt" in s10/s11 is audible to a human ear as wrong; any naturalness/emotion/delivery quality. ASR cannot hear.
