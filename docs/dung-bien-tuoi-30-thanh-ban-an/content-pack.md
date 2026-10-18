# Content pack — dung-bien-tuoi-30-thanh-ban-an (Phase 3a · content-agent)

Canonical spoken text = `docs/dung-bien-tuoi-30-thanh-ban-an/voice.json` (locked by gate A). Nothing here changes a spoken line.

## Quy ước (cách đọc bảng)

- **Caption chunk** = một lần hiển thị, tối đa **2 dòng × ~28 ký tự/dòng**, ngắt ở ranh giới cụm tự nhiên, không bứt từ láng giềng. Trong ô: các dòng trong một chunk ngăn bằng `⏎`, các chunk hiển thị lần lượt ngăn bằng `→`.
- **Nối lại (acceptance):** gộp mọi chunk của key (bỏ `⏎`, nối các chunk bằng **một khoảng trắng**) phải ra đúng `voice.json[key]` — kiểm bằng chương trình (§Acceptance).
- **⌂ = chữ lớn thay caption** (script quy định): s1, s5a, s5b, s9b, s10 — text = nguyên văn lời nói (s10 là CARD in hoa C5), nên **không tính vào giới hạn "≤6 từ"**.
- **Chữ trong cảnh** ( vật thể trong thế giới phim: thước, hơi nước, mực đỏ — do script quy định) cũng liệt kê nguyên văn và không tính vào giới hạn "≤6 từ"; mọi chữ *thêm vào* đều ≤ 6 từ.
- **An toàn đáy:** caption baseline `bottom: 224` (> 210 px an toàn); nhãn `minh hoạ` + chip nguồn ở **góc trên**; headline/CARD đặt cao hơn đáy 210 px. Không chữ nào vào 210 px đáy.
- Từ nhấn (accent): bên đo đếm `#D23B2E`, phía nhân vật `#FFE24D`, trung tính chỉ in đậm.

## Bảng text theo key (thứ tự `voice.json`)

| key | on-screen text (final) | caption chunks (verbatim) | accent words | label | claim ids |
|---|---|---|---|---|---|
| s1 | ⌂ HEADLINE = lời nói: `Tuổi ba mươi,` / `bị coi như một bản án.` — "bản án" khoanh tròn đỏ bút `#D23B2E`, đủ ngay frame 0 · chữ trong cảnh: vạch thước `18 · 22 · 25 · 30` (vạch 30 tròn đỏ còn ướt) | `Tuổi ba mươi,` ⏎ `bị coi như một bản án.` | `bản án` (đỏ bút) | — | F33, user |
| s2 | `BA CHƯA` (chữ trong cảnh — tem hồ sơ đỏ, script) | `Ba dòng tội danh:` → `chưa nhà, chưa kết hôn,` → `chưa có địa vị.` | `chưa nhà` · `chưa có địa vị` (đỏ bút) — script liệt kê 3 cụm, caption giữ 2 theo cap 1–2 | — | F4 |
| s3a | chữ trong cảnh: vạch `18 · 22 · 25 · 30` + nhãn viết tay `18 học xong · 25 cưới · 30 lên quản lý` (vạch 22 hiện cùng lượt vạch 18, script C2-2) | `Cái thước khắc sẵn:` → `mười tám học xong,` → `hai mươi lăm cưới,` → `ba mươi lên quản lý.` | `mười tám` · `ba mươi lên quản lý` (script liệt kê 3, giữ 2 theo cap) | — | F1 |
| s3b | — (không thêm chữ; danh sách viết tay tràn khỏi mép giấy, tờ thứ hai đè xuống) | `Và danh sách ấy,` ⏎ `vẫn cứ dài thêm.` | `vẫn cứ dài thêm` (nghiêng nhẹ) | — | F1 |
| s4a | — (ba vệt mực hiện trong khói, chưa thành chữ) | `Tết đến.` → `Mâm cỗ còn bốc khói,` ⏎ `thì những câu hỏi bật lên.` | `bốc khói` · `bật lên` | — | F15, F5 |
| s4b | chữ trong cảnh: `Khi nào cưới?` · `Lương bao nhiêu?` · `Mua nhà chưa?` (viết tay trong hơi nước — nguyên văn lời nói, script) | `Khi nào cưới?` → `Lương bao nhiêu?` → `Mua nhà chưa?` | `Khi nào cưới` · `Mua nhà chưa` (script liệt kê 3, giữ 2 theo cap) | — | F5, F15 |
| s5a | ⌂ HEADLINE vế 1 (= lời nói, hiện dần): `Bạn chưa có nhà,` / `chưa kết hôn.` | `Bạn chưa có nhà,` ⏎ `chưa kết hôn.` | `Bạn chưa có nhà` · `chưa kết hôn` (đậm) | — | user |
| s5b | ⌂ HEADLINE đủ hai vế (vế 1 của s5a giữ nguyên phía trên, vế 2 thêm vào; `ai đã quy định` đỏ bút) | `Nhưng ai đã quy định` ⏎ `hôm nay bạn phải có đủ?` | `ai đã quy định` · `phải có đủ` | — | user |
| s6a | chữ trong cảnh: nét đỏ `thất bại` viết dở bên chân (bút dừng trước khi xong) | `Một người ba mươi tuổi` ⏎ `chưa có nhà,` → `không nhất thiết là người` ⏎ `thất bại.` | `không nhất thiết` (đậm) · `thất bại` | chip nguồn `F31` (tùy chọn, góc trên, tự mờ trước cut — không đọc thành lời) | F31 |
| s6b | chữ trong cảnh: cận vạch `30` (nét chì kẻ tay lệch + vết tẩy + hạt cao su) | `Cái mốc ba mươi ấy,` ⏎ `chỉ là một nét ai đó kẻ tay.` | `nét ai đó kẻ tay` | — | F1, F3, F35 |
| s7a | — (feed: avatar tròn, không tên thật, không số liệu) | `Nửa đêm, bạn lướt thấy` → `bạn bè đã có nhà,` ⏎ `có xe, đã cưới.` | `đã có nhà` · `đã cưới` (script liệt kê 3, giữ 2 theo cap) | **`minh hoạ`** — UI feed dựng lại, góc trên của khung UI | F9, I5 |
| s7b | — (màn hình tắt, một câu hỏi trên nền tối) | `Rồi tự hỏi:` ⏎ `mình đi nhầm đường à?` | `nhầm đường à` (hơi nghiêng) | — | F9 |
| s8 | — (sao kê: chỉ thanh tiền + 4 mũi tên chì, **không con số nào**) | `Không phải bạn không` ⏎ `tiết kiệm.` → `Lương về chưa kịp giữ,` → `đã có nơi đi mất.` | `chưa kịp giữ` · `đã có nơi đi mất` | **`minh hoạ`** — sao kê lương dựng lại, góc trên tờ giấy · chip nguồn `F32/F37` (tùy chọn, góc trên, tự mờ trước cut) | F32, F37 |
| s9a | — (mọi nét đỏ/mũi tên/feed rút đi, giấy trắng ô ly) | `Mà đã bao nhiêu năm rồi,` ⏎ `chẳng ai hỏi bạn một câu.` | `chẳng ai hỏi` (mờ dần theo nhịp nói) | — | F6 |
| s9b | ⌂ HEADLINE viết tay chì (= lời nói), dạ quang vàng `#FFE24D` quét dưới `sống có vui không` | `Dạo này,` ⏎ `bạn sống có vui không?` | `sống có vui không` (vàng dạ quang) | — | F6 |
| s10 | ⌂ CARD đóng: `ĐỪNG BIẾN TUỔI BA MƯƠI THÀNH BẢN ÁN` (C5 in hoa, "ba mươi" khớp cover; không chữ nào thêm, không CTA) | `Đừng biến tuổi ba mươi` ⏎ `thành bản án.` | `BẢN ÁN` (vàng dạ quang — **không** đỏ) | — | user |

## Cover (frame 0 = s1)

- **Text:** HEADLINE 2 dòng `Tuổi ba mươi,` / `bị coi như một bản án.` — Bitter ExtraBold, "bản án" khoanh tròn đỏ bút `#D23B2E`; **đủ ngay frame 0, không gõ chữ**; dải y 6–26% (115–500 px), trên nền giấy ô ly trống.
- **Subject:** chiếc thước kẻ ngang nghiêng ~12° mang `18 · 22 · 25 · 30`, vạch `30` đã được khoanh tròn đỏ, mực còn ướt; nhân vật chì than đứng cạnh thước, ngẩng nhìn vạch 30, tay buông cây chì (y 66–82%); y 84–100% trống (an toàn 210 px).
- **Tắt tiếng vẫn hiểu:** "Tuổi ba mươi — bản án?" + một cái thước kẻ + vạch 30 khoanh tròn → hook rõ trong frame đầu ✓.

## Re-hook (~18.6 s · H1)

- **Mốc:** s5a từ **18.64 s** (@4.1; ~17.8 s @4.3) — câu bắt buộc của user làm re-hook, đúng lúc freeze mâm cỗ Tết.
- **Text:** s5a HEADLINE vế 1 `Bạn chưa có nhà,` / `chưa kết hôn.` (hiện dần) → s5b thêm vế 2 `Nhưng ai đã quy định` / `hôm nay bạn phải có đủ?`, với `ai đã quy định` đỏ bút. Nguyên văn từng chữ, không sửa dấu (verbatim user).
- Bèo hình ảnh đi kèm (script): freeze toàn khung 0.4s · ba dòng tội danh chớp sáng lại · bút tuột rơi "cộp" · vệt đèn bàn thu lại · dấu chấm hỏi đỏ tẽ ngòi. Gap **0.45 s** giữa hai vế, lặng 0.35 s sau s5b.

## CTA / ending (s10)

- **CARD đóng:** `ĐỪNG BIẾN TUỔI BA MƯƠI` / `THÀNH BẢN ÁN` — hiện trọn dưới một nhát dạ quang vàng tự quét (mask 0.6 s), nền giấy ô ly + thước nằm lệch mép khung không ai cầm, push-in 1.00→1.03 rồi đứng im.
- **Không có engagement CTA:** không "bình luận", không "like/follow", không thẻ hashtag, không câu hỏi mời trả lời — script cố tình kết bằng câu của user + **lặng thuần 2.4 s** (gió lay mép giấy). Nội dung chốt: **không thêm bất kỳ chữ CTA nào**.

## Claims

| id | claim as shown | source URL | fact/inference |
|---|---|---|---|
| F33 + user | s1 HEADLINE `Tuổi ba mươi, bị coi như một bản án.` | https://vietgiaitri.com/ap-luc-29-tuoi-mua-nha-30-tuoi-on-dinh-cua-nguoi-tre-9x-2k-20251009i7550731/ (S7, 2026-10-17) + chủ đề `user` (brief) | fact (F33 "Tuổi 30 như 'bản án'") + user line |
| F4 | s2 `BA CHƯA` + ba dòng `chưa nhà / chưa kết hôn / chưa có địa vị` | https://vnexpress.net/giai-toa-tam-ly-cho-nguoi-ba-chua-tuoi-30-4235990.html (S5) | fact + **B-2 dramatization** ("chưa nhà" = rút gọn F4 "chưa mua nhà"; "chưa **có** địa vị" = thêm "có"); hình I8 |
| F1 | s3a vạch `18 · 22 · 25 · 30` + nhãn `học xong / cưới / lên quản lý` | https://vnexpress.net/25-tuoi-ket-hon-30-tuoi-mua-nha-4366191.html (S4) | fact gần nguyên văn (script lược "22 tốt nghiệp, đi làm" khỏi **lời nói**, vạch 22 vẫn hiện trên thước) |
| F1 | s3b danh sách viết tay `vẫn cứ dài thêm` tràn mép giấy | https://vnexpress.net/25-tuoi-ket-hon-30-tuoi-mua-nha-4366191.html (S4) | fact ("Danh sách 'deadline' cứ thế mà dài thêm") |
| F5, F15 | s4b ba câu hỏi trong hơi nước `Khi nào cưới? · Lương bao nhiêu? · Mua nhà chưa?` | https://danviet.vn/hoi-chung-so-tet-o-nguoi-tre-voi-loat-cau-hoi-bao-gio-lay-chong-luong-bao-nhieu-d1403434.html (S8) + https://vnexpress.net/giai-toa-tam-ly-cho-nguoi-ba-chua-tuoi-30-4235990.html (S5) | fact + **A-1/A2-2** ("Khi nào cưới?" là cách nói trung tính giới đổi từ F5 "Lấy chồng/ vợ chưa" + F15 "Bao giờ lấy chồng?"; research không có nguồn nói nguyên văn câu này) |
| user | s5a/s5b HEADLINE (câu bắt buộc, nguyên văn) | brief `user` (không URL — lệnh nội bộ, 2026-10-17) | user verbatim |
| F31 | s6a line + chip `F31` `Một người ba mươi tuổi chưa có nhà, không nhất thiết là người thất bại.` | https://vov.vn/doi-song/30-tuoi-chua-co-gi-trong-tay-40-tuoi-da-phai-lo-chuan-bi-tuoi-gia-post1336128.vov (S1) | fact gần nguyên văn |
| F1, F3, F35 | s6b `Cái mốc ba mươi ấy, chỉ là một nét ai đó kẻ tay.` + hình vạch chì lệch/vết tẩy | https://vnexpress.net/25-tuoi-ket-hon-30-tuoi-mua-nha-4366191.html (S4) + https://vietgiaitri.com/ap-luc-29-tuoi-mua-nha-30-tuoi-on-dinh-cua-nguoi-tre-9x-2k-20251009i7550731/ (S7) | **inference** (dạng hình ảnh; không kết luận, không đọc "social clock") |
| F9, I5 | s7a feed `đã có nhà · có xe · đã cưới` (UI minh hoạ) + s7b `mình đi nhầm đường à?` | https://thanhnien.vn/noi-so-tuoi-30-185250116151223886.htm (S6) | fact (F9 nguyên ý) + inference (I5 chuyển thể màn hình) |
| F32, F37 | s8 `Lương về chưa kịp giữ, đã có nơi đi mất.` + chip `F32/F37`; sao kê **không con số** | https://vov.vn/doi-song/30-tuoi-chua-co-gi-trong-tay-40-tuoi-da-phai-lo-chuan-bi-tuoi-gia-post1336128.vov (S1) | **inference** (diễn giải F32 "không có đủ dư địa" + F37 "thu nhập vừa đến tài khoản đã có nơi để đi" + sensory #9); **cấm số cụ thể** |
| F6 | s9a `chẳng ai hỏi bạn một câu` | https://vnexpress.net/giai-toa-tam-ly-cho-nguoi-ba-chua-tuoi-30-4235990.html (S5) | fact |
| F6 | s9b HEADLINE `Dạo này, bạn sống có vui không?` | https://vnexpress.net/giai-toa-tam-ly-cho-nguoi-ba-chua-tuoi-30-4235990.html (S5) | fact (F6 nguyên ý) |
| user | s10 CARD `ĐỪNG BIẾN TUỔI BA MƯƠI THÀNH BẢN ÁN` | brief `user` (chủ đề "Đừng biến tuổi 30 thành bản án"; CARD C5 đổi "30" → "ba mươi" cho khớp cover, mọi từ khác giữ nguyên) | user verbatim (chỉ chuẩn hoá mặt chữ) |

Tổng: **13 dòng claim** (3 dòng `user` + 7 fact/F-ID + 2 inference + 1 fact+inference) — mọi id đều resolve về S1–S8 có URL hoặc `user`. Chip nguồn chỉ **tùy chọn** (s6a `F31`, s8 `F32/F37`), nhỏ, góc trên, tự mờ trước cut, không đọc thành lời (script ghi chú cuối).

## Labels

| shot | nhãn | thứ được đánh dấu | vị trí |
|---|---|---|---|
| s7a | `minh hoạ` | UI feed dựng lại (avatar tròn, **không tên thật, không số liệu**) | góc trên khung UI, chì xám `#7C858C` |
| s8 | `minh hoạ` | sao kê lương dựng lại (chỉ thanh tiền + mũi tên, **không con số**) | góc trên tờ giấy, chì xám `#7C858C` |

Không có UI/diagram tái dựng nào khác (thước kẻ, mực đỏ, mâm cỗ, hơi nước là đạo cụ trong cảnh, không phải UI → không gắn nhãn). Chip nguồn (`F31`, `F32/F37`) là **source tag**, không phải nhãn `minh hoạ`.

## Acceptance (tự kiểm, chương trình)

- **Join-back:** mỗi key, gộp caption chunks → khớp **exact** `voice.json[key]`; 16/16 keys ✓. s10 dùng caption canonical với đúng hoa thường và dấu chấm; CARD IN HOA chỉ là lớp chữ on-screen riêng.
- **Đủ key:** 16/16 rows đúng thứ tự `voice.json` ✓.
- **Giới hạn:** mọi dòng caption ≤ 28 ký tự; mỗi chunk ≤ 2 dòng ✓. Chữ thêm vào ≤ 6 từ; các mục ⌂ / chữ trong cảnh là ngoại lệ do script quy định (ghi ở Quy ước) ✓.
- **Claim:** 13/13 id resolve về URL có trong `research.md` §1 hoặc `user` (brief) ✓.
- **Safe zone:** caption `bottom: 224` (> 210 px); nhãn + chip góc trên; không chữ nào trong 210 px đáy ✓.
- **Accent:** 1–2 từ/key, đều nằm trong cột accent của script (chọn đầu–cuối khi script liệt kê 3) và khớp 3 highlight: H1 s5a/s5b · H2 s6b · H3 s9b ✓.
