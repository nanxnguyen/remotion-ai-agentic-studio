import os, sys, unittest
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'tools'))
from evolution_plan import plan
from shot_lint import lint

STAGES = {"title": "T", "lang": "vi", "kind": "life", "counter": "age",
          "stages": [{"value": 0, "title": "Sơ sinh"}, {"value": 6, "title": "Cậu bé", "cue": "bóng"}, {"value": 14, "title": "Học viện"},
                     {"value": 18, "title": "Ra mắt", "weight": 2}, {"value": 40, "title": "Giải nghệ"}]}

class PlanTest(unittest.TestCase):
    def test_structure_hook_stages_outro(self):
        st = plan(STAGES, 30)
        S = st['shots']
        self.assertTrue(S[0]['params'].get('hook')); self.assertTrue(S[-1]['params'].get('outro'))
        stages = [s for s in S if 'stage' in s['params'] and 'part' not in s['params']]
        self.assertEqual([s['params']['stage'] for s in stages], [0, 1, 2, 3, 4])
        self.assertEqual([s['params']['value'] for s in stages], [0, 6, 14, 18, 40])
        self.assertEqual(st['duration'], 30); self.assertEqual(S[-1]['end'], 30)
        self.assertLessEqual(S[0]['end'], 3.0)
        self.assertEqual(st['evolution'], {'kind': 'life', 'counter': 'age'})

    def test_weights_and_minimum(self):
        d = [0.0] * 5
        for s in plan(STAGES, 30)['shots']:
            if 'stage' in s['params']: d[s['params']['stage']] += s['end'] - s['start']
        self.assertAlmostEqual(d[3], 2 * d[2], delta=0.05)
        self.assertTrue(all(x >= 1.2 for x in d))

    def test_lint_clean(self):
        st = plan(STAGES, 30)
        self.assertEqual([r for r in lint(st) if r['level'] == 'error'], [])
        self.assertEqual([r['code'] for r in lint(st) if r['level'] == 'warn'], [])

    def test_long_stage_is_split_into_parts(self):
        st = plan(STAGES, 30)
        parts = [s for s in st['shots'] if s['params'].get('stage') == 3]
        self.assertEqual(len(parts), 2); self.assertEqual(parts[1]['params']['part'], 1); self.assertEqual(parts[1]['in']['type'], 'cut')
        self.assertNotEqual(parts[0]['size'], parts[1]['size'])

    def test_cue_aligns_stage_to_spoken_word(self):
        words = [{'word': 'Ngày', 'start': 0.5, 'end': 0.8}, {'word': 'xưa', 'start': 0.8, 'end': 1.0}, {'word': 'quả', 'start': 7.0, 'end': 7.2}, {'word': 'bóng', 'start': 7.2, 'end': 7.5}]
        stages = [s for s in plan(STAGES, 30, words)['shots'] if 'stage' in s['params']]
        self.assertAlmostEqual(stages[1]['start'], 7.2 - 0.15, delta=0.01)

    def test_species_music_and_transitions(self):
        sp = dict(STAGES, kind='species', counter='ago')
        st = plan(sp, 24)
        self.assertEqual(st['music'][-1]['mood'], 'epic')
        stages = [s for s in st['shots'] if 'stage' in s['params']]
        self.assertEqual(stages[0]['in']['type'], 'cut'); self.assertEqual(stages[1]['in']['type'], 'flash')
        for a, b in zip(st['music'], st['music'][1:]):
            self.assertEqual(a['end'], b['start'])

if __name__ == '__main__':
    unittest.main()
