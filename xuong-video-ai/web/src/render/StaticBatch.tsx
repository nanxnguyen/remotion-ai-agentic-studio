import { useLayoutEffect, useRef, type ReactNode } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/** Vật liệu dùng chung cho mesh đã gộp: màu nằm trong vertex color, các thông số khác giữ nguyên. */
const shared = new Map<string, THREE.MeshStandardMaterial>();
function bakeKey(m: THREE.Material): string | null {
  const s = m as THREE.MeshStandardMaterial;
  if (!s.isMeshStandardMaterial || (s as THREE.MeshPhysicalMaterial).isMeshPhysicalMaterial || s.userData.live || s.map || s.vertexColors || s.transparent) return null;
  return [s.roughness, s.metalness, s.emissive.getHexString(), s.emissiveIntensity, s.side, s.toneMapped, s.flatShading].join('|');
}
function sharedMaterial(key: string, like: THREE.MeshStandardMaterial) {
  let m = shared.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: like.roughness, metalness: like.metalness, emissive: like.emissive, emissiveIntensity: like.emissiveIntensity, side: like.side, toneMapped: like.toneMapped, flatShading: like.flatShading });
    shared.set(key, m);
  }
  return m;
}

/**
 * Gộp các mesh tĩnh bên trong thành một mesh cho mỗi vật liệu, ngay sau khi gắn vào cảnh.
 * Vật liệu được giữ nguyên đối tượng, nên đổi màu/độ sáng vật liệu (đèn trạng thái, màn hình)
 * vẫn có tác dụng. Mesh nào cần đổi vị trí hoặc ẩn/hiện thì gắn userData={{ dynamic: true }}
 * (hoặc nằm trong group có cờ đó) để được bỏ qua.
 */
export function StaticBatch({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useLayoutEffect(() => {
    const g = ref.current;
    if (!g) return;
    g.updateMatrixWorld(true);
    const inv = g.matrixWorld.clone().invert();
    // khoá gộp: vật liệu "sống" (đổi màu lúc chạy) giữ nguyên đối tượng; vật liệu tĩnh gộp theo thông số, màu vào vertex color
    const buckets = new Map<THREE.Material | string, { mat: THREE.Material; geos: THREE.BufferGeometry[]; cast: boolean; receive: boolean }>();
    const merged: THREE.Mesh[] = [], hidden: THREE.Mesh[] = [];
    const visit = (o: THREE.Object3D) => {
      if (o.userData.dynamic) return;
      const m = o as THREE.Mesh;
      if (m.isMesh && !(m as THREE.SkinnedMesh).isSkinnedMesh && !(m as THREE.InstancedMesh).isInstancedMesh && !Array.isArray(m.material) && o.visible) {
        const src = m.geometry;
        let geo = (src.index ? src.toNonIndexed() : src.clone());
        for (const k of Object.keys(geo.attributes)) if (k !== 'position' && k !== 'normal') geo.deleteAttribute(k);
        if (!geo.attributes.normal) geo.computeVertexNormals();
        geo.morphAttributes = {};
        geo = geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld));
        const key = bakeKey(m.material);
        const bucketKey = key ?? m.material;
        if (key) {
          const c = (m.material as THREE.MeshStandardMaterial).color, n = geo.attributes.position.count;
          const arr = new Float32Array(n * 3);
          for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
          geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
        }
        const b = buckets.get(bucketKey) ?? { mat: key ? sharedMaterial(key, m.material as THREE.MeshStandardMaterial) : m.material, geos: [], cast: false, receive: false };
        b.geos.push(geo); b.cast ||= m.castShadow; b.receive ||= m.receiveShadow;
        buckets.set(bucketKey, b);
        hidden.push(m);
      }
      for (const c of o.children) visit(c);
    };
    for (const c of g.children) visit(c);
    const done = new Set<THREE.Material | string>();
    for (const [k, b] of buckets) {
      if (b.geos.length < 2 && typeof k !== 'string') { b.geos.forEach(x => x.dispose()); continue; }
      const geo = mergeGeometries(b.geos, false);
      b.geos.forEach(x => x.dispose());
      if (!geo) continue;
      const mesh = new THREE.Mesh(geo, b.mat);
      mesh.castShadow = b.cast; mesh.receiveShadow = b.receive;
      mesh.userData.batched = true;
      merged.push(mesh); done.add(k);
    }
    // chỉ ẩn những mesh thật sự đã được gộp
    const off = hidden.filter(m => { const key = bakeKey(m.material as THREE.Material); return done.has(key ?? (m.material as THREE.Material)); });
    off.forEach(m => { m.visible = false; });
    merged.forEach(m => g.add(m));
    return () => { merged.forEach(m => { g.remove(m); m.geometry.dispose(); }); off.forEach(m => { m.visible = true; }); };
  }, []);
  return <group ref={ref}>{children}</group>;
}
