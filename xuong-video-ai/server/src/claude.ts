import Anthropic from '@anthropic-ai/sdk';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Factory } from '../../web/src/engine/factory';
import { preds } from '../../web/src/engine/graph';
import { PRICES, WEB_SEARCH_USD } from '../../web/src/engine/presets';
import type { RealHooks, RealResult } from '../../web/src/engine/sim';
import type { Job, StepDef } from '../../web/src/engine/types';
import type { Config } from './config';

/* ---------- lớp gọi model (thật hoặc giả) ---------- */
export interface LlmCall { model: string; system: string; user: string; maxTokens: number; webSearch: number }
export interface LlmResult { text: string; inTok: number; outTok: number; searches: number }
export interface Llm { call(c: LlmCall, signal: AbortSignal): Promise<LlmResult> }

export class AnthropicLlm implements Llm {
  client: Anthropic;
  constructor(apiKey: string) { this.client = new Anthropic({ apiKey, maxRetries: 2, timeout: 9 * 60 * 1000 }); }
  async call(c: LlmCall, signal: AbortSignal): Promise<LlmResult> {
    const msg = await this.client.messages.create({
      model: c.model,
      max_tokens: c.maxTokens,
      system: c.system,
      messages: [{ role: 'user', content: c.user }],
      ...(c.webSearch > 0 ? { tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: c.webSearch }] } : {}),
    }, { signal });
    const text = msg.content.filter(b => b.type === 'text').map(b => (b as { text: string }).text).join('').trim();
    const u = msg.usage;
    return {
      text,
      inTok: (u.input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0),
      outTok: u.output_tokens ?? 0,
      searches: u.server_tool_use?.web_search_requests ?? 0,
    };
  }
}

/** Claude giả: trả lời mẫu sau vài giây, để thử toàn bộ luồng mà không tốn tiền. */
export class FakeLlm implements Llm {
  n = 0;
  async call(c: LlmCall, signal: AbortSignal): Promise<LlmResult> {
    await new Promise<void>((res, rej) => {
      const t = setTimeout(res, 2500 + Math.random() * 3500);
      signal.addEventListener('abort', () => { clearTimeout(t); rej(new Error('aborted')); });
    });
    this.n++;
    if (c.system.includes('"score"')) {
      const score = this.n % 3 === 0 ? 72 : 86;
      return { text: JSON.stringify({ score, reasons: score < 80 ? ['Hook 3 giây đầu chưa đủ gắt'] : [], fixes: score < 80 ? ['Mở bằng câu hỏi trực diện'] : [], summary: 'Bản chấm giả lập (FAKE).' }), inTok: 2500, outTok: 180, searches: 0 };
    }
    return { text: `(FAKE) Kết quả mẫu cho: ${c.user.slice(0, 80)}…`, inTok: 3000, outTok: 900, searches: c.webSearch ? 2 : 0 };
  }
}

/* ---------- sổ chi tiêu ---------- */
interface LedgerRow { date: string; ts: string; ch: string; jobId: string; stepId: string; model: string; inTok: number; outTok: number; searches: number; cost: number }

export const vnDate = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Saigon' }).format(d);

/* ---------- bộ chạy bước thật ---------- */
export class ClaudeExecutor implements RealHooks {
  factory!: Factory;
  results = new Map<string, RealResult>();
  inflight = new Map<string, AbortController>();
  queue: { key: string; run: () => Promise<void> }[] = [];
  active = 0;
  stopped = false;
  ledger: LedgerRow[] = [];
  private ledgerFile: string;

  constructor(public cfg: Config, private llm: Llm | null) {
    mkdirSync(cfg.dataDir, { recursive: true });
    this.ledgerFile = join(cfg.dataDir, 'ledger.jsonl');
    if (existsSync(this.ledgerFile)) {
      this.ledger = readFileSync(this.ledgerFile, 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
    }
  }
  bind(f: Factory) { this.factory = f; }

  isReal(chId: string, step: StepDef) { return chId === this.cfg.realChannel && this.cfg.realSteps.includes(step.id); }

  spentToday(chId?: string) {
    const d = vnDate();
    return this.ledger.filter(r => r.date === d && (!chId || r.ch === chId)).reduce((s, r) => s + r.cost, 0);
  }
  jobSpent(jobId: string) { return this.ledger.filter(r => r.jobId === jobId).reduce((s, r) => s + r.cost, 0); }

  estimate(chId: string, step: StepDef) {
    const model = this.modelOf(chId, step);
    const p = PRICES[model] ?? { in: 2, out: 10 };
    const searches = step.action === 'read' && this.cfg.webSearch ? this.cfg.maxSearches : 0;
    const inTok = step.action === 'read' && searches ? 12000 : 5000;
    return (inTok * p.in + 2500 * p.out) / 1e6 + searches * WEB_SEARCH_USD;
  }

  canStart(chId: string, job: Job, step: StepDef): string | null {
    if (this.stopped) return 'Đang dừng khẩn cấp';
    if (!this.llm) return 'Chưa có ANTHROPIC_API_KEY trong file .env';
    const est = this.estimate(chId, step);
    const today = this.spentToday(chId);
    if (today + est > this.cfg.dailyCapUsd) return `Hết ngân sách ngày ($${today.toFixed(2)} / $${this.cfg.dailyCapUsd.toFixed(2)})`;
    const jv = this.jobSpent(job.id);
    if (jv + est > this.cfg.videoCapUsd) return `Video đã dùng $${jv.toFixed(2)} / $${this.cfg.videoCapUsd.toFixed(2)}`;
    return null;
  }

  private modelOf(chId: string, step: StepDef) {
    const wf = this.factory.channels[chId].workflow;
    return wf.agents.find(a => a.id === step.agentId)?.model ?? 'claude-sonnet-5-5';
  }

  start(chId: string, job: Job, step: StepDef): void {
    const key = `${chId}/${job.id}/${step.id}`;
    this.queue.push({ key, run: () => this.run(chId, job.id, step.id, key) });
    this.pump();
  }

  take(chId: string, jobId: string, stepId: string): RealResult | undefined {
    const key = `${chId}/${jobId}/${stepId}`;
    const r = this.results.get(key);
    if (r) this.results.delete(key);
    return r;
  }

  /** Dừng khẩn cấp: hủy mọi lượt gọi đang chạy và không nhận lượt mới. */
  stop() {
    this.stopped = true;
    for (const q of this.queue) this.results.set(q.key, { tokens: 0, cost: 0, output: '', error: 'Đã dừng khẩn cấp' });
    this.queue = [];
    for (const c of this.inflight.values()) c.abort();
  }
  resume() { this.stopped = false; }

  private pump() {
    while (this.active < this.cfg.concurrency && this.queue.length) {
      const job = this.queue.shift()!;
      this.active++;
      job.run().finally(() => { this.active--; this.pump(); });
    }
  }

  private async run(chId: string, jobId: string, stepId: string, key: string) {
    const ctl = new AbortController();
    this.inflight.set(key, ctl);
    try {
      const ch = this.factory.channels[chId];
      const job = ch.jobs[jobId];
      const step = ch.workflow.steps.find(s => s.id === stepId);
      if (!job || !step) throw new Error('Video hoặc bước không còn tồn tại');
      const call = this.buildCall(chId, job, step);
      const r = await this.llm!.call(call, ctl.signal);
      const p = PRICES[call.model] ?? { in: 2, out: 10 };
      const cost = (r.inTok * p.in + r.outTok * p.out) / 1e6 + r.searches * WEB_SEARCH_USD;
      this.record({ date: vnDate(), ts: new Date().toISOString(), ch: chId, jobId, stepId, model: call.model, inTok: r.inTok, outTok: r.outTok, searches: r.searches, cost });
      const res: RealResult = { tokens: r.inTok + r.outTok, cost, output: r.text || '(Claude không trả về chữ)' };
      if (step.gate) {
        const rv = parseReview(r.text, step.gate.threshold);
        if (rv) Object.assign(res, rv);
        else Object.assign(res, { error: 'Không đọc được điểm JSON từ người thẩm định' });
      }
      this.saveArtifact(jobId, stepId, job.steps[stepId]?.runs.length ?? 1, res.output);
      this.results.set(key, res);
    } catch (e) {
      const err = e as { status?: number; message?: string; name?: string };
      const msg = ctl.signal.aborted ? 'Đã dừng khẩn cấp' : `${err.status ? `API ${err.status}: ` : ''}${(err.message ?? String(e)).slice(0, 200)}`;
      this.results.set(key, { tokens: 0, cost: 0, output: '', error: msg });
    } finally {
      this.inflight.delete(key);
    }
  }

  private record(row: LedgerRow) {
    this.ledger.push(row);
    try { appendFileSync(this.ledgerFile, JSON.stringify(row) + '\n'); } catch { /* ghi sổ lỗi thì vẫn chạy */ }
  }

  private saveArtifact(jobId: string, stepId: string, n: number, text: string) {
    try {
      const dir = join(this.cfg.dataDir, 'jobs', jobId);
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, `${stepId}-${n}.md`), text);
    } catch { /* bỏ qua */ }
  }

  /** Dựng prompt từ đầu ra của các bước trước, phản hồi của cổng và sổ tay bài học. */
  buildCall(chId: string, job: Job, step: StepDef): LlmCall {
    const ch = this.factory.channels[chId];
    const wf = ch.workflow;
    const model = this.modelOf(chId, step);
    const base = job.overrides?.[step.id] || step.prompt;
    const lastOut = (id: string) => { const r = job.steps[id]?.runs.filter(x => x.output && !x.error); return r?.length ? r[r.length - 1].output! : ''; };
    const inputs = preds(wf, step.id).map(id => ({ name: wf.steps.find(s => s.id === id)?.name ?? id, text: lastOut(id) })).filter(x => x.text);
    const inputText = inputs.map(x => `### Đầu ra bước "${x.name}"\n${x.text}`).join('\n\n');

    if (step.gate) {
      return {
        model, maxTokens: 1200, webSearch: 0,
        system: `${base}\n\nBạn là người thẩm định khó tính nhưng công bằng cho kênh YouTube Shorts kinh dị "Hẻm chuyện lạ". Ngưỡng đạt là ${step.gate.threshold}/100.\nChỉ trả về đúng một khối JSON, không thêm chữ nào khác:\n{"score": <số 0-100>, "reasons": ["lý do trừ điểm chính, ngắn"], "fixes": ["việc cần sửa cụ thể"], "summary": "nhận xét 1-2 câu"}`,
        user: `Tiêu đề video: "${job.title}"\n\n${inputText || '(không có nội dung để chấm)'}`,
      };
    }

    // phản hồi từ các cổng trả việc về bước này
    const feedback: string[] = [];
    for (const g of wf.steps.filter(s => s.gate?.reworkTo === step.id)) {
      const runs = job.steps[g.id]?.runs ?? [];
      const last = runs[runs.length - 1];
      if (last && last.passed === false && last.output) feedback.push(`Người thẩm định ("${g.name}") đã trả bản trước về:\n${last.output}`);
    }
    const prev = feedback.length ? lastOut(step.id) : '';
    const lessons = Object.entries(ch.agents[step.agentId]?.lessons ?? {}).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => `- ${k}`).join('\n');

    if (step.action === 'read') {
      return {
        model, maxTokens: 3000, webSearch: this.cfg.webSearch ? this.cfg.maxSearches : 0,
        system: `${base}\n\nBạn là nhà nghiên cứu cho kênh YouTube Shorts kinh dị "Hẻm chuyện lạ". Viết tiếng Việt. Chỉ dùng chuyện có nguồn rõ ràng và ghi nguồn (tên sách, bài viết, đường link nếu có). Không bịa nguồn.`,
        user: `Tiêu đề hoặc chủ đề gợi ý: "${job.title}".\n\nHãy tìm 3 tích truyện dân gian hoặc truyền thuyết Việt Nam hợp chủ đề, chấm độ lạ (1-10) và tiềm năng hook (1-10), rồi chọn 1 truyện tốt nhất.\n\nTrả lời theo cấu trúc:\n## 3 lựa chọn\n(mỗi lựa chọn: tên, 2 câu tóm tắt, điểm, nguồn)\n## Chọn\n- Truyện:\n- Tóm tắt (5-7 câu):\n- Hook gợi ý (1 câu, tối đa 12 từ):\n- Nguồn:`,
      };
    }

    return {
      model, maxTokens: 3000, webSearch: 0,
      system: `${base}\n\nViết bằng tiếng Việt tự nhiên, giọng kể chuyện bí ẩn, câu ngắn dễ đọc thành tiếng.`,
      user: [
        `Tiêu đề video: "${job.title}"`,
        inputText,
        feedback.length ? feedback.join('\n\n') : '',
        prev ? `### Bản trước của bạn\n${prev}` : '',
        lessons ? `### Lỗi bạn hay bị trả về, hãy tránh\n${lessons}` : '',
        step.action === 'write'
          ? 'Viết kịch bản theo định dạng:\nTIÊU ĐỀ: ...\n[0-3s] HOOK: ...\n[3-45s] Thân truyện: mỗi câu thoại kèm (hình: mô tả cảnh nhìn thấy được)\n[45-55s] TWIST: ...\n[55-60s] CTA: mời like và follow, tự nhiên theo câu chuyện'
          : 'Hãy hoàn thành phần việc của bước này dựa trên các đầu vào trên.',
      ].filter(Boolean).join('\n\n'),
    };
  }
}

/** Đọc JSON chấm điểm; chịu được chữ thừa quanh khối JSON. */
export function parseReview(text: string, threshold: number): { score: number; reasons: string[]; output: string } | null {
  const a = text.indexOf('{'), b = text.lastIndexOf('}');
  try {
    const j = JSON.parse(text.slice(a, b + 1)) as { score?: number; reasons?: string[]; fixes?: string[]; summary?: string };
    const score = Math.max(0, Math.min(100, Math.round(Number(j.score))));
    if (Number.isNaN(score)) throw new Error('no score');
    const reasons = (j.reasons ?? []).map(String).filter(Boolean);
    const fixes = (j.fixes ?? []).map(String).filter(Boolean);
    const output = [`Điểm ${score}/100 (ngưỡng ${threshold})`, j.summary ?? '', reasons.length ? `Lý do:\n${reasons.map(x => `- ${x}`).join('\n')}` : '', fixes.length ? `Cần sửa:\n${fixes.map(x => `- ${x}`).join('\n')}` : ''].filter(Boolean).join('\n\n');
    return { score, reasons, output };
  } catch {
    return null;
  }
}
