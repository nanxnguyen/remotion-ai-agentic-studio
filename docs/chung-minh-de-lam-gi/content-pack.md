# Content pack — chung-minh-de-lam-gi

Profile `story` · 15 keys / 12 shots · `voice.json` khóa (gate A — không đổi một chữ) · không CTA · kết bằng câu hỏi mở + lặng thuần 2.0s.

Quy ước (khóa theo script + user constraints):
- Caption đáy `bottom:224`, ngoài 210px đáy; mỗi dòng chunk ≤28 ký tự, ngắt ở biên cụm từ.
- HEADLINE thay caption ở s1/s5/s10/s11 (không hiện caption đáy cùng lúc); các key còn lại chỉ caption đáy, không on-screen text riêng (trừ chip nguồn).
- Accent cam `#F58B4C` theo cột accent của script (s4a trắng, không cam); ≤2 cụm/key.
- Mọi dòng `>` bên dưới là chữ hiện trên màn hình khớp từng byte lời nói: join bằng 1 dấu cách == `voice.json`.
- Chip nguồn fade trước cú cắt, không lấn sang shot kề; UI dựng lại gắn nhãn `minh hoạ`.

## Per-key (đúng thứ tự voice.json)

### s1 · HOOK · HEADLINE thay caption

- On-screen (final): HEADLINE 2 dòng, ExtraBold trắng, `trống` cam — đủ từ frame 0.

> Được công nhận rồi.
> Sao vẫn thấy trống?

- Caption đáy: — (headline thay caption).
- Accent: `trống` (cam).
- Label: thiết kế (cover: que + huy chương cam + ghế trống, brief §Style).
- Claims: — (topic user, research §5 hook #1).

### s2a · caption

- On-screen: — (caption only).
- Caption đáy:

> Tháng đầu đi làm,
> cuối buổi họp, bạn nói khẽ:
> để rồi xem.

- Accent: `để rồi xem` (cam).
- Label: minh hoạ/thiết kế (văn phòng đêm, research §3/I5).
- Claims: —.

### s2b · caption + chữ trong cảnh

- On-screen: chữ trong cảnh — bong bóng thoại cũ `nó thì làm được gì` (nhãn `minh hoạ`, không gán cho ai).
- Caption đáy:

> Ai đó cười khẩy
> thành tiếng: nó thì
> làm được gì.

- Accent: `làm được gì` (cam).
- Label: `minh hoạ` (bong bóng thoại cũ + bóng lưng không mặt).
- Claims: — (research §3).

### s3 · caption

- On-screen: — (caption only).
- Caption đáy:

> Từ đó, tăng ca
> triền miên, bằng khen,
> chức danh, bạn gom
> hết về mình.

- Accent: `bằng khen` · `chức danh` (cam).
- Label: minh hoạ/thiết kế (3 huy chương cam đặc, research I3).
- Claims: —.

### s4a · caption

- On-screen: — (caption only).
- Caption đáy:

> Ngày nhận bằng khen,
> cả phòng đứng dậy
> vỗ tay, bạn cười
> rất tươi.

- Accent: `vỗ tay` · `cười` (trắng, không cam — niềm vui thật lúc đó).
- Label: minh hoạ/thiết kế (phòng họp + confetti thưa).
- Claims: —.

### s4b · HIGHLIGHT 1 · caption

- On-screen: — (caption only).
- Caption đáy:

> Tối về, phòng trọ
> im phăng phắc,
> tấm bằng khen nằm im
> trên tường.

- Accent: `im phăng phắc` · `nằm im` (cam).
- Label: minh hoạ/thiết kế (ghế trống, research §4).
- Claims: —.

### s5 · RE-HOOK · HEADLINE thay caption

- On-screen (final): HEADLINE (= lời nói), sống đúng trong clip s5.

> Nếu không ai biết
> chuyện này, bạn
> còn làm không?

- Caption đáy: — (headline thay caption).
- Accent: `còn làm không?` (cam).
- Label: thiết kế re-hook (research §5 hook #3 + F2/F5, I2).
- Claims: —.

### s6 · caption + chip nguồn

- On-screen: chip nguồn góc trên, window **0.3–3.6s** trong shot 3.86s, fade trước cú cắt, không lấn shot kề: `Hiệu ứng spotlight (Gilovich & cs., 2000): ta tưởng người khác để ý mình hơn thực tế — đo ở chú ý tức thời`.
- Caption đáy:

> Thật ra, người ta
> để ý bạn ít hơn nhiều
> so với bạn vẫn tưởng.

- Accent: `ít hơn nhiều` (cam).
- Label: — (không UI dựng lại).
- Claims: C1 (F1/S4, phạm vi chú ý tức thời; không số Manilow — U1).

### s7a · HIGHLIGHT 2 (nửa đầu) · caption — KHÓA 3 dòng 16/20/16

- On-screen: bong bóng thoại cũ lơ lửng cạnh huy chương (nhãn `minh hoạ`).
- Caption đáy (EXACT, không đổi ngắt dòng):

> Bạn đã tưởng tấm
> bằng khen này sẽ lấp
> được câu nói cũ.

- Accent: `lấp được` · `câu nói cũ` (cam).
- Label: `minh hoạ` (bong bóng thoại cũ).
- Claims: C4 (diễn giải I1 — dạng hình ảnh, không kết luận).

### s7b · HIGHLIGHT 2 (nửa sau) · caption

- On-screen: — (caption only).
- Caption đáy:

> Nó chỉ treo yên
> trên tường. Còn câu nói
> vẫn nằm trong ngực.

- Accent: `treo yên` · `nằm trong ngực` (cam).
- Label: —.
- Claims: C4 (như s7a).

### s8 · caption + chip nguồn

- On-screen: chip nguồn góc trên, window **0.3–3.8s** trong shot 4.10s, fade 0.3s trước cú cắt, không lấn shot kề: `Nghiên cứu dọc 4 tuần (J. Personality 2010, abstract): đạt mục tiêu ngoại lai không tăng wellbeing`. Biểu đồ đường trắng 4 nốt tuần (không chữ/số ngoài chip) — minh hoạ, không số liệu.
- Caption đáy:

> Có nghiên cứu theo dõi
> bốn tuần: đạt điều
> mình khoe, lòng vẫn
> nguyên chỗ trống.

- Accent: `khoe` · `chỗ trống` (cam).
- Label: `minh hoạ` (biểu đồ).
- Claims: C2 (F3/S11, phạm vi abstract — U5; không trích số chi tiết).

### s9a · HIGHLIGHT 3 (nửa đầu) · caption

- On-screen: — (caption only).
- Caption đáy:

> Nửa đêm, bạn soi gương
> thật lâu, không sửa tóc,
> chỉ nhìn.

- Accent: `soi gương` · `chỉ nhìn` (cam).
- Label: minh hoạ/thiết kế (soi gương nửa đêm, research §4).
- Claims: —.

### s9b · HIGHLIGHT 3 (nửa sau) · caption

- On-screen: — (caption only).
- Caption đáy:

> Rồi bạn hỏi nhỏ:
> rốt cuộc, mình đang cần
> điều gì nhất?

- Accent: `cần điều gì nhất?` (cam).
- Label: —.
- Claims: — (khung biên kịch I3 + ngôn ngữ F5/S8).

### s10 · HEADLINE thay caption + chip nguồn

- On-screen (final): HEADLINE (= lời nói), `định giá` cam, giữ 1.0s sau voice. Thẻ giá trắng (nhãn `minh hoạ`) đưa về phía bóng người mờ không mặt.

> Bấy lâu nay, bạn
> trao quyền định giá
> mình cho người khác.

- Caption đáy: — (headline thay caption).
- Chip nguồn góc trên hiện trong shot: `Tuổi Trẻ 14/02/2026 (bình luận): “trao quyền định giá bản thân cho người khác”`.
- Accent: `định giá` (cam).
- Label: `minh hoạ` (thẻ giá).
- Claims: C3 (diễn đạt theo S8/F5 — bài bình luận, không phải thực nghiệm; `bản thân`→`mình` cho khớp ngôi thứ hai).

### s11 · câu hỏi cuối + LẶNG THUẦN · HEADLINE thay caption

- On-screen (final): HEADLINE (= lời nói), giữ suốt shot và cả khoảng lặng 2.0s; không chữ nào thêm. `giữ lại điều gì?` cam.

> Nếu từ mai không cần
> cho ai thấy nữa,
> bạn giữ lại điều gì?

- Caption đáy: — (headline thay caption).
- Accent: `giữ lại điều gì?` (cam).
- Label: — (huy chương vẫn trên tay — không bác bỏ quá khứ, I4).
- Claims: — (thiết kế; câu hỏi phản tư I4).

## Cover (frame 0 = s1)

- Text: HEADLINE 2 dòng như s1 (`trống` cam `#F58B4C`), hiện đủ ngay frame 0 — tắt tiếng vẫn hiểu.
- Subject: que trắng cầm huy chương cam đặc giơ ngang ngực, cúi nhìn; ghế trống trắng đặc opacity 20% background quay lưng; nền đen trống dải 78–100%.

## Re-hook (~19–20s, s5)

Text (headline s5, = lời nói): “Nếu không ai biết chuyện này, bạn còn làm không?”
Câu hỏi mới (từ `mình gom` sang `mình có còn làm không nếu vô hình`), nói + hiện chữ ở ~19.83s.

## CTA

Không có. Kết bằng câu hỏi mở s11 + lặng thuần 2.0s. Không CTA shot, không chữ thêm sau `gì?`.

## Claims (id | claim as shown | source URL | fact/inference)

| id | claim as shown | source URL | fact/inference |
|---|---|---|---|
| C1 | Chip s6: spotlight — ta tưởng người khác để ý mình hơn thực tế, đo ở chú ý tức thời | https://pubmed.ncbi.nlm.nih.gov/10707330/ · https://psycnet.apa.org/record/2000-13328-002 | fact F1/S4 (Gilovich & cs. 2000) |
| C2 | Chip s8: nghiên cứu dọc 4 tuần — đạt mục tiêu ngoại lai không tăng wellbeing | https://pubmed.ncbi.nlm.nih.gov/20433616/ | fact F3/S11, phạm vi abstract |
| C3 | Chip s10: “trao quyền định giá bản thân cho người khác” (Tuổi Trẻ 14/02/2026) | https://tuoitre.vn/cai-bay-cua-chung-minh-minh-dung-20260214132322517.htm | fact F5/S8 — bài bình luận, không phải thực nghiệm |
| C4 | Cặp tương phản s7a/s7b: tấm bằng treo yên trên tường / câu nói nằm trong ngực | https://pubmed.ncbi.nlm.nih.gov/20433616/ · https://doi.org/10.1111/j.0963-7214.2005.00355.x | inference I1 (F3+F4: dự đoán quá mức niềm đủ đầy) — hình ảnh, không kết luận khoa học |

## Labels (mọi UI dựng lại gắn `minh hoạ`)

- s2b: bong bóng thoại cũ `nó thì làm được gì` — `minh hoạ`, không gán cho ai.
- s7a: bong bóng thoại cũ cạnh huy chương — `minh hoạ`.
- s8: biểu đồ đường trắng 4 nốt tuần — `minh hoạ`, không chữ/số liệu ngoài chip.
- s10: thẻ giá trắng — `minh hoạ`; bóng người nhận mờ không mặt.
- Mọi cảnh (họp, phòng trọ, gương, đèn rọi, huy chương): minh hoạ/thiết kế từ research §4.
