#!/usr/bin/env node
import {access, readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'src');
const missing = [];
let checked = 0;
let externalCount = 0;
const externalManifest = JSON.parse(
  await readFile(path.join(root, 'public', '.external-assets.json'), 'utf8'),
);
const externalAssets = new Set(externalManifest.assets.map((asset) => asset.path));

async function visit(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(target);
      continue;
    }
    if (!/\.(?:ts|tsx)$/.test(entry.name)) continue;
    const source = await readFile(target, 'utf8');
    for (const match of source.matchAll(/staticFile\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      checked += 1;
      try {
        await access(path.join(root, 'public', match[1]));
      } catch {
        if (externalAssets.has(match[1])) {
          externalCount += 1;
        } else {
          missing.push(`${path.relative(root, target)}: ${match[1]}`);
        }
      }
    }
  }
}

await visit(sourceRoot);

if (missing.length) {
  console.error(`Missing static assets:\n${missing.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${checked} literal staticFile references (${externalCount} documented external).`,
  );
}
