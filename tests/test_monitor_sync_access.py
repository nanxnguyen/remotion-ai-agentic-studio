import contextlib
import importlib.util
import io
import os
import pathlib
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('monitor_sync', pathlib.Path(__file__).resolve().parents[1] / 'scripts/sync-cloudflare-monitor.py')
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)

class SyncAccessTests(unittest.TestCase):
    def test_upload_includes_access_service_credentials(self):
        with tempfile.TemporaryDirectory() as folder:
            env = {'CLOUDFLARE_MONITOR_SYNC_TOKEN': 'test-sync', 'CF_ACCESS_CLIENT_ID': 'test-id', 'CF_ACCESS_CLIENT_SECRET': 'test-secret'}
            args = ['sync', '--remote', 'https://monitor.example.com', '--state-db', folder + '/state.db']
            response = io.StringIO('{"ok":true}')
            with patch.dict(os.environ, env, clear=True), patch('sys.argv', args), patch.object(sync, 'load_json', side_effect=[[], {}]), patch.object(sync.urllib.request, 'urlopen', return_value=response) as upload, contextlib.redirect_stdout(io.StringIO()):
                self.assertEqual(sync.main(), 0)
            headers = dict((k.lower(), v) for k, v in upload.call_args.args[0].header_items())
            self.assertEqual(headers.get('cf-access-client-id'), 'test-id')
            self.assertEqual(headers.get('cf-access-client-secret'), 'test-secret')
            self.assertEqual(headers.get('authorization'), 'Bearer test-sync')
