"""tools/parse_script.py — import a user's TIMESTAMPED script (SRT, VTT, JSON or TXT).

  python tools/parse_script.py --project projects/my-video --script input/script.srt

Accepted:
  .srt / .vtt          standard subtitle cues
  .json                [{start,end,text}] | {segments:[...]} | {words:[{word,start,end}]}  (seconds or "mm:ss.xx")
  .txt / .md           one line per cue, any of:
                         [00:12.5] text        (00:12) text        00:00:12,500 --> 00:00:15,000 text
                         0:12 - 0:15 text      12.5-15.0: text     [00:12 - 00:15] text
                       lines without a timestamp are appended to the previous cue.
Word timings inside a cue are spread proportionally to word length (good enough for cutting & captions;
run tools/transcribe.py with --script instead if you need exact word timing).
"""
import argparse, json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import load_json, probe_duration, sentences_from_words, write_timeline

TS = r"(?:(\d+):)?(\d{1,2}):(\d{2}(?:[.,]\d+)?)|(\d+(?:\.\d+)?)"


def to_sec(m):
    if isinstance(m, (int, float)):
        return float(m)
    s = str(m).strip().replace(",", ".")
    parts = s.split(":")
    v = 0.0
    for p in parts:
        v = v * 60 + float(p)
    return v


def parse_srt_vtt(txt):
    cues = []
    for block in re.split(r"\n\s*\n", txt.replace("\r", "")):
        m = re.search(r"([\d:.,]+)\s*-->\s*([\d:.,]+)", block)
        if not m:
            continue
        body = block[m.end():].strip()
        body = re.sub(r"<[^>]+>", "", body).replace("\n", " ").strip()
        if body:
            cues.append({"start": to_sec(m.group(1)), "end": to_sec(m.group(2)), "text": body})
    return cues


def parse_txt(txt):
    cues = []
    rx = re.compile(r"^\s*[\[(]?\s*(?P<a>(?:\d+:)?\d{1,2}:\d{2}(?:[.,]\d+)?|\d+(?:\.\d+)?)\s*[\])]?\s*"
                    r"(?:(?:-->|–|-|to)\s*[\[(]?\s*(?P<b>(?:\d+:)?\d{1,2}:\d{2}(?:[.,]\d+)?|\d+(?:\.\d+)?)\s*[\])]?)?\s*[:\-–]?\s*(?P<t>.*)$")
    for line in txt.replace("\r", "").split("\n"):
        if not line.strip():
            continue
        m = rx.match(line)
        if m and (":" in m.group("a") or m.group("b") or line.strip().startswith(("[", "("))):
            cues.append({"start": to_sec(m.group("a")), "end": to_sec(m.group("b")) if m.group("b") else None, "text": m.group("t").strip()})
        elif cues:
            cues[-1]["text"] += " " + line.strip()
    return cues


def spread_words(cues, total):
    words = []
    for i, c in enumerate(cues):
        end = c.get("end") or (cues[i + 1]["start"] if i + 1 < len(cues) else total)
        toks = c["text"].split()
        if not toks:
            continue
        span = max(0.1, end - c["start"])
        weights = [len(t) + 2 for t in toks]
        acc = c["start"]
        for t, w in zip(toks, weights):
            d = span * w / sum(weights)
            words.append({"word": t, "start": round(acc, 3), "end": round(acc + d * 0.92, 3)})
            acc += d
    return words


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--project", required=True)
    ap.add_argument("--script", required=True)
    a = ap.parse_args()
    cfg = load_json(os.path.join(a.project, "config.json"))
    total = probe_duration(os.path.join(a.project, cfg["voiceover"])) if cfg.get("voiceover") else None
    path = a.script
    txt = open(path, encoding="utf-8-sig").read()
    ext = os.path.splitext(path)[1].lower()
    words = None
    if ext in (".srt", ".vtt"):
        cues = parse_srt_vtt(txt)
    elif ext == ".json":
        d = json.loads(txt)
        if isinstance(d, dict) and "words" in d:
            words = [{"word": w.get("word") or w.get("text"), "start": to_sec(w["start"]), "end": to_sec(w["end"])} for w in d["words"]]
            cues = []
        else:
            seg = d.get("segments", d) if isinstance(d, dict) else d
            cues = [{"start": to_sec(s["start"]), "end": to_sec(s["end"]) if s.get("end") is not None else None, "text": s.get("text", "").strip()} for s in seg]
    else:
        cues = parse_txt(txt)
    if words is None:
        if not cues:
            sys.exit("No timestamps found. Use tools/transcribe.py --script <file> to time a plain script from the voiceover.")
        cues.sort(key=lambda c: c["start"])
        words = spread_words(cues, total or (cues[-1]["start"] + 4))
        sentences = [{"i": i, "start": round(c["start"], 3), "end": round(c.get("end") or (cues[i + 1]["start"] if i + 1 < len(cues) else (total or c["start"] + 4)), 3), "text": c["text"]} for i, c in enumerate(cues)]
    else:
        sentences = sentences_from_words(words)
    if total and words[-1]["end"] > total + 1:
        print(f"WARNING: script runs to {words[-1]['end']:.1f}s but the voiceover is {total:.1f}s — check the timestamps match this audio.")
    write_timeline(os.path.join(a.project, "timeline"), words, sentences, f"script:{os.path.basename(path)}")


if __name__ == "__main__":
    main()
