# Ba Tiếng Gõ Trong Đêm — V5 clean remake (2026-10-25)

## Why V4 was rejected
The 18–26s bedroom-door/phone sequence had a large opaque black rectangle because the old editor used a large masking overlay to hide review captions baked into a storyboard panel. This covered the intended phone SMS clue. The user provided a screenshot.

## References reviewed
- *Ngọn Hải Đăng Không Chiếu Ra Biển V4*: Google Drive QA contact sheet with 26 beats, clean full-vertical frames, concise captions, physically visible story clues.
- *Đám Cưới Không Có Cô Dâu*: Google Drive final 720×1280 30fps, actual QA 20-frame contact sheet; clean mobile-safe captions, no rectangular review masks.

## Changes actually rendered
- V5 video length 55.000s, 720×1280, 30fps, H.264 video / AAC audio.
- Re-cropped **12 isolated images** from the original storyboard to exclude baked review text, timecodes and contact-sheet borders. No black-masking overlay remains.
- Replaced door scene with full frame door illustration; restaged the crucial message "MẸ ĐANG Ở MỘ CON" as a **legible illustrated smartphone in the scene**, not a blank masking rectangle.
- Kept **12 original genuine Vbee Batch** lines aligned at their already measured source time positions: Anh Khôi run 40183288817 and mother Ngọc Huyền run 40183521139. Preserved existing foley/ambient soundtrack from confirmed Vbee mix, not any temporary eSpeak voice.
- Dynamic 2.5D camera movement, 0.4s soft crossfade across shots; fresh native ASS Vietnamese subtitle overlay with white/yellow/red cues; no running frame timecodes.

## Media proof and status
- Rebuilt local file: `Ba_Tieng_Go_Trong_Dem_V5_REBUILT_VBEE_55s.mp4`
- SHA-256: `f6fb454c29c4683fec7e8643b1c1d5848e81509252afaf2ed21d4e89d716d580`
- 5,595,096 bytes; ffprobe duration/fps/dimensions/codec checked; full FFmpeg decode PASS.
- Examined QA samples including actual 19.3s door frame and 23s SMS frame: neither has the objectionable black masking blank area. A small labeled phone prop contains SMS text.
- Mean -26.3 dB / peak -4.8 dB in technical audio check. Dedicated listening/perceptual narrative QA and full canonical pipeline gate have not been independently certified; do not assert "100% lip-sync" (2.5D still illustration is not acting video).
- The user-facing preview MP4 exists locally in this ChatGPT session and in personal file Library.
- **Google Drive `video-final.mp4` still contains V4. V5 Drive replacement BLOCKED**: the connected Drive `update_file` API rejected the locally generated file ID because it only accepts a connector file-reference object. Do not present V4 Drive URL as V5 final until V5 bytes are uploaded and verified. No GitHub Releases.

## Future archive task
Replace raw bytes of existing Drive file ID `1aQtsGLikjmDyWXSQGjY_7OCtYwYc6pXb` in numbered film folder `20. Ba Tiếng Gõ Trong Đêm - 2026-10-25`, preserving file ID and permissions, using a Drive-approved connector-local binary file reference. Confirm MIME/size and sha256 after readback. Do not create a new numbered film folder.
