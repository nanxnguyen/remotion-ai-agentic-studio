"""Handoff contract checks with isolated fixtures, never mutable production status."""
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("handoff", ROOT / "scripts" / "validate-video-handoff.py")
handoff = importlib.util.module_from_spec(spec)
spec.loader.exec_module(handoff)


class HandoffTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.docs = self.root / 'docs/sample'
        self.docs.mkdir(parents=True)
        self.contract = {
            'shots': [{'voiceKey': 's1'}, {'voiceKey': 's2'}],
            'timeline': {'finalized': False}, 'publish': {'enabled': False},
            'voice': {'generated': False},
        }
        (self.docs / 'voice.json').write_text(json.dumps({'s1': 'Xin chào.', 's2': 'Cảm ơn.'}), encoding='utf-8')
        self.write_contract()
        for name in ('brief.md', 'script.md', 'content-pack.md', 'design-spec.md', 'HANDOFF.md'):
            (self.docs / name).write_text('fixture', encoding='utf-8')
        video = self.root / 'src/videos/sample'
        video.mkdir(parents=True)
        for name in ('index.ts', 'Reel.tsx', 'scenes.tsx', 'timeline.ts'):
            (video / name).write_text('// fixture', encoding='utf-8')
        (video.parent / 'registry.ts').write_text("import sample from './sample';", encoding='utf-8')
        root_patch = patch.object(handoff, 'ROOT', self.root)
        root_patch.start()
        self.addCleanup(root_patch.stop)

    def write_contract(self):
        (self.docs / 'production-contract.json').write_text(json.dumps(self.contract), encoding='utf-8')

    def test_pending_local_handoff_contract(self):
        self.assertEqual([], handoff.validate('sample'))

    def test_generated_voice_is_not_a_pending_handoff(self):
        self.contract['voice']['generated'] = True
        self.write_contract()
        self.assertIn('voice must be pending on ChatGPT handoff', handoff.validate('sample'))

    def test_publish_enabled_is_blocked(self):
        self.contract['publish']['enabled'] = True
        self.write_contract()
        self.assertIn('handoff must disable publishing', handoff.validate('sample'))

    def test_changed_shot_order_is_blocked(self):
        self.contract['shots'].reverse()
        self.write_contract()
        self.assertIn('shot voiceKey order must match voice.json exactly', handoff.validate('sample'))

    def test_missing_video_blocked(self):
        self.assertTrue(handoff.validate('missing-video'))


if __name__ == '__main__':
    unittest.main()
