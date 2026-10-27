from pathlib import Path
import re
root=Path(__file__).resolve().parent
old=(root.parent/'entry.tsx').read_text()
s=old
s=s.replace("import timing from './timing.json';", "import timing from './timing.json';\nimport captionTimings from './caption-timing-V2.json';")
s=s.replace("let bodyLean=0;", "let bodyLean=0;\n const armWave=Math.sin(t*.15), nod=Math.sin(t*.105);")
s=s.replace("case 'yes':leftEl=[-89,-35];leftHand=[-125,-64];rightEl=[81,-19];rightHand=[117,-85];break;", "case 'yes':leftEl=[-89,-35];leftHand=[-125,-64];rightEl=[81,-19];rightHand=[117,-85+armWave*17];break;")
s=s.replace("case 'tired':bodyLean=15;leftHand=[-108,63];rightHand=[103,74];leftEl=[-89,13];rightEl=[89,16];break;", "case 'tired':bodyLean=15+nod*4;leftHand=[-108,63+armWave*8];rightHand=[103,74+armWave*7];leftEl=[-89,13];rightEl=[89,16];break;")
s=s.replace("case 'sorry':bodyLean=19;leftEl=[-48,-5];leftHand=[-4,25];rightEl=[58,0];rightHand=[8,28];break;", "case 'sorry':bodyLean=19+nod*3;leftEl=[-48,-5];leftHand=[-4,25+armWave*10];rightEl=[58,0];rightHand=[8,28+armWave*11];break;")
s=s.replace("case 'afraid':leftEl=[-57,-61];leftHand=[-17,-81];rightEl=[60,-49];rightHand=[17,-86];break;", "case 'afraid':leftEl=[-57,-61];leftHand=[-17,-81+armWave*5];rightEl=[60,-49];rightHand=[17,-86-armWave*5];break;")
s=s.replace("case 'turn':leftHand=[-130,-26];rightHand=[130,-26];break;", "case 'turn':{const switchP=ease((t-16)/20);leftHand=[-130+switchP*60,-26+switchP*65];rightHand=[130-switchP*60,-26+switchP*65];bodyLean=-7+switchP*17;break;}")
s=s.replace("case 'self':leftEl=[-53,20];leftHand=[-15,52];rightEl=[58,20];rightHand=[16,54];break;", "case 'self':leftEl=[-53,20];leftHand=[-15,52];rightEl=[58,20];rightHand=[16,54-16*ease((t-15)/23)];break;")
s=s.replace("case 'guilt':bodyLean=17;leftEl=[-50,-14];leftHand=[-12,1];rightEl=[53,-9];rightHand=[15,4];break;", "case 'guilt':bodyLean=17+4*nod;leftEl=[-50,-14];leftHand=[-12,1+8*armWave];rightEl=[53,-9];rightHand=[15,4+7*armWave];break;")
s=s.replace("case 'confident':leftEl=[-87,-37];leftHand=[-115,-63];rightEl=[79,-36];rightHand=[116,-71];break;", "case 'confident':{const up=ease((t-19)/28);leftEl=[-87,-37-up*9];leftHand=[-115,-63-up*30];rightEl=[79,-36];rightHand=[116,-71-45*up];break;}")
# Head nod physical, not sound effect
s=s.replace("const headY=-147+breathing;", "const headY=-147+breathing+((pose==='sorry'||pose==='guilt')?4*Math.sin(t*.082):0);")
# CTA relocate actor up to ensure no overlap
s=s.replace("<Actor x={460} y={368} scale={1.30} frame={phase} pose=\"cheer\"/>","<Actor x={460} y={245} scale={1.26} frame={phase} pose=\"cheer\"/>")
s=s.replace("translate(452 650)","translate(452 656)")
# Late quote: only appear when narrator actually reaches quote, also can add reveal sound beat
s=s.replace("{bubble('MÌNH KHÔNG THỂ HÔM NAY.',459,139,650,64,phase,GOLD)}", "{bubble('MÌNH KHÔNG THỂ HÔM NAY.',459,139,650,129,phase,GOLD)}")
# Add specific action-driven vector props, animated by frame and matching story scene; not copied reference
marker='const Story:React.FC=()=>{'
actions='''type ActionProps={scene:number;phase:number};
const ActionPropsV2:React.FC<ActionProps>=({scene,phase})=>{
 const e=(a:number,b:number)=>ease((phase-a)/Math.max(.01,b));
 const phaseSeconds=phase/30;
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
   <text x="293" y="661" textAnchor="middle" fontSize="27" fontWeight="800" fill="#E6B4BF">CÒN MÌNH THÌ SAO?</text>
 </g>;
 if(scene===6)return <g>
   <path d="M718 470 A77 77 0 0 1 774 530" fill="none" stroke={CYAN} strokeWidth="5" strokeDasharray="8 12" opacity={e(12,19)}/>
   <text x="730" y="654" textAnchor="middle" fontSize="38" fontWeight="800" fill={GOLD} opacity={e(25,19)}>DAY DỨT</text>
 </g>;
 if(scene===7)return <g opacity={e(117,20)} transform={`translate(210 ${415-38*e(117,22)})`}>
   <rect width="162" height="86" rx="24" fill="#113D43" stroke={CYAN} strokeWidth="4"/>
   <text x="81" y="55" textAnchor="middle" fontSize="37" fill={CYAN} fontWeight="800">GIỚI HẠN</text>
 </g>;
 if(scene===8)return <g opacity={e(7,11)}>
   <circle cx="450" cy="380" r={250+5*Math.sin(phase*.07)} stroke={GOLD} strokeWidth="5" fill="none" opacity=".27"/>
   <path d={`M230 125 L235 ${135+14*Math.sin(phase*.07)} M670 125 L665 ${145+14*Math.sin(phase*.07)}`} stroke={CYAN} strokeWidth="5" strokeLinecap="round"/>
 </g>;
 return null;
};
'''
s=s.replace(marker,actions+'\n'+marker)
s=s.replace('{ring}\n {scene===0', '{ring}\n {scene===0')
s=s.replace(' </svg>;\n};\n', ' <ActionPropsV2 scene={scene} phase={phase}/>\n </svg>;\n};\n', 1)
# Component ActionPropsV2 defined after Graphic means lexical binding resolved when function executes, okay after module load
# change timeline subtitle selection from equal distribution to measured energy minima
s=s.replace("const captions=PIECES[idx];const p=norm(local/Math.max(.1,dur));const capIdx=Math.min(captions.length-1,Math.floor(p*captions.length));\n const capProgress=p*captions.length-capIdx;const capFade=ease(capProgress/.11)*ease((1-capProgress)/.08);", "const active=captionTimings.cues.find(c=>c.start<=sec&&sec<c.end) ?? captionTimings.cues[captionTimings.cues.length-1];\n const captionText=active.text;\n const capFade=ease((sec-active.start)/.12)*ease((active.end-sec)/.11);\n const capProgress=norm((sec-active.start)/(active.end-active.start));")
s=s.replace('>{captions[capIdx]}</div>', '>{captionText}</div>')
s=s.replace('const [num,title]=TITLES[idx];', 'const [num,title]=TITLES[idx];\n const sectionLabel=idx===0?"MỞ ĐẦU":idx>=7?(idx===7?"GÓC NHÌN":"KẾT THÚC"):`${String(idx).padStart(2,"0")} / 06`;')
s=s.replace('<span>TRÂN TRỌNG CẢM XÚC CỦA BẠN</span><span>{`${String(Math.max(1,idx)).padStart(2,\'0\')} / 06`}</span>', '<span>RAY · TÂM LÝ HÀNH VI</span><span>{sectionLabel}</span>')
s=s.replace('const barPercent=(sec/timing.voiceDuration)*100;', 'const barPercent=Math.min(100,(sec/timing.voiceDuration)*100);')
# rebrand "SHORTS/01" top subtitle as EP 01, reduce repetitive duplicate title
s=s.replace('SHORTS / 01','TẬP 01')
s=s.replace('const Root:React.FC=()=> <Composition id="PsychologyPeoplePleasing" component={Story}', 'const Root:React.FC=()=> <Composition id="PsychologyPeoplePleasingV2" component={Story}')
# Make captions always fit 2 lines even for quote (CSS flex). no truncation
s=s.replace("fontSize:idx===7?46:idx===0?47:50,fontWeight:800,lineHeight:1.26", "fontSize:idx===7?46:idx===0?47:50,fontWeight:800,lineHeight:1.26,maxWidth:'920px',whiteSpace:'normal',overflowWrap:'break-word'")
# fix accidental references to unverified promise of 100% timeline
s=s.replace('const phaseSeconds=phase/30;','')
(root/'entry-v2.tsx').write_text(s)
print('wrote',root/'entry-v2.tsx','size',len(s))
assert '<ActionPropsV2 scene={scene} phase={phase}/>' in s
assert 'Math.max(1,idx)' not in s
assert 'captionTimings.cues' in s
assert 'Pose' not in s
