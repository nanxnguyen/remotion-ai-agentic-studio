# Integration registry (non-secret)

## GitHub
Repository: `nanxnguyen/remotion-ai-agentic-studio`; parent: `.claude/skills/ray-video-10-phut`; canonical: `.claude/skills/ray-pineline-worflow-agent`. Verify tools and current repo rules live each session. Keep this registry free of passwords, tokens, cookies and signed download URLs.

## vidIQ
Use connected `vidiq_compose`, `vidiq_job_poll`, `vidiq_video_upload` when discovered. Compose reviewed visual assets + voice/audio, poll job, import MP4 into workspace, store `uploadId`, then refresh the signed URL by uploadId. Imported ≠ YouTube published.
Approved V5 reference: compose job `job_64fe2b9f-1b2b-4845-b638-aa9b2b497e1e`; uploaded vidIQ video ID `77989417-3fb0-41b7-99a1-5d0192163f75`. Do not store stale signed S3/Google URLs.
Video #12 compose job: `job_405d8ccb-1d05-422a-b808-c1626a11ebf1`; completed 42.6s; full media not yet copied to repo. See project manifest.

## HeyGen
Use connected `create_speech`, `import_asset_from_chat`, `get_asset` when available. Reference speaker Paul – Soothing, catalog voice ID `046dacc3502347eea0c796f97399632e`; validate the actual active catalog and voice each run. Video #12 HeyGen speech duration ~38.635s; preview footage asset `f93bc3c10ab54516b7a15388ce211763`. Voice tracks and temporary URLs are not durable; re-fetch or regenerate only with required approval.

## YouTube
Reference channel Tiger Bạc / @ray-simple / `UC4zHyyv2YnYGv1xbyuZzteA`; channel name never narrated by default. Project has `scripts/publish-video.py` for private YouTube Data API route; inspect current code and gates before use. Do not auto-publish. Previously Metricool returned account-limit failure: never mark scheduled without confirmation.

## Security and quality
Use app auth at runtime. No secrets, API keys, OAuth token values or presigned links in skill. Never confuse finished compose job, accessible local MP4 and published YouTube video. Check downloaded MP4 audio/video streams and listen before release.
