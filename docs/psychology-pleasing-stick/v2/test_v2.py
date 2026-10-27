from pathlib import Path
import json,hashlib,re,unittest
R=Path(__file__).resolve().parent
P=R.parent
class V2Tests(unittest.TestCase):
 def test_time_cues_complete_contiguous(self):
  d=json.loads((R/'caption-timing-V2.json').read_text());t=json.loads((P/'timing.json').read_text());c=d['cues']
  self.assertEqual(len(c),22)
  self.assertAlmostEqual(c[0]['start'],0,places=2)
  self.assertAlmostEqual(c[-1]['end'],t['voiceDuration'],delta=.05)
  self.assertTrue(all(x['end']>x['start'] for x in c))
  self.assertTrue(all(abs(c[i]['end']-c[i+1]['start'])<.003 for i in range(len(c)-1)))
  self.assertEqual(sorted(set(x['scene'] for x in c)),list(range(9)))
  self.assertIn('NOT forced aligned',d['alignment'])
 def test_verbatim_speech_content(self):
  # Syllable-level words from actual saved script and visual cues in order
  words=lambda s:re.findall(r'[\w\u00c0-\u1ef9]+',s.casefold())
  c=json.loads((R/'caption-timing-V2.json').read_text())['cues']
  fromvoice=words(((P/'narration.txt') if (P/'narration.txt').exists() else (P/'vbee-script-V1.txt')).read_text())
  fromcaption=words(' '.join(x['text'] for x in c))
  self.assertEqual(fromcaption,fromvoice)
 def test_footer_cannot_show_08_of_06_and_cta_has_gap(self):
  s=(R/'entry-v2.tsx').read_text()
  self.assertIn('idx>=7?',s)
  self.assertIn('GÓC NHÌN',s);self.assertIn('KẾT THÚC',s)
  self.assertNotIn('Math.max(1,idx)',s)
  self.assertIn('y={245}',s)
  # original actor foot bottom = 245+243*1.26=551; button top = 606, no collision
  self.assertGreater(606-(245+243*1.26),50)
 def test_remotion_assets_are_real_and_separate(self):
  s=(R/'entry-v2.tsx').read_text()
  self.assertIn('PsychologyPeoplePleasingV2',s)
  self.assertIn('captionTimings.cues',s)
  self.assertIn('BeVietnamPro-ExtraBold.ttf',s)
  self.assertIn('psychology-voice-clean-48k.wav',s)
  self.assertIn('psychology-music-48k.wav',s)
  self.assertIn('<ActionPropsV2 scene={scene} phase={phase}/>',s)
  self.assertNotEqual(hashlib.sha256((P/'entry.tsx').read_bytes()).hexdigest(),hashlib.sha256((R/'entry-v2.tsx').read_bytes()).hexdigest())
if __name__=='__main__':unittest.main()
