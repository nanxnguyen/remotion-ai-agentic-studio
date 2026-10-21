Dùng skill ray-video-10-phut (.agents/skills/ray-video-10-phut/SKILL.md), skill này bọc
ray-pineline-worflow-agent (.agents/skills/ray-pineline-worflow-agent/SKILL.md), để sản xuất video mới.
Đọc theo thứ tự: AGENTS.md → .agents/rules/README.md + .agents/rules/* → base SKILL.md
(đặc biệt mục "Runtime mapping") → references/architecture-contract.md → schemas/review-gates.json
→ references của ray-video-10-phut theo §1 của nó.

## Đề bài
- Chủ đề: "Sợ bị xem là ích kỷ khi nói 'không'" — nhận thêm việc dù đã kiệt sức vì sợ một câu phán xét.
- Slug đề xuất: so-bi-xem-la-ich-ky-khi-noi-khong · CompId: SoNoiKhongReel
- Profile: story
- Giọng: BẮT BUỘC Thanh Long Nâng Cao (VieNeu-TTS clone, slug `thanh-long-nang-cao`,
  ref docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav, 8.2s, md5 199de31c8281d895dd571e36fe464ed5).
  Không đổi giọng, không benchmark giọng khác. MP4 cuối: out/<vid>-thanh-long-nang-cao-reel.mp4.
  Nhịp đọc nhanh, tự nhiên như người thật (rate +4..+8%, nghỉ ngắn), nhưng không tua nhanh file audio.
- Độ dài: 30–40 giây (ghi đè mặc định 30–45s), 5–7 shot, 1080×1920 @30fps.
  Ngân sách lời: Thanh Long đo thật ≈ 4.1 âm tiết/s → tổng lời ~100–125 âm tiết, còn lại là nghỉ + hold cuối.
  Render/verify luôn kèm `--min-seconds 30 --max-seconds 40`.
- Người xem: người đi làm 22–35 tuổi, quen gật đầu với mọi yêu cầu (đồng nghiệp, sếp, gia đình, bạn bè),
  đã quá tải nhưng vẫn nhận thêm vì sợ bị đánh giá là ích kỷ, không nhiệt tình. Họ cần được hiểu
  và được "cho phép" từ chối, không cần bị dạy kỹ năng giao tiếp.
- Hook chính (giữ nguyên văn câu mở đầu, là s1):
  "Tôi nhận thêm việc dù đã kiệt sức, chỉ vì sợ một câu: 'Có thế cũng không giúp được à?'"
  Đây là 1 trong 3 hook candidate; 2 hook còn lại phải khác cơ chế, vẫn chấm cả 3 theo brief.
  Câu trích 'Có thế cũng không giúp được à?' là lời người khác: caption/đồ hoạ phải tách bạch
  (ngoặc, kiểu chữ khác), voice vẫn do narrator đọc lại như lời nhớ — không tạo giọng thứ hai.
- Thesis gợi ý (script-agent được viết lại cho hay hơn, giữ ý): nói "không" với một việc là nói "có"
  với sức lực của chính mình; người thật lòng quý bạn không cần bạn kiệt sức để chứng minh điều đó.
  Kết bằng MỘT câu từ chối nhẹ nhàng, cụ thể, nói được ngay hôm nay.
- Hướng hình ảnh (vẽ theo ngôn ngữ của template chuẩn bên dưới): màn hình chat tối giản có tin nhắn
  "Nhờ chút nhé?" lúc 21:47, ngón tay/nhân vật que gõ "Ok" rồi khựng lại; danh sách việc dài thêm từng dòng;
  văn phòng tắt đèn dần chỉ còn một bàn; cốc cà phê thứ ba. Payoff: tin nhắn từ chối được gửi, máy tính gập lại,
  nhân vật bước ra — màu cam nhấn chuyển sang chính nhân vật. Không dựng phản diện (sếp/đồng nghiệp xấu);
  người nhờ chỉ là tin nhắn, không phải nhân vật trên màn hình.
- Giọng điệu: dịu, thật, không trách ai, không giảng "kỹ năng từ chối 5 bước", không khẩu hiệu
  ("hãy yêu bản thân"). Không chẩn đoán tâm lý (không dùng "burnout là bệnh…");
  số liệu/khái niệm (nếu dùng) phải có nguồn thật trong research.md, không có thì bỏ.
- Phân biệt với video cũ (TÔI XÁC NHẬN đây là video MỚI, không hỏi lại):
  · ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu = chiều lòng/che giấu cảm xúc trong quan hệ thân mật.
  · ban-khong-yeu-duoi-chi-da-manh-qua-lau = luôn làm chỗ dựa cảm xúc cho người khác.
  · metkhong = tự gánh mọi thứ khi lớn lên ("việc muộn cũng tự ôm").
  · Video này = khoảnh khắc ĐỐI DIỆN một lời nhờ và nỗi sợ bị gọi là ích kỷ; kết bằng hành động từ chối cụ thể.
    Không lặp câu chữ, hook, bố cục hay cover của ba video trên.
  Ghi kết quả check trùng + lý do khác biệt này vào brief.md.
- Chỉ render bản có nhạc nền.

## Template chuẩn: tiec-nguoi-hay-nam-thang (học PHONG CÁCH + CHẤT LƯỢNG, không chép QUY TRÌNH cũ)
Đọc trước Gate A và trước design: docs/tiec-nguoi-hay-nam-thang/{brief.md, design-spec.md, script.md,
research.md, script-review*.md, content-pack.md, eval.md}, src/videos/tiec-nguoi-hay-nam-thang/{timeline.ts,
scenes.tsx, Reel.tsx}, và xem frame thật của out/TiecNguoiHayNamThangReel.mp4
(`ffmpeg -i out/TiecNguoiHayNamThangReel.mp4 -vf fps=1 out/qa/<vid>-template-%02d.png`, mở từng ảnh).
LẤY THEO (bắt buộc):
- Ngôn ngữ hình: nền đen tuyền, nhân vật que vector trắng (đầu tròn r=44 trên khung 1080, nét 9px bo tròn,
  tỉ lệ đầu/thân 1:4.2 nhất quán), MỘT màu nhấn cam #F28C52 chỉ cho khoảnh khắc chủ động/bước ngoặt,
  xám phụ #BDBDBD; một chủ thể chính mỗi frame; đạo cụ trừu tượng mang ý nghĩa (lịch ↔ ở đây là tin nhắn/danh sách việc).
- Chữ: Be Vietnam Pro (subset vietnamese), headline vùng an toàn giữa-trên, thân chữ ≥68px.
- Kể chuyện: người kể ngôi thứ nhất, nhịp hỏi → kể → im lặng → bước ngoặt → câu kết mở; không CTA chung chung,
  không trách móc, không số liệu không nguồn.
- Timeline: thời lượng shot = khung voice đo thật (ceil) + khoảng giữ CÓ Ý NGHĨA, mỗi hold ghi chú lý do trong timeline.ts;
  hold cuối ~2.0s im lặng.
- Độ sâu chuẩn bị: research có nguồn; script review chia lens (fidelity / emotion / delivery) rồi gộp, điểm = lens thấp nhất.
- Chuyển động 100% từ useCurrentFrame/interpolate/spring, không timer/random.
KHÔNG LẤY THEO (template là workflow v3, đang fail audit hiện tại):
- Không dùng 1 file scenes.tsx: dùng src/videos/<vid>/scenes/*.tsx (pipeline build yêu cầu).
- Không gõ tay MEASURED_SECONDS: voice-durations.ts phải từ `npm run voice:measure`, timeline import VOICE_SECONDS.
- Không đặt tên MP4 kiểu TiecNguoiHayNamThangReel.mp4: chỉ `pipeline.py render` → out/<vid>-thanh-long-nang-cao-reel.mp4.
- Không bỏ dòng `visual content: X/10` trong video-review (gate C bắt buộc), không thiếu agent record của reviewer.
- Không chép câu chữ, bố cục shot, cảnh lịch/ngã rẽ của template — chỉ chép ngôn ngữ thiết kế và chuẩn chất lượng.
- Độ dài template 45–60s; video này 30–40s → ít shot hơn, hold ngắn hơn, giữ hold cuối.
Ghi trong design-spec.md mục "Template: tiec-nguoi-hay-nam-thang" liệt kê từng điểm đã lấy theo và điểm cố ý khác.
BẮT BUỘC frontend-design (theo "Mandatory frontend-design pass" trong SKILL.md của ray-video-10-phut):
design-agent đọc .agents/skills/frontend-design/SKILL.md, làm đủ plan pass → review pass (so với default chung chung)
→ restraint (1 chi tiết đáng nhớ) → self-critique trên style frame; ghi mục `## frontend-design pass` trong design-spec.md.
Template thắng khi xung đột về palette/nhân vật/font; frontend-design chỉ nâng chất lượng trong khuôn đó.

## Runtime — Codex (theo "Runtime mapping" của base SKILL.md)
Role định nghĩa duy nhất ở .agents/roles/<name>.md; bản sinh sẵn cho Codex: .codex/agents/<name>.toml.
- Bạn đóng vai video-director (main thread). KHÔNG tự viết research/script/design/scene/review.
- Dispatch role <name>: spawn custom agent <name> nếu bản Codex đang cài hỗ trợ; nếu không, chạy một
  process riêng `codex exec` với prompt = nội dung .agents/roles/<name>.md + dispatch packet
  (brief/script/voice.json/research đã chấp nhận, file được ghi, acceptance check, "follow .agents/rules/").
- Reviewer luôn là subagent/process MỚI mỗi vòng, không bao giờ là thread của producer.
- Song song khi bật (agents.max_threads); không thì chạy lần lượt, nhưng KHÔNG gộp producer và reviewer.
- Gửi fix về producer: cùng session nếu hỗ trợ; không thì process mới cùng role, kèm artifact cũ +
  toàn bộ ticket + closure table.
- Trước mỗi dispatch: `python3 -I scripts/pipeline.py agent <vid> <role> running --stage <stage> --note "<task>"`;
  khi trả về: `... agent <vid> <role> done` (hoặc failed). Bản song song: <role>-1, <role>-2.
- Reviewer không chạy pipeline.py; chỉ director ghi review/gate.
- Sandbox: VieNeu-TTS, ASR, ffmpeg, Remotion/Chrome cần chạy thật trên máy (có thể cần mạng để tải model).
  Nếu sandbox/approval chặn → stage `blocked` + lệnh bị chặn + lỗi; KHÔNG thay bằng file giả.
- Mỗi báo cáo phase ghi rõ: Codex version, dispatch bằng custom agent hay `codex exec`, song song hay tuần tự.

## Thời gian vs chất lượng
Bắt đồng hồ khi bắt đầu Phase 0, ghi timestamp thật từng phase.
Mục tiêu 600s. Vượt → ghi "SLA missed" và CHẠY TIẾP đủ quy trình.
Chỉ được rút thời gian ở ý tưởng (3 hook → chọn 1, 1 visual thesis, ≤7 shot, không moodboard thứ 2).
KHÔNG BAO GIỜ rút ở: voice thật, reviewer độc lập, render, QA, evidence.

## Phase 0
- Preflight: nếu có `scripts/preflight.py` thì chạy `python3 -X utf8 -I scripts/preflight.py`.
  HIỆN REPO KHÔNG CÓ FILE NÀY → tự kiểm và dán output: `ffmpeg -version | head -1`, `node -v`,
  `npx remotion --version`, Chrome/`CHROME_EXECUTABLE`, import mà scripts/gen-voice-clone.py dùng
  (chạy `python3 scripts/gen-voice-clone.py --help`), dung lượng đĩa trống.
  Ghi vào brief.md: "preflight.py missing — manual checks".
- `python3 -m unittest scripts.test_voice_catalog` exit 0.
- Check trùng chủ đề trong docs/ + src/ (đọc brief/script của ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu,
  ban-khong-yeu-duoi-chi-da-manh-qua-lau, metkhong) và ghi khác biệt vào brief.md.
  Tôi đã xác nhận làm video mới → không dừng để hỏi trừ khi tìm thấy video cùng chủ đề "sợ nói không / từ chối".
- `python3 -I scripts/pipeline.py init <vid> --comp <CompId> --voice thanh-long-nang-cao --profile story`.

## Creative brief (docs/<vid>/brief.md, theo .agents/skills/ray-video-10-phut/templates/creative-brief.md)
- 1 thesis kể lại được trong 1 câu.
- 3 hook khác cơ chế (bất ngờ/tương phản · khoảng trống tò mò · stake cá nhân cụ thể),
  chấm theo nguồn + hiểu khi tắt tiếng + tiềm năng frame đầu → chọn 1, ghi lý do.
- Cấu trúc: hook 0–3s → bối cảnh → re-hook ~12–18s → payoff → hold cuối (≥1.5s im lặng).
- Ít nhất 1 chi tiết giác quan mỗi beat; ít nhất 1 cặp tương phản (ngón tay gõ "Ok" lúc kiệt sức ↔
  cùng ngón tay gõ lời từ chối nhẹ nhàng rồi gửi).
- Art-direction thesis dựa trên template chuẩn (đen/trắng/cam #F28C52/xám #BDBDBD, nhân vật que, Be Vietnam Pro),
  cách làm caption, 1 chữ ký thị giác riêng cho video này. Không card animation chung chung, không transition ngẫu nhiên.
- Bảng shot: # | giây | VO nguyên văn | chữ trên màn | hành động/visual | camera/motion | SFX | nguồn | scene owner.
- Frame 0 là cover có ích (màn hình chat "Nhờ chút nhé?" 21:47 + chữ hook, nét trắng trên nền đen) — nền đen
  nhưng phải có chủ thể và chữ rõ, không phải frame đen trống.
  Không nhồi lời quá slot; tổng ước tính phải nằm trong 30–40s kể cả nghỉ và hold.

## Voice (Thanh Long Nâng Cao)
- `mkdir -p docs/<vid>/voice-ref && cp docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav docs/<vid>/voice-ref/`
  rồi md5 (macOS `md5 -q`, Linux `md5sum`) phải = 199de31c8281d895dd571e36fe464ed5; sai → dừng báo lỗi.
- Tone probe: nếu có `scripts/tone-probe.py` thì chạy trước Gate A. HIỆN REPO KHÔNG CÓ →
  script-agent tự rà câu có nhiều thanh dấu nặng/ngã liên tiếp, đánh dấu RISK và viết lại trước Gate A;
  ghi "tone-probe.py missing — manual tone review" trong voice-direction.md.
- Tạo voice bằng script có thật (xem `--help` trước):
  `python3 scripts/gen-voice-clone.py <vid> --ref docs/<vid>/voice-ref/refThanhLong.wav --json docs/<vid>/voice.json --performance docs/<vid>/voice-performance.json --max-cer 0.04`
  CER ≤ 0.04 mỗi key.
- Fallback mỗi key: thử lại tối đa 3 lần → re-split câu 1 lần → nếu có `scripts/gen-voice-vc.py` thì route 3
  (HIỆN KHÔNG CÓ → bỏ qua) → `accepted-risk` ghi rõ trong voice-report.md. Không bao giờ dùng file giả.
- Theo references/voice-character-sync.md: speaker ID, voice-sync.json đủ map utterance→speaker→shot.
  Câu hook dùng ngôi "Tôi" → narrator kể ngôi thứ nhất; giữ nhất quán ngôi kể suốt video.

## Luật cứng — vi phạm = huỷ video
1. KHÔNG placeholder: không file audio giả, không copy 1 file thành nhiều, không tone/sine thay voice,
   không file 0 byte. Không tạo được thật → stage `blocked` + lý do, dừng.
2. KHÔNG bịa số: mọi MD5/sha256/size/duration/LUFS/CER/điểm lấy từ output lệnh thật trong phiên.
   Report phải kèm lệnh + output. Script nào không tồn tại thì ghi "missing", không viết như đã chạy.
3. voice-durations.ts CHỈ từ `npm run voice:measure -- <vid> --out src/videos/<vid>/voice-durations.ts`;
   timeline.ts dựng trên VOICE_SECONDS + hold có chủ đích, không gõ tay frame.
4. Scene trong `<Sequence from={X}>`: useCurrentFrame() bắt đầu từ 0 — không so với SHOTS.*.from tuyệt đối.
5. Không mô tả frame chưa xem: render still, mở/đọc PNG thật, rồi mới viết.
6. Mọi lệnh pipeline.py phải exit 0. Lỗi → sửa gốc, không lách, không sửa status.json tay,
   không pipe lệnh quan trọng qua `tail`.
7. Thứ tự gate bất biến: A → [Content, Audio, D] → Motion → E → B → C → QA → eval/check.
   Ngưỡng: A≥9 (hook sub-score ≥9, specificity/emotional ≥9), Content≥9, Audio≥9, D≥8.5, Motion≥9,
   E≥9, B≥9, C≥8, 0 ticket Cao/Trung.

## Checkpoint bắt buộc (tự chạy, dán lệnh + output vào report)
- Sau voice: `shasum -a 256 public/audio/<vid>/*.mp3` không hash trùng; ffprobe từng clip;
  ASR từng clip vs voice.json (CER từ gen-voice-clone.py).
- Sau BGM/SFX: `shasum -a 256` toàn bộ file trong public/audio/<vid>/ (cả thư mục con) không trùng;
  licence + sha256 thật trong assets-manifest.md.
- Join: voice:measure xong, timeline từ số đo thật, tổng 30–40s, voice-sync.json đầy đủ.
- Iteration: chỉ `python3 -I scripts/pipeline.py render <vid> --draft --scale 0.5`; draft không tính là QA.
- Sau build: still tại frame tuyệt đối giữa mỗi shot của composition
  (`npx remotion still src/index.ts <CompId> out/qa/<vid>-<shot>-<frame>.png --frame=N`),
  đọc từng ảnh, không ảnh đen/trống; `npx tsc --noEmit` sạch.
- Render: `python3 -I scripts/pipeline.py render <vid> --min-seconds 30 --max-seconds 40` exit 0
  (verify có blackdetect); ebur128 ≈ −14 LUFS, true peak ≤ −1.5 dBTP, BGM thấp hơn voice 12–18 dB;
  ASR full mix vs voice.json.
- `python3 .agents/skills/ray-video-10-phut/scripts/validate_voice_sync.py docs/<vid>/voice-sync.json --mp4 <final.mp4>` exit 0.
- Cuối: `python3 -I scripts/pipeline.py audit <vid>` 0 lỗi, 0 cảnh báo "no … agent record";
  `python3 -I scripts/pipeline.py check <vid>` exit 0.

## Bàn giao (theo §6)
- vid, chủ đề, composition, voice route, đường dẫn MP4 + `shasum -a 256` thật, giây (30–40), độ phân giải.
- Điểm từng gate + tên reviewer subagent; Codex version + cách dispatch; bằng chứng; không blocker mở.
- Thời gian: start/end thật, tổng giây, SLA hit/miss, bottleneck, số vòng retry.
- docs/<vid>/eval.md (dùng .agents/skills/ray-video-10-phut/templates/eval.md) + 2–3 việc cho lần sau,
  trong đó liệt kê các script skill nhắc mà repo không có (preflight.py, tone-probe.py, gen-voice-vc.py).
- Ghi rõ: tự nhiên của giọng chưa kiểm bằng tai người (nếu chưa).
- Không đăng mạng xã hội. Không hỏi tôi duyệt giữa chừng trừ thiếu input bắt buộc.
