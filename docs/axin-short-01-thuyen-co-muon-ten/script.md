# Kịch Bản Shorts Tập 1: Ai Mới Là Chủ Thuyền Cỏ Mượn Tên?

- **Kênh:** A Xìn Kể Chuyện / A Xìn Soi Sử (`A_XIN_KE_CHUYEN`)
- **Định dạng:** 9:16 Vertical Shorts (`1080×1920`), 24fps, thời lượng mục tiêu **~50 giây** (180 âm tiết, 33 dấu câu). Ước tính: Vbee ~4.5 âm/s + đệm mặc định ~0.55s/dấu câu = **~58s thô** (vẫn < 60s) → siết pause còn ~0.3s/dấu trong timeline builder (không tăng speed) = **~50s**. Timecode bảng beat tính theo bản siết; khóa lại sau khi đo voice thật.
- **Skill hình ảnh:** `chibi-history-video` (Nhân vật chibi thân trụ, quạt lông vũ & búa gỗ bay lơ lửng, bảng tên cổ trang, thuyền cỏ + mưa tên 2D)
- **Phong cách:** Hài hước, châm biếm, cà khịa vui, nhịp đổi cảnh mỗi 2.5–4 giây
- **Video dài liên kết (Related Video Funnel):** *Tam Quốc Trong 22 Phút: Ai Thắng Thật?*
- **Series:** *A Xìn Soi Sử* — mỗi tập soi một "chiến công mượn" trong Tam Quốc Diễn Nghĩa (xem mục 1D).

---

## 1. Kết Quả Kiểm Định Plugin (`youtube-agent-skill`)

### A. Tiêu đề & Thumbnail
- **Tiêu đề chính (40 ký tự):**
  `Tập 1: Ai Mới Là Chủ Thuyền Cỏ Mượn Tên?`
  *(Giữ tiền tố `Tập N:` theo chuẩn lịch Shorts series trong CLAUDE.md; khi đăng nối `#shorts #tamquoc #axin`.)* Câu hỏi tiêu đề khớp đúng câu hỏi hook ("…của ai?") → 30s đầu giữ lời hứa.
- **Chữ trên Thumbnail / Cover 9:16 (≤ 3 chữ):** `SAI RỒI!`
  Hình: Khổng Minh chibi nứt đôi như bìa giấy trên thuyền cỏ cắm đầy tên; sau lưng lộ bóng người **râu tía** (manh mối Tôn Quyền). 1 chủ thể + 1 điều bất thường, đọc được ở cỡ điện thoại.
- Tiêu đề hỏi "ai", thumbnail nói "sai" → bổ sung, không lặp thông tin. *(Điểm `title.py` 100/100 trước đây chấm cho cặp cũ; cần chạy lại cho thumbnail mới.)*

### B. Hook (bản sửa 2026-11-24)
- **Hook chốt (Công thức *Myth-bust + Open Question*, 19 âm, ~5.4s sau siết pause):**
  > *"Thuyền cỏ mượn tên? Khổng Minh chưa từng làm! Chuyện thuyền hứng tên có thật, nhưng là của ai?"*
- Câu hỏi hỏi về **thuyền hứng tên** (không phải "người mượn tên") để khớp payoff: Tôn Quyền bị bắn rồi quay thuyền cho cân, không chủ động mượn tên.
- "Khổng Minh chưa từng làm!" giữ có chủ đích: sử không có ghi chép nào về việc này → khẳng định bảo vệ được, và là mồi tranh luận trong comment.
- Bỏ hook cũ "Chín mươi phần trăm bạn xem Tam Quốc…": số liệu bịa, dài 35 âm (~7s), câu rối, đẩy cú lật về giây 29.

### C. Ghi chú nguồn sử (bắt buộc giữ đúng)
- Chuyện quay thuyền cho cân nằm trong **sách *Ngụy Lược***, được **Bùi Tùng Chi trích chú** trong *Tam Quốc Chí · Ngô Chủ truyện* (trận Nhu Tu, năm 213) — **không phải chính văn** Tam Quốc Chí. Không viết "Chính sử ghi rõ".
- Tôn Quyền **không cố ý đi hứng tên**: thuyền do thám bị bắn cắm một bên, nghiêng gần lật, nên quay đầu hứng bên kia cho cân.
- Câu "tạ thừa tướng tặng tên" có thật trong *Tam Quốc Diễn Nghĩa* hồi 46 (quân sĩ hô 謝丞相箭); truyện ghi thu được 15–16 vạn tên → "hơn mười vạn" đúng.
- Ý tưởng mở rộng (chưa kiểm chứng): *Tam Quốc Chí Bình Thoại* (đời Nguyên) gán chuyện mượn tên cho Chu Du — tra trước khi dùng.

### D. Dấu ấn kênh & Series *A Xìn Soi Sử*
- **Âm mở ≤ 1s mọi tập:** búa gỗ **CẠCH** ngay frame đầu (đã nằm trong Beat 1).
- **Câu cửa miệng:** "A Xìn soi luôn: sử thật thì sao?" — mọi tập, đúng điểm lật.
- **Kết đặc trưng:** dấu đỏ **`TRUYỆN CHÉM!`** (hoặc **`SỬ THẬT!`** khi truyện đúng sử — tránh đoán trước kết).
- **Manh mối xem lại:** bóng râu tía ở Beat 1 + Tôn Quyền chibi tí hon ở góc Beat 3 → lần xem thứ hai mới thấy.
- **Thứ tự tập (binge path, cùng playlist "A Xìn Soi Sử"):** Tập 1 Thuyền cỏ mượn tên (Tôn Quyền) → Tập 2 Gió Đông có phải Khổng Minh cầu? → Tập 3 Ai chém Hoa Hùng? (sử: Tôn Kiên) → Tập 4 Không thành kế. Mỗi tập nối bằng thẻ "Tập sau" ở Beat cuối. *(Nội dung sử từng tập phải tra nguồn trước khi viết.)*
- **Vòng cộng đồng:** câu hỏi comment cuối mỗi tập; tập sau mở bằng 1 comment được chọn (ghim + đọc tên) nếu có.

---

## 2. Kịch Bản Chi Tiết Từng Cảnh (Beat-by-Beat Storyboard & Retention Plan)

| Beat / Mốc | Lời đọc (Vbee TTS) | `[ON SCREEN: Hành động Chibi 2D & Text Overlay]` | Cảm xúc / Nhịp & SFX |
|---|---|---|---|
| **Beat 1: Hook — Đập huyền thoại**<br>`00:00–00:05.5` | Thuyền cỏ mượn tên? Khổng Minh chưa từng làm! Chuyện thuyền hứng tên có thật, nhưng là của ai? | `[ON SCREEN]` Frame 0 (hiểu được khi tắt tiếng): Khổng Minh chibi đứng mũi thuyền cỏ cắm kín tên, phe phẩy quạt. **Búa gỗ A Xìn gõ CẠCH** (âm nhận diện kênh), hình Khổng Minh nứt đôi như bìa giấy, sau lưng lộ **bóng người râu tía** + dấu hỏi. Chữ: **`KHÔNG PHẢI KHỔNG MINH?!`** — đây cũng là khung thumbnail. | **Shock / Mystery**<br>Crash-zoom + shake ở `1.5s`.<br>SFX: `impact` (frame 0), `arrows-rain` |
| **Beat 2: Kèo tử thần của Chu Du**<br>`00:05.5–00:12` | Trong truyện, Chu Du ép giao mười vạn mũi tên trong mười ngày. Khổng Minh cười: ba ngày thôi, thiếu thì chém tôi! | `[ON SCREEN]` Trại Đông Ngô (`palace`): Chu Du (`angry`) đập hợp đồng **`KPI: 100.000 TÊN / 10 NGÀY`**. Khổng Minh (`smirk`) gạch 10 sửa **`3 NGÀY`**, tự ký tên dưới dòng **`TRỄ = TRẢM`**; Chu Du đứng hình (`shocked`). Góc khung: bóng **La Quán Trung** cầm bút lông, nhãn nhỏ **`Tác giả: La Quán Trung`** (gài cho Beat 6). | **Escalation / Humor**<br>Whip-pan giữa 2 người.<br>SFX: `swish`, `pop`, `blip` |
| **Beat 3: Đêm sương ra sông**<br>`00:12–00:19` | Đêm thứ ba sương mù dày đặc, hai mươi thuyền cỏ áp sát trại Tào. Tào Tháo sợ phục binh, ra lệnh bắn như mưa. | `[ON SCREEN]` `riverbank` phủ sương: 20 thuyền chất bó cỏ đeo bảng **`BIA ĐỠ ĐẠN`**, trống trận rung lắc (chỉ bằng hình + SFX). Easter egg: **Tôn Quyền chibi tí hon** trên chiếc thuyền xa góc khung, ngó sang. Cắt sang Tào Tháo (`scared`) vung kiếm hét bắn; tên bay kín khung. | **Comedic Pacing**<br>Cắt nhanh 3 nhịp.<br>SFX: `war-drum`, `whoosh` |
| **Beat 4: Tạ thừa tướng tặng tên**<br>`00:19–00:24` | Sáng ra, thuyền cắm kín hơn mười vạn mũi tên, quân sĩ hô: tạ thừa tướng tặng tên! | `[ON SCREEN]` Thuyền cỏ như con nhím, **hơi nghiêng về phía cắm tên** (gài vật lý cho Beat 5); quân sĩ chibi vẫy tay, băng-rôn vàng **`TẠ THỪA TƯỚNG TẶNG TÊN!`**. Tào Tháo bên bờ tức xì khói đầu. | **Satirical Punchline**<br>Crash-zoom mặt Tào Tháo.<br>SFX: `ding`, `pop` |
| **Beat 5: Climax — A Xìn soi sử thật**<br>`00:24–00:36` | Nhưng A Xìn soi luôn: sử thật thì sao? Sách Ngụy Lược chép: Tôn Quyền đi thuyền do thám ở Nhu Tu, bị bắn tên cắm đầy một bên, thuyền nghiêng gần lật. Ông bình thản quay thuyền, hứng nốt bên kia cho cân! | `[ON SCREEN]` Bàn trà (`teaTable`): A Xìn gõ búa **CẠCH** đúng chữ "soi luôn" (câu cửa miệng kênh), đóng dấu đỏ **`TRUYỆN CHÉM!`** lên ảnh Khổng Minh. Cuộn sách nhỏ góc khung: **`Ngụy Lược · Bùi Tùng Chi chú`**, mốc **`Nhu Tu · 213`**. Cắt về sông: **Tôn Quyền (`TON_QUYEN`, râu tía — khớp bóng ở Beat 1)** trên thuyền nghiêng 30° đầy tên một bên → ra lệnh quay thuyền → thuyền cân lại, Tôn Quyền phẩy tay ung dung. | **Climax / Reveal**<br>Shake khi đóng dấu; nghiêng–cân thuyền theo nhịp lời.<br>SFX: `impact`, `stamp`, `creak`, `powerup` |
| **Beat 6: Payoff — La Quán Trung "mượn" luôn**<br>`00:36–00:40.5` | Vậy là Khổng Minh mượn tên, còn La Quán Trung mượn luôn chiến công của Tôn Quyền! | `[ON SCREEN]` La Quán Trung chibi (bóng từ Beat 2 bước ra) cầm bút lông, nhét túi **`CHIẾN CÔNG CỦA TÔN QUYỀN`** vào tay Khổng Minh; Tôn Quyền đuổi theo đòi bản quyền. Caption quote được: **`MƯỢN TÊN… MƯỢN LUÔN CHIẾN CÔNG`**. | **Payoff**<br>Chase gag.<br>SFX: `swish`, `boing` |
| **Beat 7: CTA sáng tạo, Comment & Funnel**<br>`00:40.5–00:50` | A Xìn chỉ mượn bạn một nút Thích, còn nút Đăng ký thì xin luôn, khỏi trả nha! Còn chi tiết nào bạn nghi là truyện chém? Comment đi, tập sau A Xìn soi! | `[ON SCREEN]` A Xìn chìa tay "mượn" nút **`👍`** rồi ôm luôn nút **`ĐĂNG KÝ`** chạy, mặt tỉnh bơ. Khi hỏi comment: A Xìn giơ búa chờ, bong bóng **`💬 CHI TIẾT NÀO LÀ TRUYỆN CHÉM?`**. Thẻ dưới: **`TẬP 2: GIÓ ĐÔNG CÓ PHẢI KHỔNG MINH CẦU?`** + mũi tên chỉ **Related Video** **`XEM BẢN FULL 22 PHÚT`**. Frame cuối quay về thuyền cỏ của Beat 1 để loop. | **CTA / Loop**<br>Loop mượt về giây 0:00 (câu "tập sau A Xìn soi!" nối vào "Thuyền cỏ mượn tên?").<br>SFX: `pop`, `bell-ding` |

---

## 3. Bản Text Sạch Cho Vbee TTS (`narration-vbee.txt`)

> Thuyền cỏ mượn tên? Khổng Minh chưa từng làm! Chuyện thuyền hứng tên có thật, nhưng là của ai?
> Trong truyện, Chu Du ép giao mười vạn mũi tên trong mười ngày. Khổng Minh cười: ba ngày thôi, thiếu thì chém tôi!
> Đêm thứ ba sương mù dày đặc, hai mươi thuyền cỏ áp sát trại Tào. Tào Tháo sợ phục binh, ra lệnh bắn như mưa.
> Sáng ra, thuyền cắm kín hơn mười vạn mũi tên, quân sĩ hô: tạ thừa tướng tặng tên!
> Nhưng A Xìn soi luôn: sử thật thì sao? Sách Ngụy Lược chép: Tôn Quyền đi thuyền do thám ở Nhu Tu, bị bắn tên cắm đầy một bên, thuyền nghiêng gần lật. Ông bình thản quay thuyền, hứng nốt bên kia cho cân!
> Vậy là Khổng Minh mượn tên, còn La Quán Trung mượn luôn chiến công của Tôn Quyền!
> A Xìn chỉ mượn bạn một nút Thích, còn nút Đăng ký thì xin luôn, khỏi trả nha! Còn chi tiết nào bạn nghi là truyện chém? Comment đi, tập sau A Xìn soi!
