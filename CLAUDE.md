# Claude Code adapter

Read and follow [AGENTS.md](AGENTS.md) as the canonical repository instructions.

The production workflow is `.agents/skills/ray-pineline-worflow-agent/SKILL.md` (`.claude/skills/ray-pineline-worflow-agent` is a symlink to it). Specialist roles are generated into `.claude/agents/` from `.agents/roles/` by `python3 scripts/sync_agents.py`: edit the role, never the generated file. Claude-specific files must not fork the workflow's rules.
