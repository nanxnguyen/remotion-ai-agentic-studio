"""Accessibility and shell regression checks for the pipeline monitor."""

import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


MONITOR = Path(__file__).with_name("monitor.html")
PIPELINE = Path(__file__).with_name("pipeline.py")


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

    def test_studio_creates_videos_and_commands_agents_from_the_ui(self):
        source = MONITOR.read_text(encoding="utf-8")
        parser = LandmarkParser()
        parser.feed(source)
        ids = {attrs.get("id"): (tag, attrs) for tag, attrs in parser.elements if attrs.get("id")}

        self.assertEqual(ids["create-video"][0], "button")
        self.assertEqual(ids["create-video"][1].get("aria-haspopup"), "dialog")
        self.assertEqual(ids["create-dialog"][0], "dialog")
        self.assertTrue(ids["create-dialog"][1].get("aria-labelledby"))
        for field in ("f-topic", "f-voice", "f-reference", "f-min", "f-mandatory", "f-notes", "dock-text", "dock-runner"):
            self.assertIn(field, ids)
        self.assertIn("fetch('/api/create-options'", source.replace("api('/api/create-options')", "fetch('/api/create-options'"))
        self.assertIn("/voice-preview/", source)
        self.assertIn("dry_run:true", source)  # the prompt is previewed before anything is created
        self.assertIn("needs_confirm", source)  # similar topics ask the owner instead of silently duplicating
        self.assertIn("/api/runs/", source)
        self.assertIn("'Content-Type':'application/json'", source)  # studio POSTs must pass the same-origin check
        self.assertIn("f-run-at", ids)  # scheduling belongs to creating a video
        self.assertNotIn("dock-run-at", ids)  # ...not to commands on an existing video
        self.assertNotIn("dock-queue", ids)  # one send box: the backend decides start vs note-to-running-agent
        self.assertIn("data.delivery==='note'", source)
        for field in ("f-model", "f-effort", "f-fallback", "dock-model", "dock-effort", "dock-fallback"):
            self.assertIn(field, ids)  # model / reasoning effort per runner, and switching runner when tokens run out
        self.assertIn("fallback_of", source)

    def test_every_field_the_create_form_sends_is_read_by_the_backend(self):
        # A field renamed on one side would be dropped silently; compare what the modal sends with what the server reads.
        source = MONITOR.read_text(encoding="utf-8")
        start = source.index("function formBody()")
        form_body = source[start:source.index("function updateSummary()", start)]
        sent = set(re.findall(r"[{,]\s*([a-z_]+)\s*:", form_body))
        backend = PIPELINE.read_text(encoding="utf-8")
        create = backend[backend.index("def create_video("):backend.index("class Handler(")]
        options = backend[backend.index("def run_options("):backend.index("def runner_cmd(")]
        read = set(re.findall(r'body\.get\("([a-z_]+)"', create + options))
        self.assertIn("topic", sent)
        self.assertLessEqual(sent, read, f"the form sends fields the backend ignores: {sorted(sent - read)}")
        self.assertIn("run_error", source)  # a run that cannot start is reported, not hidden


if __name__ == "__main__":
    unittest.main()
