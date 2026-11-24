import importlib.util
import json
import sys
import tempfile
import threading
import time
import unittest
from pathlib import Path
from unittest import mock


def load_module():
    path = Path(__file__).resolve().parents[1] / "scripts" / "gen-story-vbee-batch.py"
    spec = importlib.util.spec_from_file_location("gen_story_vbee_batch", path)
    mod = importlib.util.module_from_spec(spec)
    sys.modules["gen_story_vbee_batch"] = mod
    spec.loader.exec_module(mod)
    return mod


def fake_mp3_bytes(duration_sec: float = 2.0) -> bytes:
    payload_len = int(duration_sec * 128000 / 8)
    return b"ID3\x03\x00\x00\x00\x00\x00\x00" + (b"\xff\xfb\x90\x00" + b"\x00" * (payload_len - 4))


class GenStoryVbeeBatchTests(unittest.TestCase):
    def test_parallel_batch_preserves_order_and_hashes(self):
        mod = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            timeline_path = tmp_path / "shotlist.json"
            out_dir = tmp_path / "audio"
            shots = [{"id": i, "narration": f"Câu thoại số {i}", "duration_sec": 2.0} for i in range(1, 5)]
            timeline_path.write_text(json.dumps(shots, ensure_ascii=False), encoding="utf-8")

            active = 0
            max_active = 0
            lock = threading.Lock()

            def fake_generate(text, voice_code, speed, dest, webhook_url, **kwargs):
                nonlocal active, max_active
                with lock:
                    active += 1
                    max_active = max(max_active, active)
                time.sleep(0.05)
                dest.write_bytes(fake_mp3_bytes(2.0))
                with lock:
                    active -= 1

            with mock.patch.dict("os.environ", {"VBEE_ACCESS_TOKEN": "tok", "VBEE_APP_ID": "app"}), \
                 mock.patch.object(mod, "generate_async", side_effect=fake_generate), \
                 mock.patch.object(mod, "read_duration", return_value=2.0), \
                 mock.patch.object(sys, "argv", [
                     "gen-story-vbee-batch.py",
                     "--timeline", str(timeline_path),
                     "--out-dir", str(out_dir),
                     "--workers", "4",
                 ]):
                mod.main()

            measured = json.loads((out_dir / "measured-timeline.json").read_text(encoding="utf-8"))
            self.assertEqual([m["id"] for m in measured], [1, 2, 3, 4])
            self.assertGreaterEqual(max_active, 2)
            self.assertTrue(all(m.get("input_hash") for m in measured))

    def test_cache_and_only_scene_preserve_unchanged(self):
        mod = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            timeline_path = tmp_path / "shotlist.json"
            out_dir = tmp_path / "audio"
            shots = [
                {"id": 1, "narration": "Câu một", "duration_sec": 2.0},
                {"id": 2, "narration": "Câu hai", "duration_sec": 2.0},
                {"id": 3, "narration": "Câu ba", "duration_sec": 2.0},
            ]
            timeline_path.write_text(json.dumps(shots, ensure_ascii=False), encoding="utf-8")
            called = []

            def fake_generate(text, voice_code, speed, dest, webhook_url, **kwargs):
                called.append(text)
                dest.write_bytes(fake_mp3_bytes(2.0))

            with mock.patch.dict("os.environ", {"VBEE_ACCESS_TOKEN": "tok", "VBEE_APP_ID": "app"}), \
                 mock.patch.object(mod, "generate_async", side_effect=fake_generate), \
                 mock.patch.object(mod, "read_duration", return_value=2.0):
                with mock.patch.object(sys, "argv", [
                    "gen-story-vbee-batch.py", "--timeline", str(timeline_path), "--out-dir", str(out_dir), "--workers", "3"
                ]):
                    mod.main()
                self.assertEqual(len(called), 3)

                called.clear()
                shots[1]["narration"] = "Câu hai đã sửa"
                timeline_path.write_text(json.dumps(shots, ensure_ascii=False), encoding="utf-8")
                with mock.patch.object(sys, "argv", [
                    "gen-story-vbee-batch.py", "--timeline", str(timeline_path), "--out-dir", str(out_dir), "--workers", "3"
                ]):
                    mod.main()
                self.assertEqual(called, ["Câu hai đã sửa"])

                called.clear()
                with mock.patch.object(sys, "argv", [
                    "gen-story-vbee-batch.py", "--timeline", str(timeline_path), "--out-dir", str(out_dir),
                    "--only-scene", "1", "--no-cache"
                ]):
                    mod.main()
                self.assertEqual(called, ["Câu một"])
                measured = json.loads((out_dir / "measured-timeline.json").read_text(encoding="utf-8"))
                self.assertEqual([m["id"] for m in measured], [1, 2, 3])
                self.assertEqual(measured[1]["text"], "Câu hai đã sửa")

    def test_single_narration_mode(self):
        mod = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            txt_path = tmp_path / "narration.txt"
            out_dir = tmp_path / "audio"
            txt_path.write_text("Một đoạn văn ngắn để đọc liền mạch.", encoding="utf-8")
            called = []

            def fake_generate(text, voice_code, speed, dest, webhook_url, **kwargs):
                called.append((text, dest.name))
                dest.write_bytes(fake_mp3_bytes(3.5))

            with mock.patch.dict("os.environ", {"VBEE_ACCESS_TOKEN": "tok", "VBEE_APP_ID": "app"}), \
                 mock.patch.object(mod, "generate_async", side_effect=fake_generate), \
                 mock.patch.object(mod, "read_duration", return_value=3.5), \
                 mock.patch.object(sys, "argv", [
                     "gen-story-vbee-batch.py", "--single-narration", str(txt_path), "--out-dir", str(out_dir)
                 ]):
                mod.main()

            self.assertEqual(called, [("Một đoạn văn ngắn để đọc liền mạch.", "voiceover.mp3")])
            self.assertTrue((out_dir / "voiceover.mp3").exists())
            measured = json.loads((out_dir / "measured-timeline.json").read_text(encoding="utf-8"))
            self.assertEqual(len(measured), 1)
            self.assertEqual(measured[0]["audio_file"], "voiceover.mp3")

    def test_fast_poll_schedule(self):
        mod = load_module()
        self.assertLessEqual(mod.POLL_SCHEDULE[0], 1.2)
        self.assertLess(sum(mod.POLL_SCHEDULE[:3]), 5.0)

    def test_request_json_retries_on_429(self):
        import io
        import urllib.error
        import urllib.request

        mod = load_module()
        calls = 0

        class FakeResp:
            def __enter__(self):
                return self

            def __exit__(self, *args):
                return False

            def read(self, _n):
                return b'{"requestId": "ok-123"}'

        def fake_urlopen(_req, timeout=90):
            nonlocal calls
            calls += 1
            if calls == 1:
                raise urllib.error.HTTPError("https://api.vbee.vn/v1/tts", 429, "Too Many Requests", {}, io.BytesIO(b"{}"))
            return FakeResp()

        with mock.patch.object(mod.time, "sleep", return_value=None), \
             mock.patch.object(mod.urllib.request, "urlopen", side_effect=fake_urlopen):
            res = mod.request_json(urllib.request.Request("https://api.vbee.vn/v1/tts"))
        self.assertEqual(calls, 2)
        self.assertEqual(res["requestId"], "ok-123")


if __name__ == "__main__":
    unittest.main()
