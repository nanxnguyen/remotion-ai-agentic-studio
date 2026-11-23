import os, sys, unittest
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'tools'))
from explainer_plan import plan
from shot_lint import lint

SPEC = {"title": "Cảm giác đánh nhau với bọ", "lang": "vi", "format": "what-its-like",
        "cold_open": {"dur": 3}, "title_card": {"dur": 2.5}, "recap": {"dur": 5}, "cta": {"dur": 3.5},
        "rounds": [{"name": "Bọ cánh cứng", "cue": "cánh", "stats": [{"label": "Nguy hiểm", "v": 0.3, "text": "3/10"}]},
                   {"name": "Nhện góa phụ", "cue": "nhện", "stats": [{"label": "Nguy hiểm", "v": 0.9, "text": "9/10"}], "gag": "bị cắn, sưng như quả bóng"},
                   {"name": "Cua dừa", "stats": [{"label": "Lực kẹp", "v": 1.0, "text": "3300 N"}], "weight": 1.5}]}

def rounds_of(st):
    out = {}
    for s in st['shots']:
        if 'round' in s['params']: out.setdefault(s['params']['round'], []).append(s)
    return out

class ExplainerPlanTest(unittest.TestCase):
    def test_structure(self):
        st = plan(SPEC, 60)
        S = st['shots']
        self.assertTrue(S[0]['params'].get('cold')); self.assertTrue(S[1]['params'].get('title'))
        self.assertTrue(S[-2]['params'].get('recap')); self.assertTrue(S[-1]['params'].get('cta'))
        self.assertEqual(S[1]['start'], 3); self.assertEqual(S[-1]['end'], 60); self.assertEqual(st['duration'], 60)
        R = rounds_of(st)
        self.assertEqual(sorted(R), [0, 1, 2])
        for i, shots in R.items():
            self.assertTrue(shots[0]['params'].get('roundTitle')); self.assertTrue(shots[1]['params'].get('card'))
            self.assertEqual(shots[0]['params']['n'], i + 1); self.assertEqual(shots[1]['params']['stats'], SPEC['rounds'][i]['stats'])
        self.assertIn('gag', R[1][-1]['notes'])

    def test_no_shot_over_7s_and_lint_clean(self):
        st = plan(SPEC, 60)
        self.assertTrue(all(s['end'] - s['start'] <= 7.0 + 1e-6 for s in st['shots']))
        self.assertEqual([r for r in lint(st) if r['level'] == 'error'], [])
        self.assertEqual([r['code'] for r in lint(st) if r['level'] == 'warn'], [])

    def test_weights(self):
        R = rounds_of(plan(SPEC, 60))
        d = {i: sum(s['end'] - s['start'] for s in v) for i, v in R.items()}
        self.assertAlmostEqual(d[2], 1.5 * d[0], delta=0.05)

    def test_cue_alignment(self):
        words = [{'word': 'Hôm', 'start': 0.2, 'end': 0.4}, {'word': 'cánh', 'start': 9.0, 'end': 9.3}, {'word': 'nhện', 'start': 21.0, 'end': 21.3}]
        R = rounds_of(plan(SPEC, 60, words))
        self.assertAlmostEqual(R[0][0]['start'], 8.85, delta=0.01); self.assertAlmostEqual(R[1][0]['start'], 20.85, delta=0.01)

    def test_music_contiguous_and_too_short(self):
        st = plan(SPEC, 60)
        for a, b in zip(st['music'], st['music'][1:]): self.assertEqual(a['end'], b['start'])
        self.assertEqual(st['music'][-1]['end'], 60)
        with self.assertRaises(ValueError): plan(SPEC, 20)

if __name__ == '__main__':
    unittest.main()
