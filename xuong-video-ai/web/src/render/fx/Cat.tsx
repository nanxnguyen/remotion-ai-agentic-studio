import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useContext, useRef } from 'react';
import { seatOf, type Layout } from '../../engine/layout';
import { agentStatus, homeStep } from '../../engine/sim';
import type { Workflow } from '../../engine/types';
import { mat } from '../characters/procChar';
import { OverlayCtx } from '../labels';
import { factory } from '../../store';

/* ---------- mèo văn phòng ---------- */
export function Cat({ L, chId, wf }: { L: Layout; chId: string; wf: Workflow }) {
  const g = useRef<THREE.Group>(null);
  const overlay = useContext(OverlayCtx);
  const { camera, size } = useThree();
  const hop = useRef(0);
  const pet = () => {
    const host = overlay?.current; if (!host || !g.current) return;
    hop.current = 1;
    const v = g.current.position.clone().setY(1).project(camera);
    const sx = (v.x * 0.5 + 0.5) * size.width, sy = (-v.y * 0.5 + 0.5) * size.height;
    for (let k = 0; k < 6; k++) {
      const h = document.createElement('span');
      h.className = 'heart3d'; h.textContent = '♥';
      h.style.left = `${sx + (Math.random() - 0.5) * 40}px`; h.style.top = `${sy}px`;
      h.style.animationDelay = `${k * 70}ms`;
      host.appendChild(h); setTimeout(() => h.remove(), 1600);
    }
  };
  const target = useRef({ x: L.pantry.x + 1.5, z: L.pantry.z, at: 0 });
  useFrame((state, dt) => {
    if (!g.current) return;
    const now = state.clock.elapsedTime;
    if (now - target.current.at > 14) {
      const ch = factory.channels[chId];
      const idle = wf.agents.filter(a => ch.agents[a.id] && agentStatus(ch, ch.agents[a.id], factory.t) === 'idle' && homeStep(ch, a.id));
      const pick = idle[Math.floor(Math.random() * idle.length)];
      const p = pick ? seatOf(L, homeStep(ch, pick.id)!) : { x: L.pantry.x + 1.5, z: L.pantry.z };
      target.current = { x: p.x + 0.9, z: p.z - 0.6, at: now };
    }
    const pos = g.current.position, tx = target.current.x, tz = target.current.z;
    const dx = tx - pos.x, dz = tz - pos.z, dist = Math.hypot(dx, dz);
    if (dist > 0.05) { const s = Math.min(dist, dt * 1.4); pos.x += dx / dist * s; pos.z += dz / dist * s; g.current.rotation.y = Math.atan2(dx, dz); }
    g.current.children[3].rotation.z = Math.sin(now * 3) * 0.4;
    hop.current = Math.max(0, hop.current - dt * 2.2);
    g.current.position.y = Math.sin(hop.current * Math.PI) * 0.5;
  });
  return (
    <group ref={g} position={[L.pantry.x + 1.5, 0, L.pantry.z]} scale={0.8}
      onClick={e => { e.stopPropagation(); pet(); }} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
      <mesh position={[0, 0.3, 0]} visible={false}><boxGeometry args={[0.8, 0.8, 1.1]} /></mesh>
      <mesh position={[0, 0.22, 0]} castShadow material={mat(0xe0a060)}><capsuleGeometry args={[0.16, 0.35, 4, 8]} /></mesh>
      <mesh position={[0, 0.38, 0.3]} castShadow material={mat(0xe0a060)}><sphereGeometry args={[0.15, 12, 10]} /></mesh>
      <mesh position={[0, 0.35, -0.3]} rotation={[0.8, 0, 0]} material={mat(0xc88a50)}><cylinderGeometry args={[0.03, 0.02, 0.4, 6]} /></mesh>
    </group>
  );
}
