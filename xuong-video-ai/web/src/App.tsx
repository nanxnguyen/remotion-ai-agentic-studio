import { useEffect, useMemo, useRef, useState } from 'react';
import { CHANNELS } from './engine/presets';
import { waitingHuman } from './engine/sim';
import { factory, fmt, go, live, setPaused, setSpeed, useUI, VIEWS, type View } from './store';
import { post } from './live';
import { applyTheme, generateTheme, THEMES } from './theme/lch';
import { Overview } from './views/Overview';
import { Floor3D } from './views/Floor3D';
import { WorkflowEditor } from './views/WorkflowEditor';
import { Videos } from './views/Videos';
import { Library } from './views/Library';
import { Agents } from './views/Agents';
import { Metrics } from './views/Metrics';
import { Events } from './views/Events';

const ICONS: Record<View, string> = {
  'tong-quan': 'M4 5h7v6H4zM13 5h7v3h-7zM13 10h7v9h-7zM4 13h7v6H4z',
  xuong: 'M3 21V9l9-6 9 6v12M9 21v-6h6v6',
  workflow: 'M4 4h6v6H4zM14 14h6v6h-6zM10 7h3a2 2 0 0 1 2 2v5',
  video: 'M3 6h13v12H3zM16 10l5-3v10l-5-3',
  'thu-vien': 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7zM7 6.5l2 1-2 1zM16 15.5l2 1-2 1z',
  agents: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 1 0 0-5M16 14c2.8 0 5 2.2 5 5',
  'do-luong': 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  'su-kien': 'M4 6h16M4 12h10M4 18h13',
};

export function needCount(chId: string) {
  const ch = factory.channels[chId];
  return waitingHuman(ch).length + Object.values(ch.agents).filter(a => a.error).length;
}

export default function App() {
  const { view, ch, theme, paused, speed, sound } = useUI();
  useUI(s => s.rev);
  const set = useUI(s => s.set);
  useEffect(() => { applyTheme(generateTheme(THEMES[theme])); try { localStorage.setItem('xv-theme', theme); } catch { /* */ } }, [theme]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); set({ cmdk: !useUI.getState().cmdk }); }
      if (e.key === 'Escape') set({ cmdk: false });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [set]);

  const chan = factory.channels[ch];
  const totalNeed = CHANNELS.reduce((s, c) => s + needCount(c.id), 0);

  return (
    <div className="app">
      <nav className="nav" aria-label="Điều hướng">
        <div className="brand">
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect x="2" y="6" width="20" height="18" rx="4" fill="var(--accent)" /><path d="M22 12l6-3.5v13L22 18z" fill="var(--accent)" opacity=".7" /><circle cx="12" cy="15" r="3.5" fill="var(--accentInk)" /></svg>
          <div><b>Xưởng Video AI</b><span>Phòng điều khiển</span></div>
        </div>
        {VIEWS.map(v => (
          <a key={v.id} href={`#${v.id}`} aria-current={view === v.id ? 'page' : undefined}>
            <svg viewBox="0 0 24 24"><path d={ICONS[v.id]} /></svg>{v.label}
            {v.id === 'tong-quan' && totalNeed > 0 && <span className="count">{totalNeed}</span>}
          </a>
        ))}
        <div className="nav-foot">
          <button className="btn sm" onClick={() => set({ cmdk: true })}>Tìm nhanh <kbd>Ctrl K</kbd></button>
          <span>v2.0-α · {live ? 'trực tiếp' : 'mô phỏng mock'} · đồng hồ xưởng {fmt.time(factory.t)}</span>
        </div>
      </nav>
      <div className="shell">
        <header className="top">
          <div className="floors" role="group" aria-label="Chọn kênh (tầng)">
            {CHANNELS.map((c, i) => {
              const n = needCount(c.id);
              return (
                <button key={c.id} className="floor" aria-pressed={c.id === ch} onClick={() => set({ ch: c.id, selStep: null, selJob: null })}>
                  <span>Tầng {i + 1} · {c.name}<small>{c.kind} · v{factory.channels[c.id].workflow.version}</small></span>
                  {n > 0 && <span className="count" aria-label={`${n} việc cần bạn`}>{n}</span>}
                </button>
              );
            })}
          </div>
          <div className="ctrls">
            <button className="btn" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Chạy tiếp' : 'Tạm dừng'}</button>
            <div className="seg" role="group" aria-label="Tốc độ">
              {[1, 3, 8].map(x => <button key={x} aria-pressed={speed === x} onClick={() => setSpeed(x)}>{x}×</button>)}
            </div>
            <label className="toggle"><input type="checkbox" checked={chan.autoApprove} onChange={e => factory.setAuto(ch, e.target.checked)} /> Tự duyệt</label>
            <div className="seg" role="group" aria-label="Giao diện">
              {([['night', 'Đêm'], ['day', 'Ngày'], ['contrast', 'Tương phản']] as const).map(([k, l]) => <button key={k} aria-pressed={theme === k} onClick={() => set({ theme: k })}>{l}</button>)}
            </div>
            <label className="toggle"><input type="checkbox" checked={sound} onChange={e => set({ sound: e.target.checked })} /> Âm báo</label>
            <button className="btn primary" onClick={() => { const c = CHANNELS.find(x => x.id === ch)!; factory.addJob(ch, c.titles[Math.floor(Math.random() * c.titles.length)] + ' (thêm tay)'); }}>+ Video</button>
          </div>
        </header>
        <LiveBar />
        <main className="main">
          {view === 'tong-quan' && <Overview />}
          <Floor3D visible={view === 'xuong'} />
          {view === 'workflow' && <WorkflowEditor key={ch} />}
          {view === 'video' && <Videos />}
          {view === 'thu-vien' && <Library />}
          {view === 'agents' && <Agents />}
          {view === 'do-luong' && <Metrics />}
          {view === 'su-kien' && <Events />}
        </main>
      </div>
      <Toasts />
      <CommandK />
    </div>
  );
}

function LiveBar() {
  const info = useUI(s => s.live);
  const conn = useUI(s => s.conn);
  const ch = useUI(s => s.ch);
  if (!info) return null;
  const pct = Math.min(100, (info.spentToday / Math.max(0.01, info.dailyCapUsd)) * 100);
  const name = CHANNELS.find(c => c.id === info.realChannel)?.name;
  const mode = !conn ? 'Mất kết nối máy chủ, đang nối lại…' : info.stopped ? 'Đã dừng khẩn cấp' : !info.hasKey ? 'Chưa có API key' : info.fake ? 'Claude giả (thử luồng)' : 'Claude thật';
  const tone = !conn || info.stopped || !info.hasKey ? 'var(--err)' : info.fake ? 'var(--need)' : 'var(--ok)';
  return (
    <div className="livebar" role="region" aria-label="Chế độ trực tiếp">
      <span className="live-dot" style={{ background: tone }} aria-hidden="true" />
      <b>{mode}</b>
      <span className="muted">{name}: {info.realSteps.map(id => factory.channels[info.realChannel]?.workflow.steps.find(s => s.id === id)?.name ?? id).join(' → ')}{info.webSearch ? ' · có tra web' : ''}</span>
      {ch !== info.realChannel && <span className="chip">Tầng này đang mô phỏng</span>}
      <span className="spacer" />
      <span className="muted">{info.inflight ? `${info.inflight} lượt đang gọi` : 'rảnh'}{info.queued ? ` · ${info.queued} chờ` : ''}</span>
      <div className="budget" title={`Ngày ${info.date} (giờ Việt Nam) · trần mỗi video $${info.videoCapUsd.toFixed(2)}`}>
        <span>Hôm nay {fmt.usd(info.spentToday)} / ${info.dailyCapUsd.toFixed(2)}</span>
        <div className="bar"><i style={{ width: `${pct}%`, background: pct > 85 ? 'var(--err)' : 'var(--accent)' }} /></div>
      </div>
      {info.stopped
        ? <button className="btn sm" onClick={() => void post({ type: 'resume' })}>Cho gọi lại</button>
        : <button className="btn sm danger" onClick={() => void post({ type: 'stop' })}>Dừng khẩn cấp</button>}
    </div>
  );
}

function Toasts() {
  const toasts = useUI(s => s.toasts);
  const set = useUI(s => s.set);
  const color = { need: 'var(--need)', err: 'var(--err)', ok: 'var(--ok)' } as const;
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className="toast" style={{ ['--c' as string]: color[t.kind] }}>
          <span>{t.text}</span>
          {t.jobId && <button className="btn sm" onClick={() => { const rest = useUI.getState().toasts.filter(x => x.id !== t.id); if (t.lib) { set({ libJob: `${t.ch}/${t.jobId}`, toasts: rest }); go('thu-vien'); } else { set({ ch: t.ch, selJob: t.jobId!, toasts: rest }); go('video'); } }}>{t.lib ? 'Xem' : 'Mở'}</button>}
        </div>
      ))}
    </div>
  );
}

interface Cmd { label: string; hint?: string; run: () => void }
function CommandK() {
  const open = useUI(s => s.cmdk);
  const set = useUI(s => s.set);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => input.current?.focus(), 10); } }, [open]);
  const cmds = useMemo<Cmd[]>(() => {
    if (!open) return [];
    const out: Cmd[] = [];
    VIEWS.forEach(v => out.push({ label: `Mở ${v.label}`, hint: 'màn', run: () => go(v.id) }));
    CHANNELS.forEach(c => out.push({ label: `Chuyển sang ${c.name}`, hint: 'kênh', run: () => set({ ch: c.id, selJob: null, selStep: null }) }));
    for (const c of CHANNELS) {
      const ch = factory.channels[c.id];
      for (const w of waitingHuman(ch)) out.push({ label: `Duyệt “${w.job.title}” · ${w.step.name}`, hint: c.name, run: () => factory.approve(c.id, w.job.id, w.step.id) });
      for (const id of ch.order.slice(-25).reverse()) {
        const j = ch.jobs[id];
        out.push({ label: `${j.id} · ${j.title}`, hint: c.name, run: () => { set({ ch: c.id, selJob: j.id }); go('video'); } });
      }
    }
    return out;
  }, [open]);
  if (!open) return null;
  const list = cmds.filter(c => c.label.toLowerCase().includes(q.toLowerCase())).slice(0, 40);
  const run = (c?: Cmd) => { if (c) { c.run(); set({ cmdk: false }); } };
  return (
    <div className="cmdk-back" onClick={() => set({ cmdk: false })}>
      <div className="cmdk" role="dialog" aria-modal="true" aria-label="Tìm nhanh" onClick={e => e.stopPropagation()}>
        <input ref={input} value={q} placeholder="Gõ để tìm màn, kênh, video, việc cần duyệt…" aria-label="Tìm nhanh"
          onChange={e => { setQ(e.target.value); setI(0); }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setI(x => Math.min(list.length - 1, x + 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setI(x => Math.max(0, x - 1)); }
            if (e.key === 'Enter') run(list[i]);
          }} />
        <ul role="listbox">
          {list.map((c, k) => <li key={c.label + k}><button role="option" aria-selected={k === i} onMouseEnter={() => setI(k)} onClick={() => run(c)}>{c.label}<small>{c.hint}</small></button></li>)}
          {!list.length && <li className="empty" style={{ margin: 8 }}>Không có kết quả.</li>}
        </ul>
      </div>
    </div>
  );
}
