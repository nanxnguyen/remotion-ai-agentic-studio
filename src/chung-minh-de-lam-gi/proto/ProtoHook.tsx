// ProtoHook (s1, 66f @30fps = 2.20s) — from paper-title-card + spotlight-hero-card,
// re-skinned to black/white/orange, flat shapes only (T6).
// Cover rule: headline FULLY visible at frame 0 (no stagger on the hook).
// Motion: push-in 1.00->1.03 (spotlight-hero push grammar) + medal "ting" pop f6
// (POP_EASE single overshoot) + ghost chair 0->20% in first 30f.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, pop} from './tokens';
import {FONT_CSS} from './fonts';
import {BOW, Chair, Medal, Que} from './figures';
import {Headline, Rule} from './text';

export const HOOK_DUR = 66;

export const ProtoHook: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (HOOK_DUR - 1));
  // Cover rule: subject visible from frame 0. Medal "ting" = scale 0.7->1 pop
  // (single overshoot, POP_EASE), never opacity-gated.
  const medalPop = interpolate(frame, [6, 16], [0, 1], {...clamp, easing: pop});
  const chairOp = interpolate(frame, [0, 30], [0.12, 0.2], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <Headline lines={['Được công nhận rồi.', 'Sao vẫn thấy trống?']} accents={['trống?']} instant size={86} />
        <Rule instant />
        {/* subject band 34-58%: que holding orange medal at chest, head bowed */}
        <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
          <Que x={540} y={1090} pose={BOW} s={1.15} face="downcast" />
          <g transform={`translate(660 1030) scale(${(0.7 + 0.3 * medalPop).toFixed(3)})`}>
            <Medal x={0} y={0} r={84} />
          </g>
          {/* background ghost chair 62-76%, back turned, 20% */}
          <Chair x={730} y={1420} s={0.85} opacity={chairOp} flip />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
