#!/usr/bin/env python3
"""Ray Psychology local hook uniqueness gate. NOT an official YouTube scoring tool."""
from __future__ import annotations
import argparse
from difflib import SequenceMatcher
import json
from pathlib import Path
import re
import unicodedata


def normalize(text: str) -> str:
    text = unicodedata.normalize('NFC', text or '').casefold().strip()
    return ' '.join(re.findall(r'\w+', text, flags=re.UNICODE))


def validate_hook(brief: dict, recent: list[dict], stage: str = 'draft') -> list[str]:
    issues: list[str] = []
    info = brief.get('intro_hook', {})
    hook = (info.get('spoken_text') or brief.get('chosen_hook') or '').strip()
    if not normalize(hook):
        issues.append('Missing actual opening hook text.')
        return issues
    if not (info.get('viewer_challenge') or '').strip():
        issues.append('Describe the question/decision/observation the viewer can make.')
    if not (info.get('visual_action_first_second') or '').strip():
        issues.append('First-second visual action missing.')
    target = info.get('target_duration_seconds')
    if not isinstance(target, (int, float)) or not 1 <= target <= 4:
        issues.append('Hook target duration must be 1–4 seconds.')
    if stage == 'render':
        measured = info.get('measured_audio_duration_seconds')
        if not isinstance(measured, (int, float)) or not 1 <= measured <= 4:
            issues.append('Hook actual Vbee-measured audio duration must be 1–4 seconds.')
        if info.get('sync_review') != 'PASS':
            issues.append('Spoken hook and visible action/subtitles not verified together.')
    if len(recent) < 10:
        issues.append(f'Recent-hook comparison incomplete: found {len(recent)} of 10. Mark INCOMPLETE, not verified unique.')
    norm = normalize(hook)
    for i, old in enumerate(recent[:10]):
        old_text = old.get('hook_text') or old.get('spoken_text') or old.get('chosen_hook') or old.get('intro_hook', {}).get('spoken_text', '')
        prior = normalize(old_text)
        if not prior:
            continue
        similarity = SequenceMatcher(None, norm, prior).ratio()
        if norm == prior or similarity >= .82:
            issues.append(f'Reused or near-duplicate intro against recent item #{i+1}: {old_text!r} (local heuristic {similarity:.2f}).')
    if info.get('originality_review') not in ('PASS','INCOMPLETE'):
        issues.append('Editorial uniqueness review is pending or failed.')
    return issues


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('episode_brief', type=Path)
    ap.add_argument('--recent',type=Path,help='JSON array of recent hook-ledger entries; absence means comparison incomplete')
    ap.add_argument('--stage',choices=['draft','render'],default='draft')
    args = ap.parse_args()
    brief=json.loads(args.episode_brief.read_text(encoding='utf8'))
    recent=json.loads(args.recent.read_text(encoding='utf8')) if args.recent else []
    if not isinstance(recent,list):
        ap.error('--recent must contain a JSON array of episode hook records')
    issues=validate_hook(brief,recent,args.stage)
    if issues:
        for issue in issues: print('REVIEW:',issue)
        return 1
    print('PASS: mechanical 1–4s hook/duration/duplication checks; editorial originality and audio QA still required.')
    return 0

if __name__ == '__main__': raise SystemExit(main())
