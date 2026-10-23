# YouTube reference-frame extraction (GitHub Actions)

Workflow: [Extract YouTube Shorts Frames](../.github/workflows/extract-youtube-frames.yml)

This workflow extracts 1, 2 or 5 frames per second, builds a contact sheet, and uploads a `youtube-reference-frames` artifact. It does **not** archive the source video. Use only media you have rights to access and analyze.

## How to run

After this pull request is merged into `main`, open **Actions → Extract YouTube Shorts Frames → Run workflow** and select:

| Input | Meaning |
|---|---|
| `source_mode: google_drive` | Download a Google Drive video by ID using `gdown`. Recommended for GitHub-hosted runners. |
| `drive_file_id` | Drive ID from the `/file/d/FILE_ID/view` link, not the full link. Required for `google_drive` mode. |
| `source_mode: youtube` | Download a YouTube URL via yt-dlp. |
| `source_mode: mp4_url` | Download a direct, publicly reachable HTTPS MP4 file. Not a webpage, not a YouTube URL. |
| `source_mode: demo` | Generate a short synthetic test video to verify extraction. |
| `runner: github-hosted` | No custom machine required. Recommended for `demo` and `mp4_url`. |
| `runner: self-hosted` | Runs on a user-operated Linux x64 runner. Recommended for `youtube`. |
| `fps` | 1, 2 or 5 frames/sec. |
| `use_bgutils` | Optional BgUtils PO Token provider in YouTube mode; requires Docker. |

### Recommended: Google Drive source

1. Upload your MP4 to Google Drive.
2. Set **General access → Anyone with the link → Viewer**. Never use **Editor** on a public file.
3. Copy the file ID from the Google Drive sharing link.
4. Run with `source_mode=google_drive`, `runner=github-hosted`, `drive_file_id=YOUR_FILE_ID` and choose FPS.
5. Download the `youtube-reference-frames` artifact in the completed run.

**Verified:** The GitHub-hosted run [#39902573740](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/39902573740) downloaded a user-provided 10.4 MB Google Drive MP4 via `gdown` and extracted **55 frames at 1 FPS**. The [artifact](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/39902573740/artifacts/12479780818) was uploaded successfully. Source input is deliberately not hardcoded in the final workflow.

GitHub-hosted runners have previously received HTTP 429 and `Sign in to confirm you're not a bot` when downloading video `k9JB4RDDpsw`. A public video does **not** imply that automated requests from cloud IP ranges will work. BgUtils did not resolve this limitation in prior tests. Do not repeatedly retry a blocked IP.

## Set up a self-hosted runner

1. On a **trusted Linux x64 machine** that can reach YouTube, open the repository's **Settings → Actions → Runners → New self-hosted runner**.
2. Follow the installation and registration commands shown by GitHub for that specific machine. Do **not** paste registration tokens into this repository or ChatGPT.
3. Ensure `python3`, `python3-venv`, `curl`, and `node/npm` are installed. You may install `ffmpeg` + `ffprobe` to avoid npm downloads. Docker is only needed if `use_bgutils` is enabled.
4. Start the runner and verify GitHub displays it as **Idle / Online**. It must have the default labels `self-hosted`, `linux`, and `x64`.
5. Once the workflow is on `main`, run with `source_mode=youtube`, `runner=self-hosted`, and the video URL.

If you do not have a self-hosted machine, use `source_mode=google_drive` or `source_mode=mp4_url` on `runner=github-hosted`.

### Security note

Self-hosted runners on public repositories can be exposed to untrusted code if misconfigured. Use a dedicated, minimally privileged machine or container and avoid secrets. This workflow is intentionally **manual only** after the smoke test and does not check out arbitrary repository code.

## Expected artifact

`youtube-reference-frames` includes:
- `frames/frame_0001.jpg`, `frame_0002.jpg`, etc.
- `contact-sheet.jpg`
- `ffprobe.json`
- `README.txt`

Artifact retention: **7 days**.

## Troubleshooting

- Google Drive `gdown` download fails: check that the file ID (not the full link) is correct and sharing is set to **Anyone with the link → Viewer**. Files requiring sign-in or quota-limited downloads may fail.
- `HTTP 429` or `LOGIN_REQUIRED`: YouTube blocked the network session; run on a different legitimately accessible network or provide a direct MP4.
- `python3 -m venv` fails: install `python3-venv` on the self-hosted machine.
- `npm` missing: install Node.js/npm or FFmpeg/FFprobe on the runner.
- Job stays queued with `self-hosted`: check that the runner is online and has Linux/x64 labels.
- `ffprobe` fails in MP4 mode: the URL probably serves HTML, needs authentication, or returned an invalid video file.
