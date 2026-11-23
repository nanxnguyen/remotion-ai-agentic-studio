import { ranks } from './graph';
import type { Place, Walk, Workflow } from './types';

/** Hình học văn phòng, dùng chung cho mô phỏng (tính thời gian đi bộ) và 3D (vẽ đường đi). */
export const SPX = 8.6, SPZ = 8.6, ROOM = 6, WALK_SPEED = 2.4, STAND = 0.5;
const LANE = SPZ / 2, AISLE = SPX / 2;

export interface P { x: number; z: number }
export interface Layout {
  rooms: Record<string, { x: number; z: number; rank: number; row: number }>;
  xMin: number; xMax: number; zMin: number; zMax: number;
  director: P; pantry: P; exit: P;
}

const cache = new WeakMap<Workflow, Layout>();

export function layout(wf: Workflow): Layout {
  const hit = cache.get(wf);
  if (hit) return hit;
  const r = ranks(wf);
  const byRank = new Map<number, string[]>();
  wf.steps.forEach(s => { const k = r[s.id] ?? 0; byRank.set(k, [...(byRank.get(k) ?? []), s.id]); });
  const maxRank = Math.max(0, ...byRank.keys());
  const rooms: Layout['rooms'] = {};
  let zMin = 0, zMax = 0;
  for (const [k, ids] of byRank) {
    ids.forEach((id, row) => {
      const x = (k - maxRank / 2) * SPX;
      const z = (row - Math.floor((ids.length - 1) / 2)) * SPZ;   // bám lưới chung để làn đi luôn trống
      rooms[id] = { x, z, rank: k, row };
      zMin = Math.min(zMin, z); zMax = Math.max(zMax, z);
    });
  }
  const xMin = (-maxRank / 2) * SPX, xMax = (maxRank / 2) * SPX;
  const out: Layout = {
    rooms, xMin, xMax, zMin, zMax,
    director: { x: xMin - 9, z: 0 },
    pantry: { x: xMin - 9, z: zMax + LANE + 2.5 },
    exit: { x: xMax + 9, z: 0 },
  };
  cache.set(wf, out);
  return out;
}

const room = (L: Layout, id: string) => L.rooms[id] ?? { x: 0, z: 0, rank: 0, row: 0 };
export const seatOf = (L: Layout, id: string): P => { const r = room(L, id); return { x: r.x, z: r.z - 0.9 }; };
const sideOf = (L: Layout, id: string): P => { const r = room(L, id); return { x: r.x - 1.9, z: r.z - 0.9 }; };
const doorOf = (L: Layout, id: string): P => { const r = room(L, id); return { x: r.x - 1.9, z: r.z + ROOM / 2 + 0.2 }; };
export const trayOf = (L: Layout, id: string): P => { const r = room(L, id); return { x: r.x + 1.9, z: r.z + 2.35 }; };
const standOf = (L: Layout, id: string): P => { const r = room(L, id); return { x: r.x + 1.9, z: r.z + ROOM / 2 + 0.35 }; };
const laneBelow = (L: Layout, id: string) => room(L, id).z + LANE;

export function placePoint(L: Layout, p: Place): P {
  if (p.kind === 'step') return seatOf(L, p.id);
  if (p.kind === 'pantry') return { x: L.pantry.x + 1.2, z: L.pantry.z };
  if (p.kind === 'exit') return { x: L.exit.x - 1.6, z: L.exit.z };
  return { x: L.director.x + 1.6, z: L.director.z };
}

function clean(pts: P[]): P[] {
  return pts.filter((p, i) => i === 0 || Math.hypot(p.x - pts[i - 1].x, p.z - pts[i - 1].z) > 1e-3);
}

/** Lối đi: điểm đầu → làn ngang của nó → lối dọc X1 → làn ngang đích → điểm đích. */
function corridor(a: P, aLane: number, b: P, bLane: number, X1: number): P[] {
  return [a, { x: a.x, z: aLane }, { x: X1, z: aLane }, { x: X1, z: bLane }, { x: b.x, z: bLane }, b];
}

function aisleFor(L: Layout, fromX: number, toX: number, toIsRoom: boolean): number {
  if (!toIsRoom) return toX < L.xMin ? L.xMin - AISLE : L.xMax + AISLE;
  if (toX > fromX + 1e-3) return toX - AISLE;
  if (toX < fromX - 1e-3) return toX + AISLE;
  return toX - AISLE;
}

/** Đường đi đầy đủ cho một lượt đi bộ. */
export function walkPath(wf: Workflow, w: Walk): P[] {
  const L = layout(wf);
  // điểm xuất phát
  let head: P[]; let start: P; let startLane: number;
  if (w.from.kind === 'step') {
    if (w.purpose === 'break' || w.purpose === 'handoff' || w.purpose === 'rework') {
      head = [seatOf(L, w.from.id), sideOf(L, w.from.id), doorOf(L, w.from.id)];
      start = doorOf(L, w.from.id); startLane = laneBelow(L, w.from.id);
    } else { // đứng ở khay của phòng khác, quay về
      start = standOf(L, w.from.id); head = [start]; startLane = laneBelow(L, w.from.id);
    }
  } else {
    start = placePoint(L, w.from); head = [start]; startLane = start.z;
  }
  // điểm đích
  let tail: P[]; let end: P; let endLane: number; let toRoom = false;
  if (w.to.kind === 'step') {
    if (w.purpose === 'return' || w.purpose === 'break-return') {
      end = doorOf(L, w.to.id); tail = [end, sideOf(L, w.to.id), seatOf(L, w.to.id)];
      endLane = laneBelow(L, w.to.id); toRoom = true;
    } else {
      end = standOf(L, w.to.id); tail = [end]; endLane = laneBelow(L, w.to.id); toRoom = true;
    }
  } else {
    end = placePoint(L, w.to); tail = [end]; endLane = end.z;
  }
  const fromX = w.from.kind === 'step' ? room(L, w.from.id).x : start.x;
  const toX = w.to.kind === 'step' ? room(L, w.to.id).x : end.x;
  const X1 = aisleFor(L, fromX, toX, toRoom);
  const mid = corridor(start, startLane, end, endLane, X1);
  return clean([...head.slice(0, -1), ...mid, ...tail.slice(1)]);
}

export function pathLen(p: P[]): number {
  let d = 0;
  for (let i = 1; i < p.length; i++) d += Math.hypot(p[i].x - p[i - 1].x, p[i].z - p[i - 1].z);
  return d;
}

export function sample(p: P[], d: number): P & { dir: number } {
  for (let i = 1; i < p.length; i++) {
    const sx = p[i].x - p[i - 1].x, sz = p[i].z - p[i - 1].z, l = Math.hypot(sx, sz);
    if (d <= l || i === p.length - 1) {
      const k = l ? Math.min(1, Math.max(0, d / l)) : 1;
      return { x: p[i - 1].x + sx * k, z: p[i - 1].z + sz * k, dir: Math.atan2(sx, sz) };
    }
    d -= l;
  }
  const e = p[p.length - 1];
  return { x: e.x, z: e.z, dir: 0 };
}

/** Thời gian (giây) cho một lượt đi: đứng dậy + đi + ngồi xuống. */
export function walkDuration(wf: Workflow, w: Omit<Walk, 'start' | 'dur'>): number {
  const len = pathLen(walkPath(wf, { ...w, start: 0, dur: 0 }));
  const sitStand = (w.purpose === 'return' || w.purpose === 'break-return' ? 1 : 0) + (w.from.kind === 'step' && (w.purpose === 'handoff' || w.purpose === 'rework' || w.purpose === 'break') ? 1 : 0);
  return len / WALK_SPEED + sitStand * STAND;
}
