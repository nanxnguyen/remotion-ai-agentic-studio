# Canonical skills and finished-video archive

This repository is the permanent source of truth for **video production skills and the deliverables they create**, not merely a collection of ChatGPT downloads.

## Skills

- Agent-readable skills live under `.claude/skills/<name>/`.
- Reinstallable private ChatGPT plugin sources live under `plugins/<name>/`, including `plugin.json` and `skills/<name>/SKILL.md`.
- Update both when a skill changes; review with a PR and follow `AGENTS.md`.
- Existing `ray-emotional-stick-shorts`, `ray-video-10-phut` and the canonical production pipeline remain authoritative; these new skills complement rather than bypass them.
- Never commit Vbee tokens, GitHub Secrets, personal voice samples, private media, or temporary signed URLs.

## Finished videos

A **final, QA-verified MP4** must be preserved in this GitHub repository as a **draft GitHub Release asset**, separate from Git history. The release includes:
1. `<video-slug>-final.mp4` with visible video and audible narration (and music when required).
2. `<video-slug>-metadata.json` with SHA-256, duration, source Actions run, and codec/resolution.
3. Matching metadata entry in `docs/<video-slug>/asset-manifest.md`, including tag, original script version and QA evidence.

Final status is **archived** only after confirming that the Release contains the real MP4 with the expected checksum. A successful workflow or a note in Git is not proof by itself.

Use **`.github/workflows/archive-finished-video.yml`** after the producing workflow has:
- Finished the full render and completed required canonical review gates;
- Uploaded the verified final MP4 to a private Actions artifact (one MP4 per artifact);
- Recorded a tested source run ID and artifact name.

From **Actions → Archive finished story video → Run workflow**, specify `video_slug`, `source_run_id`, `artifact_name`, and affirm `qa_approved` only after real QA. The archive workflow downloads that video artifact, checks media streams, computes SHA-256 and creates a **draft release** tagged `video-<slug>-run-<source_run_id>`. For automation, the production workflow can call it using `workflow_call` once its upload and QA jobs succeed. Archive failure blocks an "archived" claim, not the honest availability of a separate MP4.

GitHub Actions artifacts expire according to retention; **draft Release assets do not inherit that artifact expiry**. Draft Releases are not public video publishing; permission to publish/share is separate. Avoid changing `AGENTS.md`'s rule against committing rendered MP4 into Git history; GitHub Releases is the designated binary archive.

If the video was rendered only in a local/chat container and not in Actions, use authenticated GitHub CLI locally to upload it into a draft Release, or first import it into a restricted Actions artifact. **Do not claim an unuploaded local MP4 is stored in GitHub.**

## Previously produced example

The verified Room 404 Vbee video is `room404_cinematic_VBEE_voice_revised.mp4`, 55 seconds, 720×1280, H.264/AAC, with the shorter closing line. Its source media currently exists in the conversation workspace, and **must not be marked as archived to GitHub until its actual MP4 is uploaded** through the approved media route. Associated Vbee narration script/workflow are on `feat/room404-vbee-narration` until integrated into the main codebase.
