# Ray Phim Kể Chuyện — video publishing package in Google Drive (2026-10-24)

This is a **mandatory completion gate for every final video** (Shorts or long-form). This reference implements the user's explicitly chosen folder convention. Canonical full requirements: [Google Drive Video Archive Contract](../../../../docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md) at repo root and [production archive policy](../../../../docs/production-archive-policy.md). If a relative link does not resolve, open the corresponding path from repository root.

## Fixed parent

- Google Drive folder ID: `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`.
- Folder: `Videos-shorts` (verified Drive title; user referred to it as “Video-shorts”).
- Browser URL: https://drive.google.com/drive/folders/1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D
- Do NOT use a Drive root folder or a previously used movie folder. Preserve all existing folders, numbering, metadata, and permissions.

## Number every *new* finished video folder

1. Read parent metadata and list **all direct child folders**, paging to exhaustion, from the connected Google Drive account.
2. Parse a positive integer prefix from names shaped `<N>. <Video title> - <YYYY-MM-DD>`. Compute `N = max(existing numeric prefixes) + 1`. For this parent, children 1, 2 and 3 were verified on 2026-10-24; **4 is only a tentative next number, never a reserved or permanent number**.
3. Recheck the list immediately before creating to avoid a collision; if occupied, recompute. Example after checking: `4. Ca Trực Cuối Cùng - 2026-10-24`. Date must be the **actual final render date** in `Asia/Ho_Chi_Minh`, not a guessed start date.
4. Only create this numbered folder **after** the video is fully produced, passes genuine movement and AV QA, and the three deliverables are ready. **Never archive an animatic/board/test render as `video-final.mp4`**.
5. Revisions of the **same** film should reuse its existing numbered folder, preserving the prior approved deliverables where necessary; do not consume a new number. For a new independent film, allocate a new number.

## Exactly three required files in the same new numbered folder

| Filename | Content | Verification |
| --- | --- | --- |
| `video-final.mp4` | The full QA-approved picture + genuine voice + SFX + captions | Nonempty H.264/AAC or equivalent uploadable MP4, correct duration/orientation, ffprobe, actual visual and audio review; source bytes/MIME, Drive metadata and correct parent. |
| `thumbnail-youtube.png` | Dramatic **original** video-specific cinematic thumbnail. For **YouTube Shorts, portrait 9:16**, prefer 1080×1920. For **long-form, landscape 16:9**, prefer 1280×720 or better. | Correct dimension, clear emotional focal subject and action, strong contrast, concise Vietnamese text; mobile legibility and actual file bytes. Different faces/cast/story for each film; do not use the 4×4 storyboard/contact-sheet as thumbnail. |
| `youtube-title-description.txt` | UTF-8 title & description **ready to copy to YouTube**, with relevant hashtags and optional pinned comment | Strong curiosity but faithful to actual film, no unwarranted “million views guaranteed,” no spoilers of final twist, Vietnamese accents proofread. |

Required `youtube-title-description.txt` layout:

```text
TITLE:
<Tiêu đề mạnh, đúng nội dung và không tiết lộ cú twist>

DESCRIPTION:
<Câu dẫn hấp dẫn + tóm lược không spoil + lời mời tương tác tự nhiên>

HASHTAGS:
#Shorts #KinhDi #TruyenMa

OPTIONAL PINNED COMMENT:
<Bạn sẽ làm gì nếu là nhân vật chính?>
```

## Upload, security, reporting

- Get valid `file_uri` references from the runtime/generation for each of the three REAL files. Call connected `mcp__Google_Drive__upload_file` **with `parent_folder_id` equal to the new numbered folder's ID**, file names as above, and verified MIME types `video/mp4`, `image/png`, `text/plain`. Do not pass local paths as `file_uri`; never upload text placeholders in place of binaries.
- Read back metadata for **all three** files, verify MIME, nonzero size, folder parent and provider-returned URLs. Check whether the user can view the file in their connected account; default to private, **do not share publicly automatically**. If Drive is still transcoding playback, describe this accurately.
- After film QA also archive the SAME exact final MP4 binary to a **draft GitHub Release** through the authorized archival path and verify actual asset/size/SHA-256. GitHub documentation PR or an Actions voice artifact is NOT a GitHub MP4 archive. Do not publish draft Releases automatically.
- Completion report: show **Drive video viewer link**, **GitHub verified MP4 asset download link**, optionally **numbered Drive folder** and thumbnail/copy links. Confirm folder N, date, format, FPS, duration and 3/3 Drive files present. If any file/upload/QA is incomplete, disclose the missing items; do not fabricate links or claim final delivery.

This policy is the newest specific per-video Drive folder rule and supplements the existing dual-location archive requirements. No YouTube publishing unless the user authorizes it.
