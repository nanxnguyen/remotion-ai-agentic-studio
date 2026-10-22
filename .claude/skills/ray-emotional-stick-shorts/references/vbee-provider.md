# Vbee AIVoice — Vietnamese narration integration

**Status:** adapter ready; **not authenticated or synthesized** until user's Vbee credentials are supplied in the execution environment.

- Official setup: https://studio.vbee.vn/apps → Tích hợp API → Tạo ứng dụng.
- Official API: https://api-docs.vbee.vn/vbee-api/text-to-speech/batch-api
- Requires three private values (environment or GitHub Actions Secrets): VBEE_APP_ID, VBEE_ACCESS_TOKEN, VBEE_WEBHOOK_URL.
- Never commit keys/tokens or paste them into ChatGPT chat. Require a real HTTPS webhook endpoint accessible to Vbee.
- The Batch API supports 100,000 characters, male voices, speed 0.25–1.9 and optional pause/emphasis controls (only if voice supports the latter). Real-time API currently restricts voices to selected female ones, so use Batch for this film's male narrator.
- Batch audio links expire after about 3 minutes; Vbee stores result for roughly 3 days. Download MP3 as soon as job completes, or use the request ID to fetch a new audio link.
- Candidate voices (confirm currently available codes): HN – Thanh Long = hn_male_thanhlong_talk_48k-fhg; SG – Minh Hoàng = sg_male_minhhoang_full_48k-fhg; SG – Trung Kiên = sg_male_trungkien_vdts_48k-fhg.
- Compare a test emotional line with approved Paul – Soothing voice. Evaluate actual Vietnamese pronunciation, pacing, timbre, breath, pause and clarity. Do not call Vbee inherently more human.
- Generate audio with: python3 .claude/skills/ray-emotional-stick-shorts/scripts/vbee_tts.py --text-file docs/<vid>/narration.txt --voice-code hn_male_thanhlong_talk_48k-fhg --output docs/<vid>/voice/vbee-thanhlong.mp3
- After audio generation: measure MP3 duration, reconcile shots/captions, combine with original piano and video, verify FULL audio by listening, upload verified MP4 to vidIQ and return fresh link/ID, commit verified artifacts to GitHub branch. Do not publish YouTube automatically.
- If credentials are unavailable: mark voice blocked_credentials; manual alternate at https://studio.vbee.vn/ where user can export an MP3 and supply it as an attachment. Never substitute music-only preview as full voice.
