import * as THREE from 'three';
import { StaticBatch } from '../StaticBatch';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import type { Layout } from '../../engine/layout';
import type { FactoryEvent } from '../../engine/types';
import { mat } from '../characters/procChar';
import { useStaticLabel } from '../labels';
import type { Palette } from '../palette';
import { B } from '../rooms/Props';
import { factory } from '../../store';

/* ---------- pantry, cổng xuất bản ---------- */
export function Pantry({ L, pal }: { L: Layout; pal: Palette }) {
  useStaticLabel('lbl-wrap', '<div class="sign3d" style="--c:#c7864a"><b>Pantry</b><span>giải lao</span></div>', [L.pantry.x - 0.4, 2.6, L.pantry.z], 15);
  const light = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xff5a3c, emissive: 0xff5a3c, emissiveIntensity: 3, toneMapped: false }), []);
  return (
    <group position={[L.pantry.x, 0, L.pantry.z]}>
      <StaticBatch>
      <B s={[1.2, 0.95, 2.6]} p={[-0.4, 0.475, 0]} c={0x5c4635} />
      <B s={[0.55, 0.75, 0.5]} p={[-0.4, 1.32, -0.6]} c={0x2b2f38} opts={{ metalness: 0.4, roughness: 0.5 }} />
      <mesh position={[-0.12, 1.5, -0.6]} material={light}><sphereGeometry args={[0.05, 8, 6]} /></mesh>
      <mesh position={[-0.4, 1.5, 0.7]} castShadow material={mat(0x9cc7e6, { transparent: true, opacity: 0.75 })}><cylinderGeometry args={[0.28, 0.34, 1.1, 14]} /></mesh>
      <group position={[-0.6, 0, 2.2]}>
        <mesh position={[0, 0.25, 0]} castShadow material={mat(0x8a5a3a)}><cylinderGeometry args={[0.28, 0.22, 0.5, 12]} /></mesh>
        <mesh position={[0, 1.0, 0]} castShadow material={mat(pal.trim === 0x6d9a5c ? 0x4f8a4f : 0x3f7d4f)}><icosahedronGeometry args={[0.55, 1]} /></mesh>
      </group>
      </StaticBatch>
    </group>
  );
}

export function ExitGate({ L, chId }: { L: Layout; chId: string }) {
  useStaticLabel('lbl-wrap', '<div class="sign3d" style="--c:#d0302a"><b>▶ YouTube</b><span>Private</span></div>', [L.exit.x + 2.6, 4.3, L.exit.z], 15);
  const sign = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xd0302a, emissive: 0xd0302a, emissiveIntensity: 1.8, toneMapped: false }), []);
  const belt = useRef<THREE.Group>(null);
  const items = useRef<{ t0: number }[]>([]);
  useEffect(() => {
    const f = (e: FactoryEvent) => { if (e.ch === chId && e.type === 'job.done') items.current.push({ t0: performance.now() }); };
    factory.listeners.add(f); return () => { factory.listeners.delete(f); };
  }, [chId]);
  useFrame(() => {
    const now = performance.now();
    items.current = items.current.filter(i => now - i.t0 < 4000).slice(-4);
    belt.current?.children.forEach((m, k) => {
      const it = items.current[k];
      m.visible = !!it;
      if (it) m.position.x = -1.2 + ((now - it.t0) / 4000) * 3.6;
    });
  });
  return (
    <group position={[L.exit.x, 0, L.exit.z]}>
      <StaticBatch>
      <B s={[3.6, 0.14, 1.2]} p={[0.6, 0.55, 0]} c={0x2d313c} />
      {[0, 1, 2, 3, 4, 5].map(k => <B key={k} s={[0.06, 0.06, 1.2]} p={[-1.0 + k * 0.6, 0.63, 0]} c={0x4a5060} />)}
      <group ref={belt} userData={{ dynamic: true }}>{[0, 1, 2, 3].map(k => <mesh key={k} position={[0, 0.68, 0]} castShadow visible={false} material={mat(0x69c88a, { emissive: 0x0d2a18 })}><boxGeometry args={[0.46, 0.06, 0.34]} /></mesh>)}</group>
      <B s={[0.3, 3.2, 0.3]} p={[2.6, 1.6, -1.1]} c={0x2a2a2a} /><B s={[0.3, 3.2, 0.3]} p={[2.6, 1.6, 1.1]} c={0x2a2a2a} />
      <mesh position={[2.6, 3.3, 0]} material={sign}><boxGeometry args={[0.3, 0.7, 2.6]} /></mesh>
      </StaticBatch>
    </group>
  );
}
