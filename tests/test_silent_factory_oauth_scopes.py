import importlib.util, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('scopes',ROOT/'scripts/silent_factory_oauth_scopes.py')
s=importlib.util.module_from_spec(spec);spec.loader.exec_module(s)

class ScopedGrantTests(unittest.TestCase):
    def test_existing_drive_read_only_unchanged(self):
        scopes, secret=s.grant_for('drive',['youtube.upload'],['drive.readonly'])
        self.assertEqual(scopes,['drive.readonly']);self.assertEqual(secret,'DRIVE_REFRESH_TOKEN')
    def test_drive_writer_is_separate_secret_and_scope(self):
        scopes,secret=s.grant_for('drive-write',['youtube.upload'],['drive.readonly'])
        self.assertEqual(scopes,['https://www.googleapis.com/auth/drive.file'])
        self.assertEqual(secret,'DRIVE_WRITE_REFRESH_TOKEN')
    def test_youtube_keeps_its_channel_specific_grant(self):
        scopes,secret=s.grant_for('youtube',['youtube.upload'],['drive.readonly'])
        self.assertEqual(scopes,['youtube.upload']);self.assertIsNone(secret)
    def test_unknown_provider_rejected(self):
        with self.assertRaisesRegex(ValueError,'provider'):s.grant_for('drive-full',['youtube.upload'],['drive.readonly'])
if __name__=='__main__':unittest.main()