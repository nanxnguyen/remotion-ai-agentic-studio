import { useEffect, useMemo, useRef, useState } from 'react';
import { CHANNELS } from '../engine/presets';
import type { ChannelState, Job } from '../engine/types';
import { apiUrl } from '../live';
import { factory, fmt, go, live, useUI } from '../store';
import { Empty } from '../ui';

/* ---------- dữ liệu một video đã xong ---------- */
interface Done { ch: ChannelState; job: Job; name: string; vertical: boolean; theme: string }

function finished(): Done[] {
  const out: Done[] = [];
  for (const c of CHANNELS) {
    const ch = factory.channels[c.id];
    if (!ch) continue;
    for (const id of ch.order) {
      const j = ch.jobs[id];
      if (j.status === 'done') out.push({ ch, job: j, name: c.name, vertical: !c.kind.includes('16:9'), theme: c.theme });
    }
  }
  return out.sort((a, b) => (b.job.doneAt ?? 0) - (a.job.doneAt ?? 0));
}

const lastOutput = (j: Job, stepId: string) => { const r = j.steps[stepId]?.runs; return r?.[r.length - 1]?.output?.replace(/^\(mock\)\s*/, '') ?? ''; };
const scriptStep = (ch: ChannelState) => ch.workflow.steps.find(s => s.action === 'write' && /script|kich|bien/i.test(s.id + s.name)) ?? ch.workflow.steps.find(s => s.action === 'write');
const researchStep = (ch: ChannelState) => ch.workflow.steps.find(s => s.action === 'read');

/** Độ dài video: lấy từ kịch bản/lồng tiếng nếu có số giây, không thì ước theo số câu. */
function durationOf(d: Done): number {
  const texts = d.ch.workflow.steps.map(s => lastOutput(d.job, s.id)).join(' ');
  const m = texts.match(/(\d+(?:[.,]\d+)?)\s*giây/);
  if (m) return Math.round(parseFloat(m[1].replace(',', '.')));
  return d.vertical ? 56 : 180;
}
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

/* ---------- link YouTube người dùng dán vào (lưu trên trình duyệt) ---------- */
const YT_KEY = 'xv-youtube-links';
function loadLinks(): Record<string, string> { try { return JSON.parse(localStorage.getItem(YT_KEY) || '{}') || {}; } catch { return {}; } }
function saveLink(key: string, url: string) { try { const m = loadLinks(); if (url) m[key] = url; else delete m[key]; localStorage.setItem(YT_KEY, JSON.stringify(m)); } catch { /* */ } }
export function youtubeId(url: string): string | null {
  const m = url.trim().match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}

/* ---------- ảnh bìa vẽ bằng CSS (không cần tải ảnh) ---------- */
const THEME_BG: Record<string, [string, string, string]> = {
  horror: ['#1a0f14', '#5b1a22', '#e9c46a'],
  pastel: ['#2b2f5c', '#8e7cc3', '#ffe9a8'],
  warm: ['#3a2416', '#c4703f', '#fff1d6'],
};
function hash(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

function Poster({ d, big = false }: { d: Done; big?: boolean }) {
  const [a, b, ink] = THEME_BG[d.theme] ?? THEME_BG.horror;
  const h = hash(d.job.id);
  const ang = 120 + (h % 90), cx = 20 + (h % 60), cy = 15 + ((h >> 8) % 50);
  return (
    <div className={`poster${d.vertical ? ' v' : ''}${big ? ' big' : ''}`} style={{ background: `radial-gradient(circle at ${cx}% ${cy}%, ${b} 0%, transparent 60%), linear-gradient(${ang}deg, ${a}, ${b})`, ['--ink' as string]: ink }} aria-hidden="true">
      <span className="p-ch">{d.name}</span>
      <span className="p-title">{d.job.title}</span>
      <span className="p-dur">{mmss(durationOf(d))}</span>
    </div>
  );
}

/* ---------- trang ---------- */
export function Library() {
  useUI(s => s.rev);
  const open = useUI(s => s.libJob), set = useUI(s => s.set);
  const [q, setQ] = useState('');
  const [chF, setChF] = useState<string>('all');
  const all = finished();
  const rows = all.filter(d => (chF === 'all' || d.ch.id === chF) && (!q || `${d.job.id} ${d.job.title}`.toLowerCase().includes(q.toLowerCase())));
  const current = open ? all.find(d => `${d.ch.id}/${d.job.id}` === open) : undefined;

  return (
    <div className="page lib">
      <div className="page-head">
        <div className="grow"><h1>Thư viện</h1><div className="sub">{all.length} video đã sản xuất xong. Bấm một video để xem.</div></div>
        <input className="input" style={{ width: 240 }} value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm theo tiêu đề hoặc mã…" aria-label="Tìm video đã xong" />
        <div className="seg" role="group" aria-label="Lọc theo kênh">
          <button aria-pressed={chF === 'all'} onClick={() => setChF('all')}>Tất cả</button>
          {CHANNELS.map(c => <button key={c.id} aria-pressed={chF === c.id} onClick={() => setChF(c.id)}>{c.name}</button>)}
        </div>
      </div>
      {rows.length ? (
        <div className="lib-grid">
          {rows.map(d => (
            <button key={d.ch.id + d.job.id} className="lib-card" onClick={() => set({ libJob: `${d.ch.id}/${d.job.id}` })}>
              <Poster d={d} />
              <div className="lib-meta">
                <b>{d.job.title}</b>
                <span>{d.name} · {d.job.id} · xong lúc {fmt.time(d.job.doneAt ?? d.job.updated)}</span>
              </div>
            </button>
          ))}
        </div>
      ) : <Empty>{all.length ? 'Không có video khớp bộ lọc.' : 'Chưa có video nào xong. Video đi hết quy trình sẽ hiện ở đây.'}</Empty>}
      {current && <Watch d={current} onClose={() => set({ libJob: null })} />}
    </div>
  );
}

/* ---------- trang xem ---------- */
interface Media { name: string; size: number; type: string }

function Watch({ d, onClose }: { d: Done; onClose: () => void }) {
  const key = `${d.ch.id}/${d.job.id}`;
  const [yt, setYt] = useState(() => loadLinks()[key] ?? '');
  const [draft, setDraft] = useState(yt);
  const [media, setMedia] = useState<Media[] | null>(null);
  const [showScript, setShowScript] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  // video thật nằm trên máy chủ (chỉ khi chạy trực tiếp)
  useEffect(() => {
    setMedia(null);
    if (!live) return;
    let alive = true;
    fetch(apiUrl(`/api/media/${encodeURIComponent(d.job.id)}`)).then(r => (r.ok ? r.json() : { files: [] })).then(j => { if (alive) setMedia(j.files ?? []); }).catch(() => alive && setMedia([]));
    return () => { alive = false; };
  }, [d.job.id]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k); panel.current?.focus();
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  const ytId = yt ? youtubeId(yt) : null;
  const file = media?.find(m => /^video\//.test(m.type));
  const script = lastOutput(d.job, scriptStep(d.ch)?.id ?? '');
  const research = lastOutput(d.job, researchStep(d.ch)?.id ?? '');
  const gates = d.ch.workflow.steps.filter(s => s.gate).map(s => { const r = d.job.steps[s.id]?.runs.filter(x => x.score !== undefined); return { name: s.name, score: r?.[r.length - 1]?.score, tries: r?.length ?? 0, threshold: s.gate!.threshold }; });
  const rework = Object.values(d.job.steps).reduce((n, x) => n + x.attempts, 0);
  const made = (d.job.doneAt ?? d.job.updated) - d.job.created;

  return (
    <div className="watch-wrap" role="dialog" aria-modal="true" aria-label={`Xem video ${d.job.title}`} onClick={onClose}>
      <div className="watch" ref={panel} tabIndex={-1} onClick={e => e.stopPropagation()}>
        <div className={`player${d.vertical ? ' v' : ''}`}>
          {ytId ? (
            <iframe title={d.job.title} src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`} allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          ) : file ? (
            <video controls preload="metadata" src={apiUrl(`/api/media/${encodeURIComponent(d.job.id)}/${encodeURIComponent(file.name)}`)} />
          ) : (
            <Animatic d={d} script={script} research={research} />
          )}
        </div>
        <div className="watch-side">
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div><div className="muted" style={{ fontSize: 12 }}>{d.name} · {d.job.id}</div><h2 style={{ fontSize: 18, marginTop: 2 }}>{d.job.title}</h2></div>
            <button className="btn sm" onClick={onClose} aria-label="Đóng">Đóng</button>
          </div>
          <div className="source-note">
            {ytId ? <>Đang phát từ YouTube. <a href={`https://www.youtube.com/watch?v=${ytId}`} target="_blank" rel="noreferrer">Mở trên YouTube</a></>
              : file ? <>Đang phát file <code>{file.name}</code> ({(file.size / 1048576).toFixed(1)} MB) trên máy của bạn.</>
              : <>Đây là <b>bản xem trước dựng từ kịch bản</b>, chưa phải video thật. Dán link YouTube bên dưới{live ? <>, hoặc đặt file MP4 vào <code>server/data/jobs/{d.job.id}/</code></> : null} để xem video thật.</>}
          </div>
          <form className="row" onSubmit={e => { e.preventDefault(); const v = draft.trim(); if (v && !youtubeId(v)) return; saveLink(key, v); setYt(v); }}>
            <input className="input" style={{ flex: 1, minWidth: 0 }} value={draft} onChange={e => setDraft(e.target.value)} placeholder="Link YouTube của video này" aria-label="Link YouTube" />
            <button className="btn sm primary" disabled={!!draft.trim() && !youtubeId(draft)}>{yt ? 'Cập nhật' : 'Gắn link'}</button>
            {yt && <button type="button" className="btn sm" onClick={() => { saveLink(key, ''); setYt(''); setDraft(''); }}>Bỏ link</button>}
          </form>
          {draft.trim() && !youtubeId(draft) && <div className="muted" style={{ fontSize: 12, color: 'var(--err)' }}>Link chưa đúng dạng YouTube (watch, youtu.be hoặc shorts).</div>}

          <div className="watch-stats">
            <div><b>{fmt.dur(made)}</b><span>thời gian sản xuất</span></div>
            <div><b>{fmt.usd(d.job.cost)}</b><span>chi phí</span></div>
            <div><b>{fmt.num(d.job.tokens)}</b><span>token</span></div>
            <div><b>{rework}</b><span>lần trả về</span></div>
          </div>
          {gates.length > 0 && (
            <div className="card flat">
              <b style={{ fontSize: 13 }}>Cổng chất lượng</b>
              {gates.map(g => (
                <div key={g.name} className="row" style={{ justifyContent: 'space-between', fontSize: 13 }}>
                  <span>{g.name}</span>
                  <span style={{ color: g.score !== undefined && g.score >= g.threshold ? 'var(--ok)' : 'var(--muted)' }}>{g.score ?? '—'}/{g.threshold}{g.tries > 1 ? ` · ${g.tries} lần chấm` : ''}</span>
                </div>
              ))}
            </div>
          )}
          {script && (
            <div className="card flat">
              <div className="row" style={{ justifyContent: 'space-between' }}><b style={{ fontSize: 13 }}>Kịch bản</b><button className="btn sm ghost" onClick={() => setShowScript(!showScript)}>{showScript ? 'Thu gọn' : 'Xem đầy đủ'}</button></div>
              <div className={showScript ? 'script full' : 'script clamp'}>{script}</div>
            </div>
          )}
          <button className="btn" onClick={() => { useUI.getState().set({ ch: d.ch.id, selJob: d.job.id, libJob: null }); go('video'); }}>Xem dòng thời gian sản xuất</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- bản xem trước dựng từ kịch bản ---------- */
interface Scene { kind: 'hook' | 'beat' | 'cta'; text: string; secs: number }

function buildScenes(d: Done, script: string, research: string): Scene[] {
  // tách câu từ kịch bản thật (bỏ dòng đánh dấu như HOOK:, [0:03]…), giữ câu đủ nghĩa
  const lines = script.split(/\n+|(?<=[.!?…])\s+/).map(s => s.replace(/^[#>*\-\s]*|^\[?\d{1,2}:\d{2}[^\]]*\]?\s*|^(HOOK|TWIST|CTA|THÂN|BODY)\s*[:\-–]\s*/gi, '').trim()).filter(s => s.length > 12 && s.length < 160);
  const hookMatch = research.match(/Hook gợi ý:\s*“([^”]+)”/);
  const scenes: Scene[] = [];
  scenes.push({ kind: 'hook', text: lines[0] ?? hookMatch?.[1] ?? 'Bạn có dám nghe tới cuối?', secs: 3 });
  const body = lines.length > 2 ? lines.slice(1, -1) : [d.job.title, ...(research ? [research.replace(/Hook gợi ý:.*$/, '').trim()] : [])].filter(Boolean);
  for (const t of body.slice(0, 14)) scenes.push({ kind: 'beat', text: t, secs: Math.min(6, Math.max(2.5, t.length / 18)) });
  scenes.push({ kind: 'cta', text: lines.length > 2 ? lines[lines.length - 1] : 'Thích thì bấm like và theo dõi để nghe chuyện tiếp theo.', secs: 4 });
  return scenes;
}

function Animatic({ d, script, research }: { d: Done; script: string; research: string }) {
  const scenes = useMemo(() => buildScenes(d, script, research), [d, script, research]);
  const total = scenes.reduce((s, x) => s + x.secs, 0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduce = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  useEffect(() => {
    if (!playing) return;
    let last = performance.now(), raf = 0;
    const tick = (now: number) => { const dt = (now - last) / 1000; last = now; setT(v => { const n = v + dt; if (n >= total) { setPlaying(false); return total; } return n; }); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);
  let acc = 0, idx = 0;
  for (let i = 0; i < scenes.length; i++) { if (t < acc + scenes[i].secs) { idx = i; break; } acc += scenes[i].secs; idx = i; }
  const sc = scenes[idx];
  const [a, b, ink] = THEME_BG[d.theme] ?? THEME_BG.horror;
  const h = hash(d.job.id + idx);
  return (
    <div className="animatic" style={{ ['--a' as string]: a, ['--b' as string]: b, ['--ink' as string]: ink }}>
      <div key={idx} className={`an-scene ${sc.kind}${reduce ? '' : ' moving'}`} style={{ backgroundPosition: `${h % 100}% ${(h >> 7) % 100}%` }}>
        {sc.kind === 'hook' && <span className="an-tag">Mở đầu</span>}
        {sc.kind === 'cta' && <span className="an-tag">Kết</span>}
        <p>{sc.text}</p>
        <span className="an-title">{d.job.title}</span>
      </div>
      <div className="an-ctrl">
        <button className="btn sm" onClick={() => { if (t >= total) setT(0); setPlaying(!playing); }} aria-label={playing ? 'Tạm dừng' : 'Phát'}>{playing ? '❚❚' : '▶'}</button>
        <input type="range" min={0} max={total} step={0.1} value={t} onChange={e => setT(+e.target.value)} aria-label="Vị trí phát" style={{ flex: 1, accentColor: 'var(--accent)' }} />
        <span className="mono" style={{ fontSize: 12 }}>{mmss(t)} / {mmss(total)}</span>
      </div>
      <span className="an-badge">Bản xem trước · {scenes.length} cảnh</span>
    </div>
  );
}
