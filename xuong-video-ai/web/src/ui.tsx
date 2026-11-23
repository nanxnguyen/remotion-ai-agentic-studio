import type { ReactNode } from 'react';
import type { AgentDef, AgentStatus, StepStatus } from './engine/types';
import { agentColor } from './theme/lch';
import { useUI } from './store';

export const STEP_META: Record<StepStatus, { label: string; color: string; shape: Shape }> = {
  pending: { label: 'Chưa tới', color: 'var(--faint)', shape: 'hollow' },
  queued: { label: 'Trong khay', color: 'var(--muted)', shape: 'hollow' },
  active: { label: 'Đang làm', color: 'var(--run)', shape: 'dot' },
  handoff: { label: 'Đang chuyển', color: 'var(--walk)', shape: 'arrow' },
  done: { label: 'Xong', color: 'var(--ok)', shape: 'check' },
  waiting_human: { label: 'Cần bạn', color: 'var(--need)', shape: 'diamond' },
  error: { label: 'Lỗi', color: 'var(--err)', shape: 'tri' },
};

export const AGENT_META: Record<AgentStatus, { label: string; color: string; shape: Shape }> = {
  idle: { label: 'Rảnh', color: 'var(--muted)', shape: 'hollow' },
  thinking: { label: 'Đang nghĩ', color: 'var(--pend)', shape: 'dashed' },
  working: { label: 'Đang làm', color: 'var(--run)', shape: 'dot' },
  walking: { label: 'Đang chuyển hồ sơ', color: 'var(--walk)', shape: 'arrow' },
  waiting_human: { label: 'Chờ bạn', color: 'var(--need)', shape: 'diamond' },
  error: { label: 'Lỗi', color: 'var(--err)', shape: 'tri' },
  break: { label: 'Giải lao', color: 'var(--faint)', shape: 'cup' },
};

type Shape = 'dot' | 'hollow' | 'dashed' | 'check' | 'diamond' | 'tri' | 'arrow' | 'cup';

export function Mark({ shape, color, size = 12, pulse }: { shape: Shape; color: string; size?: number; pulse?: boolean }) {
  const s = size;
  const common = { width: s, height: s, viewBox: '0 0 12 12', 'aria-hidden': true, className: pulse ? 'pulse' : undefined, style: { flex: 'none' } as const };
  switch (shape) {
    case 'dot': return <svg {...common}><circle cx="6" cy="6" r="4.5" fill={color} /></svg>;
    case 'hollow': return <svg {...common}><circle cx="6" cy="6" r="4" fill="none" stroke={color} strokeWidth="1.6" /></svg>;
    case 'dashed': return <svg {...common}><circle cx="6" cy="6" r="4" fill="none" stroke={color} strokeWidth="1.8" strokeDasharray="2.2 1.8" /></svg>;
    case 'check': return <svg {...common}><circle cx="6" cy="6" r="5.5" fill={color} /><path d="M3.4 6.2l1.8 1.8 3.4-3.6" fill="none" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round" /></svg>;
    case 'diamond': return <svg {...common}><path d="M6 0.8L11.2 6 6 11.2 0.8 6z" fill={color} /></svg>;
    case 'tri': return <svg {...common}><path d="M6 1l5.2 9.6H0.8z" fill={color} /></svg>;
    case 'arrow': return <svg {...common}><path d="M1.5 6h7M6 2.8L9.4 6 6 9.2" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" /></svg>;
    case 'cup': return <svg {...common}><path d="M2 4h6v3.5a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 2 7.5z M8 5h1.3a1.2 1.2 0 0 1 0 2.4H8" fill="none" stroke={color} strokeWidth="1.3" /></svg>;
  }
}

export function StepBadge({ status }: { status: StepStatus }) {
  const m = STEP_META[status];
  return <span className="badge" style={{ color: m.color }}><Mark shape={m.shape} color={m.color} size={10} pulse={status === 'active'} /><span>{m.label}</span></span>;
}
export function AgentBadge({ status }: { status: AgentStatus }) {
  const m = AGENT_META[status];
  return <span className="badge" style={{ color: m.color }}><Mark shape={m.shape} color={m.color} size={10} pulse={status === 'working'} /><span>{m.label}</span></span>;
}

export function Avatar({ agent, size = 32 }: { agent: AgentDef; size?: number }) {
  const dark = useUI(s => s.theme) !== 'day';
  const c = agentColor(agent.hue, dark);
  const initials = agent.name.replace(/^(Anh|Chị|Bác|Cô)\s+/, '').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const role = agent.role;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label={`${agent.name}, ${agent.title}`} style={{ flex: 'none' }}>
      {role === 'reviewer' && <circle cx="16" cy="16" r="14.5" fill="var(--surface2)" stroke={c} strokeWidth="2" />}
      {role === 'producer' && <circle cx="16" cy="16" r="15" fill={c} />}
      {role === 'director' && <><circle cx="16" cy="16" r="15" fill={c} /><circle cx="16" cy="16" r="12.5" fill="none" stroke="var(--bg)" strokeWidth="1.2" /></>}
      {role === 'human' && <path d="M16 1.5l3.9 8.6 9.4 1-7 6.4 2 9.2L16 22l-8.3 4.7 2-9.2-7-6.4 9.4-1z" fill={c} />}
      <text x="16" y="20.2" textAnchor="middle" fontSize={initials.length > 1 ? 11 : 12} fontWeight="700" fill={role === 'reviewer' ? c : 'var(--bg)'} style={{ fontFamily: 'var(--font)' }}>{role === 'human' ? '' : initials}</text>
      {role === 'reviewer' && <path d="M22 25l5-5" stroke="var(--err)" strokeWidth="2.2" strokeLinecap="round" />}
    </svg>
  );
}

export function Kpi({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return <div className="kpi"><div className="kpi-v">{value}</div><div className="kpi-l">{label}</div>{hint && <div className="kpi-h">{hint}</div>}</div>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>;
}

export function Bar({ value, color = 'var(--run)' }: { value: number; color?: string }) {
  return <div className="bar" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${Math.max(2, value * 100)}%`, background: color }} /></div>;
}
