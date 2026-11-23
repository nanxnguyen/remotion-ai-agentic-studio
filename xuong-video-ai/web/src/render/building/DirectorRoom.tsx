import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Layout } from '../../engine/layout';
import { waitingHuman } from '../../engine/sim';
import { factory, fmt, live, useUI } from '../../store';
import { mat } from '../characters/procChar';
import { useStaticLabel } from '../labels';
import type { Palette } from '../palette';
import { B } from '../rooms/Props';
import { StaticBatch } from '../StaticBatch';

/* ---------- màn hình trong phòng: vẽ bằng canvas, cập nhật khi số liệu đổi ---------- */
const FONT = '"Be Vietnam Pro", "Inter", system-ui, sans-serif';

function useScreen(w = 1024, h = 640) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const material = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
    return { canvas, ctx: canvas.getContext('2d')!, tex, material, key: '' };
  }, [w, h]);
}

function frame(ctx: CanvasRenderingContext2D, title: string, accent: string) {
  const { width: W, height: H } = ctx.canvas;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#111621'); g.addColorStop(1, '#0a0d14');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = accent; ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = '#e8ecf3'; ctx.font = `700 40px ${FONT}`; ctx.textBaseline = 'alphabetic';
  ctx.fillText(title, 40, 72);
}

/** Phòng Đạo diễn: phòng thật có tường, kính, bàn điều phối, màn hình lớn, máy quay và ghế đạo diễn. */
export function DirectorRoom({ L, chId, pal, accent, selected, onSelect }: { L: Layout; chId: string; pal: Palette; accent: string; selected: boolean; onSelect: () => void }) {
  useStaticLabel('lbl-wrap', '<div class="sign3d" style="--c:#f2b84b"><b>Phòng Đạo diễn</b><span>điều phối sản xuất</span></div>', [L.director.x - 4.3, 3.05, L.director.z], 15);
  const s1 = useScreen(), s2 = useScreen(), s3 = useScreen();
  const tile = useMemo(() => { const m = new THREE.MeshStandardMaterial({ color: new THREE.Color(pal.floor).lerp(new THREE.Color(0xf2b84b), 0.1), roughness: 0.85 }); m.userData.live = true; return m; }, [pal]);
  const frost = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xf2b84b, roughness: 0.6, transparent: true, opacity: 0.5, depthWrite: false }), []);
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({ color: 0xdfe9f5, roughness: 0.15, transparent: true, opacity: 0.16, depthWrite: false, clearcoat: 1 }), []);
  const bulb = useMemo(() => { const m = new THREE.MeshStandardMaterial({ color: 0xffe0b0, emissive: 0xffd49a, emissiveIntensity: 2.5, toneMapped: false }); m.userData.live = true; return m; }, []);
  const tally = useMemo(() => { const m = new THREE.MeshStandardMaterial({ color: 0x400000, emissive: 0xff2a2a, emissiveIntensity: 2, toneMapped: false }); m.userData.live = true; return m; }, []);
  const hover = useRef(false);

  useEffect(() => () => { for (const s of [s1, s2, s3]) { s.tex.dispose(); s.material.dispose(); } }, [s1, s2, s3]);
  useEffect(() => { tile.emissive.set(selected ? accent : 0x000000); tile.emissiveIntensity = selected ? 0.12 : 0; }, [selected, accent, tile]);

  useFrame(state => {
    const T = state.clock.elapsedTime;
    tally.emissiveIntensity = 1.2 + Math.sin(T * 3) * 0.8;
    if (hover.current && !selected) { tile.emissive.set(accent); tile.emissiveIntensity = 0.05 + 0.03 * Math.sin(T * 5); }
    const ch = factory.channels[chId];
    if (!ch) return;
    const jobs = Object.values(ch.jobs);
    const running = jobs.filter(j => j.status === 'running');
    const done = jobs.filter(j => j.status === 'done');
    const need = waitingHuman(ch).length + Object.values(ch.agents).filter(a => a.error).length;

    // màn trái: dây chuyền theo bước
    const rows = ch.workflow.steps.map(s => {
      let q = 0, w = 0, err = 0;
      for (const j of running) { const st = j.steps[s.id]?.status; if (st === 'queued') q++; if (st === 'active' || st === 'waiting_human' || st === 'handoff') w++; if (st === 'error') err++; }
      return { name: s.name, q, w, err };
    });
    const k1 = JSON.stringify(rows);
    if (k1 !== s1.key) {
      s1.key = k1;
      const c = s1.ctx; frame(c, 'Dây chuyền', accent);
      const n = rows.length, top = 104, rh = Math.min(46, (c.canvas.height - top - 20) / n);
      rows.forEach((r, i) => {
        const y = top + i * rh;
        c.fillStyle = i % 2 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'; c.fillRect(30, y, c.canvas.width - 60, rh - 4);
        c.fillStyle = '#cfd6e2'; c.font = `500 ${Math.round(rh * 0.55)}px ${FONT}`; c.fillText(r.name, 48, y + rh * 0.68);
        const tags: [string, string][] = [];
        if (r.err) tags.push([`lỗi ${r.err}`, '#ff6b6b']);
        if (r.w) tags.push([`đang làm ${r.w}`, '#5bb8ff']);
        if (r.q) tags.push([`khay ${r.q}`, '#f2b84b']);
        let x = c.canvas.width - 48;
        c.font = `700 ${Math.round(rh * 0.5)}px ${FONT}`;
        for (const [t, col] of tags.reverse()) { const tw = c.measureText(t).width; x -= tw; c.fillStyle = col; c.fillText(t, x, y + rh * 0.68); x -= 28; }
      });
      s1.tex.needsUpdate = true;
    }

    // màn giữa: con số lớn
    const k2 = `${done.length}|${running.length}|${need}|${Math.floor(factory.t / 10)}`;
    if (k2 !== s2.key) {
      s2.key = k2;
      const c = s2.ctx, W = c.canvas.width; frame(c, 'Hôm nay ở xưởng', accent);
      c.textAlign = 'center';
      c.fillStyle = '#ffffff'; c.font = `800 220px ${FONT}`; c.fillText(String(done.length), W / 2, 330);
      c.fillStyle = '#9aa6b8'; c.font = `500 40px ${FONT}`; c.fillText('video đã đăng', W / 2, 390);
      c.font = `700 46px ${FONT}`;
      c.fillStyle = '#5bb8ff'; c.fillText(`${running.length} đang chạy`, W * 0.3, 520);
      c.fillStyle = need ? '#f2b84b' : '#6fcf97'; c.fillText(need ? `${need} cần bạn` : 'không ai chờ', W * 0.72, 520);
      c.fillStyle = '#6b7689'; c.font = `500 30px ${FONT}`; c.fillText(`đồng hồ xưởng ${fmt.time(factory.t)}`, W / 2, 600);
      c.textAlign = 'left';
      s2.tex.needsUpdate = true;
    }

    // màn phải: video vừa xong / ngân sách khi chạy Claude thật
    const recent = done.slice().sort((a, b) => (b.doneAt ?? 0) - (a.doneAt ?? 0)).slice(0, 5);
    const info = useUI.getState().live;
    const k3 = recent.map(j => j.id).join(',') + (info && live?.liveCh === chId ? `|${info.spentToday.toFixed(3)}` : '');
    if (k3 !== s3.key) {
      s3.key = k3;
      const c = s3.ctx, W = c.canvas.width; frame(c, info && live?.liveCh === chId ? 'Claude thật hôm nay' : 'Vừa lên YouTube', accent);
      let y = 130;
      if (info && live?.liveCh === chId) {
        c.fillStyle = '#ffffff'; c.font = `800 96px ${FONT}`; c.fillText(`$${info.spentToday.toFixed(2)}`, 40, 210);
        c.fillStyle = '#9aa6b8'; c.font = `500 34px ${FONT}`; c.fillText(`trên hạn mức $${info.dailyCapUsd.toFixed(2)}`, 40, 260);
        c.fillStyle = '#263042'; c.fillRect(40, 285, W - 80, 18);
        c.fillStyle = accent; c.fillRect(40, 285, (W - 80) * Math.min(1, info.spentToday / Math.max(0.01, info.dailyCapUsd)), 18);
        y = 360;
      }
      c.font = `500 36px ${FONT}`;
      if (!recent.length) { c.fillStyle = '#6b7689'; c.fillText('Chưa có video nào xong.', 40, y + 20); }
      for (const j of recent.slice(0, info ? 3 : 5)) {
        c.fillStyle = '#6fcf97'; c.fillText('▶', 40, y + 20);
        c.fillStyle = '#e8ecf3';
        let t = j.title; while (c.measureText(t).width > W - 130 && t.length > 4) t = t.slice(0, -2);
        c.fillText(t === j.title ? t : t + '…', 92, y + 20);
        y += 86;
      }
      s3.tex.needsUpdate = true;
    }
  });

  const D = L.director;
  return (
    <group position={[D.x, 0, D.z]}
      onClick={e => { e.stopPropagation(); onSelect(); }}
      onPointerOver={e => { e.stopPropagation(); hover.current = true; document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { hover.current = false; document.body.style.cursor = ''; if (!selected) { tile.emissive.set(0x000000); tile.emissiveIntensity = 0; } }}>
      <StaticBatch>
        {/* sàn, thảm, tường sau, vách kính hai bên */}
        <RoundedBox args={[8, 0.1, 7]} radius={0.05} smoothness={2} position={[-0.5, 0.05, 0]} receiveShadow material={tile} />
        <mesh position={[-0.6, 0.105, 0]} receiveShadow material={mat(0x6a2b2b, { roughness: 0.95 })}><boxGeometry args={[4.6, 0.01, 3.8]} /></mesh>
        <B s={[0.16, 2.7, 7]} p={[-4.5, 1.35, 0]} c={0x1d1f26} opts={{ roughness: 0.9 }} />
        {[-3.3, -2.9, 2.9, 3.3].map(z => <B key={z} s={[0.06, 2.5, 0.07]} p={[-4.4, 1.3, z]} c={0xa8794f} opts={{ roughness: 0.55 }} />)}
        <B s={[0.06, 0.06, 7]} p={[-4.4, 2.72, 0]} c={0xf2b84b} />
        {[-3.5, 3.5].map(z => (
          <group key={z}>
            <B s={[8, 0.07, 0.07]} p={[-0.5, 0.035, z]} c={0x16181d} opts={{ metalness: 0.7, roughness: 0.3 }} />
            <B s={[8, 0.07, 0.07]} p={[-0.5, 2.6, z]} c={0x16181d} opts={{ metalness: 0.7, roughness: 0.3 }} />
            {[-4.45, -2.5, -0.5, 1.5, 3.45].map(x => <B key={x} s={[0.05, 2.6, 0.07]} p={[x, 1.3, z]} c={0x16181d} opts={{ metalness: 0.7, roughness: 0.3 }} />)}
            <mesh position={[-0.5, 1.32, z]} material={glass}><boxGeometry args={[7.9, 2.5, 0.03]} /></mesh>
            <mesh position={[-0.5, 1.3, z]} material={frost}><boxGeometry args={[7.9, 0.22, 0.036]} /></mesh>
          </group>
        ))}
        {/* tường màn hình */}
        <B s={[0.14, 1.62, 6.1]} p={[-4.36, 1.72, 0]} c={0x121318} opts={{ roughness: 0.3, metalness: 0.4 }} />
        {/* bàn điều phối hình cung đơn giản: bàn chính + hai cánh */}
        <RoundedBox args={[0.95, 0.1, 2.6]} radius={0.04} smoothness={3} position={[1.05, 0.88, 0]} castShadow receiveShadow material={mat(0x3a2a20, { roughness: 0.45 })} />
        {[-1, 1].map(s => <RoundedBox key={s} args={[0.95, 0.1, 1.1]} radius={0.04} smoothness={3} position={[0.62, 0.88, s * 1.62]} rotation={[0, s * 0.55, 0]} castShadow receiveShadow material={mat(0x3a2a20, { roughness: 0.45 })} />)}
        <B s={[0.8, 0.82, 2.4]} p={[1.15, 0.42, 0]} c={0x262a36} opts={{ roughness: 0.6 }} />
        {/* hai màn hình nhỏ trên bàn, quay về phía đạo diễn */}
        {[-0.62, 0.62].map(z => (
          <group key={z} position={[1.3, 1.28, z]} rotation={[0, -Math.PI / 2 + (z > 0 ? -0.18 : 0.18), 0]}>
            <B s={[1.0, 0.6, 0.05]} p={[0, 0, 0]} c={0x15171c} opts={{ roughness: 0.3, metalness: 0.4 }} />
            <B s={[0.05, 0.32, 0.05]} p={[0, -0.42, 0.03]} c={0x2b2e36} opts={{ metalness: 0.7, roughness: 0.3 }} />
          </group>
        ))}
        {/* bảng clapper trên bàn */}
        <group position={[0.9, 0.95, -1.05]} rotation={[0, 0.5, 0]}>
          <B s={[0.36, 0.04, 0.28]} p={[0, 0, 0]} c={0x1c1c1c} />
          <B s={[0.36, 0.05, 0.06]} p={[0, 0.05, -0.12]} r={[0.35, 0, 0]} c={0xf0f0f0} />
        </group>
        {/* ghế đạo diễn (ghế vải chéo) */}
        <group position={[-1.0, 0, 0.9]} rotation={[0, 0.4, 0]}>
          {[-0.3, 0.3].map(z => <B key={z} s={[0.06, 1.0, 0.06]} p={[0, 0.5, z]} r={[0.3, 0, 0]} c={0x6b4a33} />)}
          {[-0.3, 0.3].map(z => <B key={'b' + z} s={[0.06, 1.0, 0.06]} p={[0, 0.5, z]} r={[-0.3, 0, 0]} c={0x6b4a33} />)}
          <B s={[0.5, 0.04, 0.62]} p={[0, 0.72, 0]} c={0x1f1f24} />
          <B s={[0.05, 0.36, 0.62]} p={[-0.26, 1.08, 0]} c={0x8a1f1f} />
        </group>
        {/* máy quay trên chân ba càng, đèn phim trường */}
        <group position={[-2.6, 0, 2.3]} rotation={[0, -0.9, 0]}>
          {[0, 2.1, 4.2].map(a => <B key={a} s={[0.04, 1.35, 0.04]} p={[Math.cos(a) * 0.28, 0.62, Math.sin(a) * 0.28]} r={[Math.sin(a) * 0.4, 0, -Math.cos(a) * 0.4]} c={0x222222} />)}
          <B s={[0.55, 0.36, 0.3]} p={[0, 1.42, 0]} c={0x1d1f26} opts={{ roughness: 0.4, metalness: 0.3 }} />
          <mesh position={[0.38, 1.42, 0]} rotation={[0, 0, Math.PI / 2]} castShadow material={mat(0x0f1014, { roughness: 0.2, metalness: 0.6 })}><cylinderGeometry args={[0.11, 0.13, 0.26, 20]} /></mesh>
          <mesh position={[-0.05, 1.68, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow material={mat(0x1d1f26)}><cylinderGeometry args={[0.13, 0.13, 0.06, 20]} /></mesh>
          <mesh position={[-0.05, 1.68, -0.24]} rotation={[Math.PI / 2, 0, 0]} castShadow material={mat(0x1d1f26)}><cylinderGeometry args={[0.13, 0.13, 0.06, 20]} /></mesh>
        </group>
        <group position={[-2.8, 0, -2.5]} rotation={[0, 0.7, 0]}>
          <B s={[0.05, 1.9, 0.05]} p={[0, 0.95, 0]} c={0x222222} />
          <B s={[0.5, 0.04, 0.5]} p={[0, 0.02, 0]} c={0x222222} />
          <B s={[0.46, 0.4, 0.36]} p={[0.12, 2.0, 0]} r={[0, 0, -0.35]} c={0x2a2a2e} opts={{ metalness: 0.4, roughness: 0.4 }} />
        </group>
        {/* đèn thả trần trên bàn */}
        <mesh position={[0.6, 3.75, 0]} material={mat(0x1a1a1a)}><cylinderGeometry args={[0.012, 0.012, 1.3, 4]} /></mesh>
        <mesh position={[0.6, 3.05, 0]} castShadow material={mat(0x22252d, { metalness: 0.5, roughness: 0.35, side: THREE.DoubleSide })}><coneGeometry args={[0.5, 0.36, 24, 1, true]} /></mesh>
      </StaticBatch>
      {/* phần động: màn hình canvas, đèn, đèn ghi hình */}
      {[-1.98, 0, 1.98].map((z, i) => (
        <mesh key={z} position={[-4.28, 1.72, z]} rotation={[0, Math.PI / 2, 0]} material={[s1, s2, s3][i].material}><planeGeometry args={[1.9, 1.19]} /></mesh>
      ))}
      {[-0.62, 0.62].map((z, i) => (
        <mesh key={z} position={[1.272, 1.28, z]} rotation={[0, -Math.PI / 2 + (z > 0 ? -0.18 : 0.18), 0]} material={[s1, s3][i].material}><planeGeometry args={[0.92, 0.53]} /></mesh>
      ))}
      <mesh position={[0.6, 2.92, 0]} material={bulb}><sphereGeometry args={[0.12, 12, 8]} /></mesh>
      <pointLight position={[0.6, 2.7, 0]} color={0xffd9a8} intensity={30} distance={8} decay={2} />
      <group position={[-2.6, 0, 2.3]} rotation={[0, -0.9, 0]}>
        <mesh position={[0.05, 1.64, 0.16]} material={tally}><sphereGeometry args={[0.035, 8, 6]} /></mesh>
      </group>
      <group position={[-2.8, 0, -2.5]} rotation={[0, 0.7, 0]}>
        <mesh position={[0.32, 1.93, 0]} rotation={[0, 0, -0.35 - Math.PI / 2]} material={bulb}><circleGeometry args={[0.15, 20]} /></mesh>
      </group>
    </group>
  );
}
