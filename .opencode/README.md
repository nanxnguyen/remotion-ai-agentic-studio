# OpenCode adapter

OpenCode **already discovers** `.claude/skills/ray-pineline-worflow-agent/SKILL.md` as a compatible skill. We deliberately **do not copy** the 61 KB workflow into `.opencode/skills/` to avoid conflicting versions.

## Use

From the repository root, start OpenCode:

```bash
opencode
```

Choose the custom **video-director** agent (or address `@video-director` if supported by your OpenCode UI), then ask in Vietnamese:

> Sản xuất video story 9:16 từ chủ đề "[chủ đề]" theo skill ray-pineline-worflow-agent; chạy review gates và báo file MP4 cuối.

The agent reads `AGENTS.md` and loads the skill using OpenCode's native skill tool. The original skill remains at `.claude/skills/ray-pineline-worflow-agent/SKILL.md` and is **not modified** by this integration.

**Requirements:** Node 22, npm dependencies, Python 3.12+, FFmpeg and FFprobe; voice and AI providers depend on your production profile. Check `npm run verify` before delivery.

**Limitations:** The original workflow contains Claude-specific subagent and message APIs. The adapter translates them to OpenCode's capabilities where supported, otherwise uses sequential specialist work. This is instruction-level compatibility, not a promise that all 19 Claude agents run in parallel or that one command produces an MP4 without configured providers. Keep reviewers separate from producers and never fabricate gate scores.

References: https://opencode.ai/docs/skills/ and https://opencode.ai/docs/agents/
