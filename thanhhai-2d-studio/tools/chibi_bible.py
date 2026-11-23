"""tools/chibi_bible.py — pre-production bible for a chibi-history-video script (run BEFORE any render).

  python tools/chibi_bible.py --project projects/<slug> [--script input/script.txt]

Reads the narration script (and story/chapters.json if present) and writes story/bible.md + story/bible.json:
  1. Cast     — every person the script names: main cast (scenes/cast.js), side characters already designed
                (EXTRA_PEOPLE in chibi_assign.py), and UNDESIGNED names that need a look before production.
  2. Places   — map places named (campaign-map arrows) and places the map does not know yet.
  3. Sets     — per chapter, which set each sentence will get from the scene rules; sentences that match NO rule
                (they would fall back to the chapter palette) are listed so a set can be chosen up front.
  4. Shots    — estimated shot count at ~2.3 s per shot for the measured or estimated duration.
Fix every "cần quyết định" item (add a cast.js/EXTRA_PEOPLE entry, a set rule or an overrides.json line), then
approve the contact sheet (render.mjs --sheet) before the full render. Exit code 1 while undecided items remain.
"""
import argparse, collections, json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import chibi_assign as A

STOP = {'Theo', 'Nhưng', 'Còn', 'Thế', 'Và', 'Khi', 'Rồi', 'Năm', 'Sử', 'Truyện', 'Nhớ', 'Ông', 'Bà', 'Cậu', 'Chỗ', 'Hôm', 'Tập',
        'Người', 'Một', 'Hai', 'Ba', 'Đầu', 'Cuối', 'Sau', 'Trước', 'Lần', 'Nói', 'Nghe', 'Tới', 'Đến', 'Thứ', 'Bí', 'Mà',
        'A', 'Xìn', 'Tam', 'Quốc', 'Diễn', 'Nghĩa', 'Hán', 'Ngụy', 'Thục', 'Ngô', 'Tấn', 'Đông', 'Tây', 'Nam', 'Bắc', 'Trung', 'Hoa',
        'Thích', 'Đăng', 'Ký', 'Comment', 'Đó', 'Đây', 'Này', 'Vì', 'Nếu', 'Dù', 'Cả', 'Ai', 'Gì', 'Ở', 'Từ', 'Với', 'Cho'}
NAME_RX = re.compile(r'(?<![.!?:]\s)(?<!^)\b([A-ZĐ][\wÀ-ỹ]*(?:\s+[A-ZĐ][\wÀ-ỹ]*){1,2})')


def sentences(text):
    return [s.strip() for s in re.split(r'(?<=[.!?…])\s+', text) if s.strip()]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--project', required=True)
    ap.add_argument('--script', default='input/script.txt')
    ap.add_argument('--sec-per-shot', type=float, default=2.3)
    a = ap.parse_args()
    P = a.project
    text = open(os.path.join(P, a.script), encoding='utf-8').read()
    text = re.sub(r'^\s*#.*$', '', text, flags=re.M)
    chapters = json.load(open(os.path.join(P, 'story', 'chapters.json'), encoding='utf-8')) if os.path.exists(os.path.join(P, 'story', 'chapters.json')) else []
    cast_js = open(os.path.join(P, 'scenes', 'cast.js'), encoding='utf-8').read() if os.path.exists(os.path.join(P, 'scenes', 'cast.js')) else ''
    main_keys = set(re.findall(r'export const (\w+)\s*=', cast_js))

    # chapter of each sentence
    S, ch = [], 0
    for s in sentences(text):
        for c in chapters:
            if A.nfc(s).startswith(A.nfc(c['first'])[:28]):
                ch = c['n']
        S.append((ch, s))

    # 1. cast
    cast_hits, undesigned = collections.Counter(), collections.Counter()
    terms_p = os.path.join(P, 'story', 'bible-terms.txt')  # capitalised words that are not people (horses, books, stratagems, places off-map)
    terms = [A.nfc(l.strip()) for l in open(terms_p, encoding='utf-8')] if os.path.exists(terms_p) else []
    known_lower = [rx for rx, _ in A.NAMED] + list(A.EXTRA_PEOPLE) + A.PLACES + ['giang đông'] + [re.escape(t) for t in terms if t]
    for _, s in S:
        low = A.nfc(s)
        for rx, key in A.NAMED:
            if re.search(rx, low):
                cast_hits[key + ('' if key in main_keys else ' (THIẾU trong cast.js)')] += 1
        for name in A.EXTRA_PEOPLE:
            if name in low:
                cast_hits[name.title()] += 1
        for m in NAME_RX.finditer(s):
            words = [w for w in m.group(1).split() if w not in STOP]
            if len(words) < 2:
                continue
            nm = ' '.join(words)
            # a name cut short by a STOP word ('La Quán' of 'La Quán Trung') counts as designed when it starts a known name
            if not any(re.search(k, A.nfc(nm)) or k.startswith(A.nfc(nm)) for k in known_lower):
                undesigned[nm] += 1

    # 3. sets per chapter (a set chosen in story/overrides.json for a shot of the sentence counts as decided)
    per_ch, unmatched = collections.defaultdict(collections.Counter), []
    sd = os.path.join(P, 'story')
    ov = json.load(open(os.path.join(sd, 'overrides.json'), encoding='utf-8')) if os.path.exists(os.path.join(sd, 'overrides.json')) else {}
    base = os.path.join(sd, 'shots.base.json')
    base_shots = json.load(open(base, encoding='utf-8'))['shots'] if os.path.exists(base) else []
    decided = [(A.nfc(sh.get('line')).strip(), ov.get(sh['id'], {}).get('set') or (sh.get('params') or {}).get('set')) for sh in base_shots]
    decided = [(ln, st) for ln, st in decided if ln and st]
    for c, s in S:
        low = A.nfc(s)
        hit = next((name for name, rx, _ in A.RULES if re.search(rx, low)), None)
        hit = next((f'{st} (override)' for ln, st in decided if ln in low or low in ln), None) or hit
        if not hit and len(s.split()) <= 9:
            hit = '(nối cảnh trước)'  # short reaction line: deliberately continues the previous scene
        per_ch[c][hit or '—'] += 1
        if not hit:
            unmatched.append((c, s))

    # 2. places
    places = collections.Counter(p for _, s in S for p in A.PLACES if p in A.nfc(s))

    dur = None
    cfg_p = os.path.join(P, 'config.json')
    if os.path.exists(cfg_p):
        dur = json.load(open(cfg_p, encoding='utf-8')).get('duration')
    syll = len(re.findall(r'\w+', text))
    dur = dur or syll / 3.6
    est = round(dur / a.sec_per_shot)

    L = [f'# Production bible — {os.path.basename(P)}', '',
         f'- Thời lượng: {dur / 60:.1f} phút · ước tính **{est} shot** (~{a.sec_per_shot}s/shot) · {len(S)} câu · {len(chapters)} chương', '',
         '## 1. Nhân vật', '', '| Nhân vật | Số câu nhắc |', '|---|---|']
    L += [f'| {k} | {v} |' for k, v in cast_hits.most_common()]
    L += ['', '### Cần quyết định: tên riêng chưa có thiết kế (người → thêm cast.js/EXTRA_PEOPLE; địa danh/thuật ngữ → bỏ qua hoặc thêm PLACES)', '']
    L += [f'- {k} ({v}×)' for k, v in undesigned.most_common()] or ['- (không có)']
    L += ['', '## 2. Địa danh trên bản đồ', '', ', '.join(f'{k} ({v})' for k, v in places.most_common()) or '(không có)', '',
          '## 3. Bối cảnh theo chương', '', '| Chương | Bối cảnh (số câu) |', '|---|---|']
    for c in sorted(per_ch):
        L.append(f"| {c} | " + ', '.join(f'{k} {v}' for k, v in per_ch[c].most_common()) + ' |')
    L += ['', f'### Cần quyết định: {len(unmatched)} câu chưa khớp luật cảnh nào (sẽ rơi vào bảng mặc định của chương)', '']
    L += [f'- Ch{c}: {s[:110]}' for c, s in unmatched[:80]]
    if len(unmatched) > 80:
        L.append(f'- … và {len(unmatched) - 80} câu nữa (xem bible.json)')
    L += ['', '## 4. Duyệt trước khi render', '',
          '1. Thêm thiết kế cho mọi tên ở mục 1 (hoặc ghi rõ "để quần chúng").',
          '2. Chọn cảnh cho các câu chưa khớp: thêm luật trong chibi_assign.py hoặc dòng trong story/overrides.json.',
          '3. `python3 tools/chibi_assign.py` → `python3 tools/shot_lint.py --strict` → `node render.mjs --sheet --scale 0.5` → duyệt contact sheet.',
          '4. Chỉ render full khi sheet đã duyệt.']
    os.makedirs(os.path.join(P, 'story'), exist_ok=True)
    open(os.path.join(P, 'story', 'bible.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    json.dump({'duration': dur, 'est_shots': est, 'cast': cast_hits, 'undesigned': undesigned, 'places': places,
               'sets_per_chapter': {str(k): v for k, v in per_ch.items()}, 'unmatched': unmatched},
              open(os.path.join(P, 'story', 'bible.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'bible: {len(cast_hits)} cast, {len(undesigned)} undesigned names, {len(unmatched)} unmatched lines, ~{est} shots -> {P}/story/bible.md')
    if undesigned or unmatched:
        sys.exit(1)


if __name__ == '__main__':
    main()
