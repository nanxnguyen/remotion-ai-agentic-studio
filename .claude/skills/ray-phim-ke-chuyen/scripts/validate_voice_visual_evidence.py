"""Ray V0.2.9: structural preflight for manually reviewed voice→action→image evidence.

This script verifies manifest completeness, not that pixels actually depict an action.
Human inspection of the rendered frames/video is separately mandatory.
"""
from __future__ import annotations
import argparse
import json
from pathlib import Path

PHASES = ('HOOK', 'BODY', 'CLIMAX', 'PAYOFF')
REQUIRED_STRINGS = ('id', 'narration', 'expected_visible_action',
                    'observable_evidence', 'asset_ref', 'review_frame_ref')


def validate(manifest: dict, assets_root: Path | None = None) -> list[str]:
    errors = []
    if not isinstance(manifest, dict):
        return ['manifest must be JSON object']
    try:
        duration = float(manifest.get('duration_sec', 0))
    except (TypeError, ValueError):
        return ['duration_sec must be numeric']
    if not 0 < duration <= 60:
        errors.append('duration_sec must be >0 and <=60')
    beats = manifest.get('beats')
    if not isinstance(beats, list) or not beats:
        return errors + ['beats must be a nonempty list']
    ids, seen_phases = set(), set()
    last_start = -1
    for i, beat in enumerate(beats, 1):
        prefix = f'beat[{i}]'
        if not isinstance(beat, dict):
            errors.append(f'{prefix} must be an object')
            continue
        for field in REQUIRED_STRINGS:
            value = beat.get(field)
            if not isinstance(value, str) or len(value.strip()) < 2:
                errors.append(f'{prefix}.{field} is required, >=2 characters')
        beat_id = beat.get('id')
        if beat_id in ids:
            errors.append(f'{prefix}.id duplicate: {beat_id}')
        ids.add(beat_id)
        phase = beat.get('phase')
        if phase not in PHASES:
            errors.append(f'{prefix}.phase must be one of {PHASES}')
        else:
            seen_phases.add(phase)
        if beat.get('observable_evidence', '').strip().lower() == beat.get('narration', '').strip().lower():
            errors.append(f'{prefix}.observable_evidence must describe visible proof, not the narration')
        if beat.get('review_status') != 'visually_verified':
            errors.append(f'{prefix}.review_status must be visually_verified (human frame review required)')
        try:
            start, end, moment = (float(beat[k]) for k in ('start_sec', 'end_sec', 'evidence_time_sec'))
            if start < 0 or end <= start or end > duration + 0.001:
                errors.append(f'{prefix} invalid start_sec/end_sec for movie duration')
            if start < last_start:
                errors.append(f'{prefix} beats must be ordered by start_sec')
            if not start <= moment <= end:
                errors.append(f'{prefix}.evidence_time_sec is outside scene')
            last_start = start
        except (KeyError, TypeError, ValueError):
            errors.append(f'{prefix} start_sec/end_sec/evidence_time_sec must be numeric')
        if assets_root is not None:
            for field in ('asset_ref', 'review_frame_ref'):
                value = beat.get(field)
                if isinstance(value, str) and value.strip():
                    f = (assets_root / value).resolve()
                    if not f.is_relative_to(assets_root.resolve()) or not f.is_file():
                        errors.append(f'{prefix}.{field} missing or unsafe: {value}')
    for phase in PHASES:
        if phase not in seen_phases:
            errors.append(f'phase {phase} missing')
    return errors


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('manifest', type=Path, help='voice-visual-evidence.json')
    p.add_argument('--assets-root', type=Path, help='If given, require each referenced asset/review image to exist')
    a = p.parse_args()
    try:
        data = json.loads(a.manifest.read_text(encoding='utf8'))
    except (OSError, json.JSONDecodeError) as exc:
        print(f'FAIL: {exc}')
        return 1
    errors = validate(data, a.assets_root)
    if errors:
        for error in errors:
            print('FAIL:', error)
        print(f'REJECTED — {len(errors)} structural issue(s). Manual pixel/audio QA still required.')
        return 1
    print(f'STRUCTURE PASS — {len(data["beats"])} beats mapped; manually review actual video/audio before FINAL.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
