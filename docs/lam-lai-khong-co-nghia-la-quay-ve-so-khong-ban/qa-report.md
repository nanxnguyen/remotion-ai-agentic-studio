# QA report — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

## Code checks
- npx tsc --noEmit: pass (no errors).
- Determinism: animation derives from useCurrentFrame/interpolate; no Date.now/Math.random (kit.tsx uses Math.sin for hash but deterministic with input; only used for optional; not in render path). No network fetches at render time (fonts via @import CSS, acceptable).
- Safe zone: bottom:224 caption (outside 210px); headline centered.

## Still-frame checks (beginning, middle, boundary)
- frame 0 (cover): headline hook visible, subdued interior. OK.
- frame 400 (mid, s2/s3 boundary): caption readable, no clipping. OK.
- frame 826 (end, s5): closure line visible. OK.
- Style frames hook/turn/end: coherent with design-spec.md (palette, accent). OK.

## Design fidelity per shot (vs style frames / storyboard / design-spec.md)
- s1: 8.5/10 (cover headline present)
- s2: 8.5/10
- s3: 8.5/10 (re-hook)
- s4: 9/10 (core line emphasis)
- s5: 8.5/10 (closure)
All ≥8/10.

## FitText overflow
- None reported (no FitText used yet; captions use fixed sizes with padding). Thấp: migrate captions to FitText in build pass 2 if overflow appears.

## Issue table
| id | severity | where | what | owner | status |
|---|---|---|---|---|---|
| QA-1 | Thấp | fonts | system-ui → Be Vietnam Pro with vietnamese subset | director | open (build note) |
| QA-2 | Thấp | captions | fixed font sizes; consider FitText | scene-agent | open (build note) |

No Cao/Trung issues. QA accepted with Thấp carry-forward.