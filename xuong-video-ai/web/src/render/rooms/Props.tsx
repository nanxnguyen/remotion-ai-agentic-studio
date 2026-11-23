import * as THREE from 'three';
import { useMemo } from 'react';
import { mat } from '../characters/procChar';
import type { Palette } from '../palette';

/* ---------- khối hình đơn giản ---------- */
export function B({ s, p, c, opts, r }: { s: [number, number, number]; p: [number, number, number]; c: THREE.ColorRepresentation; opts?: THREE.MeshStandardMaterialParameters; r?: [number, number, number] }) {
  const m = useMemo(() => mat(c, opts), [c, opts]);
  return <mesh position={p} rotation={r} castShadow receiveShadow material={m}><boxGeometry args={s} /></mesh>;
}

/* ---------- đồ đạc theo nghề ---------- */
export function Prop({ kind, pal }: { kind: string; pal: Palette }) {
  const wood = 0x6b4a33, dark = 0x22252f, paper = 0xece6d6;
  switch (kind) {
    case 'research': return (
      <group position={[2.05, 0, -1.6]} rotation={[0, -0.45, 0]}>
        <B s={[0.06, 1.6, 0.06]} p={[-0.5, 0.8, 0]} c={wood} /><B s={[0.06, 1.6, 0.06]} p={[0.5, 0.8, 0]} c={wood} />
        <B s={[1.3, 0.95, 0.05]} p={[0, 1.45, 0.04]} c={0xa0784f} />
        {[0xf2e6c4, 0xe9c46a, 0xcfd8e3, 0xf4a261, 0xb8d8be, 0xe0c3fc].map((c, k) => <B key={k} s={[0.3, 0.22, 0.02]} p={[-0.42 + (k % 3) * 0.42, 1.63 - Math.floor(k / 3) * 0.38, 0.08]} c={c} />)}
        <B s={[0.85, 0.02, 0.02]} p={[0, 1.45, 0.1]} r={[0, 0, 0.35]} c={0xc0392b} />
      </group>);
    case 'script': return (
      <group>
        <B s={[0.62, 0.2, 0.42]} p={[-0.7, 1.0, 0.35]} c={dark} /><B s={[0.4, 0.34, 0.02]} p={[-0.7, 1.2, 0.2]} r={[-0.25, 0, 0]} c={paper} />
        {[[1.4, -1.9], [2.1, -0.6], [-2.2, -2.0]].map(([x, z], k) => <mesh key={k} position={[x, 0.12, z]} castShadow material={mat(paper)}><icosahedronGeometry args={[0.12, 0]} /></mesh>)}
      </group>);
    case 'audit': return (
      <group>
        <mesh position={[-0.75, 0.98, 0.35]} castShadow material={mat(0xb83b3b)}><cylinderGeometry args={[0.16, 0.2, 0.12, 16]} /></mesh>
        <mesh position={[-0.75, 1.16, 0.35]} castShadow material={mat(wood)}><cylinderGeometry args={[0.05, 0.05, 0.25, 10]} /></mesh>
        {[0, 1, 2, 3].map(k => <B key={k} s={[0.5, 0.03, 0.38]} p={[-0.2, 0.94 + k * 0.035, 0.45]} c={paper} />)}
      </group>);
    case 'voice': return (
      <group>
        <mesh position={[-0.6, 1.17, 0.25]} material={mat(dark)}><cylinderGeometry args={[0.03, 0.03, 0.5, 8]} /></mesh>
        <mesh position={[-0.6, 1.47, 0.25]} castShadow material={mat(0x8a8f9c, { metalness: 0.6, roughness: 0.4 })}><sphereGeometry args={[0.12, 14, 10]} /></mesh>
        <mesh position={[1.9, 0.7, -2.0]} castShadow material={mat(0x3a3f4a)}><boxGeometry args={[0.9, 1.4, 0.7]} /></mesh>
      </group>);
    case 'music': return (
      <group>
        <B s={[0.9, 0.08, 0.45]} p={[-0.55, 0.96, 0.4]} c={0x2a2d36} />
        {[0, 1, 2, 3, 4].map(k => <B key={k} s={[0.05, 0.06, 0.2]} p={[-0.85 + k * 0.15, 1.02, 0.4]} c={0xe0e0e0} />)}
        <B s={[0.5, 0.9, 0.45]} p={[2.1, 0.45, -1.9]} c={0x1f2128} /><B s={[0.5, 0.9, 0.45]} p={[-2.1, 0.45, -1.9]} c={0x1f2128} />
      </group>);
    case 'storyboard': case 'thumbnail': case 'animation': return (
      <group position={[2.05, 0, -1.6]} rotation={[0, -0.45, 0]}>
        <B s={[0.06, 1.6, 0.06]} p={[0, 0.8, 0]} c={wood} />
        <B s={[1.3, 0.9, 0.05]} p={[0, 1.5, 0.05]} c={kind === 'thumbnail' ? 0x2b2b2b : 0xd9d4c8} />
        {kind === 'thumbnail'
          ? <><B s={[0.5, 0.6, 0.02]} p={[-0.3, 1.5, 0.09]} c={0xe94b3c} /><B s={[0.5, 0.18, 0.02]} p={[0.3, 1.65, 0.09]} c={0xf2c14e} /><B s={[0.5, 0.12, 0.02]} p={[0.3, 1.38, 0.09]} c={0xffffff} /></>
          : [0xf4a261, 0x8ecae6, 0xb8d8be, 0xe0c3fc, 0xf2e6c4, 0xcfd8e3].map((c, k) => <B key={k} s={[0.34, 0.26, 0.02]} p={[-0.42 + (k % 3) * 0.42, 1.68 - Math.floor(k / 3) * 0.36, 0.09]} c={c} />)}
      </group>);
    case 'render': return (
      <group position={[-1.0, 1.6, -0.05]} rotation={[0, 0.35, 0]}>
        <B s={[1.5, 0.85, 0.08]} p={[0, 0, 0]} c={dark} />
        {[0x5b9cf0, 0xf2a93b, 0x4fbf7f, 0xa493f5].map((c, k) => <mesh key={k} position={[-0.35 + (k % 2) * 0.3, 0.25 - k * 0.17, -0.045]} rotation={[0, Math.PI, 0]}><planeGeometry args={[0.4 + ((k * 7) % 5) * 0.15, 0.1]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>)}
      </group>);
    case 'qa': return (
      <group>
        <B s={[0.36, 0.02, 0.48]} p={[-0.7, 0.93, 0.4]} c={0x8a6a44} /><B s={[0.3, 0.02, 0.4]} p={[-0.7, 0.945, 0.4]} c={paper} />
        <mesh position={[-0.25, 0.96, 0.5]} rotation={[-Math.PI / 2, 0, 0]} material={mat(0x9aa0aa, { metalness: 0.7, roughness: 0.3 })}><torusGeometry args={[0.13, 0.025, 8, 20]} /></mesh>
      </group>);
    case 'publish': return (
      <group>{[[1.8, 0.25, -1.7, 0.5], [2.25, 0.23, -1.2, 0.45], [2.0, 0.72, -1.6, 0.42]].map(([x, y, z, s], k) => <B key={k} s={[s, s, s]} p={[x, y, z]} c={0xb98a55} />)}</group>);
    case 'approve': return (
      <group>
        <B s={[1.4, 0.8, 0.06]} p={[0, 1.55, -0.1]} r={[0, Math.PI, 0]} c={0x111318} />
        <mesh position={[0, 1.55, -0.135]} rotation={[0, Math.PI, 0]}><planeGeometry args={[1.3, 0.7]} /><meshBasicMaterial color={0x2c3d5c} toneMapped={false} /></mesh>
        <mesh position={[-0.8, 0.99, 0.45]} material={mat(0x2f7d4f)}><cylinderGeometry args={[0.13, 0.16, 0.1, 16]} /></mesh>
        <B s={[0.9, 0.04, 0.6]} p={[1.9, 0.02, -1.8]} c={pal.trim} />
      </group>);
    default: return null;
  }
}
