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

if __name__=='__main__':unittest.main()