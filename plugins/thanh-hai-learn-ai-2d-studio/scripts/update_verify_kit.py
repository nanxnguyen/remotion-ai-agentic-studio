"""Regenerate the file hashes in kit/tools/verify_kit.py after changing any kit file (run from the plugin root)."""
import hashlib, os, re
kit = 'skills/make-2d-video/kit'
files = []
for root, dirs, fs in os.walk(kit):
    dirs[:] = [d for d in dirs if d not in ('node_modules', 'build', 'tests', '__pycache__', 'projects')]
    for f in fs:
        if f.startswith('.') or f.endswith('.pyc') or f == 'package-lock.json':
            continue
        rel = os.path.relpath(os.path.join(root, f), kit).replace(os.sep, '/')
        if rel != 'tools/verify_kit.py':
            files.append(rel)
files.sort()
h = lambda p: hashlib.sha256(open(os.path.join(kit, p), 'rb').read().replace(b"\r\n", b"\n").strip()).hexdigest()[:16]
body = "EXPECTED = {\n" + "".join(f'    "{p}": "{h(p)}",\n' for p in files) + "}\n"
p = os.path.join(kit, 'tools/verify_kit.py'); s = open(p).read()
open(p, 'w').write(re.sub(r"EXPECTED = \{.*?\n\}\n", body, s, flags=re.S))
print(f'verify_kit: {len(files)} files hashed')
