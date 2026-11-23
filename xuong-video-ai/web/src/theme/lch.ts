/** Sinh theme từ 3 biến (nền, nhấn, tương phản) trong không gian LCH. */
export type LCH = [number, number, number];

const finv = (t: number) => (t > 6 / 29 ? t ** 3 : 3 * (6 / 29) ** 2 * (t - 4 / 29));
const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function lchToRgb([L, C, H]: LCH): [number, number, number] {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
  const X = 0.95047 * finv(fx), Y = finv(fy), Z = 1.08883 * finv(fz);
  const r = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
  const g = -0.969266 * X + 1.8760108 * Y + 0.041556 * Z;
  const bl = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z;
  return [clamp01(gamma(r)), clamp01(gamma(g)), clamp01(gamma(bl))];
}

export function lchHex(c: LCH): string {
  return '#' + lchToRgb(c).map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
}

export function luminance(hex: string): number {
  const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}
export function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

export interface ThemeInput { base: LCH; accent: LCH; contrast: number }
export const THEMES: Record<'night' | 'day' | 'contrast', ThemeInput> = {
  night: { base: [10, 4, 255], accent: [78, 62, 75], contrast: 35 },
  day: { base: [97, 2, 85], accent: [46, 66, 55], contrast: 35 },
  contrast: { base: [4, 2, 255], accent: [85, 70, 80], contrast: 80 },
};

export type Theme = Record<string, string> & { dark: 'true' | 'false' };

export function generateTheme({ base, accent, contrast: c }: ThemeInput): Theme {
  const dark = base[0] < 50;
  const k = 1 + Math.max(0, c - 30) / 40;
  const sgn = dark ? 1 : -1;
  const step = (dl: number): LCH => [Math.min(99, Math.max(1, base[0] + sgn * dl * k)), base[1], base[2]];
  const ink: LCH = dark ? [Math.min(98, 90 + (k - 1) * 6), 2, base[2]] : [Math.max(4, 14 - (k - 1) * 8), 3, base[2]];
  const muted: LCH = dark ? [Math.min(90, 66 + (k - 1) * 14), 4, base[2]] : [Math.max(10, 40 - (k - 1) * 14), 4, base[2]];
  const sL = dark ? 72 : 46, sC = dark ? 52 : 58;
  const t: Theme = {
    dark: dark ? 'true' : 'false',
    bg: lchHex(base),
    surface: lchHex(step(3)),
    surface2: lchHex(step(6)),
    surface3: lchHex(step(10)),
    line: lchHex(step(dark ? 14 : 12)),
    ink: lchHex(ink),
    muted: lchHex(muted),
    faint: lchHex(dark ? [46, 4, base[2]] : [62, 4, base[2]]),
    accent: lchHex(accent),
    accentInk: lchHex(dark ? [12, 6, accent[2]] : [99, 2, accent[2]]),
    run: lchHex([sL, sC, 255]),
    need: lchHex([dark ? 82 : 54, dark ? 72 : 66, 80]),
    err: lchHex([dark ? 64 : 46, dark ? 62 : 66, 28]),
    ok: lchHex([sL, sC, 145]),
    pend: lchHex([dark ? 68 : 46, 48, 300]),
    walk: lchHex([sL, 40, 190]),
  };
  return t;
}

export function agentColor(hue: number, dark = true): string {
  return lchHex([dark ? 70 : 52, 46, hue]);
}

export function applyTheme(t: Theme) {
  const root = document.documentElement;
  Object.entries(t).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
  root.style.colorScheme = t.dark === 'true' ? 'dark' : 'light';
  root.dataset.dark = t.dark;
}
