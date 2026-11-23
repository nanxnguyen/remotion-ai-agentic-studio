import * as THREE from 'three';
import { walkPath } from '../engine/layout';
import type { AgentStatus, Walk, Workflow } from '../engine/types';
import { THEMES, generateTheme } from '../theme/lch';

/* ---------- bảng màu ---------- */
export type Palette = { floor: number; slab: number; wall: number; desk: number; deskLeg: number; corridor: number; trim: number };
export const PALETTES: Record<'horror' | 'pastel' | 'warm', Palette> = {
  horror: { floor: 0x463a42, slab: 0x2c252b, wall: 0x5a4a63, desk: 0x7a573e, deskLeg: 0x3b2c22, corridor: 0x3d3844, trim: 0xa07a52 },
  pastel: { floor: 0xd8d2e6, slab: 0xc4bdd6, wall: 0xb8c6e0, desk: 0xe8d6be, deskLeg: 0x9a8a78, corridor: 0xcfc8de, trim: 0xf2b5c8 },
  warm: { floor: 0xc9a47c, slab: 0xa98762, wall: 0xe4d6c0, desk: 0x9a6c46, deskLeg: 0x5a3e28, corridor: 0xb89571, trim: 0x6d9a5c },
};

export const STATUS_HEX = (theme: string) => {
  const t = generateTheme(THEMES[theme as keyof typeof THEMES]);
  return { idle: t.muted, thinking: t.pend, working: t.run, walking: t.walk, waiting_human: t.need, error: t.err, break: t.faint, accent: t.accent } as Record<AgentStatus | 'accent', string>;
};

export function vnHour() {
  try { return Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Saigon', hour: '2-digit', hour12: false }).format(new Date())); } catch { return new Date().getHours(); }
}
export function skyFor(h: number) {
  if (h >= 7 && h < 16) return { sky: 0x9cc8ec, sun: 1.7, hemi: 0.75, night: false };
  if ((h >= 16 && h < 19) || (h >= 5 && h < 7)) return { sky: 0xe59a6b, sun: 1.2, hemi: 0.6, night: false };
  return { sky: 0x101a33, sun: 0.75, hemi: 0.45, night: true };
}

export const esc = (s: string) => s.replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]!));
export const pathCache = new WeakMap<Walk, THREE.Vector2[]>();
export function pathOf(wf: Workflow, w: Walk) {
  let p = pathCache.get(w);
  if (!p) { p = walkPath(wf, w).map(q => new THREE.Vector2(q.x, q.z)); pathCache.set(w, p); }
  return p;
}
