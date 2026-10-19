// Kit — ban-khong-yeu-duoi-chi-da-manh-qua-lau (Phase 3c prototype).
// Tokens live in docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/design-spec.md §2–§5.
// Hero asset class: one consistent stylised vector figure + typography. No photo, no actor,
// no stock footage. Every micro-action is a frame-driven property of the figure (script.md §2.3).
// Nothing here reads wall-clock time or unseeded randomness: `hash()` is a pure function of the
// frame index and a fixed seed, so two renders of the same frame are byte-identical.
import React from 'react';
import {staticFile, useCurrentFrame} from 'remotion';

import {EASE, Grain, ramp} from './lib/polish';

// ───────────────────────────── 1 · Palette (design-spec §2) ─────────────────────────────

/**
 * Deep navy + soft grey, ONE warm amber. The whole film is these two families plus a
 * single amber that is *absent* at frame 0 and arrives exactly once (L1, shot `a1`).
 * Invariant: she is wet (dark + specular) from frame 0; the child is dry (matte, lighter)
 * for the whole runtime. Never swap a GREY for a NAVY on the child's coat.
 */
export const PAL = {
  // navy family — sky, facades, wet cloth
  night0: '#04090F',
  night1: '#0A141D',
  night2: '#11202C',
  night3: '#1B2E3C',
  // soft grey family — dry cloth, text, mist
  grey0: '#6B7A85', // the child's dry coat: matte, and LIGHTER than her wet sleeve
  grey1: '#A7B4BE',
  grey2: '#DCE3EA', // caption / headline ink
  grey3: '#F2F6F9',
  // wet cloth — same navy hue family, but darker value + a cold specular sheen
  wet0: '#0C1A26',
  wet1: '#16303F',
  sheen: '#8FB6CE',
  // the two baseline lights of L0 (present from frame 0, this is the world, not the turn)
  sodium: '#C49A6B', // cold-warm street lamp behind her
  window: '#E9C89B', // one lit apartment window across the street
  // THE one amber arrival (L1 → L4). Absent at frame 0.
  amber: '#F0B45F',
  amberHot: '#FFDCA6',
  // the phone screen is cold, never amber — it is the coldest light in the film
  screen: '#9CC0DC',
} as const;

/** Light plan ids — script.md §2.1, published once, never re-claimed. */
export const LIGHT = {
  L0: 'L0', // baseline sodium + far window, present from frame 0
  L1: 'L1', // the one arrival: a warm sliver on the edge of her collar (a1)
  L2: 'L2', // the same sliver, wider, on her hands + the closed umbrella (s7)
  L3: 'L3', // the palette turns: full warm rim, the navy drains out (s9 → img2)
  L4: 'L4', // warmest and steadiest, two sources (s10)
} as const;

export type LightId = (typeof LIGHT)[keyof typeof LIGHT];

// ───────────────────────────── 2 · Fonts (design-spec §3) ─────────────────────────────

/**
 * Be Vietnam Pro SemiBold (SIL OFL 1.1) — designed for Vietnamese, loaded with the
 * `vietnamese` unicode-range FIRST so the browser never measures a fallback face and
 * clips a diacritic. Literata Bold (SIL OFL 1.1) — one serif, used only on the silent
 * END card, where a book voice is the point.
 */
export const FONT = {
  sans: "'Be Vietnam Pro', 'Lexend', system-ui, sans-serif",
  serif: "'Literata', Georgia, serif",
} as const;

// unicode-range blocks, copied from the repo's other story prototypes so the VN face
// wins for Vietnamese codepoints and the Latin face only serves what is actually Latin.
const VN =
  'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,' +
  'U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB';
const LE =
  'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,' +
  'U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,' +
  'U+A720-A7FF';
const LA =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,' +
  'U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

const face = (fam: string, weight: number, file: string, range: string) =>
  `@font-face{font-family:'${fam}';font-weight:${weight};font-style:normal;font-display:block;` +
  `src:url('${staticFile('fonts/' + file)}') format('woff2');unicode-range:${range}}`;

export const BKYDFonts: React.FC = () => (
  <style>{`
${face('Be Vietnam Pro', 600, 'BeVietnamPro-SemiBold-VN.woff2', VN)}
${face('Be Vietnam Pro', 600, 'BeVietnamPro-SemiBold-LatinExt.woff2', LE)}
${face('Be Vietnam Pro', 600, 'BeVietnamPro-SemiBold-Latin.woff2', LA)}
${face('Literata', 700, 'Literata-Bold-VN.woff2', VN)}
${face('Literata', 700, 'Literata-Bold-LA.woff2', LA)}
`}</style>
);

// ───────────────────────────── 3 · Deterministic scatter ─────────────────────────────

/** Pure hash of (seed, index). No Math.random anywhere in this file (rule C4). */
export const hash = (seed: number, i: number) => {
  const x = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ───────────────────────────── 4 · Figure treatment (design-spec §4) ─────────────────────────────

/**
 * One stylised figure, drawn from plates in a 300 × 640 local box (y=0 head-top,
 * y=640 feet). `wetness` is the single scalar that carries the film's polarity:
 *   0 → dry, matte
 *   1 → a dark glaze down the right sleeve and shoulder plus a cold specular sheen
 * The child uses the SAME box with a different scale and is never given a wetness
 * above 0 — that is how "the child stays dry for the whole runtime" is guaranteed
 * mechanically rather than by convention.
 */
export type FigureProps = Readonly<{
  wetness?: number; // 0..1
  blink?: number; // 0..1, 1 = eyes closed
  headTilt?: number; // degrees
  mouth?: 'closed' | 'open' | 'down'; // the stylised mouth plate
  coat?: 'navy' | 'grey'; // her coat vs the child's dry coat — the film's whole polarity
  umbrella?: boolean;
  x: number;
  y: number;
  s: number;
  rim?: number; // 0..1 warm rim light on the right edge (L3/L4)
  edge?: number; // 0..1 cold lamp edge separating the silhouette from the night (L0)
  screen?: number; // 0..1 cold screen glow on the face (s3)
  handUp?: number; // 0..1 the hand raised to the umbrella handle
}>;

export const Figure: React.FC<FigureProps> = ({
  wetness = 0,
  blink = 0,
  headTilt = 0,
  mouth = 'closed',
  coat = 'navy',
  umbrella = false,
  x,
  y,
  s,
  rim = 0,
  edge = 0,
  screen = 0,
  handUp = 0,
}) => {
  const w = Math.max(0, Math.min(1, wetness));
  const eyeH = 5 * (1 - Math.max(0, Math.min(1, blink)));
  // The child wears a DIFFERENT family (soft grey, matte, lighter) and can never take a
  // wetness above 0 — that is how "the child stays dry for the whole runtime" is guaranteed
  // mechanically rather than by convention (script.md §2.2 / §6.1 CP2).
  const coatFill = coat === 'grey' ? '#8593A0' : '#16303F';
  const coatDark = coat === 'grey' ? '#5B6873' : '#0A1B26';
  const plate = coat === 'grey' ? '#94A1AC' : '#3C5262';
  // Two <svg> roots in one document must never share an id: url(#coat) would resolve to
  // whichever root the parser saw first and BOTH figures would wear the same paint.
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${s})`,
        transformOrigin: '0 0',
      }}
    >
      <svg
        width={300}
        height={660}
        viewBox="0 0 300 660"
        style={{overflow: 'visible', display: 'block'}}
      >
        <defs>
          <linearGradient id={`coat-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={coatDark} />
            <stop offset="62%" stopColor={coatFill} />
            <stop offset="100%" stopColor={coatDark} />
          </linearGradient>
          <linearGradient id={`wetSleeve-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#03080D" stopOpacity={0.62 + 0.34 * w} />
            <stop offset="55%" stopColor="#07131C" stopOpacity={0.55 + 0.42 * w} />
            <stop offset="100%" stopColor="#03080D" stopOpacity={0.4 + 0.4 * w} />
          </linearGradient>
          <linearGradient id={`wetSheen-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={PAL.sheen} stopOpacity={0} />
            <stop offset="34%" stopColor={PAL.sheen} stopOpacity={0.6 * w} />
            <stop offset="52%" stopColor="#CFE6F5" stopOpacity={0.3 * w} />
            <stop offset="100%" stopColor={PAL.sheen} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`warmRim-${uid}`} x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor={PAL.amberHot} stopOpacity={0.9 * rim} />
            <stop offset="14%" stopColor={PAL.amber} stopOpacity={0.4 * rim} />
            <stop offset="42%" stopColor={PAL.amber} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`coldEdge-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={PAL.sodium} stopOpacity={0.6 * edge} />
            <stop offset="20%" stopColor={PAL.sodium} stopOpacity={0.12 * edge} />
            <stop offset="58%" stopColor={PAL.sodium} stopOpacity={0} />
          </linearGradient>
          <radialGradient id={`screenGlow-${uid}`} cx="0.5" cy="0.3" r="0.75">
            <stop offset="0%" stopColor={PAL.screen} stopOpacity={0.55 * screen} />
            <stop offset="100%" stopColor={PAL.screen} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* legs — run past the frame bottom in a mid-shot */}
        <path d="M112 430 L150 430 L146 660 L104 660 Z" fill={coatDark} />
        <path d="M156 430 L196 430 L206 660 L160 660 Z" fill={coatDark} opacity={0.78} />

        {/* coat / torso */}
        <path
          d="M92 138 C92 126 104 120 150 120 C196 120 208 126 208 138 L232 452 C232 462 226 468 214 468 L86 468 C74 468 68 462 68 452 Z"
          fill={`url(#coat-${uid})`}
        />
        {/* coat seam + hem shadow so the silhouette reads at thumbnail */}
        <path d="M150 128 L150 466" stroke={PAL.night0} strokeWidth={2} opacity={0.5} />
        <path
          d="M74 436 C110 448 190 448 226 436 L232 452 C232 462 226 468 214 468 L86 468 C74 468 68 462 68 452 Z"
          fill={PAL.night0}
          opacity={0.45}
        />
        {/* collar — the exact edge L1 reaches for at `a1` */}
        <path
          d="M104 130 C122 118 178 118 196 130 L192 142 C176 132 124 132 108 142 Z"
          fill={coatDark}
        />

        {/* LEFT arm (image-left) — the one that holds the handle; raises with handUp */}
        <path
          d={
            umbrella
              ? `M96 146 C78 168 74 210 84 246 C92 276 110 296 ${132 - 12 * handUp} ${306 - 34 * handUp} L${150 - 12 * handUp} ${286 - 30 * handUp} C${136 - 12 * handUp} ${272 - 30 * handUp} ${120 - 12 * handUp} ${256 - 30 * handUp} ${114 - 12 * handUp} ${228 - 30 * handUp} C${108 - 12 * handUp} ${200 - 30 * handUp} ${110 - 12 * handUp} ${166 - 30 * handUp} ${118 - 12 * handUp} ${150 - 30 * handUp} Z`
              : 'M96 146 C74 172 68 224 78 268 C84 296 96 318 112 330 L134 312 C118 300 110 280 108 254 C106 220 112 180 122 158 Z'
          }
          fill={coatFill}
        />

        {/* RIGHT arm (image-right) — THE wet one. Same shape, always; only wetness changes. */}
        <path
          d="M204 146 C226 170 236 224 232 272 C230 300 222 322 210 336 L182 320 C194 306 200 288 200 262 C200 224 194 184 184 158 Z"
          fill={`url(#coat-${uid})`}
        />
        {/* the wet stripe: shoulder → elbow, value + sheen, no outline */}
        <path
          d="M206 140 C228 166 238 222 234 272 C232 300 224 322 212 338 L184 322 C196 308 202 290 202 262 C202 222 196 182 186 156 Z"
          fill={`url(#wetSleeve-${uid})`}
        />
        <path
          d="M206 140 C228 166 238 222 234 272 C232 300 224 322 212 338 L184 322 C196 308 202 290 202 262 C202 222 196 182 186 156 Z"
          fill={`url(#wetSheen-${uid})`}
        />
        {/* the specular that makes "wet" legible at thumbnail size */}
        <path
          d={`M${192 + 12 * w} ${146 + 20 * w} C${202 + 10 * w} ${194 + 28 * w} ${204 + 10 * w} ${250 + 28 * w} ${196 + 8 * w} ${312 + 20 * w}`}
          stroke="#CFE6F5"
          strokeWidth={3.2}
          strokeLinecap="round"
          fill="none"
          opacity={0.06 + 0.34 * w}
        />
        {/* hand */}
        <circle cx={196} cy={330} r={13} fill={coatDark} opacity={0.72 + 0.28 * w} />

        {/* neck + head plate */}
        <path d="M134 104 L166 104 L168 132 L132 132 Z" fill={coatDark} />
        <g transform={`rotate(${headTilt} 150 74)`}>
          <ellipse cx={150} cy={74} rx={52} ry={60} fill={plate} />
          {/* hair — a single mass over the crown; the only hair shape in the film */}
          <path
            d="M98 78 C96 24 126 4 150 4 C176 4 204 24 202 78 C202 62 192 44 176 40 C156 34 120 40 108 56 C102 64 100 70 98 78 Z"
            fill={coat === 'grey' ? '#3B4750' : PAL.night0}
          />
          <path
            d="M202 78 C208 96 206 120 198 132 L204 74 Z"
            fill={coat === 'grey' ? '#3B4750' : PAL.night0}
          />
          {/* two eye dots + a mouth plate: expressive without a rendered face */}
          <ellipse cx={133} cy={81} rx={3.4} ry={eyeH} fill={PAL.night0} opacity={0.72} />
          <ellipse cx={169} cy={81} rx={3.4} ry={eyeH} fill={PAL.night0} opacity={0.72} />
          {mouth === 'open' ? (
            <ellipse cx={152} cy={106} rx={6.5} ry={8.5} fill={PAL.night0} opacity={0.85} />
          ) : mouth === 'down' ? (
            <path
              d="M145 113 C149 106 157 106 160 113"
              stroke={PAL.night0}
              strokeWidth={2.6}
              fill="none"
              strokeLinecap="round"
              opacity={0.5}
            />
          ) : (
            <path
              d="M148 110 L156 110"
              stroke={PAL.night0}
              strokeWidth={2.6}
              strokeLinecap="round"
              opacity={0.62}
            />
          )}
          {/* cold screen glow on the face (s3 only) */}
          <ellipse cx={150} cy={80} rx={74} ry={78} fill={`url(#screenGlow-${uid})`} />
        </g>

        {/* cold lamp edge down the lamp side — L0, present from frame 0, never a "first" */}
        <path
          d="M92 138 C92 126 104 120 150 120 C120 122 104 130 100 146 L74 452 L92 452 Z"
          fill={`url(#coldEdge-${uid})`}
        />
        <path
          d="M96 146 C74 172 68 224 78 268 C84 296 96 318 112 330 L102 316 C92 300 86 276 84 252 C80 212 86 168 104 152 Z"
          fill={`url(#coldEdge-${uid})`}
        />

        {/* warm rim on the wet edge — L3/L4 only, never at L0 */}
        <path
          d="M92 138 C92 126 104 120 150 120 C196 120 208 126 208 138 L232 452 L214 452 L192 138 Z"
          fill={`url(#warmRim-${uid})`}
        />
        <path
          d="M204 146 C226 170 236 224 232 272 C230 300 222 322 210 336 L198 330 C208 314 214 294 214 268 C214 224 208 186 194 158 Z"
          fill={`url(#warmRim-${uid})`}
        />
      </svg>
    </div>
  );
};

/**
 * The child. Same plate system, smaller scale, `wetness` pinned to 0 by the type and the
 * coat swapped to the soft-grey family: the polarity of the film (script.md §2.2 /
 * §6.1 CP2) is a mechanical guarantee here, not a note in a design document.
 */
export const Child: React.FC<
  Omit<FigureProps, 'wetness' | 'rim' | 'screen' | 'umbrella' | 'coat'>
> = (props) => <Figure {...props} wetness={0} coat="grey" umbrella={false} />;

// ───────────────────────────── 5 · Reusable props ─────────────────────────────

/** The one black umbrella: scuffed metal tip, ribs, a shaft down to the hand, and a
 *  bead/drip cycle on the rim that is a fixed phase function of the frame index. */
export const Umbrella: React.FC<{
  cx: number;
  rimY: number;
  w: number;
  h: number;
  tilt: number; // degrees; negative = tilted toward the child (image-left)
  open: boolean;
  bead: number; // 0..1 progress of the beading/drip cycle
  warm?: number; // 0..1 warm light on the canopy (L4)
  shaft?: number; // px from the rim down to her hand
}> = ({cx, rimY, w, h, tilt, open = true, bead, warm = 0, shaft = 300}) => {
  const frame = useCurrentFrame();
  const rib = 5;
  const boxH = h + shaft + 90;
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg
      width={w + 90}
      height={boxH}
      viewBox={`0 0 ${w + 90} ${boxH}`}
      style={{position: 'absolute', left: cx - w / 2 - 45, top: rimY - h, overflow: 'visible'}}
    >
      <defs>
        <linearGradient id={`canopy-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26353F" />
          <stop offset="60%" stopColor="#111D27" />
          <stop offset="100%" stopColor="#070D13" />
        </linearGradient>
        <linearGradient id={`canopyWarm-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PAL.amber} stopOpacity={0} />
          <stop offset="76%" stopColor={PAL.amber} stopOpacity={0.3 * warm} />
          <stop offset="100%" stopColor={PAL.amberHot} stopOpacity={0.75 * warm} />
        </linearGradient>
        <linearGradient id={`shaftG-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#26333D" />
          <stop offset="45%" stopColor="#7E93A2" />
          <stop offset="100%" stopColor="#26333D" />
        </linearGradient>
      </defs>
      <g transform={`rotate(${tilt} ${w / 2} ${h})`}>
        {open ? (
          <g>
            {/* shaft from the peak down to the hand, then the hook */}
            <rect
              x={w / 2 - 4}
              y={2}
              width={8}
              height={h + shaft}
              rx={4}
              fill={`url(#shaftG-${uid})`}
            />
            <path
              d={`M${w / 2 - 4} ${h + shaft - 40} C${w / 2 - 40} ${h + shaft + 14} ${w / 2 + 8} ${h + shaft + 18} ${w / 2 + 6} ${h + shaft - 12}`}
              stroke="#2B3A46"
              strokeWidth={12}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M0 ${h} C0 ${h * 0.18} ${w * 0.5} ${-h * 0.18} ${w} ${h} Z`}
              fill={`url(#canopy-${uid})`}
            />
            <path
              d={`M0 ${h} C0 ${h * 0.18} ${w * 0.5} ${-h * 0.18} ${w} ${h} Z`}
              fill={`url(#canopyWarm-${uid})`}
            />
            {Array.from({length: rib + 1}).map((_, i) => {
              const x = (i / rib) * w;
              return (
                <path
                  key={i}
                  d={`M${x} ${h} C${x} ${h * 0.42} ${w / 2} ${-h * 0.06} ${w / 2} 6`}
                  stroke="#364853"
                  strokeWidth={1.8}
                  fill="none"
                  opacity={0.75}
                />
              );
            })}
            {/* scuffed metal tip — named in script.md §2.2, never contradicted later */}
            <rect x={w / 2 - 2.5} y={2} width={5} height={h - 4} rx={2.5} fill="#3A4C59" />
            <circle cx={w / 2} cy={8} r={5.5} fill="#A9BAC6" opacity={0.9} />
            {/* the rim's shadow band: it falls on the child, not on her */}
            <path
              d={`M0 ${h} L${w} ${h} L${w} ${h + 20} L0 ${h + 20} Z`}
              fill={PAL.night0}
              opacity={0.55}
            />
            {/* beads on the rim + drips — a fixed phase function of the frame index */}
            {Array.from({length: 11}).map((_, i) => {
              const bx = (i + 0.5) * (w / 11);
              const phase = (frame * 0.42 + hash(7, i) * 6) % 6;
              const drop = phase < 1.6 ? (phase / 1.6) * 210 : -1;
              return (
                <g key={`b${i}`}>
                  <circle
                    cx={bx}
                    cy={h + 7}
                    r={3.4}
                    fill={PAL.sheen}
                    opacity={0.55 + 0.3 * hash(3, i)}
                  />
                  {drop >= 0 ? (
                    <circle
                      cx={bx}
                      cy={h + 11 + drop}
                      r={2.8}
                      fill={PAL.sheen}
                      opacity={0.6 * (1 - drop / 210)}
                    />
                  ) : null}
                </g>
              );
            })}
            {bead < 1 ? null : null}
          </g>
        ) : (
          <g>
            {/* furled: the same object, closed — never a different umbrella */}
            <rect
              x={w / 2 - 17}
              y={16}
              width={34}
              height={shaft + h * 0.8}
              rx={17}
              fill="#0C1620"
            />
            <rect
              x={w / 2 - 17}
              y={16}
              width={34}
              height={shaft + h * 0.8}
              rx={17}
              fill={`url(#canopyWarm-${uid})`}
              opacity={0.9}
            />
            {Array.from({length: 5}).map((_, i) => (
              <rect
                key={i}
                x={w / 2 - 17}
                y={40 + i * ((shaft + h * 0.8) / 5.4)}
                width={34}
                height={3}
                rx={1.5}
                fill="#1C2C37"
              />
            ))}
            <circle cx={w / 2} cy={16} r={7} fill="#A9BAC6" opacity={0.9} />
            <path
              d={`M${w / 2 + 15} ${16 + shaft + h * 0.8} C${w / 2 + 52} ${16 + shaft + h * 0.8 + 22} ${w / 2 + 14} ${16 + shaft + h * 0.8 + 42} ${w / 2 + 14} ${16 + shaft + h * 0.8 + 4}`}
              stroke="#2B3A46"
              strokeWidth={13}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}
      </g>
    </svg>
  );
};

/** Wet pavement: the lower band of the frame, carrying the reflection of the two figures. */
export const WetPavement: React.FC<{y: number; warm?: number; rain?: number}> = ({
  y,
  warm = 0,
  rain = 0,
}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        bottom: 0,
        background: `linear-gradient(180deg, #35505F 0%, #23394A 40%, #13222D 100%)`,
      }}
    />
    {/* kerb: the one hard horizontal in the frame, so the ground plane reads */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y - 5,
        height: 6,
        background: '#4A6A7C',
        opacity: 0.95,
      }}
    />
    {/* wet sheen: the lamp's reflection smeared down the road, one pool per figure */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        bottom: 0,
        opacity: 0.9,
        background:
          `linear-gradient(180deg, rgba(170,206,228,0.26) 0%, rgba(143,182,206,0) 52%),` +
          `radial-gradient(ellipse 22% 130% at 66% 0%, rgba(170,206,228,0.34), rgba(143,182,206,0) 74%),` +
          `radial-gradient(ellipse 17% 120% at 34% 0%, rgba(170,206,228,0.20), rgba(143,182,206,0) 74%),` +
          `radial-gradient(ellipse 46% 130% at ${warm > 0 ? 34 : 18}% -10%, rgba(196,154,107,${0.16 + 0.14 * warm}), rgba(196,154,107,0) 72%)`,
      }}
    />
    {/* rain hitting the pavement: a thin static density band, never a downpour */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        height: 30,
        opacity: rain,
        background: `repeating-linear-gradient(74deg, rgba(220,227,234,0) 0px, rgba(220,227,234,0.34) 2px, rgba(220,227,234,0) 6px)`,
        maskImage: 'linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0))',
        WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0))',
      }}
    />
  </>
);

/** The sodium street lamp behind her and the one lit window across the street (L0). */
export const SodiumLamp: React.FC<{x: number; y: number; on?: boolean}> = ({x, y, on = true}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <svg width={620} height={620} viewBox="0 0 620 620" style={{display: 'block'}}>
      <defs>
        <radialGradient id="sodium" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={PAL.sodium} stopOpacity={on ? 0.62 : 0.22} />
          <stop offset="26%" stopColor={PAL.sodium} stopOpacity={on ? 0.24 : 0.08} />
          <stop offset="62%" stopColor={PAL.sodium} stopOpacity={on ? 0.07 : 0.02} />
          <stop offset="100%" stopColor={PAL.sodium} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={310} cy={310} r={310} fill="url(#sodium)" />
      <rect x={300} y={112} width={12} height={330} fill="#0A121A" opacity={0.92} />
      <ellipse cx={306} cy={108} rx={26} ry={11} fill="#F0D6AC" opacity={on ? 0.98 : 0.3} />
      <ellipse cx={306} cy={108} rx={46} ry={20} fill={PAL.sodium} opacity={on ? 0.4 : 0.1} />
    </svg>
  </div>
);

/** One lit apartment window across the street — a warmth she is not standing under. */
export const LitWindow: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  on?: boolean;
  warm?: number;
}> = ({x, y, w = 108, h = 132, on = true, warm = 0}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h}}>
    <div
      style={{
        position: 'absolute',
        inset: -18,
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(233,200,155,${(on ? 0.3 : 0.06) + 0.14 * warm}), rgba(233,200,155,0) 72%)`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(168deg, #F0D3A8 0%, ${PAL.window} 52%, #B98A56 100%)`,
        opacity: on ? 0.92 : 0.14,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: -6,
        bottom: -6,
        width: 4,
        background: PAL.night0,
        opacity: 0.72,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: -6,
        right: -6,
        top: '46%',
        height: 4,
        background: PAL.night0,
        opacity: 0.72,
      }}
    />
  </div>
);

/** Thin rain, deterministic on the frame index; density is a prop, never a downpour. */
export const Rain: React.FC<{count?: number; opacity?: number; speed?: number; seed?: number}> = ({
  count = 42,
  opacity = 0.3,
  speed = 1,
  seed = 11,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, opacity, pointerEvents: 'none'}}>
      {Array.from({length: count}).map((_, i) => {
        const x = hash(seed, i) * 1180 - 50;
        const phase =
          (hash(seed, i + 500) * 1900 + frame * (11 + 7 * hash(seed, i + 90)) * speed) % 1900;
        const y = phase - 220;
        const len = 34 + 60 * hash(seed, i + 300);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 1.6,
              height: len,
              background: `linear-gradient(180deg, rgba(215,226,234,0) 0%, rgba(215,226,234,0.75) 55%, rgba(215,226,234,0) 100%)`,
              transform: 'rotate(9deg)',
            }}
          />
        );
      })}
    </div>
  );
};

/** The kitchen-doorway sliver: L1 → L4, one arrival that only ever widens. */
export const DoorwaySliver: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  amount: number;
}> = ({x, y, w, h, amount}) =>
  amount <= 0.001 ? null : (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w * amount,
        height: h,
        background: `linear-gradient(90deg, rgba(240,180,95,0) 0%, rgba(240,180,95,${0.18 + 0.42 * amount}) 40%, rgba(255,226,180,${0.42 + 0.58 * amount}) 100%)`,
        filter: 'blur(9px)',
        mixBlendMode: 'screen',
      }}
    />
  );

// ───────────────────────────── 6 · Text layers (design-spec §3) ─────────────────────────────

/**
 * Cover headline `Ai che ô cho bạn?` — complete at frame 0, in the upper third, never in
 * the bottom 210 px. It CLEARS on the `s1 → s2a` boundary (script.md §2.2) — `clearAt`
 * is a frame index, not a re-render of the string.
 */
export const Headline: React.FC<{clearAt?: number; size?: number; top?: number}> = ({
  clearAt = 100,
  size = 64,
  top = 168,
}) => {
  const frame = useCurrentFrame();
  const k = ramp(frame, clearAt, 10, EASE.out);
  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        right: 72,
        top,
        textAlign: 'center',
        fontFamily: FONT.sans,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.22,
        letterSpacing: '-0.005em',
        color: PAL.grey2,
        textShadow: `0 2px 26px rgba(4,9,15,0.9)`,
        opacity: 1 - k,
        transform: `translateY(${(-10 * k).toFixed(2)}px)`,
      }}
    >
      Ai che ô cho bạn?
    </div>
  );
};

/**
 * Caption layer. Bottom 220 px keeps every glyph above the 210 px unsafe band
 * (1920 − 220 = 1700 < 1710). 62 px is above the Q11 56 px line and the repo's 54 px floor;
 * a scrim gradient keeps it readable over the wet pavement without a pill.
 */
export const Caption: React.FC<{lines: readonly string[]; visible?: boolean}> = ({
  lines,
  visible = true,
}) => {
  const frame = useCurrentFrame();
  const k = ramp(frame, 2, 8, EASE.out);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 380,
          opacity: visible ? 0.85 * k : 0,
          background: `linear-gradient(180deg, rgba(4,9,15,0) 0%, rgba(4,9,15,0.62) 42%, rgba(4,9,15,0.9) 100%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 76,
          right: 76,
          bottom: 220,
          textAlign: 'center',
          fontFamily: FONT.sans,
          fontWeight: 600,
          fontSize: 62,
          lineHeight: 1.26,
          letterSpacing: '-0.004em',
          color: PAL.grey3,
          textShadow: `0 2px 22px rgba(4,9,15,0.95)`,
          opacity: visible ? k : 0,
        }}
      >
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </>
  );
};

/** Recreated-UI label — the only place the word `minh hoạ` ever appears. */
export const MinhHoa: React.FC<{x: number; y: number}> = ({x, y}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      fontFamily: FONT.sans,
      fontWeight: 600,
      fontSize: 34,
      letterSpacing: '0.01em',
      color: PAL.grey1,
      opacity: 0.78,
    }}
  >
    minh hoạ
  </div>
);

/** The one accent word inside a caption — Q11: a "to be read" word, so it gets colour + weight. */
export const AccentWord: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{color: PAL.amberHot, fontWeight: 600}}>{children}</span>
);

// ───────────────────────────── 7 · Grade ─────────────────────────────

/** Cold vignette + a faint film grain: wet-air atmosphere, not a stylised filter. */
export const NightGrade: React.FC<{warm?: number; strength?: number}> = ({
  warm = 0,
  strength = 0.42,
}) => (
  <>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background:
          `radial-gradient(ellipse 78% 62% at 50% 42%, rgba(4,9,15,0) 0%, rgba(4,9,15,${strength * 0.45}) 62%, rgba(4,9,15,${strength}) 100%),` +
          (warm > 0
            ? `radial-gradient(ellipse 80% 55% at 62% 52%, rgba(242,180,95,${0.1 * warm}), rgba(242,180,95,0) 70%)`
            : ''),
      }}
    />
    <Grain opacity={0.07} blend="soft-light" />
  </>
);
