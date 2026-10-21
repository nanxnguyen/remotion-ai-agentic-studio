#!/usr/bin/env node
import {mkdir, readdir, readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const idPattern = /^[A-Z][A-Za-z0-9]*$/;

// Composition ids are `NN-Name` so Remotion Studio shows production order; NN = highest existing number + 1.
const nextNumber = async (root) => {
  const dir = path.join(root, 'src', 'videos');
  let highest = 0;
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    try {
      const index = await readFile(path.join(dir, entry.name, 'index.ts'), 'utf8');
      const match = /id:\s*'(\d{2,3})-/.exec(index);
      if (match) highest = Math.max(highest, Number(match[1]));
    } catch {
      // not a video folder
    }
  }
  return String(highest + 1).padStart(2, '0');
};

const variableName = (id) => `${id[0].toLowerCase()}${id.slice(1)}Video`;

const sceneTemplate = (number) => `import React from 'react';
import {AbsoluteFill} from 'remotion';

export const Scene${number} = () => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
    Scene ${number}
  </AbsoluteFill>
);
`;

export async function scaffoldVideo({root, slug, id, scenes}) {
  if (!slugPattern.test(slug)) throw new Error('slug must use kebab-case');
  if (!idPattern.test(id))
    throw new Error('id must start uppercase and contain letters or numbers');
  if (!Number.isInteger(scenes) || scenes < 1 || scenes > 99) {
    throw new Error('scenes must be an integer from 1 to 99');
  }

  const target = path.join(root, 'src', 'videos', slug);
  const registryPath = path.join(root, 'src', 'videos', 'registry.ts');
  const registry = await readFile(registryPath, 'utf8');
  if (registry.includes(`from './${slug}'`) || registry.includes(`id: '${id}'`)) {
    throw new Error(`video ${slug} or ${id} is already registered`);
  }
  const importMarker = '// video:new imports -- keep this marker';
  const entryMarker = '// video:new entries -- keep this marker';
  if (!registry.includes(importMarker) || !registry.includes(entryMarker)) {
    throw new Error('registry scaffold markers are missing');
  }

  const sceneNames = Array.from({length: scenes}, (_, index) => String(index + 1).padStart(2, '0'));
  const variable = variableName(id);
  const compositionId = `${await nextNumber(root)}-${id}`;
  try {
    await mkdir(path.join(target, 'scenes'), {recursive: true});
    await Promise.all(
      sceneNames.map((number) =>
        writeFile(path.join(target, 'scenes', `Scene${number}.tsx`), sceneTemplate(number), 'utf8'),
      ),
    );
    await writeFile(
      path.join(target, 'timeline.ts'),
      `import {defineSequentialTimeline} from '../../core';\n\nexport const timeline = defineSequentialTimeline([\n${sceneNames.map((number) => `  {id: 'scene${number}', durationInFrames: 90},`).join('\n')}\n] as const);\n`,
      'utf8',
    );
    await writeFile(
      path.join(target, 'Reel.tsx'),
      `import React from 'react';\nimport {Sequence} from 'remotion';\nimport {timeline} from './timeline';\n${sceneNames.map((number) => `import {Scene${number}} from './scenes/Scene${number}';`).join('\n')}\n\nexport const ${id} = () => (\n  <>\n${sceneNames.map((number) => `    <Sequence from={timeline.shots.scene${number}.from} durationInFrames={timeline.shots.scene${number}.duration}><Scene${number} /></Sequence>`).join('\n')}\n  </>\n);\n`,
      'utf8',
    );
    await writeFile(
      path.join(target, 'index.ts'),
      `import {defineVideo} from '../../core';\nimport {${id}} from './Reel';\nimport {timeline} from './timeline';\n\nexport const ${variable} = defineVideo({\n  id: '${compositionId}',\n  slug: '${slug}',\n  component: ${id},\n  durationInFrames: timeline.totalDurationInFrames,\n  fps: 30,\n  width: 1080,\n  height: 1920,\n  testFrames: [0, Math.floor(timeline.totalDurationInFrames / 2), timeline.totalDurationInFrames - 1],\n});\n`,
      'utf8',
    );
    const nextRegistry = registry
      .replace(importMarker, `import {${variable}} from './${slug}';\n${importMarker}`)
      .replace(entryMarker, `${variable},\n  ${entryMarker}`);
    await writeFile(registryPath, nextRegistry, 'utf8');
  } catch (error) {
    await rm(target, {recursive: true, force: true});
    throw error;
  }
  return target;
}

function parseArgs(argv) {
  const value = (flag) => argv[argv.indexOf(flag) + 1];
  return {slug: value('--slug'), id: value('--id'), scenes: Number(value('--scenes'))};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  scaffoldVideo({root: process.cwd(), ...parseArgs(process.argv.slice(2))})
    .then((target) => console.log(`Created ${path.relative(process.cwd(), target)}`))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
