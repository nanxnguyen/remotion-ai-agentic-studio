import {mkdtemp, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {afterEach, describe, expect, it} from 'vitest';
// @ts-expect-error The production CLI is intentionally plain ESM for Node 22.
import {scaffoldVideo} from '../../scripts/video-new.mjs';

const temporaryRoots: string[] = [];

const fixture = async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'video-new-'));
  temporaryRoots.push(root);
  await mkdir(path.join(root, 'src', 'videos'), {recursive: true});
  await writeFile(
    path.join(root, 'src', 'videos', 'registry.ts'),
    '// video:new imports -- keep this marker\nexport const videos = [\n  // video:new entries -- keep this marker\n];\n',
  );
  return root;
};

afterEach(async () =>
  Promise.all(temporaryRoots.splice(0).map((root) => rm(root, {recursive: true}))),
);

describe('video:new', () => {
  it('creates a video module and registers it', async () => {
    const root = await fixture();
    await scaffoldVideo({root, slug: 'hello-world', id: 'HelloWorldReel', scenes: 3});
    const registry = await readFile(path.join(root, 'src', 'videos', 'registry.ts'), 'utf8');
    expect(registry).toContain("import {helloWorldReelVideo} from './hello-world'");
    expect(registry).toContain('helloWorldReelVideo');
    expect(
      await readFile(path.join(root, 'src', 'videos', 'hello-world', 'Reel.tsx'), 'utf8'),
    ).toContain('Scene03');
  });

  it('numbers composition ids in production order', async () => {
    const root = await fixture();
    await scaffoldVideo({root, slug: 'first', id: 'FirstReel', scenes: 1});
    await scaffoldVideo({root, slug: 'second', id: 'SecondReel', scenes: 1});
    const index = (slug: string) =>
      readFile(path.join(root, 'src', 'videos', slug, 'index.ts'), 'utf8');
    expect(await index('first')).toContain("id: '01-FirstReel'");
    expect(await index('second')).toContain("id: '02-SecondReel'");
  });

  it('rejects invalid input without creating a directory', async () => {
    const root = await fixture();
    await expect(scaffoldVideo({root, slug: '../bad', id: 'bad', scenes: 0})).rejects.toThrow();
  });

  it('rejects an existing video', async () => {
    const root = await fixture();
    await scaffoldVideo({root, slug: 'demo', id: 'DemoReel', scenes: 1});
    await expect(scaffoldVideo({root, slug: 'demo', id: 'OtherReel', scenes: 1})).rejects.toThrow(
      'already registered',
    );
  });
});
