# Private/draft publisher
This module adds a publishing step after Gate C; it never publishes publicly.
## CLI
Run `npm run publish:dry -- VIDEO_SLUG --file out/VIDEO_SLUG-thanh-long-nang-cao-reel.mp4 --title "Video title" --platform both`.
The CLI first verifies that Gate C passes for `VIDEO_SLUG`, checks ffprobe, and returns a JSON plan without uploading.
After credentials are connected and the owner separately authorizes testing, set `PUBLISH_ENABLED=1` and run `npm run publish:draft -- VIDEO_SLUG --file ... --title ... --platform both`.
**Do not enable** `PUBLISH_ENABLED` automatically in deployments. YouTube is always **private**; Facebook Page Reels always uses **DRAFT**.

## Automatic upload after Gate C

Create `docs/VIDEO_SLUG/publishing.json` only for videos that should upload automatically:

```json
{
  "autoDraft": true,
  "platform": "both",
  "title": "Title shown in the provider dashboard",
  "description": "Description to review before publishing"
}
```

Then inject `PUBLISH_ENABLED=1` and `PUBLISH_AUTO_DRAFT=1` into the pipeline process. When a passing Gate C review is recorded, the pipeline invokes the publisher with the canonical MP4 from `status.json`. The publisher takes one immutable byte snapshot and rejects any other path, stale render fingerprint, or SHA-256 that differs from the Gate C review. Omit `publishing.json`, set `autoDraft` to `false`, or leave either environment switch disabled to prevent unattended uploads.

The automatic path means the owner has authorized private/draft uploads for every video with `autoDraft: true`. Public publishing still requires manual review in YouTube Studio and the Facebook Page dashboard.
## Secrets
Copy `.env.publisher.example` to `.env.publisher`; keep it out of Git. For YouTube, use Google Cloud OAuth consent and `youtube.upload` scope to obtain a refresh token. Store client ID, secret and refresh token on the VPS. For Facebook, create a Meta app, obtain the required Page permissions and Page access token; store the Page ID, token and supported Graph API version. Never paste secrets in issues/logs.
## Run on one VPS
`docker compose -f deploy/docker-compose.publisher.yml build`, then `docker compose -f deploy/docker-compose.publisher.yml run --rm publisher VIDEO_SLUG --file out/VIDEO.mp4 --title "Title"` requires replacing the container command with `python3 scripts/publish-video.py` (or use npm on host).
## Reliability
Each attempt is stored in SQLite with a SHA256-based key **before** remote API calls. If an upload fails after starting, state becomes `needs_reconcile` and is never retried automatically. Inspect provider dashboard and remote state; do not delete rows to force re-upload. Run one publisher worker per DB. MP4 upload uses whole-file memory, so cap size and memory. Protect and back up the persistent SQLite volume.
## Current limits
No scheduler, no dashboard OAuth login, no provider-specific status polling. Live upload, OAuth, Meta DRAFT behavior, and Docker build require validation on your VPS. Do not claim end-to-end publish validation until this happens.

## Authorization

Manual uploads require `--execute`, `PUBLISH_ENABLED=1`, a TTY, and typing `UPLOAD`. Automatic uploads require all of `autoDraft: true` for that video, `PUBLISH_ENABLED=1`, `PUBLISH_AUTO_DRAFT=1`, and a passing Gate C review tied to the same file. Account credentials alone never enable uploads.
