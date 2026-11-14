#!/usr/bin/env python3
"""List Vbee voices through the public API (GET /api/public/v1/voices).

Credentials come only from the environment (GitHub Secrets); they are never printed.
Writes <out>/voices-<OWNERSHIP>.json with every page merged.

  python3 scripts/vbee-list-voices.py --out out/vbee-voices --language vi-VN --ownership VBEE COMMUNITY
"""
import argparse, json, os, sys, urllib.parse, urllib.request

API = "https://vbee.vn/api/public/v1/voices"


def env_secret(*names):
    for n in names:
        if os.environ.get(n):
            return os.environ[n]
    sys.exit(f"missing secret: one of {names}")


def fetch_all(token, app_id, ownership, language):
    voices, cursor = [], None
    for _ in range(200):  # hard stop: 200 pages x 100 voices
        q = {"voiceOwnership": ownership, "languageCode": language, "limit": 100}
        if cursor:
            q["cursor"] = cursor
        req = urllib.request.Request(f"{API}?{urllib.parse.urlencode(q)}",
                                     headers={"Authorization": f"Bearer {token}", "App-Id": app_id})
        with urllib.request.urlopen(req, timeout=60) as r:
            body = json.load(r)
        if body.get("status") != 1:
            sys.exit(f"{ownership}: API status {body.get('status')}: {json.dumps(body)[:300]}")
        res = body["result"]
        voices += res.get("voices", [])
        page = res.get("pagination") or {}
        cursor = page.get("next_cursor")
        if not page.get("has_next_page") or not cursor:
            return voices
    sys.exit(f"{ownership}: pagination did not end")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--language", default="vi-VN")
    ap.add_argument("--ownership", nargs="+", default=["VBEE"])
    a = ap.parse_args()
    token = env_secret("VBEE_ACCESS_TOKEN", "VBEE_TOKEN", "VBEE_API_KEY", "VBEE_API_TOKEN")
    app_id = env_secret("VBEE_APP_ID", "VBEE_APPID", "VBEE_APPLICATION_ID")
    os.makedirs(a.out, exist_ok=True)
    for own in a.ownership:
        try:
            v = fetch_all(token, app_id, own, a.language)
        except (SystemExit, OSError) as e:  # one ownership failing must not hide the others
            print(f"{own}: failed: {e}")
            continue
        with open(os.path.join(a.out, f"voices-{own}.json"), "w", encoding="utf-8") as f:
            json.dump(v, f, ensure_ascii=False, indent=1)
        print(f"{own}: {len(v)} voices")


if __name__ == "__main__":
    main()
