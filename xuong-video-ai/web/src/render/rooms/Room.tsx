import * as THREE from 'three';
import { SEAT_FORWARD } from '../characters/robotKit';
import { StaticBatch } from '../StaticBatch';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { layout } from '../../engine/layout';
import { agentStatus, waitingHuman } from '../../engine/sim';
import type { AgentDef, AgentStatus, StepDef, Workflow } from '../../engine/types';
import { mat } from '../characters/procChar';
import { useStaticLabel } from '../labels';
import { esc, type Palette } from '../palette';
import { B, Prop } from './Props';
import { factory, isRealStep } from '../../store';
import { agentColor } from '../../theme/lch';

/* ---------- một phòng ---------- */
/** Đánh dấu vật liệu đổi màu lúc chạy để StaticBatch không nướng màu của nó. */
const live = <T extends THREE.Material>(m: T) => { m.userData.live = true; return m; };

export function Room({ step, agent, wf, pal, chId, selected, statusHex, onSelect }: {
  step: StepDef; agent: AgentDef | undefined; wf: Workflow; pal: Palette; chId: string; selected: boolean;
  statusHex: Record<string, string>; onSelect: () => void;
}) {
  const L = layout(wf);
  const r = L.rooms[step.id];
  const tile = useMemo(() => live(new THREE.MeshStandardMaterial({ color: new THREE.Color(pal.floor).lerp(new THREE.Color(agentColor(agent?.hue ?? 0)), 0.12), roughness: 0.9 })), [pal, agent]);
  const lamp = useMemo(() => live(new THREE.MeshStandardMaterial({ color: 0x777777, emissive: 0x777777, emissiveIntensity: 1, toneMapped: false })), []);
  const screen = useMemo(() => live(new THREE.MeshBasicMaterial({ color: 0x223355, toneMapped: false })), []);
  const onAir = useMemo(() => live(new THREE.MeshStandardMaterial({ color: 0x3a1212, emissive: 0x000000, toneMapped: false })), []);
  const stack = useRef<THREE.Group>(null);
  const deskFolder = useRef<THREE.Mesh>(null);
  const isHuman = step.kind === 'human';

  useEffect(() => { tile.emissive.set(selected ? statusHex.accent : 0x000000); tile.emissiveIntensity = selected ? 0.12 : 0; }, [selected, statusHex, tile]);

  useFrame(() => {
    const ch = factory.channels[chId];
    const a = agent && ch.agents[agent.id];
    const t = factory.t;
    const here = a && a.stepId === step.id && !a.walk;
    const st: AgentStatus = isHuman ? (waitingHuman(ch).some(w => w.step.id === step.id) ? 'waiting_human' : 'idle') : here ? agentStatus(ch, a!, t) : 'idle';
    const col = statusHex[st];
    lamp.color.set(col); lamp.emissive.set(col); lamp.emissiveIntensity = st === 'idle' ? 0.6 : 2.6;
    screen.color.set(st === 'working' ? 0x3d6fb8 : st === 'error' ? 0x8a2020 : st === 'thinking' ? 0x4a3f80 : st === 'waiting_human' ? 0x7a6420 : 0x1a2132);
    onAir.emissive.set(st === 'working' && step.prop === 'voice' ? 0xff3b3b : 0x000000); onAir.emissiveIntensity = 2;
    let q = 0;
    for (const id of ch.order) { const j = ch.jobs[id]; if (j.status === 'running') { const s = j.steps[step.id]?.status; if (s === 'queued' || (isHuman && s === 'waiting_human')) q++; } }
    stack.current?.children.forEach((m, k) => { m.visible = k < q; });
    if (deskFolder.current) deskFolder.current.visible = !!here && (st === 'working' || st === 'thinking' || st === 'error');
  });

  const real = isRealStep(chId, step.id);
  const signHtml = `<div class="sign3d" style="--c:${agentColor(agent?.hue ?? 0)}"><b>${esc(step.name)}</b><span>${esc(agent?.name ?? '')}</span>${real ? '<i class="claude">Claude</i>' : ''}</div>`;
  useStaticLabel('lbl-wrap', signHtml, [r.x, 2.75, r.z - 3], 15);
  const hue = agentColor(agent?.hue ?? 0);
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({ color: 0xdfe9f5, roughness: 0.15, metalness: 0, transparent: true, opacity: 0.16, depthWrite: false, clearcoat: 1, clearcoatRoughness: 0.1 }), []);
  const rug = useMemo(() => new THREE.MeshStandardMaterial({ color: new THREE.Color(hue).lerp(new THREE.Color(0x24262e), 0.55), roughness: 0.95 }), [hue]);
  const frost = useMemo(() => new THREE.MeshStandardMaterial({ color: hue, roughness: 0.6, transparent: true, opacity: 0.55, depthWrite: false }), [hue]);
  const strip = useMemo(() => new THREE.MeshStandardMaterial({ color: hue, emissive: hue, emissiveIntensity: 1.4, toneMapped: false }), [hue]);
  const deskMat = useMemo(() => new THREE.MeshStandardMaterial({ color: pal.desk, roughness: 0.42, metalness: 0.05 }), [pal]);
  const bulb = useMemo(() => live(new THREE.MeshStandardMaterial({ color: 0xffe0b0, emissive: 0xffd49a, emissiveIntensity: 2, toneMapped: false })), []);
  const light = useRef<THREE.PointLight>(null);
  const hover = useRef(false);
  useFrame(state => {
    if (!light.current) return;
    const ch = factory.channels[chId]; const a = agent && ch.agents[agent.id];
    const busy = !!a && a.stepId === step.id && !a.walk && !!a.jobId;
    const target = busy ? 38 : 12;
    light.current.intensity += (target - light.current.intensity) * 0.06;
    bulb.emissiveIntensity = 0.8 + light.current.intensity / 12;
    if (hover.current && !selected) { tile.emissive.set(statusHex.accent); tile.emissiveIntensity = 0.05 + 0.03 * Math.sin(state.clock.elapsedTime * 5); }
  });
  return (
    <group position={[r.x, 0, r.z]}
      onClick={e => { e.stopPropagation(); onSelect(); }}
      onPointerOver={e => { e.stopPropagation(); hover.current = true; document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { hover.current = false; document.body.style.cursor = ''; if (!selected) { tile.emissive.set(0x000000); tile.emissiveIntensity = 0; } }}>
      <StaticBatch>
      <RoundedBox args={[5.9, 0.1, 5.9]} radius={0.05} smoothness={2} position={[0, 0.05, 0]} receiveShadow material={tile} />
      {/* thảm theo màu agent dưới khu làm việc */}
      <mesh position={[0, 0.104, -0.15]} receiveShadow material={rug}><boxGeometry args={[3.8, 0.008, 3.4]} /></mesh>
      {/* tường sau: nền tối + nan gỗ dọc + dải LED màu agent */}
      <B s={[6.1, 2.4, 0.12]} p={[0, 1.2, -3]} c={0x1d1f26} opts={{ roughness: 0.9 }} />
      {Array.from({ length: 15 }, (_, k) => <B key={k} s={[0.07, 2.2, 0.06]} p={[-2.8 + k * 0.4, 1.2, -2.91]} c={0xa8794f} opts={{ roughness: 0.55 }} />)}
      <mesh position={[0, 2.36, -2.9]} material={strip}><boxGeometry args={[5.8, 0.04, 0.04]} /></mesh>
      {/* vách kính cao trần, khung nhôm đen mảnh, dải kính mờ màu agent ngang tầm mắt */}
      {[-3, 3].map(x => (
        <group key={x}>
          <B s={[0.07, 0.07, 6]} p={[x, 0.035, 0]} c={0x16181d} opts={{ metalness: 0.7, roughness: 0.3 }} />
          <B s={[0.07, 0.07, 6]} p={[x, 2.36, 0]} c={0x16181d} opts={{ metalness: 0.7, roughness: 0.3 }} />
          {[-2.97, -1, 1, 2.97].map(z => <B key={z} s={[0.07, 2.36, 0.05]} p={[x, 1.18, z]} c={0x16181d} opts={{ metalness: 0.7, roughness: 0.3 }} />)}
          <mesh position={[x, 1.2, 0]} material={glass}><boxGeometry args={[0.03, 2.26, 5.9]} /></mesh>
          <mesh position={[x, 1.3, 0]} material={frost}><boxGeometry args={[0.036, 0.22, 5.9]} /></mesh>
        </group>
      ))}
      {/* bàn bo góc, chân kim loại */}
      <RoundedBox args={[2.6, 0.1, 1.1]} radius={0.04} smoothness={3} position={[0, 0.88, 0.35]} castShadow receiveShadow material={deskMat} />
      {[[-1.2, -0.1], [1.2, -0.1], [-1.2, 0.8], [1.2, 0.8]].map(([x, z], k) => <B key={k} s={[0.06, 0.82, 0.06]} p={[x, 0.41, z]} c={0x2b2e36} opts={{ metalness: 0.7, roughness: 0.3 }} />)}
      {!isHuman && (
        <group position={[0.65, 1.3, 0.2]} rotation={[0, Math.PI + 0.55, 0]}>
          <RoundedBox args={[0.98, 0.62, 0.05]} radius={0.02} smoothness={2} material={mat(0x15171c, { roughness: 0.3, metalness: 0.4 })} castShadow />
          <mesh position={[0, 0, 0.03]} material={screen}><planeGeometry args={[0.88, 0.52]} /></mesh>
          <B s={[0.05, 0.3, 0.05]} p={[0, -0.42, 0]} c={0x2b2e36} opts={{ metalness: 0.7, roughness: 0.3 }} />
        </group>)}
      <B s={[0.05, 0.35, 0.05]} p={[-1.05, 1.1, 0.7]} c={0x2a2a2a} />
      <mesh position={[-1.05, 1.32, 0.7]} material={lamp}><sphereGeometry args={[0.12, 14, 10]} /></mesh>
      <mesh ref={deskFolder} userData={{ dynamic: true }} position={[-0.15, 0.97, 0.15]} castShadow material={mat(0xe1a54a)} visible={false}><boxGeometry args={[0.46, 0.05, 0.34]} /></mesh>
      {/* đèn thả trần */}
      <group position={[0, 0, 0.25]}>
        <mesh position={[0, 3.75, 0]} material={mat(0x1a1a1a)}><cylinderGeometry args={[0.012, 0.012, 1.3, 4]} /></mesh>
        <mesh position={[0, 3.05, 0]} castShadow material={mat(0x22252d, { metalness: 0.5, roughness: 0.35, side: THREE.DoubleSide })}><coneGeometry args={[0.42, 0.34, 24, 1, true]} /></mesh>
        <mesh position={[0, 2.92, 0]} material={bulb}><sphereGeometry args={[0.11, 12, 8]} /></mesh>
        <pointLight ref={light} position={[0, 2.75, 0]} color={0xffd9a8} intensity={12} distance={8} decay={2} />
      </group>
      {/* ghế công thái học */}
      <group position={[0, 0, -0.9 + SEAT_FORWARD]}>
        <RoundedBox args={[0.8, 0.12, 0.8]} radius={0.05} smoothness={2} position={[0, 0.48, 0]} castShadow material={mat(0x262a36, { roughness: 0.6 })} />
        <RoundedBox args={[0.78, 0.82, 0.1]} radius={0.05} smoothness={2} position={[0, 0.92, -0.38]} castShadow material={mat(0x262a36, { roughness: 0.6 })} />
        <B s={[0.07, 0.42, 0.07]} p={[0, 0.22, 0]} c={0x15171d} opts={{ metalness: 0.6 }} />
        <mesh position={[0, 0.03, 0]} material={mat(0x15171d, { metalness: 0.6 })}><cylinderGeometry args={[0.36, 0.36, 0.04, 5]} /></mesh>
      </group>
      {/* khay hồ sơ đến */}
      <RoundedBox args={[0.85, 0.75, 0.55]} radius={0.04} smoothness={2} position={[1.9, 0.375, 2.35]} castShadow material={mat(0x4a5063, { roughness: 0.5 })} />
      <B s={[0.68, 0.05, 0.48]} p={[1.9, 0.78, 2.35]} c={0x2a2e3a} />
      <group ref={stack} userData={{ dynamic: true }}>{Array.from({ length: 7 }, (_, k) => <mesh key={k} position={[1.9, 0.83 + k * 0.055, 2.35]} rotation={[0, k % 2 ? 0.1 : -0.08, 0]} castShadow material={mat(0xe1a54a)} visible={false}><boxGeometry args={[0.46, 0.05, 0.34]} /></mesh>)}</group>
      {step.prop === 'voice' && <mesh position={[0, 1.9, -2.9]} material={onAir}><boxGeometry args={[1.1, 0.36, 0.06]} /></mesh>}
      <Prop kind={step.prop} pal={pal} />
      </StaticBatch>
    </group>
  );
}
