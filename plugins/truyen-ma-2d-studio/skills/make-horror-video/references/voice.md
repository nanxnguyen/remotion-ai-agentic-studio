# Voice — narration that sounds like a storyteller, not a robot

## Vbee (Vietnamese TTS)
- Script: `python tools/vbee_tts.py --script drafts/<slug>/narration.txt --out drafts/<slug>/voiceover.mp3 --voice <voiceCode> --speed 0.95 --gap 0.35 --para 0.9`.
- Credentials only from environment variables: `VBEE_APP_ID`, `VBEE_ACCESS_TOKEN` (aliases `VBEE_TOKEN`, `VBEE_API_KEY`), `VBEE_WEBHOOK_URL` (the API requires an HTTPS callback; results are polled anyway). Never write them into files, logs, the repo or a reply. Check they exist without printing them.
- API: async batch `POST https://api.vbee.vn/v1/tts` then poll `GET /v1/tts/requests/<id>`; download the MP3 immediately (links expire within minutes). The tool resumes: lines already synthesised are kept.
- Needs HTTPS access to api.vbee.vn — run it on the user's computer or in a GitHub Actions job with the secrets set. If this workspace cannot reach it, say so and ask for the MP3s or another voiceover. Never present a different voice as Vbee.
- Voice choice: a deep, calm storyteller voice for tâm linh (e.g. the user's usual `hn_male_phuthang_stor_24k-stl`; confirm the code is in their package); a young female voice for first-person urban stories. Speed 0.9–1.0 for horror; 1.05–1.1 only for Shorts.
- Text prep: numbers and codes as words, one sentence per line, empty line = longer pause before a reveal. Fix mispronounced names by spelling them phonetically.
- Output: the joined MP3 + `voiceover.mp3.lines.json` with exact per-line start/end (use it to cross-check Whisper word timings and to place hushes on the pauses).

## Own recording
Quiet room, phone 20 cm away, read slower than feels natural, leave 1 s of silence before and after each reveal line, record a 10 s room-tone take. Export WAV/MP3; the pipeline handles the rest.

## English
Use the user's own recording or a TTS file they provide (ElevenLabs etc. via their own account). Same pacing rules: measure words ÷ seconds on the first paragraph (Vbee reference: ~183 wpm at 1.0–1.05, ~140 wpm at 0.9), pauses before reveals, no reverb baked in.
