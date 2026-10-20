# Ray Video 10 Phút — repo integration

Display name **ray-video-10-phút**; technical Agent Skills slug **`ray-video-10-phut`**. The ASCII slug is required by Agent Skills' lowercase ASCII name validation and must equal the folder name.

## Installation (non-destructive)

From an extracted ZIP, run:

```bash
python3 ray-video-10-phut/scripts/install.py --repo /absolute/path/to/remotion-ai-agentic-studio
```

This copies the skill into `.claude/skills/ray-video-10-phut` and links it from `.agents/skills/ray-video-10-phut` when possible, matching the existing repo layout. No existing skill will be overwritten. Review generated files before committing; installer does not run package installs or modify `pipeline.py`/existing skill.

Alternatively manually copy the whole `ray-video-10-phut/` folder to the repo's `.claude/skills/` and create a relative symlink in `.agents/skills/`. Preserve the base `ray-pineline-worflow-agent` unchanged.

```bash
python3 ray-video-10-phut/scripts/validate_skill.py --skill ray-video-10-phut
```

Once installed, invoke:

```text
Use ray-video-10-phut to produce a 35-second knowledge Reel about <topic>, with a strong truthful hook, distinctive visuals, Remotion motion, and an end-to-end 10-minute target. Keep every original pipeline gate and QA check.
```

## What is and isn't included

- **Included:** full SKILL.md orchestration, seven topic-specific references, creative brief and eval templates, installer and a static validator.
- **Expected from repo:** original 11-stage v4 pipeline, review contracts, agents, voice engines, Remotion components and monitor.
- **Optional external upstream skills:** official Anthropic `frontend-design` and Remotion `remotion-best-practices`, `remotion-markup`, `remotion-captions`. Read their local installation when available; no automatic external installation and no copyrighted source copied into this package.
- **Not done here:** changes/commits to the remote GitHub repo, real MP4 rendering, runtime benchmark or proof that target ≤600s is achievable.

## Source references

- Base project: https://github.com/nanxnguyen/remotion-ai-agentic-studio
- Official frontend-design: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
- Official Remotion skills: https://www.remotion.dev/docs/ai/skills
- Skill name rules: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
