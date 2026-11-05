import importlib.util, hashlib, json, tempfile, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('checkpoint',ROOT/'scripts/silent_factory_checkpoint.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
class FakeStore:
    def __init__(self):self.st={};self.saved=0
    def load(self,key):return self.st.get(key)
    def save(self,record):self.st[record['run_key']]=record;self.saved+=1;return 123

class CheckpointTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name)
        self.job=self.root/'20261106-missing-step.json'
        self.audit_path=self.root/'config/silent-factory/audits/20261106-missing-step.json'
        self.audit_path.parent.mkdir(parents=True)
        self.audit={'quality':89,'growth':40,'hook':13,'logic':13,'blockers':0,'majors':0,'auditor':'animation-script-audit'}
        self.audit_path.write_text(json.dumps(self.audit))
        self.doc={'title':'The Missing Step','revision':0,'script_audit':{'path':'config/silent-factory/audits/20261106-missing-step.json','report_sha':hashlib.sha256(self.audit_path.read_bytes()).hexdigest()}}
        self.job.write_text(json.dumps(self.doc));self.store=FakeStore()
    def test_identifies_a_film_consistently(self):
        self.assertEqual(c.run_key_for_job(self.job),'2026-11-06/missing-step')
        self.assertEqual(c.run_key_for_job(self.root/'the-missing-step-20261106.json'),'2026-11-06/the-missing-step')
    def test_missing_independent_script_audit_blocks_render(self):
        self.audit['growth']=30
        self.audit_path.write_text(json.dumps(self.audit))
        self.doc['script_audit']['report_sha']=hashlib.sha256(self.audit_path.read_bytes()).hexdigest()
        self.job.write_text(json.dumps(self.doc))
        with self.assertRaisesRegex(c.CheckpointBlocked,'growth'):
            c.start_job(self.store,self.job,root=self.root)
        self.assertEqual(self.store.saved,0)
    def test_baseline_to_technical_qa_checkpoint(self):
        x=c.start_job(self.store,self.job,root=self.root)
        self.assertEqual(x['status'],'RENDERING')
        out=c.finish_render(self.store,self.job,{'movie_sha256':'c'*64,'all_video_frames_decoded':True,'all_audio_decoded':True},1234,root=self.root)
        self.assertEqual(out['status'],'TECH_QA_PASSED')
        self.assertEqual(out['last_artifact_id'],1234)
        self.assertEqual(self.store.saved,2)
    def test_duplicate_completion_replay_idempotent(self):
        c.start_job(self.store,self.job,root=self.root)
        qa={'movie_sha256':'c'*64,'all_video_frames_decoded':True,'all_audio_decoded':True}
        c.finish_render(self.store,self.job,qa,1234,root=self.root)
        out=c.finish_render(self.store,self.job,qa,1234,root=self.root)
        self.assertEqual(out['distinct_video_hashes'],['c'*64])
    def test_manifest_changed_after_render_start_denied(self):
        c.start_job(self.store,self.job,root=self.root)
        self.doc['title']='Modified without new attempt'
        self.job.write_text(json.dumps(self.doc))
        with self.assertRaisesRegex(c.CheckpointBlocked,'manifest SHA'):
            c.finish_render(self.store,self.job,{'movie_sha256':'c'*64,'all_video_frames_decoded':True,'all_audio_decoded':True},1234,root=self.root)

if __name__=='__main__':unittest.main()