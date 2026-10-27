import React from 'react';
import {AbsoluteFill, Composition, Audio, interpolate, spring, useCurrentFrame, useVideoConfig, staticFile, registerRoot, Easing} from 'remotion';
import timing from '../timing.json';
import captionTimings from './caption-timing-V2.json';

const FPS=30;
const W=1080,H=1920;
const WHITE='#F7F8FA',GOLD='#FFCA79',CYAN='#8AE2E0',BG='#070A12',MUTED='#8993A7';
const SCRIPT=[
'Bạn thường nói "được thôi", dù trong lòng muốn từ chối? Đây là sáu dấu hiệu bạn đang cố làm hài lòng tất cả mọi người.',
'Một: Bạn nhận lời giúp đỡ, ngay cả khi đã kiệt sức.',
'Hai: Bạn xin lỗi, dù mình chẳng làm điều gì sai.',
'Ba: Bạn sợ người khác thất vọng, nên không dám nói thật.',
'Bốn: Bạn đổi ý kiến, chỉ để tránh một cuộc tranh cãi.',
'Năm: Bạn hỏi ai cũng ổn không, nhưng quên hỏi chính mình.',
'Sáu: Khi từ chối một lần, bạn day dứt cả ngày.',
'Nhớ nhé, tử tế không đồng nghĩa phải đánh mất bản thân. Bạn có thể nói: "Mình muốn giúp, nhưng hôm nay mình không thể."',
'Nếu thấy hữu ích, hãy thả tim và đăng ký kênh nhé!'];
const PIECES=[
['Bạn thường nói "được thôi",','dù trong lòng muốn từ chối?','Đây là sáu dấu hiệu','bạn đang cố làm hài lòng tất cả mọi người.'],
['Một: Bạn nhận lời giúp đỡ,','ngay cả khi đã kiệt sức.'],
['Hai: Bạn xin lỗi,','dù mình chẳng làm điều gì sai.'],
['Ba: Bạn sợ người khác thất vọng,','nên không dám nói thật.'],
['Bốn: Bạn đổi ý kiến,','chỉ để tránh một cuộc tranh cãi.'],
['Năm: Bạn hỏi ai cũng ổn không,','nhưng quên hỏi chính mình.'],
['Sáu: Khi từ chối một lần,','bạn day dứt cả ngày.'],
['Nhớ nhé, tử tế không đồng nghĩa','phải đánh mất bản thân.','Bạn có thể nói:','"Mình muốn giúp, nhưng hôm nay mình không thể."'],
['Nếu thấy hữu ích,','hãy thả tim và đăng ký kênh nhé!']];
const TITLES=[['ĐƯỢC THÔI...','DÙ BẠN KHÔNG MUỐN?'],['01','LUÔN NHẬN LỜI'],['02','XIN LỖI LIÊN TỤC'],['03','SỢ LÀM AI BUỒN'],['04','GIẤU Ý KIẾN THẬT'],['05','QUÊN CHÍNH MÌNH'],['06','CẢM GIÁC TỘI LỖI'],['THỬ ĐẶT MỘT','RANH GIỚI NHỎ'],['BẠN XỨNG ĐÁNG','ĐƯỢC LẮNG NGHE']];
const norm=(x:number)=>Math.min(1,Math.max(0,x));
const ease=(x:number)=>{const t=norm(x);return t*t*(3-2*t)};
const bubble=(text:string,x:number,y:number,w:number,delay:number,frame:number,accent=WHITE)=>{
 const op=ease((frame-delay)/13);const float=Math.sin((frame-delay)*.055)*5;
 return <g opacity={op} transform={`translate(${x} ${y+float+25*(1-op)})`}>
 <rect x={-w/2} y={-41} width={w} height={86} rx={27} fill="#15202C" stroke={accent} strokeOpacity={.53} strokeWidth={3}/>
 <text x="0" y="10" textAnchor="middle" fontSize="29" fontWeight="800" fill={accent} letterSpacing=".5">{text}</text>
 </g>;
};
type ActorProps={x:number;y:number;scale?:number;frame:number;pose?:'yes'|'tired'|'sorry'|'afraid'|'turn'|'self'|'guilt'|'confident'|'cheer'|'friend';color?:string;delay?:number};
const Actor:React.FC<ActorProps>=({x,y,scale=1,frame,pose='yes',color=WHITE,delay=0})=>{
 const ent=ease((frame-delay)/17);const t=Math.max(0,frame-delay);
 const breathing=Math.sin(t*.07)*2;const tremble=pose==='afraid'||pose==='guilt'?Math.sin(t*.65)*4:0;
 const bob=pose==='cheer'?-Math.abs(Math.sin(t*.15))*16:0;
 const headY=-147+breathing+((pose==='sorry'||pose==='guilt')?4*Math.sin(t*.082):0);
 let leftEl=[-69,-20],rightEl=[69,-20],leftHand=[-85,35],rightHand=[85,35];
 let leftK=[-24,145],rightK=[25,145],leftFoot=[-40,220],rightFoot=[42,220];
 let bodyLean=0;
 const armWave=Math.sin(t*.15), nod=Math.sin(t*.105);
 switch(pose){
 case 'yes':leftEl=[-89,-35];leftHand=[-125,-64];rightEl=[81,-19];rightHand=[117,-85+armWave*17];break;
 case 'tired':bodyLean=15+nod*4;leftHand=[-108,63+armWave*8];rightHand=[103,74+armWave*7];leftEl=[-89,13];rightEl=[89,16];break;
 case 'sorry':bodyLean=19+nod*3;leftEl=[-48,-5];leftHand=[-4,25+armWave*10];rightEl=[58,0];rightHand=[8,28+armWave*11];break;
 case 'afraid':leftEl=[-57,-61];leftHand=[-17,-81+armWave*5];rightEl=[60,-49];rightHand=[17,-86-armWave*5];break;
 case 'turn':{const switchP=ease((t-16)/20);leftHand=[-130+switchP*60,-26+switchP*65];rightHand=[130-switchP*60,-26+switchP*65];bodyLean=-7+switchP*17;break;}
 case 'self':leftEl=[-53,20];leftHand=[-15,52];rightEl=[58,20];rightHand=[16,54-16*ease((t-15)/23)];break;
 case 'guilt':bodyLean=17+4*nod;leftEl=[-50,-14];leftHand=[-12,1+8*armWave];rightEl=[53,-9];rightHand=[15,4+7*armWave];break;
 case 'confident':{const up=ease((t-19)/28);leftEl=[-87,-37-up*9];leftHand=[-115,-63-up*30];rightEl=[79,-36];rightHand=[116,-71-45*up];break;}
 case 'cheer':leftEl=[-71,-45];leftHand=[-104,-118];rightEl=[68,-47];rightHand=[110,-125];break;
 case 'friend':leftEl=[-72,-4];leftHand=[-100,50];rightEl=[71,-3];rightHand=[91,40];break;
 }
 const ln=(a:number[],b:number[],stroke=color,width=12)=> <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={stroke} strokeWidth={width} strokeLinecap="round" />;
 const smile=pose==='confident'||pose==='yes'||pose==='cheer'||pose==='friend';
 return <g opacity={ent} transform={`translate(${x+tremble} ${y+bob+(1-ent)*28}) scale(${scale}) rotate(${bodyLean},0,20)`}>
 <ellipse cx="0" cy="243" rx="92" ry="12" fill="#FFFFFF" opacity=".06" />
 {ln([0,85],leftK)}{ln(leftK,leftFoot)}{ln([0,85],rightK)}{ln(rightK,rightFoot)}
 {ln([0,-64],[0,85],color,15)}
 {ln([-10,-52],leftEl)}{ln(leftEl,leftHand)}{ln([10,-52],rightEl)}{ln(rightEl,rightHand)}
 <circle cx="0" cy={headY} r="62" fill={BG} stroke={color} strokeWidth="13"/>
 <path d={`M -20 ${headY-10} l 7 0 M 13 ${headY-10} l 7 0`} stroke={color} strokeWidth="7" strokeLinecap="round"/>
 {smile?<path d={`M -19 ${headY+22} Q 0 ${headY+42} 19 ${headY+22}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"/>:
 <path d={`M -15 ${headY+26} Q 0 ${headY+9} 15 ${headY+26}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"/>}
 {(pose==='tired'||pose==='guilt')&&<path d={`M 39 ${headY+19} q -6 20 0 31 q 10 -9 0 -31`} fill={CYAN} opacity=".92"/>}
 </g>;
};
const SoftIcon:React.FC<{kind:'heart'|'check'|'cross'|'clock';x:number;y:number;size?:number;color?:string;frame:number;delay?:number}>=({kind,x,y,size=60,color=GOLD,frame,delay=0})=>{
 const p=ease((frame-delay)/14);const beat=1+Math.sin(frame*.16)*.04;
 return <g opacity={p} transform={`translate(${x} ${y}) scale(${p*beat*size/100})`}>
 {kind==='heart'&&<path d="M0 72 C-40 40 -100 0 -70 -45 C-45 -84 -2 -54 0 -29 C3 -53 44 -84 71 -45 C100 0 39 39 0 72Z" fill={color}/>}
 {kind==='check'&&<path d="M-56 2 L-16 41 L60 -47" stroke={color} strokeWidth="17" fill="none" strokeLinecap="round" strokeLinejoin="round"/>}
 {kind==='cross'&&<path d="M-55 -55 L55 55 M55 -55 L-55 55" stroke={color} strokeWidth="14" strokeLinecap="round"/>}
 {kind==='clock'&&<><circle cx="0" cy="0" r="70" fill="none" stroke={color} strokeWidth="10"/><path d="M0 -44 V0 L34 23" stroke={color} strokeWidth="10" fill="none" strokeLinecap="round"/></>}
 </g>;
};
const Graphic:React.FC<{scene:number;frame:number;elapsed:number}>=({scene,frame,elapsed})=>{
 const phase=frame;const pulse=Math.sin(phase*.075);
 const ring=<circle cx="450" cy="364" r={270+20*Math.sin(phase*.025)} fill="none" stroke="#273645" strokeWidth="2" strokeDasharray="9 16" />;
 return <svg viewBox="0 0 900 740" width="960" height="780" style={{overflow:'visible'}}>
 <defs><radialGradient id="spot"><stop stopColor="#1B2635" stopOpacity=".72"/><stop offset="1" stopColor="#070A12" stopOpacity="0"/></radialGradient>
 <filter id="halo"><feGaussianBlur stdDeviation="8"/></filter></defs>
 <circle cx="450" cy="350" r="345" fill="url(#spot)"/>{ring}
 {scene===0&&<>{bubble('ĐƯỢC THÔI!',270,130,340,6,phase,GOLD)}{bubble('NHƯNG...',654,180,235,29,phase,CYAN)}<Actor x={445} y={360} scale={1.30} frame={phase} pose="tired"/><SoftIcon kind="heart" x={683} y={470} size={85} color={GOLD} frame={phase} delay={31}/></>}
 {scene===1&&<>{bubble('GIÚP MÌNH?',192,177,280,0,phase,GOLD)}{bubble('GẤP LẮM!',708,186,285,10,phase,CYAN)}{bubble('NHỜ BẠN!',650,590,275,23,phase,WHITE)}<Actor x={425} y={366} scale={1.30} frame={phase} pose="tired"/><SoftIcon kind="check" x={204} y={516} size={69} frame={phase} delay={18}/></>}
 {scene===2&&<>{bubble('XIN LỖI...',492,123,300,0,phase,GOLD)}<Actor x={350} y={390} scale={1.36} frame={phase} pose="sorry"/><Actor x={700} y={437} scale={.76} frame={phase} pose="friend" color="#8796A8"/><SoftIcon kind="heart" x={680} y={180} size={46} color="#AA7184" frame={phase} delay={18}/></>}
 {scene===3&&<>{bubble('HỌ SẼ GIẬN?',310,110,335,0,phase,GOLD)}{bubble('MÌNH NÓI THẬT?',650,208,365,14,phase,CYAN)}<Actor x={453} y={395} scale={1.25} frame={phase} pose="afraid"/><SoftIcon kind="clock" x={738} y={532} size={56} color={MUTED} frame={phase} delay={23}/></>}
 {scene===4&&<>{bubble('Ý TÔI: A',211,175,280,0,phase,WHITE)}{bubble('À... B CŨNG ĐÚNG!',670,200,360,12,phase,GOLD)}<Actor x={456} y={395} scale={1.26} frame={phase} pose="turn"/><path d="M 260 550 Q 455 675 650 550" fill="none" stroke={CYAN} strokeOpacity=".75" strokeWidth="10" strokeDasharray="18 17"/><path d="M 637 541 L 662 550 L 636 572" fill="none" stroke={CYAN} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/></>}
 {scene===5&&<>{bubble('BẠN ỔN KHÔNG?',290,140,385,0,phase,GOLD)}<Actor x={284} y={383} scale={1.15} frame={phase} pose="self"/><Actor x={655} y={400} scale={.92} frame={phase} pose="friend"/><SoftIcon kind="check" x={697} y={169} size={70} color={CYAN} frame={phase} delay={8}/><SoftIcon kind="heart" x={293} y={571} size={45} color="#AF5A67" frame={phase} delay={16}/></>}
 {scene===6&&<>{bubble('KHÔNG...',446,130,375,0,phase,GOLD)}<Actor x={442} y={386} scale={1.34} frame={phase} pose="guilt"/><SoftIcon kind="clock" x={701} y={500} size={92} color={CYAN} frame={phase} delay={15}/><SoftIcon kind="cross" x={196} y={518} size={44} color="#A87A88" frame={phase} delay={13}/></>}
 {scene===7&&<>
 <circle cx="460" cy="370" r={245+15*ease((phase-42)/29)} stroke={CYAN} strokeWidth={11} fill="none" opacity={.10+.77*ease((phase-32)/27)}/>
 <Actor x={445} y={398} scale={1.29} frame={phase} pose={phase<60?'tired':'confident'}/>
 {bubble('MÌNH KHÔNG THỂ HÔM NAY.',459,65,650,129,phase,GOLD)}
 <SoftIcon kind="check" x={681} y={550} size={87} color={CYAN} frame={phase} delay={85}/></>}
 {scene===8&&<>
 <Actor x={460} y={245} scale={1.26} frame={phase} pose="cheer"/>
 <SoftIcon kind="heart" x={193} y={296} size={112} color="#FA7289" frame={phase} delay={0}/>
 <SoftIcon kind="heart" x={730} y={235} size={63} color={GOLD} frame={phase} delay={10}/>
 <g opacity={ease((phase-8)/12)} transform={`translate(452 656) scale(${.92+.05*Math.sin(phase*.12)})`}>
 <rect x="-311" y="-50" width="622" height="103" rx="34" fill="#FFCA79" />
 <text x="0" y="18" textAnchor="middle" fontWeight="800" fontSize="43" fill="#0A1019">♥ THẢ TIM  ·  ĐĂNG KÝ</text></g></>}
 <ActionPropsV2 scene={scene} phase={phase}/>
 </svg>;
};
type ActionProps={scene:number;phase:number};
const ActionPropsV2:React.FC<ActionProps>=({scene,phase})=>{
 const e=(a:number,b:number)=>ease((phase-a)/Math.max(.01,b));
 
 // Every element lives in the illustration canvas, deliberately above bottom subtitle zone.
 if(scene===0)return <g>
   <g opacity={e(11,21)} transform={`translate(${680-55*e(15,29)} ${415+40*e(15,29)}) rotate(${-12*e(15,29)})`}>
    <rect width="168" height="69" rx="19" fill="#243447" stroke={CYAN} strokeWidth="3"/>
    <text x="84" y="45" textAnchor="middle" fontSize="29" fill={CYAN} fontWeight="bold">KHÔNG...</text>
   </g>
   <path d={`M675 495 Q ${660+14*Math.sin(phase*.06)} 506 642 547`} stroke={CYAN} strokeWidth="4" strokeDasharray="9 10" opacity={.3+e(18,25)*.4} fill="none"/>
 </g>;
 if(scene===1)return <g>
  {['VIỆC GẤP','LÀM HỘ','THÊM VIỆC'].map((label,i)=>{
   const p=e(i*16+8,17),side=i%2===0?-1:1;
   const x=(i===0?110:i===1?654:172)+side*31*p;
   const y=(i===0?398:i===1?406:526)-120*(1-p)+5*Math.sin(phase*.07+i);
   return <g key={i} opacity={p} transform={`translate(${x} ${y}) rotate(${side*(4+6*p)})`}>
    <rect width="190" height="81" rx="17" fill="#15273A" stroke={i===1?CYAN:GOLD} strokeOpacity=".8" strokeWidth="3"/>
    <text x="95" y="49" textAnchor="middle" fontSize="26" fontWeight="800" fill={i===1?CYAN:GOLD}>{label}</text>
   </g>;
  })}
 </g>;
 if(scene===2)return <g>
  {['XIN LỖI','XIN LỖI'].map((v,i)=><g key={i} opacity={e(17+i*19,12)*(1-e(56+i*12,12))} transform={`translate(${i?616:130} ${i?513:543-18*e(17,30)})`}>
   <rect x="-95" y="-35" width="190" height="69" rx="21" fill="#202B36" stroke={GOLD} strokeWidth="3"/>
   <text x="0" y="9" textAnchor="middle" fontSize="28" fill={GOLD} fontWeight="800">{v}</text>
  </g>)}
 </g>;
 if(scene===3)return <g opacity={e(19,19)}>
  <circle cx={727} cy={405} r={79+3*Math.sin(phase*.09)} fill="#331A29" stroke="#D06E81" strokeWidth="4"/>
  <path d="M693 392 L714 384 M738 384 L758 392 M701 443 Q728 410 752 443" fill="none" stroke="#F6A6B1" strokeWidth="8" strokeLinecap="round"/>
  <path d="M670 491 Q603 513 585 478" fill="none" stroke="#D06E81" strokeWidth="4" strokeDasharray="7 10"/>
 </g>;
 if(scene===4)return <g>
   <g opacity={e(0,12)*(1-e(58,16))} transform={`translate(${145+e(29,23)*45} 528)`}>
    <rect width="175" height="85" rx="15" fill="#142A34" stroke={CYAN} strokeWidth="4"/><text x="88" y="54" textAnchor="middle" fontSize="37" fontWeight="800" fill={CYAN}>Ý A</text>
   </g>
   <g opacity={e(32,19)} transform={`translate(${635-e(32,25)*65} 526) rotate(${-9+e(32,25)*9})`}>
    <rect width="175" height="85" rx="15" fill="#30271F" stroke={GOLD} strokeWidth="4"/><text x="88" y="54" textAnchor="middle" fontSize="37" fontWeight="800" fill={GOLD}>Ý B</text>
   </g>
 </g>;
 if(scene===5)return <g opacity={e(15,17)}>
   <circle cx="293" cy="469" r={90+7*Math.sin(phase*.07)} fill="none" stroke="#E99FA4" strokeWidth="4" strokeDasharray="10 13"/>
   <text x="620" y="675" textAnchor="middle" fontSize="27" fontWeight="800" fill="#E6B4BF">CÒN MÌNH THÌ SAO?</text>
 </g>;
 if(scene===6)return <g>
   <path d="M718 470 A77 77 0 0 1 774 530" fill="none" stroke={CYAN} strokeWidth="5" strokeDasharray="8 12" opacity={e(12,19)}/>
   <text x="730" y="654" textAnchor="middle" fontSize="38" fontWeight="800" fill={GOLD} opacity={e(25,19)}>DAY DỨT</text>
 </g>;
 if(scene===7)return <g opacity={e(117,20)} transform={`translate(44 ${522-22*e(117,22)})`}>
   <rect width="220" height="80" rx="20" fill="#113D43" stroke={CYAN} strokeWidth="4"/>
   <text x="110" y="51" textAnchor="middle" fontSize="29" fill={CYAN} fontWeight="800">GIỚI HẠN</text>
 </g>;
 if(scene===8)return <g opacity={e(7,11)}>
   <circle cx="450" cy="380" r={250+5*Math.sin(phase*.07)} stroke={GOLD} strokeWidth="5" fill="none" opacity=".27"/>
   <path d={`M230 125 L235 ${135+14*Math.sin(phase*.07)} M670 125 L665 ${145+14*Math.sin(phase*.07)}`} stroke={CYAN} strokeWidth="5" strokeLinecap="round"/>
 </g>;
 return null;
};

const Story:React.FC=()=>{
 const frame=useCurrentFrame(),sec=frame/FPS;
 const detected=timing.edges.findIndex((e,i)=>i<timing.edges.length-1&&e<=sec&&sec<timing.edges[i+1]);
 const idx=detected<0?8:Math.max(0,Math.min(8,detected));
 const st=timing.edges[idx],en=timing.edges[idx+1];const local=sec-st,fr=local*FPS,dur=en-st;
 const fade=ease(local/.18)*ease((en-sec)/.16);const [baseNum,baseTitle]=TITLES[idx];
 const num=idx===0&&fr>=84?'06 DẤU HIỆU':baseNum;
 const title=idx===0&&fr>=84?'BẠN CÓ NHẬN RA?':baseTitle;
 const sectionLabel=idx===0?"MỞ ĐẦU":idx>=7?(idx===7?"GÓC NHÌN":"KẾT THÚC"):`${String(idx).padStart(2,"0")} / 06`;
 const active=captionTimings.cues.find(c=>c.start<=sec&&sec<c.end) ?? captionTimings.cues[captionTimings.cues.length-1];
 const captionText=active.text;
 const capFade=ease((sec-active.start)/.12)*ease((active.end-sec)/.11);
 const capProgress=norm((sec-active.start)/(active.end-active.start));
 const barPercent=Math.min(100,(sec/timing.voiceDuration)*100);
 return <AbsoluteFill style={{background:BG,fontFamily:'BV, Noto Sans, Arial, sans-serif',color:WHITE,overflow:'hidden'}}>
 <style>{`@font-face{font-family:BV;src:url('${staticFile('BeVietnamPro-ExtraBold.ttf')}') format('truetype');font-weight:800;font-style:normal;}`}</style>
 <AbsoluteFill style={{opacity:.10,backgroundImage:'linear-gradient(#A4D4E7 1px, transparent 1px),linear-gradient(90deg,#A4D4E7 1px,transparent 1px)',backgroundSize:'88px 88px',maskImage:'linear-gradient(transparent 10%,black 40%,black 80%,transparent 100%)'}}/>
 <div style={{position:'absolute',top:93,left:92,right:92,display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:23,letterSpacing:4,fontWeight:800,color:MUTED}}>
 <span>RAY · TÂM LÝ HÀNH VI</span><span style={{fontSize:20,color:CYAN,border:'2px solid #315560',borderRadius:23,padding:'10px 20px'}}>TẬP 01</span>
 </div>
 <div style={{position:'absolute',top:224,left:88,right:88,textAlign:'center',opacity:fade,transform:`translateY(${(1-ease(local/.38))*22}px)`}}>
 <div style={{fontSize:idx===0||idx===7||idx===8?65:55,fontWeight:800,color:idx===0?GOLD:CYAN,letterSpacing:2,marginBottom:25}}>{num}</div>
 <div style={{fontSize:idx===0?66:idx===7?67:72,fontWeight:800,lineHeight:1.18,letterSpacing:-1,whiteSpace:'normal'}}>{title}</div>
 </div>
 <div style={{position:'absolute',top:565,left:60,opacity:fade,transform:`translateY(${(1-ease(local/.22))*12}px)`}}><Graphic scene={idx} frame={fr} elapsed={local}/></div>
 <div style={{position:'absolute',top:1452,left:77,right:77,height:158,display:'flex',justifyContent:'center',alignItems:'center',opacity:Math.min(fade,capFade),transform:`translateY(${(1-ease(capProgress/.12))*12}px)`,textAlign:'center'}}>
 <div style={{fontSize:idx===7?46:idx===0?47:50,fontWeight:800,lineHeight:1.26,maxWidth:'920px',whiteSpace:'normal',overflowWrap:'break-word',textShadow:'2px 3px 0px #0B1220, 0px 5px 12px #060A11',WebkitTextStroke:'1px #101725'}}>{captionText}</div>
 </div>
 <div style={{position:'absolute',bottom:156,left:88,right:88,height:6,borderRadius:5,background:'#22313E',overflow:'hidden'}}><div style={{width:`${barPercent}%`,height:'100%',background:CYAN,borderRadius:5}}/></div>
 <div style={{position:'absolute',bottom:109,left:86,right:86,display:'flex',justifyContent:'space-between',fontSize:20,letterSpacing:2,color:MUTED,fontWeight:800}}>
 <span>RAY · TÂM LÝ HÀNH VI</span><span>{sectionLabel}</span>
 </div>
 <Audio src={staticFile('psychology-voice-clean-48k.wav')}/>
 <Audio src={staticFile('psychology-music-48k.wav')} volume={.21}/>
 </AbsoluteFill>;
};
const Root:React.FC=()=> <Composition id="PsychologyPeoplePleasingV2" component={Story} fps={FPS} width={W} height={H} durationInFrames={timing.totalFrames}/>;
registerRoot(Root);
