import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {scenes, shotStarts, TRANSITION_FRAMES, DURATION_FRAMES} from './timeline';
import {Protagonist, StageArt} from './scenes/StageArt';

const BLACK = '#08090B';
const AMBER = '#EF9E69';
const WHITE = '#F5F5F4';
const GRAY = '#85878A';

const clamp = (x:number) => Math.max(0,Math.min(1,x));
const ease = (x:number) => {
  const t=clamp(x);
  return t*t*(3-2*t);
};
type Blend = {before:number; after:number; blend:number};

function getSceneBlend(frame:number):Blend {
  for(let i=1;i<scenes.length;i++){
    const boundary=shotStarts[i];
    if(frame>=boundary-TRANSITION_FRAMES && frame<boundary+TRANSITION_FRAMES){
      return {before:i-1,after:i,
        blend:ease((frame-(boundary-TRANSITION_FRAMES))/(2*TRANSITION_FRAMES))};
    }
  }
  let at=0;
  for(let i=1;i<scenes.length;i++){
    if(frame>=shotStarts[i])at=i;
  }
  return {before:at,after:at,blend:1};
}

const AnimatedTitle:React.FC<{sceneIndex:number; opacity:number}> = ({sceneIndex,opacity}) => {
  const scene=scenes[sceneIndex];
  const lines=scene.lines.filter(Boolean);
  const maxLength=Math.max(...lines.map(line=>line.length));
  const size=maxLength>25?67:maxLength>19?78:91;
  const y=lines.length===1?289:270;
  return (
    <g opacity={opacity}>
      <text x={72} y={195} fill={AMBER} fontFamily="DejaVu Sans" fontSize={25} fontWeight={800}
        letterSpacing={5}>MỘT CHÚT SUY TƯ / #01</text>
      <line x1={72} y1={215} x2={955} y2={215} stroke="#3F4149" strokeWidth={3}/>
      {lines.map((line,i)=><text key={i} x={540} y={y+i*(size+22)} textAnchor="middle"
          fontSize={size} fontFamily="DejaVu Sans" fontWeight={800} fill={i===1?AMBER:WHITE}
          stroke={BLACK} strokeWidth={5} paintOrder="stroke"
          letterSpacing={-1.2}>{line}</text>)}
      <text x={540} y={1567} fill="#D4D5D2" fontFamily="DejaVu Sans"
        textAnchor="middle" fontSize={32} fontWeight={500}>{scene.subtitle}</text>
    </g>
  );
};

export const SeventeenMessagesReel:React.FC = () => {
  const frame=useCurrentFrame();
  const {before,after,blend}=getSceneBlend(frame);
  const old=scenes[before];
  const next=scenes[after];
  const oldLocal=clamp((frame-shotStarts[before])/Math.max(1,old.durationInFrames));
  const nextLocal=clamp((frame-shotStarts[after])/Math.max(1,next.durationInFrames));
  // Subpixel global camera only. It never resets when a scene changes.
  const cameraX=Math.sin(frame/211)*4.5;
  const cameraY=Math.cos(frame/287)*6;
  const cameraS=1.014+Math.sin(frame/410)*.009;
  return (
    <AbsoluteFill style={{backgroundColor:BLACK, overflow:'hidden'}}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" role="img"
        aria-label="Câu chuyện chữa lành của An trong đêm sinh nhật">
        <rect width={1080} height={1920} fill={BLACK}/>
        <g transform={`translate(540 960) scale(${cameraS}) translate(${-540+cameraX} ${-960+cameraY})`}>
          <rect x={0} y={0} width={1080} height={1920} fill="#08090B"/>
          {/* Cinematic space remains stationary; only props dissolve underneath An. */}
          <g opacity={1-blend}>
            <StageArt kind={old.kind} frame={frame} progress={oldLocal}/>
          </g>
          <g opacity={before===after?1:blend}>
            <StageArt kind={next.kind} frame={frame} progress={nextLocal}/>
          </g>
          <Protagonist previousMood={old.mood} nextMood={next.mood}
            previousKind={old.kind} nextKind={next.kind} blend={blend} frame={frame}/>
        </g>
        <AnimatedTitle sceneIndex={before} opacity={1-blend}/>
        <AnimatedTitle sceneIndex={after} opacity={before===after?1:blend}/>
        <line x1={72} x2={1008} y1={1633} y2={1633} stroke="#383C43" strokeWidth={3}/>
        <line x1={72} x2={72+936*frame/(DURATION_FRAMES-1)} y1={1633} y2={1633}
          stroke={AMBER} strokeWidth={6}/>
        <text x={72} y={1695} fill={GRAY} fontFamily="DejaVu Sans" fontSize={24} fontWeight={700}>
          KHI TỬ TẾ VỚI MÌNH
        </text>
        <text x={1008} y={1695} textAnchor="end" fill={GRAY}
          fontFamily="DejaVu Sans" fontSize={24}>
          {String(Math.min(16, after+1)).padStart(2,'0')} / 16
        </text>
        {/* Static first-frame hook; no fade-in or blank first frame. */}
        <rect x={0} y={1785} width={1080} height={135} fill="#08090B" opacity={.92}/>
      </svg>
    </AbsoluteFill>
  );
};
