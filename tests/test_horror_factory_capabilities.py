import importlib.util
from pathlib import Path
import unittest
import io
import json
from unittest.mock import patch
from urllib.error import URLError


class CapabilityTests(unittest.TestCase):
    def evaluate(self, secrets=None, components=None, scope='drive_write_granted'):
        path = Path(__file__).resolve().parents[1] / 'scripts/horror_factory_capabilities.py'
        self.assertTrue(path.exists(), 'Missing stage-specific capability evaluator')
        spec = importlib.util.spec_from_file_location('capabilities', path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        present = {key: True for key in module.REQUIRED_SECRETS}
        present.update(secrets or {})
        available = dict(nightly_factory_entrypoint=True, existing_vbee_batch_tool=True,
                         ffmpeg_executable=True, ffprobe_executable=True, cairosvg_importable=True,
                         public_youtube_uploader=True, story_model_credential_present=False)
        available.update(components or {})
        return module.evaluate(present, available, scope)

    def test_chatgpt_planning_does_not_require_paid_llm_api(self):
        self.assertTrue(self.evaluate()['render_ready'])

    def test_drive_readonly_blocks_archive_but_not_render(self):
        result = self.evaluate(scope='drive_write_missing')
        self.assertTrue(result['render_ready'])
        self.assertFalse(result['archive_ready'])
        self.assertIn('DRIVE_WRITE_SCOPE_MISSING', result['blockers'])
        self.assertEqual(result['status'], 'RENDER_READY_ARCHIVE_BLOCKED')

    def test_missing_vbee_blocks_render(self):
        self.assertFalse(self.evaluate({'VBEE_ACCESS_TOKEN': False})['render_ready'])

    def test_missing_ffprobe_blocks_render(self):
        self.assertFalse(self.evaluate(components={'ffprobe_executable': False})['render_ready'])

    def test_missing_svg_renderer_blocks_render(self):
        self.assertFalse(self.evaluate(components={'cairosvg_importable': False})['render_ready'])

    def test_unknown_drive_scope_fails_closed(self):
        self.assertFalse(self.evaluate(scope='drive_scope_check_failed')['archive_ready'])

    def test_missing_channel_token_does_not_block_render(self):
        result = self.evaluate({'YOUTUBE_REFRESH_TOKEN': False})
        self.assertTrue(result['render_ready'])
        self.assertFalse(result['upload_preflight_ready'])

    def test_ready_report_never_claims_media_or_publication(self):
        result = self.evaluate()
        self.assertEqual(result['status'], 'READY_FOR_E2E_TEST')
        self.assertFalse(result['publish_public'])
        self.assertFalse(result['media_verified'])

    def test_real_scope_parser_fails_closed_and_never_prints_tokens(self):
        self.evaluate()
        path = Path(__file__).resolve().parents[1] / 'scripts/horror_factory_capabilities.py'
        spec = importlib.util.spec_from_file_location('scopecheck', path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        env = dict(DRIVE_REFRESH_TOKEN='test-refresh', YOUTUBE_CLIENT_ID='test-client',
                   YOUTUBE_CLIENT_SECRET='test-secret')
        for scope, expected in [
            ('https://www.googleapis.com/auth/drive.readonly', 'drive_write_missing'),
            ('https://www.googleapis.com/auth/drive.file', 'drive_write_granted'),
            ('https://www.googleapis.com/auth/drive', 'drive_write_granted'),
        ]:
            with self.subTest(scope=scope):
                replies = [io.BytesIO(b'{"access_token":"test-token"}'),
                           io.BytesIO(json.dumps({'scope': scope}).encode())]
                with patch.object(module, 'urlopen', side_effect=replies), patch('sys.stdout', new_callable=io.StringIO) as output:
                    self.assertEqual(module.inspect_drive_scope(env), expected)
                    self.assertEqual(output.getvalue(), '')
        for error in (URLError('offline'), ValueError('invalid JSON'), TimeoutError()):
            with self.subTest(error=type(error).__name__), patch.object(module, 'urlopen', side_effect=error):
                self.assertEqual(module.inspect_drive_scope(env), 'drive_scope_check_failed')
        self.assertEqual(module.inspect_drive_scope({}), 'drive_scope_unverified')


if __name__ == '__main__':
    unittest.main()
