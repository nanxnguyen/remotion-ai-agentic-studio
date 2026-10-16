// Caption pill per content-pack.md: bottom 224, max 2 lines, centered,
// Archivo SemiBold 56-60px on #0A0F3D 85% pill. Accent spans per key.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, F_BODY} from './tokens';

export type CapSeg = {text: string; accent?: string};

export const Caption: React.FC<{segs: CapSeg[]; size?: number}> = ({segs, size = 58}) => {
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
      <div
        style={{
          marginBottom: 224,
          maxWidth: 940,
          background: 'rgba(10,15,61,0.85)',
          borderRadius: 28,
          padding: '22px 40px',
          textAlign: 'center',
          fontFamily: F_BODY,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1.32,
          color: C.lampWhite,
        }}
      >
        {segs.map((s, i) => (
          <span key={i} style={s.accent ? {color: s.accent, fontWeight: 800} : undefined}>
            {s.text}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
