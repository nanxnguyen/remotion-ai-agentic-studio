"""Fast offline safety checks for the Silent Animation Factory long-form executor."""
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1] / "scripts" / "silent_factory_executor.py"
spec = importlib.util.spec_from_file_location("silent_factory_executor", SOURCE)
assert spec is not None and spec.loader is not None
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def sample():
    shots = []
    for index in range(36):
        caption = f"Every step matters {index}." if index < 20 else ""
        shots.append({
            "id": f"shot-{index + 1:02d}",
            "action": "walk" if index % 2 else "repair",
            "scene": ["stairs", "city", "workshop", "bridge", "dawn"][index % 5],
            "caption": caption,
            "highlight": "step" if caption else "",
            "palette": "hope",
        })
    return {"title": "The Missing Step", "revision": 0, "shots": shots}


class ManifestTests(unittest.TestCase):
    def read(self, doc):
        with tempfile.TemporaryDirectory() as temp:
            source = Path(temp) / "job.json"
            source.write_text(json.dumps(doc), encoding="utf-8")
            return module.manifest(source)

    def test_valid_210_seconds_36_shots(self):
        doc = self.read(sample())
        self.assertEqual(len(doc["shots"]) * module.FRAMES_PER_SHOT, 6300)

    def test_reject_two_second_preview(self):
        doc = sample()
        doc["shots"] = doc["shots"][:1]
        with self.assertRaisesRegex(ValueError, "36 timed shots"):
            self.read(doc)

    def test_reject_duplicate_shots(self):
        doc = sample()
        doc["shots"][3]["id"] = doc["shots"][0]["id"]
        with self.assertRaisesRegex(ValueError, "duplicate"):
            self.read(doc)

    def test_reject_highlight_not_in_caption(self):
        doc = sample()
        doc["shots"][3]["highlight"] = "EXTERNAL CLICKBAIT"
        with self.assertRaisesRegex(ValueError, "highlight"):
            self.read(doc)

    def test_reject_too_few_captions(self):
        doc = sample()
        for shot in doc["shots"][10:]:
            shot["caption"] = ""
            shot["highlight"] = ""
        with self.assertRaisesRegex(ValueError, "12-25"):
            self.read(doc)

    def test_reject_too_many_captions(self):
        doc = sample()
        for shot in doc["shots"][20:30]:
            shot["caption"] = "One more step."
            shot["highlight"] = "step"
        with self.assertRaisesRegex(ValueError, "12-25"):
            self.read(doc)

    def test_reject_silent_shot_with_highlight(self):
        doc = sample()
        doc["shots"][33]["highlight"] = "step"
        with self.assertRaisesRegex(ValueError, "silent shot"):
            self.read(doc)

    def test_reject_invalid_revision(self):
        doc = sample()
        doc["revision"] = 6
        with self.assertRaisesRegex(ValueError, "revision"):
            self.read(doc)

    def test_reject_unapproved_style(self):
        doc = sample()
        doc["shots"][1]["action"] = "photo-slide"
        with self.assertRaisesRegex(ValueError, "scene/action"):
            self.read(doc)


if __name__ == "__main__":
    unittest.main()
