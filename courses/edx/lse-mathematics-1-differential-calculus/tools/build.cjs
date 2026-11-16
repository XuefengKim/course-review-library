const fs=require('fs'), path=require('path'), katex=require('katex');
const out=path.resolve(__dirname,'../materials');
const raw=JSON.parse(fs.readFileSync(path.join(out,'课程原始题库.json'),'utf8'));
const hints=JSON.parse(fs.readFileSync(path.join(__dirname,'hints.json'),'utf8'));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
let mathErrors=[];
function render(s){return s.replace(/\\\(([\s\S]*?)\\\)/g,(all,t)=>{try{return katex.renderToString(t,{output:'mathml',throwOnError:true,strict:'ignore'});}catch(e){mathErrors.push({tex:t,error:e.message});return '<code>'+esc(t)+'</code>';}});}
function cleanQuestion(s){
 s=s.replace(/(<span class="blank">［作答］<\/span>)[\s\S]*?<img[^>]*alt="Loading"[^>]*>/g,(all,blank)=>all.includes('class="option"')?all:blank);
 return s.replace(/<img[^>]*alt="Loading"[^>]*>/g,'').replace(/<p>\s*<\/p>/g,'').replace(/\s{2,}/g,' ').trim();
}
const mod=s=>s<=14?1:s<=20?2:s<=26?3:s<=35?4:s<=41?5:6;
const names=['','函数与图像','导数','曲线与单变量最优化','偏导数与多变量函数','二元函数临界点','期末综合'];
const practice=[13,19,25,34,40];
let cards=[];
for(const u of raw.collected.filter(u=>u.problems.length)){
 for(const p of u.problems){
  const n=p.title.match(/(?:Question|Quesiton)\s+(\d+)/i)?.[1];
  const suffix=u.section===14&&n==='6'?(p.title.endsWith('a')?'a':'b'):'';
  const id=u.section+'-'+n+suffix;
  let card=cards.find(c=>c.id===id);
  if(!card){card={id,module:mod(u.section),kind:u.section===43?'期末测试':practice.includes(u.section)?'章节练习':'章节测试',title:'Question '+n+suffix,url:u.url,parts:[],hint:hints[id]}; cards.push(card);}
  let q=cleanQuestion(p.question);
  let optionNo=0;
  q=q.replace(/<span class="blank">［作答］<\/span>\s*<p class="option">/g,()=>'<p class="option"><b>'+String.fromCharCode(65+optionNo++)+'. </b>');
  const choices=p.responses.filter(r=>['radio','checkbox'].includes(r.type));
  let answer;
  if(choices.length)answer=choices.map((r,i)=>r.checked?String.fromCharCode(65+i):null).filter(Boolean).join('、');
  else answer=p.responses.map(r=>r.value).join('；');
  card.parts.push({title:p.title,question:q,html:render(q),answer,status:p.status});
 }
}
let notes=raw.collected.filter(u=>!u.problems.length&&u.content.trim()).map(u=>({section:u.section,title:(u.section===3&&u.content.includes('<ol>')?'Activity on sets':u.title.split(' | ')[0]),module:mod(u.section),url:u.url,html:render(u.content.replace(/<ul><\/ul><ul><li><\/li><li><span class="blank">［作答］<\/span><\/li><\/ul>/g,'').replace(/<img[^>]*alt="Loading"[^>]*>/g,''))}));
const concepts=[
 ['1','交集、并集与子集分别是什么意思？','交集是同时属于两个集合的元素；并集是至少属于其中一个集合的元素；A⊆B 表示 A 的每个元素都属于 B。空集是任意集合的子集。'],
 ['1','反函数存在时，需要什么条件？如何验证？','相对于给定陪域，函数有双侧反函数当且仅当它是双射；若把陪域限制为值域，单射就足够。验证两个复合在各自定义域上都等于恒等函数。'],
 ['1','为什么函数复合的顺序不能随便交换？','f∘g 先执行 g 再执行 f，通常不等于 g∘f。还要检查 g 的输出是否落在 f 的定义域中。'],
 ['2','导数的定义和几何含义是什么？','f′(x)=limₕ→₀ [f(x+h)−f(x)]/h（极限存在时）。它表示瞬时变化率，也是可微点处切线的斜率。'],
 ['2','链式法则、乘积法则分别在什么结构下使用？','复合函数用链式法则：外层导数乘内层导数。两函数相乘用乘积法则 u′v+uv′。复杂表达式常需要两者嵌套。'],
 ['3','局部极值与闭区间最大、最小值有什么不同？','局部极值只与附近的点比较；闭区间全局极值要与全区间比较。对连续函数，可比较端点和区间内所有临界候选点的函数值。'],
 ['3','f′(a)=0 一定意味着极值吗？f″(a)=0 呢？','都不一定。例如 x³ 在 0 处一、二阶导数都为零，却没有局部极值。二阶导数为零时该判别法不作结论，需要检查导数变号或使用其他方法。'],
 ['4','求偏导数时，哪些变量被固定？','对一个自变量求偏导时，其他自变量保持不变。沿一条 x(t)、y(t) 变化的路径求总导数，则要用 fₓx′+fᵧy′。'],
 ['4','什么时候可以用 y′=−gₓ/gᵧ？','在 g(x,y)=常数 附近满足适当的连续可微条件，且该点 gᵧ≠0 时，可局部把 y 写成 x 的可微函数并使用此公式。'],
 ['4','生产函数的边际产量如何解释？','资本边际产量是固定劳动时产量对资本的偏导；劳动边际产量反之。偏导给出局部变化率，不等同于任意大幅投入变化产生的总增量。'],
 ['5','二元函数的 Hessian 行列式如何判别临界点？','在二阶连续偏导存在的临界点，H=fₓₓfᵧᵧ−fₓᵧ²。H<0 为鞍点；H>0 且 fₓₓ>0 为局部极小，fₓₓ<0 为局部极大；H=0 时不能凭此判别。'],
 ['5','为什么解一阶条件时不能随意除以 x 或 y？','除以可能为零的因子会丢失解。遇到乘积为零，应逐个检查因式为零的分支，再代回原方程去除伪解。']
].map((a,i)=>({id:'concept-'+(i+1),module:+a[0],kind:'补充概念',title:a[1],url:'',parts:[{title:'自行回忆',html:'<p>'+a[1]+'</p>',question:a[1],answer:a[2]}],hint:'先不看答案，用自己的话说出定义、条件和一个简单例子。此卡片为补充整理，并非 edX 原题。'}));
fs.writeFileSync(path.join(out,'课程原始题库.json'),JSON.stringify(raw,null,2));
fs.writeFileSync(path.join(out,'复习题库.json'),JSON.stringify({course:'LSE Mathematics 1 Part 1: Differential Calculus',date:'2026-11-16',cards,concepts,notes},null,2));
fs.writeFileSync(path.join(__dirname,'data.js'),'const DATA='+JSON.stringify({cards:[...cards,...concepts],notes,names}).replace(/</g,'\\u003c')+';');
fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify({cards:cards.length,blocks:cards.reduce((s,c)=>s+c.parts.length,0),concepts:concepts.length,notes:notes.length,missingHints:cards.filter(c=>!c.hint).map(c=>c.id),mathErrors},null,2));
let txt='LSE Mathematics 1 Part 1: Differential Calculus\n原题摘录 · 2026-11-16\n题目来自已登录课程；公式以 LaTeX 保留。相互依赖的小题按组保存。\n\n';
for(const c of cards){txt+='【'+names[c.module]+' / '+c.kind+' / '+c.title+'】\n来源：'+c.url+'\n';for(const p of c.parts)txt+=p.title+'\n'+p.question.replace(/\\\(([\s\S]*?)\\\)/g,(_,t)=>'@@MATH'+Buffer.from(t).toString('base64')+'@@').replace(/<[^>]+>/g,' ').replace(/@@MATH(.*?)@@/g,(_,s)=>'\\('+Buffer.from(s,'base64').toString()+'\\)').replace(/\s+/g,' ')+'\n';txt+='解题思路（整理）：'+c.hint+'\n\n';}
fs.writeFileSync(path.join(out,'原题与思路.txt'),txt);
console.log(JSON.parse(fs.readFileSync(path.join(__dirname,'validation.json'))));
