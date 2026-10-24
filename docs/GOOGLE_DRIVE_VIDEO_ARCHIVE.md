# Google Drive Video Delivery & Archive Contract

**Mandatory for every successfully produced video in this project, independent of topic, series, genre, YouTube Shorts / TikTok / long-form format.**

## Fixed Drive parent — do not substitute another directory

- User-selected Drive folder URL: **https://drive.google.com/drive/folders/1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D**
- Folder ID: `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`
- Verified connected folder name: `Videos-shorts` (user calls it "Video-shorts"; **the folder ID/URL is authoritative**).
- Do not rename the root folder or move existing video folders without explicit instructions.
- Production-date timezone: **Asia/Ho_Chi_Minh**, formatted as `YYYY-MM-DD`.

## One video = exactly one new sequentially numbered folder

Before saving a **new** video's deliverables, list the direct children of this exact parent using the connected Google Drive API (paginate or continue as necessary; a short or partial listing is not sufficient if more children exist).

1. Consider only **direct child folders** whose names match `^([1-9][0-9]*)\.\s+(.+)\s+-\s+(\d{4}-\d{2}-\d{2})$`. Ignore standalone documents, numbers found inside video titles and nested folders.
2. Parse their leading integer IDs. Set the next folder number to **max(existing IDs) + 1**; use 1 if none. Never reuse an ID, including when there are gaps. Re-check the folder listing immediately before folder creation to avoid a naming collision.
3. Create the new folder **inside that exact parent ID** using:
   `<N>. <Video title> - <YYYY-MM-DD>`
   Example: `3. Bức Ảnh Duy Nhất Không Có Mẹ - 2026-10-24` **only if 3 is still available and that is the actual local production date**.
4. If resuming work on the **same** video, locate the existing folder and upload/replace only the appropriate contents rather than allocating a new number for every render or version.
5. If a concurrent upload has already used the next number, re-list and allocate the next unused number. Never overwrite an unrelated video.

**Verified initial state on 2026-10-24:** children included `1. Thành Công Bắt Đầu Từ Những Điều Nhỏ Bé - 2026-10-24` and `2. 17 ngày giả vờ đi làm - 2026-10-24`. The next ID *at that moment* was **3**. Treat this as history only; always read Drive live again.

## Three required deliverables INSIDE each video folder

| Required asset | Suggested filename | Gate |
| --- | --- | --- |
| **Complete final produced video** | `video-final.mp4` | Actual latest **approved** final full-A/V output, not a silent preview. Verify proper video and audio streams, duration, orientation, frame rate, speech, music and any relevant Ray QA gate before upload; check metadata/readback after upload. |
| **Original thumbnail artwork** | `thumbnail-youtube.png` (or `thumbnail-youtube.jpg`) | High quality, dramatic and emotionally compelling; show a story-specific character, concrete stakes and a readable focal message. Create a **vertical 9:16** image (prefer 1080×1920) for **Shorts** and **horizontal 16:9** image (prefer 1280×720 or larger) for **long-form**. No stretched crops, generic repeated faces, inaccurate text or misleading bait. Observe mobile UI safe areas. For platform limitations, still archive the requested cover artwork without pretending YouTube can upload a custom Shorts thumbnail in all interfaces. |
| **Plain text publishing copy** | `youtube-title-description.txt` | UTF-8 text containing final **YouTube title**, final **description**, relevant hashtags, and an optional concise pinned-comment suggestion. The copy must be accurate to the movie, emotionally compelling, easy to read, natural Vietnamese and optimized for curiosity without misleading claims. Use the mandatory YouTube Shorts & TikTok retention/story formula in `docs/SHORTS_RETENTION_PLAYBOOK.md`. |

Minimum suggested text file content:

```text
TITLE:
<Tiêu đề YouTube cuối cùng>

DESCRIPTION:
<Mô tả YouTube đầy đủ; mở đầu hấp dẫn, tóm lược ngắn không spoil cú twist, CTA tự nhiên, hashtag phù hợp>

HASHTAGS:
#Shorts #...

OPTIONAL PINNED COMMENT:
<Một câu hỏi gợi thảo luận>
```

**TikTok:** when requested, include a clearly separated `TIKTOK CAPTION` / `TIKTOK HASHTAGS` section or additional text file. Do not replace or omit the required YouTube title+description.

## Thumbnail creative quality gate

- Read the approved script, its hook, climax and emotional arc *before* designing.
- Create a visually stunning **story-specific** concept: one focal subject, clear dramatic contrast, expressive character/action, background matching the scene, strong lighting and legible Vietnamese accents.
- Default to a dramatic, cinematic and memorable look tailored to the genre; stay truthful to the story (do not add fake events or unrelated horror).
- Optimize for a small mobile preview; avoid clutter, huge text blocks, cropped main faces or critical props under UI overlays.
- For **Shorts: vertical 9:16**; for **long-form: landscape 16:9**. Verify exported dimensions and image bytes. Thumbnail must be a separate real image file, never a screenshot/contact sheet placeholder.
- **Approval is not assumed** from generation; visual inspection is required. Avoid claiming "guaranteed million views."

## Required upload and verification

1. Confirm production's final approved A/V MP4 exists and passes measurable Ray checks; verify speech is audible when required and soundtrack does not drown out voice.
2. Produce and visually inspect the **actual** thumbnail image in the correct orientation.
3. Write and proofread the UTF-8 title-description text. Validate Vietnamese spelling, emotional hook and factual accuracy.
4. Fetch this Drive parent's live ID/metadata and list children; choose correct `N`. Create or reuse the intended video's folder.
5. Upload **real bytes for all three files** into the numbered folder using authorized Drive upload actions. Do not upload a GitHub text pointer, missing binary, test footage, mock image or a signed URL in place of an actual asset.
6. Read back the folder and file metadata: all 3 assets, exact parent ID, MIME, nonzero file sizes, accessible Drive file links. If possible, verify checksum/bytes against source files. If any operation fails, report which file or gate is missing and do **not** mark delivery complete.
7. Return **Drive folder URL** plus individually verified final MP4, thumbnail and title-description file URLs; include exact sequential folder name, media metadata and relevant GitHub/vidIQ durable IDs when available.
8. Upload/archive is not permission to publish to YouTube or TikTok. Do not change Drive sharing permissions without authorization.

## Relationship to other production conventions

- This storage rule **adds** to, rather than replaces, the canonical repo video gates, Vbee Batch authentication rules, GitHub provenance and optional vidIQ media-library delivery.
- All **future** videos should be deliverable to Drive under this structure, even if their source code, GitHub release and QA evidence live elsewhere.
- Never store passwords, API tokens, personal secrets or expiring signed playback URLs in repository documentation or the text metadata file.
- **If the Drive connector, raw MP4 or upload capability is inaccessible**, retain artifacts already completed, show exactly what is blocked and do not invent folder/file URLs.

**Owner instruction recorded:** 2026-10-24, applies across future ChatGPT conversations/agents using this repository as their production source.


## Archive destination override — NO GitHub Releases (2026-10-25)

**Latest explicit user direction supersedes every previous draft-GitHub-Release instruction.** For new finished videos, upload the real QA-approved MP4, portrait/landscape thumbnail and Vietnamese YouTube title/description into the sequentially numbered **Google Drive Videos-shorts** child folder (`1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`). **Do not upload any MP4 to GitHub Releases or create/publish a Release.** GitHub repository `nanxnguyen/remotion-ai-agentic-studio` remains mandatory for source code, Remotion compositions, shotlist, timelines, voice manifest, QA/report and links back to the Drive archive, using normal commits/PRs. Keep rendered MP4 binaries out of Git commits/history; the media lives on Drive. The user-facing completion report includes verified **Google Drive MP4 viewer**, **Google Drive numbered folder** and **GitHub source/production PR** links, never invented GitHub binary or Release links. Drive and GitHub are both required; their roles differ. Preserve private-sharing defaults and do not automatically publish publicly or upload YouTube.
