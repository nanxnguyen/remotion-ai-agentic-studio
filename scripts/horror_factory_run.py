#!/usr/bin/env python3
"""Fail-closed horror-film queue executor. Never uploads/Publics unreviewed media.

The creative agent supplies a sourced original manifest and original SVG art. The
runner performs real Vbee Batch synthesis and FFmpeg render, then leaves an
MP4 for independent multimedia QA; no synthetic voice or QA score fallback.
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path
from xml.etree import ElementTree as ET

VOICE = 'n_hn_male_ngankechuyen_ytstable_vc'
SLUG = re.compile(r'[a-z0-9]+(?:-[a-z0-9]+)*\Z')
DANGEROUS_SVG = re.compile(r'<!|<script\b|<image\b|<foreignobject\b|\bhref\s*=|url\s*\(|@import|(?:https?|file|data):',re.I)


class FactoryBlocked(RuntimeError):
    """An honest capability, source, or QA blocker, not a successful run."""


def validate_asset(relative, root, slug):
    if not isinstance(relative,str) or '\\' in relative or '\x00' in relative:
        raise FactoryBlocked('Asset path must be a safe relative SVG path')
    base = (root / 'production' / 'horror-assets' / slug).resolve()
    path = (root / relative).resolve()
    if not path.is_relative_to(base) or path.suffix.lower() != '.svg':
        raise FactoryBlocked('Asset path must be an original SVG under the film folder')
    if not path.is_file() or path.stat().st_size > 1_500_000:
        raise FactoryBlocked('Asset file missing or oversized: ' + relative)
    source = path.read_text(encoding='utf-8')
    sanitized = source.replace('xmlns="http://www.w3.org/2000/svg"', '')
    sanitized = re.sub(r'url\(\s*#[A-Za-z_][A-Za-z0-9_-]*\s*\)', '', sanitized)
    if DANGEROUS_SVG.search(sanitized):
        raise FactoryBlocked('Unsafe SVG: external resources, scripts and XML entities forbidden')
    try:
        image = ET.fromstring(source)
    except ET.ParseError as exc:
        raise FactoryBlocked('Invalid SVG artwork') from exc
    if not image.tag.endswith('svg') or image.get('width') != '1080' or image.get('height') != '1920':
        raise FactoryBlocked('Original scene/thumbnail artwork must be 1080x1920 SVG')
    return path


def validate_manifest(data, root):
    if not isinstance(data,dict) or data.get('schema_version') != 1:
        raise FactoryBlocked('Unsupported manifest schema')
    slug=data.get('slug')
    if not isinstance(slug,str) or not SLUG.fullmatch(slug):
        raise FactoryBlocked('Invalid original film slug')
    kind=data.get('classification')
    if kind not in {'FOLKLORE','FICTION_INSPIRED_BY_FOLKLORE','DOCUMENTED_CASE'}:
        raise FactoryBlocked('Story needs truthful provenance classification')
    sources=data.get('sources')
    if not isinstance(sources,list) or len(sources)<(2 if kind=='DOCUMENTED_CASE' else 1):
        raise FactoryBlocked('Source provenance evidence missing')
    if any(not isinstance(x,dict) or not str(x.get('url','')).startswith('https://') for x in sources):
        raise FactoryBlocked('Sources require explicit HTTPS references')
    audit=data.get('script_audit') or {}
    if not isinstance(audit,dict) or not str(audit.get('independent_reviewer','')).strip():
        raise FactoryBlocked('Missing independent script review')
    if type(audit.get('score')) not in (int,float) or audit['score'] < 90:
        raise FactoryBlocked('Script below 90/100 creative QA')
    if type(audit.get('retention_prediction')) not in (int,float) or audit['retention_prediction'] < 42:
        raise FactoryBlocked('Script below 42/50 predicted retention rubric')
    titles=data.get('title_candidates')
    if not isinstance(titles,list) or len(set(titles))<3 or any(not isinstance(t,str) or not 8<=len(t)<=100 for t in titles):
        raise FactoryBlocked('Need 3 unique truthful Vietnamese titles')
    description=data.get('description')
    if not isinstance(description,str) or not re.search(r'đăng ký|theo dõi|thả tim',description,re.I):
        raise FactoryBlocked('Description missing natural CTA')
    if kind!='DOCUMENTED_CASE' and not re.search(r'hư cấu|dân gian|truyền thuyết',description,re.I):
        raise FactoryBlocked('Description must disclose folklore/fiction')
    thumbnails=data.get('thumbnail_candidates')
    if not isinstance(thumbnails,list) or len(set(thumbnails))<2:
        raise FactoryBlocked('Need 2 distinct real vertical thumbnails')
    scenes=data.get('scenes')
    if not isinstance(scenes,list) or not 8<=len(scenes)<=20:
        raise FactoryBlocked('Need 8–20 actual cinematic scenes')
    for image in thumbnails:
        validate_asset(image,root,slug)
    for i,scene in enumerate(scenes,1):
        if not isinstance(scene,dict) or scene.get('id') != i:
            raise FactoryBlocked('Scenes must be sequential and unique')
        text=scene.get('narration')
        if not isinstance(text,str) or not 10<=len(text)<=450:
            raise FactoryBlocked('Each scene needs genuine narration text')
        validate_asset(scene.get('art'),root,slug)
    return data


def run_command(argv, *, cwd):
    try:
        subprocess.run(argv,cwd=cwd,check=True,timeout=3600)
    except (subprocess.SubprocessError,OSError) as exc:
        raise FactoryBlocked('Real media command failed: '+str(argv[0])) from exc


def render_from_manifest(data, root, output):
    """Create true Vbee/FFmpeg A/V, not a Public QA verdict or YouTube upload."""
    validate_manifest(data,root)
    if not (os.getenv('VBEE_APP_ID') and os.getenv('VBEE_ACCESS_TOKEN')):
        raise FactoryBlocked('Vbee runtime credentials unavailable; no alternate voice permitted')
    if not (root/'scripts/gen-story-vbee-batch.py').is_file():
        raise FactoryBlocked('Vbee batch script missing from executable checkout')
    try:
        import cairosvg
    except ImportError as exc:
        raise FactoryBlocked('CairoSVG is required to render original vector art') from exc
    slug=data['slug']; output.mkdir(parents=True,exist_ok=True)
    for idx, art in enumerate(data['thumbnail_candidates'], 1):
        path = validate_asset(art, root, slug)
        cairosvg.svg2png(url=str(path), write_to=str(output / f'thumbnail-candidate-{idx}.png'), output_width=1080, output_height=1920)
    with tempfile.TemporaryDirectory(prefix='horror-factory-') as work_dir:
        work=Path(work_dir)
        timeline=work/'story-timeline.json'
        timeline.write_text(json.dumps([{'id':s['id'],'narration':s['narration']} for s in data['scenes']],ensure_ascii=False),encoding='utf8')
        audio_dir=work/'vbee'
        run_command([sys.executable,str(root/'scripts/gen-story-vbee-batch.py'), '--timeline',str(timeline),
                     '--out-dir',str(audio_dir),'--voice-code',VOICE],cwd=root)
        details=json.loads((audio_dir/'measured-timeline.json').read_text(encoding='utf8'))
        if len(details)!=len(data['scenes']) or any(t.get('voice_code')!=VOICE for t in details):
            raise FactoryBlocked('Voice proof missing or incorrect Vbee narrator')
        durations=[float(x['audio_seconds']) for x in details]
        if sum(durations)>60 or sum(durations)<10:
            raise FactoryBlocked('Measured narration outside 10–60s Shorts limit')
        clips=[]
        for i,scene in enumerate(data['scenes']):
            source=validate_asset(scene['art'],root,slug)
            still=work/f'art-{i+1:02d}.png'
            cairosvg.svg2png(url=str(source),write_to=str(still),output_width=1080,output_height=1920)
            mp3=audio_dir/('s'+str(scene['id'])+'.mp3')
            if not mp3.is_file() or hashlib.sha256(mp3.read_bytes()).hexdigest()!=details[i].get('sha256'):
                raise FactoryBlocked('Vbee MP3 or source SHA-256 mismatch')
            clip=work/f'segment-{i+1:02d}.mp4'
            seconds=durations[i]
            run_command(['ffmpeg','-y','-v','error','-loop','1','-framerate','30','-i',str(still),'-i',str(mp3),
                         '-t',str(seconds),'-vf',"zoompan=z='min(zoom+0.0003,1.10)':d=1:s=1080x1920:fps=30",
                         '-r','30','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p',
                         '-c:a','aac','-b:a','192k','-movflags','+faststart',str(clip)],cwd=root)
            clips.append(clip)
        concat=work/'files.txt'
        concat.write_text(''.join("file '"+str(path)+"'\n" for path in clips),encoding='utf8')
        final=output/'video-final.mp4'
        run_command(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(concat),
                     '-c','copy','-movflags','+faststart',str(final)],cwd=root)
        probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(final)]))
        video=next((x for x in probe['streams'] if x.get('codec_type')=='video'),None)
        audio=next((x for x in probe['streams'] if x.get('codec_type')=='audio'),None)
        seconds=float(probe['format']['duration'])
        if not video or not audio or (video['width'],video['height'])!=(1080,1920) or not 10<=seconds<=60.05:
            raise FactoryBlocked('Final media QA failed: streams, dimensions or 60s duration')
        run_command(['ffmpeg','-v','error','-i',str(final),'-f','null','-'],cwd=root)
        receipt={
            'status':'MEDIA_READY_FOR_INDEPENDENT_QA',
            'slug':slug,'video_path':str(final),'video_sha256':hashlib.sha256(final.read_bytes()).hexdigest(),
            'duration_seconds':round(seconds,3),'voice_code':VOICE,'scene_count':len(clips),
            'publish_public':False,
            'note':'Technical decode is not independent visual, story or packaging QA; no Drive or Public publish done.'
        }
        (output/'render-receipt.json').write_text(json.dumps(receipt,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
        return receipt


def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--manifest',type=Path,required=True)
    ap.add_argument('--execute',action='store_true',help='Spend real Vbee quota and render an MP4; never publish')
    ap.add_argument('--out-dir',type=Path,default=Path('out/horror-factory'))
    args=ap.parse_args()
    root=Path(__file__).resolve().parents[1]
    try:
        path=args.manifest.resolve()
        if not path.is_relative_to((root/'production/horror-queue').resolve()) or path.suffix!='.json':
            raise FactoryBlocked('Manifest must be under production/horror-queue')
        data=json.loads(path.read_text(encoding='utf8'))
        validate_manifest(data,root)
        if args.execute:
            receipt=render_from_manifest(data,root,args.out_dir.resolve()/data['slug'])
        else:
            receipt={'status':'PREFLIGHT_PASS_NOT_RENDERED','slug':data['slug'],'publish_public':False}
        print(json.dumps(receipt,ensure_ascii=False,indent=2))
    except (FactoryBlocked,ValueError,FileNotFoundError) as exc:
        ap.exit(2,'BLOCKED: '+str(exc)+'\n')

if __name__=='__main__':
    main()
