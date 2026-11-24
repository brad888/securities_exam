const {parseHTML}=require(process.env.LINKEDOM_PATH || 'linkedom');
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const {document,window}=parseHTML(html);
// Only model nonvisual browser interfaces. This does not test layout, pointer geometry or paint.
window.HTMLElement.prototype.scrollIntoView=function(){};
Object.defineProperty(window.HTMLAnchorElement.prototype,"hash",{get(){const h=this.getAttribute("href")||"";return h.includes("#")?h.slice(h.indexOf("#")):"";}});
window.HTMLElement.prototype.getBoundingClientRect=function(){return {width:0,height:0,left:0,top:0};};
for(const el of document.querySelectorAll('select')) Object.defineProperty(el,'value',{get(){return this._testValue??this.querySelector('option')?.getAttribute('value')??'';},set(v){this._testValue=v;},configurable:true});
const store=new Map();
const context=vm.createContext({document,window,location:{hash:''},localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)},ResizeObserver:class{observe(){}},setInterval:()=>1,clearInterval:()=>{},console,FormData:class{constructor(form){this.form=form;}getAll(name){return [...this.form.querySelectorAll('input')].filter(e=>e.name===name&&e.checked).map(e=>e.value);}}});
window.confirm=()=>true;
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
const run=code=>vm.runInContext(code,context);
assert.equal(document.querySelectorAll('#cards .lesson').length,65);
assert.equal(document.querySelectorAll('#sprint-actions button').length,4);
assert.equal(document.querySelectorAll('#paper option').length,15);
run('byId("subject").value="L";byId("query").value="合伙";renderNotes()');
assert.equal(document.querySelectorAll('#cards .lesson').length,1);
assert.match(document.querySelector('#cards h4').textContent,/普通合伙/);
run('byId("note-mode").value="red";renderNotes()');assert.equal(document.querySelector('#cards').dataset.mode,'red');
run('byId("note-mode").value="blue";renderNotes()');assert.equal(document.querySelector('#cards').dataset.mode,'blue');
run('byId("query").value="不存在的考点xyz";renderNotes()');assert.equal(document.querySelectorAll('#cards .lesson').length,0);
run('byId("subject").value="";byId("query").value="";renderNotes()');
// A filter-hidden lesson must reappear when an actual lesson link is activated.
run('byId("subject").value="L";renderNotes()');
assert.equal(document.getElementById('lesson-1'),null);
const anchor=document.querySelector('a[href="#lesson-1"]');
anchor.dispatchEvent(new window.Event('click',{bubbles:true,cancelable:true}));
assert.ok(document.getElementById('lesson-1'));
// Exercise each shortcut, mount questions and open answer review with answer-key selections.
for(let i=0;i<4;i++){
 document.querySelectorAll('#sprint-actions button')[i].click();
 assert.equal(document.querySelectorAll('#questions fieldset').length,15);
 run('saveRecord({selections:papers[paperIndex].questions.map(q=>[...q[3]]),submitted:true});renderPaper()');
 assert.match(document.getElementById('score').textContent,/答对 15 \/ 15/);
 document.getElementById('show-review').click();
 assert.equal(document.querySelectorAll('#review li').length,15);
 assert.equal(document.querySelectorAll('#review .source-link').length,15);
 for(const link of document.querySelectorAll('#review a[href^="#lesson-"]')) assert.ok(document.getElementById(link.getAttribute('href').slice(1)));
 run('byId("wrong-only").checked=true;renderReview()');
 assert.match(document.getElementById('review').textContent,/没有错题/);
 run('saveRecord({selections:papers[paperIndex].questions.map(()=>[]),submitted:true});renderReview()');
 assert.equal(document.querySelectorAll('#review .review-wrong').length,15);
}
// Actual submit event reads DOM inputs via a minimal browser FormData adapter.
run('saveRecord({selections:[],submitted:false});renderPaper()');
const answerKeys=JSON.parse(run('JSON.stringify(papers[paperIndex].questions.map(q=>q[3]))'));
answerKeys.forEach((key,i)=>{for(const input of document.querySelectorAll(`#questions input[name="q${i}"]`)) input.checked=key.includes(Number(input.value));});
document.getElementById('quiz').dispatchEvent(new window.Event('submit',{cancelable:true}));
assert.match(document.getElementById('score').textContent,/答对 15 \/ 15/);
// Multiple choice must reject partially correct selections; unseen answers are wrong.
assert.equal(run('grade(papers[paperIndex].questions.map(()=>[])).filter(Boolean).length'),0);
assert.ok(run('papers[paperIndex].questions.some(q=>q[0]===multi&&q[3].length>1)'));
assert.equal(run('(()=>{const i=papers[paperIndex].questions.findIndex(q=>q[0]===multi&&q[3].length>1);const s=papers[paperIndex].questions.map(q=>[...q[3]]);s[i]=[s[i][0]];return grade(s)[i];})()'),false);
for(const a of document.querySelectorAll('a[href^="#"]')){
 const id=a.getAttribute('href').slice(1);if(id)assert.ok(document.getElementById(id),`missing anchor ${id}`);
}
console.log('PASS: 离线DOM：65卡片、4入口、15卷、科目/搜索/三色模式、空结果、隐藏锚点、交卷、满分/漏答/多选、60个解析来源与回链。未验证视觉布局。');
