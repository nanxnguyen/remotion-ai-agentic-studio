# Brief — thuong-hay-so-bat-dau-lai (Giữ vì thương, hay vì sợ phải bắt đầu lại?)

## Phase 0 (intake)
- **Duplicate check (2026-10-15):** grep `thương|bắt đầu lại|mối quan hệ|chia tay|người yêu` trên `docs/` + `src/`, đọc brief gaplai/metkhong/camon/cuoc-goi-nho-cua-me, kiểm Root.tsx (8 comp). Khớp từ khoá chỉ là từ ngữ ngẫu nhiên. Không video nào về "ở lại một mối quan hệ vì thương hay vì sợ bắt đầu lại". **Cleared.**
- **Profile:** story · 9:16 · 1080×1920 · 30fps · 40–60s · nền tảng TikTok/Reels/Shorts.
- **Voice:** clone cục bộ Thanh-Long-Nang-Cao (user cho phép, 2026-10-15), ref `voice-ref/refThanhLong.wav`, slug `thanh-long-nang-cao`. Preview không tự cấp quyền; cơ sở = xác nhận của user. (edge-tts tạm đã bỏ.)

## Lời user bắt buộc (verbatim, không sửa chữ)
1. «Bạn giữ mối quan hệ ấy vì thương, hay vì sợ phải bắt đầu lại?» → câu HOOK.
2. «Nếu hôm nay mới gặp người ấy, biết mọi điều đang biết, bạn có chọn bước vào không?» → câu hỏi phản tư / bước ngoặt cuối.

## Ràng buộc nội dung
- Phản tư cá nhân, KHÔNG claim khoa học/số liệu (không nói "sunk cost", "80%…").
- Kết KHÔNG kê đơn "ở lại" hay "rời đi". Câu hỏi 2 là công cụ soi, không phải phán quyết.
- Bỏ: lời khuyên, đạo lý sáo, từ đao to, kể tội một bên.

## Không được giống
- gaplai: hai ghế đối diện + đèn bàn vàng + nâu đêm `#171310`.
- camon: polaroid/ảnh cũ callback.
- cuoc-goi-nho-cua-me: điện thoại gọi giữa hai căn phòng, đỏ gọi nhỡ.
- metkhong: một người một mình đêm trong phòng trọ, bàn tay làm việc lặt vặt.
- lan: nền đen + người que trắng + cam.

## Content (script-agent, vòng 1)
- **Viewer need (một):** người đang ở trong một mối quan hệ lâu năm kiểu "quen rồi" — không tệ, không ai có lỗi — nhưng không còn chắc mình ở lại vì thương hay vì ngại bắt đầu lại. Họ cần một cách tự soi **không bị phán xét, không bị khuyên**.
- **Câu kể lại được (retellable):** "Cùng một bát canh nhặt hành cho người ấy, có tối vì thương, có tối vì sợ — nhìn từ ngoài giống hệt; nên thử hỏi: nếu hôm nay mới gặp, biết hết rồi, có chọn bước vào không?"
- **Story spine:** một thói quen nhỏ có thật trong nhà hai người (nhặt hành khỏi bát canh của người ấy, chờ tiếng chìa khoá) được kể **hai lần bằng cùng một câu**, chỉ đổi lý do. Re-hook đặt góc mới "nhặt vì người ấy, hay vì mình?". Bước ngoặt: tối thương hay tối sợ, cái bát vẫn y hệt nhau, người ấy không phân biệt được, "có khi mình cũng không biết". Kết: đứng ở cửa bếp nhìn người ấy lâu hơn mọi tối, điểm lại những điều đã biết — nhắn trước (ấm), cãi đúng một câu ba năm (mệt), vẫn ghét hành (trung tính) — rồi đặt câu hỏi 2 và **im lặng thuần**.
- **Nhân vật:** "mình" + "người ấy", trung tính giới (không anh/em, không xưng hô lộ giới, tin nhắn "Xin lỗi nha."), quen ~ba năm, không phản diện. Người ấy xuất hiện thật trong s5–s10 (không phải một người một mình).
- **Tone:** thủ thỉ, quan sát, tỉnh và ấm; không bi kịch, không giảng. Một nụ cười nhẹ duy nhất ("Và vẫn ghét hành.").
- **Thiết bị tương phản:** cặp câu đối xứng s5/s6 "Có những tối, mình nhặt hành vì … Nghe tiếng chìa khoá, mình …" — thương: "vì nhớ người ấy ghét hành / chạy ra mở cửa"; sợ: "vì quen tay / thở phào. Vậy là, chưa phải bắt đầu lại. Chưa phải học xem một người mới ghét gì." (câu cuối nối motif hành: bắt đầu lại = học lại "hành" của người khác).
- **Callback:** (1) "ghét hành" s5 → s9 "Và vẫn ghét hành."; (2) "bắt đầu lại" hook s1 → s6; (3) đèn Giữ ấm frame 0 → frame cuối, vẫn sáng, không ai bấm; (4) treo chìa khoá + đứng ở cửa bếp s8 → ngưỡng cửa s10.
- **Claim plan:** không có claim sự thật nào ngoài lời user (F1, F2 → nguồn `user`). Mọi chi tiết đời thường là thiết kế/inference từ research §5–§8, không đưa lên màn hình như sự thật. Không số liệu, không thuật ngữ tâm lý.
- **Bỏ ra:** lời khuyên ở/đi, "sunk cost" hay bất kỳ khái niệm khoa học, kể tội, cảnh cãi nhau to, nước mắt, nhẫn/cưới/Tết, sáo ngữ ("thanh xuân", "yêu là…"), CTA.

## Style (script-agent đề xuất; design-agent chốt ở Phase 3)
- **Ẩn dụ trung tâm (một): nút "Giữ ấm" của nồi cơm điện.** Chữ "giữ" chính là động từ của hook. Đèn Giữ ấm sáng có hai nghĩa cùng lúc: giữ cơm nóng chờ người ấy về (thương), và trạng thái mặc định khi không ai bấm gì nữa (quán tính). Một chấm đèn, hai lý do — đúng câu hỏi của video. **Đèn Giữ ấm = thói quen vẫn chạy**, nó không đứng về phía nào; động cơ do ánh sáng *quanh* nó mang (grade ấm = thương, đèn tuýp lạnh = sợ). Đèn "thở" (sáng/mờ chu kỳ 2.4s) suốt video với nhịp không đổi; trong khoảng lặng cuối nó thở dưới ánh đèn tuýp lạnh, hai mã màu ngang nhau, để không màu nào trả lời thay người xem.
- **Không gian:** căn bếp chung của hai người lúc chập tối — tường gạch men trắng ánh xanh dưới đèn tuýp, cửa sổ trời tím chạng vạng, bàn nhỏ hai bộ đũa, mũ/áo khoác người ấy trên ghế, móc chìa khoá cạnh cửa. "Chạng vạng" = giờ không sáng không tối, như chính mối quan hệ.
- **Palette:**
  - gạch men dưới đèn tuýp `#E6ECE8`, ron gạch `#C3CEC8`, inox bàn/nồi `#B8C2C6`
  - trời chạng vạng ngoài cửa sổ: tím chàm `#3D2C5E` → hồng bụi `#C77DA0`
  - mực/viền & nền caption: tím cà `#2A2238` (pill `#241B33` 85%)
  - chữ: trắng lạnh `#F7F5FA`
  - **đỏ son `#FF5A36`**: màu LED Giữ ấm (thói quen) + màu chữ/grade ấm của phía "thương" (chấm sáng + chữ nhấn, không tô mảng)
  - **xanh dừa cạn `#9DB4FF`**: ánh đèn tuýp lạnh + màu chữ/grade của phía "sợ"
  - nhãn "minh hoạ": `#8C86A0`
  - So sánh màu nhấn: Lan `#F58B4C` (cam đào, sáng hơn, hue ~22°) và cuoc-goi `#E5484D` (đỏ hồng, hue ~358°); `#FF5A36` là đỏ son hue ~11°, bão hoà hơn, đúng màu LED nồi cơm, và luôn đi với tím chàm/gạch trắng chứ không với đen hay xanh văn phòng. `#9DB4FF` khác violet sơ đồ của UA `#a78bfa` (tím hơn) và xanh thép cuoc-goi `#4A90B8` (đậm hơn).
- **Hệ màu mang nghĩa:** từ thuộc phía "thương" tô `#FF5A36`, từ thuộc phía "sợ" tô `#9DB4FF`, từ nhấn trung tính chỉ in đậm. Grade cảnh s5 ấm, s6 lạnh, s7 hai grade hội tụ về một → người xem *thấy* "giống hệt nhau".
- **Chữ:** Literata SemiBold cho headline lớn (hook F1 s1, "Nhặt vì gì?" s4, câu hỏi F2 s10); Lexend Medium/Bold cho caption và tag. **Cả hai chưa dùng trong repo: verify bộ dấu tiếng Việt (vi subset) ở Phase 3**; nếu Lexend lỗi dấu thì fallback Be Vietnam Pro chỉ cho caption.
- **Caption:** đáy `bottom: 224`, tối đa 2 dòng căn giữa, pill tím cà, chữ `#F7F5FA`, Lexend 56–60px. Ở s1 và s10 headline lớn = chính câu nói (thay caption, không lặp chữ hai chỗ). Mock UI tin nhắn s9 gắn nhãn "minh hoạ".
- **Chuyển động ("nhịp thói quen"):** máy đặt chân đứng như tĩnh vật, khung hình lặp lại (cận nồi cơm, top-down bàn, khung cửa bếp); easing easeInOutSine, **không overshoot, không nảy** (thói quen thì trơn tru); cắt theo âm thanh trong cảnh (nồi cơm "cạch", chìa khoá "lạch cạch"). Ba thủ pháp có tên: **freeze** (s4 re-hook), **tua lại rồi diễn y hệt** (s6), **chia đôi màn hình + hội tụ grade** (s7). Kết: push-in rất chậm rồi đứng im hẳn.
- **Nhân vật:** minh hoạ phẳng tả thực tối giản (không que), "mình" chủ yếu qua bàn tay/bóng lưng, người ấy mặt mềm, tóc ngắn, áo rộng, trung tính giới.

## Giọng (chốt, 2026-10-15 — thay dòng "Voice (tạm)" ở header)
- **Route:** clone local VieNeu-TTS giọng **Thanh-Long-Nang-Cao**, **user đã ủy quyền** (theo director truyền lời user). Ref: `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav`. Không dùng edge-tts NamMinh nữa; director cần chạy `pipeline.py voice thuong-hay-so-bat-dau-lai <slug-mới>` để đổi tên output.
- **Nhịp:** ~2.3–2.6 từ/s (từ ghép) ≈ 3.7–4.2 âm tiết/s; Thanh Long đo thật trong repo ~4.1 âm tiết/s, đoạn ấm-chậm ~3.2–3.5 (`docs/cuoc-goi-nho-cua-me/brief.md:27`). Clone không chỉnh rate: chậm có chủ ý chỉ bằng câu ngắn, dấu phẩy và hold hình; không tăng/giảm tốc audio.
- **Lý do hợp chuyện:** giọng nam trầm, ấm, kể như tự nói với mình; lời thoại trung tính giới nên giọng không ép giới tính cho "mình".
- **Kết:** câu nói cuối cùng là câu hỏi F2 hỏi thẳng người xem, sau đó lặng thuần 1.8–2.0s. Không lời mời bình luận (đã bỏ hẳn ở script v2: câu hỏi riêng tư không làm mồi tương tác).

## Khác các video hiện có
- **Understand Anything (`src/Main.tsx`):** nền đen `#090909` + gold `#d4a574` + DM Serif/Inter, sơ đồ node. Video này: bếp sáng chạng vạng, không sơ đồ, không gold.
- **claude-mem (`src/ClaudeMem.tsx`):** giấy kem `#f5efe6` + mực + clay `#d97757`, terminal. Video này: gạch trắng lạnh + tím chàm + đỏ son LED, không UI máy tính.
- **lan/truongthanh:** đen thuần + người que trắng + cam `#F58B4C` + Inter chữ trên đầu. Video này: không que, không đen, caption dưới, nhân vật tả thực.
- **camon:** đêm xanh-đá → rêu sẫm `#1E2A25` + lá mạ `#9FD39A` + Lora + polaroid. Video này: không xanh rêu/lá, không ảnh cũ, không arc đêm→bình minh; ánh sáng cố định giờ chạng vạng, chỉ grade đổi theo động cơ.
- **gaplai:** phòng đêm nâu `#171310` + đèn bàn vàng + hai ghế đối diện tĩnh. Video này: không ghế đối diện, không đèn vàng; nguồn sáng là đèn tuýp + một chấm LED đỏ son.
- **metkhong:** một người một mình phòng trọ đêm xám lạnh `#141A24`, bàn tay việc lặt vặt, đèn `#FFC46B`. Video này: **không gian hai người** (bàn hai bộ đũa, đồ của người ấy, người ấy xuất hiện s5–s10), giờ chạng vạng tím, trọng tâm là một thói quen dành cho người kia.
- **cuoc-goi-nho-cua-me:** điện thoại giữa hai căn phòng, sáng lạnh văn phòng → tối hổ phách, đỏ gọi nhỡ; có bát cơm nguội/mâm cơm nhà mẹ. Video này cũng có bát ăn cơm nhưng vai trò khác: không ăn một mình, không tương phản mâm/bát; bát canh là *vật chứng của thói quen* (nhặt hành), một cái bát qua hai động cơ ở bước ngoặt. Điện thoại chỉ là một insert 1.8s ở s9.
