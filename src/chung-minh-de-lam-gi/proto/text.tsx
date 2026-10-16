// Text layer — chung-minh-de-lam-gi.
// Headline (replaces caption on s1/s5/s10/s11) + bottom Caption (bottom:224,
// chunk <=28 chars) + source Chip (top, small, fades before cut).
// Q11: caption glyph height >=54px (58px font), chip/aux >=32px (30px font at
// 600 weight on bordered chip — aux floor; verified on final pixels).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, F_BODY, F_HEAD, clamp, draw, press} from './tokens';

export type Word = {t: string; accent?: boolean};

const wordsOf = (line: string, accents: string[]): Word[] =>
  line.split(' ').map((t) => ({t, accent: accents.includes(t)}));

/** Headline: two lines, ExtraBold-feel (Lexend 700), accent word orange.
 *  Cover variant (instant=true) shows fully at frame 0 — no stagger. */
export const Headline: React.FC<{
  lines: string[]; accents?: string[]; instant?: boolean; size?: number;
}> = ({lines, accents = [], instant = false, size = 88}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute', left: 90, right: 90, top: 154,
        textAlign: 'center', fontFamily: F_HEAD, fontWeight: 700,
        fontSize: size, lineHeight: 1.28, color: C.white,
      }}
    >
      {lines.map((line, li) => (
        <div key={li}>
          {wordsOf(line, accents).map((w, i) => {
            const delay = 4 + (li * 6 + i) * 4;
            const t = instant
              ? 1
              : interpolate(frame, [delay, delay + 9], [0, 1], {...clamp, easing: press});
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block', opacity: t,
                  transform: instant ? undefined : `scale(${(1.28 - 0.28 * t).toFixed(3)})`,
                  color: w.accent ? C.orange : undefined,
                }}
              >
                {w.t}
                {'\u00A0'}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Orange rule under headline (paper-title-card underline grammar: f16-34 draw). */
export const Rule: React.FC<{instant?: boolean}> = ({instant = false}) => {
  const frame = useCurrentFrame();
  const u = instant
    ? 1
    : interpolate(frame, [16, 34], [0, 1], {...clamp, easing: draw});
  return (
    <div
      style={{
        position: 'absolute', left: 430, right: 430, top: 560, height: 8,
        background: C.orange, borderRadius: 4, transform: `scaleX(${u})`,
      }}
    />
  );
};

/** Bottom caption: plain warm-white text on black (no pill — black IS the pill).
 *  bottom:224 clears the 210px safe zone. Accents are PHRASE spans (T4 lock:
 *  greedy multi-word match, so s7b is structurally 2 spans, never 5 words). */
export const Caption: React.FC<{chunks: string[]; accents?: string[]; size?: number; band?: boolean}> = ({
  chunks, accents = [], size = 58, band = false,
}) => {
  const renderLine = (line: string, key: number) => {
    const words = line.split(' ');
    const out: React.ReactNode[] = [];
    let i = 0;
    let k = 0;
    while (i < words.length) {
      let matched: string | null = null;
      for (const a of accents) {
        const n = a.split(' ').length;
        if (words.slice(i, i + n).join(' ') === a) {
          matched = a;
          break;
        }
      }
      if (matched) {
        out.push(<span key={k++} style={{color: C.orange}}>{matched} </span>);
        i += matched.split(' ').length;
      } else {
        out.push(<span key={k++}>{words[i]} </span>);
        i += 1;
      }
    }
    return <React.Fragment key={key}>{out}</React.Fragment>;
  };
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center'}}>
      {band && (
        <div
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 470,
            background: 'rgba(6,6,6,0.72)',
          }}
        />
      )}
      <div
        style={{
          position: 'relative', zIndex: 1,
          marginBottom: 224, maxWidth: 920, textAlign: 'center',
          fontFamily: F_BODY, fontWeight: 600, fontSize: size,
          lineHeight: 1.38, color: C.white,
        }}
      >
        {chunks.map((c, i) => (
          <div key={i}>{renderLine(c, i)}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/** Source chip: bordered label, top zone, fades 0.3s before cut (window prop). */
export const Chip: React.FC<{text: string; from: number; to: number; top?: number}> = ({text, from, to, top = 120}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [from, from + 9], [0, 1], clamp);
  const fadeOut = interpolate(frame, [to - 9, to], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute', left: 80, right: 80, top,
        display: 'flex', justifyContent: 'center', opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      <div
        style={{
          border: `2px solid ${C.chipBd}`, borderRadius: 18, padding: '14px 26px',
          fontFamily: F_BODY, fontWeight: 600, fontSize: 30, lineHeight: 1.4,
          color: C.chipTx, textAlign: 'center', maxWidth: 920, background: 'rgba(6,6,6,0.72)',
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** "minh hoạ" tag for staged objects (speech bubbles s2b/s7a, price tag s10). */
export const MinhHoa: React.FC<{x?: number; y?: number}> = ({x = 540, y = 1500}) => (
  <div
    style={{
      position: 'absolute', left: x - 90, top: y - 30, width: 180,
      textAlign: 'center', fontFamily: F_BODY, fontWeight: 600, fontSize: 28,
      color: C.grey, letterSpacing: '0.04em',
    }}
  >
    (minh hoạ)
  </div>
);
