import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Fig, Pose, SIT, STAND, mix, walk} from '../../stick';
import {
  C,
  Captions,
  Cloud,
  EASE,
  Glow,
  Rain,
  Sky,
  Svg,
  clamp,
  lerp,
  mixHex,
  partStarts,
  ramp,
  vAt,
} from './kit';
import {CAMON_SHOTS} from './timeline';

const FONT = "'Inter', sans-serif";
const bobF = (f: number) => Math.sin(f / 9) * 3;

// =============================================================== S4: đáy
const LIE: Pose = {
  head: [-235, -12],
  sh: [-150, 0],
  hip: [0, 0],
  eL: [-100, 50],
  hL: [-30, 50],
  eR: [-90, 40],
  hR: [-20, 45],
  kL: [100, 5],
  fL: [200, 14],
  kR: [105, 18],
  fR: [205, 26],
};
const REACH: Pose = {...SIT, eL: [80, -105], hL: [175, -75], head: [30, -222]};
const SLUMP: Pose = {
  ...SIT,
  head: [48, -192],
  sh: [14, -140],
  eL: [30, -60],
  hL: [60, -20],
  eR: [40, -50],
  hR: [70, -15],
};

const Alarm: React.FC<{f: number; ring: number; off: number}> = ({f, ring, off}) => {
  const rot = ring * Math.sin(f * 1.9) * 7;
  return (
    <g transform={`translate(${AX} 1338) rotate(${rot})`}>
      {ring > 0.05 &&
        [0, 1].map((i) => (
          <g key={i} opacity={ring * (0.7 - 0.3 * i)}>
            <path
              d={`M -${90 + i * 26} -30 Q -${100 + i * 26} 0 -${90 + i * 26} 30`}
              stroke={C.dawn}
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M ${90 + i * 26} -30 Q ${100 + i * 26} 0 ${90 + i * 26} 30`}
              stroke={C.dawn}
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      <circle cx={-40} cy={-62} r={16} fill={C.pastDim} />
      <circle cx={40} cy={-62} r={16} fill={C.pastDim} />
      <circle r={62} fill={mixHex('#D9D2C0', '#6C7487', off)} stroke={C.pastDim} strokeWidth={8} />
      <text
        y={14}
        textAnchor="middle"
        fontFamily={FONT}
        fontWeight={650}
        fontSize={40}
        fill={C.night}
      >
        6:00
      </text>
    </g>
  );
};

const Box: React.FC<{x: number; y: number; w: number; p: number; i: number; f: number}> = ({
  x,
  y,
  w,
  p,
  i,
  f,
}) => {
  if (p <= 0) return null;
  const dy = Math.sin(f / 22 + i * 1.7) * 4;
  return (
    <g transform={`translate(${x} ${y + dy + (1 - p) * 26}) scale(1.15)`} opacity={p * 0.9}>
      <rect
        x={0}
        y={0}
        width={46}
        height={46}
        rx={10}
        fill="none"
        stroke={C.past}
        strokeWidth={5}
      />
      <rect x={72} y={8} width={w} height={11} rx={5.5} fill={C.pastDim} />
      <rect x={72} y={28} width={w * 0.6} height={11} rx={5.5} fill={C.pastDim} opacity={0.6} />
    </g>
  );
};
// Screen coords: a halo of unchecked boxes around the slumped head (~x 550, y 1000), below the caption block (ends ~420).
const BOXES: [number, number, number][] = [
  [110, 480, 200],
  [590, 500, 220],
  [60, 670, 170],
  [740, 680, 160],
  [40, 860, 180],
  [760, 870, 150],
  [70, 1050, 150],
  [740, 1060, 140],
];
// Room in world coords; camera pushes in 1.5x around (CX, CY) so figure + bed + clock fill the lower half.
const CX = 700,
  CY = 1340,
  AX = 870;
const WIN = {x: 395, y: 640, w: 290, h: 310}; // screen coords: cold pre-dawn window behind the figure

export const CamonS4: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = CAMON_SHOTS.s4;
  const T = (t: number) => vAt(sec, t);
  const fade = lerp(0.6, 1, ramp(f, 0, 14));
  const ring = (1 - ramp(f, T(0.42), 5)) * ramp(f, 0, 6);
  const sit = ramp(f, T(0.12), 18, EASE.smooth);
  const reach = ramp(f, T(0.3), 12) * (1 - ramp(f, T(0.5), 14, EASE.smooth));
  const slump = ramp(f, T(0.5), 22, EASE.smooth);
  const shrink = ramp(f, T(0.5), T(1.05) - T(0.5), EASE.smooth);
  const s = lerp(0.95, 0.84, shrink);
  const base = mix(mix(LIE, SIT, sit), REACH, reach);
  const pose = mix(base, SLUMP, slump);
  const hipX = lerp(590, 620, sit);
  const lyY = 1367,
    sitY = 1520 - 130 * s;
  const hipY = lerp(lyY, sitY, sit);
  const sc = lerp(1, s, sit);
  const cam = lerp(1.48, 1.54, f / D); // slow push-in
  const light = 0.85 + 0.15 * ramp(f, 0, D, EASE.smooth); // window brightens a touch as the morning creeps in
  return (
    <AbsoluteFill style={{background: C.night}}>
      <Svg>
        <Sky top="#18202D" bottom="#283246" id="s4sky" />
        {/* cold early light from the window (on from frame 0, so the shot never opens on black) */}
        <Glow
          x={WIN.x + WIN.w / 2}
          y={WIN.y + WIN.h / 2 + 80}
          r={640}
          color="#8EA4C4"
          o={0.2 * light}
          id="s4win"
        />
        <g opacity={light}>
          <defs>
            <linearGradient id="s4pane" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7E93B3" />
              <stop offset="1" stopColor="#4E5F7C" />
            </linearGradient>
            <linearGradient id="s4shaft" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#9DB0CC" stopOpacity={0.16} />
              <stop offset="1" stopColor="#9DB0CC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <polygon
            points={`${WIN.x},${WIN.y + WIN.h} ${WIN.x + WIN.w},${WIN.y + WIN.h} ${WIN.x + WIN.w + 190},1640 ${WIN.x - 130},1640`}
            fill="url(#s4shaft)"
          />
          <rect
            x={WIN.x - 14}
            y={WIN.y - 14}
            width={WIN.w + 28}
            height={WIN.h + 28}
            rx={8}
            fill="#1A2231"
          />
          <rect
            x={WIN.x}
            y={WIN.y}
            width={WIN.w}
            height={WIN.h}
            rx={4}
            fill="url(#s4pane)"
            opacity={0.55}
          />
          <rect x={WIN.x + WIN.w / 2 - 6} y={WIN.y} width={12} height={WIN.h} fill="#1A2231" />
          <rect x={WIN.x} y={WIN.y + WIN.h / 2 - 6} width={WIN.w} height={12} fill="#1A2231" />
        </g>
        <g transform={`translate(${CX} ${CY}) scale(${cam}) translate(${-CX} ${-CY})`}>
          <Glow
            x={AX}
            y={1330}
            r={300}
            color={C.dawn}
            o={0.16 * (1 - ramp(f, T(0.45), 20) * 0.7)}
            id="s4g"
          />
          <g opacity={fade}>
            <rect x={-400} y={1520} width={2000} height={400} fill="#121925" />
            {/* bed */}
            <rect x={160} y={1400} width={620} height={70} rx={18} fill="#3B4763" />
            <rect x={160} y={1470} width={620} height={50} rx={8} fill="#273046" />
            <rect x={160} y={1330} width={34} height={190} rx={10} fill="#273046" />
            <rect x={200} y={1366} width={120} height={38} rx={19} fill="#4F5B76" />
            {/* nightstand + clock */}
            <rect x={800} y={1400} width={170} height={120} rx={6} fill="#273046" />
            <Alarm f={f} ring={ring} off={1 - ring} />
            <Fig
              x={hipX}
              y={hipY + bobF(f) * 0.4 * sit}
              pose={pose}
              scale={sc}
              color={C.past}
              ink={C.night}
              face="frown"
            />
          </g>
        </g>
        {BOXES.map(([x, y, w], i) => (
          <Box key={i} x={x} y={y} w={w} i={i} f={f} p={ramp(f, T(0.3 + i * 0.085), 14)} />
        ))}
      </Svg>
      <Captions
        sec={sec}
        duration={D}
        parts={['Hồi đó, mình chỉ nhìn thấy những thứ mình chưa làm được.']}
        accents={['chưa làm được']}
      />
    </AbsoluteFill>
  );
};

// =============================================================== S5: bước ngoặt
const Check: React.FC<{p: number}> = ({p}) => {
  if (p <= 0) return null;
  const pop = 1 + 0.25 * Math.sin(Math.min(1, p) * Math.PI);
  return (
    <g transform={`scale(${pop * Math.min(1, p * 1.4)})`}>
      <circle r={38} fill={C.leaf} />
      <path
        d="M -17 1 L -5 14 L 18 -12"
        stroke="#1E2A25"
        strokeWidth={9}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

const PW5 = 700,
  PH5 = 480;
const BusScene: React.FC<{f: number}> = ({f}) => (
  <g>
    <rect width={PW5} height={PH5} fill="#2F4A44" />
    <rect x={70} y={150} width={560} height={210} rx={30} fill="#D9D2C0" />
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={95 + i * 135}
        y={175}
        width={110}
        height={90}
        rx={12}
        fill={i === 1 ? '#F4C77D' : '#6E8A86'}
      />
    ))}
    <circle cx={185} cy={375} r={34} fill="#1E2A25" />
    <circle cx={515} cy={375} r={34} fill="#1E2A25" />
    <circle cx={185} cy={375} r={14} fill="#9AA79F" />
    <circle cx={515} cy={375} r={14} fill="#9AA79F" />
    <rect x={0} y={400} width={PW5} height={80} fill="#1E2A25" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect
        key={i}
        x={((((i * 170 - f * 4) % 850) + 850) % 850) - 80}
        y={436}
        width={80}
        height={8}
        rx={4}
        fill="#9AA79F"
        opacity={0.6}
      />
    ))}
  </g>
);
const DeskScene: React.FC<{f: number}> = ({f}) => (
  <g>
    <rect width={PW5} height={PH5} fill="#2C3D33" />
    <rect x={380} y={70} width={200} height={140} rx={8} fill="#1E2A25" />
    <rect
      x={394}
      y={84}
      width={172}
      height={112}
      fill={mixHex('#F4C77D', '#FFE6B5', 0.5 + 0.5 * Math.sin(f / 15))}
      opacity={0.35}
    />
    <rect x={0} y={330} width={PW5} height={150} fill="#4A3F32" />
    <path d="M 150 330 L 195 190 L 360 190 L 405 330 Z" fill="#1E2A25" />
    <path d="M 195 190 L 360 190 L 380 250 L 175 250 Z" fill="#F6F2E8" opacity={0.18} />
    <rect x={230} y={150} width={14} height={180} fill={C.pastDim} />
    <path d="M 215 120 L 275 60 L 330 100 L 245 150 Z" fill={C.dawn} />
    <path d="M 300 330 L 330 190 L 570 190 L 590 330 Z" fill="#9AA79F" />
    <rect x={330} y={196} width={240} height={125} fill="#F4C77D" opacity={0.55} />
    <rect x={470} y={286} width={70} height={44} rx={8} fill="#EDE6D6" />
  </g>
);
const NightScene: React.FC<{f: number}> = ({f}) => (
  <g>
    <rect width={PW5} height={PH5} fill="#252D3E" />
    <circle cx={530} cy={110} r={56} fill="#EDE6D6" />
    <circle cx={556} cy={96} r={50} fill="#252D3E" />
    <Cloud x={230} y={150} s={1} color="#5B6880" />
    <Rain f={f} x0={120} y0={180} w={250} h={230} n={16} color={C.past} o={0.55} speed={14} />
    <rect x={0} y={410} width={PW5} height={70} fill="#161C29" />
    {[0, 1].map((i) => (
      <rect
        key={i}
        x={120 + i * 330}
        y={415}
        width={170}
        height={8}
        rx={4}
        fill={C.dawn}
        opacity={0.35}
      />
    ))}
  </g>
);

export const CamonS5: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = CAMON_SHOTS.s5;
  const T = (t: number) => vAt(sec, t);
  const warm = ramp(f, T(0.08), T(0.95) - T(0.08), EASE.smooth);
  const GAP = 800;
  const arr = [T(0.02), T(0.4), T(0.74)]; // frame at which each panel is centred... panel 0 arrives first via slide-in
  const scroll = [0, 1, 2].reduce(
    (a, i) => a + (i === 0 ? 0 : GAP * ramp(f, arr[i] - 18, 22, EASE.smooth)),
    0,
  );
  const appear = ramp(f, 0, 14);
  const ticks = arr.map((t) => ramp(f, t + 14, 16));
  const smile = ramp(f, T(0.6), 14);
  const pose = walk(f, 0.7, STAND);
  const panels = [BusScene, DeskScene, NightScene];
  return (
    <AbsoluteFill style={{background: C.moss}}>
      <Svg>
        <Sky
          top={mixHex('#1E2A25', '#274650', warm)}
          bottom={mixHex('#1E2A25', '#C9987A', warm)}
          id="s5sky"
        />
        <Glow x={540} y={1000} r={760} color={C.dawn} o={0.5 * warm} id="s5g" />
        <g opacity={appear}>
          {panels.map((P, i) => {
            const cx = 540 + i * GAP - scroll;
            if (cx < -500 || cx > 1580) return null;
            const dist = Math.abs(cx - 540) / GAP;
            return (
              <g
                key={i}
                transform={`translate(${cx - PW5 / 2} 560)`}
                opacity={1 - Math.min(0.6, dist * 0.8)}
              >
                <defs>
                  <clipPath id={`s5clip${i}`}>
                    <rect width={PW5} height={PH5} rx={34} />
                  </clipPath>
                </defs>
                <g clipPath={`url(#s5clip${i})`}>
                  <P f={f} />
                </g>
                <rect
                  width={PW5}
                  height={PH5}
                  rx={34}
                  fill="none"
                  stroke={C.ivory}
                  strokeWidth={5}
                  opacity={0.5}
                />
                <g transform={`translate(${PW5 - 48} 52)`}>
                  <Check p={ticks[i]} />
                </g>
              </g>
            );
          })}
          <rect x={80} y={1612} width={920} height={4} rx={2} fill={C.ivory} opacity={0.22} />
          <ellipse cx={540} cy={1612} rx={150} ry={14} fill="#000" opacity={0.25} />
          <Fig
            x={540}
            y={1612 - 255 * 0.9 + bobF(f)}
            pose={pose}
            scale={0.9}
            color={C.now}
            ink={C.moss}
            face={smile > 0.5 ? 'smile' : 'calm'}
          />
        </g>
      </Svg>
      <Captions
        sec={sec}
        duration={D}
        parts={[
          'Còn bây giờ nhìn lại...',
          'mình thấy một người đã vượt qua rất nhiều ngày khó khăn.',
        ]}
        accents={['', 'vượt qua']}
      />
    </AbsoluteFill>
  );
};

// =============================================================== S6: vẫn chọn tiếp
const FLOOR = 1520;
export const CamonS6: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = CAMON_SHOTS.s6;
  const ps = partStarts(
    ['Có hôm buồn,', 'vẫn dậy đi làm.', 'Có hôm muốn bỏ cuộc,', 'vẫn chọn làm tiếp.'],
    sec,
  );
  const appear = ramp(f, 0, 14);
  const warm = ramp(f, 0, 90, EASE.smooth);

  // (a) walk out the door under a small rain cloud
  const aOp = (1 - ramp(f, ps[2] - 8, 8)) * appear;
  const wk = ramp(f, ps[1] - 8, ps[2] - ps[1] - 6, EASE.smooth);
  const qx = lerp(440, 835, wk);
  const door = ramp(f, ps[1] - 4, 16);
  const into = ramp(f, ps[2] - 14, 10);
  const stepping = wk > 0 && wk < 1;
  const poseA = stepping ? walk(f, 1) : STAND;
  const fyA = FLOOR - 255 * 0.85;

  // (b) laptop: close, bow, open again on "vẫn chọn làm tiếp"
  const bOp = ramp(f, ps[2] - 4, 10);
  const close = ramp(f, ps[2] + 8, 12) * (1 - ramp(f, ps[3] + 2, 16, EASE.smooth));
  const lid = 1 - close; // 1 open, 0 closed
  const bow = ramp(f, ps[2] + 12, 22, EASE.smooth) * (1 - ramp(f, ps[3] - 2, 18, EASE.smooth));
  const dark = ramp(f, ps[2] + 10, ps[3] - ps[2] - 10, EASE.smooth);
  const clear = ramp(f, ps[3] + 10, 30, EASE.smooth);
  const BOW: Pose = {
    ...SIT,
    head: [100, -122],
    sh: [52, -128],
    eL: [90, -62],
    hL: [180, -50],
    eR: [100, -60],
    hR: [195, -48],
  };
  const poseB = mix(SIT, BOW, bow);
  const hipX = 330,
    hipY = FLOOR - 130 * 0.95;
  const deskTop = hipY - 58;
  const screenOn = lid > 0.6 ? ramp(f, ps[3] + 8, 14) : 0;
  const cloudCol = mixHex('#8793A6', '#465064', dark);

  return (
    <AbsoluteFill style={{background: C.moss}}>
      <Svg>
        <Sky
          top={mixHex('#1E2A25', '#2A4A4F', warm)}
          bottom={mixHex('#1E2A25', '#B58B72', warm)}
          id="s6sky"
        />
        <Glow x={540} y={1100} r={700} color={C.dawn} o={0.22 + 0.2 * clear} id="s6g" />
        <rect x={0} y={FLOOR} width={1080} height={400} fill="#141B17" opacity={0.7} />
        <g opacity={appear}>
          <rect x={60} y={FLOOR - 2} width={960} height={4} rx={2} fill={C.ivory} opacity={0.2} />
        </g>

        {aOp > 0.01 && (
          <g opacity={aOp}>
            {/* door */}
            <rect
              x={860}
              y={FLOOR - 400}
              width={170}
              height={400}
              rx={8}
              fill="#2A2F2A"
              stroke={C.ivory}
              strokeWidth={6}
              opacity={0.9}
            />
            <rect
              x={872}
              y={FLOOR - 388}
              width={146}
              height={388}
              rx={4}
              fill={C.dawn}
              opacity={0.75 * door}
            />
            <circle cx={1004} cy={FLOOR - 190} r={7} fill={C.ivory} />
            <g opacity={1 - into * 0.95}>
              <Fig
                x={qx + (wk > 0 ? 0 : bobF(f))}
                y={fyA + (stepping ? 0 : bobF(f) * 0.5)}
                pose={poseA}
                scale={0.85 * (1 - into * 0.1)}
                color={C.now}
                ink={C.moss}
                face={wk > 0.85 ? 'calm' : 'frown'}
              />
              <Cloud x={qx} y={fyA - 235 * 0.85 - 130} s={0.7} color="#8793A6" />
              <Rain
                f={f}
                x0={qx - 70}
                y0={fyA - 235 * 0.85 - 90}
                w={140}
                h={300}
                n={14}
                color={C.past}
                o={0.6}
                speed={16}
              />
            </g>
          </g>
        )}

        {bOp > 0.01 && (
          <g opacity={bOp}>
            {/* chair + desk */}
            <rect x={hipX - 90} y={hipY + 6} width={150} height={16} rx={8} fill="#3A3F3A" />
            <rect
              x={hipX - 70}
              y={hipY + 22}
              width={12}
              height={FLOOR - hipY - 22}
              fill="#3A3F3A"
            />
            <Fig
              x={hipX}
              y={hipY + bobF(f) * 0.3}
              pose={poseB}
              scale={0.95}
              color={C.now}
              ink={C.moss}
              face={bow > 0.3 ? 'frown' : close < 0.3 && clear > 0.2 ? 'calm' : 'calm'}
            />
            <rect x={380} y={deskTop} width={640} height={22} rx={8} fill="#6B5B45" />
            <rect
              x={960}
              y={deskTop + 22}
              width={20}
              height={FLOOR - deskTop - 22}
              fill="#6B5B45"
            />
            {/* laptop */}
            <g transform={`translate(640 ${deskTop})`}>
              <rect x={-10} y={-14} width={290} height={14} rx={6} fill="#9AA79F" />
              <g transform={`translate(0 -14) scale(1 ${Math.max(0.04, lid)})`}>
                <rect
                  x={14}
                  y={-210}
                  width={250}
                  height={210}
                  rx={10}
                  fill="#2A332E"
                  stroke="#9AA79F"
                  strokeWidth={6}
                />
                <rect
                  x={28}
                  y={-196}
                  width={222}
                  height={182}
                  rx={4}
                  fill={C.dawn}
                  opacity={0.15 + 0.85 * screenOn}
                />
                {screenOn > 0.2 && (
                  <g opacity={screenOn} fill="#1E2A25">
                    {[0, 1, 2].map((i) => (
                      <rect
                        key={i}
                        x={46}
                        y={-170 + i * 34}
                        width={110 - i * 18}
                        height={10}
                        rx={5}
                      />
                    ))}
                  </g>
                )}
              </g>
            </g>
            {screenOn > 0.05 && (
              <Glow
                x={765}
                y={deskTop - 120}
                r={320}
                color={C.dawn}
                o={0.5 * screenOn}
                id="s6lap"
              />
            )}
            {/* mây trên đầu */}
            {clear < 1 && (
              <g opacity={1 - clear} transform={`translate(${clear * 60} ${-clear * 90})`}>
                <Cloud
                  x={hipX + lerp(10, 70, bow)}
                  y={hipY - 235 * 0.95 - 120}
                  s={lerp(0.7, 1.25, dark) * (1 - clear * 0.4)}
                  color={cloudCol}
                />
              </g>
            )}
          </g>
        )}
      </Svg>
      <Captions
        sec={sec}
        duration={D}
        parts={['Có hôm buồn, vẫn dậy đi làm.', 'Có hôm muốn bỏ cuộc, vẫn chọn làm tiếp.']}
        accents={['vẫn dậy đi làm', 'vẫn chọn làm tiếp']}
      />
    </AbsoluteFill>
  );
};
