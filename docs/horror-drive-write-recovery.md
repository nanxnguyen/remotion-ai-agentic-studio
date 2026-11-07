# Repair the Horror Factory archive grant

The 2026-11-07 live audit proves both hosted runner labels execute. Commit `71cfd70bf7397434effe7e1259209867d59123ff` produced `RENDER_READY_ARCHIVE_BLOCKED`, with `drive_write_missing`. The old OAuth bootstrap requests only `drive.readonly`; retrying that token cannot add a write grant.

## Owner consent, on the owner's computer

Use the SAME existing Google OAuth Desktop client, so the client matches the current GitHub client credentials. Do not copy client secrets or refresh tokens into chat, source, issues or public Actions logs.

```bash
git pull --ff-only
python -m pip install -r scripts/youtube-multi-requirements.txt
python scripts/youtube_oauth_setup.py --provider drive-archive --client-secret /private/path/client_secret.json
```

Google will request the previous read scope plus `drive.file` (manage files created/opened by this app); this does NOT request unrestricted Drive modification. Approve only with the correct owning Google account. The opt-in archive mode saves a NEW mode-0600 `~/.config/ray-youtube-uploader/DRIVE_ARCHIVE_REFRESH_TOKEN.txt`, preserving the old token file. Use the printed `gh secret set DRIVE_REFRESH_TOKEN ...` command locally to replace the repository secret. Do not replace the shared YouTube client secret/client ID with a different client; that would invalidate existing channel grants.

After consent, rerun the capability audit: require `drive_write_granted`. Then verify actual create/readback access under the existing Videos-shorts parent `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`; `drive.file` alone does not guarantee an app can access every pre-existing folder/file. If Google restricts the parent to app-selected resources, authorize that specific folder through a supported Drive picker flow; do not silently escalate to full Drive scope. Do not create test folders or change sharing without purpose. Real completed films must still pass QA before their final archive/upload.

This is a local, interactive consent step, not a public CI job. The tool refuses to overwrite an existing private credential file; for repeated consent use the existing valid archive grant or privately move the prior archive credential file first. Do not revoke the shared client or other channel grants as a routine repair.

Default `--provider drive` remains read-only. YouTube mode, Olise tokens, existing video visibility, final QA gates and private Drive sharing are unchanged.
