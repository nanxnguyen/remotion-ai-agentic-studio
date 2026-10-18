"""Quality parity protections between Monitor one-shot and IDE video workflows.

These tests do not run providers or render video; they verify that the monitor
cannot silently downgrade models and includes the same canonical quality gates.
"""
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts import pipeline


class MonitorQualityTests(unittest.TestCase):
    def test_creation_prompt_requires_full_quality_skill_and_real_review_evidence(self):
        req = {
            "video": "video-probe", "comp": "VideoProbe", "voice_slug": "tbd",
            "profile": "story", "duplicate_note": "none",
            "runner": "opencode", "model": "some/model",
            "effort": "high", "fallback": False,
            "topic": "An emotional story", "voice_name": "", "voice": "",
            "clone_ok": False, "reference": "", "avoid": "", "min_s": 30,
            "max_s": 45, "light": False, "mandatory": "", "sources": "",
            "notes": "",
        }
        prompt = pipeline.create_prompt(req)
        for marker in (
            ".claude/skills/ray-pineline-worflow-agent/SKILL.md",
            "independent reviewer", "representative frames", "sound design",
            "Do not compress or skip any phase",
            "## Quality acceptance (IDE-equivalent)",
        ):
            with self.subTest(marker=marker):
                self.assertIn(marker, prompt)
        self.assertIn("Model / reasoning | some/model / high", prompt)
        self.assertIn("Allow lower-model fallback | no", prompt)

    def test_fallback_is_opt_in_not_implicit(self):
        with patch.object(pipeline, "runners", return_value={
            "opencode": {"ladder": True, "path": "/usr/bin/opencode",
                         "model_args": ["--model", "{model}"], "efforts": []}
        }), patch.object(pipeline, "runner_models", return_value=[
            {"id": "provider/strong", "label": "Strong"},
        ]):
            default = pipeline.run_options("opencode", {})
            self.assertFalse(default["fallback"])
            self.assertTrue(pipeline.run_options("opencode", {"fallback": True})["fallback"])
            self.assertFalse(pipeline.run_options("opencode", {"fallback": False})["fallback"])

    def test_disabled_fallback_cannot_lower_model_or_switch_provider(self):
        with tempfile.TemporaryDirectory() as folder:
            temp_root = Path(folder)
            (temp_root / "job.prompt.md").write_text("Full video quality", encoding="utf8")
            with patch.object(pipeline, "ROOT", temp_root), \
                 patch.object(pipeline, "quota_error", return_value="quota exceeded"), \
                 patch.object(pipeline, "lower_model") as lower, \
                 patch.object(pipeline, "launch_run") as launch, \
                 patch.object(pipeline, "fallback_runner") as switch, \
                 patch.object(pipeline, "_record_run") as record:
                for settings in (
                    {"fallback": False},
                    {},  # a missing fallback flag also means opt out
                ):
                    run = {
                        "id": "monitor-quality", "runner": "opencode",
                        "state": "failed", "prompt_file": "job.prompt.md",
                        "model": "provider/strong", **settings,
                    }
                    self.assertIsNone(pipeline.maybe_fallback("video-probe", run))
                lower.assert_not_called()
                launch.assert_not_called()
                switch.assert_not_called()
                self.assertEqual(record.call_count, 2)


if __name__ == "__main__":
    unittest.main()
