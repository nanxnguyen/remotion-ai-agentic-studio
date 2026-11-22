# Playbook Dạ Hành Dị Tạp — Kịch Bản 30 Phút, Thị Giác 2D Dân Gian & Công Thức Đóng Gói

Tài liệu này đúc kết từ phân tích thực nghiệm các video đạt hiệu suất cao nhất trên kênh `@DạHànhDịTạp`:
- **Thần Trùng - Chiếc Khăn Tang Thứ Ba Mươi Hai** (`29:59` — **1.68M lượt xem / 12 ngày**): đám tang trùng tang ở quê, quy tắc đếm đúng 31 chiếc khăn tang cho 31 người con cháu nhưng trong tráp luôn dư ra chiếc thứ 32, hai tấm gương bên bàn thờ trùm vải trắng, thầy pháp mù một mắt có vết sẹo qua mày, cuộc gọi video call ban đêm biến màn hình điện thoại thành tấm gương không che, cú lật danh tính ở phút 27 và lời nhắn mặt kính đen ở 20 giây cuối.
- **Bùa Lỗ Ban** (`30:20` — **123K lượt xem**): bí mật thước Lỗ Ban và vật yểm trong cột cái từ đường, 3 điều cấm của thợ mộc già, nghi thức tháo yểm tưởng đã hoàn tất nhưng tiếng đục gỗ vẫn vang lên từ phía sau tấm gương.
- **Thiên Linh Cái** (`31:55` — **27K lượt xem / 9 giờ**): chiếc hũ sành bịt vải đỏ trên gác thờ tối, quy tắc cúng giờ âm và tuyệt đối không nhìn xuống đáy hũ khi nến tắt.

---

## 1. Cấu trúc kịch bản 8 hồi chuẩn 25–35 phút (3.800 – 4.800 từ)

Với tốc độ đọc trầm chậm đặc trưng của truyện tâm linh dân gian (`130–145 từ/phút`, Vbee `--speed 0.92` đến `0.95`; **luôn đo lại**: tạo voice đoạn đầu, chia số từ cho số giây. Ở tốc độ 1.0–1.05 giọng Vbee của studio đo được ~183–196 từ/phút, tức cùng 30 phút cần ~5.500 từ), một tập **28–32 phút** cần **3.800–4.500 từ tiếng Việt**, chia chặt thành **8 hồi** với đường cong nỗi sợ (`fear curve`) có nhịp thở rõ ràng:

| Hồi | Thời lượng | Số từ ước tính | Beat trong `shots.json` | Mục tiêu giữ chân & Nhịp sợ (`fear`) |
|---|---|---|---|---|
| **1. Cold Open — Dị tượng con số / Luật đếm** | `0:00 – 1:00` | ~135–150 từ | `hook` → `promise` | `0.55 → 0.72`. Nêu ngay quy tắc đếm hoặc con số sai lệch trong câu đầu tiên. Tuyệt đối không chào hỏi, không đặt title card trong 3s đầu. |
| **2. Black Title Card (`D.ditapTitleCard`)** | `1:00 – 1:08` | ~15–20 từ | `chapter` / `setup` | `0.40`. Màn hình đen tuyền, biểu tượng tối giản (`scarf` / `jar` / `mirror` / `boat`), tên truyện Serif trắng ngà + dòng phụ đỏ thẫm + chuông chùa trầm. |
| **3. Thiết lập Làng quê, Thầy dân gian & 3 Điều Cấm Kỵ** | `1:08 – 6:30` | ~750 từ | `setup` → `dread` | `0.30 → 0.55`. Nhân vật chính về quê (`D.ditapVillageStreet`, `D.ditapAltar`); người hiểu chuyện (`blindEye`, `scar`) giao **đúng 3 điều cấm kỵ sống còn**. |
| **4. Ba tầng leo thang & Bẫy công nghệ hiện đại** | `6:30 – 16:30` | ~1.400 từ | `dread` → `scare` → `breather` (x3) | `0.50 → 0.92`. Tầng 1: vi phạm nhỏ. Tầng 2: con số/vật cấm dịch chuyển. Tầng 3: **Bẫy công nghệ** (điện thoại/video call trở thành tấm gương không che). Đặt `"hush": true` trước mỗi shot `scare`. |
| **5. Cao trào giả — Nghi thức trấn yểm tưởng đã xong** | `16:30 – 21:30` | ~700 từ | `dread` → `scare` → `breather` | `0.85 → 0.30`. Thực hiện nghi lễ hóa giải căng thẳng lúc nửa đêm; trời sáng hoặc nến cháy yên bình khiến nhân vật và khán giả tin rằng tai ương đã qua. |
| **6. Manh mối sai lệch âm thầm sau cao trào** | `21:30 – 25:00` | ~500 từ | `dread` → `reveal` | `0.40 → 0.78`. Không hù ồn ào; cài 3 chi tiết sai lệch tinh vi (bóng đổ ngược hướng nến, người làng không nhìn thấy nhân vật, số khăn tang vừa đủ 32). |
| **7. Twist lật góc nhìn / Đảo ngược danh tính (90%)** | `25:00 – 28:30` | ~500 từ | `twist` → `scare` | `0.90 → 0.98`. Cú lật vai: người đang kể chuyện hoặc người đang cố trốn chạy chính là người thứ 32 / kẻ đã bị thế mạng trong gương (`faceless: true` + `H.dollyZoom`). |
| **8. Kết phá vỡ bức tường thứ 4 — Mặt kính đen** | `28:30 – 30:00` | ~180–220 từ | `cta` | `0.65 → 0.80`. Khung hình tối dần thành mặt gương đen; lời thoại nhắc trực tiếp khán giả đừng nhìn bóng phản chiếu trên màn hình điện thoại của chính họ. |

---

## 2. Chi tiết kỹ thuật từng Hồi & Mẫu câu dẫn

### Hồi 1: Cold Open — Quy tắc đếm / Con số thừa (0:00 – 1:00)
- **Nguyên tắc vàng:** Câu đầu tiên ở giây `0.0s` phải chứa **một con số cụ thể + một vật tâm linh dân gian + một sự vô lý không thể giải thích**.
- **Ví dụ mẫu (phong cách *Thần Trùng*):**
  > *"Đám tang của nội tôi có tất cả ba mươi mốt người con cháu về chịu tang, nhưng khi mở tráp vải xô trước bàn thờ, lúc nào cũng đếm được đúng ba mươi hai chiếc khăn trắng. Bà cô già giữ từ đường dặn tuyệt đối không ai được chạm vào chiếc khăn thừa ấy — bởi hễ có một người đội nhầm, trong họ sẽ có thêm một chiếc quan tài nữa."*
- **Hình ảnh (`0:00 – 1:00`):**
  - Shot 1 (`0:00 – 0:03.5`, `beat: "hook"`): Cận cảnh bàn thờ mờ khói hương (`D.ditapAltar`), nhân vật đeo khăn tang trắng (`khanTang: true`, `expr: 'scared'`) nhìn xuống tráp vải trắng, `H.creep` đẩy chậm.
  - Shot 2–4: Góc trung (`med`) hai tấm gương hai bên bàn thờ trùm kín vải trắng (`D.ditapAltar` với `mirrorPeek: 0 -> 0.6`), ngọn nến chập chờn (`H.flicker`), cận cảnh khuôn mặt thầy pháp mù một mắt (`D.ditapBigFace`, `blindEye: 'left'`, `scar: true`).

### Hồi 2: Black Title Card (`1:00 – 1:08`)
- Gọi `D.ditapTitleCard(g, t, { title, sub, emblem, tag: 'TRUYỆN KINH DỊ DÂN GIAN VIỆT NAM' })`.
- Âm thanh: một tiếng chuông chùa trầm (`templebell`, `gain: -5`) hoặc âm `reverse` nhẹ rồi lặng vào tiếng gió đêm.

### Hồi 3: Thiết lập bối cảnh & Ba Điều Cấm Kỵ (`1:08 – 6:30`)
- Mở rộng không gian làng quê bằng `D.ditapVillageStreet` (đồi mờ sương, mái ngói rêu, biển hiệu `TẠP HOÁ`, `VẢI SỢI`, xe đạp, quang gánh) trước khi bước vào nhà cổ `D.ditapAltar`.
- **Cấu trúc 3 Điều Cấm Kỵ** (luôn cụ thể, dễ nhớ, có điều kiện thời gian/vật lý):
  1. **Cấm kỵ về vật phản chiếu:** *"Trong ba ngày tang, mọi tấm gương và mặt nước trong nhà đều phải trùm kín vải trắng; dù nghe tiếng ai gọi sau lưng cũng không được vén khăn soi."*
  2. **Cấm kỵ về số đếm / giờ âm:** *"Sau giờ Hợi, khi đếm người trong gian thờ chỉ được đếm thầm trong bụng, tuyệt đối không đọc thành tiếng con số cuối cùng."*
  3. **Cấm kỵ về vật niêm phong:** *"Chiếc khăn tang thừa (hoặc chiếc hũ sành bịt vải đỏ) phải đặt đúng góc tây bắc bàn thờ; nếu thấy nó ướt nước mưa khi trong nhà không dột, phải lập tức thắp ba nén nhang ngược."*

### Hồi 4: Ba tầng leo thang & Bẫy công nghệ hiện đại (`6:30 – 16:30`)
- **Tại sao Bẫy công nghệ hiện đại cực kỳ hiệu quả?**
  Khán giả trẻ xem YouTube bằng điện thoại/laptop lúc đêm khuya. Khi nhân vật trong truyện đã tuân thủ đúng việc **trùm vải kín mọi tấm gương gỗ trong nhà cổ**, nhưng lại rút **điện thoại thông minh** ra gọi video call, chụp ảnh bàn thờ, hoặc để màn hình điện thoại tắt thành một mặt kính đen phản chiếu — nhân vật vô tình tạo ra **một tấm gương không được trùm vải ngay trên tay mình**.
- **Cách dựng cảnh Bẫy công nghệ bằng `engine/ditap.js`:**
  - Dùng `D.ditapFigure` với `pose: 'phone'`, `prop: 'phone'` trong gian thờ tối (`H.darkness` chỉ chừa một lỗ sáng xanh trắng quanh tay cầm điện thoại).
  - Cắt sang `D.ditapBigFace` với `rimColor: '#7ce0ff'`, `expr: 'shocked'`: trong khung điện thoại (hoặc phản chiếu sau vai nhân vật) xuất hiện một hình bóng `D.ditapFigure` với `faceless: true` và `khanTang: true` mà khi quay đầu lại ngoài đời thực thì không có ai.
  - Shot trước cú xuất hiện bắt buộc đặt `"hush": true` (rút nhạc nền 0.7s) → shot hù đặt `beat: "scare"`, `sfx: [{"at": 0.04, "name": "scare", "gain": -4}]`, `H.punch` + `H.scareFlash`.

### Hồi 5 & Hồi 6: Cao trào giả (`16:30 – 21:30`) → Manh mối sai lệch (`21:30 – 25:00`)
- Ở phút 16–21, cho nhân vật và thầy pháp hoàn thành nghi lễ trấn yểm. Nến sáng đều, khói hương bay thẳng, nhịp sợ giảm về `0.30` (`beat: "breather"`).
- Từ phút 21:30, cài **3 manh mối sai lệch** (không dùng tiếng động lớn):
  1. Thầy pháp mù một mắt nói chuyện nhưng mắt lành của ông không nhìn vào nhân vật chính mà nhìn vào khoảng trống bên cạnh.
  2. Trên bàn thờ `D.ditapAltar`, hai tấm gương trùm vải bên hông khẽ rung rồi hé ánh nhìn đỏ sẫm (`mirrorPeek: 0.85`), nhưng trước bàn thờ chỉ còn mình nhân vật chính đứng soi mà không có ai phía sau.
  3. Khi đếm lại tráp khăn tang, không còn thừa chiếc thứ 32 nữa — chỉ còn đúng 31 chiếc trong tráp, vì **chiếc thứ 32 đang ở ngay trên đầu người kể**.

### Hồi 7: Twist lật góc nhìn / Đảo ngược danh tính ở mốc 90% (`25:00 – 28:30`)
- **Nguyên tắc Twist công bằng:** Mọi chi tiết ở Hồi 1, Hồi 4 (cuộc gọi video bị ngắt) và Hồi 6 đều khớp lại trong một khoảnh khắc: nhân vật chính đã bị đánh tráo từ thời điểm nhìn vào màn hình điện thoại tắt tối ở đêm thứ hai.
- **Hình ảnh cao trào (`beat: "twist"` → `"scare"`):**
  - `H.dollyZoom` kéo giãn hậu cảnh gian thờ `D.ditapAltar`.
  - Cận cảnh `D.ditapBigFace` của nhân vật chính chuyển sang `faceless: true` (khuôn mặt trơn nhẵn mất toàn bộ mắt, mũi, miệng dưới vành khăn tang trắng `khanTang: true`).

### Hồi 8: Lời kết phá vỡ bức tường thứ 4 — Mặt kính đen (`28:30 – 30:00`)
- Hạ dần độ sáng cảnh (`veil(g, '#030305', prog(t, 0, dur) * 0.92)`), chỉ còn ánh nến yếu ớt rồi tối hẳn về nền đen gương, chỉ giữ lại dòng phụ đề trắng viền đen `D.ditapTimedSubtitle`.
- **Mẫu lời kết 20 giây cuối:**
  > *"Câu chuyện về chiếc khăn tang thứ ba mươi hai khép lại ở đây. Nhưng nếu lúc này bạn đang nghe một mình trong phòng tối, khi video vừa kết thúc và màn hình điện thoại trên tay bạn chợt tắt thành một mặt kính đen... xin đừng nhìn kỹ vào cái bóng đang đứng sát phía sau vai bạn trong tấm gương nhỏ ấy."*

---

## 3. Công thức Đóng gói (Title, Thumbnail tách màu & Pinned Comment)

### 3.1. Công thức Tiêu đề tối giản (Minimal Title Formula)
Dữ liệu từ `@DạHànhDịTạp` cho thấy các video triệu view **không dùng** tiêu đề dài dòng kiểu cũ (`[TRUYỆN MA CÓ THẬT] Ngôi Nhà Hoang Lúc 2 Giờ Sáng | Kể Chuyện Đêm Khuya Full HD`). Thay vào đó, luôn dùng cấu trúc 2 vế ngắn gọn, trang trọng, gợi tò mò cực mạnh:

```
[Thuật ngữ Dân gian / Cấm kỵ / Tà thuật] - [Con số đếm bất thường / Vật định mệnh]
```

**Bảng mẫu tiêu đề đạt chuẩn (`<= 60` ký tự, không hậu tố rác):**
1. `Thần Trùng - Chiếc Khăn Tang Thứ Ba Mươi Hai`
2. `Bùa Lỗ Ban - Tiếng Đục Sau Vách Từ Đường`
3. `Thiên Linh Cái - Chiếc Hũ Sành Bịt Vải Đỏ`
4. `Gương Nhà Tang - Bóng Người Thứ Bảy Trong Khung Điện Thoại`
5. `Đò Âm - Chiếc Dép Thứ Chín Trên Bến Nước Đêm Rằm`

### 3.2. Công thức Thumbnail Tách Màu (`D.ditapThumbText` + `D.ditapBigFace`)
- **Bố cục 2 nửa tương phản cao (1280×720 cho 16:9):**
  - **Nửa phải (`x = 0.65 * E.W`):** Cận cảnh khuôn mặt hoảng loạn (`D.ditapBigFace` với `expr: 'shocked'`, `khanTang: true`, `rimColor: '#ff3a3a'`, hoặc thầy pháp `blindEye: 'left'`, `scar: true`), phía sau ở khoảng mờ của gian thờ `D.ditapAltar` là một bóng người đội khăn tang nhưng **`faceless: true`** (không mắt mũi miệng).
  - **Nửa trái (`x = 0.06 * E.W`):** Cụm chữ khổng lồ 2–3 dòng vẽ bằng `D.ditapThumbText` (tự tính viền đen cực dày `sz * 0.16` qua `horror.thumbText`), chiếm 45–50% diện tích khung để nổi bật hoàn toàn trên nền tối:
    - **Dòng 1 (Trắng tinh `#ffffff`):** Từ khóa chính hoặc động từ cấm kỵ (`KHĂN TANG`, `ĐỪNG ĐẾM`, `GƯƠNG NHÀ TANG`).
    - **Dòng 2 (Đỏ máu `#ff2a2a` hoặc Vàng tâm linh `#ffd23f`):** Con số hoặc chi tiết định mệnh (`THỨ 32`, `SAU 12 GIỜ ĐÊM`, `MẶT KÍNH ĐEN`).
- **Ví dụ code trong `scenes/shots/thumb.js`:**
  ```js
  import { E, V, registerShot, mood, veil, blurLayer } from '/engine/core.js';
  import * as D from '/engine/ditap.js';

  registerShot('thumb', {
    draw(g) {
      const cam = { x: -100, y: 0, z: 1.08 };
      blurLayer(g, 6, (bg) => D.ditapAltar(bg, cam, 1.2, mood('altarRoom'), { blur: 0, photoEyes: 0.85, mirrorPeek: 0.9 }));
      veil(g, '#000000', 0.35);
      D.ditapFigure(g, {
        x: E.W * 0.56, y: E.H * 0.92, s: V(2.1, 1.8), t: 1.2,
        outfit: 'mourning', khanTang: true, faceless: true,
      });
      D.ditapBigFace(g, E.W * 0.76, E.H * 0.56, V(220, 185), {
        expr: 'shocked', look: [-0.8, 0], khanTang: true, rimColor: '#ff3a3a', t: 1.2,
      });
      D.ditapThumbText(g, {
        x: E.W * 0.05,
        y: E.H * 0.32,
        align: 'left',
        size: V(132, 108),
        color: '#ffffff',
        accent: '#e01b24',
        lines: ['KHĂN TANG', 'THỨ 32'],
      });
    },
  });
  ```

### 3.3. Mẫu Bình luận ghim (Pinned Community Comment Template)
Luôn đưa mẫu bình luận ghim sau vào `out/publish.txt` và `youtube-title-description.txt` để kích hoạt thảo luận văn hóa dân gian dưới video:

```text
📌 [GÓC DỊ VĂN DÂN GIAN]
Ở quê của bạn khi trong nhà có tang sự hoặc vào những đêm rằm tháng Bảy, người lớn có dặn phải che kín hết gương soi, kiêng đếm số người trong đêm hay kiêng trả lời tiếng gọi tên ngoài ngõ không?
Bạn đã từng nghe câu chuyện truyền miệng nào ở làng quê mình mà đến giờ nghĩ lại vẫn nổi da gà chưa? Hãy kể lại ở phần bình luận bên dưới để đêm nay chúng ta cùng đọc nhé.
(Lưu ý: Câu chuyện mang màu sắc dị văn dân gian được sáng tác nhằm mục đích giải trí và gìn giữ nét kể chuyện đêm khuya — nếu bạn đang xem một mình lúc nửa đêm, nhớ bật đèn phòng trước khi nhìn vào màn hình tối nhé!)
```
