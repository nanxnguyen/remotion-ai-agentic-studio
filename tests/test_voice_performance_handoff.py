import json
import tempfile
import unittest
from pathlib import Path
from scripts.validate_voice_performance import check


class ForwardContractTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.folder = self.root / "docs" / "sample"
        self.folder.mkdir(parents=True)
        (self.folder / "voice.json").write_text(json.dumps({"s1": "Xin chào Việt Nam."}), encoding="utf-8")
        (self.folder / "voice-direction.md").write_text("s1: warm delivery", encoding="utf-8")
        self.sidecar = self.folder / "voice-performance.json"

    def tearDown(self):
        self.tmp.cleanup()

    def test_exact_text_and_direction(self):
        self.sidecar.write_text(json.dumps({"shots":{"s1":{"phrases":[{"text":"Xin chào Việt Nam."}]}}}), encoding="utf-8")
        self.assertEqual(check("sample", self.root), [])

    def test_rejects_mismatched_phrase(self):
        self.sidecar.write_text(json.dumps({"shots":{"s1":{"phrases":[{"text":"Xin chào."}]}}}), encoding="utf-8")
        self.assertTrue(check("sample", self.root))

    def test_rejects_missing_direction_shot(self):
        self.sidecar.write_text(json.dumps({"shots":{"s1":{"phrases":[{"text":"Xin chào Việt Nam."}]}}}), encoding="utf-8")
        (self.folder / "voice-direction.md").write_text("No shots", encoding="utf-8")
        self.assertIn("voice-direction.md lacks shot s1", check("sample", self.root))


if __name__ == "__main__":
    unittest.main()
