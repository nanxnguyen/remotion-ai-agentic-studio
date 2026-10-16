import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {Fonts} from './Main';
import {TT_SFX, TT_SHOTS, TT_TOTAL, TT_VOICE_OFFSET} from './truongThanhTimeline';

// Style (user reference): nền đen, nhân vật que trắng, chữ trắng phía trên với từ nhấn cam, nhãn kênh nhỏ ở đáy.
const OR = '#f58b4c';
const GRAY = '#8f8f8f';
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const soft = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const sans: React.CSSProperties = {fontFamily: 'Inter', fontWeight: 700, color: '#fff'};
const mono: React.CSSProperties = {fontFamily: 'JetBrains Mono', color: '#fff'};
const sp = (frame: number, damping = 16, stiffness = 120) => spring({frame: Math.max(0, frame), fps: 30, config: {damping, stiffness, mass: 0.9}});
const vis = (f: number, a: number, b: number) => interpolate(f, [a, a + 8, b - 8, b], [a === 0 ? 1 : 0, 1, 1, 0], clamp);

// ---------- pictogram figure ----------
type V = [number, number];
type Pose = {head: V; sh: V; hip: V; eL: V; hL: V; eR: V; hR: V; kL: V; fL: V; kR: V; fR: V};
const STAND: Pose = {head: [0, -235], sh: [0, -150], hip: [0, 0], eL: [-75, -85], hL: [-85, -10], eR: [75, -85], hR: [85, -10], kL: [-32, 125], fL: [-42, 255], kR: [32, 125], fR: [42, 255]};
const SIT: Pose = {head: [10, -225], sh: [0, -145], hip: [0, 0], eL: [40, -70], hL: [110, -60], eR: [60, -60], hR: [130, -50], kL: [115, -5], fL: [125, 125], kR: [150, 0], fR: [160, 130]};
const UP: Pose = {...STAND, eL: [-85, -200], hL: [-105, -300], eR: [85, -200], hR: [105, -300]};
const mix = (a: Pose, b: Pose, t: number): Pose => {
  const o = {} as Pose;
  (Object.keys(a) as (keyof Pose)[]).forEach(k => { o[k] = [a[k][0] + (b[k][0] - a[k][0]) * t, a[k][1] + (b[k][1] - a[k][1]) * t]; });
  return o;
};
const walk = (f: number, amp = 1, base: Pose = STAND): Pose => {
  const s = Math.sin(f / 5) * amp;
  return {...base, kL: [-32 + s * 36, 125], fL: [-42 + s * 80, 255 - Math.abs(s) * 20], kR: [32 - s * 36, 125], fR: [42 - s * 80, 255 - Math.abs(s) * 20], hL: [-85 + s * 40, -10], hR: [85 - s * 40, -10]};
};

const Fig: React.FC<{x: number; y: number; pose: Pose; scale?: number; face?: 'frown' | 'smile' | 'o'; opacity?: number; flip?: boolean}> = ({x, y, pose: p, scale = 1, face = 'frown', opacity = 1, flip = false}) => {
  const L = (a: V, b: V, w: number) => <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#fff" strokeWidth={w} strokeLinecap="round" />;
  const [hx, hy] = p.head;
  return <g opacity={opacity} transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
    {L(p.hip, p.kL, 36)}{L(p.kL, p.fL, 36)}{L(p.hip, p.kR, 36)}{L(p.kR, p.fR, 36)}
    {L(p.sh, p.hip, 66)}
    {L(p.sh, p.eL, 30)}{L(p.eL, p.hL, 30)}{L(p.sh, p.eR, 30)}{L(p.eR, p.hR, 30)}
    <circle cx={hx} cy={hy} r="58" fill="#fff" />
    <circle cx={hx - 20} cy={hy - 8} r="6" fill="#000" /><circle cx={hx + 20} cy={hy - 8} r="6" fill="#000" />
    {face === 'frown' && <path d={`M ${hx - 20} ${hy + 26} Q ${hx} ${hy + 10} ${hx + 20} ${hy + 26}`} stroke="#000" strokeWidth="6" fill="none" strokeLinecap="round" />}
    {face === 'smile' && <path d={`M ${hx - 22} ${hy + 14} Q ${hx} ${hy + 34} ${hx + 22} ${hy + 14}`} stroke="#000" strokeWidth="6" fill="none" strokeLinecap="round" />}
    {face === 'o' && <circle cx={hx} cy={hy + 24} r="9" fill="#000" />}
  </g>;
};

const Stage: React.FC<{children: React.ReactNode}> = ({children}) => <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}><g transform="translate(540 1450) scale(1.2) translate(-540 -1360)">{children}</g></svg>;
const GY = 1360; // ground

// ---------- text on top (acts as caption) ----------
const Top: React.FC<{text: string; accent?: string}> = ({text, accent}) => {
  const f = useCurrentFrame();
  const parts = accent ? text.split(accent) : [text];
  return <div style={{position: 'absolute', left: 90, right: 90, top: 250, textAlign: 'center', ...sans, fontSize: 68, lineHeight: 1.2, opacity: interpolate(f, [0, 9], [0, 1], clamp), transform: `translateY(${interpolate(f, [0, 12], [18, 0], {...clamp, easing: soft})}px)`}}>
    {accent && parts.length === 2 ? <>{parts[0]}<span style={{color: OR}}>{accent}</span>{parts[1]}</> : text}
  </div>;
};

const Caps: React.FC<{shot: keyof typeof TT_SHOTS; parts: string[]; accents?: string[]}> = ({shot, parts, accents = []}) => {
  const {sec, duration} = TT_SHOTS[shot];
  const total = parts.join('').length;
  let acc = 0;
  return <>{parts.map((t, i) => {
    const from = TT_VOICE_OFFSET + Math.round((acc / total) * sec * 30);
    acc += t.length;
    const end = i === parts.length - 1 ? duration : TT_VOICE_OFFSET + Math.round((acc / total) * sec * 30);
    return <Sequence key={i} from={from} durationInFrames={Math.max(12, end - from)}><Top text={t} accent={accents[i]} /></Sequence>;
  })}</>;
};

const Tag: React.FC = () => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 228, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: 0.85}}>
    <svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="34" r="12" fill={GRAY} />{[...Array(7)].map((_, i) => { const a = Math.PI + (i / 6) * Math.PI; return <line key={i} x1={28 + Math.cos(a) * 18} y1={34 + Math.sin(a) * 18} x2={28 + Math.cos(a) * 26} y2={34 + Math.sin(a) * 26} stroke={GRAY} strokeWidth="4" strokeLinecap="round" />; })}</svg>
    <div style={{...sans, fontSize: 44, color: GRAY}}>Thức dậy đi</div>
  </div>
);

const bob = (f: number) => Math.sin(f / 9) * 4;

// ---------- S1: hook ----------
export const TtOpen: React.FC = () => {
  const f = useCurrentFrame();
  const pop = sp(f, 14, 130);
  const len = interpolate(f, [50, 120], [0, 380], {...clamp, easing: soft});
  const sway = Math.sin(f / 12) * 2;
  const fx = 400, fy = GY - 255 + bob(f);
  const hand: V = [fx + 190, fy - 10];
  return <AbsoluteFill>
    <Stage>
      <g transform={`translate(${fx} ${GY}) scale(${0.85 + 0.15 * pop}) translate(${-fx} ${-GY})`}>
        <Fig x={fx} y={fy} pose={{...STAND, eR: [115, -70], hR: [190, -10]}} />
      </g>
      <g transform={`translate(${hand[0]} ${hand[1]}) rotate(${sway})`}>
        <rect x="-95" y="-8" width="190" height="16" rx="8" fill="#fff" />
        <rect x="-85" y="8" width="170" height={len} fill="#fff" />
        {[...Array(9)].map((_, i) => { const y = 40 + i * 48; return y < len ? <rect key={i} x={-65} y={y} width={i % 3 === 2 ? 70 : 130} height="10" rx="5" fill="#000" /> : null; })}
        {len > 350 && <text x="0" y={len - 10} textAnchor="middle" fontFamily="Inter" fontWeight="800" fontSize="40" fill={OR}>???</text>}
      </g>
    </Stage>
    <Caps shot="open" parts={['Ai cũng muốn trưởng thành.', 'Nhưng ít ai muốn nhận hóa đơn đi kèm.']} accents={['trưởng thành', 'hóa đơn']} />
    <Tag />
  </AbsoluteFill>;
};

// ---------- S2: what the bill says ----------
export const TtBill: React.FC = () => {
  const f = useCurrentFrame();
  const apart = interpolate(f, [195, 270], [0, 1], {...clamp, easing: soft});
  const ghost = interpolate(f, [290, 385], [0, 1], {...clamp, easing: soft});
  const twinkle = (i: number) => 0.4 + 0.6 * Math.abs(Math.sin(f / 14 + i * 2));
  return <AbsoluteFill>
    <Stage>
      <g opacity={vis(f, 0, 62)}>
        <Fig x={540} y={GY - 255 + bob(f)} pose={{...STAND, eR: [75, -200], hR: [28, -280]}} face="o" />
        <text x="680" y={780 + Math.sin(f / 7) * 8} fontFamily="Inter" fontWeight="800" fontSize="170" fill={OR}>?</text>
      </g>
      <g opacity={vis(f, 56, 198)}>
        <circle cx="850" cy="760" r="78" fill="#fff" /><circle cx="885" cy="738" r="70" fill="#000" />
        {[[720, 680], [930, 860], [640, 800], [980, 700]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#fff" opacity={twinkle(i)} />)}
        <rect x="360" y={GY - 100} width="300" height="26" rx="13" fill={GRAY} /><rect x="390" y={GY - 74} width="22" height="74" fill={GRAY} /><rect x="610" y={GY - 74} width="22" height="74" fill={GRAY} />
        <Fig x={470} y={GY - 130 + bob(f) * 0.5} pose={{...SIT, head: [32, -205]}} face="frown" />
      </g>
      <g opacity={vis(f, 192, 280)}>
        <Fig x={430 - apart * 170} y={GY - 255} pose={walk(f, 0.15)} face="frown" />
        <Fig x={650 + apart * 170} y={GY - 255} pose={walk(f, 0.15)} face="frown" flip />
        {apart < 0.78 && <line x1={430 - apart * 170 + 90} y1={GY - 270} x2={650 + apart * 170 - 90} y2={GY - 270} stroke={OR} strokeWidth="8" strokeDasharray="14 12" strokeLinecap="round" />}
        {apart >= 0.78 && <><line x1={430 - apart * 170 + 90} y1={GY - 270} x2={430 - apart * 170 + 140} y2={GY - 300} stroke={OR} strokeWidth="8" strokeLinecap="round" /><line x1={650 + apart * 170 - 90} y1={GY - 270} x2={650 + apart * 170 - 140} y2={GY - 240} stroke={OR} strokeWidth="8" strokeLinecap="round" /></>}
      </g>
      <g opacity={interpolate(f, [282, 292], [0, 1], clamp)}>
        <Fig x={380} y={GY - 255 + bob(f)} pose={STAND} face="frown" />
        <Fig x={380 + ghost * 360} y={GY - 255} pose={walk(f * 1.3, 1)} opacity={0.85 * (1 - ghost * 0.85)} face="smile" flip />
      </g>
    </Stage>
    <Caps shot="bill" parts={['Hóa đơn ấy ghi gì?', 'Vài đêm ngồi một mình, tự hỏi mình đang làm gì.', 'Vài mối quan hệ không còn đi cùng nhịp.', 'Và cái tôi cũ, thứ từng khiến bạn thấy an toàn.']} accents={['ghi gì', 'ngồi một mình', 'không còn đi cùng nhịp', 'cái tôi cũ']} />
    <Tag />
  </AbsoluteFill>;
};

// ---------- S3: comfort = installment ----------
export const TtDebt: React.FC = () => {
  const f = useCurrentFrame();
  const bars = [0.1, 0.17, 0.26, 0.4, 0.6, 0.88];
  return <AbsoluteFill>
    <Stage>
      <rect x="170" y={GY - 330} width="70" height="330" rx="30" fill={GRAY} />
      <rect x="170" y={GY - 120} width="380" height="120" rx="34" fill={GRAY} />
      <rect x="480" y={GY - 190} width="70" height="190" rx="30" fill={GRAY} />
      <Fig x={380} y={GY - 130 + bob(f) * 0.5} pose={{...SIT, eL: [-50, -200], hL: [-10, -255], eR: [60, -205], hR: [20, -258], head: [0, -228]}} face="smile" />
      <g opacity={interpolate(f, [100, 118], [0, 1], clamp)}>
        {bars.map((v, i) => { const h = v * 520 * interpolate(f, [110 + i * 9, 140 + i * 9], [0, 1], {...clamp, easing: soft}); return <rect key={i} x={600 + i * 56} y={GY - h} width="44" height={h} rx="8" fill={i > 3 ? OR : '#fff'} opacity={i > 3 ? 1 : 0.9} />; })}
        <line x1="580" y1={GY + 2} x2="940" y2={GY + 2} stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <text x="760" y={GY + 52} textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="38" fill="#cfcfcf">lãi (minh họa)</text>
      </g>
    </Stage>
    <Caps shot="debt" parts={['Nên ta trì hoãn.', 'Ở lại vùng quen thuộc.', 'Thoải mái thật, nhưng nó cũng là một khoản trả góp,', 'lãi cao dần theo năm tháng.']} accents={['trì hoãn', 'vùng quen thuộc', 'trả góp', 'lãi cao dần']} />
    <Tag />
  </AbsoluteFill>;
};

// ---------- S4: pain -> learning ----------
export const TtPain: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [14, 178], [0, 4.2], {...clamp, easing: Easing.inOut(Easing.quad)});
  const sc = 0.72;
  const stepTop = (i: number) => GY - 40 - i * 70;
  const px = 170 + t * 150, py = GY - 40 - t * 70;
  const hipY = py - 255 * sc;
  const scribble = interpolate(f, [60, 80, 138, 150], [0, 1, 1, 0], clamp);
  const bulb = sp(f - 150, 12, 150);
  const spiral = (() => { let d = ''; for (let i = 0; i <= 60; i++) { const a = i * 0.55, r = 8 + i * 0.9; d += `${i ? 'L' : 'M'} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r * 0.8).toFixed(1)} `; } return d; })();
  return <AbsoluteFill>
    <Stage>
      {[0, 1, 2, 3, 4].map(i => <rect key={i} x={150 + i * 150} y={stepTop(i)} width="150" height={GY + 20 - stepTop(i)} fill={GRAY} stroke="#000" strokeWidth="4" />)}
      <g transform={`translate(${px} ${hipY}) scale(${sc}) translate(${-px} ${-hipY})`}>
        <Fig x={px} y={hipY} pose={walk(f * 1.2, 0.9)} face={f > 150 ? 'smile' : 'frown'} />
      </g>
      <g transform={`translate(${px - 135} ${hipY - 235 * sc})`} opacity={scribble}>
        <path d={spiral} stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" transform={`rotate(${f * 6})`} />
      </g>
      <g transform={`translate(${px + 135} ${hipY - 235 * sc}) scale(${bulb})`} opacity={bulb > 0 ? 1 : 0}>
        <circle r="38" fill={OR} /><rect x="-16" y="36" width="32" height="22" rx="6" fill={GRAY} />
        {[...Array(7)].map((_, i) => { const a = -Math.PI + (i / 6) * Math.PI; return <line key={i} x1={Math.cos(a) * 54} y1={Math.sin(a) * 54} x2={Math.cos(a) * 78} y2={Math.sin(a) * 78} stroke={OR} strokeWidth="6" strokeLinecap="round" />; })}
      </g>
    </Stage>
    <Caps shot="pain" parts={['Nhưng nhìn lại mà xem.', 'Những lần bạn đau nhất, cũng là những lần bạn học được nhiều nhất.']} accents={['nhìn lại', 'đau nhất']} />
    <Tag />
  </AbsoluteFill>;
};

// ---------- S5: still afraid, still pay ----------
export const TtPaid: React.FC = () => {
  const f = useCurrentFrame();
  const hit = f >= 150;
  const slam = spring({frame: Math.max(0, f - 150), fps: 30, config: {damping: 13, stiffness: 170, mass: 0.8}});
  const shake = hit ? Math.max(0, 1 - (f - 150) / 8) * Math.sin(f * 3) * 8 : 0;
  const tremble = Math.sin(f * 2.7) * 3;
  const fear = Math.floor(f / 4) % 2;
  return <AbsoluteFill style={{transform: `translateY(${shake}px)`}}>
    <Stage>
      <line x1="0" y1={GY + 4} x2="1080" y2={GY + 4} stroke="#fff" strokeWidth="6" strokeDasharray="40 34" strokeDashoffset={-f * 10} />
      <Fig x={520 + tremble} y={GY - 255 + bob(f) * 0.5} pose={walk(f * 1.1, 0.7, {...STAND, eR: [90, -90], hR: [150, -40], eL: [-60, -100], hL: [-30, -30]})} face="o" />
      {fear === 0 ? <g stroke={OR} strokeWidth="7" strokeLinecap="round"><line x1="440" y1="1000" x2="410" y2="975" /><line x1="425" y1="1045" x2="388" y2="1040" /><line x1="640" y1="1000" x2="672" y2="975" /></g> : <g stroke={OR} strokeWidth="7" strokeLinecap="round"><line x1="436" y1="1010" x2="404" y2="990" /><line x1="428" y1="1052" x2="392" y2="1060" /><line x1="646" y1="1008" x2="676" y2="985" /></g>}
      <circle cx="610" cy="960" r="9" fill="#fff" opacity={0.8} />
      {hit && <g transform={`translate(540 1505) rotate(-8) scale(${interpolate(slam, [0, 1], [2.6, 1])})`}>
        <rect x="-360" y="-70" width="720" height="140" rx="16" fill="none" stroke={OR} strokeWidth="10" />
        <text textAnchor="middle" y="24" fontFamily="Inter" fontWeight="900" fontSize="76" fill={OR} letterSpacing="3">ĐÃ THANH TOÁN</text>
      </g>}
    </Stage>
    <Caps shot="paid" parts={['Trưởng thành không phải là hết sợ.', 'Mà là vẫn sợ, nhưng vẫn chịu trả giá.']} accents={['hết sợ', 'vẫn chịu trả giá']} />
  </AbsoluteFill>;
};

// ---------- S6: wake up ----------
export const TtWake: React.FC = () => {
  const f = useCurrentFrame();
  const rise = interpolate(f, [190, 240], [0, 1], {...clamp, easing: soft});
  const stretch = interpolate(f, [250, 285], [0, 1], {...clamp, easing: soft});
  const sunY = interpolate(f, [170, 300], [1750, 1190], {...clamp, easing: soft});
  const pose = mix(mix({...SIT, head: [30, -208]}, STAND, rise), UP, stretch);
  const hipY = (GY - 130) + ((GY - 255) - (GY - 130)) * rise;
  const chips = (i: number) => sp(f - 262 - i * 8, 18, 110);
  return <AbsoluteFill>
    <Stage>
      <g transform={`translate(540 ${sunY})`} opacity={interpolate(f, [170, 200], [0, 1], clamp)}>
        {[...Array(12)].map((_, i) => { const a = (i / 12) * Math.PI * 2 + f * 0.01; return <line key={i} x1={Math.cos(a) * 200} y1={Math.sin(a) * 200} x2={Math.cos(a) * 250} y2={Math.sin(a) * 250} stroke={OR} strokeWidth="10" strokeLinecap="round" />; })}
        <circle r="160" fill={OR} />
      </g>
      {rise < 0.5 && <><rect x="400" y={GY - 100} width="280" height="26" rx="13" fill={GRAY} /><rect x="430" y={GY - 74} width="22" height="74" fill={GRAY} /><rect x="630" y={GY - 74} width="22" height="74" fill={GRAY} /></>}
      <Fig x={500 + 40 * rise} y={hipY + bob(f) * 0.4} pose={pose} face={rise > 0.3 ? 'smile' : 'frown'} />
    </Stage>
    <Caps shot="wake" parts={['Nên hôm nay, đừng hỏi: liệu có đắt không.', 'Hãy hỏi: mình muốn trở thành ai?', 'Thức dậy đi, và bắt đầu thanh toán nhé.']} accents={['liệu có đắt không', 'trở thành ai', 'Thức dậy đi']} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 228, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', padding: '0 30px'}}>
      {['#thucdaydi', '#podcast', '#donglucmoingay'].map((x, i) => <div key={x} style={{...mono, fontSize: 34, padding: '10px 22px', borderRadius: 999, border: '2px solid rgba(255,255,255,.7)', background: '#000', opacity: chips(i), transform: `translateY(${(1 - chips(i)) * 20}px)`}}>{x}</div>)}
    </div>
  </AbsoluteFill>;
};

const Scene = ({from, duration, children}: {from: number; duration: number; children: React.ReactNode}) => <Sequence from={from} durationInFrames={duration} premountFor={30}>{children}</Sequence>;

export const TruongThanhReel: React.FC<{withBgm: boolean}> = ({withBgm}) => (
  <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
    <Fonts />
    <Scene {...TT_SHOTS.open}><TtOpen /></Scene>
    <Scene {...TT_SHOTS.bill}><TtBill /></Scene>
    <Scene {...TT_SHOTS.debt}><TtDebt /></Scene>
    <Scene {...TT_SHOTS.pain}><TtPain /></Scene>
    <Scene {...TT_SHOTS.paid}><TtPaid /></Scene>
    <Scene {...TT_SHOTS.wake}><TtWake /></Scene>
    {Object.values(TT_SHOTS).map(s => <Sequence key={s.voice} from={s.from + TT_VOICE_OFFSET}><Audio src={staticFile(`audio/truongthanh/${s.voice}.mp3`)} /></Sequence>)}
    {withBgm ? <Audio src={staticFile('audio/bgm.mp3')} volume={(f) => interpolate(f, [0, 40, TT_TOTAL - 60, TT_TOTAL], [0, .05, .05, 0], clamp)} /> : null}
    {TT_SFX.map((s, i) => <Sequence key={i} from={TT_SHOTS[s.shot].from + s.offset} durationInFrames={'duration' in s ? s.duration : 70}><Audio src={staticFile(`audio/${s.src}`)} volume={s.volume} /></Sequence>)}
  </AbsoluteFill>
);
