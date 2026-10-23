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

## Bắt buộc: lưu skill và video hoàn chỉnh vào GitHub

- Repo nguồn chính: `nanxnguyen/remotion-ai-agentic-studio`.
- Khi tạo hoặc sửa skill/plugin, lưu mã nguồn tại `.claude/skills/<skill-name>/` và bản plugin tái sử dụng tại `plugins/<plugin-name>/`; không coi plugin chỉ lưu trên ChatGPT là đã hoàn tất việc lưu mã nguồn.
- Sau khi MP4 cuối đã kiểm tra đầy đủ kịch bản, lời đọc, hình ảnh, âm nhạc, captions và render gates, **tự động chuyển MP4 thật đến draft GitHub Release của chính repo đó**. Nếu xuất từ GitHub Actions, upload final MP4 thành artifact rồi gọi `.github/workflows/archive-finished-video.yml` với `qa_approved=true`, `video_slug`, `source_run_id`, `artifact_name`. Lưu thêm metadata SHA-256/codec/thời lượng và release tag trong `docs/<vid>/asset-manifest.md`.
- Tránh đưa MP4 vào Git commits. Draft Release là lưu trữ, không phải công bố video; không công khai release hay đăng YouTube nếu chưa có yêu cầu riêng. Khi không có khả năng truyền MP4 sang GitHub, báo rõ GitHub archival **chưa hoàn tất**, không gắn nhãn archived.
- Đọc `docs/production-archive-policy.md` và repo `AGENTS.md` ở phiên bản mới nhất trước khi thao tác.

## Bắt buộc trả link MP4 trên GitHub sau mỗi video hoàn tất

- Mỗi tác vụ **NEW_VIDEO hoặc VOICE_ONLY** chỉ được báo "hoàn tất và đã lưu GitHub" sau khi GitHub Actions archive step tạo **draft Release MP4 asset** và bước **Verify release asset** đã qua: GitHub API phải trả về \`html_url\`, \`assets[].browser_download_url\`, đúng tên video, kích thước và SHA-256. Phải kiểm chứng bằng kết quả thật; không suy đoán tag hay URL.
- **Giao ngay trong cùng phản hồi** hai link: **[Xem / tải video trên GitHub]** trỏ đến \`video_url\` thực nhận từ GitHub Release asset, và **[GitHub Release]** trỏ đến \`release_url\`. Có thể đính kèm sandbox MP4 nhưng không được dùng thay link GitHub khi archive thành công.
- Khi render/QA chạy trong GitHub Actions, upload MP4 artifact sau QA, rồi production workflow **gọi reusable workflow** \`.github/workflows/archive-finished-video.yml\` qua \`workflow_call\` với \`qa_approved=true\` và \`source_run_id=github.run_id\`; dùng \`needs.archive.outputs.video_url\` và \`needs.archive.outputs.release_url\` để giao link. **Không** set QA=true nếu các gate chưa thực sự đạt.
- GitHub action viết link vào **Job Summary** và artifact \`github-video-links-<slug>\`. Khi runtime không truyền outputs trực tiếp, lấy artifact hoặc tra cứu Release API, rồi kiểm tra link đã tồn tại trước khi chia sẻ.
- Draft Release là lưu trữ cho người có quyền truy cập repo (liên kết có thể yêu cầu đăng nhập), **không** tự công khai/phát hành release hoặc đăng YouTube.
- Nếu không truyền được MP4 nhị phân từ môi trường hiện tại sang GitHub Actions/GitHub Release, báo rõ **chưa có link video GitHub**, nêu điều kiện còn thiếu và không tự nhận đã lưu thành công. Không phát hành URL được ghép thủ công.

## Mandatory Shorts retention + cinematic typography

For NEW_FILM, follow **HOOK → BUILD → CLIMAX → PAYOFF** with an earned ending, immediate 0–2s promise, evidence, escalating stakes and a clear twist. Use premium Vietnamese-safe typography (ivory/amber/dark crimson, readable 9:16 safe areas, limited words, motivated transitions). Include truthful YouTube title variants, a relevant pinned-comment question and a post-publication analytics plan; do not promise views. The canonical framework is mirrored at `.claude/skills/ray-phim-ke-chuyen/references/youtube-retention-cinematic-type.md` in the GitHub repository. Any approved script change requires regenerating genuine Vbee narration; do not use old mismatched audio. GitHub MP4 link is required only after actual binary archive verification.
