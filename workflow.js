'use strict';
(() => {
 const run=document.getElementById('run-demo');
 if(!run)return;
 const result=document.getElementById('workflow-result');
 const status=document.getElementById('workflow-status');
 let state='ready';

 function render(){
  const ja=document.documentElement.lang==='ja';
  run.textContent=state==='busy'?(ja?'整理しています…':'Structuring…'):state==='done'?(ja?'もう一度試す':'Try again'):(ja?'相談内容を整理する':'Structure this inquiry');
  run.disabled=state==='busy';
  result.hidden=state!=='done';
  status.textContent=state==='done'?(ja?'確認事項と次の対応を整理しました。':'Key details and the next action are ready.'):'';
 }

 run.addEventListener('click',()=>{
  state='busy';render();
  setTimeout(()=>{state='done';render()},matchMedia('(prefers-reduced-motion: reduce)').matches?0:500);
 });
 document.addEventListener('wingscraft:language',render);
 render();
})();
