import tempfile
import unittest
from pathlib import Path
from scripts import runtime_orchestrator as orchestration


class OrchestrationTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)

    def tearDown(self):
        self.tmp.cleanup()

    def test_dependencies_and_resume(self):
        orchestration.add("my-video", "research", "research-agent", root=self.root)
        orchestration.add("my-video", "script", "script-agent", ["research"], root=self.root)
        with self.assertRaises(ValueError):
            orchestration.transition("my-video", "script", "start", root=self.root)
        orchestration.transition("my-video", "research", "start", root=self.root)
        orchestration.transition("my-video", "research", "complete", root=self.root)
        orchestration.transition("my-video", "script", "start", root=self.root)
        orchestration.transition("my-video", "script", "fail", "timeout", root=self.root)
        orchestration.transition("my-video", "script", "resume", root=self.root)
        result = orchestration.transition("my-video", "script", "start", root=self.root)
        self.assertEqual(result["attempts"], 2)

    def test_retry_budget_is_not_reset(self):
        orchestration.add("my-video", "render", "render-agent", max_attempts=1, root=self.root)
        orchestration.transition("my-video", "render", "start", root=self.root)
        orchestration.transition("my-video", "render", "fail", root=self.root)
        with self.assertRaises(ValueError):
            orchestration.transition("my-video", "render", "resume", root=self.root)

    def test_blocks_invalid_inputs(self):
        with self.assertRaises(ValueError):
            orchestration.add("../outside", "task", "role", root=self.root)
        with self.assertRaises(ValueError):
            orchestration.add("my-video", "task", "role", ["unknown"], root=self.root)


if __name__ == "__main__":
    unittest.main()
