import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("handoff", ROOT / "scripts" / "validate-video-handoff.py")
handoff = importlib.util.module_from_spec(spec)
spec.loader.exec_module(handoff)

class HandoffTests(unittest.TestCase):
    def test_video08_contract(self):
        self.assertEqual(handoff.validate("tiec-nguoi-hay-nam-thang"), [])

    def test_missing_video_blocked(self):
        self.assertTrue(handoff.validate("missing-video-" + "z" * 8))

if __name__ == "__main__":
    unittest.main()
