// ScenesD.tsx — chung-minh-de-lam-gi (scene-agent D, Phase 7 build)
// s5: re-hook snap — headline press-in, lamp disc + seeded motes, que calm.
// 82f @30fps = 2.73s. No blur channel (T6 deviation, recorded).
// s6: mechanism — passersby stagger (24f, scale .82->1 + rise) + corridor linear drift.
// 116f @30fps = 3.87s. Chip fades internally via from/to (0.3-3.8s).
// s7a: H2a turn — 2-3 white distortion curves trace on (40f in-out, pen nib).
// 107f @30fps = 3.57s. Content only AFTER close (causality).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, draw, press} from '../../../chung-minh-de-lam-gi/proto/tokens';
import {FONT_CSS} from '../../../chung-minh-de-lam-gi/proto/fonts';
import {LightDisc, Medal, Que, Motes, Bubble} from '../../../chung-minh-de-lam-gi/proto/figures';
import {Caption, Chip, Headline, Rule, MinhHoa} from '../../../chung-minh-de-lam-gi/proto/text';

// ---------- s5 ----------
export const DUR_S5 = 82;

export const S5Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S5 - 1));
  // Headline press-in: scale 1.28 -> 1 + opacity, 4f stagger, 9f window, press easing.
  const pressOp = interpolate(frame, [0, 9], [0, 1], {...clamp, easing: press});
  const pressScale = interpolate(frame, [0, 9], [1.28, 1], {...clamp, easing: press});
  // Lamp disc + motes fade in.
  const lampOp = interpolate(frame, [16, 34], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <Headline
          lines={['Nếu không ai biết', 'chuyện này, bạn', 'còn làm không?']}
          accents={['làm', 'không?']}
          size={80}
        />
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <LightDisc x={540} y={1050} r={210} opacity={lampOp * 0.3} />
          <Motes cx={540} cy={1050} n={24} opacity={lampOp} />
          <Que x={540} y={1180} s={1.1} face="calm" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `scale(${pressScale.toFixed(4)})`,
          opacity: pressOp.toFixed(4),
          transformOrigin: 'center',
        }}
      >
        <Rule instant />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- s6 ----------
export const DUR_S6 = 116;
const CHIP_START = 9; // 0.3s * 30
const CHIP_END = 114; // 3.8s * 30

export const S6Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S6 - 1));
  // Passersby stagger: 24f, scale .82->1 + rise, soft-back 1.5%, 10f stagger.
  const passerOp = [0, 1, 2, 3].map((i) => {
    const start = i * 10;
    const t = Math.max(0, Math.min(1, (frame - start) / 24));
    const scale = 0.82 + 0.18 * t;
    const rise = -40 * (1 - t);
    const back = 1 + 0.015 * Math.max(0, t - 0.8);
    return {scale: scale * back, y: rise, opacity: t};
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
          {passerOp.map(({scale, y, opacity}, i) => (
            <Que key={i} x={180 + i * 240} y={900 + y} s={scale} face="none" opacity={opacity} />
          ))}
          <line
            x1={140}
            y1={1250}
            x2={940}
            y2={1250}
            stroke={C.grey}
            strokeWidth={6}
            strokeDasharray="26 20"
          />
        </svg>
      </AbsoluteFill>
      <Caption chunks={['Thật ra, người ta', 'để ý bạn ít hơn nhiều']} accents={['hơn', 'nhiều']} />
      <Chip
        text="Hiệu ứng spotlight (Gilovich & cs., 2000): ta tưởng người khác để ý mình hơn thực tế"
        from={CHIP_START}
        to={CHIP_END}
      />
    </AbsoluteFill>
  );
};

// ---------- s7a ----------
export const DUR_S7A = 107;
const TRACE_START = 10;
const TRACE_END = 50;

export const S7aScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S7A - 1));
  // 2-3 white distortion curves trace on (40f in-out, pen nib). Content only AFTER close (causality).
  const traceT = interpolate(frame, [TRACE_START, TRACE_END], [0, 1], {...clamp, easing: draw});
  const contentOp = frame >= TRACE_END ? 1 : 0;
  const opStyle = {opacity: contentOp.toFixed(4)};
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
          <Medal x={540} y={700} r={130} opacity={contentOp} />
          <path
            d="M 380 950 Q 470 880 560 950 T 740 930"
            fill="none"
            stroke={C.white}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={`${200 * traceT} 1000`}
          />
          <path
            d="M 400 1020 Q 500 960 600 1010 T 730 1000"
            fill="none"
            stroke={C.white}
            strokeWidth={8}
            strokeLinecap="round"
            opacity={0.7 * contentOp}
            strokeDasharray={`${150 * traceT} 1000`}
          />
          <Bubble
            x={540}
            y={330}
            w={520}
            h={150}
            lines={['nó thì làm được gì']}
            size={40}
            opacity={contentOp}
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={opStyle}>
        <MinhHoa y={470} />
      </AbsoluteFill>
      <AbsoluteFill style={opStyle}>
        <Caption chunks={['Bạn đã tưởng tấm', 'bằng khen này sẽ lấp']} accents={['lấp']} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
