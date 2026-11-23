import { create } from 'zustand';
import { Factory } from './engine/factory';
import { CHANNELS } from './engine/presets';
import type { FactoryEvent, Workflow } from './engine/types';
import { LiveFactory, post, probe, type LiveInfo } from './live';

const KEY = 'xuong-video-workflows-v3';
function loadOverrides(): Record<string, Workflow> {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
}
export function saveWorkflow(chId: string, wf: Workflow) {
  try { const o = loadOverrides(); o[chId] = wf; localStorage.setItem(KEY, JSON.stringify(o)); } catch { /* không lưu được thì thôi */ }
}

export let factory: Factory;
export let live: LiveFactory | null = null;

function mockFactory() {
  const f = new Factory(CHANNELS, (Date.now() % 100000) + 1, loadOverrides());
  // chạy trước ~8 phút để xưởng có lịch sử; giả lập bạn đã duyệt / retry vài lần
  for (let k = 0; k < 1900; k++) {
    f.advance(0.25);
    for (const ch of Object.values(f.channels)) {
      for (const j of Object.values(ch.jobs)) {
        if (j.status !== 'running') continue;
        for (const [sid, st] of Object.entries(j.steps)) {
          if (st.status === 'waiting_human' && f.t - (st.requestedAt ?? 0) > 6 && k < 1800) f.approve(ch.id, j.id, sid);
        }
      }
      if (k < 1800) for (const a of Object.values(ch.agents)) if (a.error) f.retry(ch.id, a.id);
    }
  }
  return f;
}

/** Bước này có gọi Claude thật không (chỉ ở chế độ trực tiếp). */
export const isRealStep = (chId: string, stepId: string) => !!live && live.liveCh === chId && live.info.realSteps.includes(stepId);

export type View = 'tong-quan' | 'xuong' | 'workflow' | 'video' | 'thu-vien' | 'agents' | 'do-luong' | 'su-kien';
export const VIEWS: { id: View; label: string }[] = [
  { id: 'tong-quan', label: 'Tổng quan' },
  { id: 'xuong', label: 'Xưởng 3D' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'video', label: 'Video' },
  { id: 'thu-vien', label: 'Thư viện' },
  { id: 'agents', label: 'Agents' },
  { id: 'do-luong', label: 'Đo lường' },
  { id: 'su-kien', label: 'Sự kiện' },
];

export interface Toast { id: number; kind: 'need' | 'err' | 'ok'; text: string; ch: string; jobId?: string; lib?: boolean }

interface UI {
  rev: number;
  ch: string;
  view: View;
  paused: boolean;
  speed: number;
  theme: 'night' | 'day' | 'contrast';
  selStep: string | null;
  selJob: string | null;
  follow: boolean;
  sound: boolean;
  cmdk: boolean;
  toasts: Toast[];
  live: LiveInfo | null;
  cine: boolean;
  libJob: string | null;   // kênh/mã video đang mở trong Thư viện
  conn: boolean;
  set: (p: Partial<UI>) => void;
}

const readHash = (): View => {
  const h = location.hash.slice(1);
  return (VIEWS.find(v => v.id === h)?.id) ?? 'tong-quan';
};

let savedTheme: UI['theme'] = 'night';
try { const v = localStorage.getItem('xv-theme'); if (v === 'day' || v === 'contrast' || v === 'night') savedTheme = v; } catch { /* */ }

export const useUI = create<UI>(set => ({
  rev: 0, ch: 'hcl', view: readHash(), paused: false, speed: 1, theme: savedTheme,
  selStep: null, selJob: null, follow: false, sound: false, cmdk: false, toasts: [], live: null, conn: true, cine: false, libJob: null,
  set: p => set(p),
}));

window.addEventListener('hashchange', () => useUI.getState().set({ view: readHash() }));
export const go = (v: View) => { if (location.hash !== '#' + v) location.hash = v; else useUI.getState().set({ view: v }); };

/* ---- Thông báo ---- */
let toastId = 0;
function beep(freq: number) {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ac = new AC(); const o = ac.createOscillator(); const g = ac.createGain();
    o.frequency.value = freq; o.type = 'sine'; g.gain.setValueAtTime(0.0001, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.12, ac.currentTime + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.35);
    o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + 0.4);
  } catch { /* trình duyệt chặn âm thanh */ }
}
export function pushToast(t: Omit<Toast, 'id'>) {
  const s = useUI.getState();
  const toast = { ...t, id: ++toastId };
  s.set({ toasts: [...s.toasts.slice(-3), toast] });
  if (s.sound) beep(t.kind === 'err' ? 300 : t.kind === 'need' ? 660 : 880);
  setTimeout(() => { const st = useUI.getState(); st.set({ toasts: st.toasts.filter(x => x.id !== toast.id) }); }, 5500);
}

export const fmt = {
  time: (t: number) => { const s = Math.max(0, Math.floor(t)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; },
  dur: (s: number) => (s >= 60 ? `${Math.floor(s / 60)}p ${Math.round(s % 60)}s` : `${s.toFixed(1)}s`),
  usd: (v: number) => `$${v < 0.01 ? v.toFixed(4) : v.toFixed(3)}`,
  num: (v: number) => v.toLocaleString('vi-VN'),
};

/** Khởi động: thử nối máy chủ (Claude thật); không được thì chạy mô phỏng. */
export async function initStore() {
  const d = await probe();
  if (d) {
    const lf = new LiveFactory(d.info.realChannel, d, (Date.now() % 100000) + 1);
    live = lf; factory = lf;
    useUI.getState().set({ live: d.info, ch: d.info.realChannel, paused: d.info.paused, speed: d.info.speed });
    lf.onInfo = i => useUI.getState().set({ live: i });
    lf.onConn = ok => useUI.getState().set({ conn: ok });
    lf.connect();
  } else {
    factory = mockFactory();
  }
  startLoop();
}

const chName = (id: string) => CHANNELS.find(c => c.id === id)?.name ?? id;

function startLoop() {
  factory.listeners.add((e: FactoryEvent) => {
    const ch = factory.channels[e.ch];
    if (e.type === 'human.requested') {
      const j = ch.jobs[e.jobId]; if (e.reason !== 'Cổng duyệt cuối') pushToast({ kind: 'need', ch: e.ch, jobId: e.jobId, text: `${chName(e.ch)}: “${j?.title}” cần bạn duyệt (${e.reason})` });
    } else if (e.type === 'step.failed' && !e.retry) {
      const s = ch.workflow.steps.find(x => x.id === e.stepId);
      pushToast({ kind: 'err', ch: e.ch, jobId: e.jobId, text: `${chName(e.ch)}: ${s?.name} lỗi — ${e.error}` });
    } else if (e.type === 'step.blocked' && live && e.ch === live.liveCh) {
      pushToast({ kind: 'need', ch: e.ch, jobId: e.jobId, text: `${chName(e.ch)}: tạm dừng gọi Claude — ${e.reason}` });
    } else if (e.type === 'job.done') {
      pushToast({ kind: 'ok', ch: e.ch, jobId: e.jobId, text: `${chName(e.ch)}: “${ch.jobs[e.jobId]?.title}” đã đăng Private`, lib: true });
    }
  });

  let last = performance.now(), lastUi = 0;
  const loop = (now: number) => {
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    const s = useUI.getState();
    if (!s.paused) {
      let left = dt * s.speed;
      while (left > 0) { const d = Math.min(0.25, left); factory.advance(d); left -= d; }
    }
    if (now - lastUi > 350) { lastUi = now; s.set({ rev: factory.rev + Math.floor(factory.t) }); }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/** Tạm dừng / tốc độ: ở chế độ trực tiếp gửi luôn lên máy chủ. */
export function setPaused(on: boolean) { useUI.getState().set({ paused: on }); if (live) void post({ type: 'pause', on }); }
export function setSpeed(v: number) { useUI.getState().set({ speed: v }); if (live) void post({ type: 'speed', value: v }); }
