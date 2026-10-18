# OpenCode adapter

OpenCode **discovers** the workflow skill at `.agents/skills/ray-pineline-worflow-agent/SKILL.md` (also reachable through the `.claude/skills/` symlink; same file). We deliberately **do not copy** it into `.opencode/skills/` to avoid conflicting versions. The specialist subagents in `.opencode/agents/` are generated from `.agents/roles/` by `python3 scripts/sync_agents.py`; only `video-director.md` is hand-written.

## Use

From the repository root, start OpenCode:

```bash
opencode
```

Choose the custom **video-director** agent (or address `@video-director` if supported by your OpenCode UI), then ask in Vietnamese:

> Sản xuất video story 9:16 từ chủ đề "[chủ đề]" theo skill ray-pineline-worflow-agent; chạy review gates và báo file MP4 cuối.

The agent reads `AGENTS.md` and loads the skill using OpenCode's native skill tool. The skill's Runtime mapping section says how each Claude Code operation maps to OpenCode.

**Requirements:** Node 22, npm dependencies, Python 3.12+, FFmpeg and FFprobe; voice and AI providers depend on your production profile. Check `npm run verify` before delivery.

**Limitations:** The original workflow contains Claude-specific subagent and message APIs. The adapter translates them to OpenCode's capabilities where supported, otherwise uses sequential specialist work. This is instruction-level compatibility, not a promise that all 19 Claude agents run in parallel or that one command produces an MP4 without configured providers. Keep reviewers separate from producers and never fabricate gate scores.

References: https://opencode.ai/docs/skills/ and https://opencode.ai/docs/agents/
