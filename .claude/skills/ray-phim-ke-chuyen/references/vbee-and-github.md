# Vbee Batch TTS integration and GitHub Actions

## Tested production route

Vbee's public API documentation: `POST https://api.vbee.vn/v1/tts` with `Authorization: Bearer <access_token>`, `App-Id: <app-id>`, and JSON `text`, `voiceCode`, `mode: "async"`, `webhookUrl`, `outputFormat: "mp3"`, optionally `speed` (0.25–1.9). Endpoint `GET https://api.vbee.vn/v1/tts/requests/<requestId>` returns job `status`, and on `COMPLETED`, `audioLink`. Download the resulting MP3 immediately; presigned audio URLs expire rapidly (~3 minutes). Preserve downloaded files in a private Actions artifact or authorized production environment, not public repos.

Reference docs (recheck before future use):
- https://api-docs.vbee.vn/vbee-api/text-to-speech/batch-api
- https://api-docs.vbee.vn/vbee-api/text-to-speech/get-request

Why batch? During the Room 404 production, `mode: "sync"` failed `HTTP 400 BAD_REQUEST: This feature is not supported in user package`; the same repo Secrets authenticated and generated actual audio using batch mode. This reflects that account/run, not a blanket Vbee policy.

Default narrative voice: `hn_male_phuthang_stor_24k-stl`, labeled **Anh Khôi nâng cao/Beta** in this repo's `docs/camon/brief.md`. Voice must be cast/auditioned against the topic, and a per-scene output is the only proof a real Vbee TTS request completed. Another tone/dialect may be appropriate with user direction. Use measured voice rather than assumed duration.

## Secret handling

GitHub Secrets can be *used* by runner but values cannot be read back. The Room 404 workflow successfully resolved both token and App ID by:

```yaml
VBEE_ACCESS_TOKEN: ${{ secrets.VBEE_ACCESS_TOKEN || secrets.VBEE_TOKEN || secrets.VBEE_API_KEY || secrets.VBEE_API_TOKEN }}
VBEE_APP_ID: ${{ secrets.VBEE_APP_ID || secrets.VBEE_APPID || secrets.VBEE_APPLICATION_ID }}
VBEE_VOICE_CODE: ${{ inputs.voice_code || vars.VBEE_VOICE_CODE || 'hn_male_phuthang_stor_24k-stl' }}
```

These are **candidate names**, not a claim which individual Secret was used. Check for env nonempty inside runner without printing values. `VBEE_WEBHOOK_URL` is required in batch POST; set to an HTTPS endpoint you control/allow. Room 404 previously used a placeholder while polling, but production should provide a proper callback endpoint when available. No token, secret value, auth cookie or signed link in repo, logs, screenshots, skill, ZIP, or final answer.

## Suggested workflow

Read live canonical repo skills first. On a new feature branch add `docs/<vid>/storyboard.json`, a generic generator copied/adapted from `scripts/generate_vbee_batch.py`, and a manual `workflow_dispatch` workflow. Only automatically trigger if appropriate and approved; avoid accidental repeated paid TTS on every source push.

Sample job steps:

```yaml
- uses: actions/checkout@v4
- uses: actions/setup-python@v5
  with:
    python-version: '3.12'
- run: sudo apt-get update && sudo apt-get install -y ffmpeg
- name: Generate per-scene Vbee MP3
  env:
    VBEE_ACCESS_TOKEN: ${{ secrets.VBEE_ACCESS_TOKEN || secrets.VBEE_TOKEN || secrets.VBEE_API_KEY || secrets.VBEE_API_TOKEN }}
    VBEE_APP_ID: ${{ secrets.VBEE_APP_ID || secrets.VBEE_APPID || secrets.VBEE_APPLICATION_ID }}
    VBEE_WEBHOOK_URL: ${{ vars.VBEE_WEBHOOK_URL }}
  run: python3 scripts/generate_vbee_batch.py --manifest docs/my-video/storyboard.json --out-dir public/audio/my-video
- uses: actions/upload-artifact@v4
  with:
    name: my-video-vbee-narration
    path: public/audio/my-video/
    if-no-files-found: error
```

For a single change, use `--only-scene N`, then assemble the revised audio with the previously approved N-1 voice clips. Do **not** regenerate unrelated scenes, to avoid extra cost and changing timbre. Record provider/model/voice code and audio SHA-256 per scene.

If job fails: preserve actionable Vbee `error.code/message` with credential redaction, no silent fallback, no assertion that audio exists. If a tool cannot dispatch workflows, provide actual branch/workflow link or use the authorized repo mechanism; do not invent run IDs or audio artifacts.
