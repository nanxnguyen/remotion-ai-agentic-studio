#!/usr/bin/env python3
"""Fail-closed structural preflight for new Vietnamese 9:16 storytelling Shorts.

This tests machine-checkable storyboard and real-voice metadata ONLY; cinematic
acting, lip-sync, emotional delivery, audio listening and visual QA need review.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

PHASES = ('HOOK', 'BODY', 'CLIMAX', 'ENDING')
REQUIRED = ('id', 'phase', 'start_sec', 'duration_sec', 'narration', 'speaker',
            'visual', 'emotion', 'action', 'camera', 'motion',
            'caption_beats', 'action_beats', 'transition_out')
EPS = .06


def load_json(path: Path):
    with path.open(encoding='utf-8') as f:
        return json.load(f)


def scene_collection(value, path: str):
    if isinstance(value, dict):
        value = value.get('scenes', value.get('timeline'))
    if not isinstance(value, list) or not value:
        raise ValueError(f'{path}: expected non-empty list or object with scenes[]')
    return value


def as_num(v, tag: str, errors: list[str]) -> float:
    if isinstance(v, bool) or not isinstance(v, (int, float)):
        errors.append(f'{tag}: expected numeric seconds')
        return 0.0
    return float(v)


def validate(scenes: list, *, max_seconds: float, voice=None,
             asset_root: Path | None = None, check_assets=False,
             final_checklist=None):
    errors: list[str] = []
    warnings: list[str] = []
    total = 0.0
    last_phase_rank = -1
    seen = set()
    by_id = {}
    if voice is not None:
        try:
            arr = scene_collection(voice, 'voice manifest')
            by_id = {int(x['id']): x for x in arr}
        except (TypeError, ValueError, KeyError) as ex:
            errors.append(f'Voice manifest invalid: {ex}')
    for index, scene in enumerate(scenes, 1):
        name = f'Scene {index}'
        if not isinstance(scene, dict):
            errors.append(f'{name}: scene must be object')
            continue
        for key in REQUIRED:
            if key not in scene:
                errors.append(f'{name}: missing {key}')
        if scene.get('id') != index:
            errors.append(f'{name}: id must equal {index} (1..N ordered)')
        if scene.get('id') in seen:
            errors.append(f'{name}: duplicate id')
        seen.add(scene.get('id'))
        phase = str(scene.get('phase', '')).upper()
        if phase not in PHASES:
            errors.append(f'{name}: phase must be one of {PHASES}')
        else:
            rank = PHASES.index(phase)
            if rank < last_phase_rank:
                errors.append(f'{name}: phase goes backwards')
            last_phase_rank = rank
        start = as_num(scene.get('start_sec'), f'{name}.start_sec', errors)
        dur = as_num(scene.get('duration_sec'), f'{name}.duration_sec', errors)
        if abs(start-total) > EPS:
            errors.append(f'{name}: starts {start:.2f}s, expected continuous {total:.2f}s')
        if dur <= 0:
            errors.append(f'{name}: duration_sec must be > 0')
        total = max(total, start + dur)
        for field in ['narration', 'speaker', 'visual', 'emotion', 'action', 'camera', 'motion']:
            val = scene.get(field)
            if not isinstance(val, str) or len(val.strip()) < 2:
                errors.append(f'{name}: {field} must be descriptive nonempty string')
        if index < len(scenes):
            val = scene.get('transition_out')
            if not isinstance(val, str) or not val.strip():
                errors.append(f'{name}: explicit transition_out required for boundary')
        elif scene.get('transition_out') not in ('cut-to-black', 'fade-to-black', 'end'):
            warnings.append(f'{name}: ending should explicitly hold/cut-to-black')
        captions = scene.get('caption_beats')
        if not isinstance(captions, list) or not captions:
            errors.append(f'{name}: caption_beats must contain phrase-level captions')
        else:
            for k, cap in enumerate(captions, 1):
                label = f'{name}.caption_beats[{k}]'
                if not isinstance(cap, dict):
                    errors.append(f'{label}: expected object')
                    continue
                t = cap.get('text')
                if not isinstance(t, str) or not t.strip():
                    errors.append(f'{label}: text empty')
                    continue
                if len(t) > 48:
                    warnings.append(f'{label}: {len(t)} characters, consider <=48')
                if t.count('\n') > 1:
                    errors.append(f'{label}: maximum 2 lines')
                a = as_num(cap.get('start'), f'{label}.start', errors)
                b = as_num(cap.get('end'), f'{label}.end', errors)
                if a < -EPS or b <= a or b > dur+EPS:
                    errors.append(f'{label}: local caption time must fit scene duration')
        beats = scene.get('action_beats')
        if not isinstance(beats, list) or not beats:
            errors.append(f'{name}: action_beats required (voice/action/emotion sync)')
        else:
            for k, beat in enumerate(beats, 1):
                label = f'{name}.action_beats[{k}]'
                if not isinstance(beat, dict):
                    errors.append(f'{label}: expected object')
                    continue
                for fld in ('action', 'emotion', 'voice_cue'):
                    if not isinstance(beat.get(fld), str) or len(beat[fld].strip()) < 2:
                        errors.append(f'{label}: missing {fld}')
                a = as_num(beat.get('start'), f'{label}.start', errors)
                b = as_num(beat.get('end'), f'{label}.end', errors)
                if a < -EPS or b <= a or b > dur+EPS:
                    errors.append(f'{label}: action beat exceeds scene duration')
        if voice is not None:
            d = by_id.get(index)
            if d is None:
                errors.append(f'{name}: no matching real measured voice item')
            else:
                seconds = as_num(d.get('audio_seconds'), f'{name}.voice.audio_seconds', errors)
                if seconds <= 0 or seconds > dur - .08 + EPS:
                    errors.append(f'{name}: measured voice {seconds:.2f}s does not fit {dur:.2f}s slot')
                if not d.get('sha256') or not d.get('voice_code'):
                    errors.append(f'{name}: missing voice sha256/voice_code provenance')
                if d.get('text') != scene.get('narration'):
                    errors.append(f'{name}: spoken text differs from approved narration')
        if check_assets:
            path = scene.get('image_path')
            if not path or not isinstance(path, str):
                errors.append(f'{name}: missing image_path for asset check')
            elif not (asset_root / path).is_file():
                errors.append(f'{name}: image not found: {path}')
    if scenes and isinstance(scenes[0], dict) and scenes[0].get('phase') != 'HOOK':
        errors.append('First scene must be HOOK')
    if scenes and isinstance(scenes[-1], dict) and scenes[-1].get('phase') != 'ENDING':
        errors.append('Last scene must be ENDING')
    found = {s.get('phase') for s in scenes if isinstance(s, dict)}
    if set(PHASES) - found:
        errors.append('Missing story phase(s): '+', '.join(sorted(set(PHASES)-found)))
    if total > max_seconds + 1e-6:
        errors.append(f'Total {total:.3f}s exceeds strict max {max_seconds:.3f}s')
    if total < 30:
        warnings.append(f'Total {total:.2f}s; confirm intentionally short')
    if final_checklist is not None:
        required_gates = ['story', 'actor_emotion', 'voice_to_action', 'typography',
                          'transitions', 'sound_mix', 'video_playback']
        for gate in required_gates:
            if final_checklist.get(gate) is not True:
                errors.append(f'Final QA signoff missing: {gate}')
    return errors, warnings, round(total, 3)


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--timeline', type=Path, required=True)
    p.add_argument('--max-seconds', type=float, default=60.0)
    p.add_argument('--voice-manifest', type=Path)
    p.add_argument('--asset-root', type=Path, default=Path('.'))
    p.add_argument('--check-assets', action='store_true')
    p.add_argument('--final-checklist', type=Path)
    args = p.parse_args(argv)
    try:
        scenes = scene_collection(load_json(args.timeline), str(args.timeline))
        voices = load_json(args.voice_manifest) if args.voice_manifest else None
        checklist = load_json(args.final_checklist) if args.final_checklist else None
        errors, warnings, runtime = validate(
            scenes, max_seconds=args.max_seconds, voice=voices,
            asset_root=args.asset_root, check_assets=args.check_assets,
            final_checklist=checklist)
    except (OSError, ValueError, TypeError, json.JSONDecodeError) as ex:
        print(f'PREFLIGHT BLOCKED: {ex}', file=sys.stderr)
        return 2
    for item in warnings:
        print('WARN:', item)
    for item in errors:
        print('FAIL:', item)
    print(f'PREFLIGHT {"BLOCKED" if errors else "STRUCTURE OK"}: {len(scenes)} scenes, '
          f'{runtime:.3f}s, {len(errors)} errors, {len(warnings)} warnings')
    if not errors:
        print('NOTE: manual acting, voice listening, subtitle, transitions, and render QA still required')
    return 1 if errors else 0


if __name__ == '__main__':
    raise SystemExit(main())
