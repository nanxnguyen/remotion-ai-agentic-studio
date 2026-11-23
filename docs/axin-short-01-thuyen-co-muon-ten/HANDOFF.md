# HANDOFF — axin-short-01-thuyen-co-muon-ten (2026-11-24)

## Trạng thái
- Final MP4 (voice + BGM + SFX): `thanhhai-2d-studio/projects/axin-short-01-thuyen-co-muon-ten/out/Tập_1_Ai_Mới_Là_Chủ_Thuyền_Cỏ_Mượn_Tên.mp4` — 1080×1920, 24fps, 48.3s, −14.1 LUFS, peak −1.5 dBFS, 36 MB. Chưa upload Drive / YouTube.
- Voice: file Vbee trong `~/Downloads/thuyen_co_muon_ten_khong_minh_chua_tung_lam_*.mp3`, khớp `narration-vbee.txt` v3 (ASR toàn bản mix xác nhận đủ lời).
- Render bằng `chibi-history-video` (thanhhai-2d-studio), không qua Remotion registry.

## Audit chưa qua
`python3 -I scripts/pipeline.py audit axin-short-01-thuyen-co-muon-ten` crash trước khi kiểm:
```
FileNotFoundError: .agents/skills/ray-pineline-worflow-agent/schemas/review-gates.json
```
`.agents/skills/ray-pineline-worflow-agent` là symlink sang `.claude/skills/...`; cần kiểm tra symlink / file schema rồi chạy lại. Video này cũng không có trong `src/videos/registry.ts`, nên audit có thể báo thiếu mục registry khi chạy được.

## Lưu ý tái tạo
- SFX cue nằm ở `story/sfx-cues.json`, được ghép vào `story/shots.json` sau `chibi_assign.py`. Chạy lại assigner sẽ xoá SFX → ghép lại trước khi `audio/mix.py`.
- `config.json`: `fadeIn`/`fadeOut` = 0 để vòng lặp Shorts không chớp đen.
- Engine sửa dùng chung: `drawChibiShotVertical` (9:16), set `tiltBoat`, `drawCrackedPawn`, `drawCtaButton`, `drawSpeechBubble`, điểm bản đồ Nhu Tu, crowd/volley cho `riverbank`; `chibi_bible.py` đọc overrides.
- Danh sách cảnh làm gần đúng so với `script.md`: mục 5 trong `story/bible.md`.
