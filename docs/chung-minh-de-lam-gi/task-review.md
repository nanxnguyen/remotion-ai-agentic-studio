# Task review — chung-minh-de-lam-gi

## Round 1 (task-reviewer)

- **path**: `docs/chung-minh-de-lam-gi/task-review.md`
- **video**: `chung-minh-de-lam-gi` · comp `ChungMinhDeLamGiReel` · profile `story` · 15 keys / 12 shot-beats · **1668f (55.60s) @30fps, 1080×1920**
- **score**: **9/10**
- **verdict**: **ĐẤT — sẵn sàng Gate B (scaffold Round 1)**. 0 Cao/Trung mở. 3 Thấp theo dõi, sửa trước Gate C.

---

## 1. Xác thực công cụ đầu-đầu (tất cả xanh)

| Công cụ | Kết quả |
|---|---|
| ffmpeg | `/opt/homebrew/bin/ffmpeg` ✓ |
| ffprobe | `/opt/homebrew/bin/ffprobe` ✓ |
| npx | node v22.22.3 / npm 10.9.8 ✓ |
| `npx tsc --noEmit` | exit 0, sạch toàn repo (bao gồm `src/videos/chung-minh-de-lam-gi/*`) ✓ |

---

## 2. Thiết kế & khung

- Manifest `index.ts`: `id: 'ChungMinhDeLamGiReel'`, `durationInFrames: CMD_TOTAL`, fps 30, 1080×1920, `testFrames: [0, 1000, 1667]` (frame 0 + ran ranh giới) ✓
- `timeline.ts`: `CMD_TOTAL = 1668`, 15 keys (`s1`…`s11`; `s2/s4/s7/s9` tách a/b), `voiceOffset: 0` mọi đoạn, khoảng khứa khóa theo `join-notes.md` ✓
- Khung lấy giá trị từ khung (`Reel.tsx` header khẳng định: không `Date.now`/`Math.random`) ✓
- Tên comp duy nhất trong `src/` (một ứng viên, chưa đăng ký catalog — xem T1) ✓

---

## 3. Bảng quyền sở hữu (một file — một chủ nhân; KHÔNG hai công việc một file)

| File | Chủ sở hữu | Vai trò |
|---|---|---|
| `src/videos/chung-minh-de-lam-gi/index.ts` | director | manifest (`defineVideo`) |
| `src/videos/chung-minh-de-lam-gi/timeline.ts` | director |Timeline: 15 đoạn, CMD_SFX (7 cue), CMD_BGM_KEYS |
| `src/videos/chung-minh-de-lam-gi/kit.tsx` | director | palette tokens, `db2lin`, `CLAMP` (share scènes + Reel) |
| `src/videos/chung-minh-de-lam-gi/Reel.tsx` | director | composition, dây âm thanh (BGM/SFX/voice) |
| `src/videos/chung-minh-de-lam-gi/workbench.ts` | director | workbench manifest (từ `timeline.ts`) |
| `src/videos/registry.ts` + `src/Root.tsx` | director | catalog duy nhất; `Root` chỉ **đọc** registry, không đăng ký trực tiếp |
| `docs/chung-minh-de-lam-gi/voice.json` | director (độc quyền, khóa byte) | 15 khóa |
| `src/videos/chung-minh-de-lam-gi/scenes/ScenesA.tsx` | scene-agent A | s1 (scaffold stub, thay thế sau B) |
| `src/videos/chung-minh-de-lam-gi/scenes/ScenesB.tsx` | scene-agent B | s2a, s2b |
| `src/videos/chung-minh-de-lam-gi/scenes/ScenesC.tsx` | scene-agent C | s3, s4a, s4b |
| `src/videos/chung-minh-de-lam-gi/scenes/ScenesD.tsx` | scene-agent D | s5, s6, s7a |
| `src/videos/chung-minh-de-lam-gi/scenes/ScenesE.tsx` | scene-agent E | s7b, s8, s9a |
| `src/videos/chung-minh-de-lam-gi/scenes/ScenesF.tsx` | scene-agent F | s9b, s10, s11 |

---

## 4. Tệp 장면 (scaffold Round 1)

Mỗi `Scenes*.tsx` header đã ghi: chủ nhân, ID đoạn, "scaffold (scene-agent X replaces after gate B)". Nội dung hiện tại: `AbsoluteFill {background: '#060606'}` (khung đen) — đúng quy tắc early-scaffold (chỉ layout, không caption/âm thanh chi tiết trước B).

| File | Đoạn | Đầu vào (scaffold) | Đầu ra (scaffold) | Kiểm tra tĩnh |
|---|---|---|---|---|
| ScenesA | s1 | — (stub) | khung đen `#060606` | comp-level: frame0 + ran ranh giới qua `testFrames [0, 1000, 1667]` ✓ |
| ScenesB | s2a, s2b | — | khung đen | idem |
| ScenesC | s3, s4a, s4b | — | khung đen | idem |
| ScenesD | s5, s6, s7a | — | khung đen | idem |
| ScenesE | s7b, s8, s9a | — | khung đen | idem |
| ScenesF | s9b, s10, s11 | — | khung đen | idem |

Lưu ý: kiểm tra tĩnh 3/shot (đầu/giữa/cuối đoạn) do scene-agent A–F định nghĩa sau Gate B; frame 0 + ran ranh giới đã xanh qua `testFrames` của comp.

---

## 5. Tài nguyên âm thanh & font

| Tài nguyên | Trạng thái |
|---|---|
| Voice 15 clip (`s1.mp3`…`s11.mp3` + biến thể) | `public/audio/chung-minh-de-lam-gi/` đủ 15 ✓, khớp `voice.json` 15 khóa ✓ |
| BGM | `bgm.mp3` (65.43s, có_margin) ✓ |
| SFX | 6 tệp tồn tại (`sfx-ting`, `sfx-tap-a`, `sfx-tap-b`, `sfx-applause`, `sfx-drip-b`, `sfx-drip-a`); `CMD_SFX` tham chiếu 5 tệp ún / 7 cue ✓ |
| Font VN subset | `Lexend-Bold-VN.woff2` (headline), `BeVietnamPro-SemiBold-VN.woff2` (caption/chip) ✓ theo `design-spec.md` §3 |

---

## 6. Thứ tự tích hợp (scaffold trước, chi tiết sau B)

- **Đầu tiên (scaffold, đã xong)**: 6 stub scènes + `timeline`/`kit`/`Reel`/`workbench`; âm thanh đã nối trong `Reel.tsx` (`CMD_BGM_KEYS` piecewise, `CMD_SFX` cues, voice tại `from + voiceOffset`).
- **Sau Gate B (final-detail pass, scene-agent A–F)**: captions, chip windows (s6 0.3–3.6s / s8 0.3–3.8s / s10 Tuổi Trẻ), SFX sync theo `CMD_SFX`, chỉnh khung BGM chi tiết. Không động caption/âm thanh chi tiết trước B.

---

## 7. E1–E4 (đã gom vào review, số chính xác)

| Vấn đề | Trạng thái Round 1 |
|---|---|
| E1 build scaffold | `index`/`timeline`/`kit`/`Reel`/`workbench` + 6 scènes stub tồn tại, `tsc` sạch. Còn lại: đăng ký comp vào `registry.ts` → **T1 (Thấp)** |
| E2 design-spec §8 → 1668f | Snippet Root trong spec vẫn cứng `durationInFrames: 1587` / `testFrames [0, 800, 1586]` — cần sửa thành **1668f / [0, 1000, 1667]** → **T2 (Thấp)** |
| E3 join-notes ↔ timeline | Bảng `join-notes.md` == `timeline.ts` byte-đến-byte (15 khóa, `from`/`dur`, kết thúc 1668f) ✓ nhất quán |
| E4 re-hook drift | Chênh lệch s5 (21.94s thực tế vs 19.8s @4.1 audio/s) đã ghi là rủi ro chấp nhận; `55.60s ≤ nắp 59.5s` ✓ |

---

## 8. Thực thi trước hết & kiểm thử

- `npm run verify` = lint + format:check + typecheck + assets:validate + test + test:python + test:publisher (+ `npm run test:visual` diff golden). Baseline golden cho comp này thiết lập tại Gate C.
- Không MP4, không bí mật trong Git (`git status`: chỉ `src/videos/chung-minh-de-lam-gi/` mới theo dõi; `.git-ignore` khóa `.env*`) ✓

---

## 9. Giới hạn AGENTS.md (đã tuân thủ)

- Catalog duy nhất = `registry.ts` (không đăng ký trực tiếp trong `Root.tsx`) ✓
- Hoạt ảnh từ khung Remotion, không wall-clock / random không hạt ✓
- Không bí mật / Media render trong Git ✓

---

## 10. Nhận xét (tối đa 3 Thấp; 0 Cao/Trung)

| Mã | Mức | Nội dung | Xử lý |
|---|---|---|---|
| T1 | Thấp | `registry.ts` chưa `import` / đăng ký `chungMinhDeLamGiVideo` (Root chỉ đọc registry) — Studio chưa hiển thị comp | Director thêm 1 import + 1 mục vào marker `// video:new entries` trước khi demo B |
| T2 | Thấp | `design-spec.md` §8 snippet Root ghi 1587f / `[0, 800, 1586]` vs thực tế 1668f / `[0, 1000, 1667]` | Đồng bộ snippet spec |
| T3 | Thấp | SFX tồn tại 6 tệp (không phải 7), `CMD_SFX` dùng 5; `sfx-drip-a.mp3` không được tham chiếu | Xác nhận giữ hay xóa tệp |

**Kết luận Round 1**: score **9/10**, verdict **ĐẤT**, 0 Cao/Trung mở → Gate B có thể mở. 3 Thấp (T1–T3) không chặn B, bắt buộc sửa trước Gate C.
