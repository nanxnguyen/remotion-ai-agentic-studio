import {Main, HookScene, PainScene, RevealScene, ProofScene, SearchScene, OutroScene} from './Main';
import {FPS, HEIGHT, SHOTS, SFX, TOTAL, WIDTH} from './timeline';

const shotDefs = [
  ['hook','S1 Repo 200k dòng',HookScene],['pain','S2 Khảo cổ codebase',PainScene],['reveal','S3 Graph mọc theo tầng',RevealScene],
  ['proof','S4 Dashboard thật',ProofScene],['search','S5 Search + Diff impact',SearchScene],['outro','S6 Búi mì thành bản đồ',OutroScene],
] as const;

export const WORKBENCH = {
  name:'Understand Anything · Viral Reel', fps:FPS, width:WIDTH, height:HEIGHT, total:TOTAL, background:'#090909', revision:'1.0.0',
  shots:shotDefs.map(([id,label,component])=>({id,label,...SHOTS[id],component,durationProp:'duration'})),
  transitions:[], captions:[], overlays:[],
  sfx:SFX.map((s,i)=>({id:`sfx-${i}`,from:SHOTS[s.shot].from+s.offset,duration:'duration' in s?s.duration:70,src:`audio/${s.src}`,volume:s.volume})),
  bgm:[{from:0,duration:TOTAL,src:'audio/bgm.mp3',volume:.075}],
  original:Main,
};
