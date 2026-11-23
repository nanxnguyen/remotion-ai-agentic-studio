import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import robotUrl from '../../assets/models/robot.glb?url';

/**
 * Bộ nhân vật robot (RobotExpressive, Quaternius, CC0).
 * File gốc có 14 mesh gắn cứng vào xương (19 lượt vẽ/nhân vật). Lúc tải, ta gộp tất cả
 * thành MỘT SkinnedMesh: mỗi đỉnh của mảnh cứng gắn 100% vào xương cha của nó, hai bàn tay
 * giữ nguyên trọng số gốc. Kết quả: 1 lượt vẽ + 1 lượt viền cho mỗi nhân vật, dùng chung
 * hình học và clip, mỗi agent chỉ khác màu áo (uniform).
 */

export type ClipName = 'Idle' | 'Walking' | 'Running' | 'Sitting' | 'Standing' | 'Wave' | 'ThumbsUp' | 'Yes' | 'No' | 'Dance' | 'Jump' | 'Death' | 'Punch' | 'WalkJump';

export interface RobotKit {
  geometry: THREE.BufferGeometry;   // gộp, có skinIndex/skinWeight, color, aTint, morph Angry/Surprised/Sad
  boneOrder: number[];              // vị trí (theo thứ tự duyệt) của từng xương trong cây gốc
  boneInverses: THREE.Matrix4[];
  template: THREE.Object3D;         // cây xương gốc, đã bỏ mesh
  clips: Record<string, THREE.AnimationClip>;
  scale: number;                    // đưa robot về chiều cao mục tiêu
  morph: Record<string, number>;
  sitLift: number;                  // nâng gốc lên khi ngồi để khớp hông nằm trên mặt ghế
  outline: number;                  // độ dày viền, theo đơn vị của mesh gốc
  hand: { r: number; l: number };   // chỉ số xương bàn tay (theo boneOrder)
}

export const TARGET_HEIGHT = 1.85;
/** Mặt ghế (đỉnh nệm) và độ dày khung chậu robot: khớp hông nằm trên mặt ghế một đoạn. */
export const SEAT_TOP = 0.54;
const PELVIS = 0.07;
/** Ghế đặt gần bàn hơn ghế cũ để tay robot với tới bàn phím. */
export const SEAT_FORWARD = 0.3;

const LOWER = /^(Bone|Body|Hips|UpperLeg|LowerLeg|Leg|Foot|PoleTarget)/;

let kitPromise: Promise<RobotKit> | null = null;
export function loadRobotKit(): Promise<RobotKit> {
  // Bản build một file nhúng model dạng data URL: tự giải mã base64 thay vì fetch, để chạy được
  // cả trong artifact claude.ai (chặn kết nối ngoài). Model không nén meshopt nên không cần WebAssembly.
  if (!kitPromise) kitPromise = (async () => {
    let buf: ArrayBuffer;
    if (robotUrl.startsWith('data:')) {
      const bin = atob(robotUrl.slice(robotUrl.indexOf(',') + 1));
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      buf = u8.buffer;
    } else buf = await (await fetch(robotUrl)).arrayBuffer();
    return new Promise<GLTF>((res, rej) => new GLTFLoader().parse(buf, '', res, rej));
  })().then(buildKit);
  return kitPromise;
}

function buildKit(gltf: GLTF): RobotKit {
  const root = gltf.scene;
  root.updateMatrixWorld(true);

  // xương theo thứ tự duyệt cây: dùng lại được trên bản clone (SkeletonUtils giữ nguyên cấu trúc)
  const all: THREE.Object3D[] = [];
  root.traverse(o => all.push(o));
  const bones = all.filter((o): o is THREE.Bone => (o as THREE.Bone).isBone);
  const boneIndex = new Map<THREE.Object3D, number>(bones.map((b, i) => [b, i]));
  const boneInverses = bones.map(b => b.matrixWorld.clone().invert());

  const MAT_COLOR: Record<string, THREE.Color> = {};
  const pos: number[] = [], nor: number[] = [], col: number[] = [], tint: number[] = [], si: number[] = [], sw: number[] = [], idx: number[] = [];
  const morphNames = ['Angry', 'Surprised', 'Sad'];
  const morphPos: number[][] = morphNames.map(() => []);
  const v = new THREE.Vector3(), n = new THREE.Vector3(), q = new THREE.Vector3(), d = new THREE.Vector3();

  const meshes: THREE.Mesh[] = [];
  root.traverse(o => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh); });
  for (const mesh of meshes) {
    const geo = mesh.geometry;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const groups = geo.groups.length ? geo.groups : [{ start: 0, count: geo.index ? geo.index.count : geo.attributes.position.count, materialIndex: 0 }];
    const P = geo.attributes.position, N = geo.attributes.normal;
    const skinned = (mesh as THREE.SkinnedMesh).isSkinnedMesh ? (mesh as THREE.SkinnedMesh) : null;
    let rigidBone = -1;
    if (!skinned) { let p: THREE.Object3D | null = mesh.parent; while (p && !boneIndex.has(p)) p = p.parent; rigidBone = p ? boneIndex.get(p)! : 0; }
    const base = pos.length / 3;
    // màu theo nhóm vật liệu (mỗi đỉnh thuộc đúng một nhóm trong file này)
    const vColor = new Array<THREE.Color>(P.count).fill(new THREE.Color(1, 1, 1));
    const vTint = new Float32Array(P.count);
    for (const g of groups) {
      const m = mats[g.materialIndex ?? 0] as THREE.MeshStandardMaterial;
      const c = MAT_COLOR[m.name] ?? (MAT_COLOR[m.name] = m.color.clone());
      for (let k = g.start; k < g.start + g.count; k++) {
        const vi = geo.index ? geo.index.getX(k) : k;
        vColor[vi] = c; vTint[vi] = m.name === 'Main' ? 1 : 0;
        idx.push(base + vi);
      }
    }
    const tf = (i: number, out: THREE.Vector3, src: THREE.Vector3) => {
      out.copy(src);
      if (skinned) { skinned.applyBoneTransform(i, out); out.applyMatrix4(skinned.matrixWorld); }
      else out.applyMatrix4(mesh.matrixWorld);
      return out;
    };
    for (let i = 0; i < P.count; i++) {
      v.fromBufferAttribute(P, i); n.fromBufferAttribute(N, i);
      tf(i, q, v);
      pos.push(q.x, q.y, q.z);
      // pháp tuyến: biến đổi một điểm lệch nhỏ theo pháp tuyến, chịu được cả xương lẫn tỉ lệ
      d.copy(v).addScaledVector(n, 1e-4);
      tf(i, d, d).sub(q).normalize();
      nor.push(d.x, d.y, d.z);
      const c = vColor[i]; col.push(c.r, c.g, c.b); tint.push(vTint[i]);
      if (skinned) {
        const J = geo.attributes.skinIndex, W = geo.attributes.skinWeight;
        for (let k = 0; k < 4; k++) {
          const b = skinned.skeleton.bones[J.getComponent(i, k)];
          si.push(boneIndex.get(b) ?? 0); sw.push(W.getComponent(i, k));
        }
      } else { si.push(rigidBone, 0, 0, 0); sw.push(1, 0, 0, 0); }
    }
    // morph: chỉ đầu robot có. glTF lưu delta tương đối → chỉ cần phần tuyến tính của ma trận.
    const dict = mesh.morphTargetDictionary;
    const lin = new THREE.Matrix3().setFromMatrix4(mesh.matrixWorld);
    morphNames.forEach((name, mi) => {
      const ti = dict?.[name];
      const arr = ti !== undefined ? geo.morphAttributes.position?.[ti] : undefined;
      for (let i = 0; i < P.count; i++) {
        if (!arr) { morphPos[mi].push(0, 0, 0); continue; }
        d.fromBufferAttribute(arr, i);
        if (!geo.morphTargetsRelative) d.sub(v.fromBufferAttribute(P, i));
        d.applyMatrix3(lin);
        morphPos[mi].push(d.x, d.y, d.z);
      }
    });
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aTint', new THREE.Float32BufferAttribute(tint, 1));
  g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
  g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
  g.morphAttributes.position = morphPos.map(a => new THREE.Float32BufferAttribute(a, 3));
  g.morphTargetsRelative = true;
  g.setIndex(idx);
  g.computeBoundingBox();
  const bb = g.boundingBox!;
  const scale = TARGET_HEIGHT / (bb.max.y - bb.min.y);
  // khung bao rộng để không bị cắt khi nhân vật cử động
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, (bb.max.y + bb.min.y) / 2, 0), (bb.max.y - bb.min.y) * 1.2);

  // bỏ mesh gốc khỏi cây xương mẫu, rồi mới đánh số xương theo thứ tự duyệt của cây đã gọn
  for (const m of meshes) m.parent?.remove(m);
  const kept: THREE.Object3D[] = [];
  root.traverse(o => kept.push(o));
  const boneOrder = bones.map(b => kept.indexOf(b));

  // clip: bản đầy đủ + bản tách thân trên / thân dưới để ngồi vẫn vẫy tay, gật đầu được
  const clips: Record<string, THREE.AnimationClip> = {};
  for (const c0 of gltf.animations) {
    // morph của mesh gốc đã bị bỏ; biểu cảm do code điều khiển
    const c = new THREE.AnimationClip(c0.name, c0.duration, c0.tracks.filter(t => !t.name.includes('morphTargetInfluences')));
    clips[c.name] = c;
    const name = (t: THREE.KeyframeTrack) => t.name.split('.')[0];
    clips[c.name + ':upper'] = new THREE.AnimationClip(c.name + ':upper', c.duration, c.tracks.filter(t => !LOWER.test(name(t))));
    clips[c.name + ':lower'] = new THREE.AnimationClip(c.name + ':lower', c.duration, c.tracks.filter(t => LOWER.test(name(t))));
  }

  const kit: RobotKit = {
    geometry: g, boneOrder, boneInverses, template: root, clips, scale,
    morph: { Angry: 0, Surprised: 1, Sad: 2 }, sitLift: 0, outline: (bb.max.y - bb.min.y) * 0.007,
    hand: { r: bones.findIndex(b => b.name.startsWith('Palm2R') || b.name === 'Palm2.R' || b.name.startsWith('Palm2_R')), l: bones.findIndex(b => b.name.startsWith('Palm2L') || b.name === 'Palm2.L' || b.name.startsWith('Palm2_L')) },
  };
  measureSit(kit);
  return kit;
}

/** Đo khớp hông khi đứng (clip Idle) để biết phải nâng gốc bao nhiêu khi ngồi lên ghế. */
function measureSit(kit: RobotKit) {
  const rig = makeRig(kit);
  const mixer = new THREE.AnimationMixer(rig.root);
  mixer.clipAction(kit.clips.Idle).play();
  mixer.update(0.001);
  rig.root.updateMatrixWorld(true);
  const legs = rig.bones.filter(b => /^UpperLeg[LR]$/.test(b.name)).map(b => b.getWorldPosition(new THREE.Vector3()));
  const hipY = legs.length ? legs.reduce((s, v) => s + v.y, 0) / legs.length : TARGET_HEIGHT * 0.27;
  kit.sitLift = SEAT_TOP + PELVIS - hipY;
  mixer.stopAllAction();
}

export interface Rig {
  root: THREE.Group;        // gốc đặt vị trí/hướng trong thế giới
  body: THREE.Object3D;     // cây xương đã clone, scale theo kit
  bones: THREE.Bone[];
  skeleton: THREE.Skeleton;
}

/** Tạo một bộ xương mới (chưa có mesh). */
export function makeRig(kit: RobotKit): Rig {
  const body = cloneSkinned(kit.template);
  const all: THREE.Object3D[] = [];
  body.traverse(o => all.push(o));
  const bones = kit.boneOrder.map(i => all[i] as THREE.Bone);
  const skeleton = new THREE.Skeleton(bones, kit.boneInverses.map(m => m.clone()));
  const root = new THREE.Group();
  body.scale.setScalar(kit.scale);
  root.add(body);
  return { root, body, bones, skeleton };
}

/* ---------- vật liệu toon + viền ---------- */
let gradient: THREE.DataTexture | null = null;
function toonRamp() {
  if (gradient) return gradient;
  // 4 nấc: bóng sâu, bóng, sáng, điểm sáng
  const data = new Uint8Array([58, 58, 58, 255, 118, 118, 118, 255, 178, 178, 178, 255, 215, 215, 215, 255]);
  gradient = new THREE.DataTexture(data, 4, 1, THREE.RGBAFormat);
  gradient.minFilter = gradient.magFilter = THREE.NearestFilter;
  gradient.needsUpdate = true;
  return gradient;
}

export interface BodyMaterial extends THREE.MeshToonMaterial { userData: { uTint: { value: THREE.Color }; uRim: { value: THREE.Color }; uRimK: { value: number } } }

export function makeBodyMaterial(tint: THREE.ColorRepresentation): BodyMaterial {
  const m = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: toonRamp() }) as BodyMaterial;
  m.userData = { uTint: { value: new THREE.Color(tint) }, uRim: { value: new THREE.Color('#ffffff') }, uRimK: { value: 0 } };
  m.onBeforeCompile = sh => {
    sh.uniforms.uTint = m.userData.uTint; sh.uniforms.uRim = m.userData.uRim; sh.uniforms.uRimK = m.userData.uRimK;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aTint;\nuniform vec3 uTint;')
      .replace('#include <color_vertex>', '#include <color_vertex>\nvColor.rgb = mix(vColor.rgb, uTint, aTint);');
    // viền sáng theo màu trạng thái (fresnel), giúp nhân vật tách khỏi nền
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uRim;\nuniform float uRimK;')
      .replace('#include <opaque_fragment>', 'float fres = pow(1.0 - clamp(dot(normalize(vViewPosition) * -1.0, normal), 0.0, 1.0), 3.0);\noutgoingLight += uRim * fres * uRimK;\n#include <opaque_fragment>');
  };
  m.customProgramCacheKey = () => 'xv-robot-body';
  return m;
}

let outlineMat: THREE.MeshBasicMaterial | null = null;
export function outlineMaterial(width: number) {
  if (outlineMat) return outlineMat;
  const m = new THREE.MeshBasicMaterial({ color: '#0b0a10', side: THREE.BackSide });
  m.onBeforeCompile = sh => {
    sh.vertexShader = sh.vertexShader.replace('#include <skinning_vertex>', `#include <skinning_vertex>\ntransformed += normalize(objectNormal) * ${width.toFixed(6)};`);
  };
  m.customProgramCacheKey = () => 'xv-robot-outline';
  outlineMat = m;
  return m;
}
