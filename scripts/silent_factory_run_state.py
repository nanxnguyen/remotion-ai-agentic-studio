#!/usr/bin/env python3
"""Fail-closed, deterministic state transitions for one Silent Factory film.

GitHub Actions owns execution; a durable issue/artifact receipt is the backing
store.  The transition function never performs remote actions itself.
"""
from __future__ import annotations
import copy
import json
import re
from datetime import date

OLISE_ID = 'UCY3n3Nlqyo6uI4GU8nuX-5g'
SHA_RE = re.compile(r'^[a-f0-9]{64}$')
SLUG_RE = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')

class InvalidTransition(ValueError):
    pass


def _require(condition: bool, message: str) -> None:
    if not condition:
        raise InvalidTransition(message)


def _sha(value: object) -> bool:
    return isinstance(value, str) and SHA_RE.fullmatch(value) is not None


def make_run_key(local_date: str, film_slug: str) -> str:
    try:
        normalized = date.fromisoformat(local_date).isoformat()
    except ValueError as exc:
        raise ValueError('Expected YYYY-MM-DD') from exc
    if not SLUG_RE.fullmatch(film_slug):
        raise ValueError('Unsafe film slug')
    return normalized + '/' + film_slug


def new_run(local_date: str, film_slug: str, manifest_sha: str) -> dict:
    if not _sha(manifest_sha):
        raise ValueError('Expected SHA-256 of actual manifest')
    return {'schema': 1, 'run_key': make_run_key(local_date, film_slug),
            'status': 'CREATED', 'attempt': 0, 'original_manifest_sha': manifest_sha,
            'last_manifest_sha': manifest_sha, 'last_video_sha': None,
            'distinct_video_hashes': [], 'history': []}


def transition(record: dict, event: str, evidence: dict) -> dict:
    if not isinstance(evidence, dict):
        raise InvalidTransition('Event evidence must be structured')
    old = record['status']
    history = record.get('history', [])
    if history and history[-1]['event'] == event and history[-1]['evidence'] == evidence:
        return copy.deepcopy(record)  # repeat webhook; never duplicate side effects
    doc = copy.deepcopy(record)
    next_status = None
    if event == 'SCRIPT_PASS':
        _require(old == 'CREATED', 'Script gate requires a new run')
        _require(isinstance(evidence.get('score'), (int, float)) and evidence['score'] >= 85 and
                 _sha(evidence.get('audit_sha')), 'Script audit must be evidenced and >=85')
        next_status = 'SCRIPT_AUDITED'
    elif event == 'RENDER_START':
        _require(old == 'SCRIPT_AUDITED' and _sha(evidence.get('manifest_sha')), 'Render requires audited manifest')
        doc['last_manifest_sha'] = evidence['manifest_sha']
        next_status = 'RENDERING'
    elif event == 'RENDER_COMPLETE':
        _require(old == 'RENDERING', 'No active render')
        _require(_sha(evidence.get('movie_sha')) and type(evidence.get('artifact_id')) is int and
                 evidence['artifact_id'] > 0 and evidence.get('all_frames_decoded') is True,
                 'Full encoded movie and artifact required')
        if evidence['movie_sha'] in doc['distinct_video_hashes']:
            raise InvalidTransition('Cannot count unchanged MP4 as new repair')
        doc['last_video_sha'] = evidence['movie_sha']
        doc['distinct_video_hashes'].append(evidence['movie_sha'])
        doc['last_artifact_id'] = evidence['artifact_id']
        next_status = 'TECH_QA_PASSED'
    elif event == 'REVIEW_START':
        _require(old == 'TECH_QA_PASSED' and evidence.get('reviewed_sha') == doc.get('last_video_sha'),
                 'Reviewer must inspect exact encoded MP4 SHA')
        next_status = 'CREATIVE_REVIEW'
    elif event == 'REVIEW_FAIL':
        _require(old == 'CREATIVE_REVIEW' and evidence.get('reviewed_sha') == doc.get('last_video_sha')
                 and bool(evidence.get('defects')), 'Concrete timecoded defects required')
        next_status = 'REPAIR_PENDING'
    elif event == 'REVIEW_PASS':
        _require(old == 'CREATIVE_REVIEW' and evidence.get('reviewed_sha') == doc.get('last_video_sha')
                 and evidence.get('all_shots_reviewed') is True and evidence.get('audio_reviewed') is True
                 and evidence.get('rights_verified') is True, 'Real full-media/rights review required')
        doc['creative_qa_passed'] = True
        next_status = 'RELEASE_CLEARED'
    elif event == 'REPAIR_START':
        _require(old == 'REPAIR_PENDING' and doc['attempt'] < 5, 'Maximum 5 real repair renders')
        _require(_sha(evidence.get('manifest_sha')) and evidence['manifest_sha'] != doc['last_manifest_sha'],
                 'Must change the actual source manifest for a repair')
        doc['attempt'] += 1
        doc['last_manifest_sha'] = evidence['manifest_sha']
        next_status = 'RENDERING'
    elif event == 'PRIVATE_CREATIVE_OVERRIDE':
        _require(old == 'REPAIR_PENDING' and doc['attempt'] == 5,
                 'Private creative override only after all five attempts')
        _require(len(doc['distinct_video_hashes']) == 6 and
                 len(set(doc['distinct_video_hashes'])) == 6 and
                 evidence.get('all_hard_gates_passed') is True and
                 evidence.get('independent_full_media_reviewed') is True,
                 'Every real render and independent full-media hard QA is mandatory')
        doc['creative_qa_passed'] = False
        doc['creative_qa_override'] = True
        next_status = 'RELEASE_CLEARED'
    elif event == 'DRIVE_UPLOAD_COMPLETE':
        _require(old == 'RELEASE_CLEARED' and evidence.get('verified_sha') == doc.get('last_video_sha')
                 and evidence.get('mime_type') == 'video/mp4' and
                 bool(evidence.get('video_drive_id')) and bool(evidence.get('thumbnail_drive_id')) and
                 evidence['video_drive_id'] != evidence['thumbnail_drive_id'],
                 'Verified binary Drive MP4 and thumbnail IDs required')
        doc['drive'] = {k: evidence[k] for k in ('video_drive_id', 'thumbnail_drive_id', 'verified_sha')}
        next_status = 'DRIVE_STAGED'
    elif event == 'PREFLIGHT_PASS':
        _require(old == 'DRIVE_STAGED' and evidence.get('channel_id') == OLISE_ID
                 and evidence.get('privacy') == 'private' and evidence.get('sha') == doc['last_video_sha'],
                 'Correct Olise Private preflight and SHA required')
        next_status = 'PRIVATE_PREFLIGHT'
    elif event == 'UPLOAD_STARTED':
        _require(old == 'PRIVATE_PREFLIGHT', 'Private preflight must pass first')
        next_status = 'UPLOADING_PRIVATE'
    elif event == 'UPLOAD_SUCCESS':
        _require(old == 'UPLOADING_PRIVATE' and evidence.get('channel_id') == OLISE_ID
                 and evidence.get('privacy') == 'private' and
                 isinstance(evidence.get('youtube_video_id'), str) and
                 re.fullmatch(r'[A-Za-z0-9_-]{11}', evidence['youtube_video_id']) is not None,
                 'YouTube must confirm actual Private video ID on pinned channel')
        doc['youtube_video_id'] = evidence['youtube_video_id']
        next_status = 'UPLOADED_PRIVATE'
    elif event == 'FAIL_RETRYABLE':
        _require(old not in {'UPLOADED_PRIVATE', 'BLOCKED_HARD_GATE', 'FAILED_RETRYABLE'}
                 and isinstance(evidence.get('code'), str) and evidence['code'],
                 'Invalid retryable failure event')
        doc['resume_state'] = 'PRIVATE_PREFLIGHT' if old == 'UPLOADING_PRIVATE' else old
        next_status = 'FAILED_RETRYABLE'
    elif event == 'FAIL_HARD':
        _require(old != 'UPLOADED_PRIVATE' and bool(evidence.get('code')), 'Invalid hard failure')
        next_status = 'BLOCKED_HARD_GATE'
    else:
        raise InvalidTransition('Unknown event')
    doc['status'] = next_status
    doc['history'].append({'event': event, 'evidence': copy.deepcopy(evidence), 'state': next_status})
    return doc


def resume(record: dict) -> dict:
    if record['status'] != 'FAILED_RETRYABLE':
        raise InvalidTransition('Only a retryable failure can be resumed')
    doc = copy.deepcopy(record)
    doc['status'] = doc.pop('resume_state')
    doc['history'].append({'event': 'RESUME', 'evidence': {}, 'state': doc['status']})
    return doc


def dumps(record: dict) -> str:
    return json.dumps(record, ensure_ascii=False, sort_keys=True, indent=2)