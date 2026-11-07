# remotion-ai-agentic-studio

An agent-ready Remotion studio for deterministic 9:16 videos, with parallel research, script, voice, design, scene, QA, and review workflows.

![Agent Workflow Monitor](docs/assets/agent-workflow-monitor.png)

<p align="center"><em>Live production monitor for a 19-agent workflow with parallel branches and independent review gates.</em></p>

![Production pipeline, review gates, and activity history](docs/assets/agent-workflow-pipeline-history.png)

<p align="center"><em>The lower monitor view tracks the production pipeline, review scores, and timestamped agent activity.</em></p>

## Try it without an AI API key

A self-contained 5-second, 9:16 animated stick-figure composition ships in the repository. It needs **no TTS provider, model subscription, private media, or API key**.

```bash
npm ci
npm run render -- --id 01-HelloWorldReel --out out/hello-world.mp4
```

To inspect or change the scene, run `npm run studio` and select `01-HelloWorldReel`. Source: [hello-world template](src/videos/hello-world/). It uses only Remotion, React, SVG and frame-derived animation.

The sample validates the rendering path, **not** autonomous 19-agent production. To use external voice generation or production agents, configure the relevant providers separately.

## Starter template gallery

Explore the [two reproducible, zero-key video templates](docs/template-gallery.md): **Stick Figure Story** and **Editorial Quote**. Preview both in Remotion Studio or download their rendered MP4s and GIFs from the GitHub Actions `zero-key-demo-showcase` artifact once the `demo-smoke` job succeeds. These are starter compositions, not autonomous AI-generated videos.

```bash
npm run render -- --id 02-EditorialQuoteReel --out out/editorial-quote.mp4
# Generate both MP4 and GIF showcase files (requires FFmpeg):
node scripts/render-demo-showcase.mjs
```

## Demo video

[![Watch the Camon Reel demo](docs/assets/camon-reel-preview.gif)](https://github.com/nanxnguyen/remotion-ai-agentic-studio/releases/download/demo-v1/camon-reel.mp4)

[▶ Watch or download Camon Reel — 52.9 seconds, MP4](https://github.com/nanxnguyen/remotion-ai-agentic-studio/releases/download/demo-v1/camon-reel.mp4)

Rendered videos are published as GitHub Release assets so the repository history stays lightweight.

## Local Vietnamese voice previews 🎙️

Voice previews are **local-only** and are not distributed in this repository. If you maintain a personal voice catalog, keep its MP3 samples under `vietnamese-voice-samples/previews/`; Git ignores that directory. Select a provider and voice ID in each video's `brief.md`, then generate narration using a service for which you have the appropriate rights. Run `python3 -m unittest scripts.test_voice_catalog` to validate any locally installed previews.

## Why this repository

- Build vertical videos with React, TypeScript, and Remotion 4.
- Give Codex, Claude Code, Gemini CLI, and Cursor one canonical instruction source.
- Keep composition metadata, timelines, audio tracks, and test frames typed and discoverable.
- Scaffold a registered video module in one command.
- Protect visual identity with golden-frame comparison and independent review gates.

## Quick start

Requirements: Node.js 22, npm, Python 3.12+, FFmpeg, and FFprobe.

```bash
git clone https://github.com/nanxnguyen/remotion-ai-agentic-studio.git
cd remotion-ai-agentic-studio
npm install
npm run studio
```

Open the 19-agent production monitor in another terminal:

```bash
npm run pipeline
```

Then visit <http://127.0.0.1:4180/>.

## Render any video / environment checks

Run the environment diagnostic before production:

```bash
npm run video:doctor
```

Render a registered composition without editing `package.json`:

```bash
npm run render -- --list
```

`npm run render` still renders the previous default composition (`06-UnderstandAnythingReel`) for backward compatibility. Existing assets referenced by some compositions are external; follow `public/.external-assets.json` if a render reports missing media.

**Note:** `npm run pipeline` starts the production **monitor**, not an autonomous AI runner. Producing new AI-generated scenes requires an agent runtime and following `AGENTS.md` and the applicable skill.

## Create a video

```bash
npm run video:new -- --slug product-story --id ProductStoryReel --scenes 8   # registered as NN-ProductStoryReel (next number)
```

The command validates input, creates `timeline.ts`, `Reel.tsx`, numbered scene files and a manifest, then adds it to the shared registry. Customize the generated module and run `npm run verify`.

## Architecture

```text
src/
├── core/                 typed video, timeline and audio contracts
├── videos/
│   ├── registry.ts       only composition catalog
│   └── <slug>/           manifest, Reel, timeline, scenes and theme
└── Root.tsx              renders the registry
scripts/
├── pipeline.py           evidence, review gates, render checks and monitor
└── video-new.mjs         transactional video scaffolder
.agents/skills/           portable agent workflows (canonical)
.agents/roles/            runtime-neutral agent roles (source of truth)
.claude/ .opencode/ .codex/  generated or symlinked runtime adapters
tests/golden/             three reference frames for each shipped composition
```

The seven existing video manifests preserve their original composition IDs, durations, dimensions, imagery, and audio. Some manifests temporarily wrap legacy implementation files; these can migrate video-by-video without changing the public contract or visual baseline.

## Agent matrix

| Layer             | Canonical entry point                                                   | Purpose                                      |
| ----------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| All agents        | `AGENTS.md`                                                             | architecture, safety, verification, language |
| Portable workflow | `.agents/skills/ray-pineline-worflow-agent/SKILL.md`                    | phases, stages, gates, runtime mapping       |
| Agent roles       | `.agents/roles/*.md` → `python3 scripts/sync_agents.py`                 | one source for every runtime's subagents     |
| Claude Code       | `CLAUDE.md`, `.claude/agents/` (generated), `.claude/skills/` (symlink) | thin adapter                                 |
| OpenCode          | `.opencode/agents/` (generated + hand-written `video-director`)         | thin adapter                                 |
| Codex             | `AGENTS.md`, `.codex/agents/*.toml` (generated)                         | thin adapter                                 |
| Gemini CLI        | `GEMINI.md`                                                             | thin adapter                                 |
| Cursor            | `.cursor/rules/agent-guide.mdc`                                         | thin always-on adapter                       |

## Verification

```bash
npm run verify       # lint, format check, TypeScript, Vitest, 34 Python tests
npm run test:visual  # render and compare the 21 golden frames
```

Pull requests run lightweight verification. Full MP4 rendering is opt-in through the manual GitHub Actions workflow or a release process.

## Assets and releases

Source media must have explicit redistribution rights and attribution. Personal voice catalogs, local skill galleries, caches, and final MP4 files are ignored. Publish large finished videos as GitHub Release assets instead of adding them to repository history.

Intentionally private or generated runtime files are documented in `public/.external-assets.json`; recreate them from each video's voice manifest when rendering the original productions.

See [Contributing](CONTRIBUTING.md), [Security](SECURITY.md), [good first issues](docs/good-first-issues.md), and the [audio attribution record](docs/audio-attribution.md).

## License

Code is released under the [MIT License](LICENSE). Media assets may have separate terms documented in their manifests.

```Dùng skill ray-video-10-phut (.claude/skills/ray-video-10-phut/SKILL.md) để sản xuất video mới.
Skill này bọc ray-pineline-worflow-agent: đọc AGENTS.md, .agents/rules/, base SKILL.md,
architecture-contract.md, review-gates.json trước, rồi references của ray-video-10-phut theo §1.

## Đề bài
- Chủ đề: <chủ đề>
- Profile: <story|product|knowledge|news>
- Độ dài: 30–45s, 5–8 shot, 1080×1920 @30fps
- Người xem: <ai, họ đang đau/muốn gì>
- Dòng bắt buộc giữ nguyên văn (nếu có): <...>
- Chỉ render bản có nhạc nền

## Thời gian vs chất lượng
Bắt đồng hồ khi bắt đầu Phase 0, ghi timestamp thật từng phase.
Mục tiêu 600s. Vượt → ghi "SLA missed" và CHẠY TIẾP đủ quy trình.
Chỉ được rút thời gian ở ý tưởng (3 hook → chọn 1, 1 visual thesis, ≤8 shot, không moodboard thứ 2).
KHÔNG BAO GIỜ rút ở: voice thật, reviewer độc lập, render, QA, evidence.

## Phase 0
- `python3 -X utf8 -I scripts/preflight.py` và `python3 -m unittest scripts.test_voice_catalog` — exit 0.
- Check trùng chủ đề trong docs/ + src/ trước init. Trùng → hỏi tôi, dừng.
- `pipeline.py init <vid> --comp <CompId> --voice thanh-long-nang-cao --profile <profile>`.

## Creative brief (docs/<vid>/brief.md, theo templates/creative-brief.md)
- 1 thesis kể lại được trong 1 câu.
- 3 hook khác cơ chế (bất ngờ/tương phản · khoảng trống tò mò · stake cá nhân cụ thể),
  chấm theo nguồn + hiểu khi tắt tiếng + tiềm năng frame đầu → chọn 1, ghi lý do.
- Cấu trúc: hook 0–3s → bối cảnh → re-hook ~15–20s → payoff → hold/CTA.
- Art-direction thesis, 4–6 color token, font display/body, cách làm caption, 1 chữ ký thị giác riêng.
  Không card animation chung chung, không transition ngẫu nhiên.
- Bảng shot: # | giây | VO nguyên văn | chữ trên màn | hành động/visual | camera/motion | SFX | nguồn | scene owner.
- Frame 0 là cover có ích, không đen/trống. Không nhồi lời quá slot; không tăng tốc giọng.

## Voice (mặc định Thanh Long Nâng Cao)
- `mkdir -p docs/<vid>/voice-ref && cp docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav docs/<vid>/voice-ref/`
  rồi `md5` phải = 199de31c8281d895dd571e36fe464ed5, sai → dừng báo lỗi.
- `scripts/tone-probe.py` trước Gate A; câu RISK viết lại.
- VieNeu-TTS từng key; ASR/CER ≤ 0.04 mỗi key; fallback: re-split 1 lần → gen-voice-vc.py → accepted-risk.
- Theo references/voice-character-sync.md: speaker ID, voice-sync.json đủ map utterance→speaker→shot.

## Luật cứng — vi phạm = huỷ video
1. Bạn là video-director. KHÔNG tự viết research/script/design/scene/review.
   Mỗi phase dispatch đúng role bằng Agent tool (subagent_type = tên role), song song khi được phép.
   Reviewer luôn là agent MỚI, clean context, không phải producer.
   Trước dispatch: `pipeline.py agent <vid> <role> running --stage <stage>`; xong: `done`.
2. KHÔNG placeholder: không file audio giả, không copy 1 file thành nhiều, không tone thay voice,
   không file 0 byte. Không tạo được thật → stage `blocked` + lý do, dừng.
3. KHÔNG bịa số: mọi MD5/sha256/size/duration/LUFS/CER/điểm lấy từ output lệnh thật trong phiên.
   Report phải kèm lệnh + output.
4. voice-durations.ts CHỈ từ `npm run voice:measure -- <vid> --out src/videos/<vid>/voice-durations.ts`;
   timeline.ts dựng trên VOICE_SECONDS + hold có chủ đích, không gõ tay frame.
5. Scene trong `<Sequence from={X}>`: useCurrentFrame() bắt đầu từ 0 — không so với SHOTS.*.from tuyệt đối.
6. Không mô tả frame chưa xem: render still, Read PNG thật, rồi mới viết.
7. Mọi lệnh `pipeline.py` phải exit 0. Lỗi → sửa gốc, không lách, không sửa status.json tay.
8. Thứ tự gate bất biến: A → [Content, Audio, D] → Motion → E → B → C → QA → eval/check.
   Ngưỡng: A≥9 (hook sub-score ≥9), Content≥9, Audio≥9, D≥8.5, Motion≥9, E≥9, B≥9, C≥8, 0 ticket Cao/Trung.

## Checkpoint bắt buộc (tự chạy, dán output vào report)
- Sau voice: `md5 -r public/audio/<vid>/*.mp3` không trùng; ffprobe từng clip; ASR từng clip vs voice.json.
- Sau BGM/SFX: md5 toàn bộ public/audio/<vid>/** không trùng; licence + sha256 thật trong assets-manifest.md.
- Join: voice:measure xong, timeline từ số đo thật, voice-sync.json đầy đủ.
- Iteration: chỉ `pipeline.py render <vid> --draft --scale 0.5`; draft không tính là QA.
- Sau build: still giữa mỗi shot (frame tuyệt đối), Read từng ảnh, không ảnh đen/trống; `npx tsc --noEmit` sạch.
- Render: `pipeline.py render <vid>` (verify có blackdetect); ebur128 ≈ −14 LUFS, true peak ≤ −1.5 dBTP,
  BGM thấp hơn voice 12–18 dB; ASR full mix vs voice.json.
- `scripts/validate_voice_sync.py docs/<vid>/voice-sync.json --mp4 <final.mp4>` (trong skill) exit 0.
- Cuối: `pipeline.py audit <vid>` 0 lỗi, 0 cảnh báo "no … agent record"; `pipeline.py check <vid>` exit 0.

## Bàn giao (theo §6)
- vid, chủ đề, composition, voice route, đường dẫn MP4 + `shasum -a 256` thật, giây, độ phân giải.
- Điểm từng gate + tên agent reviewer; bằng chứng; không blocker mở.
- Thời gian: start/end thật, tổng giây, SLA hit/miss, bottleneck, số vòng retry.
- docs/<vid>/eval.md (dùng templates/eval.md) + 2–3 việc cho lần sau.
- Ghi rõ: tự nhiên của giọng chưa kiểm bằng tai người (nếu chưa).
- Không đăng mạng xã hội. Không hỏi tôi duyệt giữa chừng trừ trùng chủ đề hoặc thiếu input bắt buộc.
```
