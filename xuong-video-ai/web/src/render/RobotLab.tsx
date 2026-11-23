import { CameraControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import type { AgentDef, AgentStatus } from '../engine/types';
import type { AgentPose, Emote } from '../world/poses';
import { StaticWorld } from '../world/WorldSystem';
import { Character, useRobotKit } from './characters/Character';
import { mat } from './characters/procChar';
import { SEAT_FORWARD } from './characters/robotKit';
import { PostFX, StudioLight } from './fx/effects';
import { STATUS_HEX } from './palette';

/**
 * Phòng thử nhân vật: mở bằng ?lab. Xếp một hàng các tư thế quan trọng để soi chất lượng
 * (ngồi khớp ghế, gõ phím, ôm hồ sơ, cảm xúc, biểu cảm mặt). Dùng làm cổng kiểm tra giai đoạn 2.
 */
const CASES: { name: string; status: AgentStatus; sit: number; walking?: boolean; carry?: boolean; cup?: boolean; emote?: Emote; role?: AgentDef['role']; action?: AgentPose['action'] }[] = [
  { name: 'Đứng', status: 'idle', sit: 0 },
  { name: 'Đi', status: 'walking', sit: 0, walking: true },
  { name: 'Ôm hồ sơ', status: 'walking', sit: 0, walking: true, carry: true },
  { name: 'Gõ phím', status: 'working', sit: 1, action: 'write' },
  { name: 'Lồng tiếng', status: 'working', sit: 1, action: 'speak' },
  { name: 'Đang nghĩ', status: 'thinking', sit: 1 },
  { name: 'Lỗi', status: 'error', sit: 1 },
  { name: 'Chờ duyệt', status: 'waiting_human', sit: 1, role: 'human' },
  { name: 'Ngồi: không đạt', status: 'working', sit: 1, emote: 'no' },
  { name: 'Đứng: like', status: 'idle', sit: 0, emote: 'thumbs' },
  { name: 'Nhảy mừng', status: 'idle', sit: 0, emote: 'dance' },
  { name: 'Cà phê', status: 'walking', sit: 0, walking: true, cup: true },
];
const GAP = 2.4;

export function RobotLab({ theme }: { theme: string }) {
  const kit = useRobotKit();
  const camInit = useRef(false);
  const hex = useMemo(() => STATUS_HEX(theme), [theme]);
  const defs: AgentDef[] = CASES.map((c, i) => ({ id: 'lab' + i, name: c.name, title: '', role: c.role ?? 'producer', hue: (i * 47) % 360, trait: '', model: '' }));
  const poses = (T: number) => new Map(CASES.map((c, i) => {
    const age = T % 3.5;
    const p: AgentPose = {
      visible: true, x: (i - (CASES.length - 1) / 2) * GAP, z: 0, face: 0, sit: c.sit, walking: !!c.walking, walkSpeed: c.walking ? 2.4 : 0,
      carry: !!c.carry, cup: !!c.cup, standing: false, status: c.status, action: c.action, progress: c.status === 'working' ? (T % 6) / 6 : -1,
      line: c.name, rework: false, emote: c.emote, emoteAge: c.emote ? age : 0,
    };
    return [defs[i].id, p];
  }));
  const w = CASES.length * GAP;
  return (
    <StaticWorld poses={poses}>
      <color attach="background" args={['#14161c']} />
      <StudioLight cx={0} cz={0} w={w} accent={hex.accent} night={false} />
      <hemisphereLight args={[0xdfe6ff, 0x4a3e34, 1.6]} />
      <directionalLight position={[6, 14, 10]} intensity={3.4} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-normalBias={0.03} shadow-camera-left={-w / 2 - 2} shadow-camera-right={w / 2 + 2} shadow-camera-top={6} shadow-camera-bottom={-6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={mat(0x3b3542)}><planeGeometry args={[w + 6, 12]} /></mesh>
      {CASES.map((c, i) => c.sit > 0 && (
        <group key={i} position={[(i - (CASES.length - 1) / 2) * GAP, 0, SEAT_FORWARD]}>
          <mesh position={[0, 0.48, 0]} castShadow receiveShadow material={mat(0x262a36)}><boxGeometry args={[0.8, 0.12, 0.8]} /></mesh>
          <mesh position={[0, 0.92, -0.38]} castShadow material={mat(0x262a36)}><boxGeometry args={[0.78, 0.82, 0.1]} /></mesh>
          <mesh position={[0, 0.88, 0.95]} castShadow receiveShadow material={mat(0x9a6c46)}><boxGeometry args={[1.6, 0.08, 0.8]} /></mesh>
        </group>
      ))}
      {defs.map((d, i) => <Character key={d.id} kit={kit} def={d} seed={i * 7} statusHex={hex} reduce={false} onSelect={() => {}} />)}
      <CameraControls makeDefault ref={c => { if (c && !camInit.current) { camInit.current = true; const v = new URLSearchParams(location.search).get('lab'); if (v === 'side') c.setLookAt(16, 1.6, 2.5, 7, 0.9, 0, false); else if (v === 'seat') c.setLookAt(-2.6, 1.9, 3.4, -6, 0.9, 0.3, false); else if (v === 'near') c.setLookAt(-4, 2.4, 6, -4, 1.0, 0, false); else c.setLookAt(0, 5, 26, 0, 1.0, 0, false); } }} />
      <PostFX quality="low" />
    </StaticWorld>
  );
}
