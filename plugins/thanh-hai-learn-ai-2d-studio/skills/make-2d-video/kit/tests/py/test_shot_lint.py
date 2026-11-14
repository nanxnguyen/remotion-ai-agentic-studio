import os, sys, unittest
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'tools'))
from shot_lint import lint, infer_size

def shots(durs, sizes=None, **extra):
    out, t = [], 0.0
    for i, d in enumerate(durs):
        s = {'id': f's{i:03d}', 'start': round(t, 3), 'end': round(t + d, 3), 'scene': '', 'line': ''}
        if sizes: s['size'] = sizes[i]
        out.append(s); t += d
    return {'duration': round(t, 3), 'shots': out, **extra}

codes = lambda r, lvl: sorted({x['code'] for x in r if x['level'] == lvl})

class LintTest(unittest.TestCase):
    def test_clean_story_passes(self):
        st = shots([2.5, 3, 2, 3.5, 2.2, 2.8], ['close', 'wide', 'medium', 'insert', 'close', 'medium'])
        self.assertEqual(codes(lint(st), 'error'), [])
        self.assertEqual(codes(lint(st), 'warn'), [])

    def test_gap_and_bad_duration_are_errors(self):
        st = shots([2, 2, 2]); st['shots'][1]['start'] = 2.3; st['duration'] = 9
        self.assertEqual(codes(lint(st), 'error'), ['duration', 'gap'])

    def test_logo_intro_in_hook_is_an_error(self):
        st = shots([3, 2, 2], ['title', 'medium', 'close'])
        self.assertIn('hook-intro', codes(lint(st), 'error'))
        st2 = shots([2, 3, 2]); st2['shots'][0]['scene'] = 'Channel logo intro animation'
        self.assertIn('hook-intro', codes(lint(st2), 'error'))

    def test_slow_hook_long_shot_and_repetition_warn(self):
        st = shots([5.5, 9, 2, 2, 2, 2], ['wide', 'medium', 'medium', 'medium', 'medium', 'medium'])
        self.assertEqual(codes(lint(st), 'warn'), ['hook-slow', 'long-shot', 'repeat-size'])

    def test_hold_note_allows_long_shot(self):
        st = shots([2, 9, 2], ['close', 'wide', 'close']); st['shots'][1]['notes'] = 'emotional hold'
        self.assertNotIn('long-shot', codes(lint(st), 'warn'))

    def test_twos_with_motion_blur_warns(self):
        st = shots([2, 3, 2], ['close', 'medium', 'close']); st['shots'][1].update(timing='twos', mblur=3)
        self.assertEqual(codes(lint(st), 'warn'), ['twos-mblur'])

    def test_infer_size_from_scene_text(self):
        self.assertEqual(infer_size({'scene': 'bigFace close-up, Max shocked'}), 'close')
        self.assertEqual(infer_size({'scene': 'OTS: blurred Jake shoulder fg'}), 'ots')
        self.assertEqual(infer_size({'scene': 'Establishing wide of the pier'}), 'wide')
        self.assertEqual(infer_size({'scene': 'navy blueprint of the eye'}), 'blueprint')
        self.assertEqual(infer_size({'scene': 'something'}), None)

if __name__ == '__main__':
    unittest.main()
