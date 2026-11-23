import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import type { AgentDef, AgentStatus } from '../../engine/types';
import { useUI } from '../../store';
import { agentColor } from '../../theme/lch';
import type { AgentPose, Emote } from '../../world/poses';
import { useWorld } from '../../world/WorldSystem';
import { angLerp, mat } from './procChar';
import { makeBodyMaterial, makeRig, outlineMaterial, SEAT_FORWARD, type RobotKit } from './robotKit';

/* Động tác dùng cho cảm xúc: khi đứng chạy cả người, khi ngồi chỉ thân trên. */
const EMOTE_CLIP: Record<Emote, string> = { cheer: 'Yes', thumbs: 'ThumbsUp', no: 'No', sad: 'No', surprised: 'No', wave: 'Wave', dance: 'Dance' };
/* Biểu cảm mặt (morph): [Angry, Surprised, Sad] */
const FACE_EMOTE: Partial<Record<Emote, [number, number, number]>> = { no: [0.9, 0, 0], sad: [0, 0, 1], surprised: [0, 1, 0], cheer: [0, 0.35, 0] };
const FACE_STATUS: Partial<Record<AgentStatus, [number, number, number]>> = { error: [0, 0.9, 0.4], thinking: [0.15, 0, 0], waiting_human: [0, 0.25, 0] };

const NAMES = ['Idle', 'Idle:lower', 'Walking', 'Running', 'Dance', 'Wave', 'ThumbsUp', 'Yes', 'No', 'Wave:upper', 'ThumbsUp:upper', 'Yes:upper', 'No:upper'] as const;
type ActName = typeof NAMES[number];

const up = new THREE.Vector3(0, 1, 0);
const right = new THREE.Vector3();
const tq = new THREE.Quaternion(), pq = new THREE.Quaternion(), rq = new THREE.Quaternion();
const tv = new THREE.Vector3();

/** Hướng thế giới của một đối tượng, tính bằng tích quaternion dọc cây (không cần cập nhật ma trận). */
function worldQuat(o: THREE.Object3D, out: THREE.Quaternion) {
  out.identity();
  for (let p: THREE.Object3D | null = o; p; p = p.parent) out.premultiply(p.quaternion);
  return out;
}

/** Xoay một xương quanh một trục trong không gian thế giới. Không gọi updateMatrixWorld: renderer làm một lần cho cả cảnh. */
function rotateWorld(bone: THREE.Object3D | undefined, axis: THREE.Vector3, angle: number) {
  if (!bone || !bone.parent || angle === 0) return;
  worldQuat(bone.parent, pq);
  rq.setFromAxisAngle(axis, angle);
  tq.copy(pq).invert().multiply(rq).multiply(pq);
  bone.quaternion.premultiply(tq);
}

export function RobotCharacter({ kit, def, seed, statusHex, reduce, onSelect }: { kit: RobotKit; def: AgentDef; seed: number; statusHex: Record<string, string>; reduce: boolean; onSelect: () => void }) {
  const rig = useMemo(() => {
    const r = makeRig(kit);
    // màu áo: lấy sắc độ của agent nhưng đậm và bão hoà hơn bản dùng cho giao diện tối
    const shirt = new THREE.Color(agentColor(def.hue)); const hsl = { h: 0, s: 0, l: 0 }; shirt.getHSL(hsl); shirt.setHSL(hsl.h, Math.min(1, hsl.s * 1.15 + 0.1), 0.42);
    const material = makeBodyMaterial(shirt);
    const body = new THREE.SkinnedMesh(kit.geometry, material);
    body.castShadow = true; body.receiveShadow = true;
    body.morphTargetInfluences = [0, 0, 0];
    body.bind(r.skeleton, new THREE.Matrix4());
    const line = new THREE.SkinnedMesh(kit.geometry, outlineMaterial(kit.outline));
    line.morphTargetInfluences = body.morphTargetInfluences; // dùng chung để viền theo biểu cảm
    line.bind(r.skeleton, new THREE.Matrix4());
    r.body.add(body, line);
    const mixer = new THREE.AnimationMixer(r.body);
    const acts = {} as Record<ActName, THREE.AnimationAction>;
    for (const n of NAMES) {
      const a = mixer.clipAction(kit.clips[n]);
      a.enabled = true; a.setEffectiveWeight(0); a.play();
      acts[n] = a;
    }
    for (const n of ['Dance', 'Wave', 'ThumbsUp', 'Yes', 'No', 'Wave:upper', 'ThumbsUp:upper', 'Yes:upper', 'No:upper'] as ActName[]) acts[n].paused = true; // tua theo tuổi cảm xúc
    const w = Object.fromEntries(NAMES.map(n => [n, 0])) as Record<ActName, number>;
    const find = (re: RegExp) => r.bones.find(b => re.test(b.name));
    const bones = {
      head: find(/^Head$/), neck: find(/^Neck$/), torso: find(/^Torso/), thighL: find(/^UpperLegL$/), thighR: find(/^UpperLegR$/), shinL: find(/^LowerLegL$/), shinR: find(/^LowerLegR$/),
      armL: find(/^UpperArmL$/), armR: find(/^UpperArmR$/), foreL: find(/^LowerArmL$/), foreR: find(/^LowerArmR$/),
      handR: find(/^Palm2R$/),
    };
    // đồ cầm tay
    const folder = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.36), mat(0xe1a54a, { emissive: 0x3a2406 }));
    folder.castShadow = true; folder.visible = false; r.root.add(folder);
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.055, 0.15, 12), mat(0xf2efe8));
    cup.visible = false; r.root.add(cup);
    const crown = def.role === 'human' ? new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 0.12, 5), mat(0xf2c14e, { metalness: 0.5, roughness: 0.35, emissive: 0x3a2a00 })) : null;
    if (crown) r.root.add(crown);
    return { ...r, material, body, line, mixer, acts, w, bones, folder, cup, crown, face: 0, faceW: [0, 0, 0] as [number, number, number] };
  }, [kit, def]);

  useEffect(() => () => {
    rig.mixer.stopAllAction(); rig.material.dispose();
    rig.folder.geometry.dispose(); rig.cup.geometry.dispose(); rig.crown?.geometry.dispose();
  }, [rig]);
  const world = useWorld();

  useFrame((state, rdt) => {
    const p = world.current.poses.get(def.id);
    if (!p || !p.visible) { rig.root.visible = false; return; }
    rig.root.visible = true;
    const ui = useUI.getState();
    const simSpeed = ui.paused ? 0 : ui.speed;
    const dt = Math.min(rdt, 0.1);
    const T = state.clock.elapsedTime + seed;

    // vị trí, hướng, độ nâng khi ngồi
    const s = p.sit * p.sit * (3 - 2 * p.sit);
    rig.face = angLerp(rig.face, p.face, Math.min(1, dt * 10));
    // khi ngồi, trượt lên phía trước tới đúng ghế (ghế đặt gần bàn hơn điểm ngồi của engine)
    rig.root.position.set(p.x + Math.sin(rig.face) * SEAT_FORWARD * s, kit.sitLift * s, p.z + Math.cos(rig.face) * SEAT_FORWARD * s);
    rig.root.rotation.y = rig.face;

    // ----- trọng số động tác -----
    const tgt = Object.fromEntries(NAMES.map(n => [n, 0])) as Record<ActName, number>;
    const em = p.emote;
    const emClip = em ? EMOTE_CLIP[em] : undefined;
    const fast = simSpeed >= 3;
    if (p.walking) tgt[fast ? 'Running' : 'Walking'] = 1;
    else if (p.sit > 0.02) {
      // ngồi: chân lấy từ Idle rồi gập bằng tay (bên dưới), thân trên có thể vẫy, gật, lắc
      const upper = emClip && emClip !== 'Dance' ? `${emClip}:upper` as ActName : p.status === 'waiting_human' ? 'Wave:upper' : null;
      if (upper) { tgt['Idle:lower'] = 1; tgt[upper] = 1; } else tgt.Idle = 1;
    } else if (emClip) tgt[emClip as ActName] = 1;
    else tgt.Idle = 1;

    const k = Math.min(1, dt / 0.22);
    for (const n of NAMES) {
      rig.w[n] += (tgt[n] - rig.w[n]) * k;
      if (rig.w[n] < 0.002 && tgt[n] === 0) rig.w[n] = 0;
      rig.acts[n].setEffectiveWeight(rig.w[n]);
    }
    // tốc độ bước khớp với tốc độ di chuyển của mô phỏng
    rig.acts.Walking.timeScale = 1.55 * Math.max(simSpeed, 0.0001);
    rig.acts.Running.timeScale = 0.3 * Math.max(simSpeed, 0.0001);
    // cảm xúc: tua theo tuổi, nhảy múa thì lặp
    if (em && emClip) {
      const dur = kit.clips[emClip].duration;
      const tt = emClip === 'Dance' ? (p.emoteAge % dur) : Math.min(p.emoteAge, dur - 0.01);
      rig.acts[emClip as ActName].time = tt;
      const upper = rig.acts[`${emClip}:upper` as ActName];
      if (upper) upper.time = tt;
    }
    if (p.status === 'waiting_human' && !em) rig.acts['Wave:upper'].time = (T % kit.clips.Wave.duration);
    rig.mixer.update(reduce ? 0 : dt);

    // ----- lớp thủ công đè lên clip -----
    right.set(Math.cos(rig.face), 0, -Math.sin(rig.face));
    // gập chân ngồi ghế: đùi nằm ngang, cẳng chân thả xuống (đi theo mức ngồi để có động tác ngồi xuống/đứng dậy)
    if (s > 0.001) {
      rotateWorld(rig.bones.thighL, right, -1.45 * s); rotateWorld(rig.bones.thighR, right, -1.45 * s);
      rotateWorld(rig.bones.shinL, right, 1.5 * s); rotateWorld(rig.bones.shinR, right, 1.5 * s);
    }
    const seatedWork = p.sit > 0.9 && !em && !p.walking;
    if (seatedWork && (p.status === 'working' || p.status === 'thinking' || p.status === 'idle')) {
      const typing = p.status === 'working' && p.action !== 'speak';
      const lift = p.status === 'working' ? -0.5 : p.status === 'thinking' ? -0.45 : -0.15;
      const tw = typing && !reduce ? Math.sin(T * 15) * 0.07 : 0;
      rotateWorld(rig.bones.armL, right, lift + tw);
      rotateWorld(rig.bones.armR, right, lift - tw);
      rotateWorld(rig.bones.foreL, right, p.status === 'working' ? -0.35 : -0.25);
      rotateWorld(rig.bones.foreR, right, p.status === 'thinking' ? -1.2 : p.status === 'working' ? -0.35 : -0.25);
      // đầu nhìn màn hình (phía trước bên phải) hoặc ngó quanh khi rảnh
      const yaw = p.status === 'working' ? 0.45 + (reduce ? 0 : Math.sin(T * 2.1) * 0.05) : p.status === 'idle' ? (reduce ? 0 : Math.sin(T * 0.45) * 0.35) : 0.15;
      rotateWorld(rig.bones.head, up, yaw);
      if (p.status === 'thinking') rotateWorld(rig.bones.head, right, reduce ? 0 : Math.sin(T * 1.2) * 0.12 - 0.15);
    }
    if (p.status === 'error' && p.sit > 0.9) { rotateWorld(rig.bones.torso, right, 0.35); rotateWorld(rig.bones.head, right, 0.3); }
    if (p.carry) {
      rotateWorld(rig.bones.armL, right, -0.85); rotateWorld(rig.bones.armR, right, -0.85);
      rotateWorld(rig.bones.foreL, right, -0.7); rotateWorld(rig.bones.foreR, right, -0.7);
    }

    // đồ cầm tay
    rig.folder.visible = p.carry;
    if (p.carry) { rig.folder.position.set(0, 1.12, 0.42); rig.folder.rotation.set(0.15, 0, 0); }
    rig.cup.visible = p.cup;
    if (p.cup && rig.bones.handR) { rig.bones.handR.updateWorldMatrix(true, false); rig.bones.handR.getWorldPosition(tv); rig.root.worldToLocal(tv); rig.cup.position.copy(tv).add(new THREE.Vector3(0, 0.06, 0.05)); }
    if (rig.crown && rig.bones.head) { rig.bones.head.updateWorldMatrix(true, false); rig.bones.head.getWorldPosition(tv); rig.root.worldToLocal(tv); rig.crown.position.set(tv.x, tv.y + 0.48, tv.z); }

    // ----- gương mặt -----
    const target = ((em && FACE_EMOTE[em]) || FACE_STATUS[p.status] || [0, 0, 0]).slice() as [number, number, number];
    // lồng tiếng: miệng mở theo nhịp nói
    if (p.status === 'working' && p.action === 'speak' && !reduce) target[1] = 0.25 + 0.35 * Math.abs(Math.sin(T * 9) * Math.sin(T * 3.7));
    for (let i = 0; i < 3; i++) { rig.faceW[i] += (target[i] - rig.faceW[i]) * Math.min(1, dt * 6); rig.body.morphTargetInfluences![i] = rig.faceW[i]; }

    // ----- viền sáng theo trạng thái -----
    const col = statusHex[p.status];
    rig.material.userData.uRim.value.set(col);
    const pulse = reduce ? 1 : 0.5 + 0.5 * Math.sin(T * 5);
    rig.material.userData.uRimK.value = p.status === 'error' ? 0.5 + 0.6 * pulse : p.status === 'waiting_human' ? 0.35 + 0.4 * pulse : p.status === 'working' ? 0.12 : p.status === 'thinking' ? 0.1 : 0;
  });

  return <primitive object={rig.root} onClick={(e: { stopPropagation: () => void }) => { e.stopPropagation(); onSelect(); }} />;
}

export type { AgentPose };
