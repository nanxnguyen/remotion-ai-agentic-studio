import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {GAP_SHOTS} from './timeline';
import {Chair, GapFonts, MorningNew, OldOffice, Photo, Room, Tea} from './scenesB';

// gaplai scenes C (v2 s8–s9): lặng chốt + CTA riêng.
// Palette brief: nền #171310, sàn #241B14, vàng đèn #E8B04B, kem #F5EBD7,
// xám quá khứ #8A7E6E, viền khung #3A2E22. Be Vietnam Pro 600, caption đáy
// (bottom 260px, tránh 210px), hộp nền mờ giữ tương phản. Deterministic: không random.
const BG = '#171310';
const LAMP = '#E8B04B';
const CREAM = '#F5EBD7';
const FRAME = '#3A2E22';
const WOOD = '#4A3826';
const FONT = "'Be Vietnam Pro','Inter',sans-serif";
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const soft = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const ramp = (f: number, a: number, len = 14) =>
  interpolate(f, [a, a + len], [0, 1], {...clamp, easing: soft});

// Caption hộp nền (giữ tương phản trên nền chi tiết), fade vào/ra trong Sequence của nó.
const Cap: React.FC<{text: string; accent?: string; len: number; size?: number}> = ({
  text,
  accent,
  len,
  size = 54,
}) => {
  const f = useCurrentFrame();
  const o =
    interpolate(f, [0, 8], [0, 1], clamp) * (1 - interpolate(f, [len - 6, len], [0, 1], clamp));
  const y = interpolate(f, [0, 12], [16, 0], {...clamp, easing: soft});
  const parts = accent ? text.split(accent) : [text];
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 260,
        display: 'flex',
        justifyContent: 'center',
        opacity: o,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 952,
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1.45,
          textAlign: 'center',
          color: CREAM,
          padding: '22px 30px 26px',
          borderRadius: 26,
          background: 'rgba(10,7,4,.62)',
          border: '1px solid rgba(245,235,215,.12)',
          textShadow: '0 2px 14px rgba(0,0,0,.9)',
        }}
      >
        {accent && parts.length === 2 ? (
          <>
            {parts[0]}
            <span style={{color: LAMP}}>{accent}</span>
            {parts[1]}
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

// ---------- S8 (v2): lặng chốt — ghế trống + trà nguội + 2 khung cạnh nhau ----------
// Voice s8 dài 3.84s (~115f từ f4 → hết f119); caption tắt ở f119, hold lặng
// tới hết shot (D=155) → 36f không chữ, chừa đủ lặng 0.8s cuối (24f) trước CTA.
const S8P1 = 'Vì lúc khó nhất, chính bạn đã gồng mình';
const S8P2 = 'đưa chúng ta bước tiếp qua đoạn ấy.';
export const GapS8: React.FC = () => {
  const f = useCurrentFrame();
  const {duration: D} = GAP_SHOTS.s8;
  const zoom = 1 + 0.03 * ramp(f, 0, D);
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <Room lamp={0.7} id="s8" />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <g transform={`translate(540 900) scale(${zoom}) translate(-540 -900)`}>
          <Photo x={315} y={660} w={390} h={420} id="s8a" tint>
            <OldOffice />
          </Photo>
          <Photo x={765} y={660} w={390} h={420} id="s8b" label={false}>
            <MorningNew />
          </Photo>
          <Chair x={295} y={1430} s={1.05} />
          <Chair x={785} y={1430} s={1.05} flip />
          <ellipse cx="540" cy="1350" rx="140" ry="30" fill="#100C09" opacity={0.5} />
          <ellipse cx="540" cy="1340" rx="130" ry="28" fill={FRAME} />
          <ellipse cx="540" cy="1330" rx="130" ry="26" fill={WOOD} />
          <rect x="524" y="1330" width="32" height="100" fill={WOOD} />
          <Tea x={540} y={1252} f={f} steam={false} />
        </g>
      </svg>
      <Sequence from={4} durationInFrames={62}>
        <Cap text={S8P1} accent="gồng mình" len={62} />
      </Sequence>
      <Sequence from={66} durationInFrames={53}>
        <Cap text={S8P2} accent="bước tiếp" len={53} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------- S9 (v2): CTA riêng — ghế + trà ấm, caption hỏi rồi pill CTA giữ tới hết ----------
const S9P1 = 'Còn bạn thì sao, có điều gì muốn nhắn';
const S9P2 = 'với mình của vài năm trước không? Kể mình nghe nhé.';
export const GapS9: React.FC = () => {
  const f = useCurrentFrame();
  const {duration: D} = GAP_SHOTS.s9;
  const zoom = 1 + 0.035 * ramp(f, 0, D);
  const cta = ramp(f, 142, 16);
  const glowPulse = 0.24 + 0.08 * Math.sin(f / 12);
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <Room lamp={0.85} id="s9" />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <defs>
          <radialGradient id="s9halo">
            <stop offset="0" stopColor={LAMP} stopOpacity={0.5} />
            <stop offset="0.7" stopColor={LAMP} stopOpacity={0.2} />
            <stop offset="1" stopColor={LAMP} stopOpacity={0} />
          </radialGradient>
        </defs>
        <g transform={`translate(540 900) scale(${zoom}) translate(-540 -900)`}>
          <circle cx="540" cy="1050" r="330" fill="url(#s9halo)" opacity={0.5} />
          <Chair x={295} y={1380} s={1.12} />
          <Chair x={785} y={1380} s={1.12} flip />
          <ellipse cx="540" cy="1300" rx="150" ry="32" fill="#100C09" opacity={0.5} />
          <ellipse cx="540" cy="1290" rx="140" ry="30" fill={FRAME} />
          <ellipse cx="540" cy="1280" rx="140" ry="28" fill={WOOD} />
          <rect x="524" y="1280" width="32" height="110" fill={WOOD} />
          <Tea x={540} y={1202} f={f} steam />
        </g>
      </svg>
      <Sequence from={4} durationInFrames={57}>
        <Cap text={S9P1} accent="muốn nhắn" len={57} />
      </Sequence>
      <Sequence from={61} durationInFrames={79}>
        <Cap text={S9P2} accent="Kể mình nghe nhé" len={79} />
      </Sequence>
      {cta > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 110,
            right: 110,
            bottom: 260,
            display: 'flex',
            justifyContent: 'center',
            opacity: cta,
            transform: `translateY(${(1 - cta) * 22}px)`,
          }}
        >
          <div
            style={{
              maxWidth: 860,
              textAlign: 'center',
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 46,
              lineHeight: 1.4,
              color: LAMP,
              border: `3px solid ${LAMP}`,
              borderRadius: 999,
              padding: '22px 44px',
              background: 'rgba(23,19,16,.72)',
              boxShadow: `0 0 44px rgba(232,176,75,${glowPulse})`,
            }}
          >
            Còn bạn thì sao? Kể mình nghe nhé
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
