import {execFileSync} from 'node:child_process';
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {afterEach, describe, expect, it} from 'vitest';
import {
  measureVoice,
  parseMeasureArgs,
  renderDurationsModule,
} from '../../scripts/measure-voice.mjs';

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, {recursive: true, force: true});
});

const makeRepo = (keys: Record<string, number | null>) => {
  const root = mkdtempSync(path.join(tmpdir(), 'measure-voice-'));
  roots.push(root);
  mkdirSync(path.join(root, 'docs', 'demo'), {recursive: true});
  const audio = path.join(root, 'public', 'audio', 'demo');
  mkdirSync(audio, {recursive: true});
  const text = Object.fromEntries(Object.keys(keys).map((key) => [key, `line ${key}`]));
  writeFileSync(path.join(root, 'docs', 'demo', 'voice.json'), JSON.stringify(text));
  for (const [key, seconds] of Object.entries(keys)) {
    if (seconds === null) continue;
    execFileSync('ffmpeg', [
      ...['-v', 'error', '-y', '-f', 'lavfi', '-i', `sine=frequency=440:duration=${seconds}`],
      ...['-c:a', 'libmp3lame', path.join(audio, `${key}.mp3`)],
    ]);
  }
  return root;
};

describe('measure-voice CLI', () => {
  it('parses the video id and optional paths', () => {
    expect(parseMeasureArgs(['demo'])).toEqual({vid: 'demo', audio: undefined, out: undefined});
    expect(parseMeasureArgs(['demo', '--audio', 'other', '--out', 'src/x.ts'])).toEqual({
      vid: 'demo',
      audio: 'other',
      out: 'src/x.ts',
    });
  });

  it.each([[[]], [['Bad Id']], [['demo', '--out']], [['demo', '--nope']]])(
    'rejects invalid arguments %j',
    (args) => {
      expect(() => parseMeasureArgs(args)).toThrow();
    },
  );

  it('measures every voice.json clip in key order', () => {
    const root = makeRepo({s2: 1.5, s1: 0.75});
    const seconds = measureVoice({root, vid: 'demo'});
    expect(Object.keys(seconds)).toEqual(['s2', 's1']);
    expect(seconds.s2).toBeGreaterThanOrEqual(1.5);
    expect(seconds.s2).toBeLessThan(1.6);
    expect(seconds.s1).toBeGreaterThanOrEqual(0.75);
  });

  it('refuses a partial set instead of writing guessed durations', () => {
    const root = makeRepo({s1: 0.5, s2: null});
    expect(() => measureVoice({root, vid: 'demo'})).toThrow(/s2\.mp3/);
  });

  it('renders a typed module that keeps key order', () => {
    const source = renderDurationsModule({s1: 6.48, s10: 2.2, s2: 1}, 'demo');
    expect(source).toContain('public/audio/demo/');
    expect(source.indexOf('  s1: 6.48,')).toBeLessThan(source.indexOf('  s10: 2.2,'));
    expect(source.indexOf('  s10: 2.2,')).toBeLessThan(source.indexOf('  s2: 1,'));
    expect(source).toContain('export const VOICE_SECONDS = {');
    expect(source).toContain('} as const;');
  });
});
