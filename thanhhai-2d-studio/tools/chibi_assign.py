"""tools/chibi_assign.py — story-matched set assignment for chibi-history-video projects.

  python tools/chibi_assign.py --project projects/<slug> [--dry-run] [--max-share 0.25]

Reads story/shots.json, picks a set for every shot from the words in its narration line
(meeting -> warTent, siege words -> siege, boats/river -> navalFleet, peach garden, bridge,
mountain pass, falling star / death, market, imperial court, campaign map with march arrows,
battle), fills set options (faction, fire, chained, straw, arrows, year label) and writes the
file back. Signature sets (teaTable, bedchamber) and chapter title cards are never touched.
No match -> chapter palette (never the generic 'hills'). Then it directs the cut:
chapter anchors from story/chapters.json (chTag corner label + chOpen stamp), shot-size rhythm
(new place -> wide, joke/question -> closeup, never 3 same sizes), actions ('enter', 'clash'),
punch-ins on badges/stamps, and finally story/overrides.json ({shot_id: {param: value}}) for hand
fixes. Prints the set distribution; exits 1 if one set holds more than --max-share of shots.
"""
import argparse, collections, json, os, re, sys, unicodedata

SIGNATURE = {'teaTable', 'bedchamber'}
FACTION_OF = {'TAO_THAO': 'wei', 'TU_MA_Y': 'jin', 'LUU_BI': 'shu', 'KONG_MINH': 'shu', 'QUAN_VU': 'shu', 'TRUONG_PHI': 'shu',
              'TRIEU_VAN': 'shu', 'LUU_THIEN': 'shu', 'TON_QUYEN': 'wu', 'CHU_DU': 'wu', 'LUC_TON': 'wu', 'DONG_TRAC': 'dong',
              'LU_BO': 'dong', 'VIEN_THIEU': 'yuan', 'HAN_HIEN_DE': 'han'}
PLACES = ['ngũ trượng nguyên', 'lạc dương', 'trường an', 'hứa xương', 'quan độ', 'hà bắc', 'kinh châu', 'xích bích', 'giang đông',
          'kiến nghiệp', 'thành đô', 'hán trung', 'kỳ sơn', 'nhai đình', 'di lăng', 'bạch đế', 'phàn thành', 'mạch thành',
          'âm bình', 'từ châu', 'trường bản', 'tây lương', 'ích châu', 'hạ bì', 'bạch mã', 'hổ lao quan', 'hoa dung', 'nhu tu']
PLACES.remove('giang đông')  # region label (NGÔ), not a city dot
CAPITAL = {'wei': 'hứa xương', 'jin': 'lạc dương', 'shu': 'thành đô', 'wu': 'kiến nghiệp', 'dong': 'lạc dương', 'yuan': 'hà bắc', 'han': 'lạc dương'}

FIRE = r'cháy|lửa|đốt|hỏa|phóng hỏa'
# (set, regex, extra options) — first match wins, order = priority.
RULES = [
    # hook / narrator commentary / CTA -> A Xìn at the tea table (the channel's narrator set)
    ('starNight', r'gia cát chết|đoán được người chết|khổng minh mất', {}),
    ('forestCamp', r'phóng hỏa', {'fire': True}),
    ('cottage', r'ngủ trưa|khoanh tay đứng ngoài sân', {}),
    ('teaTable', r'nhớ món nợ|nhớ cậu bé|món nợ ân tình|nợ tào tháo một|ngây thơ thật|không phải tào tháo gian|nhà tư mã thắng|và ông đã đúng|^không hề|^hôm nay a xìn|nhớ câu đó|sử thật thì|sử cũng ghi|truyện thêm vào|truyện nhân con số|truyện đem|truyện hay quá|nhà chú sử|tiếng việt mình|nói theo kiểu bây giờ|nghe thì oai|nghe cảm động|bạn hiểu .* mạnh|người ta vẫn cãi|vậy ai thắng thật|câu mở đầu của truyện|bấm đăng ký|comment lý do|sếp của bạn|khả năng cao là chưa từng|muốn giải thích cho thuyết phục', {}),
    ('bedchamber', r'không phải một lần|^mà hai lần|ông ta là ai|nghi, cho người|rình|khách về báo|sắp đi rồi|bảy mươi tuổi làm gì|xin học thêm|nếu con ta|khanh hãy|quỳ khóc|tận trung|thác cô|trăng trối|nắm tay mà nói|phát bệnh|trời đã sinh du|đổ bệnh|lâm bệnh', {}),
    ('banquet', r'đôi đũa|tiếng sấm|sợ sấm|phì cười|tượng vàng|mài dao|sau bếp|lã bá sa|lạc bất tư thục|ở đây vui quá|người thục cũ|cười vui vẻ|lưu thiện được đưa về|nhận quà|món quà|sứ về', {}),
    ('emptyFort', r'thành trống|màn đối mặt đẹp nhất', {}),
    ('cavalry', r'tam anh|ba đánh một|múa kích|quay ngựa|một người một ngựa|phá vòng vây|hoa dung|chặn đánh|đứng chắn|nhường đường', {}),
    ('court', r'hứa gả|con gái nuôi|trong cung|ung nhọt|kinh thành|lẻn vào phủ|qua gương|ám sát|tư đồ|mỹ nhân kế|tình địch|cha nuôi|đổi chủ|chỉ số trung thành|phản tặc|hán trung vương|dời đô|triều ngụy|tào sảng|quyền lực|cơ nghiệp|mắt biếc|cậu nhóc|giữ nhà|treo ấn|chị dâu|lục tốn, một thư sinh', {}),
    ('siege', r'hạ bì|bạch môn|lầu bạch|bị bắt, trói|có hóa đơn|thành từ châu', {}),
    ('market', r'đầu tiên là lưu bị|đặc điểm nhận dạng|tai dài|thứ hai là quan vũ|truy nã|ác bá|cổ đông|khởi nghiệp|ra sân|đi ở trọ|nương nhờ|trụ sở|nghỉ hưu', {}),
    ('mountainPass', r'trên đường trốn|dân chạy nạn|dắt theo .*dân|ích châu', {'crowd': True}),
    ('navalFleet', r'khổ nhục|khúc sông|đỏ rực|lửa bùng|đêm quyết định|mười ngày|ba ngày', {}),
    ('warTent', r'giám đốc|chiến lược|túi gấm|đấu trí|kiên nhẫn|chỉ cần chờ|bức tường thép|không đánh|vốn liếng|tổng chỉ huy|xiêu lòng|hỏi lưu bị|một câu|nhận ra|sáng mắt|lời hứa|gánh cả công ty|ra làm|nhà họ tào|rất, rất lâu|khuôn mặt bạn phải nhớ', {}),
    ('battlefield', r'tức nước vỡ bờ|khăn vàng|thái bình đạo|nổi dậy|giặc|quái vật chiến trường|mạnh cỡ nào|kèo lệch', {}),
    ('tacticalMap', r'người thắng cả tam quốc|chia tài sản|thành đô|hán trung|phàn thành|kinh châu|đông ngô|nửa thế kỷ|họ tư mã|cơ nghiệp nhà tào|lạc dương', {}),
    ('bedchamber', r'giả bệnh|giả liệt|liệt giường|nằm bất động|nằm im|thăm dò|chảy ra mép|thị nữ phải đỡ', {}),
    ('forestCamp', r'trại thục|trong rừng|rừng rậm|dời trại|bảy trăm dặm|củi', {}),
    ('cottage', r'gió tuyết|tuyết rơi|bão tuyết', {'snow': True}),
    ('cottage', r'ngọa long|thầy đi vắng|thầy vẫn|lần đầu tới|nhà tranh|lều cỏ|tam cố', {}),
    ('emptyFort', r'không thành kế|mở toang cổng|gảy đàn|tiếng đàn|đốt hương|quét đường', {}),
    ('windAltar', r'cầu gió|thất tinh|lập đàn|đàn cầu', {}),
    ('flood', r'nhấn chìm|nước lũ|\blũ\b|tháo nước|thủy yểm|nước dâng|mưa lớn', {}),
    ('banquet', r'uống rượu|chén rượu|rượu nóng|mơ xanh|tiệc|đãi khách|nâng chén|làm cỗ', {}),
    ('study', r'binh thư|đọc sách|xuất sư biểu|viết thư|bức thư|dâng biểu|soạn', {}),
    ('cavalry', r'kỵ binh|phi ngựa|xích thố|cưỡi ngựa|truy kích|đột kích|vòng ra sau|đuổi theo|đuổi kịp', {}),
    ('peachGarden', r'vườn đào|kết nghĩa|lời thề|thề sống chết', {}),
    ('navalFleet', r'thuyền cỏ|mượn .*tên|mũi tên', {'straw': True}),
    ('navalFleet', r'xích sắt|(xích|nối).*thuyền|thuyền.*liên hoàn|liên hoàn kế', {'chained': True}),
    ('navalFleet', r'xích bích|thủy quân|thuyền|chiến thuyền|trường giang|đông phong|gió đông|nhổ neo|vượt sông|qua sông|dòng sông|giả làm thuyền', {}),
    ('bridge', r'trường bản|cây cầu|đầu cầu|trên cầu|thét một tiếng|gãy cầu', {}),
    ('starNight', r'ngũ trượng|phượng rơi|lạc phượng|ngôi sao|sao rơi|sao băng|tượng gỗ|qua đời|ngã xuống|đổ bệnh|lâm bệnh|trăng trối|thác cô|nắm tay mà nói', {}),
    ('mountainPass', r'nhai đình|âm bình|kỳ sơn|lên núi|trên núi|vây núi|đèo|vách núi|đường núi|hiểm trở|xuyên núi|mạnh hoạch|phương nam', {}),
    ('siege', r'đốt sạch|(công|vây|phá|chiếm|giữ|lấy|đánh|cổng|tường|cửa|bỏ|rút về) (thành|ải)|năm ải|qua ải|thành trì|chiếm sạch', {}),
    ('court', r'\bvua\b|hoàng đế|lên ngôi|xưng đế|triều đình|hoạn quan|thập thường thị|nhường ngôi|thiên tử|chiếu chỉ|ngai|băng hà|nhà hán|thái tử|thừa tướng|lập nhà|cung điện', {}),
    ('warTent', r'họp|bàn kế|bày kế|hiến kế|mưu|khuyên|can ngăn|xuất sư biểu|đấu khẩu|văn quan|quân sư|tam cố|lều cỏ|mời ra|dặn|giao cho|kế sách|kế hoạch|dâng', {}),
    ('market', r'chợ|dép|chiếu cói|cáo thị|tuyển|dân đói|nông dân|bán|thôn|làng|quê', {}),
    ('tacticalMap', r'khép lại|diệt vong|sụp đổ|thống nhất|về một mối|bản đồ|chia ba|chia hai|tam phân|thiên hạ|tiến quân|kéo quân|bắc phạt|kéo xuống|đánh sang|miền nam|miền bắc|giang đông|vạn quân|chiếm|lãnh thổ|đất', {}),
    ('battlefield', r'trận|giao chiến|kỵ binh|xông|chém|giết|tấn công|đại chiến|đánh nhau|tướng|quân', {}),
]
CHAPTER_PALETTE = {0: ['tacticalMap', 'court'], 1: ['market', 'court', 'battlefield'], 2: ['court', 'banquet', 'warTent'],
                   3: ['warTent', 'battlefield', 'siege'], 4: ['battlefield', 'warTent', 'siege'], 5: ['cottage', 'warTent', 'cavalry'],
                   6: ['navalFleet', 'warTent'], 7: ['tacticalMap', 'siege', 'court'], 8: ['forestCamp', 'court', 'starNight'],
                   9: ['study', 'mountainPass', 'warTent'], 10: ['court', 'study', 'tacticalMap']}


def nfc(s):
    return unicodedata.normalize('NFC', s or '').lower()


def assign(shots):
    last_place, prev_set, run = None, None, 0
    for i, sh in enumerate(shots):
        p = sh.setdefault('params', {})
        if p.get('chTitle') or p.get('set') in SIGNATURE or p.get('soi'):
            prev_set, run = p.get('set'), 1
            continue
        line = nfc(sh.get('line'))
        chars = [c for c in cast_line(line) if isinstance(c, str)] or [c for c in (p.get('chars') or []) if isinstance(c, str)]
        faction = next((FACTION_OF[c] for c in chars if c in FACTION_OF), None)
        places = [pl for pl in PLACES if pl in line]
        chosen, extra = None, {}
        scene_line = strip_names(line)
        for name, rx, opts in RULES:
            if re.search(rx, scene_line):
                chosen, extra = name, dict(opts)
                break
        if chosen is None:
            if prev_set and prev_set != 'teaTable' and prev_set != 'hills' and run < 5:
                chosen = prev_set
            else:
                pal = CHAPTER_PALETTE.get(p.get('ch', 0), ['battlefield', 'warTent'])
                chosen = pal[i % len(pal)]
        # campaign map: arrows from named places (or faction capital -> place)
        if chosen == 'tacticalMap' or (places and chosen in ('battlefield',) and len(places) >= 2):
            chosen = 'tacticalMap'
            arrows = []
            if len(places) >= 2:
                arrows = [[places[0], places[1], faction or 'wei']]
            elif places:
                src = last_place if last_place and last_place != places[0] else CAPITAL.get(faction or 'wei')
                if src and src != places[0]:
                    arrows = [[src, places[0], faction or 'wei']]
            extra['arrows'] = arrows
            extra['places'] = places
            extra['era'] = 'warlords' if p.get('ch', 0) <= 6 else 'three'
            if faction in ('wei', 'shu', 'wu'):
                extra['focus'] = faction
            m = re.search(r'năm (\d{3})', line)
            if m:
                extra['label'] = f'NĂM {m.group(1)}'
        if places:
            last_place = places[-1]
        if re.search(FIRE, line):
            extra['fire'] = True
        if chosen in ('warTent', 'siege', 'navalFleet') and faction:
            extra['faction'] = faction
        if chosen in ('siege', 'battlefield', 'mountainPass') and re.search(r'quân|vạn|đại quân|kéo|vây', line):
            extra['crowd'] = True
        if chosen == 'market' and re.search(r'tuyển|cáo thị', line):
            extra['notice'] = 'TUYỂN GẤP NHÂN TÀI'
        for k in ('arrows', 'places', 'era', 'focus', 'label', 'faction', 'chained', 'straw', 'notice', 'night'):
            p.pop(k, None)
        p.update(extra)
        p['set'] = chosen
        sh['set'] = chosen
        run = run + 1 if chosen == prev_set else 1
        prev_set = chosen
    return shots


# ---- cast: who is on screen comes from who the line names ----
NAMED = [  # (regex, cast key) — main cast defined in scenes/cast.js
    (r'tư mã ý|trọng đạt', 'TU_MA_Y'), (r'lưu thiện|a đẩu', 'LUU_THIEN'), (r'lưu bị|huyền đức', 'LUU_BI'), (r'quan vũ|vân trường|quan công', 'QUAN_VU'),
    (r'trương phi|dực đức', 'TRUONG_PHI'), (r'tào tháo|mạnh đức', 'TAO_THAO'), (r'khổng minh|cát lượng|ngọa long|gia cát', 'KONG_MINH'),
    (r'tôn quyền', 'TON_QUYEN'), (r'lữ bố', 'LU_BO'), (r'đổng trác', 'DONG_TRAC'), (r'triệu vân|tử long', 'TRIEU_VAN'), (r'chu du|chu lang', 'CHU_DU'),
    (r'viên thiệu', 'VIEN_THIEU'), (r'lục tốn', 'LUC_TON'), (r'hiến đế', 'HAN_HIEN_DE'), (r'tiểu bá vương', 'TON_QUYEN'),
]
WEI, SHU, WU = '#2c3550', '#2f6e38', '#9b2226'
EXTRA_PEOPLE = {  # side characters drawn from config, no cast.js entry needed
    'trương giác': ('#d4a017', 'topknot', 'full', 'scroll'), 'trương bảo': ('#d4a017', 'topknot', 'goatee', 'sword'),
    'trương lương': ('#d4a017', 'topknot', 'none', 'spear'), 'hán linh đế': ('#b58328', 'crown', 'none', None), 'linh đế': ('#b58328', 'crown', 'none', None),
    'hà tiến': ('#6b4a2a', 'helm', 'full', 'sword'), 'đinh nguyên': ('#5a4a3a', 'crown', 'goatee', 'sword'),
    'vương doãn': ('#5b4a6b', 'crown', 'long', 'scroll'), 'điêu thuyền': ('#e07a9b', 'bun', 'none', 'fan'),
    'hoa hùng': ('#4a2525', 'helm', 'full', 'guandao'), 'viên thuật': ('#7a6332', 'crown', 'goatee', 'sword'),
    'tôn kiên': (WU, 'helm', 'full', 'sword'), 'tôn sách': (WU, 'helm', 'none', 'spear'), 'từ thứ': (SHU, 'topknot', 'goatee', 'scroll'),
    'bàng thống': (SHU, 'topknot', 'full', 'fan'), 'phượng sồ': (SHU, 'topknot', 'full', 'fan'), 'lã mông': (WU, 'helm', 'goatee', 'sword'), 'hoàng cái': (WU, 'helm', 'long', 'sword'),
    'tào phi': (WEI, 'crown', 'none', 'sword'), 'tào sảng': (WEI, 'crown', 'none', 'scroll'), 'mã tốc': (SHU, 'topknot', 'none', 'scroll'),
    'mạnh hoạch': ('#7a4b2a', 'mohawk', 'full', 'spear'), 'khương duy': (SHU, 'helm', 'goatee', 'spear'), 'đặng ngải': (WEI, 'helm', 'goatee', 'spear'),
    'khước chính': (SHU, 'topknot', 'goatee', 'scroll'),
    'tư mã chiêu': ('#342c44', 'crown', 'goatee', 'sword'), 'tư mã viêm': ('#342c44', 'crown', 'none', 'scroll'), 'tư mã sư': ('#342c44', 'crown', 'none', 'sword'),
    'lưu biểu': ('#5a6b4a', 'crown', 'long', 'scroll'), 'lưu chương': ('#5a6b4a', 'crown', 'goatee', 'scroll'), 'nhan lương': ('#7a6332', 'helm', 'full', 'spear'),
    'văn sửu': ('#7a6332', 'helm', 'full', 'spear'), 'quách gia': (WEI, 'topknot', 'none', 'fan'), 'trình dục': (WEI, 'topknot', 'goatee', 'scroll'),
    'hạ hầu đôn': (WEI, 'helm', 'full', 'spear'), 'điển vi': (WEI, 'helm', 'full', 'sword'), 'mã siêu': ('#d8dee9', 'helm', 'none', 'spear'),
    'hoàng trung': (SHU, 'helm', 'long', 'sword'), 'ngụy diên': (SHU, 'helm', 'full', 'guandao'), 'lỗ túc': (WU, 'crown', 'goatee', 'scroll'),
    'tôn phu nhân': ('#e07a9b', 'bun', 'none', 'sword'),
    'la quán trung': ('#5b4a6b', 'topknot', 'long', 'scroll'),
    'hứa du': ('#7a6332', 'topknot', 'goatee', 'scroll'), 'trương chiêu': (WU, 'crown', 'long', 'scroll'), 'vu cấm': (WEI, 'helm', 'full', 'spear'),
    'lưu tông': ('#5a6b4a', 'crown', 'none', 'scroll'), 'lã bá sa': ('#8a6a4a', 'topknot', 'long', None), 'bùi tùng chi': ('#5b4a6b', 'crown', 'long', 'scroll'),
    'thập thường thị': ('#6b5a7a', 'crown', 'none', 'scroll'), 'hoạn quan': ('#6b5a7a', 'crown', 'none', 'scroll'), 'em gái tôn quyền': ('#e07a9b', 'bun', 'none', 'sword'),
    'khước chính': (SHU, 'topknot', 'goatee', 'scroll'), 'thị nữ': ('#e07a9b', 'bun', 'none', None),
}
CROWD_BY_SET = {  # unnamed extras when a line names nobody
    'market': ('Dân', '#a68a64', 'topknot', None), 'court': ('Quan', '#3d5a6c', 'crown', 'scroll'), 'banquet': ('Khách', '#7a2e2e', 'crown', None),
    'warTent': ('Mưu sĩ', '#5b4a6b', 'topknot', 'scroll'), 'study': ('Mưu sĩ', '#5b4a6b', 'topknot', 'scroll'),
}


def person(name, cfg):
    robe, hair, beard, prop = cfg
    return {'nameplate': ' '.join(w.capitalize() for w in name.split()), 'robeColor': robe, 'trimColor': '#e9c46a', 'hair': hair,
            'hairColor': '#23242b', 'beard': beard, 'prop': prop, 'armor': hair == 'helm', 'helmPlume': '#c92a2a', 'seed': len(name)}


def extras(setname, k=2):
    if setname in CROWD_BY_SET:
        lab, robe, hair, prop = CROWD_BY_SET[setname]
        return [{'robeColor': robe, 'trimColor': '#c9a24d', 'hair': hair, 'hairColor': '#23242b', 'beard': 'none' if i % 2 else 'goatee',
                 'prop': prop, 'seed': 40 + i} for i in range(k)]
    return [{'robeColor': '#2c2f38', 'trimColor': '#a68942', 'armor': True, 'hair': 'helm', 'helmPlume': '#c92a2a', 'prop': 'spear',
             'beard': 'none', 'seed': 50 + i} for i in range(k)]


def cast_line(line):
    found = []
    for rx, key in NAMED:
        m = re.search(rx, line)
        if m:
            found.append((m.start(), key))
    for name, cfg in EXTRA_PEOPLE.items():
        m = re.search(name, line)
        if m and not any(abs(m.start() - pos) < 3 for pos, _ in found):
            found.append((m.start(), person(name, cfg)))
    found.sort(key=lambda x: x[0])
    out = []
    for _, c in found:
        if c not in out:
            out.append(c)
    return out[:3]


def strip_names(line):
    """Remove people's names so scene words inside names (Điêu *Thuyền*, Bạch *Đế*) never pick the set."""
    for rx, _ in NAMED:
        line = re.sub(rx, ' ', line)
    for name in EXTRA_PEOPLE:
        line = line.replace(name, ' ')
    return line


PATIENT = [(r'trăng trối|thác cô|nếu con ta|khanh|tận trung|bạch đế|nắm tay', 'LUU_BI'), (r'chu du|trời đã sinh du|phát bệnh', 'CHU_DU')]


def assign_cast(shots):
    """chars = people the line names (main cast keys or side-character configs); unnamed lines keep the
    previous speakers for up to 2 shots on the same set, then switch to set-appropriate extras."""
    last, last_set, since = [], None, 99
    last_patient, since_bed = None, 99
    for sh in shots:
        p = sh['params']
        if p.get('set') == 'teaTable' or p.get('soi') or p.get('action') == 'standoff':
            continue
        named = cast_line(nfc(sh.get('line')))
        if named:
            p['chars'], last, since = named, named, 0
        elif last and p['set'] == last_set and since < 2:
            p['chars'], since = last, since + 1
        else:
            p['chars'], since = extras(p['set'], 2), 99
        if p['set'] == 'bedchamber':
            # who is in the bed: Tư Mã Ý feigning, Lưu Bị at Bạch Đế, Chu Du falling ill; drop names only mentioned in passing
            ln = nfc(sh.get('line'))
            pat = 'TU_MA_Y' if 'TU_MA_Y' in [c for c in p['chars'] if isinstance(c, str)] else next((k for rx, k in PATIENT if re.search(rx, ln)), None)
            if pat is None and last_patient and since_bed < 4:
                pat = last_patient
            if pat:
                visitors = [c for c in p['chars'] if c != pat and (c in ('KONG_MINH', 'TAO_THAO', 'LUU_THIEN', 'TRIEU_VAN') or isinstance(c, dict) and 'nameplate' not in c)]
                if not visitors and pat == 'LUU_BI':
                    visitors = ['KONG_MINH']  # Bạch Đế: Lưu Bị entrusts his son to Khổng Minh
                p['chars'] = [pat] + visitors[:1]
                p['patient'] = pat
            last_patient, since_bed = pat or last_patient, 0
        else:
            since_bed += 1
        last_set = p['set']


CLASH = r'chém(?! gió)|giết|xông|giao chiến|đấu|tỉ thí|hạ gục|bị hạ|tiễn luôn|đâm|đánh nhau|đánh tan|ám sát|quay kích|đuổi kịp|trận|đánh|phá|tấn công|vây|chặn|cướp|phản'


def apply_chapters(shots, chapters):
    """chapters: [{"n": 1, "title": "...", "first": "first words of the chapter"}] -> p.ch, p.chTag, p.chOpen."""
    if not chapters:
        return
    starts = {}
    for c in chapters:
        key = nfc(c['first'])[:28]
        for i, sh in enumerate(shots):
            ln = nfc(sh.get('line')).strip()
            if ln.startswith(key) or (len(ln) >= 8 and key.startswith(ln)):
                starts[i] = c
                break
        else:
            print(f"warning: chapter {c['n']} anchor not found: {c['first'][:40]}")
    cur = None
    for i, sh in enumerate(shots):
        p = sh.setdefault('params', {})
        p.pop('chOpen', None)
        if i in starts:
            cur = starts[i]
            p['chOpen'] = f"CHƯƠNG {cur['n']}: {cur['title']}"
        p['ch'] = cur['n'] if cur else 0
        p['chTag'] = f"CHƯƠNG {cur['n']} · {cur.get('tag') or cur['title']}" if cur else None


def direct(shots):
    """Film grammar + acting: shot size rhythm, entrances, clashes, punch-ins on jokes."""
    prev_set, run_size, prev_size = None, 0, None
    for sh in shots:
        p = sh['params']
        line = nfc(sh.get('line'))
        new_place = p['set'] != prev_set
        p.pop('action', None)
        p['punch'] = bool(p.get('badge') or p.get('stamp') or p.get('soi'))
        n = len(p.get('chars') or [])
        if p['set'] in ('battlefield', 'siege', 'bridge', 'forestCamp', 'mountainPass', 'hills', 'cavalry', 'emptyFort') and n >= 2 and re.search(CLASH, line) and not p.get('alt'):
            p['action'] = 'clash'
        elif new_place and p['set'] not in SIGNATURE and p['set'] != 'tacticalMap':
            p['action'] = 'enter'
        if new_place or p.get('chOpen'):
            size = 'wide'
        elif p['punch'] or line.rstrip().endswith(('?', '!')):
            size = 'closeup'
        else:
            size = 'medium' if prev_size != 'medium' else ('closeup' if run_size % 2 else 'wide')
        run_size = run_size + 1 if size == prev_size else 1
        if run_size >= 3:
            size = {'wide': 'medium', 'medium': 'closeup', 'closeup': 'medium'}[size]
            run_size = 1
        sh['size'] = size
        # transitions: chapter -> dip, new place -> fade/whip/zoom, joke on same place -> flash, else cut
        if p.get('chOpen'):
            sh['in'] = {'type': 'dip', 'dur': 0.6}
        elif new_place:
            if p.get('action') == 'clash' or p['set'] in ('cavalry', 'battlefield', 'siege'):
                sh['in'] = {'type': 'whip', 'dur': 0.3, 'dir': 1 if len(sh['id']) % 2 else -1}
            elif p['set'] == 'tacticalMap':
                sh['in'] = {'type': 'zoom', 'dur': 0.45}
            else:
                sh['in'] = {'type': 'fade', 'dur': 0.45}
        elif p['punch']:
            sh['in'] = {'type': 'flash', 'dur': 0.18}
        else:
            sh['in'] = {'type': 'cut'}
        sfx = [c for c in (sh.get('sfx') or []) if not c.get('auto')]
        if sh['in']['type'] == 'whip':
            sfx.append({'at': 0.0, 'name': 'swish', 'gain': -10, 'auto': True})
        if p.get('action') == 'clash':
            sfx.append({'at': 0.42, 'name': 'hit', 'gain': -8, 'auto': True})
        if p.get('chOpen'):
            sfx.append({'at': 0.05, 'name': 'impact', 'gain': -9, 'auto': True})
        sh['sfx'] = sfx
        prev_size, prev_set = size, p['set']


def split_long(shots, words, max_len=3.0, target=2.3):
    """Split shots longer than max_len into ~target-second pieces on word boundaries (prefer commas),
    so the picture changes every 2–3 s. Pieces after the first become 'alt' angles (other speaker,
    different size); badges/stamps/sfx stay on the piece where they first appear. Ids are renumbered."""
    out = []
    min_piece = min(1.2, max(0.8, target * 0.65))
    for sh in shots:
        d = sh['end'] - sh['start']
        p = sh['params']
        if d <= max_len or p.get('chTitle') or (max_len >= 2.5 and p.get('set') in ('teaTable',)):
            out.append(sh); continue
        n = max(2, round(d / target))
        ws = [w for w in words if sh['start'] - 0.01 <= w['start'] < sh['end'] - 0.25]
        cuts = []
        for k in range(1, n):
            goal = sh['start'] + d * k / n
            cand = [w for w in ws if w['start'] - sh['start'] >= min_piece and sh['end'] - w['start'] >= min_piece
                    and (not cuts or w['start'] - cuts[-1] >= min_piece)]
            if not cand:
                continue
            best = min(cand, key=lambda w: abs(w['start'] - goal) - (0.6 if prev_comma(ws, w) else 0))
            cuts.append(best['start'])
        if not cuts:
            out.append(sh); continue
        bounds = [sh['start']] + cuts + [sh['end']]
        for j in range(len(bounds) - 1):
            piece = json.loads(json.dumps(sh))
            piece['start'], piece['end'] = round(bounds[j], 3), round(bounds[j + 1], 3)
            piece['line'] = ' '.join(w['word'] for w in ws if bounds[j] <= w['start'] < bounds[j + 1]) or sh['line']
            piece['src'] = sh.get('src', sh['id'])
            if j:
                pp = piece['params']
                pp['alt'] = j
                for k in ('badge', 'stamp', 'chOpen'):
                    pp.pop(k, None)
                piece['sfx'] = []
            out.append(piece)
    for i, sh in enumerate(out):
        sh['id'] = f's{i + 1:03d}'
    return out


def prev_comma(ws, w):
    i = ws.index(w)
    return i > 0 and ws[i - 1]['word'].rstrip().endswith((',', ':', ';', '.'))


def apply_overrides(shots, ov):
    """Overrides are keyed by the ORIGINAL shot id (before splitting). Set-level keys apply to every
    piece of that shot; framing/acting keys (size, action, badge, stamp) only to its first piece."""
    FIRST_ONLY = {'size', 'action', 'badge', 'stamp', 'sfx'}
    for sid, o in (ov or {}).items():
        for sh in shots:
            if sh.get('src', sh['id']) != sid:
                continue
            first = not sh['params'].get('alt')
            for k, v in o.items():
                if k in FIRST_ONLY and not first:
                    continue
                if k in ('size', 'sfx'):
                    sh[k] = v
                else:
                    sh['params'][k] = v
            if 'set' in o:
                sh['set'] = o['set']


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--project', required=True)
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--no-split', action='store_true', help='keep one shot per narration line')
    ap.add_argument('--max-share', type=float, default=0.25)
    ap.add_argument('--max-len', type=float, default=3.0)
    ap.add_argument('--target-len', type=float, default=2.3)
    a = ap.parse_args()
    path = os.path.join(a.project, 'story', 'shots.json')
    base = os.path.join(a.project, 'story', 'shots.base.json')  # one shot per line; splitting always restarts from it
    if not os.path.exists(base):
        json.dump(json.load(open(path, encoding='utf-8')), open(base, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    story = json.load(open(base, encoding='utf-8'))
    for sh in story['shots']:
        sh['src'] = sh.get('src', sh['id'])
    sd = os.path.join(a.project, 'story')
    load = lambda f: json.load(open(os.path.join(sd, f), encoding='utf-8')) if os.path.exists(os.path.join(sd, f)) else None
    apply_chapters(story['shots'], load('chapters.json'))
    assign(story['shots'])
    assign_cast(story['shots'])
    apply_overrides(story['shots'], load('overrides.json'))
    words_path = os.path.join(a.project, 'timeline', 'words.json')
    if not a.no_split and os.path.exists(words_path):
        before = len(story['shots'])
        story['shots'] = split_long(story['shots'], json.load(open(words_path, encoding='utf-8'))['words'], max_len=a.max_len, target=a.target_len)
        print(f'split: {before} -> {len(story["shots"])} shots')
    direct(story['shots'])
    apply_overrides(story['shots'], load('overrides.json'))  # explicit sizes/actions win over the rhythm
    cnt = collections.Counter(s['params']['set'] for s in story['shots'])
    n = len(story['shots'])
    for k, v in cnt.most_common():
        print(f'{k:14s} {v:4d}  {100 * v / n:5.1f}%')
    if not a.dry_run:
        json.dump(story, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'wrote {path}')
    top, share = cnt.most_common(1)[0][0], cnt.most_common(1)[0][1] / n
    if share > a.max_share:
        sys.exit(f'set "{top}" holds {share:.0%} of shots (> {a.max_share:.0%}): add rules or vary the script')


if __name__ == '__main__':
    main()
