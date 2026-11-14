"""tools/shot_lint.py — check story/shots.json against the editing rules before building or rendering.

  python tools/shot_lint.py --project projects/my-video [--strict]

Errors (must fix): gaps/overlaps between shots, wrong total duration, shots under 0.4 s, a logo/intro/title card
inside the first 3 s (the hook must start immediately — viewers decide in the first 3–5 s).
Warnings: first shot longer than 4 s (change the picture early), shots over 8 s without "hold" in notes, more than
3 shots in a row with the same size, median shot length outside 1.5–4.5 s, more than 3 freeze-frames,
twos combined with motion blur on one shot.
Shot size comes from shot["size"] (wide|medium|ots|close|insert|top|freeze|3d|data|blueprint|title|end) or is
inferred from the scene text. Writes story/lint.json. Exit code 1 on errors (or on warnings with --strict).
"""
import argparse, json, os, re, statistics, sys

SIZE_WORDS = [
    ('end', r'end ?screen'), ('title', r'title card|\btitle\b'), ('freeze', r'freeze|time-?stop'), ('ots', r'\bots\b|over[- ]the[- ]shoulder'),
    ('close', r'bigface|close-?up|\bclose\b|\bcu\b'), ('insert', r'insert|macro'), ('top', r'top-?down|overhead'),
    ('blueprint', r'blueprint|diagram'), ('data', r'data ?card|chart|graph|counter'), ('3d', r'\b3d\b|orbit|fly-?through'),
    ('wide', r'establish|\bwide\b|\bws\b'), ('medium', r'two-?shot|medium|\bms\b'),
]

def infer_size(shot):
    if shot.get('size'):
        return shot['size']
    txt = f"{shot.get('scene', '')} {shot.get('notes', '')}".lower()
    for size, rx in SIZE_WORDS:
        if re.search(rx, txt):
            return size
    return None

def lint(story):
    out = []
    add = lambda lvl, code, msg, sid=None: out.append({'level': lvl, 'code': code, 'shot': sid, 'msg': msg})
    S = story.get('shots', [])
    if not S:
        add('error', 'empty', 'no shots'); return out
    if abs(S[0]['start']) > 1e-3:
        add('error', 'gap', f"first shot starts at {S[0]['start']} (must be 0)", S[0]['id'])
    for a, b in zip(S, S[1:]):
        if abs(a['end'] - b['start']) > 1e-3:
            add('error', 'gap', f"{a['id']} ends {a['end']} but {b['id']} starts {b['start']}", b['id'])
    if abs(story.get('duration', S[-1]['end']) - S[-1]['end']) > 1e-3:
        add('error', 'duration', f"duration {story.get('duration')} != last shot end {S[-1]['end']}")
    durs = [s['end'] - s['start'] for s in S]
    for s, d in zip(S, durs):
        if d < 0.4:
            add('error', 'too-short', f'{d:.2f} s', s['id'])
    sizes = [infer_size(s) for s in S]
    for s, sz in zip(S, sizes):
        if s['start'] >= 3:
            break
        if sz == 'title' or re.search(r'\blogo\b|\bintro\b', f"{s.get('scene', '')} {s.get('notes', '')}", re.I):
            add('error', 'hook-intro', 'logo/intro/title inside the first 3 s: open on the most striking picture instead', s['id'])
    if durs[0] > 4:
        add('warn', 'hook-slow', f'first shot is {durs[0]:.1f} s: change the picture within 3–4 s', S[0]['id'])
    for s, d in zip(S, durs):
        if d > 8 and 'hold' not in s.get('notes', '').lower():
            add('warn', 'long-shot', f'{d:.1f} s with no new action (add a cut, or write "hold" in notes)', s['id'])
    run = 1
    for i in range(1, len(S)):
        run = run + 1 if sizes[i] and sizes[i] == sizes[i - 1] else 1
        if run == 4:
            add('warn', 'repeat-size', f'4+ "{sizes[i]}" shots in a row: vary framing', S[i]['id'])
    if len(S) >= 8:
        med = statistics.median(durs)
        if not 1.5 <= med <= 4.5:
            add('warn', 'pacing', f'median shot {med:.1f} s (target 2–3.5 s)')
    for s in S:
        if s.get('timing') == 'twos' and s.get('mblur', 0) > 1:
            add('warn', 'twos-mblur', 'twos + motion blur: the blur sub-frames land on the same drawing (no blur, N× render time); pick one', s['id'])
    if sum(1 for z in sizes if z == 'freeze') > 3:
        add('warn', 'freeze', 'more than 3 freeze-frames dilutes the signature moment')
    return out

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--project', required=True); ap.add_argument('--strict', action='store_true')
    a = ap.parse_args()
    story = json.load(open(os.path.join(a.project, 'story', 'shots.json'), encoding='utf-8'))
    res = lint(story)
    json.dump(res, open(os.path.join(a.project, 'story', 'lint.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for r in res:
        print(f"{r['level'].upper():5} {r['code']:12} {r['shot'] or '':6} {r['msg']}")
    ne, nw = sum(r['level'] == 'error' for r in res), sum(r['level'] == 'warn' for r in res)
    print(f'shot_lint: {len(story["shots"])} shots, {ne} error(s), {nw} warning(s)')
    sys.exit(1 if ne or (a.strict and nw) else 0)

if __name__ == '__main__':
    main()
