# Social publishing after render

Research checked on 2026-10-17. This note proposes integration work; it does not authorize or perform uploads.

## YouTube

- Upload with `videos.insert`, using user OAuth authorization and the narrow `youtube.upload` scope. Explicitly set visibility, title, description, audience classification, and applicable synthetic-media disclosure; do not rely on the default visibility. [API reference](https://developers.google.com/youtube/data/reference/rest/v3/videos/insert?hl=en)
- Enable YouTube Data API in a Google Cloud project and configure an OAuth client. Use offline authorization for a refresh token so later renders can upload without another browser session. Store credentials outside Git. Public applications requesting sensitive user-data scopes may require OAuth verification. [Google OAuth server flow](https://developers.google.com/identity/protocols/oauth2/web-server), [YouTube authorization](https://developers.google.com/youtube/data/guides/authentication)
- Use a resumable upload session and persist its progress rather than restart an ambiguous upload. [Resumable upload protocol](https://developers.google.com/youtube/data/guides/using_resumable_upload_protocol)
- **Documentation discrepancy:** the live method reference, marked updated 2026-10-15, says: “Videos uploaded from unverified API projects are not restricted to private viewing mode.” The historical July 28, 2020 entry still describes private-only uploads for newer unverified projects. Treat actual project/account eligibility as something to verify before promising public automation; do not repeat the historical restriction as an unconditional current rule. [Current method reference](https://developers.google.com/youtube/data/reference/rest/v3/videos/insert?hl=en), [Official revision history](https://developers.google.com/youtube/data/revision_history)
- Do not hardcode historical quota numbers. Read the active project quota and handle upload/account limits. [Quota reference](https://developers.google.com/youtube/data/determine_quota_cost)

## Facebook Page Reels

The verified flow targets a **Page**, using a Page access token. Do not treat `/me` as a personal-profile destination: its identity comes from the supplied Page token. Meta's collection obtains managed Page tokens using `/me/accounts?fields=name,access_token,tasks` with a user token. [Meta's official Page-token example](https://www.postman.com/meta/facebook/request/bqfxwbp/get-access-tokens-of-pages-you-manage)

Meta's official collection documents these stages:

1. Start with `POST /{version}/me/video_reels`, `upload_phase=start`, and the Page token. [Create Reel](https://www.postman.com/meta/facebook/request/rgkn91u/1-create-reel)
2. Transfer a local video or a hosted video using the corresponding upload stage. Keep the returned video/session identifier for recovery. [Official Facebook collection](https://www.postman.com/meta/facebook/documentation/r56bjfd/facebook-api)
3. Query session status, then finish with `video_id`, `upload_phase=finish`, and the chosen `video_state`. The collection lists `DRAFT`, `SCHEDULED`, and `PUBLISHED`; finishing starts assembly/encoding, so an accepted request alone is insufficient evidence that viewers can watch it. [Publish Reel documentation](https://www.postman.com/meta/facebook/documentation/r56bjfd/facebook-api?entity=request-23987686-a9ea20fe-d410-4804-8bbe-5cc5985e9443), [Publish request](https://www.postman.com/meta/facebook/request/juhnm3q/4-publish-reel)

**Remaining Meta verification:** the developer reference returned HTTP 429 / failed fetch during this research. Before implementation, confirm the active Graph version, Reel media constraints, `pages_manage_posts` and its permission dependencies, Page task access, and whether this app's audience requires Advanced Access/App Review/business verification. Do not copy a third-party limit or claim all these approvals are universally required. [Authoritative Reels guide](https://developers.facebook.com/docs/video-api/guides/reels-publishing/), [Permission reference](https://developers.facebook.com/docs/permissions/reference/pages_manage_posts/)

## Repository-specific integration proposal

The current [publisher](../../scripts/publish-video.py) already implements YouTube private uploads and Facebook Page Reel drafts. It defaults to a dry run and requires `--execute`, `PUBLISH_ENABLED=1`, a TTY, and typing `UPLOAD`. It therefore cannot currently act as an unattended public-publishing worker. Its duration check is a local 4–60 second policy, not a verified current universal Meta limit.

The publisher checks the slug's Gate C through [pipeline.py](../../scripts/pipeline.py), but accepts an independently supplied `--file`; it does not prove that this is the exact reviewed final artifact. Bind the canonical output path and checksum to the successful final review before queueing anything. The production pipeline has no automatic publish hook today.

Recommended implementation sequence:

1. Add an explicit publishing configuration per video: destinations, platform-specific title/description, visibility, and timing. Keep current private/draft behavior until the requested public mode is deliberately implemented.
2. Enqueue the reviewed artifact only after Gate C passes. Define how authorization for unattended publishing replaces the current mandatory interactive approval; do not silently bypass it.
3. Extend the existing SQLite per-platform records with remote ID persistence immediately after creation, upload-session checkpoints, processing/publishing status polling, and reconciliation. Handle one platform succeeding while the other fails, without uploading the successful destination twice.
4. Provision OAuth/Page credentials securely. The host Python publisher reads `os.environ` and does not load `.env` automatically; startup must inject these variables or explicitly implement loading. Never print tokens or place them in evidence files.
5. Verify the live target channel/Page and media eligibility in a controlled private/draft upload before enabling the public destination mode.

No runtime code or publishing settings were changed by this research.
