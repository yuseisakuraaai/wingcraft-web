'use strict';
(() => {
 const root=document.documentElement;
 const translations={
  index:['Home — Wingscraft','Independent software development in Tokyo. Websites, applications and workflow automation.'],
  about:['Studio — Wingscraft','An independent software studio in Tokyo. Founded 9 November 2026 by Sakurai Yusei and Damlanur Dağhan.'],
  services:['Services — Wingscraft','Websites, web applications and automation, from discovery to launch and ongoing improvement.'],
  projects:['Wingscraft Booking — Projects','Explore the concept and development plans for Wingscraft Booking, software for small businesses.'],
  examples:['Work — Wingscraft','Explore independent studies: a small-business website, an inquiry desk and a booking desk.'],
  privacy:['Privacy — Wingscraft','How inquiry information is used and how to contact Wingscraft.'],
  contact:['Contact — Wingscraft','Discuss website development, workflow automation or booking tools with Wingscraft.'],
  404:['404 Not Found — Wingscraft','The page you are looking for could not be found.']
 };
 const original=[document.title,document.querySelector('meta[name=description]')?.content||''];
 const page=document.body.className.replace('page-','');

 // --- Language switcher ---
 const setLanguage=lang=>{
  root.lang=lang;
  const nav=document.querySelector('nav');
  if(nav)nav.setAttribute('aria-label',lang==='en'?'Pages':'ページ');
  const meta=lang==='en'?(translations[page]||original):original;
  document.title=meta[0];
  for(const selector of ['meta[name=description]','meta[property="og:description"]']){
   const el=document.querySelector(selector);
   if(el)el.content=meta[1];
  }
  const ogTitle=document.querySelector('meta[property="og:title"]');
  if(ogTitle)ogTitle.content=meta[0];
  const ogLoc=document.querySelector('meta[property="og:locale"]');
  if(ogLoc)ogLoc.content=lang==='en'?'en_US':'ja_JP';
  const ogLocAlt=document.querySelector('meta[property="og:locale:alternate"]');
  if(ogLocAlt)ogLocAlt.content=lang==='en'?'ja_JP':'en_US';
  const langBtn=document.getElementById('lang');
  if(langBtn)langBtn.setAttribute('aria-label',lang==='en'?'Switch to Japanese':'Switch to English');
  updateThemeButtonAria();
 };
 setLanguage(root.lang==='ja'?'ja':'en');

 const privacy=document.getElementById('privacy-provider');
 const privacyText=()=>{
  const policy=document.getElementById('provider-policy');
  if(policy)policy.hidden=!window.WINGSCRAFT_CONFIG?.formspreeEndpoint;
  if(privacy)privacy.textContent=window.WINGSCRAFT_CONFIG?.formspreeEndpoint?(root.lang==='ja'?'サイト内送信にはFormspreeを使用します。送信内容は同サービスでも処理・保管されるため、同サービスのプライバシーポリシーもご確認ください。':'Direct submissions use Formspree. The provider also processes and stores submissions; please review its privacy policy.'):(root.lang==='ja'?'現在のお問い合わせは、メールソフトを通じた送信方式です。':'Inquiries currently use your mail app.');
 };
 privacyText();
 document.addEventListener('wingscraft:language',privacyText);

 const langBtn=document.getElementById('lang');
 if(langBtn){
  langBtn.addEventListener('click',()=>{
   setLanguage(root.lang==='ja'?'en':'ja');
   try{localStorage.setItem('wingscraft-language-choice',root.lang)}catch{}
   document.dispatchEvent(new CustomEvent('wingscraft:language'));
  });
 }

 // --- Theme switcher ---
 function updateThemeButtonAria(){
  const themeBtn=document.getElementById('theme-toggle');
  if(!themeBtn)return;
  const isLight=root.getAttribute('data-theme')==='light';
  themeBtn.textContent=isLight?'🌙':'☀️';
  themeBtn.setAttribute('aria-label',root.lang==='ja'?(isLight?'ダークモードに切り替え':'ライトモードに切り替え'):(isLight?'Switch to dark mode':'Switch to light mode'));
 }
 const savedTheme=(()=>{try{return localStorage.getItem('wingscraft-theme')}catch{return null}})();
 if(savedTheme==='light'||(!savedTheme&&window.matchMedia?.('(prefers-color-scheme: light)').matches)){
  root.setAttribute('data-theme','light');
 }
 updateThemeButtonAria();

 const themeBtn=document.getElementById('theme-toggle');
 if(themeBtn){
  themeBtn.addEventListener('click',()=>{
   const next=root.getAttribute('data-theme')==='light'?'dark':'light';
   if(next==='light')root.setAttribute('data-theme','light');
   else root.removeAttribute('data-theme');
   try{localStorage.setItem('wingscraft-theme',next)}catch{}
   updateThemeButtonAria();
  });
 }

 // --- Back to top button ---
 const backToTop=document.getElementById('back-to-top');
 if(backToTop){
  window.addEventListener('scroll',()=>{
   if(window.scrollY>400)backToTop.classList.add('is-visible');
   else backToTop.classList.remove('is-visible');
  },{passive:true});
  backToTop.addEventListener('click',()=>{
   window.scrollTo({top:0,behavior:'smooth'});
  });
 }

 // --- Privacy-first Analytics beacon injection ---
 const cfToken=window.WINGSCRAFT_CONFIG?.cloudflareAnalyticsToken;
 if(cfToken&&typeof cfToken==='string'&&cfToken.trim()!==''){
  const s=document.createElement('script');
  s.defer=true;
  s.src='https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon',JSON.stringify({token:cfToken.trim()}));
  document.head.appendChild(s);
 }

 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  root.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}
  }),{threshold:.06});
  document.querySelectorAll('.rv').forEach(el=>observer.observe(el));
 }
})();

// Local demonstrations. No network requests, storage or booking submission.
(() => {
 const run=document.getElementById('run-demo');
 const status=document.getElementById('workflow-status');
 const rows=[...document.querySelectorAll('.demo-flow li')];
 let timer; let finished=false;
 const announce=()=>{if(status)status.textContent=finished?(document.documentElement.lang==='ja'?'デモ完了。内容の整理から通知までの流れを確認しました。':'Demo complete. Details organised and the notification step illustrated.'):'';};
 if(run)run.addEventListener('click',()=>{
  clearTimeout(timer);finished=false;announce();rows.forEach(row=>row.classList.remove('active'));run.disabled=true;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index=0;
  const advance=()=>{if(index<rows.length){rows[index++].classList.add('active');timer=setTimeout(advance,reduce?0:420);}else{finished=true;run.disabled=false;announce();}};
  advance();
 });
 const langBtn=document.getElementById('lang');
 if(langBtn)langBtn.addEventListener('click',announce);
 document.querySelectorAll('input[name="demo-slot"]').forEach(input=>input.addEventListener('change',()=>{
  const selected=document.getElementById('selected-slot');
  if(selected)selected.textContent=input.value;
 }));
})();
