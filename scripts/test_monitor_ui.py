"""Accessibility and shell regression checks for the pipeline monitor."""

import re
import importlib.util
import subprocess
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
    def test_monitor_uses_adaptive_non_overlapping_polling(self):
        source = MONITOR.read_text(encoding="utf-8")
        start = source.index("const statusDelay=")
        end = source.index(";", start) + 1
        js = source[start:end] + "\n"
        js += "if(statusDelay(true,true)!==15000)throw Error('hidden');"
        js += "if(statusDelay(false,true)!==1000)throw Error('active');"
        js += "if(statusDelay(false,false)!==3000)throw Error('idle');"
        result = subprocess.run(["node", "-e", js], capture_output=True, text=True)

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("refreshing", source)
        self.assertIn("If-None-Match", source)
        self.assertNotIn("setInterval(refresh,1000)", source)

    def test_terminal_polling_drains_backlog_and_backs_off(self):
        source = MONITOR.read_text(encoding="utf-8")
        start = source.index("const terminalDelay=")
        end = source.index(";", start) + 1
        js = source[start:end] + "\n"
        js += "if(terminalDelay(true,false,false,0)!==null)throw Error('hidden');"
        js += "if(terminalDelay(false,true,false,0)!==0)throw Error('backlog');"
        js += "if(terminalDelay(false,false,true,0)!==80)throw Error('active');"
        js += "if(terminalDelay(false,false,false,9)!==500)throw Error('idle');"
        result = subprocess.run(["node", "-e", js], capture_output=True, text=True)

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertNotIn("setInterval(async()=>", source)
        self.assertIn("result.hasMore", source)
        self.assertIn("if(result.state!=='running'){nextDelay=null;", source)

    def test_heavy_monitor_options_and_terminal_assets_are_lazy(self):
        source = MONITOR.read_text(encoding="utf-8")

        self.assertIn("function loadTerminalAssets()", source)
        self.assertNotIn('<script src="https://cdn.jsdelivr.net/npm/@xterm/', source)
        self.assertNotIn("syncOptions();pollRuns(true);setInterval", source)
        self.assertIn("await loadOptions()", source[source.index("async function openCreate"):])
        self.assertIn("await loadTerminalAssets();if($('command-dock').hidden)return;prepare()", source)

    def test_opencode_terminal_uses_interactive_root_command(self):
        spec = importlib.util.spec_from_file_location("pipeline_under_test", PIPELINE)
        pipeline = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(pipeline)

        self.assertEqual(
            pipeline.terminal_command("opencode", "opencode/nemotron-3-ultra-free", "medium"),
            [pipeline.shutil.which("opencode")],
        )

    def test_join_does_not_complete_from_pending_motion_declaration(self):
        source = MONITOR.read_text(encoding="utf-8")
        node_state = source[source.index("function nodeState("):source.index("function agentState(")]
        js = "const stageOf=(v,id)=>v.stages.find(s=>s.id===id); const reviewOk=(v,g)=>!!v.accepted?.includes(g);\n" + node_state
        js += "\nconst v={flow:4,stages:[{id:'motion',state:'pending',declared:true}],reviews:{motion:{rounds:0}},accepted:[]};"
        js += "if(nodeState(v,{id:'join'})!=='pending')throw Error('pending motion falsely completes Join');"
        js += "v.accepted=['D','content','audio'];if(nodeState(v,{id:'join'})!=='in_progress')throw Error('join should run');"
        js += "v.join_ready=true;if(nodeState(v,{id:'join'})!=='done')throw Error('measured join should complete');"
        result = subprocess.run(["node", "-e", js], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_motion_follows_join_with_separate_review_and_version_filter(self):
        source = MONITOR.read_text(encoding="utf-8")
        self.assertIn("const videoFlow=", source)
        self.assertIn("v.flow>=n.min_version", source)
        self.assertIn("['join','motion','integration','tasks'", source)
        self.assertIn("motion-reviewer", source)
        self.assertIn("reviewOk(v,'motion')", source)

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

    def test_terminal_hides_one_shot_panels_and_has_more_vertical_space(self):
        source = MONITOR.read_text(encoding="utf-8")

        self.assertIn(".command-dock.command-dock-terminal>.dock-legacy{grid-column:1;margin:0;min-width:0;display:none}", source)
        self.assertIn(".command-dock.command-dock-terminal>.run-panel{grid-column:2;min-width:0;padding-top:16px;display:none}", source)
        self.assertIn(".command-dock.command-dock-terminal>.term-screen{height:460px", source)
        self.assertIn(".command-dock.command-dock-terminal>.dock-legacy,.command-dock.command-dock-terminal>.run-panel{grid-column:1;display:none}", source)
        self.assertIn(".command-dock.command-dock-terminal>.term-screen{height:420px}", source)
        self.assertIn("await api(base()+'/'+session.id+'/resize',{cols:term.cols||100,rows:term.rows||28});", source)

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
