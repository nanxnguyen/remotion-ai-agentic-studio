import { useMemo, useState } from 'react';
import { topo } from '../engine/graph';
import { agentStatus } from '../engine/sim';
import type { ChannelState, FactoryEvent, Job, StepDef } from '../engine/types';
import { factory, fmt, go, isRealStep, useUI } from '../store';
import { Avatar, Empty, Kpi, Mark, STEP_META, StepBadge } from '../ui';

type Filter = 'all' | 'running' | 'need' | 'done' | 'cancelled';

function jobState(ch: ChannelState, j: Job): { label: string; color: string; step?: StepDef } {
  if (j.status === 'done') return { label: 'Đã đăng', color: 'var(--ok)' };
  if (j.status === 'cancelled') return { label: 'Đã hủy', color: 'var(--faint)' };
  const order = topo(ch.workflow) ?? [];
  for (const p of ['error', 'waiting_human', 'active', 'handoff', 'queued'] as const) {
    for (const id of order) if (j.steps[id]?.status === p) return { label: STEP_META[p].label, color: STEP_META[p].color, step: ch.workflow.steps.find(s => s.id === id) };
  }
  return { label: 'Đang chờ', color: 'var(--muted)' };
}

export function Videos() {
  useUI(s => s.rev);
  const chId = useUI(s => s.ch), selJob = useUI(s => s.selJob), set = useUI(s => s.set);
  const ch = factory.channels[chId];
  const [q, setQ] = useState('');
  const [f, setF] = useState<Filter>('all');
  const rows = ch.order.slice().reverse().map(id => ch.jobs[id]).filter(j => {
    if (q && !(`${j.id} ${j.title}`.toLowerCase().includes(q.toLowerCase()))) return false;
    const s = jobState(ch, j);
    if (f === 'running') return j.status === 'running';
    if (f === 'need') return j.status === 'running' && (s.label === 'Cần bạn' || s.label === 'Lỗi');
    if (f === 'done') return j.status === 'done';
    if (f === 'cancelled') return j.status === 'cancelled';
    return true;
  });
  const job = (selJob ? ch.jobs[selJob] : undefined) ?? rows.find(j => j.status === 'running') ?? rows[0];

  return (
    <div className="vid">
      <div className="vid-list">
        <div className="page-head">
          <div className="grow"><h1>Video</h1><div className="sub">{Object.keys(ch.jobs).length} video trên kênh này. Bấm một dòng để xem dòng thời gian, tua lại hoặc chạy lại từ một bước.</div></div>
          <form className="row" onSubmit={e => { e.preventDefault(); const t = (new FormData(e.currentTarget).get('title') as string).trim(); if (t) { factory.addJob(chId, t); e.currentTarget.reset(); } }}>
            <input className="input" name="title" placeholder="Tiêu đề video mới" aria-label="Tiêu đề video mới" style={{ width: 220 }} />
            <button className="btn primary">Tạo video</button>
          </form>
        </div>
        <div className="row">
          <input className="input" style={{ width: 240 }} value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm theo tiêu đề hoặc mã…" aria-label="Tìm video" />
          <div className="seg" role="group" aria-label="Lọc">
            {([['all', 'Tất cả'], ['running', 'Đang chạy'], ['need', 'Cần bạn'], ['done', 'Đã đăng'], ['cancelled', 'Đã hủy']] as const).map(([k, l]) => <button key={k} aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}
          </div>
        </div>
        <div className="tablewrap">
          <table>
            <thead><tr><th>Mã</th><th>Tiêu đề</th><th>Trạng thái</th><th>Lần trả về</th><th>Chi phí</th><th>Thời gian</th></tr></thead>
            <tbody>
              {rows.map(j => {
                const s = jobState(ch, j);
                const rework = Object.values(j.steps).reduce((n, x) => n + x.attempts, 0);
                return (
                  <tr key={j.id} className={`click${j.id === job?.id ? ' sel' : ''}`} onClick={() => set({ selJob: j.id })}>
                    <td className="mono">{j.id}{j.priority ? ' ★' : ''}</td>
                    <td>{j.title}</td>
                    <td><span className="badge" style={{ color: s.color }}>{s.label}</span>{s.step && <span className="muted"> · {s.step.name}</span>}</td>
                    <td className="num">{rework || '–'}</td>
                    <td className="num">{fmt.usd(j.cost)}</td>
                    <td className="num">{fmt.dur((j.doneAt ?? factory.t) - j.created)}</td>
                  </tr>
                );
              })}
              {!rows.length && <tr><td colSpan={6}><Empty>Không có video khớp bộ lọc.</Empty></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <aside className="vid-detail" aria-label="Chi tiết video">
        {job ? <Detail ch={ch} job={job} key={job.id} /> : <Empty>Chọn một video bên trái để xem chi tiết.</Empty>}
      </aside>
    </div>
  );
}

function Detail({ ch, job }: { ch: ChannelState; job: Job }) {
  const set = useUI(s => s.set);
  const [tab, setTab] = useState<'compact' | 'timeline' | 'history'>('compact');
  const [at, setAt] = useState<number | null>(null);
  const [rerun, setRerun] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const now = factory.t;
  const end = job.doneAt ?? now;
  const T = at === null ? null : Math.min(at, end);
  const view = useMemo(() => (T === null ? job : factory.stateAt(ch.id, T).jobs[job.id] ?? job), [T, job, ch.id]);
  const s = jobState(ch, job);
  const holder = Object.values(ch.agents).find(a => a.jobId === job.id && a.error);
  const waiting = Object.entries(job.steps).filter(([, x]) => x.status === 'waiting_human');
  const rework = Object.values(job.steps).reduce((n, x) => n + x.attempts, 0);
  const order = topo(ch.workflow) ?? ch.workflow.steps.map(x => x.id);

  return (
    <>
      <div>
        <div className="mono muted">{job.id}</div>
        <h1 style={{ fontSize: 20 }}>{job.title}</h1>
        <div className="row" style={{ marginTop: 4 }}><span className="badge" style={{ color: s.color }}>{s.label}</span>{s.step && <span className="muted">tại {s.step.name}</span>}</div>
      </div>
      <div className="kpis">
        <Kpi label="Chi phí" value={fmt.usd(job.cost)} hint="ước tính" />
        <Kpi label="Token" value={fmt.num(job.tokens)} />
        <Kpi label="Thời gian" value={fmt.dur(end - job.created)} />
        <Kpi label="Lần trả về" value={rework} />
      </div>
      <div className="row">
        {waiting.map(([sid]) => { const st = ch.workflow.steps.find(x => x.id === sid); return <button key={sid} className="btn primary" onClick={() => factory.approve(ch.id, job.id, sid)}>{st?.kind === 'human' ? 'Duyệt để đăng' : `Cho qua ${st?.name}`}</button>; })}
        {holder && <button className="btn primary" onClick={() => factory.retry(ch.id, holder.id)}>Retry</button>}
        {job.status === 'running' && <button className="btn" aria-pressed={job.priority} onClick={() => factory.priority(ch.id, job.id, !job.priority)}>{job.priority ? 'Bỏ ưu tiên' : 'Ưu tiên'}</button>}
        {job.status === 'running' && <button className="btn danger" onClick={() => factory.cancel(ch.id, job.id)}>Hủy video</button>}
        {job.status === 'running' && s.step && <button className="btn" onClick={() => { set({ selStep: s.step!.id }); go('xuong'); }}>Xem trong xưởng</button>}
      </div>

      <div className="card" style={{ gap: 6 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h3>Tua lại</h3>
          <span className="mono muted">{T === null ? 'Đang xem trực tiếp' : `Lúc ${fmt.time(T)} · ${fmt.dur(T - job.created)} sau khi tạo`}</span>
        </div>
        <input type="range" min={job.created} max={end} step={0.5} value={T ?? end} aria-label="Thời điểm xem lại"
          onChange={e => { const v = +e.target.value; setAt(v >= end - 0.25 ? null : v); }} style={{ accentColor: 'var(--accent)' }} />
        {T !== null && <button className="btn sm" style={{ alignSelf: 'flex-start' }} onClick={() => setAt(null)}>Về trực tiếp</button>}
      </div>

      <div className="seg" role="tablist" aria-label="Chế độ xem">
        {([['compact', 'Gọn'], ['timeline', 'Timeline'], ['history', 'Toàn bộ lịch sử']] as const).map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} aria-pressed={tab === k} onClick={() => setTab(k)}>{l}</button>)}
      </div>

      {tab === 'compact' && (
        <div>
          {order.map(id => {
            const step = ch.workflow.steps.find(x => x.id === id)!;
            const st = view.steps[id];
            if (!st) return null;
            const def = ch.workflow.agents.find(a => a.id === step.agentId);
            const last = st.runs[st.runs.length - 1];
            const meta = STEP_META[st.status];
            return (
              <div key={id} className="stepline">
                <div className="rail"><Mark shape={meta.shape} color={meta.color} pulse={st.status === 'active'} /></div>
                <div style={{ minWidth: 0 }}>
                  <div className="row" style={{ gap: 6 }}><span className="t">{step.name}</span>{def && <span className="muted" style={{ fontSize: 12 }}>· {def.name}</span>}{st.runs.length > 1 && <span className="chip">{st.runs.length} lần chạy</span>}{st.attempts > 0 && <span className="chip" style={{ color: 'var(--err)' }}>trả về {st.attempts}×</span>}{isRealStep(ch.id, id) && <span className="chip real">Claude thật</span>}</div>
                  {st.blocked && st.status === 'queued' && <div className="s" style={{ color: 'var(--need)' }}>Đang chờ: {st.blocked}</div>}
                  {last?.output && <Output text={last.output} />}
                  {last?.error && <div className="s" style={{ color: 'var(--err)' }}>{last.error}</div>}
                  {last?.reasons?.length ? <div className="s" style={{ color: 'var(--err)' }}>Lý do: {last.reasons.join(', ')}</div> : null}
                  {rerun === id && (
                    <div className="card flat" style={{ padding: 10, marginTop: 6 }}>
                      <label className="field"><span>Prompt cho lần chạy lại (để trống = giữ nguyên)</span><textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={step.prompt} /></label>
                      <div className="row">
                        <button className="btn primary sm" onClick={() => { factory.rerun(ch.id, job.id, id, prompt || undefined); setRerun(null); setPrompt(''); setAt(null); }}>Chạy lại từ {step.name}</button>
                        <button className="btn sm" onClick={() => setRerun(null)}>Thôi</button>
                      </div>
                      <div className="muted" style={{ fontSize: 12 }}>Bước này và mọi bước sau nó sẽ chạy lại. {isRealStep(ch.id, id) ? 'Prompt mới sẽ được gửi cho Claude ở lần chạy này.' : 'Bước này đang mô phỏng nên prompt mới chỉ được ghi vào lịch sử.'}</div>
                    </div>
                  )}
                </div>
                <div className="row" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <StepBadge status={st.status} />
                  {T === null && (st.status === 'done' || st.status === 'error') && rerun !== id && job.status !== 'cancelled' && <button className="btn sm" onClick={() => { setRerun(id); setPrompt(''); }}>Chạy lại từ đây</button>}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {tab === 'timeline' && <Timeline ch={ch} job={view} order={order} end={T ?? end} />}
      {tab === 'history' && <History ch={ch} jobId={job.id} until={T} />}
      {(() => {
        const a = Object.values(ch.agents).find(x => x.jobId === job.id && !x.error);
        const d = a && ch.workflow.agents.find(x => x.id === a.id);
        return d && a ? <div className="row muted" style={{ fontSize: 13 }}><Avatar agent={d} size={22} />{d.name} đang {agentStatus(ch, a, now) === 'walking' ? 'mang hồ sơ' : 'xử lý'} video này.</div> : null;
      })()}
    </>
  );
}

function Output({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 220 || text.includes('\n');
  if (!long) return <div className="s">{text}</div>;
  return (
    <div className="output">
      <div className={open ? 's full' : 's clamp'}>{text}</div>
      <div className="row" style={{ gap: 6 }}>
        <button className="btn sm ghost" onClick={() => setOpen(!open)}>{open ? 'Thu gọn' : 'Xem đầy đủ'}</button>
        {open && <button className="btn sm ghost" onClick={() => void navigator.clipboard?.writeText(text)}>Chép</button>}
      </div>
    </div>
  );
}

function Timeline({ ch, job, order, end }: { ch: ChannelState; job: Job; order: string[]; end: number }) {
  const W = 480, left = 96, rowH = 26, top = 24;
  const span = Math.max(10, end - job.created);
  const X = (t: number) => left + ((t - job.created) / span) * (W - left - 12);
  const H = top + order.length * rowH + 10;
  const tickStep = span > 600 ? 120 : span > 240 ? 60 : span > 90 ? 30 : 10;
  const ticks = Array.from({ length: Math.floor(span / tickStep) + 1 }, (_, k) => job.created + k * tickStep);
  return (
    <div className="tl">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Timeline các bước của video" className="chart">
        {ticks.map(t => <g key={t}><line x1={X(t)} x2={X(t)} y1={top - 6} y2={H - 6} stroke="var(--surface3)" /><text x={X(t)} y={12} fontSize="10.5" fill="var(--faint)" textAnchor="middle">+{fmt.time(t - job.created)}</text></g>)}
        {order.map((id, i) => {
          const step = ch.workflow.steps.find(s => s.id === id)!;
          const st = job.steps[id];
          const y = top + i * rowH;
          return (
            <g key={id}>
              <text x={8} y={y + 15} fontSize="12" fill="var(--ink)">{step.name}</text>
              {st?.runs.map((r, k) => {
                const x0 = X(r.start), x1 = X(Math.min(end, r.end ?? end));
                const color = r.error ? 'var(--err)' : r.passed === false ? 'var(--err)' : r.end ? 'var(--ok)' : 'var(--run)';
                return <rect key={k} x={x0} y={y + 5} width={Math.max(2, x1 - x0)} height={14} rx={4} fill={color} fillOpacity={r.error || r.passed === false ? 0.15 : 0.35} stroke={color} strokeWidth={1.2} strokeDasharray={r.error || r.passed === false ? '4 3' : undefined}><title>{`${step.name}: ${r.output ?? r.error ?? 'đang chạy'}`}</title></rect>;
              })}
              {st?.status === 'waiting_human' && st.requestedAt !== undefined && <rect x={X(st.requestedAt)} y={y + 5} width={Math.max(2, X(end) - X(st.requestedAt))} height={14} rx={4} fill="var(--need)" fillOpacity={0.15} stroke="var(--need)" strokeDasharray="4 3" />}
            </g>
          );
        })}
        <line x1={X(end)} x2={X(end)} y1={top - 6} y2={H - 6} stroke="var(--accent)" strokeDasharray="3 3" />
      </svg>
      <div className="row muted" style={{ fontSize: 12, marginTop: 6 }}>
        <span><Mark shape="dot" color="var(--ok)" size={9} /> xong</span><span><Mark shape="dot" color="var(--run)" size={9} /> đang chạy</span>
        <span style={{ color: 'var(--err)' }}>▭ nét đứt đỏ = bị trả về / lỗi</span><span style={{ color: 'var(--need)' }}>▭ nét đứt vàng = chờ bạn</span>
      </div>
    </div>
  );
}

const EV_LABEL: Partial<Record<FactoryEvent['type'], string>> = {
  'job.created': 'Tạo video', 'step.queued': 'Vào khay', 'step.started': 'Bắt đầu', 'step.finished': 'Làm xong', 'gate.scored': 'Chấm điểm',
  'step.reworked': 'Trả về', 'step.failed': 'Lỗi', 'step.retried': 'Thử lại', 'human.requested': 'Chờ bạn', 'human.approved': 'Bạn duyệt',
  'agent.walk': 'Mang hồ sơ', 'step.delivered': 'Giao tới', 'job.done': 'Đã đăng', 'job.cancelled': 'Hủy', 'job.priority': 'Ưu tiên', 'step.rerun': 'Chạy lại',
};

function History({ ch, jobId, until }: { ch: ChannelState; jobId: string; until: number | null }) {
  const log = factory.logs[ch.id];
  const evs = log.filter(e => ('jobId' in e && e.jobId === jobId) || (e.type === 'agent.walk' && e.walk.carrying === jobId)).filter(e => until === null || e.t <= until);
  const stepName = (id?: string) => ch.workflow.steps.find(s => s.id === id)?.name ?? id ?? '';
  const color = (e: FactoryEvent) => e.type === 'step.failed' || e.type === 'step.reworked' || (e.type === 'gate.scored' && !e.passed) ? 'var(--err)' : e.type === 'human.requested' ? 'var(--need)' : e.type === 'job.done' || e.type === 'human.approved' || (e.type === 'gate.scored' && e.passed) ? 'var(--ok)' : 'var(--faint)';
  const desc = (e: FactoryEvent) => {
    switch (e.type) {
      case 'gate.scored': return `${stepName(e.stepId)}: ${e.score}/${e.threshold}${e.reasons.length ? ' · ' + e.reasons.join(', ') : ''}`;
      case 'step.reworked': return `${stepName(e.stepId)} trả về ${stepName(e.toStep)} (lần ${e.attempt})`;
      case 'agent.walk': return `${ch.workflow.agents.find(a => a.id === e.agentId)?.name} mang tới ${e.walk.to.kind === 'step' ? stepName(e.walk.to.id) : 'cổng YouTube'}`;
      case 'step.failed': return `${stepName(e.stepId)}: ${e.error}${e.retry ? ' · tự thử lại' : ''}`;
      case 'step.rerun': return `Chạy lại từ ${stepName(e.stepId)}${e.prompt ? ' · prompt mới' : ''}`;
      default: return 'stepId' in e ? stepName(e.stepId) : '';
    }
  };
  return (
    <div className="hist">
      {evs.map((e, k) => (
        <details key={k} className="h">
          <summary style={{ display: 'contents' }}>
            <span className="ts">{fmt.time(e.t)}</span>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: color(e), marginTop: 5 }} />
            <span><b>{EV_LABEL[e.type] ?? e.type}</b> {desc(e)}</span>
          </summary>
          <pre style={{ gridColumn: '1 / -1', marginTop: 4 }}>{JSON.stringify(e, null, 2)}</pre>
        </details>
      ))}
      {!evs.length && <Empty>Chưa có sự kiện.</Empty>}
    </div>
  );
}
