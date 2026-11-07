import importlib.util, unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('sf_state', ROOT/'scripts/silent_factory_run_state.py')
s=importlib.util.module_from_spec(spec); spec.loader.exec_module(s)

class StateTests(unittest.TestCase):
    def start(self): return s.new_run('2026-11-06', 'unbroken-bridge','a'*64)
    def test_deterministic_run_key(self):
        self.assertEqual(s.make_run_key('2026-11-06','unbroken-bridge'),'2026-11-06/unbroken-bridge')
        with self.assertRaises(ValueError): s.make_run_key('2026-11-06','../../leak')
    def test_prevents_premature_publish(self):
        with self.assertRaises(s.InvalidTransition): s.transition(self.start(),'UPLOAD_STARTED',{'video_id':'x'})
    def test_requires_real_script_audit(self):
        with self.assertRaises(s.InvalidTransition): s.transition(self.start(),'SCRIPT_PASS',{'score':91})
        x=s.transition(self.start(),'SCRIPT_PASS',{'score':89,'audit_sha':'b'*64})
        self.assertEqual(x['status'],'SCRIPT_AUDITED')
    def test_real_render_qa_hash_and_replay(self):
        x=s.transition(self.start(),'SCRIPT_PASS',{'score':89,'audit_sha':'b'*64})
        x=s.transition(x,'RENDER_START',{'manifest_sha':'c'*64})
        with self.assertRaises(s.InvalidTransition): s.transition(x,'RENDER_COMPLETE',{'movie_sha':'d'*64})
        x=s.transition(x,'RENDER_COMPLETE',{'movie_sha':'d'*64,'artifact_id':123,'all_frames_decoded':True})
        self.assertEqual(s.transition(x,'RENDER_COMPLETE',{'movie_sha':'d'*64,'artifact_id':123,'all_frames_decoded':True}),x)
        self.assertEqual(x['status'],'TECH_QA_PASSED')
    def test_no_fake_fix_rounds(self):
        x=self.start(); x=s.transition(x,'SCRIPT_PASS',{'score':89,'audit_sha':'b'*64});x=s.transition(x,'RENDER_START',{'manifest_sha':'c'*64});x=s.transition(x,'RENDER_COMPLETE',{'movie_sha':'d'*64,'artifact_id':12,'all_frames_decoded':True});x=s.transition(x,'REVIEW_START',{'reviewed_sha':'d'*64});x=s.transition(x,'REVIEW_FAIL',{'reviewed_sha':'d'*64,'defects':[{'shot_id':'shot-09','timecode':51}]})
        with self.assertRaises(s.InvalidTransition): s.transition(x,'REPAIR_START',{'manifest_sha':'c'*64})
        x=s.transition(x,'REPAIR_START',{'manifest_sha':'e'*64})
        self.assertEqual((x['attempt'],x['status']),(1,'RENDERING'))
    def test_repair_cap(self):
        x=self.start(); x['status']='REPAIR_PENDING';x['attempt']=5;x['last_manifest_sha']='f'*64
        with self.assertRaises(s.InvalidTransition):s.transition(x,'REPAIR_START',{'manifest_sha':'a'*64})
    def test_wrong_review_hash_denied(self):
        x=self.start();x['status']='TECH_QA_PASSED';x['last_video_sha']='a'*64
        with self.assertRaises(s.InvalidTransition):s.transition(x,'REVIEW_START',{'reviewed_sha':'b'*64})
    def test_retryable_failure_restore(self):
        x=self.start(); x=s.transition(x,'FAIL_RETRYABLE',{'code':'DRIVE_RATE_LIMIT'})
        self.assertEqual(s.resume(x)['status'],'CREATED')
        self.assertEqual(s.resume(x)['history'][-1]['event'],'RESUME')
    def test_upload_identity_mandatory(self):
        x=self.start();x['status']='UPLOADING_PRIVATE';x['last_video_sha']='a'*64
        with self.assertRaises(s.InvalidTransition):s.transition(x,'UPLOAD_SUCCESS',{'youtube_video_id':'123','channel_id':'wrong','privacy':'private'})
        y=s.transition(x,'UPLOAD_SUCCESS',{'youtube_video_id':'Skas4K2mKYs','channel_id':'UCY3n3Nlqyo6uI4GU8nuX-5g','privacy':'private'})
        self.assertEqual(y['status'],'UPLOADED_PRIVATE')

if __name__=='__main__': unittest.main()