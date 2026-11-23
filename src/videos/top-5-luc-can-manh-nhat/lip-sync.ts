/**
 * Deterministic 7-shape Vietnamese lip-sync (visemes) ported from
 * `plugins/thanh-hai-learn-ai-2d-studio/skills/make-2d-video/kit/tools/visemes.py`.
 */
export type Viseme = 'A' | 'O' | 'U' | 'E' | 'M' | 'F' | 'rest';

const VOWEL_MAP: Record<string, Viseme> = {
  a: 'A',
  ă: 'A',
  â: 'A',
  o: 'O',
  ô: 'O',
  ơ: 'O',
  u: 'U',
  ư: 'U',
  e: 'E',
  ê: 'E',
  i: 'E',
  y: 'E',
};

const ONSET_V: Record<string, Viseme> = {
  m: 'M',
  b: 'M',
  p: 'M',
  ph: 'F',
  v: 'F',
  qu: 'U',
};

const ONSETS = [
  'ngh',
  'ng',
  'nh',
  'ph',
  'th',
  'tr',
  'ch',
  'gh',
  'gi',
  'kh',
  'qu',
  'b',
  'c',
  'd',
  'g',
  'h',
  'k',
  'l',
  'm',
  'n',
  'p',
  'r',
  's',
  't',
  'v',
  'x',
];

const stripTones = (word: string): string =>
  word
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '')
    .normalize('NFC')
    .replace(/đ/g, 'd')
    .replace(/[^a-zăâêôơư]/g, '');

const syllableVisemes = (word: string): Viseme[] => {
  const w = stripTones(word);
  if (!w) return [];
  const onset = ONSETS.find((o) => w.startsWith(o) && (o !== 'gi' || w.length > 2)) ?? '';
  const rest = w.slice(onset.length);
  const seq: Viseme[] = [];
  if (onset && ONSET_V[onset]) seq.push(ONSET_V[onset]);
  for (const ch of rest) {
    const v = VOWEL_MAP[ch];
    if (v && seq[seq.length - 1] !== v) seq.push(v);
  }
  if (/[mbp]$/.test(rest) && seq[seq.length - 1] !== 'M') seq.push('M');
  return seq.length ? seq : ['A'];
};

export const visemeForNarration = (text: string, progress: number, speaking = true): Viseme => {
  if (!speaking || progress < 0.02 || progress > 0.94) return 'rest';
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 'rest';
  const all: Viseme[] = [];
  for (const word of words) {
    all.push(...syllableVisemes(word));
  }
  if (!all.length) return 'rest';
  const idx = Math.min(all.length - 1, Math.floor(((progress - 0.02) / 0.92) * all.length));
  return all[idx];
};
