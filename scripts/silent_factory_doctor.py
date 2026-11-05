#!/usr/bin/env python3
"""Evidence-based diagnostic for Silent Factory infrastructure, without leaking secrets."""
from __future__ import annotations
import os
from pathlib import Path


def classify_actions_failure(run: dict, jobs: list[dict]) -> dict:
    if run.get('conclusion') == 'success':
        return {'code': 'RUN_SUCCESS', 'retryable': False}
    if run.get('status') in {'queued', 'pending', 'waiting', 'in_progress', 'requested'}:
        return {'code': 'RUN_PENDING', 'retryable': True}
    if run.get('conclusion') not in {'failure', 'timed_out', 'cancelled', 'startup_failure'}:
        return {'code': 'RUN_STATUS_UNKNOWN', 'retryable': False}
    if run.get('conclusion') in {'cancelled', 'timed_out'}:
        return {'code': 'RUN_INTERRUPTED', 'retryable': True}
    if not jobs:
        return {'code': 'RUNNER_OR_WORKFLOW_STARTUP_FAILURE', 'retryable': True}
    if any(j.get('runner_id') in (0, None) and not j.get('steps') for j in jobs):
        return {'code': 'RUNNER_NOT_ALLOCATED', 'retryable': True}
    for job in jobs:
        for step in job.get('steps', []):
            if step.get('conclusion') == 'failure':
                return {'code': 'JOB_STEP_FAILED', 'failed_step': step.get('name', 'unknown'), 'retryable': False}
    return {'code': 'JOB_FAILURE_WITHOUT_STEP_EVIDENCE', 'retryable': False}


def check_environment(*, root: Path | None = None, environ: dict | None = None, dry_run: bool = True) -> dict:
    base = (root or Path(__file__).resolve().parents[1]).resolve()
    env = dict(os.environ if environ is None else environ)
    abilities = []
    blockers = []
    workflow = base / '.github/workflows/silent-factory-longform-render.yml'
    if workflow.exists() and 'push:' in workflow.read_text(encoding='utf-8'):
        abilities.append('push_trigger_documented')
    else:
        blockers.append('RENDER_PUSH_WORKFLOW_MISSING')
    if (base / 'scripts/silent_factory_executor.py').exists():
        abilities.append('renderer_support_present')
    else:
        blockers.append('RENDER_EXECUTOR_MISSING')
    if env.get('DRIVE_WRITE_REFRESH_TOKEN') and env.get('YOUTUBE_CLIENT_ID') and env.get('YOUTUBE_CLIENT_SECRET'):
        abilities.append('drive_writer_credentials_present_unverified')
    else:
        blockers.append('DRIVE_WRITE_CREDENTIAL_MISSING')
    if not (base / 'scripts/silent_factory_media_review.py').exists():
        blockers.append('INDEPENDENT_REVIEWER_MISSING')
    return {'mode': 'dry_run' if dry_run else 'execution', 'capabilities': abilities, 'blockers': blockers, 'ready_for_final': not blockers}


if __name__ == '__main__':
    import json
    print(json.dumps(check_environment()))
