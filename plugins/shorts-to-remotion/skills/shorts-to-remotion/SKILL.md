---
name: shorts-to-remotion
description: "Use when the user provides a YouTube Shorts URL, connected Google Drive video, uploaded MP4, GitHub Actions artifact, or storyboard and wants reference analysis, scene breakdown, a fresh Vietnamese Shorts script, or a Remotion-ready short or long-form video."
---

# Shorts → Remotion Studio

Goal: turn a legitimately accessible reference video into an **original** Vietnamese video, preserving the required script/voice/caption/scene synchronization with a reusable, executable Remotion production package. Defaults: **Short = vertical 9:16**, **long-form = horizontal 16:9**, **30 fps** with **60 fps** for high-motion, and **Be Vietnam Pro ExtraBold** for spoken captions.

## Mandatory production policy (highest priority)

**Before any production, revision, QA or finalization, read and enforce [Production Standards v1](references/production-standards-v1.md).** These rules supersede any conflicting earlier example, reference or generic target in this skill (such as "25/30 FPS", treating all videos as 9:16, or forcing every short to 45–60 seconds):

1. **Giọng nói, câu chữ và cảnh khớp 100%:** lock the real final voice, compare verbatim narrated words with on-screen speech captions, derive subtitle/highlight timing from that very audio and verify each line matches its simultaneous visual beat. Automated speech recognition is a timing aid, **not** definitive proof; human audio/frame review is mandatory for a 100% claim. Any unverified mismatch blocks FINAL status.
2. **Không có khoảng ngừng dài:** edit spoken segments for natural continuity, normally ~0.12–0.40s between clauses; flag unexpected pauses over **0.65 seconds** within narration. Intentional dramatic pauses must be justified on a shot list. Derive video duration from real speech, not arbitrary padding.
3. **FPS mặc định 30–60:** export at 30 fps by default; use 60 fps for motion-heavy content. Don't silently use 24/25 fps; validate final constant frame rate via ffprobe.
4. **Shorts = 9:16 (1080×1920)** and **long-form = 16:9 (1920×1080)**; explicit user aspect-ratio requests take priority. Format is determined by intended platform/content, not only seconds of duration.
5. **Font Be Vietnam Pro ExtraBold** authentic local/self-hosted font at weight 800, with full Vietnamese glyph testing, is the preferred/default speech caption and title face. Avoid silent fallback or synthetic bold. Distinctive branded headline design may use a different font when required.

A release must pass real-voice identity, transcript-vs-captions, word and visual sync, silence, font, FPS, aspect, render, mobile-size view and human review gates. If any gate fails or cannot be verified, output a **REVIEW** version and explicitly report why rather than claiming 100%/FINAL. Keep approved finals untouched until authorized.

## Invoke and scope

Trigger for "phân tích video này", "làm video tương tự", "lấy frame từ Google Drive", "viết kịch bản Shorts", "dựng bằng Remotion", or uploads of MP4 with a creation request. Support long horizontal video as well as Shorts.

Accept any one input: attached MP4, exact connected Google Drive file, user-supplied Drive ID/link, GitHub Actions artifact, or YouTube URL. If a user has already provided an MP4 or a readable Drive file, **never require them to re-upload or manually rehost** just to proceed. Prefer analyzing the accessible file directly and only use a GitHub workflow if requested or useful. If no topic is given, choose an appropriate original topic and clearly label the choice. Do not ask for nonessential confirmation.

## Reference ingestion (prefer fastest path)

1. Confirm existing media and rights/availability. Get duration, aspect, frame rate, audio via ffprobe if local. Use accessible original MP4 or artifact for actual visuals; never pretend transcript/thumbnail alone is video analysis.
2. For an exact connected Drive file, resolve provided exact file ID using Google Drive tools; do not guess/search by similar name. Verify MIME (`video/mp4`) and access. Preserve existing sharing settings. If running a public GitHub runner, explain that **Anyone with the link → Viewer** is required for `gdown`; never grant public Editor or change permissions without explicit instruction. Do not expose IDs, private auth URLs, cookies or credentials in logs, commit, or public workflows.
3. For user-requested GitHub Actions, use the connected GitHub app and workflow `.github/workflows/extract-youtube-frames.yml` in the selected repo (default to previously provided `nanxnguyen/remotion-ai-agentic-studio` if still relevant). Use `source_mode=google_drive`, `runner=github-hosted`, `drive_file_id=<exact verified ID>`, sampling `fps=1` or `2`. The file must be accessible to an unauthenticated runner. Artifact `youtube-reference-frames` contains frame JPGs, contact sheet, ffprobe.json and README. Never hardcode an individual's Drive ID in final workflow. Remove temporary push-trigger tests. Do not claim completion without observing real runs; if dispatch unavailable, provide exact manual steps.
4. Direct HTTPS MP4 is valid via `source_mode=mp4_url`. Plain YouTube video URL via yt-dlp on GitHub-hosted previously failed HTTP 429/LOGIN_REQUIRED, even with BgUtils. Prefer Drive/file/self-hosted. Do not repeatedly hammer a blocked origin.
5. Read metadata and build contact sheets with time labels at 1–2 fps, showing scene boundaries. Analyze actual subtitle treatment, framing, pacing, moving vs static footage, audio, effects, blur-fill strategy, LUT and CTA. Clearly mark inference vs observation.

## Build an *original* new video

1. Extract a **style blueprint**, not copyrighted script/frames. Adapt to observed reference; never assume a landscape long-form video should be forced into vertical shorts. Use suitable hook, beats, captions, and accessible contrast for chosen genre.
2. Propose or select a **different topic**; avoid reusing identities, distinct text, frames, audio, or claims from source. For historical/true-crime verify facts and qualify uncertainty. For fictional subjects explicitly mark 'Câu chuyện hư cấu' when appropriate.
3. Prepare time-coded script/storyboard table: `in/out`, `voiceover`, `visual prompt`, `on-screen text`, `motion`, `SFX`. 45–60s and 110–145 Vietnamese words are optional *Shorts planning examples*, **not fixed targets**. Obtain or synthesize **real voice first**, measure actual read duration and build precise video timeline around it.
4. Plan a strong first 1–3s hook, visually distinct emotional beats, payoff and optional CTA. Keep captions legible in their format's safe zones, generally 3–8 words and up to 2 lines per beat; never drop spoken words merely to meet caption length: split into more caption beats instead. Avoid platform control overlays.
5. Generate a self-contained **Remotion composition** and editable scene/timeline when code requested; include actual assets or accurately labeled placeholders. Use React, typed props, `interpolate`/`spring`/`Easing`, `<AbsoluteFill>`, `<Sequence>`, `<Audio>`, and **frame-exact, real-voice-aligned timing**. Follow repo conventions. Provide npm render/test commands. If render available, export MP4 and contact sheet; otherwise state exactly what was produced.
6. Verify export: **1080×1920 / 9:16 Short** or **1920×1080 / 16:9 long form**, H.264, yuv420p, **30 or 60 fps**, AAC 48 kHz stereo when audio required, faststart, no missing assets, readable subtitles, exact script, scene sync and real-audio word timing. Full decode the export. Never claim narration if silent or if a substitute voice was used.
7. Deliver verified artifact links and succinct QA status, including mismatch and gap report. Keep REVIEW versions separate from approved FINAL. GitHub Actions archives may expire.

## Responses and failure handling

- Language: Vietnamese, concise and actionable.
- If user supplies media and says 'làm luôn', execute without nonessential questions.
- If `gdown` v6 rejects `--id`, use `gdown "${DRIVE_FILE_ID}" -O output/source.mp4`.
- If YouTube HTTP 429, never promise BgUtils always fixes it.
- If artifact link fails, verify actual run and artifact ID; do not invent a link.
- If user wants a future automatic check, schedule only when appropriate.
- Do not merge PR, expose private assets, change Drive access, or publish YouTube/TikTok without explicit authorization.

Consult [Storyboard and rendering playbook](references/storyboard-and-rendering.md) and [Video Quality Gates](references/video-quality-gates.md) for implementation and acceptance tests, **subject to the newer Production Standards v1**. Read [Videos-shorts storage SOP](references/videos-shorts-storage-sop-v1.md) for Drive storage.

## Bắt buộc: lưu skill và video hoàn chỉnh vào GitHub

- Repo nguồn chính: `nanxnguyen/remotion-ai-agentic-studio`.
- Khi tạo hoặc sửa skill/plugin, lưu mã nguồn tại `.claude/skills/<skill-name>/` và bản plugin tái sử dụng tại `plugins/<plugin-name>/`; không coi plugin chỉ lưu trên ChatGPT là đã hoàn tất việc lưu mã nguồn.
- Sau khi MP4 cuối đã kiểm tra đầy đủ kịch bản, lời đọc, hình ảnh, âm nhạc, captions và render gates, **tự động chuyển MP4 thật đến draft GitHub Release của chính repo đó**. Nếu xuất từ GitHub Actions, upload final MP4 thành artifact rồi gọi `.github/workflows/archive-finished-video.yml` với `qa_approved=true`, `video_slug`, `source_run_id`, `artifact_name`. Lưu thêm metadata SHA-256/codec/thời lượng và release tag trong `docs/<vid>/asset-manifest.md`.
- Tránh đưa MP4 vào Git commits. Draft Release là lưu trữ, không phải công bố video; không công khai release hay đăng YouTube nếu chưa có yêu cầu riêng. Khi không có khả năng truyền MP4 sang GitHub, báo rõ GitHub archival **chưa hoàn tất**, không gắn nhãn archived.
- Đọc `docs/production-archive-policy.md` và repo `AGENTS.md` phiên bản mới nhất trước khi thao tác.

## Bắt buộc trả link MP4 trên GitHub sau mỗi video hoàn tất

- Mỗi tác vụ **NEW_VIDEO hoặc VOICE_ONLY** chỉ báo "hoàn tất và đã lưu GitHub" sau khi GitHub Actions archive step tạo **draft Release MP4 asset** và **Verify release asset** thành công: GitHub API trả về `html_url`, `assets[].browser_download_url`, đúng tên, kích thước và SHA-256. Không suy đoán tag/URL.
- **Giao ngay trong cùng phản hồi** hai link thực tế: **[Xem / tải video trên GitHub]** trỏ `video_url` của GitHub Release asset và **[GitHub Release]** trỏ `release_url`. Có thể thêm sandbox MP4 nhưng không thay thế link GitHub sau khi archive thành công.
- Khi render/QA trên GitHub Actions, upload MP4 artifact sau QA rồi workflow gọi reusable `.github/workflows/archive-finished-video.yml` với `qa_approved=true`, `source_run_id=github.run_id`. Dùng `needs.archive.outputs.video_url` và `needs.archive.outputs.release_url` trong phản hồi. **Không** set QA=true nếu gate chưa đạt.
- GitHub Action viết link vào Job Summary và artifact `github-video-links-<slug>`. Khi runtime không có outputs, tra release API/artifact và verify tồn tại trước khi chia sẻ.
- Draft Release lưu trữ cho người có quyền truy cập repo (có thể cần đăng nhập), không tự công khai release hay đăng YouTube.
- Nếu không thể truyền MP4 nhị phân hiện tại sang Actions/GitHub Release, báo rõ **chưa có link GitHub video**; không ghép URL thủ công.
