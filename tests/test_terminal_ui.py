"""Command-dock-only UI regression tests.

The main monitor components must not be replaced by a simplified mock dashboard.
"""
import re
import shutil
import subprocess
import unittest
from html.parser import HTMLParser
from pathlib import Path

HTML = Path(__file__).resolve().parents[1] / "scripts" / "monitor.html"


class Tags(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.stack = []
        self.command_dock = None
        self.header = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag not in {"script", "link"}:
            self.tags.append((tag, attrs))
        if attrs.get("id") == "command-dock":
            self.command_dock = attrs
        if tag == "button" and attrs.get("id") in {"create-video", "terminal-toggle"}:
            self.header.append(attrs["id"])


class TerminalUiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = HTML.read_text(encoding="utf-8")
        cls.tags = Tags()
        cls.tags.feed(cls.text)

    def test_hidden_by_default_and_explicit_header_toggle(self):
        self.assertIsNotNone(self.tags.command_dock)
        self.assertIn("hidden", self.tags.command_dock)
        buttons = self.tags.header
        self.assertEqual(buttons, ["create-video", "terminal-toggle"])
        self.assertIn('aria-controls="command-dock"', self.text)
        self.assertIn('aria-expanded="false"', self.text)
        self.assertIn("dock.hidden=!open", self.text)
        self.assertIn('#command-dock[hidden]{display:none!important}', self.text)

    def test_native_workflow_sections_still_render(self):
        for source in (
            'id="list"', 'id="main"', 'id="create-dialog"',
            'function orchestration(', 'function overview(', 'function pipeline(',
            'function reviewsAndLogs(', 'function renderMain(',
        ):
            with self.subTest(source=source):
                self.assertIn(source, self.text)
        self.assertEqual(self.text.count('id="command-dock"'), 1)
        self.assertEqual(self.text.count('id="terminal-toggle"'), 1)

    def test_model_and_effort_are_sent_to_real_terminal(self):
        for source in (
            'id="term-provider"', 'id="term-model"', 'id="term-effort"',
            "model,effort,", "window.addEventListener('agent-terminal:open'",
            "if(document.getElementById(\"command-dock\").hidden||!session||waiting)return;",
        ):
            with self.subTest(source=source):
                self.assertIn(source, self.text)

    def test_sidebar_switch_does_not_leak_keyboard_or_output(self):
        self.assertIn("document.addEventListener('click',event=>", self.text)
        self.assertIn("event.target.closest('[data-v]')", self.text)
        self.assertIn("const sentTo=session.id,videoForInput=video;", self.text)
        self.assertIn("if(!session||activeId!==session.id||activeVideo!==video)return;", self.text)
        self.assertIn("decoder.decode(bytes,{stream:true})", self.text)

    @unittest.skipUnless(shutil.which("node"), "Node.js needed for JS syntax checks")
    def test_inline_terminal_javascript_parses(self):
        scripts = re.findall(r"<script(?:\s[^>]*)?>([\s\S]*?)</script>", self.text)
        relevant = [js for js in scripts if "agent-terminal:open" in js]
        self.assertGreaterEqual(len(relevant), 2)
        for js in relevant:
            result = subprocess.run(["node", "--check", "--input-type=commonjs"],
                                    input=js, text=True, capture_output=True)
            self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
