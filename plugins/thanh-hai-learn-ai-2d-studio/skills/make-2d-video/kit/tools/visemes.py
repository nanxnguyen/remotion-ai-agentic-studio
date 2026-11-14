"""tools/visemes.py — turn word timings into lip-sync mouth shapes (visemes) for talking characters.

  python tools/visemes.py --project projects/my-video          # reads timeline/words.json + config.json lang
  -> timeline/visemes.json  {"lang": "vi", "fps": 24, "visemes": [{"t": 1.25, "v": "M"}, ...]}

Shapes: A (a ă â), O (o ô ơ), U (u ư, qu), E (e ê i y), M (m b p — lips pressed), F (ph v — lip on teeth), rest.
Vietnamese is parsed per syllable (onset + vowel nucleus + final); other languages use a letter heuristic.
In a shot: drawFigure({ ..., viseme: visemeAt(info.globalT, lineStart, lineEnd) }) — only for characters who
speak a quoted line; the narrator is never lip-synced.
"""
import argparse, json, os, re, sys, unicodedata

VOWEL = {'a': 'A', 'ă': 'A', 'â': 'A', 'o': 'O', 'ô': 'O', 'ơ': 'O', 'u': 'U', 'ư': 'U', 'e': 'E', 'ê': 'E', 'i': 'E', 'y': 'E'}
ONSETS = ['ngh', 'ng', 'nh', 'ph', 'th', 'tr', 'ch', 'gh', 'gi', 'kh', 'qu', 'b', 'c', 'd', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'x']
ONSET_V = {'m': 'M', 'b': 'M', 'p': 'M', 'ph': 'F', 'v': 'F', 'qu': 'U'}
FINALS = ['ng', 'nh', 'ch', 'c', 'm', 'n', 'p', 't']
TONES = {'̀', '́', '̃', '̉', '̣'}  # grave, acute, tilde, hook above, dot below


def strip_tones(word):
    """Lowercase, drop tone marks, keep vowel quality (ă â ê ô ơ ư), đ -> d, drop punctuation."""
    s = unicodedata.normalize('NFD', word.lower())
    s = ''.join(ch for ch in s if ch not in TONES)
    s = unicodedata.normalize('NFC', s).replace('đ', 'd')
    return re.sub(r"[^a-zăâêôơư]", '', s)


def collapse(seq):
    out = []
    for v in seq:
        if not out or out[-1] != v:
            out.append(v)
    return out


def syllable_visemes(word, lang='vi'):
    w = strip_tones(word)
    if not w:
        return []
    if not lang.startswith('vi'):
        if w.endswith('e') and len(w) > 2:
            w = w[:-1]  # silent final e
        m = {'m': 'M', 'b': 'M', 'p': 'M', 'f': 'F', 'v': 'F', 'a': 'A', 'o': 'O', 'u': 'U', 'w': 'U', 'e': 'E', 'i': 'E', 'y': 'E'}
        return collapse([m[c] for c in w if c in m])
    onset = next((o for o in ONSETS if w.startswith(o) and (o != 'gi' or len(w) > 2)), '')
    rest = w[len(onset):]
    final = next((f for f in FINALS if rest.endswith(f) and len(rest) > len(f)), '')
    nucleus = rest[: len(rest) - len(final)] if final else rest
    out = []
    if onset in ONSET_V:
        out.append(ONSET_V[onset])
    out += [VOWEL[c] for c in nucleus if c in VOWEL]
    if final in ('m', 'p'):
        out.append('M')
    return collapse(out)


def words_to_visemes(words, lang='vi', fps=24, pause=0.12):
    snap = lambda t: round(round(t * fps) / fps, 4)
    out = []
    def push(t, v):
        t = snap(t)
        if out and out[-1]['v'] == v:
            return
        if out and t <= out[-1]['t']:
            t = round(out[-1]['t'] + 1 / fps, 4)
        out.append({'t': t, 'v': v})
    for i, w in enumerate(words):
        seq = syllable_visemes(w['word'], lang)
        s, e = float(w['start']), float(w['end'])
        d = max(e - s, 1e-3)
        if seq:
            has_on = seq[0] in ('M', 'F') or strip_tones(w['word']).startswith('qu')
            has_fin = len(seq) > 1 and seq[-1] == 'M' and strip_tones(w['word'])[-1:] in ('m', 'p')
            t_on = min(0.3 * d, 0.09) if has_on else 0
            t_fin = min(0.2 * d, 0.08) if has_fin else 0
            mid = seq[(1 if has_on else 0): len(seq) - (1 if has_fin else 0)]
            if has_on:
                push(s, seq[0])
            span = (d - t_on - t_fin) / max(1, len(mid))
            for k, v in enumerate(mid):
                push(s + t_on + k * span, v)
            if has_fin:
                push(e - t_fin, 'M')
        nxt = words[i + 1] if i + 1 < len(words) else None
        if nxt is None or float(nxt['start']) - e > pause:
            push(e, 'rest')
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--project', required=True)
    ap.add_argument('--lang')
    a = ap.parse_args()
    cfg = json.load(open(os.path.join(a.project, 'config.json'), encoding='utf-8'))
    lang = a.lang or cfg.get('lang', 'vi')
    wpath = os.path.join(a.project, 'timeline', 'words.json')
    if not os.path.exists(wpath):
        sys.exit('timeline/words.json missing: run tools/transcribe.py or tools/parse_script.py first')
    words = json.load(open(wpath, encoding='utf-8'))
    words = words.get('words', words) if isinstance(words, dict) else words
    vis = words_to_visemes(words, lang, cfg.get('fps', 24))
    out = os.path.join(a.project, 'timeline', 'visemes.json')
    json.dump({'lang': lang, 'fps': cfg.get('fps', 24), 'visemes': vis}, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print(f'visemes: {len(vis)} mouth shapes from {len(words)} words ({lang}) -> {out}')


if __name__ == '__main__':
    main()
