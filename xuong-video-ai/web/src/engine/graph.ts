import type { Workflow } from './types';

export const preds = (wf: Workflow, id: string) => wf.edges.filter(e => e.to === id).map(e => e.from);
export const succs = (wf: Workflow, id: string) => wf.edges.filter(e => e.from === id).map(e => e.to);
export const roots = (wf: Workflow) => wf.steps.filter(s => preds(wf, s.id).length === 0).map(s => s.id);
export const sinks = (wf: Workflow) => wf.steps.filter(s => succs(wf, s.id).length === 0).map(s => s.id);

/** Thứ tự topo; trả null nếu có vòng. */
export function topo(wf: Workflow): string[] | null {
  const indeg = new Map(wf.steps.map(s => [s.id, 0]));
  wf.edges.forEach(e => indeg.set(e.to, (indeg.get(e.to) ?? 0) + 1));
  const q = wf.steps.filter(s => indeg.get(s.id) === 0).map(s => s.id);
  const out: string[] = [];
  while (q.length) {
    const id = q.shift()!;
    out.push(id);
    for (const n of succs(wf, id)) {
      indeg.set(n, indeg.get(n)! - 1);
      if (indeg.get(n) === 0) q.push(n);
    }
  }
  return out.length === wf.steps.length ? out : null;
}

/** Hạng = đường dài nhất từ gốc. */
export function ranks(wf: Workflow): Record<string, number> {
  const order = topo(wf) ?? wf.steps.map(s => s.id);
  const r: Record<string, number> = {};
  for (const id of order) {
    const p = preds(wf, id);
    r[id] = p.length ? Math.max(...p.map(x => (r[x] ?? 0) + 1)) : 0;
  }
  return r;
}

export function descendants(wf: Workflow, id: string): Set<string> {
  const seen = new Set<string>([id]);
  const stack = [id];
  while (stack.length) {
    for (const n of succs(wf, stack.pop()!)) if (!seen.has(n)) { seen.add(n); stack.push(n); }
  }
  return seen;
}

export function ancestors(wf: Workflow, id: string): Set<string> {
  const seen = new Set<string>();
  const stack = [id];
  while (stack.length) {
    for (const n of preds(wf, stack.pop()!)) if (!seen.has(n)) { seen.add(n); stack.push(n); }
  }
  return seen;
}

export interface Problem { stepId?: string; message: string }

export function validate(wf: Workflow): Problem[] {
  const out: Problem[] = [];
  const ids = new Set(wf.steps.map(s => s.id));
  const agentIds = new Set(wf.agents.map(a => a.id));
  if (wf.steps.length < 2) out.push({ message: 'Workflow cần ít nhất 2 bước.' });
  if (wf.steps.length > 16) out.push({ message: 'Tối đa 16 bước để vừa một tầng văn phòng.' });
  for (const e of wf.edges) {
    if (!ids.has(e.from) || !ids.has(e.to)) out.push({ message: 'Có đường nối tới bước không tồn tại.' });
    if (e.from === e.to) out.push({ stepId: e.from, message: 'Một bước không thể nối vào chính nó.' });
  }
  if (!topo(wf)) out.push({ message: 'Workflow có vòng lặp. Dùng cổng chất lượng để trả về, không nối ngược.' });
  if (roots(wf).length === 0 && wf.steps.length) out.push({ message: 'Không có bước bắt đầu.' });
  for (const s of wf.steps) {
    if (!s.name.trim()) out.push({ stepId: s.id, message: 'Có bước chưa đặt tên.' });
    if (!agentIds.has(s.agentId)) out.push({ stepId: s.id, message: `“${s.name}” chưa có agent phụ trách.` });
    if (s.kind === 'review' && !s.gate) out.push({ stepId: s.id, message: `“${s.name}” là bước chấm nhưng chưa có cổng.` });
    if (s.gate) {
      if (!ancestors(wf, s.id).has(s.gate.reworkTo)) out.push({ stepId: s.id, message: `Cổng của “${s.name}” chỉ được trả về một bước đứng trước nó.` });
      if (s.gate.threshold < 1 || s.gate.threshold > 100) out.push({ stepId: s.id, message: `Ngưỡng cổng của “${s.name}” phải từ 1 đến 100.` });
    }
    if (s.duration[0] <= 0 || s.duration[1] < s.duration[0]) out.push({ stepId: s.id, message: `Thời gian của “${s.name}” không hợp lệ.` });
  }
  const isolated = wf.steps.filter(s => wf.steps.length > 1 && preds(wf, s.id).length === 0 && succs(wf, s.id).length === 0);
  isolated.forEach(s => out.push({ stepId: s.id, message: `“${s.name}” chưa nối với bước nào.` }));
  return out;
}
