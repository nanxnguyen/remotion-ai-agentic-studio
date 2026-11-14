"""tools/beats.py — turn the timeline into a beat sheet + a draft shots.json skeleton.

  python tools/beats.py --project projects/my-video [--target 3.0] [--max 6.5] [--min 1.2] [--lead 0.15]

A beat is a phrase that should get its own picture. Long sentences are split at commas / conjunctions,
very short fragments are merged. Each beat becomes one draft shot (start = first word - lead).
The AI then edits story/shots.json: names scenes, splits action beats into several quick shots,
merges dialogue beats into longer holds, adds transitions, bars, sfx and music cues.
"""
import argparse, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import load_json, save_json, ts

ap = argparse.ArgumentParser()
ap.add_argument("--project", required=True)
ap.add_argument("--target", type=float, default=3.0)
ap.add_argument("--max", type=float, default=6.5)
ap.add_argument("--min", type=float, default=1.2)
ap.add_argument("--lead", type=float, default=0.15)
ap.add_argument("--tail", type=float, default=1.5, help="seconds of picture after the last word")
ap.add_argument("--force", action="store_true", help="overwrite an existing story/shots.json")
a = ap.parse_args()
cfg = load_json(os.path.join(a.project, "config.json"))
words = load_json(os.path.join(a.project, "timeline", "words.json"))["words"]
total = max(cfg.get("duration") or 0, words[-1]["end"]) + 0.0
end_all = max(total, words[-1]["end"] + a.tail)

# 1) split into phrases at strong punctuation, then at commas/conjunctions if too long
phr, cur = [], []
for i, w in enumerate(words):
    cur.append(w)
    nxt = words[i + 1] if i + 1 < len(words) else None
    gap = nxt["start"] - w["end"] if nxt else 9
    strong = re.search(r"[.?!…:;]['\"”’)]*$", w["word"]) or gap > 0.7
    if strong or not nxt:
        phr.append(cur); cur = []
def dur(p): return p[-1]["end"] - p[0]["start"]
out = []
for p in phr:
    if dur(p) <= a.max:
        out.append(p); continue
    # split at commas / conjunctions closest to the middle, recursively
    stack = [p]
    while stack:
        q = stack.pop(0)
        if dur(q) <= a.max or len(q) < 4:
            out.append(q); continue
        cands = [k for k in range(2, len(q) - 1) if re.search(r"[,–—]$", q[k - 1]["word"]) or q[k]["word"].lower() in ("and", "but", "then", "so", "because", "while", "when", "until", "which")]
        mid = q[0]["start"] + dur(q) / 2
        k = min(cands, key=lambda k: abs(q[k]["start"] - mid)) if cands else min(range(2, len(q) - 1), key=lambda k: abs(q[k]["start"] - mid))
        stack[:0] = [q[:k], q[k:]]
# 2) merge too-short fragments into the previous beat
beats = []
for p in out:
    if beats and dur(p) < a.min and dur(beats[-1]) + dur(p) < a.max:
        beats[-1] = beats[-1] + p
    else:
        beats.append(p)
# 3) build beats + draft shots (contiguous, no gaps)
B = []
for i, p in enumerate(beats):
    start = 0.0 if i == 0 else max(0.0, p[0]["start"] - a.lead)
    B.append({"i": i, "start": round(start, 3), "speechStart": p[0]["start"], "speechEnd": p[-1]["end"], "text": " ".join(w["word"] for w in p)})
for i, b in enumerate(B):
    b["end"] = round(B[i + 1]["start"] if i + 1 < len(B) else end_all, 3)
save_json(os.path.join(a.project, "timeline", "beats.json"), B)
shots_path = os.path.join(a.project, "story", "shots.json")
if os.path.exists(shots_path) and not a.force:
    print(f"{shots_path} exists — not overwritten (use --force).")
else:
    shots = [{"id": f"s{i + 1:03d}", "start": b["start"], "end": b["end"], "line": b["text"], "scene": "TODO", "set": None,
              "bars": None, "in": {"type": "cut"}, "sfx": [], "notes": ""} for i, b in enumerate(B)]
    save_json(shots_path, {"title": cfg.get("title"), "duration": round(end_all, 3), "shots": shots, "music": []})
    print(f"wrote draft {shots_path}")
ds = [b["end"] - b["start"] for b in B]
print(f"{len(B)} beats  |  avg {sum(ds) / len(ds):.2f}s  min {min(ds):.2f}s  max {max(ds):.2f}s  |  video length {ts(end_all)}")
for b in B[:12]:
    print(f"  [{ts(b['start'])}-{ts(b['end'])}] {b['text'][:80]}")
