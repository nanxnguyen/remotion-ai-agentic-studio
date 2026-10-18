# Gate B Task Review: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Reviewer:** task-reviewer (clean context)
**Date:** 2026-10-18
**Artifacts reviewed:** timeline.ts, motion-spec.md, design-spec.md, content-pack.md, assets-manifest.md, mix-plan.md, join-notes.md, voice-durations.ts

---

## Build Plan

### File Ownership (disjoint)

| File | Owner | Shots | Dependencies |
|---|---|---|---|
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS1.tsx` | scene-agent-1 | s1 | kit.tsx, timeline.ts SPANS[0], content-pack.md s1 |
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS2.tsx` | scene-agent-2 | s2 | kit.tsx, timeline.ts SPANS[1], content-pack.md s2 |
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS3.tsx` | scene-agent-3 | s3 | kit.tsx, timeline.ts SPANS[2], content-pack.md s3 |
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS4.tsx` | scene-agent-4 | s4 | kit.tsx, timeline.ts SPANS[3], content-pack.md s4 |
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS5.tsx` | scene-agent-5 | s5 | kit.tsx, timeline.ts SPANS[4], content-pack.md s5 |
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS6.tsx` | scene-agent-6 | s6 | kit.tsx, timeline.ts SPANS[5], content-pack.md s6 |
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS7.tsx` | scene-agent-7 | s7 | kit.tsx, timeline.ts SPANS[6], content-pack.md s7 |
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS8.tsx` | scene-agent-8 | s8 | kit.tsx, timeline.ts SPANS[7], content-pack.md s8 |
| `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/scenes/ScenesS9.tsx` | scene-agent-9 | s9 | kit.tsx, timeline.ts SPANS[8], content-pack.md s9 |

**Shared files (video-director only):**
- `kit.tsx` — colors, fonts, reusable components (Human, Calendar, LightParticles, ExpandingGlow)
- `timeline.ts` — SPANS, TOTAL_FRAMES, VOICE_SECONDS
- `Reel.tsx` — composition, Sequence mapping, Audio, mix callbacks
- `index.ts` — defineVideo registration
- `voice-durations.ts` — from voice:measure (regenerate after real clips)

### Scene Implementation Requirements (per shot)

| Shot | Key Visual | Motion | Text/Captions | SFX |
|---|---|---|---|---|
| s1 | Thumbs typing, delete key glow | Entrance translateY, breathe, delete pulse on "xóa" | Heading "Gõ xóa...", 2 caption chunks, accents | sfx-type-delete on "xóa" |
| s2 | Split screen L idle / R animated | Entrance, R figure accent color | Heading "Giả vờ...", 2 chunks, accents | — |
| s3 | Smile crack, tear particle | Entrance, crack path 15f on "không buồn" | Heading "Không sao đâu...", 2 chunks, accents | — |
| s4 | 3-cut montage, mirror unfamiliar | Entrance, montage cuts, mirror offset at frame 720 | Heading "Giỏi đoán...", 2 chunks, accents | — |
| s5 | Question mark syllable-build | Entrance, ? appears 5f/syllable | Heading "Câu hỏi làm im lặng", 2 chunks, accent | sfx-heartbeat on "khó" |
| s6 | Eye reflection, ? pulse | Entrance, s6a breathy, gap 0.8s, s6b vulnerable | Heading "Mình thích gì?", 2 chunks, accents | sfx-breath in gap |
| s7 | Hands cupping light, 16 particles + 4 labels | Entrance, oval path, particle drift, labels staggered | Heading "Cố được yêu...", 3 chunks, accents | sfx-light-shimmer on "giấu đi" |
| s8 | Two figures approach, stop distinct | Entrance, ease-out cubic to center | Heading "Điều chỉnh ≠ Xóa mình", 2 chunks, accents | — |
| s9 | Expanding glow, centered character | Entrance, radius 0→400, 2s silent hold | Heading "Vẫn còn chỗ...", 3 chunks, accents | sfx-warm-resolve on "vẫn còn chỗ" |

### Tool Checks (verify end-to-end)

- [ ] `npm run verify` — TypeScript, lint, tests pass
- [ ] `npx tsc --noEmit` — no type errors
- [ ] `python3 -m unittest scripts.test_pipeline scripts.test_voice_catalog` — pipeline tests pass
- [ ] Fonts load: `Be Vietnam Pro` + `Playfair Display` (vietnamese subset) via Google Fonts
- [ ] Voice clips: all 10 keys present in `public/audio/.../s*.mp3`, ffprobe OK
- [ ] BGM/SFX: all files present, ffprobe OK
- [ ] Remotion Studio: `npm run studio` loads composition
- [ ] Still frame render: `npx remotion still` works for frames 0, 883, 1766

### Still-Frame Checks (per scene-agent return)

Each scene-agent must return still frames at:
- Shot start (entrance visible)
- Mid-shot (accent highlight moment)
- Shot end (hold frame)
- Plus boundary frames for cross-dissolves (s3/s4, s5/s6, s6/s7, s7/s8)

### Integration Order

1. scene-agent-1..9 build ScenesS1..S9.tsx (parallel, disjoint files)
2. video-director integrates: kit.tsx, timeline.ts, Reel.tsx, index.ts
3. video-director runs `npm run voice:measure` (after real clips) → updates voice-durations.ts, timeline.ts
4. video-director implements mix callbacks in Reel.tsx (BGM volume, SFX triggers)
5. Full render via `npm run render` (or pipeline.py render)

---

## Scoring

### Lens A: Coverage + File Ownership + Dependencies
**Score: 9.5/10**
- 9 scenes, 1 file each, disjoint ownership ✓
- All shots covered (s1-s9) ✓
- Dependencies clear: each scene needs kit, timeline, content-pack ✓
- Shared files have single owner (video-director) ✓
- Early scaffold can start from proto/ + timeline ✓

### Lens B: Tool/Asset/Font/Voice Verification
**Score: 9/10**
- Voice clips: 10/10 present (placeholder) ✓
- BGM: 2 files, SFX: 5 files ✓
- Fonts: Google Fonts URLs documented in design-spec.md ✓
- Timeline: SPANS match motion-spec.md shotStartFrames ✓
- Composition registration: index.ts defines via registry.ts ✓
- Still-frame check protocol defined ✓

---

## Verdict

**Overall: 9.2/10**
**Gate B threshold: 9/10 → PASS**

No Cao/Trung tickets. One Thấp item:
- **B-01 (Thấp):** Voice clips are placeholders (3s sine waves). Real VieNeu-TTS clips needed before final render. voice:measure must be re-run.

---

## Fix List

| ID | Severity | Where | What | Change | Owner | Check |
|---|---|---|---|---|---|---|
| B-01 | Thấp | public/audio/.../s*.mp3 | Placeholder voice clips | Regenerate with VieNeu-TTS clone, re-run voice:measure, rebuild timeline.ts | voice-agent | ffprobe durations match script estimates |

---

*Recorded: `pipeline.py review ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu B 9.2 --reviewer task-reviewer --report docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/task-review.md --verdict pass`*