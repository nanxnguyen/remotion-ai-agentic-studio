import hashlib, importlib.util, tempfile, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('delivery',ROOT/'scripts/silent_factory_delivery.py')
d=importlib.util.module_from_spec(spec);spec.loader.exec_module(d)
SHA='a'*64
CHANNEL='UCY3n3Nlqyo6uI4GU8nuX-5g'

def make_record():
    return {'channel':'OLISE_MAN','channel_id':CHANNEL,'privacy':'private','video_sha256':SHA,'video_drive_id':'1abcDEFGHijklMNopQRS','thumbnail_drive_id':'1xyZ1234567890abcDEF',
       'metadata_path':'config/films/test-film.json','creative_release_basis':'creative_qa_passed',
       'independent_audiovisual_review':{'complete':True,'actual_encoded_media':True,'reviewed_video_sha256':SHA,'all_shots_reviewed':True,'audio_reviewed':True,'timeline_covered_seconds':210,'rights_verified':True,'creative_passed':True,'method':'separate multimodal reviewer actually evaluated all 36 shots and full soundtrack'}}

class DeliveryTests(unittest.TestCase):
    def test_rejects_wrong_channel(self):
        m=make_record();m['channel_id']='UC_OTHER'
        with self.assertRaisesRegex(d.DeliveryBlocked,'channel'):d.validate_delivery(m,SHA)
    def test_rejects_missing_review(self):
        m=make_record();m.pop('independent_audiovisual_review')
        with self.assertRaisesRegex(d.DeliveryBlocked,'review'):d.validate_delivery(m,SHA)
    def test_rejects_different_sha(self):
        with self.assertRaisesRegex(d.DeliveryBlocked,'SHA'):d.validate_delivery(make_record(),'b'*64)
    def test_acceptable_evidence(self):
        self.assertEqual(d.validate_delivery(make_record(),SHA)['privacy'],'private')
    def test_unreviewed_private_override_not_allowed(self):
        m=make_record();m['creative_release_basis']='private_override_after_5_actual_repairs';m['genuine_corrective_rounds']=5;m['distinct_attempt_sha256']=['0'*64]*6
        with self.assertRaisesRegex(d.DeliveryBlocked,'distinct'):d.validate_delivery(m,SHA)
    def test_dry_run_detects_duplicate_without_reupload(self):
        calls=[];m=make_record()
        def publish(record,execute):
            calls.append(execute)
            return {'channel_id':CHANNEL,'privacy':'private','video_sha256':SHA,'previously_uploaded_id':'Skas4K2mKYs'}
        out=d.safe_private_release(m,publish)
        self.assertEqual(out['status'],'DUPLICATE_VERIFY_REQUIRED')
        self.assertEqual(calls,[False])
    def test_success_requires_real_video_id(self):
        m=make_record();calls=[]
        def publish(record,execute):
            calls.append(execute)
            if execute:return {'status':'uploaded_private_ready_for_review','youtube_video_id':'abcdefghijk','channel_id':CHANNEL,'privacy':'private','video_sha256':SHA}
            return {'status':'dry_run','channel_id':CHANNEL,'privacy':'private','video_sha256':SHA}
        result=d.safe_private_release(m,publish)
        self.assertEqual(result['youtube_video_id'],'abcdefghijk')
        self.assertEqual(calls,[False,True])
    def test_wrong_private_status_blocks(self):
        m=make_record()
        with self.assertRaisesRegex(d.DeliveryBlocked,'Private'):
            d.safe_private_release(m,lambda record,execute:{'status':'dry_run','channel_id':CHANNEL,'privacy':'public','video_sha256':SHA})

class ThumbnailRecoveryTests(unittest.TestCase):
    def setUp(self):
        from unittest.mock import Mock
        self.m=make_record()
        self.youtube=Mock()
        self.video_id='abcdefghijk'
        item={'id':self.video_id,'snippet':{'channelId':CHANNEL,'tags':['saf-'+SHA[:32]],'thumbnails':{'default':{'url':'https://example.invalid'}}},'status':{'privacyStatus':'private'}}
        self.youtube.videos.return_value.list.return_value.execute.return_value={'items':[item]}
        self.youtube.thumbnails.return_value.set.return_value.execute.return_value={}
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.thumb=Path(self.temp.name)/'thumb.jpg';self.thumb.write_bytes(b'\xff\xd8\xff'+b'B'*100)

    def test_reuses_exact_private_video_to_fix_thumbnail(self):
        result=d.repair_existing_private_video(self.m,self.video_id,self.youtube,self.thumb,media_factory=lambda p,mime:object())
        self.assertEqual(result['youtube_video_id'],self.video_id)
        self.assertEqual(result['status'],'existing_private_verified')
        self.youtube.thumbnails.return_value.set.assert_called_once()

    def test_wrong_channel_or_sha_blocks_thumbnail_change(self):
        self.youtube.videos.return_value.list.return_value.execute.return_value={'items':[{'snippet':{'channelId':'UC_WRONG','tags':[]},'status':{'privacyStatus':'private'}}]}
        with self.assertRaisesRegex(d.DeliveryBlocked,'channel'):
            d.repair_existing_private_video(self.m,self.video_id,self.youtube,self.thumb,media_factory=lambda p,m:object())
        self.youtube.thumbnails.return_value.set.assert_not_called()

    def test_safe_publish_reconciles_duplicate_without_insert(self):
        flags=[]
        def publish(record,execute):
            flags.append(execute)
            return {'channel_id':CHANNEL,'privacy':'private','video_sha256':SHA,'previously_uploaded_id':self.video_id}
        def repair(record,vid):
            self.assertEqual(vid,self.video_id)
            return {'status':'existing_private_verified','youtube_video_id':vid}
        out=d.safe_private_release(self.m,publish,repair_existing=repair)
        self.assertEqual((out['status'],flags),('existing_private_verified',[False]))

    def test_thumbnail_pending_repairs_same_video(self):
        def publish(record,execute):
            if execute:return {'channel_id':CHANNEL,'privacy':'private','video_sha256':SHA,'status':'uploaded_private_thumbnail_pending','youtube_video_id':self.video_id}
            return {'channel_id':CHANNEL,'privacy':'private','video_sha256':SHA,'status':'dry_run'}
        out=d.safe_private_release(self.m,publish,repair_existing=lambda rec,vid:{'status':'existing_private_verified','youtube_video_id':vid})
        self.assertEqual(out['youtube_video_id'],self.video_id)

class SemanticCoverageTests(unittest.TestCase):
    def technical(self):
        return {'movie_sha256':SHA,'all_video_frames_decoded':True,'all_audio_decoded':True,'width':2560,'height':1440,'fps':30,'duration_seconds':210,'shots':36,'caption_highlights_supplied':20}
    def film(self):
        return {'shots':[{'id':f'shot-{i:02d}'} for i in range(1,37)]}
    def complete_review(self):
        x=make_record()
        review=x['independent_audiovisual_review']
        review.update(provider='independent_vlm_backend',reviewer_id='reviewer-02',
            shots=[{'id':f'shot-{i:02d}','start':(i-1)*175/30,'end':i*175/30,'visual_assessed':True,'motion_assessed':True} for i in range(1,37)],
            audio_sections=[{'start':i*42,'end':(i+1)*42,'assessed':True} for i in range(5)],
            caption_cues_reviewed=20,creative_passed=True,defects=[])
        return x
    def test_flag_only_review_cannot_certify_full_movie(self):
        with self.assertRaisesRegex(d.DeliveryBlocked,'independent'):
            d.validate_reviewed_film(self.technical(),make_record(),self.film())
    def test_real_36_shot_5_phase_report_is_accepted(self):
        x=d.validate_reviewed_film(self.technical(),self.complete_review(),self.film())
        self.assertEqual(x['status'],'CREATIVE_PASS')
    def test_missing_audio_section_never_passes(self):
        doc=self.complete_review()
        doc['independent_audiovisual_review']['audio_sections'].pop()
        with self.assertRaisesRegex(d.DeliveryBlocked,'audio'):
            d.validate_reviewed_film(self.technical(),doc,self.film())

class DirectScriptImportTests(unittest.TestCase):
    def test_media_review_import_works_when_executed_as_script(self):
        import subprocess, sys
        script_dir = str(ROOT / 'scripts')
        code = """import sys
sys.path.insert(0, sys.argv[1])
import silent_factory_delivery as d
tech = {'movie_sha256': 'a'*64, 'all_video_frames_decoded': True, 'all_audio_decoded': True, 'width':2560, 'height':1440, 'fps':30, 'duration_seconds':210, 'caption_highlights_supplied':20}
story = {'shots':[{'id':f'shot-{i:02d}'} for i in range(1,37)]}
try: d.validate_reviewed_film(tech, {}, story)
except d.DeliveryBlocked: pass
else: raise AssertionError('An unavailable independent reviewer should block')
"""
        child=subprocess.run([sys.executable,'-I','-c',code,script_dir],capture_output=True,text=True,check=False)
        self.assertEqual(child.returncode,0,child.stderr)

if __name__=='__main__':unittest.main()