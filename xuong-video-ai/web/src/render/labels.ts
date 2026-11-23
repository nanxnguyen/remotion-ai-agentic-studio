import { useFrame, useThree } from '@react-three/fiber';
import { createContext, useContext, useEffect, useMemo, type RefObject } from 'react';
import * as THREE from 'three';

/** Lớp DOM phủ lên canvas. Nhãn được tạo và gỡ bằng tay để không đụng tới cây DOM của React. */
export const OverlayCtx = createContext<RefObject<HTMLDivElement | null> | null>(null);

const v = new THREE.Vector3();

export function useLabel(className: string, initial = '') {
  const overlay = useContext(OverlayCtx);
  const el = useMemo(() => {
    const d = document.createElement('div');
    d.className = className;
    d.innerHTML = initial;
    d.style.position = 'absolute';
    d.style.left = '0'; d.style.top = '0';
    d.style.transformOrigin = '50% 100%';
    d.style.willChange = 'transform';
    return d;
  }, [className, initial]);
  useEffect(() => {
    const host = overlay?.current;
    if (!host) return;
    host.appendChild(el);
    return () => { if (el.parentNode) el.parentNode.removeChild(el); };
  }, [overlay, el]);
  return el;
}

/** Đặt nhãn theo vị trí 3D, co giãn theo khoảng cách camera. */
export function placeLabel(el: HTMLElement, camera: THREE.Camera, w: number, h: number, x: number, y: number, z: number, k = 14) {
  v.set(x, y, z);
  const dist = camera.position.distanceTo(v);
  v.project(camera);
  if (v.z > 1 || v.z < -1 || Math.abs(v.x) > 1.3 || Math.abs(v.y) > 1.3) { el.style.display = 'none'; return; }
  el.style.display = '';
  const sx = (v.x * 0.5 + 0.5) * w, sy = (-v.y * 0.5 + 0.5) * h;
  const s = Math.min(1.1, Math.max(0.32, k / dist));
  el.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px) translate(-50%, -100%) scale(${s.toFixed(3)})`;
  el.style.zIndex = String(Math.max(1, Math.round(2000 - dist * 10)));
}

/** Nhãn tĩnh gắn ở một điểm cố định. */
export function useStaticLabel(className: string, html: string, pos: [number, number, number], k = 15) {
  const el = useLabel(className, html);
  const { size } = useThree();
  useFrame(({ camera }) => placeLabel(el, camera, size.width, size.height, pos[0], pos[1], pos[2], k));
  return el;
}
