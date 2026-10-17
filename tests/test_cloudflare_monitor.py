import pathlib
import unittest
ROOT = pathlib.Path(__file__).resolve().parents[1]

class MonitorCloudTests(unittest.TestCase):
    def test_read_only_worker_has_no_gate_handler(self):
        src=(ROOT/'cloudflare/monitor/src/index.ts').read_text()
        self.assertIn('read only',src)
        self.assertNotIn('"/api/gate"&&req.method==="POST"',src)
    def test_sync_uses_canonical_local_api(self):
        src=(ROOT/'scripts/sync-cloudflare-monitor.py').read_text()
        self.assertIn('"/api/status"',src)
        self.assertIn('"/api/meta"',src)
        self.assertIn('https://',src)
    def test_ui_adapter_blocks_gate_mutation(self):
        src=(ROOT/'scripts/prepare-cloudflare-monitor.py').read_text()
        self.assertIn("unsafe mutation callback still present",src)

if __name__=='__main__':
    unittest.main()
