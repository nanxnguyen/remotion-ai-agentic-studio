# Saved ChatGPT skill/plugin sources

This directory retains installable source packages for the user's private ChatGPT plugins.

| Name | Purpose | Agent skill mirror |
|---|---|---|
| `ray-phim-ke-chuyen` | Original cinematic storytelling films, Vbee Batch TTS, Remotion, QA, voice-only revision | [`.claude/skills/ray-phim-ke-chuyen/`](../.claude/skills/ray-phim-ke-chuyen/) |
| `shorts-to-remotion` | Source video analysis, frame extraction, storyboard and Remotion planning | [`.claude/skills/shorts-to-remotion/`](../.claude/skills/shorts-to-remotion/) |
| `thanh-hai-learn-ai-2d-studio` | Code-drawn stick-figure animation studio (v0.5.0): animation principles, Vietnamese lip-sync, "Evolution of X" and mascot-explainer formats, golden-frame tests | `.claude/skills/{make-2d-video,new-video,render-video,video-sound,video-styles,evolution-video,mascot-explainer}/` (symlinks into the plugin) |

The `plugin.json` packages and `.claude/skills` versions are deliberately mirrored for different runtimes. Keep them in sync when editing. All video binaries belong in **draft GitHub Releases**, not Git commits. See [storage policy](../docs/production-archive-policy.md).

`thanh-hai-learn-ai-2d-studio` keeps its own tests and packager: `plugins/thanh-hai-learn-ai-2d-studio/scripts/build-plugin.sh` runs unit + golden-frame tests, validates the manifest and package paths, and writes `dist/thanh-hai-learn-ai-2d-studio.plugin`. Its `.claude/skills` entries are symlinks, so there is one source to edit.
