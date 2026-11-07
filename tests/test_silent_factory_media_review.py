import importlib.util, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('media_review',ROOT/'scripts/silent_factory_media_review.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
VIDEO_SHA='a'*64
SHOT_IDS=[f'shot-{i:02d}' for i in range(1,37)]

def technical():
    return dict(movie_sha256=VIDEO_SHA,all_video_frames_decoded=True,all_audio_decoded=True,shots=36,width=2560,height=1440,fps=30,duration_seconds=210,caption_highlights_supplied=20,integrated_lufs=-13.9)

def report():
    return {'provider':'external_independent_multimodal_reviewer','reviewer_id':'reviewer-02','actual_encoded_media':True,'reviewed_video_sha256':VIDEO_SHA,'method':'independent full film timecoded visual+audio review',
        'shots':[{'id':s,'start':i*175/30,'end':(i+1)*175/30,'visual_assessed':True,'motion_assessed':True} for i,s in enumerate(SHOT_IDS)],
        'audio_sections':[{'start':i*42,'end':(i+1)*42,'assessed':True} for i in range(5)],
        'caption_cues_reviewed':20,'rights_verified':True,'creative_passed':True,'defects':[]}

class ReviewTests(unittest.TestCase):
    def test_no_backend_never_passes(self):
        result=m.verify_review(technical(),None,SHOT_IDS)
        self.assertEqual(result['status'],'REVIEWER_UNAVAILABLE')
        self.assertFalse(result['creative_qa_passed'])
    def test_complete_independent_report(self):
        r=m.verify_review(technical(),report(),SHOT_IDS)
        self.assertEqual(r['status'],'CREATIVE_PASS')
        self.assertEqual(r['reviewed_video_sha256'],VIDEO_SHA)
    def test_wrong_sha_rejected(self):
        x=report();x['reviewed_video_sha256']='b'*64
        with self.assertRaisesRegex(m.MediaReviewBlocked,'SHA'):m.verify_review(technical(),x,SHOT_IDS)
    def test_missing_shot_or_camera_review_rejected(self):
        x=report();x['shots']=x['shots'][:-1]
        with self.assertRaisesRegex(m.MediaReviewBlocked,'shot'):m.verify_review(technical(),x,SHOT_IDS)
        x=report();x['shots'][15]['motion_assessed']=False
        with self.assertRaisesRegex(m.MediaReviewBlocked,'motion'):m.verify_review(technical(),x,SHOT_IDS)
    def test_audio_not_reviewed_rejected(self):
        x=report();x['audio_sections'][4]['assessed']=False
        with self.assertRaisesRegex(m.MediaReviewBlocked,'audio'):m.verify_review(technical(),x,SHOT_IDS)
    def test_caption_coverage_required(self):
        x=report();x['caption_cues_reviewed']=18
        with self.assertRaisesRegex(m.MediaReviewBlocked,'caption'):m.verify_review(technical(),x,SHOT_IDS)
    def test_unverified_rights_rejected(self):
        x=report();x['rights_verified']=False
        with self.assertRaisesRegex(m.MediaReviewBlocked,'rights'):m.verify_review(technical(),x,SHOT_IDS)
    def test_self_review_not_independent(self):
        x=report();x['provider']='producer'
        with self.assertRaisesRegex(m.MediaReviewBlocked,'independent'):m.verify_review(technical(),x,SHOT_IDS)
    def test_negative_creative_review_is_honest(self):
        x=report();x['creative_passed']=False;x['defects']=[{'shot_id':'shot-03','timecode':13.4,'severity':'major','fix':'Improve acting'}]
        y=m.verify_review(technical(),x,SHOT_IDS)
        self.assertEqual(y['status'],'CREATIVE_FAIL');self.assertFalse(y['creative_qa_passed'])
    def test_technical_decode_required(self):
        x=technical();x['all_audio_decoded']=False
        with self.assertRaisesRegex(m.MediaReviewBlocked,'decode'):m.verify_review(x,report(),SHOT_IDS)

if __name__=='__main__':unittest.main()