# Task Review — cuoc-goi-nho-cua-me (E-approved, voice sẵn)

Ngày: 2026-10-14. video_id: `cuoc-goi-nho-cua-me`. Trạng thái: E-approved → đủ điều kiện chia task cho 1 main + 3 scene agents.

## 1. Tools check

| Tool | Trạng thái |
|---|---|
| edge-tts / voice clone | **KHÔNG CẦN** — voice đã có sẵn, chốt clone Thanh Long (8 clip `public/audio/cuoc-goi-nho-cua-me/s1–s8.mp3`, CER 8/8 PASS ≤ 0.030, xem `voice-report.md`). Không agent nào được re-gen voice. Voice QA listening vẫn ⏳ PENDING → người duyệt tai trước khi lock (đặc biệt đầu câu s5). |
| Remotion / tsc | ok (tsc 5.9.3 trong workspace; mẫu `src/gaplai/` build được) |
| ffprobe / ffmpeg | ok (9.0.1; durations voice-report đã đo bằng ffprobe) |
| Font Plus Jakarta Sans | ⚠️ **THIẾU** — `public/fonts/` chỉ có BeVietnamPro/Inter/DMSerif/Lora, chưa có `PlusJakartaSans-Bold-VN.woff2` + Latin (design-spec §3 yêu cầu copy pattern GapFonts, unicode-range VN, KHÔNG CDN). **Main agent phải lấy font OFL về trước khi build** (gate chặn). |

## 2. File ownership

| File mới | Owner | Ghi chú |
|---|---|---|
| `src/cuocgoinho/kit.tsx` | **main** | 12 kit: PhoneFrame (4 trạng thái + nhãn "minh hoạ" ≥30px) / ChatBubble / DeskSet / MealTable / NightWindow (KHÔNG trăng) / WarmGlow (`level` 0→1) / MomBust / ChildBust (mắt cong cùng ngôn ngữ, bob ±4px) / StreetLamp / TwoRoomsCall + VoiceWave / SoloTable + CcCaps/CcLine + CgnFonts (Plus Jakarta Sans local) |
| `src/cuocgoinho/timeline.ts` | **main** | `CGN_SHOTS` + `CGN_TOTAL` + `CGN_SFX` + `CGN_VOICE_OFFSET = 4` (copy công thức gaplai `timeline.ts`) |
| `src/cuocgoinho/Reel.tsx` | **main** | Copy cấu trúc `src/gaplai/Reel.tsx`: Sequences scenes + voice Audio + BGM envelope + SFX Sequences; audio tích hợp bởi main (scene agents KHÔNG chạm audio) |
| `src/Root.tsx` | **main** | Thêm `Composition id="CuocGoiNhoReel"` (chưa tồn tại — đã xác minh) |
| `docs/cuoc-goi-nho-cua-me/voice.json` | read-only | Verbatim, mọi agent chỉ đọc; caption KHÔNG thêm/bớt chữ |
| `src/cuocgoinho/scenesA.tsx` (s1–s3) | **scene-agent-1** | Nửa lạnh: hook + bấm tắt + chat/montage |
| `src/cuocgoinho/scenesB.tsx` (s4–s6) | **scene-agent-2** | Bản lề ngày→tối + bắt máy + mẹ cười |
| `src/cuocgoinho/scenesC.tsx` (s7–s8) | **scene-agent-3** | TwoRoomsCall + chốt callback |

Quy tắc chung: cấm `Date.now()`/`Math.random()` (seed cố định); phone generic không logo Zalo/Messenger; nhãn panel chỉ `Con`/`Mẹ`; mâm 2 bát trung tính CHỈ phía mẹ; mẹ không bao giờ ở khung văn phòng lạnh.

## 3. Shot assignments

### scene-agent-1 — scenesA.tsx (s1–s3, nhịp gấp, palette ngày lạnh)

Inputs: `script.md` s1–s3 + `voice.json` s1–s3 + `design-spec.md` §2 (DAY_BG `#E8EEF2`, DESK `#C9D6DF`, INK `#1E2A33`, COLD `#4A90B8`, MISS `#E5484D`, PHONE_SCREEN `#FFFFFF`, MUTED `#8A94A0`, CHAT_OUT `#4A90B8`, CHAT_IN `#DCE6EC`) + §4 (CcCaps: đáy 250px, font 58px/1.32, chữ INK viền trắng mềm, accent `#2E6E94` bản đậm cho đủ contrast, pill trắng s1, fade 9f/7f rise 16→0px) + §5 mock UI (a)/(b) + §6 PhoneFrame/ChatBubble/DeskSet + motion token活力大胆 (~18f, bezier(0.16,1,0.3,1), overshoot 1.08 chỉ badge/pop, hold 0.3s).

- **s1 HOOK (dur 114f):** PhoneFrame trạng thái (a) "Cuộc gọi nhỡ — Mẹ" + timestamp chữ `Chiều nay` (KHÔNG giờ cụ thể) + icon ống nghe úp + mũi tên trượt (tuyệt đối không tick) + badge đỏ pop + rung translateX ±8px 3 nhịp, nền văn phòng sáng lạnh. Caption 2 parts, accent `Mẹ gọi` / `gọi lại`. Hold hook +15f.
- **s2 (dur 91f):** Tay bấm tắt cuộc gọi (DeskSet + laptop + tin nhắn slide-in 18f), cắt nhanh. Caption 2 parts, accent `bấm tắt`.
- **s3 (dur 157f):** ChatBubble "Lát con gọi lại nha." pop 18f → montage 3 beat (~1.2s/beat, wipe trái): họp / gõ trả lời / checklist. Caption 2–3 parts, accent `Lát con gọi lại nha` / `họp`.

Still-frame checks (agent-1): timestamp là chữ `Chiều nay`; badge là ống nghe+mũi tên (không tick); nhãn "minh hoạ" ≥30px góc trên-trái mọi phone; glyph Việt `ơ ư đ á à ả ã ạ ă â ê ô`; caption đáy đúng 250px + vạch safe 210px; không logo app gọi nào.

### scene-agent-2 — scenesB.tsx (s4–s6, bản lề + ấm lên)

Inputs: `script.md` s4–s6 + `voice.json` s4–s6 + `design-spec.md` §2 chuyển tiếp (gradient `DAY_BG #E8EEF2` → `#6B5A4E` → `NIGHT_BG #2B2320`) + palette tối ấm (NIGHT_BG `#2B2320`, ROOM_CHILD `#232B34`, NIGHT_DEEP `#1D1714`, AMBER `#F2A65A`, CREAM `#FAF3E8`, WOOD `#5A4230`, SKIN `#E9BE9C`, HAIR_MOM `#4A3A30` điểm bạc `#C9BBA8`, HAIR_CHILD `#23282E`, SWEATER_MOM `#8A5A6B`, SHIRT_CHILD `#3E5A78`) + §4 (nền tối chữ CREAM + `textShadow 0 2px 18px rgba(0,0,0,.78)`, accent AMBER) + motion (s4 dissolve 20f; s5 preset亲和友好 ~26f + glow 0→0.5; s6平静关怀 push-in 1→1.04, hold ≥0.6s).

- **s4 (dur 105f):** Trời tối dần, mở điện thoại — gọi nhỡ ban chiều hiện lại (PhoneFrame trạng thái (a), màn đêm `#171310` chữ kem), dissolve ngày→tối 20f, nhịp chậm lại. Caption 2 parts, accent `mới nhớ` / `lời hẹn lúc chiều`.
- **s5 BẢN LỀ (dur 142f):** Beat 1 ChildBust dưới StreetLamp đêm + PhoneFrame (c) "Đang gọi — Mẹ" + timer + sóng âm (màn đêm, KHÔNG sub-rect xanh) → beat 2 MomBust bắt máy, WarmGlow 0→0.5, chuông dừng (riser→im lặng, không slam), dải VoiceWave nối hai beat. Cú nhấn duy nhất. Caption 2–3 parts, accent `rất nhanh` + `Con ăn cơm chưa?`.
- **s6 (dur 141f):** MomBust ở phòng mình áp phone, mỉm cười hiền mắt cong mood `soft`, đèn vàng ấm, push-in 1→1.04, hold ≥0.6s. Caption 2 parts, accent `nghe giọng mình một chút thôi`.

Still-frame checks (agent-2): gradient chuyển tiếp đúng 3 stop; s5 beat 2 glow tràn rõ vs beat 1; phone (c) nền đêm chữ kem, không rect xanh; mắt mẹ + con cùng ngôn ngữ đường cong (không chấm tròn); không marker giới tính người kể ngoài tạo hình chốt; caption đêm có textShadow (SVG tĩnh không thể hiện — tự gắn đủ).

### scene-agent-3 — scenesC.tsx (s7–s8, TwoRoomsCall + outro)

Inputs: `script.md` s7–s8 + `voice.json` s7–s8 + `design-spec.md` §6 TwoRoomsCall/MealTable/SoloTable/NightWindow/WarmGlow/MomBust/ChildBust/VoiceWave + §7 (push-in 1→1.05, steam loop seed cố định, s8 tĩnh + hold cuối) + motion平静关怀 (ease-in-out đối xứng, overshoot ≤0.04, hold ≥0.6s, outro +30f).

- **s7 (dur 193f):** TwoRoomsCall — panel `Con` (tường lạnh ROOM_CHILD, ChildBust áp phone, SoloTable 1 bát) + panel `Mẹ` (tường ấm NIGHT_BG, MomBust áp phone, MealTable 2 bát + hơi nóng) + VoiceWave hổ phách nối giữa + phone cầu nối hiện "Đang gọi — Mẹ" + timer; NightWindow mưa chéo (không trăng) dùng được cả hai panel; push-in 1→1.05. Caption 3 parts, accent `chuyện nhỏ xíu`.
- **s8 CHỐT (dur 264f):** Giữ nguyên TwoRoomsCall; phone cầu nối chuyển "Đã gọi lại ✓" tick hổ phách (KHÔNG hiện "Đang gọi" — voice đã *"Cúp máy rồi"*); tĩnh gần như tuyệt đối + hold lặng cuối +30f. Caption 2–3 parts, accent `Một cuộc gọi lại thôi`.

Still-frame checks (agent-3): hai panel bo góc riêng, tường lạnh vs ấm phân biệt; mâm 2 bát CHỈ phía mẹ, bàn nhỏ 1 bát phía con, không ngồi chung mâm; cả hai bust đều áp phone; phone cầu nối s8 là "Đã gọi lại ✓" (nhận ra cùng chiếc phone đầu video); nhãn "minh hoạ" ≥30px; không nhân vật thứ ba, không marker quê/phố.

## 4. Timeline holds (main, từ voice-report durations)

Base voice-report: s1 2.80 / s2 2.50 / s3 4.73 / s4 2.99 / s5 4.22 / s6 4.18 / s7 5.91 / s8 6.40, TOTAL voice 33.73s → 1162f (padding 0.5s/shot, cuối +1.4s). Holds bổ sung: **s1 +15f hook (0.5s), s8 +30f outro (1.0s)** → **TOTAL ~1207f ≈ 40.2s @30fps**.

| Shot | sec voice | duration (f) | from (f) |
|---|---|---|---|
| s1 | 2.80 | 114 (99+15 hook) | 0 |
| s2 | 2.50 | 91 | 114 |
| s3 | 4.73 | 157 | 205 |
| s4 | 2.99 | 105 | 362 |
| s5 | 4.22 | 142 | 467 |
| s6 | 4.18 | 141 | 609 |
| s7 | 5.91 | 193 | 750 |
| s8 | 6.40 | 264 (234+30 outro) | 943 |
| **TOTAL** | **33.73** | **1207f ≈ 40.2s** | — |

`CGN_VOICE_OFFSET = 4` (theo `GAP_VOICE_OFFSET`). Công thức duration copy gaplai `timeline.ts`: `ceil((sec + padding) * 30)`.

## 5. SFX map (main dựng trong Reel.tsx, offsets tương đối đầu shot)

Nguồn file: `public/audio/cuoc-goi-nho-cua-me/` (bgm.mp3 + 7 sfx, đã xác minh đủ 8 file; volumedetect max < 0 dB ✅). BGM envelope copy Reel gaplai (0 → 0.05 → 0.05 → 0). s4/s6/s7 cố ý để lặng, chỉ BGM.

| # | Shot+offset | File | Vol | durationInFrames | Vai trò |
|---|---|---|---|---|---|
| 1 | s1+5f | `sfx-missed-call.mp3` | 0.18 | 90 | chuông gọi nhỡ hook (file 5.0s, cắt đuôi tránh tràn — 5+90=95 < s1 114 ✅) |
| 2 | s2+8f | `sfx-hangup-tap.mp3` | 0.2 | — (1.04s tự nhiên) | tay bấm tắt |
| 3 | s3+5f | `sfx-chat-notif.mp3` | 0.18 | — (1.06s) | bong bóng chat hiện |
| 4 | s3+40f | `sfx-typing.mp3` | 0.16 | — (1.85s ≈ 56f; 40+56=96 < 157 ✅) | gõ trả lời / làm việc |
| 5 | s5+5f | `sfx-callback-ring.mp3` | 0.2 | — (0.69s) | tín hiệu gọi đi (ngắn = đúng truyện mẹ bắt máy nhanh; khác mẫu s1 ✅) |
| 6 | s5+45f | `sfx-pickup.mp3` | 0.2 | — (1.10s; 45+33=78 < 142 ✅) | mẹ bắt máy + glow ấm lên, chuông dừng |
| 7 | s8+120f | `sfx-warm-chime.mp3` | 0.16 | — (2.0s; 120+60=180 < 264 ✅) | shimmer ấm dưới câu chốt + màn hình "đã gọi lại" |

## 6. Composition naming

- Thư mục mới: `src/cuocgoinho/` (`kit.tsx`, `timeline.ts`, `scenesA.tsx`, `scenesB.tsx`, `scenesC.tsx`, `Reel.tsx`) — theo tiền lệ `src/gaplai/`.
- Export: `CuocGoiNhoReel` + `CGN_TOTAL` (+ `CGN_SHOTS`, `CGN_SFX`, `CGN_VOICE_OFFSET`).
- `src/Root.tsx`: thêm `Composition id="CuocGoiNhoReel" component={CuocGoiNhoReel} durationInFrames={CGN_TOTAL} fps={FPS} width={WIDTH} height={HEIGHT}`.
- Scene exports: `CgnS1…CgnS8` (map trong Reel: `{s1: CgnS1, …}`), fonts `CgnFonts`, caption `CcCaps`.

## 7. Feasibility / coverage + verdict

| Điểm | /2 | Lý do |
|---|---|---|
| Voice sẵn dùng được | 2/2 | 8 clip clone Thanh Long đủ, CER pass, durations ffprobe rõ; chỉ còn gate nghe tai (ngoài phạm vi agents) |
| Kit/design khả thi | 2/2 | 12 kit đều là shapes/text Remotion thuần (phone, chat, bust, two-panels, glow, steam, rain) — không asset ngoài; mẫu gaplai chứng minh cấu trúc khả thi |
| Audio/SFX map | 2/2 | 8/8 file tồn tại, volumes + offsets + duration cắt đuôi đều đã kiểm tra vừa khít shot mới |
| Timeline/coverage holds | 1.5/2 | Công thức + holds rõ (1207f); trừ 0.5 vì font Plus Jakarta Sans còn thiếu (gate main) + voice QA tai pending |
| Chia việc không chồng lấn | 2/2 | 4 owner disjoint (kit/timeline/Reel/Root + 3 cặp shot), audio chỉ main, voice.json read-only |

**TỔNG: 9.5/10 — verdict: PASS (đủ điều kiện spawn agents; main agent lấy font Plus Jakarta Sans OFL về `public/fonts/` + người duyệt tai 8 clip trước khi lock).**

---

## Vòng 2 (2026-10-14) — script v2 + voice Thanh Long v2 + kit đã có (giữ nguyên vòng 1, cập nhật số)

Vòng 1 giữ nguyên ở trên để đối chiếu. Vòng 2 chốt lại đầu vào mới và việc phải làm tiếp.

### 8. Đầu vào chốt vòng 2

- **script.md v2 (160 từ):** s1 giữ nguyên hook đã duyệt; s2–s8 viết mới (khung sự thật giữ: bấm tắt → nhắn hứa → quên → tối gọi lại → "Con ăn cơm chưa?" → chuyện nhỏ → chốt). Bỏ luật verbatim v1 cho s2–s8, nhưng `voice.json` v2 hiện tại là lock — caption KHÔNG thêm/bớt chữ voice.
- **voice-report.md v2 (Thanh Long clone, ffprobe):** s1 2.80 GIỮ (md5 `c1a36049…`, không clone lại) / s2 2.80 / s3 5.92 / s4 5.44 / s5 6.78 / s6 3.89 / s7 7.26 / s8 5.91 = **40.80s** (+7.1s vs vòng 1). CER 7/8 PASS ≤ 0.04; **s5 CER 0.046 ⚠ VƯỢT ngưỡng** (best/14 tries, nhầm ASR "reo→rèo", "Con→còn") → gate nghe tai bắt buộc, ưu tiên s5 ("reo hai tiếng", "Con ăn cơm chưa?"). Voice QA listening vẫn ⏳ PENDING.
- **design-spec.md (Be Vietnam Pro):** font duy nhất Be Vietnam Pro 600 local (`CcFonts` trong kit, OFL — **gate font Plus Jakarta Sans vòng 1 đã HỦY/khép**, không lấy font mới). Hệ thống 3 đỉnh: (a) s5 nín 0.5s + close-up mẹ + chuông dừng; (b) s6 WarmGlow MAX + push-in chậm nhất; (c) s8 caption tắt sớm + hold lặng ≥1.0s + outro 1.4s. `TwoRoomsCall` hai panel riêng (`Con` tường lạnh `ROOM_CHILD` / `Mẹ` tường ấm `NIGHT_BG`), phone cầu nối s7 "Đang gọi — Mẹ" → s8 "Đã gọi lại ✓" (fix C-5).
- **kit.tsx ĐÃ CÓ (main không làm lại):** `CcFonts` Be Vietnam Pro VN/LatinExt/Latin + `CcCaps`/`CcLine` exclusive (đáy 250px, pill trắng ngày / textShadow đêm, accent `COLD_DARK #2E6E94` ngày / `AMBER` đêm) + `PhoneFrame` (pill "minh hoạ" ≥30px) / `MissedBadge` (ống nghe+mũi tên, cấm tick) / `ChatBubble` / `WarmGlow(level)` / `VoiceWave` / `Bust` (mắt cong, mood down/calm/soft, bob ±4px) / `NightWindow` (clipped, mưa chéo, KHÔNG trăng) / `StreetLamp` / `MealTable` (có steam) / `SoloTable` (**không steam** — bát nguội). Scenes mới **DÙNG kit, cấm viết caption/phone/glow/bust riêng**.
- **timeline.ts HIỆN TẠI là CGN cũ 1206f (voice vòng 1) — SẼ UPDATE theo §9.** `Reel.tsx` + `Root.tsx` đã xong (`CuocGoiNhoReel` đã đăng ký, Sequences + voice Audio + BGM envelope + SFX Sequences) — main chỉ sửa số, không dựng lại cấu trúc.

### 9. Timeline mới (main update `timeline.ts`, công thức giữ nguyên)

Công thức (copy gaplai): `duration = ceil((sec + padding) * 30 − 1e-6) + hold`; padding 0.5s/shot, shot cuối 1.4s; holds chủ ý **s1 +15f hook, s8 +30f outro**; `CGN_VOICE_OFFSET = 4` giữ.

| Shot | sec voice v2 | duration (f) | from (f) | Ghi chú |
|---|---|---|---|---|
| s1 | 2.80 | 114 (99+15 hook) | 0 | hook giữ nguyên |
| s2 | 2.80 | 99 | 114 | voice dài hơn v1 (+8f) |
| s3 | 5.92 | 193 | 213 | montage 3 beat vừa (~1.5s/beat + chat) |
| s4 | 5.44 | 179 | 406 | dissolve 20f ngày→tối vẫn lọt |
| s5 | 6.78 | 219 | 585 | bản lề 2 beat + nín 0.5s (15f) lọt trong 219f |
| s6 | 3.89 | 132 | 804 | push-in chậm nhất + hold ≥0.6s (18f) lọt |
| s7 | 7.26 | 233 | 936 | TwoRoomsCall push-in 1→1.05 |
| s8 | 5.91 | 250 (220+30 outro) | 1169 | caption tắt sớm + hold lặng ≥1.0s + outro |
| **TOTAL** | **40.80** | **1419f ≈ 47.3s @30fps** | — | base 1374f + holds 45f |

Main sửa `raw` trong `timeline.ts` sang sec v2 trên; `CGN_TOTAL` tự ra 1419. `Reel.tsx`/`Root.tsx` không đổi (đọc `CGN_SHOTS`/`CGN_TOTAL` động).

### 10. Chia file giữ nguyên (disjoint, audio chỉ main)

| File | Owner | Việc vòng 2 |
|---|---|---|
| `src/cuocgoinho/kit.tsx` | **main — XONG, không đụng** | đã đủ 14 exports; scenes import, cấm fork |
| `src/cuocgoinho/timeline.ts` | **main — UPDATE số** | thay sec v2 + giữ holds/CGN_SFX (§12) |
| `src/cuocgoinho/Reel.tsx` | **main — GIỮ** | cấu trúc đã đúng; chỉ hưởng from/duration mới |
| `src/Root.tsx` | **main — GIỮ** | `CuocGoiNhoReel` đã đăng ký; không thêm Composition |
| `docs/cuoc-goi-nho-cua-me/voice.json` | read-only | v2 lock; mọi agent chỉ đọc, caption không thêm/bớt chữ |
| `src/cuocgoinho/scenesA.tsx` (s1–s3) | **scene-agent-1** | viết lại theo §11A (dur 114/99/193) |
| `src/cuocgoinho/scenesB.tsx` (s4–s6) | **scene-agent-2** | viết lại theo §11B (dur 179/219/132) |
| `src/cuocgoinho/scenesC.tsx` (s7–s8) | **scene-agent-3** | viết lại theo §11C (dur 233/250) |

Quy tắc giữ: cấm `Date.now()`/`Math.random()` (seed cố định); phone generic không logo; nhãn panel chỉ `Con`/`Mẹ`; mâm 2 bát CHỈ phía mẹ; mẹ không vào khung lạnh; timestamp `Chiều nay` (không giờ cụ thể); `CcCaps` exclusive từ kit.

### 11. Checklist build (scene agents)

**11A — scenesA (s1–s3, ngày lạnh, gấp):**
- s1 (114f): PhoneFrame (a) "Cuộc gọi nhỡ — Mẹ" + `Chiều nay` + MissedBadge (ống nghe+mũi tên, cấm tick) + rung ±8px 3 nhịp + badge pop 18f; pill "minh hoạ" ≥30px; `CcCaps` dark 2 parts, accent `Mẹ gọi` / `gọi lại`.
- **s2 (99f): CLOSE-UP ngón tay POV chạm nút tắt** (đối xứng tay bấm gọi s5 — gieo tương phản "chính ngón tay ban chiều"); DeskSet + tin nhắn slide-in 18f; hard-cut; caption accent `họp dở` / `bấm tắt vội`.
- s3 (193f): ChatBubble "Lát con gọi lại nha." pop 18f → montage 3 beat (họp / gõ / checklist, wipe trái, ~1.5s/beat nhờ voice dài hơn); caption accent `Lát con gọi lại nha.` / `quên bẵng`.

**11B — scenesB (s4–s6, bản lề ngày→tối):**
- s4 (179f): phòng tối đèn tắt → màn hình phone sáng giữa bóng tối, gọi nhỡ ban chiều hiện lại; dissolve 20f `DAY_BG → #6B5A4E → NIGHT_BG`; caption accent `vẫn nằm đó` / `chột dạ`.
- **s5 (219f) 2 BEAT + NÍN NHỊP: beat 1 ChildBust dưới StreetLamp + PhoneFrame (c) "Đang gọi — Mẹ" + timer + VoiceWave (màn đêm `#171310` chữ kem, cấm sub-rect xanh, WarmGlow ~0.25); beat 2 CLOSE-UP MomBust áp phone, WarmGlow →0.5, chuông dừng (riser→im lặng, cấm slam); dải VoiceWave nối hai beat; tay bấm gọi đối xứng s2; caption 3 parts, accent `chính ngón tay ban chiều bấm tắt` + `Con ăn cơm chưa?`; nhịp voice có nín ~0.5s sau "hai tiếng" — visual giữ beat 2 trong lúc nín.**
- **s6 (132f) WarmGlow MAX 1.0:** MomBust mood `soft` áp phone, đèn vàng ấm MẠNH NHẤT video, push-in 1→1.04 chậm nhất + hold ≥18f; caption accent `nghe giọng mình một chút thôi`.

**11C — scenesC (s7–s8, TwoRoomsCall + chốt):**
- s7 (233f): TwoRoomsCall — panel `Con` (`ROOM_CHILD`, ChildBust áp phone, SoloTable 1 bát nguội KHÔNG steam, NightWindow mưa) + panel `Mẹ` (`NIGHT_BG`, MomBust áp phone, MealTable 2 bát + steam) + VoiceWave hổ phách giữa + phone cầu nối "Đang gọi — Mẹ" + timer; push-in 1→1.05; WarmGlow 0.6; caption accent `cơm đã nguội` / `mưa vẫn gõ nhẹ` / `nhỏ xíu`.
- **s8 (250f): giữ TwoRoomsCall; phone cầu nối chuyển "Đã gọi lại ✓" tick hổ phách (KHÔNG "Đang gọi" — voice đã "Cúp máy rồi"); WarmGlow 0.4; CAPTION TẮT SỚM nhường HOLD LẶNG ≥1.0s + outro +30f; tĩnh gần như tuyệt đối; caption accent `Một cuộc gọi lại thôi`.**

### 12. SFX map (giữ 7 cues, offsets tương đối đầu shot theo from mới)

BGM envelope giữ (0 → 0.05 → 0.05 → 0); s4/s6/s7 cố ý lặng, chỉ BGM. Tuyệt đối (`from` mới + offset):

| # | Shot+offset | Tuyệt đối (f) | File | Fit check (dur mới) |
|---|---|---|---|---|
| 1 | s1+5f (dur 90) | 5 | `sfx-missed-call.mp3` 0.18 | 5+90=95 < 114 ✅ |
| 2 | s2+8f | 122 | `sfx-hangup-tap.mp3` 0.2 | tự nhiên 1.04s < 99 ✅ |
| 3 | s3+5f | 218 | `sfx-chat-notif.mp3` 0.18 | 1.06s < 193 ✅ |
| 4 | s3+40f | 253 | `sfx-typing.mp3` 0.16 (56f) | 40+56=96 < 193 ✅ |
| 5 | s5+5f | 590 | `sfx-callback-ring.mp3` 0.2 | 0.69s ✅ (khác mẫu s1, đúng truyện bắt máy nhanh) |
| 6 | s5+45f | 630 | `sfx-pickup.mp3` 0.2 (33f) | 45+33=78 < 219 ✅ (glow →0.5 + chuông dừng) |
| 7 | s8+120f | 1289 | `sfx-warm-chime.mp3` 0.16 (60f) | 120+60=180 < 250 ✅ |

`CGN_SFX` trong timeline.ts giữ nguyên offset/src/vol (from mới tự kéo tuyệt đối theo) — main không cần đổi số SFX.

### 13. Feasibility / coverage + verdict vòng 2

| Điểm | /2 | Lý do |
|---|---|---|
| Voice v2 sẵn dùng được | 1.5/2 | 8 clip Thanh Long đủ, TOTAL 40.80s rõ; trừ 0.5 vì s5 CER 0.046 ⚠ + QA tai 7 clip mới PENDING (ngoài phạm vi agents) |
| Kit/design khả thi | 2/2 | kit 14 exports đã có + Be Vietnam Pro local (gate font vòng 1 khép); TwoRoomsCall/3 đỉnh/contrast đã chốt trong design-spec |
| Audio/SFX map | 2/2 | 7 cues giữ nguyên, fit-check lại toàn bộ với dur mới (bảng §12) ✅ |
| Timeline/coverage holds | 2/2 | công thức + holds giữ (1419f ≈ 47.3s); Reel/Root đọc động, main chỉ thay số |
| Chia việc không chồng lấn | 2/2 | kit/Reel/Root giữ + 3 cặp shot disjoint; audio chỉ main; voice.json read-only; CcCaps exclusive cấm fork |

**TỔNG VÒNG 2: 9.5/10 — verdict: PASS (đủ điều kiện build: main update `timeline.ts` sang sec v2 → TOTAL 1419f; 3 scene agents viết lại scenesA/B/C theo §11 với dur mới; người duyệt tai 7 clip s2–s8, ưu tiên s5, trước khi lock).**
