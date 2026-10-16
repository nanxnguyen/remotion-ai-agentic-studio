# Content pack — xay-doi-minh-hay-chung-minh (v1, content-agent, Phase 3a)

Nguồn: `voice.json` (16 key, đã khoá ở gate A), `script.md` v2, `brief.md`, `research.md`. **Không đổi một chữ lời nói nào.**

## Quy ước
- **Ghép caption:** trong cột caption chunks, `<br>` = xuống dòng trong cùng một chunk, ` ‖ ` = sang chunk mới. Nối mọi dòng + mọi chunk bằng **một dấu cách** → ra đúng text của key trong `voice.json` (kể cả dấu câu, dấu thanh, dấu ngoặc kép ASCII `"`).
- **Caption đáy:** `bottom: 224`, tối đa 2 dòng/chunk, ≤ 28 ký tự/dòng, Archivo SemiBold 56–60px trên pill `#0A0F3D` 85%, chữ `#F3F6FF`. Không chữ nào trong 210px đáy.
- **Key HEADLINE (s1, s5a1, s9a, s9b, s11):** headline lớn (Bricolage Grotesque ExtraBold) **thay** caption đáy (script.md dòng 8; user: câu bắt buộc hiện đầy đủ). Cột caption chunks ghi đúng các dòng headline (một khối, hiện cùng lúc, có thể > 2 dòng vì phải hiện đủ câu), mỗi dòng vẫn ≤ 28 ký tự (thực tế ≤ 17). Không hiện caption đáy cùng lúc. Vị trí cuối cùng do design-agent chốt, ngoài 210px đáy.
- **On-screen text** = chữ trong cảnh / tag / UI / chip (không phải caption, không phải headline); `—` = không có.
- **Màu nhấn:** hồng sen `#FF2E9A` = phía "chứng minh" · ngọc `#19C48A` = phía "xây cho mình" · xanh nước `#8FE3FF` = phía "họ" (theo brief Style chỉ dùng ở s9a) · "đậm" = trắng `#F3F6FF` in đậm, không màu. Tối đa 2 cụm nhấn/key.
- Thời điểm đổi chunk: chunk mới vào đúng lúc từ đầu tiên của nó được nói (lấy timestamp ASR khi join).

## Bảng theo key (thứ tự `voice.json`)

| key | on-screen text (final) | caption chunks | accent words | label (minh hoạ / source tag) | claim ids |
|---|---|---|---|---|---|
| s1 · HOOK/COVER | Bảng đèn trong cảnh: **THẤY CHƯA?** | HEADLINE: Bạn đang xây<br>cuộc đời mình,<br>hay cố chứng minh<br>ai đó đã sai? | **xây** (ngọc) · **chứng minh** (hồng sen) | — | — (topic của user) |
| s2a | Tag hồi tưởng góc trên trái: **10 năm trước** | Mười tám tuổi,<br>mâm cơm Tết đông họ hàng, ‖ bạn nói:<br>"Con sẽ làm được." | **Con sẽ làm được** (đậm) | — | — |
| s2b | — | Có người bật cười: ‖ "Nó á? Còn lâu." | **Còn lâu** (hồng sen) | — | — |
| s3 | Chữ khắc viên nền: **NÓ Á? CÒN LÂU.** · nhãn gạch: **lương tháng đầu** / **chiếc xe** / **tấm bằng** | Từ đó, lương tháng đầu,<br>chiếc xe, tấm bằng, ‖ thành gạch<br>xây về phía nhà người đó. | **nhà người đó** (hồng sen) | — | — |
| s4 | UI: tiêu đề **Người xem** · avatar tròn không tên · pin **5%** | Nửa đêm đăng story xong,<br>bạn mở danh sách người xem, ‖ tìm đúng một cái tên. | **đúng một cái tên** (đậm) | **minh hoạ** (UI danh sách người xem story) | — |
| s5a1 · RE-HOOK | — | HEADLINE: Họ có<br>đang nhìn không? | **đang nhìn** (hồng sen) | — | — |
| s5a2 | — | Một tối, bạn leo lên<br>viên gạch cao nhất để xem. | **viên gạch cao nhất** (đậm) | — | — |
| s5b | Chip nguồn góc trên (0.6–4.8s của shot): **Hiệu ứng spotlight<br>(Gilovich & cs., 2000):<br>ta hay nghĩ người khác<br>để ý mình hơn thực tế** | Bên kia cửa sổ,<br>người ta đang rửa bát, ‖ cười theo ti vi. ‖ Tối ấy, chẳng ai nhìn sang. | **chẳng ai nhìn sang** (đậm) | chip nguồn = source tag của C1 | C1 |
| s6 | — | Phía sau bức tường: ‖ không cửa, không mái,<br>không một chỗ để ngồi. | **không** ×3 (đậm, mỗi chữ sáng lên đúng cú cắt của nó) | — | — |
| s7a · H1 | — | Mười năm, ‖ bạn xây một bức tường<br>cho người khác nhìn. | **cho người khác nhìn** (hồng sen) | — | C2 |
| s7b · H1 | — | Chưa xây một căn phòng nào<br>cho mình ở. | **cho mình ở** (ngọc) | — | C2 |
| s8 | Chữ khắc viên nền (phát sáng mờ): **NÓ Á? CÒN LÂU.** · đồng hồ **05:00** | Câu "còn lâu" ấy ‖ từng kéo bạn dậy<br>lúc năm giờ sáng. ‖ Nó cũng có công. | **còn lâu** (hồng sen) · **có công** (đậm) | — | — (lời kể, xem ghi chú) |
| s9a · H2 | — | HEADLINE: Người từng<br>xem thường bạn<br>có thể đã quên. | **có thể đã quên** (xanh nước) | — | — (`user`, xem ghi chú Claims) |
| s9b · H2 | Bảng đèn trong cảnh **THẤY CHƯA?** (vẫn rực). Headline giữ 3 dòng của s9a + nối 2 dòng mới = câu bắt buộc đầy đủ | HEADLINE (phần mới): Còn bạn vẫn sống<br>để họ phải tiếc. | **vẫn sống** · **phải tiếc** (hồng sen) | — | — (`user`) |
| s10 · H3 | — (bảng đèn THẤY CHƯA? tắt dần, không thêm chữ) | Viên gạch trên tay,<br>lần này, bạn đặt xuống đất. ‖ Ngay chỗ mình đang đứng. | **xuống đất** · **chỗ mình đang đứng** (ngọc) | — | — |
| s11 · câu hỏi cuối | — (không chữ nào thêm, giữ cả 2.0s lặng) | HEADLINE: Viên gạch<br>tiếp theo,<br>bạn đặt cho ai? | **cho ai** (đậm) | — | — |

Ghi chú quyết định:
- s3: script ghi 4 cụm nhấn; pack giữ 1 cụm trong caption ("nhà người đó"), ba danh từ được nhấn bằng **nhãn gạch trong cảnh** (rơi "cộp" trùng lúc nói) để không vượt 2 cụm/key.
- s9b: script ghi nhấn "vẫn sống · phải tiếc" (cột accent) — pack theo đúng cột này; "để họ" giữ trắng để màu hồng sen không rơi lên "họ".
- s5a1: script không ghi màu; "đang nhìn" hồng sen vì mong được nhìn thấy là phía "chứng minh"; xanh nước giữ riêng cho s9a theo brief.
- s2a tag "10 năm trước": thêm thông tin mốc thời gian cho người xem tắt tiếng (18 tuổi → 28 tuổi, khớp "Mười năm" ở s7a và brief); không lặp lời nói.
- Đạo cụ trong cảnh lặp chữ lời nói (nhãn gạch s3, chữ khắc "NÓ Á? CÒN LÂU." s3/s8, đồng hồ 05:00 s8) do cột hình của script.md khoá; chúng là vật thể kể chuyện (callback), không phải on-screen text do pack thêm.
- s1 "xây" màu ngọc theo spec cover của script.md; brief nói ngọc "chỉ xuất hiện từ s10" là về đồ hoạ cảnh (phấn, ánh sáng), từ nhấn phía "xây cho mình" được phép.

## Độ dài từng dòng (ký tự, NFC; đã kiểm bằng Grep, không dòng nào ≥ 29)

| key | dòng (ký tự) |
|---|---|
| s1 (headline) | 12 · 14 · 17 · 13 |
| s2a | c1: 14 / 25 · c2: 8 / 18 |
| s2b | c1: 18 · c2: 16 |
| s3 | c1: 23 / 19 · c2: 10 / 25 |
| s4 | c1: 24 / 27 · c2: 21 |
| s5a1 (headline) | 5 · 16 |
| s5a2 | 20 / 26 |
| s5b | c1: 15 / 22 · c2: 16 · c3: 27 |
| s6 | c1: 19 · c2: 21 / 22 |
| s7a | c1: 9 · c2: 21 / 20 |
| s7b | 26 / 11 |
| s8 | c1: 16 · c2: 16 / 17 · c3: 16 |
| s9a (headline) | 10 · 14 · 15 |
| s9b (headline, phần mới) | 16 · 16 |
| s10 | c1: 19 / 27 · c2: 24 |
| s11 (headline) | 9 · 10 · 15 |
| chip s5b | 18 · 23 · 22 · 22 |

## Cover (frame 0)
- **Text:** headline 4 dòng, đủ từ frame 0, không gõ chữ: "Bạn đang **xây** / cuộc đời mình, / hay cố **chứng minh** / ai đó đã sai?" ("xây" ngọc, "chứng minh" hồng sen). Đặt trong dải trời trống 6–28% (115–538px). Script vẽ 2 dòng, nhưng dòng 2 là 31 ký tự (> 28), nên pack ngắt 4 dòng; không tách "cuộc đời", "chứng minh", "ai đó". Cỡ chữ cuối do design-agent chốt.
- **Chữ trong cảnh:** bảng đèn bóng tròn **THẤY CHƯA?** trên mặt tường hồng sen (58–70%), chiều cao chữ ≤ 70% chữ headline.
- **Subject:** nhân vật mũ bảo hộ hồng nhạt đứng trên bậc cao nhất của thang ở đỉnh tường, viên gạch đưa lên, mặt hướng về một ô cửa sổ xanh nước bên kia hẻm.
- Tắt tiếng vẫn hiểu: câu hỏi + bức tường "THẤY CHƯA?" chĩa về một ô cửa. Dải 88–100% trống.

## Re-hook (~15–20s)
- **s5a1, HEADLINE "Họ có / đang nhìn không?"** — vào ở ~18.47s (@4.1 âm tiết/s; ~17.7s @4.3), câu hỏi mới: từ "mình xây" sang "họ có thấy không". Lời đáp đến ở s5b ("Tối ấy, chẳng ai nhìn sang.", ~22.97s).

## CTA
- **Không có CTA** (quyết định user/brief: không mời bình luận/follow). Kết bằng câu hỏi s11 "Viên gạch tiếp theo, bạn đặt cho ai?" ở shot riêng, tách khỏi cao trào s9a/s9b (s10 ở giữa), + lặng thuần 2.0s.

## Claims

| id | claim as shown | source URL | fact/inference |
|---|---|---|---|
| C1 | Chip s5b: "Hiệu ứng spotlight (Gilovich & cs., 2000): ta hay nghĩ người khác để ý mình hơn thực tế" | https://en.wikipedia.org/wiki/Spotlight_effect (S4; Gilovich, Medvec, Savitsky 2000, JPSP 78(2), 211-222, doi 10.1037/0022-3514.78.2.211) | fact (F4) — nói về chú ý tức thời, không phải trí nhớ |
| C2 | s7a/s7b tương phản "bức tường cho người khác nhìn / căn phòng cho mình ở" — hình ảnh, không chip | https://tuoitre.vn/cai-bay-cua-chung-minh-minh-dung-20260214132322517.htm (S8: "trao quyền định giá bản thân cho người khác") | inference (I2/I3), bài bình luận, không phải nghiên cứu |

- Chip C1 **chỉ** trong s5b (0.6–4.8s của shot, mờ trước cú cắt), **không** xuất hiện trong s6, **không** dời sang s9a. **Không** có số Manilow (46%/23%) hay số liệu nào khác trên màn hình.
- **Lời kể, không phải claim (không chip, không trình bày như kết luận):** s9a/s9b câu bắt buộc "Người từng xem thường bạn có thể đã quên. Còn bạn vẫn sống để họ phải tiếc." — nguồn `user` (claim plan của brief), "có thể" giữ nguyên theo U4; research I1 chỉ là suy luận (spotlight effect đo chú ý tức thời, không đo trí nhớ, nên không dùng S4 làm nguồn cho "đã quên"); "phải tiếc" là khoảnh khắc cảm xúc, không phải dự báo. s8 "Nó cũng có công." (lập trường I4 của video: không bác bỏ động lực "cho họ thấy"; F9 ghi rõ chưa có nghiên cứu chắc), mọi cảnh mâm cơm Tết, rửa bát, ti vi, đồng hồ 05:00 (minh hoạ từ research §3–§4).

## Labels
| key | thứ được dựng lại | nhãn | cách hiện |
|---|---|---|---|
| s4 | UI danh sách người xem của một story (avatar tròn, không tên thật, không logo app thật) | **minh hoạ** | Archivo, màu `#8B93C9`, ≥ 26px, góc trên phải của màn hình điện thoại, hiện suốt s4, nằm ngoài 210px đáy và không bị caption che |

Không có UI/sơ đồ dựng lại nào khác. Bảng "THẤY CHƯA?", chữ khắc gạch, nhãn gạch, đồng hồ 05:00 là đạo cụ giấy cắt của câu chuyện, không giả lập sản phẩm thật.

## Kiểm tra chấp nhận (v1)
- 16/16 key của `voice.json` có hàng, đúng thứ tự.
- Ghép chunk → text: đã so khớp từng key bằng Grep neo `"<key>": "<text ghép>"` trên `voice.json`, 16/16 khớp đúng 1 lần (diff rỗng).
- s9a + " " + s9b = câu bắt buộc của user, đúng từng chữ.
- `voice.json` là NFC (không có dấu kết hợp U+0300–U+036F), nên đếm ký tự ở trên là đếm codepoint.
- Không dòng caption/headline/chip nào ≥ 29 ký tự; on-screen text mỗi mục ≤ 6 chữ (trừ chip nguồn, là source tag do script/brief khoá).

## Vấn đề mở
- **Cho script-agent:** không có (không phát hiện lỗi lời nói).
- **Cho director/design-agent (Trung):** brief Style ghi caption "mỗi key một lần đổi", nhưng các key > 56 ký tự (s2a, s3, s4, s5b, s8, s10) không thể vừa 2 dòng × 28 ký tự; pack dùng nhiều chunk trong một key (thêm s2b, s6, s7a để khớp nhịp hình). Cần design chốt component caption đổi theo chunk.
- **Cho director/design-agent (Thấp):** script.md vẽ cover headline 2 dòng; pack chốt 4 dòng (giới hạn 28 ký tự/dòng). Design chỉnh cỡ chữ theo 4 dòng trong dải 115–538px.
- **Cho director/design-agent (Thấp):** tag "10 năm trước" ở s2a là overlay mới, không có trong script.md; design cần chừa chỗ (góc trên trái, ngoài headline/chip), nếu không thì bỏ tag ở bước join.
- **Thấp (thẩm mỹ):** `voice.json` dùng ngoặc kép ASCII `"` ở s2a, s2b, s8; caption hiện đúng ký tự đó để diff rỗng. Muốn ngoặc cong “ ” thì phải đổi text ở `voice.json` (không cần thu lại vì không đọc thành tiếng) — việc của script-agent nếu director muốn, không bắt buộc.
