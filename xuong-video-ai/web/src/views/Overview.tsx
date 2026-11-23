import { topo } from '../engine/graph';
import { CHANNELS } from '../engine/presets';
import { agentStatus, waitingHuman } from '../engine/sim';
import type { ChannelState, Job } from '../engine/types';
import { factory, fmt, go, useUI } from '../store';
import { AGENT_META, Empty, Kpi, Mark, STEP_META, StepBadge } from '../ui';

function currentStep(ch: ChannelState, j: Job) {
  const order = topo(ch.workflow) ?? ch.workflow.steps.map(s => s.id);
  const pri = ['error', 'waiting_human', 'active', 'handoff', 'queued'] as const;
  for (const p of pri) for (const id of order) if (j.steps[id]?.status === p) return { id, status: p, step: ch.workflow.steps.find(s => s.id === id)! };
  return undefined;
}

function Strip({ ch, j }: { ch: ChannelState; j: Job }) {
  const order = topo(ch.workflow) ?? [];
  return <div className="steps-strip" aria-hidden="true">{order.map(id => <i key={id} style={{ background: STEP_META[j.steps[id]?.status ?? 'pending'].color, opacity: j.steps[id]?.status === 'pending' ? .35 : 1 }} />)}</div>;
}

export function Overview() {
  useUI(s => s.rev);
  const set = useUI(s => s.set);
  const open = (chId: string, jobId: string) => { set({ ch: chId, selJob: jobId }); go('video'); };

  const need: { chId: string; j: Job; what: string; kind: 'need' | 'err' }[] = [];
  const running: { chId: string; j: Job }[] = [];
  const done: { chId: string; j: Job }[] = [];
  let doneTotal = 0, cost = 0, lead = 0, leadN = 0, gatesRun = 0, gatesPass = 0;
  for (const c of CHANNELS) {
    const ch = factory.channels[c.id];
    waitingHuman(ch).forEach(w => need.push({ chId: c.id, j: w.job, what: w.step.kind === 'human' ? 'Chờ bạn duyệt trước khi đăng' : `${w.step.name}: quá số lần trả về, bạn quyết định`, kind: 'need' }));
    Object.values(ch.agents).filter(a => a.error && a.jobId).forEach(a => {
      const s = ch.workflow.steps.find(x => x.id === a.stepId);
      need.push({ chId: c.id, j: ch.jobs[a.jobId!], what: `${s?.name ?? 'Bước'} lỗi: ${a.error}`, kind: 'err' });
    });
    for (const id of ch.order) {
      const j = ch.jobs[id];
      if (j.status === 'running') running.push({ chId: c.id, j });
      if (j.status === 'done') { done.push({ chId: c.id, j }); doneTotal++; lead += (j.doneAt! - j.created); leadN++; }
      cost += j.cost;
      for (const st of Object.values(j.steps)) for (const r of st.runs) if (r.score !== undefined) { gatesRun++; if (r.passed) gatesPass++; }
    }
  }
  const needIds = new Set(need.map(n => n.j.id));
  done.sort((a, b) => (b.j.doneAt ?? 0) - (a.j.doneAt ?? 0));
  const chName = (id: string) => CHANNELS.find(c => c.id === id)!.name;

  return (
    <div className="page">
      <div className="page-head">
        <div className="grow">
          <h1>{need.length ? `${need.length} việc đang chờ bạn` : 'Xưởng đang tự chạy, không có gì chờ bạn'}</h1>
          <div className="sub">{running.length} video đang chạy trên {CHANNELS.length} kênh. Bấm một thẻ để mở dòng thời gian của video đó.</div>
        </div>
        <button className="btn" onClick={() => go('xuong')}>Vào xưởng 3D</button>
      </div>
      <div className="kpis">
        <Kpi label="Đã đăng Private" value={doneTotal} hint="từ lúc mở trang" />
        <Kpi label="Thời gian ý tưởng → đăng" value={leadN ? fmt.dur(lead / leadN) : '–'} hint="trung bình, giờ mô phỏng" />
        <Kpi label="Chi phí mỗi video" value={doneTotal ? fmt.usd(cost / Math.max(1, doneTotal)) : '–'} hint="ước tính, giá mock" />
        <Kpi label="Tỉ lệ qua cổng lần đầu" value={gatesRun ? `${Math.round(gatesPass / gatesRun * 100)}%` : '–'} hint={`${gatesRun} lần chấm`} />
      </div>
      <div className="cols">
        <section className="col" aria-label="Cần bạn">
          <div className="col-h"><Mark shape="diamond" color="var(--need)" /><b>Cần bạn</b><span className="n">{need.length}</span></div>
          {need.map(n => (
            <div key={n.j.id + n.what} className="vcard" style={{ borderColor: n.kind === 'err' ? 'var(--err)' : 'var(--need)' }}>
              <div className="t">{n.j.title}</div>
              <div className="meta"><span className="chip">{chName(n.chId)}</span><span style={{ color: n.kind === 'err' ? 'var(--err)' : 'var(--need)' }}>{n.what}</span></div>
              <div className="row">
                {n.kind === 'need'
                  ? <button className="btn primary sm" onClick={() => { const st = Object.entries(n.j.steps).find(([, s]) => s.status === 'waiting_human'); if (st) factory.approve(n.chId, n.j.id, st[0]); }}>Duyệt</button>
                  : <button className="btn primary sm" onClick={() => { const a = Object.values(factory.channels[n.chId].agents).find(x => x.jobId === n.j.id && x.error); if (a) factory.retry(n.chId, a.id); }}>Retry</button>}
                <button className="btn sm" onClick={() => open(n.chId, n.j.id)}>Xem chi tiết</button>
              </div>
            </div>
          ))}
          {!need.length && <Empty>Không có gì chờ bạn.</Empty>}
        </section>
        <section className="col" aria-label="Đang chạy">
          <div className="col-h"><Mark shape="dot" color="var(--run)" pulse /><b>Đang chạy</b><span className="n">{running.length}</span></div>
          {running.filter(r => !needIds.has(r.j.id)).map(({ chId, j }) => {
            const ch = factory.channels[chId];
            const cur = currentStep(ch, j);
            const holder = cur && Object.values(ch.agents).find(a => a.jobId === j.id && a.stepId === cur.id);
            const def = holder && ch.workflow.agents.find(x => x.id === holder.id);
            const st = holder && agentStatus(ch, holder, factory.t);
            return (
              <button key={j.id} className="vcard" onClick={() => open(chId, j.id)}>
                <div className="t">{j.title}</div>
                <div className="meta"><span className="chip">{chName(chId)}</span>{cur ? <StepBadge status={cur.status} /> : null}<span>{cur?.step.name}</span>{def && st && <span style={{ color: AGENT_META[st].color }}>· {def.name}</span>}</div>
                <Strip ch={ch} j={j} />
              </button>
            );
          })}
          {!running.length && <Empty>Chưa có video nào đang chạy.</Empty>}
        </section>
        <section className="col" aria-label="Xong gần đây">
          <div className="col-h"><Mark shape="check" color="var(--ok)" /><b>Xong gần đây</b><span className="n">{done.length}</span></div>
          {done.slice(0, 8).map(({ chId, j }) => (
            <button key={j.id} className="vcard" onClick={() => open(chId, j.id)}>
              <div className="t">{j.title}</div>
              <div className="meta"><span className="chip">{chName(chId)}</span><span className="num">{fmt.dur(j.doneAt! - j.created)}</span><span className="num">{fmt.usd(j.cost)}</span></div>
            </button>
          ))}
          {!done.length && <Empty>Chưa có video nào xong.</Empty>}
        </section>
      </div>
    </div>
  );
}
