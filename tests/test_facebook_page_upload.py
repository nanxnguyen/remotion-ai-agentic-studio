import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from facebook_page_upload import PreflightError, check_reel, validate_meta  # noqa: E402

OK = {"width": 1080, "height": 1920, "fps": 30.0, "duration": 45.0, "vcodec": "h264", "acodec": "aac"}


class CheckReelTest(unittest.TestCase):
    def test_valid_reel_passes(self):
        check_reel(OK)

    def test_rejects_wrong_spec(self):
        for bad in ({"width": 1920, "height": 1080}, {"duration": 120.0}, {"duration": 2.0},
                    {"fps": 15.0}, {"vcodec": "hevc"}, {"width": 360, "height": 640}):
            with self.subTest(bad=bad), self.assertRaises(PreflightError):
                check_reel({**OK, **bad})


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


if __name__ == "__main__":
    unittest.main()
