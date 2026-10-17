import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

type Motif = 'calendar'|'two'|'memory'|'blank'|'release'|'fork';
type Shot = {id:string;heading:string;sub:string;motif:Motif};
export const SCENE_DATA: Shot[] = [
  {id:'s1', heading:"NĂM NĂM...", sub:"CÒN GÌ ĐỂ KỂ?", motif:'calendar'},
  {id:'s2', heading:"NĂM NĂM RỒI...", sub:"", motif:'two'},
  {id:'s3', heading:"CÒN BÂY GIỜ?", sub:"", motif:'two'},
  {id:'s4', heading:"CHUYỆN CỦA", sub:"NGÀY XƯA", motif:'memory'},
  {id:'s5', heading:"NHỮNG NGÀY", sub:"GẦN ĐÂY?", motif:'blank'},
  {id:'s6', heading:"SỢ MỌI THỨ", sub:"VÔ NGHĨA", motif:'calendar'},
  {id:'s7', heading:"ĐÃ TỪNG", sub:"CÓ Ý NGHĨA", motif:'release'},
  {id:'s8', heading:"TIẾC NGƯỜI", sub:"HAY TIẾC NĂM THÁNG?", motif:'fork'},
];
const WHITE='#FFFFFF', ACCENT='#F28C52', SECONDARY='#BDBDBD';
const Human: React.FC<{x:number;y:number;accent?:boolean}> = ({x,y,accent=false}) => (
  <g transform={`translate(${x} ${y})`} fill="none" stroke={accent?ACCENT:WHITE} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={0} cy={0} r={44}/><path d="M0 45 V260 M0 127 L-80 208 M0 127 L80 208 M0 260 L-75 382 M0 260 L75 382"/>
  </g>
);
const Calendar:React.FC<{x:number;y:number;opacity?:number}> = ({x,y,opacity=1}) => (
  <g transform={`translate(${x} ${y})`} fill="none" opacity={opacity}>
    <rect x={0} y={0} width={230} height={250} rx={16} stroke={SECONDARY} strokeWidth={8}/>
    {[0,1,2].map(i=><path key={i} d={`M26 ${78+i*50}H204`} stroke={i===2?ACCENT:SECONDARY} strokeWidth={8} strokeLinecap="round"/>)}
    <path d="M40 0V-20M190 0V-20" stroke={WHITE} strokeWidth={10}/>
  </g>
);
export const Scene:React.FC<{index:number}> = ({index}) => {
  const f=useCurrentFrame();
  const s=SCENE_DATA[index];
  // Gate D (ticket A8/A-C8): frame 0 must be fully visible — no opacity fade-in.
  // Entrance is translateY only, derived from useCurrentFrame (deterministic).
  const rise=interpolate(f,[0,20],[24,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  // Gate D GD-D01: deterministic art entrance (translateY keeps frame-0 art visible) + subtle micro-motion.
  const artRise=interpolate(f,[0,22],[36,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const breathe=1+Math.sin(f/24)*0.008;
  return <AbsoluteFill style={{background:'#000000',color:WHITE,fontFamily:'Arial, sans-serif'}}>
    <div style={{position:'absolute',top:265,left:90,right:90,textAlign:'center',fontSize:79,fontWeight:850,letterSpacing:-2,lineHeight:1.2,transform:`translateY(${rise}px)`}}>
      <div>{s.heading}</div>{s.sub&&<div style={{color:ACCENT}}>{s.sub}</div>}
    </div>
    <svg viewBox="0 0 1080 1920" style={{width:'100%',height:'100%',transform:`translateY(${artRise}px) scale(${breathe})`,transformOrigin:'540px 960px'}}>
      {(s.motif==='two')?<><Human x={365} y={950}/><Human x={735} y={950} accent/></>:
      (s.motif==='fork')?<><Human x={530} y={830}/><path d="M540 1230L280 1490M540 1230L685 1375" stroke={SECONDARY} strokeWidth={9} fill="none"/><Calendar x={725} y={1265} opacity={0.7}/></>:
      <Human x={420} y={965} accent={index===6}/>}
      {(s.motif==='calendar'||s.motif==='release')&&<Calendar x={680} y={1010} opacity={s.motif==='release'?0.48:1}/>}
      {s.motif==='memory'&&<><rect x={700} y={1030} width={250} height={200} stroke={ACCENT} strokeWidth={8} fill="none"/><path d="M740 1190 L800 1120 L860 1170 L916 1100" fill="none" stroke={SECONDARY} strokeWidth={7}/></>}
      {s.motif==='blank'&&<rect x={700} y={1030} width={240} height={230} stroke={SECONDARY} strokeDasharray="16 18" strokeWidth={8} fill="none"/>}
    </svg>
    <div style={{position:'absolute',bottom:340,left:110,right:110,height:2,background:'#252525'}}/>
    <div style={{position:'absolute',bottom:268,textAlign:'center',width:'100%',fontSize:30,color:SECONDARY}}>BẠN ĐANG TIẾC ĐIỀU GÌ?</div>
  </AbsoluteFill>;
};
