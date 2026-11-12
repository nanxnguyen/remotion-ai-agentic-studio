# Google Drive Videos-shorts SOP — mandatory

Owner's root: `Videos-shorts` = `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`.

1. Before EVERY new/revision save, retrieve all direct numbered children, paginate if required. Do not presume last number or folder name.
2. Identify stable `video_id`, `canonical_slug` and precise title; inspect scripts/manifests for ambiguous near-duplicates.
3. One original video/topic → one canonical numbered folder; **V2/V3/REVIEW/FINAL, Vbee auditions, thumbnails and source stay in same folder**. Revisions never allocate a new folder. Distinct video concept gets the current `max(existing numbered folder)+1` when actually new, created as `{number}. {Vietnamese title} - {YYYY-MM-DD}` in Vietnam local date.
4. Never overwrite/delete earlier files without explicit consent. If same name exists, compare size/hash/manifest and preserve different versions.
5. Upload needed media and source: MP4, genuine Vbee MP3, audio manifest, thumbnail, YouTube metadata, captions, source ZIP, QA contact sheet and safety review.
6. Verify returned file IDs via real Google Drive metadata: file's correct parent, name, MIME and nonzero bytes; provide viewer link only after verification. Don't change sharing permissions automatically.

Known example folder #27 (people-pleasing psychology, used for revision only):
`https://drive.google.com/drive/folders/1nDkj1nBLkPywi6H5WoS6OrcFwK1Ny78u`.
Its V1 and V2 are distinct files. Nearby #11 “Lớn rồi, không cần làm vừa lòng tất cả nữa” is a different video; do not merge them merely because topic overlaps.

The current repo `nanxnguyen/remotion-ai-agentic-studio` has `AGENTS.md` and Drive/archive rules; read live when working there. This document is the portable fallback, not proof of an available connected Drive account.
