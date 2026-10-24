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

## Mandatory GitHub + Google Drive archive and dual-link delivery

The user requires saving each verified MP4 to **both Google Drive and a private GitHub draft Release** and receiving **both verified URLs** in the routine video report.

1. Produce and independently QA the **real final H.264/AAC MP4**; upload to a producing GitHub Actions run artifact \`final-video\`. Gate evidence is mandatory; a proposed QA pass does not count.
2. In the production workflow, follow the upload-artifact step with a job that calls \`./.github/workflows/archive-finished-video.yml\` via \`workflow_call\`: set \`video_slug\`, \`source_run_id: \${{ github.run_id }}\`, \`artifact_name: final-video\`, \`qa_approved: true\` only after verified QA. The reusable workflow exposes \`needs.<job>.outputs.video_url\`, \`release_url\`, \`sha256\`.
3. The archive workflow checks the final GitHub Release asset **byte size and SHA-256 where supported by GitHub**, retrieves its real \`browser_download_url\` and \`html_url\`, and writes them in the **Actions Job Summary** and a downloadable \`github-video-links-<slug>\` JSON artifact. Never generate a plausible URL without verifying the release actually contains the MP4.
4. On completion, upload the exact verified MP4 to Google Drive, verify its metadata/returned URL, and send **both** **[▶ Xem video trên Google Drive]** and **[⬇ Tải MP4 trên GitHub]** (the actual verified GitHub Release asset URL).
5. Draft Releases are private-to-repository collaborators until published; authenticated GitHub access can be necessary. Do not publish a draft or change repository visibility without separate approval.
6. If video archive is blocked, mark the GitHub link **pending**, explain the exact missing binary/upload/permission/QA, and do **not** claim GitHub delivery completed. An Actions run ID or text manifest does not substitute for the binary.
7. Voice-only edits create a new revision/release; retain earlier versions. Do not overwrite the only copy of a successful older MP4.

### Archiving a locally rendered video

For a final MP4 rendered outside GitHub Actions, the repository now provides a CLI uploader with **real media verification**:

```bash
# Requires GitHub CLI login (gh auth login), ffprobe and Python 3
scripts/archive-local-final-video.sh /path/to/verified-final.mp4 my-video-slug
```

It creates a **draft** GitHub Release, uploads the binary and metadata, then confirms the real MP4 asset's byte size and SHA-256 before printing `video_url` and `release_url`. Keep the verified GitHub URLs in the archive/production manifest and include the actual GitHub MP4 download link alongside the Drive link in the default user-facing report. Do not attempt it without actual repository authorization; this chat's GitHub connector cannot itself send raw MP4 bytes to GitHub Releases.

For the previously rendered **Room 404** video (available in the conversation workspace), the intended invocation is:

```bash
scripts/archive-local-final-video.sh room404_cinematic_VBEE_voice_revised.mp4 room404-vbee
```

Do not report Room 404 as archived until this upload actually succeeds.


## Dual-location video archive and BOTH review links (updated 2026-10-24)

For every NEW_FILM and revised story video:
1. Finish real render and media QA first; never claim an MP4 is complete before validating it.
2. Save the **same approved MP4** in **both** destinations: (a) Google Drive, for in-browser preview, and (b) a draft GitHub Release, for versioned archiving. Verify each destination independently using actual stored metadata, filename, byte size, and SHA-256 where available. Do not commit finished MP4 into regular Git history.
3. Drive upload: pass a genuine generated/connector file reference into `mcp__Google_Drive__upload_file`, `mime_type="video/mp4"`; read back Drive metadata including verified URL, size, and MIME type. **Verify viewer access**: Drive may be private to the owning Google account; do not claim a URL is publicly playable without checking permissions. For an access issue, ask the user to use the connected Google account, or obtain explicit consent before sharing more broadly. Google Drive preview transcoding may take time; metadata alone does not prove playback.
4. GitHub archive: upload actual validated MP4 bytes to a **draft Release** using the approved GitHub workflow/local uploader, and verify Release asset filename, byte count, checksum and the returned URL. A GitHub PR containing only source/docs is **not** an archived MP4.
5. **Default user-facing production report MUST INCLUDE BOTH verified links**, in this order: **[▶ Xem video trên Google Drive]** (actual Drive `webViewLink`/returned URL) and **[⬇ Tải MP4 trên GitHub]** (actual verified Release asset download URL). GitHub Release page can be added if useful. Include a compact 9:16 resolution, FPS, duration and QA note.
6. If either destination fails or is not accessible, explicitly label it **pending/permission restricted** and explain the precise blocker. Never invent URLs or describe a chat download, source-code PR, or unuploaded MP4 as the GitHub Release asset. Share an actually accessible preview alternative when necessary.
7. Keep Google Drive files private by default and GitHub Releases in **draft**. Never broaden Drive sharing, publish a Release or publish on YouTube without separate authorization.

**This latest requirement supersedes the earlier preference to report only Google Drive links.** Both destinations remain mandatory, and **both links** are required in the routine report once actually verified.
