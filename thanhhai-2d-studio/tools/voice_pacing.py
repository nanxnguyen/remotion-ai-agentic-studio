"""tools/voice_pacing.py — story-aware pacing for an existing narration (no new TTS needed).

  python tools/voice_pacing.py --project projects/<slug> [--dry-run]

Per sentence (timeline/sentences.json) it picks a delivery:
  fast   x1.07, pause after capped at 0.30 s   action / chase / battle lines
  brisk  x1.05, pause after capped at 0.35 s   long expository lines (many commas)
  slow   x0.94, +0.35 s after                  deaths, oaths, reveals, "remember this" plants
  +0.45 s after a question; +0.30 s before a punchline (shot badge/stamp) or "A Xìn soi".
Speech is time-stretched with ffmpeg atempo (pitch kept), silences are cut or padded, and every
timestamp is remapped: timeline/words.json, sentences.json, transcript.txt, story/shots.json
(start/end; sfx stay shot-relative). Writes input/voiceover-paced.wav, points config.json at it
and saves timeline/pacing.json. Re-run tools/beats.py afterwards.
"""
import argparse, json, os, re, subprocess, sys, tempfile, unicodedata
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from common import load_audio, load_json, save_json, write_timeline, sentences_from_words

SR = 44100
SLOW = r'chết|qua đời|ngã xuống|trăng trối|quỳ khóc|khóc|thề|giả bệnh|giả liệt|ông ta là ai|người thắng|nhớ câu|nhớ món|nhớ cậu|nhớ kỹ|khuôn mặt|không phải một lần|hai lần\.|thiên hạ đại thế|tận trung|lời hứa|hy sinh|\bmất\b'
FAST = r'đuổi|xông|phóng hỏa|tháo chạy|bỏ chạy|lập tức|kéo quân|đánh tan|chiếm|vượt|giết|chém(?! gió)(?! hay)|đốt|vây|kỵ binh|truy|ập tới|lao|tấn công|cháy'
CTA = r'đăng ký|bấm thích|nút thích|một cú thích|comment'


def nfc(s):
    return unicodedata.normalize('NFC', s or '').lower()


def plan(sentences, shots):
    out = []
    for i, s in enumerate(sentences):
        txt = nfc(s['text'])
        shot = next((x for x in shots if x['start'] - 0.05 <= s['start'] < x['end']), None)
        p = (shot or {}).get('params', {})
        mode, tempo, gap_cap, after, before = 'normal', 1.0, None, 0.0, 0.0
        if re.search(CTA, txt) or 'truyện chém' in txt:
            pass
        elif re.search(SLOW, txt):
            mode, tempo, after = 'slow', 0.94, 0.35
        elif re.search(FAST, txt):
            mode, tempo, gap_cap = 'fast', 1.07, 0.30
        elif txt.count(',') >= 2 and len(txt.split()) > 20:
            mode, tempo, gap_cap = 'brisk', 1.05, 0.35
        if txt.rstrip().endswith('?'):
            after = max(after, 0.45)
        is_last_in_shot = shot and (i + 1 == len(sentences) or sentences[i + 1]['start'] >= shot['end'] - 0.05)
        if (p.get('badge') or p.get('stamp')) and is_last_in_shot and mode != 'slow':
            before = 0.30
        if re.match(r'\s*a xìn soi', txt):
            before = 0.30
        out.append({'i': i, 'mode': mode, 'tempo': tempo, 'gap_cap': gap_cap, 'after': after, 'before': before, 'text': s['text'][:60]})
    return out


def atempo(x, r):
    if abs(r - 1) < 1e-3 or len(x) < SR * 0.05:
        return x
    with tempfile.TemporaryDirectory() as d:
        a, b = os.path.join(d, 'a.f32'), os.path.join(d, 'b.f32')
        x.astype(np.float32).tofile(a)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', a,
                        '-filter:a', f'atempo={r:.4f}', '-f', 'f32le', '-ar', str(SR), '-ac', '1', b], check=True)
        return np.fromfile(b, dtype=np.float32)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--project', required=True)
    ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args()
    P = a.project
    cfg = load_json(os.path.join(P, 'config.json'))
    words = load_json(os.path.join(P, 'timeline', 'words.json'))
    W = words['words']
    sents = load_json(os.path.join(P, 'timeline', 'sentences.json'))
    story = load_json(os.path.join(P, 'story', 'shots.json'))
    pl = plan(sents, story['shots'])
    from collections import Counter
    print('delivery:', dict(Counter(x['mode'] for x in pl)), '| pauses before:', sum(1 for x in pl if x['before']), '| after:', sum(1 for x in pl if x['after']))
    if a.dry_run:
        for x in pl[:40]:
            print(f"{x['mode']:6s} x{x['tempo']:.2f} +{x['before']:.2f}/{x['after']:.2f}  {x['text']}")
        return
    src = os.path.join(P, cfg['voiceover'])
    audio = load_audio(src, SR)
    total = len(audio) / SR
    knots_old, knots_new, chunks, tnew = [0.0], [0.0], [], 0.0
    # lead-in before first sentence kept as is
    s0 = sents[0]['start']
    chunks.append(audio[:int(s0 * SR)]); tnew = s0
    knots_old.append(s0); knots_new.append(tnew)
    for i, s in enumerate(sents):
        x = pl[i]
        nxt = sents[i + 1]['start'] if i + 1 < len(sents) else total
        a0, a1 = s['start'], max(s['start'], min(s['end'], nxt))
        speech = atempo(audio[int(a0 * SR):int(a1 * SR)], x['tempo'])
        chunks.append(speech); tnew += len(speech) / SR
        knots_old.append(a1); knots_new.append(tnew)
        gap = nxt - a1
        new_gap = min(gap, x['gap_cap']) if x['gap_cap'] is not None else gap
        new_gap += x['after'] + (pl[i + 1]['before'] if i + 1 < len(pl) else 0.0)
        g = audio[int(a1 * SR):int((a1 + min(gap, new_gap)) * SR)]
        if new_gap > gap:
            g = np.concatenate([g, np.zeros(int((new_gap - gap) * SR), np.float32)])
        if new_gap < gap and len(g) > 64:  # trimmed silence: short fade-out so the cut never clicks
            g = g.copy(); g[-64:] *= np.linspace(1, 0, 64)
        chunks.append(g); tnew += len(g) / SR
        knots_old.append(nxt); knots_new.append(tnew)
    out = np.concatenate(chunks)
    mp = lambda t: float(np.interp(t, knots_old, knots_new))
    dst = os.path.join(P, 'input', 'voiceover-paced.wav')
    with tempfile.TemporaryDirectory() as d:
        raw = os.path.join(d, 'o.f32'); out.astype(np.float32).tofile(raw)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', raw, dst], check=True)
    for w in W:
        w['start'], w['end'] = round(mp(w['start']), 3), round(mp(w['end']), 3)
    write_timeline(os.path.join(P, 'timeline'), W, sentences_from_words(W), words.get('source', '') + '+paced')
    newdur = round(len(out) / SR, 3)
    for sh in story['shots']:
        sh['start'] = round(mp(sh['start']), 3)
    S = story['shots']
    for x, y in zip(S, S[1:]):
        x['end'] = y['start']
    S[-1]['end'] = newdur
    story['duration'] = newdur
    save_json(os.path.join(P, 'story', 'shots.json'), story)
    bp = os.path.join(P, 'story', 'shots.base.json')
    if os.path.exists(bp):  # keep the unsplit base in the same timebase (tools/chibi_assign.py splits from it)
        base = load_json(bp)
        for sh in base['shots']:
            sh['start'] = round(mp(sh['start']), 3)
        for x, y in zip(base['shots'], base['shots'][1:]):
            x['end'] = y['start']
        base['shots'][-1]['end'] = newdur; base['duration'] = newdur
        save_json(bp, base)
    cfg['voiceover'] = 'input/voiceover-paced.wav'; cfg['duration'] = newdur
    save_json(os.path.join(P, 'config.json'), cfg)
    save_json(os.path.join(P, 'timeline', 'pacing.json'), {'source': src, 'plan': pl, 'knots': [knots_old, knots_new]})
    print(f'paced voice {total:.1f}s -> {newdur:.1f}s  ->  {dst}')


if __name__ == '__main__':
    main()
