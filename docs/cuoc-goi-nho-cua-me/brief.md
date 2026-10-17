# Brief — cuoc-goi-nho-cua-me (Cuộc gọi nhỡ của mẹ)

## Content
- **Viewer cần gì:** con cái đi làm xa (22–35, lướt Reel/TikTok 9:16) thấy chính mình trong 3s đầu — từng bấm tắt máy mẹ vì bận, từng hứa "lát gọi lại" rồi quên.
- **Thông điệp 1 câu (kể lại được):** mẹ chẳng cần gì lớn lao — một cuộc gọi lại thôi cũng đủ làm mẹ vui.
- **Tone:** hai nhịp rõ rệt — nhanh, gấp, dồn dập ở đoạn công việc (bấm tắt → họp → nhắn tin → làm nốt); ấm, chậm lại từ khoảnh khắc mẹ bắt máy ("Con ăn cơm chưa?") tới hết.
- **Callback:** màn hình "cuộc gọi nhỡ" mở đầu → cuối video cùng chiếc điện thoại đó hiện trạng thái đã gọi lại, ấm lên. Câu chốt là suy ngẫm ("Một cuộc gọi lại thôi, họ cũng vui rồi"), không phải lời khuyên.
- **Bỏ ra:** số liệu ("80% người trẻ…"), đạo lý/kết luận sáo ("hãy yêu thương khi còn có thể"), từ đao to ("báo hiếu", "đấng sinh thành", "vô thường"). Giữ giọng tự sự nhỏ nhẹ của lời user.

## Style (mới, không trùng Lan / gaplai)
- **Ý tưởng:** "ngày sáng lạnh → tối ấm dần". Nửa đầu: văn phòng ban ngày, sáng lạnh, nhịp cắt nhanh (tin nhắn, họp, màn hình điện thoại). Nửa sau: đường về + bữa tối ở nhà, ánh sáng ấm dần, push-in chậm, hold dài. Mở đầu bằng **màn hình cuộc gọi nhỡ** (mock UI điện thoại), không phải nhân vật ngồi phòng đêm.
- **Palette:** ngày lạnh — nền `#E8EEF2`, xám bàn làm việc `#C9D6DF`, mực `#1E2A33`, nhấn xanh lạnh `#4A90B8`, đỏ gọi nhỡ `#E5484D`. Tối ấm — nền `#2B2320`, hổ phách `#F2A65A`, chữ kem `#FAF3E8`. Accent caption đổi theo nhịp: xanh lạnh nửa đầu → hổ phách nửa sau.
- **Chữ:** Be Vietnam Pro 600 (user chốt), caption 2 dòng căn giữa **phía dưới**, từ nhấn đổi màu theo nhịp story. Mock UI điện thoại gắn nhãn nhỏ "minh hoạ" xám `#8A94A0`.
- **Chuyển động:** nửa đầu cắt nhanh, slide-in thông báo/tin nhắn, rung nhẹ khi có cuộc gọi đến; nửa sau dissolve mềm, push-in rất chậm về phía bàn ăn, hold ≥0.6s; cú nhấn duy nhất là khoảnh khắc mẹ bắt máy (sáng ấm lên + chuông dừng).
- **Khác Lan thế nào:** Lan = nền đen thuần `#000` + pictogram que trắng + nhấn cam `#F58B4C` + chữ Inter 700 phía trên; video này = không que, không đen-cam, không chữ trên đầu — người tả thực tối giản, nền sáng lạnh chuyển tối ấm, chữ Be Vietnam Pro phía dưới.
- **Khác gaplai thế nào:** gaplai = phòng đêm nâu `#171310` + đèn vàng `#E8B04B` + hai ghế đối diện tĩnh từ đầu tới cuối; video này = mở đầu bằng màn hình điện thoại ban ngày lạnh, có arc sáng→tối và nhịp nhanh→chậm, nhấn đỏ gọi nhỡ `#E5484D` thay vì vàng đèn.

## Giọng (route)
- **Chọn (CHỐT):** Vbee **Thanh Long nâng cao (Beta)** — `hn_male_thanhlong_talk_24k-stl` (nam, Bắc).
- **Lý do:** giọng nam nhẹ nhàng, điềm tĩnh, nhịp ổn định — hợp người kể chuyện gia đình ở ngôi "mình", tải được hai nhịp đối lập (đọc nhanh đoạn việc, ấm chậm đoạn mẹ). Catalog mô tả: "kể chuyện thiếu nhi, sách nói và podcast chữa lành".
- **Cơ sở đã nghe:** preview `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3` (metadata 35.9s). Preview chỉ dùng để chọn giọng, không cấp quyền thu/clone mới.
- **Thực tế render:** quyết định tạm-render hay clone ghi ở phase voice theo production skill (provider được ủy quyền / local clone / user clip / edge-tts). Brief chỉ chốt lựa chọn + lý do.

## Script (CHỐT v3 — 2026-10-14, user cho phép sửa lời, bỏ luật verbatim v1; vòng 3 rút gọn s5/s7 theo review vòng 2)
- **Cấu trúc:** 8 shots — s1 hook giữ nguyên chữ v1; s2–s4 nhịp nhanh (bấm tắt vội → nhắn hứa → quên bẵng tới tối, phòng tắt đèn/màn hình sáng); s5–s8 nhịp ấm chậm (gọi lại bằng chính ngón tay bấm tắt → mẹ bắt máy ngay → cơm nguội/kể chuyện trời mưa → chốt callback "Đã gọi lại").
- **Tổng từ:** **149** (s1 12 + s2 12 + s3 21 + s4 21 + s5 20 + s6 16 + s7 22 + s8 25).
- **Nhịp ước tính:** **4.1 từ/giây** (Thanh Long clone), nửa sau ấm-chậm thực tế ~3.2–3.5.
- **Voice thuần ước tính:** 149 / 4.1 ≈ **36.3s** (+ pause s5 0.5s + lặng s8 ~1.2s → voice thật ~37–38s). Padding 7×0.5s + outro 1.4s = 4.9s (+ hold s1/s8 1.5s) → **video dự kiến ~43s**.
- **3 ý highlight (delivery + visual đi kèm, ghi trong script):** (a) s5 "Con ăn cơm chưa?" — nín 1 nhịp trước câu, close-up mẹ, chuông dừng + sáng ấm tràn; (b) s6 "Mẹ chỉ muốn nghe giọng mình một chút thôi." — ấm nhất, đèn sáng mạnh nhất; (c) s8 "Một cuộc gọi lại thôi, họ cũng vui rồi." — lặng 1.0–1.4s sau câu.
- **Cấm:** từ đao to ("báo hiếu", "vô thường"), đạo lý/kết luận sáo, số liệu. Giữ suy ngẫm ngôi "mình".
- Text tại `script.md` + `voice.json` (bản v3 — v2 đã bỏ verbatim v1 theo phản hồi user; v3 rút gọn s5/s7 theo review vòng 2).
