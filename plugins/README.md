# Saved ChatGPT skill/plugin sources

This directory retains installable source packages for the user's private ChatGPT plugins.

| Name | Purpose | Agent skill mirror |
|---|---|---|
| `ray-phim-ke-chuyen` | Original cinematic storytelling films, Vbee Batch TTS, Remotion, QA, voice-only revision | [`.claude/skills/ray-phim-ke-chuyen/`](../.claude/skills/ray-phim-ke-chuyen/) |
| `shorts-to-remotion` | Source video analysis, frame extraction, storyboard and Remotion planning | [`.claude/skills/shorts-to-remotion/`](../.claude/skills/shorts-to-remotion/) |
| `thanh-hai-learn-ai-2d-studio` | Code-drawn stick-figure animation studio (v0.5.2): animation principles, Vietnamese lip-sync, `tihon.js` v3.0, algorithmic retention (`<=28s` intro, `spotTracker`, Vbee-first), "Evolution of X" and mascot-explainer formats, golden-frame tests | `.claude/skills/{make-2d-video,new-video,render-video,video-sound,video-styles,evolution-video,mascot-explainer}/` (symlinks into the plugin) |
| `truyen-ma-2d-studio` | Code-drawn & illustrated 2D/2.5D Vietnamese horror story studio (v0.3.0, engine synced with Thanh Hai 0.5.2, 51-frame golden test incl. horror sets): Option A (`make-horror-video-code`), Option B (`make-horror-video-illustrated`), Option C (`make-horror-video-ditap` — Dạ Hành Dị Tạp 25–35 min folklore horror style), horror & ditap engines (`engine/horror.js`, `engine/ditap.js`), scare curve linter (`scare_lint.py`), procedural horror audio, Vbee TTS, A/B thumbnail generator (16:9 + 9:16), Google Drive `Videos-shorts` delivery via `$VIDEOS_SHORTS_FOLDER_ID` | `.claude/skills/{make-horror-video,make-horror-video-code,make-horror-video-illustrated,make-horror-video-ditap,horror-story-writer,horror-package}/` (symlinks into the plugin) |
| `youtube-agent-skill` | Upstream MIT YouTube channel toolkit (`jakeschincariol/youtube-agent-skill`) with bilingual (EN + VI) support in `hookscore.py` and `title.py`: 11 skills (`yt-script`, `yt-package`, `yt-edit`, `yt-comment`, `yt-plan`, `yt-viral`, `yt-retention`, `yt-shorts`, `yt-seo`, `yt-chapters`, `yt-audit`) and 6 zero-dependency Python tools | `.claude/skills/yt-*/` & `.agents/skills/yt-*/` (symlinks into the plugin) |

The `plugin.json` packages and `.claude/skills` versions are deliberately mirrored for different runtimes. Keep them in sync when editing. All video binaries belong in **draft GitHub Releases**, not Git commits. See [storage policy](../docs/production-archive-policy.md).

`thanh-hai-learn-ai-2d-studio` keeps its own tests and packager: `plugins/thanh-hai-learn-ai-2d-studio/scripts/build-plugin.sh` runs unit + golden-frame tests, validates the manifest and package paths, and writes `dist/thanh-hai-learn-ai-2d-studio.plugin`. Its `.claude/skills` entries are symlinks, so there is one source to edit.
