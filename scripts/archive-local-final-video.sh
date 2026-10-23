#!/usr/bin/env bash
# Requires authenticated GitHub CLI and final H.264/AAC portrait MP4 that passed QA.
set -euo pipefail
if (( $# != 2 )); then echo 'Usage: archive-local-final-video.sh <final.mp4> <video-slug>' >&2; exit 2; fi
VIDEO="$(realpath "$1")"; SLUG="$2"; REPO='nanxnguyen/remotion-ai-agentic-studio'
[[ "$SLUG" =~ ^[a-z0-9][a-z0-9-]{0,62}$ ]] || { echo 'Invalid video slug' >&2; exit 2; }
[[ -s "$VIDEO" ]] || { echo 'Final video missing/empty' >&2; exit 2; }
for x in gh ffprobe python3 sha256sum; do command -v "$x" >/dev/null || { echo "Missing $x" >&2; exit 2; }; done
gh auth status >/dev/null 2>&1 || { echo 'Authenticate gh CLI before uploading' >&2; exit 2; }
WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT
cp -- "$VIDEO" "$WORK/$SLUG-final.mp4"
ffprobe -v error -show_format -show_streams -of json "$WORK/$SLUG-final.mp4" > "$WORK/probe.json"
python3 - "$WORK/probe.json" "$WORK/$SLUG-final.mp4" <<'PY'
import json,os,sys
x=json.load(open(sys.argv[1],encoding='utf-8'))
v=[s for s in x.get('streams',[]) if s.get('codec_type')=='video']
a=[s for s in x.get('streams',[]) if s.get('codec_type')=='audio']
if not v or not a or v[0].get('codec_name')!='h264' or a[0].get('codec_name')!='aac':
 raise SystemExit('Invalid MP4: expected H.264 video + AAC audio')
if int(v[0].get('height',0))<=int(v[0].get('width',0)):
 raise SystemExit('Expected portrait video')
if float(x.get('format',{}).get('duration',0))<=0 or os.path.getsize(sys.argv[2])<100000:
 raise SystemExit('Invalid MP4 duration/size')
PY
HASH="$(sha256sum "$WORK/$SLUG-final.mp4" | cut -d' ' -f1)"
TAG="video-$SLUG-$(printf '%s' "$HASH" | cut -c1-12)"
python3 - "$WORK/probe.json" "$WORK/$SLUG-metadata.json" "$SLUG" "$TAG" "$HASH" <<'PY'
import json,sys
p=json.load(open(sys.argv[1],encoding='utf-8'))
v=next(x for x in p['streams'] if x.get('codec_type')=='video')
a=next(x for x in p['streams'] if x.get('codec_type')=='audio')
m={'slug':sys.argv[3],'tag':sys.argv[4],'sha256':sys.argv[5],
 'duration_seconds':float(p['format']['duration']),'width':v['width'],'height':v['height'],
 'video_codec':v['codec_name'],'audio_codec':a['codec_name'],'release_status':'draft'}
with open(sys.argv[2],'w',encoding='utf-8') as f: json.dump(m,f,indent=2)
PY
if ! gh release view "$TAG" --repo "$REPO" >/dev/null 2>&1; then
 gh release create "$TAG" --repo "$REPO" --draft --target main \
  --title "Finished story video: $SLUG" --notes "Reviewed MP4, SHA-256 $HASH. Draft archive, not publication."
fi
gh release upload "$TAG" "$WORK/$SLUG-final.mp4" "$WORK/$SLUG-metadata.json" --repo "$REPO" --clobber
gh api "repos/$REPO/releases/tags/$TAG" > "$WORK/release.json"
python3 - "$WORK/release.json" "$WORK/$SLUG-final.mp4" <<'PY'
import json,hashlib,os,sys
j=json.load(open(sys.argv[1],encoding='utf-8'));mp4=sys.argv[2]
match=[x for x in j.get('assets',[]) if x.get('name')==os.path.basename(mp4)]
if len(match)!=1 or int(match[0].get('size',0))!=os.path.getsize(mp4):
 raise SystemExit('GitHub Release MP4 asset not verified')
h=hashlib.sha256(open(mp4,'rb').read()).hexdigest()
if match[0].get('digest') and match[0]['digest']!='sha256:'+h:
 raise SystemExit('GitHub MP4 digest mismatch')
assert match[0].get('browser_download_url') and j.get('html_url')
print(json.dumps({'video_url':match[0]['browser_download_url'],
 'release_url':j['html_url'],'sha256':h,'draft':bool(j.get('draft'))},indent=2))
PY
