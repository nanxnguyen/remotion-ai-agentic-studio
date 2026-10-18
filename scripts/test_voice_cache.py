"""Voice cache regression tests. No VieNeu installation required."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).with_name("gen-voice-clone.py")
spec = importlib.util.spec_from_file_location("voice_cache_tested", SCRIPT)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


class VoiceCacheTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.ref = self.root / "reference.wav"
        self.ref.write_bytes(b"reference-original")

    def phrase(self, text="Xin chào Việt Nam."):
        return mod.PhrasePlan(text, None, 0, 0, "", "", (), "", False)

    def test_verified_cache_hit_and_input_invalidation(self):
        cache = mod.VerifiedPhraseCache(self.root / "cache")
        phrase = self.phrase()
        source = self.root / "candidate.wav"
        source.write_bytes(b"native-wav")
        key = cache.key(phrase, mod.sha256_file(self.ref), 0.04)
        self.assertIsNone(cache.get(key, phrase.text, 0.04))
        chosen = mod.Candidate(0.0, 3, source, phrase.text)
        cache.put(key, phrase.text, chosen, 0.04)
        self.assertEqual(cache.get(key, phrase.text, 0.04).path.read_bytes(), b"native-wav")
        self.assertNotEqual(key, cache.key(self.phrase("Đổi câu."), mod.sha256_file(self.ref), 0.04))
        self.ref.write_bytes(b"new-reference")
        self.assertNotEqual(key, cache.key(phrase, mod.sha256_file(self.ref), 0.04))
        self.assertNotEqual(key, cache.key(phrase, mod.sha256_file(self.ref), 0.03))

    def test_corrupt_cache_never_passes(self):
        cache = mod.VerifiedPhraseCache(self.root / "cache")
        phrase = self.phrase()
        wav = self.root / "wav"
        wav.write_bytes(b"audio")
        key = cache.key(phrase, "ref", 0.04)
        cache.put(key, phrase.text, mod.Candidate(0.0, 1, wav, phrase.text), 0.04)
        (cache.root / key[:2] / (key + ".wav")).write_bytes(b"corrupted")
        self.assertIsNone(cache.get(key, phrase.text, 0.04))

    def test_shot_skip_requires_matching_hash_and_inputs(self):
        clip = self.root / "s1.mp3"
        clip.write_bytes(b"old")
        identity = mod.shot_identity([self.phrase()], "ref1", 0.04)
        manifest = {"s1.mp3": {"identity": identity, "sha256": mod.sha256_file(clip)}}
        self.assertTrue(mod.shot_is_current(clip, manifest, identity))
        self.assertFalse(mod.shot_is_current(clip, manifest, "different"))
        clip.write_bytes(b"changed")
        self.assertFalse(mod.shot_is_current(clip, manifest, identity))
        self.assertFalse(mod.shot_is_current(clip, {}, identity))

    def test_cache_hit_skips_synthesis_and_asr(self):
        cache = mod.VerifiedPhraseCache(self.root / "cache")
        phrase = self.phrase()
        source = self.root / "candidate.wav"
        source.write_bytes(b"audio")
        key = cache.key(phrase, "ref-hash", 0.04)
        cache.put(key, phrase.text, mod.Candidate(0.0, 3, source, phrase.text), 0.04)
        calls = []
        def unexpected(*args):
            calls.append(args)
            raise AssertionError("cache hit should not synthesize or transcribe")
        result = mod.generate_shot(
            shot_key="s1", phrases=[phrase], reference="ref.wav",
            destination=self.root / "s1.mp3", raw_dir=self.root / "raw",
            max_candidates=3, max_cer=0.04,
            synthesize=unexpected, transcribe=unexpected,
            encode=lambda parts, dest: dest.write_bytes(b"encoded"),
            measure=lambda path: {"durationSeconds": 1.0},
            phrase_cache=cache, reference_hash="ref-hash")
        self.assertEqual(calls, [])
        self.assertEqual(result["phrases"][0]["cer"], 0.0)


if __name__ == "__main__":
    unittest.main()
