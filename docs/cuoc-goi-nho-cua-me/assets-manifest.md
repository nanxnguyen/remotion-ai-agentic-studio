# Assets manifest — cuoc-goi-nho-cua-me (audio: BGM + SFX)

Ngày chọn: 2026-10-14. Tone brief: hai nhịp — đầu nhanh/gấp (văn phòng sáng lạnh) → sau ấm/chậm từ mẹ bắt máy tới hết (docs/cuoc-goi-nho-cua-me/brief.md).
File đích trong `public/audio/cuoc-goi-nho-cua-me/` (disjoint với `sN.mp3` của voice-agent — audio-agent chỉ dùng `bgm.mp3` + `sfx-*.mp3`).
SFX giữ volume 0.16–0.2 (không át giọng); BGM theo envelope Reel sẵn có (0 → 0.05 → 0.05 → 0, như tiền lệ gaplai).
Offsets tương đối đầu shot (main agent quy ra `SHOTS.<shot>.from + offset` khi dựng timeline, không钉 tuyệt đối).

## BGM (1)

| File đích (`public/audio/cuoc-goi-nho-cua-me/`) | File gốc trong kho | Mixkit原曲名 / artist / style / BPM | URL | License |
|---|---|---|---|---|
| `bgm.mp3` | `skills/video-shotcraft/assets/audio/bgm/g-eazy-nba-type.mp3` | G Eazy NBA type · Arulo · Hip Hop ~86 | https://assets.mixkit.co/music/403/403.mp3 | Mixkit Stock Music Free License (free thương mại, miễn署名) |

Lý do chọn: nói thẳng — kho BGM chỉ có 5 track energetic (tech-house/house/hip-hop), không có ambient/piano nhẹ nào hợp arc "ngày nhẹ → tối ấm".
Chọn track ít sai nhất theo đúng tiêu chí đã kiểm chứng ở gaplai: chậm nhất kho (86 BPM), êm nhất (mean −16.7 dB ≈ ngang giọng kể nên ở volume 0.05 chìm hẳn dưới giọng),
tối nhất (treble >5kHz thấp, không chói). Nửa đầu nhịp cắt nhanh của hình sẽ gánh năng lượng thay BGM; nửa sau BGM chìm làm nền ấm.
Loại: `house-vibez` (123 BPM quá tươi), `tonight-hiphop` (mean −6.9 dB quá đặc, át giọng), `cat-walk`/`bgm-tech-house` (nhanh, sai mood gia đình).
Thực đo file đích: duration 104.31s, mean −16.7 dB, max −1.4 dB.

## SFX (7, copy từ `skills/video-shotcraft/assets/audio/sfx/` → `public/audio/cuoc-goi-nho-cua-me/`)

| File đích | File gốc | Mixkit原名 | URL | License | Vai trò / offset (tương đối đầu shot) |
|---|---|---|---|---|---|
| `sfx-missed-call.mp3` | `sfx/counter/countdown-bleeps.mp3` | Clock countdown bleeps | https://assets.mixkit.co/active_storage/sfx/916/916-preview.mp3 | Mixkit SFX Free | s1+5f, vol 0.18 — chuông cuộc gọi nhỡ trên màn hình hook (5.0s, max −3.2 dB; kho không có phone-ring thật, đây là mẫu bleeps lặp gần nhất; s1 chỉ ~3.5s nên main agent cho `durationInFrames` ~90f để cắt đuôi, tránh tràn sang s2) |
| `sfx-hangup-tap.mp3` | `sfx/ui/switch-click-quick.mp3` | Quick switch click | https://assets.mixkit.co/active_storage/sfx/2582/2582-preview.mp3 | Mixkit SFX Free | s2+8f, vol 0.2 — tay bấm tắt cuộc gọi,拟音 công tắc thật hạng ✅ (1.04s, max −0.0 dB; cố ý khác `switch-tap` gaplai đã dùng để tránh lẫn file) |
| `sfx-chat-notif.mp3` | `sfx/ui/ui-message-pop.mp3` | Message pop alert | https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3 | Mixkit SFX Free | s3+5f, vol 0.18 — bong bóng chat "Lát con gọi lại nha." hiện lên (1.06s, max −3.2 dB; mẫu này thuộc nhóm synth-notif nhưng ở đây đúng nghĩa "hệ thống đang nói" nên là ngoại lệ có chủ ý theo sound-design §3.3) |
| `sfx-typing.mp3` | `sfx/text/typewriter-digital.mp3` | Digital typewriter | https://assets.mixkit.co/active_storage/sfx/1363/1363-preview.mp3 | Mixkit SFX Free | s3+40f, vol 0.16 — gõ trả lời tin nhắn / làm nốt việc (1.85s, max −5.1 dB; chọn mẫu ngắn này thay `keyboard.mp3` 19.6s để khỏi phải cắt Sequence dài) |
| `sfx-callback-ring.mp3` | `sfx/scifi/hitech-bleep.mp3` | High tech bleep | https://assets.mixkit.co/active_storage/sfx/2521/2521-preview.mp3 | Mixkit SFX Free | s5+5f, vol 0.2 — tín hiệu gọi đi khi màn hình "đang gọi — Mẹ" (0.69s, max −5.1 dB; mẹ bắt máy rất nhanh nên chuông ngắn là đúng truyện; cố ý khác mẫu `countdown-bleeps` của s1 để hai cuộc gọi không cùng một tiếng) |
| `sfx-pickup.mp3` | `sfx/ui/ui-select-click.mp3` | Select click | https://assets.mixkit.co/active_storage/sfx/1109/1109-preview.mp3 | Mixkit SFX Free | s5+45f, vol 0.2 — mẹ bắt máy: click nối máy + ánh sáng ấm lên, chuông dừng (1.10s, max −4.0 dB; click sạch hạng ⚠️ đã nghe trong ngữ cảnh nối máy thì ổn) |
| `sfx-warm-chime.mp3` | `sfx/ui/chime-crystal.mp3` | Crystal chime | https://assets.mixkit.co/active_storage/sfx/3108/3108-preview.mp3 | Mixkit SFX Free | s8+120f, vol 0.16 — shimmer ấm dưới câu chốt "Một cuộc gọi lại thôi…" + màn hình "đã gọi lại" (2.0s, max −2.6 dB; cố ý khác `sparkle-touch`/`light-aura` gaplai đã dùng) |

Ghi chú:
- s4 (nhớ lời hẹn), s6 (nghe giọng mẹ), s7 (chuyện nhỏ bên mâm cơm) cố ý để lặng, chỉ BGM nền — mood thủ thỉ không chịu thêm SFX.
- Không chạm `s1.mp3`/`s2.mp3` của voice-agent, timeline, scenes. Không commit, không chạy pipeline.

## volumedetect (file đích, ffmpeg, 2026-10-14)

| File | Duration | mean_volume | max_volume | Kết luận |
|---|---|---|---|---|
| `bgm.mp3` | 104.31s | −16.7 dB | −1.4 dB | max < 0 dB ✅ |
| `sfx-missed-call.mp3` | 5.00s | −14.7 dB | −3.2 dB | max < 0 dB ✅ |
| `sfx-hangup-tap.mp3` | 1.04s | −23.0 dB | −0.0 dB | max < 0 dB ✅ (peak native sát 0 nhưng chưa clip; vol 0.2 trong mix ≈ −14 dB) |
| `sfx-chat-notif.mp3` | 1.06s | −31.7 dB | −3.2 dB | max < 0 dB ✅ |
| `sfx-typing.mp3` | 1.85s | −25.9 dB | −5.1 dB | max < 0 dB ✅ |
| `sfx-callback-ring.mp3` | 0.69s | −16.5 dB | −5.1 dB | max < 0 dB ✅ |
| `sfx-pickup.mp3` | 1.10s | −23.2 dB | −4.0 dB | max < 0 dB ✅ |
| `sfx-warm-chime.mp3` | 2.00s | −22.5 dB | −2.6 dB | max < 0 dB ✅ |
