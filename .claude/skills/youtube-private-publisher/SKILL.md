---
name: youtube-private-publisher
description: Use when a Superpowers/Codex/Claude agent is asked to upload a QA-approved 2K long-form animation from private Google Drive to a chosen YouTube channel via the repository's existing GitHub Actions workflow. Always dry-run first; PRIVATE only.
---

# YouTube multi-channel publisher (Superpowers repository integration)

This is a **repository-local** skill for agent runtimes using the Superpowers planning/TDD/verification approach. It **does not modify the globally installed Superpowers plugin**. Use the production uploader already merged into this repository: do not implement a parallel uploader or send secrets to chat.

## Source of truth

- GitHub Actions: `.github/workflows/youtube-longform-private.yml` (manual `workflow_dispatch`).
- Upload implementation: `scripts/youtube_multi_channel.py`.
- Per-channel registry: `config/youtube-channel-targets.json`.
- One-time OAuth setup: `scripts/youtube_oauth_setup.py`.
- Example publication metadata: `config/youtube-longform-metadata.example.json`.
- Production instructions and incident recovery: `docs/youtube-multi-channel-private-upload.md`.
- Contract tests: `tests/test_youtube_multi_channel.py` and `tests/test_youtube_publishing_skill.py`.
- Reuse the video's approved production gates, QA evidence and Google Drive delivery rules in `AGENTS.md`.

## Mandatory decision and safety gates

1. **Authorization:** The user explicitly identifies the desired YouTube destination and approves upload of the specific FINAL video with the reviewed title, description, audience and disclosure settings. The uploaded video must be **Private**. If approval or QA evidence is absent, only prepare assets and run a dry-run. `execute=true` is never implied by an old approval for another video.
2. **Channel isolation:** The operator supplies an uppercase allowlisted `channel` alias. The workflow uses `YOUTUBE_REFRESH_TOKEN_<CHANNEL>`, not a global YouTube token; each Brand Account needs its own OAuth grant. Before any upload the script resolves `@handle`, checks the OAuth-authorized channel ID and an optional pinned `UC...` channel ID. Mismatch => **BLOCK**, never fall back to another channel.
3. **Drive access:** Use private `video_drive_id` and `thumbnail_drive_id`; do not change sharing permissions, download links, or public ACLs to make the workflow pass. Drive and YouTube credentials stay in encrypted GitHub Actions Secrets.
4. **FINAL QA:** The current uploader validates video **2560x1440**, **30 fps**, H.264/AAC, **180–240.5s**, thumbnail **1280x720** PNG/JPEG <=2 MiB, metadata `language=en`, `privacy=private`, explicit `made_for_kids`/`contains_synthetic_media`, and `qa_approved=true` for execution. These structural checks do **not** prove storytelling quality, native 2K rendering, licensed music or monetization. Verify production evidence independently.
5. **Never automatically publish:** No Public, Unlisted, scheduled publish, video deletion, or privacy changes. Never add `publishAt` or `publish_at`, log tokens, upload without an approved metadata file, or bypass duplicate detection. Upload success is established by YouTube video ID and the receipt; do not infer it from a passing unit test.

## Superpowers execution discipline

### Plan

Write a short plan covering channel alias, verified channel ID, exact Drive video/thumbnail IDs, approved metadata path, expected QA, and two steps: `execute=false` followed by *separately authorized* `execute=true`. If required access/tools are unavailable, document the blocker. Do not fake a GitHub run.

### Test

Before the upload step, run:

```bash
python3 -m unittest discover -s tests -p 'test_youtube_multi_channel.py' -v
python3 -m unittest discover -s tests -p 'test_youtube_publishing_skill.py' -v
python3 -m compileall -q scripts/youtube_multi_channel.py scripts/youtube_oauth_setup.py
```

Keep the existing upload implementation unchanged unless a bug is proven. For a code change, first write a regression test, then implement a minimal fix and verify it.

### Stage inputs

Create `config/films/<slug>.json` from the approved metadata, commit it to the branch that will run the workflow, and use only the verified Google Drive file IDs. For example:

```json
{
  "channel": "OLISE_MAN",
  "video_drive_id": "<DRIVE_FINAL_MP4_ID>",
  "thumbnail_drive_id": "<DRIVE_THUMBNAIL_ID>",
  "metadata_path": "config/films/<slug>.json",
  "execute": false
}
```

This object describes GitHub workflow **inputs**; it is not a JSON file consumed directly by the uploader. The authorized workflow default channel is `OLISE_MAN` -> `@olise-man`; other channels are added to the registry with separate OAuth tokens.

### Preflight: dry-run required

On a branch where the workflow and approved metadata both exist, preferably `main`, dispatch the existing GitHub Actions workflow (if an authorized GitHub Actions dispatch capability is available):

```bash
gh workflow run youtube-longform-private.yml --ref main \
  -f channel=OLISE_MAN \
  -f video_drive_id=<DRIVE_FINAL_MP4_ID> \
  -f thumbnail_drive_id=<DRIVE_THUMBNAIL_ID> \
  -f metadata_path=config/films/<slug>.json \
  -f execute=false
```

Review the **actual run logs** and downloaded `youtube-longform-<CHANNEL>-receipt` artifact. Require `status=dry_run`, correct `handle`, `channel_id`, MP4 properties, and no existing duplicate ID. If an agent has read-only GitHub access, give the user the exact Actions run instructions rather than claiming to have dispatched a workflow.

### Private upload: explicit approval only

After preflight passes and the user has approved **this exact film**, re-run the same command with `-f execute=true`. Confirm `status=uploaded_private_ready_for_review` and a real `youtube_video_id` in the receipt; report `https://www.youtube.com/watch?v=<ID>` with an explicit **PRIVATE** label. If thumbnail assignment fails but a video ID already exists, reconcile that video instead of blindly uploading again. Duplicate checks are best-effort and recent uploads may not be indexed immediately.

### Final verification and handoff

Report the selected channel, privacy status, actual YouTube video ID, verified GitHub Actions run URL, and any separate QA/YouTube processing limits. Do not claim the video is Public or fully processed at 2K merely because the upload API returned success. A Private link only plays for authorized channel accounts. Make no claim about monetization or surpassing another film without independent evidence.

## Credentials, failures and dynamic channel routing

Required GitHub **Secrets** (never Variables): `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `DRIVE_REFRESH_TOKEN`, and `YOUTUBE_REFRESH_TOKEN_<CHANNEL>` (e.g. `YOUTUBE_REFRESH_TOKEN_OLISE_MAN`). All refresh tokens must be minted for the same Desktop OAuth client as the ID/Secret pair. For a new channel, add its uppercase alias, official handle and verified `UC...` ID to the registry, grant that channel's YouTube OAuth token, then select the alias in the workflow. Never reuse a Brand Account token for another channel.

- `invalid_client`: verify that GitHub's Desktop OAuth Client ID/Secret form a matching pair; the prior one-shot test had incorrectly escaped GitHub Secrets expressions. Do not print credentials.
- Google Drive HTTP 403: verify Google Drive API is enabled on the selected Cloud project and the Drive OAuth account has read access.
- `ffprobe` not found: the current workflow installs FFmpeg/FFprobe; do not disable media validation.
- Wrong channel or `invalid_grant`: stop and ask for a fresh channel-specific OAuth grant; do not silently choose another channel or account.
- Already uploaded / unexpected interruption: use the receipt or YouTube Studio to reconcile the existing video, never blindly retry `execute=true`.

## Proven baseline (reference, not an automatic default)

A one-shot upload of **THE GIRL WITH 1% — FINAL V2** succeeded as **Private** on `@olise-man`: YouTube video ID `YCv2D1om_Vg`, channel ID `UCY3n3Nlqyo6uI4GU8nuX-5g`, with source 2560x1440 / 30fps / 238s. Verified run: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/41771504151 . The temporary one-shot workflow was removed. **Never rerun that one-shot or re-upload its Drive file by default.**
