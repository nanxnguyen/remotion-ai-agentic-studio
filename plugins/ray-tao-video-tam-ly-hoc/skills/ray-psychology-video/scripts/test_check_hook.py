import sys
import unittest
from pathlib import Path

sys.path.insert(0,str(Path(__file__).resolve().parent))
from check_hook import validate_hook

class HookGateTests(unittest.TestCase):
    def setUp(self):
        self.candidate={'chosen_hook':'', 'intro_hook':{
            'spoken_text':'Sếp vừa giao thêm việc. Bạn từ chối thế nào?',
            'viewer_challenge':'choose a reply','visual_action_first_second':'a task card reaches the tired figure',
            'target_duration_seconds':2.8,'measured_audio_duration_seconds':2.9,
            'originality_review':'PASS','sync_review':'PASS'
        }}
        self.recent=[{'hook_text':f'Tập trước: lựa chọn riêng số {i} không liên quan.'} for i in range(10)]
    def test_pass_for_distinct_verified_2_9_seconds(self):
        self.assertEqual(validate_hook(self.candidate,self.recent,'render'),[])
    def test_reject_exact_reuse_even_different_episode(self):
        self.recent[3]['hook_text']=self.candidate['intro_hook']['spoken_text']
        self.assertTrue(any('duplicate' in x for x in validate_hook(self.candidate,self.recent,'render')))
    def test_reject_near_duplicate(self):
        self.recent[2]['hook_text']='Sếp vừa giao thêm việc, bạn từ chối thế nào?'
        self.assertTrue(any('duplicate' in x for x in validate_hook(self.candidate,self.recent,'draft')))
    def test_reject_five_seconds_audio(self):
        self.candidate['intro_hook']['measured_audio_duration_seconds']=5.0
        self.assertTrue(any('1–4' in x for x in validate_hook(self.candidate,self.recent,'render')))
    def test_missing_history_does_not_claim_verified_novelty(self):
        self.assertTrue(any('incomplete' in x.lower() for x in validate_hook(self.candidate,[], 'draft')))
    def test_missing_visual_challenge_fails(self):
        self.candidate['intro_hook']['visual_action_first_second']=''
        self.assertTrue(any('visual' in x for x in validate_hook(self.candidate,self.recent,'draft')))

if __name__=='__main__': unittest.main()
