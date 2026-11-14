"""tools/new_project.py — create a project folder for one video.

  python tools/new_project.py --name my-video --voice "C:/path/voiceover.mp3" [--script path] \
  python tools/new_project.py --name my-short --duration 30 ...      # no voiceover: music + on-screen text only \
      --aspect 16:9|9:16 --resolution 720p|1080p|1440p|2160p [--style dusk] [--fps 24] [--lang vi|en|...] [--captions]
"""
import argparse, os, shutil, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import probe_duration, save_json

ap = argparse.ArgumentParser()
ap.add_argument("--name", required=True)
ap.add_argument("--voice", help="voiceover audio; omit for a music-only video (then --duration is required)")
ap.add_argument("--duration", type=float, help="video length in seconds when there is no voiceover")
ap.add_argument("--script")
ap.add_argument("--aspect", default="16:9", choices=["16:9", "9:16"])
ap.add_argument("--resolution", default="1080p", choices=["720p", "1080p", "1440p", "2160p", "4k"])
ap.add_argument("--style", default="dusk")
ap.add_argument("--fps", type=int, default=24)
ap.add_argument("--title", default="")
ap.add_argument("--lang", default="en", help="video language as ISO code: vi, en, ja, es, ... (asked first in intake)")
ap.add_argument("--captions", action="store_true", help="burn word-by-word captions (recommended for 9:16)")
a = ap.parse_args()
if not a.voice and not a.duration:
    ap.error("give --voice, or --duration for a music-only video")

root = os.path.join("projects", a.name)
for d in ["input", "timeline", "story", "scenes/sets", "scenes/shots", "build", "out", "audio"]:
    os.makedirs(os.path.join(root, d), exist_ok=True)
voice_dst = None
if a.voice:
    voice_dst = os.path.join("input", "voiceover" + os.path.splitext(a.voice)[1].lower())
    shutil.copy2(a.voice, os.path.join(root, voice_dst))
script_dst = None
if a.script:
    script_dst = os.path.join("input", "script" + os.path.splitext(a.script)[1].lower())
    shutil.copy2(a.script, os.path.join(root, script_dst))
dur = probe_duration(os.path.join(root, voice_dst)) if voice_dst else a.duration
cfg = {"title": a.title or a.name, "lang": a.lang, "aspect": a.aspect, "resolution": a.resolution, "fps": a.fps, "style": a.style,
       "voiceover": voice_dst.replace("\\", "/") if voice_dst else None, "script": script_dst.replace("\\", "/") if script_dst else None,
       "duration": round(dur, 3), "captions": bool(a.captions), "bars": None, "fadeIn": 0.5, "fadeOut": 0.8,
       "music": {"enabled": True, "gainDb": -17}, "sfx": {"enabled": True, "gainDb": -6}, "loudness": -14}
save_json(os.path.join(root, "config.json"), cfg)
print(f"created {root}  ({'voiceover' if voice_dst else 'music-only'} {dur:.1f}s, {a.aspect} {a.resolution} @ {a.fps}fps, style {a.style}, lang {a.lang})")
