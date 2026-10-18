"""Regression checks for native interactive CLI model/effort selection.

These tests don't launch provider CLIs or require credentials.
"""
import unittest
from unittest.mock import patch

from scripts import pipeline


class TerminalModelEffortTests(unittest.TestCase):
    def invoke(self, provider, model="", effort=""):
        with patch.object(pipeline.shutil, "which", return_value="/usr/local/bin/" + provider):
            return pipeline.terminal_command(provider, model, effort)

    def test_claude_passes_both_model_and_effort(self):
        self.assertEqual(
            self.invoke("claude", "opus", "high"),
            ["/usr/local/bin/claude", "--model", "opus", "--effort", "high"],
        )

    def test_codex_uses_toml_reasoning_effort_configuration(self):
        self.assertEqual(
            self.invoke("codex", "gpt-6", "xhigh"),
            ["/usr/local/bin/codex", "-m", "gpt-6",
             "-c", 'model_reasoning_effort="xhigh"'],
        )

    def test_opencode_model_variant(self):
        self.assertEqual(
            self.invoke("opencode", "opencode/test-model", "high"),
            ["/usr/local/bin/opencode", "--model", "opencode/test-model#high"],
        )

    def test_default_cli_behavior(self):
        self.assertEqual(self.invoke("opencode"), ["/usr/local/bin/opencode"])
        self.assertEqual(
            self.invoke("claude", effort="medium"),
            ["/usr/local/bin/claude", "--effort", "medium"],
        )

    def test_unsupported_effort_fails_loudly(self):
        with self.assertRaisesRegex(ValueError, "unsupported"):
            self.invoke("codex", "gpt-6", "ultimate")
        with self.assertRaisesRegex(ValueError, "requires a selected model"):
            self.invoke("opencode", effort="high")

    def test_invalid_model_cannot_bypass_effort_validation(self):
        for model in ["my/model#max", "my model", "model;echo hello"]:
            with self.subTest(model=model), self.assertRaises(ValueError):
                self.invoke("opencode", model, "low")

    def test_uninstalled_provider_is_rejected(self):
        with patch.object(pipeline.shutil, "which", return_value=None):
            with self.assertRaises(LookupError):
                pipeline.terminal_command("claude", "opus", "high")


if __name__ == "__main__":
    unittest.main()
