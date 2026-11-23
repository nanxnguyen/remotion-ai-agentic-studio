import {
  addEdge, Background, Controls, Handle, MarkerType, MiniMap, Position, ReactFlow, ReactFlowProvider,
  applyEdgeChanges, applyNodeChanges, type Connection, type Edge as RFEdge, type EdgeChange, type Node, type NodeChange, type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMemo, useRef, useState } from 'react';
import { ancestors, ranks, validate, type Problem } from '../engine/graph';
import { CHANNELS, MODELS } from '../engine/presets';
import { OUTPUT } from '../engine/sim';
import type { Action, AgentDef, PropKind, StepDef, Workflow } from '../engine/types';
import { factory, isRealStep, live as liveF, pushToast, saveWorkflow, useUI } from '../store';
import { agentColor } from '../theme/lch';
import { Avatar, Empty } from '../ui';

const ACTIONS: { id: Action; label: string }[] = [
  { id: 'read', label: 'Đọc, nghiên cứu' }, { id: 'write', label: 'Viết' }, { id: 'speak', label: 'Lồng tiếng' }, { id: 'mix', label: 'Trộn âm' },
  { id: 'draw', label: 'Vẽ' }, { id: 'animate', label: 'Hoạt họa' }, { id: 'render', label: 'Render' }, { id: 'review', label: 'Chấm, kiểm tra' },
  { id: 'publish', label: 'Xuất bản' }, { id: 'approve', label: 'Người duyệt' },
];
const PROPS: { id: PropKind; label: string }[] = [
  { id: 'research', label: 'Bảng ghim' }, { id: 'script', label: 'Máy đánh chữ' }, { id: 'audit', label: 'Con dấu' }, { id: 'voice', label: 'Micro + ON AIR' },
  { id: 'music', label: 'Bàn trộn âm' }, { id: 'storyboard', label: 'Giá vẽ' }, { id: 'thumbnail', label: 'Khung thumbnail' }, { id: 'animation', label: 'Bảng hoạt họa' },
  { id: 'render', label: 'Màn hình timeline' }, { id: 'qa', label: 'Kính lúp' }, { id: 'publish', label: 'Thùng hàng' }, { id: 'approve', label: 'Màn hình duyệt' }, { id: 'generic', label: 'Bàn trống' },
];

type StepNodeData = { step: StepDef; agent?: AgentDef; bad: boolean; live: { active: number; queued: number } };

function StepNode({ data, selected }: NodeProps<Node<StepNodeData>>) {
  const { step, agent, bad, live } = data;
  const chId = useUI(s => s.ch);
  return (
    <div className={`wnode${selected ? ' sel' : ''}${bad ? ' bad' : ''}`} style={{ borderLeft: `3px solid ${agentColor(agent?.hue ?? 0)}` }}>
      <Handle type="target" position={Position.Left} />
      <div className="h">{agent && <Avatar agent={agent} size={26} />}<div><b>{step.name || '(chưa đặt tên)'}</b><span>{agent ? `${agent.name} · ${agent.title}` : 'Chưa có agent'}</span></div></div>
      <div className="flags">
        {step.gate && <span className="flag gate">Cổng ≥ {step.gate.threshold}</span>}
        {step.kind === 'human' && <span className="flag human">Người duyệt</span>}
        {isRealStep(chId, step.id) && <span className="flag real">Claude thật</span>}
        {step.errorRate > 0 && <span className="flag err">Lỗi {Math.round(step.errorRate * 100)}%</span>}
        <span className="flag">{step.duration[0]}–{step.duration[1]}s</span>
      </div>
      {(live.active > 0 || live.queued > 0) && <div className="live"><span style={{ color: 'var(--run)' }}>● {live.active} đang làm</span><span>{live.queued} trong khay</span></div>}
      <Handle type="source" position={Position.Right} />
      <Handle type="source" id="rw-out" position={Position.Bottom} style={{ opacity: 0, left: '70%' }} isConnectable={false} />
      <Handle type="target" id="rw-in" position={Position.Bottom} style={{ opacity: 0, left: '30%' }} isConnectable={false} />
    </div>
  );
}
const nodeTypes = { step: StepNode };

const clone = <T,>(v: T): T => structuredClone(v);
let idN = 0;
const newId = (p: string) => `${p}-${Date.now().toString(36).slice(-4)}${(idN++).toString(36)}`;

function autoPos(wf: Workflow): Record<string, { x: number; y: number }> {
  const r = ranks(wf); const rows: Record<number, number> = {}; const out: Record<string, { x: number; y: number }> = {};
  const counts: Record<number, number> = {};
  wf.steps.forEach(s => { counts[r[s.id]] = (counts[r[s.id]] ?? 0) + 1; });
  wf.steps.forEach(s => { const k = r[s.id]; const i = rows[k] = (rows[k] ?? -1) + 1; out[s.id] = { x: k * 270, y: (i - (counts[k] - 1) / 2) * 170 }; });
  return out;
}

export function diff(a: Workflow, b: Workflow) {
  const ai = new Map(a.steps.map(s => [s.id, s])), bi = new Map(b.steps.map(s => [s.id, s]));
  const added = b.steps.filter(s => !ai.has(s.id)).map(s => s.name);
  const removed = a.steps.filter(s => !bi.has(s.id)).map(s => s.name);
  const changed = b.steps.filter(s => ai.has(s.id) && JSON.stringify(s) !== JSON.stringify(ai.get(s.id))).map(s => s.name);
  const ek = (w: Workflow) => new Set(w.edges.map(e => e.from + '>' + e.to));
  const ea = ek(a), eb = ek(b);
  const edges = [...eb].filter(x => !ea.has(x)).length + [...ea].filter(x => !eb.has(x)).length;
  const agents = JSON.stringify(a.agents) !== JSON.stringify(b.agents);
  return { added, removed, changed, edges, agents, empty: !added.length && !removed.length && !changed.length && !edges && !agents };
}
export function diffText(d: ReturnType<typeof diff>) {
  const p: string[] = [];
  if (d.added.length) p.push('Thêm ' + d.added.join(', '));
  if (d.removed.length) p.push('Xóa ' + d.removed.join(', '));
  if (d.changed.length) p.push('Sửa ' + d.changed.join(', '));
  if (d.edges) p.push(`${d.edges} thay đổi đường nối`);
  if (d.agents) p.push('Đổi danh sách agent');
  return p.join(' · ') || 'Không khác';
}

export function WorkflowEditor() {
  return <ReactFlowProvider><Editor /></ReactFlowProvider>;
}

function Editor() {
  useUI(s => s.rev);
  const chId = useUI(s => s.ch);
  const ch = factory.channels[chId];
  const [draft, setDraft] = useState<Workflow>(() => clone(ch.workflow));
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>(() => {
    try { const p = JSON.parse(localStorage.getItem('xv-pos-' + chId) || 'null'); if (p) return { ...autoPos(ch.workflow), ...p }; } catch { /* */ }
    return autoPos(ch.workflow);
  });
  const [sel, setSel] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [io, setIo] = useState<'none' | 'export' | 'import'>('none');
  const [importText, setImportText] = useState('');
  const [tryOut, setTryOut] = useState<string | null>(null);
  const [cmp, setCmp] = useState<number | null>(null);
  const measured = useRef<Record<string, { width: number; height: number }>>({});
  const [, bump] = useState(0);

  const problems = useMemo(() => validate(draft), [draft]);
  const badIds = new Set(problems.map(p => p.stepId).filter(Boolean) as string[]);
  const d = diff(ch.workflow, draft);
  const dirty = !d.empty;

  const live = (stepId: string) => {
    let active = 0, queued = 0;
    for (const id of ch.order) { const j = ch.jobs[id]; if (j.status !== 'running') continue; const st = j.steps[stepId]?.status; if (st === 'active' || st === 'waiting_human') active++; if (st === 'queued') queued++; }
    return { active, queued };
  };

  const nodes: Node<StepNodeData>[] = draft.steps.map(s => ({
    id: s.id, type: 'step', position: pos[s.id] ?? { x: 0, y: 0 }, selected: s.id === sel, measured: measured.current[s.id],
    data: { step: s, agent: draft.agents.find(a => a.id === s.agentId), bad: badIds.has(s.id), live: live(s.id) },
  }));
  const edges: RFEdge[] = [
    ...draft.edges.map(e => ({ id: `${e.from}->${e.to}`, source: e.from, target: e.to, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } })),
    ...draft.steps.filter(s => s.gate).map(s => ({
      id: `rw:${s.id}`, source: s.id, target: s.gate!.reworkTo, sourceHandle: 'rw-out', targetHandle: 'rw-in', type: 'smoothstep',
      animated: true, selectable: false, deletable: false, label: `trả về nếu < ${s.gate!.threshold}`,
      style: { stroke: 'var(--err)', strokeDasharray: '6 4' }, labelStyle: { fill: 'var(--err)', fontSize: 11 }, labelBgStyle: { fill: 'var(--bg)' },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--err)' },
    })),
  ];

  const update = (fn: (w: Workflow) => void) => setDraft(prev => { const w = clone(prev); fn(w); return w; });
  const savePos = (p: typeof pos) => { setPos(p); try { localStorage.setItem('xv-pos-' + chId, JSON.stringify(p)); } catch { /* */ } };

  const onNodesChange = (changes: NodeChange<Node<StepNodeData>>[]) => {
    let grew = false;
    for (const c of changes) if (c.type === 'dimensions' && c.dimensions) { measured.current[c.id] = c.dimensions; grew = true; }
    if (grew) bump(x => x + 1);
    if (changes.some(c => c.type === 'position')) {
      const next = applyNodeChanges(changes, nodes);
      const p = { ...pos }; next.forEach(n => { p[n.id] = n.position; });
      savePos(p);
    }
    const s = changes.find(c => c.type === 'select' && c.selected);
    if (s && s.type === 'select') setSel(s.id);
    const removed = changes.filter(c => c.type === 'remove').map(c => (c as { id: string }).id);
    if (removed.length) removeSteps(removed);
  };
  const onEdgesChange = (changes: EdgeChange[]) => {
    const kept = applyEdgeChanges(changes, edges).filter(e => !e.id.startsWith('rw:'));
    if (kept.length !== draft.edges.length) update(w => { w.edges = kept.map(e => ({ from: e.source, to: e.target })); });
  };
  const onConnect = (c: Connection) => {
    if (!c.source || !c.target || c.source === c.target) return;
    const next = addEdge({ ...c, id: `${c.source}->${c.target}` }, edges.filter(e => !e.id.startsWith('rw:')));
    update(w => { w.edges = next.map(e => ({ from: e.source, to: e.target })); });
  };
  const removeSteps = (ids: string[]) => {
    update(w => {
      w.steps = w.steps.filter(s => !ids.includes(s.id));
      w.edges = w.edges.filter(e => !ids.includes(e.from) && !ids.includes(e.to));
      w.steps.forEach(s => { if (s.gate && ids.includes(s.gate.reworkTo)) s.gate = undefined; });
    });
    setSel(null);
  };
  const addStep = () => {
    const id = newId('buoc');
    const producer = draft.agents.find(a => a.role === 'producer') ?? draft.agents[0];
    update(w => { w.steps.push({ id, name: 'Bước mới', agentId: producer.id, action: 'write', kind: 'work', prop: 'generic', duration: [5, 8], tokens: [2000, 5000], prompt: 'Viết system prompt cho bước này.', errorRate: 0 }); });
    const xs = Object.values(pos).map(p => p.x); const ys = Object.values(pos).map(p => p.y);
    savePos({ ...pos, [id]: { x: (Math.max(0, ...xs) + Math.min(0, ...xs)) / 2, y: Math.max(0, ...ys) + 180 } });
    setSel(id);
  };
  const publish = () => {
    const res: Problem[] = factory.publish(chId, draft, note.trim() || diffText(d));
    if (res.length) { pushToast({ kind: 'err', ch: chId, text: 'Chưa xuất bản được: ' + res[0].message }); return; }
    if (liveF && liveF.liveCh === chId) {
      setNote('');
      pushToast({ kind: 'ok', ch: chId, text: 'Đã gửi workflow mới lên máy chủ. Các bước thật sẽ dùng prompt mới từ lượt sau.' });
      setTimeout(() => setDraft(clone(factory.channels[chId].workflow)), 1200);
      return;
    }
    const wf = factory.channels[chId].workflow;
    saveWorkflow(chId, wf);
    setDraft(clone(wf)); setNote('');
    pushToast({ kind: 'ok', ch: chId, text: `Đã xuất bản workflow v${wf.version}. Văn phòng 3D đã dựng lại phòng.` });
  };

  const step = sel ? draft.steps.find(s => s.id === sel) : undefined;
  const chDef = CHANNELS.find(c => c.id === chId)!;

  return (
    <div className="wf">
      <div className="wf-canvas">
        <div className="wf-bar">
          <span className="pill"><b>Workflow · {chDef.name}</b> · đang chạy v{ch.workflow.version} · {dirty ? <span style={{ color: 'var(--need)' }}>bản nháp có thay đổi</span> : 'nháp trùng bản đang chạy'}</span>
          <button className="btn" onClick={addStep}>+ Thêm bước</button>
          <button className="btn" onClick={() => savePos(autoPos(draft))}>Tự sắp xếp</button>
        </div>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}
          onPaneClick={() => setSel(null)} fitView fitViewOptions={{ padding: 0.08, minZoom: 0.78, maxZoom: 1 }} minZoom={0.2} deleteKeyCode={['Delete', 'Backspace']} proOptions={{ hideAttribution: true }}>
          <Background gap={24} size={1} color="var(--line)" />
          <MiniMap pannable zoomable nodeColor={n => agentColor((n.data as StepNodeData).agent?.hue ?? 0)} maskColor="rgba(0,0,0,.35)" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <aside className="wf-side" aria-label="Cấu hình workflow">
        {step ? <StepForm key={step.id} step={step} draft={draft} update={update} onDelete={() => removeSteps([step.id])} onTry={() => setTryOut((OUTPUT[step.action]?.('Video thử') ?? 'Xong') + `\n\nModel: ${draft.agents.find(a => a.id === step.agentId)?.model} · token ước tính ${step.tokens[0]}–${step.tokens[1]}`)} tryOut={tryOut} onClose={() => { setSel(null); setTryOut(null); }} />
          : (
            <>
              <section>
                <h3>Xuất bản</h3>
                {problems.length > 0 && <div className="problems" role="alert">{problems.map((p, k) => <div key={k}>• {p.message}</div>)}</div>}
                <div className="muted" style={{ fontSize: 13 }}>{dirty ? `Thay đổi so với v${ch.workflow.version}: ${diffText(d)}` : 'Bản nháp đang giống hệt bản đang chạy. Kéo nối giữa hai bước để thêm đường, chọn đường rồi bấm Delete để xóa.'}</div>
                <label className="field"><span>Ghi chú phiên bản</span><input type="text" value={note} placeholder={dirty ? diffText(d) : 'Mô tả thay đổi'} onChange={e => setNote(e.target.value)} /></label>
                <div className="row">
                  <button className="btn primary" disabled={!dirty || problems.length > 0} onClick={publish}>Xuất bản v{ch.workflow.version + 1}</button>
                  <button className="btn" disabled={!dirty} onClick={() => setDraft(clone(ch.workflow))}>Hủy thay đổi</button>
                </div>
              </section>
              <section>
                <h3>Lịch sử phiên bản</h3>
                <div className="list">
                  {ch.history.map(h => (
                    <div key={h.version + '-' + h.at} className="item" style={{ alignItems: 'flex-start' }}>
                      <div className="grow">
                        <div className="t">v{h.version}{h.version === ch.workflow.version ? ' · đang chạy' : ''}</div>
                        <div className="s" style={{ whiteSpace: 'normal' }}>{h.note}</div>
                        {cmp === h.version && <div className="s" style={{ whiteSpace: 'normal', color: 'var(--ink)' }}>So với nháp: {diffText(diff(h.workflow, draft))}</div>}
                      </div>
                      <div className="row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        <button className="btn sm" onClick={() => setCmp(cmp === h.version ? null : h.version)}>So sánh</button>
                        <button className="btn sm" disabled={h.version === ch.workflow.version} onClick={() => { setDraft({ ...clone(h.workflow), version: ch.workflow.version }); setNote(`Khôi phục v${h.version}`); }}>Khôi phục</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3>Agent trong workflow</h3>
                <div className="list">{draft.agents.map(a => <div key={a.id} className="row" style={{ fontSize: 13 }}><Avatar agent={a} size={24} /><span><b>{a.name}</b> <span className="muted">· {a.title} · {a.model}</span></span></div>)}</div>
                <button className="btn sm" onClick={() => update(w => { w.agents.push({ id: newId('agent'), name: 'Agent mới', title: 'Nghề mới', role: 'producer', hue: Math.floor(Math.random() * 360), trait: 'Chăm chỉ', model: 'claude-sonnet-5-5' }); })}>+ Thêm agent</button>
              </section>
              <section>
                <h3>Nhập / xuất JSON</h3>
                <div className="row">
                  <button className="btn sm" aria-pressed={io === 'export'} onClick={() => setIo(io === 'export' ? 'none' : 'export')}>Xuất JSON</button>
                  <button className="btn sm" aria-pressed={io === 'import'} onClick={() => setIo(io === 'import' ? 'none' : 'import')}>Nhập JSON</button>
                </div>
                {io === 'export' && <><pre style={{ maxHeight: 200 }}>{JSON.stringify(draft, null, 2)}</pre><button className="btn sm" onClick={() => navigator.clipboard?.writeText(JSON.stringify(draft, null, 2)).then(() => pushToast({ kind: 'ok', ch: chId, text: 'Đã chép JSON workflow.' })).catch(() => pushToast({ kind: 'err', ch: chId, text: 'Trình duyệt không cho chép. Hãy bôi đen và chép tay.' }))}>Chép</button></>}
                {io === 'import' && (
                  <>
                    <label className="field"><span>Dán JSON workflow</span><textarea value={importText} onChange={e => setImportText(e.target.value)} /></label>
                    <button className="btn sm" onClick={() => {
                      try {
                        const w = JSON.parse(importText) as Workflow;
                        if (!Array.isArray(w.steps) || !Array.isArray(w.edges) || !Array.isArray(w.agents)) throw new Error();
                        setDraft({ ...w, version: ch.workflow.version }); savePos(autoPos(w)); setIo('none');
                      } catch { pushToast({ kind: 'err', ch: chId, text: 'JSON không đúng định dạng workflow (cần agents, steps, edges).' }); }
                    }}>Nạp vào nháp</button>
                  </>
                )}
              </section>
            </>
          )}
      </aside>
    </div>
  );
}

function StepForm({ step, draft, update, onDelete, onTry, tryOut, onClose }: {
  step: StepDef; draft: Workflow; update: (fn: (w: Workflow) => void) => void; onDelete: () => void; onTry: () => void; tryOut: string | null; onClose: () => void;
}) {
  const set = (fn: (s: StepDef) => void) => update(w => { const s = w.steps.find(x => x.id === step.id); if (s) fn(s); });
  const agent = draft.agents.find(a => a.id === step.agentId);
  const setAgent = (fn: (a: AgentDef) => void) => update(w => { const a = w.agents.find(x => x.id === step.agentId); if (a) fn(a); });
  const anc = ancestors(draft, step.id);
  const reworkOpts = draft.steps.filter(s => anc.has(s.id));
  return (
    <>
      <section>
        <div className="row" style={{ justifyContent: 'space-between' }}><h3>Bước</h3><button className="btn sm" onClick={onClose}>Đóng</button></div>
        <label className="field"><span>Tên bước (tên phòng)</span><input type="text" value={step.name} onChange={e => set(s => { s.name = e.target.value; })} /></label>
        <div className="grid2">
          <label className="field"><span>Loại</span>
            <select value={step.kind} onChange={e => set(s => { s.kind = e.target.value as StepDef['kind']; if (s.kind === 'review' && !s.gate) { const r = [...anc][0]; if (r) s.gate = { threshold: 80, maxRework: 3, reworkTo: r }; } if (s.kind !== 'review') s.gate = undefined; if (s.kind === 'human') s.action = 'approve'; })}>
              <option value="work">Làm</option><option value="review">Chấm (có cổng)</option><option value="human">Người duyệt</option>
            </select></label>
          <label className="field"><span>Hành động (nhân vật diễn)</span>
            <select value={step.action} onChange={e => set(s => { s.action = e.target.value as Action; })}>{ACTIONS.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}</select></label>
          <label className="field"><span>Đồ đạc trong phòng</span>
            <select value={step.prop} onChange={e => set(s => { s.prop = e.target.value as PropKind; })}>{PROPS.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}</select></label>
          <label className="field"><span>Agent phụ trách</span>
            <select value={step.agentId} onChange={e => set(s => { s.agentId = e.target.value; })}>{draft.agents.map(a => <option key={a.id} value={a.id}>{a.name} · {a.title}</option>)}</select></label>
        </div>
        <label className="field"><span>System prompt</span><textarea value={step.prompt} onChange={e => set(s => { s.prompt = e.target.value; })} /></label>
        <div className="grid2">
          <label className="field"><span>Thời gian tối thiểu (giây)</span><input type="number" min={1} max={120} value={step.duration[0]} onChange={e => set(s => { s.duration = [Math.max(1, +e.target.value || 1), Math.max(+e.target.value || 1, s.duration[1])]; })} /></label>
          <label className="field"><span>Thời gian tối đa (giây)</span><input type="number" min={1} max={120} value={step.duration[1]} onChange={e => set(s => { s.duration = [s.duration[0], Math.max(s.duration[0], +e.target.value || 1)]; })} /></label>
          <label className="field"><span>Token mỗi lần (ước tính)</span><input type="number" min={0} step={500} value={step.tokens[1]} onChange={e => set(s => { const v = Math.max(0, +e.target.value || 0); s.tokens = [Math.round(v * 0.5), v]; })} /></label>
          <label className="field"><span>Tỉ lệ lỗi hệ thống (%)</span><input type="number" min={0} max={80} step={5} value={Math.round(step.errorRate * 100)} onChange={e => set(s => { s.errorRate = Math.min(0.8, Math.max(0, (+e.target.value || 0) / 100)); })} /></label>
        </div>
        {step.kind === 'review' && (
          <div className="card flat" style={{ padding: 10 }}>
            <h3>Cổng chất lượng</h3>
            <div className="grid2">
              <label className="field"><span>Ngưỡng điểm (1–100)</span><input type="number" min={1} max={100} value={step.gate?.threshold ?? 80} onChange={e => set(s => { s.gate = { ...(s.gate ?? { maxRework: 3, reworkTo: reworkOpts[0]?.id ?? '' }), threshold: Math.min(100, Math.max(1, +e.target.value || 1)) }; })} /></label>
              <label className="field"><span>Số lần trả về tối đa</span><input type="number" min={1} max={9} value={step.gate?.maxRework ?? 3} onChange={e => set(s => { s.gate = { ...(s.gate ?? { threshold: 80, reworkTo: reworkOpts[0]?.id ?? '' }), maxRework: Math.min(9, Math.max(1, +e.target.value || 1)) }; })} /></label>
            </div>
            <label className="field"><span>Trả về cho bước</span>
              <select value={step.gate?.reworkTo ?? ''} onChange={e => set(s => { s.gate = { ...(s.gate ?? { threshold: 80, maxRework: 3 }), reworkTo: e.target.value }; })}>
                {reworkOpts.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select></label>
            {!reworkOpts.length && <div className="muted" style={{ fontSize: 12 }}>Cần nối ít nhất một bước đứng trước bước này.</div>}
          </div>
        )}
        <div className="row">
          <button className="btn" onClick={onTry}>Chạy thử bước (mock)</button>
          <button className="btn danger" onClick={onDelete}>Xóa bước</button>
        </div>
        {tryOut && <pre aria-live="polite">{tryOut}</pre>}
      </section>
      {agent && (
        <section>
          <h3>Agent: {agent.name}</h3>
          <div className="row"><Avatar agent={agent} size={40} /><span className="muted" style={{ fontSize: 12 }}>Sửa ở đây đổi luôn cho mọi bước dùng agent này.</span></div>
          <div className="grid2">
            <label className="field"><span>Tên</span><input type="text" value={agent.name} onChange={e => setAgent(a => { a.name = e.target.value; })} /></label>
            <label className="field"><span>Nghề</span><input type="text" value={agent.title} onChange={e => setAgent(a => { a.title = e.target.value; })} /></label>
            <label className="field"><span>Vai</span>
              <select value={agent.role} onChange={e => setAgent(a => { a.role = e.target.value as AgentDef['role']; })}>
                <option value="producer">Làm</option><option value="reviewer">Chấm</option><option value="human">Người</option><option value="director">Đạo diễn</option>
              </select></label>
            <label className="field"><span>Model / worker</span>
              <select value={agent.model} onChange={e => setAgent(a => { a.model = e.target.value; })}>{MODELS.map(m => <option key={m}>{m}</option>)}</select></label>
          </div>
          <label className="field"><span>Màu (sắc độ {agent.hue}°)</span><input type="range" min={0} max={359} value={agent.hue} onChange={e => setAgent(a => { a.hue = +e.target.value; })} style={{ accentColor: agentColor(agent.hue) }} /></label>
          <label className="field"><span>Tính cách một dòng</span><input type="text" value={agent.trait} onChange={e => setAgent(a => { a.trait = e.target.value; })} /></label>
        </section>
      )}
      {!agent && <section><Empty>Bước này chưa có agent. Chọn một agent ở trên.</Empty></section>}
    </>
  );
}
