"""Creation order and native video-director quality parity for the Monitor.

Runs without external providers or starting a paid AI generation job.
"""
import argparse
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts import pipeline as p


class VideoCreationOrderTests(unittest.TestCase):
    def test_new_init_persists_immutable_timestamp(self):
        with tempfile.TemporaryDirectory() as temp, patch.object(p, "DOCS", Path(temp)):
            args = argparse.Namespace(folder="a-new-video", comp="ANewVideo",
                                      voice="tbd", profile="story", name="A New Video",
                                      audio=None, out=None, qa=None, gates=None)
            p.cmd_init(args)
            created = p.load("a-new-video")["created"]
            self.assertTrue(created and "+" in created)
            with p.status_lock("a-new-video"):
                state = p.load("a-new-video")
                state["next"] = "work in progress"
                p.save("a-new-video", state)
            self.assertEqual(created, p.load("a-new-video")["created"])
            self.assertEqual(created, p.video_created_at(p.load("a-new-video")))

    def test_newest_first_uses_created_not_updated(self):
        with tempfile.TemporaryDirectory() as temp, patch.object(p, "DOCS", Path(temp)):
            fixtures = [
                ("old", {"created": "2026-10-01T09:00:00+07:00",
                         "updated": "2026-10-18T22:00:00+07:00"}),
                ("new", {"created": "2026-10-18T09:00:00+07:00",
                         "updated": "2026-10-18T09:00:01+07:00"}),
                ("legacy", {"log": [{"msg": "status initialised",
                                     "t": "2026-10-10T08:00:00+07:00"}],
                            "updated": "2026-10-18T23:59:59+07:00"}),
            ]
            for slug, state in fixtures:
                path = Path(temp) / slug / "status.json"
                path.parent.mkdir(parents=True)
                path.write_text(json.dumps(state), encoding="utf8")
            with patch.object(p, "view", side_effect=lambda name: {"folder": name}):
                actual = p.all_views()
            self.assertEqual([item["folder"] for item in actual],
                             ["new", "legacy", "old"])

    def test_legacy_creation_does_not_require_file_migration(self):
        self.assertEqual(
            p.video_created_at({"log": [{"t": "2026-10-18T12:01:00+07:00",
                                         "msg": "status initialised"}]}),
            "2026-10-18T12:01:00+07:00")


class MonitorQualityParityTests(unittest.TestCase):
    def test_native_video_director_not_default_generic_agent(self):
        for runner in ("opencode", "claude"):
            with self.subTest(runner=runner):
                spec = p.DEFAULT_RUNNERS[runner]
                cmd = p.runner_cmd({**spec, "path": "/tmp/" + runner},
                                   "out/agent-runs/run.prompt.md", {})
                self.assertIn("--agent", cmd)
                self.assertEqual(cmd[cmd.index("--agent") + 1], "video-director")

    def test_disabled_fallback_never_downgrades_model(self):
        with tempfile.TemporaryDirectory() as temp:
            prompt = Path(temp) / "prompt.md"
            prompt.write_text("Produce a real video with independent QA.", encoding="utf8")
            run = {"id": "run-test", "runner": "opencode", "label": "OpenCode",
                   "model": "top-tier", "effort": "high", "kind": "create",
                   "state": "failed", "prompt_file": "prompt.md", "fallback": False}
            with (patch.object(p, "ROOT", Path(temp)),
                  patch.object(p, "quota_error", return_value="quota exceeded"),
                  patch.object(p, "_record_run") as record,
                  patch.object(p, "lower_model") as downgrade,
                  patch.object(p, "launch_run") as launch):
                outcome = p.maybe_fallback("video-test", run)
            self.assertIsNone(outcome)
            self.assertFalse(downgrade.called)
            self.assertFalse(launch.called)
            self.assertIn("quality lock", record.call_args.args[-1])

    def test_no_shortcut_quality_contract(self):
        preamble = p.RULES_PREAMBLE
        self.assertIn("SAME production workflow", preamble)
        self.assertIn("video-director", preamble)
        self.assertIn("SKILL.md", preamble)
        self.assertIn("audit", preamble)


if __name__ == "__main__":
    unittest.main()
