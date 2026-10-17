// ScenesF.tsx — chung-minh-de-lam-gi (scene-agent F, Phase 7 build)
// s9b: H3b spine — beam = flat fan polygon @80% landing on chest, face lit tilt -6deg.
// 100f @30fps = 3.33s. Absolute silence after "nhất?".
// s10: naming — price tag MATERIALIZES via 1f hard cut, arm stops mid-way, tag sways pendulum.
// 97f @30fps = 3.23s. Chip Tuổi Trẻ in-shot below 3-line headline.
// s11: hold — open question + 2.0s pure silence, medal kept in hand. Push 1.00->1.03 then DEAD STILL 60f.
// 160f @30fps = 5.33s. Last 60f dead still.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp} from '../../../chung-minh-de-lam-gi/proto/tokens';
import {FONT_CSS} from '../../../chung-minh-de-lam-gi/proto/fonts';
import {BeamFan, Que, PriceTag, Chair, Medal} from '../../../chung-minh-de-lam-gi/proto/figures';
import {Caption, Chip, Headline, MinhHoa} from '../../../chung-minh-de-lam-gi/proto/text';

// ---------- s9b ----------
export const DUR_S9B = 100;

export const S9bScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S9B - 1));
  // Beam flat fan polygon @80% landing on chest (no radial-gradient/mask per T6).
  const beamOp = interpolate(frame, [0, 20], [0, 0.8], clamp);
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
          <BeamFan opacity={beamOp} />
          <Que x={540} y={1220} s={1.25} face="lit" tilt={-6} />
        </svg>
      </AbsoluteFill>
      <Caption
        chunks={['Rồi bạn hỏi nhỏ:', 'rốt cuộc, mình đang cần', 'điều gì nhất?']}
        accents={['cần', 'gì', 'nhất?']}
      />
    </AbsoluteFill>
  );
};

// ---------- s10 ----------
export const DUR_S10 = 97;
const TAG_CUT = 1; // 1f hard cut materialize
const TAG_SWAY_START = 30;

export const S10Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S10 - 1));
  // Price tag materializes via 1f hard cut (no grow-morph), then sways (pendulum).
  const tagShown = frame >= TAG_CUT;
  // Pendulum sway: sin wave starting after tag appears
  const swayT = tagShown ? Math.min(1, (frame - TAG_SWAY_START) / 60) : 0;
  const sway = Math.sin(swayT * Math.PI * 2) * 3; // +/- 3 degrees
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <Headline
          lines={['Bấy lâu nay, bạn trao', 'quyền định giá mình', 'cho người khác.']}
          accents={['định', 'giá']}
          instant
          size={76}
        />
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <Que x={380} y={1250} s={1.1} face="calm" />
          {tagShown && (
            <g transform={`translate(560 1150) rotate(${sway.toFixed(2)})`}>
              <PriceTag x={0} y={0} tilt={12} />
            </g>
          )}
          <Que x={800} y={1250} s={1.1} face="none" opacity={0.35} />
        </svg>
      </AbsoluteFill>
      <MinhHoa y={1420} />
      <Chip
        text="Tuổi Trẻ 14/02/2026 (bình luận): “trao quyền định giá bản thân cho người khác”"
        from={0}
        to={999}
        top={500}
      />
    </AbsoluteFill>
  );
};

// ---------- s11 ----------
export const DUR_S11 = 160;
const HOLD_FROM = 100; // push ends, stillness begins (last 60f = 2.0s dead still)

export const S11Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = Math.min(1, frame / HOLD_FROM);
  const zoom = 1 + 0.03 * p;
  const deadStill = frame >= HOLD_FROM;
  // Last 60f: zoom locked at 1.03, no movement whatsoever.
  const finalZoom = deadStill ? 1.03 : zoom;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${finalZoom.toFixed(4)})`}}>
        <Headline
          lines={['Nếu từ mai không cần', 'cho ai thấy nữa, bạn', 'giữ lại điều gì?']}
          accents={['giữ', 'lại', 'điều', 'gì?']}
          instant
          size={72}
        />
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <Que x={470} y={1180} s={1.2} face="calm" />
          <Medal x={330} y={1010} r={64} />
          <Chair x={730} y={1420} s={0.8} opacity={0.28} />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
