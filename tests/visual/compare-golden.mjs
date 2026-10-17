import {mkdir, readdir, readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import pixelmatch from 'pixelmatch';
import {PNG} from 'pngjs';

const require = createRequire(import.meta.url);
// Spawn the Remotion CLI through node directly. npx resolves to npx.cmd on
// Windows and Node >=20 refuses to spawn .cmd/.bat files without a shell
// (EINVAL), while shell mode hides the real exit code behind cmd.exe.
const remotionCli = (() => {
  try {
    return path.join(require.resolve('@remotion/cli/package.json'), '..', 'remotion-cli.js');
  } catch {
    return path.join('node_modules', '@remotion', 'cli', 'remotion-cli.js');
  }
})();

// OneDrive briefly hides freshly written files while syncing; retry short ENOENTs.
const readPng = async (file, attempts = 5) => {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return PNG.sync.read(await readFile(file));
    } catch (error) {
      lastError = error;
      if ((error?.code ?? '') !== 'ENOENT') throw error;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw lastError;
};

const root = process.cwd();
const goldenRoot = path.join(root, 'tests', 'golden');
const actualRoot = path.join(root, 'tests', 'visual', 'actual');
const diffRoot = path.join(root, 'tests', 'visual', 'diff');
const allowedRatio = 0.002;

await rm(actualRoot, {recursive: true, force: true});
await rm(diffRoot, {recursive: true, force: true});
await mkdir(actualRoot, {recursive: true});
await mkdir(diffRoot, {recursive: true});

const compositions = await readdir(goldenRoot, {withFileTypes: true});
const failures = [];

for (const composition of compositions.filter((entry) => entry.isDirectory())) {
  const files = (await readdir(path.join(goldenRoot, composition.name))).filter((file) =>
    file.endsWith('.png'),
  );
  for (const file of files) {
    const frame = Number(file.match(/(\d+)/)?.[1]);
    const actualDir = path.join(actualRoot, composition.name);
    await mkdir(actualDir, {recursive: true});
    const actualPath = path.join(actualDir, file);
    const render = spawnSync(
      process.execPath,
      [
        remotionCli,
        'still',
        'src/index.ts',
        composition.name,
        actualPath,
        `--frame=${frame}`,
        '--scale=0.5',
        '--log=error',
      ],
      {cwd: root, encoding: 'utf8'},
    );
    if (render.status !== 0) {
      failures.push(`${composition.name}@${frame}: render failed\n${render.stderr}`);
      continue;
    }

    const golden = PNG.sync.read(await readFile(path.join(goldenRoot, composition.name, file)));
    const actual = await readPng(actualPath);
    if (golden.width !== actual.width || golden.height !== actual.height) {
      failures.push(`${composition.name}@${frame}: dimensions differ`);
      continue;
    }
    const diff = new PNG({width: golden.width, height: golden.height});
    const changed = pixelmatch(golden.data, actual.data, diff.data, golden.width, golden.height, {
      threshold: 0.1,
    });
    const ratio = changed / (golden.width * golden.height);
    if (ratio > allowedRatio) {
      const targetDir = path.join(diffRoot, composition.name);
      await mkdir(targetDir, {recursive: true});
      await writeFile(path.join(targetDir, file), PNG.sync.write(diff));
      failures.push(`${composition.name}@${frame}: ${(ratio * 100).toFixed(3)}% pixels differ`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('All golden frames are within the 0.2% perceptual-diff threshold.');
}
