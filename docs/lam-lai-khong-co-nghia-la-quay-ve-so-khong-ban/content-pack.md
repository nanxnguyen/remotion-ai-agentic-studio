# Content pack — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

Profile `story` · 5 keys / 5 shots · `voice.json` khóa (gate A — không đổi một chữ) · không CTA · kết bằng câu khẳng định + lặng 1.0s.

Quy ước (khóa theo script + user constraints):
- Caption đáy `bottom:224`, ngoài 210px đáy; mỗi dòng chunk ≤28 ký tự, ngắt ở biên cụm từ.
- HEADLINE thay caption ở s4 (core line); các key còn lại chỉ caption đáy, không on-screen text riêng.
- Accent cam `#F58B4C` theo cột accent của script (≤2 cụm/key).
- Mọi dòng `>` bên dưới là chữ hiện trên màn hình khớp từng byte lời nói: join bằng 1 dấu cách == `voice.json`.
- Không có UI dựng lại; chỉ typography + motion trừu tượng, không nhãn `minh hoạ`.

## Per-key (đúng thứ tự voice.json)

### s1 · HOOK · caption only (cover = frame 0 headline)

- On-screen (final): — (caption only; cover frame 0 mang headline hook).
- Caption đáy:

> Bạn có thể đã từng
> gọi những năm vừa qua
> là công cốc.

- Accent: `công cốc` (cam).
- Label: thiết kế (cover: khung tĩnh nội thất mờ, ánh sáng tự nhiên dịu, looking back).
- Claims: — (topic user, research §Verified facts).

### s2 · caption

- On-screen: — (caption only).
- Caption đáy:

> Nhưng chính những
> thất bại đó đã dạy
> bạn điều bạn thực sự
> không muốn.

- Accent: `thất bại đó`, `không muốn` (cam).
- Label: thiết kế (cùng không gian, rim light tăng nhẹ).
- Claims: —.

### s3 · caption (re-hook ~15–20 s)

- On-screen: — (caption only).
- Caption đáy:

> Và điều đó đủ để
> bạn chọn một con
> đường khác.

- Accent: `đủ để`, `con đường khác` (cam).
- Label: thiết kế (camera zoom chậm, dáng thẳng lên).
- Claims: —.

### s4 · HEADLINE thay caption (core message)

- On-screen (final): HEADLINE 1 dòng, ExtraBold trắng, `số không` cam — đủ từ đầu shot.

> Làm lại không có nghĩa là quay về số không.

- Caption đáy: — (headline thay caption).
- Accent: `số không` (cam).
- Label: thiết kế (khung rõ hơn, palette ấm hơn).
- Claims: — (core line verbatim từ topic, brief §Topic).

### s5 · caption (closure)

- On-screen: — (caption only).
- Caption đáy:

> Mà là bắt đầu từ
> những gì bạn đã học.

- Accent: `bắt đầu`, `đã học` (cam).
- Label: thiết kế (chuyển động nhẹ về phía trước, glow dịu).
- Claims: —.

## Cover (frame 0)

- Text: headline hook `Bạn có thể đã từng gọi những năm vừa qua là công cốc.` (2 dòng, ExtraBold, `công cốc` cam).
- Subject: khung tĩnh nội thất mờ, ánh sáng tự nhiên dịu, looking back (brief §Style).
- Phải hiện hook subject + text ngay frame 0, không fade-in trống.

## Re-hook

- Vị trí: ~15–20 s (s3), câu hỏi ngầm “điều đó đủ để bạn chọn một con đường khác” — mở ra bước ngoặt.

## CTA

- Không có (story profile, kết bằng câu khẳng định).

## Claims table

| id | claim as shown | source URL | fact/inference |
|---|---|---|---|
| — | (không có claim factual; topic cá nhân/motivational) | — | inference (research §Verified facts) |

## Labels

- Không có UI/diagram dựng lại; mọi hình ảnh là motion/typography trừu tượng (content.md §Asset list).
- Không nhãn `minh hoạ` cần thiết.