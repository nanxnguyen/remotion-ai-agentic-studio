---
name: ray-phim-ke-chuyen
description: "Use when making or revising Vietnamese storytelling Shorts/reels: original mystery, horror, suspense or emotional story scripts; 9:16 cinematic storyboards; Remotion videos; real Vbee narration using GitHub Secrets; audio-only changes to an existing MP4."
---

# Ray Phim Kể Chuyện — production workflow

Sản xuất **video kể chuyện tiếng Việt** từ ý tưởng, kịch bản, clip tham chiếu, contact sheet hoặc MP4 đã dựng. Mục tiêu là **video có thể xem/nghe được**, không chỉ là storyboard hoặc một ZIP source. Kết quả phải được xác minh; không hứa đã render, đã ghép Vbee hay đã upload khi thiếu bằng chứng.

## 1. Chọn đúng chế độ ngay từ yêu cầu

- **NEW_FILM:** Người dùng muốn phim/video mới. Viết câu chuyện gốc → kịch bản theo mốc thời gian → thiết kế các hình riêng lẻ → voice Vbee → dựng Remotion → âm nhạc/SFX → QA → MP4.
- **VOICE_ONLY:** Người dùng đã có MP4 và chỉ muốn thêm/thay voice, hoặc xóa/thay một câu trong voice. **Giữ nguyên hình và tổng thời lượng** theo yêu cầu; không tạo lại ảnh, scene, caption đã được đốt vào video trừ khi người dùng yêu cầu. Tạo lại đúng các câu có thay đổi, dùng Vbee cùng `voiceCode`. Dùng `scripts/replace_narration.py` để copy trực tiếp video stream, không re-encode hình ảnh. Nếu nhạc nền đã bị trộn cứng với giọng cũ thì **không thể tách sạch nhạc bằng cách copy audio**: yêu cầu track BGM riêng hoặc xuất mới chỉ có lời kể; không được tuyên bố “giữ nguyên nhạc nền” khi đã bỏ toàn bộ audio cũ.
- **REFERENCE_ANALYSIS:** Người dùng có Shorts/Drive/MP4/contact sheet và muốn làm *phong cách tương tự*. Phân tích bằng footage/frame thật khi có; contact sheet chỉ là ảnh tĩnh, không được suy diễn audio hoặc motion chưa quan sát. Sao chép **ngữ pháp dựng và cảm giác** chứ không sao chép danh tính, script, ảnh hoặc âm thanh có bản quyền.
- **SCRIPT_ONLY / PREVIEW:** Nếu chỉ yêu cầu kịch bản, sửa đúng phạm vi; không tạo/ghi đè MP4. Nếu chưa có khả năng render/audio, giao phần đã làm và ghi trạng thái còn thiếu.

Mặc định, khi không có brief khác: phim mystery/suspense gốc ~55 giây, 9:16, tông trầm, 10–16 cảnh có vai trò rõ ràng, tiếng Việt, giọng nam Vbee Anh Khôi kể chuyện. Giữ nguyên sở thích/chỉnh sửa cụ thể của người dùng xuyên các turn.

## 2. Các quyết định sáng tạo đã chốt từ “Căn phòng 404”

- Hình ảnh **cinematic noir / dark mystery**: nhân vật nhất quán, khách sạn/hành lang/mưa/đèn vàng, tương phản mạnh, đen than, vàng nổi bật, đỏ nhấn, grain/scratches nhẹ, 9:16. Mỗi shot là **một ảnh dọc độc lập**; contact sheet 4×4 chỉ để duyệt; **không** đưa nguyên lưới 16 ô làm một cảnh của video.
- Chữ caption: tiếng Việt đậm, trắng + vàng nhấn + đỏ cho cao trào; viền/đổ bóng trên nền phức tạp; ít chữ mỗi lần xuất hiện; đúng dấu tiếng Việt. **Ưu tiên vẽ typography bằng Remotion** chứ không yêu cầu mô hình tạo ảnh tự render chữ tiếng Việt vì dễ sai chính tả.
- Hook mạnh 0–3s → bối cảnh → 2–3 manh mối tăng độ bí ẩn → twist → câu hỏi cuối. Tránh mô tả lặp nhau ở nhiều cảnh; thống nhất nhân vật, trang phục, đạo cụ và vị trí.
- **Không tự động chèn/đọc câu “Đây là câu chuyện hư cấu” vào đoạn kết.** Kết có thể là câu hỏi như “Nếu là bạn, bạn có mở cánh cửa đó không?”. Với tác phẩm hư cấu, có thể gắn nhãn *hư cấu* riêng trong phần mô tả/metadata hoặc vị trí không phá câu kết khi cần tránh khiến người xem hiểu nhầm là sự thật. Với true crime, không tự bịa tên, án mạng, số nạn nhân hoặc bằng chứng; xác minh các khẳng định thực tế.
- BGM ambient/suspense rất nhẹ, voice rõ; không thay bằng một bản nhạc đơn thuần. Diễn xuất bằng nhịp cảnh, Ken Burns, âm thanh diegetic, match cut; tránh nhảy zoom ngẫu nhiên.

Xem [Visual direction](references/visual-direction.md) và [Story and manifest contract](references/story-and-manifest.md).

## 3. Chuỗi tác nghiệp

1. **Đầu vào:** kiểm tra MP4/reference/Drive/artifact đã hiện diện, metadata (duration, fps, width, height, audio/video streams), quyền truy cập. Không bắt tải lại file đã có. Video mới có thể bắt đầu từ một chủ đề nếu user chưa cung cấp.
2. **Kịch bản:** ba hướng hook ngắn rồi chọn một, viết câu thoại 100% đọc được, timeline có `id`, `start_sec`, `duration_sec`, `narration`, `caption`, `visual`, `motion`, `sfx`, `speaker`; xuất `script.md`, `storyboard.json`, `voice-lines.json`. Sử dụng thời lượng đo thật, không ép giọng nói tăng tốc để giữ một duration bất hợp lý.
3. **Storyboard/shot design:** character bible, continuity, 10–16 prompts nhất quán, style frames và contact sheet review. Tạo tài sản phù hợp quyền sử dụng; không dùng thumbnail/contact sheet thay cho nội dung cảnh.
4. **Voice real Vbee:** ưu tiên API **Batch (`mode=async`)** dùng GitHub Actions Secrets. Phát âm số/phòng 404 thành “bốn không bốn”; voice mặc định `hn_male_phuthang_stor_24k-stl` (Anh Khôi nâng cao/Beta; xác minh voiceCode còn được gói hỗ trợ). **Không dùng API Realtime (`sync`) làm fallback mặc định**: tài khoản dùng ở Room 404 từng báo `BAD_REQUEST: This feature is not supported in user package`. Tạo từng câu `s1.mp3...sN.mp3`, đo bằng ffprobe, giữ lời thoại trong metadata và đồng bộ caption. Xem [Vbee + GitHub](references/vbee-and-github.md).
5. **Picture lock/mix:** đối chiếu utterance với từng shot, cảnh bắt đầu/kết thúc, subtitle. Với chế độ VOICE_ONLY, lấy đúng video gốc và track âm nhạc riêng (nếu có) rồi chạy `scripts/replace_narration.py`. Nếu voice dài hơn slot, sửa lại câu hoặc thay đổi timeline có báo cáo; không cắt mất âm cuối.
6. **Remotion render:** trong repo hiện có phải theo `AGENTS.md`, các rules và pipeline canonical; không tạo state giả. Tạo các cảnh React/TypeScript riêng, timeline frame-based dùng `useCurrentFrame`, `interpolate`/`spring`, `<Sequence>`, `<Audio>`, captions an toàn trên smartphone. Render H.264+AAC MP4, 9:16. Đối với phim mới tuân thủ dimensions/fps của repo (thường 1080×1920 @30fps); với bản có sẵn giữ nguyên thông số (Room 404: 720×1280 @24fps, 55s).
7. **QA và giao:** `ffprobe` trên MP4 cuối để xác nhận có video + audio, duration, fps, pixel format; kiểm tra video toàn bộ (frame 0, ranh giới cảnh, đoạn cuối), thực sự nghe speech và nhạc khi có khả năng; so sánh picture checksum input/output ở chế độ VOICE_ONLY; xác nhận không còn giọng cũ chồng lên. Không tự chấm reviewer/gate đã pass nếu chưa thực hiện. Giao **file MP4 truy cập được**, thêm storyboard/source/timeline/audio tuỳ yêu cầu; nêu rõ những phần thiếu. Không upload lên YouTube/vidIQ/publish nếu không được cho phép hoặc nếu quy định repo yêu cầu một phương thức giao hàng thì tuân thủ đúng và tách upload khỏi publish.

## 4. Làm việc trong GitHub repo đã kết nối

Repo đã dùng: `nanxnguyen/remotion-ai-agentic-studio` — luôn xác minh đường dẫn/ref còn tồn tại trước khi chạy. Xem live:
- `.claude/skills/ray-pineline-worflow-agent/SKILL.md` — pipeline bắt buộc, review gates A → Content/Audio/D → Motion → E → B → C → final QA/eval.
- `.claude/skills/ray-video-10-phut/SKILL.md` — production/picture/voice synchronization.
- `.claude/skills/ray-emotional-stick-shorts/SKILL.md` — tham khảo diễn xuất, storytelling, review cadence; **không áp nguyên style người que** lên phong cách mystery ảnh điện ảnh.
- `scripts/gen-room404-vbee.py` + `docs/room404-vbee/timeline.json` trên nhánh `feat/room404-vbee-narration` — **mẫu đã chạy thành công bằng Vbee Batch**, không hardcode story Room 404 cho phim mới.
- `.github/workflows/room404-vbee-narration.yml` trên nhánh tương ứng — tham khảo mapping Secrets đã xác thực trong GitHub-hosted runner.

Không có quyền đọc giá trị GitHub Secrets qua connector; **GitHub Actions runner có thể dùng Secrets tại runtime**, không cần hỏi người dùng gửi token. Chỉ hiển thị tên biến (không values), không log payload Authorization. Nếu chưa thể dispatch workflow trực tiếp, tạo workflow hợp lệ/PR và dùng `workflow_dispatch` hoặc trigger kiểm thử đã được cho phép; chỉ công nhận đã chạy khi có GitHub Actions run ID/job logs/artifact thực tế. Không push mp3 nguồn có bản quyền hoặc MP4 vào Git theo mặc định.

## 5. Giao nhận rõ ràng

Báo theo trạng thái thật: `script/storyboard`, `image assets`, `Vbee API audio`, `MP4 render`, `QA`, `GitHub run/artifact` (completed / blocked). Nếu người dùng muốn một video hoàn chỉnh mà chưa đủ điều kiện thì hoàn thành hết phần có thể và nêu blocker cụ thể. Không gửi placeholder hoặc video voice thay thế với nhãn "Vbee".

Tài liệu trong package: [Vbee/GitHub integration](references/vbee-and-github.md) · [Visual direction](references/visual-direction.md) · [Manifest](references/story-and-manifest.md) · [Editing / QA](references/editing-and-qa.md).

Các tiện ích đóng gói (không tự chạy khi cài plugin): `scripts/generate_vbee_batch.py`, `scripts/replace_narration.py`, `scripts/verify_video.py`. Agent có thể chép sang môi trường build/runner rồi chạy khi đã được cấp quyền và đủ media/assets.

## Durable storage — required for this repository

- **Canonical source:** Save any new/updated skill under `.claude/skills/<skill-name>/` in `nanxnguyen/remotion-ai-agentic-studio`. Keep re-installable ChatGPT packages under `plugins/<plugin-name>/`; synchronize both copies and use a PR, following repo rules.
- **Finished video archive:** Once the **real final MP4 passes the repo's render, voice, caption and QA gates**, store it as a **draft GitHub Release asset in the same repository**, via `.github/workflows/archive-finished-video.yml` (production workflows may call it as a reusable workflow after uploading the verified final MP4 as an Actions artifact). Also upload a metadata JSON with SHA-256 and record the Release tag and source run in `docs/<vid>/asset-manifest.md`. Keep the MP4 out of Git history and `out/` ignored.
- **Video delivery is incomplete until archival is verified** when the user requested repository storage. If the available tools cannot upload a binary, say plainly that the GitHub archive is pending; never substitute a README/link for the actual MP4.
- Draft Release is **storage, not publication**. Do not make the release public, publish to YouTube, or broaden media sharing without separate authorization. Before any public release, verify source licensing and privacy.
- For a **VOICE_ONLY** edit: archive the corrected final MP4 as a new revision; keep original and old tags intact, cite their SHA-256. Never claim a text change updated the archived video unless its binary was re-uploaded.
- Follow `docs/production-archive-policy.md` for the archive contract, workflow inputs, and recovery procedure.

