---
name: ray-video-10-phut
description: Produce a high-quality 30-45 second Vietnamese short-form video in a target wall-clock budget of 10 minutes using the existing ray-pineline-worflow-agent pipeline, creative hook/storytelling, Anthropic-inspired visual direction, and official Remotion skills. Use when asked for a fast production video, high-retention reel, short, or TikTok within ~10 minutes, without bypassing mandatory gates or QA.
---

# Ray Video 10 Phút — high-quality fast-lane production

> Tên hiển thị: **ray-video-10-phút**. Tên kỹ thuật `ray-video-10-phut` là ASCII để tuân thủ chuẩn Agent Skills.
> **10 phút là thời gian sản xuất mục tiêu (elapsed/wall clock), KHÔNG phải độ dài video.** Đây không phải cam kết hoàn tất khi máy, assets, hoặc các gate chưa sẵn sàng.

## 0. Boundaries, activation and precedence

This is a **composition/orchestration skill**, not a replacement for the original workflow. It does not create a second state machine, change `scripts/pipeline.py`, or invent alternate stage/gate passes. Before running, read the following in order when the files exist:

1. `AGENTS.md`, `CLAUDE.md`, `.agents/rules/README.md` and applicable `.agents/rules/*`.
2. `.claude/skills/ray-pineline-worflow-agent/SKILL.md` (or its `.agents/skills/` symlink), its `references/architecture-contract.md` and `schemas/review-gates.json`.
3. This skill, then only the needed `references/*.md` according to the task.
4. Task-specific local skills (see **Skill routing**); external skills if already available locally.

**Precedence:** repository safety/rules > `pipeline.py` and review-gate contracts > base `ray-pineline-worflow-agent` > this time-budget scheduling guide > creative skills. If two requirements conflict, follow the stricter enforced rule, disclose the conflict and never weaken a gate to meet 10 minutes. Reviewers must be independent of producers; no fake signatures, scores, evidence or output.

### When to use

- A request to create a new 9:16 short-form video **quickly**, with a high-quality hook, narrative and visual craft.
- A 30–45s video from a known profile (`story`, `product`, `knowledge`, `news`) on an already configured machine.
- Reusing pre-rendered assets, licensed stock, tested voice catalog, template/scene kit and valid cache is acceptable.

### Fast-lane eligibility (check; never silently lower quality)

- Existing repository, dependencies and voice/render environment pass `preflight.py`.
- No duplicated topic requiring user input; no external approval, login or unavailable credentials.
- Target is ordinarily 30–45 seconds, 5–8 scenes, 1080×1920 @30fps unless brief explicitly overrides.
- At least one legally usable asset strategy and working voice route. Prefer existing, verified, reusable media and composition primitives.
- Users requiring novel AI footage, extensive original character rigs, or extended source validation may exceed budget: run full safe pipeline and report **SLA missed**, not a fabricated pass.

Read `references/fast-lane.md` for eligibility, clock, critical path, and fallback policies.

## 1. Skill routing — one creative system

Select **relevant** skills. Do not bulk-load everything; read the minimum needed, write a single shared creative brief and enforce one decision owner (`video-director`). External skills are **references only** and never override this repo's render command or gate requirements.

| Need | Skill to consult | Required output |
|---|---|---|
| Script, hooks, retention | `.claude/skills/viral-hooks/`, `viral-short-form/`, `video-script/`, `viral-tech-video-creator/` (if present) | Three hook candidates, one chosen, shot-by-shot script, re-hook, memorable ending |
| Visual identity | `.claude/skills/frontend-design/` if present; else installed official `frontend-design` from Anthropic | Design thesis, palette, typography, hierarchy, compositional signature, art direction |
| Cinematic craft | `.claude/skills/video-shotcraft/` plus this skill's `references/shotcraft.md` | Shot grammar, visual rhythm, transitions, sound/motion recipes |
| Remotion composition | Installed official `remotion-best-practices`, `remotion-markup`, `remotion-captions` as relevant | Deterministic frame-driven code, legible captions, reliable render |
| Authoritative pipeline | `ray-pineline-worflow-agent` | Every required artifact, review/gate, QA, `eval.md`, verified final file |

If an optional skill does not exist, use the self-contained equivalent in this skill's `references/`; **do not pretend it was read or executed**. Do not copy upstream licensed skill text into this repo; keep pointers and original guidance here.

Load task-specific references:

- Always: `references/hook-story.md`, `references/visual-direction.md`, `references/quality-rubric.md`, `references/fast-lane.md`.
- For every spoken video: `references/voice-character-sync.md` (mandatory casting, utterance timing and final listening evidence).
- For Remotion build: `references/remotion-playbook.md`.
- For video style and transition: `references/shotcraft.md`.
- At retro/delivery: `references/eval-guidance.md` + `templates/eval.md`.

## 2. Director creative brief (before expensive work)

Collect only missing essentials; use sensible defaults when reasonable. Record in `docs/<vid>/brief.md`:

- Audience, viewer problem/desire, **one retellable thesis**, proof/source constraints, profile and duration.
- Story promise: hook (first 0–3s) → value/context → turning point/re-hook (~15–20s) → payoff → final hold/CTA as appropriate.
- **Three hook candidates** with distinct mechanisms: surprise/contrast, curiosity gap, specific personal stake. Discard claims without evidence; choose one by source support + sound-off comprehension + first-frame visual potential. A score is an internal self-review, **not Gate A**.
- One **art-direction thesis**, 4–6 color tokens, display/body font roles, caption approach, clear video-specific signature. Avoid generic animated cards and random transitions.
- Concrete shot table `# | seconds | VO exact text | on-screen text | action/visual | camera/motion | sound cue | source | scene owner`.
- Frame 0 must be a useful cover, not a black or blank fade. Keep first 3 seconds visually specific; do not force emotional storytelling for factual topics.
- Build no 60-second speech into a 30-second slot. Estimate Vietnamese spoken syllables as an initial heuristic only; actual `voice-durations.ts` controls timeline. Preserve breaths and ending holds; **never solve overflow by speeding voice unnaturally**.

See `references/hook-story.md` and `templates/creative-brief.md`.

### Voice casting and picture lock (mandatory)

Before TTS, follow `references/voice-character-sync.md`. Assign stable speaker IDs and audition an actual sample for every speaking role. Generate separate utterance assets, measure the final files, then derive picture and caption timing from those measurements. A single generic narrator must not silently replace character dialogue. Record narrator, on-screen, off-screen and reaction-shot modes explicitly.

At Join, require a complete utterance-to-speaker-to-shot map and verified audio durations. At Audio review, assess natural Vietnamese delivery and cast consistency. At Gate C/final QA, watch and listen to the actual final MP4, checking each line against its character, picture and captions. Wrong speaker, unexplained picture mismatch, cut speech or missing listening evidence blocks delivery; deadline pressure never waives this requirement. These are required reviewer checks within existing gates, not new machine-enforced transitions.

## 3. Fast execution plan (legal pipeline, parallel branches)

Start an elapsed-time clock at the first active pipeline work. Record actual timestamps; do not claim any budget as measured unless observed. Goal: ≤600s to a **verified deliverable**, not merely to scene code.

| Target clock | Work (enforce actual deps, these are aspirations only) |
|---|---|
| 00:00–00:45 | Phase 0 preflight/duplicate checks, init; reuse tested kit/cache |
| 00:45–02:15 | Phase 1 research, Phase 2 script/voice direction, independent Gate A |
| 02:15–04:30 | Phase 3 parallel content, voice/audio, design branches with independent reviews; D ≥8.5 |
| 04:30–05:30 | Phase 4 Join, motion evidence/review; Phase 5 E, Phase 6 B |
| 05:30–07:45 | Phase 7 disjoint scene builds, previews, typecheck |
| 07:45–09:15 | Phase 8 full render/verify, final evidence, independent Gate C |
| 09:15–10:00 | Phase 9 independent QA, Phase 10 mandatory `eval.md`, `pipeline.py check`, delivery |

**Important:** This target assumes warm-cache, short scenes and fast inference. Branches only parallelize where the original workflow permits; a reviewer cannot pre-approve missing evidence or future MP4. On deadline pressure reduce *scope/novelty*, not safeguards, independent reviews or score thresholds. Phase dependency graph is detailed in `references/fast-lane.md`.

### Start and state bookkeeping

Use actual repo CLI and capture exit codes (do not pipe critical commands through `tail`):

```bash
python3 -X utf8 -I scripts/preflight.py
python3 -m unittest scripts.test_voice_catalog
python3 -X utf8 -I scripts/pipeline.py init <vid> --comp <CompId> --voice <voice> --profile story
python3 -X utf8 -I scripts/pipeline.py show <vid>
```

Choose profile from `story|product|knowledge|news`; the example is not a mandated default for every subject. Check for duplicate topic **before** init. Follow base skill's live agent updates: `agent ... running|done|failed`, `set ... in_progress|done|blocked|failed`, `advance ...`, `gate ...`, audit after phases. **Only the director** updates pipeline state; reviewers return evidence and a verdict. Never edit `status.json` directly. If current repo CLI differs, inspect `--help`/source rather than guessing options.

### Production lanes

1. **Research/Script + A:** narrow claims; write research, brief, `script.md`, proposed voice direction; tone probe when base skill mandates. Producer self-critique, independent script-reviewer (A ≥9). Avoid expensive asset generation until content is locked.
2. **Fan-out:** dispatch Content, Voice/Audio, and Design branches simultaneously, each writes distinct files; producers self-review against their reviewers' rubrics; reviewers independent (Content ≥9, Audio ≥9, D ≥8.5). Use cached **verified** assets or component kit before creating net-new assets.
3. **Join → Motion → E → B:** obtain exact voice durations and join notes; motion spec, complete animatic/evidence/review (Motion ≥9); integration-reviewer E ≥9; task-plan/reviewer B ≥9. Where base skill permits early scaffold, make shared ownership explicit.
4. **Build:** split 5–8 scenes into disjoint files, with *one* director owning timeline/kit/Reel/index/registry/voice JSON. Preview only for iterations via base-supported `pipeline.py render <vid> --draft [--scale 0.5]`; do not count draft as QA or final.
5. **Final:** use **only** `pipeline.py render <vid> ...` for the full MP4, run full regression matrix, independent video-reviewer C ≥8 and zero blocking/high/medium issues, independent Phase 9 QA and `pipeline.py check`. A scene/code/voice change may invalidate E/Motion/B/C; let pipeline enforce all reopening rules. No unverified MP4 delivery.
6. **Retro:** write `docs/<vid>/eval.md` automatically, with measured wall time, critical path, token cost (if observable), cache hit rate, gate rounds, root causes, and next-video actions. Never make up timings. Process/rule changes require review/approval as specified by the base skill.

The original gate order must remain: **A → [Content, Audio, D] → Motion → E → B → C → final QA → eval/check**. Verify the stored workflow version and do not silently upgrade legacy videos.

## 4. Quality is non-negotiable

Use `references/quality-rubric.md` as a **creative preflight rubric**, not a replacement for the machine's review-gates schema. Rubric dimensions: hook & promise, story clarity, proof, distinctiveness, shot composition, motion & sound, caption clarity, technical integrity. High creative score cannot override a failed pipeline gate.

Final MP4 blocking rules from the base workflow include: verify/render failure; omitted/wrong/cut speech; caption/voice mismatches; clipped characters/diacritics/safe area (including bottom 210px); black/flash frames; audio masking/clipping; unsupported claims; non-deterministic frames. Run full re-test of final MP4 after every full re-render. Voice perception requires human listening; ASR does not prove expressive quality. Do not self-sign a listener record.

Audio objective: approximately −14 LUFS integrated, true peak ≤ −1.5 dBTP; BGM typically 12–18 dB under voice according to source workflow, measured on output. Technical constraints defer to the actual current schema and user's brief.

## 5. Budget control, graceful degradation and failure

- Timebox **ideation**, not evidence verification: 3 hooks → choose one; 1 coherent visual thesis; default ≤8 shots. No second moodboard once approved unless reviewer finds defects.
- Reuse only verified prior clips/templates/assets whose content, licence and validity remain applicable. A stale cache key may never count as evidence. Note hash/source/version.
- Early-preview only high-risk segments (frame 0, hook, transition, climax, ending) before final; the **full final QA matrix is still mandatory**.
- Producer self-review catches obvious failures before reviewers (missing limbs/holders/props, repeated tiles, unsafe captions, misaligned transcript).
- If ETA or elapsed >600s: mark SLA as missed and continue the safe workflow, or report blocked status with handoff if a required external dependency fails. Never lower scores, bypass C/QA, invent files, invent voice permissions, or publish automatically.
- A 10-minute missed target is **not** a failure if the video quality is protected. Report actual P50/P95 only across observed runs, not from an imagined benchmark.

## 6. Output / handoff

Deliver exactly the current fingerprint-approved MP4 plus a concise report:

- `vid`, topic, composition, voice route, final MP4 path and fingerprint, seconds, 1080×1920 @30fps unless overridden.
- Gate scores, proof/evidence list, no unresolved blockers; note optional human listen as pending/confirmed truthfully.
- Time: measured start/end, wall seconds, SLA hit/miss, phase bottlenecks and major retries.
- Exact `docs/<vid>/eval.md` location and 2–3 actions for the next run; no claims of engagement/retention without platform analytics.
- No social publishing unless explicitly requested by the user.

**Example invocation:** “Dùng `ray-video-10-phut` tạo video 35 giây về [chủ đề], profile knowledge, ưu tiên hook mạnh, visual cinematic, reuse asset, target 10 phút.”

This skill is **source-only**: using it does not prove that the runtime, upstream skills, models or video are installed/working. Record actual outcomes.
