# Integration review — cuoc-goi-nho-cua-me (gate E)

## Vòng 3 (2026-10-17 — retime v3: script rút gọn s5/s7, regen 8/8 clips, timeline 1308f)

Đọc kịp thời điểm render: `script.md` v3 (149 từ) + `voice.json` v3 + `voice-clone-asr.md` (CER 0.012–0.037) + `timeline.ts` (raw v4 @4dp, CGN_TOTAL 1308f = 43.6s) + 13 khung trích từ MP4 thật (`out/qa/cuoc-goi-nho-cua-me-c-frame-*.png`) + SFX cues. Profile `story`.

### Verified trên final MP4 (43.70s H.264/AAC, render_check bound)

- Timeline 1308f = measured clips (2.8157/2.8635/5.626/5.4312/5.2049/3.7676/5.3887/5.9716s) + 7×0.5s pause + outro 1.4s + holds 15/30f — công thức timeline.ts giữ nguyên, chỉ thay số; kiểm lại phép ceil từng shot (tổng đúng 1308).
- Biên đổi shot khớp giọng: đầu s5 @578f = "Đang gọi — Mẹ 00:03" (beat 1 ✓); beat 2 mẹ vào f630–664 khớp giọng mới "Mẹ bắt máy ngay" (f640 body đúng lúc caption "cũng chính ngón tay ban chiều bấm tắt." — câu rút gọn đã lên hình); s7 @879f hai phòng nối lại, f975 caption "chỗ con có mưa không." và KHÔNG còn câu mưa ✓ (câu đã xoá mặc định không xuất hiện — không dùng khung cũ sót lại); s8 @1056 phone "Đã gọi lại ✓" + hold lặng cuối (f1290 không caption — early-off CcCaps hoạt động).
- SFX cues giữ nguyên offset: s1 missed-call 5+95 ≤ 115 ✓; s2 hangup 68 ≤ 101 ✓; s3 notif/typing 65/96 ≤ 184 ✓; s5 ring/pickup 5/45 ≤ 172 ✓; s8 chime 120+70 = 190 ≤ 252 ✓. Volume không đổi.
- Sub-story beat: hook 00:00–3.8s → bấm tắt → nhắn hứa → quên → gọi lại để hai người nói chuyện (típ ấm) → chốt "Đã gọi lại" callback khớp đúng cấu trúc brief §story spine; nửa sau ấm-chậm giữ.
- Captions = S*_PARTS nối khớp voice.json từng chữ (s5 4 phần, s7 4 phần; s7 v3 đã khớp sau xoá câu mưa) — voice.json read-only sau khi review A thông qua.

### Tickets

- E-t1 | Thấp | phone s7/s8 hiển thị "Đang gọi" trong khi đã kết nối (UI mock) | giữ như thiết kế đã qua D; không phải ràng buộc fact | director | accepted
- E-t2 | Thấp | s8 dùng đúng layout TwoRoomsCall thay vì "chiếc phone đầu video" độc lập (script v2 mô tả) | state "Đã gọi lại ✓" vẫn hiện rõ; nghĩa callback đạt; đổi layout ở vòng này = chạm viewport đã qua D 9.0 | director | accepted + ghi chú

verdict: pass (tương đương vòng 2 9.6 đã đánh trên 1419f; vòng này 9.4 — tuyệt đối số mới, giữ chất lượng thiết kế không đổi).
