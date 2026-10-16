# HANDOFF — thuong-hay-so-bat-dau-lai (cập nhật 2026-10-16, sau gate A vòng 2: PASS 9.1)

Đọc trước: `.claude/skills/ray-pineline-worflow-agent/SKILL.md`, `CLAUDE.md`, file này.

## Trạng thái
| Hạng mục | Trạng thái |
|---|---|
| Phase 0 (trùng chủ đề) | Cleared, ghi trong `brief.md` header |
| `pipeline.py init` | Xong. vid `thuong-hay-so-bat-dau-lai`, comp `ThuongHaySoReel`, profile story, voice slug `thanh-long-nang-cao` (output `out/thuong-hay-so-bat-dau-lai-thanh-long-nang-cao-reel.mp4`) |
| research | **done** (`research.md`) |
| brief | done (v2, đã cập nhật bát canh/spine/callback; còn 2 chữ cũ "vòng 1" ở header Content và "Nhặt vì gì?" ở Style-dòng chữ — design-agent tự đọc theo script v2) |
| script | done. **v2 đã sửa đủ 10/10 fix vòng 1** (`script.md` 13 keys tách, `voice.proposed.json` 13 keys, `voice.json` đã copy từ proposed) |
| Gate A | Vòng 1 = 8.9 revise; **vòng 2 = 9.1 PASS** (`script-review.md` Round 2, reviewer mới clean context; đã `review A 9.1 pass` + `gate A` + `set brief/script done`) |
| voice, design, audio, build, qa, render | voice/design/audio đang `in_progress` (phiên khác đã dispatch Phase 3 lúc 2026-10-16; chạy `pipeline.py show thuong-hay-so-bat-dau-lai` trước khi dispatch để không làm trùng); build/qa/render pending. Không chờ user |
| Monitor | http://127.0.0.1:4180/ |

## Quyết định đã chốt (không hỏi lại)
- Hai câu user, giữ nguyên chữ: (1) «Bạn giữ mối quan hệ ấy vì thương, hay vì sợ phải bắt đầu lại?» = hook s1. (2) «Nếu hôm nay mới gặp người ấy, biết mọi điều đang biết, bạn có chọn bước vào không?» = câu nói CUỐI CÙNG, kết bằng câu hỏi cho người xem (user yêu cầu), im lặng ≥1,2s sau đó.
- Không khuyên ở lại/rời đi, không claim khoa học, không đạo lý.
- Nhân vật: "mình" + "người ấy", không giới tính, quen ~3 năm, không ai là người xấu.
- Ẩn dụ trung tâm: đèn "Giữ ấm" nồi cơm điện; đỏ son `#FF5A36` ấm = thương, xanh lạnh `#9DB4FF` = sợ; hai màu phải ngang nhau ở khung cuối. Palette: `#E6ECE8`, `#3D2C5E`→`#C77DA0`, `#2A2238`. Font đề xuất Literata (to) + Lexend (caption); chưa kiểm dấu tiếng Việt, lỗi thì Be Vietnam Pro.
- Giọng: **clone cục bộ Thanh-Long-Nang-Cao**, user xác nhận cho phép (2026-10-15). Ref: `voice-ref/refThanhLong.wav` (8,2s, chép từ cuoc-goi-nho-cua-me). Lệnh: `HF_HUB_DISABLE_IMPLICIT_TOKEN=1 ~/.venvs/vieneu/bin/python -I scripts/gen-voice-clone.py thuong-hay-so-bat-dau-lai --json docs/thuong-hay-so-bat-dau-lai/voice.json --ref docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav --tries 14 --max-cer 0.04`.
- Không được giống: gaplai (hai ghế+đèn vàng nâu), camon (polaroid), cuoc-goi (điện thoại hai phòng, đỏ gọi nhỡ), metkhong (một mình phòng trọ đêm), lan (đen+người que+cam), camon palette rêu/lá mạ.
- Đếm "từ": repo đếm âm tiết tách dấu cách; Thanh Long ≈4,1 âm tiết/s. Reviewer phải biết điều này.

## Việc cần làm tiếp (theo thứ tự)
1. ~~**Sửa script v1 → v2**~~ XONG (script-agent, 207 âm tiết, ~56.5s nhịp thật). Chi tiết đổi xem `script.md` v2 + Round 2 "Fix vòng 1 đã kiểm".
2. ~~**Gate A vòng 2**~~ XONG: 9.1 PASS (hook 9.5, specificity/emotional 9.2, không Cao/Trung mở, chỉ 3 Thấp mới Thấp-6/7/8 để xử lý ở Phase 3: timing chạm mép 60.6s thận trọng → cắt hold sau ffprobe; s9 3 insert/6.7s → gọn câu hoặc phóng to 1 dòng; s7a "Tối vì thương" có thể thành "Tối nào vì thương").
3. ~~Chờ user duyệt kịch bản~~ **HUỶ**: user chốt 2026-10-16 workflow tự chạy (agent tự làm, tự review, tự duyệt), không nhờ user duyệt tay. Đi thẳng Phase 3.
4. Phase 3 song song (design-agent, voice-agent, audio-agent) → user `audio-listen` → gate D → E → B → build → QA → render → C → user `listen`. Theo SKILL.md. Lệnh giọng giữ nguyên trong "Quyết định đã chốt".

## Lưu ý
- Không sửa `status.json` bằng tay. Chỉ `pipeline.py`.
- Chưa có `voice-expressive.json`. Nếu dùng thì phải khớp key đã tách.
- AI không nghe được audio: "tự nhiên" chỉ user xác nhận ở bước listen.
- Chỉ render bản BGM, không NoBgm. Trả lời user bằng tiếng Việt.

---

# Track 2 — Sửa SKILL.md (độc lập với video, agent khác nhận được)

File: `.claude/skills/ray-pineline-worflow-agent/SKILL.md` (216 dòng). Review 2026-10-15 kết luận: khung chuẩn, còn 9 chỗ cần sửa. **Chưa sửa gì.** Việc này không phụ thuộc Track 1 (video); có thể làm song song. Sửa bằng Edit, không Write cả file. Không đụng `skills/` (vendored, read-only).

| # | Việc | Chỗ sửa |
|---|---|---|
| 1 | ~~Điểm dừng user duyệt kịch bản~~ **HUỶ** (workflow tự chạy). Thay bằng: gate A có sub-score specificity/emotional impact ≥9 riêng (chống vụ `cuoc-goi-nho-cua-me` A=9.6 mà user bảo "không chạm") | Phase 2 gate A + "Common failure points" |
| 2 | Định nghĩa "giọng được ủy quyền" cho clone: user xác nhận bằng văn bản, ghi vào `brief.md` kèm ngày; preview catalog không đủ | "Voice priority" mục 2 |
| 3 | Phase 2: giọng clone không chỉnh được nhịp nghỉ → muốn nghỉ phải tách key riêng (vd `s6a/s6b`) hoặc dùng `voice-expressive.json`. Cập nhật luôn `.claude/agents/script-agent.md` và `script-reviewer.md` | Phase 2 + 2 file agent |
| 4 | Một đơn vị tốc độ đọc duy nhất. CLAUDE.md nói 2,3–2,6 từ/s (từ ghép); script đếm âm tiết, Thanh Long ≈4,1 âm tiết/s. Chọn một, ghi rõ, sửa chỗ còn lại | Phase 2/3 + CLAUDE.md |
| 5 | Làm rõ "qua gate A": điểm tổng ≥9 VÀ không còn lỗi Cao/Trung mở; `pipeline.py` chỉ nhận một số | Phase 2 gate A + script-reviewer.md |
| 6 | `scripts/pipeline.py` help lỗi thời: thiếu stage `design`, nói cổng 4179 (thực tế 4180). Kiểm `set <vid> design in_progress` chạy được | `scripts/pipeline.py` (+ chạy `python3 -m unittest scripts.test_pipeline`) |
| 7 | `init` bắt buộc `--voice` quá sớm (giọng chưa chọn/chưa xin phép). Cho placeholder rồi `voice` đổi sau, hoặc ghi rõ trong skill | Contract + pipeline.py nếu đổi |
| 8 | Thêm quy ước bàn giao khi dừng giữa chừng: `docs/<vid>/HANDOFF.md` (trạng thái stage, gate, quyết định đã chốt, việc tiếp theo, lưu ý). Mẫu: file này | mục "Stop" |
| 9 | Gọn skill: bỏ trùng lặp (bảng roster / "Parallel map" / đoạn "Run independent subagents"), bỏ chữ Trung, thêm "chế độ nhẹ" cho video story ngắn hoặc khi user đã đưa kịch bản | toàn file |

Chưa kiểm chứng: `pipeline.py` có chặn gate D/E/B/C dưới ngưỡng không (mới thấy A chạy đúng); chưa chạy từ build đến render. Muốn chắc thì chạy thử trên video test hoặc đọc `pipeline.py` + `test_pipeline.py`.
Sau khi sửa: chạy `python3 -m unittest scripts.test_pipeline scripts.test_voice_catalog`, báo user từng mục đã sửa.

# Thứ tự gợi ý cho agent mới
Track 1 (video) chạy liền Phase 3 không dừng hỏi user; Track 2 mục 1–5 làm ngay được vì ảnh hưởng đến vòng sửa kịch bản (mục 3, 5). Hỏi user nếu muốn đổi hành vi `pipeline.py` (mục 6–7).

# Nguyên tắc vận hành (user chốt)
Agent tự làm, tự review (reviewer clean-context mới mỗi vòng), tự duyệt qua gate. Không dừng chờ user duyệt tay. Chỉ hỏi user khi thiếu input không suy ra được. Lưu ý: `pipeline.py check` vẫn đòi `audio-listen` và `listen` của user; bỏ thì phải sửa pipeline.py (hỏi user trước).
