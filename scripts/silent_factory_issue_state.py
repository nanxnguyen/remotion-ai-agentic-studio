#!/usr/bin/env python3
"""Durable per-film state in GitHub Issues, used only with a scoped Actions token.

This provides recovery after an Actions runner exits; workflow concurrency
serializes modifications because GitHub Issues does not support CAS updates.
"""
from __future__ import annotations
import json
import re
from urllib.parse import quote
from urllib.request import Request, urlopen

PREFIX = 'Silent Factory: '
FENCE = '<!-- silent-factory-state-v1 -->\n```json\n'


def serialize_issue(record: dict) -> str:
    return FENCE + json.dumps(record, sort_keys=True, ensure_ascii=False, indent=2) + '\n```\n'


def parse_issue(text: str) -> dict:
    if not isinstance(text, str) or not text.startswith(FENCE) or not text.endswith('\n```\n'):
        raise ValueError('Issue does not hold a supported Silent Factory checkpoint')
    data = json.loads(text[len(FENCE):-5])
    if not isinstance(data, dict) or not isinstance(data.get('run_key'), str):
        raise ValueError('Malformed checkpoint')
    return data


class GitHubIssueStore:
    def __init__(self, repository: str, token: str, transport=None):
        if not token:
            raise ValueError('GitHub token required for durable state')
        if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', repository):
            raise ValueError('Invalid GitHub repository')
        self.repository = repository
        self._token = token
        self._request = transport if transport is not None else self._http

    def _http(self, method: str, path: str, body: dict | None):
        url = 'https://api.github.com/repos/' + self.repository + path
        data = json.dumps(body).encode('utf-8') if body is not None else None
        request = Request(url, data=data, method=method, headers={
            'Authorization': 'Bearer ' + self._token,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json',
        })
        with urlopen(request, timeout=20) as response:
            return json.loads(response.read())

    def _matches(self, run_key: str):
        issues = self._request('GET', '/issues?state=all&labels=silent-factory-run&per_page=100', None)
        title = PREFIX + run_key
        matches = [item for item in issues if item.get('title') == title and 'pull_request' not in item]
        if len(matches) > 1:
            raise ValueError('Found multiple GitHub issues for run key; operator reconciliation needed')
        return matches

    def load(self, run_key: str):
        matches = self._matches(run_key)
        if not matches:
            return None
        doc = parse_issue(matches[0]['body'])
        if doc['run_key'] != run_key:
            raise ValueError('GitHub issue checkpoint key mismatch')
        return doc

    def save(self, record: dict):
        key = record.get('run_key')
        if not isinstance(key, str) or '/' not in key:
            raise ValueError('Invalid run checkpoint key')
        matches = self._matches(key)
        body = serialize_issue(record)
        if matches:
            issue = matches[0]
            previous = parse_issue(issue['body'])
            if previous['run_key'] != key:
                raise ValueError('Checkpoint collision')
            # Concurrency must be serialized by GitHub workflow; no CAS available.
            response = self._request('PATCH', f'/issues/{issue["number"]}', {'body': body})
        else:
            response = self._request('POST', '/issues', {
                'title': PREFIX + key, 'body': body, 'labels': ['silent-factory-run'],
            })
        return response['number']