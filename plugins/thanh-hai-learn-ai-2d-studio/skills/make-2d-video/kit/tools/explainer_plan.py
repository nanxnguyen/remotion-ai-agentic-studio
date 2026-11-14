"""tools/explainer_plan.py — build story/shots.json for a mascot-host explainer ("What it's like to…", "Every way you can…",
"A journey through…", countdowns) from a round list.

  python tools/explainer_plan.py --project projects/my-ep [--rounds projects/my-ep/story/rounds.json] [--force]

rounds.json:
  { "title": "...", "lang": "vi", "format": "what-its-like" | "every-way" | "journey" | "countdown",
    "cold_open": {"dur": 3}, "title_card": {"dur": 2.5}, "recap": {"dur": 6}, "cta": {"dur": 4},
    "rounds": [ { "name": "Nhện góa phụ đen", "cue": "nhện", "weight": 1,
                  "stats": [ {"label": "Nguy hiểm", "v": 0.9, "text": "9/10"} ], "gag": "...", "scene": "..." }, ... ] }

Layout: cold open (the mascot already mid-disaster, ≥ 3 s) → title card → per round: "#n NAME" card (1.6 s), stat card
(3.5 s), then "experience" shots ≤ 6.5 s each with rotating framing, the round's gag on its last shot → recap → CTA.
With a voiceover (timeline/words.json) a round's `cue` word moves the round start to 0.15 s before it is spoken.
Shot params: {cold} {title} {round, roundTitle, n, name} {round, card, stats} {round, beat} {recap} {cta}.
Then: tools/shot_lint.py, write the scenes (skills/mascot-explainer).
"""
import argparse, json, os, re, sys, unicodedata

SIZES = ["wide", "medium", "close", "insert", "medium", "ots"]

def _norm(w):
    return re.sub(r"[^\w']", "", unicodedata.normalize("NFC", w.lower()))

def _cue(words, cue, after):
    c = _norm(cue)
    for w in words:
        if w["start"] >= after - 0.05 and _norm(w["word"]).startswith(c):
            return w["start"]
    return None

def plan(spec, total, words=None):
    R = spec["rounds"]
    if not R:
        raise ValueError("need at least one round")
    cold = max(3.0, float(spec.get("cold_open", {}).get("dur", 3.0)))
    tit = float(spec.get("title_card", {}).get("dur", 2.5))
    recap = float(spec.get("recap", {}).get("dur", 6))
    cta = float(spec.get("cta", {}).get("dur", 4))
    body0, body1 = cold + tit, total - recap - cta
    if body1 - body0 < 7.5 * len(R):
        raise ValueError(f"{total:.1f} s is too short for {len(R)} rounds (need ≥ {cold + tit + recap + cta + 7.5 * len(R):.1f} s)")
    wsum = sum(float(r.get("weight", 1)) for r in R)
    starts, t = [], body0
    for r in R:
        starts.append(t); t += (body1 - body0) * float(r.get("weight", 1)) / wsum
    if words:
        for i, r in enumerate(R):
            if r.get("cue"):
                ct = _cue(words, r["cue"], (starts[i - 1] + 7.5) if i else body0)
                if ct is not None:
                    starts[i] = round(ct - 0.15, 3)
    bounds = starts + [body1]
    bounds[0] = max(bounds[0], body0)
    for i in range(1, len(bounds)):
        bounds[i] = max(bounds[i], bounds[i - 1] + 7.5)
    if bounds[-1] > total - recap - cta + 1e-6:
        raise ValueError("cue words leave no room for the recap and CTA")
    r3 = lambda x: round(x, 3)
    shots = [{"id": "c00", "start": 0, "end": r3(cold), "size": "close", "line": "", "params": {"cold": True},
              "scene": "COLD OPEN: the mascot is already in the worst moment of the episode (mid-bite, mid-fall), then freeze",
              "in": {"type": "cut"}, "sfx": [{"at": 0.0, "name": "stinger", "gain": -8}], "notes": "beat: hook"},
             {"id": "t00", "start": r3(cold), "end": r3(body0), "size": "title", "line": "", "params": {"title": True},
              "scene": f"Title card: {spec.get('title', '')} — the mascot pops in with a reaction", "in": {"type": "flash", "dur": 0.25},
              "sfx": [{"at": 0.0, "name": "whoosh", "gain": -8}], "notes": ""}]
    k = 0
    for i, r in enumerate(R):
        a, b = bounds[i], bounds[i + 1]
        tt = 1.6; card = 3.5
        shots.append({"id": f"r{i + 1:02d}a", "start": r3(a), "end": r3(a + tt), "size": "title", "line": "",
                      "params": {"round": i, "roundTitle": True, "n": (len(R) - i) if spec.get("format") == "countdown" else i + 1, "name": r["name"]},
                      "scene": f"Round card: #{i + 1} {r['name']}", "in": {"type": "whip", "dur": 0.3, "dir": 1},
                      "sfx": [{"at": 0.0, "name": "whoosh", "gain": -8}, {"at": 0.12, "name": "impact", "gain": -8}], "notes": ""})
        shots.append({"id": f"r{i + 1:02d}b", "start": r3(a + tt), "end": r3(a + tt + card), "size": "data", "line": "",
                      "params": {"round": i, "card": True, "name": r["name"], "stats": r.get("stats", [])},
                      "scene": f"Stat card for {r['name']} beside the creature, mascot reacting", "in": {"type": "cut"},
                      "sfx": [{"at": 0.35 + 0.18 * j, "name": "blip", "gain": -14} for j in range(len(r.get("stats", [])))], "notes": ""})
        rest = b - (a + tt + card); n = max(1, -(-rest // 6.5)); seg = rest / n
        for j in range(int(n)):
            last = j == n - 1
            shots.append({"id": f"r{i + 1:02d}{chr(99 + j)}", "start": r3(a + tt + card + j * seg), "end": r3(a + tt + card + (j + 1) * seg),
                          "size": SIZES[k % len(SIZES)], "line": "", "params": {"round": i, "beat": j},
                          "scene": (r.get("scene") if j == 0 else None) or f"{r['name']}: the mascot experiences it (beat {j + 1})",
                          "in": {"type": "cut"}, "sfx": [], "notes": (f"gag: {r['gag']}" if last and r.get("gag") else "")})
            k += 1
    shots.append({"id": "z90", "start": r3(body1), "end": r3(total - cta), "size": "data", "line": "", "params": {"recap": True},
                  "scene": "RECAP: every round as a ranked row of mini cards, the winner glows", "in": {"type": "dip", "dur": 0.4}, "sfx": [], "notes": ""})
    shots.append({"id": "z99", "start": r3(total - cta), "end": r3(total), "size": "end", "line": "", "params": {"cta": True},
                  "scene": "CTA: the mascot (bandaged) asks the comment question; next-episode teaser", "in": {"type": "cut"},
                  "sfx": [{"at": 0.1, "name": "pop", "gain": -10}], "notes": ""})
    last = bounds[len(R) - 1]
    music = [{"start": 0, "end": r3(cold), "mood": "tension", "intensity": 0.6},
             {"start": r3(cold), "end": r3(last), "mood": "playful", "intensity": 0.55},
             {"start": r3(last), "end": r3(body1), "mood": "action", "intensity": 0.75},
             {"start": r3(body1), "end": r3(total), "mood": "triumph", "intensity": 0.6}]
    return {"title": spec.get("title", ""), "duration": r3(total), "format": spec.get("format", "what-its-like"), "shots": shots, "music": music}

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project", required=True); ap.add_argument("--rounds"); ap.add_argument("--force", action="store_true")
    a = ap.parse_args(); P = a.project
    spec = json.load(open(a.rounds or os.path.join(P, "story", "rounds.json"), encoding="utf-8"))
    cfg = json.load(open(os.path.join(P, "config.json"), encoding="utf-8"))
    words = None; wp = os.path.join(P, "timeline", "words.json")
    if os.path.exists(wp):
        w = json.load(open(wp, encoding="utf-8")); words = w.get("words", w) if isinstance(w, dict) else w
    total = float(cfg["duration"]) + (1.5 if cfg.get("voiceover") else 0)
    out = os.path.join(P, "story", "shots.json")
    if os.path.exists(out) and not a.force:
        sys.exit(f"{out} exists — add --force to overwrite")
    story = plan(spec, total, words)
    json.dump(story, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"explainer_plan: cold open + title + {len(spec['rounds'])} rounds + recap + CTA = {len(story['shots'])} shots, {story['duration']} s -> {out}")

if __name__ == "__main__":
    main()
