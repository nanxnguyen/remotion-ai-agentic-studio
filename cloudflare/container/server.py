#!/usr/bin/env python3
"""Restricted CPU benchmark endpoint. Does not clone voice or publish media."""
import json, os, pathlib, subprocess, time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOT=pathlib.Path('/app')
def run(cmd, timeout=180):
    t=time.perf_counter()
    try:
        p=subprocess.run(cmd,cwd=ROOT,capture_output=True,text=True,timeout=timeout,env={**os.environ,'CHROME_BIN':'/usr/bin/chromium'})
        return {'ok':p.returncode==0,'exitCode':p.returncode,'seconds':round(time.perf_counter()-t,3),'stdoutTail':p.stdout[-1200:],'stderrTail':p.stderr[-1200:]}
    except Exception as e:
        return {'ok':False,'seconds':round(time.perf_counter()-t,3),'error':type(e).__name__+': '+str(e)[:150]}

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path!='/health':return self.respond(404,{'error':'not found'})
        return self.respond(200,{'ok':True,'gpu':False})
    def respond(self,status,body):
        data=json.dumps(body,ensure_ascii=False).encode()
        self.send_response(status);self.send_header('Content-Type','application/json');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
    def do_POST(self):
        if self.path!='/benchmark':return self.respond(404,{'error':'not found'})
        size=int(self.headers.get('Content-Length','0'))
        if not 0<size<4096:return self.respond(400,{'error':'invalid body'})
        try: arg=json.loads(self.rfile.read(size))
        except (ValueError,UnicodeDecodeError):return self.respond(400,{'error':'invalid json'})
        video=arg.get('videoId','')
        if not isinstance(video,str) or not video.replace('-','').isalnum() or len(video)>100:return self.respond(400,{'error':'invalid video ID'})
        # Do not execute unreviewed video PR source or invoke any network TTS provider.
        tts={'ok':False,'reason':'VieNeu-TTS model and authorized reference unavailable in image; NO CPU inference benchmark run'}
        # Deterministic test composition; measures actual Remotion render if installation supports Chromium.
        rendered=run(['./node_modules/.bin/remotion','render','src/index.ts','HelloWorld','/tmp/cloudflare-bench.mp4','--codec','h264','--concurrency','1'],timeout=180)
        if pathlib.Path('/tmp/cloudflare-bench.mp4').exists():
            probe=run(['ffprobe','-v','error','-show_entries','format=duration,size','-of','json','/tmp/cloudflare-bench.mp4'],timeout=15)
        else:probe={'ok':False,'reason':'render output missing'}
        return self.respond(200,{'videoId':video,'benchmarkKind':'CPU_CONTAINER_POC','timestamp':time.time(),'tts':tts,'remotion':rendered,'ffprobe':probe,'scope':'HelloWorld test composition only; NOT production storytelling reel'})

if __name__=='__main__':ThreadingHTTPServer(('0.0.0.0',8080),Handler).serve_forever()
