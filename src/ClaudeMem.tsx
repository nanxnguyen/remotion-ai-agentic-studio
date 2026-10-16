import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, Easing} from 'remotion';
import {CM_SFX, CM_SHOTS, CM_TOTAL, CM_VOICE_OFFSET} from './cmTimeline';
import {Fonts} from './Main';

// Style lấy từ cmem.ai: giấy kem, nhiều khoảng trắng, chữ ink, accent đất sét. Khác hẳn style tối-vàng của video Understand Anything.
const colors = {bg: '#f5efe6', text: '#1d1a16', muted: '#7a7167', gold: '#d97757', gold2: '#c2542d', violet: '#5b4fc4', cyan: '#177e91', coral: '#cf4a3f', mint: '#26805f'};
const body: React.CSSProperties = {fontFamily: 'Inter', color: colors.text};
const mono: React.CSSProperties = {fontFamily: 'JetBrains Mono', color: colors.text};
const title: React.CSSProperties = {fontFamily: 'Inter', fontWeight: 650, color: colors.text, letterSpacing: '-0.045em', lineHeight: 1.02};

const Grain: React.FC = () => <AbsoluteFill style={{pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at 85% 8%, rgba(217,119,87,.16), transparent 38%), linear-gradient(rgba(60,40,20,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(60,40,20,.035) 1px, transparent 1px)', backgroundSize: 'auto, 60px 60px, 60px 60px'}} />;

const Badge: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{...mono, display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 30, color: colors.gold2, padding: '12px 22px', borderRadius: 999, background: 'rgba(217,119,87,.12)'}}>
    <span style={{width: 10, height: 10, borderRadius: 99, background: colors.gold}} />{children}
  </div>
);

const Caption: React.FC<{text: string; accent?: string}> = ({text, accent}) => {
  const f = useCurrentFrame();
  const parts = accent ? text.split(accent) : [text];
  return <div style={{position: 'absolute', left: 70, right: 70, bottom: 224, display: 'flex', justifyContent: 'center', opacity: interpolate(f, [4, 14], [0, 1], clamp), transform: `translateY(${interpolate(f, [4, 18], [38, 0], {...clamp, easing: ease})}px)`, zIndex: 30}}>
    <div style={{...body, maxWidth: 940, fontSize: 60, lineHeight: 1.1, fontWeight: 650, textAlign: 'center', padding: '24px 34px 27px', borderRadius: 30, background: colors.text, color: '#f5efe6', boxShadow: '0 20px 50px rgba(60,40,20,.25)'}}>
      {accent && parts.length === 2 ? <>{parts[0]}<span style={{color: '#f0a583'}}>{accent}</span>{parts[1]}</> : text}
    </div>
  </div>;
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const clay = '#d97757';
const sp = (frame: number, damping = 16, stiffness = 120) => spring({frame, fps: 30, config: {damping, stiffness, mass: 0.9}});
const typeText = (s: string, f: number, a: number, b: number) => s.slice(0, Math.floor(interpolate(f, [a, b], [0, s.length], clamp)));

const Bubble: React.FC<{who: 'user' | 'claude'; text: string; p: number; sub?: string}> = ({who, text, p, sub}) => (
  <div style={{display: 'flex', justifyContent: who === 'user' ? 'flex-end' : 'flex-start', opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.96 + 0.04 * p})`}}>
    <div style={{...body, maxWidth: 880, fontSize: 50, lineHeight: 1.2, padding: '34px 40px', borderRadius: 30, background: who === 'user' ? '#ece4d8' : '#fffdf8', border: `1px solid ${who === 'claude' ? clay + '66' : 'rgba(60,40,20,.12)'}`, boxShadow: '0 20px 60px rgba(60,40,20,.14)'}}>
      {sub && <div style={{...mono, fontSize: 26, color: who === 'claude' ? clay : colors.muted, marginBottom: 10}}>{sub}</div>}
      {text}
    </div>
  </div>
);

// S1 — morning fix, afternoon amnesia
export const CmHook: React.FC = () => {
  const f = useCurrentFrame();
  const swap = interpolate(f, [92, 112], [0, 1], clamp); // 0 = morning chat, 1 = new session
  const dots = Math.floor(f / 7) % 4;
  return <AbsoluteFill style={{padding: '120px 60px 0'}}>
    <div style={{opacity: interpolate(f, [0, 14], [0, 1], clamp)}}><Badge>{swap < 0.5 ? 'SÁNG · 09:12' : 'CHIỀU · PHIÊN MỚI'}</Badge></div>
    <div style={{...title, fontSize: 118, marginTop: 36, opacity: interpolate(f, [4, 20], [0, 1], clamp)}}>
      {swap < 0.5 ? <>Sáng nay<br/><span style={{color: colors.gold2}}>fix xong bug.</span></> : <>Chiều nay<br/><span style={{color: clay}}>…ai đây?</span></>}
    </div>
    <div style={{position: 'relative', marginTop: 110, display: 'flex', flexDirection: 'column', gap: 44, opacity: 1 - swap, transform: `translateX(${-swap * 120}px)`, height: swap < 1 ? 'auto' : 0, overflow: 'hidden'}}>
      <Bubble who="user" p={sp(f - 16)} text="Sửa giúp mình bug đăng nhập với." />
      <Bubble who="claude" sub="CLAUDE" p={sp(f - 44)} text="Xong rồi! Token hết hạn vì cookie sai domain ✓" />
      <Bubble who="user" p={sp(f - 70)} text="Tuyệt! Mai làm tiếp nhé." />
    </div>
    <div style={{position: 'absolute', left: 60, right: 60, top: 640, display: 'flex', flexDirection: 'column', gap: 44, opacity: swap, transform: `translateX(${(1 - swap) * 120}px)`}}>
      <Bubble who="user" p={sp(f - 120)} text="Tiếp bug đăng nhập hôm qua nha." />
      <Bubble who="claude" sub="CLAUDE" p={sp(f - 150)} text={f < 170 ? '.'.repeat(dots) || '.' : 'Chào bạn! Mình giúp gì được ạ?'} />
    </div>
    <>
      <div style={{position: 'absolute', left: 60, right: 60, top: 1090, textAlign: 'center', ...title, fontSize: 140, color: colors.gold2, transform: `scale(${0.9 + 0.1 * sp(f - 215)})`, opacity: sp(f - 215)}}>
        trí nhớ cá vàng
      </div>
    </>
    <Sequence from={170}><Caption text="Ủa… cá vàng hả?" accent="cá vàng" /></Sequence>
    <Sequence from={0} durationInFrames={105}><Caption text="Sáng nay Claude sửa xong bug." accent="sửa xong" /></Sequence>
  </AbsoluteFill>;
};

// S2 — re-explaining every session
export const CmPain: React.FC = () => {
  const f = useCurrentFrame();
  const lines = ['repo này là app bán hàng, dùng Next.js…', 'hôm qua mình chọn JWT vì…', 'nhớ dùng pnpm, đừng npm nha…', 'à còn cái bug cookie nữa…'];
  const count = Math.floor(interpolate(f, [10, 150], [1, 12], clamp));
  return <AbsoluteFill style={{padding: '130px 60px 0'}}>
    <Badge>MỖI PHIÊN MỘT LẦN</Badge>
    <div style={{...title, fontSize: 124, marginTop: 40}}>Làm quen lại<br/><span style={{color: clay}}>từ số 0.</span></div>
    <div style={{marginTop: 80, borderRadius: 28, background: '#fffdf8', border: '1px solid rgba(60,40,20,.14)', padding: 40, boxShadow: '0 30px 90px rgba(60,40,20,.16)'}}>
      <div style={{...mono, fontSize: 28, color: colors.muted, marginBottom: 20}}>PHIÊN MỚI · context trống</div>
      {lines.map((l, i) => {
        const a = 10 + i * 30;
        return <div key={l} style={{...mono, fontSize: 40, padding: '26px 0', color: colors.text, opacity: f > a ? 1 : 0}}><span style={{color: colors.gold2}}>› </span>{typeText(l, f, a, a + 26)}</div>;
      })}
    </div>
    <div style={{marginTop: 80, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 20}}>
      <div style={{...mono, fontSize: 40, color: colors.muted}}>giải thích lại lần thứ</div>
      <div style={{...title, fontSize: 200, color: clay}}>{count}</div>
    </div>
    <Caption text="Rồi lại ngồi giải thích từ đầu." accent="từ đầu" />
  </AbsoluteFill>;
};

// S3 — five lifecycle hooks
const HOOKS = [
  ['SessionStart', 'mở phiên'], ['UserPromptSubmit', 'bạn gõ prompt'], ['PostToolUse', 'sau mỗi lần Claude dùng tool'], ['Stop', 'Claude dừng'], ['SessionEnd', 'đóng phiên'],
] as const;
export const CmHooks: React.FC = () => {
  const f = useCurrentFrame();
  const active = interpolate(f, [20, 150], [0, 4], clamp);
  const dotY = active * 150;
  const sum = sp(f - 150);
  return <AbsoluteFill style={{padding: '120px 60px 0'}}>
    <Badge>5 LIFECYCLE HOOKS</Badge>
    <div style={{...title, fontSize: 106, marginTop: 36}}>Âm thầm <span style={{color: colors.gold2}}>ghi lại</span><br/>mọi việc Claude làm.</div>
    <div style={{position: 'relative', marginTop: 56, height: 760}}>
      <div style={{position: 'absolute', left: 51, top: 40, width: 4, height: 600, background: 'rgba(60,40,20,.14)'}} />
      <div style={{position: 'absolute', left: 51, top: 40, width: 4, height: dotY, background: colors.gold}} />
      <div style={{position: 'absolute', left: 33, top: 22 + dotY, width: 40, height: 40, borderRadius: 99, background: colors.gold2, boxShadow: `0 0 40px ${colors.gold}`}} />
      {HOOKS.map(([name, sub], i) => {
        const on = interpolate(active, [i - 0.2, i + 0.1], [0, 1], clamp);
        const pop = sp(f - 8 - i * 5);
        return <div key={name} style={{position: 'absolute', left: 110, top: i * 150, width: 850, opacity: pop, transform: `translateX(${(1 - pop) * 70}px)`, padding: '20px 28px', borderRadius: 22, background: '#fffdf8', border: `1px solid ${on > 0.5 ? colors.gold2 + 'cc' : 'rgba(60,40,20,.14)'}`, boxShadow: on > 0.5 ? '0 0 40px rgba(217,119,87,.25)' : 'none'}}>
          <div style={{...mono, fontSize: 36, color: on > 0.5 ? colors.gold2 : colors.text}}>{name}</div>
          <div style={{...body, fontSize: 30, color: colors.muted, marginTop: 4}}>{sub}</div>
        </div>;
      })}
    </div>
    <div style={{position: 'absolute', left: 60, right: 60, top: 1250, opacity: sum, transform: `translateY(${(1 - sum) * 50}px)`, padding: 28, borderRadius: 24, background: '#fffdf8', border: `1px solid ${colors.mint}66`}}>
      <div style={{...mono, fontSize: 28, color: colors.mint}}>BẢN TÓM TẮT AI · ví dụ minh hoạ</div>
      <div style={{...body, fontSize: 36, marginTop: 12}}>Fix login: cookie sai domain làm token hết hạn sớm.</div>
    </div>
    <Caption text="Ghi lại, rồi nhờ AI nén thành tóm tắt." accent="nén" />
  </AbsoluteFill>;
};

// S4 — local storage
export const CmStore: React.FC = () => {
  const f = useCurrentFrame();
  const nodes = [
    {x: 270, y: 0, c: colors.violet, t: 'SQLite', s: 'FTS5 · lưu + tìm từ khoá'},
    {x: 810, y: 0, c: colors.cyan, t: 'Chroma', s: 'vector · tìm theo nghĩa'},
    {x: 540, y: 680, c: colors.mint, t: 'Web viewer', s: 'xem memory realtime'},
  ];
  const core = sp(f - 4);
  return <AbsoluteFill style={{padding: '120px 60px 0'}}>
    <Badge>SƠ ĐỒ MINH HOẠ</Badge>
    <div style={{...title, fontSize: 118, marginTop: 36}}>Nằm ngay<br/><span style={{color: colors.gold2}}>trên máy bạn.</span></div>
    <svg width="960" height="1000" viewBox="0 0 1080 1125" style={{marginTop: 170, overflow: 'visible'}}>
      {nodes.map((n, i) => {
        const lp = interpolate(f, [20 + i * 14, 50 + i * 14], [0, 1], {...clamp, easing: ease});
        return <path key={i} d={`M540,360 L${n.x},${n.y + 80 + (i === 2 ? -110 : 110)}`} stroke={n.c} strokeWidth="4" opacity=".7" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - lp} fill="none" />;
      })}
      <g transform={`translate(540 370) scale(${core})`}>
        <rect x="-230" y="-90" width="460" height="180" rx="34" fill="#fffdf8" stroke={colors.gold2} strokeWidth="4" />
        <text textAnchor="middle" y="-6" fill="#1d1a16" fontFamily="JetBrains Mono" fontSize="40">worker</text>
        <text textAnchor="middle" y="46" fill="#7a7167" fontFamily="Inter" fontSize="30">local HTTP · Bun</text>
      </g>
      {nodes.map((n, i) => {
        const p = sp(f - 24 - i * 14);
        return <g key={n.t} transform={`translate(${n.x} ${n.y + 80}) scale(${p})`} opacity={p}>
          <rect x="-230" y="-110" width="460" height="220" rx="30" fill="#fffdf8" stroke={n.c} strokeWidth="4" />
          <text textAnchor="middle" y="-14" fill={n.c} fontFamily="JetBrains Mono" fontSize="46">{n.t}</text>
          <text textAnchor="middle" y="44" fill="#4a443d" fontFamily="Inter" fontSize="30">{n.s}</text>
        </g>;
      })}
    </svg>
    <Caption text="SQLite để lưu, Chroma để tìm theo nghĩa." accent="theo nghĩa" />
  </AbsoluteFill>;
};

// S5 — recall: progressive disclosure + <private>
const Layer: React.FC<{n: number; name: string; desc: string; w: number; p: number; c: string}> = ({n, name, desc, w, p, c}) => (
  <div style={{opacity: p, transform: `translateX(${(1 - p) * 90}px)`, padding: '36px 36px', borderRadius: 24, background: '#fffdf8', border: `1px solid ${c}77`}}>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}><span style={{...title, fontSize: 56, color: c}}>{n}</span><span style={{...mono, fontSize: 36}}>{name}</span></div>
    <div style={{...body, fontSize: 30, color: colors.muted, margin: '6px 0 14px'}}>{desc}</div>
    <div style={{height: 14, borderRadius: 99, background: 'rgba(60,40,20,.1)'}}><div style={{width: `${w * p}%`, height: '100%', borderRadius: 99, background: c}} /></div>
  </div>
);

export const CmRecall: React.FC = () => {
  const f = useCurrentFrame();
  const part = f < 120 ? 0 : f < 255 ? 1 : 2;
  const mem = ['Fix login · cookie domain', 'Chọn JWT thay session', 'Dùng pnpm workspace'];
  const secret = typeText('API_KEY=sk-live-4f9a2c7e', f, 270, 300);
  const redact = interpolate(f, [318, 336], [0, 1], clamp);
  return <AbsoluteFill style={{padding: '120px 60px 0'}}>
    {part === 0 && <>
      <Badge>PHIÊN MỚI · KÝ ỨC TỰ QUAY LẠI</Badge>
      <div style={{...title, fontSize: 118, marginTop: 36}}>Mở phiên.<br/><span style={{color: colors.gold2}}>Nó nhớ rồi.</span></div>
      <div style={{marginTop: 90, display: 'flex', flexDirection: 'column', gap: 36}}>
        {mem.map((m, i) => {const p = sp(f - 18 - i * 16); return <div key={m} style={{...mono, fontSize: 42, padding: '40px 38px', borderRadius: 26, background: '#fffdf8', border: `1px solid ${colors.mint}77`, opacity: p, transform: `translateY(${(1 - p) * -70}px)`}}><span style={{color: colors.mint}}>◆ </span>{m}</div>;})}
      </div>
      <Caption text="Phiên mới mở lên, ký ức tự quay lại." accent="tự quay lại" />
    </>}
    {part === 1 && <>
      <Badge>PROGRESSIVE DISCLOSURE</Badge>
      <div style={{...title, fontSize: 104, marginTop: 36}}>Tìm mục lục trước.<br/><span style={{color: colors.gold2}}>Chi tiết sau.</span></div>
      <div style={{marginTop: 70, display: 'flex', flexDirection: 'column', gap: 36}}>
        <Layer n={1} name="search" desc="mục lục gọn, rẻ token" w={14} p={sp(f - 126)} c={colors.violet} />
        <Layer n={2} name="timeline" desc="xem ngữ cảnh theo thời gian" w={32} p={sp(f - 154)} c={colors.cyan} />
        <Layer n={3} name="get_observations" desc="chi tiết đầy đủ, chỉ ID cần" w={78} p={sp(f - 182)} c={colors.coral} />
      </div>
      <div style={{...body, fontSize: 28, color: '#8a8176', textAlign: 'center', marginTop: 28}}>độ dài thanh chỉ minh hoạ, không phải số đo</div>
      <Caption text="Chỉ lấy chi tiết thứ mình cần. Đỡ tốn token." accent="Đỡ tốn token" />
    </>}
    {part === 2 && <>
      <Badge>QUYỀN RIÊNG TƯ</Badge>
      <div style={{...title, fontSize: 112, marginTop: 36}}>Bọc trong<br/><span style={{color: colors.gold2}}>&lt;private&gt;</span><br/>là khỏi lưu.</div>
      <div style={{marginTop: 90, padding: 50, borderRadius: 26, background: '#fffdf8', border: '1px solid rgba(60,40,20,.14)'}}>
        <div style={{...mono, fontSize: 32, color: colors.muted}}>&lt;private&gt;</div>
        <div style={{position: 'relative', ...mono, fontSize: 46, padding: '30px 0', color: colors.coral}}>
          {secret}<span style={{opacity: Math.floor(f / 8) % 2}}>▌</span>
          <div style={{position: 'absolute', left: 0, top: 10, bottom: 10, width: `${redact * 100}%`, background: '#1d1a16', borderRadius: 8}} />
        </div>
        <div style={{...mono, fontSize: 32, color: colors.muted}}>&lt;/private&gt;</div>
        <div style={{...mono, fontSize: 30, color: colors.mint, marginTop: 24, opacity: redact}}>✓ không đưa vào bộ nhớ</div>
      </div>
      <Caption text="Chỗ nhạy cảm? Bọc private là khỏi lưu." accent="private" />
    </>}
  </AbsoluteFill>;
};

// S6 — install + brand
export const CmOutro: React.FC = () => {
  const f = useCurrentFrame();
  const word = interpolate(f, [4, 60], [0, 1], {...clamp, easing: ease});
  const cmd = 'npx claude-mem install';
  const pill = (i: number) => sp(f - 130 - i * 8);
  return <AbsoluteFill style={{padding: '200px 60px 0'}}>
    <div style={{textAlign: 'center', ...title, fontSize: 160, opacity: word, letterSpacing: `${(1 - word) * 0.25 - 0.04}em`, transform: `scale(${0.96 + 0.04 * word})`}}>
      claude<span style={{color: colors.gold2}}>-mem</span>
    </div>
    <div style={{...body, textAlign: 'center', fontSize: 38, color: colors.muted, marginTop: 24, opacity: interpolate(f, [30, 60], [0, 1], clamp)}}>ký ức xuyên phiên cho coding agent</div>
    <div style={{marginTop: 140, borderRadius: 26, background: '#fffdf8', border: '1px solid rgba(60,40,20,.14)', overflow: 'hidden', boxShadow: '0 35px 90px rgba(60,40,20,.18)'}}>
      <div style={{height: 56, display: 'flex', gap: 12, alignItems: 'center', padding: '0 22px', background: '#ece4d8'}}>{[colors.coral, colors.gold2, colors.mint].map(c => <span key={c} style={{width: 14, height: 14, borderRadius: 99, background: c}} />)}</div>
      <div style={{...mono, fontSize: 44, padding: '38px 34px', color: colors.gold2}}><span style={{color: colors.muted}}>$ </span>{typeText(cmd, f, 50, 105)}<span style={{opacity: Math.floor(f / 9) % 2}}>▌</span></div>
    </div>
    <div style={{display: 'flex', gap: 16, justifyContent: 'center', marginTop: 90}}>
      {['MÃ NGUỒN MỞ', 'APACHE-2.0', 'NODE 20+'].map((x, i) => <div key={x} style={{...mono, fontSize: 30, color: [colors.mint, colors.gold2, colors.cyan][i], padding: '12px 20px', borderRadius: 999, border: '1px solid currentColor', background: '#fffdf8', opacity: pill(i), transform: `translateY(${(1 - pill(i)) * 30}px)`}}>{x}</div>)}
    </div>
    <div style={{...mono, textAlign: 'center', fontSize: 38, color: colors.gold2, marginTop: 90, opacity: pill(3)}}>github.com/thedotmack/claude-mem</div>
    <Caption text="Cho Claude bớt trí nhớ cá vàng nha!" accent="cá vàng" />
  </AbsoluteFill>;
};

const Scene = ({from, duration, children}: {from: number; duration: number; children: React.ReactNode}) => <Sequence from={from} durationInFrames={duration} premountFor={30}>{children}</Sequence>;

export const ClaudeMemReel: React.FC<{withBgm: boolean}> = ({withBgm}) => (
  <AbsoluteFill style={{background: colors.bg, overflow: 'hidden'}}>
    <Fonts /><Grain />
    <Scene {...CM_SHOTS.hook}><CmHook /></Scene>
    <Scene {...CM_SHOTS.pain}><CmPain /></Scene>
    <Scene {...CM_SHOTS.hooks}><CmHooks /></Scene>
    <Scene {...CM_SHOTS.store}><CmStore /></Scene>
    <Scene {...CM_SHOTS.recall}><CmRecall /></Scene>
    <Scene {...CM_SHOTS.outro}><CmOutro /></Scene>
    {Object.values(CM_SHOTS).map(s => <Sequence key={s.voice} from={s.from + CM_VOICE_OFFSET}><Audio src={staticFile(`audio/cm/${s.voice}.mp3`)} /></Sequence>)}
    {withBgm ? <Audio src={staticFile('audio/bgm.mp3')} volume={(f) => interpolate(f, [0, 20, CM_TOTAL - 45, CM_TOTAL], [0, .075, .075, 0], clamp)} /> : null}
    {CM_SFX.map((s, i) => <Sequence key={i} from={CM_SHOTS[s.shot].from + s.offset} durationInFrames={'duration' in s ? s.duration : 70}><Audio src={staticFile(`audio/${s.src}`)} volume={s.volume} /></Sequence>)}
  </AbsoluteFill>
);
