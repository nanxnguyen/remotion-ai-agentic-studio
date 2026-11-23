import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { AgentDef } from '../../engine/types';
import { AGENT_META } from '../../ui';
import { useWorld } from '../../world/WorldSystem';
import { placeLabel, useLabel } from '../labels';
import { esc } from '../palette';

const RING = new THREE.RingGeometry(0.5, 0.62, 40).rotateX(-Math.PI / 2);
const DOT = new THREE.SphereGeometry(1, 10, 8);

/** Phần "thông tin" của một agent, dùng chung cho mọi kiểu nhân vật: vòng trạng thái, bong bóng nghĩ, nhãn. */
export function AgentOverlay({ def, statusHex, reduce }: { def: AgentDef; statusHex: Record<string, string>; reduce: boolean }) {
  const world = useWorld();
  const label = useLabel('lbl3d');
  const key = useRef('');
  const { size } = useThree();
  const g = useRef<THREE.Group>(null);
  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#7d8597', transparent: true, opacity: 0.8, depthWrite: false, toneMapped: false }), []);
  const dotMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fff', toneMapped: false }), []);
  const ring = useRef<THREE.Mesh>(null);
  const dots = useRef<THREE.Group>(null);

  useFrame(state => {
    const p = world.current.poses.get(def.id);
    if (!g.current) return;
    if (!p || !p.visible) { g.current.visible = false; label.style.display = 'none'; return; }
    g.current.visible = true;
    g.current.position.set(p.x, 0, p.z);
    const col = statusHex[p.status];
    const T = state.clock.elapsedTime;
    ringMat.color.set(col);
    ringMat.opacity = p.status === 'error' && !reduce ? 0.45 + Math.abs(Math.sin(T * 4)) * 0.5 : 0.8;
    if (ring.current) ring.current.visible = !p.walking || p.carry;
    const top = 2.5 - 0.45 * p.sit;
    if (dots.current) {
      dots.current.visible = p.status === 'thinking' && !p.walking;
      if (dots.current.visible) {
        dotMat.color.set(col).multiplyScalar(1.6);
        dots.current.position.y = top - 0.25;
        dots.current.children.forEach((o, k) => { o.position.y = k * 0.2 + (reduce ? 0 : Math.sin(T * 5 - k) * 0.05); });
      }
    }
    placeLabel(label, state.camera, size.width, size.height, p.x, top, p.z, 13);
    const k = `${p.status}|${p.line}|${Math.round(p.progress * 30)}|${col}`;
    if (k !== key.current) {
      key.current = k;
      label.style.setProperty('--c', col);
      label.innerHTML = `<div class="box"><b>● ${esc(def.name)} · ${AGENT_META[p.status].label}</b><div class="s">${esc(p.line)}</div>${p.progress >= 0 ? `<div class="pb"><i style="width:${Math.round(p.progress * 100)}%"></i></div>` : ''}</div>`;
    }
  });

  return (
    <group ref={g}>
      <mesh ref={ring} geometry={RING} material={ringMat} position={[0, 0.07, 0]} />
      <group ref={dots}>
        {[0.07, 0.1, 0.14].map((r, k) => <mesh key={k} geometry={DOT} material={dotMat} scale={r} position={[0.32 + k * 0.17, k * 0.2, 0]} />)}
      </group>
    </group>
  );
}
