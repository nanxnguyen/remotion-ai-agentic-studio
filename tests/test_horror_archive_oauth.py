import importlib.util
from pathlib import Path
import unittest


class ArchiveOAuthTests(unittest.TestCase):
    def options(self, provider):
        path = Path(__file__).resolve().parents[1] / 'scripts/horror_archive_oauth.py'
        self.assertTrue(path.exists(), 'Missing explicit archive OAuth mode')
        spec = importlib.util.spec_from_file_location('oauth_setup', path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        self.assertTrue(hasattr(module, 'provider_options'), 'Missing explicit archive OAuth mode')
        return module.provider_options(provider)

    def test_existing_drive_mode_stays_readonly(self):
        scopes, secret, filename = self.options('drive')
        self.assertEqual(scopes, ['https://www.googleapis.com/auth/drive.readonly'])
        self.assertEqual((secret, filename), ('DRIVE_REFRESH_TOKEN', 'DRIVE_REFRESH_TOKEN.txt'))

    def test_archive_mode_only_adds_app_file_writes_and_uses_new_private_file(self):
        scopes, secret, filename = self.options('drive-archive')
        self.assertEqual(scopes, ['https://www.googleapis.com/auth/drive.readonly',
                                  'https://www.googleapis.com/auth/drive.file'])
        self.assertEqual(secret, 'DRIVE_REFRESH_TOKEN')
        self.assertEqual(filename, 'DRIVE_ARCHIVE_REFRESH_TOKEN.txt')
        self.assertNotIn('https://www.googleapis.com/auth/drive', scopes)

    def test_unknown_provider_rejected(self):
        with self.assertRaises(ValueError):
            self.options('unexpected')


if __name__ == '__main__':
    unittest.main()
