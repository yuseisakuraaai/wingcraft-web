'use strict';
(() => {
 const root=document.documentElement;
 document.addEventListener('copy',event=>event.preventDefault());
 document.addEventListener('cut',event=>event.preventDefault());
 const requestedLanguage=new URLSearchParams(location.search).get('lang');
 if(requestedLanguage==='ja'||requestedLanguage==='en'){root.lang=requestedLanguage;try{localStorage.setItem('wingscraft-language-choice',requestedLanguage)}catch{}}
 const status=document.getElementById('menu-status');
 let filter='all';
 function update(){
  document.title=root.lang==='ja'?'Sumi Coffee — 自主制作 | Wingscraft':'Sumi Coffee — Independent concept | Wingscraft';
  document.querySelector('nav').setAttribute('aria-label',root.lang==='ja'?'ページ内メニュー':'Page navigation');
  document.querySelector('.menu-filters').setAttribute('aria-label',root.lang==='ja'?'メニューの絞り込み':'Filter the menu');
  document.getElementById('sample-language').setAttribute('aria-label',root.lang==='ja'?'Switch to English':'Switch to Japanese');
  document.getElementById('back-to-top')?.setAttribute('aria-label',root.lang==='ja'?'ページトップへ戻る':'Back to top');
  document.querySelectorAll('a[href]').forEach(anchor=>{const raw=anchor.getAttribute('href');if(!raw||raw.startsWith('#')||raw.startsWith('mailto:'))return;const url=new URL(raw,location.href);if(url.protocol!==location.protocol||(url.protocol!=='file:'&&url.origin!==location.origin))return;url.searchParams.set('lang',root.lang);anchor.href=url.href;});
  const count=[...document.querySelectorAll('[data-category]')].filter(el=>!el.hidden).length;
  status.textContent=root.lang==='ja'?`${count}件のメニューを表示しています。`:`Showing ${count} menu items.`;
 }
 const topBtn=document.getElementById('back-to-top');
 if(topBtn){
  window.addEventListener('scroll',()=>topBtn.classList.toggle('is-visible',window.scrollY>400),{passive:true});
  topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
 }
 document.getElementById('sample-language').addEventListener('click',()=>{root.lang=root.lang==='ja'?'en':'ja';try{localStorage.setItem('wingscraft-language-choice',root.lang)}catch{}const url=new URL(location.href);url.searchParams.set('lang',root.lang);history.replaceState(null,'',url);update()});
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
  document.querySelectorAll('[data-category]').forEach(el=>el.hidden=filter!=='all'&&el.dataset.category!==filter);
  update();
 }));update();
})();
