import { useFrame } from '@react-three/fiber';
import { useMemo } from 'react';
import { WALK_SPEED } from '../../engine/layout';
import type { AgentDef } from '../../engine/types';
import { useUI } from '../../store';
import { agentColor } from '../../theme/lch';
import { useWorld } from '../../world/WorldSystem';
import { angLerp, applyPose, makeChar } from './procChar';
import { SEAT_FORWARD } from './robotKit';

/** Nhân vật khối hình (bản dự phòng khi model chưa tải xong hoặc máy quá yếu). */
export function ProcCharacter({ def, seed, reduce, onSelect }: { def: AgentDef; seed: number; reduce: boolean; onSelect: () => void }) {
  const c = useMemo(() => { const c = makeChar(agentColor(def.hue), seed, def.role); c.ring.visible = false; return c; }, [def, seed]);
  const world = useWorld();
  useFrame((state, rdt) => {
    const p = world.current.poses.get(def.id);
    if (!p || !p.visible) { c.root.visible = false; return; }
    c.root.visible = true;
    const ui = useUI.getState(), speed = ui.paused ? 0 : ui.speed;
    c.face = angLerp(c.face, p.face, Math.min(1, rdt * 10));
    const sk = p.sit * p.sit * (3 - 2 * p.sit) * SEAT_FORWARD;
    c.root.position.set(p.x + Math.sin(c.face) * sk, 0, p.z + Math.cos(c.face) * sk);
    c.root.rotation.y = c.face;
    if (p.walking) c.walkPh += rdt * speed * WALK_SPEED * 2.7;
    applyPose(c, { sit: p.sit, walking: p.walking, carry: p.carry, cup: p.cup, status: p.status, action: p.action, standing: p.standing, T: state.clock.elapsedTime + seed, reduce });
  });
  return <primitive object={c.root} onClick={(e: { stopPropagation: () => void }) => { e.stopPropagation(); onSelect(); }} />;
}
