import { useState } from 'react';
import type { EventType } from '../engine/types';
import { factory, fmt, useUI } from '../store';

const TYPES: EventType[] = ['job.created', 'step.queued', 'step.started', 'step.finished', 'gate.scored', 'step.reworked', 'step.failed', 'step.retried', 'human.requested', 'human.approved', 'agent.walk', 'agent.arrived', 'step.delivered', 'job.done', 'job.cancelled', 'step.rerun', 'workflow.published'];

export function Events() {
  useUI(s => s.rev);
  const chId = useUI(s => s.ch);
  const paused = useUI(s => s.paused);
  const [type, setType] = useState<string>('');
  const [q, setQ] = useState('');
  const log = factory.logs[chId];
  const rows: typeof log = [];
  for (let i = log.length - 1; i >= 0 && rows.length < 300; i--) {
    const e = log[i];
    if (type && e.type !== type) continue;
    if (q && !JSON.stringify(e).toLowerCase().includes(q.toLowerCase())) continue;
    rows.push(e);
  }
  const color = (t: string) => t.includes('failed') || t.includes('rework') ? 'var(--err)' : t.startsWith('human') ? 'var(--need)' : t === 'job.done' || t === 'gate.scored' ? 'var(--ok)' : t.startsWith('agent') ? 'var(--walk)' : t === 'workflow.published' ? 'var(--accent)' : 'var(--run)';
  return (
    <div className="page">
      <div className="page-head">
        <div className="grow">
          <h1>Sự kiện</h1>
          <div className="sub">{fmt.num(log.length)} event trên kênh này. Đây là nguồn sự thật duy nhất: 3D, bảng và tua lại đều dựng từ log này. Backend thật sau này chỉ cần đẩy đúng định dạng qua WebSocket.{!paused && ' Bấm Tạm dừng ở trên để đọc cho dễ.'}</div>
        </div>
        <div className="row">
          <input className="input" style={{ width: 220 }} value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm trong payload…" aria-label="Tìm trong payload" />
          <select className="input" style={{ width: 190 }} value={type} onChange={e => setType(e.target.value)} aria-label="Lọc loại event">
            <option value="">Mọi loại</option>{TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Giờ</th><th>Loại</th><th>Payload</th></tr></thead>
          <tbody>
            {rows.map((e, k) => {
              const { t, ch, type: ty, ...rest } = e;
              void ch;
              return (
                <tr key={k}>
                  <td className="mono num">{fmt.time(t)}</td>
                  <td className="mono" style={{ color: color(ty), whiteSpace: 'nowrap' }}>{ty}</td>
                  <td className="mono" style={{ color: 'var(--muted)', wordBreak: 'break-all' }}>{JSON.stringify(rest)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
