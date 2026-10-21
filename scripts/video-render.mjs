#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const DEFAULT_COMPOSITION = '06-UnderstandAnythingReel';
const ID = /^(\d{2,3}-)?[A-Z][A-Za-z0-9]*$/;

export function parseRenderArgs(argv) {
  const result = {id: DEFAULT_COMPOSITION, out: null, list: false, dryRun: false};
  const seen = new Set();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--list' || arg === '--dry-run') {
      result[arg === '--list' ? 'list' : 'dryRun'] = true;
      continue;
    }
    if (arg !== '--id' && arg !== '--out') throw new Error(`Unknown option: ${arg}`);
    if (seen.has(arg)) throw new Error(`Duplicate option: ${arg}`);
    seen.add(arg);
    const value = argv[++i];
    if (!value || value.startsWith('--')) throw new Error(`Missing value for ${arg}`);
    result[arg === '--id' ? 'id' : 'out'] = value;
  }
  if (!ID.test(result.id))
    throw new Error('Composition ID must start uppercase and contain letters or numbers');
  if (result.out && (!result.out.endsWith('.mp4') || result.out.startsWith('-'))) {
    throw new Error('--out must be an MP4 file path');
  }
  if (result.list && (seen.size || result.dryRun))
    throw new Error('--list cannot be combined with other options');
  return result;
}

export function commandForRender(options, root = process.cwd()) {
  const output =
    options.out ??
    path.join('out', `${options.id.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}.mp4`);
  const bin = path.join(
    root,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'remotion.cmd' : 'remotion',
  );
  return {
    bin,
    output,
    args: [
      'render',
      'src/index.ts',
      options.id,
      output,
      '--codec',
      'h264',
      '--crf',
      '18',
      '--pixel-format',
      'yuv420p',
    ],
  };
}

export function main(argv = process.argv.slice(2), root = process.cwd()) {
  try {
    const options = parseRenderArgs(argv);
    if (options.list) {
      const bin = path.join(
        root,
        'node_modules',
        '.bin',
        process.platform === 'win32' ? 'remotion.cmd' : 'remotion',
      );
      const run = spawnSync(bin, ['compositions', 'src/index.ts'], {
        cwd: root,
        stdio: 'inherit',
        shell: process.platform === 'win32',
      });
      return run.error ? (console.error(run.error.message), 1) : (run.status ?? 1);
    }
    const command = commandForRender(options, root);
    if (options.dryRun) {
      console.log(
        JSON.stringify(
          {composition: options.id, output: command.output, args: command.args},
          null,
          2,
        ),
      );
      return 0;
    }
    if (!existsSync(command.bin)) throw new Error('Remotion CLI not installed. Run npm ci first.');
    mkdirSync(path.dirname(path.resolve(root, command.output)), {recursive: true});
    const run = spawnSync(command.bin, command.args, {
      cwd: root,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    if (run.error) throw run.error;
    return run.status ?? 1;
  } catch (error) {
    console.error(
      `Render error: ${error.message}\nUsage: npm run render -- [--id CompositionId] [--out out/video.mp4] [--list] [--dry-run]`,
    );
    return 1;
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
) {
  process.exitCode = main();
}
