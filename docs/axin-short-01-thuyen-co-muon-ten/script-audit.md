# Audit: Tập 1 — Ai Mới Là Chủ Thuyền Cỏ Mượn Tên?

## Chấm lại bản v3 (2026-11-24, sau khi áp Major + Minor + gợi ý tăng trưởng)

**Chất lượng: 83/100 (+10) · Tăng trưởng: 41/50 (+9, tiềm năng cao) · Kết luận: Sẵn sàng sang bước voice — chưa khóa sản xuất cho tới khi đo voice thật ≤ 52s**

> Tự chấm bởi chính agent đã viết lại kịch bản → có thiên lệch. Trước gate A nên giao `script-reviewer` (clean context) chấm độc lập.

| Nhóm | v2 → v3 | Thay đổi tạo điểm |
|---|---|---|
| A. Hook | 11 → 13/15 | Frame 0 hiểu khi tắt tiếng; bóng râu tía; khung hook = khung thumbnail; lời hứa khớp payoff |
| B. Setup | 8 → 9/10 | Bóng La Quán Trung gài ở Beat 2 |
| C. Agency | 6 → 6/10 | Giới hạn của format explainer |
| D. Cấu trúc & nhịp | 11 → 12/15 | Timecode khớp lượng lời; đoạn kể lại 0:05–0:24 vẫn là chuyện quen (rủi ro hụt còn lại) |
| E. Logic | 11 → 14/15 | Major 1 đã sửa; "chưa từng làm" giữ có chủ đích (−1) |
| F. Twist & payoff | 7 → 8/10 | Manh mối xem lại (bóng râu tía, Tôn Quyền tí hon Beat 3, thuyền nghiêng Beat 4) |
| G. Thoại & VO | 7 → 8/10 | Trả lại "A Xìn soi luôn"; caption quote "MƯỢN TÊN… MƯỢN LUÔN CHIẾN CÔNG" |
| H. Thông điệp | 4 → 4/5 | — |
| I. Kết & CTA | 4 → 5/5 | Câu hỏi comment + loop "tập sau A Xìn soi!" → "Thuyền cỏ mượn tên?" |
| J. Sản xuất | 4 → 4/5 | Thêm easter egg/prop nhỏ, vẫn làm được trong Remotion |
| K1. Concept | 5 → 5/7 | Không đổi |
| K2. Packaging | 4 → 5/6 | Thumbnail `SAI RỒI!` (2 chữ); "Tập 1:" giữ vì chuẩn series trong CLAUDE.md |
| K3. Cảm xúc & chia sẻ | 4 → 5/6 | Điểm kích hoạt comment |
| K4. Giữ chân | 4 → 5/6 | Manh mối xem lại + loop |
| L1. Series | 6 → 7/8 | Định nghĩa series A Xin Chém Sử 4 tập |
| L2. Dấu ấn kênh | 3 → 5/6 | CẠCH frame 0 + câu cửa miệng + dấu TRUYỆN CHÉM!/SỬ THẬT! |
| L3. Vòng lặp tập sau | 3 → 5/6 | Thẻ "Tập 2: Gió Đông…" + funnel 22 phút; playlist chưa tạo |
| L4. Cộng đồng | 3 → 4/5 | Gieo comment cho tập sau |

**Ước tính thời lượng v3:** 180 âm, 33 dấu câu → ~58s thô / ~50s sau siết pause 0.3s. Nếu đo thật > 52s: cắt "Sách" (B5) và "Trong truyện," (B2) trước, rồi mới tính cắt câu.

**Còn mở:** đo voice thật · chạy lại `title.py` cho thumbnail mới · tra nguồn Tập 2–4 trước khi viết · tạo playlist "A Xin Chém Sử".

---

## Bản audit v2 (trước khi sửa)

> Skill: `animation-script-audit`. Định dạng Shorts < 60s → retention beat chấm theo mốc 5–10s thay vì 20–30s. Mọi đánh giá viral/retention là ước lượng biên tập, không phải số liệu thật. Chưa có voice đo thật → mọi thời lượng là ước lượng.

**Chất lượng: 73/100 · Tăng trưởng: 32/50 · Kết luận: Cần sửa** (0 Blocker, 3 Major)

> **Cập nhật 2026-11-24:** cả 3 Major đã sửa vào `narration-vbee.txt` + `script.md` (hook hỏi "thuyền hứng tên… của ai?", thêm "A Xìn soi luôn", cắt 3 cụm → 173 âm, ~55.5s thô / ~48s sau siết pause). Điểm trên là của bản trước khi sửa; chưa chấm lại. Minor + gợi ý tăng trưởng chưa áp dụng.

- Pitch 1 câu: "Thuyền cỏ mượn tên thật ra là chuyện của Tôn Quyền." (11 chữ — gây tò mò được)
- Thông điệp: Tam Quốc Diễn Nghĩa là tiểu thuyết; nhiều chiến công "của Khổng Minh" được mượn từ người khác.
- Điểm mạnh nhất: cú lật có nguồn thật + motif "mượn" chạy xuyên suốt tới CTA.
- Vấn đề lớn nhất: thời lượng ước tính ~57s, vượt mốc 52s và các timecode trong bảng beat.

## Bảng điểm chất lượng
| Nhóm | Điểm | Ghi chú ngắn |
|---|---|---|
| A. Hook | 11/15 | Myth-bust + hình Khổng Minh nứt đôi mạnh; nhưng lời hứa "người mượn tên thật" lệch payoff (Major 1); hiểu khi tắt tiếng nhờ chữ, chưa nhờ hình |
| B. Intro / Setup | 8/10 | Kèo Chu Du gọn, rõ cái giá ("chém"); La Quán Trung chưa gài trước Beat 6 |
| C. Nhân vật & agency | 6/10 | Format explainer: A Xìn chủ động (búa, dấu); Tôn Quyền có hành động quyết định; không có arc nhân vật — chấp nhận được với thể loại |
| D. Cấu trúc & nhịp | 11/15 | Re-hook ở ~24s tốt; Beat 2–4 kể lại chuyện quen (~20s) có nguy cơ hụt; timecode lạc quan so với lượng lời |
| E. Logic & continuity | 11/15 | −3 Major 1 (hứa "mượn tên" nhưng Tôn Quyền bị bắn, không mượn); −1 Minor "chưa từng làm" khẳng định tuyệt đối |
| F. Twist & payoff | 7/10 | Lật sự thật thật, có gài (bóng đen dấu hỏi Beat 1); một phần khán giả mê sử đã biết |
| G. Thoại & VO | 7/10 | Có câu quote được ("La Quán Trung mượn luôn chiến công của Tôn Quyền"); mất catchphrase "A Xìn soi" (Major 3) |
| H. Thông điệp | 4/5 | Một ý rõ; chưa có hành động mang về (vd tự nghi vấn chi tiết Tam Quốc khác) |
| I. Kết & CTA | 4/5 | CTA "mượn nút Thích" gắn motif, loop về khung đầu; thiếu câu hỏi bình luận; CTA ~9s hơi dài |
| J. Sản xuất & nền tảng | 4/5 | 5 bối cảnh (palace, sông sương, bàn trà, thuyền Tôn Quyền, chase) + mưa tên particle — làm được trong Remotion; nhân vật Tam Quốc là public domain |

## Bảng điểm tăng trưởng
| Nhóm | Điểm | Ghi chú ngắn |
|---|---|---|
| K1. Concept & đối tượng | 5/7 | Tam Quốc phổ biến ở VN, "truyện chém hay sử thật" dễ hiểu; không phải nỗi đau phổ quát mà là tò mò/tranh luận |
| K2. Packaging | 4/6 | "Tập 1:" ăn 7/40 ký tự đầu; thumbnail 4 chữ (giới hạn 3) |
| K3. Cảm xúc & chia sẻ | 4/6 | Bất ngờ + hài; kích hoạt tranh luận tốt nhưng chưa có câu hỏi bình luận |
| K4. Đường cong giữ chân | 4/6 | Loop + re-hook có; đoạn hụt tiềm năng 0:05–0:20 |
| L1. Vũ trụ & series | 6/8 | Format lặp được mỗi tập soi 1 "chiến công mượn"; A Xìn + búa gỗ là linh vật |
| L2. Dấu ấn kênh | 3/6 | Búa "CẠCH" + dấu "TRUYỆN CHÉM!" có; câu cửa miệng "A Xìn soi" đã bị bỏ khỏi VO |
| L3. Vòng lặp sang video tiếp | 3/6 | Có funnel bản full 22 phút; không có mồi tập 2 cụ thể |
| L4. Cộng đồng & sau xem | 3/5 | Chưa gieo bình luận cho tập sau |

## Lỗi cần sửa

### Blocker
- Không có.

### Major
1. **[Beat 1 · 0:00] Lời hứa lệch payoff.** "Vậy người mượn tên thật là ai?" → Beat 5 nói Tôn Quyền *bị bắn* rồi quay thuyền cho cân, không hề "mượn tên". Người xem mê sử sẽ comment "Tôn Quyền đâu có mượn". **Sửa:** "Thuyền cỏ mượn tên? Khổng Minh chưa từng làm! Chuyện thuyền hứng tên có thật, nhưng là của ai?"
2. **[Toàn bài] Thời lượng vượt.** Ước tính (4,5 âm/s + 0,55s đệm mỗi dấu câu) theo beat: B1 5,2s (slot 4) · B2 7,9 (7) · B3 9,2 (8) · B4 6,6 (5) · B5 14,4 (14) · B6 4,9 (4) · B7 9,1 (8) → **~57s**. Theo thang 2,5–3 chữ/s của skill thì 60–72s. **Sửa:** cắt "trống trận vang trời", "rồi ung dung về trại", "Tam Quốc hai mươi hai phút" → "bản full ở ngay bên dưới"; siết pause trong timeline builder (không tăng speed). Đo voice thật rồi khóa lại timecode.
3. **[Beat 5 · ~0:24] Mất câu cửa miệng kênh.** Bản cũ có "A Xìn soi luôn: truyện chém hay sử thật?" — đây là signature của "A Xin Chém Sử". **Sửa:** "Nhưng A Xìn soi luôn: sử thật thì sao?" (thêm 3 âm, bù bằng các cắt ở Major 2).

### Minor
- [Beat 1] "Khổng Minh chưa từng làm!" khẳng định tuyệt đối → an toàn hơn: "Sử không hề ghi Khổng Minh làm!" (hoặc giữ, chấp nhận tranh luận).
- [Beat 6] La Quán Trung xuất hiện lần đầu ở 0:38 → gài: bóng ông cầm bút trong Beat 2 (góc khung "Tác giả: La Quán Trung").
- [Beat 4] Thuyền "như con nhím" nên nghiêng nhẹ một bên → gài sẵn vật lý cho cú quay thuyền của Tôn Quyền (setup thị giác).
- [Title] "Tập 1:" chiếm đầu tiêu đề; thumbnail 4 chữ → "KHÔNG PHẢI KHỔNG MINH" giữ, hoặc rút "SAI RỒI!" + mặt Khổng Minh nứt.

## Kết quả phép kiểm
- **Con số:** 10 vạn tên / 10 ngày / 3 ngày / 20 thuyền / hơn 10 vạn (truyện ghi 15–16 vạn) / Nhu Tu 213 / 22 phút → khớp nhau, không mâu thuẫn.
- **Continuity:** Khổng Minh nứt đôi (B1) → ảnh Khổng Minh bị đóng dấu (B5) nhất quán. Thuyền cỏ B1 ↔ khung loop B7 nhất quán.
- **Setup–payoff:**

  | Chi tiết | Gài? | Trả? |
  |---|---|---|
  | Búa gỗ A Xìn | B1 | B5 (đóng dấu) |
  | Bóng đen dấu hỏi | B1 | B5 (Tôn Quyền) |
  | Thuyền nghiêng / cân | Chưa (Minor) | B5 |
  | La Quán Trung | Chưa (Minor) | B6 |
  | Motif "mượn" | B1 (tiêu đề hook) | B6, B7 (CTA) |
- **Agency ở cao trào:** A Xìn (người soi) + Tôn Quyền (người quay thuyền) — phù hợp explainer.
- **Deus ex machina:** không.
- **Số người động viên:** 0.
- **Thoại giải thích hình:** text "TẠ THỪA TƯỚNG TẶNG TÊN!" trùng VO — chấp nhận cho Shorts (xem không tiếng).
- **Tiếng Việt:** tự nhiên; "thiếu thì chém tôi" đúng tinh thần quân lệnh trạng.
- **Test pitch:** đạt (11 chữ).
- **Test packaging:** 3 tiêu đề — "Thuyền Cỏ Mượn Tên: Không Phải Khổng Minh?" · "Ai Mới Là Chủ Thật Của Thuyền Cỏ?" · "Khổng Minh Mượn Tên? Sử Ghi Khác!". Thumbnail: Khổng Minh chibi nứt đôi trên thuyền cỏ, sau lưng bóng râu tía, chữ "SAI RỒI!". 30s đầu giữ lời hứa (reveal ở ~0:24) — đạt nếu sửa Major 1.
- **Test chia sẻ:** gửi đứa bạn mê Tam Quốc: "mày vẫn tin Khổng Minh mượn tên đúng không 😏".
- **Test tập tiếp theo:** hiện chỉ có "bản full 22 phút"; chưa có lý do cụ thể bấm Short kế.

## Gợi ý tăng trưởng
- **Đoạn cắt:** chính Short này là mồi cho long-form 22 phút; trong long-form, đoạn này cắt lại 30s (B4–B6) làm Short thứ hai "Tôn Quyền quay thuyền".
- **Mồi tập 2:** thêm 1 câu ở B7 hoặc text: "Tập sau: gió Đông có phải Khổng Minh cầu?" — cùng format "chiến công mượn".
- **CTA bình luận:** "Còn chi tiết Tam Quốc nào bạn nghi là truyện chém? Comment, A Xìn soi tập sau!" — thay một phần CTA bản full nếu cần giữ dưới 55s.
- **Series "A Xin Chém Sử":** mượn tên (Tôn Quyền) → cầu gió Đông → Quan Vũ chém Hoa Hùng (sử: Tôn Kiên) → Không thành kế. Mỗi tập mở bằng búa "CẠCH" + kết bằng dấu "TRUYỆN CHÉM!".
