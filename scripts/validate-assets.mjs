#!/usr/bin/env node
import {access, readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'src');
const missing = [];
let checked = 0;

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
        missing.push(`${path.relative(root, target)}: ${match[1]}`);
      }
    }
  }
}

await visit(sourceRoot);

if (missing.length) {
  console.error(`Missing static assets:\n${missing.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${checked} literal staticFile references.`);
}
