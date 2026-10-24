# Video-shorts — mandatory Google Drive delivery package

> Canonical project instruction for **Ray Emotional Stick Shorts** production and every future chat/agent working on the series.
> Established by project owner on **2026-10-24**. This document supplements, and does not bypass, mandatory Remotion/Vbee/QA/GitHub delivery gates.

For the owner-wide **all-video and long-form** requirements, follow [Google Drive Video Archive Contract](GOOGLE_DRIVE_VIDEO_ARCHIVE.md) as well. This Shorts-specific policy uses the same folder ID, numbering, and filenames, and must not override 16:9 artwork for long-form uploads.

## Destination (FIXED)

**Root folder:** `Videos-shorts`
**Exact Google Drive folder URL:** https://drive.google.com/drive/folders/1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D
**Exact folder ID:** `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`

Do not substitute an earlier Google Drive destination (including `Ray Emotional Stick Shorts`) for this root.

## Per-video folder numbering and naming

Each completed video gets exactly one child folder inside the root:

`<N>. <Vietnamese video title> - <YYYY-MM-DD>`

Example: `1. Người từng hiểu bạn nhất, giờ chỉ còn là người lạ - 2026-10-24`

- `N` is a positive integer: 1, 2, 3, ... with no fixed ceiling.
- Before allocating, **list the actual folders under the exact root ID**; use the next available production sequence number after the largest assigned number. Do not collide with existing folders. Never renumber or rename previous videos just because their titles change.
- Production date is the date the approved final was rendered in `Asia/Ho_Chi_Minh` (ISO date); do not use upload date when it differs.
- For an existing video, find/reuse its numbered folder rather than creating duplicates.

## Exactly three mandatory deliverables per video

1. **Final production MP4**: `video-final.mp4`. Must be the genuine QA-approved vertical YouTube Shorts master, including verified Vbee Thanh Long narration (unless a different provider is explicitly authorized), original/licensed music, synced Vietnamese subtitles and audiovisual QA. A storyboard, muted/voice-less preview, temporary link or an unverified render cannot replace it.
2. **YouTube thumbnail image**: `thumbnail-youtube.png` (or `.jpg` for a high-quality export). Original, eye-catching, emotionally specific, readable on phone, high contrast, recognizable character/prop, accurate to the actual story, with Vietnamese accent/typography QA. Prefer 1080×1920 9:16 for the Shorts cover and a safe central content area so mobile crops do not hide the subject or text. No deceptive claims or fabricated evidence. Avoid unlicensed artwork.
3. **YouTube publication copy**: `youtube-title-description.txt` encoded UTF-8, containing the final **TITLE** and **DESCRIPTION**, including compelling but honest 1–2-line hook, concise storyline/benefit, optional natural conversation prompt and relevant hashtags (e.g., #shorts). No unsupported guarantees of views and no automatic publication.

Additional source files or QA reports are optional and may be retained in a `source/` subfolder, but never in place of these three required deliverables.

## Mandatory automated upload / verification order

1. Complete full story, Vbee synthesis, motion, music, captions, independent QA gates and `ffprobe` of final MP4 before marking it FINAL.
2. Discover the **real** destination root and numbered subfolders via Google Drive. Check latest used number, and create/reuse the correct per-video folder. Keep existing files unless asked to move/delete them.
3. Create the video-specific thumbnail, inspect readability/subject and text; write the matching UTF-8 title+description copy.
4. Upload **all three actual files** into the same numbered folder, using connected Google Drive / supported file upload. Read back Google Drive metadata for every file: MIME type, size, parent folder ID, and returned `webViewLink`/display URL. For images and MP4, metadata alone does not prove render quality or Google playback.
5. Do not say `archive completed` or hand off a fully packaged final video until every required file is present and verified. If any item is blocked, report `INCOMPLETE` with exact missing items and truthful evidence. Never invent Drive links or file paths.
6. Return the **actual numbered folder link**, final MP4 link, thumbnail link, and copy-file link. Publishing to YouTube is a separate authorization. Preserve private access by default; do not broaden sharing without permission.

The existing **draft GitHub Release** and **vidIQ** archive requirements still apply where documented. This Drive folder package is an *additional*, mandatory delivery destination; it does not supersede archive QA or imply publishing.

## For future sessions / agents

Read this policy at intake and before every completed emotional Shorts delivery. Keep the Google Drive destination ID stable, compute numbering from current Drive listings (not memory), and verify all 3 deliverables for each video. When an older video is migrated, **copy** source assets first and verify new copies rather than deleting or destructively moving the originals. Update this canonical file and matching skill/plugin references when the owner changes the rule.
