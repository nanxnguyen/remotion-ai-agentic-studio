import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import type { FactoryEvent } from '../engine/types';
import { OverlayCtx } from '../render/labels';
import { agentStatus, homeStep, progress, waitingHuman } from '../engine/sim';
import { factory, fmt, go, useUI } from '../store';
import { Scene } from '../render/Scene';
import { RobotLab } from '../render/RobotLab';

const LAB = (() => { try { return new URLSearchParams(location.search).has('lab'); } catch { return false; } })();
import { AGENT_META, AgentBadge, Avatar, Bar, Empty, Mark, StepBadge } from '../ui';

export function Floor3D({ visible }: { visible: boolean }) {
  useUI(s => (visible ? s.rev : 0));
  const chId = useUI(s => s.ch);
  const follow = useUI(s => s.follow);
  const cine = useUI(s => s.cine);
  const set = useUI(s => s.set);
  const ch = factory.channels[chId];
  const overlay = useRef<HTMLDivElement>(null);
  return (
    <div className="floor3d" style={visible ? undefined : { display: 'none' }} aria-hidden={!visible}>
      <div className={`stage${cine ? ' cine-bars' : ''}`}>
        <OverlayCtx.Provider value={overlay}>
        <Canvas frameloop={visible ? 'always' : 'never'} dpr={[1, 2]} camera={{ position: [0, 40, 44], fov: 38, near: 0.5, far: 400 }} shadows gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
          onPointerMissed={() => set({ selStep: null })}>
          <Suspense fallback={null}>{LAB ? <RobotLab theme={useUI.getState().theme} /> : <Scene chId={chId} version={ch.workflow.version} />}</Suspense>
        </Canvas>
        </OverlayCtx.Provider>
        <div ref={overlay} className="overlay3d" aria-hidden="true" />
        <div className="ov legend">
          {(['idle', 'thinking', 'working', 'walking', 'waiting_human', 'error', 'break'] as const).map(k => (
            <span key={k}><Mark shape={AGENT_META[k].shape} color={AGENT_META[k].color} size={10} />{AGENT_META[k].label}</span>
          ))}
        </div>
        {cine && <CineCaption chId={chId} />}
        <div className="ov hint">Kéo xoay · cuộn zoom · bấm phòng hoặc nhân vật</div>
        <div className="ov camctl">
          <button className={`btn sm${cine ? ' primary' : ''}`} aria-pressed={cine} onClick={() => set({ cine: !cine, follow: false })} title="Camera tự lia tới nơi vừa có chuyện">{cine ? '■ Dừng điện ảnh' : '▶ Điện ảnh'}</button>
          <label className="toggle"><input type="checkbox" checked={follow} disabled={cine} onChange={e => set({ follow: e.target.checked })} /> Bám theo agent</label>
          <button className="btn sm" onClick={() => { set({ selStep: null, follow: false, cine: false }); window.dispatchEvent(new Event('xv-overview')); }}>Toàn cảnh</button>
        </div>
      </div>
      {visible && <Inspector />}
    </div>
  );
}

/** Phụ đề chế độ điện ảnh: kể lại chuyện vừa xảy ra trên tầng. */
function CineCaption({ chId }: { chId: string }) {
  const [cap, setCap] = useState<{ who: string; text: string; c: string; k: number } | null>(null);
  useEffect(() => {
    const f = (ev: Event) => {
      const e = (ev as CustomEvent<FactoryEvent>).detail;
      if (!e || e.ch !== chId) return;
      const ch = factory.channels[chId];
      const step = 'stepId' in e ? ch.workflow.steps.find(s => s.id === e.stepId) : undefined;
      const agent = step && ch.workflow.agents.find(a => a.id === step.agentId);
      const job = 'jobId' in e ? ch.jobs[e.jobId] : undefined;
      const who = agent?.name ?? 'Xưởng';
      let text = '', c = 'var(--accent)';
      if (e.type === 'step.started') { text = `bắt tay vào ${step?.name.toLowerCase()} “${job?.title}”`; c = 'var(--run)'; }
      else if (e.type === 'gate.scored') { text = e.passed ? `chấm ${e.score} điểm, cho qua “${job?.title}”` : `chấm ${e.score}/${e.threshold}, trả về sửa`; c = e.passed ? 'var(--ok)' : 'var(--err)'; }
      else if (e.type === 'human.requested') { text = `cần bạn duyệt “${job?.title}”`; c = 'var(--need)'; }
      else if (e.type === 'step.failed') { text = `gặp lỗi: ${e.error}`; c = 'var(--err)'; }
      else if (e.type === 'job.done') { text = `“${job?.title}” đã lên YouTube (Private)`; c = 'var(--ok)'; }
      else return;
      setCap(p => ({ who, text, c, k: (p?.k ?? 0) + 1 }));
    };
    window.addEventListener('xv-cine', f); return () => window.removeEventListener('xv-cine', f);
  }, [chId]);
  if (!cap) return null;
  return <div key={cap.k} className="ov cine-cap" style={{ ['--c' as string]: cap.c }} role="status"><b>{cap.who}</b><span>{cap.text}</span></div>;
}

function Inspector() {
  const chId = useUI(s => s.ch), sel = useUI(s => s.selStep), set = useUI(s => s.set);
  const ch = factory.channels[chId];
  const t = factory.t;
  const wf = ch.workflow;
  const needs = waitingHuman(ch);
  const errors = Object.values(ch.agents).filter(a => a.error);
  const running = Object.values(ch.jobs).filter(j => j.status === 'running').length;
  const done = Object.values(ch.jobs).filter(j => j.status === 'done').length;

  const step = sel && sel !== 'director' ? wf.steps.find(s => s.id === sel) : undefined;
  const def = step ? wf.agents.find(a => a.id === step.agentId) : sel === 'director' ? wf.agents.find(a => a.role === 'director') : undefined;
  const a = def && ch.agents[def.id];

  return (
    <aside className="insp" aria-label="Bảng điều khiển phòng">
      <section>
        <h3>Tầng này</h3>
        <div className="row" style={{ gap: 14 }}>
          <span><b className="num">{running}</b> <span className="muted">đang chạy</span></span>
          <span><b className="num">{done}</b> <span className="muted">đã đăng</span></span>
          <span style={{ color: needs.length + errors.length ? 'var(--need)' : undefined }}><b className="num">{needs.length + errors.length}</b> cần bạn</span>
        </div>
      </section>
      {def && a ? (
        <section>
          <div className="agent-head">
            <Avatar agent={def} size={44} />
            <div className="grow"><b>{def.name}</b><span>{def.title} · {def.model}</span></div>
            <AgentBadge status={agentStatus(ch, a, t)} />
          </div>
          <div className="muted" style={{ fontSize: 13 }}>“{def.trait}”</div>
          {a.jobId && ch.jobs[a.jobId] && (
            <div className="card flat" style={{ padding: 10 }}>
              <div style={{ fontWeight: 600 }}>{ch.jobs[a.jobId].title}</div>
              <div className="muted mono">{a.jobId}{a.error ? ` · ${a.error}` : ''}</div>
              {agentStatus(ch, a, t) === 'working' && <Bar value={progress(a, t)} />}
              <div className="row">
                {a.error && <button className="btn primary sm" onClick={() => factory.retry(chId, a.id)}>Retry</button>}
                <button className="btn sm" onClick={() => { set({ selJob: a.jobId! }); go('video'); }}>Mở video</button>
              </div>
            </div>
          )}
          {def.role === 'human' && (
            <div className="list">
              {needs.map(n => (
                <div key={n.job.id + n.step.id} className="item">
                  <div className="grow"><div className="t">{n.job.title}</div><div className="s">{n.step.name} · chờ {fmt.dur(t - (n.job.steps[n.step.id].requestedAt ?? t))}</div></div>
                  <button className="btn primary sm" onClick={() => factory.approve(chId, n.job.id, n.step.id)}>Duyệt</button>
                </div>
              ))}
              {!needs.length && <Empty>Không có việc chờ duyệt.</Empty>}
            </div>
          )}
          {step && <><h3>Prompt</h3><pre>{step.prompt || '—'}</pre></>}
          {Object.keys(a.lessons).length > 0 && (
            <>
              <h3>Sổ tay bài học</h3>
              <div className="list">{Object.entries(a.lessons).sort((x, y) => y[1] - x[1]).slice(0, 3).map(([k, n]) => <div key={k} className="lesson"><span className="chip num">{n}×</span><span>{k}</span></div>)}</div>
            </>
          )}
          {step && <RecentRuns chId={chId} stepId={step.id} />}
          <div className="row">
            {step && <button className="btn sm" onClick={() => go('workflow')}>Sửa bước này</button>}
            <button className="btn sm" onClick={() => go('agents')}>Xem mọi agent</button>
          </div>
        </section>
      ) : (
        <>
          <section>
            <h3>Cần bạn</h3>
            <div className="list">
              {needs.map(n => (
                <div key={n.job.id + n.step.id} className="item">
                  <Mark shape="diamond" color="var(--need)" />
                  <div className="grow"><div className="t">{n.job.title}</div><div className="s">{n.step.name}</div></div>
                  <button className="btn primary sm" onClick={() => factory.approve(chId, n.job.id, n.step.id)}>Duyệt</button>
                </div>
              ))}
              {errors.map(e => {
                const d = wf.agents.find(x => x.id === e.id);
                return (
                  <div key={e.id} className="item">
                    <Mark shape="tri" color="var(--err)" />
                    <div className="grow"><div className="t">{d?.title}: lỗi</div><div className="s">{e.error}</div></div>
                    <button className="btn primary sm" onClick={() => factory.retry(chId, e.id)}>Retry</button>
                  </div>
                );
              })}
              {!needs.length && !errors.length && <Empty>Không có gì chờ bạn.</Empty>}
            </div>
          </section>
          <section>
            <h3>Các phòng</h3>
            <div className="list">
              {wf.steps.map(s => {
                const d = wf.agents.find(x => x.id === s.agentId)!;
                const ag = ch.agents[d.id];
                const st = ag ? agentStatus(ch, ag, t) : 'idle';
                let q = 0; for (const id of ch.order) if (ch.jobs[id].status === 'running' && ch.jobs[id].steps[s.id]?.status === 'queued') q++;
                const here = ag && ag.stepId === s.id;
                return (
                  <button key={s.id} className="item" onClick={() => set({ selStep: s.id })}>
                    <Avatar agent={d} size={26} />
                    <div className="grow"><div className="t">{s.name}</div><div className="s">{d.name}{q ? ` · ${q} hồ sơ trong khay` : ''}</div></div>
                    {homeStep(ch, d.id) === s.id || here ? <AgentBadge status={st} /> : null}
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}
    </aside>
  );
}

function RecentRuns({ chId, stepId }: { chId: string; stepId: string }) {
  const ch = factory.channels[chId];
  const runs: { title: string; jobId: string; r: (typeof ch.jobs)[string]['steps'][string]['runs'][number] }[] = [];
  for (const id of ch.order.slice().reverse()) {
    const j = ch.jobs[id];
    for (const r of (j.steps[stepId]?.runs ?? []).slice().reverse()) if (r.end) runs.push({ title: j.title, jobId: j.id, r });
    if (runs.length >= 5) break;
  }
  if (!runs.length) return null;
  return (
    <>
      <h3>Lần làm gần nhất</h3>
      <div className="list">
        {runs.slice(0, 5).map((x, k) => (
          <div key={k} className="row" style={{ fontSize: 12.5, justifyContent: 'space-between' }}>
            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{x.title}</span>
            {x.r.error ? <StepBadge status="error" /> : x.r.score !== undefined ? <span className="badge" style={{ color: x.r.passed ? 'var(--ok)' : 'var(--err)' }}>{x.r.score}/100</span> : <StepBadge status="done" />}
            <span className="num muted">{fmt.dur((x.r.end ?? 0) - x.r.start)}</span>
          </div>
        ))}
      </div>
    </>
  );
}
