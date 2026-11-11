'use strict';
(() => {
 const root=document.documentElement;
 const requestedLanguage=new URLSearchParams(location.search).get('lang');
 if(requestedLanguage==='ja'||requestedLanguage==='en')root.lang=requestedLanguage;
 const translations={
  index:['Home — Wingscraft','Independent software development in Tokyo. Websites, applications and workflow automation.'],
  about:['Studio — Wingscraft','An independent software studio in Tokyo. Founded 9 November 2026 by Sakurai Yusei and Damlanur Dağhan.'],
  services:['Services — Wingscraft','Websites, web applications and automation, from discovery to launch and ongoing improvement.'],
  projects:['Wingscraft Booking — Projects','Explore the concept and development plans for Wingscraft Booking, software for small businesses.'],
  examples:['Work — Wingscraft','Explore independent studies: a small-business website, an inquiry desk and a booking desk.'],
  privacy:['Privacy — Wingscraft','How inquiry information is used and how to contact Wingscraft.'],
  contact:['Contact — Wingscraft','Discuss website development, workflow automation or booking tools with Wingscraft.'],
  journal:['Notes — Wingscraft','Design notes, architectural thoughts and engineering studies from Wingscraft.'],
  404:['404 Not Found — Wingscraft','The page you are looking for could not be found.']
 };
 const original=[document.title,document.querySelector('meta[name=description]')?.content||''];
 const page=document.body.className.replace('page-','');

 const syncLanguageURLs=lang=>{
  const current=new URL(location.href);
  current.searchParams.set('lang',lang);
  history.replaceState(null,'',current);
  document.querySelectorAll('a[href]').forEach(anchor=>{
   const raw=anchor.getAttribute('href');
   if(!raw||raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('tel:'))return;
   const target=new URL(raw,location.href);
   if(target.protocol!==location.protocol||(target.protocol!=='file:'&&target.origin!==location.origin))return;
   if(!target.pathname.endsWith('.html')&&!target.pathname.endsWith('/'))return;
   target.searchParams.set('lang',lang);
   anchor.href=target.href;
  });
  const canonical=document.querySelector('link[rel="canonical"]');
  const alternates=[...document.querySelectorAll('link[rel="alternate"][hreflang]')];
  if(canonical){
   const base=new URL(canonical.href);base.search='';
   const localized=new URL(base);localized.searchParams.set('lang',lang);canonical.href=localized.href;
   alternates.forEach(link=>{
    const code=link.getAttribute('hreflang');
    const url=new URL(base);
    if(code==='ja'||code==='en')url.searchParams.set('lang',code);
    link.href=url.href;
   });
   const ogURL=document.querySelector('meta[property="og:url"]');
   if(ogURL)ogURL.content=localized.href;
  }
 };

 // --- Language switcher ---
 const setLanguage=lang=>{
  root.lang=lang;
  document.getElementById('back-to-top')?.setAttribute('aria-label',lang==='ja'?'ページトップへ戻る':'Back to top');
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
  document.getElementById('project-type-grid')?.setAttribute('aria-label',lang==='ja'?'ご相談の種類':'Project type');
  syncLanguageURLs(lang);
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

 // --- Back to top button ---
 const backToTop=document.getElementById('back-to-top');
 if(backToTop){
  window.addEventListener('scroll',()=>{
   if(window.scrollY>400)backToTop.classList.add('is-visible');
   else backToTop.classList.remove('is-visible');
  },{passive:true});
  backToTop.addEventListener('click',()=>{
   window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
 }

 // --- Dynamic Copyright Year ---
 const currentYear = String(new Date().getFullYear());
 document.querySelectorAll('.copyright').forEach(el => {
  el.childNodes.forEach(node => {
   if(node.nodeType === 3 && node.textContent.includes('©')) {
    node.textContent = node.textContent.replace(/©\s*\d{4}/, `© ${currentYear}`);
   } else if (node.nodeType === 1 && node.textContent.includes('©')) {
    node.textContent = node.textContent.replace(/©\s*\d{4}/, `© ${currentYear}`);
   }
  });
 });

 // --- One-click Email Copy ---
 document.querySelectorAll('a[href^="mailto:wingscraft.studio@gmail.com"]').forEach(link => {
  if (link.closest('.email-copy-wrap')) return;
  const wrap = document.createElement('span');
  wrap.className = 'email-copy-wrap';
  link.parentNode.insertBefore(wrap, link);
  wrap.appendChild(link);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-email-btn';
  btn.setAttribute('aria-label', root.lang==='ja'?'メールアドレスをコピー':'Copy email address');
  btn.innerHTML = `<span>${root.lang==='ja'?'コピー':'Copy'}</span>`;

  const toast = document.createElement('span');
  toast.className = 'copy-toast';
  toast.setAttribute('role','status');
  wrap.appendChild(btn);
  wrap.appendChild(toast);

  btn.addEventListener('click', async (e) => {
   e.preventDefault();
   e.stopPropagation();
   try {
    await navigator.clipboard.writeText('wingscraft.studio@gmail.com');
    toast.textContent = root.lang==='ja'?'コピーしました！':'Copied!';
    toast.classList.add('show');
    setTimeout(() => {toast.classList.remove('show');toast.textContent='';}, 1800);
   } catch {
    toast.textContent=root.lang==='ja'?'コピーできませんでした。アドレスを選択してコピーしてください。':'Could not copy. Select and copy the address manually.';
    toast.classList.add('show');
   }
  });

 });

 document.addEventListener('wingscraft:language',()=>{
  document.querySelectorAll('.copy-email-btn').forEach(btn=>{btn.setAttribute('aria-label',root.lang==='ja'?'メールアドレスをコピー':'Copy email address');btn.querySelector('span:last-child').textContent=root.lang==='ja'?'コピー':'Copy';});
 });

 // Keyboard-only site search: Command+K on macOS, Ctrl+K elsewhere.
 const paletteItems = [
  {url:'index.html',ja:'ホーム',en:'Home',catJa:'ページ',catEn:'Pages'},
  {url:'services.html',ja:'サービス・料金・プロセス',en:'Services & Pricing',catJa:'ページ',catEn:'Pages'},
  {url:'examples.html',ja:'制作例・デモ一覧',en:'Work & Demos',catJa:'制作例',catEn:'Work'},
  {url:'projects.html',ja:'プロダクト (Wingscraft Booking)',en:'Products (Booking Engine)',catJa:'プロダクト',catEn:'Products'},
  {url:'journal.html',ja:'制作ノート',en:'Studio Notes',catJa:'ノート',catEn:'Notes'},
  {url:'about.html',ja:'スタジオ概要・創業者',en:'Studio & Founders',catJa:'スタジオ',catEn:'Studio'},
  {url:'contact.html',ja:'ご相談・お問い合わせ',en:'Contact & Inquiry',catJa:'連絡',catEn:'Contact'},
  {url:'sample-coffee.html',ja:'デモ: 店舗サイト',en:'Demo: Shop Website',catJa:'デモ',catEn:'Demo'},
  {url:'demo-booking.html',ja:'デモ: 予約管理',en:'Demo: Booking Desk',catJa:'デモ',catEn:'Demo'},
  {url:'demo-inquiries.html',ja:'デモ: 問い合わせ管理',en:'Demo: Inquiry Desk',catJa:'デモ',catEn:'Demo'},
  {url:'privacy.html',ja:'情報の取り扱い',en:'Privacy Policy',catJa:'情報',catEn:'Info'}
 ];

 function initCommandPalette(){
  if(document.getElementById('palette-dialog'))return;
  const dialog=document.createElement('dialog');
  dialog.id='palette-dialog';
  dialog.innerHTML=`<div class="palette-head"><input type="search" class="palette-search" id="palette-search" autocomplete="off"><button type="button" class="palette-close">×</button></div><ul class="palette-list" id="palette-list"></ul>`;
  document.body.appendChild(dialog);
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.querySelector('.palette-close').addEventListener('click',()=>dialog.close());
  const input=dialog.querySelector('#palette-search');
  input.addEventListener('input',()=>renderPaletteList(input.value));
  input.addEventListener('keydown',handlePaletteKeydown);
 }

 function openPalette(){
  const dialog=document.getElementById('palette-dialog');if(!dialog)return;
  const ja=root.lang==='ja',input=dialog.querySelector('#palette-search');
  dialog.setAttribute('aria-label',ja?'サイト内検索':'Site search');
  input.setAttribute('aria-label',ja?'ページを検索':'Search pages');
  input.placeholder=ja?'ページやデモを検索…':'Search pages and demos…';
  dialog.querySelector('.palette-close').setAttribute('aria-label',ja?'検索を閉じる':'Close search');
  input.value='';renderPaletteList('');dialog.showModal();input.focus();
 }

 function renderPaletteList(query){
  const list=document.getElementById('palette-list'),ja=root.lang==='ja',q=query.toLowerCase().trim();if(!list)return;
  const rows=paletteItems.filter(item=>!q||[ja?item.ja:item.en,ja?item.catJa:item.catEn,item.url].some(value=>value.toLowerCase().includes(q)));
  list.innerHTML=rows.length?rows.map((item,index)=>{const url=`${item.url}?lang=${ja?'ja':'en'}`;return `<li class="palette-item ${index===0?'active':''}" data-url="${url}"><a href="${url}"><span class="palette-label">${ja?item.ja:item.en}</span><span class="palette-category">${ja?item.catJa:item.catEn}</span></a></li>`}).join(''):`<li class="palette-empty">${ja?'一致する項目が見つかりません':'No matching results found'}</li>`;
 }

 function handlePaletteKeydown(event){
  const dialog=document.getElementById('palette-dialog');
  if(event.key==='Escape'){event.preventDefault();dialog.close();return}
  const items=[...dialog.querySelectorAll('.palette-item')];if(!items.length)return;
  const current=Math.max(0,items.findIndex(item=>item.classList.contains('active')));
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){
   event.preventDefault();const next=event.key==='ArrowDown'?(current+1)%items.length:(current-1+items.length)%items.length;
   items[current]?.classList.remove('active');items[next].classList.add('active');items[next].scrollIntoView({block:'nearest'});
  }else if(event.key==='Enter'){
   event.preventDefault();location.href=items[current].dataset.url;
  }
 }

 addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
   event.preventDefault();const dialog=document.getElementById('palette-dialog');dialog?.open?dialog.close():openPalette();
  }
 });
 initCommandPalette();

 // --- Service Worker Registration (PWA Offline Capability) ---
 if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
   navigator.serviceWorker.register('sw.js', {updateViaCache:'none'}).catch(() => {});
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
 document.querySelectorAll('input[name="demo-slot"]').forEach(input=>input.addEventListener('change',()=>{
  const selected=document.getElementById('selected-slot');
  if(selected)selected.textContent=input.value;
 }));
})();
