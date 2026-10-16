# Design spec & storyboard

## Format

- 1080×1920, 30 fps, 43 giây, H.264/AAC.
- Safe zone: 90 px hai bên, 120 px trên, 210 px dưới.
- Caption 64–72 px; chữ phụ tối thiểu 34 px.

## Art direction

- Nền: `#090909`, surface `#111111`, panel `#171717`.
- Accent chính: vàng đồng `#D4A574`, sáng `#E8C49A`.
- Node: violet `#A78BFA`, cyan `#67E8F9`, coral `#FB7185`, mint `#6EE7B7`.
- Heading: DM Serif Display; body: Inter; code: JetBrains Mono.
- Chuyển động ổn định, easing có gia tốc; không handheld shake, không pump toàn màn hình theo từng beat.
- UI thật xuất hiện dưới dạng asset chính thức; motion diagram là diễn giải, không giả làm screenshot sản phẩm.

## Shot map

| Cảnh | Frame | Nội dung | Shotcraft pattern | Điểm nhớ |
|---|---:|---|---|---|
| S1 | 0–302 | “Ngày đầu vào team”, repo 200k dòng | research-card-stack-scroll | “Ba ngày hả anh?” |
| S2 | 303–453 | File đẻ file, thành búi dependency | before-after + card cascade | “Khảo cổ codebase” |
| S3 | 454–573 | Gõ lệnh, graph mọc theo tầng | canvas-materialize / diagram-cascade | file–function–class–dependency |
| S4 | 574–672 | Dashboard thật, graph rõ nét | product hero + steady push-in | Knowledge graph tương tác |
| S5 | 673–1059 | Search auth, guided tour, diff impact | type-and-filter | Sửa login, giỏ hàng giận |
| S6 | 1060–1289 | Hairball → map, brand/CTA | letterspace materialize + group shot | “Đỡ đào code bằng thìa” |

## Audio direction

- Nữ trẻ, vui nhẹ, nói như đồng nghiệp; ngắt tự nhiên trước punchline.
- BGM electronic/product-demo, nhịp rõ nhưng lùi 16–20 dB dưới thoại.
- Foleys: bàn phím cho typing, paper/card ticks cho file stack, whoosh cho chuyển cảnh, impact cho lúc graph hoàn thiện.
- Render hai bản: có BGM và không BGM; bản không BGM vẫn giữ voice và SFX.
