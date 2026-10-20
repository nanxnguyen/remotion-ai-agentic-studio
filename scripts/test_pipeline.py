"""Behavior checks for the reusable video production status CLI."""

import argparse
import json
import http.client
import importlib.util
import os
import shutil
import subprocess
import sys
import tempfile
import threading
import unittest
import urllib.error
import urllib.request
from unittest import mock
from pathlib import Path


SOURCE = Path(__file__).with_name("pipeline.py")
REVIEW_POLICY = SOURCE.parent.parent / ".agents/skills/ray-pineline-worflow-agent/schemas/review-gates.json"


class PipelineCliTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / "scripts").mkdir()
        shutil.copy2(SOURCE, self.root / "scripts" / "pipeline.py")
        policy = self.root / ".agents/skills/ray-pineline-worflow-agent/schemas/review-gates.json"
        policy.parent.mkdir(parents=True)
        shutil.copy2(REVIEW_POLICY, policy)
        (self.root / "docs" / "sample").mkdir(parents=True)
        (self.root / "src").mkdir()
        (self.root / "src" / "Root.tsx").write_text('<Composition id="SampleReel" />')
        (self.root / "out" / "qa").mkdir(parents=True, exist_ok=True)

    def cli(self, *args):
        return subprocess.run(
            [sys.executable, "-I", str(self.root / "scripts" / "pipeline.py"), *args],
            cwd=self.root, text=True, capture_output=True,
        )

    def init(self, version=3):
        result = self.cli("init", "sample", "--comp", "SampleReel", "--voice", "anh-khoi")
        self.assertEqual(result.returncode, 0, result.stderr)
        if version != 4:
            data = json.loads((self.root / "docs/sample/status.json").read_text())
            data["workflow_version"] = version
            (self.root / "docs/sample/status.json").write_text(json.dumps(data))

    def status(self):
        return json.loads((self.root / "docs" / "sample" / "status.json").read_text())

    def load_pipeline_module(self):
        path = self.root / "scripts" / "pipeline.py"
        spec = importlib.util.spec_from_file_location("pipeline_under_test", path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module

    def audition(self):
        (self.root / "docs" / "sample" / "voice.json").write_text('{"s1": "xin chao"}')
        audio = self.root / "public" / "audio" / "sample"
        audio.mkdir(parents=True, exist_ok=True)
        (audio / "s1.mp3").write_bytes(b"voice")
        result = self.cli("audio-listen", "sample", "--by", "user")
        self.assertEqual(result.returncode, 0, result.stderr)

    def pass_gates(self, *gates):
        for gate in gates:
            if gate == "D":
                self.audition()
            if gate == "E":  # workflow v3 join: both branch reviews must pass before E
                self.pass_gates("content", "audio")
            name = f"{gate.lower()}-review.md"
            (self.root / "docs" / "sample" / name).write_text(
                f"Independent gate {gate} review\n" + ("visual content: 9/10\n" if gate == "C" else "")
                + "| criterion | score | evidence |\n" * 40)
            result = self.cli("review", "sample", gate, "9", "--reviewer", f"reviewer-{gate}", "--report", name)
            self.assertEqual(result.returncode, 0, result.stderr)

    def make_video(self, path):
        subprocess.run([
            "ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "color=c=black:s=1080x1920:r=30",
            "-f", "lavfi", "-i", "sine=frequency=440:sample_rate=48000", "-t", "0.5", "-c:v", "libx264",
            "-preset", "ultrafast", "-pix_fmt", "yuv420p", "-c:a", "aac", str(path),
        ], check=True)

    def test_v4_motion_is_required_but_legacy_flow_is_unchanged(self):
        self.init(version=4)
        module = self.load_pipeline_module()
        self.assertIn("motion", module.required_stages(self.status()))
        self.assertIn("motion", module.review_names(self.status()))
        self.assertEqual(module.review_prerequisites(self.status(), "motion"), ["D", "content", "audio"])
        self.assertIn("motion", module.review_prerequisites(self.status(), "E"))
        self.assertNotIn("motion", module.required_stages({"workflow_version": 3}))
        self.assertNotIn("motion", module.review_names({"workflow_version": 3}))

    def test_file_sha256_cache_reuses_unchanged_files_and_invalidates_on_stat_change(self):
        module = self.load_pipeline_module()
        target = self.root / "out" / "qa" / "cache.png"
        target.write_bytes(b"first")

        with mock.patch.object(module.hashlib, "sha256", wraps=module.hashlib.sha256) as sha256:
            first = module.file_sha256(target)
            self.assertEqual(module.file_sha256(target), first)
            self.assertEqual(sha256.call_count, 1)
            target.write_bytes(b"second-version")
            self.assertNotEqual(module.file_sha256(target), first)
            self.assertEqual(sha256.call_count, 2)

    def test_media_probe_cache_reuses_unchanged_file_and_invalidates_on_stat_change(self):
        module = self.load_pipeline_module()
        target = self.root / "out" / "qa" / "motion.mp4"
        target.write_bytes(b"first")
        completed = subprocess.CompletedProcess(
            ["ffprobe"], 0, json.dumps({"streams": [{"codec_type": "video", "width": 1, "height": 1}]}), ""
        )

        with mock.patch.object(module.subprocess, "run", return_value=completed) as run:
            first = module.probe_media(target)
            self.assertEqual(module.probe_media(target), first)
            self.assertEqual(run.call_count, 1)
            target.write_bytes(b"second-version")
            self.assertEqual(module.probe_media(target), first)
            self.assertEqual(run.call_count, 2)

    def test_status_endpoint_revalidates_with_etag_and_changes_with_evidence(self):
        self.init()
        module = self.load_pipeline_module()
        server = module.ThreadingHTTPServer(("127.0.0.1", 0), module.Handler)
        threading.Thread(target=server.serve_forever, daemon=True).start()
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)

        connection = http.client.HTTPConnection("127.0.0.1", server.server_port)
        connection.request("GET", "/api/status")
        first = connection.getresponse()
        first_body, etag = first.read(), first.getheader("ETag")
        self.assertEqual(first.status, 200)
        self.assertTrue(first_body)
        self.assertTrue(etag)

        connection.request("GET", "/api/status", headers={"If-None-Match": etag})
        unchanged = connection.getresponse()
        self.assertEqual(unchanged.status, 304)
        self.assertEqual(unchanged.read(), b"")
        self.assertEqual(unchanged.getheader("Content-Length"), "0")

        (self.root / "docs" / "sample" / "brief.md").write_text("new evidence")
        connection.request("GET", "/api/status", headers={"If-None-Match": etag})
        changed = connection.getresponse()
        self.assertEqual(changed.status, 200)
        self.assertNotEqual(changed.getheader("ETag"), etag)
        self.assertNotEqual(changed.read(), first_body)
        connection.close()

    def test_monitor_caches_do_not_change_all_views_json(self):
        self.init()
        module = self.load_pipeline_module()
        warm = module.all_views()
        module.clear_monitor_caches()
        self.assertEqual(module.all_views(), warm)

    def test_v4_audio_review_tracks_voice_performance_inputs(self):
        self.init(version=4)
        self.pass_gates("A")
        docs = self.root / "docs" / "sample"
        audio = self.root / "public" / "audio" / "sample"
        audio.mkdir(parents=True)
        (docs / "voice.json").write_text('{"s1": "xin chao"}', encoding="utf-8")
        (docs / "voice-direction.md").write_text("Conversational direction", encoding="utf-8")
        (docs / "voice-performance.json").write_text(
            json.dumps({"s1": {"phrases": [{"text": "xin chao"}], "reference": "local.wav"}}),
            encoding="utf-8",
        )
        (audio / "s1.mp3").write_bytes(b"voice-v1")
        report = docs / "audio-review.md"
        report.write_text("Independent audio review with measured evidence", encoding="utf-8")
        reviewed = self.cli(
            "review", "sample", "audio", "9", "--reviewer", "audio-reviewer", "--report", report.name
        )
        self.assertEqual(reviewed.returncode, 0, reviewed.stderr)
        module = self.load_pipeline_module()
        self.assertTrue(module.review_passed(self.status(), "audio"))

        (docs / "voice-performance.json").write_text(
            json.dumps({"s1": {"phrases": [{"text": "xin chao"}], "reference": "changed.wav"}}),
            encoding="utf-8",
        )
        self.assertFalse(module.review_passed(self.status(), "audio"))

    def test_v4_motion_sources_include_voice_direction_and_performance(self):
        self.init(version=4)
        docs = self.root / "docs" / "sample"
        (docs / "voice-direction.md").write_text("Direction", encoding="utf-8")
        (docs / "voice-performance.json").write_text("{}", encoding="utf-8")
        module = self.load_pipeline_module()
        sources = {Path(path).name for path in module.motion_source_paths("sample", self.status())}
        self.assertIn("voice-direction.md", sources)
        self.assertIn("voice-performance.json", sources)

    def test_v4_motion_start_and_e_are_blocked_without_join_evidence(self):
        self.init(version=4)
        self.assertNotEqual(self.cli("set", "sample", "motion", "in_progress").returncode, 0)
        self.pass_gates("A", "D", "content", "audio")
        report = self.root / "docs/sample/motion-review.md"
        report.write_text("open high/medium: 0\nIndependent review")
        result = self.cli("review", "sample", "motion", "9", "--reviewer", "critic", "--report", report.name)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("join-notes", result.stderr)
        report = self.root / "docs/sample/e-review.md"
        report.write_text("integration review")
        self.assertNotEqual(self.cli("review", "sample", "E", "9", "--reviewer", "critic", "--report", report.name).returncode, 0)

    def test_v4_accepts_real_motion_media_and_detects_input_drift(self):
        self.init(version=4)
        self.pass_gates("A", "D", "content", "audio")
        docs = self.root / "docs/sample"
        video = self.root / "src/videos/sample"
        video.mkdir(parents=True)
        (video / "timeline.ts").write_text("export const starts = [0, 5, 10];")
        (video / "voice-durations.ts").write_text("export const measured = {s1: 0.5};")
        (docs / "join-notes.md").write_text("Measured voice duration 0.5s, 15 frames at 30fps")
        (docs / "motion-spec.md").write_text("Cut and dissolve at frames 5 and 10")
        (docs / "motion-review.md").write_text("open high/medium: 0\nIndependent motion review")
        proto = video / "motion-proto"
        proto.mkdir()
        (proto / "Reel.tsx").write_text("export const Prototype = 1;")
        animatic = self.root / "out/qa/sample-motion-animatic.mp4"
        self.make_video(animatic)
        strips = []
        for index, color in enumerate(("red", "blue", "green", "yellow")):
            strip = self.root / f"out/qa/sample-motion-strip-{index}.png"
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"color=c={color}:s=320x80", "-frames:v", "1", str(strip)], check=True)
            strips.append(strip.relative_to(self.root).as_posix())
        manifest = {"fps": 30, "durationFrames": 15, "shotStartFrames": [0, 5, 10],
                    "animatic": animatic.relative_to(self.root).as_posix(), "hook": strips[0],
                    "highlight": strips[1], "boundaries": [{"frame": 5, "strip": strips[2]}, {"frame": 10, "strip": strips[3]}]}
        (docs / "motion-evidence.json").write_text(json.dumps(manifest))
        start = self.cli("set", "sample", "motion", "in_progress")
        self.assertEqual(start.returncode, 0, start.stderr)
        passed = self.cli("review", "sample", "motion", "9", "--reviewer", "independent", "--report", "motion-review.md")
        self.assertEqual(passed.returncode, 0, passed.stderr)
        done = self.cli("set", "sample", "motion", "done")
        self.assertEqual(done.returncode, 0, done.stderr)
        self.assertEqual(self.cli("gate", "sample", "motion").returncode, 0)
        (proto / "New.tsx").write_text("new input")
        self.assertNotEqual(self.cli("gate", "sample", "motion").returncode, 0)
        (proto / "New.tsx").unlink()
        self.assertEqual(self.cli("gate", "sample", "motion").returncode, 0)
        (proto / "Reel.tsx").write_text("export const Prototype = 2;")
        self.assertNotEqual(self.cli("gate", "sample", "motion").returncode, 0)
        module = self.load_pipeline_module()
        manifest["boundaries"].pop()
        (docs / "motion-evidence.json").write_text(json.dumps(manifest))
        evidence = module.motion_evidence("sample", self.status())
        self.assertFalse(evidence["ok"])
        self.assertIn("every shot start", evidence["detail"])

    def test_v4_audio_reopen_invalidates_motion_and_downstream(self):
        self.init(version=4)
        data = self.status()
        for gate in ("motion", "E", "B", "C", "audio"):
            data["reviews"][gate] = [{"score": 9, "verdict": "pass"}]
            data["review_valid"][gate] = True
        data["stages"]["qa"] = {"state": "done"}
        (self.root / "docs/sample/status.json").write_text(json.dumps(data))
        self.assertEqual(self.cli("set", "sample", "audio", "in_progress").returncode, 0)
        result = self.status()
        for gate in ("motion", "E", "B", "C"):
            self.assertFalse(result["review_valid"][gate])
        self.assertTrue(result["review_valid"]["audio"])
        self.assertEqual(result["stages"]["qa"]["state"], "pending")

    def test_upgrade_preserves_history_and_invalidates_downstream(self):
        self.init()
        data = self.status()
        data["reviews"]["E"] = [{"score": 9, "verdict": "pass"}]
        data["review_valid"]["E"] = True
        data["stages"]["qa"] = {"state": "done"}
        (self.root / "docs/sample/status.json").write_text(json.dumps(data))
        result = self.cli("upgrade", "sample")
        self.assertEqual(result.returncode, 0, result.stderr)
        data = self.status()
        self.assertEqual(data["workflow_version"], 4)
        self.assertEqual(len(data["reviews"]["E"]), 1)
        self.assertFalse(data["review_valid"]["E"])
        self.assertEqual(data["stages"]["motion"]["state"], "pending")
        self.assertEqual(data["stages"]["qa"]["state"], "pending")

    def test_review_gate_requires_report_and_passing_score(self):
        self.init()
        report = self.root / "docs" / "sample" / "script-review.md"
        report.write_text("Reviewer findings and score: 9/10\n")
        missing = self.cli("review", "sample", "A", "9", "--reviewer", "critic", "--report", "missing.md")
        self.assertNotEqual(missing.returncode, 0)
        rejected = self.cli("review", "sample", "A", "7", "--reviewer", "critic", "--report", "script-review.md", "--verdict", "revise")
        self.assertEqual(rejected.returncode, 0, rejected.stderr)
        self.assertNotEqual(self.cli("gate", "sample", "A").returncode, 0)
        passed = self.cli("review", "sample", "A", "9", "--reviewer", "critic", "--report", "script-review.md")
        self.assertEqual(passed.returncode, 0, passed.stderr)
        self.assertEqual(self.cli("gate", "sample", "A").returncode, 0)
        self.assertEqual(len(self.status()["reviews"]["A"]), 2)

    def test_content_review_precedes_build_and_render_only_invalidates_video_review(self):
        self.init()
        self.pass_gates("A", "D", "content", "audio")
        report = self.root / "docs" / "sample" / "content-review.md"
        report.write_text("Storyboard and script fit the chosen audience\n")
        early = self.cli("review", "sample", "E", "9", "--reviewer", "editor", "--report", "content-review.md")
        self.assertEqual(early.returncode, 0, early.stderr)
        self.assertEqual(self.cli("gate", "sample", "E").returncode, 0)
        video = self.root / "out" / "sample-anh-khoi-reel.mp4"
        self.make_video(video)
        verified = self.cli("verify", "sample", "--min-seconds", "0.1")
        self.assertEqual(verified.returncode, 0, verified.stderr)
        self.pass_gates("B")
        (self.root / "docs" / "sample" / "publishing.json").write_text(json.dumps({
            "autoDraft": True, "platform": "both", "title": "Review title", "description": "Review description",
        }))
        (self.root / "scripts" / "publish-video.py").write_text(
            "import json,pathlib,sys\n"
            "pathlib.Path('out/publish-invocation.json').write_text(json.dumps(sys.argv[1:]))\n"
        )
        report = self.root / "docs" / "sample" / "video-review.md"
        report.write_text("Reviewed first render\nvisual content: 9/10\n")
        result = self.cli("review", "sample", "C", "9", "--reviewer", "critic", "--report", "video-review.md", "--full-listen")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.cli("gate", "sample", "C").returncode, 0)
        invocation = json.loads((self.root / "out" / "publish-invocation.json").read_text())
        self.assertEqual(invocation, [
            "sample", "--file", str(video.resolve()), "--title", "Review title", "--description", "Review description",
            "--platform", "both", "--execute", "--auto-draft",
        ])
        self.assertEqual(self.status()["publishing"]["state"], "submitted")
        changed = self.cli("set", "sample", "render", "in_progress")
        self.assertEqual(changed.returncode, 0, changed.stderr)
        self.assertNotEqual(self.cli("gate", "sample", "C").returncode, 0)
        self.assertEqual(self.cli("gate", "sample", "E").returncode, 0)

    def test_verify_rejects_invalid_mp4_instead_of_file_existence(self):
        self.init()
        self.assertEqual(self.status()["paths"]["out"], "sample-anh-khoi")
        (self.root / "out" / "sample-anh-khoi-reel.mp4").write_bytes(b"not a video")
        result = self.cli("verify", "sample")
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("render_check", self.status())

    def test_v4_default_duration_range_and_explicit_override(self):
        self.init(version=4)
        video = self.root / "out/sample-anh-khoi-reel.mp4"
        self.make_video(video)
        result = self.cli("verify", "sample")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("30..45", result.stderr)
        result = self.cli("verify", "sample", "--min-seconds", "0.1", "--max-seconds", "1")
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_default_duration_range_is_40_to_60_seconds(self):
        self.init()
        video = self.root / "out" / "sample-anh-khoi-reel.mp4"
        self.make_video(video)
        result = self.cli("verify", "sample")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("40", result.stderr)
        self.assertIn("60", result.stderr)

    def test_voice_change_updates_output_name_and_invalidates_video_review(self):
        self.init()
        self.pass_gates("A", "D", "E", "B")
        old = self.root / "out" / "sample-anh-khoi-reel.mp4"
        self.make_video(old)
        self.assertEqual(self.cli("verify", "sample", "--min-seconds", "0.1").returncode, 0)
        report = self.root / "docs" / "sample" / "video-review.md"
        report.write_text("The first voice was reviewed\nvisual content: 9/10\n")
        self.assertEqual(self.cli("review", "sample", "C", "9", "--reviewer", "critic", "--report", "video-review.md").returncode, 0)
        changed = self.cli("voice", "sample", "cam")
        self.assertEqual(changed.returncode, 0, changed.stderr)
        self.assertEqual(self.status()["paths"]["out"], "sample-cam")
        self.assertTrue(old.is_file())
        self.assertNotEqual(self.cli("gate", "sample", "C").returncode, 0)

    def test_script_design_and_content_gates_require_nine(self):
        self.init()
        (self.root / "docs" / "sample" / "a-review.md").write_text("Script review")
        low_a = self.cli("review", "sample", "A", "8.5", "--reviewer", "critic", "--report", "a-review.md")
        self.assertNotEqual(low_a.returncode, 0)
        self.assertIn(">= 9", low_a.stderr)
        self.pass_gates("A")
        self.audition()
        (self.root / "docs" / "sample" / "design-review.md").write_text("Design review")
        low = self.cli("review", "sample", "D", "8.4", "--reviewer", "art", "--report", "design-review.md")
        self.assertNotEqual(low.returncode, 0)
        self.assertIn(">= 8.5", low.stderr)
        ok = self.cli("review", "sample", "D", "8.5", "--reviewer", "art", "--report", "design-review.md")
        self.assertEqual(ok.returncode, 0, ok.stderr)

    def test_b_passes_at_nine_and_c_at_eight(self):
        self.init()
        self.pass_gates("A", "D", "E")
        (self.root / "docs" / "sample" / "e.md").write_text("review")
        low_b = self.cli("review", "sample", "B", "8.9", "--reviewer", "r", "--report", "e.md")
        self.assertNotEqual(low_b.returncode, 0)
        self.assertIn(">= 9", low_b.stderr)
        self.assertEqual(self.cli("review", "sample", "B", "9", "--reviewer", "r", "--report", "e.md").returncode, 0)
        self.make_video(self.root / "out" / "sample-anh-khoi-reel.mp4")
        self.assertEqual(self.cli("verify", "sample", "--min-seconds", "0.1").returncode, 0)
        low_c = self.cli("review", "sample", "C", "7.9", "--reviewer", "r", "--report", "e.md")
        self.assertNotEqual(low_c.returncode, 0)
        (self.root / "docs" / "sample" / "e.md").write_text("review\nvisual content: 8/10\n")
        self.assertEqual(self.cli("review", "sample", "C", "8", "--reviewer", "r", "--report", "e.md").returncode, 0)
        self.assertEqual(self.cli("gate", "sample", "C").returncode, 0)

    def test_files_alone_never_mark_a_v3_stage_done(self):
        self.init()
        (self.root / "out" / "qa").mkdir(parents=True, exist_ok=True)
        (self.root / "out" / "qa" / "sample-s1.png").write_bytes(b"png")  # a design still, not a QA pass
        stages = {s["id"]: s for s in self.module_view("sample")["stages"]}
        self.assertEqual((stages["build"]["state"], stages["qa"]["state"]), ("pending", "pending"))
        self.assertFalse(stages["qa"]["evidence"]["ok"])  # one still is not a QA pass

    def module_view(self, folder):
        import importlib.util
        spec = importlib.util.spec_from_file_location("pipeline_view", self.root / "scripts" / "pipeline.py")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module.view(folder)

    def test_final_qa_waits_for_render_gate_c_and_every_stage(self):
        self.init()
        (self.root / "out" / "qa").mkdir(parents=True, exist_ok=True)
        for n in range(3):
            (self.root / "out" / "qa" / f"sample-s{n}.png").write_bytes(b"png" + bytes([n]))
        early = self.cli("set", "sample", "qa", "done")
        self.assertNotEqual(early.returncode, 0)
        self.assertIn("no verified render", early.stderr)
        self.assertIn("gate C has not passed", early.stderr)
        self.assertIn("stage build is not done", early.stderr)
        built = self.cli("set", "sample", "build", "done")
        self.assertNotEqual(built.returncode, 0)  # build waits for the join (E) and the plan (B)
        self.assertIn("gate E has not passed", built.stderr)

    def test_build_refuses_scenes_that_are_text_on_a_background(self):
        self.init()
        self.pass_gates("A", "D", "E", "B")
        scenes = self.root / "src" / "videos" / "sample" / "scenes"
        scenes.mkdir(parents=True)
        (scenes / "Scene01.tsx").write_text(
            "export const S = () => <AbsoluteFill style={{background: 'linear-gradient(#000,#111)'}}>"
            "<div style={{opacity: interpolate(frame, [0, 20], [0, 1])}}>Chữ</div></AbsoluteFill>;", encoding="utf-8")
        refused = self.cli("set", "sample", "build", "done")
        self.assertNotEqual(refused.returncode, 0)
        self.assertIn("text on a background only", refused.stderr)
        (scenes / "Scene01.tsx").write_text(
            "export const S = () => <AbsoluteFill><div style={{transform: `scale(${ramp(frame, 0, 20)})`}}>Chữ</div></AbsoluteFill>;",
            encoding="utf-8",
        )
        self.assertEqual(self.cli("set", "sample", "build", "done").returncode, 0)
        (scenes / "Scene01.tsx").write_text(
            "export const S = () => <AbsoluteFill><Img src={staticFile('assets/cover.png')} /></AbsoluteFill>;")
        self.assertEqual(self.cli("set", "sample", "build", "done").returncode, 0)

    def test_design_citing_demos_needs_the_motion_library(self):
        self.init()
        (self.root / "docs" / "sample" / "design-spec.md").write_text("Shot cards: demo TSX editorial-quote/Reel.tsx\n")
        module = self.load_pipeline_module()
        self.assertIn("motion library", " ".join(module.demo_problems("sample")))
        demo = self.root / "skills" / "video-shotcraft" / "demos" / "editorial-quote"
        demo.mkdir(parents=True)
        (demo / "Reel.tsx").write_text("export {}")
        self.assertEqual(self.load_pipeline_module().demo_problems("sample"), [])

    def test_gate_c_visual_score_must_be_stated_and_reach_seven(self):
        module = self.load_pipeline_module()
        report = self.root / "r.md"
        report.write_text("no score line here")
        self.assertIn("no line 'visual content", module.visual_problem(report))
        report.write_text("visual content: 6/10")
        self.assertIn("below 7", module.visual_problem(report))
        report.write_text("visual content: 7.5/10")
        self.assertEqual(module.visual_problem(report), "")

    def test_active_minutes_skips_breaks_longer_than_the_limit(self):
        from datetime import datetime, timedelta
        module = self.load_pipeline_module()
        start = datetime(2026, 10, 17, 9, 0)
        times = [start, start + timedelta(minutes=5), start + timedelta(minutes=35), start + timedelta(minutes=40)]
        self.assertEqual(module.active_minutes(times), 10)  # the 30-minute gap is a break, not work
        self.assertEqual(module.active_minutes([]), 0)

    def test_timing_reports_stage_and_agent_time_from_the_log(self):
        self.init()
        self.assertEqual(self.cli("set", "sample", "research", "in_progress").returncode, 0)
        self.assertEqual(self.cli("agent", "sample", "research-agent", "running", "--stage", "research").returncode, 0)
        self.assertNotEqual(self.cli("set", "sample", "research", "done").returncode, 0)  # research.md is absent: refused
        timing = self.cli("timing", "sample")
        self.assertEqual(timing.returncode, 0, timing.stderr)
        self.assertIn("active", timing.stdout)
        report = self.load_pipeline_module().timing_report("sample")
        self.assertIn("research-agent", report["agents"])
        self.assertEqual(report["review_agent_names"], 0)
        self.assertIn("refused", timing.stdout)

    def test_revise_verdict_blocks_gate_and_next_review(self):
        self.init()
        (self.root / "docs" / "sample" / "a.md").write_text("review")
        self.assertEqual(self.cli("review", "sample", "A", "9.5", "--reviewer", "r", "--report", "a.md", "--verdict", "revise").returncode, 0)
        self.assertNotEqual(self.cli("gate", "sample", "A").returncode, 0)
        self.assertNotEqual(self.cli("review", "sample", "D", "9", "--reviewer", "r", "--report", "a.md").returncode, 0)

    def test_e_gate_rejects_below_nine(self):
        self.init()
        self.pass_gates("A", "D")
        (self.root / "docs" / "sample" / "e.md").write_text("review")
        self.assertNotEqual(self.cli("review", "sample", "E", "8.9", "--reviewer", "r", "--report", "e.md").returncode, 0)

    def test_design_stage_and_placeholder_voice(self):
        self.assertEqual(self.cli("init", "sample", "--comp", "SampleReel", "--voice", "tbd").returncode, 0)
        self.assertEqual(self.cli("set", "sample", "design", "in_progress").returncode, 0)
        self.assertEqual(self.status()["stages"]["design"]["state"], "in_progress")
        self.assertEqual(self.cli("voice", "sample", "anh-khoi").returncode, 0)
        self.assertEqual(self.status()["paths"]["out"], "sample-anh-khoi")

    def test_design_gate_does_not_need_user_audition(self):
        self.init()
        self.pass_gates("A")
        (self.root / "docs" / "sample" / "design-review.md").write_text("Design review")
        args = ("review", "sample", "D", "9", "--reviewer", "art", "--report", "design-review.md")
        self.assertEqual(self.cli(*args).returncode, 0)  # audio needs no user listen

    def test_voice_rework_invalidates_audio_branch_and_join_but_not_design(self):
        self.init()
        self.pass_gates("A", "D", "E")
        self.assertEqual(self.cli("set", "sample", "voice", "in_progress").returncode, 0)
        self.assertEqual(self.cli("gate", "sample", "A").returncode, 0)
        self.assertEqual(self.cli("gate", "sample", "D").returncode, 0)  # branches are independent
        self.assertEqual(self.cli("gate", "sample", "content").returncode, 0)
        self.assertNotEqual(self.cli("gate", "sample", "audio").returncode, 0)
        self.assertNotEqual(self.cli("gate", "sample", "E").returncode, 0)

    def test_join_gate_e_needs_all_three_branches(self):
        self.init()
        self.pass_gates("A", "D", "content")
        (self.root / "docs" / "sample" / "e-review.md").write_text("Integration review\n")
        early = self.cli("review", "sample", "E", "9", "--reviewer", "editor", "--report", "e-review.md")
        self.assertNotEqual(early.returncode, 0)
        self.assertIn("audio", early.stderr)
        self.pass_gates("audio")
        self.assertEqual(self.cli("review", "sample", "E", "9", "--reviewer", "editor", "--report", "e-review.md").returncode, 0)

    def test_branch_reviews_need_a_and_script_change_reopens_them(self):
        self.init()
        (self.root / "docs" / "sample" / "content-pack-review.md").write_text("Content review\n")
        early = self.cli("review", "sample", "content", "9", "--reviewer", "r", "--report", "content-pack-review.md")
        self.assertNotEqual(early.returncode, 0)
        self.pass_gates("A", "content", "audio", "D")
        self.assertEqual(self.cli("set", "sample", "script", "in_progress").returncode, 0)
        for gate in ("A", "content", "audio", "D"):
            self.assertNotEqual(self.cli("gate", "sample", gate).returncode, 0, gate)

    def test_agent_activity_is_recorded_and_exposed_in_view(self):
        self.init()
        result = self.cli("agent", "sample", "content-agent", "running", "--stage", "content", "--note", "drafting")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertNotEqual(self.cli("agent", "sample", "Bad Name", "running").returncode, 0)
        view = self.load_pipeline_module().view("sample")
        self.assertEqual(view["agents"]["content-agent"]["state"], "running")
        self.assertEqual(view["log"][0]["who"], "content-agent")
        self.assertEqual(view["flow"], 3)
        self.assertIn("content", view["reviews"])

    def test_legacy_v2_video_skips_content_stage_and_branch_reviews(self):
        self.init()
        status = self.status()
        status["workflow_version"] = 2
        (self.root / "docs" / "sample" / "status.json").write_text(json.dumps(status))
        module = self.load_pipeline_module()
        view = module.view("sample")
        self.assertEqual(next(s for s in view["stages"] if s["id"] == "content")["state"], "skipped")
        self.assertNotIn("content", view["reviews"])
        self.assertNotIn("content", module.required_stages(module.load("sample")))

    def test_upgrade_moves_v2_video_to_branch_flow_only_before_later_reviews(self):
        self.init()
        status = self.status()
        status["workflow_version"] = 2
        (self.root / "docs" / "sample" / "status.json").write_text(json.dumps(status))
        self.pass_gates("A")
        self.assertEqual(self.cli("upgrade", "sample").returncode, 0)
        self.assertEqual(self.status()["workflow_version"], 4)
        self.assertNotEqual(self.cli("upgrade", "sample").returncode, 0)

    def test_review_view_marks_stale_and_counts_only_scored_rounds(self):
        self.init()
        self.pass_gates("A", "D")
        self.assertEqual(self.cli("set", "sample", "design", "in_progress").returncode, 0)
        view = self.load_pipeline_module().view("sample")
        self.assertTrue(view["reviews"]["D"]["stale"])
        self.assertFalse(view["reviews"]["A"]["stale"])
        self.assertEqual(view["reviews"]["D"]["threshold"], 8.5)
        self.assertEqual(view["reviews"]["B"]["threshold"], 9)
        self.assertEqual(view["reviews"]["C"]["threshold"], 8)

    def test_content_gate_cannot_pass_before_design_gate(self):
        self.init()
        self.pass_gates("A")
        report = self.root / "docs" / "sample" / "content-review.md"
        report.write_text("Content review\n")
        too_early = self.cli("review", "sample", "E", "9", "--reviewer", "editor", "--report", "content-review.md")
        self.assertNotEqual(too_early.returncode, 0)

    def test_user_override_keeps_true_score_and_unblocks_ordering(self):
        self.init()
        self.pass_gates("A")
        report = self.root / "docs" / "sample" / "d-review.md"
        report.write_text("Design review with open polish items\n")
        self.assertEqual(self.cli("review", "sample", "D", "8.8", "--reviewer", "critic",
                                  "--report", "d-review.md", "--verdict", "revise").returncode, 0)
        over = self.cli("override", "sample", "D", "--by", "user", "--note", "khach duyet di tiep")
        self.assertEqual(over.returncode, 0, over.stderr)
        entries = self.status()["reviews"]["D"]
        self.assertEqual(entries[-1]["verdict"], "override")
        self.assertEqual(entries[-1]["score"], 8.8)  # true score preserved, never faked
        gated = self.cli("gate", "sample", "D")
        self.assertEqual(gated.returncode, 0)  # override lets the pipeline continue...
        self.assertIn("user-override", gated.stdout)  # ...but never reports a strict pass
        self.pass_gates("content", "audio")
        ereport = self.root / "docs" / "sample" / "e-review.md"
        ereport.write_text("Content review\n")
        nxt = self.cli("review", "sample", "E", "9", "--reviewer", "editor", "--report", "e-review.md")
        self.assertEqual(nxt.returncode, 0, nxt.stderr)  # ordering satisfied by override
        module = self.load_pipeline_module()
        view = module.view("sample")
        self.assertFalse(view["reviews"]["D"]["passed"])
        self.assertTrue(view["reviews"]["D"]["overridden"])
        self.assertEqual(view["reviews"]["D"]["rounds"], 1)  # the override entry is not a review round
        self.assertEqual(view["reviews"]["D"]["by"], "user")
        failed = self.cli("check", "sample")
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn("user-overridden: ['D']", failed.stderr)

    def test_ai_video_review_passes_c_but_delivery_does_not_need_user_listen(self):
        self.init()
        self.pass_gates("A", "D", "E", "B")
        video = self.root / "out" / "sample-anh-khoi-reel.mp4"
        self.make_video(video)
        self.assertEqual(self.cli("verify", "sample", "--min-seconds", "0.1").returncode, 0)
        self.assertNotEqual(self.cli("listen", "sample", "--by", "user").returncode, 0)  # C not passed yet
        report = self.root / "docs" / "sample" / "video-review.md"
        report.write_text("Shot-by-shot picture, captions, ASR and loudness checked\nvisual content: 9/10\n")
        ai = self.cli("review", "sample", "C", "9", "--reviewer", "critic", "--report", "video-review.md")
        self.assertEqual(ai.returncode, 0, ai.stderr)
        self.assertEqual(self.cli("gate", "sample", "C").returncode, 0)
        self.assertNotIn("listen", self.cli("check", "sample").stderr)  # optional record
        heard = self.cli("listen", "sample", "--by", "user")
        self.assertEqual(heard.returncode, 0, heard.stderr)
        self.assertEqual(self.status()["listen"]["fingerprint"], self.status()["render_check"]["fingerprint"])

    def test_render_replaces_existing_output_only_after_validation(self):
        self.init()
        final = self.root / "out" / "sample-anh-khoi-reel.mp4"
        final.write_bytes(b"previous good output placeholder")
        bad_raw = self.root / "out" / "bad.mp4"
        bad_raw.write_bytes(b"corrupt")
        failed = self.cli("render", "sample", "--raw", str(bad_raw), "--min-seconds", "0.1")
        self.assertNotEqual(failed.returncode, 0)
        self.assertEqual(final.read_bytes(), b"previous good output placeholder")
        raw = self.root / "out" / "raw.mp4"
        self.make_video(raw)
        rendered = self.cli("render", "sample", "--raw", str(raw), "--min-seconds", "0.1")
        self.assertEqual(rendered.returncode, 0, rendered.stderr)
        self.assertGreater(final.stat().st_size, 1000)
        self.assertEqual(self.status()["stages"]["render"]["state"], "done")

    def test_view_flags_stage_done_while_its_gate_not_passed(self):
        self.init()
        self.pass_gates("A", "D")
        (self.root / "docs" / "sample" / "design-spec.md").write_text("Design spec\n")
        self.assertEqual(self.cli("set", "sample", "design", "done").returncode, 0)
        args = ("review", "sample", "D", "8.8", "--reviewer", "critic",
                "--report", "d-review.md", "--verdict", "revise")
        self.assertEqual(self.cli(*args).returncode, 0)  # a later failing round reopens the gate
        module = self.load_pipeline_module()
        stages = {s["id"]: s for s in module.view("sample")["stages"]}
        self.assertEqual(stages["design"]["review_gate"], "D")
        self.assertFalse(stages["design"]["review_gate_passed"])
        self.assertTrue(stages["design"]["gate_mismatch"])

    def test_done_log_records_evidence_and_gate_context(self):
        self.init()
        self.pass_gates("A")
        (self.root / "docs" / "sample" / "design-spec.md").write_text("Design spec\n")
        (self.root / "docs" / "sample" / "design-review.md").write_text("Design review\n")
        args = ("review", "sample", "D", "8.8", "--reviewer", "critic",
                "--report", "design-review.md", "--verdict", "revise")
        self.assertEqual(self.cli(*args).returncode, 0)
        self.assertEqual(self.cli("override", "sample", "D", "--by", "video-director").returncode, 0)
        result = self.cli("set", "sample", "design", "done", "--note", "cap 3 accepted")
        self.assertEqual(result.returncode, 0, result.stderr)
        msg = self.status()["log"][-1]["msg"]
        self.assertIn("design-spec.md", msg)
        self.assertIn("gate D", msg)
        self.assertIn("override", msg)

    def test_done_is_refused_while_stage_evidence_is_missing(self):
        self.init()
        (self.root / "docs" / "sample" / "voice.json").write_text('{"s1": "a", "s2": "b"}')
        audio = self.root / "public" / "audio" / "sample"
        audio.mkdir(parents=True)
        (audio / "s1.mp3").write_bytes(b"voice")
        refused = self.cli("set", "sample", "voice", "done")
        self.assertNotEqual(refused.returncode, 0)
        self.assertIn("1/2 clips", refused.stderr)
        self.assertNotEqual(self.status()["stages"].get("voice", {}).get("state"), "done")
        (audio / "s2.mp3").write_bytes(b"voice")
        self.assertEqual(self.cli("set", "sample", "voice", "done", "--next", "audio-reviewer").returncode, 0)
        for stage in ("research", "qa", "render"):
            self.assertNotEqual(self.cli("set", "sample", stage, "done").returncode, 0, stage)

    def test_done_is_refused_while_guarding_gate_not_passed(self):
        self.init()
        (self.root / "docs" / "sample" / "script.md").write_text("Script\n")
        refused = self.cli("set", "sample", "script", "done")
        self.assertNotEqual(refused.returncode, 0)
        self.assertIn("gate A", refused.stderr)
        self.pass_gates("A")
        self.assertEqual(self.cli("set", "sample", "script", "done").returncode, 0)

    def test_audit_flags_stale_agent_and_missing_next_step(self):
        self.init()
        (self.root / "docs" / "sample" / "research.md").write_text("Research\n")
        self.assertEqual(self.cli("set", "sample", "research", "done").returncode, 0)
        self.cli("agent", "sample", "research-agent", "running", "--stage", "research")
        failed = self.cli("audit", "sample")
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn("research-agent", failed.stdout)
        self.assertIn("next", failed.stdout)
        self.cli("agent", "sample", "research-agent", "done", "--stage", "research")
        self.cli("set", "sample", "brief", "in_progress", "--next", "script-agent drafts brief.md")
        clean = self.cli("audit", "sample")
        self.assertEqual(clean.returncode, 0, clean.stdout)

    def test_audit_requires_phase_documents_beyond_the_enforced_evidence(self):
        self.init()
        (self.root / "docs" / "sample" / "voice.json").write_text('{"s1": "a"}')
        audio = self.root / "public" / "audio" / "sample"
        audio.mkdir(parents=True)
        (audio / "s1.mp3").write_bytes(b"voice")
        self.cli("set", "sample", "voice", "done", "--next", "audio-reviewer")
        failed = self.cli("audit", "sample")
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn("voice-report.md", failed.stdout)
        self.assertIn("voice-clone-asr.md", failed.stdout)
        for name in ("voice-report.md", "voice-clone-asr.md"):
            (self.root / "docs" / "sample" / name).write_text("Measured\n")
        self.assertEqual(self.cli("audit", "sample").returncode, 0)

    def test_v4_audit_requires_voice_direction_and_performance_contracts(self):
        self.init(version=4)
        docs = self.root / "docs" / "sample"
        audio = self.root / "public" / "audio" / "sample"
        audio.mkdir(parents=True)
        (docs / "voice.json").write_text('{"s1": "a"}', encoding="utf-8")
        (audio / "s1.mp3").write_bytes(b"voice")
        for name in ("voice-report.md", "voice-clone-asr.md"):
            (docs / name).write_text("Measured\n", encoding="utf-8")
        self.assertEqual(self.cli("set", "sample", "voice", "done", "--next", "audio-reviewer").returncode, 0)
        failed = self.cli("audit", "sample")
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn("voice-performance.json", failed.stdout)

        (docs / "voice-performance.json").write_text("{}", encoding="utf-8")
        self.assertEqual(self.cli("audit", "sample").returncode, 0)

    def test_v4_audit_requires_phase_2b_documents_after_script_done(self):
        self.init(version=4)
        docs = self.root / "docs" / "sample"
        (docs / "script.md").write_text("Script\n", encoding="utf-8")
        (docs / "voice.proposed.json").write_text('{"s1": "a"}', encoding="utf-8")
        self.pass_gates("A")
        self.assertEqual(self.cli("set", "sample", "script", "done", "--next", "branches").returncode, 0)
        failed = self.cli("audit", "sample")
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn("voice-direction.md", failed.stdout)
        self.assertIn("voice-performance.proposed.json", failed.stdout)

        (docs / "voice-direction.md").write_text("Direction\n", encoding="utf-8")
        (docs / "voice-performance.proposed.json").write_text("{}", encoding="utf-8")
        self.assertEqual(self.cli("audit", "sample").returncode, 0)

    def test_legacy_audit_does_not_require_voice_performance_contract(self):
        self.init(version=3)
        docs = self.root / "docs" / "sample"
        audio = self.root / "public" / "audio" / "sample"
        audio.mkdir(parents=True)
        (docs / "voice.json").write_text('{"s1": "a"}', encoding="utf-8")
        (audio / "s1.mp3").write_bytes(b"voice")
        for name in ("voice-report.md", "voice-clone-asr.md"):
            (docs / name).write_text("Measured\n", encoding="utf-8")
        self.assertEqual(self.cli("set", "sample", "voice", "done", "--next", "audio-reviewer").returncode, 0)
        self.assertEqual(self.cli("audit", "sample").returncode, 0)

    def test_audit_requires_each_recorded_review_report(self):
        self.init()
        self.pass_gates("A")
        self.cli("set", "sample", "research", "pending", "--next", "branches")
        self.assertEqual(self.cli("audit", "sample").returncode, 0)

        status = self.status()
        status["reviews"]["A"][0]["report"] = r"docs\sample\a-review.md"
        (self.root / "docs" / "sample" / "status.json").write_text(json.dumps(status))
        self.assertEqual(self.cli("audit", "sample").returncode, 0)

        (self.root / "docs" / "sample" / "a-review.md").unlink()
        failed = self.cli("audit", "sample")
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn("a-review.md", failed.stdout)
        (self.root / "docs" / "sample" / "a-review.md").write_text("Score 9/10. Pass.\n")  # a self-written stub
        thin = self.cli("audit", "sample")
        self.assertNotEqual(thin.returncode, 0)
        self.assertIn("too thin", thin.stdout)

    def test_content_done_needs_content_pack(self):
        self.init()
        self.pass_gates("A", "content")
        refused = self.cli("set", "sample", "content", "done")
        self.assertNotEqual(refused.returncode, 0)  # content.md or nothing is not a content pack
        (self.root / "docs" / "sample" / "content-pack.md").write_text("# Content pack\n")
        self.assertEqual(self.cli("set", "sample", "content", "done").returncode, 0)

    def test_check_requires_per_video_eval(self):
        self.init()
        failed = self.cli("check", "sample")
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn("eval.md", failed.stderr)
        (self.root / "docs" / "sample" / "eval.md").write_text("Retro\n")
        self.assertNotIn("eval.md", self.cli("check", "sample").stderr)

    def test_media_endpoint_streams_only_declared_output_with_byte_ranges(self):
        self.init()
        final = self.root / "out" / "sample-anh-khoi-reel.mp4"
        final.write_bytes(b"0123456789")
        module = self.load_pipeline_module()
        server = module.ThreadingHTTPServer(("127.0.0.1", 0), module.Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)

        base = f"http://127.0.0.1:{server.server_port}"
        request = urllib.request.Request(f"{base}/media/sample", headers={"Range": "bytes=2-5"})
        with urllib.request.urlopen(request) as response:
            self.assertEqual(response.status, 206)
            self.assertEqual(response.headers["Content-Type"], "video/mp4")
            self.assertEqual(response.headers["Accept-Ranges"], "bytes")
            self.assertEqual(response.headers["Content-Range"], "bytes 2-5/10")
            self.assertEqual(response.read(), b"2345")

        with self.assertRaises(urllib.error.HTTPError) as unknown:
            urllib.request.urlopen(f"{base}/media/not-a-video")
        self.assertEqual(unknown.exception.code, 404)

    def test_audition_api_serves_declared_audio_and_records_listen(self):
        self.init()
        (self.root / "docs" / "sample" / "voice.json").write_text('{"s1": "xin chao"}')
        audio = self.root / "public" / "audio" / "sample"
        audio.mkdir(parents=True)
        (audio / "s1.mp3").write_bytes(b"voice")
        (audio / "bgm.mp3").write_bytes(b"music")
        (audio / "private.mp3").write_bytes(b"secret")
        module = self.load_pipeline_module()
        server = module.ThreadingHTTPServer(("127.0.0.1", 0), module.Handler)
        threading.Thread(target=server.serve_forever, daemon=True).start()
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)
        base = f"http://127.0.0.1:{server.server_port}"

        with urllib.request.urlopen(f"{base}/api/audition/sample") as response:
            info = json.loads(response.read())
        self.assertEqual([c["id"] for c in info["clips"]], ["s1"])
        self.assertEqual(info["bgm"], ["bgm.mp3"])
        self.assertTrue(info["ready"])
        self.assertFalse(info["listened"])
        with urllib.request.urlopen(f"{base}/audio/sample/s1.mp3") as response:
            self.assertEqual(response.headers["Content-Type"], "audio/mpeg")
            self.assertEqual(response.read(), b"voice")
        for path in ("/audio/sample/private.mp3", "/audio/sample/..%2Fx.mp3"):
            with self.assertRaises(urllib.error.HTTPError) as blocked:
                urllib.request.urlopen(base + path)
            self.assertEqual(blocked.exception.code, 404)

        body = json.dumps({"video": "sample", "by": "user"}).encode()
        request = urllib.request.Request(f"{base}/api/audio-listen", data=body, method="POST",
                                         headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(request) as response:
            self.assertTrue(json.loads(response.read())["listened"])
        self.assertEqual(self.status()["audio_listen"]["by"], "user")

    def write_report(self, name="a-review.md"):
        (self.root / "docs" / "sample" / name).write_text("Gate review\n" + "| criterion | score | evidence |\n" * 40)
        return name

    def test_advance_records_review_gate_and_reviewer_in_one_call(self):
        self.init()
        report = self.write_report()
        result = self.cli("advance", "sample", "A", "9", "--reviewer", "script-reviewer", "--report", report, "--verdict", "pass")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("review A: pass", result.stdout)
        self.assertIn("script-reviewer -> done", result.stdout)
        self.assertEqual(self.status()["reviews"]["A"][-1]["verdict"], "pass")
        self.assertEqual(self.status()["agents"]["script-reviewer"]["state"], "done")

    def test_advance_uses_agent_override_and_skips_gate_on_revise(self):
        self.init()
        report = self.write_report()
        result = self.cli("advance", "sample", "A", "5", "--reviewer", "bob", "--report", report,
                          "--verdict", "revise", "--agent", "script-reviewer-2")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertNotIn("review A: pass", result.stdout)
        self.assertEqual(self.status()["agents"]["script-reviewer-2"]["state"], "done")

    def test_advance_propagates_review_failure_without_touching_agent(self):
        self.init()
        report = self.write_report()
        result = self.cli("advance", "sample", "A", "3", "--reviewer", "script-reviewer", "--report", report, "--verdict", "pass")
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("script-reviewer", self.status().get("agents", {}))

    def test_set_done_prints_audit_warning_and_strict_flag_fails(self):
        self.init()
        (self.root / "docs" / "sample" / "research.md").write_text("Research\n")
        soft = self.cli("set", "sample", "research", "done")
        self.assertEqual(soft.returncode, 0, soft.stderr)
        self.assertIn("⚠ audit:", soft.stdout)
        self.assertEqual(self.status()["stages"]["research"]["state"], "done")
        (self.root / "docs" / "sample" / "brief.md").write_text("Brief\n")
        strict = self.cli("set", "sample", "brief", "done", "--strict-audit")
        self.assertEqual(strict.returncode, 1)
        self.assertEqual(self.status()["stages"]["brief"]["state"], "done")

    def test_audit_clip_vs_shot_reports_overflow_and_skips_without_data(self):
        self.init()
        module = self.load_pipeline_module()
        self.assertFalse([e for e in module.audit("sample")["errors"] if "clip-vs-shot" in e])
        videos = self.root / "src" / "videos" / "sample"
        videos.mkdir(parents=True)
        (videos / "voice-durations.ts").write_text("export const VOICE_SECONDS = {\n  s1: 2.0,\n  s2: 3.0,\n} as const;\n")
        (videos / "timeline.ts").write_text(
            "export const timeline = defineSequentialTimeline([\n  shot('scene01', VOICE_SECONDS.s1, 0.5),\n"
            "  shot('scene02', VOICE_SECONDS.s2, 0.25),\n] as const);\n")
        audio = self.root / "public" / "audio" / "sample"
        audio.mkdir(parents=True)
        for key in ("s1", "s2"):
            (audio / f"{key}.mp3").write_bytes(b"x")
        module.clip_seconds = lambda path: {"s1": 2.4, "s2": 3.5}[path.stem]
        errors = [e for e in module.audit("sample")["errors"] if "clip-vs-shot" in e]
        self.assertEqual(len(errors), 1)
        self.assertIn("s2", errors[0])

    def test_draft_render_builds_half_scale_command_and_leaves_final_alone(self):
        self.init()
        module = self.load_pipeline_module()
        calls = []
        ns = argparse.Namespace(folder="sample", scale=0.5)
        out = module.render_draft(ns, runner=lambda cmd, **kw: calls.append(cmd))
        self.assertEqual(out, self.root / "out" / "draft" / "sample-draft.mp4")
        cmd = calls[0]
        self.assertIn("--scale", cmd)
        self.assertEqual(cmd[cmd.index("--scale") + 1], "0.5")
        self.assertEqual(cmd[cmd.index("SampleReel") + 1], str(out))
        data = self.status()
        self.assertNotIn("render_check", data)
        self.assertNotEqual(data["stages"]["render"].get("state"), "done")
        self.assertFalse((self.root / "out" / "sample-anh-khoi-reel.mp4").exists())


class MonitorStudioTest(unittest.TestCase):
    """Create videos and command agents from the monitor UI instead of a terminal."""

    # Borrow the temp-repo helpers without re-running PipelineCliTest's own tests.
    cli = PipelineCliTest.cli
    init = PipelineCliTest.init
    load_pipeline_module = PipelineCliTest.load_pipeline_module

    def setUp(self):
        PipelineCliTest.setUp(self)
        previews = self.root / "vietnamese-voice-samples" / "previews"
        previews.mkdir(parents=True)
        for name in ("Thanh-Long-Nang-Cao.mp3", "Ngan.mp3"):
            (previews / name).write_bytes(b"mp3")
        self.module = self.load_pipeline_module()
        self.server = self.module.ThreadingHTTPServer(("127.0.0.1", 0), self.module.Handler)
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.addCleanup(self.server.server_close)
        self.addCleanup(self.server.shutdown)
        self.base = f"http://127.0.0.1:{self.server.server_port}"

    def call(self, path, body=None, origin=True):
        headers = {"Content-Type": "application/json"}
        if origin:
            headers["Origin"] = self.base
        data = None if body is None else json.dumps(body).encode()
        request = urllib.request.Request(self.base + path, data=data, headers=headers,
                                         method="GET" if body is None else "POST")
        try:
            with urllib.request.urlopen(request) as response:
                return response.status, json.loads(response.read())
        except urllib.error.HTTPError as error:
            return error.code, json.loads(error.read() or b"{}")

    def fake_runner(self, code):
        config = {"fake": {"label": "Fake", "cmd": [sys.executable, "-c", code], "prompt": "stdin"}}
        (self.root / "scripts" / "agent-runners.json").write_text(json.dumps(config))

    def wait_run(self, vid, state, timeout=20, run_id=None):
        import time
        deadline = time.time() + timeout
        while time.time() < deadline:
            code, runs = self.call(f"/api/runs/{vid}")
            run = next((r for r in runs.get("runs", []) if r["id"] == run_id), None) if run_id else \
                (runs["runs"][-1] if code == 200 and runs["runs"] else None)
            if run and run["state"] == state:
                return runs
            time.sleep(0.2)
        self.fail(f"run never reached {state}: {runs}")

    REQUEST = {"topic": "Chứng minh để làm gì?", "profile": "story", "voice": "Thanh-Long-Nang-Cao.mp3",
               "mandatory": "Câu này giữ nguyên.", "notes": "Giọng trầm, kết lặng.", "runner": ""}

    def test_slug_and_composition_id_come_from_vietnamese_topic(self):
        self.assertEqual(self.module.slugify("Chứng minh để làm gì? Đời mình!"), "chung-minh-de-lam-gi-doi-minh")
        self.assertEqual(self.module.comp_id("dung-bien-tuoi-30"), "DungBienTuoi30Reel")

    def test_create_options_list_catalog_voices_profiles_and_runners(self):
        code, options = self.call("/api/create-options")
        self.assertEqual(code, 200)
        self.assertEqual([v["slug"] for v in options["voices"]], ["ngan", "thanh-long-nang-cao"])
        self.assertEqual({p["id"] for p in options["profiles"]}, {"story", "product", "knowledge", "news"})
        runners = {r["id"]: r for r in options["runners"]}
        self.assertTrue({"claude", "opencode", "codex"} <= set(runners))
        self.assertIsInstance(runners["codex"]["installed"], bool)
        self.assertIn("xhigh", runners["claude"]["efforts"])
        self.assertIsInstance(runners["opencode"]["models"], list)

    def runners_config(self, **codes):
        """Fake runners that accept --model/--effort; real CLIs are removed so a fallback never reaches them."""
        self.module.DEFAULT_RUNNERS = {}
        self.module.FALLBACK_ORDER = list(codes)
        config = {name: {"label": name.title(), "cmd": [sys.executable, "-c", code, "-"], "prompt": "stdin",
                         "model_args": ["--model", "{model}"], "effort_args": ["--effort", "{effort}"],
                         "efforts": ["high"], "models": ["m-small", "m-large"]} for name, code in codes.items()}
        (self.root / "scripts" / "agent-runners.json").write_text(json.dumps(config))

    QUOTA_EXIT = ("import json, sys; sys.stdin.read(); print(json.dumps({'type': 'error', 'error': "
                  "{'type': 'provider.quota', 'message': 'Rate limit exceeded. Please try again later.'}})); sys.exit(1)")

    def test_model_and_effort_reach_the_runner_cli_and_are_validated(self):
        self.init()
        self.runners_config(fake="import sys; sys.stdin.read(); print('ARGS', sys.argv[1:])")
        code, _ = self.call("/api/videos/sample/command", {"text": "x", "runner": "fake", "model": "a b&c"})
        self.assertEqual(code, 400)  # never let a model string reach the cmd.exe shim
        code, _ = self.call("/api/videos/sample/command", {"text": "x", "runner": "fake", "effort": "ultra"})
        self.assertEqual(code, 400)
        code, sent = self.call("/api/videos/sample/command",
                               {"text": "x", "runner": "fake", "model": "m-large", "effort": "high"})
        self.assertEqual(code, 201, sent)
        self.assertEqual((sent["run"]["model"], sent["run"]["effort"]), ("m-large", "high"))
        runs = self.wait_run("sample", "done")
        self.assertIn("'--model', 'm-large', '--effort', 'high', '-'", "\n".join(e["text"] for e in runs["log"]))

    def test_a_runner_out_of_quota_hands_the_task_to_the_next_runner(self):
        self.init()
        self.runners_config(first=self.QUOTA_EXIT,
                            second="import sys; data = sys.stdin.read(); print('CONTINUED' if 'ran out of tokens' in data and 'Làm tiếp voice' in data else 'LOST')")
        code, sent = self.call("/api/videos/sample/command", {"text": "Làm tiếp voice", "runner": "first", "model": "m-small"})
        self.assertEqual(code, 201, sent)
        runs = self.wait_run("sample", "done")
        first, second = runs["runs"][-2], runs["runs"][-1]
        self.assertEqual((first["id"], first["state"]), (sent["run"]["id"], "failed"))
        self.assertIn("Rate limit exceeded", first["quota_error"])
        self.assertEqual((second["runner"], second["fallback_of"], second["tried"]), ("second", first["id"], ["first"]))
        self.assertEqual(second["model"], "")  # the chosen model belonged to the runner that ran out
        self.assertIn("CONTINUED", "\n".join(e["text"] for e in runs["log"]))

    LADDER_MODELS = [{"id": "m-top", "label": "Top", "efforts": ["high", "max"], "default_effort": "max"},
                     {"id": "m-mid", "label": "Mid", "efforts": [], "default_effort": ""},
                     {"id": "m-low", "label": "Low", "efforts": ["low"], "default_effort": "low"}]

    def ladder_config(self, ladder_code, second_code=None):
        self.module.DEFAULT_RUNNERS = {}
        self.module.FALLBACK_ORDER = ["ladder", "second"]
        config = {"ladder": {"label": "Ladder", "cmd": [sys.executable, "-c", ladder_code, "-"], "prompt": "stdin",
                             "model_args": ["--model", "{model}"], "effort_variant": True, "ladder": True,
                             "efforts": [], "models": self.LADDER_MODELS}}
        if second_code:
            config["second"] = {"label": "Second", "cmd": [sys.executable, "-c", second_code, "-"], "prompt": "stdin"}
        (self.root / "scripts" / "agent-runners.json").write_text(json.dumps(config))

    def test_laddered_runner_starts_strongest_and_steps_down_on_rate_limits(self):
        self.init()
        self.ladder_config(self.QUOTA_EXIT.replace("sys.exit(1)", "sys.exit(0 if 'm-low#low' in sys.argv else 1)")
                           .replace("print(json.dumps", "print('ARGS', sys.argv[1:]) if 'm-low#low' in sys.argv else print(json.dumps"))
        code, sent = self.call("/api/videos/sample/command", {"text": "Làm tiếp", "runner": "ladder"})
        self.assertEqual(code, 201, sent)
        self.assertEqual((sent["run"]["model"], sent["run"]["effort"]), ("m-top", "max"))  # strongest, highest effort
        runs = self.wait_run("sample", "done")
        self.assertEqual([(r["model"], r["effort"], r["state"]) for r in runs["runs"]],
                         [("m-top", "max", "failed"), ("m-mid", "", "failed"), ("m-low", "low", "done")])
        self.assertEqual(runs["runs"][-1]["tried_models"], ["m-mid", "m-top"])
        prompt = (self.root / runs["runs"][-1]["prompt_file"]).read_text(encoding="utf-8")
        self.assertEqual(prompt.count("ran out of tokens"), 1)  # one hand-over note, not a stack

    def test_laddered_runner_hands_over_after_every_model_is_rate_limited(self):
        self.init()
        self.ladder_config(self.QUOTA_EXIT, second_code="import sys; sys.stdin.read(); print('SECOND')")
        self.call("/api/videos/sample/command", {"text": "Làm tiếp", "runner": "ladder"})
        runs = self.wait_run("sample", "done")
        self.assertEqual([(r["runner"], r["model"]) for r in runs["runs"]],
                         [("ladder", "m-top"), ("ladder", "m-mid"), ("ladder", "m-low"), ("second", "")])
        self.assertEqual(runs["runs"][-1]["tried"], ["ladder"])

    def test_opencode_models_are_ranked_strongest_first(self):
        catalog = {"beam-free": {"name": "Beam Free", "reasoning_options": [{"type": "effort", "values": ["low", "max", "high"]}]},
                   "mystery-free": {"name": "Mystery", "reasoning": True, "canonical_model_id": "x/mystery-300b-a30b",
                                    "reasoning_options": []},
                   "tiny-flash-free": {"name": "Tiny", "reasoning": True, "canonical_model_id": "x/tiny-flash"}}
        ranked = self.module.rank_opencode(
            ["opencode/tiny-flash-free", "opencode/big-pickle", "opencode/mystery-free", "opencode/beam-free",
             "opencode/nemotron-3-ultra-free"], catalog)
        self.assertEqual([m["id"].split("/")[1] for m in ranked],
                         ["nemotron-3-ultra-free", "beam-free", "big-pickle", "mystery-free", "tiny-flash-free"])
        beam = ranked[1]
        self.assertEqual((beam["efforts"], beam["default_effort"], beam["label"]), (["low", "high", "max"], "max", "2. Beam Free"))
        spec = {"path": "x", "cmd": ["opencode", "run", "msg"], "model_args": ["--model", "{model}"], "effort_variant": True}
        self.assertEqual(self.module.runner_cmd(spec, "p.md", {"model": "opencode/beam-free", "effort": "max"}),
                         ["x", "run", "--model", "opencode/beam-free#max", "msg"])

    def test_quota_words_in_tool_output_or_disabled_fallback_do_not_switch_runner(self):
        self.init()
        self.runners_config(
            first="import json, sys; sys.stdin.read(); print(json.dumps({'type': 'tool_use', 'part': {'output': 'rate limit exceeded'}}))",
            second="print('should not run')")
        self.call("/api/videos/sample/command", {"text": "x", "runner": "first"})
        runs = self.wait_run("sample", "done")
        self.assertEqual(len(runs["runs"]), 1)
        self.runners_config(first=self.QUOTA_EXIT, second="print('should not run')")
        self.call("/api/videos/sample/command", {"text": "x", "runner": "first", "fallback": False})
        runs = self.wait_run("sample", "failed")
        self.assertEqual([r["runner"] for r in runs["runs"]], ["first", "first"])

    def test_mutating_endpoints_reject_cross_origin_requests(self):
        code, _ = self.call("/api/videos", self.REQUEST, origin=False)
        self.assertEqual(code, 403)
        self.assertFalse((self.root / "docs" / "chung-minh-de-lam-gi").exists())

    def test_dry_run_returns_the_agent_prompt_without_creating_files(self):
        code, result = self.call("/api/videos", {**self.REQUEST, "dry_run": True})
        self.assertEqual(code, 200, result)
        self.assertEqual(result["video"], "chung-minh-de-lam-gi")
        self.assertIn("Câu này giữ nguyên.", result["prompt"])
        self.assertIn(".agents/rules/", result["prompt"])
        self.assertFalse((self.root / "docs" / "chung-minh-de-lam-gi").exists())

    def test_create_initializes_status_and_request_record(self):
        code, result = self.call("/api/videos", {**self.REQUEST, "clone_ok": True})
        self.assertEqual(code, 201, result)
        status = json.loads((self.root / "docs" / "chung-minh-de-lam-gi" / "status.json").read_text())
        self.assertEqual(status["comp"], "ChungMinhDeLamGiReel")
        self.assertEqual(status["voice"], "thanh-long-nang-cao")
        self.assertTrue(status["next"])
        record = (self.root / "docs" / "chung-minh-de-lam-gi" / "request.md").read_text(encoding="utf-8")
        self.assertIn("Chứng minh để làm gì?", record)
        self.assertIn("Câu này giữ nguyên.", record)
        self.assertIn("authorized", record)  # dated clone authorization from the owner
        code, again = self.call("/api/videos", self.REQUEST)
        self.assertEqual(code, 409)
        self.assertIn("exists", again["error"])

    def test_similar_existing_topic_needs_explicit_confirmation(self):
        self.assertEqual(self.cli("init", "chung-minh-de-lam-gi-cu", "--comp", "OldReel", "--voice", "x").returncode, 0)
        code, result = self.call("/api/videos", self.REQUEST)
        self.assertEqual(code, 409)
        self.assertTrue(result["needs_confirm"])
        self.assertEqual(result["matches"][0]["folder"], "chung-minh-de-lam-gi-cu")
        code, created = self.call("/api/videos", {**self.REQUEST, "confirm": True})
        self.assertEqual(code, 201, created)

    def test_create_with_runner_launches_agent_and_records_its_lifecycle(self):
        self.fake_runner("import sys; print('got: ' + sys.stdin.read()[:200])")
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": "fake"})
        self.assertEqual(code, 201, result)
        runs = self.wait_run("chung-minh-de-lam-gi", "done")
        self.assertIn("got:", "\n".join(e["text"] for e in runs["log"]))
        status = json.loads((self.root / "docs" / "chung-minh-de-lam-gi" / "status.json").read_text())
        self.assertEqual(status["agents"]["video-director"]["state"], "done")

    def test_command_runs_agent_on_existing_video_and_can_be_stopped(self):
        self.init()
        self.fake_runner("import time; time.sleep(60)")
        code, _ = self.call("/api/videos/sample/command", {"text": "Làm tiếp voice", "runner": "missing"})
        self.assertEqual(code, 400)
        code, _ = self.call("/api/videos/nope/command", {"text": "x", "runner": "fake"})
        self.assertEqual(code, 404)
        code, started = self.call("/api/videos/sample/command", {"text": "Làm tiếp voice", "runner": "fake"})
        self.assertEqual(code, 201, started)
        self.assertEqual(started["delivery"], "started")
        code, busy = self.call("/api/videos/sample/command", {"text": "again", "runner": "fake"})
        self.assertEqual(code, 201, busy)
        self.assertEqual(busy["delivery"], "note")  # a busy agent gets the message through owner-notes.md
        self.call(f"/api/runs/sample/{busy['run']['id']}/stop", {})  # drop its follow-up for this test
        run_id = started["run"]["id"]
        code, _ = self.call(f"/api/runs/sample/{run_id}/stop", {})
        self.assertEqual(code, 200)
        self.wait_run("sample", "stopped", run_id=run_id)
        prompt =(self.root / started["run"]["prompt_file"]).read_text(encoding="utf-8")
        self.assertIn("Làm tiếp voice", prompt)

    def later(self, minutes):
        from datetime import datetime, timedelta
        return (datetime.now() + timedelta(minutes=minutes)).strftime("%Y-%m-%dT%H:%M")

    def test_create_can_schedule_the_agent_and_the_scheduler_launches_it_when_due(self):
        from datetime import datetime, timedelta
        self.fake_runner("import sys; print('got: ' + sys.stdin.read()[-60:])")
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": "fake", "run_at": self.later(90)})
        self.assertEqual(code, 201, result)
        self.assertEqual(result["run"]["state"], "scheduled")
        status = json.loads((self.root / "docs" / "chung-minh-de-lam-gi" / "status.json").read_text(encoding="utf-8"))
        self.assertEqual(status["runs"][-1]["state"], "scheduled")
        self.assertIn("lịch", status["next"].lower())
        self.module.tick_scheduler(datetime.now().astimezone())  # not due yet
        self.assertEqual(self.call("/api/runs/chung-minh-de-lam-gi")[1]["runs"][-1]["state"], "scheduled")
        self.module.tick_scheduler(datetime.now().astimezone() + timedelta(hours=2))
        runs = self.wait_run("chung-minh-de-lam-gi", "done")
        self.assertEqual(runs["runs"][-1]["id"], result["run"]["id"])  # the same run, now executed
        self.assertIn("got:", "\n".join(e["text"] for e in runs["log"]))

    def test_scheduled_command_can_be_cancelled_and_bad_times_are_rejected(self):
        from datetime import datetime, timedelta
        self.init()
        self.fake_runner("print('should not run')")
        code, _ = self.call("/api/videos/sample/command", {"text": "x", "runner": "fake", "run_at": "ngày mai"})
        self.assertEqual(code, 400)
        code, scheduled = self.call("/api/videos/sample/command", {"text": "Render lại", "runner": "fake", "run_at": self.later(30)})
        self.assertEqual(code, 201, scheduled)
        code, _ = self.call(f"/api/runs/sample/{scheduled['run']['id']}/stop", {})
        self.assertEqual(code, 200)
        self.module.tick_scheduler(datetime.now().astimezone() + timedelta(hours=1))
        self.assertEqual(self.call("/api/runs/sample")[1]["runs"][-1]["state"], "cancelled")

    def test_a_past_schedule_time_runs_immediately(self):
        self.init()
        self.fake_runner("print('now')")
        code, result = self.call("/api/videos/sample/command", {"text": "Làm ngay", "runner": "fake", "run_at": self.later(-5)})
        self.assertEqual(code, 201, result)
        self.assertEqual(result["run"]["state"], "running")
        self.wait_run("sample", "done")

    def test_owner_notes_reach_the_running_agent_and_show_their_status(self):
        self.init()
        code, _ = self.call("/api/videos/sample/notes", {"text": "Kết thúc bằng câu hỏi"}, origin=False)
        self.assertEqual(code, 403)
        code, first = self.call("/api/videos/sample/notes", {"text": "Kết thúc bằng câu hỏi"})
        self.assertEqual(code, 201, first)
        code, second = self.call("/api/videos/sample/notes", {"text": "Đổi giọng sang Ngan"})
        self.assertEqual([n["id"] for n in second["notes"]], ["N1", "N2"])
        self.assertTrue(all(n["status"] == "pending" for n in second["notes"]))
        notes = self.root / "docs" / "sample" / "owner-notes.md"
        text = notes.read_text(encoding="utf-8")
        self.assertIn("Đổi giọng sang Ngan", text)
        notes.write_text(text.replace("· pending", "· done: thêm câu hỏi cuối", 1), encoding="utf-8")  # the agent marks N1
        code, runs = self.call("/api/runs/sample")
        self.assertEqual([n["status"] for n in runs["notes"]], ["done: thêm câu hỏi cuối", "pending"])
        self.assertIn("owner-notes.md", self.module.command_prompt("sample", "x"))

    def test_a_message_to_a_busy_agent_becomes_a_note_with_one_follow_up(self):
        self.init()
        self.fake_runner("import sys, time; data = sys.stdin.read(); time.sleep(30 if 'JOB-ONE' in data else 0); print('ran')")
        code, first = self.call("/api/videos/sample/command", {"text": "JOB-ONE", "runner": "fake"})
        self.assertEqual(code, 201, first)
        code, msg1 = self.call("/api/videos/sample/command", {"text": "Kết thúc bằng câu hỏi", "runner": "fake"})
        code, msg2 = self.call("/api/videos/sample/command", {"text": "Giữ giọng trầm", "runner": "fake"})
        self.assertEqual(code, 201, msg2)
        self.assertEqual([n["id"] for n in msg2["notes"]], ["N1", "N2"])
        self.assertEqual(msg1["run"]["id"], msg2["run"]["id"])  # one follow-up, not one per message
        self.assertTrue(msg2["run"]["after_current"] and msg2["run"]["notes_followup"])
        self.call(f"/api/runs/sample/{first['run']['id']}/stop", {})
        runs = self.wait_run("sample", "done")  # notes still pending: the follow-up starts once the first run ends
        self.assertEqual(runs["runs"][-1]["id"], msg1["run"]["id"])

    def test_follow_up_is_dropped_when_the_running_agent_handled_every_note(self):
        self.init()
        self.fake_runner("import sys, time; data = sys.stdin.read(); time.sleep(30 if 'JOB-ONE' in data else 0); print('ran')")
        code, first = self.call("/api/videos/sample/command", {"text": "JOB-ONE", "runner": "fake"})
        code, msg = self.call("/api/videos/sample/command", {"text": "Kết thúc bằng câu hỏi", "runner": "fake"})
        self.assertEqual(msg["delivery"], "note")
        notes = self.root / "docs" / "sample" / "owner-notes.md"
        notes.write_text(notes.read_text(encoding="utf-8").replace("· pending", "· done: thêm câu hỏi"), encoding="utf-8")
        self.call(f"/api/runs/sample/{first['run']['id']}/stop", {})
        runs = self.wait_run("sample", "cancelled")
        self.assertEqual(runs["runs"][-1]["id"], msg["run"]["id"])

    def test_runs_survive_a_monitor_restart_by_pid(self):
        self.init()
        self.fake_runner("import time; time.sleep(60)")
        code, started = self.call("/api/videos/sample/command", {"text": "Làm tiếp", "runner": "fake"})
        self.assertEqual(code, 201, started)
        with self.module.LIVE_LOCK:  # a restarted server has no in-memory handle for the run
            self.module.LIVE_RUNS.clear()
        code, runs = self.call("/api/runs/sample")
        self.assertEqual(runs["runs"][-1]["state"], "running")
        self.assertTrue(runs["runs"][-1]["detached"])
        code, _ = self.call(f"/api/runs/sample/{started['run']['id']}/stop", {})
        self.assertEqual(code, 200)
        runs = self.wait_run("sample", "stopped")
        status = json.loads((self.root / "docs" / "sample" / "status.json").read_text())
        self.assertEqual(status["runs"][-1]["state"], "stopped")
        self.assertNotEqual(status["agents"]["video-director"]["state"], "running")

    def test_stream_json_log_is_summarized_for_people(self):
        lines = [
            json.dumps({"type": "system", "subtype": "init"}),
            json.dumps({"type": "assistant", "message": {"content": [
                {"type": "text", "text": "Bắt đầu Phase 0"},
                {"type": "tool_use", "name": "Bash", "input": {"command": "python3 -I scripts/pipeline.py show x"}}]}}),
            json.dumps({"type": "result", "is_error": False, "result": "Xong research"}),
            "plain text line",
        ]
        entries = self.module.summarize_log(lines)
        self.assertEqual([e["kind"] for e in entries], ["say", "tool", "result", "text"])
        self.assertIn("pipeline.py show", entries[1]["text"])

    def test_opencode_json_log_is_summarized_for_people(self):
        lines = [
            json.dumps({"type": "step_start", "part": {"type": "step-start"}}),
            json.dumps({"type": "tool_use", "part": {"type": "tool", "tool": "read",
                        "state": {"status": "completed", "input": {"filePath": "AGENTS.md"}}}}),
            json.dumps({"type": "tool_use", "part": {"type": "tool", "tool": "bash",
                        "state": {"status": "error", "input": {"command": "npx tsc"}, "error": "exit 2"}}}),
            json.dumps({"type": "text", "part": {"type": "text", "text": "Đã xong intake"}}),
            json.dumps({"type": "step_finish", "part": {"type": "step-finish", "reason": "tool-calls"}}),
        ]
        entries = self.module.summarize_log(lines)
        self.assertEqual([e["kind"] for e in entries], ["tool", "error", "say"])
        self.assertIn("read: AGENTS.md", entries[0]["text"])
        self.assertIn("exit 2", entries[1]["text"])


class MonitorCreateFlowTest(unittest.TestCase):
    """The modal's "Tạo video" flow end to end: validation, what gets written, run options, lifecycle, races."""

    cli = PipelineCliTest.cli
    init = PipelineCliTest.init
    load_pipeline_module = PipelineCliTest.load_pipeline_module
    call = MonitorStudioTest.call
    fake_runner = MonitorStudioTest.fake_runner
    wait_run = MonitorStudioTest.wait_run
    runners_config = MonitorStudioTest.runners_config
    ladder_config = MonitorStudioTest.ladder_config
    LADDER_MODELS = MonitorStudioTest.LADDER_MODELS
    later = MonitorStudioTest.later
    REQUEST = MonitorStudioTest.REQUEST
    FOLDER = "chung-minh-de-lam-gi"

    def setUp(self):
        MonitorStudioTest.setUp(self)

    def docs_names(self):
        return sorted(p.name for p in (self.root / "docs").iterdir())

    def raw_post(self, path, data: bytes, content_type="application/json", origin=True):
        headers = {"Content-Type": content_type}
        if origin:
            headers["Origin"] = self.base
        request = urllib.request.Request(self.base + path, data=data, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(request) as response:
                return response.status, json.loads(response.read())
        except urllib.error.HTTPError as error:
            return error.code, json.loads(error.read() or b"{}")

    def status(self, folder=FOLDER):
        return json.loads((self.root / "docs" / folder / "status.json").read_text(encoding="utf-8"))

    def record(self, folder=FOLDER):
        return (self.root / "docs" / folder / "request.md").read_text(encoding="utf-8")

    # A. Input validation: every refusal leaves no folder behind.

    def test_invalid_requests_are_refused_and_create_nothing(self):
        self.init()
        self.fake_runner("print('never')")
        before = self.docs_names()
        cases = {
            "empty topic": {"topic": "   "},
            "traversal slug": {"slug": "../x"},
            "underscore slug": {"slug": "A_B"},
            "leading dash slug": {"slug": "-a"},
            "lowercase comp": {"comp": "lowercase"},
            "unknown profile": {"profile": "sports"},
            "unknown voice": {"voice": "nobody.mp3"},
            "non-number duration": {"min_seconds": "abc"},
            "min not below max": {"min_seconds": 60, "max_seconds": 60},
            "min under 5": {"min_seconds": 3},
            "max over 180": {"max_seconds": 500},
            "unknown reference": {"reference": "missing-video"},
            "runner not installed": {"runner": "claude-not-here"},
            "bad run_at": {"runner": "fake", "run_at": "ngày mai"},
            "bad model": {"runner": "fake", "model": "a b&c"},
            "bad effort": {"runner": "fake", "effort": "ultra"},
        }
        for name, change in cases.items():
            with self.subTest(name):
                code, result = self.call("/api/videos", {**self.REQUEST, **change})
                self.assertEqual(code, 400, result)
                self.assertEqual(self.docs_names(), before)
                self.assertFalse((self.root / "out" / "agent-runs").exists())

    def test_a_video_folder_that_only_exists_in_src_is_a_conflict(self):
        self.init()
        (self.root / "src" / "videos" / self.FOLDER).mkdir(parents=True)
        code, result = self.call("/api/videos", self.REQUEST)
        self.assertEqual(code, 409, result)
        self.assertNotIn(self.FOLDER, self.docs_names())

    def test_request_body_must_be_json_from_the_monitor_page(self):
        self.init()
        payload = json.dumps(self.REQUEST).encode()
        self.assertEqual(self.raw_post("/api/videos", payload, content_type="text/plain")[0], 403)
        self.assertEqual(self.raw_post("/api/videos", payload, origin=False)[0], 403)
        self.assertEqual(self.raw_post("/api/videos", b"{not json")[0], 400)
        self.assertEqual(self.raw_post("/api/videos", b"[1, 2]")[0], 400)
        self.assertNotIn(self.FOLDER, self.docs_names())

    def test_overlong_fields_are_truncated_not_rejected(self):
        self.init()
        code, result = self.call("/api/videos", {**self.REQUEST, "topic": "x" * 2500, "mandatory": "m" * 5000})
        self.assertEqual(code, 201, result)
        folder = result["video"]
        record = self.record(folder)
        self.assertIn("x" * 2000, record)
        self.assertNotIn("x" * 2001, record)
        self.assertIn("m" * 4000, record)
        self.assertNotIn("m" * 4001, record)

    # B. What gets written: every field the modal sends must reach request.md and the agent prompt.

    def test_empty_voice_is_left_to_the_agent_as_tbd(self):
        self.init()
        code, result = self.call("/api/videos", {**self.REQUEST, "voice": ""})
        self.assertEqual(code, 201, result)
        self.assertEqual(self.status()["voice"], "tbd")
        self.assertIn("not chosen", self.record())

    def test_voice_clone_is_recorded_as_authorized_only_when_the_owner_ticked_it(self):
        self.init()
        self.call("/api/videos", self.REQUEST)
        self.assertIn("not authorized", self.record())
        self.assertNotIn("authorized by the owner", self.record())
        code, result = self.call("/api/videos", {**self.REQUEST, "topic": "Quyền lợi người lao động", "clone_ok": True})
        self.assertEqual(code, 201, result)
        self.assertIn("authorized by the owner", self.record(result["video"]))

    def test_every_modal_field_reaches_the_request_record_and_the_prompt(self):
        self.init()  # "sample" becomes a style reference
        request = {**self.REQUEST, "reference": "sample", "avoid": "tông giật gân", "light": True,
                   "min_seconds": 45, "max_seconds": 90, "sources": "Nguồn: báo cáo 2026",
                   "notes": "Kết thúc bằng câu hỏi", "mandatory": "Dòng bắt buộc số một"}
        preview = self.call("/api/videos", {**request, "dry_run": True})
        self.assertEqual(preview[0], 200, preview[1])
        prompt = preview[1]["prompt"]
        for text in ("tông giật gân", "Nguồn: báo cáo 2026", "Kết thúc bằng câu hỏi", "Dòng bắt buộc số một",
                     "Light mode | yes", "45–90 s", "Style reference | sample", ".agents/rules/", "owner-notes.md"):
            self.assertIn(text, prompt, text)
        code, result = self.call("/api/videos", request)
        self.assertEqual(code, 201, result)
        record = self.record()
        for text in ("tông giật gân", "Nguồn: báo cáo 2026", "Kết thúc bằng câu hỏi", "Dòng bắt buộc số một",
                     "Light mode | yes", "45–90 s", "Style reference | sample"):
            self.assertIn(text, record, text)

    def test_explicit_slug_and_composition_are_respected(self):
        code, result = self.call("/api/videos", {**self.REQUEST, "slug": "video-rieng", "comp": "VideoRiengReel"})
        self.assertEqual(code, 201, result)
        self.assertEqual((result["video"], result["comp"]), ("video-rieng", "VideoRiengReel"))
        self.assertEqual(self.status("video-rieng")["comp"], "VideoRiengReel")

    def test_creating_without_a_runner_only_prepares_the_video(self):
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": ""})
        self.assertEqual(code, 201, result)
        self.assertIsNone(result["run"])
        self.assertEqual(result["run_error"], "")
        status = self.status()
        self.assertNotIn("video-director", status.get("agents", {}))
        self.assertEqual(status.get("workflow_version"), 4)
        self.assertTrue(status["next"])
        self.assertIn("no agent launched", " ".join(e["msg"] for e in status["log"]))

    def test_created_video_is_listed_and_offered_as_a_style_reference(self):
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": ""})
        self.assertEqual(code, 201, result)
        _, status = self.call("/api/status")
        self.assertIn(self.FOLDER, json.dumps(status, ensure_ascii=False))
        _, options = self.call("/api/create-options")
        self.assertIn(self.FOLDER, [v["folder"] for v in options["videos"]])

    def test_a_just_created_topic_makes_a_near_duplicate_ask_for_confirmation(self):
        self.call("/api/videos", {**self.REQUEST, "runner": ""})
        code, result = self.call("/api/videos", {**self.REQUEST, "topic": "Chứng minh để làm gì mới", "runner": ""})
        self.assertEqual(code, 409, result)
        self.assertTrue(result["needs_confirm"])
        self.assertEqual(result["matches"][0]["folder"], self.FOLDER)

    def test_dry_run_never_writes_even_when_confirmed_and_with_a_runner(self):
        self.fake_runner("print('never')")
        self.call("/api/videos", {**self.REQUEST, "runner": ""})
        before = self.docs_names()
        code, result = self.call("/api/videos", {**self.REQUEST, "topic": "Chứng minh để làm gì mới",
                                                 "runner": "fake", "dry_run": True})
        self.assertEqual(code, 409, result)  # the preview also reports the near-duplicate
        code, result = self.call("/api/videos", {**self.REQUEST, "topic": "Chứng minh để làm gì mới",
                                                 "runner": "fake", "dry_run": True, "confirm": True})
        self.assertEqual(code, 200, result)
        self.assertEqual(self.docs_names(), before)
        self.assertFalse((self.root / "out" / "agent-runs").exists())

    # C. Run options chosen in the modal.

    def test_model_effort_and_fallback_reach_the_runner_and_the_run_record(self):
        self.runners_config(fake="import sys; sys.stdin.read(); print('ARGS', sys.argv[1:])")
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": "fake", "model": "m-large",
                                                 "effort": "high", "fallback": False})
        self.assertEqual(code, 201, result)
        self.assertEqual((result["run"]["model"], result["run"]["effort"], result["run"]["fallback"]),
                         ("m-large", "high", False))
        runs = self.wait_run(self.FOLDER, "done")
        self.assertIn("'--model', 'm-large', '--effort', 'high', '-'", "\n".join(e["text"] for e in runs["log"]))

    def test_a_laddered_runner_created_without_a_model_starts_at_its_strongest(self):
        self.ladder_config("import sys; sys.stdin.read(); print('OK')")
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": "ladder"})
        self.assertEqual(code, 201, result)
        self.assertEqual((result["run"]["model"], result["run"]["effort"]), ("m-top", "max"))
        self.wait_run(self.FOLDER, "done")

    def test_scheduled_create_survives_a_monitor_restart(self):
        from datetime import datetime, timedelta
        self.runners_config(fake="import sys; sys.stdin.read(); print('ARGS', sys.argv[1:])")
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": "fake", "model": "m-large",
                                                 "effort": "high", "run_at": self.later(90)})
        self.assertEqual(code, 201, result)
        self.assertEqual(result["run"]["state"], "scheduled")
        fresh = self.load_pipeline_module()  # a restarted monitor: new module state, same status files
        self.assertEqual(fresh.tick_scheduler(datetime.now().astimezone() + timedelta(hours=2))[0]["model"], "m-large")
        runs = self.wait_run(self.FOLDER, "done")
        self.assertIn("'--model', 'm-large'", "\n".join(e["text"] for e in runs["log"]))

    # D. The lifecycle an agent must follow, driven by a fake agent that uses the real pipeline CLI.

    AGENT = (
        "import subprocess, sys, pathlib\n"
        "vid = 'chung-minh-de-lam-gi'\n"
        "prompt = sys.stdin.read()\n"
        "assert vid in prompt and 'owner-notes.md' in prompt\n"
        "def run(*a):\n"
        "    subprocess.run([sys.executable, '-I', 'scripts/pipeline.py', *a], check=True)\n"
        "run('agent', vid, 'video-director', 'running', '--stage', 'research')\n"
        "run('set', vid, 'research', 'in_progress')\n"
        "pathlib.Path('docs', vid, 'research.md').write_text('# Research\\n\\nsource: test\\n', encoding='utf-8')\n"
        "run('set', vid, 'research', 'done', '--note', 'research written')\n"
        "run('agent', vid, 'video-director', 'idle')\n"
        "print('AGENT FINISHED')\n"
    )

    def test_an_agent_follows_the_pipeline_from_create_to_an_audited_stage(self):
        self.fake_runner(self.AGENT)
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": "fake"})
        self.assertEqual(code, 201, result)
        runs = self.wait_run(self.FOLDER, "done")
        self.assertIn("AGENT FINISHED", "\n".join(e["text"] for e in runs["log"]))
        status = self.status()
        self.assertEqual(status["stages"]["research"]["state"], "done")
        self.assertNotEqual(status.get("agents", {}).get("video-director", {}).get("state"), "running")
        audit = self.cli("audit", self.FOLDER)
        self.assertEqual(audit.returncode, 0, audit.stdout + audit.stderr)

    def test_an_agent_that_skips_the_evidence_cannot_mark_a_stage_done(self):
        self.fake_runner(
            "import sys, subprocess; sys.stdin.read(); "
            "subprocess.run([sys.executable, '-I', 'scripts/pipeline.py', 'set', 'chung-minh-de-lam-gi', 'research', 'done'])")
        code, result = self.call("/api/videos", {**self.REQUEST, "runner": "fake"})
        self.assertEqual(code, 201, result)
        self.wait_run(self.FOLDER, "done")
        self.assertNotEqual(self.status()["stages"].get("research", {}).get("state"), "done")

    def test_two_identical_creates_at_once_make_one_video(self):
        results = []

        def post():
            results.append(self.call("/api/videos", {**self.REQUEST, "runner": ""}))

        threads = [threading.Thread(target=post) for _ in range(2)]
        for t in threads:
            t.start()
        for t in threads:
            t.join(20)
        codes = sorted(code for code, _ in results)
        self.assertEqual(codes, [201, 409], results)
        self.assertEqual(self.docs_names().count(self.FOLDER), 1)

    def test_a_runner_that_cannot_start_keeps_the_video_and_reports_why(self):
        from unittest import mock
        self.fake_runner("print('never')")
        with mock.patch.object(self.module.subprocess, "Popen", side_effect=OSError("boom")):
            code, result = self.call("/api/videos", {**self.REQUEST, "runner": "fake"})
        self.assertEqual(code, 201, result)
        self.assertIsNone(result["run"])
        self.assertIn("boom", result["run_error"])
        self.assertTrue((self.root / "docs" / self.FOLDER / "status.json").is_file())
        self.assertIn("create run not started", " ".join(e["msg"] for e in self.status()["log"]))

    def test_the_real_server_process_creates_and_runs_a_video(self):
        import socket
        import subprocess as sp
        import time
        with socket.socket() as probe:
            probe.bind(("127.0.0.1", 0))
            port = probe.getsockname()[1]
        self.fake_runner("import sys; sys.stdin.read(); print('SERVER AGENT OK')")
        log = open(self.root / "serve.log", "wb")
        server = sp.Popen([sys.executable, "-I", "scripts/pipeline.py", "serve", "--port", str(port)],
                          cwd=self.root, stdout=log, stderr=sp.STDOUT, env={**os.environ, "PYTHONUTF8": "1"})
        self.addCleanup(lambda: (server.kill(), server.wait(), log.close()))
        base = f"http://127.0.0.1:{port}"
        deadline = time.time() + 30
        while True:
            try:
                urllib.request.urlopen(base + "/api/meta", timeout=2).read()
                break
            except OSError:
                if time.time() > deadline or server.poll() is not None:
                    self.fail("server did not start: " + (self.root / "serve.log").read_text(errors="replace"))
                time.sleep(0.2)
        request = urllib.request.Request(base + "/api/videos", data=json.dumps({**self.REQUEST, "runner": "fake"}).encode(),
                                         headers={"Content-Type": "application/json", "Origin": base}, method="POST")
        with urllib.request.urlopen(request) as response:
            self.assertEqual(response.status, 201)
        deadline = time.time() + 30
        while time.time() < deadline:
            runs = json.loads(urllib.request.urlopen(base + f"/api/runs/{self.FOLDER}").read())
            if runs["runs"] and runs["runs"][-1]["state"] == "done":
                self.assertIn("SERVER AGENT OK", "\n".join(e["text"] for e in runs["log"]))
                return
            time.sleep(0.3)
        self.fail("the run did not finish through the real server")


if __name__ == "__main__":
    unittest.main()
