#!/usr/bin/env python3
"""Assemble the narration and the shot plan for "Cảm giác bị côn trùng đốt".

  python3 build_timeline.py --project <studio>/projects/cgbcd --clips <dir with s1.mp3.. + measured-timeline.json>
  python3 build_timeline.py --project ... --estimate          # silent draft timing at ~4.1 syllables/s

One Vbee clip per script key (voice/voice-lines.json). Pauses between keys are designed here (not punctuation),
then the clips are concatenated into input/voiceover.wav. Writes config.json, story/shots.json (params.keys = key timings relative
to each shot) and input/cues.json ([{start, end, text}] in display spelling) for tools/parse_script.py.
"""
import argparse, json, subprocess, wave
from pathlib import Path

HERE = Path(__file__).resolve().parent
SR = 48000

SHOTS = [  # shot id, keys, size, set (for the record), scene note
    ("c00", ["c00a", "c00b"], "close", "rainforest", "Cold open: swollen heel, CÁI ĐINH?!"),
    ("t00", ["t00a"], "title", "studio", "Title card, host intro"),
    ("t01", ["t00b"], "medium", "studio", "Re-hook: nail saved for the end"),
    ("t02", ["t00c"], "data", "studio", "Schmidt scale 1-4"),
    ("t03", ["t00d", "t00e"], "medium", "studio", "Science vs contract"),
    ("r01a", ["r01a"], "title", "meadow", "#1 fire ant"), ("r01b", ["r01b"], "data", "meadow", "Stat card"),
    ("r01c", ["r01c"], "wide", "meadow", "Steps onto the mound"), ("r01d", ["r01d"], "medium", "meadow", "Swarmed, tally 47"),
    ("r01e", ["r01e"], "medium", "meadow", "Counts as one"),
    ("r02a", ["r02a"], "title", "garden", "#2 honey bee"), ("r02b", ["r02b"], "data", "garden", "Anchor of the scale"),
    ("r02c", ["r02c"], "close", "garden", "Sting on the nose"), ("r02d", ["r02d", "r02e"], "insert", "garden", "Barbed stinger, bee dies"),
    ("r02f", ["r02f"], "close", "garden", "Swollen face, bee with halo"), ("r02g", ["r02g"], "medium", "studio", "Allergy warning"),
    ("r03a", ["r03a"], "title", "dryfield", "#3 harvester ant"), ("r03b", ["r03b"], "data", "dryfield", "Seed carriers"),
    ("r03c", ["r03c"], "medium", "dryfield", "Drill sting"), ("r03d", ["r03d", "r03e"], "medium", "dryfield", "8 hours, drill stuck"),
    ("r03f", ["r03f"], "medium", "dryfield", "Toothpick vs drill"), ("r03g", ["r03g"], "wide", "dryfield", "Bandaged toe"),
    ("r04a", ["r04a"], "title", "desert", "#4 tarantula hawk"), ("r04b", ["r04b"], "data", "desert", "Stat card, size"),
    ("r04c", ["r04c", "r04d"], "wide", "desert", "Drags the tarantula"), ("r04e", ["r04e", "r04f"], "medium", "desert", "Lie down and scream"),
    ("r04g", ["r04g"], "close", "desert", "ZAP"), ("r04h", ["r04h"], "medium", "desert", "Longest five minutes"),
    ("r05a", ["r05a"], "title", "rainforest", "#5 bullet ant"), ("r05b", ["r05b"], "data", "rainforest", "Stat card"),
    ("r05c", ["r05c"], "medium", "rainforest", "Sting + coals and nail insert"), ("r05d", ["r05d", "r05e"], "freeze", "rainforest", "Callback to the cold open"),
    ("r05f", ["r05f"], "data", "studio", "5 min vs 24 h"), ("r05g", ["r05g"], "blueprint", "studio", "Poneratoxin switch"),
    ("r05h", ["r05h", "r05i"], "medium", "studio", "No OFF switch"), ("r05j", ["r05j", "r05k"], "medium", "rainforest", "Timelapse, Bé Đinh"),
    ("z90", ["z90"], "data", "studio", "Ranking"), ("z91", ["z91"], "medium", "studio", "Subjectivity caveat"),
    ("z99", ["z99", "z99b"], "end", "meadow", "CTA + sixth sting"),
]
GAP_IN, GAP_OUT, LEAD, TAIL = 0.22, 0.42, 0.15, 1.6
SPLITS = {  # shot -> (cut at seconds into the shot, zoom, focus x, focus y as fractions of the frame)
    "r02g": (3.4, 1.22, 0.38, 0.62), "r03d": (3.0, 1.25, 0.34, 0.62), "r04c": ("r04d", 1.3, 0.28, 0.68),
    "r05c": (3.6, 1.15, 0.66, 0.4), "r05j": (4.0, 1.15, 0.78, 0.25),
}
GAP_AFTER = {"c00a": 0.55, "t00d": 0.5, "r02d": 0.45, "r03d": 0.4, "r04e": 0.45, "r04g": 0.5, "r05c": 0.4, "r05d": 0.45, "r05h": 0.45,
             "r05j": 0.6, "z99": 1.9, "r01d": 0.3, "r02f": 0.5, "r03g": 0.5, "r04h": 0.6, "r05k": 0.7, "z91": 0.5, "t00e": 0.5}
LEAD_IN = {"r01a": 0.45, "r02a": 0.45, "r03a": 0.45, "r04a": 0.45, "r05a": 0.6, "z90": 0.3}
SFX = {  # shot -> cues (at = seconds into the shot; "hit" = the shot's sting moment)
    "c00": [{"at": 0.1, "name": "impact", "gain": -6}, {"at": 0.3, "name": "pop", "gain": -10}],
    "t00": [{"at": 0.0, "name": "whoosh", "gain": -10}, {"at": 0.6, "name": "shimmer", "gain": -14}],
    "t01": [{"at": 0.3, "name": "swish", "gain": -10}, {"at": 1.0, "name": "pop", "gain": -12}],
    "t02": [{"at": 0.5, "name": "blip", "gain": -14}, {"at": 0.85, "name": "blip", "gain": -14}, {"at": 1.2, "name": "blip", "gain": -14}, {"at": 1.55, "name": "blip", "gain": -12}],
    "r01d": [{"at": 0.5, "name": "hit", "gain": -8}, {"at": 0.5, "name": "counter", "gain": -14, "dur": 1.6}],
    "r02c": [{"at": 0.0, "name": "buzz", "gain": -14, "dur": 0.6}, {"at": 0.6, "name": "hit", "gain": -7}],
    "r02f": [{"at": 0.6, "name": "slowmo", "gain": -14}],
    "r03c": [{"at": 0.5, "name": "hit", "gain": -7}, {"at": 0.9, "name": "buzz", "gain": -16, "dur": 1.5}],
    "r03f": [{"at": 0.0, "name": "buzz", "gain": -18, "dur": 2.0}],
    "r04a": [{"at": 0.0, "name": "buzz", "gain": -16, "dur": 1.2}],
    "r04e": [{"at": 0.0, "name": "buzz", "gain": -18, "dur": 2.5}],
    "r04g": [{"at": 0.25, "name": "impact", "gain": -5}, {"at": 0.25, "name": "glitch", "gain": -10}],
    "r04h": [{"at": 0.2, "name": "clock", "gain": -14, "dur": 3.0}],
    "r05a": [{"at": 0.0, "name": "stinger", "gain": -8}],
    "r05c": [{"at": 0.5, "name": "impact", "gain": -4}, {"at": 3.6, "name": "riser", "gain": -12, "dur": 0.8}],
    "r05d": [{"at": 0.0, "name": "freeze", "gain": -10}],
    "r05f": [{"at": 1.0, "name": "pop", "gain": -10}, {"at": 3.0, "name": "stinger", "gain": -9}],
    "r05h": [{"at": 0.2, "name": "tick", "gain": -12, "dur": 2.0}],
    "r05j": [{"at": 0.0, "name": "whoosh", "gain": -12}],
    "z90": [{"at": 0.6, "name": "counter", "gain": -16, "dur": 3.0}],
}
for r in ("r01a", "r02a", "r03a", "r04a", "r05a"):
    SFX.setdefault(r, []).insert(0, {"at": 0.0, "name": "whoosh", "gain": -8})
AMB = {"rainforest": {"name": "wind", "gain": -26}, "desert": {"name": "wind", "gain": -28}, "studio": {"name": "roomtone", "gain": -28}}


def syllables(text):
    return len(text.replace("-", " ").split())


def load_tight(path, keep=0.24, edge=0.04, floor_db=-40.0, min_sil=0.15):
    """Decode a Vbee clip and shorten its pauses. Vbee pads ~0.55 s at every comma/period and at the end, which
    sounds slow; internal pauses are cut to `keep` s and the head/tail to `edge` s. Speech samples are untouched."""
    import numpy as np
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True, check=True).stdout
    x = np.frombuffer(pcm, dtype=np.int16)
    win = int(0.01 * SR); n = len(x) // win
    rms = np.sqrt((x[: n * win].astype(np.float64).reshape(n, win) ** 2).mean(axis=1)) / 32768.0
    loud = 20 * np.log10(rms + 1e-9) > floor_db
    if not loud.any():
        return x
    first, last = int(np.argmax(loud)), int(n - 1 - np.argmax(loud[::-1]))
    out, i = [x[max(0, first * win - int(edge * SR)): first * win]], first
    while i <= last:
        j = i
        while j <= last and loud[j] == loud[i]:
            j += 1
        seg = x[i * win: j * win]
        if not loud[i] and (j - i) * 0.01 >= min_sil:
            half = int(keep * SR / 2)
            seg = np.concatenate([seg[:half], seg[-half:]]) if len(seg) > 2 * half else seg
        out.append(seg); i = j
    out.append(x[(last + 1) * win: (last + 1) * win + int(edge * SR)])
    return np.concatenate(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--project", type=Path, required=True)
    ap.add_argument("--clips", type=Path)
    ap.add_argument("--estimate", action="store_true")
    a = ap.parse_args()
    lines = json.loads((HERE / "voice" / "voice-lines.json").read_text(encoding="utf-8"))
    by_key = {ln["key"]: ln for ln in lines}
    assert sorted(by_key) == sorted(k for _, ks, *_ in SHOTS for k in ks), "SHOTS must cover every voice key exactly once"
    dur, audio = {}, {}
    for ln in lines:
        if a.estimate:
            dur[ln["key"]] = syllables(ln["narration"]) / 4.1 + 0.2
        else:
            audio[ln["key"]] = load_tight(a.clips / f"s{ln['id']}.mp3")
            dur[ln["key"]] = len(audio[ln["key"]]) / SR

    t, shots, cues, placed = LEAD, [], [], []
    for i, (sid, keys, size, place, note) in enumerate(SHOTS):
        start = 0.0 if i == 0 else t
        t += LEAD_IN.get(sid, 0)
        rel = []
        for j, k in enumerate(keys):
            rel.append({"k": k, "s": round(t - start, 3), "e": round(t + dur[k] - start, 3)})
            cues.append({"start": round(t, 3), "end": round(t + dur[k], 3), "text": by_key[k]["text"]})
            placed.append((t, k))
            t += dur[k] + (GAP_AFTER.get(k, GAP_IN if j < len(keys) - 1 else GAP_OUT))
        shots.append({"id": sid, "start": round(start, 3), "line": " ".join(by_key[k]["text"] for k in keys), "scene": note, "set": place, "size": size,
                      "in": {"type": "cut"} if sid[-1] != "a" or sid.startswith("t") else {"type": "flash", "dur": 0.25},
                      "sfx": SFX.get(sid, []), **({"notes": "hold: ranking reveals one row at a time"} if sid == "z90" else {}), **({"amb": AMB[place]} if place in AMB else {}), "params": {"keys": rel}})
    total = round(t + TAIL, 3)
    for s, nxt in zip(shots, shots[1:] + [None]):
        s["end"] = nxt["start"] if nxt else total
    # punch-in cuts inside long shots: the "_2" part continues the same animation, reframed (scenes: params.of/off)
    out = []
    for s in shots:
        out.append(s)
        if s["id"] not in SPLITS:
            continue
        off, zoom, fx, fy = SPLITS[s["id"]]
        if isinstance(off, str):  # cut where that voice key starts
            off = next(k["s"] for k in s["params"]["keys"] if k["k"] == off)
        child = {**s, "id": s["id"] + "_2", "size": "close", "start": round(s["start"] + off, 3), "end": s["end"], "in": {"type": "cut"},
                 "sfx": [{**c, "at": round(c["at"] - off, 3)} for c in s["sfx"] if c["at"] >= off],
                 "params": {**s["params"], "of": s["id"], "off": off, "zoom": zoom, "focus": [fx, fy], "full": round(s["end"] - s["start"], 3)}}
        s["sfx"] = [c for c in s["sfx"] if c["at"] < off]
        s["params"] = {**s["params"], "full": round(s["end"] - s["start"], 3)}
        s["end"] = child["start"]
        out.append(child)
    shots = out
    st = {s["id"]: s["start"] for s in shots}
    music = [{"start": 0, "end": st["r01a"], "mood": "playful", "intensity": 0.45},
             {"start": st["r01a"], "end": st["r04a"], "mood": "playful", "intensity": 0.6},
             {"start": st["r04a"], "end": st["r05a"], "mood": "tension", "intensity": 0.6},
             {"start": st["r05a"], "end": st["z90"], "mood": "dark", "intensity": 0.65},
             {"start": st["z90"], "end": st["z99"], "mood": "triumph", "intensity": 0.55},
             {"start": st["z99"], "end": total, "mood": "playful", "intensity": 0.45}]
    proj = a.project
    (proj / "story").mkdir(parents=True, exist_ok=True); (proj / "input").mkdir(parents=True, exist_ok=True)
    (proj / "story" / "shots.json").write_text(json.dumps({"title": "Cảm giác bị côn trùng đốt là như thế nào?", "duration": total, "shots": shots, "music": music, "sfx": []}, ensure_ascii=False, indent=1), encoding="utf-8")
    (proj / "input" / "cues.json").write_text(json.dumps(cues, ensure_ascii=False, indent=1), encoding="utf-8")
    (proj / "input" / "script.txt").write_text("\n".join(by_key[k]["text"] for _, k in placed) + "\n", encoding="utf-8")

    out = proj / "input" / "voiceover.wav"
    frames = bytearray(int(total * SR) * 2)
    if not a.estimate:
        for start, k in placed:
            pcm = audio[k].tobytes()
            o = int(start * SR) * 2
            frames[o:o + len(pcm)] = pcm[: len(frames) - o]
    with wave.open(str(out), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(bytes(frames))
    for d in ("timeline", "scenes/sets", "scenes/shots", "build", "out", "audio"):
        (proj / d).mkdir(parents=True, exist_ok=True)
    cfg = {"title": "Cảm giác bị côn trùng đốt là như thế nào", "lang": "vi", "aspect": "16:9", "resolution": "1080p", "fps": 24, "style": "dusk",
           "voiceover": "input/voiceover.wav", "script": "input/script.txt", "duration": total, "captions": False, "bars": None,
           "fadeIn": 0.3, "fadeOut": 0.8, "music": {"enabled": True, "gainDb": -19}, "sfx": {"enabled": True, "gainDb": -6}, "loudness": -14}
    (proj / "config.json").write_text(json.dumps(cfg, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(shots)} shots, {len(cues)} lines, total {total:.2f}s ({int(total // 60)}:{total % 60:04.1f}) -> {proj}")


if __name__ == "__main__":
    main()
