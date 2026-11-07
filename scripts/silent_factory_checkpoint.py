#!/usr/bin/env python3
"""Persist audited render lifecycle to a per-film GitHub Issue.

Run inside Actions with GITHUB_TOKEN (issues:write) and serialized concurrency.
The source manifest and independent script audit must both exist and be hashed.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import os
import re
import sys
from datetime import date
from pathlib import Path
from scripts.silent_factory_run_state import new_run, transition, resume, InvalidTransition
from scripts.silent_factory_issue_state import GitHubIssueStore

class CheckpointBlocked(ValueError):
    pass


def run_key_for_job(path: Path) -> str:
    name=Path(path).stem
    prefix=re.fullmatch(r'(\d{8})-([a-z0-9]+(?:-[a-z0-9]+)*)',name)
    suffix=re.fullmatch(r'([a-z0-9]+(?:-[a-z0-9]+)*)-(\d{8})',name)
    if prefix:
        day,slug=prefix.groups()
    elif suffix:
        slug,day=suffix.groups()
    else:
        raise CheckpointBlocked('Job filename needs YYYYMMDD-slug or slug-YYYYMMDD')
    try:
        day=date.fromisoformat(day[:4]+'-'+day[4:6]+'-'+day[6:]).isoformat()
    except ValueError as e:
        raise CheckpointBlocked('Invalid job date') from e
    return day+'/'+slug


def _hash(path: Path) -> str:
    h=hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda:stream.read(4*1024*1024),b''):
            h.update(chunk)
    return h.hexdigest()


def _audit(job: Path, root: Path) -> tuple[dict,str]:
    source=json.loads(job.read_text(encoding='utf-8'))
    marker=source.get('script_audit')
    if not isinstance(marker,dict):
        raise CheckpointBlocked('Missing independent script_audit evidence')
    path=marker.get('path')
    if not isinstance(path,str) or not re.fullmatch(r'config/silent-factory/audits/[a-z0-9-]+\.json',path):
        raise CheckpointBlocked('Invalid script audit report path')
    report=(root/path).resolve()
    if not report.is_relative_to(root.resolve()) or not report.is_file():
        raise CheckpointBlocked('Script audit report not present in checked-out repository')
    sha=_hash(report)
    if sha!=marker.get('report_sha'):
        raise CheckpointBlocked('Script audit SHA does not match actual report')
    audit=json.loads(report.read_text(encoding='utf-8'))
    for key,floor in [('quality',85),('growth',38),('hook',12),('logic',12)]:
        value=audit.get(key)
        if type(value) not in (int,float) or value < floor:
            raise CheckpointBlocked(f'Script audit {key} below required threshold {floor}')
    if audit.get('blockers')!=0 or audit.get('majors')!=0:
        raise CheckpointBlocked('Script audit has unresolved blockers or major defects')
    if not isinstance(audit.get('auditor'),str) or audit['auditor'] in ('producer','self',''):
        raise CheckpointBlocked('Independent animation script auditor required')
    return audit,sha


def start_job(store, job: Path, *, root: Path | None=None) -> dict:
    base=(root or Path(__file__).resolve().parents[1]).resolve()
    audit,audit_sha=_audit(job,base)
    key=run_key_for_job(job)
    job_sha=_hash(job)
    doc=json.loads(job.read_text(encoding='utf-8'))
    prior=store.load(key)
    try:
        if prior is None:
            if doc.get('revision')!=0:
                raise CheckpointBlocked('First job must use revision 0')
            run=new_run(*key.split('/',1),job_sha)
            run=transition(run,'SCRIPT_PASS',{'score':audit['quality'],'audit_sha':audit_sha})
            run=transition(run,'RENDER_START',{'manifest_sha':job_sha})
        else:
            run=prior
            if run['status']=='FAILED_RETRYABLE':
                run=resume(run)
            if run['status']=='RENDERING' and run.get('last_manifest_sha')==job_sha:
                return run  # repeated delivery; do not double-increment
            if run['status']!='REPAIR_PENDING' or doc.get('revision')!=run['attempt']+1:
                raise CheckpointBlocked('Incorrect repair status or revision; no duplicate render allowed')
            run=transition(run,'REPAIR_START',{'manifest_sha':job_sha})
    except InvalidTransition as e:
        raise CheckpointBlocked(str(e)) from e
    store.save(run)
    return run


def finish_render(store, job: Path, technical: dict, artifact_id: int, *, root: Path | None=None) -> dict:
    key=run_key_for_job(job)
    previous=store.load(key)
    if previous is None:
        raise CheckpointBlocked('No corresponding audited render checkpoint')
    job_sha=_hash(job)
    if previous.get('last_manifest_sha')!=job_sha:
        raise CheckpointBlocked('Render manifest SHA changed since checkpoint creation')
    movie_sha=technical.get('movie_sha256')
    if previous['status']=='TECH_QA_PASSED' and previous.get('last_video_sha')==movie_sha and previous.get('last_artifact_id')==artifact_id:
        return previous
    if technical.get('all_video_frames_decoded') is not True or technical.get('all_audio_decoded') is not True:
        raise CheckpointBlocked('Complete actual encoded film+audio decode evidence required')
    try:
        doc=transition(previous,'RENDER_COMPLETE',{'movie_sha':movie_sha,'artifact_id':artifact_id,
                                                    'all_frames_decoded':True})
    except InvalidTransition as e:
        raise CheckpointBlocked(str(e)) from e
    store.save(doc)
    return doc


def main() -> None:
    ap=argparse.ArgumentParser()
    ap.add_argument('--phase',required=True,choices=('start','complete'))
    ap.add_argument('--job',required=True,type=Path)
    ap.add_argument('--report',type=Path)
    ap.add_argument('--artifact-id',type=int)
    args=ap.parse_args()
    token=os.environ.get('GITHUB_TOKEN')
    repo=os.environ.get('GITHUB_REPOSITORY','')
    if not token or not repo:
        raise CheckpointBlocked('No scoped GitHub Issue checkpoint credentials')
    store=GitHubIssueStore(repo,token)
    if args.phase=='start':
        state=start_job(store,args.job)
    else:
        if not args.report or not args.artifact_id:
            raise CheckpointBlocked('Complete requires technical report and positive artifact ID')
        state=finish_render(store,args.job,json.loads(args.report.read_text(encoding='utf-8')),args.artifact_id)
    print(json.dumps({'run_key':state['run_key'],'status':state['status'],
                      'attempt':state['attempt'],'artifact_id':state.get('last_artifact_id')}))

if __name__=='__main__':
    try:main()
    except (CheckpointBlocked,OSError,ValueError) as e:
        print('SILENT_FACTORY_CHECKPOINT_BLOCKED: '+str(e)[:400],file=sys.stderr)
        raise SystemExit(1)