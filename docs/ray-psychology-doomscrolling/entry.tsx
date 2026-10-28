import React from 'react';
import {AbsoluteFill, Audio, Composition, interpolate, registerRoot, staticFile, useCurrentFrame, spring, useVideoConfig, Easing} from 'remotion';
import data from './timing.json';

const W=1080,H=1920,FPS=30;
const BG='#080A17',OFF='#F6F6FC',MUTED='#B8C5DB',VIOLET='#B6A3FF',CORAL='#FF7D8F',TEAL='#91F0DC';
const clamp=(a:number)=>Math.min(1,Math.max(0,a));
const ease=(a:number)=>{const t=clamp(a);return t*t*(3-2*t)};
const titleList=['AI GIỮ NGÓN TAY BẠN?','CHỈ MỘT TIN NỮA...','SỢ BỎ LỠ ĐIỀU GÌ?','VÒNG LẶP TIN TIÊU CỰC','KHOA HỌC NÓI GÌ?','THỬ ĐẶT GIỚI HẠN','LẤY LẠI BUỔI TỐI','GIỮ LẤY SỰ CHÚ Ý'];
const tags=['THỬ THÁCH 03 GIÂY','TIN TIÊU CỰC','PHẢN ỨNG THƯỜNG GẶP','DOOMSCROLLING','KHÔNG ĐỒNG NGHĨA NHÂN QUẢ','MỘT CÁCH THỬ','BẠN LÀ NGƯỜI CHỌN','RAY · TÂM LÝ SỐ'];

const Line:React.FC<{x1:number;y1:number;x2:number;y2:number;color?:string;w?:number;opacity?:number}>=({x1,y1,x2,y2,color=OFF,w=16,opacity=1})=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" opacity={opacity}/>;
const Stick:React.FC<{x:number;y:number;f:number;kind?:'scroll'|'tired'|'resist'|'walk'|'happy'|'point';scale?:number}>=({x,y,f,kind='scroll',scale=1})=>{
 const t=f*.13,breath=Math.sin(t*.25)*4;
 const reach=kind==='resist'?Math.sin(t*.6)*26:kind==='scroll'?Math.sin(t)*19:kind==='point'?38:0;
 const slump=kind==='tired'?34:kind==='resist'?20:0;
 const stride=kind==='walk'?Math.sin(t)*52:0;
 const rise=kind==='happy'?Math.abs(Math.sin(t*.4))*11:0;
 const hy=-156+breath+slump-rise;
 const shoulder=-75+slump;
 const leftA=kind==='happy'?[-114,-154]:kind==='resist'?[-136,0]:[-120,20];
 const rightA=kind==='happy'?[118,-158]:kind==='resist'?[156,-42+reach]:kind==='point'?[153,-116]:[153,-35+reach];
 const legs=kind==='walk'?[-58-stride,241,72+stride,240]:[-55,236,62,236];
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
 <ellipse cx="4" cy="260" rx="119" ry="18" fill="#121C39" opacity=".85"/>
 <Line x1={0} y1={shoulder+25} x2={-5} y2={126} w={18}/>
 <Line x1={-5} y1={126} x2={-31} y2={186} w={17}/><Line x1={-31} y1={186} x2={legs[0]} y2={legs[1]} w={17}/>
 <Line x1={-5} y1={126} x2={38} y2={183} w={17}/><Line x1={38} y1={183} x2={legs[2]} y2={legs[3]} w={17}/>
 <Line x1={0} y1={shoulder} x2={-67} y2={-5} w={16}/><Line x1={-67} y1={-5} x2={leftA[0]} y2={leftA[1]} w={16}/>
 <Line x1={0} y1={shoulder} x2={79} y2={-11} w={16}/><Line x1={79} y1={-11} x2={rightA[0]} y2={rightA[1]} w={16}/>
 <circle cx="0" cy={hy} r="62" stroke={OFF} strokeWidth="15" fill={BG}/>
 <g opacity={kind==='happy'?1:.9}>
 <circle cx="-19" cy={hy-6} r="5.3" fill={OFF}/><circle cx="19" cy={hy-6} r="5.3" fill={OFF}/>
 {kind==='happy'?<path d={`M-21 ${hy+20}Q0 ${hy+37} 23 ${hy+20}`} stroke={TEAL} strokeWidth="6" fill="none" strokeLinecap="round"/>:kind==='tired'?<path d={`M-17 ${hy+30}Q0 ${hy+15} 20 ${hy+27}`} stroke={CORAL} strokeWidth="5" fill="none" strokeLinecap="round"/>:<path d={`M-15 ${hy+23}L15 ${hy+23}`} stroke={OFF} strokeWidth="5" strokeLinecap="round"/>}
 </g>
 </g>
};
const NewsCard:React.FC<{x:number;y:number;f:number;delay?:number;label:string;accent?:string;width?:number}>=({x,y,f,delay=0,label,accent=CORAL,width=310})=>{
 const e=ease((f-delay)/14);const sy=y+52*(1-e)+6*Math.sin(f*.05+delay);
 return <g opacity={e} transform={`translate(${x} ${sy})`}>
 <rect width={width} height="108" rx="24" fill="#1A1E36" stroke={accent} strokeOpacity=".65" strokeWidth="3"/>
 <circle cx="37" cy="36" r="15" fill={accent}/><path d="M37 27 V39 M37 45v1" stroke={BG} strokeWidth="5" strokeLinecap="round"/>
 <text x="65" y="45" fill={OFF} fontSize="29" fontWeight="bold">{label}</text>
 <rect x="24" y="65" width={width-82} height="8" rx="4" fill="#454963"/><rect x="24" y="82" width={width-137} height="7" rx="4" fill="#343D55"/>
 </g>
};
const Phone:React.FC<{x:number;y:number;f:number;scale?:number;off?:boolean;rot?:number}>=({x,y,f,scale=1,off=false,rot=0})=>{
 const scroll=off?0:((f*2.3)%92);
 return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
 <rect width="266" height="457" rx="42" fill="#1B243C" stroke={off?TEAL:VIOLET} strokeWidth="12"/>
 <rect x="18" y="24" width="230" height="399" rx="28" fill={off?'#10182A':'#101328'}/>
 <rect x="91" y="14" width="85" height="12" rx="6" fill="#53617A"/>
 {!off?<g>
  <text x="38" y="72" fill={MUTED} fontSize="24">TIN HÔM NAY</text>
  {[0,1,2].map((i)=><g key={i} transform={`translate(33 ${103+i*98-scroll})`}>
   <rect width="201" height="87" rx="14" fill={i===0?'#38273B':'#222A40'}/>
   <rect width="174" height="12" x="13" y="13" rx="5" fill={i===0?CORAL:VIOLET}/>
   <rect width="144" height="8" x="13" y="38" rx="3" fill="#A2AAC0"/><rect width="105" height="8" x="13" y="59" rx="3" fill="#707A97"/>
  </g>)}
 </g>:<g><circle cx="133" cy="210" r="67" fill="#133A3B" stroke={TEAL} strokeWidth="5"/><path d="M110 211l17 17 34-41" stroke={TEAL} strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round"/><text x="133" y="325" textAnchor="middle" fill={TEAL} fontSize="22">NGHỈ MỘT CHÚT</text></g>}
 <rect x="108" y="434" width="51" height="7" rx="3" fill="#6B7493"/>
 </g>
};
const Symbol:React.FC<{scene:number;f:number}>=({scene,f})=>{
 const phase=Math.max(0,f);const pulse=1+0.035*Math.sin(phase*.18);const float=Math.sin(phase*.08)*8;
 if(scene===0)return <g>
  <Stick x={353} y={992} f={phase} kind="resist" scale={1.18}/>
  <Phone x={659} y={575+float} f={phase} scale={1.05} rot={-10+Math.sin(phase*.09)*6}/>
  <NewsCard x={588} y={1085} f={phase} delay={8} label="TIN NÓNG" width={318}/>
  <path d="M500 920 Q600 890 642 825" fill="none" stroke={CORAL} strokeWidth="5" strokeDasharray="10 18" opacity={.6}/>
 </g>;
 if(scene===1)return <g>
  <Stick x={278} y={1060} f={phase} kind="scroll" scale={1.07}/>
  <Phone x={613} y={580} f={phase} scale={1.06}/>
  <NewsCard x={63} y={670} f={phase} delay={6} label="TIN CẢNH BÁO" width={300}/>
  <NewsCard x={613} y={1111} f={phase} delay={36} label="TIN TIẾP THEO" width={359}/>
 </g>;
 if(scene===2)return <g>
  <Stick x={406} y={1036} f={phase} kind="tired" scale={1.16}/>
  <Phone x={660} y={641} f={phase} scale={.83} rot={13}/>
  <g transform={`translate(220 595) scale(${pulse})`}>
   <circle r="104" fill="#2A2037" stroke={CORAL} strokeWidth="7"/>
   <text x="0" y="17" textAnchor="middle" fill={CORAL} fontSize="82">?</text>
  </g>
  <text x="530" y="1167" fill={MUTED} fontSize="30" textAnchor="middle">“LỠ CÓ TIN QUAN TRỌNG THÌ SAO?”</text>
 </g>;
 if(scene===3)return <g>
  <Stick x={476} y={1003} f={phase} kind="scroll" scale={1.0}/>
  {[0,1,2].map((n)=><g key={n} opacity={.3+n*.2} transform={`rotate(${phase*(.19+n*.13)+n*75} 500 850)`}><ellipse cx="500" cy="850" rx={214+n*64} ry={214+n*44} fill="none" stroke={n===1?VIOLET:CORAL} strokeWidth="7" strokeDasharray="13 27"/></g>)}
  <Phone x={768} y={680} f={phase} scale={.64} rot={-8}/>
  <text x="488" y="1202" textAnchor="middle" fontSize="39" fill={CORAL} fontWeight="bold">THẤY MỆT VẪN LƯỚT</text>
 </g>;
 if(scene===4)return <g>
  <Stick x={315} y={1063} f={phase} kind="tired" scale={1.1}/>
  <g transform="translate(630 633)"><path d="M60 11 A126 126 0 1 0 165 229 A141 141 0 0 1 60 11Z" fill="#B8A5FF"/><circle cx="266" cy="54" r="10" fill={VIOLET}/><circle cx="225" cy="-23" r="7" fill={VIOLET}/></g>
  <g transform="translate(610 1097)"><rect width="350" height="85" rx="28" fill="#22243D" stroke={VIOLET} strokeWidth="3"/><text x="175" y="53" textAnchor="middle" fill={OFF} fontWeight="bold" fontSize="31">CÓ MỐI LIÊN HỆ</text></g>
 </g>;
 if(scene===5)return <g>
  <Stick x={331} y={1069} f={phase} kind="point" scale={1.05}/>
  <Phone x={690} y={599} f={phase} scale={.87} off={phase>85} rot={-5+7*ease((phase-75)/26)}/>
  <g transform={`translate(425 687) scale(${1+ease((phase-15)/18)*.06})`}>
   <circle r="116" fill="#19353A" stroke={TEAL} strokeWidth="8"/>
   <text x="0" y="17" textAnchor="middle" fill={TEAL} fontWeight="bold" fontSize="58">05:00</text>
  </g>
  <path d="M380 1191 Q498 1137 633 1153" stroke={TEAL} strokeWidth="7" fill="none" strokeDasharray="16 18"/>
 </g>;
 if(scene===6)return <g>
  <Phone x={170} y={850} f={phase} off scale={.78} rot={-9}/>
  <Stick x={655+95*ease((phase-28)/62)} y={993} f={phase} kind="walk" scale={1.06}/>
  <circle cx="760" cy="595" r="95" fill="#183739" stroke={TEAL} strokeWidth="4"/>
  <path d="M745 553 Q699 595 737 638 Q766 670 813 632 Q778 626 766 601 Q755 580 745 553" fill={TEAL}/>
  <text x="540" y="1205" textAnchor="middle" fill={TEAL} fontSize="34">BẠN CÓ QUYỀN DỪNG LẠI</text>
 </g>;
 return <g>
  <Stick x={521} y={830} f={phase} kind="happy" scale={1.1}/>
  <g transform={`translate(266 1168) scale(${pulse})`}>
   <rect width="548" height="111" rx="56" fill="#283441" stroke={TEAL} strokeWidth="5"/>
   <text x="274" y="71" textAnchor="middle" fill={OFF} fontWeight="bold" fontSize="47">♡ THẢ TIM  +  ĐĂNG KÝ</text>
  </g>
 </g>;
};
const Video:React.FC=()=>{
 const f=useCurrentFrame();const t=f/FPS;
 let idx=0;while(idx<data.edges.length-2&&t>=data.edges[idx+1])idx++;
 const st=data.edges[idx],localFrame=Math.max(0,(t-st)*FPS);
 const cue=((data.cues as any[]).find(x=>t>=x.start&&t<x.end)||(data.cues as any[]).slice(-1)[0]);
 const fade=ease((t-cue.start)/.11)*ease((cue.end-t)/.12);
 const headFade=ease(localFrame/12);
 const progress=Math.max(0,Math.min(100,t/data.duration*100));
 const ringPulse=1+.012*Math.sin(f*.045);
 return <AbsoluteFill style={{width:W,height:H,background:BG,color:OFF,fontFamily:'BeVietnamPro,sans-serif',overflow:'hidden'}}>
  <style>{`@font-face{font-family:BeVietnamPro;src:url('${staticFile('BeVietnamPro-ExtraBold.ttf')}');font-weight:800;font-display:block}`}</style>
  <Audio src={staticFile('doom-voice.wav')}/>
  <Audio src={staticFile('doom-music.wav')} volume={0.62}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 55% 38%,#1E1B38 0%,#090B17 56%,#070911 100%)'}}/>
  <svg width={W} height={H} viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
   <defs><radialGradient id="glow"><stop stopColor="#B6A3FF" stopOpacity=".17"/><stop offset="1" stopColor="#B6A3FF" stopOpacity="0"/></radialGradient></defs>
   <g transform={`translate(540 840) scale(${ringPulse})`}><circle r="450" fill="url(#glow)"/></g>
   <g opacity=".14">{Array.from({length:8}).map((_,i)=><path key={i} d={`M ${75+i*130} 250 V 1350`} stroke={VIOLET} strokeWidth="1"/>)}</g>
   <Symbol scene={idx} f={localFrame}/>
  </svg>
  <div style={{position:'absolute',top:79,left:86,right:86,display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:27,letterSpacing:2.5,color:VIOLET,fontWeight:800}}><span>RAY <span style={{color:TEAL}}>·</span> TÂM LÝ SỐ</span><span style={{color:MUTED}}>TẬP 02</span></div>
  <div style={{position:'absolute',top:206,left:77,right:77,textAlign:'center',opacity:headFade,transform:`translateY(${25*(1-headFade)}px)`}}>
   <div style={{fontSize:26,color:CORAL,letterSpacing:2.2,marginBottom:20,fontWeight:800}}>{tags[idx]}</div>
   <div style={{fontSize:idx===4?54:61,lineHeight:1.22,fontWeight:800,letterSpacing:-1.3,textShadow:'0 4px 28px #040612'}}>{titleList[idx]}</div>
  </div>
  <div style={{position:'absolute',top:1355,left:67,right:67,minHeight:212,borderRadius:36,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',opacity:fade,transform:`translateY(${10*(1-fade)}px)`,background:'linear-gradient(180deg,rgba(23,30,55,.85),rgba(17,21,38,.95))',border:'2px solid rgba(182,163,255,.16)',boxShadow:'0 16px 44px #080A17'}}>
   <div style={{fontSize:49,fontWeight:800,lineHeight:1.33,whiteSpace:'normal',maxWidth:870,padding:'14px 16px',overflowWrap:'break-word'}}>{cue.text}</div>
  </div>
  <div style={{position:'absolute',top:1640,left:92,right:92,fontSize:25,color:MUTED,letterSpacing:1.4,textAlign:'center'}}>THẤU HIỂU BẢN THÂN · KHÔNG PHÁN XÉT</div>
  <div style={{position:'absolute',bottom:129,left:96,right:96,height:6,background:'#35394E',borderRadius:20,overflow:'hidden'}}><div style={{width:`${progress}%`,height:'100%',background:`linear-gradient(90deg,${VIOLET},${TEAL})`}}/></div>
 </AbsoluteFill>;
};
const Root:React.FC=()=> <Composition id="RayDoomscrollingExplained" component={Video} fps={FPS} width={W} height={H} durationInFrames={data.totalFrames}/>;
registerRoot(Root);
