"""Pure contract tests for the preview-only Thanh Long integration helper."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).with_name("voiceover_preview_thanh_long.py")
SPEC = importlib.util.spec_from_file_location("voiceover_preview_thanh_long", MODULE_PATH)
voice = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(voice)


class VoiceoverPreviewTests(unittest.TestCase):
    def test_six_shot_boundaries_are_accepted(self):
        values = voice.slots([3., 3., 4., 4., 4., 4.])
        self.assertEqual(len(values), 6)
        self.assertEqual(values[0]["start"], 0)
        self.assertEqual(values[-1]["start"], 29.5)

    def test_rejects_missing_or_zero_length_speech(self):
        with self.assertRaises(ValueError):
            voice.slots([1.])
        with self.assertRaises(ValueError):
            voice.slots([0., 1., 1., 1., 1., 1.])

    def test_never_truncates_voice_over_slot(self):
        with self.assertRaisesRegex(ValueError, "NEVER cut/stretch"):
            voice.slots([6., 1., 1., 1., 1., 1.])
        with self.assertRaisesRegex(ValueError, "NEVER cut/stretch"):
            voice.slots([1., 1., 1., 1., 1., 6.])

    def test_missing_voice_reference_fails_closed(self):
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(FileNotFoundError):
                voice.verify_reference(Path(directory) / "refThanhLong.wav")

    def test_bad_reference_hash_fails_closed(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "refThanhLong.wav"
            path.write_bytes(b"not-real-audio")
            with self.assertRaisesRegex(RuntimeError, "MD5 mismatch"):
                voice.verify_reference(path)


if __name__ == "__main__":
    unittest.main()
