# Audit: Tập 2 — Không Thành Kế

> Skill: `animation-script-audit`. Shorts < 60s → retention beat chấm theo mốc 5–10s. Mọi đánh giá viral/retention là ước lượng biên tập, không phải số liệu thật. Chưa có voice đo thật → mọi thời lượng là ước lượng (4.5 âm/s + đệm dấu câu).

## Chấm lại bản sửa (2026-11-24)

**Chất lượng: 80/100 (+17) · Tăng trưởng: 39/50 (+11, tiềm năng cao) · Kết luận: Cần sửa nhẹ: đo voice thật ≤ 52s trước khi khóa**

> Tự chấm bởi chính agent đã sửa → có thiên lệch. Trước gate A nên giao `script-reviewer` (clean context) chấm độc lập.

| Nhóm | Cũ → Mới | Thay đổi tạo điểm |
|---|---|---|
| A. Hook | 8 → 13/15 | 21 âm myth-bust, quân tan thành khói = câu hỏi bằng hình, khung thumbnail |
| B. Setup | 7 → 8/10 | Mốc "Trong truyện" đặt sớm (B2) |
| C. Agency | 6 → 6/10 | Giới hạn format explainer |
| D. Cấu trúc & nhịp | 7 → 12/15 | 290 → 181 âm, ~49s; timecode khớp lượng lời |
| E. Logic | 9 → 14/15 | Bỏ "chính sử ghi rõ"; nghìn dặm ghi là ước tính (−1 còn lại: con số tự đo) |
| F. Twist & payoff | 7 → 8/10 | Manh mối khói ở B1 trả ở B5–B6 |
| G. Thoại & VO | 6 → 7/10 | Câu cửa miệng khớp Tập 1; bỏ câu hỏi lồng hai vế |
| H. Thông điệp | 4 → 4/5 | — |
| I. Kết & CTA | 2 → 5/5 | "mở cổng kênh" có cả Thích + Đăng ký, câu hỏi comment, thẻ Tập 3, loop |
| J. Sản xuất | 4 → 4/5 | 4 bối cảnh + bản đồ, đám đông dùng `drawSoldierCrowd` |
| K1 | 5 → 5/7 | Không đổi |
| K2 | 3 → 5/6 | Thumbnail 2 chữ; tiêu đề hỏi thật, video trả lời thật |
| K3 | 4 → 5/6 | Câu hỏi comment "có thành trống không?" |
| K4 | 3 → 5/6 | Hết đoạn hụt; manh mối xem lại; loop |
| L1 | 5 → 7/8 | Nằm đúng thứ tự series |
| L2 | 4 → 5/6 | CẠCH + câu cửa miệng thống nhất |
| L3 | 3 → 5/6 | Thẻ Tập 3 cụ thể (váy) thay "video dài" chung chung |
| L4 | 1 → 3/5 | Gieo comment; chưa có cơ chế đọc comment ở tập sau |

---

## Bản audit gốc (trước khi sửa)

**Chất lượng: 63/100 · Tăng trưởng: 28/50 · Kết luận: Cần sửa** (0 Blocker, 4 Major)

- Pitch 1 câu: "Không Thành Kế: Tư Mã Ý thật ra không có mặt." (10 chữ, gây tò mò được)
- Thông điệp: màn đấu trí nổi tiếng nhất Tam Quốc gần như chắc chắn là giai thoại.
- Điểm mạnh nhất: cú lật có thật, có nguồn (Bùi Tùng Chi bác), dễ hiểu bằng bản đồ.
- Vấn đề lớn nhất: dài ~81s thô / ~74s siết, gần gấp rưỡi mục tiêu khai báo 43–47s.

## Lỗi cần sửa

### Major
1. **[Toàn bài] Thời lượng vượt xa.** 290 âm / 31 dấu → ~81s thô; header ghi "~43–47 giây (~115–125 từ)" sai. Mọi timecode trong bảng beat không thực. **Đã sửa:** cắt còn 181 âm (bỏ đoạn Mã Tốc "thi lý thuyết mười điểm…", gộp B3–B4, rút CTA).
2. **[Beat 5 · ~0:29] Nói quá nguồn.** "Chính sử ghi rõ… cách hơn một nghìn dặm… thực chất chưa từng xảy ra!" → chính văn *Tam Quốc Chí* không chép chuyện này; lời bác là của **Bùi Tùng Chi** trong phần chú, và "nghìn dặm" không có trong nguồn. Người mê sử sẽ bắt lỗi ở comment, mất uy tín đúng chỗ kênh định "soi". **Đã sửa:** "Tư Mã Ý đang trấn Uyển Thành bên Kinh Châu, cách chiến trường cả nghìn dặm (ước tính trên bản đồ)! Nhà chú sử Bùi Tùng Chi đã bác thẳng" + "khả năng cao là chưa từng xảy ra" (khớp bản full dòng 139).
3. **[Beat 1 · 0:00] Hook dài, khó nghe.** "Tại sao bạn tin… nhưng sự thật… lại ít ai biết?" 35 âm ~8.4s, câu hỏi hai vế lồng nhau, khuôn "X…, nhưng tại sao Y" lặp ở cả Tập 3–5. **Đã sửa:** "Một cây đàn đuổi mười lăm vạn quân? Màn đấu trí đẹp nhất Tam Quốc có một lỗ hổng to đùng!"
4. **[Beat 6] CTA thiếu Đăng ký, funnel lệch.** Chỉ "ấn Thích và bấm video dài"; CLAUDE.md bắt buộc CTA Thích **và** Đăng ký gắn motif. Màn tặng váy là nội dung Tập 3 nhưng lại đẩy sang video dài. **Đã sửa:** "A Xìn mở cổng kênh: bấm Thích, rồi Đăng ký mà vào!" + câu hỏi comment + thẻ Tập 3.

### Minor
- [Beat 3] "sai lính giả làm dân **quét lá**" → truyện ghi quét đường. Đã sửa.
- [Beat 6] "khiến cả doanh trại chấn động" không nguồn → bỏ.
- [Tiêu đề] "Vì Sao Tư Mã Ý Sợ Thành Trống?" giả định ông có mặt, trái với payoff → "Tư Mã Ý Thật Sự Sợ Thành Trống?"
- [Thumbnail] `CÁCH NHAU 1000 DẶM!` 4 chữ và dựa vào con số không có trong nguồn → `VẮNG MẶT!`
- [Funnel] "22 PHÚT" lệch bản full hiện tại (25 phút, chưa đo) → `XEM BẢN FULL`.
- [§1B] Hook #1 "sự thật đã bị mất?" tối nghĩa; điểm `hookscore`/`title.py` đã cũ.

## Kết quả phép kiểm
- **Con số:** 228 (Nhai Đình) · 2.500 lính · 15 vạn quân (truyện) · ~1.000 dặm (ước tính, đã ghi nhãn) → khớp nhau.
- **Continuity:** quân tan thành khói (B1) ↔ Tư Mã Ý vắng mặt (B5) ↔ bóng trống trong tranh (B6).
- **Setup–payoff:**

  | Chi tiết | Gài? | Trả? |
  |---|---|---|
  | Búa CẠCH | B1 | B5 |
  | Quân tan thành khói | B1 | B5–B6 |
  | "Lỗ hổng to đùng" | B1 | B5 |
  | Hộp váy (Tập 3) | B7 (thẻ) | Tập 3 |
- **Agency:** A Xìn (người soi) đưa ra bằng chứng; hợp format explainer.
- **Deus ex machina / người động viên:** không / 0.
- **Thoại giải thích hình:** "quay đầu rút sạch" trùng hình; chấp nhận cho người xem tắt tiếng.
- **Thời lượng (siết pause):** B1 5.3 · B2 7.8 · B3 4.7 · B4 4.9 · B5 11.4 · B6 3.9 · B7 10.9 → **~49s** (thô ~56s).
- **Tiếng Việt:** tự nhiên; "Đăng ký mà vào" là chơi chữ với "mở cổng", đọc lên ổn.
- **Test pitch:** đạt.
- **Test packaging:** "Tư Mã Ý Thật Sự Sợ Thành Trống?" · "Không Thành Kế: Tư Mã Ý Ở Đâu?" · "Màn Gảy Đàn Đuổi Quân Có Thật?". Thumbnail: lầu thành + quân tan khói + `VẮNG MẶT!`. Lời hứa trả ở ~0:23. Đạt.
- **Test chia sẻ:** gửi bạn mê Tam Quốc: "Không Thành Kế là chém đó mày".
- **Test tập tiếp theo:** có, thẻ Tập 3 (bộ váy).

## Gợi ý tăng trưởng
- Đoạn cắt: B5–B6 (~15s) làm clip "bản đồ nghìn dặm" cho Reels/TikTok.
- CTA comment đã gắn; tập sau ghim 1 comment "tin có thành trống".

---

## Kiểm tra chéo Tập 1–5 (cả series)

| Tập | Hook (khuôn) | Dấu kết | Âm / ước tính | Thẻ tập sau |
|---|---|---|---|---|
| 1 Thuyền cỏ | Myth-bust + câu hỏi | TRUYỆN CHÉM! | 180 / ~50s | Tập 2 (đã sửa thẻ ở Tập 1) |
| 2 Không Thành | Câu hỏi + lời hứa lỗ hổng | TRUYỆN CHÉM! | 181 / ~49s | Tập 3 |
| 3 Váy | Khẳng định → phủ định | SỬ THẬT: DIỄN GIẬN! | 182 / ~51s | Tập 4 |
| 4 Điêu Thuyền | Nửa đáp án + treo | NỬA THẬT NỬA CHÉM! | 183 / ~49s | Tập 5 |
| 5 A Đẩu | Nghịch lý + hỏi nhị phân | SỬ THẬT! (MÀ CÒN HÀI HƠN) | 188 / ~52s | Bản full |

- **Khuôn lặp (bản cũ):** Tập 2–5 cùng hook "X…, nhưng tại sao Y?", Tập 3–4 cùng "Chín mươi (lăm) phần trăm" bịa, Tập 3–5 cùng CTA "ấn Thích và bấm video dài". Đăng liên tiếp 1 Short/ngày sẽ thấy lặp và dính rủi ro "nội dung lặp" của YPP. Bản sửa: 5 khuôn hook khác nhau, 4 dấu kết khác nhau, mỗi CTA dùng motif riêng (mượn / mở cổng / ngồi chờ / trung thành / vui không nhớ).
- **Câu cửa miệng:** thống nhất "A Xìn soi luôn: sử thật thì sao?" theo bản khóa của Tập 1 (bản full dài dùng "truyện chém hay sử thật?": giữ cho 16:9, hai format khác nhau).
- **Binge path:** 1 → 2 → 3 → 4 → 5 → bản full. Tập 1 trước đây quảng cáo "Tập 2: Gió Đông…" và §1D liệt kê thứ tự khác (Gió Đông, Hoa Hùng): đã sửa cho khớp thứ tự thật. Gió Đông / Hoa Hùng giữ làm ứng viên Tập 6+.
- **Xếp hạng (sau sửa):** Tập 5 (cú lật Khước Chính mạnh nhất, tranh luận tốt) ≈ Tập 3 (lật kép truyện/sử) > Tập 2 (lật rõ, dễ hình) > Tập 4 (nửa đáp án đoán được). Công sản xuất: Tập 2 nặng nhất (đám đông + bản đồ), Tập 4 nhẹ nhất.
- **Còn mở:** đo voice thật cả 4 tập · chạy lại `title.py`/`hookscore.py` · tạo playlist "A Xin Chém Sử" · `script-reviewer` clean-context chấm độc lập trước gate A.
