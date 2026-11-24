const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const data = vm.runInNewContext(script.slice(script.indexOf('const notes ='), script.indexOf('const byId =')) + ';JSON.parse(JSON.stringify({notes,papers}));');
const originalTitles = ['金融基础 1 · 市场、股票与基金','法规 1 · 公司法与证券发行','金融基础 2 · 债券、衍生品与一步计算','法规 2 · 券商业务与客户保护','金融基础 3 · 股票、基金和风险混合卷','法规 3 · 交易红线、风控和纪法','2026 年 9 月金融基础 · 回忆考点改编','2026 年 9 月法规 · 回忆考点改编','原创模拟卷 · 金融市场基础知识','原创模拟卷 · 证券市场基本法律法规','2026 年 6 月法规 · 回忆考点改编'];
assert.deepEqual(Array.from(data.papers.slice(0,11), p=>p.title), originalTitles);
for (const paper of data.papers) for (const [type,prompt,opts,key,explanation,meta] of paper.questions) {
  assert.ok(['单选','多选','判断','案例单选'].includes(type), prompt);
  assert.ok(prompt && explanation && opts.length>=2 && opts.length<=4, prompt);
  assert.ok(key.length>0 && new Set(key).size===key.length && key.every(i=>Number.isInteger(i)&&i>=0&&i<opts.length), prompt);
  if(type!=='多选') assert.equal(key.length,1,prompt);
  if(meta) {assert.ok(data.notes.some(n=>n[3]===meta.lesson),meta.lesson);assert.match(meta.source,/^https:\/\//);}
}
const stockRights = data.papers[8].questions.find(q=>q[1]==='哪些属于股票投资权益或特征？');
assert.deepEqual(Array.from(stockRights[3],i=>stockRights[2][i]), ['可能获得股息','依法参与股东会表决','依法享有剩余财产分配权益'], '股票权益不可选保本承诺');
assert.equal(data.notes.length,65,'新增16个补漏考点');
assert.equal(data.papers.length,15,'新增四组补漏练习');
assert.equal(data.papers.slice(11).reduce((n,p)=>n+p.questions.length,0),60);
const newStems=data.papers.slice(11).flatMap(p=>p.questions.map(q=>q[1]));
assert.equal(new Set(newStems).size,60,'新增题干不重复');
for (const p of data.papers.slice(11)) {assert.equal(p.questions.length,15);assert.ok(p.questions.every(q=>q[5]));}
for(const note of data.notes.slice(49)) {assert.equal(note.length,12);assert.match(note[11],/^https:\/\//);}
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'HTML ids unique');
console.log(`PASS: ${data.notes.length}考点 / ${data.papers.length}套卷 / ${data.papers.reduce((n,p)=>n+p.questions.length,0)}题；旧索引、答案、来源、脚本语法有效。`);
