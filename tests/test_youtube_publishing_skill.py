"""Regression checks for repository-local Superpowers YouTube publishing skill.

These tests never contact Google/YouTube or attempt publishing.
"""
from pathlib import Path
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / ".claude/skills/youtube-private-publisher/SKILL.md"
MIRROR = ROOT / "plugins/youtube-private-publisher/skills/youtube-private-publisher/SKILL.md"
AGENT_ENTRY = ROOT / ".agents/skills/youtube-private-publisher/SKILL.md"


class SuperpowersPublisherSkillTests(unittest.TestCase):
    def test_script_and_workflow_still_exist(self):
        self.assertTrue((ROOT / "scripts/youtube_multi_channel.py").is_file())
        self.assertTrue((ROOT / ".github/workflows/youtube-longform-private.yml").is_file())

    def test_skill_canonical_and_mirror_match(self):
        self.assertTrue(SKILL.is_file())
        self.assertTrue(MIRROR.is_file())
        text = SKILL.read_text(encoding="utf-8")
        self.assertEqual(text, MIRROR.read_text(encoding="utf-8"))
        for marker in (
            "execute=false",
            "execute=true",
            "YOUTUBE_REFRESH_TOKEN_<CHANNEL>",
            "scripts/youtube_multi_channel.py",
            "youtube-longform-private.yml",
            "Private",
        ):
            self.assertIn(marker, text)
        self.assertTrue(AGENT_ENTRY.is_file())

    def test_agent_guide_uses_canonical_skill(self):
        guide = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
        self.assertIn(".claude/skills/youtube-private-publisher/SKILL.md", guide)

    def test_initial_channel_is_pinned_and_can_expand(self):
        data = json.loads((ROOT / "config/youtube-channel-targets.json").read_text(encoding="utf-8"))
        channels = data["channels"]
        self.assertEqual(channels["OLISE_MAN"]["handle"], "@olise-man")
        self.assertEqual(channels["OLISE_MAN"]["channel_id"], "UCY3n3Nlqyo6uI4GU8nuX-5g")


if __name__ == "__main__":
    unittest.main()
