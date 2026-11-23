# HANDOFF

## 2026-11-24: audit + sửa kịch bản
- Đã xong: `script-audit.md` (audit gốc + chấm lại), sửa `script.md` + `narration-vbee.txt` (~181–188 âm, ước tính ~49–52s sau siết pause). Đổi tên kênh/series thành "A Xin Chém Sử".
- `python3 -I scripts/pipeline.py audit <vid>` **không chạy được**: `FileNotFoundError: .agents/skills/ray-pineline-worflow-agent/schemas/review-gates.json`. Symlink `.agents/skills/ray-pineline-worflow-agent → .claude/skills/ray-pineline-worflow-agent` (CLAUDE.md mô tả) đang không tồn tại. Thư mục này cũng chưa có `status.json` (chưa vào pipeline).
- Việc tiếp: tạo lại symlink rồi chạy lại audit · đo voice Vbee thật (≤ 52s) · chạy lại `title.py`/`hookscore.py` · `script-reviewer` chấm độc lập trước gate A.
