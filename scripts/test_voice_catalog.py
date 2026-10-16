"""Keep the voice preview folder usable: it is the voice catalog."""

import unittest
from pathlib import Path


PREVIEWS = Path(__file__).resolve().parent.parent / "vietnamese-voice-samples" / "previews"


class VoiceCatalogTest(unittest.TestCase):
    def test_previews_exist_and_are_nonempty(self):
        if not PREVIEWS.exists():
            self.skipTest("private voice previews are not included in public clones")

        clips = sorted(PREVIEWS.glob("*.mp3"))
        self.assertTrue(clips, f"no .mp3 previews in {PREVIEWS}")
        empty = [p.name for p in clips if p.stat().st_size == 0]
        self.assertEqual(empty, [])


if __name__ == "__main__":
    unittest.main()
