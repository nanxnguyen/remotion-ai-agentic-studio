import { createReadStream, createWriteStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { join } from 'node:path';
import { WebSocketServer, type WebSocket } from 'ws';
import { Factory } from '../../web/src/engine/factory';
import { CHANNELS } from '../../web/src/engine/presets';
import type { FactoryEvent, Workflow } from '../../web/src/engine/types';
import { AnthropicLlm, ClaudeExecutor, FakeLlm, vnDate } from './claude';
import { loadConfig } from './config';

const cfg = loadConfig();
mkdirSync(cfg.dataDir, { recursive: true });
const llm = cfg.fake ? new FakeLlm() : cfg.apiKey ? new AnthropicLlm(cfg.apiKey) : null;
const executor = new ClaudeExecutor(cfg, llm);

// máy chủ chỉ giữ kênh thật; các kênh khác được trình duyệt tự mô phỏng
const defs = CHANNELS.filter(c => c.id === cfg.realChannel);
if (!defs.length) throw new Error(`Không có kênh "${cfg.realChannel}". Chọn một trong: ${CHANNELS.map(c => c.id).join(', ')}`);
const factory = new Factory(defs, Date.now() % 100000, {}, { real: executor, autoSpawn: { [cfg.realChannel]: false } });
executor.bind(factory);

/* ---------- dựng lại từ log ---------- */
const eventsFile = join(cfg.dataDir, 'events.jsonl');
if (existsSync(eventsFile)) {
  const events: FactoryEvent[] = readFileSync(eventsFile, 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  factory.replay(events);
  console.log(`Đã dựng lại ${events.length} event, đồng hồ xưởng ${factory.t.toFixed(0)}s`);
}
const out = createWriteStream(eventsFile, { flags: 'a' });
factory.listeners.add(e => out.write(JSON.stringify(e) + '\n'));

// bước thật đang chạy dở lúc tắt máy: đánh dấu lỗi để bạn bấm Retry
{
  const ch = factory.channels[cfg.realChannel];
  for (const a of Object.values(ch?.agents ?? {})) {
    const s = ch.workflow.steps.find(x => x.id === a.stepId);
    if (a.jobId && s && a.phaseEnd !== undefined && executor.isReal(ch.id, s)) {
      factory.emit({ t: factory.t, ch: ch.id, type: 'step.failed', jobId: a.jobId, stepId: s.id, agentId: a.id, error: 'Máy chủ khởi động lại khi bước đang chạy, bấm Retry', retry: false });
    }
  }
}

/* ---------- vòng lặp ---------- */
let paused = false, speed = 1;
setInterval(() => { if (!paused) factory.advance(0.25 * speed); }, 250);

function info() {
  return {
    mode: 'live' as const, fake: cfg.fake, hasKey: !!llm, realChannel: cfg.realChannel, realSteps: cfg.realSteps,
    dailyCapUsd: cfg.dailyCapUsd, videoCapUsd: cfg.videoCapUsd, spentToday: executor.spentToday(cfg.realChannel), date: vnDate(),
    stopped: executor.stopped, paused, speed, webSearch: cfg.webSearch, inflight: executor.active, queued: executor.queue.length,
  };
}

/* ---------- HTTP + WebSocket ---------- */
const authed = (req: IncomingMessage) => {
  if (!cfg.token) return true;
  const u = new URL(req.url ?? '/', 'http://x');
  return u.searchParams.get('token') === cfg.token || req.headers.authorization === `Bearer ${cfg.token}`;
};
const json = (res: ServerResponse, code: number, body: unknown) => { res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(body)); };

async function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  let s = '';
  for await (const c of req) { s += c; if (s.length > 2_000_000) throw new Error('quá lớn'); }
  return s ? JSON.parse(s) : {};
}

function act(b: Record<string, unknown>): unknown {
  const ch = String(b.ch ?? cfg.realChannel);
  const s = (k: string) => String(b[k] ?? '');
  switch (b.type) {
    case 'approve': factory.approve(ch, s('jobId'), s('stepId')); return { ok: true };
    case 'retry': factory.retry(ch, s('agentId')); return { ok: true };
    case 'rerun': factory.rerun(ch, s('jobId'), s('stepId'), b.prompt ? s('prompt') : undefined); return { ok: true };
    case 'cancel': factory.cancel(ch, s('jobId')); return { ok: true };
    case 'priority': factory.priority(ch, s('jobId'), !!b.on); return { ok: true };
    case 'auto': factory.setAuto(ch, !!b.on); return { ok: true };
    case 'addJob': if (!s('title').trim()) return { ok: false, error: 'Thiếu tiêu đề' }; factory.addJob(ch, s('title').trim().slice(0, 120)); return { ok: true };
    case 'publish': { const p = factory.publish(ch, b.workflow as Workflow, s('note')); return p.length ? { ok: false, problems: p } : { ok: true }; }
    case 'pause': paused = !!b.on; return { ok: true };
    case 'speed': speed = Math.min(8, Math.max(0.25, Number(b.value) || 1)); return { ok: true };
    case 'stop': executor.stop(); return { ok: true };
    case 'resume': executor.resume(); return { ok: true };
    case 'caps': {
      if (b.daily !== undefined) cfg.dailyCapUsd = Math.max(0, Math.min(100, Number(b.daily) || 0));
      if (b.video !== undefined) cfg.videoCapUsd = Math.max(0, Math.min(20, Number(b.video) || 0));
      return { ok: true };
    }
    default: return { ok: false, error: 'Không rõ thao tác' };
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://x');
  try {
    if (url.pathname.startsWith('/api/')) {
      if (!authed(req)) return json(res, 401, { error: 'Sai token' });
      if (url.pathname === '/api/state' && req.method === 'GET') {
        return json(res, 200, { t: factory.t, logs: factory.logs, info: info() });
      }
      // video thật của một job: đặt file vào data/jobs/<mã>/ là Thư viện phát được
      const mm = url.pathname.match(/^\/api\/media\/([A-Za-z0-9_-]{1,40})(?:\/([^/]{1,200}))?$/);
      if (mm && req.method === 'GET') return media(req, res, mm[1], mm[2] ? decodeURIComponent(mm[2]) : undefined);
      if (url.pathname === '/api/action' && req.method === 'POST') {
        const r = act(await readBody(req));
        broadcast({ kind: 'info', t: factory.t, info: info() });
        return json(res, 200, r);
      }
      return json(res, 404, { error: 'Không có' });
    }
    if (!existsSync(cfg.webDist)) { res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' }); return res.end('Chưa build giao diện. Chạy: cd ../web && npm run build'); }
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' });
    createReadStream(cfg.webDist).pipe(res);
  } catch (e) {
    json(res, 400, { error: String((e as Error).message ?? e) });
  }
});

const MEDIA: Record<string, string> = { '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime', '.m4v': 'video/mp4', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
const extOf = (f: string) => { const i = f.lastIndexOf('.'); return i < 0 ? '' : f.slice(i).toLowerCase(); };

function media(req: IncomingMessage, res: ServerResponse, jobId: string, file?: string) {
  const dir = join(cfg.dataDir, 'jobs', jobId);
  if (!file) {
    const files = existsSync(dir) ? readdirSync(dir).filter(f => MEDIA[extOf(f)]).map(f => ({ name: f, size: statSync(join(dir, f)).size, type: MEDIA[extOf(f)] })) : [];
    files.sort((a, b) => (a.type.startsWith('video') ? 0 : 1) - (b.type.startsWith('video') ? 0 : 1) || b.size - a.size);
    return json(res, 200, { files });
  }
  // chỉ phục vụ file nằm thẳng trong thư mục của job, đúng đuôi cho phép
  if (file.includes('/') || file.includes('\\') || file.startsWith('.') || !MEDIA[extOf(file)]) return json(res, 400, { error: 'Tên file không hợp lệ' });
  const path = join(dir, file);
  if (!existsSync(path)) return json(res, 404, { error: 'Không có file' });
  const size = statSync(path).size, type = MEDIA[extOf(file)];
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (range) {
    const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
    const end = range[1] && range[2] ? Math.min(size - 1, Number(range[2])) : size - 1;
    if (start >= size || start > end) { res.writeHead(416, { 'content-range': `bytes */${size}` }); return res.end(); }
    res.writeHead(206, { 'content-type': type, 'content-length': end - start + 1, 'content-range': `bytes ${start}-${end}/${size}`, 'accept-ranges': 'bytes' });
    return createReadStream(path, { start, end }).pipe(res);
  }
  res.writeHead(200, { 'content-type': type, 'content-length': size, 'accept-ranges': 'bytes' });
  createReadStream(path).pipe(res);
}

const wss = new WebSocketServer({ noServer: true });
const clients = new Set<WebSocket>();
server.on('upgrade', (req, sock, head) => {
  if (new URL(req.url ?? '/', 'http://x').pathname !== '/ws' || !authed(req)) { sock.destroy(); return; }
  wss.handleUpgrade(req, sock, head, ws => { clients.add(ws); ws.on('close', () => clients.delete(ws)); });
});
function broadcast(m: unknown) {
  const s = JSON.stringify(m);
  for (const c of clients) if (c.readyState === c.OPEN) c.send(s);
}
// gom event theo nhịp 150ms để đỡ tốn băng thông
let batch: FactoryEvent[] = [];
factory.listeners.add(e => { batch.push(e); });
setInterval(() => { if (batch.length) { broadcast({ kind: 'events', events: batch }); batch = []; } }, 150);
setInterval(() => broadcast({ kind: 'info', t: factory.t, info: info() }), 1000);

server.listen(cfg.port, cfg.host, () => {
  const tk = cfg.token ? `?token=${cfg.token}` : '';
  console.log(`\nXưởng Video AI đang chạy: http://${cfg.host === '0.0.0.0' ? 'localhost' : cfg.host}:${cfg.port}/${tk}#tong-quan`);
  console.log(`Kênh thật: ${cfg.realChannel} · bước thật: ${cfg.realSteps.join(', ')} · ${cfg.fake ? 'CLAUDE GIẢ (không tốn tiền)' : llm ? 'Claude API' : 'CHƯA CÓ API KEY'}`);
  console.log(`Ngân sách: $${cfg.dailyCapUsd}/ngày · $${cfg.videoCapUsd}/video · đã dùng hôm nay $${executor.spentToday(cfg.realChannel).toFixed(3)}`);
  if (cfg.host !== '127.0.0.1' && !cfg.token) console.warn('CẢNH BÁO: đang mở ra mạng mà chưa đặt XV_TOKEN.');
});
const shutdown = () => { out.end(); process.exit(0); };
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
