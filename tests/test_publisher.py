"""Publisher behavior tests that require no credentials or network."""
import hashlib, importlib.util, json, os, pathlib, sqlite3, subprocess, sys, tempfile, threading, unittest
from unittest.mock import patch
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
        with tempfile.TemporaryDirectory() as d:
            f=pathlib.Path(d)/"a.mp4";f.write_bytes(b"fake")
            with patch.object(mod,"gate"), patch.object(mod,"probe"), patch.object(mod,"require_reviewed_file",return_value=b"fake"), patch.object(mod.sys.stdin,"isatty",return_value=False), patch.dict(os.environ,{"PUBLISH_ENABLED":"1"}), patch.object(sys,"argv",["script","video","--file",str(f),"--title","T","--execute"]):
                with self.assertRaisesRegex(RuntimeError,"interactive approval"):
                    mod.main()

    def test_reviewed_file_rejects_a_different_mp4(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); docs=root/"docs"/"video"; out=root/"out"
            docs.mkdir(parents=True);out.mkdir()
            canonical=out/"video-voice-reel.mp4";canonical.write_bytes(b"approved")
            other=out/"other.mp4";other.write_bytes(b"different")
            status={"paths":{"out":"video-voice"},"render_check":{"fingerprint":f"{canonical.stat().st_size}:{canonical.stat().st_mtime_ns}"}}
            (docs/"status.json").write_text(json.dumps(status))
            with patch.object(mod,"ROOT",root):
                with self.assertRaisesRegex(RuntimeError,"reviewed final MP4"):
                    mod.require_reviewed_file("video",other)

    def test_reviewed_file_rejects_changed_bytes_with_same_size_and_timestamp(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); docs=root/"docs"/"video"; out=root/"out"
            docs.mkdir(parents=True);out.mkdir()
            video=out/"video-voice-reel.mp4";video.write_bytes(b"approved")
            stamp=video.stat().st_mtime_ns;sha=hashlib.sha256(b"approved").hexdigest()
            status={"paths":{"out":"video-voice"},"render_check":{"fingerprint":f"8:{stamp}","sha256":sha},"reviews":{"C":[{"render_sha256":sha}]}}
            (docs/"status.json").write_text(json.dumps(status))
            video.write_bytes(b"tampered");os.utime(video,ns=(stamp,stamp))
            with patch.object(mod,"ROOT",root):
                with self.assertRaisesRegex(RuntimeError,"SHA-256"):
                    mod.require_reviewed_file("video",video)

    def test_gate_checks_gate_c_without_requiring_delivery_retro(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); scripts=root/"scripts"; out=root/"out"
            scripts.mkdir();out.mkdir()
            (scripts/"pipeline.py").write_text(
                "import json,pathlib,sys\npathlib.Path('out/gate-args.json').write_text(json.dumps(sys.argv[1:]))\n"
            )
            with patch.object(mod,"ROOT",root):
                mod.gate("video")
            self.assertEqual(json.loads((out/"gate-args.json").read_text()),["gate","video","C"])

    def test_atomic_claim_allows_only_one_worker(self):
        with tempfile.TemporaryDirectory() as d:
            db_path=pathlib.Path(d)/"publishing.sqlite3";results=[]
            def worker():
                conn=sqlite3.connect(db_path,timeout=5)
                try:
                    mod.init(conn);results.append(mod.claim(conn,"key","video","youtube","sha"))
                finally:
                    conn.close()
            threads=[threading.Thread(target=worker) for _ in range(2)]
            for thread in threads:thread.start()
            for thread in threads:thread.join()
            self.assertEqual(sorted(results),[False,True])

    def test_auto_draft_runs_without_tty_when_explicitly_enabled(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); docs=root/"docs"/"video"; out=root/"out"
            docs.mkdir(parents=True);out.mkdir()
            video=out/"video-voice-reel.mp4";video.write_bytes(b"approved")
            sha=hashlib.sha256(b"approved").hexdigest()
            status={"paths":{"out":"video-voice"},"render_check":{"fingerprint":f"{video.stat().st_size}:{video.stat().st_mtime_ns}","sha256":sha},"reviews":{"C":[{"render_sha256":sha}]}}
            (docs/"status.json").write_text(json.dumps(status))
            db=root/"publishing.sqlite3"
            env={"PUBLISH_ENABLED":"1","PUBLISH_AUTO_DRAFT":"1","YOUTUBE_CLIENT_ID":"id","YOUTUBE_CLIENT_SECRET":"secret","YOUTUBE_REFRESH_TOKEN":"refresh","FACEBOOK_PAGE_ID":"page","FACEBOOK_PAGE_ACCESS_TOKEN":"token"}
            argv=["script","video","--file",str(video),"--title","Title","--execute","--auto-draft"]
            with patch.object(mod,"ROOT",root),patch.object(mod,"DB",db),patch.object(mod,"gate"),patch.object(mod,"probe"),patch.object(mod,"youtube",return_value="yt-1"),patch.object(mod,"facebook",return_value="fb-1"),patch.object(mod.sys.stdin,"isatty",return_value=False),patch.dict(os.environ,env,clear=True),patch.object(sys,"argv",argv):
                mod.main()
            conn=sqlite3.connect(db)
            try:
                self.assertEqual(conn.execute("SELECT platform,status,remote_id FROM uploads ORDER BY platform").fetchall(),[("facebook","draft","fb-1"),("youtube","private","yt-1")])
            finally:
                conn.close()

    def test_both_platforms_are_attempted_when_youtube_fails(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); docs=root/"docs"/"video"; out=root/"out"
            docs.mkdir(parents=True);out.mkdir()
            video=out/"video-voice-reel.mp4";video.write_bytes(b"approved")
            sha=hashlib.sha256(b"approved").hexdigest();stamp=f"{video.stat().st_size}:{video.stat().st_mtime_ns}"
            status={"paths":{"out":"video-voice"},"render_check":{"fingerprint":stamp,"sha256":sha},"reviews":{"C":[{"render_sha256":sha}]}}
            (docs/"status.json").write_text(json.dumps(status));db=root/"publishing.sqlite3"
            env={"PUBLISH_ENABLED":"1","PUBLISH_AUTO_DRAFT":"1","YOUTUBE_CLIENT_ID":"id","YOUTUBE_CLIENT_SECRET":"secret","YOUTUBE_REFRESH_TOKEN":"refresh","FACEBOOK_PAGE_ID":"page","FACEBOOK_PAGE_ACCESS_TOKEN":"token"}
            argv=["script","video","--file",str(video),"--title","Title","--execute","--auto-draft"]
            with patch.object(mod,"ROOT",root),patch.object(mod,"DB",db),patch.object(mod,"gate"),patch.object(mod,"probe"),patch.object(mod,"youtube",side_effect=RuntimeError("youtube failed")),patch.object(mod,"facebook",return_value="fb-1"),patch.dict(os.environ,env,clear=True),patch.object(sys,"argv",argv):
                with self.assertRaisesRegex(RuntimeError,"youtube"):
                    mod.main()
            conn=sqlite3.connect(db)
            try:
                self.assertEqual(conn.execute("SELECT platform,status FROM uploads ORDER BY platform").fetchall(),[("facebook","draft"),("youtube","needs_reconcile")])
            finally:
                conn.close()

    def test_upload_uses_the_validated_byte_snapshot(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); docs=root/"docs"/"video"; out=root/"out"
            docs.mkdir(parents=True);out.mkdir()
            video=out/"video-voice-reel.mp4";approved=b"approved";video.write_bytes(approved)
            sha=hashlib.sha256(approved).hexdigest();stamp=f"{video.stat().st_size}:{video.stat().st_mtime_ns}"
            status={"paths":{"out":"video-voice"},"render_check":{"fingerprint":stamp,"sha256":sha},"reviews":{"C":[{"render_sha256":sha}]}}
            (docs/"status.json").write_text(json.dumps(status));seen=[]
            def youtube(payload,*args):
                seen.append(payload);video.write_bytes(b"tampered");return "yt-1"
            def facebook(payload,*args):
                seen.append(payload);return "fb-1"
            env={"PUBLISH_ENABLED":"1","PUBLISH_AUTO_DRAFT":"1","YOUTUBE_CLIENT_ID":"id","YOUTUBE_CLIENT_SECRET":"secret","YOUTUBE_REFRESH_TOKEN":"refresh","FACEBOOK_PAGE_ID":"page","FACEBOOK_PAGE_ACCESS_TOKEN":"token"}
            argv=["script","video","--file",str(video),"--title","Title","--execute","--auto-draft"]
            with patch.object(mod,"ROOT",root),patch.object(mod,"DB",root/"publishing.sqlite3"),patch.object(mod,"gate"),patch.object(mod,"probe"),patch.object(mod,"youtube",side_effect=youtube),patch.object(mod,"facebook",side_effect=facebook),patch.dict(os.environ,env,clear=True),patch.object(sys,"argv",argv):
                mod.main()
            self.assertEqual(seen,[approved,approved])
    def test_no_execute_by_default(self):
        self.assertIn("dry-run",(ROOT/"scripts"/"publish-video.py").read_text())
        self.assertIn('PUBLISH_ENABLED', (ROOT/"scripts"/"publish-video.py").read_text())
if __name__=="__main__":unittest.main()
