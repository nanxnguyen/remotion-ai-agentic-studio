"""Regression tests for infrastructure-vs-code failure diagnosis and preflight."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("silent_factory_doctor", ROOT / "scripts" / "silent_factory_doctor.py")
if spec is None or spec.loader is None:
    raise RuntimeError("doctor import spec unavailable")
doctor = importlib.util.module_from_spec(spec)
spec.loader.exec_module(doctor)


class DoctorTests(unittest.TestCase):
    def test_unallocated_runner_is_not_described_as_render_failure(self):
        run = {"status": "completed", "conclusion": "failure"}
        jobs = [{"status": "completed", "conclusion": "failure", "runner_id": 0, "steps": []}]
        self.assertEqual(doctor.classify_actions_failure(run, jobs)["code"], "RUNNER_NOT_ALLOCATED")

    def test_real_failing_step_is_reported(self):
        run = {"status": "completed", "conclusion": "failure"}
        jobs = [{"runner_id": 42, "steps": [{"name": "npm run typecheck", "conclusion": "failure"}]}]
        self.assertEqual(doctor.classify_actions_failure(run, jobs)["code"], "JOB_STEP_FAILED")
        self.assertEqual(doctor.classify_actions_failure(run, jobs)["failed_step"], "npm run typecheck")

    def test_success_is_not_misclassified(self):
        self.assertEqual(doctor.classify_actions_failure({"conclusion": "success"}, [])["code"], "RUN_SUCCESS")

    def test_still_running_is_not_failure(self):
        self.assertEqual(doctor.classify_actions_failure({"status": "in_progress"}, [])["code"], "RUN_PENDING")

    def test_no_drive_write_scope_does_not_count_as_upload_capability(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            (root / "scripts").mkdir()
            (root / ".github" / "workflows").mkdir(parents=True)
            for name in ("silent_factory_executor.py", "silent_factory_drive_writer.py"):
                (root / "scripts" / name).write_text("# fixture")
            (root / ".github" / "workflows" / "silent-factory-longform-render.yml").write_text("name: fake")
            result = doctor.check_environment(root=root, environ={"DRIVE_REFRESH_TOKEN": "read-only-token"}, dry_run=True)
            self.assertNotIn("drive_writer_ready", result["capabilities"])
            self.assertIn("DRIVE_WRITE_CREDENTIAL_MISSING", result["blockers"])
            self.assertNotIn("read-only-token", str(result))

    def test_manifest_trigger_not_assumed_to_use_dispatch(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            (root / ".github" / "workflows").mkdir(parents=True)
            (root / ".github" / "workflows" / "silent-factory-longform-render.yml").write_text("on:\\n  push:\\n")
            result = doctor.check_environment(root=root, environ={}, dry_run=True)
            self.assertIn("push_trigger_documented", result["capabilities"])
            self.assertNotIn("WORKFLOW_DISPATCH_MISSING", result["blockers"])


if __name__ == "__main__":
    unittest.main()
