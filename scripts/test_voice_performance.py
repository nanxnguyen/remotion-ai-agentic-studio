import importlib.util
import json
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).with_name("gen-voice-clone.py")


def load_module():
    spec = importlib.util.spec_from_file_location("gen_voice_clone", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class VoicePerformanceContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = load_module()

    def test_import_has_no_cli_or_filesystem_side_effects(self):
        self.assertTrue(callable(self.module.main))

    def test_performance_phrases_must_reassemble_canonical_voice_exactly(self):
        canonical = {"s1": "Xin chào, bạn nhé."}
        performance = {
            "version": 1,
            "shots": {
                "s1": {
                    "reference": {"source": "previews/Anh-Khoi-Ke-Chuyen.mp3"},
                    "phrases": [
                        {"text": "Xin chào,", "pauseAfterSeconds": 0.2},
                        {"text": "bạn nhé."},
                    ],
                }
            },
        }

        plan = self.module.build_performance_plan(canonical, performance)

        self.assertEqual([p.text for p in plan["s1"]], ["Xin chào,", "bạn nhé."])
        bad = json.loads(json.dumps(performance))
        bad["shots"]["s1"]["phrases"][1]["text"] = "bạn nha."
        with self.assertRaisesRegex(ValueError, "does not exactly reassemble"):
            self.module.build_performance_plan(canonical, bad)

    def test_acting_cues_cannot_leak_into_spoken_text(self):
        canonical = {"s1": "Mình bắt đầu nhé."}
        performance = {
            "shots": {
                "s1": {
                    "phrases": [{"text": "[cười] Mình bắt đầu nhé."}],
                }
            }
        }

        with self.assertRaisesRegex(ValueError, "acting cue"):
            self.module.build_performance_plan(canonical, performance)

        performance["shots"]["s1"]["phrases"] = [
            {"text": "Mình bắt đầu nhé.", "actingCue": "cười nhẹ"}
        ]
        with self.assertRaisesRegex(ValueError, "experimental acting cue"):
            self.module.build_performance_plan(canonical, performance)

    def test_unsupported_engine_controls_fail_clearly(self):
        canonical = {"s1": "Nói rõ."}
        performance = {
            "shots": {
                "s1": {
                    "phrases": [
                        {"text": "Nói rõ.", "controls": {"pitch": "+10Hz"}}
                    ]
                }
            }
        }

        with self.assertRaisesRegex(ValueError, "unsupported VieNeu control.*pitch"):
            self.module.build_performance_plan(canonical, performance)

    def test_shot_reference_supports_local_crop_and_rejects_external_urls(self):
        performance = {
            "shots": {
                "s1": {
                    "reference": {
                        "source": "vietnamese-voice-samples/previews/Ngoc-Huyen.mp3",
                        "startSeconds": 2.5,
                        "durationSeconds": 7.0,
                    },
                    "phrases": [{"text": "Xin chào."}],
                }
            }
        }

        reference = self.module.reference_for_shot(performance, "s1", None)

        self.assertEqual(reference.source, "vietnamese-voice-samples/previews/Ngoc-Huyen.mp3")
        self.assertEqual(reference.start_seconds, 2.5)
        self.assertEqual(reference.duration_seconds, 7.0)
        performance["shots"]["s1"]["reference"]["source"] = "https://example.com/voice.mp3"
        with self.assertRaisesRegex(ValueError, "local"):
            self.module.reference_for_shot(performance, "s1", None)

    def test_global_reference_remains_a_legacy_fallback(self):
        performance = {"shots": {"s1": {"phrases": [{"text": "Xin chào."}]}}}

        reference = self.module.reference_for_shot(performance, "s1", "voice-ref.wav")

        self.assertEqual(reference.source, "voice-ref.wav")
        self.assertIsNone(reference.start_seconds)
        self.assertIsNone(reference.duration_seconds)


class CandidateSelectionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = load_module()

    def test_pinned_seed_still_fails_the_cer_gate(self):
        attempts = []

        def synthesize(text, seed):
            attempts.append(seed)
            return Path(f"candidate-{seed}.wav")

        with self.assertRaisesRegex(RuntimeError, "CER gate"):
            self.module.select_candidate(
                text="xin chào",
                seeds=[17],
                max_candidates=3,
                max_cer=0.04,
                synthesize=synthesize,
                transcribe=lambda _: "sai hoàn toàn",
            )
        self.assertEqual(attempts, [17])

    def test_candidate_attempts_never_exceed_configured_or_global_limit(self):
        attempts = []

        def synthesize(text, seed):
            attempts.append(seed)
            return Path(f"candidate-{seed}.wav")

        with self.assertRaises(RuntimeError):
            self.module.select_candidate(
                text="xin chào",
                seeds=range(20),
                max_candidates=2,
                max_cer=0.0,
                synthesize=synthesize,
                transcribe=lambda _: "sai",
            )
        self.assertEqual(attempts, [0, 1])

        attempts.clear()
        with self.assertRaises(RuntimeError):
            self.module.select_candidate(
                text="xin chào",
                seeds=range(20),
                max_candidates=99,
                max_cer=0.0,
                synthesize=synthesize,
                transcribe=lambda _: "sai",
            )
        self.assertEqual(attempts, [0, 1, 2])


class AtomicPublishTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = load_module()

    def test_failed_build_does_not_overwrite_existing_clip(self):
        with tempfile.TemporaryDirectory() as td:
            destination = Path(td) / "s1.mp3"
            destination.write_bytes(b"known-good")

            def failing_builder(_temporary):
                raise RuntimeError("candidate failed")

            with self.assertRaisesRegex(RuntimeError, "candidate failed"):
                self.module.atomic_publish(destination, failing_builder)
            self.assertEqual(destination.read_bytes(), b"known-good")

    def test_successful_build_replaces_clip_atomically(self):
        with tempfile.TemporaryDirectory() as td:
            destination = Path(td) / "s1.mp3"
            destination.write_bytes(b"old")

            def builder(temporary):
                temporary.write_bytes(b"new")

            self.module.atomic_publish(destination, builder)
            self.assertEqual(destination.read_bytes(), b"new")


class ShotGenerationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = load_module()

    def test_success_keeps_native_raw_and_reports_actual_controls_and_metrics(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            source = root / "source.wav"
            source.write_bytes(b"native-rate-wave")
            destination = root / "s1.mp3"
            raw_dir = root / "raw"

            phrase = self.module.PhrasePlan(
                text="Xin chào.", seed=9, pause_before=0.0, pause_after=0.2,
                intent="gợi mở", emotion="ấm", emphasis=("chào",),
                tempo_intent="chậm rõ", denoise=False,
            )
            record = self.module.generate_shot(
                shot_key="s1", phrases=[phrase], reference="voice-ref.wav",
                destination=destination, raw_dir=raw_dir, max_candidates=3,
                max_cer=0.04,
                synthesize=lambda _text, _seed, _ref, _denoise: source,
                transcribe=lambda _path: "Xin chào.",
                encode=lambda _parts, target: target.write_bytes(b"mp3"),
                measure=lambda _path: {
                    "durationSeconds": 1.25, "silenceSeconds": 0.2,
                    "integratedLufs": -16.1, "truePeakDb": -1.4,
                },
            )

            self.assertEqual(destination.read_bytes(), b"mp3")
            self.assertEqual((raw_dir / "s1-p1.wav").read_bytes(), b"native-rate-wave")
            self.assertEqual(record["phrases"][0]["actualControls"], {
                "seed": 9, "denoise": False, "reference": "voice-ref.wav"
            })
            self.assertEqual(record["metrics"]["durationSeconds"], 1.25)

            report = self.module.format_voice_report("demo", [record], [])
            for value in ("voice-ref.wav", "Xin chào.", "9", "0.000", "1.250", "-16.10", "-1.40"):
                self.assertIn(value, report)
            self.assertIn("not verified by listening", report)

    def test_phrase_failure_preserves_existing_clip_and_raw_files(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            source = root / "source.wav"
            source.write_bytes(b"new-raw")
            destination = root / "s1.mp3"
            destination.write_bytes(b"known-good")
            raw_dir = root / "raw"
            raw_dir.mkdir()
            old_raw = raw_dir / "s1-p1.wav"
            old_raw.write_bytes(b"known-good-raw")
            phrases = [
                self.module.PhrasePlan("Xin chào.", 1, 0, 0.2, "", "", (), "", False),
                self.module.PhrasePlan("Sai thì dừng.", 2, 0, 0, "", "", (), "", False),
            ]

            with self.assertRaisesRegex(RuntimeError, "CER gate"):
                self.module.generate_shot(
                    shot_key="s1", phrases=phrases, reference="ref.wav",
                    destination=destination, raw_dir=raw_dir, max_candidates=3,
                    max_cer=0.04,
                    synthesize=lambda _text, _seed, _ref, _denoise: source,
                    transcribe=lambda path: "Xin chào." if len(list(root.glob("seen-*"))) == 0 else "sai",
                    encode=lambda _parts, target: target.write_bytes(b"new"),
                    measure=lambda _path: {},
                )
            self.assertEqual(destination.read_bytes(), b"known-good")
            self.assertEqual(old_raw.read_bytes(), b"known-good-raw")

    def test_report_merge_keeps_untouched_shots_and_replaces_updated_shot(self):
        existing = """# Voice performance report (demo)

| shot | reference | phrase | seed | CER | duration s | silence s | LUFS-I | true peak dB | actual controls |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
| s1 | old-ref | old phrase | 1 | 0.000 | 1.000 | 0.100 | -16.00 | -1.00 | {} |
| s2 | keep-ref | keep phrase | 2 | 0.000 | 1.000 | 0.100 | -16.00 | -1.00 | {} |

## Limitations

- old
"""
        replacement = """# Voice performance report (demo)

| shot | reference | phrase | seed | CER | duration s | silence s | LUFS-I | true peak dB | actual controls |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
| s1 | new-ref | new phrase | 3 | 0.000 | 1.100 | 0.200 | -15.00 | -1.20 | {} |

## Limitations

- Naturalness and emotional delivery: not verified by listening.
"""

        merged = self.module.merge_report_rows(existing, replacement, {"s1"})

        self.assertIn("| s1 | new-ref | new phrase", merged)
        self.assertNotIn("| s1 | old-ref | old phrase", merged)
        self.assertIn("| s2 | keep-ref | keep phrase", merged)


if __name__ == "__main__":
    unittest.main()
