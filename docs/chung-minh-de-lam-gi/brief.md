# Brief — chung-minh-de-lam-gi (header, director)

- Comp: `ChungMinhDeLamGiReel` · profile: `story` · 9:16 1080×1920 30fps · 40–60s · light mode.
- Topic (user): cùng câu hỏi với `xay-doi-minh-hay-chung-minh` ("xây đời mình hay chứng minh ai đó đã sai?"), nhưng trả lời bằng cách **nhìn vào trong** (nội tâm), không phải ẩn dụ vật liệu xây dựng.
- Working title: "Chứng minh để làm gì?" — góc nhìn: mỗi lần muốn "cho họ thấy" là một lần tự hỏi mình đang cần điều gì; kết bằng câu hỏi mở cho người xem + lặng thuần 2.0s (không CTA).
- Viewer need (một): người 22–32 tuổi từng bị một câu coi thường găm vào, đã xây được vài thứ để "chứng minh", nhưng càng được công nhận càng thấy trống — họ cần **nhìn vào trong** thay vì xây tiếp ra ngoài.
- Bắt buộc: câu hỏi cuối là câu hỏi mở, không phán quyết; không giễu nhân vật, không "vả mặt", không giảng đạo; mọi claim hiển thị cần nguồn, UI dựng lại gắn nhãn "minh hoạ", caption đáy bottom:224 ngoài 210px đáy.
- Style (user chỉ định riêng cho video này — ngoại lệ do user yêu cầu, dùng chung ngôn ngữ với truongthanh): minimal editorial stick-figure — nền đen, chữ trắng, nhấn cam cho từ khóa và điểm nhấn; nhân vật que đơn giản + đạo cụ hình học tối thiểu; mỗi scene sạch, thưa, tương phản cao; **chữ là kể chuyện chính**; mỗi scene một ẩn dụ thị giác duy nhất; không minh họa chi tiết/gradient/nền phức tạp/clutter trang trí; layout editorial cao cấp kiểu quote-storytelling; type đậm, dễ đọc, căn giữa/trên-giữa, phân cấp mạnh; branding/footer rất nhỏ; motion nhẹ (fade/slide/scale/nhấn nhỏ); một hệ thống thị giác nhất quán; một thông điệp/scene; khoảng trống lớn được phép; reusable components (stick figure, props, quote text, layout); vector shapes, không image assets; render nhẹ, deterministic.
- Khác video 1 ở: video 1 = paper-cut diorama coban/sen/ngọc, ẩn dụ viên gạch/bức tường hướng ra ngoài; video 2 = que trắng/nền đen/cam, ẩn dụ nội tâm hướng vào trong. Không trùng kịch bản truongthanh (trưởng thành/thanh toán) — kiểm tra trùng lặp 2026-10-17: chỉ xay-doi brief khớp "chứng minh" (video anh em, góc khác); truongthanh/Lan, gaplai/metkhong/camon/cuoc-goi/thuong-hay-so không trùng.
- Voice: `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3` (preview 35.9s, catalog test OK).
- **Quyền clone (route 2 VieNeu-TTS local): CÓ** — (1) user chỉ định file preview này cho video 2 bằng văn bản ngày 2026-10-17; (2) hồ sơ cũ: user đã cho phép clone Thanh-Long-Nang-Cao ngày 2026-10-15 (brief thuong-hay-so). Ref cắt 6–10s WAV sạch vào `docs/chung-minh-de-lam-gi/voice-ref/` trước khi chạy `gen-voice-clone.py --tries 8 --max-cer 0.04`; regen targeted cho key rớt, không regen toàn bộ. Slug `thanh-long-nang-cao`.
- Nhịp ngân sách: 3.7–4.2 âm tiết/s; mốc đo Cam trong repo ≈4.3 (gaplai v2); mọi pause/hold có chủ ý là key tách + gap trong timeline.
- Monitor http://127.0.0.1:4180/ (đang chạy, reuse).

## Bài học từ video 1 (xay-doi-minh-hay-chung-minh, áp dụng cấu trúc từ đầu)

1. Pin `@remotion/motion-blur` đúng 4.0.534 khi cài (không để latest lệch).
2. Hợp đồng `smooth(f,start,end)` — end là mốc, không bao giờ truyền length; mọi interpolate đều clamp hai đầu; mọi marker chuyển động neo theo timestamp đo.
3. Mọi phần tử vẽ phải nằm trong `<svg>` (ellipse ngoài svg = không hiện); caption pill đáy ~1515, marker beat giữ phía trên.
4. Headline kiểm tương phản trên nền sáng ngay ở still đầu (trắng trên dawn = fail); draw-order: tháp/nền trước, chữ/sign sau.
5. Caption chunk ≤28 ký tự khớp byte voice.json; component multi-chunk ngay từ build; action chính không nằm sau pill caption.
6. Manifest + registry + test (`tests/core/registry.test.ts` expect N comps, testFrames `[0,mid,duration-1]`) làm cùng lúc tạo comp, không để tới QA.
7. Prettier + tsc sạch trước QA vòng 1; still QA đủ 3/khung + boundary ngay sau build.
8. Mọi chuyển stage/gate qua `pipeline.py` (video 1 monitor stale ở build — không lặp lại).
9. Cue SFX neo onset đo ±0.15s; SFX kiểu đám đông không có nguồn licensed thì DROP, không synth.
10. Ref voice WAV 6–10s trước, tries 8 rồi regen targeted; CER>0.04 do ASR miền Nam gộp phụ âm cuối thì ghi accepted-noise, không regen vô ích.

---

## Content (script-agent, 2026-10-17)

- **Viewer need (một, refined):** người 22–32 tuổi từng bị một câu coi thường găm vào từ những ngày đầu đi làm, đã gom đủ bằng khen/chức danh để "cho họ thấy", nhưng đêm về vẫn thấy rỗng — họ cần **nhìn vào trong** (mình đang cần điều gì) thay vì gom tiếp ra ngoài.
- **Câu kể lại được:** "Được công nhận rồi mà vẫn trống, vì tấm bằng chỉ treo lên tường, còn câu nói cũ vẫn nằm trong ngực."
- **Story spine:** tháng đầu đi làm, cuối buổi họp, bạn nói khẽ "để rồi xem" → ai đó cười khẩy "nó thì làm được gì" → từ đó tăng ca triền miên, gom bằng khen/chức danh về mình → ngày nhận bằng khen cả phòng vỗ tay, tối về phòng trọ im phăng phắc (**H1 ghế trống**) → **re-hook** (~19–20s, key riêng s5): "Nếu không ai biết chuyện này, bạn còn làm không?" → cơ chế spotlight (chip S4, phạm vi chú ý tức thời): người ta để ý bạn ít hơn bạn tưởng → cặp tương phản mang bước ngoặt (**H2**): "tấm bằng khen sẽ lấp được câu nói cũ / nó chỉ treo lên tường, câu nói nằm trong ngực" → nghiên cứu dọc 4 tuần (chip S11): đạt điều mình khoe, lòng vẫn nguyên chỗ trống → **H3 soi gương nửa đêm:** "Rồi bạn hỏi nhỏ: rốt cuộc, mình đang cần điều gì nhất?" (đúng góc brief: mỗi lần "cho họ thấy" là một lần hỏi mình) → S8: "trao quyền định giá mình cho người khác" → câu hỏi mở "Nếu từ mai không cần cho ai thấy nữa, bạn giữ lại điều gì?" + lặng thuần 2.0s, không CTA.
- **Tone:** trầm, tĩnh, như một người bạn nói khuya — hỏi thật, không trách, không giảng; một chút chua ở câu cười khẩy là chất liệu đời, không phải punchline.
- **Nhân vật:** "bạn" (ngôi thứ hai); một nhân vật que trung tính xuyên suốt; người chê chỉ là bong bóng thoại cũ không mặt, không phản diện hoá; không cảnh gặp lại, không "vả mặt".

### Claim plan
| Claim / nội dung trên màn hình | Nguồn |
|---|---|
| Chip s6 (window 0.3–3.6s trong shot 3.86s, fade trước cut): "Hiệu ứng spotlight (Gilovich & cs., 2000): ta tưởng người khác để ý mình hơn thực tế — đo ở chú ý tức thời" | F1 / S4 (chỉ chú ý tức thời; mọi câu "họ quên" ở dạng "có thể"; không số Manilow — U1) |
| Chip s8 (window 0.3–3.8s trong shot 4.10s, fade 0.3s trước cut): "Nghiên cứu dọc 4 tuần (J. Personality 2010, abstract): đạt mục tiêu ngoại lai không tăng wellbeing" | F3 / S11 (phạm vi abstract, không số chi tiết — U5) |
| Chip + headline s10: "trao quyền định giá bản thân cho người khác" | S8 (Tuổi Trẻ 14/02/2026, bài bình luận, không phải thực nghiệm — F5); spoken là diễn đạt theo ("bản thân"→"mình" cho khớp ngôi thứ hai), chip Tuổi Trẻ hiện trong shot s10 |
| "Câu nói cũ vẫn nằm trong ngực" / cặp tương phản bằng-treo-tường vs nói-trong-ngực | Diễn giải I1–I3 (khung biên kịch "nhìn vào trong", không phải kết luận khoa học); không chẩn đoán |
| Mọi cảnh (buổi họp, phòng trọ, gương nửa đêm, huy chương) | Minh hoạ/thiết kế từ research §4; bong bóng thoại cũ gắn nhãn "minh hoạ", không gán cho ai |

### Visual identity (user chỉ định — giữ nguyên spec header §Style)
Nền đen, chữ trắng, nhấn cam cho từ khóa; que trắng tối giản + đạo cụ hình học tối thiểu (huy chương, ghế trống, gương, đèn rọi, bong bóng thoại); mỗi scene một ẩn dụ duy nhất, thưa, tương phản cao; chữ là kể chuyện chính; caption đáy bottom:224 ngoài 210px đáy. Render: shape phẳng đặc + opacity, **cấm gradient/blur filter** (T6 locked, round 1).
- **Vì sao:** câu chuyện hướng vào trong (cảm giác "trống", soi gương, hỏi mình) cần khoảng trống và độ tĩnh; nền đen + ánh đèn đơn cho phép "rọi vào trong" đúng nghĩa đen.
- **Không được giống (trừ truongthanh):** video anh em xay-doi (paper-cut diorama coban/sen/ngọc, gạch/bức tường, mâm Tết, story-viewers UI, ô cửa bên kia hẻm, bảng "THẤY CHƯA?", đặt gạch xuống đất); ClaudeMem (cream/ink/clay); Understand Anything (dark/gold); nhóm gia đình (gaplai/metkhong/camon/cuoc-goi).
- **Ngoại lệ theo yêu cầu user:** dùng chung hệ thống thị giác truongthanh (đen/trắng/cam + que). **Khác truongthanh ở story và device:** truongthanh = ẩn dụ "hóa đơn trưởng thành" + con dấu "ĐÃ THANH TOÁN" + sofa/bar-chart xám + caption trên đầu + nhãn kênh/hashtag, tone ấm có dí dỏm; video này = không hóa đơn/con dấu/sofa/chart, layout editorial quote-storytelling, ẩn dụ huy chương–ghế trống/gương/đèn rọi, caption đáy, tone trầm-tĩnh-khuya, kết bằng câu hỏi mở + lặng 2.0s.
