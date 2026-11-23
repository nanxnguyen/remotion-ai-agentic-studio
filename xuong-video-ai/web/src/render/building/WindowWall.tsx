import * as THREE from 'three';
import { StaticBatch } from '../StaticBatch';
import { useMemo } from 'react';
import type { Layout } from '../../engine/layout';
import { mat } from '../characters/procChar';
import { B } from '../rooms/Props';

/* ---------- bầu trời ngoài cửa sổ ---------- */
export function WindowWall({ L, sky, night }: { L: Layout; sky: number; night: boolean }) {
  const z = L.zMin - 7.5, w = L.exit.x - L.director.x + 12, cx = (L.exit.x + L.director.x) / 2;
  const glass = useMemo(() => new THREE.MeshBasicMaterial({ color: sky, toneMapped: false }), [sky]);
  const lit = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xffd27a, emissive: 0xffd27a, emissiveIntensity: night ? 2.2 : 0.2, toneMapped: false }), [night]);
  const bld = useMemo(() => Array.from({ length: Math.floor(w / 2.2) }, (_, k) => ({ x: cx - w / 2 + 1 + k * 2.2, h: 1.5 + ((k * 37) % 7) * 0.45 })), [w, cx]);
  return (
    <group position={[0, 0, z]}>
      <StaticBatch>
      <mesh position={[cx, 2.6, -0.6]}><planeGeometry args={[w, 4.4]} /><primitive object={glass} attach="material" /></mesh>
      {bld.map((b, k) => (
        <group key={k} position={[b.x, 0, -0.4]}>
          <mesh position={[0, 0.6 + b.h / 2, 0]} material={mat(night ? 0x141a28 : 0x7f93aa)}><boxGeometry args={[1.8, b.h, 0.1]} /></mesh>
          {k % 2 === 0 && <mesh position={[0.3, 0.8 + b.h * 0.6, 0.06]} material={lit}><planeGeometry args={[0.25, 0.2]} /></mesh>}
        </group>
      ))}
      <B s={[w, 0.6, 0.3]} p={[cx, 0.3, 0]} c={0x3a3f4c} />
      <B s={[w, 0.3, 0.3]} p={[cx, 4.95, 0]} c={0x3a3f4c} />
      {Array.from({ length: Math.floor(w / 4) + 1 }, (_, k) => <B key={k} s={[0.2, 4.6, 0.3]} p={[cx - w / 2 + k * 4, 2.6, 0]} c={0x3a3f4c} />)}
      </StaticBatch>
    </group>
  );
}
