# Dynamic YouTube channel upload — private-only (Google Drive → YouTube API)

This adds a **separate long-form uploader** to `remotion-ai-agentic-studio`; it does not modify the existing Shorts publisher (`scripts/publish-video.py`). **No upload happens on push or merge**. The Actions workflow runs only when manually dispatched, with `execute=false` by default. The script **never sets Public/Unlisted or scheduling**.

## Why every channel needs its own grant

One Google login may own several YouTube channels/Brand Accounts. A channel's YouTube OAuth identity is determined by the account/channel selected during consent. You **cannot** pass a `channelId` to `videos.insert` and override that identity. Get a separate channel-specific refresh token for each target channel. The uploader first resolves the expected `@handle` with `channels.list(forHandle=...)`, then compares its **Channel ID** against the channel returned by `channels.list(mine=true)` for that token. If they differ, it blocks the upload. Google documents limitations with third-party apps and Brand Accounts:
https://support.google.com/youtube/answer/3046478

## One-time Google Cloud configuration

1. Open https://console.cloud.google.com/, create/select a project and **enable both YouTube Data API v3 and Google Drive API**.
2. Configure **Google Auth Platform → Branding/Audience** (OAuth consent). For External/Testing, add your Google account as a test user. Note: external OAuth apps left in **Testing** typically issue refresh tokens that expire in **7 days**. For sustained use, review the **In production** setting and Google's verification requirements. See https://developers.google.com/identity/protocols/oauth2#expiration .
3. **Google Auth Platform → Clients → Create client → Desktop app**. Download its JSON to **your local computer**, **outside this Git repo**. Do not paste it into ChatGPT, commit it or upload it to Drive.
4. On your computer: `python -m venv .venv` and install `python -m pip install -r scripts/youtube-multi-requirements.txt` from the repository. Google login uses a local browser and localhost redirect.

## First channel: @olise-man

```bash
python scripts/youtube_oauth_setup.py --provider youtube --channel OLISE_MAN --client-secret /private/path/client_secret.json
python scripts/youtube_oauth_setup.py --provider drive --client-secret /private/path/client_secret.json
```

The browser may ask you to select which channel you authorize. **Choose `@olise-man`**. The script verifies the actual OAuth channel against the official handle before writing the token. If no channel picker appears or a different channel is selected, it **fails without saving an incorrect token**. Try switching the default channel in YouTube account settings, then rerun the local flow.

The script saves secret text files under `~/.config/ray-youtube-uploader/` with restrictive permissions and prints safe `gh secret set` commands (token values are **never printed**). It also shows the verified `UC...` channel ID; **copy that ID into** `config/youtube-channel-targets.json` → `OLISE_MAN.channel_id` (this public ID is not a secret) in a later commit.

Run the printed commands on **your computer**, or paste each file's contents into **GitHub → Settings → Secrets and variables → Actions → New repository secret**, never into chat. Four secrets needed initially:

- `YOUTUBE_CLIENT_ID` — Desktop OAuth client ID
- `YOUTUBE_CLIENT_SECRET` — Desktop OAuth client secret
- `YOUTUBE_REFRESH_TOKEN_OLISE_MAN` — YouTube OAuth token for **this channel only**
- `DRIVE_REFRESH_TOKEN` — Drive read-only OAuth token for the Google account that owns the private MP4 and thumbnail.

**The script does not know these values and ChatGPT cannot fetch private GitHub Secrets.** The Drive OAuth grant is separate from YouTube, avoiding Brand Account/Drive permission confusion. Do not make Drive files public.

## Add any of the other four channels without changing uploader logic

1. Add an entry in `config/youtube-channel-targets.json`:
   ```json
   "SECOND_CHANNEL": {"handle": "@exact-handle", "channel_id": null}
   ```
   (Add it inside the existing `channels` object, with a comma between entries.) Use uppercase letters, digits and underscores for the key; name it as you like.
2. Run `python scripts/youtube_oauth_setup.py --provider youtube --channel SECOND_CHANNEL --client-secret /private/path/client_secret.json`. Pick that channel during OAuth consent; the script validates it matches the handle. Pin the returned `UC...` ID in config.
3. Save the resulting GitHub Secret named `YOUTUBE_REFRESH_TOKEN_SECOND_CHANNEL`. Reuse the same `DRIVE_REFRESH_TOKEN` if the Drive owner is the same.
4. To upload to this channel, set workflow `channel=SECOND_CHANNEL`. To go back to the first channel, use `channel=OLISE_MAN`. **Never reuse another channel's token**, even for the same Google email.

## Prepare the video and metadata

The uploader consumes **private** Google Drive IDs for both `video_drive_id` (FINAL 2560×1440 MP4) and `thumbnail_drive_id` (1280×720 PNG/JPG). It validates H.264 + AAC, 30 FPS, duration 180–240.5 seconds, thumbnail dimensions and size ≤2 MiB. **Resolution alone cannot prove a native 2K render**; complete production QA separately before `qa_approved=true`.

Copy `config/youtube-longform-metadata.example.json` to a new `config/films/<slug>.json`, set the final title, accurate description, audience setting (`made_for_kids`) and realistic-altered-content disclosure (`contains_synthetic_media`), and set `qa_approved=true` only after actual review. Commit this JSON (it contains no credentials).

## Run GitHub Actions

Go to **Actions → YouTube Long-form (private, multi-channel) → Run workflow**, select the main branch after the PR is merged. Input:

| Field | First upload |
| --- | --- |
| channel | `OLISE_MAN` |
| video_drive_id | ID of approved private Drive FINAL MP4 |
| thumbnail_drive_id | ID of approved private Drive thumbnail |
| metadata_path | `config/films/<slug>.json` |
| execute | `false` for preflight, then `true` when approved |

Start with **`execute=false`**, inspect run logs and `youtube-longform-OLISE_MAN-receipt` artifact. `dry_run` uploads nothing. For approved private uploading set `execute=true`: the script validates the actual channel, checks for recent duplicates via a SHA-256 tag and uploads with `privacyStatus=private`. It saves a receipt with the YouTube video ID **before** attempting the thumbnail; if setting the thumbnail fails, use the receipt/video ID to repair the existing video (do not blindly rerun uploading). The duplicate guard is best-effort, not a guarantee immediately after an interrupted upload.

**The user must approve the exact metadata and `execute=true` choice**. Never auto-switch Private → Public. The channel's owner should verify the video in YouTube Studio before publishing.

## Local tests

```bash
python -m unittest discover -s tests -p test_youtube_multi_channel.py -v
python -m compileall -q scripts/youtube_multi_channel.py scripts/youtube_oauth_setup.py
```

## Notes

- GitHub Actions requires **repository Actions access**; workflows and upload artifacts remain separate from committed video binaries.
- YouTube and Google Drive API calls are subject to Google quotas; API use is free within the current allocations but not a guarantee of unlimited usage. `videos.insert` has a separate default 100-uploads/day bucket as of 2026-11 (https://developers.google.com/youtube/data/determine_quota_cost).
- Video uploader uses the account's **direct** OAuth grant, not Metricool, and does not need Google Drive to be publicly shared.
- Approval and the first Google OAuth flow are **not complete** until the channel owner performs them. Do not describe this PR as a real successful upload.