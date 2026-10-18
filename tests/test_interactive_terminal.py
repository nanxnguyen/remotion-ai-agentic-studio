"""Interactive terminal tests with a harmless local Python process (no API credentials)."""
import os
import sys
import time
import unittest
from pathlib import Path
from unittest.mock import patch
from scripts import interactive_terminal as t


@unittest.skipIf(os.name == "nt", "POSIX PTY requires macOS/Linux")
class TerminalTests(unittest.TestCase):
    def test_real_pty_roundtrip_and_exit(self):
        command = [sys.executable, "-u", "-c", "print('READY', flush=True); line=input(); print('ECHO:'+line, flush=True)"]
        session = t.start("test-video", "opencode", command, Path.cwd(), model="provider/model", effort="high")
        self.addCleanup(lambda: session.stop())
        collected = ""
        deadline = time.time() + 6
        while "READY" not in collected and time.time() < deadline:
            output = session.poll(0)
            import base64
            collected = base64.b64decode(output["output"]).decode("utf8", "replace")
            time.sleep(.04)
        self.assertIn("READY", collected)
        session.input("hello\r")
        deadline = time.time() + 6
        while "ECHO:hello" not in collected and time.time() < deadline:
            collected = base64.b64decode(session.poll(0)["output"]).decode("utf8", "replace")
            time.sleep(.04)
        self.assertIn("ECHO:hello", collected)
        self.assertEqual(t.get(session.id, "test-video").id, session.id)
        self.assertEqual(session.poll(0)["model"], "provider/model")
        self.assertEqual(session.poll(0)["effort"], "high")
        self.assertEqual(t.sessions("test-video")[0]["model"], "provider/model")
        with self.assertRaises(KeyError):
            t.get(session.id, "another-video")

    def test_bounded_scrollback_uses_absolute_offsets(self):
        import base64
        import threading
        obj = t.Session.__new__(t.Session)
        obj.id, obj.video, obj.provider = "s", "vid", "opencode"
        obj.model, obj.effort, obj.state = "", "", "exited"
        obj.lock = threading.RLock()
        obj.output_start = 42
        obj.output = bytearray(b"0123456789")
        first = obj.poll(0)
        self.assertTrue(first["truncated"])
        self.assertEqual(base64.b64decode(first["output"]), b"0123456789")
        self.assertEqual(first["offset"], 52)
        second = obj.poll(47)
        self.assertFalse(second["truncated"])
        self.assertEqual(base64.b64decode(second["output"]), b"56789")

    def test_provider_allowlist(self):
        with self.assertRaises(ValueError):
            t.start("test-video", "shell", [sys.executable], Path.cwd())


if __name__ == "__main__":
    unittest.main()
