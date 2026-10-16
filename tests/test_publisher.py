"""Publisher behavior tests that require no credentials or network."""
import importlib.util, pathlib, sqlite3, subprocess, sys, tempfile, unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
SPEC=importlib.util.spec_from_file_location("publisher",ROOT/"scripts"/"publish-video.py")
mod=importlib.util.module_from_spec(SPEC);SPEC.loader.exec_module(mod)
class PublisherTests(unittest.TestCase):
    def test_db_insert_is_idempotent(self):
        with sqlite3.connect(":memory:") as db:
            mod.init(db);mod.save(db,"k","v","youtube","sha","uploading")
            mod.save(db,"k","v","youtube","sha","needs_reconcile")
            self.assertEqual(db.execute("SELECT count(*) FROM uploads").fetchone()[0],1)
            self.assertEqual(db.execute("SELECT status FROM uploads").fetchone()[0],"needs_reconcile")
    def test_digest_stable(self):
        with tempfile.TemporaryDirectory() as d:
            f=pathlib.Path(d)/"a.mp4";f.write_bytes(b"abc")
            self.assertEqual(mod.digest(f),mod.digest(f))
    def test_missing_file_blocks(self):
        p=subprocess.run([sys.executable,str(ROOT/"scripts"/"publish-video.py"),"not-a-video","--file","/missing.mp4","--title","T"],capture_output=True,text=True)
        self.assertNotEqual(p.returncode,0)
        self.assertIn("MP4 does not exist",p.stderr)
    def test_execute_requires_interactive_approval(self):
        import os
        from unittest.mock import patch
        with tempfile.TemporaryDirectory() as d:
            f=pathlib.Path(d)/"a.mp4";f.write_bytes(b"fake")
            with patch.object(mod,"gate"), patch.object(mod,"probe"), patch.object(mod.sys.stdin,"isatty",return_value=False), patch.dict(os.environ,{"PUBLISH_ENABLED":"1"}), patch.object(sys,"argv",["script","video","--file",str(f),"--title","T","--execute"]):
                with self.assertRaisesRegex(RuntimeError,"interactive approval"):
                    mod.main()
    def test_no_execute_by_default(self):
        self.assertIn("dry-run",(ROOT/"scripts"/"publish-video.py").read_text())
        self.assertIn('PUBLISH_ENABLED', (ROOT/"scripts"/"publish-video.py").read_text())
if __name__=="__main__":unittest.main()
