# Hướng dẫn Tạo Video Stickman với Stickman Director Kit

Tài liệu này hướng dẫn quy trình đầy đủ để tạo một video ngắn 9:16 (YouTube Shorts / TikTok / Reels) bằng bộ công cụ **Stickman Video Director** đã được tích hợp vào dự án Remotion.

---

## 1. Kiến trúc đã tích hợp

Hệ thống gồm 3 lớp phối hợp chặt chẽ:

1. **Lớp đồ họa & chuyển động Remotion (`src/animation/`):**
   - [`src/animation/stickman-director.ts`](../src/animation/stickman-director.ts): Chứa toán học nội suy keyframe (`interpolateKeyState`), nét vẽ tay động (`revealedPolylinePoints`, `underlinePoints`, `arcArrowPoints`), 8 tư thế nhân vật (`directorPose`), 6 bộ style (`DIRECTOR_STYLES`) và vùng an toàn 9:16 (`PORTRAIT_SAFE_AREA`).
   - [`src/animation/StickmanDirectorKit.tsx`](../src/animation/StickmanDirectorKit.tsx): Các React/Remotion component dựng sẵn (`<DirectorStage />`, `<DirectorCharacter />`, `<KineticStroke />`, `<DirectorCaption />`).
2. **Lớp kiểm tra Storyboard (`scripts/stickman-director/`):**
   - [`scripts/stickman-director/validate-storyboard.mjs`](../scripts/stickman-director/validate-storyboard.mjs): CLI kiểm tra JSON storyboard trước khi viết code cảnh (kiểm tra nhịp 3–6 giây, hook mở đầu <= 3.5s, phụ đề 1 dòng <= 42 ký tự).
3. **Lớp Skill Đạo diễn cho AI Agent (`.claude/skills/stickman-video-director/`):**
   - [`SKILL.md`](../.claude/skills/stickman-video-director/SKILL.md): Định hướng AI lên kịch bản 5 hồi cảm xúc và chuyển đổi sang Remotion scene chuẩn retention.

---

## 2. Bảng tra cứu Style & Tư thế

### 6 Style Preset (`styleId`)

| `styleId` | Phong cách | Nền | Điểm nhấn (Accent) | Phù hợp cho |
| :--- | :--- | :--- | :--- | :--- |
| `classic-bw` | Classic Black & White | Đen `#0B0B0D` | Cam `#F58B4C` | Tâm lý, triết lý, bài học cuộc sống |
| `minimal-handdrawn` | Minimal Line Art | Giấy trắng `#FDFDFC` + lưới | Đỏ cam `#E25D3A` | Giải thích kiến thức, productivity |
| `amber-noir` | Amber Noir | Nâu đen `#12100E` | Hổ phách `#F08A24` | Kể chuyện sâu lắng, kịch tính |
| `retro-tv` | Retro TV Mystery | Xám đen `#111316` + scanlines | Xanh băng `#7CD4E8` | Bí ẩn, công nghệ, hoài niệm |
| `survival-thriller` | Survival Thriller | Đen `#111316` | Đỏ gạch `#CE6050` | Kinh dị, sinh tồn, cảnh báo |
| `dynamic-meme` | Dynamic Meme | Kem `#F4F0E5` + nét dày | Đỏ tươi `#FF5A36` | Hài hước, châm biếm, phản biện nhanh |

### 8 Tư thế nhân vật (`DirectorPosePreset`)

- `idle`: Đứng thở nhẹ tự nhiên.
- `thinking`: Đưa tay lên cằm suy ngẫm (biểu cảm `focused`).
- `pointing`: Chỉ tay nhấn mạnh ý chính (kết hợp tốt với `<KineticStroke kind="arrow" />`).
- `shocked`: Giật mình đưa 2 tay lên đầu (biểu cảm `shocked`).
- `celebrate`: Giơ hai tay ăn mừng, nhún người (biểu cảm `happy`).
- `slumped`: Cúi người chán nản, buông tay (biểu cảm `sad`).
- `presenting`: Đứng thuyết trình, vẫy tay minh họa (biểu cảm `happy`).
- `argue`: Tranh luận gay gắt, vung tay (biểu cảm `angry` với lông mày nhíu).

---

## 3. Quy trình 5 bước tạo video mới

### Bước 1: Khởi tạo khung video mới
Chạy lệnh scaffold của dự án để tạo thư mục `src/videos/<slug>/` và đăng ký vào `src/videos/registry.ts`:

```bash
npm run video:new -- --slug my-stickman-story --id MyStickmanStory --scenes 6
```

### Bước 2: Thiết kế & kiểm tra Storyboard JSON
Tạo file `docs/my-stickman-story/storyboard.json` theo mẫu sau:

```json
{
  "styleId": "classic-bw",
  "shots": [
    {
      "start": 0,
      "end": 3,
      "pose": "shocked",
      "caption": "Đừng làm điều này mỗi sáng!"
    },
    {
      "start": 3,
      "end": 7.5,
      "pose": "thinking",
      "caption": "90% người trẻ đều mắc kẹt ở đây"
    },
    {
      "start": 7.5,
      "end": 12,
      "pose": "pointing",
      "caption": "Hãy thử đổi thói quen trong 7 ngày"
    }
  ]
}
```

Kiểm tra tính hợp lệ của nhịp điệu và phụ đề:

```bash
node scripts/stickman-director/validate-storyboard.mjs docs/my-stickman-story/storyboard.json
```

### Bước 3: Lắp ghép Scene trong `src/videos/<slug>/`
Sử dụng các component từ `src/animation/StickmanDirectorKit.tsx` bên trong scene Remotion:

```tsx
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
  KineticStroke,
} from '../../animation/StickmanDirectorKit';
import {directorPose, interpolateKeyState} from '../../animation/stickman-director';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  const pose = directorPose({
    preset: 'shocked',
    originX: 540,
    groundY: 1320,
    time,
  });

  const propMotion = interpolateKeyState(
    {
      x: 200,
      y: 620,
      keys: [
        {t: 0, x: 200, alpha: 0},
        {t: 0.6, x: 380, alpha: 1},
      ],
    },
    time,
  );

  return (
    <DirectorStage styleId="classic-bw">
      <DirectorCharacter pose={pose} styleId="classic-bw" accessory="scarf" />
      <KineticStroke
        kind="underline"
        x={propMotion.x ?? 380}
        y={propMotion.y ?? 620}
        width={320}
        startFrame={10}
        durationFrames={15}
      />
      <DirectorCaption text="Đừng làm điều này mỗi sáng!" styleId="classic-bw" />
    </DirectorStage>
  );
};
```

### Bước 4: Xem trước (Preview) & Tinh chỉnh
Mở Remotion Studio để kiểm tra từng frame, vùng an toàn phụ đề và khớp giọng đọc:

```bash
npm run studio
```

Nếu có file voice-over, đo độ dài thực tế để cập nhật timeline:

```bash
npm run voice:measure -- my-stickman-story --out src/videos/my-stickman-story/voice-durations.ts
```

### Bước 5: Kiểm tra chất lượng & Render MP4
Chạy toàn bộ bộ kiểm thử (lint, format, typecheck, unit test) trước khi render:

```bash
npm run verify
npm run render -- MyStickmanStory
```

---

## 4. Lưu ý quan trọng
- **Tuyệt đối không dùng `Math.random()` hay `Date.now()`** trong `src/`: Mọi chuyển động phải tính từ `useCurrentFrame()` hoặc hàm `directorPose` để đảm bảo render deterministic.
- **Giữ phụ đề 1 dòng ngắn gọn (`<= 42` ký tự)**: Tránh bị che khuất bởi thanh tiêu đề/icon của TikTok và YouTube Shorts.
- **Giữ nguyên bản sắc từng video**: Có thể tùy biến màu sắc hoặc phụ kiện (`scarf`, `beanie`) qua props mà không sửa trực tiếp palette mặc định của các video khác.
