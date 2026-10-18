"""Integration smoke test for the actual localhost terminal HTTP API.

Uses a harmless Python echo program inside a real PTY; no agent credentials
or network access are required. Does not change pipeline status/gates.
"""
import base64
import http.client
import json
import os
import sys
import threading
import time
import tempfile
from pathlib import Path
import unittest
from unittest.mock import patch

from scripts import pipeline


class TerminalApiTest(unittest.TestCase):
    def setUp(self):
        self.stub = patch.object(pipeline.Handler, "_load", return_value={"name": "Test"})
        self.stub.start()
        self.server = pipeline.MonitorServer(("127.0.0.1", 0), pipeline.Handler)
        self.port = self.server.server_port
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.addCleanup(self.server.server_close)
        self.addCleanup(self.server.shutdown)
        self.addCleanup(self.stub.stop)

    def request(self, method, path, body=None):
        connection = http.client.HTTPConnection("127.0.0.1", self.port, timeout=6)
        try:
            content = json.dumps(body).encode("utf-8") if body is not None else None
            headers = {"Origin": f"http://127.0.0.1:{self.port}",
                       "Content-Type": "application/json"}
            connection.request(method, path, body=content, headers=headers)
            response = connection.getresponse()
            return response.status, json.loads(response.read().decode("utf-8"))
        finally:
            connection.close()

    def test_capabilities_support_runtime_detection(self):
        code, data = self.request("GET", "/api/terminal/capabilities")
        self.assertEqual(code, 200)
        self.assertGreaterEqual(data["api_version"], 2)
        self.assertIn("opencode", data["providers"])
        self.assertEqual(data["pty_supported"], os.name != "nt")

    @unittest.skipIf(os.name == "nt", "native POSIX PTY only")
    def test_terminal_roundtrip_with_native_pty(self):
        command = [sys.executable, "-u", "-c",
                   "print('READY', flush=True); s=input(); print('ECHO:'+s, flush=True)"]
        with patch.object(pipeline, "terminal_command", return_value=command):
            code, data = self.request("POST", "/api/terminal/ui-smoke/start",
                                      {"provider": "opencode", "model": "", "effort": "",
                                       "cols": 90, "rows": 24})
        self.assertEqual(code, 201, data)
        session_id = data["id"]
        self.addCleanup(lambda: self.request("POST",
                        f"/api/terminal/ui-smoke/{session_id}/stop", {}))
        code, sessions = self.request("GET", "/api/terminal/ui-smoke/sessions")
        self.assertEqual(code, 200)
        self.assertEqual(sessions["sessions"][0]["id"], session_id)
        code, sent = self.request("POST",
                    f"/api/terminal/ui-smoke/{session_id}/input", {"data": "hello\r"})
        self.assertEqual(code, 200, sent)
        output = ""
        deadline = time.monotonic() + 6
        while time.monotonic() < deadline and "ECHO:hello" not in output:
            code, packet = self.request(
                "GET", f"/api/terminal/ui-smoke/{session_id}/output?offset=0")
            self.assertEqual(code, 200, packet)
            output = base64.b64decode(packet["output"]).decode("utf-8", "replace")
            time.sleep(.05)
        self.assertIn("READY", output)
        self.assertIn("ECHO:hello", output)

    def test_one_shot_conflict_never_spawns_a_second_agent(self):
        fake = {"folder": "ui-smoke"}
        with patch.object(pipeline, "terminal_command", return_value=[sys.executable]):
            with pipeline.LIVE_LOCK:
                pipeline.LIVE_RUNS["terminal-ui-smoke"] = fake
            try:
                code, data = self.request("POST", "/api/terminal/ui-smoke/start",
                                          {"provider": "opencode"})
            finally:
                with pipeline.LIVE_LOCK:
                    pipeline.LIVE_RUNS.pop("terminal-ui-smoke", None)
        self.assertEqual(code, 409)
        self.assertIn("one-shot agent is running", data["error"])

    def test_terminal_post_rejects_cross_origin_request(self):
        conn = http.client.HTTPConnection("127.0.0.1", self.port, timeout=6)
        try:
            conn.request("POST", "/api/terminal/ui-smoke/start",
                         json.dumps({"provider": "opencode"}),
                         {"Origin": "https://not-the-monitor.example",
                          "Content-Type": "application/json"})
            response = conn.getresponse()
            self.assertEqual(response.status, 403)
        finally:
            conn.close()

    def test_new_video_does_not_false_positive_file_mismatch(self):
        """A new v4 video is pending, not 'Lệch file', even without artifacts."""
        docs_root = pipeline.ROOT / "docs"
        docs_root.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix=".monitor-create-test-", dir=docs_root) as temp_docs:
            with patch.object(pipeline, "DOCS", Path(temp_docs)):
                code, created = self.request("POST", "/api/videos", {
                    "topic": "Video mới kiểm tra cảnh báo file",
                    "slug": "test-monitor-create-status-pending",
                    "comp": "TestMonitorCreateStatusPending",
                    "profile": "story", "runner": "", "min_seconds": 30,
                    "max_seconds": 45,
                })
                self.assertEqual(code, 201, created)
                folder = created["video"]
                self.assertTrue((Path(temp_docs) / folder / "status.json").is_file())
                status, views = self.request("GET", "/api/status")
                self.assertEqual(status, 200)
                item = next(v for v in views if v["folder"] == folder)
                self.assertFalse(any(st["mismatch"] for st in item["stages"]))
                self.assertFalse(any(st["state"] == "done" for st in item["stages"]))
                # Distinguish legitimate mismatch warnings for completed old stages:
                # A warning must never come from missing artifacts in a pending stage.

    def test_unknown_video_slug_returns_explicit_error(self):
        self.stub.stop()
        code, data = self.request("GET", "/api/terminal/non-existing-video/sessions")
        self.assertEqual(code, 404)
        self.assertEqual(data["error"], "video not found")


if __name__ == "__main__":
    unittest.main()
