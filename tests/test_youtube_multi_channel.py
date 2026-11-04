"""Offline tests for dynamic-channel fail-closed rules."""
import importlib.util
import json
import pathlib
import tempfile
import unittest
import unittest.mock
from unittest.mock import Mock

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("youtube_multi_channel", ROOT / "scripts" / "youtube_multi_channel.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


class FakeList:
    def __init__(self, payload):
        self.payload = payload
    def list(self, **kwargs):
        return Mock(execute=lambda: {"items": self.payload["owned" if kwargs.get("mine") else "public"]})


class ChannelTests(unittest.TestCase):
    def test_allowed_channel(self):
        with tempfile.TemporaryDirectory() as path:
            cfg = pathlib.Path(path) / "channels.json"
            cfg.write_text(json.dumps({"channels": {"OLISE_MAN": {"handle": "@olise-man", "channel_id": None}}}))
            self.assertEqual(mod.read_target(cfg, "OLISE_MAN")["handle"], "@olise-man")

    def test_unknown_channel_blocked(self):
        cfg = ROOT / "config" / "youtube-channel-targets.json"
        with self.assertRaisesRegex(mod.PreflightError, "Unknown channel"):
            mod.read_target(cfg, "NOT_CONFIGURED")

    def test_invalid_alias_blocked(self):
        with self.assertRaises(mod.PreflightError):
            mod.read_target(ROOT / "config" / "youtube-channel-targets.json", "../../HACK")

    def test_mismatch_is_blocked(self):
        yt = Mock(channels=lambda: FakeList({"public": [{"id": "UC_PUBLIC"}], "owned": [{"id": "UC_OTHER"}]}))
        with self.assertRaisesRegex(mod.PreflightError, "WRONG CHANNEL"):
            mod.resolve_channel(yt, {"handle": "@olise-man", "channel_id": None})

    def test_correct_channel_passes(self):
        payload = {"id": "UC_TEST", "snippet": {"title": "Target"}}
        yt = Mock(channels=lambda: FakeList({"public": [payload], "owned": [payload]}))
        self.assertEqual(mod.resolve_channel(yt, {"handle": "@olise-man", "channel_id": None})["id"], "UC_TEST")

    def test_pinned_mismatch_blocked(self):
        payload = {"id": "UC_TEST", "snippet": {"title": "Target"}}
        yt = Mock(channels=lambda: FakeList({"public": [payload], "owned": [payload]}))
        with self.assertRaisesRegex(mod.PreflightError, "Pinned"):
            mod.resolve_channel(yt, {"handle": "@olise-man", "channel_id": "UC_DIFF"})

    def test_shorts_vi_thumbnail_vertical_accepts_portrait(self):
        from PIL import Image
        with tempfile.TemporaryDirectory() as temp:
            p = pathlib.Path(temp) / "shorts.png"
            Image.new("RGB", (1080, 1920), "black").save(p)
            mod.inspect_thumbnail(p, profile="SHORTS_VI")
            with self.assertRaisesRegex(mod.PreflightError, "1280x720"):
                mod.inspect_thumbnail(p, profile="LONGFORM_EN")

    def test_shorts_vi_rejects_landscape_thumbnail(self):
        from PIL import Image
        with tempfile.TemporaryDirectory() as temp:
            p = pathlib.Path(temp) / "landscape.jpg"
            Image.new("RGB", (1280, 720), "black").save(p)
            with self.assertRaisesRegex(mod.PreflightError, "vertical 9:16"):
                mod.inspect_thumbnail(p, profile="SHORTS_VI")
            mod.inspect_thumbnail(p, profile="LONGFORM_EN")

    def test_shorts_vi_rejects_wrong_portrait_aspect_ratio(self):
        from PIL import Image
        with tempfile.TemporaryDirectory() as temp:
            p = pathlib.Path(temp) / "wrong-aspect.png"
            Image.new("RGB", (800, 1200), "black").save(p)
            with self.assertRaisesRegex(mod.PreflightError, "vertical 9:16"):
                mod.inspect_thumbnail(p, profile="SHORTS_VI")

    def test_shorts_vi_accepts_vietnamese_metadata(self):
        meta = json.loads((ROOT / "config" / "youtube-longform-metadata.example.json").read_text())
        meta["language"] = "vi"
        mod.validate_meta(meta, require_approval=False, profile="SHORTS_VI")

    def test_olise_longform_still_rejects_vietnamese_metadata(self):
        meta = json.loads((ROOT / "config" / "youtube-longform-metadata.example.json").read_text())
        meta["language"] = "vi"
        with self.assertRaisesRegex(mod.PreflightError, "language=en"):
            mod.validate_meta(meta, require_approval=False)

    def test_shorts_vi_requires_vertical_video(self):
        streams = [
            {"codec_type": "video", "codec_name": "h264", "width": 1080,
             "height": 1920, "avg_frame_rate": "30/1"},
            {"codec_type": "audio", "codec_name": "aac"}
        ]
        payload = {"streams": streams, "format": {"duration": "60.0"}}
        with unittest.mock.patch.object(mod.subprocess, "run", return_value=Mock(
                returncode=0, stdout=json.dumps(payload), stderr="")):
            self.assertEqual(mod.inspect_video(pathlib.Path("video.mp4"), profile="SHORTS_VI")["duration"], 60)
            with self.assertRaisesRegex(mod.PreflightError, "2560x1440"):
                mod.inspect_video(pathlib.Path("video.mp4"), profile="LONGFORM_EN")

    def test_shorts_vi_rejects_duration_over_sixty(self):
        payload = {"streams": [
            {"codec_type": "video", "codec_name": "h264", "width": 1080,
             "height": 1920, "avg_frame_rate": "30/1"},
            {"codec_type": "audio", "codec_name": "aac"}
        ], "format": {"duration": "61.0"}}
        with unittest.mock.patch.object(mod.subprocess, "run", return_value=Mock(
                returncode=0, stdout=json.dumps(payload), stderr="")):
            with self.assertRaisesRegex(mod.PreflightError, "10–60"):
                mod.inspect_video(pathlib.Path("video.mp4"), profile="SHORTS_VI")

    def test_metadata_requires_qa_for_upload(self):
        meta = json.loads((ROOT / "config" / "youtube-longform-metadata.example.json").read_text())
        mod.validate_meta(meta, require_approval=False)
        with self.assertRaisesRegex(mod.PreflightError, "FINAL QA"):
            mod.validate_meta(meta, require_approval=True)

    def test_never_public(self):
        meta = json.loads((ROOT / "config" / "youtube-longform-metadata.example.json").read_text())
        meta["privacy"] = "public"
        with self.assertRaisesRegex(mod.PreflightError, "PRIVATE ONLY"):
            mod.validate_meta(meta, require_approval=False)

    def test_drive_url_and_id(self):
        ident = "1Dm-dSTzmDaHKLtKPoiqtf64kpgM4eX6x"
        self.assertEqual(mod.drive_id("https://drive.google.com/file/d/" + ident + "/view"), ident)
        self.assertEqual(mod.drive_id(ident), ident)
        with self.assertRaises(mod.PreflightError):
            mod.drive_id("https://example.com/file/d/" + ident + "/view")

    def test_receipt_atomic(self):
        with tempfile.TemporaryDirectory() as path:
            output = pathlib.Path(path) / "receipt.json"
            mod.write_receipt(output, {"channel_key": "OLISE_MAN", "status": "dry_run"})
            self.assertEqual(json.loads(output.read_text())["status"], "dry_run")


if __name__ == "__main__":
    unittest.main()