import { topo } from '../engine/graph';
import { factory, fmt, useUI } from '../store';
import { Empty, Kpi } from '../ui';

export function Metrics() {
  useUI(s => s.rev);
  const chId = useUI(s => s.ch);
  const ch = factory.channels[chId];
  const jobs = Object.values(ch.jobs);
  const done = jobs.filter(j => j.status === 'done');
  const order = topo(ch.workflow) ?? ch.workflow.steps.map(s => s.id);

  // theo bước: thời gian chờ trong khay, thời gian làm, chi phí
  const per = order.map(id => {
    const s = ch.workflow.steps.find(x => x.id === id)!;
    let wait = 0, work = 0, n = 0, cost = 0, runs = 0, pass = 0, scores = 0;
    const reasons: Record<string, number> = {};
    for (const j of jobs) {
      const st = j.steps[id]; if (!st) continue;
      for (const r of st.runs) {
        if (!r.end) continue;
        runs++; work += r.end - r.start; cost += r.cost ?? 0;
        if (r.score !== undefined) { scores += r.score; if (r.passed) pass++; r.reasons?.forEach(x => { reasons[x] = (reasons[x] ?? 0) + 1; }); }
      }
      if (st.queuedAt !== undefined && st.runs[0]) { wait += Math.max(0, st.runs[0].start - st.queuedAt); n++; }
    }
    return { s, wait: n ? wait / n : 0, work: runs ? work / runs : 0, cost, runs, pass, scores, reasons };
  });
  const totalCost = jobs.reduce((x, j) => x + j.cost, 0);
  const lead = done.length ? done.reduce((x, j) => x + (j.doneAt! - j.created), 0) / done.length : 0;
  const gates = per.filter(p => p.s.gate);
  const gateRuns = gates.reduce((x, g) => x + g.runs, 0), gatePass = gates.reduce((x, g) => x + g.pass, 0);
  const bottleneck = per.slice().sort((a, b) => (b.wait + b.work) - (a.wait + a.work))[0];

  // thông lượng theo khung 2 phút
  const bucket = 120;
  const tEnd = factory.t, nB = Math.max(1, Math.min(12, Math.ceil(tEnd / bucket)));
  const buckets = Array.from({ length: nB }, (_, k) => {
    const t1 = tEnd - (nB - 1 - k) * bucket, t0 = t1 - bucket;
    return { t1, n: done.filter(j => j.doneAt! > t0 && j.doneAt! <= t1).length };
  });

  return (
    <div className="page">
      <div className="page-head">
        <div className="grow">
          <h1>{bottleneck ? `Điểm nghẽn hiện tại: ${bottleneck.s.name}` : 'Đo lường'}</h1>
          <div className="sub">{bottleneck ? `Mỗi hồ sơ mất trung bình ${fmt.dur(bottleneck.wait)} chờ trong khay và ${fmt.dur(bottleneck.work)} để làm ở bước này. ` : ''}Giá token là ước tính mock, không phải hóa đơn thật.</div>
        </div>
      </div>
      <div className="kpis">
        <Kpi label="Video đã đăng" value={done.length} />
        <Kpi label="Ý tưởng → đăng" value={lead ? fmt.dur(lead) : '–'} hint="trung bình" />
        <Kpi label="Chi phí mỗi video" value={done.length ? fmt.usd(totalCost / done.length) : '–'} hint={`tổng ${fmt.usd(totalCost)}`} />
        <Kpi label="Tỉ lệ qua cổng" value={gateRuns ? `${Math.round(gatePass / gateRuns * 100)}%` : '–'} hint={`${gateRuns} lần chấm`} />
      </div>

      <div className="grid2" style={{ alignItems: 'start' }}>
        <section className="card">
          <h2>Thời gian theo bước</h2>
          <div className="muted" style={{ fontSize: 12 }}>Thanh xám là thời gian chờ trong khay, thanh màu là thời gian làm. Bước có thanh dài nhất đang làm chậm cả dây chuyền.</div>
          <StepBars per={per} />
        </section>
        <section className="card">
          <h2>Video đăng mỗi 2 phút</h2>
          <div className="muted" style={{ fontSize: 12 }}>Giờ mô phỏng, {nB} khung gần nhất.</div>
          <Throughput buckets={buckets} />
        </section>
      </div>

      <section className="card">
        <h2>Cổng chất lượng</h2>
        {gates.length ? (
          <div className="tablewrap" style={{ border: 0 }}>
            <table>
              <thead><tr><th>Cổng</th><th>Ngưỡng</th><th>Lần chấm</th><th>Tỉ lệ qua</th><th>Điểm TB</th><th>Lý do trả về hay gặp</th></tr></thead>
              <tbody>
                {gates.map(g => {
                  const top = Object.entries(g.reasons).sort((a, b) => b[1] - a[1]).slice(0, 2);
                  return (
                    <tr key={g.s.id}>
                      <td><b>{g.s.name}</b></td>
                      <td className="num">{g.s.gate!.threshold}</td>
                      <td className="num">{g.runs}</td>
                      <td className="num" style={{ color: g.runs && g.pass / g.runs < 0.6 ? 'var(--err)' : undefined }}>{g.runs ? `${Math.round(g.pass / g.runs * 100)}%` : '–'}</td>
                      <td className="num">{g.runs ? (g.scores / g.runs).toFixed(1) : '–'}</td>
                      <td>{top.map(([k, v]) => <div key={k} style={{ fontSize: 12.5 }}><span className="chip num">{v}×</span> {k}</div>)}{!top.length && <span className="muted">–</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : <Empty>Workflow này chưa có cổng chất lượng.</Empty>}
      </section>

      <section className="card">
        <h2>Chi phí theo bước</h2>
        <CostBars per={per} />
      </section>
    </div>
  );
}

type Per = { s: { id: string; name: string }; wait: number; work: number; cost: number }[];

function StepBars({ per }: { per: Per }) {
  const W = 560, left = 110, rowH = 24, H = per.length * rowH + 28;
  const max = Math.max(1, ...per.map(p => p.wait + p.work));
  const X = (v: number) => (v / max) * (W - left - 60);
  const top = per.reduce((a, b) => (b.wait + b.work > a.wait + a.work ? b : a), per[0]);
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Thời gian chờ và làm theo bước" className="chart">
      {per.map((p, i) => {
        const y = 6 + i * rowH;
        const hot = p === top;
        return (
          <g key={p.s.id}>
            <text x={left - 8} y={y + 13} textAnchor="end" fontSize="12" fill="var(--ink)" fontWeight={hot ? 700 : 400}>{p.s.name}</text>
            <rect x={left} y={y + 3} width={X(p.wait)} height={14} rx={3} fill="var(--surface3)" />
            <rect x={left + X(p.wait)} y={y + 3} width={Math.max(1, X(p.work))} height={14} rx={3} fill={hot ? 'var(--err)' : 'var(--run)'} fillOpacity={hot ? 0.85 : 0.7} />
            <text x={left + X(p.wait + p.work) + 6} y={y + 14} fontSize="11" fill="var(--muted)" className="num">{fmt.dur(p.wait + p.work)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Throughput({ buckets }: { buckets: { t1: number; n: number }[] }) {
  const W = 520, H = 200, left = 30, bottom = 26;
  const max = Math.max(2, ...buckets.map(b => b.n));
  const bw = (W - left - 10) / buckets.length;
  const Y = (v: number) => H - bottom - (v / max) * (H - bottom - 14);
  const ticks = Array.from({ length: max + 1 }, (_, k) => k).filter(k => k % Math.ceil(max / 4) === 0);
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Số video đăng mỗi 2 phút" className="chart">
      {ticks.map(v => <g key={v}><line x1={left} x2={W - 6} y1={Y(v)} y2={Y(v)} stroke="var(--surface3)" /><text x={left - 6} y={Y(v) + 4} fontSize="10.5" textAnchor="end" fill="var(--faint)">{v}</text></g>)}
      {buckets.map((b, k) => (
        <g key={k}>
          <rect x={left + k * bw + 4} y={Y(b.n)} width={bw - 8} height={H - bottom - Y(b.n)} rx={3} fill={k === buckets.length - 1 ? 'var(--accent)' : 'var(--ok)'} fillOpacity={k === buckets.length - 1 ? 1 : 0.6} />
          {k % 2 === buckets.length % 2 || buckets.length < 7 ? <text x={left + k * bw + bw / 2} y={H - 8} fontSize="10.5" textAnchor="middle" fill="var(--faint)">{fmt.time(b.t1)}</text> : null}
        </g>
      ))}
    </svg>
  );
}

function CostBars({ per }: { per: Per }) {
  const total = per.reduce((x, p) => x + p.cost, 0);
  if (!total) return <Empty>Chưa có chi phí.</Empty>;
  const sorted = per.slice().filter(p => p.cost > 0).sort((a, b) => b.cost - a.cost);
  return (
    <div className="list">
      {sorted.map(p => (
        <div key={p.s.id} className="row" style={{ fontSize: 13 }}>
          <span style={{ width: 120 }}>{p.s.name}</span>
          <div style={{ flex: 1 }}><div className="bar"><div style={{ width: `${(p.cost / sorted[0].cost) * 100}%`, background: 'var(--pend)' }} /></div></div>
          <span className="num" style={{ width: 120, textAlign: 'right' }}>{fmt.usd(p.cost)} · {Math.round(p.cost / total * 100)}%</span>
        </div>
      ))}
    </div>
  );
}
