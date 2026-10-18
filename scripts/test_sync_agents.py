import tomllib
import unittest
from pathlib import Path

from scripts import sync_agents

ROOT = Path(__file__).resolve().parents[1]


class SyncAgentsTest(unittest.TestCase):
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

    def test_reviewers_can_write_their_report_in_opencode(self):
        meta = {"tools": "Read, Write, Glob, Grep"}
        self.assertEqual(sync_agents.permission(meta), {"edit": "allow", "bash": "deny", "webfetch": "deny"})

    def test_hand_written_opencode_director_is_kept(self):
        self.assertIn("mode: primary", (ROOT / ".opencode/agents/video-director.md").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
