import {
  type CharacterPose,
  type Expression,
  type Pair,
  type Point,
  smoothstep,
  solveTwoBone,
} from './character-motion';

export type DirectorExpression = Expression | 'shocked' | 'happy' | 'sad' | 'angry';

export type DirectorCharacterPose = Omit<CharacterPose, 'expression'> & {
  expression: DirectorExpression;
};

export type DirectorPosePreset =
  | 'idle'
  | 'thinking'
  | 'pointing'
  | 'shocked'
  | 'celebrate'
  | 'slumped'
  | 'presenting'
  | 'argue';

export type KeyframeProps = {
  t: number;
  x?: number;
  y?: number;
  w?: number;
  angle?: number;
  alpha?: number;
  progress?: number;
  scaleX?: number;
  scaleY?: number;
};

export type KeyedLayer = {
  x?: number;
  y?: number;
  w?: number;
  angle?: number;
  alpha?: number;
  progress?: number;
  scaleX?: number;
  scaleY?: number;
  keys?: readonly KeyframeProps[];
};

const KEYED_PROPS = ['x', 'y', 'w', 'angle', 'alpha', 'progress', 'scaleX', 'scaleY'] as const;

/**
 * Interpolates layer transform & reveal properties across sorted keyframes
 * using smoothstep easing (ported from stickman-video-director `keyState`).
 */
export const interpolateKeyState = <T extends KeyedLayer>(layer: T, time: number): T => {
  const out = {...layer};
  const allKeys = layer.keys;
  if (!allKeys?.length) return out;

  for (const prop of KEYED_PROPS) {
    const keys = allKeys.filter((k) => k[prop] !== undefined).sort((a, b) => a.t - b.t);
    if (!keys.length) continue;
    if (time <= keys[0].t) {
      out[prop] = keys[0][prop] as T[typeof prop];
    } else if (time >= keys[keys.length - 1].t) {
      out[prop] = keys[keys.length - 1][prop] as T[typeof prop];
    } else {
      const idx = keys.findIndex((k) => k.t > time);
      const a = keys[idx - 1];
      const b = keys[idx];
      const span = Math.max(1e-6, b.t - a.t);
      const eased = smoothstep((time - a.t) / span);
      const av = a[prop] as number;
      const bv = b[prop] as number;
      out[prop] = (av + (bv - av) * eased) as T[typeof prop];
    }
  }
  return out;
};

/**
 * Returns the progressively revealed prefix of a polyline for `progress` in [0, 1].
 */
export const revealedPolylinePoints = (
  points: readonly Point[],
  progress: number,
): Point[] => {
  const amount = Math.max(0, Math.min(1, progress));
  if (!points.length || amount <= 0) return [];
  if (amount >= 1) return points.map((p) => ({...p}));

  const lengths: number[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const len = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    lengths.push(len);
    total += len;
  }

  let left = total * amount;
  const result: Point[] = [{...points[0]}];
  for (let i = 0; i < lengths.length && left > 0; i++) {
    const segLen = Math.max(0.001, lengths[i]);
    const fraction = Math.min(1, left / segLen);
    result.push({
      x: points[i].x + (points[i + 1].x - points[i].x) * fraction,
      y: points[i].y + (points[i + 1].y - points[i].y) * fraction,
    });
    left -= lengths[i];
  }
  return result;
};

/** Hand-drawn wavy underline points of width `w`. */
export const underlinePoints = (w: number): Point[] => [
  {x: 0, y: 1},
  {x: w * 0.25, y: -1},
  {x: w * 0.55, y: 2},
  {x: w, y: -2},
];

/** Curved kinetic arc arrow points of width `w` and peak `arcHeight`. */
export const arcArrowPoints = (w: number, arcHeight = 26): Point[] =>
  Array.from({length: 30}, (_, i) => {
    const t = i / 29;
    return {x: w * t, y: -arcHeight * Math.sin(t * Math.PI)};
  });

/** Converts a list of points into an SVG `d` path string. */
export const pointsToSvgPath = (points: readonly Point[]): string => {
  if (!points.length) return '';
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');
};

export type DirectorStyleId =
  | 'classic-bw'
  | 'minimal-handdrawn'
  | 'amber-noir'
  | 'retro-tv'
  | 'survival-thriller'
  | 'dynamic-meme';

export type DirectorStylePreset = Readonly<{
  id: DirectorStyleId;
  label: string;
  background: string;
  ink: string;
  shade: string;
  accent: string;
  captionBg: string;
  captionText: string;
  captionStroke: string;
  strokeWidth: number;
  showGrid?: boolean;
  scanlineIntensity?: number;
}>;

export const DIRECTOR_STYLES: Record<DirectorStyleId, DirectorStylePreset> = {
  'classic-bw': {
    id: 'classic-bw',
    label: 'Classic Black & White (A1)',
    background: '#0B0B0D',
    ink: '#FFFFFF',
    shade: '#9A9AA3',
    accent: '#F58B4C',
    captionBg: 'transparent',
    captionText: '#FFFFFF',
    captionStroke: '#0B0B0D',
    strokeWidth: 32,
  },
  'minimal-handdrawn': {
    id: 'minimal-handdrawn',
    label: 'Minimal Line Art (B1)',
    background: '#FDFDFC',
    ink: '#191916',
    shade: '#6E737B',
    accent: '#E25D3A',
    captionBg: 'transparent',
    captionText: '#20231F',
    captionStroke: '#FDFDFC',
    strokeWidth: 26,
    showGrid: true,
  },
  'amber-noir': {
    id: 'amber-noir',
    label: 'Amber Noir (A6)',
    background: '#12100E',
    ink: '#F4ECE1',
    shade: '#7E7266',
    accent: '#F08A24',
    captionBg: 'rgba(18, 16, 14, 0.85)',
    captionText: '#F8F0E3',
    captionStroke: '#12100E',
    strokeWidth: 32,
  },
  'retro-tv': {
    id: 'retro-tv',
    label: 'Retro TV Mystery (B3)',
    background: '#111316',
    ink: '#E9EAEA',
    shade: '#8C9197',
    accent: '#7CD4E8',
    captionBg: 'transparent',
    captionText: '#F4F5F5',
    captionStroke: '#111316',
    strokeWidth: 30,
    scanlineIntensity: 0.42,
  },
  'survival-thriller': {
    id: 'survival-thriller',
    label: 'Survival Thriller (B4)',
    background: '#111316',
    ink: '#F5F2EB',
    shade: '#777B82',
    accent: '#CE6050',
    captionBg: 'transparent',
    captionText: '#F8F5ED',
    captionStroke: '#303234',
    strokeWidth: 34,
  },
  'dynamic-meme': {
    id: 'dynamic-meme',
    label: 'Dynamic Meme Animation (B6)',
    background: '#F4F0E5',
    ink: '#1C1D1A',
    shade: '#6C6D64',
    accent: '#FF5A36',
    captionBg: 'rgba(249, 246, 235, 0.94)',
    captionText: '#1F1F1A',
    captionStroke: '#FFFFFF',
    strokeWidth: 38,
  },
};

const pt = (x: number, y: number): Point => ({x, y});

/**
 * Generates deterministic expressive stickman poses for storytelling beats.
 * Built on the exact two-bone IK solver from `character-motion.ts`.
 */
export const directorPose = ({
  preset,
  originX,
  groundY,
  time = 0,
  facing = 1,
}: {
  preset: DirectorPosePreset;
  originX: number;
  groundY: number;
  time?: number;
  facing?: 1 | -1;
}): DirectorCharacterPose => {
  const breathe = Math.sin(time * 3.1) * 4;
  const hip = pt(originX, groundY - 208 + (preset === 'slumped' ? 24 : 0) + breathe * 0.4);
  const leanX =
    preset === 'slumped'
      ? -18
      : preset === 'pointing' || preset === 'argue'
        ? 16
        : preset === 'shocked'
          ? -14
          : 0;
  const shoulder = pt(hip.x + leanX * facing, hip.y - 155 + (preset === 'slumped' ? 18 : 0) + breathe);
  const head = pt(
    shoulder.x + (preset === 'slumped' ? 18 : 4) * facing,
    shoulder.y - (preset === 'slumped' ? 76 : 86),
  );

  const feet: Pair = [pt(originX - 46, groundY), pt(originX + 46, groundY)];
  const legL = solveTwoBone(pt(hip.x - 22, hip.y), feet[0], 153, 150, -1);
  const legR = solveTwoBone(pt(hip.x + 22, hip.y), feet[1], 153, 150, -1);

  let handTargets: Pair = [pt(shoulder.x - 68, shoulder.y + 135), pt(shoulder.x + 68, shoulder.y + 135)];
  let expression: DirectorExpression = 'calm';

  switch (preset) {
    case 'thinking': {
      handTargets = [
        pt(shoulder.x - 58, shoulder.y + 125),
        pt(head.x + 26 * facing, head.y + 38),
      ];
      expression = 'focused';
      break;
    }
    case 'pointing': {
      const gesture = Math.sin(time * 5) * 6;
      handTargets = [
        pt(shoulder.x - 65 * facing, shoulder.y + 120),
        pt(shoulder.x + 165 * facing, shoulder.y - 12 + gesture),
      ];
      expression = 'focused';
      break;
    }
    case 'shocked': {
      const jitter = Math.sin(time * 18) * 3;
      handTargets = [
        pt(head.x - 78, head.y + 12 + jitter),
        pt(head.x + 78, head.y + 12 - jitter),
      ];
      expression = 'shocked';
      break;
    }
    case 'celebrate': {
      const bounce = Math.abs(Math.sin(time * 6)) * 18;
      handTargets = [
        pt(shoulder.x - 95, shoulder.y - 145 - bounce),
        pt(shoulder.x + 95, shoulder.y - 145 - bounce),
      ];
      expression = 'happy';
      break;
    }
    case 'slumped': {
      handTargets = [pt(hip.x - 46, hip.y + 42), pt(hip.x + 46, hip.y + 42)];
      expression = 'sad';
      break;
    }
    case 'presenting': {
      const wave = Math.sin(time * 4) * 10;
      handTargets = [
        pt(shoulder.x - 95 * facing, shoulder.y + 40),
        pt(shoulder.x + 145 * facing, shoulder.y - 45 + wave),
      ];
      expression = 'happy';
      break;
    }
    case 'argue': {
      const jab = Math.sin(time * 8) * 18;
      handTargets = [
        pt(shoulder.x - 92 * facing, shoulder.y + 20 - jab * 0.5),
        pt(shoulder.x + 135 * facing + jab, shoulder.y - 25),
      ];
      expression = 'angry';
      break;
    }
    case 'idle':
    default:
      break;
  }

  const armL = solveTwoBone(pt(shoulder.x - 30, shoulder.y), handTargets[0], 103, 100, -1);
  const armR = solveTwoBone(pt(shoulder.x + 30, shoulder.y), handTargets[1], 103, 100, 1);

  return {
    head,
    shoulder,
    hip,
    elbows: [armL.joint, armR.joint],
    hands: [armL.end, armR.end],
    knees: [legL.joint, legR.joint],
    feet: [legL.end, legR.end],
    expression,
  };
};

/** 9:16 mobile safe area inside 1080x1920 (clears TikTok/Shorts UI chrome). */
export const PORTRAIT_SAFE_AREA = {
  x: 84,
  y: 220,
  w: 912,
  h: 1380,
  captionY: 1470,
} as const;

/** Validates that a portrait caption cue is non-empty and strictly single-line. */
export const validatePortraitCaption = (
  text: string,
  maxChars = 42,
): {ok: boolean; reason?: string} => {
  const trimmed = text.trim();
  if (!trimmed) return {ok: false, reason: 'Caption must not be empty'};
  if (/[\r\n]/.test(trimmed)) {
    return {ok: false, reason: 'Portrait captions allow at most one line; split at a semantic boundary'};
  }
  if (trimmed.length > maxChars) {
    return {ok: false, reason: `Caption exceeds ${maxChars} characters (${trimmed.length})`};
  }
  return {ok: true};
};
