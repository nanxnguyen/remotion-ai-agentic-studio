import { agentStatus, homeStep } from '../engine/sim';
import { factory, fmt, go, useUI } from '../store';
import { agentColor } from '../theme/lch';
import { AgentBadge, Avatar, Bar } from '../ui';

export function Agents() {
  useUI(s => s.rev);
  const chId = useUI(s => s.ch), set = useUI(s => s.set);
  const ch = factory.channels[chId];
  const t = factory.t;
  return (
    <div className="page">
      <div className="page-head">
        <div className="grow"><h1>Agents</h1><div className="sub">Mỗi agent là một nhân vật có danh tính, sổ tay bài học và chỉ số riêng. Số liệu tính từ lúc mở trang.</div></div>
      </div>
      <div className="cards">
        {ch.workflow.agents.map(def => {
          const a = ch.agents[def.id];
          if (!a) return null;
          const st = agentStatus(ch, a, t);
          const span = Math.max(1, t - a.since);
          const util = Math.min(1, a.stats.busy / span);
          const n = a.stats.done + a.stats.rejects;
          const avg = n ? a.stats.work / n : 0;
          const avgScore = a.stats.scores.length ? a.stats.scores.reduce((x, y) => x + y, 0) / a.stats.scores.length : 0;
          const steps = ch.workflow.steps.filter(s => s.agentId === def.id);
          const lessons = Object.entries(a.lessons).sort((x, y) => y[1] - x[1]).slice(0, 3);
          return (
            <article key={def.id} className="card acard" style={{ ['--c' as string]: agentColor(def.hue) }}>
              <div className="agent-head">
                <Avatar agent={def} size={42} />
                <div className="grow"><b>{def.name}</b><span>{def.title} · {def.model}</span></div>
                <AgentBadge status={st} />
              </div>
              <div className="muted" style={{ fontSize: 13 }}>“{def.trait}”{steps.length ? ` · phụ trách ${steps.map(s => s.name).join(', ')}` : ''}</div>
              {def.role !== 'director' && def.role !== 'human' && (
                <>
                  <div className="mstats">
                    <div><b>{a.stats.done}</b><span>Đã chuyển tiếp</span></div>
                    {def.role === 'reviewer'
                      ? <div><b>{a.stats.rejects}</b><span>Đã trả về</span></div>
                      : <div><b>{a.stats.errors}</b><span>Lỗi</span></div>}
                    <div><b>{def.role === 'reviewer' ? (avgScore ? avgScore.toFixed(0) : '–') : avg ? fmt.dur(avg) : '–'}</b><span>{def.role === 'reviewer' ? 'Điểm TB đã chấm' : 'TB mỗi hồ sơ'}</span></div>
                  </div>
                  <div className="row" style={{ justifyContent: 'space-between', fontSize: 12 }}><span className="muted">Mức bận</span><span className="num">{Math.round(util * 100)}%</span></div>
                  <Bar value={util} color={agentColor(def.hue)} />
                  <div className="row" style={{ justifyContent: 'space-between', fontSize: 12 }}><span className="muted">Chi phí đã dùng</span><span className="num">{fmt.usd(a.stats.cost)} · {fmt.num(a.stats.tokens)} token</span></div>
                </>
              )}
              {lessons.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: 6 }}>Sổ tay bài học</h3>
                  {lessons.map(([k, v]) => <div key={k} className="lesson"><span className="chip num">{v}×</span><span>{k}</span></div>)}
                </div>
              )}
              <div className="row">
                <button className="btn sm" onClick={() => { set({ selStep: def.role === 'director' ? 'director' : homeStep(ch, def.id) ?? null }); go('xuong'); }}>Xem trong xưởng</button>
                {steps[0] && <button className="btn sm" onClick={() => go('workflow')}>Sửa cấu hình</button>}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
