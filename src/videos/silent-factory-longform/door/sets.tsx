import React from 'react';
import {INK, YELLOW, lerp} from './rig';

/** World constants for the door courtyard. */
export const GY = 900;
export const DOOR = {x0: 760, x1: 1160, top: 120, lockX: 1100, lockY: 745, handleY: 722};
export const HINGES = [
  {x: 760, y: 250},
  {x: 760, y: 510},
  {x: 760, y: 770},
] as const;

const WOOD = '#7A5236';
const WOOD_D = '#5A3B27';
const GOLD = '#FFC861';

/** Deterministic pseudo-random. */
export const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const Sky: React.FC<{dawn: number; px: number}> = ({dawn, px}) => {
  const top = mixColor('#0B1424', '#F0A35E', dawn);
  const bottom = mixColor('#1D2B45', '#FBD9A0', dawn);
  return (
    <g>
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect x={-1500} y={-800} width={5000} height={2700} fill="url(#sky)" />
      {dawn < 0.5 ? (
        <circle cx={1580 - px * 0.9} cy={150} r={56} fill="#E9EEF2" opacity={0.85} />
      ) : (
        <circle
          cx={1450 - px * 0.9}
          cy={lerp(520, 260, dawn)}
          r={110}
          fill="#FFE2A3"
          opacity={0.95}
        />
      )}
      {dawn < 0.5 &&
        Array.from({length: 40}, (_, i) => (
          <circle
            key={i}
            cx={rnd(i) * 3200 - 700 - px * 0.95}
            cy={rnd(i + 99) * 420 - 200}
            r={1.5 + rnd(i + 7) * 2}
            fill="#fff"
            opacity={0.35 + rnd(i + 3) * 0.4}
          />
        ))}
      <g transform={`translate(${-px * 0.8} 0)`} opacity={0.9}>
        {Array.from({length: 22}, (_, i) => (
          <rect
            key={i}
            x={-900 + i * 190}
            y={520 + rnd(i + 40) * 180}
            width={150 + rnd(i) * 60}
            height={700}
            fill={mixColor('#16213A', '#B98A6A', dawn)}
          />
        ))}
      </g>
    </g>
  );
};

export function mixColor(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((v, i) => Math.round(lerp(v, pb[i], Math.max(0, Math.min(1, t)))));
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
}

export type DoorState = {
  /** 0 closed .. 1 open (pivoting on the LOCK side once the hinge pins are out). */
  open: number;
  handle: 'on' | 'off';
  /** Pin extraction per hinge [top, middle, low]: 0 seated .. 1 pulled .. >1.4 removed. */
  pins: readonly [number, number, number];
  rust: number;
  glow: number;
  dawn: number;
  shake?: number;
  wedge?: boolean;
};

export const DoorWall: React.FC<{st: DoorState; px: number; t: number}> = ({st, px, t}) => {
  const wall = mixColor('#39415A', '#9C7E6C', st.dawn);
  const wallD = mixColor('#2B3247', '#7E6253', st.dawn);
  const w = DOOR.x1 - DOOR.x0;
  const panelW = w * Math.cos(st.open * 1.35);
  const sh = st.shake ?? 0;
  return (
    <g>
      <Sky dawn={st.dawn} px={px} />
      {/* stone wall */}
      <rect x={-600} y={70} width={3100} height={GY - 70} fill={wall} />
      {Array.from({length: 14}, (_, r) =>
        Array.from({length: 18}, (_, c) => (
          <rect
            key={r + '-' + c}
            x={-600 + c * 175 + (r % 2) * 85}
            y={70 + r * 60}
            width={170}
            height={56}
            fill="none"
            stroke={wallD}
            strokeWidth={4}
          />
        )),
      )}
      <rect x={-600} y={50} width={3100} height={30} fill={wallD} />
      {/* door frame + interior glow */}
      <rect
        x={DOOR.x0 - 30}
        y={DOOR.top - 30}
        width={w + 60}
        height={GY - DOOR.top + 30}
        fill={wallD}
      />
      <rect
        x={DOOR.x0}
        y={DOOR.top}
        width={w}
        height={GY - DOOR.top}
        fill={mixColor('#0A0D14', '#FCE6B8', st.glow)}
      />
      {st.glow > 0 && (
        <polygon
          points={`${DOOR.x0},${GY} ${DOOR.x1},${GY} ${DOOR.x1 + 380 * st.glow},1080 ${DOOR.x0 - 380 * st.glow},1080`}
          fill="#FCE6B8"
          opacity={0.4 * st.glow}
        />
      )}
      {/* door panel: anchored at lock side when it opens */}
      <g transform={`translate(${sh * Math.sin(t * 60)} 0)`}>
        <rect
          x={DOOR.x1 - panelW}
          y={DOOR.top}
          width={panelW}
          height={GY - DOOR.top}
          fill={st.open > 0.02 ? WOOD_D : WOOD}
          stroke={INK}
          strokeWidth={6}
        />
        {Array.from({length: 5}, (_, i) => (
          <line
            key={i}
            x1={DOOR.x1 - panelW + (panelW / 5) * i}
            x2={DOOR.x1 - panelW + (panelW / 5) * i}
            y1={DOOR.top}
            y2={GY}
            stroke={WOOD_D}
            strokeWidth={5}
          />
        ))}
        {[300, 600].map((y) => (
          <rect key={y} x={DOOR.x1 - panelW} y={y} width={panelW} height={26} fill="#3B3F4A" />
        ))}
        {st.open < 0.05 && (
          <>
            {HINGES.map((h, i) => (
              <Hinge key={i} x={h.x} y={h.y} rust={st.rust} pin={st.pins[i]} />
            ))}
            <LockPlate />
            {st.handle === 'on' && <Handle x={DOOR.lockX - 4} y={DOOR.handleY} a={0} />}
          </>
        )}
      </g>
      {st.wedge && (
        <rect
          x={DOOR.x1 - panelW - 40}
          y={GY - 26}
          width={60}
          height={26}
          fill="#C99A5B"
          stroke={INK}
          strokeWidth={4}
        />
      )}
      {/* ground */}
      <rect
        x={-600}
        y={GY}
        width={3100}
        height={400}
        fill={mixColor('#1A2133', '#7B6556', st.dawn)}
      />
      {Array.from({length: 26}, (_, i) => (
        <ellipse
          key={i}
          cx={-500 + i * 120 + (i % 3) * 20}
          cy={GY + 30 + (i % 4) * 40}
          rx={42}
          ry={10}
          fill={mixColor('#252E44', '#8C7564', st.dawn)}
        />
      ))}
    </g>
  );
};

export const Hinge: React.FC<{x: number; y: number; rust: number; pin: number}> = ({
  x,
  y,
  rust,
  pin,
}) => (
  <g>
    <rect
      x={x - 6}
      y={y - 34}
      width={110}
      height={68}
      rx={8}
      fill={mixColor('#5A6170', '#8A4B2A', rust)}
      stroke={INK}
      strokeWidth={5}
    />
    <rect
      x={x - 22}
      y={y - 44}
      width={32}
      height={88}
      rx={10}
      fill={mixColor('#6B7282', '#9A5530', rust)}
      stroke={INK}
      strokeWidth={5}
    />
    {Array.from({length: 8}, (_, i) => (
      <circle
        key={i}
        cx={x + 8 + rnd(i + x) * 85}
        cy={y - 26 + rnd(i + y) * 52}
        r={4 + rnd(i) * 5}
        fill="#B5652E"
        opacity={rust}
      />
    ))}
    {[20, 80].map((dx) => (
      <circle key={dx} cx={x + dx} cy={y} r={7} fill={INK} />
    ))}
    {/* hinge pin, slides upward as it is hammered out */}
    <rect
      x={x - 12}
      y={y - 64 - pin * 70}
      width={12}
      height={34}
      rx={4}
      fill="#9AA0AA"
      stroke={INK}
      strokeWidth={4}
      opacity={pin > 1.4 ? 0 : 1}
    />
  </g>
);

export const LockPlate: React.FC = () => (
  <g>
    <rect
      x={DOOR.lockX - 30}
      y={DOOR.lockY - 40}
      width={60}
      height={110}
      rx={10}
      fill="#B08A3E"
      stroke={INK}
      strokeWidth={5}
    />
    <circle cx={DOOR.lockX} cy={DOOR.lockY + 18} r={9} fill={INK} />
    <path
      d={`M ${DOOR.lockX - 5} ${DOOR.lockY + 22} L ${DOOR.lockX - 8} ${DOOR.lockY + 44} L ${DOOR.lockX + 8} ${DOOR.lockY + 44} L ${DOOR.lockX + 5} ${DOOR.lockY + 22} Z`}
      fill={INK}
    />
  </g>
);

export const Handle: React.FC<{x: number; y: number; a: number; s?: number}> = ({
  x,
  y,
  a,
  s = 1,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <circle cx={0} cy={0} r={12} fill="#C9A24E" stroke={INK} strokeWidth={4} />
    <rect
      x={-70}
      y={-9}
      width={72}
      height={18}
      rx={9}
      fill="#D8B35A"
      stroke={INK}
      strokeWidth={4}
    />
  </g>
);

export const Key: React.FC<{
  x: number;
  y: number;
  a?: number;
  s?: number;
  color?: string;
  bend?: number;
}> = ({x, y, a = 0, s = 1, color = '#AEB5C0', bend = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <circle cx={-26} cy={0} r={14} fill="none" stroke={color} strokeWidth={8} />
    <path
      d={`M -12 0 L 8 0 Q 20 ${bend * 10} 34 ${bend * 22}`}
      stroke={color}
      strokeWidth={8}
      fill="none"
      strokeLinecap="round"
    />
    <path
      d={`M 20 ${bend * 12} l 0 9 M 28 ${bend * 17} l 0 7`}
      stroke={color}
      strokeWidth={6}
      strokeLinecap="round"
    />
    <circle cx={-26} cy={0} r={14} fill="none" stroke={INK} strokeWidth={2} opacity={0.6} />
  </g>
);

export const KeyRing: React.FC<{x: number; y: number; swing: number; n?: number}> = ({
  x,
  y,
  swing,
  n = 6,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${swing})`}>
    <circle cx={0} cy={14} r={16} fill="none" stroke="#C9CED6" strokeWidth={5} />
    {Array.from({length: n}, (_, i) => (
      <Key
        key={i}
        x={(i - n / 2) * 7}
        y={42}
        a={70 + (i - n / 2) * 14}
        s={0.6}
        color={i % 2 ? '#B9C0CB' : '#C7A85C'}
      />
    ))}
  </g>
);

export const Sparks: React.FC<{x: number; y: number; t: number; on: boolean; color?: string}> = ({
  x,
  y,
  t,
  on,
  color = GOLD,
}) =>
  on ? (
    <g>
      {Array.from({length: 10}, (_, i) => {
        const ph = (t * 3 + rnd(i)) % 1;
        const ang = -Math.PI / 2 + (rnd(i + 5) - 0.5) * 2.4;
        const d = 20 + ph * 90;
        return (
          <circle
            key={i}
            cx={x + Math.cos(ang) * d}
            cy={y + Math.sin(ang) * d + ph * ph * 60}
            r={4 * (1 - ph) + 1}
            fill={color}
          />
        );
      })}
    </g>
  ) : null;

export const Particles: React.FC<{
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  t: number;
  n: number;
  color: string;
  fall?: number;
  r?: number;
}> = ({x0, x1, y0, y1, t, n, color, fall = 20, r = 3}) => (
  <g>
    {Array.from({length: n}, (_, i) => {
      const y =
        y0 +
        ((((rnd(i) * (y1 - y0) + t * fall * (0.6 + rnd(i + 2))) % (y1 - y0)) + (y1 - y0)) %
          (y1 - y0));
      return (
        <circle
          key={i}
          cx={x0 + rnd(i + 9) * (x1 - x0) + Math.sin(t + i) * 6}
          cy={y}
          r={r * (0.5 + rnd(i + 4))}
          fill={color}
          opacity={0.55}
        />
      );
    })}
  </g>
);

export const Ladder: React.FC<{x0: number; y0: number; x1: number; y1: number}> = ({
  x0,
  y0,
  x1,
  y1,
}) => {
  const n = 9;
  const dx = 46;
  return (
    <g stroke={INK} strokeWidth={6}>
      <line x1={x0 - dx / 2} y1={y0} x2={x1 - dx / 2} y2={y1} stroke="#B98953" strokeWidth={11} />
      <line x1={x0 + dx / 2} y1={y0} x2={x1 + dx / 2} y2={y1} stroke="#B98953" strokeWidth={11} />
      {Array.from({length: n}, (_, i) => {
        const k = (i + 0.5) / n;
        return (
          <line
            key={i}
            x1={lerp(x0, x1, k) - dx / 2}
            y1={lerp(y0, y1, k)}
            x2={lerp(x0, x1, k) + dx / 2}
            y2={lerp(y0, y1, k)}
            stroke="#8E6438"
            strokeWidth={8}
          />
        );
      })}
    </g>
  );
};

export const OilCan: React.FC<{x: number; y: number; a?: number}> = ({x, y, a = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    <rect
      x={-18}
      y={-14}
      width={36}
      height={30}
      rx={6}
      fill="#D04B3C"
      stroke={INK}
      strokeWidth={4}
    />
    <path d="M 16 -6 L 52 -26" stroke={INK} strokeWidth={6} strokeLinecap="round" />
  </g>
);

export const Hammer: React.FC<{x: number; y: number; a?: number; s?: number}> = ({
  x,
  y,
  a = 0,
  s = 1,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <rect
      x={-6}
      y={-60}
      width={12}
      height={70}
      rx={4}
      fill="#A87A45"
      stroke={INK}
      strokeWidth={3}
    />
    <rect
      x={-24}
      y={-74}
      width={48}
      height={20}
      rx={4}
      fill="#8D96A3"
      stroke={INK}
      strokeWidth={4}
    />
  </g>
);

export const FileTool: React.FC<{x: number; y: number; a?: number; s?: number}> = ({
  x,
  y,
  a = 0,
  s = 1,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <rect x={-4} y={-58} width={8} height={48} fill="#C1C7D0" stroke={INK} strokeWidth={2} />
    <rect x={-6} y={-12} width={12} height={22} rx={3} fill="#6A4A30" />
  </g>
);

export const Bench: React.FC<{x: number; y: number; w?: number}> = ({x, y, w = 360}) => (
  <g>
    <rect x={x} y={y} width={w} height={34} rx={6} fill="#9B6B42" stroke={INK} strokeWidth={5} />
    <rect
      x={x + 18}
      y={y + 34}
      width={22}
      height={GY - y - 34}
      fill="#7A5236"
      stroke={INK}
      strokeWidth={4}
    />
    <rect
      x={x + w - 40}
      y={y + 34}
      width={22}
      height={GY - y - 34}
      fill="#7A5236"
      stroke={INK}
      strokeWidth={4}
    />
  </g>
);

export const Toolbox: React.FC<{x: number; y: number; lid: number; glint: number}> = ({
  x,
  y,
  lid,
  glint,
}) => (
  <g>
    <rect
      x={x}
      y={y - 60}
      width={150}
      height={60}
      rx={6}
      fill="#C0453A"
      stroke={INK}
      strokeWidth={5}
    />
    {lid > 0.2 && (
      <g opacity={Math.min(1, lid * 1.5)}>
        <Hammer x={x + 40} y={y - 55} a={-20} s={0.8} />
        <FileTool x={x + 80} y={y - 50} a={10} />
        <path
          d={`M ${x + 100} ${y - 58} l 40 -30 l 6 10 l -38 26 z`}
          fill="#AEB5C0"
          stroke={INK}
          strokeWidth={3}
        />
        <Glint x={x + 90} y={y - 100} s={glint} />
      </g>
    )}
    <g transform={`rotate(${-lid * 110} ${x} ${y - 60})`}>
      <rect
        x={x}
        y={y - 76}
        width={150}
        height={18}
        rx={6}
        fill="#A93A30"
        stroke={INK}
        strokeWidth={5}
      />
    </g>
  </g>
);

export const Glint: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) =>
  s > 0.01 ? (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M 0 -26 L 6 -6 L 26 0 L 6 6 L 0 26 L -6 6 L -26 0 L -6 -6 Z"
      fill="#FFF3C4"
    />
  ) : null;

export const Lamp: React.FC<{x: number; y: number; on: number; rope?: number}> = ({
  x,
  y,
  on,
  rope = 160,
}) => (
  <g>
    <line x1={x} y1={y - rope} x2={x} y2={y} stroke={INK} strokeWidth={4} />
    {on > 0 && (
      <polygon
        points={`${x - 20},${y + 10} ${x + 20},${y + 10} ${x + 260},${GY} ${x - 260},${GY}`}
        fill="#FFD27A"
        opacity={0.2 * on}
      />
    )}
    <path
      d={`M ${x - 34} ${y + 22} Q ${x} ${y - 30} ${x + 34} ${y + 22} Z`}
      fill="#3E5A6E"
      stroke={INK}
      strokeWidth={4}
    />
    <circle cx={x} cy={y + 24} r={11} fill={on > 0 ? '#FFE7A8' : '#55606A'} />
  </g>
);

/** Interior behind the giant door. life: 0 empty .. 1 full workshop. */
export const Interior: React.FC<{
  life: number;
  lamp: number;
  dawn: number;
  px: number;
  t: number;
  chime?: boolean;
  wedge?: boolean;
}> = ({life, lamp, dawn, px, t, chime, wedge}) => {
  const wall = mixColor('#3B3A44', '#A07A5C', Math.max(lamp * 0.6, life * 0.8));
  return (
    <g>
      <rect x={-600} y={-300} width={3100} height={GY + 300} fill={wall} />
      {Array.from({length: 12}, (_, i) => (
        <line
          key={i}
          x1={-600 + i * 260}
          y1={-300}
          x2={-600 + i * 260}
          y2={GY}
          stroke={mixColor('#33323B', '#8E6A50', life)}
          strokeWidth={10}
        />
      ))}
      {/* giant doorway on the left showing the outside */}
      <rect
        x={60}
        y={120}
        width={400}
        height={GY - 120}
        fill={mixColor('#2A3A5E', '#FFD9A0', dawn)}
      />
      <rect x={30} y={90} width={460} height={30} fill={INK} opacity={0.6} />
      <polygon
        points={`60,${GY} 460,${GY} ${760 + px * 0.1},1080 ${-200},1080`}
        fill={mixColor('#4A5B80', '#FFD9A0', dawn)}
        opacity={0.35}
      />
      {/* opened door panel standing open along the right edge of the doorway */}
      <rect
        x={460}
        y={120}
        width={60}
        height={GY - 120}
        fill="#5A3B27"
        stroke={INK}
        strokeWidth={6}
      />
      {wedge && (
        <path d={`M 470 ${GY} l 70 0 l -70 -28 z`} fill="#C99A5B" stroke={INK} strokeWidth={4} />
      )}
      {/* window */}
      <rect
        x={1380}
        y={230}
        width={260}
        height={240}
        fill={mixColor('#1D2B45', '#FFE2A3', dawn)}
        stroke={INK}
        strokeWidth={8}
      />
      <line x1={1510} y1={230} x2={1510} y2={470} stroke={INK} strokeWidth={6} />
      <line x1={1380} y1={350} x2={1640} y2={350} stroke={INK} strokeWidth={6} />
      {life < 0.3 && (
        <g stroke="#9A9AA6" strokeWidth={2} opacity={0.6 * (1 - life * 3)} fill="none">
          <path d="M 1640 120 q -60 40 -110 0 M 1640 120 l -90 80 M 1640 120 l -30 110" />
          <path d="M 520 140 q 60 30 120 -10 M 520 140 l 90 70" />
        </g>
      )}
      {chime && <WindChime x={1450} y={250} t={t} />}
      {/* floor */}
      <rect x={-600} y={GY} width={3100} height={400} fill={mixColor('#2D2B33', '#7A5A44', life)} />
      {Array.from({length: 14}, (_, i) => (
        <line
          key={i}
          x1={-600 + i * 230}
          y1={GY}
          x2={-700 + i * 260}
          y2={1080}
          stroke="#000"
          opacity={0.15}
          strokeWidth={6}
        />
      ))}
      {life > 0.4 && (
        <g opacity={Math.min(1, (life - 0.4) * 3)}>
          <Bench x={1650} y={720} w={300} />
          <Lamp x={1800} y={420} on={1} rope={500} />
          <Bench x={580} y={740} w={240} />
        </g>
      )}
      {life < 0.5 && (
        <Particles
          x0={500}
          x1={1700}
          y0={120}
          y1={GY}
          t={t}
          n={40}
          color="#E7DCC4"
          fall={12}
          r={2.4}
        />
      )}
    </g>
  );
};

export const WindChime: React.FC<{x: number; y: number; t: number; s?: number}> = ({
  x,
  y,
  t,
  s = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line
      x1={-110}
      y1={0}
      x2={110}
      y2={0}
      stroke="#7A5236"
      strokeWidth={10}
      strokeLinecap="round"
    />
    {Array.from({length: 8}, (_, i) => {
      const sw = Math.sin(t * 2.3 + i * 0.9) * 12;
      const len = 60 + (i % 3) * 22;
      const kx = -95 + i * 27;
      return (
        <g key={i} transform={`rotate(${sw} ${kx} 0)`}>
          <line x1={kx} y1={0} x2={kx} y2={len} stroke="#D9D2C2" strokeWidth={2} />
          <Key
            x={kx}
            y={len + 22}
            a={90}
            s={0.75}
            color={i === 4 ? '#F5C34B' : i % 2 ? '#C7A85C' : '#B9C0CB'}
            bend={i === 3 ? 1 : 0}
          />
        </g>
      );
    })}
  </g>
);

/** Mira's tiny home workshop where she forges her own key. */
export const HomeBench: React.FC<{t: number; lamp: number}> = ({t, lamp}) => (
  <g>
    <rect x={-600} y={-300} width={3100} height={1500} fill="#2B2632" />
    {Array.from({length: 7}, (_, i) => (
      <rect
        key={i}
        x={300 + i * 200}
        y={200 + (i % 2) * 30}
        width={120}
        height={18}
        fill="#4A3E4E"
      />
    ))}
    {Array.from({length: 6}, (_, i) => (
      <Key key={i} x={340 + i * 200} y={190 + (i % 2) * 30} a={-90} s={0.8} color="#7F8794" />
    ))}
    <polygon
      points={`1100,330 1140,330 1420,${GY} 700,${GY}`}
      fill="#FFD27A"
      opacity={0.18 * lamp}
    />
    <path
      d="M 1080 330 L 1160 330 L 1200 260 L 1040 260 Z"
      fill="#3E5A6E"
      stroke={INK}
      strokeWidth={4}
    />
    <line x1={1120} y1={260} x2={1120} y2={-100} stroke={INK} strokeWidth={5} />
    <rect x={-600} y={GY} width={3100} height={400} fill="#1E1A22" />
    <Bench x={760} y={700} w={560} />
    {/* vise */}
    <rect x={1010} y={640} width={70} height={60} fill="#6F7884" stroke={INK} strokeWidth={5} />
    <rect x={990} y={620} width={110} height={24} fill="#8D96A3" stroke={INK} strokeWidth={4} />
    <circle cx={1180} cy={680} r={6} fill={YELLOW} opacity={0.4 + 0.3 * Math.sin(t * 3)} />
  </g>
);

/** Night bridge with fast foreground railing for parallax. */
export const Bridge: React.FC<{px: number; t: number}> = ({px}) => (
  <g>
    <Sky dawn={0} px={px} />
    <rect x={-1500} y={760} width={6000} height={400} fill="#0F1A2E" />
    {Array.from({length: 30}, (_, i) => (
      <line
        key={i}
        x1={-1500 + i * 220 - px * 0.3}
        y1={980 + (i % 3) * 25}
        x2={-1420 + i * 220 - px * 0.3}
        y2={980 + (i % 3) * 25}
        stroke="#5D7396"
        strokeWidth={4}
        opacity={0.5}
      />
    ))}
    <rect x={-1500} y={GY} width={6000} height={34} fill="#3A4560" />
    {Array.from({length: 18}, (_, i) => (
      <g key={i}>
        <line
          x1={-1300 + i * 420}
          y1={GY}
          x2={-1300 + i * 420}
          y2={520}
          stroke="#2A3550"
          strokeWidth={12}
        />
        <circle cx={-1300 + i * 420} cy={510} r={18} fill="#FFD98A" opacity={0.85} />
        <circle cx={-1300 + i * 420} cy={510} r={60} fill="#FFD98A" opacity={0.12} />
      </g>
    ))}
  </g>
);

export const BridgeRail: React.FC<{px: number}> = ({px}) => (
  <g transform={`translate(${-px * 0.6} 0)`}>
    <rect x={-2500} y={930} width={9000} height={16} fill="#131A28" />
    {Array.from({length: 70}, (_, i) => (
      <rect key={i} x={-2500 + i * 130} y={930} width={14} height={160} fill="#131A28" />
    ))}
  </g>
);
