#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export function checkEnvironment({root = process.cwd(), run = spawnSync, nodeVersion = process.versions.node} = {}) {
  const results = [];
  const nodeMajor = Number(nodeVersion.split('.')[0]);
  results.push({name: 'Node.js 22', ok: nodeMajor === 22, detail: nodeVersion});
  for (const command of ['npm', 'python3', 'ffmpeg', 'ffprobe']) {
    const result = run(command, ['-version'], {encoding: 'utf8', timeout: 5000, shell: process.platform === 'win32'});
    results.push({name: command, ok: !result.error && result.status === 0, detail: result.error?.message ?? result.stdout?.split('\n')[0] ?? ''});
  }
  results.push({name: 'node_modules', ok: existsSync(path.join(root, 'node_modules')), detail: 'Run npm ci if missing'});
  results.push({name: 'Remotion CLI', ok: existsSync(path.join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'remotion.cmd' : 'remotion')), detail: 'Run npm ci if missing'});
  return results;
}

export function main() {
  const checks = checkEnvironment();
  for (const check of checks) console.log(`${check.ok ? 'PASS' : 'FAIL'}  ${check.name} — ${check.detail}`);
  const failures = checks.filter((check) => !check.ok);
  console.log(failures.length ? `\n${failures.length} check(s) failed. See README requirements.` : '\nEnvironment is ready.');
  return failures.length ? 1 : 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  process.exitCode = main();
}
