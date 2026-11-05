import importlib.util, tempfile, unittest, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('writer',ROOT/'scripts/silent_factory_drive_writer.py')
w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)

class FakeRequest:
    def __init__(self,val): self.val=val
    def execute(self): return self.val
class FakeUpload:
    def __init__(self,val):self.val=val;self.calls=0
    def next_chunk(self):self.calls+=1;return None,self.val
class FakeFiles:
    def __init__(self):self.records={};self.creates=0;self.requests=[]
    def list(self,**k):
        self.requests.append(('list',k));return FakeRequest({'files':[dict(x) for x in self.records.values() if x['name']==('main.mp4' if "main.mp4" in k['q'] else 'thumb.jpg')]})
    def create(self,**k):
        self.requests.append(('create',k));self.creates+=1
        item=dict(id=str(self.creates),name=k['body']['name'],mimeType=k['body']['mimeType'],size=str(k['media_body']['size']),appProperties=k['body']['appProperties'],parents=k['body']['parents'])
        self.records[item['id']]=item
        return FakeUpload(item)
    def get(self,**k):return FakeRequest(self.records[k['fileId']])
class FakeDrive:
    def __init__(self):self.f=FakeFiles();self.payloads={}
    def files(self):return self.f

def mock_media(path,mimetype,resumable,chunksize): return {'path':str(path),'size':path.stat().st_size,'mime':mimetype}

class WriterTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.video=Path(self.tmp.name)/'main.mp4';self.video.write_bytes(b'\0\0\0\x18ftypisom'+b'A'*500)
        self.thumb=Path(self.tmp.name)/'thumb.jpg';self.thumb.write_bytes(b'\xff\xd8\xff'+b'B'*50)
        self.sha=hashlib.sha256(self.video.read_bytes()).hexdigest();self.d=FakeDrive()
    def upload(self,**kwargs):
        return w.upload_verified_media(self.video,self.thumb,'1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D',self.sha,
            drive=self.d,media_factory=mock_media,download_bytes=lambda fid:self.video.read_bytes() if fid=='1' else self.thumb.read_bytes(),**kwargs)
    def test_no_write_grant_blocked(self):
        with self.assertRaisesRegex(w.DriveWriteBlocked,'credential'):
            w.build_drive_client({'DRIVE_REFRESH_TOKEN':'read-only'})
    def test_sha_mismatch_blocks_before_upload(self):
        with self.assertRaisesRegex(w.DriveWriteBlocked,'SHA'):
            w.upload_verified_media(self.video,self.thumb,'1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D','e'*64,drive=self.d,media_factory=mock_media,download_bytes=lambda fid:b'')
        self.assertEqual(self.d.f.creates,0)
    def test_upload_and_readback(self):
        result=self.upload()
        self.assertEqual(result['video_drive_id'],'1');self.assertEqual(result['thumbnail_drive_id'],'2')
        self.assertEqual(result['verified_sha256'],self.sha)
        self.assertEqual(result['mime_type'],'video/mp4')
    def test_same_sha_is_not_uploaded_twice(self):
        self.upload()
        result=self.upload()
        self.assertEqual(self.d.f.creates,2)
        self.assertEqual(result['video_drive_id'],'1')
    def test_drive_readback_hash_mismatch_blocks(self):
        with self.assertRaisesRegex(w.DriveWriteBlocked,'readback'):
            w.upload_verified_media(self.video,self.thumb,'1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D',self.sha,drive=self.d,media_factory=mock_media,download_bytes=lambda fid:b'corrupt')
    def test_429_retry_and_403_failure(self):
        attempts={'n':0}
        class E(Exception):
            def __init__(self,s):self.resp=type('r',(),{'status':s})()
        def flaky():
            attempts['n']+=1
            if attempts['n']<3:raise E(429)
            return 'ok'
        self.assertEqual(w.retry_drive(flaky,sleeper=lambda n:None),'ok')
        self.assertEqual(attempts['n'],3)
        with self.assertRaisesRegex(w.DriveWriteBlocked,'scope'):
            w.retry_drive(lambda:(_ for _ in ()).throw(E(403)),sleeper=lambda n:None)
    def test_zip_cannot_be_used_as_mp4(self):
        self.video.write_bytes(b'PK\x03\x04fake zip')
        with self.assertRaisesRegex(w.DriveWriteBlocked,'MP4'):
            self.upload()

if __name__=='__main__':unittest.main()