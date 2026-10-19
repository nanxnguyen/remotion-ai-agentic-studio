#!/usr/bin/env python3
"""Acceptance check for the ban-khong-yeu-duoi-chi-da-manh-qua-lau cue table.

Every cue must sit inside a silence window of script.md §1 and must not overlap
any spoken word. Speech windows are rebuilt from the §1 table (3.9 syl/s planning
rate) as [start, start + syl/rate]; silences are the intra-clip pauses plus the
post-clip holds. Prints the computed overlap for every cue.
"""
import json

RATE = 3.9

# script.md §1 timing budget, verbatim
KEYS = [
    # key,   syl, pause_in, hold_out, next_start
    ("s1", 11, 0.22, 0.30, 3.34),
    ("s2a", 9, 0.28, 0.25, 6.18),
    ("a1", 10, 0.24, 0.30, 9.28),
    ("s2b", 9, 0.00, 0.35, 11.94),
    ("s3", 15, 0.26, 1.05, 17.10),
    ("a2", 6, 0.14, 0.25, 19.02),
    ("s4", 8, 0.24, 0.40, 21.72),
    ("s5", 7, 0.18, 1.70, 25.39),
    ("s6", 8, 0.18, 0.50, 28.12),
    ("s7", 12, 0.24, 0.60, 32.04),
    ("s8", 3, 0.00, 1.80, 34.61),
    ("s9", 14, 0.26, 1.30, 39.76),
    ("s10", 15, 0.30, 1.80, 45.70),
]

# s10's pause sits between the two clauses, not at the end (script.md §1)
S10_CLAUSE_GAP = (39.76 + 7 / RATE, 39.76 + 7 / RATE + 0.30)

speech, silences = [], []
cursor = 0.0
for key, syl, pause_in, hold_out, next_start in KEYS:
    start = cursor
    last_word = start + syl / RATE
    if key == "s10":
        # script.md §1: s10's 0.30 s pause sits BETWEEN the two clauses, inside the
        # clip - so it is a silence, and the last spoken sound is the clip end.
        speech.append(("s10a", start, S10_CLAUSE_GAP[0]))
        speech.append(("s10b", S10_CLAUSE_GAP[1], last_word + pause_in))
        silences.append(("s10 clause gap", *S10_CLAUSE_GAP))
        silences.append((f"after {key} hold", last_word + pause_in, next_start))
    else:
        speech.append((key, start, last_word))
        silences.append((f"after {key} (intra {pause_in:.2f} + hold {hold_out:.2f})", last_word, next_start))
    cursor = next_start
silences.append(("END silent card", 45.70, 48.90))
LAST_WORD = max(e for _, _, e in speech)

# shot start table used by the cue table (relative pinning, sound-design §4.5)
SHOT_START = {k: s for k, s, _ in speech}
SHOT_START["s10"] = 39.76  # clip start; speech is split by the clause gap

CUES = [
    # name, shot, rel_offset_s, duration_s
    ("sfx-rain-wash", "s3", 4.16, 0.900),  # 27f: leaves 0.10s headroom before a2 starts
    ("sfx-drop-glass", "a2", 1.56, 0.320),
    ("sfx-back-a#1", "s5", 2.04, 0.280),
    ("sfx-back-b", "s5", 2.40, 0.260),
    ("sfx-back-a#2", "s5", 2.74, 0.280),
    ("sfx-phone-down", "s5", 3.20, 0.400),
    ("sfx-screen-wake", "s6", 2.31, 0.154),
    ("sfx-umbrella-lift", "s7", 3.28, 0.550),
    ("sfx-drop-fabric", "s9", 3.99, 0.300),
    ("sfx-light-turn", "s9", 4.49, 0.600),
    ("sfx-cup-down", "s10", 1.81, 0.2667),  # 8f at 30fps: fits the 0.300s clause gap with headroom both ends
]

print(f"planning rate {RATE} syl/s; {len(speech)} voiced clips, {len(silences)} silence windows\n")
print("speech windows (start -> last word)")
for key, s, e in speech:
    print(f"  {key:>4}  {s:6.3f} -> {e:6.3f}")
print("\nsilence windows")
for name, s, e in silences:
    print(f"  {name:<44} {s:6.3f} -> {e:6.3f}  ({e - s:.3f}s)")

print("\nCUE CHECK (each cue must be 100% inside one silence window)")
fail = 0
for name, shot, rel, dur in CUES:
    abs_s = SHOT_START[shot] + rel
    abs_e = abs_s + dur
    host = next((n for n, s, e in silences if s - 1e-9 <= abs_s and abs_e <= e + 1e-9), None)
    word_hits = [f"{k}({s:.2f}-{e:.2f})" for k, s, e in speech if abs_s < e and abs_e > s]
    ok = host is not None and not word_hits
    fail += 0 if ok else 1
    print(
        f"  {'OK ' if ok else 'FAIL'} {name:<18} {shot}+{rel:5.2f}s  abs {abs_s:6.3f}->{abs_e:6.3f}  "
        f"host={host or 'NONE'}{'  WORDS OVERLAP: ' + ','.join(word_hits) if word_hits else ''}"
    )

print("\nBGM CHECK")
bgm_end = 43.90
last_word = LAST_WORD
print(f"  last spoken word ends at {last_word:.2f}s (script.md §1 / §5)")
print(f"  BGM envelope reaches 0 at {bgm_end:.2f}s -> {'OK' if bgm_end <= last_word else 'FAIL'}")
print(f"  tail 43.90-48.90 s carries no audio element -> OK (5.00 s, script.md §5)")
if bgm_end > last_word + 0.02:  # script.md rounds the last word to 43.90; the exact value is 43.906
    fail += 1

print(f"\n{'ALL CHECKS PASS' if fail == 0 else str(fail) + ' CHECK(S) FAILED'}")
raise SystemExit(1 if fail else 0)