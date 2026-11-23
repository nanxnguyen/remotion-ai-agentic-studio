#!/usr/bin/env bash
# Xưởng Video AI: cài, build giao diện và chạy máy chủ trên máy Mac.
set -e
cd "$(dirname "$0")"
major=$(node -v 2>/dev/null | sed 's/v\([0-9]*\).*/\1/')
if [ -z "$major" ] || [ "$major" -lt 20 ]; then echo "Cần Node.js 20 trở lên (brew install node)"; exit 1; fi
[ -d web/node_modules ] || (cd web && npm install)
[ -d server/node_modules ] || (cd server && npm install)
(cd web && npm run build)
if [ ! -f server/.env ]; then cp server/.env.example server/.env; echo "Đã tạo server/.env — mở file này và dán ANTHROPIC_API_KEY, rồi chạy lại ./start.sh"; exit 0; fi
if [ "$1" = "--fake" ]; then cd server && npm run fake; else cd server && npm start; fi
