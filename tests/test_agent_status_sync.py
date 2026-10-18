"""Regression checks: review/stage completion must extinguish stale live-agent badges."""
import unittest
from unittest.mock import patch
from contextlib import nullcontext
from scripts import pipeline


class AgentStatusSyncTests(unittest.TestCase):
    def test_settle_matching_and_numbered_agents(self):
        data = {"agents": {
            "script-reviewer": {"state": "running", "stage": "script"},
            "scene-agent-2": {"state": "running", "stage": "build"},
            "scene-agent-3": {"state": "done", "stage": "build"},
            "voice-agent": {"state": "running", "stage": "voice"},
        }}
        pipeline.settle_agent_records(data, ("scene-agent",), "done", "build -> done")
        self.assertEqual(data["agents"]["scene-agent-2"]["state"], "done")
        self.assertEqual(data["agents"]["scene-agent-3"]["state"], "done")
        self.assertEqual(data["agents"]["voice-agent"]["state"], "running")
        pipeline.settle_agent_records(data, ("script-reviewer",), "done", "review A -> pass")
        self.assertEqual(data["agents"]["script-reviewer"]["state"], "done")

    def test_terminal_monitor_run_cannot_leave_ghost_running_agents(self):
        data = {"runs": [], "agents": {
            "video-director": {"state": "running"},
            "video-reviewer": {"state": "running", "stage": "render"},
        }}
        run = {"id": "run1", "label": "test", "state": "done"}
        with patch.object(pipeline, "status_lock", return_value=nullcontext()), \
             patch.object(pipeline, "load", return_value=data), \
             patch.object(pipeline, "save"), \
             patch.object(pipeline, "log"):
            pipeline._record_run("video-test", run, "done", "finished")
        self.assertEqual(data["agents"]["video-reviewer"]["state"], "idle")
        self.assertEqual(data["agents"]["video-director"]["state"], "done")


if __name__ == "__main__":
    unittest.main()
