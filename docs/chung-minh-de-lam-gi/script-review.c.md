# Script review (c) — chung-minh-de-lam-gi

Lens: spoken naturalness + syllable timing + visual feasibility. Style: minimal stick-figure đen/trắng/cam, one metaphor/scene, text-primary, motion nhẹ, safe zones 9:16.

## Điểm

| Hạng mục | Điểm | Ghi chú |
|---|---|---|
| Nói tự nhiên (Thanh Long) | 8.5/10 | Không loanword trong voice; không tongue-twister thật; trừ lặp "bạn…bạn" s6, s8 hơi gọn quá |
| Đếm âm tiết + nhịp | 9.0/10 | Recount khớp 192 từng key; chuỗi mốc shot khớp từng frame; sai tổng hold −0.2s (T1) |
| Key tách phủ pause | 10/10 | Mọi gap/hold/lặng đều là boundary hoặc tail; re-hook key riêng; lặng 2.0s tail s11 |
| Khả thi stick-figure | 7.5/10 | Dựng được hết với ràng buộc flat-shape; 6 ticket thiết kế (T2,T3,T5–T8) |
| Caption + cover | 9.0/10 | Mọi chunk ≤28 đã verify; 1 chỗ chẻ từ ghép (T4); band cover không chồng, tương phản đạt |

**Overall: 8.8/10 — PASS WITH TICKETS** (không cần review lại, sửa ticket rồi đi tiếp; đo ffprobe xác nhận).

## Verify đếm (token cách-trắng trên voice.proposed.json)

s1 8 · s2a 13 · s2b 11 · s3 15 · s4a 14 · s4b 14 · s5 10 · s6 15 · s7a 13 · s7b 13 · s8 16 · s9a 12 · s9b 12 · s10 12 · s11 14 = **192** ✓ khớp draft.
Voice thuần: 192/4.1=**46.8s** · /4.3=**44.7s** · /3.8=**50.5s** ✓.
Chuỗi mốc shot cộng dồn khớp tuyệt đối (end 52.87s @4.1) ✓. Per-shot `âm tiết/4.1` khớp cột giây ✓.

## Tickets

- [ ] **T1 (timing, minor):** tổng hold cộng tay = 0.25+0.20+0.25+0.15+0.25+0.25+0.20+0.30+0.20+0.40+0.40+0.20+0.30+0.40+0.30+2.0 = **6.05s**, draft ghi 5.85s (lệch 0.20s). Sửa Totals → **~52.9 / ~50.8 / ~56.6s** (@4.1/4.3/3.8). Cả ba vẫn ≤59.5s ✓.
- [ ] **T2 (chip s6, must-fix):** chip "hiện 0.6–4.8s của shot (≥4s)" nhưng shot s6 chỉ **3.86s** — cửa sổ chip dài hơn shot, không thể vừa "≥4s" vừa "mờ trước cú cắt". Fix: chip 0.3–3.6s (~3.3s) + nới điều kiện "≥4s", hoặc kéo shot. Giữ fade trước cut.
- [ ] **T3 (s3 word-sync):** "ba huy chương rơi trùng ba danh từ" cần timestamp từng từ, voice.json chỉ có key-level. Fix: choreography 3 nhịp đều trong key, hoặc lấy word-timestamp từ voice-agent; không hứa sync chính xác từng danh từ.
- [ ] **T4 (caption s7a):** chunk "tấm bằng / khen này" chẻ đôi từ ghép "bằng khen". Re-chunk: `Bạn đã tưởng tấm / bằng khen này sẽ lấp / được câu nói cũ.` (16/20/16 ký tự, đều ≤28).
- [ ] **T5 (s2b mặt que):** "cận mặt, nụ cười gượng, mắt cụp" dễ thành vẽ mặt chi tiết — giới hạn ≤3 nét (2 chấm mắt + 1 nét miệng ngắn), không mặt chi tiết.
- [ ] **T6 (glow/gradient):** "phát sáng mờ" (s4b), "bóng loáng phản chiếu" (s7a), "vệt sáng" (s7b/s9b) — render bằng shape phẳng + opacity, **cấm gradient/blur filter** (style + deterministic).
- [ ] **T7 (s7a reflection):** "mặt que méo mó phản chiếu trên huy chương" quá phức tạp cho que tối giản — thay bằng 2–3 đường cong gợi bóng, giữ bubble + huy chương làm chính.
- [ ] **T8 (s4a confetti):** motion bận nhất video — giới hạn số hạt, thưa; "phòng sáng rực" diễn bằng shape trắng trên nền đen, nền vẫn đen.
- [ ] **T9 (dấu câu trong voice text):** colon s2a/s2b/s8/s9b + 3 comma s3 sẽ tạo pause TTS ngoài timeline. Budget còn dư (~3s tới 59.5) nên giữ được, nhưng **ffprobe phải xác nhận**; nếu lố thì rút đuôi s5/s7b trước (đúng thứ tự draft).
- [ ] **T10 (s6, optional):** "để ý bạn… so với bạn vẫn tưởng" lặp "bạn" 2 lần. Có thể → "so với điều bạn vẫn tưởng" (+1 syl = 16, +~0.24s, vẫn vừa). Không bắt buộc.
- [ ] **T11 (s8, optional):** "đạt điều mình khoe" gọn kiểu viết; nói tự nhiên hơn: "đạt được điều mình từng khoe" (+3 syl). Cân nhắc cùng voice-agent; không bắt buộc.
- [ ] **T12 (s9b đại từ):** "mình" là nhân vật tự hỏi mình (đúng story), TTS đọc phẳng dễ lẫn referent — dặn take/seed nhấn "hỏi nhỏ" để phân lớp thoại.
- [ ] **T13 (headline s5/s10/s11):** 44–55 ký tự → tối đa 3 dòng ExtraBold, check đọc được trên điện thoại ở still QA.
- [ ] **T14 (s7b heartbeat):** "nhịp gõ như tim (synth)" vs lesson 9 "không synth" (gốc là SFX đám đông). Director quyết: giữ pulse tối giản tự thu hoặc drop, không dùng synth preset đám đông.
- [ ] **T15 (cover 2 ẩn dụ):** huy chương + ghế trống trong một cảnh — chấp nhận là ngoại lệ hook có chủ ý; giữ ghế background-mờ, huy chương foreground-focus để một điểm nhấn.
- [ ] **T16 (ASR watchlist):** "khẩy", "triền miên", "phăng phắc", "định giá" — giọng Nam gộp phụ âm cuối có thể CER>0.04 → ghi accepted-noise theo brief lesson 10, không regen vô ích.
