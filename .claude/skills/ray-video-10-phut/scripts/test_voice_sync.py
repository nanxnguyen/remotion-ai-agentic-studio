"""Behavioral checks for the skill's supplemental voice evidence contract."""
import copy
import json
import hashlib
import random
import time
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))


def evidence():
    return {
        'fps': 30, 'duration_frames': 90,
        'mp4_sha256': 'a' * 64,
        'speakers': {'daughter': {'voice_id': 'girl-v1'}},
        'shots': {'s1': {'start_frame': 0, 'end_frame': 90, 'visible_speakers': ['daughter']}},
        'utterances': [{
            'id': 'u1', 'text': 'Ba ơi, con hỏi ba nhé?', 'speaker': 'daughter',
            'voice_id': 'girl-v1', 'shot': 's1', 'mode': 'on-screen',
            'start_frame': 0, 'end_frame': 60, 'audio_seconds': 2.0,
            'audio_sha256': 'b' * 64, 'caption_start_frame': 0, 'caption_end_frame': 60,
        }],
        'review': {'mp4_sha256': 'a' * 64, 'listener': 'reviewer-1',
                   'listened': True, 'naturalness': 'pass', 'emotion': 'pass',
                   'character_fit': 'pass', 'smooth_joins': 'pass', 'issues': []},
    }


class VoiceSyncTest(unittest.TestCase):
    def check(self, data):
        from validate_voice_sync import validate
        return validate(data)

    def test_valid_evidence(self):
        self.assertEqual([], self.check(evidence()))

    def test_rejects_bad_evidence(self):
        cases = {
            'unknown speaker': lambda d: d['utterances'][0].update(speaker='father'),
            'wrong voice': lambda d: d['utterances'][0].update(voice_id='adult-male'),
            'wrong picture': lambda d: d['shots']['s1'].update(visible_speakers=[]),
            'unknown shot': lambda d: d['utterances'][0].update(shot='missing'),
            'truncated speech': lambda d: d['utterances'][0].update(audio_seconds=3.0),
            'caption drift': lambda d: d['utterances'][0].update(caption_start_frame=10),
            'outside composition': lambda d: d['utterances'][0].update(end_frame=100),
            'unheard output': lambda d: d['review'].update(listened=False),
            'stale review': lambda d: d['review'].update(mp4_sha256='c' * 64),
            'robotic voice': lambda d: d['review'].update(naturalness='fail'),
            'flat emotion': lambda d: d['review'].update(emotion='pending'),
            'unresolved issues': lambda d: d['review'].update(issues=['metallic tail']),
            'missing measurement': lambda d: d['utterances'][0].pop('audio_seconds'),
            'nan measurement': lambda d: d['utterances'][0].update(audio_seconds=float('nan')),
            'duplicate line': lambda d: d['utterances'].append(copy.deepcopy(d['utterances'][0])),
            'no dialogue': lambda d: d.update(utterances=[]),
        }
        for name, mutate in cases.items():
            with self.subTest(name=name):
                data = evidence()
                mutate(data)
                self.assertTrue(self.check(data), name)

    def test_reaction_shot_requires_explanation(self):
        d = evidence()
        d['shots']['s1']['visible_speakers'] = []
        d['utterances'][0]['mode'] = 'reaction'
        self.assertTrue(self.check(d))
        d['utterances'][0]['picture_reason'] = 'Father reacts to daughter off-screen'
        self.assertEqual([], self.check(d))

    def test_rejects_overlap_between_distinct_lines(self):
        d = evidence()
        second = copy.deepcopy(d['utterances'][0])
        second.update(id='u2', start_frame=30, end_frame=90,
                      caption_start_frame=30, caption_end_frame=90)
        d['utterances'].append(second)
        self.assertTrue(self.check(d))

    def test_malformed_contract_fails_closed(self):
        for d in [None, [], {}, {'fps': True}, {'utterances': 'wrong'}]:
            with self.subTest(data=d):
                self.assertTrue(self.check(d))

    def test_schema_rejects_non_string_voice_ids(self):
        for voice in [True, 12, ['girl'], {'id': 'girl'}, '   ']:
            with self.subTest(voice=voice):
                d = evidence()
                d['speakers']['daughter']['voice_id'] = voice
                d['utterances'][0]['voice_id'] = voice
                self.assertTrue(self.check(d))

    def test_numeric_boundaries_fail_without_crashing(self):
        for field in ['fps', 'duration_frames']:
            for value in [True, False, 0, -1, None, '30', [], {}, float('inf'), float('nan'), 10**1000]:
                with self.subTest(field=field, value_type=type(value).__name__):
                    d = evidence()
                    d[field] = value
                    self.assertTrue(self.check(d))

    def test_caption_tolerance_boundary(self):
        d = evidence()
        d['utterances'][0]['caption_start_frame'] = 3  # 100ms at 30fps
        self.assertEqual([], self.check(d))
        d['utterances'][0]['caption_start_frame'] = 4
        self.assertTrue(self.check(d))

    def test_fractional_fps_is_supported(self):
        d = evidence()
        d['fps'] = 29.97
        self.assertEqual([], self.check(d))

    def test_speaker_reference_in_picture_must_exist(self):
        d = evidence()
        d['shots']['s1']['visible_speakers'].append('unknown-role')
        self.assertTrue(self.check(d))

    def test_invalid_nested_values_never_raise(self):
        randomizer = random.Random(1701)
        replacements = [None, True, -1, '', [], {}, float('nan'), 10**1000]
        # Deterministic malformed-input campaign; checks robustness, not artistic quality.
        paths = [('fps',), ('speakers', 'daughter'), ('shots', 's1'),
                 ('utterances', 0, 'speaker'), ('utterances', 0, 'mode'),
                 ('utterances', 0, 'audio_seconds'), ('review', 'listener')]
        for index in range(300):
            d = evidence()
            path = randomizer.choice(paths)
            parent = d
            for key in path[:-1]:
                parent = parent[key]
            parent[path[-1]] = randomizer.choice(replacements)
            with self.subTest(case=index, path=path):
                self.assertIsInstance(self.check(d), list)

    def test_bulk_validation_is_deterministic_and_responsive(self):
        d = evidence()
        d['duration_frames'] = 60000
        d['shots']['s1']['end_frame'] = 60000
        line = d['utterances'][0]
        d['utterances'] = [dict(line, id=f'u{i}', start_frame=i*60, end_frame=(i+1)*60,
                                caption_start_frame=i*60, caption_end_frame=(i+1)*60)
                            for i in range(1000)]
        snapshot = copy.deepcopy(d)
        start = time.perf_counter()
        for _ in range(5):
            self.assertEqual([], self.check(d))
        elapsed = time.perf_counter() - start
        self.assertEqual(snapshot, d, 'Validation must not mutate caller data')
        self.assertLess(elapsed, 5, 'Local validation smoke budget, not TTS/render SLA')
        print(f'Voice evidence: 5 x 1000 utterances in {elapsed:.4f}s')

    def test_adjacent_lines_and_deliberate_silence_are_valid(self):
        for start in [60, 65]:
            d = evidence()
            d['duration_frames'] = 150
            d['shots']['s1']['end_frame'] = 150
            second = dict(d['utterances'][0], id='u2', start_frame=start, end_frame=start+60,
                          caption_start_frame=start, caption_end_frame=start+60)
            d['utterances'].append(second)
            self.assertEqual([], self.check(d))

    def test_picture_coverage_cannot_end_before_speech(self):
        d = evidence()
        d['shots']['s1']['end_frame'] = 59
        self.assertTrue(self.check(d))

    def test_each_listening_dimension_blocks_delivery(self):
        for dimension in ['naturalness', 'emotion', 'character_fit', 'smooth_joins']:
            for verdict in ['fail', 'pending', None, True]:
                d = evidence()
                d['review'][dimension] = verdict
                with self.subTest(dimension=dimension, verdict=verdict):
                    self.assertTrue(self.check(d))

    def test_review_requires_actual_boolean_and_listener(self):
        for value in ['true', 1, None]:
            d = evidence()
            d['review']['listened'] = value
            self.assertTrue(self.check(d))
        d = evidence()
        d['review']['listener'] = '  '
        self.assertTrue(self.check(d))

    def test_cli_checks_actual_mp4_bytes_and_missing_files(self):
        script = Path(__file__).with_name('validate_voice_sync.py')
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            video = root / 'final.mp4'
            video.write_bytes(b'fixture-only-not-a-decodable-mp4')
            d = evidence()
            digest = hashlib.sha256(video.read_bytes()).hexdigest()
            d['mp4_sha256'] = d['review']['mp4_sha256'] = digest
            path = root / 'evidence.json'
            path.write_text(json.dumps(d), encoding='utf-8')
            cmd = [sys.executable, str(script), str(path), '--mp4', str(video)]
            result = subprocess.run(cmd, capture_output=True)
            self.assertEqual(0, result.returncode, result.stderr.decode())
            video.write_bytes(b'rerendered')
            result = subprocess.run(cmd, capture_output=True)
            self.assertEqual(1, result.returncode)
            self.assertIn(b'fingerprint', result.stdout)
            video.unlink()
            self.assertEqual(1, subprocess.run(cmd, capture_output=True).returncode)

    def test_cli_success_and_failure(self):
        script = Path(__file__).with_name('validate_voice_sync.py')
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'evidence.json'
            for payload, expected in [(json.dumps(evidence()), 0), ('{}', 1), ('{broken', 1)]:
                path.write_text(payload, encoding='utf-8')
                result = subprocess.run([sys.executable, str(script), str(path)], capture_output=True)
                self.assertEqual(expected, result.returncode, result.stderr.decode())


if __name__ == '__main__':
    unittest.main()
