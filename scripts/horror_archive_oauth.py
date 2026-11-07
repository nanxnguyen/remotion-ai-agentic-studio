"""Explicit, least-privilege scope selection; does not authenticate by itself."""


def provider_options(provider):
    if provider not in ('drive', 'drive-archive'):
        raise ValueError('Unknown Drive OAuth provider')
    scopes = ['https://www.googleapis.com/auth/drive.readonly']
    filename = 'DRIVE_REFRESH_TOKEN.txt'
    if provider == 'drive-archive':
        # New app-created archive files only; existing files remain read-only.
        scopes.append('https://www.googleapis.com/auth/drive.file')
        filename = 'DRIVE_ARCHIVE_REFRESH_TOKEN.txt'
    return scopes, 'DRIVE_REFRESH_TOKEN', filename
