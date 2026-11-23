import * as THREE from 'three';
import { PerformanceMonitor } from '@react-three/drei';
import { memo, type ReactNode, useEffect, useMemo, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { layout, seatOf } from '../engine/layout';
import { CHANNELS } from '../engine/presets';
import { homeStep } from '../engine/sim';
import { ExitGate, Pantry } from './building/Stations';
import { DirectorRoom } from './building/DirectorRoom';
import { WindowWall } from './building/WindowWall';
import { Camera } from './camera/Camera';
import { Character, useRobotKit } from './characters/Character';
import { WorldSystem } from '../world/WorldSystem';
import { mat } from './characters/procChar';
import { Beams } from './fx/Beams';
import { Cat } from './fx/Cat';
import { Confetti, Dust, HoloRing, Plant, PostFX, StudioLight, TrailDots } from './fx/effects';
import { PALETTES, STATUS_HEX, skyFor, vnHour } from './palette';
import { Room } from './rooms/Room';
import { StaticBatch } from './StaticBatch';
import { factory, useUI } from '../store';
import { THEMES, generateTheme } from '../theme/lch';

/* ---------- toàn cảnh ---------- */
export function SceneInner({ chId }: { chId: string; version: number }): ReactNode {
  const theme = useUI(s => s.theme), selStep = useUI(s => s.selStep), setUI = useUI(s => s.set);
  const ui = { theme, selStep, set: setUI };
  const ch = factory.channels[chId];
  const wf = ch.workflow;
  const L = layout(wf);
  const def = CHANNELS.find(c => c.id === chId)!;
  const pal = PALETTES[def.theme];
  const statusHex = useMemo(() => STATUS_HEX(ui.theme), [ui.theme]);
  const [fx, setFx] = useState<'high' | 'low' | 'off'>('high');
  const sky = useMemo(() => skyFor(vnHour()), []);
  const bg = useMemo(() => generateTheme(THEMES[ui.theme]).bg, [ui.theme]);
  const x0 = L.director.x - 5, x1 = L.exit.x + 5, z0 = L.zMin - 7.8, z1 = Math.max(L.zMax + 6, L.pantry.z + 3.5);
  const sel = (id: string) => ui.set({ selStep: id });
  const reduce = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const kit = useRobotKit();
  const guide = useMemo(() => new THREE.MeshBasicMaterial({ color: new THREE.Color(statusHex.accent).multiplyScalar(0.9), toneMapped: false, transparent: true, opacity: 0.55 }), [statusHex]);
  const plants = useMemo(() => [[x0 + 1.4, z0 + 7.2, 1.1], [x1 - 1.4, z0 + 7.2, 1.2], [x1 - 1.2, z1 - 1.3, 1], [(x0 + x1) / 2, z1 - 1.2, 0.9]] as [number, number, number][], [x0, x1, z0, z1]);

  return (
    <WorldSystem chId={chId}>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 110, 230]} />
      <StudioLight cx={(x0 + x1) / 2} cz={(z0 + z1) / 2} w={x1 - x0} accent={statusHex.accent} night={sky.night} />
      <hemisphereLight args={[0xdfe6ff, 0x4a3e34, sky.hemi * 2.2]} />
      <directionalLight position={[x0 + 10, 40, z1 + 18]} intensity={sky.sun * 3.2} color={sky.night ? 0xc8d4ff : 0xfff1de} castShadow
        shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-normalBias={0.03} shadow-radius={4}
        shadow-camera-left={-(x1 - x0) / 2 - 6} shadow-camera-right={(x1 - x0) / 2 + 6} shadow-camera-top={(z1 - z0) / 2 + 8} shadow-camera-bottom={-(z1 - z0) / 2 - 8}
        shadow-camera-near={1} shadow-camera-far={140} target-position={[(x0 + x1) / 2, 0, (z0 + z1) / 2]} />
      <ambientLight intensity={0.3} />
      <mesh position={[(x0 + x1) / 2, -0.16, (z0 + z1) / 2]} receiveShadow material={mat(pal.slab)}><boxGeometry args={[x1 - x0, 0.3, z1 - z0]} /></mesh>
      <mesh position={[(x0 + x1) / 2, -0.35, (z0 + z1) / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={mat(0x0c0f15)}><planeGeometry args={[400, 300]} /></mesh>
      {/* hành lang bắt đầu sau cửa phòng đạo diễn */}
      <mesh position={[(L.director.x + 3.6 + x1 - 1) / 2, 0.005, 0]} receiveShadow material={mat(pal.corridor, { roughness: 0.35 })}><boxGeometry args={[x1 - 1 - (L.director.x + 3.6), 0.01, 1.4]} /></mesh>
      {[-0.72, 0.72].map(z => <mesh key={z} position={[(L.director.x + 3.6 + x1 - 1) / 2, 0.02, z]} material={guide}><boxGeometry args={[x1 - 1 - (L.director.x + 3.6), 0.01, 0.04]} /></mesh>)}
      <StaticBatch>{plants.map((p, k) => <Plant key={k} x={p[0]} z={p[1]} s={p[2]} tint={pal.trim === 0x6d9a5c ? 0x4f8a4f : 0x3f7d4f} />)}</StaticBatch>
      <WindowWall L={L} sky={sky.sky} night={sky.night} />
      {wf.steps.map(s => (
        <Room key={s.id + wf.version} step={s} agent={wf.agents.find(a => a.id === s.agentId)} wf={wf} pal={pal} chId={chId}
          selected={ui.selStep === s.id} statusHex={statusHex} onSelect={() => sel(s.id)} />
      ))}
      {wf.steps.filter(s => s.kind !== 'human').map(s => { const p = seatOf(L, s.id); return <HoloRing key={'h' + s.id + wf.version} chId={chId} stepId={s.id} agentId={s.agentId} x={p.x} z={p.z} hex={statusHex} />; })}
      {wf.agents.map(a => <TrailDots key={'t' + a.id + wf.version} chId={chId} agentId={a.id} hex={statusHex} />)}
      <Confetti chId={chId} L={L} />
      {fx !== 'off' && !reduce && <Dust cx={(x0 + x1) / 2} cz={(z0 + z1) / 2} w={x1 - x0} d={z1 - z0} />}
      {wf.agents.map((a, i) => (
        <Character key={a.id + wf.version} kit={kit} def={a} seed={i * 7 + a.hue} statusHex={statusHex} reduce={reduce}
          onSelect={() => sel(a.role === 'director' ? 'director' : (homeStep(ch, a.id) ?? 'director'))} />
      ))}
      <DirectorRoom L={L} chId={chId} pal={pal} accent={statusHex.accent} selected={ui.selStep === 'director'} onSelect={() => sel('director')} />
      <Pantry L={L} pal={pal} />
      <ExitGate L={L} chId={chId} />
      <Beams L={L} chId={chId} color={statusHex.accent} />
      <Cat L={L} chId={chId} wf={wf} />
      <Camera L={L} chId={chId} />
      <BenchHook />
      <PerformanceMonitor onDecline={() => setFx(f => (f === 'high' ? 'low' : 'off'))} onIncline={() => setFx(f => (f === 'off' ? 'low' : 'high'))} />
      {fx !== 'off' && <PostFX quality={reduce ? 'low' : fx} />}
    </WorldSystem>
  );
}

/** ?bench: lộ scene và renderer ra window để đo (không bật trong dùng thường). */
function BenchHook() {
  const { scene, gl } = useThree();
  useEffect(() => { if (new URLSearchParams(location.search).has('bench')) Object.assign(window, { __xvScene: scene, __xvGl: gl, __xvUI: useUI }); }, [scene, gl]);
  return null;
}

export const Scene = memo(SceneInner);
