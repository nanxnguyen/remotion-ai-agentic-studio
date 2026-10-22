# Vbee voice provider — production contract (default)

Vbee AIVoice is the mandatory/default narrator for `ray-emotional-stick-shorts`, at the user's request. No silent HeyGen or other TTS fallback.

## What has actually been verified

- GitHub Secrets `VBEE_APP_ID` and `VBEE_ACCESS_TOKEN` were available to GitHub Actions. This alone does **not** mean every Vbee API feature is included in the subscription.
- Authenticated trial of Vbee `POST https://api.vbee.vn/v1/tts` with `mode=sync` returned HTTP 400 `This feature is not supported in user package` on 2026-10-23. Run: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/39827358680 . No audio was produced.
- Official docs: https://api-docs.vbee.vn/vbee-api/text-to-speech/realtime-api.md ; real-time currently lists female voices only (HN Ngọc Huyền, SG Tường Vy, HN Mai Phương, SG Lan Trinh, SG Thảo Trinh).
- Batch docs: https://api-docs.vbee.vn/vbee-api/text-to-speech/batch-api.md ; `mode=async` **requires** `webhookUrl`, even when status is polled. Male voices supported via Batch. User explicitly does not want to configure a webhook at present. Do not lie about a webhookless Batch API.

## Preferred production route while user does not want a webhook

1. Open https://studio.vbee.vn/ → **Chuyển văn bản**, paste approved narration, select a warm, expressive Vietnamese voice (first audition HN – Thanh Long; or male SG – Minh Hoàng). Enable emphasis or custom pauses only when Studio offers them.
2. Synthesize and **export MP3/WAV** using the user's purchased plan. User attaches the resulting audio file or places it into `docs/<vid>/voice/vbee-voice.mp3` in a production-capable environment. Label `provider: vbee_studio_export` and capture exact voice name and measured duration.
3. Measure voice length via `ffprobe`, audition the first sentence and final moral, then align timing with the story beats. For long pauses use silence or time-stretch carefully, without chopping across words. Keep original piano underneath intelligible voice; render vertical 9:16, validate final MP4 AV tracks and audible narration by listening.
4. After QA, archive FULL output in `docs/<vid>/final/`; commit source, manifest, full AV video and SHA-256 automatically to the video branch; upload verified FULL MP4 to vidIQ, save the stable `uploadId` and return refreshed media link. Never publish to YouTube unless asked.
5. If no Vbee audio file can be obtained, STOP audio gate with `BLOCKED_VBEE_VOICE`. Never send a previous HeyGen version falsely described as Vbee.

## Optional automated Batch API route — only with real HTTPS webhook

Credentials in private environment or GitHub Secrets: `VBEE_APP_ID`, `VBEE_ACCESS_TOKEN`, `VBEE_WEBHOOK_URL`. Use `scripts/vbee_tts.py` (Batch async). Example: `python3 .claude/skills/ray-emotional-stick-shorts/scripts/vbee_tts.py --text-file docs/<vid>/narration.txt --voice-code hn_male_thanhlong_talk_48k-fhg --output docs/<vid>/voice/vbee-thanhlong.mp3`. Vbee links expire after ~3 min, so download them immediately; request ID allows refreshing the link. Do not put any secrets into commits, chat replies, public logs, or metadata.

## Security / access

The user previously pasted a Vbee bearer token in chat; recommend rotating/revoking it and updating GitHub Secret `VBEE_ACCESS_TOKEN`. Do not repeat the token, store it in source, or echo it in logs. Do not infer that a subscription payment automatically grants real-time TTS API access. User may ask Vbee support to enable the feature, but no claim that support will do so.
