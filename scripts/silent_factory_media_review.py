#!/usr/bin/env python3
"""Validate evidence from a real independent audio+visual film reviewer.

IMPORTANT: This validator is not itself a semantic VLM. If no independently
executed reviewer evidence exists, status is REVIEWER_UNAVAILABLE, never PASS.
A contact sheet or full technical FFmpeg decode is not a creative review.
"""
from __future__ import annotations
import re

class MediaReviewBlocked(ValueError):
    pass

SHA = re.compile(r'^[a-f0-9]{64}$')


def _require(condition: bool, text: str):
    if not condition:
        raise MediaReviewBlocked(text)


def verify_review(technical: dict, semantic: dict | None, shot_ids: list[str]) -> dict:
    _require(technical.get('all_video_frames_decoded') is True and
             technical.get('all_audio_decoded') is True, 'Full media decode required')
    sha = technical.get('movie_sha256')
    _require(isinstance(sha, str) and SHA.fullmatch(sha) is not None,
             'Technical movie SHA missing')
    _require(technical.get('width') == 2560 and technical.get('height') == 1440 and
             technical.get('fps') == 30 and 180 <= technical.get('duration_seconds', 0) <= 240,
             'Technical media specs outside FINAL contract')
    if semantic is None:
        return {'status':'REVIEWER_UNAVAILABLE','creative_qa_passed':False,
                'reviewed_video_sha256':sha,'independent_full_media_reviewed':False,
                'blocker':'No actual semantic audio-visual reviewer execution recorded'}
    _require(isinstance(semantic, dict) and semantic.get('provider') not in {None,'producer','self','technical_qa'}
             and isinstance(semantic.get('reviewer_id'), str) and len(semantic['reviewer_id']) >= 5
             and isinstance(semantic.get('method'), str) and len(semantic['method']) >= 25,
             'A distinct independent reviewer and documented method are mandatory')
    _require(semantic.get('actual_encoded_media') is True and
             semantic.get('reviewed_video_sha256') == sha,
             'Reviewer SHA must bind to the exact actual encoded MP4')
    shots = semantic.get('shots')
    _require(isinstance(shots, list) and len(shots) == len(shot_ids)
             and {s.get('id') for s in shots} == set(shot_ids),
             'Independent review must cover every story shot')
    duration = float(technical['duration_seconds'])
    for idx, shot in enumerate(shots):
        _require(shot.get('visual_assessed') is True and shot.get('motion_assessed') is True,
                 f'Shot {shot.get("id")} visual/motion review missing')
        _require(isinstance(shot.get('start'), (float, int)) and
                 isinstance(shot.get('end'), (float, int)) and
                 0 <= shot['start'] < shot['end'] <= duration + 0.2,
                 'Shot time range outside actual video')
    audio = semantic.get('audio_sections')
    _require(isinstance(audio, list) and len(audio) >= 5 and
             all(x.get('assessed') is True for x in audio),
             'Complete audio review of all five story phases required')
    intervals = sorted((x['start'], x['end']) for x in audio)
    _require(abs(intervals[0][0]) < 0.2 and abs(intervals[-1][1] - duration) < 0.25 and
             all(prev[1] >= nxt[0] - 0.2 for prev, nxt in zip(intervals, intervals[1:])),
             'Audio review does not cover whole movie')
    _require(isinstance(semantic.get('caption_cues_reviewed'), int) and
             semantic['caption_cues_reviewed'] >= technical.get('caption_highlights_supplied', 999),
             'English caption cues were not all independently reviewed')
    _require(semantic.get('rights_verified') is True, 'Media rights verification missing')
    _require(type(semantic.get('creative_passed')) is bool, 'Independent creative verdict missing')
    defects = semantic.get('defects')
    _require(isinstance(defects, list), 'Defect list must be explicit')
    if not semantic['creative_passed']:
        _require(len(defects) > 0 and all(isinstance(d.get('timecode'), (float, int)) and
                 0 <= d['timecode'] < duration and d.get('shot_id') in shot_ids for d in defects),
                 'Creative FAIL requires concrete timecoded defects')
    elif defects:
        _require(not any(d.get('severity') in {'blocker', 'major'} for d in defects),
                 'Cannot PASS with unresolved Blocker or Major defects')
    return {'status':'CREATIVE_PASS' if semantic['creative_passed'] else 'CREATIVE_FAIL',
            'creative_qa_passed':semantic['creative_passed'],
            'reviewed_video_sha256':sha,'independent_full_media_reviewed':True,
            'reviewer_id':semantic['reviewer_id'],'method':semantic['method'],
            'defects':defects, 'all_shots_reviewed':True, 'audio_reviewed':True,
            'rights_verified':True, 'caption_cues_reviewed':semantic['caption_cues_reviewed']}