import { Environment, Lightformer, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, N8AO, SMAA, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { layout, pathLen, sample, STAND, WALK_SPEED, walkPath, type Layout } from '../../engine/layout';
import { agentStatus, progress } from '../../engine/sim';
import type { FactoryEvent } from '../../engine/types';
import { factory } from '../../store';

/* ---------- ánh sáng studio: môi trường tự dựng, không cần tải HDR ---------- */
export function StudioLight({ cx, cz, w, accent, night }: { cx: number; cz: number; w: number; accent: string; night: boolean }) {
  return (
    <Environment resolution={256} frames={1} environmentIntensity={night ? 0.7 : 0.95}>
      <color attach="background" args={['#0c0e13']} />
      {/* dải đèn trần dài, tạo vệt phản chiếu mềm trên mặt bàn */}
      {[-1, 0, 1].map(k => (
        <Lightformer key={k} form="rect" intensity={night ? 1.6 : 2.4} color="#fff1dc" position={[cx + k * w * 0.3, 14, cz]} rotation-x={Math.PI / 2} scale={[w * 0.22, 3, 1]} />
      ))}
      <Lightformer form="rect" intensity={1.4} color="#a9c4ff" position={[cx - w * 0.6, 6, cz + 10]} rotation-y={Math.PI / 2} scale={[24, 5, 1]} />
      <Lightformer form="ring" intensity={2.2} color={accent} position={[cx + w * 0.6, 7, cz - 12]} scale={7} />
    </Environment>
  );
}

/* ---------- hậu kỳ: AO mềm, bloom, khử răng cưa, AgX ---------- */
export function PostFX({ quality }: { quality: 'high' | 'low' }) {
  const ao = useMemo(() => new THREE.Color('#0b0a12'), []);
  if (quality === 'high') return (
    <EffectComposer multisampling={0}>
      <N8AO aoRadius={1.4} distanceFalloff={0.7} intensity={2.4} quality="performance" color={ao} />
      <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.95} luminanceSmoothing={0.25} radius={0.7} />
      <ToneMapping mode={ToneMappingMode.AGX} />
      <SMAA />
      <Vignette eskil={false} offset={0.28} darkness={0.5} />
    </EffectComposer>
  );
  return (
    <EffectComposer multisampling={0}>
      <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.95} luminanceSmoothing={0.25} radius={0.7} />
      <ToneMapping mode={ToneMappingMode.AGX} />
      <SMAA />
      <Vignette eskil={false} offset={0.28} darkness={0.5} />
    </EffectComposer>
  );
}

/* ---------- bụi sáng lơ lửng trong văn phòng ---------- */
export function Dust({ cx, cz, w, d }: { cx: number; cz: number; w: number; d: number }) {
  return <Sparkles count={Math.round(w * 2.2)} scale={[w, 4, d]} position={[cx, 2.4, cz]} size={2.2} speed={0.25} opacity={0.35} color="#ffe2b0" noise={0.6} />;
}

/* ---------- vòng tiến độ hologram dưới ghế ---------- */
const SEG = 64;
const ARCS = Array.from({ length: SEG + 1 }, (_, k) => new THREE.RingGeometry(1.06, 1.2, 64, 1, Math.PI / 2, -(k / SEG) * Math.PI * 2));
const TRACK = new THREE.RingGeometry(1.06, 1.2, 64);

export function HoloRing({ chId, stepId, agentId, x, z, hex }: { chId: string; stepId: string; agentId: string; x: number; z: number; hex: Record<string, string> }) {
  const arc = useRef<THREE.Mesh>(null);
  const track = useRef<THREE.Mesh>(null);
  const mArc = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: 0.95, toneMapped: false, depthWrite: false }), []);
  const mTrack = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: 0.12, depthWrite: false }), []);
  useFrame(state => {
    const ch = factory.channels[chId]; const a = ch?.agents[agentId];
    const on = !!a && a.stepId === stepId && !a.walk && !!a.jobId;
    if (!arc.current || !track.current) return;
    arc.current.visible = track.current.visible = on;
    if (!on) return;
    const st = agentStatus(ch, a, factory.t);
    const p = st === 'working' ? progress(a, factory.t) : st === 'thinking' ? 0.04 + 0.04 * Math.sin(state.clock.elapsedTime * 4) : st === 'error' ? 1 : 0;
    arc.current.geometry = ARCS[Math.max(0, Math.min(SEG, Math.round(p * SEG)))];
    const c = hex[st] ?? hex.accent;
    mArc.color.set(c).multiplyScalar(st === 'working' ? 2.2 : 1.4);
    mTrack.color.set(c);
    track.current.rotation.z = state.clock.elapsedTime * 0.4;
  });
  return (
    <group position={[x, 0.11, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={track} geometry={TRACK} material={mTrack} visible={false} />
      <mesh ref={arc} geometry={ARCS[0]} material={mArc} visible={false} />
    </group>
  );
}

/* ---------- vệt chấm sáng chỉ đường khi mang hồ sơ ---------- */
const DOT = new THREE.CircleGeometry(0.09, 10).rotateX(-Math.PI / 2);
const MAX_DOTS = 90;
const tmp = new THREE.Object3D();
export function TrailDots({ chId, agentId, hex }: { chId: string; agentId: string; hex: Record<string, string> }) {
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: 0.85, toneMapped: false, depthWrite: false }), []);
  const inst = useMemo(() => { const m = new THREE.InstancedMesh(DOT, mat, MAX_DOTS); m.count = 0; m.frustumCulled = false; return m; }, [mat]);
  const cache = useRef<{ w: unknown; pts: { x: number; z: number }[]; len: number } | null>(null);
  useFrame(state => {
    const ch = factory.channels[chId]; const a = ch?.agents[agentId]; const w = a?.walk;
    if (!w || (w.purpose !== 'handoff' && w.purpose !== 'rework')) { inst.count = 0; return; }
    if (cache.current?.w !== w) { const pts = walkPath(ch.workflow, w); cache.current = { w, pts, len: pathLen(pts) }; }
    const { pts, len } = cache.current!;
    const done = Math.max(0, factory.t - w.start - STAND) * WALK_SPEED;
    const T = state.clock.elapsedTime;
    let n = 0;
    for (let d = Math.ceil(done / 0.55) * 0.55; d < len && n < MAX_DOTS; d += 0.55) {
      const s = sample(pts, d);
      const wave = 0.65 + 0.35 * Math.sin(d * 1.8 - T * 6);
      const fade = Math.min(1, (len - d) / 2 + 0.3);
      tmp.position.set(s.x, 0.06, s.z); tmp.scale.setScalar(wave * fade); tmp.updateMatrix();
      inst.setMatrixAt(n++, tmp.matrix);
    }
    inst.count = n; inst.instanceMatrix.needsUpdate = true;
    mat.color.set(w.purpose === 'rework' ? hex.error : hex.walking).multiplyScalar(1.8);
  });
  return <primitive object={inst} />;
}

/* ---------- pháo giấy khi qua cổng hoặc video đăng xong ---------- */
const N_CONF = 220;
const PAL = ['#f2b84b', '#5b9cf0', '#4fbf7f', '#e5534b', '#a493f5', '#f4f1ea'].map(c => new THREE.Color(c));
export function Confetti({ chId, L }: { chId: string; L: Layout }) {
  const geo = useMemo(() => new THREE.PlaneGeometry(0.14, 0.08), []);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false }), []);
  const inst = useMemo(() => { const m = new THREE.InstancedMesh(geo, mat, N_CONF); m.count = N_CONF; m.frustumCulled = false; for (let i = 0; i < N_CONF; i++) m.setColorAt(i, PAL[i % PAL.length]); return m; }, [geo, mat]);
  const parts = useRef(Array.from({ length: N_CONF }, () => ({ life: 0, p: new THREE.Vector3(), v: new THREE.Vector3(), r: new THREE.Euler(), s: Math.random() * 6 })));
  const next = useRef(0);
  useEffect(() => {
    const burst = (x: number, z: number, n: number, y = 2.2) => {
      for (let k = 0; k < n; k++) {
        const q = parts.current[next.current++ % N_CONF];
        q.life = 2.4 + Math.random(); q.p.set(x, y, z);
        const a = Math.random() * Math.PI * 2, sp = 1.5 + Math.random() * 3;
        q.v.set(Math.cos(a) * sp, 4 + Math.random() * 4, Math.sin(a) * sp);
      }
    };
    const f = (e: FactoryEvent) => {
      if (e.ch !== chId) return;
      const L2 = layout(factory.channels[chId].workflow);
      if (e.type === 'gate.scored' && e.passed) { const r = L2.rooms[e.stepId]; if (r) burst(r.x, r.z, 45); }
      if (e.type === 'job.done') burst(L2.exit.x + 1, L2.exit.z, 110, 3);
    };
    factory.listeners.add(f); return () => { factory.listeners.delete(f); };
  }, [chId, L]);
  useFrame((_, dt) => {
    dt = Math.min(dt, 0.05);
    let any = false;
    parts.current.forEach((q, i) => {
      if (q.life <= 0) { tmp.position.set(0, -50, 0); tmp.scale.setScalar(0); tmp.updateMatrix(); inst.setMatrixAt(i, tmp.matrix); return; }
      any = true;
      q.life -= dt; q.v.y -= 9 * dt; q.v.multiplyScalar(1 - 1.6 * dt);
      q.p.addScaledVector(q.v, dt);
      if (q.p.y < 0.05) { q.p.y = 0.05; q.v.set(0, 0, 0); }
      q.s += dt * 8;
      tmp.position.copy(q.p); tmp.rotation.set(q.s, q.s * 0.7, q.s * 0.3); tmp.scale.setScalar(Math.min(1, q.life * 2)); tmp.updateMatrix();
      inst.setMatrixAt(i, tmp.matrix);
    });
    inst.visible = any;
    inst.instanceMatrix.needsUpdate = true;
  });
  return <primitive object={inst} />;
}

/* ---------- cây xanh ---------- */
export function Plant({ x, z, s = 1, tint = 0x3f7d4f }: { x: number; z: number; s?: number; tint?: number }) {
  const pot = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xd8cfc0, roughness: 0.6 }), []);
  const leaf = useMemo(() => new THREE.MeshStandardMaterial({ color: tint, roughness: 0.7 }), [tint]);
  return (
    <group position={[x, 0, z]} scale={s}>
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow material={pot}><cylinderGeometry args={[0.28, 0.21, 0.56, 18]} /></mesh>
      {[[0, 0.95, 0, 0.42], [0.2, 1.25, 0.1, 0.3], [-0.18, 1.2, -0.08, 0.32], [0.05, 1.5, -0.05, 0.24]].map(([px, py, pz, r], k) => (
        <mesh key={k} position={[px, py, pz]} castShadow material={leaf}><icosahedronGeometry args={[r, 1]} /></mesh>
      ))}
    </group>
  );
}
