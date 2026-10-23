"""Regression tests for the Ray cinematic Shorts structural quality gate."""
import copy
import importlib.util
import json
from pathlib import Path
import unittest

HERE = Path(__file__).resolve().parent.parent
SCRIPT = HERE / '.claude/skills/ray-phim-ke-chuyen/scripts/preflight_story_video.py'
SPEC = importlib.util.spec_from_file_location('ray_preflight', SCRIPT)
MOD = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MOD)
TEMPLATE = HERE / '.claude/skills/ray-phim-ke-chuyen/templates/preflight-storyboard.json'

class RayPreflightTests(unittest.TestCase):
    def setUp(self):
        self.scenes = json.loads(TEMPLATE.read_text(encoding='utf8'))
    def test_ok_60s(self):
        errors, warnings, duration = MOD.validate(self.scenes, max_seconds=60)
        self.assertEqual(errors, []); self.assertEqual(duration,60.0)
    def test_hard_maximum(self):
        errors, _, _ = MOD.validate(self.scenes,max_seconds=59.99)
        self.assertTrue(any('exceeds strict max' in x for x in errors))
    def test_missing_emotion(self):
        broken=copy.deepcopy(self.scenes); del broken[3]['emotion']
        errors, _, _ = MOD.validate(broken,max_seconds=60)
        self.assertTrue(any('missing emotion' in x for x in errors))
    def test_caption_three_lines_rejected(self):
        broken=copy.deepcopy(self.scenes)
        broken[0]['caption_beats'][0]['text']='one\\ntwo\\nthree'.replace('\\n','\n')
        errors, _, _ = MOD.validate(broken,max_seconds=60)
        self.assertTrue(any('maximum 2 lines' in x for x in errors))
    def test_outdated_narration_voice_mismatch(self):
        measured=[dict(id=s['id'],text=s['narration'],voice_code='vbee',sha256='a'*64,audio_seconds=3) for s in self.scenes]
        measured[4]['text']='old stale text'
        errors, _, _ = MOD.validate(self.scenes,max_seconds=60,voice=measured)
        self.assertTrue(any('spoken text differs' in x for x in errors))
    def test_no_fake_final_signoff(self):
        errors, _, _=MOD.validate(self.scenes,max_seconds=60,final_checklist={'story':True})
        self.assertTrue(any('Final QA signoff missing' in x for x in errors))

if __name__ == '__main__':unittest.main()
