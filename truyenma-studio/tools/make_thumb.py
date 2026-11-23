"""tools/make_thumb.py — render the YouTube thumbnail from a code-drawn shot: 1280×720 (16:9) by default,
or a 1080×1920 (9:16) Shorts cover with --vertical (or --project-aspect on a 9:16 project).

  python tools/make_thumb.py --project projects/my-ghost-story [--shot thumb] [--style amhon] [--variants 3] [--vertical | --project-aspect]

1. Write scenes/shots/thumb.js in the video project with registerShot('thumb', {...}) (and optionally 'thumb2', 'thumb3'):
   one face/entity, one glowing anomaly, 2–4 words of huge outlined text from horror.thumbText(). Use V(h, v) for values
   that differ between the 16:9 thumbnail and the 9:16 Shorts cover. Parameter `info.variant` (1..N) lets one module draw A/B variants.
2. Run this tool. It builds projects/<slug>/thumb/ (config + one-shot story, scenes linked to the video's scenes) and calls
   render.mjs --stills, then writes out/thumbnail_<n>.png and a JPEG under 2 MB (YouTube's limit) next to it.
"""
import argparse, json, os, shutil, subprocess, sys

ap = argparse.ArgumentParser(); ap.add_argument("--project", required=True); ap.add_argument("--shot", default="thumb")
ap.add_argument("--style"); ap.add_argument("--variants", type=int, default=1); ap.add_argument("--chrome")
ap.add_argument("--vertical", action="store_true", help="render a 1080x1920 (9:16) Shorts cover")
ap.add_argument("--project-aspect", action="store_true", help="follow the project's config aspect (9:16 -> vertical cover)"); a = ap.parse_args()
P = os.path.abspath(a.project); cfg = json.load(open(os.path.join(P, "config.json"), encoding="utf-8"))
T = os.path.join(P, "thumb"); os.makedirs(os.path.join(T, "story"), exist_ok=True); os.makedirs(os.path.join(P, "out"), exist_ok=True)
link = os.path.join(T, "scenes")
if not os.path.exists(link):
    try: os.symlink(os.path.join(P, "scenes"), link, target_is_directory=True)
    except OSError: shutil.copytree(os.path.join(P, "scenes"), link)        # Windows without symlink rights
else:
    if not os.path.islink(link): shutil.rmtree(link); shutil.copytree(os.path.join(P, "scenes"), link)
assets_src = os.path.join(P, "assets"); assets_dst = os.path.join(T, "assets")
if os.path.isdir(assets_src):
    if not os.path.exists(assets_dst):
        try: os.symlink(assets_src, assets_dst, target_is_directory=True)
        except OSError: shutil.copytree(assets_src, assets_dst)
    elif not os.path.islink(assets_dst):
        shutil.rmtree(assets_dst); shutil.copytree(assets_src, assets_dst)
vertical = a.vertical or (a.project_aspect and cfg.get("aspect") == "9:16")
tcfg = {**cfg, "aspect": "9:16" if vertical else "16:9", "resolution": "1080p" if vertical else "720p", "voiceover": None, "captions": False, "fadeIn": 0, "fadeOut": 0, "bars": "none", "duration": float(a.variants), "style": a.style or cfg.get("style", "amhon")}
json.dump(tcfg, open(os.path.join(T, "config.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
shots = [{"id": a.shot if i == 0 else f"{a.shot}{i + 1}", "start": float(i), "end": float(i + 1), "line": "", "scene": "thumbnail", "params": {"variant": i + 1},
          "vignette": True, "captions": False} for i in range(a.variants)]
json.dump({"title": cfg.get("title", ""), "duration": float(a.variants), "shots": shots}, open(os.path.join(T, "story", "shots.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cmd = ["node", os.path.join(root, "render.mjs"), "--project", T, "--stills", ",".join(f"{i + 0.5}" for i in range(a.variants))] + (["--chrome", a.chrome] if a.chrome else [])
r = subprocess.run(cmd, cwd=root)
if r.returncode: sys.exit("render failed — check thumb.js for errors (they are drawn in red on the frame)")
st = os.path.join(T, "build", "stills")
for i in range(a.variants):
    src = next((os.path.join(st, f) for f in os.listdir(st) if f.endswith(f"_{i + 0.5:.2f}.png")), None)
    if not src: print("missing still for variant", i + 1); continue
    png = os.path.join(P, "out", f"thumbnail_{i + 1}.png"); jpg = png[:-4] + ".jpg"; shutil.copy2(src, png)
    for q in (2, 4, 6, 9):
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", png, "-q:v", str(q), jpg], check=True)
        if os.path.getsize(jpg) < 2_000_000: break
    print(f"thumbnail {i + 1}: {png}  ({os.path.getsize(jpg) // 1024} KB jpg)")
