import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {FPS, SHOTS, TOTAL_FRAMES} from './timeline';

// Each shot requires an independent REAL 16:9 cinematic clip. No SVG characters, contact-sheet crops,
// storyboard art, silent placeholder videos or AI-baked captions are permitted in the master.
const CROSSFADE = 11; // 0.458 seconds at 24 fps; overlaps previous picture only.
const colors = {ivory:'#F7F1E8', amber:'#F5C467', red:'#ED3E4C'};

const Picture: React.FC<{clip:string; fadeIn:number; label:string; narration:string; isCTA:boolean; duration:number}> = ({clip,fadeIn,label,narration,isCTA,duration}) => {
  const f = useCurrentFrame();
  const opacity = fadeIn === 0 ? 1 : interpolate(f,[0,fadeIn],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const textFade = interpolate(f,[0,9,duration-9,duration],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{opacity,backgroundColor:'#02070b',overflow:'hidden'}}>
    <OffthreadVideo src={staticFile(clip)} muted style={{width:'100%',height:'100%',objectFit:'cover'}} />
    <AbsoluteFill style={{background:'linear-gradient(0deg,rgba(0,0,0,.83) 0%,rgba(0,0,0,.18) 26%,transparent 48%)'}} />
    <div style={{position:'absolute',top:72,left:108,opacity:textFade,fontFamily:'Noto Sans,Arial,sans-serif',fontSize:isCTA?80:34,fontWeight:800,letterSpacing:4,color:isCTA?colors.red:colors.amber,textShadow:'0 3px 20px #000'}}>{label}</div>
    <div style={{position:'absolute',bottom:80,left:160,right:160,opacity:textFade,display:'flex',flexDirection:'column',gap:15,alignItems:'center'}}>
      <span style={{fontFamily:'Noto Sans,Arial,sans-serif',fontSize:20,letterSpacing:5,color:colors.amber,fontWeight:700}}>LỜI KỂ</span>
      <div style={{fontFamily:'Noto Sans,Arial,sans-serif',fontSize:49,lineHeight:1.22,fontWeight:750,color:colors.ivory,textAlign:'center',textShadow:'0 4px 18px #000',maxWidth:1500}}>{narration}</div>
    </div>
  </AbsoluteFill>;
};

export const GiayThu61V2Reel: React.FC = () => <AbsoluteFill style={{backgroundColor:'#02070b'}}>
  {SHOTS.map((s,i) => {
    const from = s.startSec*FPS;
    const length = s.durationSec*FPS;
    // Previous shot continues under the new shot's first 11 frames for a soft crossfade.
    const tail = i===SHOTS.length-1 ? 0 : CROSSFADE;
    return <Sequence key={'picture-'+s.id} from={from} durationInFrames={length+tail} premountFor={FPS}>
      <Picture clip={s.clip} fadeIn={i===0?0:CROSSFADE} label={s.headline} narration={s.narration} isCTA={i===0||i===SHOTS.length-1} duration={length} />
    </Sequence>;
  })}
  {SHOTS.map(s=><Sequence key={'voice-'+s.id} from={s.startSec*FPS} durationInFrames={s.durationSec*FPS} premountFor={FPS}>
    <Audio src={staticFile(s.voice)} volume={1} />
  </Sequence>)}
</AbsoluteFill>;

export const GIAY61_V2_EXPECTED_FRAMES = TOTAL_FRAMES;
