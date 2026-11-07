# Tiệm Giặt Ủi Nhận Đồ Từ Ngày Mai — V6 Luxury Cinematic approved Drive delivery

**Date:** 2026-10-25
**Owner decision:** Approve V6 Luxury Cinematic typography, preserve top scene-specific headline distinct from bottom narration, and remove old in-folder versions.

## Single movie #18 delivery
- Folder: https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN
- Final chosen film: https://drive.google.com/file/d/1uGKfOFUJd8Gong3Y9XVsRLtyxgmVSG_G/view?usp=drivesdk — `video-final.mp4`, 29,426,418 bytes.
- Thumbnail: https://drive.google.com/file/d/1M8TYjyB0TJk85dzq_6oIL1m97EwG5_V3/view?usp=drivesdk — `thumbnail-youtube.jpg`, 189,752 bytes.
- YouTube copy: https://drive.google.com/file/d/1AOETuwOtBDa05uL4SG--zHXn2BexxBoQ/view?usp=drivesdk — `youtube-title-description.txt`, 752 bytes.

## QA / provenance
- Source is *approved* V6 Luxury Cinematic preview v2; the single missing final frame in v2 was cloned to reach exactly **3600 frames at 60 FPS and 60.000 seconds**, exported as **1080×1920 H.264/AAC**.
- Full FFmpeg decode: PASS, stderr empty.
- Original AAC and final AAC packet MD5: **f361abb76c23733920c8c86c99de7c09** both, so actual Vbee soundtrack is unchanged.
- Final MP4 SHA256: **8618b783747c49dee2c9271ca72ee7174a9ccc49e9651dcc25c0ff60fb2972df**.
- Re-encoding reduces upload size to ~29.4MB; this is a distribution binary, not bit-identical video frames.
- **Full canonical Remotion-specific QA gates remain unrun.** Do not claim Remotion CLI render or all story action reviewers passed; user approved this visual/editorial version.
- No publication to YouTube, no GitHub Releases, no Drive permission changes.

## Obsolete versions removed
The folder previously contained 17 entries. After a verified upload of the new final MP4, five old video versions and ten old QA/thumbnail/copy artifacts were **permanently deleted** per explicit user instruction, and retained V6 thumbnail/copy were renamed to canonical three-asset names. Folder was re-listed with **exactly three files**: `video-final.mp4`, `thumbnail-youtube.jpg`, `youtube-title-description.txt`.

Any obsolete Drive preview links in earlier PR/QA documents are now intentionally invalid. Do not reuse them as current deliverables.
