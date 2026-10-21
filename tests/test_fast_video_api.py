"""Real localhost HTTP tests; fixture data avoids modifying production videos.

Latency is measured separately from remote AI inference and render duration.
"""
import concurrent.futures
import http.client
import json
import tempfile
import threading
import time
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts import pipeline


class FastVideoApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.docs = Path(cls.temp.name)
        (cls.docs / 'fixture').mkdir()
        (cls.docs / 'fixture/status.json').write_text('{}')
        cls.fixture = [{'folder': f'video-{i}', 'name': 'Gia đình Việt Nam',
                        'stages': [{'id': 'audio', 'state': 'pending'}]} for i in range(200)]
        cls.views = patch.object(pipeline, 'all_views', return_value=cls.fixture)
        cls.doc_patch = patch.object(pipeline, 'DOCS', cls.docs)
        cls.views.start()
        cls.doc_patch.start()
        cls.server = pipeline.MonitorServer(('127.0.0.1', 0), pipeline.Handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=2)
        cls.doc_patch.stop()
        cls.views.stop()
        cls.temp.cleanup()

    def request(self, method, path, body=None, headers=None):
        conn = http.client.HTTPConnection('127.0.0.1', self.server.server_port, timeout=5)
        try:
            conn.request(method, path, body=body, headers=headers or {})
            response = conn.getresponse()
            return response.status, dict(response.getheaders()), response.read()
        finally:
            conn.close()

    def test_status_preserves_unicode_and_length(self):
        code, headers, body = self.request('GET', '/api/status')
        self.assertEqual(200, code)
        self.assertEqual(self.fixture, json.loads(body))
        self.assertEqual(len(body), int(headers['Content-Length']))
        self.assertIn('application/json', headers['Content-Type'])
        self.assertEqual('no-cache', headers['Cache-Control'])

    def test_conditional_poll_returns_304_without_body(self):
        _, headers, _ = self.request('GET', '/api/status')
        code, cached_headers, body = self.request('GET', '/api/status', headers={'If-None-Match': headers['ETag']})
        self.assertEqual(304, code)
        self.assertEqual(b'', body)
        self.assertEqual(headers['ETag'], cached_headers['ETag'])

    def test_changed_status_invalidates_etag(self):
        _, before, _ = self.request('GET', '/api/status')
        with patch.object(pipeline, 'all_views', return_value=[{'folder': 'changed'}]):
            code, after, body = self.request('GET', '/api/status', headers={'If-None-Match': before['ETag']})
        self.assertEqual(200, code)
        self.assertNotEqual(before['ETag'], after['ETag'])
        self.assertEqual([{'folder': 'changed'}], json.loads(body))

    def test_meta_has_pipeline_contract(self):
        code, _, body = self.request('GET', '/api/meta')
        self.assertEqual(200, code)
        data = json.loads(body)
        self.assertEqual(pipeline.FLOW, data['flow'])
        self.assertEqual(dict(pipeline.STAGES), data['stages'])
        self.assertEqual(pipeline.PASS_SCORE, data['pass_score'])

    def test_malformed_writes_return_400_and_never_save(self):
        payloads = ['{broken', 'null', '[]', 'true', '{}',
                    json.dumps({'video': [], 'stage': 'audio', 'decision': 'approve'}),
                    json.dumps({'video': 'fixture', 'stage': {}, 'decision': 'approve'})]
        with patch.object(pipeline, 'save') as save:
            for raw in payloads:
                with self.subTest(raw=raw):
                    code, _, body = self.request('POST', '/api/gate', raw,
                                                 {'Content-Type': 'application/json'})
                    self.assertEqual(400, code, body)
                    self.assertIn('error', json.loads(body))
            save.assert_not_called()

    def test_bad_listening_record_cannot_pass(self):
        for raw in ['{broken', '{}', 'null', json.dumps({'video': 'fixture', 'by': ''})]:
            with self.subTest(raw=raw), patch.object(pipeline, 'record_audio_listen') as record:
                code, _, body = self.request('POST', '/api/audio-listen', raw,
                                             {'Content-Type': 'application/json'})
                self.assertEqual(400, code, body)
                record.assert_not_called()

    def test_concurrent_polling_stays_correct_with_generous_timeout(self):
        def poll(_):
            start = time.perf_counter()
            code, _, body = self.request('GET', '/api/status')
            return code, json.loads(body), time.perf_counter() - start
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            results = list(pool.map(poll, range(40)))
        for code, body, elapsed in results:
            self.assertEqual(200, code)
            self.assertEqual(self.fixture, body)
            self.assertLess(elapsed, 5, 'HTTP responsiveness regression; not a production SLA')
        durations = sorted(item[2] * 1000 for item in results)
        print(f'HTTP fixture (200 videos, 4 clients, n=40): p50={durations[19]:.2f}ms p95={durations[37]:.2f}ms')


if __name__ == '__main__':
    unittest.main()
