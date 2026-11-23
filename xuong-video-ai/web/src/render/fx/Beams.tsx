import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { layout, type Layout } from '../../engine/layout';
import type { FactoryEvent } from '../../engine/types';
import { factory } from '../../store';

/* ---------- tia giao việc từ đạo diễn ---------- */
export function Beams({ L, chId, color }: { L: Layout; chId: string; color: string }) {
  const pool = useMemo(() => Array.from({ length: 10 }, () => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1, 6), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, toneMapped: false }));
    m.visible = false; return m;
  }), [color]);
  const live = useRef<{ x: number; z: number; t0: number }[]>([]);
  useEffect(() => {
    const f = (e: FactoryEvent) => {
      if (e.ch !== chId || e.type !== 'step.queued') return;
      const r = layout(factory.channels[chId].workflow).rooms[e.stepId];
      if (r) live.current = [...live.current.slice(-9), { x: r.x, z: r.z, t0: performance.now() }];
    };
    factory.listeners.add(f); return () => { factory.listeners.delete(f); };
  }, [chId]);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  useFrame(() => {
    const now = performance.now();
    live.current = live.current.filter(b => now - b.t0 < 1400);
    pool.forEach((m, k) => {
      const b = live.current[k];
      m.visible = !!b;
      if (!b) return;
      const a = new THREE.Vector3(L.director.x, 2.4, L.director.z), c = new THREE.Vector3(b.x, 2.6, b.z);
      const d = c.clone().sub(a);
      m.position.copy(a).addScaledVector(d, 0.5);
      m.scale.set(1, d.length(), 1);
      m.quaternion.setFromUnitVectors(up, d.normalize());
      (m.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - (now - b.t0) / 1400);
    });
  });
  return <>{pool.map((m, k) => <primitive key={k} object={m} />)}</>;
}
