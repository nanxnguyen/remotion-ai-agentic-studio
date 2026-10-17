# Design + storyboard — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

Created: 2026-10-17T17:41:00+07:00

## Layout
- 9:16 vertical, 1080×1920 @ 30fps
- Safe area margins respected
- Text minimal, large readable

## Typography
- Clean sans-serif for text (matches repo style)
- Core line: “Làm lại không có nghĩa là quay về số không.” emphasized in s4

## Color tokens (abstract)
- bg-dim: soft gradient
- accent-warm: increases subtly over time (deterministic via frame)
- text-primary: high contrast

## Storyboard frames
| Scene | Keyframe | Description |
|---|---|---|
| s1 | frame 0 | Establishing, subdued |
| s2 | frame 180 | Subtle light shift |
| s3 | frame 450 | Posture/clarity |
| s4 | frame 720 | Core message focus |
| s5 | frame 990 | Gentle closure |

## Design constraints
- Frame-driven animations only
- No random values
- Deterministic
