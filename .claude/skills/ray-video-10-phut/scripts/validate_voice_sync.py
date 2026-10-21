#!/usr/bin/env python3
"""Check declared voice evidence, not audio content or reviewer honesty.

All intervals are global, half-open frame ranges. audio_seconds is the measured
playable duration after trims. This supplements, never replaces, pipeline gates.
"""
import argparse
import hashlib
import json
import math
import re
from pathlib import Path


def validate(data):
    errors = []

    def require(condition, message):
        if not condition:
            errors.append(message)

    def number(value):
        return (type(value) in (int, float) and abs(value) <= 2**53 - 1
                and math.isfinite(value))

    def frame(value):
        return type(value) is int and 0 <= value <= 2**53 - 1

    def identifier(value):
        return isinstance(value, str) and bool(value.strip())

    def digest(value):
        return isinstance(value, str) and re.fullmatch(r'[0-9a-f]{64}', value)

    if not isinstance(data, dict):
        return ['Evidence must be an object']
    fps, duration = data.get('fps'), data.get('duration_frames')
    if not number(fps) or fps <= 0 or not frame(duration) or duration == 0:
        return ['Positive finite fps and positive integer duration_frames required']
    require(digest(data.get('mp4_sha256')), 'Invalid MP4 SHA256')
    speakers, shots = data.get('speakers'), data.get('shots')
    utterances, review = data.get('utterances'), data.get('review')
    if not isinstance(speakers, dict) or not speakers or not isinstance(shots, dict) or not shots:
        return errors + ['Nonempty speakers and shots required']
    if not isinstance(utterances, list) or not utterances or not isinstance(review, dict):
        return errors + ['Nonempty utterances and review required']
    for sid, speaker in speakers.items():
        require(identifier(sid) and isinstance(speaker, dict) and identifier(speaker.get('voice_id')),
                f'{sid}: nonempty string speaker/voice_id required')
    for sid, shot in shots.items():
        require(identifier(sid), 'Nonempty string shot ID required')
        if not isinstance(shot, dict):
            errors.append(f'{sid}: invalid shot')
            continue
        a, b = shot.get('start_frame'), shot.get('end_frame')
        require(frame(a) and frame(b) and a < b <= duration, f'{sid}: invalid shot interval')
        visible = shot.get('visible_speakers')
        require(isinstance(visible, list) and all(isinstance(s, str) and s in speakers for s in visible),
                f'{sid}: visible_speakers must reference known speakers')
    seen, intervals = set(), []
    for u in utterances:
        if not isinstance(u, dict):
            errors.append('Invalid utterance')
            continue
        uid = u.get('id')
        if not isinstance(uid, str) or not uid or uid in seen:
            errors.append('Missing or duplicate utterance ID')
        else:
            seen.add(uid)
        require(isinstance(u.get('text'), str) and bool(u['text'].strip()), f'{uid}: text required')
        speaker = speakers.get(u.get('speaker')) if isinstance(u.get('speaker'), str) else None
        require(isinstance(speaker, dict) and speaker.get('voice_id') == u.get('voice_id'), f'{uid}: wrong speaker/voice')
        shot = shots.get(u.get('shot')) if isinstance(u.get('shot'), str) else None
        require(isinstance(shot, dict), f'{uid}: unknown shot')
        mode = u.get('mode')
        require(mode in ('on-screen', 'off-screen', 'narrator', 'reaction'), f'{uid}: invalid picture mode')
        if mode == 'on-screen':
            visible = shot.get('visible_speakers', []) if isinstance(shot, dict) else []
            require(isinstance(visible, list) and u.get('speaker') in visible, f'{uid}: speaker absent from picture')
        else:
            require(isinstance(u.get('picture_reason'), str) and bool(u['picture_reason'].strip()), f'{uid}: picture_reason required')
        a, b = u.get('start_frame'), u.get('end_frame')
        if not frame(a) or not frame(b) or not a < b <= duration:
            errors.append(f'{uid}: invalid utterance interval')
            continue
        intervals.append((a, b))
        if isinstance(shot, dict) and frame(shot.get('start_frame')) and frame(shot.get('end_frame')):
            require(shot['start_frame'] <= a < b <= shot['end_frame'], f'{uid}: outside mapped shot')
        seconds = u.get('audio_seconds')
        require(number(seconds) and seconds > 0 and abs((b-a) - math.ceil(seconds*fps)) <= 1,
                f'{uid}: missing or mismatched measured audio duration')
        require(digest(u.get('audio_sha256')), f'{uid}: invalid audio SHA256')
        ca, cb = u.get('caption_start_frame'), u.get('caption_end_frame')
        require(frame(ca) and frame(cb) and ca < cb <= duration and
                abs(ca-a)/fps <= 0.1 and abs(cb-b)/fps <= 0.1, f'{uid}: caption drift')
    intervals.sort()
    require(all(left[1] <= right[0] for left, right in zip(intervals, intervals[1:])), 'Unplanned dialogue overlap')
    require(review.get('listened') is True, 'Final listening pending')
    require(isinstance(review.get('listener'), str) and bool(review['listener'].strip()), 'Listener required')
    require(digest(review.get('mp4_sha256')) and review['mp4_sha256'] == data.get('mp4_sha256'), 'Stale listening fingerprint')
    for dimension in ('naturalness', 'emotion', 'character_fit', 'smooth_joins'):
        require(review.get(dimension) == 'pass', f'Listening dimension not passed: {dimension}')
    require(review.get('issues') == [], 'Unresolved or missing issue list')
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('evidence', type=Path)
    parser.add_argument('--mp4', type=Path, help='Verify actual output bytes against the reviewed fingerprint')
    args = parser.parse_args()
    try:
        data = json.loads(args.evidence.read_text(encoding='utf-8'))
        errors = validate(data)
        if args.mp4 is not None and not errors:
            with args.mp4.open('rb') as source:
                actual = hashlib.file_digest(source, 'sha256').hexdigest()
            if args.mp4.stat().st_size == 0 or actual != data['mp4_sha256']:
                errors.append('Actual MP4 fingerprint differs from reviewed output')
    except (OSError, ValueError) as exc:
        errors = [str(exc)]
    print('\n'.join(errors) if errors else 'PASS: voice evidence checks (audio perception and media decoding not verified)')
    return 1 if errors else 0


if __name__ == '__main__':
    raise SystemExit(main())
