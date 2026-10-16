#!/usr/bin/env node
import {mkdirSync, statSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const demos = [
  ['HelloWorldReel', 'hello-world'],
  ['EditorialQuoteReel', 'editorial-quote'],
];

function run(command, args) {
  const result = spawnSync(command, args, {cwd: root, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed with exit code ${result.status}`);
}

const out = path.join(root, 'out', 'showcase');
mkdirSync(out, {recursive: true});
for (const [composition, name] of demos) {
  const mp4 = path.join(out, `${name}.mp4`);
  const gif = path.join(out, `${name}.gif`);
  run(process.execPath, ['scripts/video-render.mjs', '--id', composition, '--out', mp4]);
  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', mp4,
    '-vf', 'fps=12,scale=360:-1:flags=lanczos',
    '-loop', '0', gif,
  ]);
  run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1', mp4]);
  if (!statSync(mp4).size || !statSync(gif).size) throw new Error(`Empty output for ${name}`);
  console.log(`Created ${path.relative(root, mp4)} and ${path.relative(root, gif)}`);
}
