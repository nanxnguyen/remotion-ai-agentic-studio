"""Behavior checks for the reusable video production status CLI."""

import json
import importlib.util
import shutil
import subprocess
import sys
import tempfile
import threading
import unittest
import urllib.error
import urllib.request
from pathlib import Path


SOURCE = Path(__file__).with_name("pipeline.py")


class PipelineCliTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / "scripts").mkdir()
        shutil.copy2(SOURCE, self.root / "scripts" / "pipeline.py")
        (self.root / "docs" / "sample").mkdir(parents=True)
        (self.root / "src").mkdir()
        (self.root / "src" / "Root.tsx").write_text('<Composition id="SampleReel" />')
        (self.root / "out" / "qa").mkdir(parents=True)

    def cli(self, *args):
        return subprocess.run(
            [sys.executable, "-I", str(self.root / "scripts" / "pipeline.py"), *args],
            cwd=self.root, text=True, capture_output=True,
        )

    def init(self):
        result = self.cli("init", "sample", "--comp", "SampleReel", "--voice", "anh-khoi")
        self.assertEqual(result.returncode, 0, result.stderr)

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
            (self.root / "docs" / "sample" / name).write_text(f"Independent gate {gate} review\n")
            result = self.cli("review", "sample", gate, "9", "--reviewer", f"reviewer-{gate}", "--report", name)
            self.assertEqual(result.returncode, 0, result.stderr)

    def make_video(self, path):
        subprocess.run([
            "ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "color=c=black:s=1080x1920:r=30",
            "-f", "lavfi", "-i", "sine=frequency=440:sample_rate=48000", "-t", "0.5", "-c:v", "libx264",
            "-preset", "ultrafast", "-pix_fmt", "yuv420p", "-c:a", "aac", str(path),
        ], check=True)

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
        report = self.root / "docs" / "sample" / "video-review.md"
        report.write_text("Reviewed first render\n")
        result = self.cli("review", "sample", "C", "9", "--reviewer", "critic", "--report", "video-review.md", "--full-listen")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.cli("gate", "sample", "C").returncode, 0)
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
        report.write_text("The first voice was reviewed\n")
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
        low = self.cli("review", "sample", "D", "8.5", "--reviewer", "art", "--report", "design-review.md")
        self.assertNotEqual(low.returncode, 0)
        self.assertIn(">= 9", low.stderr)
        ok = self.cli("review", "sample", "D", "9", "--reviewer", "art", "--report", "design-review.md")
        self.assertEqual(ok.returncode, 0, ok.stderr)

    def test_b_and_c_pass_at_eight_but_not_below(self):
        self.init()
        self.pass_gates("A", "D", "E")
        (self.root / "docs" / "sample" / "e.md").write_text("review")
        low_b = self.cli("review", "sample", "B", "7.9", "--reviewer", "r", "--report", "e.md")
        self.assertNotEqual(low_b.returncode, 0)
        self.assertIn(">= 8", low_b.stderr)
        self.assertEqual(self.cli("review", "sample", "B", "8", "--reviewer", "r", "--report", "e.md").returncode, 0)
        self.make_video(self.root / "out" / "sample-anh-khoi-reel.mp4")
        self.assertEqual(self.cli("verify", "sample", "--min-seconds", "0.1").returncode, 0)
        low_c = self.cli("review", "sample", "C", "7.9", "--reviewer", "r", "--report", "e.md")
        self.assertNotEqual(low_c.returncode, 0)
        self.assertEqual(self.cli("review", "sample", "C", "8", "--reviewer", "r", "--report", "e.md").returncode, 0)
        self.assertEqual(self.cli("gate", "sample", "C").returncode, 0)

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
        self.assertEqual(self.status()["workflow_version"], 3)
        self.assertNotEqual(self.cli("upgrade", "sample").returncode, 0)

    def test_review_view_marks_stale_and_counts_only_scored_rounds(self):
        self.init()
        self.pass_gates("A", "D")
        self.assertEqual(self.cli("set", "sample", "design", "in_progress").returncode, 0)
        view = self.load_pipeline_module().view("sample")
        self.assertTrue(view["reviews"]["D"]["stale"])
        self.assertFalse(view["reviews"]["A"]["stale"])
        self.assertEqual(view["reviews"]["D"]["threshold"], 9)
        self.assertEqual(view["reviews"]["B"]["threshold"], 8)

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
        report.write_text("Shot-by-shot picture, captions, ASR and loudness checked\n")
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
        self.pass_gates("A")
        self.assertEqual(self.cli("set", "sample", "design", "done").returncode, 0)
        (self.root / "docs" / "sample" / "design-review.md").write_text("Design review\n")
        args = ("review", "sample", "D", "8.8", "--reviewer", "critic",
                "--report", "design-review.md", "--verdict", "revise")
        self.assertEqual(self.cli(*args).returncode, 0)
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
        result = self.cli("set", "sample", "design", "done", "--note", "user override")
        self.assertEqual(result.returncode, 0, result.stderr)
        msg = self.status()["log"][-1]["msg"]
        self.assertIn("design-spec.md", msg)
        self.assertIn("gate D", msg)
        self.assertIn("revise", msg)

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


if __name__ == "__main__":
    unittest.main()
