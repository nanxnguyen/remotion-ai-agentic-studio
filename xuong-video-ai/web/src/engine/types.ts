// Kiểu dữ liệu cốt lõi của xưởng. Không phụ thuộc React hay three.

export type Role = 'director' | 'producer' | 'reviewer' | 'human';
export type Action = 'read' | 'write' | 'speak' | 'mix' | 'draw' | 'animate' | 'render' | 'review' | 'publish' | 'approve';
export type PropKind =
  | 'research' | 'script' | 'audit' | 'voice' | 'music' | 'storyboard'
  | 'thumbnail' | 'animation' | 'render' | 'qa' | 'publish' | 'approve' | 'generic';

export interface AgentDef {
  id: string;
  name: string;      // tên riêng, ví dụ "Chị Lan"
  title: string;     // nghề, ví dụ "Biên kịch"
  role: Role;
  hue: number;       // 0–360, màu áo / huy hiệu (LCH)
  trait: string;     // tính cách một dòng
  model: string;
}

export interface GateDef {
  threshold: number;   // điểm tối thiểu (0–100)
  maxRework: number;   // số lần trả về tối đa trước khi chuyển cho người
  reworkTo: string;    // id bước nhận lại (phải là tổ tiên)
}

export interface StepDef {
  id: string;
  name: string;
  agentId: string;
  action: Action;
  kind: 'work' | 'review' | 'human';
  prop: PropKind;
  duration: [number, number];  // giây mô phỏng
  tokens: [number, number];
  prompt: string;
  errorRate: number;           // 0–1
  gate?: GateDef;
}

export interface Edge { from: string; to: string }

export interface Workflow {
  version: number;
  note: string;
  publishedAt: number;         // giờ mô phỏng
  agents: AgentDef[];
  steps: StepDef[];
  edges: Edge[];
}

export interface ChannelDef {
  id: string;
  name: string;
  kind: string;
  theme: 'horror' | 'pastel' | 'warm';
  titles: string[];
  workflow: Workflow;
}

/* ---------- State ---------- */

export type StepStatus = 'pending' | 'queued' | 'active' | 'handoff' | 'done' | 'waiting_human' | 'error';

export interface Run {
  start: number;
  end?: number;
  agentId: string;
  tokens?: number;
  cost?: number;
  score?: number;
  passed?: boolean;
  reasons?: string[];
  error?: string;
  output?: string;
}

export interface JobStep {
  status: StepStatus;
  attempts: number;        // số lần bị cổng trả về (tính trên bước có cổng)
  runs: Run[];
  queuedAt?: number;
  requestedAt?: number;    // lúc bắt đầu chờ người
  blocked?: string;        // lý do chưa chạy được (ví dụ hết ngân sách)
}

export interface Job {
  id: string;
  title: string;
  created: number;
  updated: number;
  status: 'running' | 'done' | 'cancelled';
  priority: boolean;
  steps: Record<string, JobStep>;
  tokens: number;
  cost: number;
  doneAt?: number;
  overrides?: Record<string, string>;   // prompt riêng khi chạy lại một bước
}

export type Place =
  | { kind: 'step'; id: string }
  | { kind: 'pantry' }
  | { kind: 'exit' }
  | { kind: 'director' };

export type WalkPurpose = 'handoff' | 'rework' | 'return' | 'break' | 'break-return';

export interface Walk {
  from: Place;
  to: Place;
  start: number;
  dur: number;
  purpose: WalkPurpose;
  carrying?: string;       // jobId
  stepId?: string;         // bước vừa làm xong (handoff)
}

export type AgentStatus = 'idle' | 'thinking' | 'working' | 'walking' | 'waiting_human' | 'error' | 'break';

export interface AgentStats {
  done: number;
  rejects: number;
  errors: number;
  busy: number;      // giây bận
  work: number;      // giây làm việc thực sự
  tokens: number;
  cost: number;
  scores: number[];  // điểm đã chấm (reviewer)
}

export interface AgentState {
  id: string;
  jobId?: string;
  stepId?: string;
  phaseStart?: number;
  thinkEnd?: number;
  phaseEnd?: number;
  walk?: Walk;
  error?: string;
  since: number;
  stats: AgentStats;
  lessons: Record<string, number>;   // lý do bị trả về -> số lần
}

export interface ChannelState {
  id: string;
  workflow: Workflow;
  history: { version: number; note: string; at: number; workflow: Workflow }[];
  jobs: Record<string, Job>;
  order: string[];
  agents: Record<string, AgentState>;
  seq: number;
  autoApprove: boolean;
  nextSpawn: number;
  titleIdx: number;
}

/* ---------- Event ---------- */

type E<T extends string, P> = { t: number; ch: string; type: T } & P;

export type FactoryEvent =
  | E<'job.created', { jobId: string; title: string }>
  | E<'step.queued', { jobId: string; stepId: string }>
  | E<'step.blocked', { jobId: string; stepId: string; reason: string }>
  | E<'step.started', { jobId: string; stepId: string; agentId: string; thinkEnd: number; end: number }>
  | E<'step.finished', { jobId: string; stepId: string; agentId: string; tokens: number; cost: number; output: string }>
  | E<'gate.scored', { jobId: string; stepId: string; agentId: string; score: number; threshold: number; passed: boolean; reasons: string[] }>
  | E<'step.reworked', { jobId: string; stepId: string; toStep: string; attempt: number }>
  | E<'step.failed', { jobId: string; stepId: string; agentId: string; error: string; retry: boolean }>
  | E<'step.retried', { jobId: string; stepId: string; agentId: string; end: number; manual: boolean }>
  | E<'human.requested', { jobId: string; stepId: string; reason: string }>
  | E<'human.approved', { jobId: string; stepId: string }>
  | E<'agent.walk', { agentId: string; walk: Walk }>
  | E<'agent.arrived', { agentId: string }>
  | E<'step.delivered', { jobId: string; stepId: string }>
  | E<'job.done', { jobId: string }>
  | E<'job.cancelled', { jobId: string }>
  | E<'job.priority', { jobId: string; priority: boolean }>
  | E<'step.rerun', { jobId: string; stepId: string; prompt?: string }>
  | E<'workflow.published', { workflow: Workflow }>
  | E<'channel.auto', { on: boolean }>;

export type EventType = FactoryEvent['type'];
