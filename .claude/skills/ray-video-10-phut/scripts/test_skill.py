"""Unit tests for distributable skill bundle; runnable without original repo."""
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from validate_skill import validate  # noqa: E402
from install import install  # noqa: E402


class SkillTest(unittest.TestCase):
    def test_static_validation(self):
        skill = Path(__file__).resolve().parents[1]
        self.assertEqual([], validate(skill))

    def test_installer_refuses_to_overwrite(self):
        source = Path(__file__).resolve().parents[1]
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            (repo / "scripts").mkdir()
            (repo / "scripts" / "pipeline.py").write_text("# stub", encoding="utf-8")
            original = repo / ".agents" / "skills" / "ray-pineline-worflow-agent"
            original.mkdir(parents=True)
            (original / "SKILL.md").write_text("# original", encoding="utf-8")
            dest, _ = install(repo, source)
            self.assertTrue((dest / "SKILL.md").exists())
            with self.assertRaises(FileExistsError):
                install(repo, source)


if __name__ == "__main__":
    unittest.main()
