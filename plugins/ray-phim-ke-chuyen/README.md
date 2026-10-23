# Ray Phim Kể Chuyện

Private skills-only ChatGPT plugin for Vietnamese cinematic storytelling Shorts with Vbee narration.

Contains a portable skill, production references, and sample executable utilities. The plugin **does not expose a Vbee account or GitHub Secrets directly**. Vbee TTS requires a configured execution environment or a GitHub Actions runner; creating the plugin itself does not produce audio/video.

## Start with ChatGPT

Select **Ray Phim Kể Chuyện**, then say:

- “Tạo phim kể chuyện bí ẩn 55 giây, dựng bằng Remotion, ảnh noir cinematic 9:16, giọng Vbee Anh Khôi.”
- “Chỉ thay voice cho MP4 này bằng Vbee; giữ nguyên 100% hình ảnh và thời lượng.”
- “Sửa câu cuối bằng voice Vbee, không tạo lại 9 cảnh trước.”

## Typical assets

`storyboard.json` → Vbee batch MP3 per scene → still images/Remotion composition (or source MP4) → MP4 with verified audio/video.

## Notes

- Secrets remain in GitHub, never copied into plugin.
- A final MP4 exists only when an authorized execution environment has generated and verified it.
- Do not auto-publish to social networks.
