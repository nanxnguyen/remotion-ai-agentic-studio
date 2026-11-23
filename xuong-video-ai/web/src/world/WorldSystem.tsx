import { useFrame } from '@react-three/fiber';
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { layout } from '../engine/layout';
import type { FactoryEvent } from '../engine/types';
import { factory } from '../store';
import { computePose, EmoteBook, emotesFor, type AgentPose } from './poses';

export interface WorldFrame { poses: Map<string, AgentPose>; t: number; frame: number }

const WorldCtx = createContext<{ current: WorldFrame } | null>(null);

/**
 * Hệ World: mỗi khung hình tính tư thế của MỌI agent trên tầng đúng một lần,
 * trước khi bất kỳ thứ gì được vẽ (useFrame ưu tiên -10). Nhân vật, nhãn, vệt đường,
 * camera đều đọc từ đây thay vì tự tính lại.
 */
export function WorldSystem({ chId, children }: { chId: string; children: ReactNode }) {
  const ref = useRef<WorldFrame>({ poses: new Map(), t: 0, frame: 0 });
  const book = useMemo(() => new EmoteBook(), [chId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const f = (e: FactoryEvent) => {
      if (e.ch !== chId) return;
      for (const [id, em] of emotesFor(factory.channels[chId], e)) book.push(id, em);
    };
    factory.listeners.add(f);
    return () => { factory.listeners.delete(f); };
  }, [chId, book]);

  useFrame(() => {
    const ch = factory.channels[chId];
    if (!ch) return;
    const L = layout(ch.workflow);
    const w = ref.current, t = factory.t, now = performance.now();
    for (const def of ch.workflow.agents) {
      const prev = w.poses.get(def.id);
      const p = computePose(ch, L, def, t, prev?.face ?? 0);
      const em = book.get(def.id, now);
      if (em) { p.emote = em.e; p.emoteAge = em.age; }
      w.poses.set(def.id, p);
    }
    w.t = t; w.frame++;
  }, -10);

  return <WorldCtx.Provider value={ref}>{children}</WorldCtx.Provider>;
}

/** World tĩnh cho phòng thử nhân vật (?lab): tư thế do người gọi cấp mỗi khung hình. */
export function StaticWorld({ poses, children }: { poses: (t: number) => Map<string, AgentPose>; children: ReactNode }) {
  const ref = useRef<WorldFrame>({ poses: new Map(), t: 0, frame: 0 });
  useFrame(state => { ref.current.poses = poses(state.clock.elapsedTime); ref.current.frame++; }, -10);
  return <WorldCtx.Provider value={ref}>{children}</WorldCtx.Provider>;
}

/** Đọc khung World hiện tại (dùng trong useFrame). */
export function useWorld() {
  const w = useContext(WorldCtx);
  if (!w) throw new Error('useWorld phải nằm trong <WorldSystem>');
  return w;
}
