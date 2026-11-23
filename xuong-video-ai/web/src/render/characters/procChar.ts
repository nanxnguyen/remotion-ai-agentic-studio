import * as THREE from 'three';
import type { Action, AgentStatus, Role } from '../../engine/types';

const matCache = new Map<string, THREE.MeshStandardMaterial>();
export function mat(color: THREE.ColorRepresentation, opts: THREE.MeshStandardMaterialParameters = {}) {
  const key = new THREE.Color(color).getHexString() + JSON.stringify(opts);
  let m = matCache.get(key);
  if (!m) { m = new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0, ...opts }); matCache.set(key, m); }
  return m;
}

function mesh(geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0, parent?: THREE.Object3D) {
  const o = new THREE.Mesh(geo, m);
  o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true;
  parent?.add(o);
  return o;
}

export interface Char {
  root: THREE.Group; hips: THREE.Group; torso: THREE.Group; head: THREE.Group;
  armL: { sh: THREE.Group; el: THREE.Group }; armR: { sh: THREE.Group; el: THREE.Group };
  legL: { hip: THREE.Group; knee: THREE.Group }; legR: { hip: THREE.Group; knee: THREE.Group };
  folder: THREE.Mesh; cup: THREE.Mesh; pen: THREE.Mesh; phone: THREE.Mesh; ring: THREE.Mesh; ringMat: THREE.MeshBasicMaterial;
  face: number; walkPh: number;
}

const SKINS = [0xf1c9a5, 0xe0ac85, 0xc68b62, 0xf5d6bc, 0xa86f4c, 0xd9a37c];
const HAIRS = [0x1d1714, 0x3b2a20, 0x0f0f12, 0x5a3b28, 0x2a2a33, 0x6b4a2e];

/** Nhân vật low-poly có khớp hông, gối, vai, khuỷu. */
export function makeChar(shirtHex: string, seed: number, role: Role): Char {
  const skin = SKINS[seed % SKINS.length], hair = HAIRS[(seed * 5) % HAIRS.length];
  const pants = [0x2c3140, 0x3a3328, 0x26303a, 0x33293a][seed % 4];
  const shirt = new THREE.Color(shirtHex);
  const root = new THREE.Group();
  const hips = new THREE.Group(); root.add(hips);
  const torso = new THREE.Group(); hips.add(torso);
  mesh(new THREE.CapsuleGeometry(0.27, 0.42, 6, 14), mat(shirt), 0, 0.42, 0, torso);
  if (role === 'director') { // áo khoác + khăn
    mesh(new THREE.TorusGeometry(0.2, 0.06, 8, 16), mat(0xd04a3a), 0, 0.78, 0.02, torso).rotation.x = Math.PI / 2;
  }
  const head = new THREE.Group(); head.position.y = 1.04; torso.add(head);
  mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.14, 10), mat(skin), 0, -0.2, 0, head);
  mesh(new THREE.SphereGeometry(0.26, 20, 16), mat(skin), 0, 0, 0, head);
  mesh(new THREE.SphereGeometry(0.275, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.52), mat(hair), 0, 0.03, -0.025, head);
  const eye = mat(0x141414);
  mesh(new THREE.SphereGeometry(0.032, 8, 6), eye, -0.09, 0.02, 0.24, head);
  mesh(new THREE.SphereGeometry(0.032, 8, 6), eye, 0.09, 0.02, 0.24, head);
  if (role === 'reviewer') { // kính
    const g = mat(0x222222, { metalness: 0.5 });
    [-0.09, 0.09].forEach(x => { const r = mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 14), g, x, 0.02, 0.255, head); r.castShadow = false; });
  }
  if (role === 'human') { // vương miện nhỏ cho "Bạn"
    mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.08, 5), mat(0xf2c14e, { metalness: 0.4, roughness: 0.4 }), 0, 0.28, 0, head);
  }
  const arms: Char['armL'][] = [];
  [-1, 1].forEach(side => {
    const sh = new THREE.Group(); sh.position.set(side * 0.36, 0.7, 0); torso.add(sh);
    mesh(new THREE.CapsuleGeometry(0.07, 0.22, 4, 8), mat(shirt), 0, -0.17, 0, sh);
    const el = new THREE.Group(); el.position.y = -0.34; sh.add(el);
    mesh(new THREE.CapsuleGeometry(0.062, 0.2, 4, 8), mat(skin), 0, -0.15, 0, el);
    arms.push({ sh, el });
  });
  const legs: Char['legL'][] = [];
  [-0.13, 0.13].forEach(x => {
    const hip = new THREE.Group(); hip.position.set(x, 0, 0); hips.add(hip);
    mesh(new THREE.CapsuleGeometry(0.085, 0.3, 4, 8), mat(pants), 0, -0.23, 0, hip);
    const knee = new THREE.Group(); knee.position.y = -0.46; hip.add(knee);
    mesh(new THREE.CapsuleGeometry(0.075, 0.3, 4, 8), mat(pants), 0, -0.22, 0, knee);
    mesh(new THREE.BoxGeometry(0.17, 0.08, 0.3), mat(0x1b1b1f), 0, -0.46, 0.06, knee);
    legs.push({ hip, knee });
  });
  const folder = mesh(new THREE.BoxGeometry(0.46, 0.06, 0.34), mat(0xe1a54a, { emissive: 0x3a2406 }), 0, 0.62, 0.36, torso);
  folder.rotation.x = 0.25; folder.visible = false;
  const cup = mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.13, 12), mat(0xf2efe8), 0, -0.32, 0.05, arms[1].el); cup.visible = false;
  const pen = mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 6), mat(0xd23b3b), 0, -0.33, 0.04, arms[1].el); pen.visible = false;
  const phone = mesh(new THREE.BoxGeometry(0.1, 0.17, 0.02), mat(0x15171c), 0, -0.34, 0.06, arms[1].el); phone.visible = false;
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x7d8597, transparent: true, opacity: 0.8, side: THREE.DoubleSide, toneMapped: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.48, 0.6, 40), ringMat);
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.07; root.add(ring);
  return { root, hips, torso, head, armL: arms[0], armR: arms[1], legL: legs[0], legR: legs[1], folder, cup, pen, phone, ring, ringMat, face: 0, walkPh: 0 };
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export function angLerp(a: number, b: number, k: number) {
  const d = ((b - a + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  return a + d * k;
}

export interface Pose {
  sit: number;           // 0 đứng → 1 ngồi
  walking: boolean;
  carry: boolean;
  cup: boolean;
  status: AgentStatus;
  action?: Action;
  standing?: boolean;    // đứng yên (đạo diễn, chờ ở pantry)
  T: number;             // giây thực
  reduce: boolean;
}

/** Đặt tư thế cho nhân vật. walkPh tăng theo quãng đường đã đi. */
export function applyPose(c: Char, p: Pose) {
  const T = p.reduce ? 0 : p.T;
  const sw = p.walking && !p.reduce ? Math.sin(c.walkPh) : 0;
  const s = p.sit * p.sit * (3 - 2 * p.sit);
  c.hips.position.y = lerp(0.98, 0.56, s) + (p.walking && !p.reduce ? Math.abs(Math.cos(c.walkPh)) * 0.045 : 0);
  c.legL.hip.rotation.x = lerp(sw * 0.55, -Math.PI / 2, s);
  c.legR.hip.rotation.x = lerp(-sw * 0.55, -Math.PI / 2, s);
  c.legL.knee.rotation.x = lerp(Math.max(0, -sw) * 0.75, Math.PI / 2, s);
  c.legR.knee.rotation.x = lerp(Math.max(0, sw) * 0.75, Math.PI / 2, s);
  c.torso.rotation.set(p.walking ? 0.06 : 0, 0, p.walking && !p.reduce ? Math.sin(c.walkPh) * 0.04 : 0);
  c.head.rotation.set(0, 0, 0);
  for (const q of [c.armL, c.armR]) { q.sh.rotation.set(0, 0, 0); q.el.rotation.set(0, 0, 0); }
  c.folder.visible = p.carry; c.cup.visible = p.cup; c.pen.visible = false; c.phone.visible = false;

  if (p.carry) {
    [c.armL, c.armR].forEach((q, k) => { q.sh.rotation.x = -0.55; q.sh.rotation.z = (k ? -1 : 1) * 0.12; q.el.rotation.x = -1.0; });
    return;
  }
  if (p.walking) {
    c.armL.sh.rotation.x = -sw * 0.5; c.armR.sh.rotation.x = sw * 0.5; c.armL.el.rotation.x = -0.25; c.armR.el.rotation.x = -0.25;
    return;
  }
  if (p.cup) {
    const sip = Math.max(0, Math.sin(T * 1.3)) ** 4;
    c.armR.sh.rotation.x = -0.4 - 0.5 * sip; c.armR.el.rotation.x = -1.3 - 0.6 * sip; c.head.rotation.x = -0.15 * sip;
    return;
  }
  if (p.standing) { // đạo diễn đứng chỉ huy
    c.armR.sh.rotation.x = -1.2 + Math.sin(T * 0.9) * 0.25; c.armR.sh.rotation.z = 0.35; c.armR.el.rotation.x = -0.4;
    c.armL.sh.rotation.z = -0.12; c.head.rotation.y = Math.sin(T * 0.4) * 0.6;
    return;
  }
  if (p.sit < 0.98) return;

  switch (p.status) {
    case 'idle':
      c.phone.visible = true;
      c.head.rotation.x = 0.32; c.head.rotation.y = Math.sin(T * 0.5) * 0.2;
      c.armR.sh.rotation.x = -0.6; c.armR.el.rotation.x = -1.3; c.armL.sh.rotation.x = -0.5; c.armL.el.rotation.x = -1.0;
      c.hips.position.y += Math.sin(T * 1.6) * 0.006;
      break;
    case 'thinking':
      c.head.rotation.z = Math.sin(T * 1.1) * 0.12; c.head.rotation.x = -0.18;
      c.armR.sh.rotation.x = -0.9; c.armR.el.rotation.x = -2.0; c.armR.sh.rotation.z = 0.2;
      c.armL.sh.rotation.x = -0.6; c.armL.el.rotation.x = -1.1; c.torso.rotation.x = -0.05;
      break;
    case 'waiting_human':
      c.armR.sh.rotation.x = -3.0; c.armR.sh.rotation.z = 0.15 + Math.sin(T * 6) * 0.25; c.armR.el.rotation.x = -0.2; c.head.rotation.x = -0.12;
      break;
    case 'error':
      c.torso.rotation.x = 0.5; c.head.rotation.x = 0.45;
      c.armL.sh.rotation.x = -1.1; c.armR.sh.rotation.x = -1.1; c.armL.el.rotation.x = -1.2; c.armR.el.rotation.x = -1.2;
      break;
    case 'working':
      workPose(c, p.action, T);
      break;
    default:
      break;
  }
}

function workPose(c: Char, a: Action | undefined, T: number) {
  switch (a) {
    case 'read': // lật tài liệu
      c.head.rotation.x = 0.35; c.armL.sh.rotation.x = -0.8; c.armL.el.rotation.x = -0.9;
      c.armR.sh.rotation.x = -0.8 + Math.max(0, Math.sin(T * 1.4)) * 0.5; c.armR.el.rotation.x = -0.9; c.armR.sh.rotation.z = 0.25 * Math.max(0, Math.sin(T * 1.4));
      break;
    case 'speak': // nói vào micro, tay giữ tai nghe
      c.armL.sh.rotation.x = -2.4; c.armL.sh.rotation.z = -0.5; c.armL.el.rotation.x = -1.6;
      c.armR.sh.rotation.x = -0.9 + Math.sin(T * 3) * 0.15; c.armR.el.rotation.x = -0.6;
      c.head.rotation.x = -0.05 + Math.sin(T * 5) * 0.05; c.head.rotation.y = -0.35;
      break;
    case 'mix': // gạt fader
      c.armL.sh.rotation.x = -0.9 + Math.sin(T * 2.2) * 0.12; c.armR.sh.rotation.x = -0.9 + Math.sin(T * 2.2 + 2) * 0.12;
      c.armL.el.rotation.x = -0.6; c.armR.el.rotation.x = -0.6; c.head.rotation.z = Math.sin(T * 2.2) * 0.1;
      break;
    case 'draw':
    case 'animate': // nét vẽ lớn
      c.armR.sh.rotation.x = -1.25 + Math.sin(T * 2.6) * 0.18; c.armR.sh.rotation.z = Math.cos(T * 2.6) * 0.3; c.armR.el.rotation.x = -0.5;
      c.armL.sh.rotation.x = -0.7; c.armL.el.rotation.x = -0.9; c.head.rotation.x = 0.2; c.head.rotation.y = Math.sin(T * 1.3) * 0.12;
      break;
    case 'render': // khoanh tay nhìn màn hình
      c.armL.sh.rotation.x = -1.2; c.armR.sh.rotation.x = -1.2; c.armL.sh.rotation.z = 0.5; c.armR.sh.rotation.z = -0.5;
      c.armL.el.rotation.x = -1.4; c.armR.el.rotation.x = -1.4; c.torso.rotation.x = -0.12; c.head.rotation.y = 0.45;
      break;
    case 'review': // bút đỏ, gật gù
      c.pen.visible = true;
      c.armR.sh.rotation.x = -0.95; c.armR.el.rotation.x = -0.8 + Math.sin(T * 4) * 0.12; c.armL.sh.rotation.x = -0.7; c.armL.el.rotation.x = -1.0;
      c.head.rotation.x = 0.28 + Math.sin(T * 1.6) * 0.08;
      break;
    default: { // gõ phím
      const ty = T * 16;
      c.armL.sh.rotation.x = -0.75 + Math.sin(ty) * 0.06; c.armR.sh.rotation.x = -0.75 + Math.sin(ty + 1.7) * 0.06;
      c.armL.el.rotation.x = -0.75; c.armR.el.rotation.x = -0.75; c.armL.sh.rotation.z = -0.1; c.armR.sh.rotation.z = 0.1;
      c.head.rotation.x = 0.12; c.head.rotation.y = 0.42 + Math.sin(T * 2.3) * 0.06; c.torso.rotation.x = 0.08;
    }
  }
}
