// ScenesB — xay-doi-minh-hay-chung-minh (scene-agent B, sole owner)
// s3: brick-deal climb (foundation carving + 3 noun bricks, straight running-bond top)
// s4: dark-room phone viewer-list (linear sweep, minh hoa tag, 5% pin)
// Frame-driven only: useCurrentFrame + seeded hash. No Date.now / Math.random.
// Captions: bottom-224 pill via proto Caption; nothing inside bottom 210px.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Caption} from '../../../xay-doi-minh-hay-chung-minh/proto/Caption';
import {Person} from '../../../xay-doi-minh-hay-chung-minh/proto/People';
import {C, F_BODY, hash} from '../../../xay-doi-minh-hay-chung-minh/proto/tokens';

const W = 1080;
const H = 1920;

// Shot-relative SFX cue frames (timeline.ts XDM_SFX, s3): engrave 0.41 / bricks 1.37 / 2.15 / 2.85.
const S3_CARVE = 12;
const S3_LAND = [41, 65, 86];
const S3_LABELS = ['lương tháng đầu', 'chiếc xe', 'tấm bằng'];

// Brick settle grammar (design-spec §8): high-stiffness spring feel,
// one overshoot (y1>1) + 2f squash press. Dip scaled to ~9% of brick height (J3).
const OVERSHOOT = Easing.bezier(0.3, 0, 0.25, 1.15);
const FALL_IN = Easing.bezier(0.3, 0, 0.2, 1);

const settleY = (f: number, land: number, fromY: number, toY: number, brickH: number) => {
  const fall = interpolate(f, [land - 8, land], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: FALL_IN,
  });
  const s01 = Math.min(1, Math.max(0, (f - land) / 6));
  const y = fromY + (toY - fromY) * fall + (OVERSHOOT(s01) - s01) * brickH * 0.09;
  const squash = s01 > 0 && s01 < 1 ? Math.sin(s01 * Math.PI) * 0.12 : 0;
  // 2f press: extra flatten right after landing.
  const press = f >= land && f <= land + 2 ? 0.05 * (1 - (f - land) / 2) : 0;
  return {y, squash: squash + press, landed: f >= land, falling: f >= land - 8 && f < land};
};

// Local stacked-pill caption: pixel-twin of proto Caption (same pill tokens)
// but with explicit pack line-breaks. Local only — shared proto/Caption untouched.
const StackedCaption: React.FC<{lines: {text: string; accent?: string}[][]; size?: number}> = ({
  lines,
  size = 56,
}) => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        paddingBottom: 224,
      }}
    >
      {lines.map((segs, li) => (
        <div
          key={li}
          style={{
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
      ))}
    </div>
  </AbsoluteFill>
);

// Paper-dust puff: seeded chips drifting outward, 20f life, 2–4f drag lag.
// Origin = brick bottom edge; angles biased to the downward half (screen +y)
// so chips never cross the label glyphs above.
const Dust: React.FC<{cx: number; cy: number; start: number; seed: number; n?: number}> = ({
  cx,
  cy,
  start,
  seed,
  n = 9,
}) => {
  const f = useCurrentFrame();
  const t = (f - start - 3) / 20; // 3f drag lag behind the body
  if (t < 0 || t > 1) {
    return null;
  }
  return (
    <>
      {Array.from({length: n}).map((_, i) => {
        const h1 = hash(seed * 31 + i * 7.3);
        const h2 = hash(seed * 57 + i * 3.1);
        const ang = h1 * Math.PI; // downward half only: sin >= 0 stays at/below origin
        const dist = (30 + h2 * 70) * Easing.out(Easing.quad)(t);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: cx + Math.cos(ang) * dist,
              top: cy + Math.sin(ang) * dist * 0.6 - t * 24,
              width: 10 + h1 * 8,
              height: 8 + h2 * 8,
              background: C.tape,
              border: `2px solid ${C.ink}`,
              borderRadius: 3,
              opacity: (1 - t) * 0.9,
              transform: `rotate(${h1 * 180 - t * 90}deg)`,
            }}
          />
        );
      })}
    </>
  );
};

// Hero brick: sen paper-cut body, ink outline, fiber sheen, optional carved/label text.
const HeroBrick: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  text?: string;
  carved?: boolean;
  carveOn?: boolean;
  seed: number;
  squash?: number;
  opacity?: number;
}> = ({x, y, w, h, text, carved, carveOn, seed, squash = 0, opacity = 1}) => {
  const shade = hash(seed);
  const bg =
    shade < 0.5
      ? `linear-gradient(180deg, ${C.senLight} 0%, ${C.sen} 55%, ${C.senDark} 100%)`
      : `linear-gradient(180deg, #FF7CC0 0%, ${C.senLight} 50%, ${C.sen} 100%)`;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        opacity,
        transform: `scaleY(${1 - squash})`,
        transformOrigin: '50% 100%',
        filter: 'drop-shadow(0 10px 12px rgba(6,8,30,0.45))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: bg,
          border: `5px solid ${C.ink}`,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {/* paper fiber sheen */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `repeating-linear-gradient(${100 + shade * 40}deg, rgba(255,255,255,0.10) 0 3px, transparent 3px 9px)`,
          }}
        />
        {carveOn && (
          <div style={{position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.35)'}} />
        )}
      </div>
      {text && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: carved
              ? "'Bricolage Grotesque','Archivo',sans-serif"
              : "'Archivo',sans-serif",
            fontWeight: 800,
            fontSize: carved ? 44 : 37,
            letterSpacing: carved ? '0.04em' : undefined,
            color: carved ? '#7A0B46' : C.lampWhite,
            textShadow: carved ? '0 2px 0 rgba(255,255,255,0.45)' : '0 2px 0 rgba(10,15,61,0.6)',
            padding: '0 18px',
            textAlign: 'center',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

// Static running-bond courses behind the hero bricks (flat straight top, no steps).
const BackCourses: React.FC<{top: number; bottom: number; seed: number}> = ({
  top,
  bottom,
  seed,
}) => {
  const bw = 216;
  const bh = 96;
  const rows: React.ReactNode[] = [];
  let r = 0;
  for (let y = top; y < bottom; y += bh, r++) {
    const off = r % 2 === 1 ? -bw / 2 : 0;
    for (let x = -bw + off; x < W + bw; x += bw) {
      const tone = hash(seed + r * 17 + x * 0.13);
      rows.push(
        <div
          key={`${r}-${x}`}
          style={{
            position: 'absolute',
            left: x + 4,
            top: y + 4,
            width: bw - 8,
            height: bh - 8,
            background:
              tone < 0.4
                ? `linear-gradient(180deg, #D63D8F 0%, ${C.senDark} 100%)`
                : `linear-gradient(180deg, #E04A9C 0%, #C2177A 100%)`,
            border: `4px solid ${C.ink}`,
            borderRadius: 8,
            opacity: 0.92,
          }}
        />,
      );
    }
  }
  return <>{rows}</>;
};

// Wood ladder (tool, never accent).
const Ladder: React.FC<{x: number; top: number; bottom: number}> = ({x, top, bottom}) => (
  <div style={{position: 'absolute', left: x, top, width: 120, height: bottom - top}}>
    {[0, 1].map((i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: i * 88,
          top: 0,
          width: 32,
          height: bottom - top,
          background: `linear-gradient(90deg, #A3805A 0%, ${C.wood} 60%, #6E5334 100%)`,
          border: `4px solid ${C.ink}`,
          borderRadius: 8,
        }}
      />
    ))}
    {Array.from({length: Math.floor((bottom - top) / 110)}).map((_, i) => (
      <div
        key={`r${i}`}
        style={{
          position: 'absolute',
          left: 0,
          top: 40 + i * 110,
          width: 120,
          height: 26,
          background: C.wood,
          border: `4px solid ${C.ink}`,
          borderRadius: 7,
        }}
      />
    ))}
  </div>
);

// ============================================================ S3: climb / deal
export const S3Scene: React.FC = () => {
  const f = useCurrentFrame();
  const BW = 440;
  const BH = 128;
  const colX = (W - BW) / 2;
  const baseY = 1330; // foundation top; caption zone starts ~1496 — clear
  const rowsY = [baseY, baseY - BH, baseY - BH * 2, baseY - BH * 3];

  // Foundation carving: text drops in f0–12 + engrave flash f12–18.
  const carveIn = interpolate(f, [0, S3_CARVE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const carveDrop = (1 - carveIn) * -70;
  const carveFlash = interpolate(f, [S3_CARVE, S3_CARVE + 6], [0.55, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Character ladder-governed age ladder: 22 bareheaded → hat → 28 taller.
  const landed = S3_LAND.filter((l) => f >= l).length;
  const stage = landed; // 0..3
  const charH = [238, 268, 286, 304][stage];
  const charHat = stage >= 1;
  const charFace = stage === 0 ? 'hope' : 'calm';

  // Subtle tilt-up drift along the wall (frame-driven).
  const drift = interpolate(f, [0, 150], [0, -26], {extrapolateRight: 'clamp'});

  // Caption chunks (content-pack s3): chunk2 on "thành gạch" ≈ f70.
  const cap2 = f >= 70;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.cobaltTop} 0%, ${C.cobaltBot} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* distant side building + the one ice window ("nhà người đó") */}
      <div
        style={{
          position: 'absolute',
          left: 700,
          top: 300 + drift,
          width: 300,
          height: 420,
          background: '#10165C',
          border: `5px solid ${C.ink}`,
          borderRadius: 10,
          opacity: 0.95,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 96,
            top: 60,
            width: 108,
            height: 140,
            background: C.ice,
            border: `5px solid ${C.ink}`,
            borderRadius: 8,
            boxShadow: '0 0 34px 8px rgba(143,227,255,0.55)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 49,
              top: 0,
              width: 6,
              height: 140,
              background: C.ink,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 64,
              width: 108,
              height: 6,
              background: C.ink,
            }}
          />
        </div>
      </div>

      {/* wall mass with straight flat top at y=830 */}
      <div style={{position: 'absolute', left: 0, top: drift, width: W, height: H}}>
        <BackCourses top={830} bottom={baseY + BH} seed={7} />
        {/* hero stack: foundation + 3 dealt bricks */}
        <HeroBrick x={colX} y={rowsY[0]} w={BW} h={BH} seed={11} squash={0} />
        <div
          style={{
            position: 'absolute',
            left: colX,
            top: rowsY[0] + carveDrop,
            width: BW,
            height: BH,
            opacity: carveIn,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Bricolage Grotesque','Archivo',sans-serif",
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: '0.04em',
            color: '#7A0B46',
            textShadow: '0 2px 0 rgba(255,255,255,0.45)',
          }}
        >
          NÓ Á? CÒN LÂU.
        </div>
        {carveFlash > 0 && (
          <div
            style={{
              position: 'absolute',
              left: colX,
              top: rowsY[0],
              width: BW,
              height: BH,
              background: `rgba(255,255,255,${carveFlash})`,
              borderRadius: 12,
            }}
          />
        )}
        {/* dust BEFORE bricks: bottom-edge origin + painted under the brick face */}
        <Dust cx={W / 2} cy={rowsY[0] + BH} start={S3_CARVE} seed={3} />
        {S3_LAND.map((land, i) => (
          <Dust key={i} cx={W / 2} cy={rowsY[i + 1] + BH} start={land} seed={40 + i * 9} />
        ))}
        {S3_LAND.map((land, i) => {
          const s = settleY(f, land, rowsY[i + 1] - 560, rowsY[i + 1], BH);
          if (f < land - 8) {
            return null;
          }
          return (
            <HeroBrick
              key={i}
              x={colX + (i % 2 === 1 ? -24 : 24)}
              y={s.y}
              w={BW}
              h={BH}
              text={S3_LABELS[i]}
              seed={21 + i * 5}
              squash={s.squash}
            />
          );
        })}
      </div>

      <Ladder x={806} top={860 + drift} bottom={baseY + BH} />
      {/* character climbs with the wall: feet rise one course per landed brick */}
      <Person x={150} y={baseY + BH - stage * 40} h={charH} hat={charHat} face={charFace} />

      {/* s3c1 pack lines: "Từ đó, lương tháng đầu," / "chiếc xe, tấm bằng," */}
      {/* s3c2 pack lines: "thành gạch" / "xây về phía nhà người đó." (accent = "nhà người đó", period white) */}
      <StackedCaption
        size={56}
        lines={
          cap2
            ? [
                [{text: 'thành gạch'}],
                [{text: 'xây về phía '}, {text: 'nhà người đó', accent: C.sen}, {text: '.'}],
              ]
            : [[{text: 'Từ đó, lương tháng đầu,'}], [{text: 'chiếc xe, tấm bằng,'}]]
        }
      />
    </AbsoluteFill>
  );
};

// Alias per task-plan output name.
export const SceneBricks = S3Scene;

// ============================================================ S4: unease / phone
const VIEWERS = 6;
const TARGET_ROW = 4;

const ViewerRow: React.FC<{i: number; y: number; scroll: number; hot: boolean}> = ({
  i,
  y,
  scroll,
  hot,
}) => {
  const hue = Math.floor(hash(100 + i * 13) * 360);
  const barW = 200 + Math.floor(hash(200 + i * 29) * 150);
  return (
    <div
      style={{
        position: 'absolute',
        left: 36,
        top: y + scroll,
        width: 568,
        height: 92,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        opacity: hot ? 1 : 0.92,
      }}
    >
      {/* faceless avatar: seeded pastel disc, no face, no name */}
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: '50%',
          background: `hsl(${hue} 60% 72%)`,
          border: hot ? `5px solid ${C.sen}` : `4px solid ${C.ink}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hot ? '0 0 18px 4px rgba(255,46,154,0.6)' : 'none',
        }}
      >
        <div
          style={{width: 34, height: 34, borderRadius: '50%', background: 'rgba(10,15,61,0.35)'}}
        />
      </div>
      <div
        style={{
          width: barW,
          height: 30,
          borderRadius: 15,
          background: hot ? '#FFD3E8' : '#C6CBE8',
          border: `3px solid ${C.ink}`,
        }}
      />
      {hot && (
        <div style={{fontFamily: F_BODY, fontWeight: 800, fontSize: 30, color: C.sen}}>●</div>
      )}
    </div>
  );
};

export const S4Scene: React.FC = () => {
  const f = useCurrentFrame();
  // Thumb scroll: linear drag down the list, eases to a stop on the target row.
  const scroll = interpolate(f, [0, 92, 132], [0, -196, -196], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const hot = f >= 92;
  // Phone-light flicker: tiny seeded breathing, strictly frame-derived.
  const glow = 0.86 + 0.06 * Math.sin(f * 0.35) + 0.04 * (hash(Math.floor(f / 6) + 5) - 0.5);
  // Linear sweep across the phone (slide-spotlight-pan grammar: strictly linear).
  const sweepX = interpolate(f, [8, 58], [-320, 960], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // 5% pin blip: deterministic 12f blink.
  const pinOn = f % 24 < 12;

  const cap2 = f >= 70;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #070B33 0%, #10165C 70%, #0A0F3D 100%)',
        overflow: 'hidden',
      }}
    >
      {/* curtain right + wall shadow of "THẤY CHƯA?" cast through it */}
      <div
        style={{
          position: 'absolute',
          left: 830,
          top: 0,
          width: 250,
          height: 1500,
          background: 'linear-gradient(90deg, #1B2266 0%, #2A36C9 50%, #1B2266 100%)',
          borderLeft: `5px solid ${C.ink}`,
          opacity: 0.9,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 30 + i * 70,
              top: 0,
              width: 22,
              height: 1500,
              background: 'rgba(6,8,30,0.45)',
            }}
          />
        ))}
      </div>
      {/* wall shadow "THẤY CHƯA?" on the room wall LEFT of the phone (phone rect 220–860; caption top ~1496) */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: 1230,
          width: 300,
          height: 120,
          opacity: 0.28,
          transform: 'rotate(-8deg)',
          fontFamily: "'Bricolage Grotesque','Archivo',sans-serif",
          fontWeight: 800,
          fontSize: 52,
          color: C.senLight,
          textShadow: '0 0 22px rgba(255,46,154,0.8)',
        }}
      >
        THẤY CHƯA?
      </div>

      {/* sleeper: shoulders + face lit only by the phone */}
      <div style={{position: 'absolute', left: 240, top: 1180, width: 600, height: 420}}>
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 190,
            width: 480,
            height: 230,
            background: '#232A6E',
            border: `5px solid ${C.ink}`,
            borderRadius: 60,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 0,
            width: 200,
            height: 220,
            background: `radial-gradient(ellipse at 50% 20%, rgba(243,246,255,${0.95 * glow}) 0%, #D8C9B8 55%, #8A7A68 100%)`,
            border: `5px solid ${C.ink}`,
            borderRadius: '46% 46% 48% 48%',
          }}
        >
          <div style={{position: 'absolute', left: 44, top: 96, display: 'flex', gap: 44}}>
            {[0, 1].map((i) => (
              <div key={i} style={{width: 12, height: 7, borderRadius: 4, background: C.ink}} />
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 88,
              top: 150,
              width: 26,
              height: 7,
              borderRadius: 4,
              background: C.ink,
              transform: 'rotate(-6deg)',
            }}
          />
        </div>
        {/* phone glow cone */}
        <div
          style={{
            position: 'absolute',
            left: 120,
            top: -330,
            width: 360,
            height: 360,
            background: `radial-gradient(ellipse at 50% 100%, rgba(200,220,255,${0.35 * glow}) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* phone panel: generic frame, no real-app logo */}
      <div
        style={{
          position: 'absolute',
          left: 220,
          top: 330,
          width: 640,
          height: 830,
          background: '#0D133F',
          border: `6px solid ${C.ink}`,
          borderRadius: 44,
          overflow: 'hidden',
          boxShadow: `0 0 ${Math.round(70 * glow)}px rgba(180,210,255,${0.5 * glow})`,
        }}
      >
        {/* status bar: 05:00-free zone — clock omitted; 5% pin only */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 640,
            height: 64,
            background: '#080C2C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 30,
            gap: 12,
          }}
        >
          <div
            style={{
              width: 64,
              height: 30,
              border: `3px solid ${pinOn ? '#FF4D4D' : '#7A2030'}`,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 5,
            }}
          >
            <div
              style={{
                width: 8,
                height: 16,
                background: '#FF4D4D',
                borderRadius: 3,
                opacity: pinOn ? 1 : 0.35,
              }}
            />
          </div>
          <span style={{fontFamily: F_BODY, fontWeight: 800, fontSize: 32, color: '#FF4D4D'}}>
            5%
          </span>
        </div>
        {/* UI title */}
        <div
          style={{
            position: 'absolute',
            left: 36,
            top: 92,
            fontFamily: F_BODY,
            fontWeight: 800,
            fontSize: 44,
            color: C.lampWhite,
          }}
        >
          Người xem
        </div>
        {/* viewer list window */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 170,
            width: 640,
            height: 560,
            overflow: 'hidden',
          }}
        >
          {Array.from({length: VIEWERS}).map((_, i) => (
            <ViewerRow
              key={i}
              i={i}
              y={10 + i * 104}
              scroll={scroll}
              hot={hot && i === TARGET_ROW}
            />
          ))}
          {/* linear sweep sheen */}
          <div
            style={{
              position: 'absolute',
              left: sweepX,
              top: 0,
              width: 130,
              height: 560,
              background:
                'linear-gradient(90deg, transparent, rgba(220,235,255,0.22), transparent)',
              transform: 'skewX(-8deg)',
            }}
          />
        </div>
        {/* thumb tracks the scrolled list: parked top includes scroll so it lands on the sen-ring row */}
        <div
          style={{
            position: 'absolute',
            left: 470,
            top: 170 + 10 + TARGET_ROW * 104 + scroll + 8,
            width: 110,
            height: 150,
            background: '#F0C9A0',
            border: `5px solid ${C.ink}`,
            borderRadius: 55,
            opacity: 0.96,
          }}
        />
      </div>

      {/* "minh hoạ" tag: top-right of phone, 32px (Q11 floor) #8B93C9, clear of caption zone */}
      <div
        style={{
          position: 'absolute',
          left: 640,
          top: 262,
          fontFamily: F_BODY,
          fontWeight: 600,
          fontSize: 32,
          color: C.labelGrey,
          background: 'rgba(10,15,61,0.85)',
          border: `3px solid ${C.labelGrey}`,
          borderRadius: 14,
          padding: '8px 20px',
        }}
      >
        minh hoạ
      </div>

      <Caption
        size={56}
        segs={
          cap2
            ? [{text: 'tìm '}, {text: 'đúng một cái tên.', accent: C.lampWhite}]
            : [{text: 'Nửa đêm đăng story xong, bạn mở danh sách người xem,'}]
        }
      />
    </AbsoluteFill>
  );
};

// Alias per task-plan output name.
export const ScenePhone = S4Scene;
