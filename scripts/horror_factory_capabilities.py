"""Read-only, phase-specific production diagnostics. Never renders or publishes."""
import json
import os
from pathlib import Path
import shutil
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

REQUIRED_SECRETS = (
    'VBEE_ACCESS_TOKEN', 'VBEE_APP_ID', 'YOUTUBE_CLIENT_ID',
    'YOUTUBE_CLIENT_SECRET', 'YOUTUBE_REFRESH_TOKEN', 'DRIVE_REFRESH_TOKEN',
)


def evaluate(secrets, components, drive_scope):
    render_requirements = {
        'VBEE_ACCESS_TOKEN': secrets.get('VBEE_ACCESS_TOKEN'),
        'VBEE_APP_ID': secrets.get('VBEE_APP_ID'),
        **{key: components.get(key) for key in (
            'nightly_factory_entrypoint', 'existing_vbee_batch_tool',
            'ffmpeg_executable', 'ffprobe_executable', 'cairosvg_importable',
        )},
    }
    blockers = ['RENDER_MISSING_' + key.upper()
                for key, present in render_requirements.items() if not present]
    render_ready = not blockers
    archive_ready = drive_scope == 'drive_write_granted'
    if not archive_ready:
        blockers.append('DRIVE_WRITE_SCOPE_MISSING' if drive_scope == 'drive_write_missing'
                        else 'DRIVE_WRITE_SCOPE_UNVERIFIED')
    upload_ready = bool(archive_ready and components.get('public_youtube_uploader')
                        and all(secrets.get(key) for key in (
                            'YOUTUBE_CLIENT_ID', 'YOUTUBE_CLIENT_SECRET', 'YOUTUBE_REFRESH_TOKEN')))
    if not upload_ready:
        blockers.append('PUBLIC_UPLOAD_PREFLIGHT_REQUIRED')
    status = ('RENDER_BLOCKED' if not render_ready else
              'RENDER_READY_ARCHIVE_BLOCKED' if not archive_ready else
              'RENDER_READY_UPLOAD_BLOCKED' if not upload_ready else 'READY_FOR_E2E_TEST')
    return dict(status=status, render_ready=render_ready, archive_ready=archive_ready,
                upload_preflight_ready=upload_ready, blockers=blockers,
                media_verified=False, publish_public=False,
                note='Readiness is not real quota, channel ownership, media QA or publication proof.')


def inspect_drive_scope(env):
    if not all(env.get(key) for key in ('DRIVE_REFRESH_TOKEN', 'YOUTUBE_CLIENT_ID', 'YOUTUBE_CLIENT_SECRET')):
        return 'drive_scope_unverified'
    try:
        payload = urlencode(dict(client_id=env['YOUTUBE_CLIENT_ID'],
                                 client_secret=env['YOUTUBE_CLIENT_SECRET'],
                                 refresh_token=env['DRIVE_REFRESH_TOKEN'],
                                 grant_type='refresh_token')).encode()
        with urlopen(Request('https://oauth2.googleapis.com/token', data=payload), timeout=25) as response:
            token = json.load(response)['access_token']
        with urlopen('https://oauth2.googleapis.com/tokeninfo?' + urlencode({'access_token': token}), timeout=25) as response:
            scopes = set(json.load(response).get('scope', '').split())
        allowed = {'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'}
        return 'drive_write_granted' if scopes & allowed else 'drive_write_missing'
    except (HTTPError, URLError, ValueError, KeyError, TypeError, TimeoutError):
        return 'drive_scope_check_failed'


def main():
    root = Path(__file__).resolve().parents[1]
    try:
        import cairosvg
        svg_renderer_available = callable(cairosvg.svg2png)
    except (ImportError, OSError):
        svg_renderer_available = False
    secrets = {key: bool(os.environ.get(key)) for key in REQUIRED_SECRETS}
    components = {
        'nightly_factory_entrypoint': (root / 'scripts/horror_factory_run.py').is_file(),
        'existing_vbee_batch_tool': (root / 'scripts/gen-story-vbee-batch.py').is_file(),
        'public_youtube_uploader': (root / 'scripts/youtube_multi_channel.py').is_file(),
        'ffmpeg_executable': shutil.which('ffmpeg') is not None,
        'ffprobe_executable': shutil.which('ffprobe') is not None,
        'cairosvg_importable': svg_renderer_available,
        'story_model_credential_present': any(os.environ.get(key) for key in (
            'OPENAI_API_KEY', 'GEMINI_API_KEY', 'ANTHROPIC_API_KEY')),
    }
    scope = inspect_drive_scope(os.environ)
    report = evaluate(secrets, components, scope)
    report.update(secrets_presence=secrets, components=components, drive_scope=scope,
                  commit_sha=os.environ.get('GITHUB_SHA'), run_id=os.environ.get('GITHUB_RUN_ID'),
                  run_attempt=os.environ.get('GITHUB_RUN_ATTEMPT'))
    encoded = json.dumps(report, indent=2) + '\n'
    (root / 'horror-factory-capability-audit.json').write_text(encoded, encoding='utf8')
    print(encoded)
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf8') as summary:
            summary.write('## Horror Factory current capabilities\n\n```json\n' + encoded + '```\n')
    return 0 if report['status'] == 'READY_FOR_E2E_TEST' else 2


if __name__ == '__main__':
    raise SystemExit(main())
