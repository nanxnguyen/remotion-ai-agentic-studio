import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from facebook_page_upload import PreflightError, check_reel, check_video, encode_multipart, resolve_mode, validate_meta, validate_schedule  # noqa: E402

OK = {"width": 1080, "height": 1920, "fps": 30.0, "duration": 45.0, "vcodec": "h264", "acodec": "aac"}
OK_LANDSCAPE = {"width": 1920, "height": 1080, "fps": 24.0, "duration": 135.0, "vcodec": "h264", "acodec": "aac"}


class CheckReelTest(unittest.TestCase):
    def test_valid_reel_passes(self):
        check_reel(OK)

    def test_rejects_wrong_spec(self):
        for bad in ({"width": 1920, "height": 1080}, {"duration": 120.0}, {"duration": 2.0},
                    {"fps": 15.0}, {"vcodec": "hevc"}, {"width": 360, "height": 640}):
            with self.subTest(bad=bad), self.assertRaises(PreflightError):
                check_reel({**OK, **bad})

    def test_valid_video_and_auto_mode(self):
        check_video(OK_LANDSCAPE)
        self.assertEqual(resolve_mode("auto", OK), "reel")
        self.assertEqual(resolve_mode("auto", OK_LANDSCAPE), "video")
        self.assertEqual(resolve_mode("auto", {**OK, "duration": 120.0}), "video")


class MetaTest(unittest.TestCase):
    def test_dry_run_allows_unapproved(self):
        validate_meta({"description": "x"}, execute=False)

    def test_execute_requires_approval(self):
        with self.assertRaises(PreflightError):
            validate_meta({"description": "x", "qa_approved": False}, execute=True)
        validate_meta({"description": "x", "qa_approved": True}, execute=True)

    def test_empty_description_blocked(self):
        with self.assertRaises(PreflightError):
            validate_meta({"description": "  "}, execute=False)

    def test_video_mode_allows_longer_description_and_multipart(self):
        validate_meta({"description": "x" * 2500, "qa_approved": True}, execute=True, mode="video")
        body, ctype = encode_multipart({"is_preferred": "true"}, {"source": ("a.png", b"PNG", "image/png")})
        self.assertIn("multipart/form-data; boundary=", ctype)
        self.assertIn(b"is_preferred", body)

    def test_schedule_validation(self):
        validate_schedule("DRAFT", None, now=1000)
        with self.assertRaises(PreflightError):
            validate_schedule("SCHEDULED", None, now=1000)
        with self.assertRaises(PreflightError):
            validate_schedule("SCHEDULED", 1200, now=1000)
        validate_schedule("SCHEDULED", 2000, now=1000)


if __name__ == "__main__":
    unittest.main()
