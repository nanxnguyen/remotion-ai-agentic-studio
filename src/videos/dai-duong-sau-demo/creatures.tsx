import React from 'react';

/** Sunlit scuba diver + sea turtle silhouette for the 0-3s hook. */
export const DiverHookSvg: React.FC<{frame: number}> = ({frame}) => {
  const bob = Math.sin(frame * 0.08) * 14;
  const finKick = Math.sin(frame * 0.25) * 10;

  return (
    <svg width={900} height={900} viewBox="0 0 900 900">
      <defs>
        <linearGradient id="sunray" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="rgba(180,245,255,0.45)" />
          <stop offset="100%" stopColor="rgba(180,245,255,0)" />
        </linearGradient>
        <linearGradient id="diverSuit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>
      </defs>

      {/* Sunbeams */}
      <polygon points="180,0 320,0 480,900 120,900" fill="url(#sunray)" />
      <polygon points="480,0 640,0 820,900 500,900" fill="url(#sunray)" opacity={0.7} />

      {/* Diver */}
      <g transform={`translate(240, ${380 + bob}) rotate(-18)`}>
        {/* Oxygen tank */}
        <rect
          x={85}
          y={-28}
          width={115}
          height={38}
          rx={18}
          fill="#eab308"
          stroke="#0f172a"
          strokeWidth={5}
        />
        {/* Torso */}
        <path
          d="M60,10 C120,0 200,8 235,34 L220,76 C160,72 95,62 55,48 Z"
          fill="url(#diverSuit)"
          stroke="#38bdf8"
          strokeWidth={3}
        />
        {/* Head + Mask */}
        <circle cx={260} cy={46} r={30} fill="#1e293b" stroke="#38bdf8" strokeWidth={3} />
        <rect x={264} y={32} width={22} height={22} rx={6} fill="#38bdf8" opacity={0.85} />
        {/* Legs & Fins */}
        <g transform={`rotate(${finKick}, 65, 32)`}>
          <path
            d="M65,24 L-40,12 L-85,-8 L-78,24 L-35,36 L65,42 Z"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth={3}
          />
        </g>
        <g transform={`rotate(${-finKick}, 65, 42)`}>
          <path
            d="M65,36 L-35,52 L-82,70 L-70,40 L-30,36 Z"
            fill="#020617"
            stroke="#38bdf8"
            strokeWidth={3}
          />
        </g>
        {/* Bubbles from mask */}
        <circle cx={295} cy={10 - (frame % 40) * 3} r={7} fill="rgba(224,242,254,0.65)" />
        <circle cx={312} cy={-15 - ((frame + 15) % 40) * 3} r={5} fill="rgba(224,242,254,0.5)" />
      </g>
    </svg>
  );
};

/** Colorful Tropical Reef Fish (MẶT BIỂN). */
export const TropicalFishSvg: React.FC<{frame: number}> = ({frame}) => {
  const tailWag = Math.sin(frame * 0.25) * 12;
  const bob = Math.sin(frame * 0.1) * 10;

  return (
    <svg width={560} height={360} viewBox="0 0 560 360" style={{transform: `translateY(${bob}px)`}}>
      <defs>
        <linearGradient id="fishBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="55%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="fishFin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {/* Tail */}
      <g transform={`rotate(${tailWag}, 145, 180)`}>
        <path
          d="M150,180 L48,108 C72,155 72,205 48,252 Z"
          fill="url(#fishFin)"
          stroke="#0f172a"
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </g>
      {/* Dorsal & Ventral Fins */}
      <path
        d="M185,112 C230,40 335,45 395,112 Z"
        fill="url(#fishFin)"
        stroke="#0f172a"
        strokeWidth={5}
      />
      <path
        d="M210,248 C255,305 330,295 370,244 Z"
        fill="url(#fishFin)"
        stroke="#0f172a"
        strokeWidth={5}
      />
      {/* Body */}
      <path
        d="M140,180 C180,88 380,82 475,180 C380,278 180,272 140,180 Z"
        fill="url(#fishBody)"
        stroke="#0f172a"
        strokeWidth={6}
      />
      {/* Stripes */}
      <path
        d="M350,122 C335,160 335,200 350,238"
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <path
        d="M285,112 C270,158 270,202 285,248"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      {/* Pectoral Fin */}
      <path
        d="M335,190 C300,175 275,212 315,232 C345,235 352,205 335,190 Z"
        fill="#fde047"
        stroke="#0f172a"
        strokeWidth={4}
      />
      {/* Eye */}
      <circle cx={420} cy={164} r={16} fill="#ffffff" stroke="#0f172a" strokeWidth={4} />
      <circle cx={424} cy={164} r={8} fill="#0f172a" />
      <circle cx={427} cy={160} r={3} fill="#ffffff" />
    </svg>
  );
};

/** Spotted Stingray / Manta Ray (100 MÉT). */
export const StingraySvg: React.FC<{frame: number}> = ({frame}) => {
  const wing = Math.sin(frame * 0.16) * 16;

  return (
    <svg width={640} height={640} viewBox="0 0 640 640">
      <defs>
        <radialGradient id="rayBody" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="65%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>
      </defs>
      {/* Tail */}
      <path
        d={`M320,420 Q${320 + wing * 1.4},530 ${312 - wing},615`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={14}
        strokeLinecap="round"
      />
      {/* Wings */}
      <path
        d={`M320,105 C425,130 ${565},${240 + wing} 550,310 C535,365 405,405 320,435 C235,405 105,365 90,310 C75,240 215,${130 - wing * 0.5} 320,105 Z`}
        fill="url(#rayBody)"
        stroke="#1e293b"
        strokeWidth={6}
      />
      {/* Pinkish underside gills / mouth */}
      <ellipse cx={320} cy={260} rx={58} ry={82} fill="rgba(244,114,182,0.28)" />
      <path
        d="M292,205 Q320,220 348,205"
        fill="none"
        stroke="#334155"
        strokeWidth={5}
        strokeLinecap="round"
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path
            d={`M282,${245 + i * 18} Q296,${252 + i * 18} 308,${246 + i * 18}`}
            fill="none"
            stroke="#475569"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <path
            d={`M358,${245 + i * 18} Q344,${252 + i * 18} 332,${246 + i * 18}`}
            fill="none"
            stroke="#475569"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
      ))}
      {/* Eyes */}
      <circle cx={274} cy={176} r={10} fill="#0f172a" />
      <circle cx={366} cy={176} r={10} fill="#0f172a" />
    </svg>
  );
};

/** Great White Shark (332 MÉT). */
export const SharkSvg: React.FC<{frame: number}> = ({frame}) => {
  const tail = Math.sin(frame * 0.2) * 14;
  return (
    <svg width={760} height={360} viewBox="0 0 760 360">
      <defs>
        <linearGradient id="sharkTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="62%" stopColor="#64748b" />
          <stop offset="63%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      {/* Tail fin */}
      <g transform={`rotate(${tail}, 175, 190)`}>
        <path
          d="M180,190 L52,95 L98,190 L64,270 Z"
          fill="#475569"
          stroke="#0f172a"
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </g>
      {/* Dorsal fin */}
      <path
        d="M350,126 L310,32 C375,54 415,92 435,126 Z"
        fill="#475569"
        stroke="#0f172a"
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {/* Body */}
      <path
        d="M165,190 C245,105 535,100 715,186 C645,235 450,255 165,190 Z"
        fill="url(#sharkTop)"
        stroke="#0f172a"
        strokeWidth={6}
      />
      {/* Pectoral fin */}
      <path
        d="M475,216 L390,312 L440,290 L525,222 Z"
        fill="#475569"
        stroke="#0f172a"
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {/* Gill slits */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M530,${162 + i * 2} Q522,185 530,${206 - i * 2}`}
          transform={`translate(${i * 11}, 0)`}
          fill="none"
          stroke="#0f172a"
          strokeWidth={3.5}
          strokeLinecap="round"
        />
      ))}
      {/* Mouth & Teeth */}
      <path
        d="M635,205 Q665,212 690,196"
        fill="none"
        stroke="#0f172a"
        strokeWidth={5}
        strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx={650} cy={168} r={9} fill="#020617" />
      <circle cx={652} cy={166} r={3} fill="#ffffff" />
    </svg>
  );
};

/** Orca / Killer Whale (332 MÉT). */
export const OrcaSvg: React.FC<{frame: number}> = ({frame}) => {
  const bob = Math.cos(frame * 0.12) * 10;
  return (
    <svg width={700} height={320} viewBox="0 0 700 320" style={{transform: `translateY(${bob}px)`}}>
      {/* Dorsal fin */}
      <path
        d="M350,115 L315,24 C370,40 400,78 418,118 Z"
        fill="#090d16"
        stroke="#1e293b"
        strokeWidth={4}
      />
      {/* Tail */}
      <path d="M135,180 L48,145 L78,185 L42,222 Z" fill="#090d16" />
      {/* Body */}
      <path
        d="M125,180 C215,100 490,95 645,178 C575,236 330,248 125,180 Z"
        fill="#090d16"
        stroke="#1e293b"
        strokeWidth={5}
      />
      {/* White belly & eye patch */}
      <path d="M310,224 C410,234 555,215 620,188 C550,195 450,188 380,206 Z" fill="#f8fafc" />
      <ellipse cx={545} cy={150} rx={36} ry={15} transform="rotate(-12 545 150)" fill="#f8fafc" />
      {/* Pectoral fin */}
      <path
        d="M445,205 L385,288 C435,285 475,248 485,212 Z"
        fill="#090d16"
        stroke="#1e293b"
        strokeWidth={4}
      />
    </svg>
  );
};

/** Giant Spider Crab + Diver Scale Comparison (632 MÉT). */
export const SpiderCrabScaleSvg: React.FC<{frame: number}> = ({frame}) => {
  const legTwitch = Math.sin(frame * 0.15) * 6;

  return (
    <svg width={860} height={820} viewBox="0 0 860 820">
      <defs>
        <radialGradient id="crabShell" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="65%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </radialGradient>
      </defs>

      {/* Human Diver Silhouette behind for scale */}
      <g transform="translate(368, 45)" opacity={0.9}>
        <circle cx={62} cy={40} r={34} fill="#38bdf8" stroke="#0f172a" strokeWidth={5} />
        <rect
          x={28}
          y={82}
          width={68}
          height={155}
          rx={20}
          fill="#1e293b"
          stroke="#38bdf8"
          strokeWidth={4}
        />
        <rect x={32} y={240} width={26} height={160} rx={10} fill="#0f172a" />
        <rect x={66} y={240} width={26} height={160} rx={10} fill="#0f172a" />
      </g>

      {/* Articulated Crab Legs (Left & Right) */}
      {[-1, 1].map((side) => (
        <g key={side} transform={side === -1 ? 'scale(-1, 1) translate(-860, 0)' : undefined}>
          {/* Top Claw Arm */}
          <path
            d={`M485,255 L650,${135 + legTwitch} L720,${260 - legTwitch} L695,305`}
            fill="none"
            stroke="#ea580c"
            strokeWidth={22}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 2 */}
          <path
            d={`M500,285 L715,${220 - legTwitch} L790,${450 + legTwitch} L750,595`}
            fill="none"
            stroke="#c2410c"
            strokeWidth={18}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 3 */}
          <path
            d={`M495,315 L700,${360 + legTwitch} L765,${610 - legTwitch} L715,755`}
            fill="none"
            stroke="#ea580c"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 4 */}
          <path
            d={`M475,338 L620,${490 - legTwitch} L645,${715 + legTwitch}`}
            fill="none"
            stroke="#9a3412"
            strokeWidth={15}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      {/* Crab Carapace */}
      <ellipse
        cx={430}
        cy={275}
        rx={78}
        ry={88}
        fill="url(#crabShell)"
        stroke="#431407"
        strokeWidth={6}
      />
      <circle cx={404} cy={210} r={8} fill="#0f172a" />
      <circle cx={456} cy={210} r={8} fill="#0f172a" />

      {/* 3,8M Scale Bracket */}
      <line
        x1={65}
        y1={785}
        x2={795}
        y2={785}
        stroke="#ffffff"
        strokeWidth={5}
        strokeDasharray="12 10"
      />
      <line x1={65} y1={765} x2={65} y2={805} stroke="#ffffff" strokeWidth={5} />
      <line x1={795} y1={765} x2={795} y2={805} stroke="#ffffff" strokeWidth={5} />
    </svg>
  );
};

/** Glowing Red X (1000 MÉT - No Sunlight). */
export const GlowingRedXSvg: React.FC<{frame: number}> = ({frame}) => {
  const pulse = 1 + Math.sin(frame * 0.22) * 0.06;
  return (
    <svg width={620} height={620} viewBox="0 0 620 620" style={{transform: `scale(${pulse})`}}>
      <defs>
        <radialGradient id="xAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 215, 130, 0.85)" />
          <stop offset="55%" stopColor="rgba(192, 132, 252, 0.45)" />
          <stop offset="100%" stopColor="rgba(192, 132, 252, 0)" />
        </radialGradient>
      </defs>
      <circle cx={310} cy={310} r={270} fill="url(#xAura)" />
      <path
        d="M150,150 L470,470 M470,150 L150,470"
        stroke="#ffffff"
        strokeWidth={112}
        strokeLinecap="round"
      />
      <path
        d="M150,150 L470,470 M470,150 L150,470"
        stroke="#dc2626"
        strokeWidth={84}
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Deep-sea Goblin Shark (1000 MÉT). */
export const GoblinSharkSvg: React.FC<{frame: number}> = ({frame}) => {
  const jawOpen = Math.max(0, Math.sin(frame * 0.14)) * 18;

  return (
    <svg width={760} height={580} viewBox="0 0 760 580">
      <defs>
        <linearGradient id="goblinSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      {/* Body */}
      <path
        d="M140,560 C190,410 270,295 360,210 L495,280 C445,390 385,485 330,560 Z"
        fill="url(#goblinSkin)"
        stroke="#0f172a"
        strokeWidth={6}
      />
      {/* Long protruding snout */}
      <path
        d="M355,212 L595,38 L465,245 Z"
        fill="url(#goblinSkin)"
        stroke="#0f172a"
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {/* Upper jaw */}
      <path
        d={`M435,235 Q515,${200 - jawOpen * 0.3} 570,248 L475,270 Z`}
        fill="#fda4af"
        stroke="#0f172a"
        strokeWidth={5}
      />
      {/* Lower jaw */}
      <path
        d={`M455,285 Q525,${318 + jawOpen} 562,272 L485,265 Z`}
        fill="#fb7185"
        stroke="#0f172a"
        strokeWidth={5}
      />
      {/* Needle teeth */}
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon
          key={i}
          points={`${480 + i * 16},245 ${486 + i * 16},264 ${492 + i * 16},245`}
          fill="#f8fafc"
        />
      ))}
      {/* Glowing deep-sea eye */}
      <circle cx={438} cy={196} r={10} fill="#020617" stroke="#38bdf8" strokeWidth={3} />
    </svg>
  );
};
