---
name: shorts-to-remotion
description: "Use when the user provides a YouTube Shorts URL, connected Google Drive video, uploaded MP4, GitHub Actions artifact, or storyboard and wants reference analysis, scene breakdown, a fresh Vietnamese Shorts script, or a Remotion-ready vertical video."
---

# Shorts → Remotion Studio

Goal: turn a legitimately accessible reference video into an **original** Vietnamese short-form video (usually 9:16, 45–60 seconds) with an executable, reusable production package.

## Invoke and scope

Trigger for "phân tích video này", "làm video tương tự", "lấy frame từ Google Drive", "viết kịch bản Shorts", "dựng bằng Remotion", or uploads of MP4 with a creation request.

Accept any one input: attached MP4, exact connected Google Drive file, user-supplied Drive ID/link, GitHub Actions artifact, or YouTube URL. If a user has already provided an MP4 or a readable Drive file, **never require them to re-upload or manually rehost** just to proceed. Prefer analyzing the accessible file directly and only use a GitHub workflow if requested or useful. If no topic is given, choose an appropriate original topic and clearly label the choice. Do not ask for nonessential confirmation.

## Reference ingestion (prefer fastest path)

1. Confirm existing media and rights/availability. Get duration, aspect, frame rate, audio via ffprobe if local. Use accessible original MP4 or artifact for actual visuals; never pretend transcript/thumbnail alone is video analysis.
2. For an exact connected Drive file, resolve provided exact file ID using Google Drive tools; do not guess/search by similar name. Verify MIME (`video/mp4`) and access. Preserve existing sharing settings. If running a public GitHub runner, explain that **Anyone with the link → Viewer** is required for `gdown`; never grant public Editor or change permissions without explicit instruction. Do not expose IDs, private auth URLs, cookies or credentials in logs, commit, or public workflows.
3. For user-requested GitHub Actions, use the connected GitHub app and workflow `.github/workflows/extract-youtube-frames.yml` in the selected repo (default to previously provided `nanxnguyen/remotion-ai-agentic-studio` if still relevant). Use `source_mode=google_drive`, `runner=github-hosted`, `drive_file_id=<exact verified ID>`, `fps=1` or `2`. The file must be accessible to an unauthenticated runner. Artifact name `youtube-reference-frames` contains `frames/frame_*.jpg`, `contact-sheet.jpg`, `ffprobe.json`, `README.txt`. Never hardcode an individual's Drive ID into the final workflow; use workflow_dispatch inputs. Temporary push-trigger tests must be removed after validation. Do not claim dispatch or completion without observing a real run; if dispatch unavailable, use permitted test trigger or give exact manual step rather than inventing results.
4. Direct HTTPS MP4 is valid via `source_mode=mp4_url`; plain YouTube video URL via yt-dlp on GitHub-hosted has previously failed due to HTTP 429/LOGIN_REQUIRED, even with BgUtils. Prefer Drive/file/self-hosted. Do not repeatedly hammer a blocked origin.
5. Read metadata and build a contact sheet with time labels at 1–2 FPS. Identify scene boundaries, actual subtitle treatments, framing, pacing, moving vs static footage, audio, sound effects, blur-fill strategy, LUT and CTA. Clearly mark inferred vs observed details.

## Build an *original* new video

1. Extract a **style blueprint**, not copyrighted script/frames. For the supplied reference genre use fast Vietnamese voiceover, vertical canvas, scene changes on beats, bold center-lower subtitles, white text with dark outlines and turquoise/yellow emphasis, punchy hook, and tension build. Adjust only from observed reference.
2. Propose or select a **different topic**; avoid reusing identities, distinct text, frames, audio, or claims from the source. For historical/true-crime subjects verify facts with trustworthy sources and qualify uncertainty. For fictional subjects explicitly mark 'Câu chuyện hư cấu' somewhere appropriate.
3. Produce 45–60-second video script as a time-coded table: `in/out`, `voiceover`, `visual prompt`, `on-screen text`, `motion`, `SFX`. Target 110–145 Vietnamese words at normal VO pace, validate actual read duration before rendering.
4. Offer a stronger 1–3s hook, 3–6 visually distinct beats, conflict/escalation, payoff and CTA. Subtitles legible in safe zone; roughly 3–8 words / 2 lines per beat. Avoid placing captions over YouTube/TikTok controls.
5. Generate a self-contained **Remotion composition** and editable data/timeline when code authoring is requested; include assets or clearly labeled placeholders. Use React and typed props, interpolate/spring/Easing, `<AbsoluteFill>`, `<Sequence>`, `<Audio>`, and frame-exact timing. Keep hooks declarative and audio/visual synchronization explicit. Follow existing repo conventions. Provide npm render/test commands. If direct rendering tool is available, export MP4 and contact sheet; otherwise be precise about what was produced.
6. Verify export: 1080×1920 or 720×1280, H.264 MP4, 25/30 FPS, AAC audio if included, no missing assets, total duration, subtitle clipping, transitions, original/not misleading claims. Never claim narration or audio exists if silent.
7. Deliver user-ready links to actual verified files/artifacts, summary of what is complete vs pending, and concise next steps. Archive may expire (GitHub retention often 7 days).

## Responses and failure handling

- Language: Vietnamese, concise and action-oriented.
- If user provides file and asks for 'làm luôn', start production without asking about unprovided style details; state chosen original topic.
- If `gdown` v6 reports `unrecognized arguments: --id`, use `gdown "${DRIVE_FILE_ID}" -O output/source.mp4` (positional argument).
- If YouTube `HTTP 429`, never claim BgUtils guarantees a fix; use the already uploaded source.
- If the artifact link doesn't open, verify run and artifact ID; when permitted, download artifact through GitHub connector and attach actual local ZIP. Never invent a link.
- If user requests a future automatic check, schedule automation only if appropriate and report its scope accurately.
- Do not merge PR, publicize a private file or broaden Google Drive sharing without explicit authorization.

Consult [Storyboard and rendering playbook](references/storyboard-and-rendering.md) for the reusable scene skeleton, export criteria and tests.

## Bắt buộc: lưu skill và video hoàn chỉnh vào GitHub

- Repo nguồn chính: `nanxnguyen/remotion-ai-agentic-studio`.
- Khi tạo hoặc sửa skill/plugin, lưu mã nguồn tại `.claude/skills/<skill-name>/` và bản plugin tái sử dụng tại `plugins/<plugin-name>/`; không coi plugin chỉ lưu trên ChatGPT là đã hoàn tất việc lưu mã nguồn.
- Sau khi MP4 cuối đã kiểm tra đầy đủ kịch bản, lời đọc, hình ảnh, âm nhạc, captions và render gates, **tự động chuyển MP4 thật đến draft GitHub Release của chính repo đó**. Nếu xuất từ GitHub Actions, upload final MP4 thành artifact rồi gọi `.github/workflows/archive-finished-video.yml` với `qa_approved=true`, `video_slug`, `source_run_id`, `artifact_name`. Lưu thêm metadata SHA-256/codec/thời lượng và release tag trong `docs/<vid>/asset-manifest.md`.
- Tránh đưa MP4 vào Git commits. Draft Release là lưu trữ, không phải công bố video; không công khai release hay đăng YouTube nếu chưa có yêu cầu riêng. Khi không có khả năng truyền MP4 sang GitHub, báo rõ GitHub archival **chưa hoàn tất**, không gắn nhãn archived.
- Đọc `docs/production-archive-policy.md` và repo `AGENTS.md` ở phiên bản mới nhất trước khi thao tác.

