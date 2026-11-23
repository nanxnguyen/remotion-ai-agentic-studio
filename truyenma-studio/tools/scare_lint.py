"""tools/scare_lint.py — horror pacing check for story/shots.json (run after shot_lint.py).

  python tools/scare_lint.py --project projects/my-ghost-story [--strict]

Every shot may carry two horror fields:
  "beat": hook | promise | setup | dread | scare | reveal | breather | twist | cta | chapter
  "fear": 0..1 (how frightening the moment should feel; defaults come from the beat)

Errors (fix before building): no hook beat inside the first 3 s, no scare/reveal/twist anywhere, a scare shot with no hit SFX
(scare / stinger / impact / hit) and no "hush" before it, an ending with no twist/reveal in the last 25 %.
Warnings: a gap between scare-type beats longer than the format allows (Shorts 20 s, long-form 90 s), more than one scare
per 25 s (viewers go numb), no breather after a scare in long-form, fear curve not rising (last third must average higher
than the first third), no pattern interrupt around the 50 % mark in videos over 4 min, missing CTA beat in Shorts.
Writes story/scare_lint.json and prints an ASCII fear curve. Exit 1 on errors (or warnings with --strict).
"""
import argparse, json, os, sys

DEFAULT_FEAR = {"hook": 0.6, "promise": 0.35, "setup": 0.2, "dread": 0.5, "scare": 0.95, "reveal": 0.85, "breather": 0.15,
                "twist": 0.9, "cta": 0.3, "chapter": 0.3}
HITS = {"scare", "stinger", "impact", "hit", "reverse"}
PEAKS = {"scare", "reveal", "twist"}


def lint(story):
    S = story.get("shots", []); out = []
    add = lambda lvl, code, msg, sid=None: out.append({"level": lvl, "code": code, "shot": sid, "msg": msg})
    if not S:
        add("error", "empty", "no shots"); return out, []
    dur = story.get("duration") or S[-1]["end"]; short = dur <= 75
    fear = [float(s.get("fear", DEFAULT_FEAR.get(s.get("beat"), 0.3))) for s in S]
    beats = [s.get("beat") for s in S]
    if not any(b == "hook" and s["start"] < 3.0 for s, b in zip(S, beats)):
        add("error", "hook", "no shot with beat 'hook' starting in the first 3 s: open on the anomaly, not on context")
    peaks = [s for s in S if s.get("beat") in PEAKS]
    if not peaks:
        add("error", "no-peak", "no scare / reveal / twist beat in the whole video")
    if not any(s.get("beat") in {"twist", "reveal"} and s["start"] >= dur * 0.75 for s in S):
        add("error", "ending", "no twist or reveal in the last 25 %: the ending must pay off the hook")
    for i, s in enumerate(S):
        if s.get("beat") != "scare":
            continue
        names = {c.get("name") for c in s.get("sfx", [])} | {c.get("name") for c in (S[i - 1].get("sfx", []) if i else [])}
        hushed = bool(i and (S[i - 1].get("hush") or "hush" in S[i - 1].get("notes", "").lower()))
        if not (names & HITS) and not hushed:
            add("error", "scare-sfx", "scare beat without a hit SFX and without a hush before it (silence → hit is the scare)", s["id"])
        elif not hushed:
            add("warn", "no-hush", "add \"hush\": true on the shot before (duck music/ambience 0.4–0.8 s) so the hit lands", s["id"])
    gap_max = 20 if short else 90
    times = [0.0] + [s["start"] for s in peaks] + [dur]
    for a, b in zip(times, times[1:]):
        if b - a > gap_max:
            add("warn", "flat", f"{b - a:.0f} s between peak beats ({a:.0f}s → {b:.0f}s); allowed {gap_max} s — add a dread/reveal beat")
    sc = [s["start"] for s in S if s.get("beat") == "scare"]
    for a, b in zip(sc, sc[1:]):
        if b - a < 25 and not short:
            add("warn", "numb", f"two scares {b - a:.0f} s apart ({a:.0f}s, {b:.0f}s): space them ≥ 25 s or turn one into dread", None)
    if not short:
        for i, s in enumerate(S[:-1]):
            if s.get("beat") == "scare" and not any(x.get("beat") in {"breather", "setup", "chapter"} for x in S[i + 1:i + 6]):
                add("warn", "no-breather", "no breather within 5 shots after this scare: give the audience a release before the next climb", s["id"])
        if dur > 240 and not any(s.get("beat") in PEAKS | {"chapter"} and 0.42 * dur <= s["start"] <= 0.58 * dur for s in S):
            add("warn", "midpoint", "no pattern interrupt (reveal / twist / chapter) between 42 % and 58 % — the second biggest drop-off is here")
    else:
        if not any(s.get("beat") == "cta" for s in S[-3:]):
            add("warn", "cta", "Shorts: end with a 2–4 s story-specific CTA beat (question, 'part 2' tease, comment prompt)")
    n = len(S); third = max(1, n // 3)
    w = lambda lst, ss: sum(f * (x["end"] - x["start"]) for f, x in zip(lst, ss)) / max(1e-6, sum(x["end"] - x["start"] for x in ss))
    if w(fear[-third:], S[-third:]) <= w(fear[:third], S[:third]):
        add("warn", "curve", "fear curve does not rise: the last third should feel scarier than the first")
    return out, fear


def ascii_curve(S, fear, width=64):
    dur = S[-1]["end"]; cols = [0.0] * width
    for s, f in zip(S, fear):
        for c in range(int(s["start"] / dur * width), max(int(s["start"] / dur * width) + 1, int(s["end"] / dur * width))):
            if c < width: cols[c] = max(cols[c], f)
    rows = []
    for lvl in [0.9, 0.7, 0.5, 0.3, 0.1]:
        rows.append(f"{lvl:.1f} |" + "".join("█" if v >= lvl else " " for v in cols))
    rows.append("    +" + "-" * width + f" {dur:.0f}s")
    return "\n".join(rows)


if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--project", required=True); ap.add_argument("--strict", action="store_true"); a = ap.parse_args()
    p = os.path.join(a.project, "story", "shots.json"); story = json.load(open(p, encoding="utf-8"))
    res, fear = lint(story)
    json.dump(res, open(os.path.join(a.project, "story", "scare_lint.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    if fear: print(ascii_curve(story["shots"], fear))
    for r in res: print(f"{r['level'].upper():5s} {r['code']:11s} {r['shot'] or '':6s} {r['msg']}")
    errs = sum(r["level"] == "error" for r in res); warns = len(res) - errs
    print(f"scare_lint: {errs} error(s), {warns} warning(s)")
    sys.exit(1 if errs or (a.strict and warns) else 0)
