"""Accessibility and shell regression checks for the pipeline monitor."""

import unittest
from html.parser import HTMLParser
from pathlib import Path


MONITOR = Path(__file__).with_name("monitor.html")


class LandmarkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.elements = []

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


class MonitorUiTest(unittest.TestCase):
    def test_monitor_uses_agent_orchestration_command_deck(self):
        source = MONITOR.read_text(encoding="utf-8")

        self.assertIn('class="monitor-root"', source)
        self.assertIn('class="floor-grid"', source)
        self.assertIn('class="project-rail floating-rail"', source)
        self.assertIn('class="monitor-header"', source)
        self.assertIn('orchestration-card', source)
        self.assertIn('class="hub', source)
        self.assertIn("fetch('/api/meta'", source)  # roster comes from .claude/agents, not hard-coded
        self.assertIn("agent-chip", source)
        self.assertIn('class="stage-robot', source)

    def test_pipeline_shows_parallel_branches_and_selection_survives_reload(self):
        source = MONITOR.read_text(encoding="utf-8")

        self.assertIn("pipeline-fork", source)
        self.assertIn("pipeline-lane", source)
        self.assertIn("location.hash", source)
        self.assertIn("history.replaceState", source)

    def test_monitor_loads_reference_typography(self):
        source = MONITOR.read_text(encoding="utf-8")

        self.assertIn("family=Sora", source)
        self.assertIn("JetBrains+Mono", source)

    def test_monitor_uses_complete_design_compiler_layout(self):
        source = MONITOR.read_text(encoding="utf-8")

        self.assertIn('class="reference-shell"', source)
        self.assertIn('class="orchestration-graph"', source)
        self.assertIn('class="stage-robot"', source)
        self.assertIn('class="review-log-grid"', source)
        self.assertIn("grid-template-columns:288px", source)

    def test_monitor_shell_has_named_navigation_and_live_status(self):
        parser = LandmarkParser()
        parser.feed(MONITOR.read_text(encoding="utf-8"))

        navs = [attrs for tag, attrs in parser.elements if tag == "nav"]
        statuses = [attrs for _, attrs in parser.elements if attrs.get("role") == "status"]
        mains = [attrs for tag, attrs in parser.elements if tag == "main"]

        self.assertTrue(any(nav.get("id") == "list" and nav.get("aria-label") for nav in navs))
        self.assertTrue(any(status.get("id") == "live" for status in statuses))
        self.assertTrue(any(main.get("id") == "main" for main in mains))

    def test_result_video_uses_accessible_native_playback_controls(self):
        parser = LandmarkParser()
        parser.feed(MONITOR.read_text(encoding="utf-8"))

        templates = [attrs for tag, attrs in parser.elements if tag == "template"]
        videos = [attrs for tag, attrs in parser.elements if tag == "video"]

        self.assertTrue(any(item.get("id") == "result-video-template" for item in templates))
        player = next(item for item in videos if item.get("id") == "result-video")
        self.assertIn("controls", player)
        self.assertIn("playsinline", player)
        self.assertEqual(player.get("preload"), "metadata")
        self.assertTrue(player.get("aria-label"))

    def test_pipeline_stage_shows_its_review_gate_and_log_shows_more_entries(self):
        source = MONITOR.read_text(encoding="utf-8")

        self.assertIn("stage-gate", source)
        self.assertIn("review-node", source)  # each gate is its own reviewer node
        self.assertIn(".slice(0, 40)", source)


if __name__ == "__main__":
    unittest.main()
