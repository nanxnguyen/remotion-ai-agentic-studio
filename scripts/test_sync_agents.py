import tomllib
import unittest
from pathlib import Path

from scripts import sync_agents

ROOT = Path(__file__).resolve().parents[1]


class SyncAgentsTest(unittest.TestCase):
    def test_claude_skill_is_the_single_source_of_truth(self):
        """The .agents path is a working alias, never another editable skill copy."""
        self.assertEqual(sync_agents.skill_alias_errors(), [])
        canonical = sync_agents.CANONICAL_SKILL
        alias = sync_agents.SHARED_SKILL
        self.assertTrue(canonical.is_dir())
        self.assertFalse(canonical.is_symlink())
        self.assertTrue(alias.is_symlink())
        self.assertEqual(alias.resolve(), canonical.resolve())
        for filename in ("SKILL.md", "references/architecture-contract.md",
                         "references/hook-engineering.md", "schemas/review-gates.json"):
            self.assertEqual((canonical / filename).read_bytes(),
                             (alias / filename).read_bytes())

    def test_generated_agent_files_match_the_roles(self):
        self.assertEqual(sync_agents.stale(), [], "run: python3 scripts/sync_agents.py")

    def test_every_role_is_generated_for_every_runtime(self):
        for role in sorted(sync_agents.ROLES.glob("*.md")):
            name = role.stem
            meta, body = sync_agents.parse(role)
            self.assertEqual(meta["name"], name)
            self.assertNotIn("SendMessage", body, f"{name}: role bodies must stay runtime-neutral")

            claude = (ROOT / ".claude/agents" / f"{name}.md").read_text(encoding="utf-8")
            self.assertTrue(claude.startswith(f"---\nname: {name}\n"))  # pipeline.roster() parses this header

            opencode = (ROOT / ".opencode/agents" / f"{name}.md").read_text(encoding="utf-8")
            self.assertIn("\nmode: subagent\n", opencode)
            writes = {"Write", "Edit"} & set(sync_agents.tools(meta))
            self.assertIn(f"  edit: {'allow' if writes else 'deny'}\n", opencode)

            codex = tomllib.loads((ROOT / ".codex/agents" / f"{name}.toml").read_text(encoding="utf-8"))
            self.assertEqual(codex["name"], name)
            self.assertEqual(codex["description"], meta["description"])
            self.assertEqual(codex["developer_instructions"].strip(), body.strip())

    def test_motion_workflow_roles_and_independent_review_contract(self):
        producer = ROOT / ".agents/roles/motion-agent.md"
        reviewer = ROOT / ".agents/roles/motion-reviewer.md"
        self.assertTrue(producer.is_file())
        self.assertTrue(reviewer.is_file())
        _, producer_body = sync_agents.parse(producer)
        _, reviewer_body = sync_agents.parse(reviewer)
        self.assertIn("motion-proto/", producer_body)
        self.assertIn("motion-spec.md", producer_body)
        self.assertIn("clean context", reviewer_body)
        self.assertIn("9/10", reviewer_body)
        self.assertIn("motion-review.md", reviewer_body)
        skill = (ROOT / ".agents/skills/ray-pineline-worflow-agent/SKILL.md").read_text(encoding="utf-8")
        self.assertLess(skill.index("## Phase 4a"), skill.index("## Phase 4b"))
        self.assertLess(skill.index("## Phase 4b"), skill.index("## Phase 5"))
        self.assertIn("workflow v4", skill)

    def test_voice_direction_and_performance_contract_is_shared(self):
        skill = (ROOT / ".agents/skills/ray-pineline-worflow-agent/SKILL.md").read_text(encoding="utf-8")
        self.assertIn("Phase 2b — Voice Direction", skill)
        self.assertIn("voice-direction.md", skill)
        self.assertIn("voice-performance.proposed.json", skill)
        self.assertIn("voice-performance.json", skill)
        self.assertIn("Anh-Khoi-Ke-Chuyen", skill)
        self.assertIn("Thanh-Long-Nang-Cao", skill)
        self.assertIn("Ngoc-Huyen", skill)
        self.assertIn("maximum three candidates per phrase", skill)
        self.assertIn("cannot prove naturalness", skill)

        expected = {
            "script-agent": ("voice-direction.md", "voice-performance.proposed.json"),
            "script-reviewer": ("voice-direction.md", "voice-performance.proposed.json"),
            "voice-agent": ("voice-direction.md", "voice-performance.json"),
            "audio-reviewer": ("Technical fidelity", "Performance evidence"),
            "motion-agent": ("voice-performance.json", "accent and pause"),
            "integration-reviewer": ("voice-performance.json", "naturalness"),
            "render-agent": ("voice-performance.json", "accent and pause"),
            "qa-agent": ("voice-performance.json", "accent and pause"),
        }
        for name, needles in expected.items():
            _, body = sync_agents.parse(ROOT / ".agents/roles" / f"{name}.md")
            for needle in needles:
                self.assertIn(needle, body, f"{name} must consume the voice-performance contract")

    def test_reviewers_can_write_their_report_in_opencode(self):
        meta = {"tools": "Read, Write, Glob, Grep"}
        self.assertEqual(sync_agents.permission(meta), {"edit": "allow", "bash": "deny", "webfetch": "deny"})

    def test_hand_written_opencode_director_is_kept(self):
        self.assertIn("mode: primary", (ROOT / ".opencode/agents/video-director.md").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
