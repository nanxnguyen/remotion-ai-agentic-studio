# Agent Guide

This is the canonical instruction file for every coding agent working in this repository.

## Mission

Build deterministic 9:16 Remotion videos while preserving each video's visual identity. Share infrastructure, contracts, and tooling—not palettes, story concepts, or scene art direction.

## Required workflow

1. Read the relevant video manifest in `src/videos/<slug>/index.ts` and its evidence in `docs/<slug>/`.
2. Use `src/videos/registry.ts` as the only composition catalog. Never register a composition directly in `Root.tsx`.
3. Derive animation from Remotion frames. Never use wall-clock time or unseeded randomness.
4. Keep composition IDs, dimensions, frame rate, duration, image treatment, and audio placement backward compatible unless the task explicitly changes them.
5. Add or update tests before implementation. Run `npm run verify` before handoff.
6. For visual changes, run `npm run test:visual` and inspect the diff output.
7. Keep secrets, personal voice previews, render output, and unlicensed media out of Git.

## Google Drive delivery rules (mandatory for every final video)

Before any new video's delivery, read [`docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md`](docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md). The owner's fixed parent is Google Drive folder ID `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D` (display name `Videos-shorts`). For each new video, inspect numbered folders and allocate `max(N)+1` with a title/date folder `N. Video title - YYYY-MM-DD` (Vietnam local production date). Do not create a new folder for revisions of the same video. Every completed video folder must have verified real `video-final.mp4`, original dramatic story-specific `thumbnail-youtube.png` (vertical 9:16 for Shorts, horizontal 16:9 for long videos), and UTF-8 `youtube-title-description.txt` with engaging accurate title + description. Confirm real bytes and each Drive URL before claiming completed delivery, and **immediately upon finishing the Drive upload, always output directly clickable Google Drive URLs** (bare `https://drive.google.com/...` URLs or clickable Markdown links — never plain file IDs or backtick-wrapped URLs) for the numbered folder and all 3 uploaded files without waiting to be asked. No YouTube/TikTok publishing without approval.

## Video production rules (mandatory)

**Mandatory high-retention script rule for EVERY video (YouTube Shorts + TikTok, all topics and genres):** Read [`docs/SHORTS_RETENTION_PLAYBOOK.md`](docs/SHORTS_RETENTION_PLAYBOOK.md) before approving any new script, shot list, storyboard or render. Draft three hook candidates; make the opening legible in 0–2s, complete a meaningful hook within 4–6s, create story-changing visual actions every ~3–6s, and deliver an earned climax and concise visual payoff. Prepare platform-native YouTube title/cover and TikTok caption/cover/safe-area treatment when publishing assets are requested. Review available watch-retention/engagement metrics after publishing and iterate; million views are **never guaranteed**. Film-specific timings may adapt; the retention principles must not be skipped.

Every agent and tool that works on a video (Claude Code, Codex, OpenCode, Cursor, Gemini, …) must run the full phase/stage/gate workflow in [`.agents/skills/ray-pineline-worflow-agent/SKILL.md`](.agents/skills/ray-pineline-worflow-agent/SKILL.md) without skipping any step (see rule 6 in `.agents/rules/README.md`), and must follow [.agents/rules/](.agents/rules/README.md): truthful status for the monitor, complete documents for every phase, `src/` ownership and timeline rules, and handoff discipline. Run `python3 -I scripts/pipeline.py audit <vid>` before ending any turn on a video; it must exit 0 or every remaining error goes into `docs/<vid>/HANDOFF.md`.

**Mandatory YouTube Title, Thumbnail Text & Description rule (`youtube-agent-skill`):** Whenever creating or reviewing YouTube packaging (`thumbnail-youtube.png` text/concept, YouTube title, and description in `youtube-title-description.txt` or `content-pack.md`), every agent MUST use `plugins/youtube-agent-skill` ([`.agents/skills/yt-package/SKILL.md`](.agents/skills/yt-package/SKILL.md) and [`.agents/skills/yt-seo/SKILL.md`](.agents/skills/yt-seo/SKILL.md)), align voice with `docs/youtube-voice-profile.md` (or `~/.claude/youtube/voice.md`), and run `python3 .claude/skills/yt-package/title.py --title "<title>" --thumb "<thumb text>"` to verify character limits (≤ 40 mobile / ≤ 60 desktop) and zero word duplication between title and thumbnail text. Never auto-publish.

## Commands

```bash
npm install
npm run studio
npm run video:new -- --slug my-video --id MyVideoReel --scenes 8
npm run voice:measure -- my-video --out src/videos/my-video/voice-durations.ts
npm run verify
npm run test:visual
npm run pipeline
```

Runtime baseline: Node 22, npm, Remotion 4.0.534, Python 3.12+, FFmpeg, and FFprobe.

## Architecture boundaries

- `src/core/`: typed video/timeline/audio contracts. No video-specific styling.
- `src/videos/<slug>/`: manifest, Reel, timeline, scenes, and theme owned by one video.
- `src/videos/registry.ts`: single source of truth for Studio, tests, and automation.
- `scripts/`: scaffolding and the Python production/review pipeline.
- `.claude/skills/ray-pineline-worflow-agent/`: **canonical** shared video-production skill, edited here only. `.agents/skills/ray-pineline-worflow-agent` symlinks to the canonical directory for Codex/OpenCode interoperability; `scripts/sync_agents.py --check` verifies the link.
- `.agents/roles/`: runtime-neutral agent roles, the single source for `.claude/agents/`, `.opencode/agents/` and `.codex/agents/` (generated by `python3 scripts/sync_agents.py`; edit the role, never a generated file).
- `tests/golden/`: pre-migration reference frames for perceptual regression checks.

Some video manifests currently adapt legacy scene modules while those modules migrate incrementally. Do not combine visual systems merely to finish that move.

## CodeGraph

Prefer CodeGraph for structural questions: symbol definition, callers/callees, impact, traces, and focused context. Use text search for literal strings and comments. If the index reports pending files, read only those changed files directly. Initialize a fresh clone with `codegraph init -i` when CodeGraph is installed.

## Language and safety

Communicate with the project owner in Vietnamese. Keep code, public documentation, and commit messages in English. Do not publish credentials, personal media, generated MP4s, or assets without clear redistribution rights.

## Responsibility split

See `.claude/skills/ray-pineline-worflow-agent/references/architecture-contract.md` (also available via the `.agents` symlink). The skill defines phases; `scripts/pipeline.py` enforces state transitions; `.agents/roles/` owns agent responsibilities; `schemas/review-gates.json` defines scoring; `scripts/runtime_orchestrator.py` records execution/retry/resume intent. Motion phase 4b remains part of the canonical workflow.

## Durable skill and finished-video storage

Store newly created video skills both under `.claude/skills/<name>/` (agent runtime) and `plugins/<name>/` (reinstallable package). They must be committed to this repository, with sensitive values excluded. Once a fully reviewed video is final, archive its actual MP4 in a **draft GitHub Release** using `.github/workflows/archive-finished-video.yml` after the final MP4 is uploaded to an Actions artifact; store a SHA-256 manifest and verify the Release asset. Keep MP4 binaries out of normal Git history and do not publish releases or YouTube content without separate authorization. See `docs/production-archive-policy.md`. An unuploaded local/chat MP4 is not a GitHub archive.

## Dual-location video archive and BOTH review links (updated 2026-10-24)

For every NEW_FILM and revised story video:

1. Finish real render and media QA first; never claim an MP4 is complete before validating it.
2. Save the **same approved MP4** in **both** destinations: (a) Google Drive, for in-browser preview, and (b) a draft GitHub Release, for versioned archiving. Verify each destination independently using actual stored metadata, filename, byte size, and SHA-256 where available. Do not commit finished MP4 into regular Git history.
3. Drive upload: pass a genuine generated/connector file reference into `mcp__Google_Drive__upload_file`, `mime_type="video/mp4"`; read back Drive metadata including verified URL, size, and MIME type. **Verify viewer access**: Drive may be private to the owning Google account; do not claim a URL is publicly playable without checking permissions. For an access issue, ask the user to use the connected Google account, or obtain explicit consent before sharing more broadly. Google Drive preview transcoding may take time; metadata alone does not prove playback.
4. GitHub archive: upload actual validated MP4 bytes to a **draft Release** using the approved GitHub workflow/local uploader, and verify Release asset filename, byte count, checksum and the returned URL. A GitHub PR containing only source/docs is **not** an archived MP4.
5. **Default user-facing production report MUST INCLUDE BOTH verified links**, in this order: **[▶ Xem video trên Google Drive]** (actual Drive `webViewLink`/returned URL) and **[⬇ Tải MP4 trên GitHub]** (actual verified Release asset download URL). GitHub Release page can be added if useful. Include a compact 9:16 resolution, FPS, duration and QA note.
6. If either destination fails or is not accessible, explicitly label it **pending/permission restricted** and explain the precise blocker. Never invent URLs or describe a chat download, source-code PR, or unuploaded MP4 as the GitHub Release asset. Share an actually accessible preview alternative when necessary.
7. Keep Google Drive files private by default and GitHub Releases in **draft**. Never broaden Drive sharing, publish a Release or publish on YouTube without separate authorization.

**This latest requirement supersedes the earlier preference to report only Google Drive links.** Both destinations remain mandatory, and **both links** are required in the routine report once actually verified.

## Mandatory Video-shorts Google Drive package (Ray Emotional Stick Shorts)

For every completed Ray Emotional Stick Shorts video, follow [`docs/video-shorts-drive-archive-policy.md`](docs/video-shorts-drive-archive-policy.md). The owner-required Drive root is `Videos-shorts` (ID `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`); create one sequentially numbered `<N>. <title> - <YYYY-MM-DD>` child folder per video, containing the QA-approved **`video-final.mp4`**, expressive original **`thumbnail-youtube.png`** and UTF-8 **`youtube-title-description.txt`** with publication title and description. Verify all three in Google Drive before claiming a complete delivery; the GitHub draft Release and other approved archive obligations remain separate.

## Archive destination override — NO GitHub Releases (2026-10-25)

**Latest explicit user direction supersedes every previous draft-GitHub-Release instruction.** For new finished videos, upload the real QA-approved MP4, portrait/landscape thumbnail and Vietnamese YouTube title/description into the sequentially numbered **Google Drive Videos-shorts** child folder (`1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`). **Do not upload any MP4 to GitHub Releases or create/publish a Release.** GitHub repository `nanxnguyen/remotion-ai-agentic-studio` remains mandatory for source code, Remotion compositions, shotlist, timelines, voice manifest, QA/report and links back to the Drive archive, using normal commits/PRs. Keep rendered MP4 binaries out of Git commits/history; the media lives on Drive. The user-facing completion report includes verified **Google Drive MP4 viewer**, **Google Drive numbered folder** and **GitHub source/production PR** links, never invented GitHub binary or Release links. Drive and GitHub are both required; their roles differ. Preserve private-sharing defaults and do not automatically publish publicly or upload YouTube.

## Production QA 2026-10-25 — Ray v0.2.9 action evidence gate

Every future Ray Phim Kể Chuyện video MUST follow `docs/VOICE_VISUAL_RETENTION_QA_V1.md`. From the original 10-scene Lighthouse V3 vs 25-microshot V4 comparison: require observable visual action for every narrated significant event, build a beat-to-asset-and-proof-frame evidence manifest, and inspect actual rendered MP4; a caption or unrelated static image is not proof. Run `python .claude/skills/ray-phim-ke-chuyen/scripts/validate_voice_visual_evidence.py <manifest> --assets-root <dir>` as a structural preflight AFTER visual review; script cannot see what the video depicts. Preserve user-approved 0.35–0.55s soft fades, real Vbee, 9:16 60s, 2.5D allowed, 16-frame captioned board for review, clean scenes for film, channel-native data comparisons instead of promised virality. New versions stay in SAME numbered Drive movie folder. **Drive hosts MP4 and publishing assets; GitHub hosts source and QA only; NO GitHub Releases.** Newer rule overrides previous instructions requiring MP4 GitHub release.

## YouTube Private upload (Superpowers skill integration)

For tasks that explicitly request YouTube delivery of a QA-approved video, read **[the canonical YouTube Private Publisher skill](.claude/skills/youtube-private-publisher/SKILL.md)**. The repository-local skill follows a Superpowers-style plan → tests → dry-run → verified execution → evidence workflow and preserves all existing video production stages and `.agents/rules/` gates. It does **not** modify the globally installed Superpowers plugin.

- **Default target**: `OLISE_MAN` → `@olise-man`, pinned verified Channel ID `UCY3n3Nlqyo6uI4GU8nuX-5g`. Another channel requires explicit user selection, an allowlist entry and separate channel-specific OAuth grant.
- **Execution**: use the already-tested `.github/workflows/youtube-longform-private.yml` with private Google Drive FINAL MP4 and 1280×720 thumbnail IDs, plus a reviewed English `config/films/<slug>.json` with accurate title, description, tags, audience and altered-content flags. Run `execute=false` dry-run first. Only run `execute=true` after this exact film, metadata and Private upload are authorized; never switch to Public automatically.
- **Security and evidence**: secrets stay in GitHub Actions Secrets, never logs, chat, or commits. Verify correct OAuth Channel ID, FINAL QA, real Drive file IDs, duplicate marker and the actual GitHub Actions receipt/YouTube video ID. Missing dispatch capability means **ready to upload, not uploaded**. A successful API upload does not imply YouTube finished 2K transcoding.
- **Original packaging**: deliver an actual story-matched thumbnail, accurate compelling English title and description, and review their consistency with the movie's hook and payoff. Don't claim guaranteed CTR, virality or monetization.
- **Existing proof**: `THE GIRL WITH 1%` uploaded once to Olise in **Private** mode at `https://www.youtube.com/watch?v=YCv2D1om_Vg`; do not reupload that file by default. The temporary one-shot workflow was removed after the success.

## Owner YouTube Channel Portfolio & Growth Direction

These are the owner's 5 active YouTube channels (**all 5 channels are managed under the SAME single Gmail/Google account as Brand Accounts** — always verify the exact `channel_id` and per-channel OAuth refresh token before uploading so uploads never land on the wrong Brand Account).

> [!IMPORTANT]
> **1-MONTH MONETIZATION DEADLINE (BOSS MANDATE):** All 5 channels share a critical **1-month deadline to qualify for YouTube Partner Program (YPP) monetization** (1,000 subscribers + 4,000 valid public watch hours in 12 months, or 10M valid public Shorts views in 90 days), or the project risks cancellation. Every agent must prioritize **high-retention hooks, consistent upload cadence, Shorts-to-longform watch-time funnels, strict `youtube-agent-skill` packaging (`title.py` + `yt-seo`), and 100% original YPP-safe content** (never guarantee YPP approval or views, but optimize every workflow step toward real watch hours, subs, and policy compliance).

Always tailor scripts, visual style, voice selection, pacing, thumbnails, SEO metadata, and upload defaults to the target channel's distinct identity:

1. **Hẻm Chuyện Lạ** (`https://www.youtube.com/@HemChuyenLa` | key: `HEM_CHUYEN_LA` | ID: `UC4zHyyv2YnYGv1xbyuZzteA`)
   - **Positioning**: Vietnamese horror, urban legends, spiritual folklore, and creepy mystery storytelling (`make-horror-video`, `truyenma-studio`, Option A/B/C *Dạ Hành Dị Tạp*).
   - **Format & Direction**: 9:16 Shorts hooks (taboo-and-twist) feeding 25–35 min 16:9 long-form episodes; silence-then-hit horror sound design, atmospheric dark lighting, zero-box crisp subtitles, high-curiosity honest thumbnails.
2. **Khủng Long Tí Hon** (`https://www.youtube.com/@TinyRex01` | key: `TINY_REX` | ID: `UChoJn1aAPcs2xWgEhaCcpQA`)
   - **Positioning**: Vietnamese science, prehistoric survival, and surprising evolutionary relatives starring **Tí Hon v3.0** (`thanhhai-2d-studio`, `/engine/tihon.js`).
   - **Format & Direction**: High-retention 9:16 24fps Shorts (`<= 60s`, 3-second A/B quiz + DNA reveal) bridging to 6–8 min 1440p 16:9 episodes; dark manga-ink or 3D DNA-contrast thumbnails, `-14.0 LUFS` mastering, `upload_defaults` in `config/youtube-channel-targets.json`.
3. **Tech Cà Chớn** (`https://www.youtube.com/@TechC%C3%A0Ch%E1%BB%9Bn` | key: `TECH_CA_CHON` | ID: `UCPy649MXLinlhyxnc2OQHxg`)
   - **Positioning**: Vietnamese tech, AI tools, coding, and digital life explained with witty, satirical, relatable humor.
   - **Format & Direction**: Fast-cut 9:16 Shorts myth-busting/hot-takes + concise 16:9 visual explainers; punchy numbers/comparisons, high-contrast tech thumbnails, zero jargon bloat.
4. **Olise Man** (`https://www.youtube.com/@olise-man` | key: `OLISE_MAN` | ID: `UCY3n3Nlqyo6uI4GU8nuX-5g`)
   - **Positioning**: English-language emotional, psychological, and allegorical 2D/2.5D animated short films (`THE GIRL WITH 1%` benchmark).
   - **Format & Direction**: Cinematic 16:9 2K/1440p storytelling and 9:16 Shorts; English VO & packaging, expressive silhouette/lighting direction, strong visual payoff without cliché motivational filler.
5. **Sống Chậm Lại** (`https://www.youtube.com/@song.cham.lai01` | handle: `@song.cham.lai01`, pending `config/youtube-channel-targets.json` + OAuth setup when ready to upload)
   - **Positioning**: Vietnamese slow living, mindfulness, emotional healing, and quiet life reflections (`Ray Emotional Stick Shorts` / calm 2D aesthetic).
   - **Format & Direction**: Warm, soothing 9:16 Shorts and calming 16:9 essays; gentle Vbee narration, soft fades (`0.35–0.55s`), empathetic hooks aimed at saves, shares, and thoughtful comments rather than shock value.

### YouTube OAuth, Privacy & Upload Standards (All Channels)

- **Canonical Desktop OAuth Client:** Always mint channel refresh tokens using `~/Downloads/desktop-oauth.json` (`909606990285-a2c4k1kevreg997k6q1m7kbfnm4o1nlk`) with `--comments` so `youtube.force-ssl` is granted alongside `youtube.upload` and `youtube.readonly` (required for `videos.update`, scheduling `publishAt`, and posting comments):
  ```bash
  python3 scripts/youtube_oauth_setup.py --client-secret ~/Downloads/desktop-oauth.json --provider youtube --channel <CHANNEL_KEY> --comments --overwrite
  ```
  Never use Web App OAuth JSONs (e.g. `client_secret_*` bound to `localhost:3000/api/auth/callback`).
- **Hide Like Count by Default:** Every video uploaded across all channels MUST default to `publicStatsViewable: false` (uncheck *"Hiện số người thích video này"*), enforced in `scripts/youtube_multi_channel.py` (`build_video_body`).
- **Shorts Series Packaging & Cadence:** Prefix serialized Shorts titles with `Tập N:` and append `#shorts` + niche hashtags (`#truyenma #hemchuyenla`, etc.) after the core `<= 40`-char hook. Publish/schedule consistently at **1 Short/day** (19:00–20:00 `UTC+7`) rather than bulk-dumping multiple episodes at once. Always work directly on `main`.

