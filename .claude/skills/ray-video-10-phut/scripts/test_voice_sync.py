"""Behavioral checks for the skill's supplemental voice evidence contract."""
import copy
import json
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
