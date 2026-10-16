import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene} from './scenes';
import {SPANS} from './timeline';
// Audio intentionally NOT present in PR: local clone + measured voice required.
export const TiecNguoiHayNamThangReel:React.FC=()=>(
  <AbsoluteFill style={{background:'#000000'}}>
    {SPANS.map((shot,index)=><Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration}><Scene index={index}/></Sequence>)}
  </AbsoluteFill>
);
