import { useEffect, useState } from 'react';
import type { AgentDef } from '../../engine/types';
import { AgentOverlay } from './AgentOverlay';
import { ProcCharacter } from './ProcCharacter';
import { RobotCharacter } from './RobotCharacter';
import { loadRobotKit, type RobotKit } from './robotKit';

let cached: RobotKit | null = null;
let failed = false;
const robotsOff = () => { try { return new URLSearchParams(location.search).get('robots') === '0'; } catch { return false; } };

/** Tải bộ nhân vật một lần cho cả ứng dụng; trả null khi đang tải hoặc lỗi (dùng nhân vật khối hình). */
export function useRobotKit(): RobotKit | null {
  const [kit, setKit] = useState<RobotKit | null>(cached);
  useEffect(() => {
    if (cached || failed || robotsOff()) return;
    let alive = true;
    loadRobotKit().then(k => { cached = k; if (alive) setKit(k); }).catch(err => { failed = true; console.warn('Không tải được nhân vật glTF, dùng bản khối hình', err); });
    return () => { alive = false; };
  }, []);
  return kit;
}

export function Character({ kit, def, seed, statusHex, reduce, onSelect }: { kit: RobotKit | null; def: AgentDef; seed: number; statusHex: Record<string, string>; reduce: boolean; onSelect: () => void }) {
  return (
    <>
      {kit ? <RobotCharacter kit={kit} def={def} seed={seed} statusHex={statusHex} reduce={reduce} onSelect={onSelect} />
        : <ProcCharacter def={def} seed={seed} reduce={reduce} onSelect={onSelect} />}
      <AgentOverlay def={def} statusHex={statusHex} reduce={reduce} />
    </>
  );
}
