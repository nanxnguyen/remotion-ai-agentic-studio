# Private/draft publisher
This module adds a publishing step *after* the existing pipeline; it never bypasses Gate C. It does not publish publicly.
## CLI
Run `npm run publish:dry -- VIDEO_SLUG --file out/VIDEO_SLUG-thanh-long-nang-cao-reel.mp4 --title "Video title" --platform both`.
The CLI first calls `python3 -I scripts/pipeline.py check VIDEO_SLUG`, checks ffprobe, and returns a JSON plan without uploading.
After credentials are connected and the owner separately authorizes testing, set `PUBLISH_ENABLED=1` and run `npm run publish:draft -- VIDEO_SLUG --file ... --title ... --platform both`.
**Do not enable** `PUBLISH_ENABLED` automatically in deployments. YouTube is always **private**; Facebook Page Reels always uses **DRAFT**.
## Secrets
Copy `.env.publisher.example` to `.env.publisher`; keep it out of Git. For YouTube, use Google Cloud OAuth consent and `youtube.upload` scope to obtain a refresh token. Store client ID, secret and refresh token on the VPS. For Facebook, create a Meta app, obtain the required Page permissions and Page access token; store the Page ID, token and supported Graph API version. Never paste secrets in issues/logs.
## Run on one VPS
`docker compose -f deploy/docker-compose.publisher.yml build`, then `docker compose -f deploy/docker-compose.publisher.yml run --rm publisher VIDEO_SLUG --file out/VIDEO.mp4 --title "Title"` requires replacing the container command with `python3 scripts/publish-video.py` (or use npm on host).
## Reliability
Each attempt is stored in SQLite with a SHA256-based key **before** remote API calls. If an upload fails after starting, state becomes `needs_reconcile` and is never retried automatically. Inspect provider dashboard and remote state; do not delete rows to force re-upload. Run one publisher worker per DB. MP4 upload uses whole-file memory, so cap size and memory. Protect and back up the persistent SQLite volume.
## Current limits
No scheduler, no dashboard OAuth login, no provider-specific status polling. Live upload, OAuth, Meta DRAFT behavior, and Docker build require validation on your VPS. Do not claim end-to-end publish validation until this happens.

## Mandatory owner approval before any upload
After video render and Gate C/QA complete, the Video Director MUST ask the owner whether to upload that particular video to YouTube Shorts and Facebook Page Reels. Without an explicit yes for that video and destinations, DO NOT invoke the upload command. Connecting accounts, configuring credentials, or enabling the publisher is not consent. A no means retain the local MP4 only.
The CLI enforces a second safety check: `--execute` + `PUBLISH_ENABLED=1` still require a TTY and manually typing `UPLOAD`. Non-interactive scheduling and CI fail closed. Uploads remain YouTube **PRIVATE** and Facebook **DRAFT**. This is a safety requirement, not optional operator etiquette.
