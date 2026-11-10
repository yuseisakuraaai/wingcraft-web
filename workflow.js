'use strict';
(() => {
 const run=document.getElementById('run-demo');
 if(!run)return;
 const result=document.getElementById('workflow-result');
 const status=document.getElementById('workflow-status');
 let state='ready';

 function render(){
  const ja=document.documentElement.lang==='ja';
  run.textContent=state==='busy'?(ja?'追加しています…':'Adding…'):state==='done'?(ja?'もう一度試す':'Try again'):(ja?'自動転記を試す':'Try automatic entry');
  run.disabled=state==='busy';
  result.hidden=state!=='done';
  status.textContent=state==='done'?(ja?'1件追加しました。':'One inquiry added.'):'';
 }

 run.addEventListener('click',()=>{
  state='busy';render();
  setTimeout(()=>{state='done';render()},matchMedia('(prefers-reduced-motion: reduce)').matches?0:500);
 });
 document.addEventListener('wingscraft:language',render);
 render();
})();
