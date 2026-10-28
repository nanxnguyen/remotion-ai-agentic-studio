import unittest
import verify_shorts

class CheckVideoTests(unittest.TestCase):
    def setUp(self):
        self.fixture = {
            'format': {'duration': '38.144'},
            'streams': [
                {'codec_type': 'video', 'codec_name': 'h264', 'pix_fmt': 'yuv420p', 'width':1080, 'height':1920, 'avg_frame_rate':'30/1'},
                {'codec_type': 'audio', 'codec_name': 'aac', 'sample_rate': '48000', 'channels':2},
            ]
        }
    def test_happy_path(self):
        self.assertEqual(verify_shorts.check_video(self.fixture), [])
    def test_bad_frame_rate_rejected(self):
        self.fixture['streams'][0]['avg_frame_rate']='25/1'
        self.assertIn('Expected 30 or 60 FPS', ' '.join(verify_shorts.check_video(self.fixture)))
    def test_bad_audio_is_rejected(self):
        self.fixture['streams'][1]['sample_rate']='44100'
        self.assertIn('Expected 48000 Hz', ' '.join(verify_shorts.check_video(self.fixture)))
    def test_final_requires_signoff(self):
        self.assertIn('FINAL without human_signoff', ' '.join(verify_shorts.check_manifest(self.fixture, {'status':'FINAL'})))

if __name__=='__main__':
    unittest.main()
