#!/usr/bin/env bash
# Run every test, refresh verify_kit hashes, and package the plugin as dist/<name>.plugin
set -euo pipefail
cd "$(dirname "$0")/.."
KIT=skills/make-2d-video/kit
(cd "$KIT" && [ -d node_modules ] || npm install --no-audit --no-fund)
(cd "$KIT" && npm test && node tests/golden.mjs)
python3 scripts/validate_plugin.py
python3 scripts/update_verify_kit.py
python3 "$KIT/tools/verify_kit.py"
NAME=$(python3 -c "import json;print(json.load(open('.claude-plugin/plugin.json'))['name'])")
mkdir -p dist && rm -f "dist/$NAME.plugin"
zip -qr "dist/$NAME.plugin" . -x "dist/*" -x ".git/*" -x "*/node_modules/*" -x "*/build/*" -x "*.DS_Store" -x "*/__pycache__/*" -x "*/projects/*" -x "*/out/*" -x "*/examples/*/audio/*" -x "scripts/*"
echo "built dist/$NAME.plugin"
# claude.ai rejects archives whose paths are not plain ASCII
python3 - "dist/$NAME.plugin" <<'PY'
import re, sys, zipfile
bad = [n for n in zipfile.ZipFile(sys.argv[1]).namelist() if not re.fullmatch(r'[A-Za-z0-9._/@+-]+', n)]
if bad: print('invalid paths in package:\n  ' + '\n  '.join(bad)); sys.exit(1)
print(f'package paths ok ({len(zipfile.ZipFile(sys.argv[1]).namelist())} files)')
PY
