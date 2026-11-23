import json, os, sys, unittest
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
sys.path.insert(0, os.path.join(ROOT, 'tools'))
from scare_lint import lint


def short(beats, hush_before_scare=True, sfx_on_scare=None):
    out, t = [], 0.0
    for i, b in enumerate(beats):
        s = {'id': f's{i:02d}', 'start': t, 'end': t + 4.0, 'beat': b}
        out.append(s); t += 4.0
    for i, s in enumerate(out):
        if s['beat'] == 'scare':
            if hush_before_scare and i: out[i - 1]['hush'] = True
            if sfx_on_scare: s['sfx'] = [{'name': sfx_on_scare}]
    return {'duration': t, 'shots': out}


codes = lambda r, lvl: sorted({x['code'] for x in r if x['level'] == lvl})
GOOD = ['hook', 'setup', 'dread', 'dread', 'scare', 'breather', 'dread', 'dread', 'reveal', 'twist', 'cta']


class ScareLintTest(unittest.TestCase):
    def test_well_built_short_has_no_errors(self):
        res, fear = lint(short(GOOD))
        self.assertEqual(codes(res, 'error'), [])
        self.assertEqual(len(fear), len(GOOD))

    def test_missing_hook_and_ending_are_errors(self):
        res, _ = lint(short(['setup', 'dread', 'scare', 'breather', 'setup', 'setup', 'setup', 'setup']))
        self.assertIn('hook', codes(res, 'error'))
        self.assertIn('ending', codes(res, 'error'))

    def test_scare_without_hush_or_hit_is_an_error(self):
        res, _ = lint(short(GOOD, hush_before_scare=False))
        self.assertIn('scare-sfx', codes(res, 'error'))

    def test_bundled_horror_examples_pass(self):
        for name in ('hem-demo', 'ditap-demo'):
            story = json.load(open(os.path.join(ROOT, 'examples', name, 'story', 'shots.json'), encoding='utf-8'))
            res, _ = lint(story)
            self.assertEqual(codes(res, 'error'), [], name)


if __name__ == '__main__':
    unittest.main()
