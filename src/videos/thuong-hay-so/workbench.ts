// Workbench manifest — thuong-hay-so-bat-dau-lai (director-owned).
import {FPS, HEIGHT, SHOTS, SFX, TOTAL, WIDTH} from './timeline';

const shotDefs = [
  ['s1', 'S1 Hook bát canh'],
  ['s2', 'S2 Nồi cạch + Giữ ấm'],
  ['s3', 'S3 Nhặt hành'],
  ['s4', 'S4 Re-hook freeze'],
  ['s5', 'S5 Vì thương'],
  ['s6', 'S6 Vì sợ'],
  ['s7', 'S7 Y hệt nhau'],
  ['s8', 'S8 Ngưỡng cửa'],
  ['s9', 'S9 3 bằng chứng'],
  ['s10', 'S10 F2 + lặng'],
] as const;

export const WORKBENCH = {
  name: 'Thương hay sợ bắt đầu lại · Story Reel',
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  total: TOTAL,
  background: '#2A2238',
  revision: '1.0.0',
  shots: shotDefs.map(([id, label]) => ({id, label, ...SHOTS[id], durationProp: 'duration'})),
  transitions: [],
  captions: [],
  overlays: [],
  sfx: SFX.map((s, i) => ({
    id: `sfx-${i}`,
    from: SHOTS[s.shot].from + s.offset,
    duration: s.duration,
    src: `audio/thuong-hay-so-bat-dau-lai/${s.src}`,
    volume: s.volume,
  })),
  bgm: [{from: 0, duration: TOTAL, src: 'audio/thuong-hay-so-bat-dau-lai/bgm.mp3', volume: 0.22}],
  original: null,
};
