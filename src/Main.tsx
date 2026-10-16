import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {SHOTS, SFX, TOTAL} from './timeline';
import {body, colors, mono, title} from './styles';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.22, 1, 0.36, 1);
// Scenes cut directly into one another; opacity fades caused visible black seams at shot boundaries.
const fade = (_f: number, _dur: number) => 1;

export const Fonts: React.FC = () => <style>{`
@font-face{font-family:'DM Serif Display';src:url('${staticFile('fonts/DMSerifDisplay-Regular.woff2')}') format('woff2')}
@font-face{font-family:'Inter';src:url('${staticFile('fonts/Inter-Regular.woff2')}') format('woff2');font-weight:400}
@font-face{font-family:'Inter';src:url('${staticFile('fonts/Inter-SemiBold.woff2')}') format('woff2');font-weight:650}
@font-face{font-family:'JetBrains Mono';src:url('${staticFile('fonts/JetBrainsMono-Regular.woff2')}') format('woff2')}
*{box-sizing:border-box}
`}</style>;

export const Grain: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at 50% 18%, rgba(212,165,116,.11), transparent 34%), linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)', backgroundSize: 'auto, 54px 54px, 54px 54px', boxShadow: 'inset 0 0 180px rgba(0,0,0,.85)'}} />
);

export const Badge: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{...mono, display:'inline-flex', alignItems:'center', gap:12, fontSize:34, color:colors.gold2, padding:'14px 22px', border:'1px solid rgba(212,165,116,.34)', borderRadius:999, background:'rgba(212,165,116,.08)'}}>
    <span style={{width:9,height:9,borderRadius:99,background:colors.gold,boxShadow:`0 0 18px ${colors.gold}`}} />{children}
  </div>
);

export const Caption: React.FC<{text: string; accent?: string}> = ({text, accent}) => {
  const f=useCurrentFrame();
  const y=interpolate(f,[4,18],[38,0],{...clamp,easing:ease});
  const parts=accent?text.split(accent):[text];
  return <div style={{position:'absolute',left:70,right:70,bottom:224,display:'flex',justifyContent:'center',opacity:interpolate(f,[4,14],[0,1],clamp),transform:`translateY(${y}px)`,zIndex:30}}>
    <div style={{...body,maxWidth:940,fontSize:64,lineHeight:1.08,fontWeight:650,textAlign:'center',padding:'24px 30px 27px',borderRadius:28,background:'rgba(8,8,8,.84)',border:'1px solid rgba(255,255,255,.10)',boxShadow:'0 24px 80px rgba(0,0,0,.46)'}}>
      {accent && parts.length===2 ? <>{parts[0]}<span style={{color:colors.gold2}}>{accent}</span>{parts[1]}</> : text}
    </div>
  </div>;
};

const FileCard: React.FC<{name:string;type:string;index:number;frame:number}> = ({name,type,index,frame}) => {
  const d=index*12;
  const p=spring({frame:frame-d,fps:30,config:{damping:15,stiffness:150,mass:.8}});
  const x=interpolate(p,[0,1],[index%2===0?-560:560,0]);
  const scroll=interpolate(frame,[52,92],[0,76],clamp);
  const y=index*56-scroll;
  const focus=index===3;
  return <div style={{position:'absolute',zIndex:index,left:110,top:748,width:860,height:118,borderRadius:20,border:`1px solid ${focus?'rgba(232,196,154,.72)':'rgba(255,255,255,.12)'}`,background:'linear-gradient(135deg,#1b1b1b,#101010)',boxShadow:focus?'0 28px 65px rgba(212,165,116,.20)':'0 18px 42px rgba(0,0,0,.42)',display:'flex',alignItems:'center',padding:'0 30px',gap:20,filter:`blur(${interpolate(p,[0,1],[7,0])}px)`,transform:`translateX(${x}px) translateY(${y}px) scale(${interpolate(p,[0,1],[.94,1-index*.012])}) rotate(${(1-p)*(index%2?3:-3)}deg)`,opacity:p*(1-index*.06)}}>
    <div style={{width:46,height:56,borderRadius:8,background:index%2?colors.violet:colors.cyan,opacity:.85}} />
    <div style={{...mono,fontSize:34,flex:1}}>{name}</div><div style={{...mono,fontSize:32,color:focus?colors.gold2:colors.muted}}>{type}</div>
  </div>;
};

export const HookScene: React.FC<{duration?:number}> = ({duration=303}) => {
  const f=useCurrentFrame();
  const hero=spring({frame:f,fps:30,config:{damping:18,stiffness:90,mass:1}});
  const files=[['src/app.ts','entry'],['auth/session.ts','import'],['cart/store.ts','import'],['api/client.ts','import']];
  return <AbsoluteFill style={{opacity:fade(f,duration),padding:'126px 72px 0'}}>
    <div style={{opacity:interpolate(f,[0,18],[0,1],clamp),transform:`translateY(${interpolate(hero,[0,1],[44,0])}px)`}}><Badge>NGÀY ĐẦU VÀO TEAM</Badge></div>
    <div style={{...title,fontSize:145,marginTop:42,transform:`scale(${interpolate(hero,[0,1],[.9,1])})`,transformOrigin:'left top'}}>
      Repo<br/><span style={{color:colors.gold2}}>200.000</span><br/>dòng code.
    </div>
    <div style={{...body,fontSize:34,color:colors.muted,marginTop:26}}>Sếp: “Em xem nhanh kiến trúc nhé.”</div>
    {files.map((x,i)=><FileCard key={x[0]} name={x[0]} type={x[1]} index={i} frame={f-54}/>) }
    <Caption text="Nhanh… kiểu ba ngày hả anh?" accent="ba ngày" />
  </AbsoluteFill>;
};

const NODES=[
  [170,220,colors.violet],[470,130,colors.cyan],[810,245,colors.coral],[270,520,colors.mint],[690,500,colors.violet],[485,760,colors.cyan],[160,915,colors.coral],[820,940,colors.mint],
] as const;

export const PainScene: React.FC<{duration?:number}> = ({duration=151}) => {
  const f=useCurrentFrame();
  const p=interpolate(f,[0,130],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
  const chaotic=interpolate(p,[0,1],[0,1]);
  return <AbsoluteFill style={{opacity:fade(f,duration),paddingTop:105}}>
    <div style={{...mono,textAlign:'center',fontSize:34,color:colors.muted}}>FILE → FILE → THÊM BẢY FILE</div>
    <svg width="1080" height="1180" viewBox="0 0 1080 1180" style={{position:'absolute',top:235,left:0}}>
      {Array.from({length:22}).map((_,i)=>{const a=NODES[i%8],b=NODES[(i*3+2)%8];const wig=Math.sin(i*8.1)*120*chaotic;return <path key={i} d={`M ${a[0]} ${a[1]} C ${540+wig} ${260+(i%5)*150}, ${500-wig} ${690-(i%4)*90}, ${b[0]} ${b[1]}`} fill="none" stroke="rgba(212,165,116,.26)" strokeWidth={2.5} strokeDasharray="8 11" strokeDashoffset={-f*2.2}/>})}
      {NODES.map((n,i)=>{const s=spring({frame:f-i*6,fps:30,config:{damping:14,stiffness:110}});return <g key={i} transform={`translate(${n[0]} ${n[1]}) scale(${s})`}><circle r={48+(i%3)*9} fill="#151515" stroke={n[2]} strokeWidth="5"/><text textAnchor="middle" dy="8" fill="#f5f0eb" fontFamily="JetBrains Mono" fontSize="22">{['app','auth','api','cart','db','utils','types','config'][i]}</text></g>})}
    </svg>
    <div style={{...title,position:'absolute',top:690,left:110,right:110,fontSize:128,textAlign:'center',padding:'34px 18px 42px',borderRadius:32,background:'rgba(9,9,9,.82)',border:'1px solid rgba(255,255,255,.08)',boxShadow:'0 28px 80px rgba(0,0,0,.5)',transform:`rotate(${Math.sin(f/18)*1.2}deg)`}}>Khảo cổ<br/><span style={{color:colors.gold2}}>codebase</span></div>
    <Caption text="Mở một file… rồi lạc luôn trong họ hàng nhà import." accent="lạc luôn" />
  </AbsoluteFill>;
};

const Graph: React.FC<{frame:number; compact?:boolean; highlight?:number}> = ({frame,compact=false,highlight=0}) => {
  const nodes=[
    {x:540,y:220,label:'app.ts',c:colors.gold2,parent:-1},
    {x:300,y:430,label:'auth',c:colors.violet,parent:0},{x:560,y:470,label:'api',c:colors.cyan,parent:0},{x:790,y:410,label:'cart',c:colors.coral,parent:0},
    {x:180,y:680,label:'login()',c:colors.violet,parent:1},{x:390,y:720,label:'session',c:colors.mint,parent:1},{x:565,y:745,label:'client',c:colors.cyan,parent:2},{x:760,y:680,label:'store',c:colors.coral,parent:3},{x:900,y:760,label:'db',c:colors.mint,parent:3},
  ];
  const scale=compact?.82:1;
  return <svg width="1080" height="990" viewBox="0 0 1080 990" style={{transform:`scale(${scale})`,transformOrigin:'center top',overflow:'visible'}}>
    {nodes.map((n,i)=>{if(n.parent<0)return null;const par=nodes[n.parent];const lp=interpolate(frame,[i*8+7,i*8+28],[0,1],clamp);const dim=i===4||n.parent===4?1:interpolate(highlight,[0,1],[1,.22]);return <path key={`l${i}`} d={`M${par.x},${par.y} C${par.x},${(par.y+n.y)/2} ${n.x},${(par.y+n.y)/2} ${n.x},${n.y}`} fill="none" stroke={n.c} strokeWidth="4" opacity={.6*dim} pathLength={1} strokeDasharray={1} strokeDashoffset={1-lp}/>})}
    {nodes.map((n,i)=>{const sp=spring({frame:frame-i*8-17,fps:30,config:{damping:15,stiffness:120}});const dim=i===4?1:interpolate(highlight,[0,1],[1,.22]);return <g key={n.label} opacity={dim} transform={`translate(${n.x} ${n.y}) scale(${sp})`}><circle r={i===0?76:58} fill="#111" stroke={n.c} strokeWidth={i===0?6:4}/><circle r={i===0?89:70} fill="none" stroke={n.c} strokeWidth="1" opacity=".25"/><text textAnchor="middle" dy="10" fill="#f5f0eb" fontFamily="JetBrains Mono" fontSize={i===0?34:30}>{n.label}</text></g>})}
  </svg>;
};

export const RevealScene: React.FC<{duration?:number}> = ({duration=120}) => {
  const f=useCurrentFrame();
  const command='/understand';
  const typed=command.slice(0,Math.floor(interpolate(f,[7,34],[0,command.length],clamp)));
  const graphF=Math.max(0,f-36);
  const camera=interpolate(graphF,[0,64,82,100],[1.08,.84,.82,.82],{...clamp,easing:ease});
  const confirmed=interpolate(f,[30,42],[0,1],clamp);
  return <AbsoluteFill style={{opacity:fade(f,duration),padding:'95px 58px 0'}}>
    <Badge>MULTI-AGENT PIPELINE</Badge>
    <div style={{marginTop:32,borderRadius:26,border:'1px solid rgba(255,255,255,.13)',background:'#101010',boxShadow:'0 35px 90px rgba(0,0,0,.55)',overflow:'hidden'}}>
      <div style={{height:62,display:'flex',gap:12,alignItems:'center',padding:'0 22px',background:'#191919'}}>{[colors.coral,colors.gold2,colors.mint].map(c=><span key={c} style={{width:14,height:14,borderRadius:99,background:c}}/>)}</div>
      <div style={{...mono,fontSize:39,padding:'30px 34px',color:colors.gold2}}><span style={{color:colors.muted}}>$ </span>{typed}<span style={{opacity:Math.floor(f/9)%2}}>▌</span></div>
      <div style={{...mono,fontSize:32,padding:'0 34px 24px',color:colors.mint,opacity:confirmed}}>✓ command accepted · scanning project</div>
    </div>
    <div style={{...title,fontSize:101,marginTop:42}}>Từ code thành<br/><span style={{color:colors.gold2}}>knowledge graph.</span></div>
    <div style={{height:890,marginTop:10,transform:`scale(${camera})`,transformOrigin:'50% 20%'}}><Graph frame={graphF}/></div>
    <div style={{position:'absolute',top:905,left:84,right:84,display:'flex',justifyContent:'space-between'}}>
      {['FILE','FUNCTION','CLASS','DEPENDENCY'].map((x,i)=><div key={x} style={{...mono,fontSize:34,color:[colors.violet,colors.cyan,colors.coral,colors.mint][i]}}>{x}</div>)}
    </div>
    <Caption text="Bấm, tìm, hỏi — thay vì đọc code như bói lá trà." accent="Bấm, tìm, hỏi" />
  </AbsoluteFill>;
};

export const ProofScene: React.FC<{duration?:number}> = ({duration=99}) => {
  const f=useCurrentFrame();
  const p=spring({frame:f-12,fps:30,config:{damping:18,stiffness:70,mass:1}});
  const rot=interpolate(p,[0,1],[8,-2]);
  return <AbsoluteFill style={{opacity:fade(f,duration),padding:'102px 54px 0'}}>
    <Badge>DASHBOARD THẬT</Badge>
    <div style={{...title,fontSize:104,marginTop:38}}>Thấy cả rừng.<br/><span style={{color:colors.gold2}}>Không chỉ một cây.</span></div>
    <div style={{marginTop:58,perspective:1400}}>
      <div style={{height:800,borderRadius:34,overflow:'hidden',border:'1px solid rgba(232,196,154,.35)',boxShadow:'0 70px 130px rgba(0,0,0,.7), 0 0 70px rgba(212,165,116,.12)',transform:`rotateX(${rot}deg) rotateY(${interpolate(p,[0,1],[-8,1])}deg) scale(${interpolate(p,[0,1],[.82,1])})`}}>
        <Img src={staticFile('images/overview.png')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}}/>
      </div>
    </div>
    <div style={{display:'flex',gap:16,marginTop:45}}>{['Click node','Đọc giải thích','Đi theo tour'].map((x,i)=><div key={x} style={{...body,flex:1,textAlign:'center',fontSize:34,padding:'21px 10px',borderRadius:18,background:'#171717',border:`1px solid ${[colors.violet,colors.cyan,colors.gold][i]}55`}}>{x}</div>)}</div>
    <Caption text="Graph dạy bạn từng phần ăn khớp với nhau thế nào." accent="ăn khớp" />
  </AbsoluteFill>;
};

export const SearchScene: React.FC<{duration?:number}> = ({duration=387}) => {
  const f=useCurrentFrame();
  const query='phần nào xử lý đăng nhập?';
  const typed=query.slice(0,Math.floor(interpolate(f,[12,96],[0,query.length],clamp)));
  const active=interpolate(f,[107,126],[0,1],clamp);
  const diff=spring({frame:f-195,fps:30,config:{damping:15,stiffness:120}});
  const result=spring({frame:f-126,fps:30,config:{damping:17,stiffness:120}});
  const click=interpolate(f,[112,120,132],[0,1,0],clamp);
  return <AbsoluteFill style={{opacity:fade(f,duration),padding:'105px 60px 0'}}>
    <div style={{...title,fontSize:106}}>Hỏi như người.<br/><span style={{color:colors.gold2}}>Tìm như máy.</span></div>
    <div style={{marginTop:45,borderRadius:28,border:'1px solid rgba(255,255,255,.14)',background:'#151515',padding:26,boxShadow:'0 30px 80px rgba(0,0,0,.45)'}}>
      <div style={{...body,fontSize:34,color:colors.muted,marginBottom:16}}>SEMANTIC SEARCH</div>
      <div style={{...mono,height:104,borderRadius:18,background:'#090909',border:`2px solid ${colors.gold}77`,padding:'26px 25px',fontSize:34,color:colors.text}}>{typed}<span style={{opacity:Math.floor(f/8)%2}}>▌</span></div>
    </div>
    <div style={{position:'relative',height:680,marginTop:18}}>
      <Graph frame={f+80} compact highlight={active} />
      <div style={{position:'absolute',left:96,top:420,width:240,height:116,borderRadius:58,border:`4px solid ${colors.violet}`,boxShadow:`0 0 ${60*active}px ${colors.violet}88`,opacity:active}} />
      <div style={{position:'absolute',left:290+click*150,top:360+click*60,width:42,height:42,borderRadius:99,border:'4px solid white',boxShadow:`0 0 0 ${click*28}px rgba(255,255,255,${.22*(1-click)})`,opacity:active}} />
    </div>
    <div style={{position:'absolute',left:70,right:70,top:1080,opacity:interpolate(f,[126,180,195],[0,1,0],clamp),transform:`translateY(${interpolate(result,[0,1],[60,0])}px)`,padding:28,borderRadius:24,background:'#151515',border:`1px solid ${colors.violet}77`,boxShadow:'0 30px 70px rgba(0,0,0,.45)'}}>
      <div style={{...mono,fontSize:34,color:colors.violet}}>MATCH · login() · 96%</div>
      <div style={{...body,fontSize:38,marginTop:14}}>auth/login.ts → session → currentUser</div>
    </div>
    <div style={{position:'absolute',left:70,right:70,top:1110,display:'flex',gap:22,transform:`translateY(${interpolate(diff,[0,1],[90,0])}px)`,opacity:diff}}>
      <div style={{flex:1,padding:28,borderRadius:22,background:'#151515',border:'1px solid rgba(103,232,249,.35)'}}><div style={{...mono,fontSize:34,color:colors.cyan}}>GUIDED TOUR</div><div style={{...body,fontSize:36,marginTop:12}}>1. auth<br/>2. session<br/>3. currentUser</div></div>
      <div style={{flex:1,padding:28,borderRadius:22,background:'#151515',border:'1px solid rgba(251,113,133,.35)'}}><div style={{...mono,fontSize:34,color:colors.coral}}>DIFF IMPACT</div><div style={{...body,fontSize:36,marginTop:12}}>3 modules<br/>bị ảnh hưởng</div></div>
    </div>
    <Sequence from={0} durationInFrames={195}><Caption text="Gõ câu hỏi. Graph dẫn tới node liên quan." accent="node liên quan" /></Sequence>
    <Sequence from={195} durationInFrames={192}><Caption text="Sửa login, đừng để giỏ hàng cũng… giận dỗi." accent="giận dỗi" /></Sequence>
  </AbsoluteFill>;
};

const MiniMap: React.FC<{messy?:boolean}> = ({messy=false}) => {
  const pts=[[190,180],[500,120],[820,220],[270,455],[540,420],[790,520],[190,690],[515,710],[860,735]];
  const cleanEdges=[[0,1],[1,2],[1,3],[1,4],[2,5],[3,6],[4,7],[5,8]];
  return <svg width="1080" height="900" viewBox="0 0 1080 900" style={{position:'absolute',inset:0}}>
    {(messy?Array.from({length:24},(_,i)=>[i%9,(i*5+3)%9]):cleanEdges).map((e,i)=>{const a=pts[e[0]],b=pts[e[1]];return <path key={i} d={messy?`M${a[0]},${a[1]} C${200+(i*97)%720},${100+(i*71)%650} ${880-(i*53)%720},${120+(i*89)%620} ${b[0]},${b[1]}`:`M${a[0]},${a[1]} C${a[0]},${(a[1]+b[1])/2} ${b[0]},${(a[1]+b[1])/2} ${b[0]},${b[1]}`} fill="none" stroke={messy?'rgba(251,113,133,.28)':'rgba(212,165,116,.54)'} strokeWidth={messy?2.2:4}/>} )}
    {pts.map((p,i)=><g key={i} transform={`translate(${p[0]} ${p[1]})`}><circle r={i===1?48:36} fill="#111" stroke={[colors.violet,colors.gold2,colors.cyan,colors.coral,colors.mint][i%5]} strokeWidth="4"/><text textAnchor="middle" dy="9" fill="#f5f0eb" fontFamily="JetBrains Mono" fontSize="28">{['app','core','api','auth','user','cart','login','db','store'][i]}</text></g>)}
  </svg>;
};

export const OutroScene: React.FC<{duration?:number}> = ({duration=230}) => {
  const f=useCurrentFrame();
  const slider=interpolate(f,[18,30,42,60,108],[8,76,70,70,40],{...clamp,easing:ease});
  const materialize=interpolate(f,[102,154],[0,1],{...clamp,easing:ease});
  return <AbsoluteFill style={{opacity:fade(f,duration)}}>
    <div style={{position:'absolute',top:80,left:58,right:58,height:900,borderRadius:34,overflow:'hidden',border:'1px solid rgba(255,255,255,.12)',background:'#111'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 45% 40%,rgba(251,113,133,.13),transparent 35%)'}}/>
      <div style={{position:'absolute',inset:0,clipPath:`inset(0 ${100-slider}% 0 0)`,background:'radial-gradient(circle at 52% 40%,rgba(212,165,116,.18),transparent 42%)'}}><MiniMap messy /></div>
      <div style={{position:'absolute',inset:0,clipPath:`inset(0 0 0 ${slider}%)`,background:'radial-gradient(circle at 52% 40%,rgba(212,165,116,.18),transparent 42%)'}}><MiniMap /></div>
      <div style={{position:'absolute',left:`calc(${slider}% - 4px)`,top:0,bottom:0,width:8,background:colors.gold2,boxShadow:`0 0 35px ${colors.gold}`}}/>
      <div style={{position:'absolute',left:`calc(${slider}% - 39px)`,top:405,width:78,height:78,borderRadius:99,background:'#111',border:`4px solid ${colors.gold2}`,boxShadow:`0 0 28px ${colors.gold}88`}} />
      <div style={{...mono,position:'absolute',left:26,top:25,fontSize:34}}>BÚI MÌ</div><div style={{...mono,position:'absolute',right:26,top:25,fontSize:34,color:colors.gold2}}>BẢN ĐỒ</div>
    </div>
    <div style={{position:'absolute',top:1040,left:70,right:70,textAlign:'center',transform:`translateY(${interpolate(materialize,[0,1],[34,0])}px) scale(${interpolate(materialize,[0,1],[.97,1])})`,opacity:materialize}}>
      <svg width="940" height="230" viewBox="0 0 940 230" style={{overflow:'visible'}}>
        <text x="470" y="92" textAnchor="middle" fontFamily="DM Serif Display" fontSize="96" fill={colors.text} fillOpacity={interpolate(materialize,[.55,1],[0,1],clamp)} stroke={colors.text} strokeWidth="2" strokeDasharray="1200" strokeDashoffset={(1-materialize)*1200}>Understand</text>
        <text x="470" y="202" textAnchor="middle" fontFamily="DM Serif Display" fontSize="96" fill={colors.gold2} fillOpacity={interpolate(materialize,[.55,1],[0,1],clamp)} stroke={colors.gold2} strokeWidth="2" strokeDasharray="1200" strokeDashoffset={(1-materialize)*1200}>Anything</text>
      </svg>
      {['GRAPH','SEARCH','TOUR','DIFF'].map((x,i)=>{const cp=spring({frame:f-154-i*5,fps:30,config:{damping:16,stiffness:115}});const pos=[[-395,12],[395,12],[-395,180],[395,180]][i];return <div key={x} style={{...mono,position:'absolute',left:'50%',top:0,fontSize:32,color:[colors.gold2,colors.violet,colors.cyan,colors.coral][i],padding:'12px 18px',borderRadius:999,border:'1px solid currentColor',background:'#111',transform:`translate(calc(-50% + ${pos[0]*cp}px),${pos[1]*cp}px)`,opacity:cp}}>{x}</div>})}
      <div style={{...body,fontSize:38,color:colors.muted,marginTop:12}}>Cài plugin · chạy <span style={{...mono,color:colors.text}}>understand</span></div>
      <div style={{...mono,fontSize:34,color:colors.gold2,marginTop:22}}>understand-anything.com</div>
      <div style={{...body,position:'absolute',top:360,left:0,right:0,fontSize:32,lineHeight:1.25,color:'#85817d'}}>Quét đầu tiên ở repo lớn có thể tốn nhiều token<br/>các lần sau incremental</div>
    </div>
    <Caption text="Đỡ đào code bằng thìa nha!" accent="bằng thìa" />
  </AbsoluteFill>;
};

const Scene = ({from,duration,children}:{from:number;duration:number;children:React.ReactNode}) => <Sequence from={from} durationInFrames={duration} premountFor={30}>{children}</Sequence>;

export const Main: React.FC<{withBgm:boolean}> = ({withBgm}) => {
  return <AbsoluteFill style={{background:colors.bg,overflow:'hidden'}}>
    <Fonts/><Grain/>
    <Scene {...SHOTS.hook}><HookScene/></Scene>
    <Scene {...SHOTS.pain}><PainScene/></Scene>
    <Scene {...SHOTS.reveal}><RevealScene/></Scene>
    <Scene {...SHOTS.proof}><ProofScene/></Scene>
    <Scene {...SHOTS.search}><SearchScene/></Scene>
    <Scene {...SHOTS.outro}><OutroScene/></Scene>
    <Audio src={staticFile('audio/voice.mp3')} volume={1.0} playbackRate={1.08}/>
    {withBgm ? <Audio src={staticFile('audio/bgm.mp3')} volume={(f)=>interpolate(f,[0,20,TOTAL-30,TOTAL],[0,.075,.075,0],clamp)} /> : null}
    {SFX.map((s,i)=>{const shot=SHOTS[s.shot];const dur='duration' in s?s.duration:70;return <Sequence key={i} from={shot.from+s.offset} durationInFrames={dur}><Audio src={staticFile(`audio/${s.src}`)} volume={s.volume}/></Sequence>})}
  </AbsoluteFill>;
};
