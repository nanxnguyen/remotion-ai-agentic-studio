import os, sys, unittest
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'tools'))
from visemes import syllable_visemes, words_to_visemes

def seq(vis):
    return [v['v'] for v in vis]

class VisemeTest(unittest.TestCase):
    def test_vietnamese_syllables(self):
        self.assertEqual(syllable_visemes('mẹ', 'vi'), ['M', 'E'])
        self.assertEqual(syllable_visemes('mua', 'vi'), ['M', 'U', 'A'])
        self.assertEqual(syllable_visemes('bánh', 'vi'), ['M', 'A'])
        self.assertEqual(syllable_visemes('phở', 'vi'), ['F', 'O'])
        self.assertEqual(syllable_visemes('nghiêm', 'vi'), ['E', 'M'])
        self.assertEqual(syllable_visemes('Quốc,', 'vi'), ['U', 'O'])
        self.assertEqual(syllable_visemes('...', 'vi'), [])

    def test_sentence_sequence_and_timing(self):
        words = [{'word': 'mẹ', 'start': 0.00, 'end': 0.30}, {'word': 'mua', 'start': 0.32, 'end': 0.70}, {'word': 'bánh', 'start': 0.72, 'end': 1.10}]
        vis = words_to_visemes(words, 'vi', fps=24)
        self.assertEqual(seq(vis), ['M', 'E', 'M', 'U', 'A', 'M', 'A', 'rest'])
        for a, b in zip(vis, vis[1:]):
            self.assertLess(a['t'], b['t'])
        # every mouth shape inside its word, snapped to the frame grid (≤ 1 frame error)
        self.assertAlmostEqual(vis[0]['t'], 0.0, delta=1 / 24)
        self.assertAlmostEqual(vis[2]['t'], 0.32, delta=1 / 24)
        self.assertAlmostEqual(vis[5]['t'], 0.72, delta=1 / 24)
        self.assertAlmostEqual(vis[-1]['t'], 1.10, delta=1 / 24)

    def test_pause_closes_mouth(self):
        words = [{'word': 'a', 'start': 0, 'end': 0.3}, {'word': 'o', 'start': 1.0, 'end': 1.3}]
        self.assertEqual(seq(words_to_visemes(words, 'vi')), ['A', 'rest', 'O', 'rest'])

    def test_english_fallback(self):
        self.assertEqual(syllable_visemes('mob', 'en'), ['M', 'O', 'M'])
        self.assertEqual(syllable_visemes('five', 'en'), ['F', 'E', 'F'])

if __name__ == '__main__':
    unittest.main()
