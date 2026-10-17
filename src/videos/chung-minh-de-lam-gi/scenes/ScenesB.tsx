// ScenesB.tsx — chung-minh-de-lam-gi (scene-agent B, Phase 7 build)
// s2a: wound — hero que s=1.3, tube/disc subordinate band, caption types in.
// 101f @30fps = 3.37s.
// s2b: crash-zoom-punch — face close-up Que s=3.0, smirk, bubble pack-exact quote, MinhHoa tag.
// 88f @30fps = 2.93s. Reuses S2bClose proto design + frame-driven settle.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp} from '../../../chung-minh-de-lam-gi/proto/tokens';
import {FONT_CSS} from '../../../chung-minh-de-lam-gi/proto/fonts';
import {LightDisc, Que, Bubble} from '../../../chung-minh-de-lam-gi/proto/figures';
import {Caption, MinhHoa} from '../../../chung-minh-de-lam-gi/proto/text';

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

export const DUR_S2B = 88;

export const S2bScene: React.FC = () => {
  const frame = useCurrentFrame();
  const settle = interpolate(frame, [0, 14], [0.92, 1], clamp);
  const bubbleIn = interpolate(frame, [30, 39], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${settle.toFixed(4)})`}}>
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <g opacity={bubbleIn}>
            <Bubble x={540} y={300} w={620} h={170} lines={['nó thì làm được gì']} size={46} />
          </g>
          <Que x={540} y={1350} s={3.0} face="smirk" />
        </svg>
        <MinhHoa y={470} />
      </AbsoluteFill>
      <Caption
        chunks={['Ai đó cười khẩy', 'thành tiếng: nó thì', 'làm được gì.']}
        accents={['làm được gì.']}
        band
      />
    </AbsoluteFill>
  );
};
