import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Fig, SIT, STAND, mix, walk, bob} from '../../stick';
import {
  C,
  Captions,
  EASE,
  Glow,
  Lora,
  PH,
  PW,
  Polaroid,
  Sky,
  Svg,
  hash,
  lerp,
  mixHex,
  partStarts,
  ramp,
  vAt,
} from './kit';
import {CAMON_SHOTS} from './timeline';
import {PhotoScene} from './photo';

const kb = (f: number, dur: number) => lerp(1, 1.05, f / dur); // Ken Burns 1.00 -> 1.05

// ---------------- S1: old polaroid, grey figure walking away in the rain ----------------
export const CamonS1: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration} = CAMON_SHOTS.s1;
  const parts = [
    'Có một phiên bản của mình...',
    'đã cố gắng rất nhiều,',
    'nhưng chẳng mấy ai biết.',
  ];
  const t = f / duration;
  // street lamp flickers while "cố gắng rất nhiều" is spoken
  const [a, b] = [vAt(sec, 0.35), vAt(sec, 0.6)];
  const flick =
    f >= a && f <= b
      ? hash(Math.floor(f / 2) + 3) > 0.45
        ? 1.25
        : 0.25
      : f > b
        ? ramp(f, b, 6) * 0.2 + 1
        : 1;
  const lamp = Math.min(1, flick) * 0.75 + (flick > 1 ? 0.25 : 0);
  const [, p1] = partStarts(parts, sec);
  const zoom = lerp(1, 1.1, t) * (1 + 0.07 * ramp(f, p1, 40, EASE.smooth)); // slow push-in + extra push when "cố gắng rất nhiều" lands
  return (
    <AbsoluteFill style={{background: C.night}}>
      <Svg scale={zoom} ox={520} oy={1250}>
        <Sky top="#10151F" bottom={C.night} id="s1bg" />
        <Glow x={540} y={1100} r={760} color={C.night2} o={0.9} id="s1g" />
        <Polaroid x={540} y={1100} s={1.32} rot={-3} id="s1pc">
          <PhotoScene id="s1ph" f={f} walkT={t} lamp={lamp} />
          {/* develop: photo snaps in from a pale wash within 5 frames (frame 0 already readable) */}
          <rect width={PW} height={PH} fill={C.ivory} opacity={0.45 * (1 - ramp(f, 0, 5))} />
        </Polaroid>
      </Svg>
      <Captions
        sec={sec}
        duration={duration}
        parts={['Có một phiên bản của mình...', 'đã cố gắng rất nhiều, nhưng chẳng mấy ai biết.']}
        accents={['', 'cố gắng rất nhiều|chẳng mấy ai biết']}
        instantFirst
      />
    </AbsoluteFill>
  );
};

// ---------------- S2: coming home, bag drop, slump on the bed edge ----------------
export const CamonS2: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration} = CAMON_SHOTS.s2;
  const parts = [
    'Đó là những ngày đi làm về mệt rã rời,',
    'vẫn tự nhủ: thôi, mai cố thêm chút nữa.',
  ];
  const [, p1] = partStarts(parts, sec);
  const k = 0.85,
    floor = 1500,
    standHip = floor - 273 * k,
    sitHip = 1372;
  const fd = Math.round(vAt(sec, 0.22)),
    fs = Math.round(vAt(sec, 0.5));
  const xw =
    f < fd
      ? lerp(190, 300, ramp(f, 4, fd - 4, EASE.smooth))
      : lerp(300, 640, ramp(f, fd + 8, fs - fd - 8, EASE.smooth));
  const amp =
    0.9 *
    (ramp(f, 4, 6) * (1 - ramp(f, fd - 5, 5)) + ramp(f, fd + 8, 5) * (1 - ramp(f, fs - 6, 6)));
  const sitT = ramp(f, fs, 18, EASE.smooth);
  const slump = ramp(f, fs + 14, 36);
  const SLUMP = {
    ...SIT,
    head: [40, -185],
    sh: [12, -135],
    eL: [30, -60],
    hL: [95, -25],
    eR: [50, -50],
    hR: [105, -10],
  } as typeof SIT;
  const pose = mix(walk(f * 0.9, amp), mix(SIT, SLUMP, slump), sitT);
  const hipY = lerp(standHip, sitHip, sitT) + bob(f) * 0.4 * sitT;
  // bag held in a hand until fd, then drops and bounces
  const wp = walk(fd * 0.9, 0.9);
  const dropX = 300 - wp.hL[0] * k,
    dropY0 = standHip + wp.hL[1] * k + 45;
  const hand = walk(f * 0.9, amp);
  const dt = f - fd;
  const bagX = f < fd ? xw - hand.hL[0] * k : dropX;
  const fall = Math.min(1, Math.max(0, dt) / 9) ** 2;
  const bounce = dt > 9 ? 26 * Math.exp(-(dt - 9) / 5) * Math.abs(Math.sin((dt - 9) * 0.45)) : 0;
  const bagY = f < fd ? standHip + hand.hL[1] * k + 45 : lerp(dropY0, floor - 34, fall) - bounce;
  const door = ramp(f, 0, 14);
  const bub = ramp(f, p1 + 8, 18, EASE.out);
  const dark = '#0E131C';
  return (
    <AbsoluteFill style={{background: C.night}}>
      <Svg scale={kb(f, duration)} oy={1200}>
        <Sky top="#161D2B" bottom="#222C3F" id="s2bg" />
        <rect y={floor} width={1080} height={420} fill="#141A26" />
        <rect y={floor} width={1080} height={6} fill="#2E394E" />
        <rect
          x={720}
          y={600}
          width={260}
          height={280}
          rx={8}
          fill="#0F1624"
          stroke="#33405A"
          strokeWidth={10}
        />
        <circle cx={900} cy={670} r={26} fill={C.ivory} opacity={0.75} />
        <line x1={850} y1={600} x2={850} y2={880} stroke="#33405A" strokeWidth={6} />
        <line x1={720} y1={740} x2={980} y2={740} stroke="#33405A" strokeWidth={6} />
        {/* doorway + opening door */}
        <rect x={90} y={720} width={240} height={780} fill="#46556F" />
        <rect x={90} y={720} width={240} height={780} fill="#7C8CA8" opacity={0.25 * door} />
        <g transform={`translate(90 0) scale(${lerp(1, 0.22, door)} 1)`}>
          <rect y={720} width={240} height={780} fill="#2A3345" />
          <circle cx={205} cy={1120} r={10} fill={C.pastDim} />
        </g>
        <rect x={80} y={710} width={260} height={14} fill="#1A2130" />
        <rect x={80} y={710} width={14} height={790} fill="#1A2130" />
        <rect x={326} y={710} width={14} height={790} fill="#1A2130" />
        {/* bed + nightstand lamp */}
        <rect x={580} y={1390} width={380} height={110} rx={10} fill="#3A4660" />
        <rect x={580} y={1390} width={380} height={34} rx={10} fill="#53627F" />
        <rect x={930} y={1250} width={34} height={250} rx={8} fill="#2A3447" />
        <rect x={880} y={1360} width={80} height={34} rx={14} fill="#6B7A96" />
        <rect x={985} y={1380} width={92} height={120} rx={6} fill="#242D3F" />
        <Glow x={1030} y={1320} r={360} color={C.dawn} o={0.3} id="s2lamp" />
        <polygon points="1010,1362 1050,1362 1042,1318 1018,1318" fill={C.dawn} />
        <rect x={1028} y={1362} width={4} height={18} fill={dark} />
        <ellipse cx={1030} cy={1500} rx={60} ry={10} fill={C.dawn} opacity={0.15} />
        {/* bag shadow + bag */}
        <ellipse cx={bagX} cy={floor + 6} rx={50} ry={9} fill="#000" opacity={f >= fd ? 0.4 : 0} />
        <g transform={`translate(${bagX} ${bagY})`}>
          <path d="M-18 -30 Q0 -62 18 -30" stroke="#5B6880" strokeWidth={7} fill="none" />
          <rect x={-42} y={-30} width={84} height={64} rx={12} fill="#7C8CA8" />
        </g>
        <ellipse cx={xw} cy={floor + 8} rx={95} ry={14} fill="#000" opacity={0.35 * (1 - sitT)} />
        <Fig x={xw} y={hipY} scale={k} pose={pose} face="none" flip color={C.past} />
        {/* thought bubble */}
        <g opacity={bub} transform={`translate(0 ${(1 - bub) * 24})`}>
          <circle
            cx={612}
            cy={1128}
            r={11}
            fill="rgba(238,242,250,.16)"
            stroke={C.past}
            strokeWidth={3}
          />
          <circle
            cx={590}
            cy={1078}
            r={18}
            fill="rgba(238,242,250,.16)"
            stroke={C.past}
            strokeWidth={3}
          />
          <ellipse
            cx={540}
            cy={970}
            rx={260}
            ry={80}
            fill="#2B3650"
            stroke={C.past}
            strokeWidth={4}
          />
          <text
            x={540}
            y={984}
            textAnchor="middle"
            fontFamily={Lora}
            fontStyle="italic"
            fontSize={42}
            fill={C.text}
          >
            mai cố thêm chút nữa
          </text>
        </g>
      </Svg>
      <Captions sec={sec} duration={duration} parts={parts} accents={['mệt rã rời', '']} />
    </AbsoluteFill>
  );
};

// ---------------- S3: phone, others race ahead, "mình" barely moves ----------------
export const CamonS3: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration} = CAMON_SHOTS.s3;
  const parts = [
    'Là những lúc thấy người khác tiến nhanh quá,',
    'mình cũng chạnh lòng chứ.',
    'Mình tự hỏi liệu bản thân có đang làm đủ tốt không.',
  ];
  const [p0, p1, p2] = partStarts(parts, sec);
  const open = ramp(f, 0, 12);
  const rows = [
    {y: 160, c: '#7FB2FF', n: 'Hà'},
    {y: 320, c: '#8FD9C8', n: 'Tú'},
    {y: 480, c: '#F2B48C', n: 'Thảo'},
  ];
  const dim = ramp(f, p1, 16);
  const mood = mixHex('#C9DBF5', C.past, dim * 0.35);
  const sit = {...SIT, head: [14, -222]} as typeof SIT;
  return (
    <AbsoluteFill style={{background: C.night}}>
      <Svg scale={kb(f, duration)} oy={1100}>
        <Sky top="#141A27" bottom="#1F283A" id="s3bg" />
        <Glow x={610} y={1080} r={800} color="#6E96D8" o={0.28} id="s3g" />
        {/* seated figure, face lit by the screen */}
        <Glow x={177} y={1451} r={150} color="#BFD6FF" o={0.45} id="s3face" />
        <polygon points="330,1400 330,1590 200,1480 200,1440" fill="#BFD6FF" opacity={0.08} />
        <ellipse cx={180} cy={1722} rx={150} ry={16} fill="#000" opacity={0.35} />
        <Fig
          x={170}
          y={1620 + bob(f) * 0.3}
          scale={0.75}
          pose={sit}
          face="calm"
          color={mood}
          ink="#35435F"
        />
        {/* phone */}
        <g
          transform={`translate(655 1110) rotate(-3) scale(${lerp(1.05, 1.18, open)}) translate(-270 -470)`}
          opacity={open}
        >
          <rect
            x={-14}
            y={-14}
            width={568}
            height={968}
            rx={58}
            fill="#0A0E16"
            stroke="#3A465E"
            strokeWidth={6}
          />
          <rect width={540} height={940} rx={46} fill="#161E2E" />
          <text x={36} y={70} fontFamily="Inter" fontWeight={650} fontSize={40} fill="#AAB8D0">
            Bảng tin
          </text>
          <text
            x={504}
            y={68}
            textAnchor="end"
            fontFamily="Inter"
            fontWeight={650}
            fontSize={30}
            fill="#8E9CB6"
          >
            minh hoạ
          </text>
          {rows.map((r, i) => {
            const g = ramp(f, p0 + 4 + i * 7, 22, EASE.out),
              over = ramp(f, p0 + 30 + i * 7, 60, EASE.smooth);
            const w = 420 * Math.min(1, 0.1 + g * 0.9) + over * 0;
            const ar = ramp(f, p0 + 20 + i * 7, 10);
            return (
              <g key={i} transform={`translate(36 ${r.y})`}>
                <circle cx={28} cy={0} r={28} fill={r.c} opacity={0.95} />
                <text
                  x={74}
                  y={14}
                  fontFamily="Inter"
                  fontWeight={650}
                  fontSize={42}
                  fill="#E6EDF9"
                  stroke="#E6EDF9"
                  strokeWidth={1}
                >
                  {r.n}
                </text>
                <rect y={50} width={468} height={40} rx={20} fill="#222C40" />
                <rect y={50} width={w + 48 * g} height={40} rx={20} fill={r.c} />
                <g
                  opacity={ar}
                  transform={`translate(${430 + over * 14} ${-8 - ar * 6 - over * 8}) scale(${0.8 + ar * 0.3})`}
                >
                  <path
                    d="M0 18 L26 -8 M10 -8 H26 V8"
                    stroke={r.c}
                    strokeWidth={9}
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              </g>
            );
          })}
          <g transform="translate(36 700)" opacity={0.6 + 0.4 * dim}>
            <circle cx={28} cy={0} r={28} fill={C.past} />
            <text
              x={74}
              y={14}
              fontFamily="Inter"
              fontWeight={650}
              fontSize={42}
              fill={C.text}
              stroke={C.text}
              strokeWidth={1}
            >
              mình
            </text>
            <rect y={50} width={468} height={40} rx={20} fill="#222C40" />
            <rect y={50} width={60} height={40} rx={20} fill={C.past} />
          </g>
          <rect x={190} y={900} width={160} height={8} rx={4} fill="#3A465E" />
        </g>
        {/* question marks drift up in the second sentence */}
        {[0, 1, 2].map((i) => {
          const q = ramp(f, p2 + i * 9, 40, EASE.out);
          return (
            <text
              key={i}
              x={330 + i * 230 + (hash(i + 5) - 0.5) * 40}
              y={610 - q * 40 - i * 10}
              fontFamily={Lora}
              fontStyle="italic"
              fontSize={130 - i * 10}
              fill={C.past}
              opacity={Math.min(q * 3, 1) * 0.42}
              textAnchor="middle"
              transform={`rotate(${(i - 1) * 10} ${330 + i * 230} 560)`}
            >
              ?
            </text>
          );
        })}
      </Svg>
      <Captions
        sec={sec}
        duration={duration}
        parts={parts}
        accents={['', 'chạnh lòng', 'đủ tốt']}
      />
    </AbsoluteFill>
  );
};
