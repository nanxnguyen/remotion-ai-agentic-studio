# Live integrations and strict delivery contracts

Source repository (verify current): `nanxnguyen/remotion-ai-agentic-studio`
Skill: `.claude/skills/ray-emotional-stick-shorts/SKILL.md`
Parent: `.claude/skills/ray-video-10-phut/SKILL.md`
Pipeline: `.claude/skills/ray-pineline-worflow-agent/SKILL.md`
Archive policy: `docs/production-archive-policy.md`

## Vbee Batch default

Use GitHub Actions bridge with repository Secrets `VBEE_APP_ID` and `VBEE_ACCESS_TOKEN`. Batch needs an HTTPS webhook URL; deployed non-secret acknowledgement callback is currently `https://iehmucsshklgjmxqyggp.supabase.co/functions/v1/vbee-batch-callback`. Follow real workflow `.github/workflows/vbee-audition.yml`, Vbee script `.claude/skills/ray-emotional-stick-shorts/scripts/vbee_tts.py` and reference `references/vbee-provider.md`; status polling is authoritative. Voice code `hn_male_thanhlong_talk_48k-fhg` is a reference, confirm live availability. RealTime Vbee API is not a valid automatic backup for the user's package. Never fabricate audio; when blocked state truthfully.

## GitHub and vidIQ

Production stage gates always follow the current code/schema. After verified final MP4 with speech and BGM, archive as draft GitHub Release using `.github/workflows/archive-finished-video.yml`, verify actual binary and hash. Commit approved sources and manifests, not raw MP4 into Git history.

vidIQ upload from verified full AV file only, via actual connected tools (when available). Save durable `uploadId`. Fetch a fresh download URL by ID when user asks; signed URLs expire, so don't promise a permanent vidIQ page. Do not publish YouTube, merge a PR or share a private video without explicit permission.

Fallback: if connected action is unavailable, report the exact step blocked; deliver just reviewed creative assets, not an invented full video or media link.
