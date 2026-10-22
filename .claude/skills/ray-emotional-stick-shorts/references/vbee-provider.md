# Vbee voice provider — production contract (default)

Vbee AIVoice is the mandatory/default narrator for `ray-emotional-stick-shorts`, at the user's request. No silent HeyGen or other TTS fallback.

## What has actually been verified

- GitHub Secrets `VBEE_APP_ID` and `VBEE_ACCESS_TOKEN` were available to GitHub Actions. This alone does **not** mean every Vbee API feature is included in the subscription.
- Authenticated trial of Vbee `POST https://api.vbee.vn/v1/tts` with `mode=sync` returned HTTP 400 `This feature is not supported in user package` on 2026-10-23. Run: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/39827358680 . No audio was produced.
- Official docs: https://api-docs.vbee.vn/vbee-api/text-to-speech/realtime-api.md ; real-time currently lists female voices only (HN Ngọc Huyền, SG Tường Vy, HN Mai Phương, SG Lan Trinh, SG Thảo Trinh).
- Batch docs: https://api-docs.vbee.vn/vbee-api/text-to-speech/batch-api.md ; `mode=async` **requires** `webhookUrl`, even when status is polled. Male voices supported via Batch. User explicitly does not want to configure a webhook at present. Do not lie about a webhookless Batch API.

## Default automated Vbee Batch voice from ChatGPT (live integration)

The assistant has deployed a dedicated HTTPS webhook acknowledgement endpoint at:

`https://iehmucsshklgjmxqyggp.supabase.co/functions/v1/vbee-batch-callback`

This URL is **non-secret** and may be embedded directly in the workflow. Supabase function `vbee-batch-callback` acknowledges POST with HTTP 204; it is not used as an authorization or audio store. Poll authenticated `GET https://api.vbee.vn/v1/tts/requests/{requestId}` using GitHub repository Secrets `VBEE_APP_ID` and `VBEE_ACCESS_TOKEN`. Immediately download the short-lived `audioLink` to the GitHub Actions runner.

GitHub workflow `.github/workflows/vbee-audition.yml` exercises this path. Real request `9e55443b-6d94-4709-bd4c-421a0d563414` succeeded in synthesizing and downloading a Thanh Long MP3 on 2026-10-23. The first run failed only at `ffprobe: command not found`; a follow-up commit installed ffmpeg. The end-to-end voice and film artifacts require separate verification.

To make each new video from ChatGPT: create/edit video script and shot assets in GitHub, trigger a GitHub Actions workflow using file commit, run authenticated Vbee Batch synthesis/polling, verify MP3 audio and full MP4, then commit media and upload verified FULL to vidIQ. A request in chat alone does **not** make Vbee API a native ChatGPT connector; the GitHub Actions bridge is the automation mechanism.

Manual Vbee Studio export remains available only as an explicit contingency, not a default. Do NOT require the user to copy/export MP3 each time, and do NOT require setting a `VBEE_WEBHOOK_URL` Secret. Check the fixed workflow status before claiming MP3 archived.

## Batch API reference

Credentials in private environment or GitHub Secrets: `VBEE_APP_ID`, `VBEE_ACCESS_TOKEN`. The public callback URL is already deployed and may be set as the workflow's `VBEE_WEBHOOK_URL` environment variable without a repository Secret. Use `scripts/vbee_tts.py` (Batch async). Example: `python3 .claude/skills/ray-emotional-stick-shorts/scripts/vbee_tts.py --text-file docs/<vid>/narration.txt --voice-code hn_male_thanhlong_talk_48k-fhg --output docs/<vid>/voice/vbee-thanhlong.mp3`. Vbee links expire after ~3 min, so download them immediately; request ID allows refreshing the link. Do not put any secrets into commits, chat replies, public logs, or metadata.

## Security / access

The user previously pasted a Vbee bearer token in chat; recommend rotating/revoking it and updating GitHub Secret `VBEE_ACCESS_TOKEN`. Do not repeat the token, store it in source, or echo it in logs. Do not infer that a subscription payment automatically grants real-time TTS API access. User may ask Vbee support to enable the feature, but no claim that support will do so.
