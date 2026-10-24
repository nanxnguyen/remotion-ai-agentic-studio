---
name: video-shorts-drive-delivery
description: "MANDATORY when Ray Phim Kể Chuyện finishes ANY YouTube Shorts or long-form video: package the completed MP4, a dramatic correctly oriented YouTube thumbnail, and a compelling Vietnamese title/description .txt inside the user's sequentially numbered Videos-shorts Drive folder; verify both Drive and GitHub Release links."
---

# VIDEO_SHORTS_DRIVE_ARCHIVE_V1

Apply this *with* the main Ray Phim Kể Chuyện skill. The user chose **one number per finished video**, not one number per render attempt. An unfinished storyboard, static animatic, voice preview or QA-pending motion film is **not final**.

## Destination and sequence

- Drive parent folder: `Videos-shorts`, ID `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D` (this exact ID prevails if the display name differs).
- At final delivery, list all direct child folders, paginate to the last result, parse `^([1-9][0-9]*)\.\s+(.+)\s+-\s+(\d{4}-\d{2}-\d{2})$`, then assign **max N+1**, rechecking before creation.
- Names are `N. <Tên video> - <YYYY-MM-DD>`, where the date is the **actual final production date** in `Asia/Ho_Chi_Minh`.
- Existing 1,2,3 verified on 2026-10-24. `4` is only tentative, recompute live every time.
- Revision of an already-delivered video: reuse its numbered folder instead of consuming a new number. Do not destroy previous unrelated files.

## Required three actual deliverables (upload all to the numbered folder)

1. **`video-final.mp4`** — actual fully validated audiovisual final render, correct voice/acting/transitions/captions, duration/orientation/fps inspected. Do not upload a temporary animatic or 4×4 image as final.
2. **`thumbnail-youtube.png`** (JPG acceptable if better quality) — new attractive **story-specific** cinema-style original artwork: compelling face/reaction/prop, high contrast, readable short Vietnamese text, no false shocking claims. **YouTube Shorts: portrait 9:16, prefer 1080×1920**; **long-form: landscape 16:9, prefer 1280×720 or larger**. Verify exported image dimensions. Do not just stretch/crop a storyboard contact sheet.
3. **`youtube-title-description.txt`** — UTF-8, strong but truthful Vietnamese publication copy. Format: `TITLE:` newline final title; blank; `DESCRIPTION:` newline 1–2 line non-spoiling hook, concise description, light CTA; blank; `HASHTAGS:` with relevant tags such as `#Shorts #KinhDi`; optional `PINNED COMMENT:` suggestion. Do not guarantee millions of views.

## Verify and hand off

Upload three **real file references/bytes** into the new Drive folder via connected `mcp__Google_Drive__upload_file` with `parent_folder_id` equal to the created folder ID. The parent ID must not be Drive root. Read back metadata for each (filename, MIME, nonzero size, parent, provider URL, permissions) and verify **3/3**. Do not claim Google playback is processed merely because metadata exists; keep files private unless told to share.

Archive the **same** final MP4 to an actual **draft GitHub Release** under `nanxnguyen/remotion-ai-agentic-studio`, verifying asset byte size, checksum, download URL. A PR or Vbee artifact is not a completed GitHub film.

Return the verified **Drive folder link**, **Drive MP4 viewing link**, **GitHub Release MP4 asset link**, plus brief file inventory and video QA. Optionally include the thumbnail/title text URLs. If any final media, thumbnail, metadata, folder or release gate fails: mark delivery **pending/incomplete**, state the blocker, never fabricate a URL or relabel a preview as final.

See also canonical `docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md`, `docs/production-archive-policy.md`, and `.claude/skills/ray-phim-ke-chuyen/SKILL.md` in the connected GitHub repo.
