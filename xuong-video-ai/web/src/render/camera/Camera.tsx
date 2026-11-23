import { CameraControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { STAND, WALK_SPEED, layout, pathLen, sample, seatOf, type Layout, walkPath } from '../../engine/layout';
import { homeStep } from '../../engine/sim';
import type { FactoryEvent } from '../../engine/types';
import { factory, useUI } from '../../store';

/* ---------- camera ---------- */
export interface Shot { x: number; z: number; why: string; at: number; e: FactoryEvent }
export function Camera({ L, chId }: { L: Layout; chId: string }) {
  const ref = useRef<CameraControls>(null);
  const sel = useUI(s => s.selStep), follow = useUI(s => s.follow), cine = useUI(s => s.cine);
  const { size } = useThree();
  const center = useMemo(() => ({ cx: (L.exit.x + L.director.x) / 2, cz: (L.zMax + L.zMin) / 2 + 1.5 }), [L]);
  const overview = useMemo(() => (smooth = true) => {
    const w = L.exit.x - L.director.x + 10, h = L.zMax - L.zMin + 16;
    const aspect = size.width / Math.max(1, size.height);
    const d = Math.max(w / (2 * Math.tan(0.33) * Math.max(0.6, aspect)), h / (2 * Math.tan(0.33))) * 0.7;
    ref.current?.setLookAt(center.cx, d * 0.58, center.cz + d * 0.8, center.cx, 0, center.cz + 1, smooth);
  }, [L, size, center]);
  // bay vào khi mở tầng
  useEffect(() => {
    const c = ref.current; if (!c) return;
    c.setLookAt(center.cx - 70, 80, center.cz + 95, center.cx, 0, center.cz, false);
    const t = setTimeout(() => overview(true), 60);
    return () => clearTimeout(t);
  }, [chId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const h = () => overview();
    window.addEventListener('xv-overview', h); return () => window.removeEventListener('xv-overview', h);
  }, [overview]);
  useEffect(() => {
    if (!sel || follow || cine) return;
    const p = sel === 'director' ? L.director : L.rooms[sel];
    if (sel === 'director' && p) ref.current?.setLookAt(p.x + 9.5, 7.5, p.z + 7, p.x - 1.6, 1.2, p.z, true); // nhìn vào tường màn hình sau lưng đạo diễn
    else if (p) ref.current?.setLookAt(p.x + 3, 14, p.z + 17, p.x, 0.8, p.z + 0.4, true);
  }, [sel, follow, cine, L]);

  /* chế độ điện ảnh: tự lia tới nơi vừa có chuyện */
  const shots = useRef<Shot[]>([]);
  const cur = useRef<{ at: number; orbit: number } | null>(null);
  useEffect(() => {
    if (!cine) { shots.current = []; cur.current = null; overview(); return; }
    const f = (e: FactoryEvent) => {
      if (e.ch !== chId) return;
      const L2 = layout(factory.channels[chId].workflow);
      const room = (id: string) => L2.rooms[id];
      let p: { x: number; z: number } | undefined, why = '';
      if (e.type === 'step.started') { p = room(e.stepId); why = 'start'; }
      else if (e.type === 'gate.scored') { p = room(e.stepId); why = e.passed ? 'pass' : 'fail'; }
      else if (e.type === 'human.requested') { p = room(e.stepId); why = 'need'; }
      else if (e.type === 'step.failed') { p = room(e.stepId); why = 'err'; }
      else if (e.type === 'job.done') { p = L2.exit; why = 'done'; }
      if (p) shots.current = [...shots.current.slice(-7), { x: p.x, z: p.z, why, at: performance.now(), e }];
    };
    factory.listeners.add(f); return () => { factory.listeners.delete(f); };
  }, [cine, chId, overview]);
  useFrame((_, dt) => {
    const c = ref.current; if (!c) return;
    if (cine) {
      const now = performance.now();
      if (!cur.current || now - cur.current.at > 7000) {
        // ưu tiên sự kiện quan trọng mới nhất
        const rank = (s: Shot) => ({ need: 5, err: 5, done: 4, fail: 3, pass: 3, start: 1 } as Record<string, number>)[s.why] ?? 0;
        const pick = shots.current.filter(s => now - s.at < 15000).sort((a, b) => rank(b) - rank(a) || b.at - a.at)[0];
        if (pick) {
          shots.current = shots.current.filter(s => s !== pick);
          const ang = Math.random() * 1.2 - 0.6;
          c.setLookAt(pick.x + Math.sin(ang) * 15, 10 + Math.random() * 3, pick.z + Math.cos(ang) * 15, pick.x, 0.9, pick.z, true);
          window.dispatchEvent(new CustomEvent('xv-cine', { detail: pick.e }));
          cur.current = { at: now, orbit: 0.05 };
        } else if (!cur.current || now - cur.current.at > 12000) {
          overview(true); cur.current = { at: now, orbit: 0.03 };
        }
      }
      c.rotate((cur.current?.orbit ?? 0.03) * dt, 0, false);
      return;
    }
    if (!follow || !sel) return;
    const ch = factory.channels[chId];
    const step = ch.workflow.steps.find(s => s.id === sel);
    const a = step && ch.agents[step.agentId];
    if (!a) return;
    const home = homeStep(ch, a.id);
    let p = home ? seatOf(L, home) : { x: 0, z: 0 };
    if (a.walk) {
      const path = walkPath(ch.workflow, a.walk);
      const dist = Math.max(0, factory.t - a.walk.start - STAND) * WALK_SPEED;
      p = sample(path, Math.min(dist, pathLen(path)));
    }
    c.moveTo(p.x, 0.8, p.z, true);
  });
  return <CameraControls ref={ref} makeDefault minDistance={5} maxDistance={160} maxPolarAngle={1.32} smoothTime={cine ? 1.4 : 0.5} />;
}
