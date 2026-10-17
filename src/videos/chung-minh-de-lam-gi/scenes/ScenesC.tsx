// ScenesC.tsx — chung-minh-de-lam-gi (scene-agent C, Phase 7 build)
// s3: grind — 3 medals drop with accelerating stagger, gravity curve, squash on land.
// 114f @30fps = 3.80s. T6: flat shapes only, no motion-blur.
// s4a: warm peak — panel wall, crowd row lights in place, medal at chest.
// 110f @30fps = 3.67s.
// s4b: H1 drop — hard cut, dimmed medals, ghost chair, que sit droop, room hum.
// 116f @30fps = 3.87s.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, pop, press} from '../../../chung-minh-de-lam-gi/proto/tokens';
import {FONT_CSS} from '../../../chung-minh-de-lam-gi/proto/fonts';
import {Chair, Medal, Que, SIT} from '../../../chung-minh-de-lam-gi/proto/figures';
import {Caption, Headline, Rule} from '../../../chung-minh-de-lam-gi/proto/text';

// ---------- s3 ----------
export const DUR_S3 = 114;
const S3_MEDAL_X = [330, 540, 750];
const S3_MEDAL_Y = 620;
const S3_MEDAL_R = 80;

export const S3Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S3 - 1));
  // 3 medals drop with accelerating stagger (R2), gravity curve y = D*(t/24)^2.
  // Each medal: drop f(0+i*18), land, squash, settle. Hold >=34f still after settle.
  const medals = S3_MEDAL_X.map((x, i) => {
    const start = i * 18;
    const dur = 36;
    const t = Math.max(0, Math.min(1, (frame - start) / dur));
    // ease-in gravity: y = D * (t/24)^2 mapped to pixels drop of 220px
    const dropY = 220 * (t * t);
    const y = frame < start ? -220 : S3_MEDAL_Y - dropY;
    // squash on land: scaleY overshoot near landing
    const landT = Math.max(0, Math.min(1, (frame - start - 30) / 6));
    const squash = 1 + 0.15 * (1 - landT) * Math.max(0, 1 - Math.abs(frame - (start + 30)) / 6);
    const scale =
      frame < start ? 0 : frame < start + 36 ? 1 + 0.15 * Math.sin((frame - start) * 0.2) : 1;
    const opacity = frame < start ? 0 : 1;
    return (
      <g key={i} transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
        <Medal x={0} y={0} r={S3_MEDAL_R} />
      </g>
    );
  });
  // Caption fade-in after medals land.
  const capOp = interpolate(frame, [72, 96], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          {medals}
          <Que x={540} y={1250} s={1.2} face="downcast" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`, opacity: capOp.toFixed(4)}}>
        <Caption
          chunks={['Từ đó, tăng ca', 'triền miên, bằng khen,']}
          accents={['bằng', 'khen,']}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- s4a ----------
export const DUR_S4A = 110;

export const S4aScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S4A - 1));
  // Crowd row lights in place: dark-state 0.18 -> lit, 12f stagger.
  const queOp = [0, 1, 2, 3].map((i) => {
    const start = i * 12;
    return interpolate(frame, [start, start + 12], [0.18, 1], clamp);
  });
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <rect x={0} y={560} width={1080} height={420} fill={C.panel} />
          {[0, 1, 2, 3].map((i) => (
            <Que key={i} x={220 + i * 210} y={900} s={0.75} face="smile" opacity={queOp[i]} />
          ))}
          <Que x={540} y={1250} s={1.1} face="smile" />
          <Medal x={540} y={1050} r={60} />
        </svg>
      </AbsoluteFill>
      <Caption chunks={['Ngày nhận bằng khen,', 'cả phòng đứng dậy']} />
    </AbsoluteFill>
  );
};

// ---------- s4b ----------
export const DUR_S4B = 116;

export const S4bScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S4B - 1));
  // Dimmed medals (60%), ghost chair opacity 0->0.35, que sit droop.
  const chairOp = interpolate(frame, [0, 40], [0, 0.35], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          {[0, 1, 2].map((i) => (
            <Medal key={i} x={330 + i * 210} y={600} r={72} dim opacity={0.6} />
          ))}
          <Chair x={640} y={1250} s={0.9} opacity={chairOp} flip />
          <Que x={400} y={1300} pose={SIT} s={1.0} face="droop" />
          <rect x={100} y={500} width={160} height={330} fill={C.orange} opacity={0.5} />
        </svg>
      </AbsoluteFill>
      <Caption chunks={['Tối về, phòng trọ', 'im phăng phắc,']} accents={['phăng', 'phắc,']} />
    </AbsoluteFill>
  );
};
