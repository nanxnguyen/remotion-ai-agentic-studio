"""tools/evolution_plan.py — build story/shots.json for an "Evolution of X" video from a stage list.

  python tools/evolution_plan.py --project projects/my-evo [--stages projects/my-evo/story/stages.json] [--force]

stages.json:
  { "title": "Sự tiến hoá của ...", "lang": "vi", "kind": "life" | "species" | "object",
    "counter": "age" | "year" | "ago",                  # what the big rolling number shows
    "hook": { "dur": 2.4 }, "outro": { "dur": 3.2 },      # optional
    "stages": [ { "value": 0, "title": "Sơ sinh", "cue": "sinh", "weight": 1, "scene": "...", "notes": "..." }, ... ] }

Shot layout: a 2–3 s hook (the final stage first: "from THIS…"), one shot per stage (morph burst + flash on every change,
stage duration ∝ weight, ≥ 1.2 s), and a payoff/outro that lines up every stage and loops back to the first.
With a voiceover (timeline/words.json), a stage's `cue` word moves its start to 0.15 s before that word is spoken.
Every stage shot carries params {stage, value, title} for engine/evolve.js evoOverlay(). Also writes config.json
"evolution" = {kind, counter}. Then run tools/shot_lint.py and write the stage drawings (skills/evolution-video).
"""
import argparse, json, os, re, sys, unicodedata

MUSIC = {"life": ["mystery", "hopeful", "triumph"], "species": ["mystery", "wonder", "epic"], "object": ["playful", "hopeful", "triumph"]}
SIZES = ["medium", "wide", "medium", "close"]

def _norm(w):
    return re.sub(r"[^\w']", "", unicodedata.normalize("NFC", w.lower()))

def _cue_time(words, cue, after):
    c = _norm(cue)
    for w in words:
        if w["start"] >= after - 0.05 and _norm(w["word"]).startswith(c):
            return w["start"]
    return None

def plan(spec, total, words=None):
    stages = spec["stages"]
    if len(stages) < 2:
        raise ValueError("need at least 2 stages")
    kind, counter = spec.get("kind", "life"), spec.get("counter", "year")
    hook = min(3.0, float(spec.get("hook", {}).get("dur", 2.4)))
    outro = float(spec.get("outro", {}).get("dur", 3.2))
    body = total - hook - outro
    if body < 1.2 * len(stages):
        raise ValueError(f"{total:.1f} s is too short for {len(stages)} stages (need ≥ {hook + outro + 1.2 * len(stages):.1f} s)")
    wsum = sum(float(s.get("weight", 1)) for s in stages)
    starts, t = [], hook
    for s in stages:
        starts.append(t); t += body * float(s.get("weight", 1)) / wsum
    if words:  # pull stage starts onto their cue words, keeping order and the 1.2 s minimum
        for i, s in enumerate(stages):
            if i and s.get("cue"):
                ct = _cue_time(words, s["cue"], starts[i - 1] + 1.2)
                if ct is not None:
                    starts[i] = round(ct - 0.15, 3)
    bounds = starts + [hook + body]
    for i in range(1, len(bounds)):
        bounds[i] = max(bounds[i], bounds[i - 1] + 1.2)
    if bounds[-1] > total - 1.0:
        raise ValueError("cue words leave no room for the outro; check the cues or the duration")
    r = lambda x: round(x, 3)
    shots = [{"id": "e00", "start": 0, "end": r(hook), "size": "close", "line": "", "params": {"hook": True},
              "scene": f"HOOK: the final stage ({stages[-1].get('title', '')}) hits first, then a hard cut back to the start: 'from THIS…'",
              "in": {"type": "cut"}, "sfx": [{"at": 0.0, "name": "stinger", "gain": -8}], "notes": "beat: hook"}]
    k = 0
    for i, s in enumerate(stages):
        d = bounds[i + 1] - bounds[i]; parts = max(1, -(-d // 6.5)) if d > 7 else 1   # a picture change at least every ~7 s
        for p in range(int(parts)):
            a0, a1 = bounds[i] + d * p / parts, bounds[i] + d * (p + 1) / parts
            params = {"stage": i, "value": s.get("value"), "title": s.get("title", ""), **({"label": s["label"]} if "label" in s else {}), **({"part": p} if p else {})}
            first = p == 0
            shots.append({"id": f"e{i + 1:02d}" + (chr(97 + p) if parts > 1 else ""), "start": r(a0), "end": r(a1), "size": s.get("size", SIZES[k % len(SIZES)]) if first else SIZES[k % len(SIZES)], "line": "",
                          "params": params,
                          "scene": s.get("scene", f"Stage {i + 1}: {s.get('title', '')} — the same subject, new look, new setting") if first else f"Stage {i + 1} continued: new angle / action, same look",
                          "in": ({"type": "cut"} if i == 0 else {"type": "flash", "dur": 0.25}) if first else {"type": "cut"},
                          "sfx": ([{"at": 0.0, "name": "whoosh", "gain": -10}, {"at": 0.05, "name": "pop", "gain": -14}] if i else [{"at": 0.0, "name": "pop", "gain": -12}]) if first else [],
                          "notes": s.get("notes", "") if first else ""})
            k += 1
    shots.append({"id": "e99", "start": r(bounds[-1]), "end": r(total), "size": "end", "line": "", "params": {"outro": True},
                  "scene": "PAYOFF: every stage lined up left→right (or top→bottom in 9:16) + a one-line question; last frame matches the first stage so the Short loops",
                  "in": {"type": "dip", "dur": 0.4}, "sfx": [{"at": 0.1, "name": "shimmer", "gain": -10}], "notes": ""})
    moods = MUSIC.get(kind, MUSIC["life"]); a, b = r(hook), r(hook + body * 0.6)
    music = [{"start": 0, "end": a, "mood": moods[0], "intensity": 0.5}, {"start": a, "end": b, "mood": moods[1], "intensity": 0.6},
             {"start": b, "end": r(total), "mood": moods[2], "intensity": 0.8}]
    return {"title": spec.get("title", ""), "duration": r(total), "evolution": {"kind": kind, "counter": counter}, "shots": shots, "music": music}

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project", required=True); ap.add_argument("--stages"); ap.add_argument("--force", action="store_true")
    a = ap.parse_args(); P = a.project
    spec = json.load(open(a.stages or os.path.join(P, "story", "stages.json"), encoding="utf-8"))
    cfg_path = os.path.join(P, "config.json"); cfg = json.load(open(cfg_path, encoding="utf-8"))
    words = None; wp = os.path.join(P, "timeline", "words.json")
    if os.path.exists(wp):
        w = json.load(open(wp, encoding="utf-8")); words = w.get("words", w) if isinstance(w, dict) else w
    total = float(cfg["duration"]) + (1.5 if cfg.get("voiceover") else 0)
    out = os.path.join(P, "story", "shots.json")
    if os.path.exists(out) and not a.force:
        sys.exit(f"{out} exists — add --force to overwrite")
    story = plan(spec, total, words)
    json.dump(story, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    cfg["evolution"] = story["evolution"]; cfg["duration"] = story["duration"] if not cfg.get("voiceover") else cfg["duration"]
    json.dump(cfg, open(cfg_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    n = len({s["params"]["stage"] for s in story["shots"] if "stage" in s["params"]})
    print(f"evolution_plan: hook + {n} stages + outro = {len(story['shots'])} shots, {story['duration']} s -> {out}")

if __name__ == "__main__":
    main()
