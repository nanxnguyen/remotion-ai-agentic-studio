/**
 * Test the real state-projection functions embedded in monitor.html, rather
 * than testing a reimplementation. Run with:
 *   node --test tests/monitor_status_parity.test.cjs
 *
 * The status JSON is the one persisted source, while stage and agent records
 * are distinct facts. Both graphs must agree on active work without
 * manufacturing completed stages, review gates, or file evidence.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const monitor = fs.readFileSync(path.join(__dirname, '../scripts/monitor.html'), 'utf8');
function section(begin, end) {
  const start = monitor.indexOf(begin), stop = monitor.indexOf(end, start);
  assert.ok(start !== -1 && stop > start, `missing monitor section: ${begin}`);
  return monitor.slice(start, stop);
}
const source = [
  section('const videoFlow=', '// ---- status derivation'),
  section('function reviewChip(', 'function summary('),
].join('\n');
const flow = [
  {id:'brief',stage:'brief',agents:['script-agent'],reviewer:null,gate:null},
  {id:'script',stage:'script',agents:['script-agent'],reviewer:'script-reviewer',gate:'A'},
  {id:'content',stage:'content',lane:'content',agents:['content-agent'],reviewer:'content-reviewer',gate:'content'},
  {id:'voice',stage:'voice',lane:'audio',agents:['voice-agent'],reviewer:null,gate:null},
  {id:'audio',stage:'audio',lane:'audio',agents:['audio-agent'],reviewer:'audio-reviewer',gate:'audio'},
  {id:'design',stage:'design',lane:'design',agents:['design-agent'],reviewer:'design-reviewer',gate:'D'},
];
const ctx = vm.createContext({
  meta: {flow}, cur: 'video-a', data: [], short: () => '00:00',
  REVIEW_LABEL: {A:['A','script-reviewer'],content:['content','content-reviewer'],
    audio:['audio','audio-reviewer'],D:['D','design-reviewer']},
  summary: () => ({done:0,total:6,reviewOk:0,reviewTotal:4})
});
vm.runInContext(source, ctx, {filename:'monitor.html#status'});
const stage = (v,id) => vm.runInContext('nodeState(video,flowNode(nodeId,video))',
  Object.assign(ctx, {video:v,nodeId:id}));
const agent = (v,id) => vm.runInContext('agentState(video,agentName).state',
  Object.assign(ctx, {video:v,agentName:id}));
function fixture({states={},agents={},reviews={},folder='video-a'}={}){
  return {folder,flow:4,stages:flow.map(n=>({id:n.stage,state:states[n.stage]||'pending'})),
    agents,reviews,join_ready:false};
}

test('running content, voice, design agents light exactly their pending pipeline nodes',()=>{
  const v=fixture({agents:{
    'content-agent-2':{state:'running',stage:'content'},
    'voice-agent':{state:'running',stage:'voice'},
    'design-agent':{state:'running',stage:'design'},
  }});
  const before=JSON.stringify(v);
  for(const [id,agentId] of [['content','content-agent'],['voice','voice-agent'],['design','design-agent']]){
    assert.equal(agent(v,agentId),'running');
    assert.equal(stage(v,id),'in_progress');
  }
  assert.equal(stage(v,'audio'),'pending');
  assert.equal(JSON.stringify(v),before,'display projection must never mutate status JSON');
});

test('one producer owning two stages only lights its explicitly assigned stage',()=>{
  const v=fixture({states:{brief:'done'},agents:{'script-agent':{state:'running',stage:'script'}}});
  assert.equal(stage(v,'brief'),'done');
  assert.equal(stage(v,'script'),'in_progress');
  assert.equal(agent(v,'script-agent'),'running');
});

test('legacy unscoped producer only lights first unfinished owned stage',()=>{
  const v=fixture({agents:{'script-agent':{state:'running',stage:''}}});
  assert.equal(stage(v,'brief'),'in_progress');
  assert.equal(stage(v,'script'),'pending');
});

test('done, blocked and failed evidence cannot be overwritten by a running badge',()=>{
  const v=fixture({states:{voice:'done',audio:'failed',design:'blocked'},agents:{
    'voice-agent':{state:'running',stage:'voice'},
    'audio-agent':{state:'running',stage:'audio'},
    'design-agent':{state:'running',stage:'design'},
  }});
  assert.equal(stage(v,'voice'),'done');
  assert.equal(stage(v,'audio'),'failed');
  assert.equal(stage(v,'design'),'blocked');
});

test('a historical done agent record is not proof an unfinished stage is done',()=>{
  const v=fixture({agents:{'voice-agent':{state:'done',stage:'voice'}}});
  assert.equal(stage(v,'voice'),'pending');
});

test('stale producer done is NOT completion after a stage was reopened',()=>{
  const v=fixture({agents:{'voice-agent':{state:'done',stage:'voice'}}});
  assert.equal(stage(v,'voice'),'pending');
  assert.equal(agent(v,'voice-agent'),'idle');
});

test('invalidated gate never inherits historical reviewer done',()=>{
  const v=fixture({agents:{'content-reviewer':{state:'done'}},
    reviews:{content:{passed:true,stale:true,rounds:1,overridden:false}}});
  assert.equal(agent(v,'content-reviewer'),'idle');
  assert.equal(vm.runInContext('reviewOk(video,"content")',Object.assign(ctx,{video:v})),false);
});

test('failed producer and pending stage show same error without marking stage complete',()=>{
  const v=fixture({agents:{'voice-agent':{state:'failed',stage:'voice'}}});
  const before=JSON.stringify(v);
  assert.equal(agent(v,'voice-agent'),'failed');
  assert.equal(stage(v,'voice'),'failed');
  assert.equal(v.stages.find(x=>x.id==='voice').state,'pending');
  assert.equal(JSON.stringify(v),before);
});

test('stale agent running on a completed owned stage does not light another stage',()=>{
  const v=fixture({states:{brief:'done'},agents:{
    'script-agent':{state:'running',stage:'brief'},
  }});
  assert.equal(stage(v,'brief'),'done');
  assert.equal(stage(v,'script'),'pending');
  assert.equal(agent(v,'script-agent'),'idle');
});

test('two videos cannot contaminate each other even when global selection changes',()=>{
  const a=fixture({agents:{'voice-agent':{state:'running',stage:'voice'}}});
  const b=fixture({folder:'video-b'});
  ctx.data=[a,b];
  ctx.cur='video-b';
  assert.equal(stage(a,'voice'),'in_progress');
  assert.equal(stage(b,'voice'),'pending');
});

test('reviewer can be active while producer stage stays done; review remains unapproved',()=>{
  const v=fixture({states:{content:'done'},agents:{
    'content-reviewer':{state:'running',stage:'content'},
  },reviews:{content:{passed:false,overridden:false,stale:false,rounds:0}}});
  assert.equal(stage(v,'content'),'done');
  assert.equal(agent(v,'content-reviewer'),'running');
  assert.equal(vm.runInContext('reviewOk(video,"content")',Object.assign(ctx,{video:v})),false);
});

test('real pipeline stage renderer marks inferred agent activity without changing status.json',()=>{
  ctx.LABEL={in_progress:'Đang chạy',pending:'Đang chờ',done:'Hoàn tất',failed:'Lỗi'};
  ctx.COLOR={in_progress:'#fbbf24',pending:'#64748b',done:'#4ade80',failed:'#f87171'};
  ctx.sel=null;
  ctx.esc=x=>String(x);
  ctx.bot=()=>'<svg></svg>';
  vm.runInContext("function chip(v,name){return '<span class=agent-chip>'+agentState(v,name).state+'</span>'}",ctx);
  vm.runInContext(section('function stageNode(', '// Each review is its own node right after its producer:'),ctx);
  const v=fixture({agents:{'voice-agent':{state:'running',stage:'voice'}}});
  const before=JSON.stringify(v);
  const html=vm.runInContext('stageNode(video,flowNode("voice",video),"3b.1")',Object.assign(ctx,{video:v}));
  assert.match(html,/stage-node in_progress/);
  assert.match(html,/agent-active/);
  assert.match(html,/class=agent-chip>running/);
  assert.match(html,/Agent đang hoạt động/);
  assert.equal(JSON.stringify(v),before);
});

test('all graph/overview render paths use the shared nodeState projection',()=>{
  const orch = section('function orchestration(', 'function drawOrchLines(');
  const overview = section('function overview(', 'function output(');
  const pipeline = section('function pipeline(', 'function detail(');
  assert.match(orch,/nodeState\(v,n\)/);
  assert.match(overview,/nodeState\(v,n\)==='in_progress'/);
  assert.match(pipeline,/stageNode\(v,n,nums\[i\]\)/);
  assert.match(monitor,/function stageNode\(v,n,num\)\{const st=nodeState\(v,n\)/);
  assert.match(monitor,/\/api\/status/);
  assert.match(section('function summary(', '// ---- panels ----'),/const blocked=/);
  assert.match(orch,/states.includes\('running'\)\|\|nodes.some/);
});
