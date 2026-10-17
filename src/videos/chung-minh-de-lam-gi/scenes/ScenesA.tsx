// ScenesA.tsx — chung-minh-de-lam-gi (scene-agent A, Phase 7 build)
// Scene s1: hook — cover, headline full at frame 0, medal ting pop, ghost chair fade-in.
// 66f @30fps = 2.20s. Frame-driven only; T6 flat shapes, no gradient/blur/filter.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, pop} from '../../../chung-minh-de-lam-gi/proto/tokens';
import {FONT_CSS} from '../../../chung-minh-de-lam-gi/proto/fonts';
import {BOW, Chair, Medal, Que} from '../../../chung-minh-de-lam-gi/proto/figures';
import {Headline, Rule} from '../../../chung-minh-de-lam-gi/proto/text';

export const DUR_S1 = 66;

export const S1Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S1 - 1));
  // Medal "ting" pop f6–f16: scale 0.7 -> 1 with single overshoot (POP_EASE).
  const medalPop = interpolate(frame, [6, 16], [0.7, 1], {...clamp, easing: pop});
  // Ghost chair opacity 0.12 -> 0.20 in first 30f.
  const chairOp = interpolate(frame, [0, 30], [0.12, 0.2], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <Headline
          lines={['Được công nhận rồi.', 'Sao vẫn thấy trống?']}
          accents={['trống?']}
          instant
          size={86}
        />
        <Rule instant />
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <Que x={540} y={1090} pose={BOW} s={1.15} face="downcast" />
          <g transform={`translate(660 1030) scale(${(0.7 + 0.3 * medalPop).toFixed(3)})`}>
            <Medal x={0} y={0} r={84} />
          </g>
          <Chair x={730} y={1420} s={0.85} opacity={chairOp} flip />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene s2a: wound — hero que s=1.3, tube/disc subordinate band, caption types in.
// 101f @30fps = 3.37s.
import {LightDisc} from '../../../chung-minh-de-lam-gi/proto/figures';
import {Caption} from '../../../chung-minh-de-lam-gi/proto/text';

export const DUR_S2A = 101;

export const S2aScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S2A - 1));
  // Caption fades in over first 24f, stays, fades out last 12f.
  const capOp = interpolate(frame, [0, 24], [0, 1], clamp);
  const capOff = interpolate(frame, [DUR_S2A - 12, DUR_S2A], [1, 0], clamp);
  const captionOpacity = Math.min(capOp, capOff);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill
        style={{transform: `scale(${zoom.toFixed(4)})`, opacity: captionOpacity.toFixed(4)}}
      >
        <Caption
          chunks={['Tháng đầu đi làm,', 'cuối buổi họp, bạn nói khẽ:']}
          accents={['để', 'rồi', 'xem.']}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <rect x={120} y={560} width={840} height={40} rx={8} fill={C.white} opacity={0.5} />
          <rect x={120} y={620} width={840} height={18} rx={6} fill={C.grey} opacity={0.4} />
          <LightDisc x={540} y={590} r={200} opacity={0.08} />
          <Que x={400} y={1230} s={1.3} face="downcast" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
