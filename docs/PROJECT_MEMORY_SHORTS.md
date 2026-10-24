# AI Edition Video — Standing production memory

## Universal rule for every new video topic

Every video about any topic must follow the creator's retention-oriented storytelling formula for both **YouTube Shorts** and **TikTok**. This is a mandatory creative rule for scripting, storyboarding and editing, even if initially delivering to only one platform. Create three possible hooks, select a concrete instantly comprehensible visual within **0–2 seconds**, build a **4–6-second hook** with reaction and open question, then add new meaningful beats every **~3–6 seconds**, a causally earned climax/reveal and a concise visually satisfying payoff. Adapt beats to 30–45s emotional shorts or 45–60s stories. Adapt the pacing and ending to the exact duration. Produce platform-native YouTube title/thumbnail and TikTok cover/caption/safe-area layout when posting assets are requested. This is a creative optimization, not a guarantee of a million views or a claim about platform ranking algorithms.

**Agent rules:** https://github.com/nanxnguyen/remotion-ai-agentic-studio/blob/main/AGENTS.md

**Emotional stick figure production skill:** https://github.com/nanxnguyen/remotion-ai-agentic-studio/blob/main/.claude/skills/ray-emotional-stick-shorts/SKILL.md

**Broader story video skill:** https://github.com/nanxnguyen/remotion-ai-agentic-studio/blob/main/.claude/skills/ray-phim-ke-chuyen/SKILL.md

## Required YouTube Shorts + TikTok preflight

For each new film: create three candidate hooks; select the first 0–2s visual that makes the conflict instantly understandable; finish the attention/curiosity beat by 4–6s; insert meaningful plot or visual change about every 3–6s; deliver a motivated climax and a concise memorable payoff. Use story-specific character and environment bibles. Sync real voice to action. Review the first six seconds, climax and ending. For YouTube consider viewed-versus-swiped and retention; for TikTok consider watch time, completion, rewatch and sharing when those metrics are available. Test using real analytics; do not invent viral view guarantees.

## Default emotional Shorts workflow

30–45s vertical 9:16 1080x1920; purposefully distinct shots, character bible and consistent environmental storytelling, truthful motion review, Vbee Batch API narration (Thanh Long when appropriate) from GitHub Secrets, matched narration duration, original/licensed piano under voice, Remotion/FFmpeg and repository pipeline gates, ffprobe MP4 QA and actual subjective listening. Archive verified complete audio/video media. vidIQ import is not a YouTube publish operation. Never expose access tokens or store expiring signed URLs; save durable upload IDs.

## Google Drive final delivery: required for EVERY completed video

Use the connected Google Drive parent folder **Videos-shorts** at:
https://drive.google.com/drive/folders/1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D

**One video = one numbered folder.** Before each new upload, enumerate its immediate existing subfolders; allocate **max leading integer + 1** (starting at 1; never reuse gaps). Name the folder exactly `N. Video title - YYYY-MM-DD` using the production date in **Asia/Ho_Chi_Minh**. Reuse a folder for revisions of the same video. The folder is currently named `Videos-shorts` on Drive even though the user calls it `Video-shorts`; use the exact folder URL/ID. On the verification date 2026-10-24, #1 and #2 existed, so #3 was next *then*; always re-list because the number can change.

Every video folder must contain **all three verified real files**:

1. `final.mp4` — approved complete video with voice and soundtrack (as required), pass appropriate ffprobe/QA.
2. `thumbnail.png` or `thumbnail.jpg` — extremely compelling, beautiful, cinematic/dramatic **story-specific** original artwork; **vertical 9:16 for Shorts**, **horizontal 16:9 for long videos**. Legible mobile-first typography, correct Vietnamese accents, credible imagery; not a contact sheet or placeholder.
3. `youtube-title-description.txt` — UTF-8 ready-to-paste **YouTube TITLE + DESCRIPTION** with relevant hashtags and optionally a pinned comment; optimize curiosity, emotion and truthful story relevance according to the mandatory YouTube Shorts + TikTok retention playbook. If TikTok copy is requested, add a separate section/file, but never omit YouTube text.

Upload full actual binary assets into that exact numbered folder and read back all three Drive file records (correct parent, nonzero sizes, accessible links). Share the **folder URL + links to video, thumbnail and publishing text**. Do not mark successful until all three are verified. Do not change sharing or post publicly without approval. For full steps and quality gates, read [Google Drive Video Archive Contract](GOOGLE_DRIVE_VIDEO_ARCHIVE.md).

## Usage in another ChatGPT conversation

Ask the assistant to inspect the repository agent instructions and the relevant Ray skill before it creates a script or renders a video. All future videos must apply the YouTube Shorts + TikTok retention rule. To make this file available directly within your current ChatGPT Project, add it to the Project's Files/Knowledge. The project attachment operation is not automatically performed by writing this file.
