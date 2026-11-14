"""Check the rules claude.ai enforces when a plugin is uploaded: manifest name/description limits and skill frontmatter."""
import glob, json, re, sys
bad = []
d = json.load(open('.claude-plugin/plugin.json', encoding='utf-8'))
if not re.fullmatch(r'[a-z0-9-]+', d.get('name', '')): bad.append('plugin name must be kebab-case')
if len(d.get('description', '')) > 500: bad.append(f"plugin description is {len(d['description'])} chars (max 500)")
for p in sorted(glob.glob('skills/*/SKILL.md')):
    txt = open(p, encoding='utf-8').read()
    m = re.match(r'^---\n(.*?)\n---\n', txt, re.S)
    if not m: bad.append(f'{p}: missing frontmatter'); continue
    fm = m.group(1)
    name = re.search(r'^name:\s*(.+)$', fm, re.M); desc = re.search(r'^description:\s*(.+)$', fm, re.M)
    if not name or not desc: bad.append(f'{p}: name/description missing'); continue
    dv = desc.group(1)
    if re.search(r'<[^>]*>', dv): bad.append(f'{p}: description contains an XML-like tag')
    if len(json.loads(dv) if dv.startswith('"') else dv) > 1024: bad.append(f'{p}: description over 1024 chars')
    if name.group(1).strip() != p.split('/')[1]: bad.append(f'{p}: name does not match folder')
print('\n'.join(bad) if bad else f'plugin manifest + {len(glob.glob("skills/*/SKILL.md"))} skills valid')
sys.exit(1 if bad else 0)
