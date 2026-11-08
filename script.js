'use strict';
(() => {
 const root=document.documentElement;
 const translations={index:['Home — Wingscraft','Independent software development in Tokyo. Websites, applications and workflow automation.'],about:['Studio — Wingscraft','An independent software studio in Tokyo. Founded 9 November 2026 by Sakurai Yusei and Damlanur Dağhan.'],services:['Services — Wingscraft','Websites, web applications and automation, from discovery to launch and ongoing improvement.'],projects:['Wingscraft Booking — Projects','Explore the concept and development plans for Wingscraft Booking, software for small businesses.'],contact:['Contact — Wingscraft','Prepare a project inquiry on the website, then review and send it in your mail app.']};
 const original=[document.title,document.querySelector('meta[name=description]').content];
 const page=document.body.className.replace('page-','');
 const setLanguage=lang=>{root.lang=lang;document.querySelector('nav').setAttribute('aria-label',lang==='en'?'Pages':'ページ');const meta=lang==='en'?translations[page]:original;document.title=meta[0];for(const selector of ['meta[name=description]','meta[property="og:description"]'])document.querySelector(selector).content=meta[1];document.querySelector('meta[property="og:title"]').content=meta[0];document.querySelector('meta[property="og:locale"]').content=lang==='en'?'en_US':'ja_JP';document.querySelector('meta[property="og:locale:alternate"]').content=lang==='en'?'ja_JP':'en_US';document.getElementById('lang').setAttribute('aria-label',lang==='en'?'Switch to Japanese':'Switch to English') };
 setLanguage(root.lang==='ja'?'ja':'en');
 document.getElementById('lang').addEventListener('click',()=>{setLanguage(root.lang==='ja'?'en':'ja');try{localStorage.setItem('wingscraft-language-choice',root.lang)}catch{}document.getElementById('form-status')?.replaceChildren()});
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){root.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}}),{threshold:.06});document.querySelectorAll('.rv').forEach(el=>observer.observe(el))}
 const form=document.getElementById('contact-form');if(!form)return;
 const status=document.getElementById('form-status');
 const message=()=>{const data=new FormData(form);return root.lang==='ja'?`お名前: ${data.get('name')}\r\n返信先: ${data.get('email')}\r\n事業名: ${data.get('company')}\r\n\r\n${data.get('message')}`:`Name: ${data.get('name')}\r\nReply email: ${data.get('email')}\r\nBusiness: ${data.get('company')}\r\n\r\n${data.get('message')}`};
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const subject=root.lang==='ja'?'Wingscraftへのお問い合わせ':'Project inquiry — Wingscraft';const url=`mailto:wingscraft.studio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`;status.textContent=root.lang==='ja'?'メールソフトへの引き渡しを試みました。まだ送信されていません。開いた画面で内容を確認し、送信してください。開かない場合は内容をコピーしてください。':'We attempted to open your mail app. Nothing has been sent. Review and send the email there, or copy your message if no app opens.';window.location.href=url});
 document.getElementById('copy-message').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(`To: wingscraft.studio@gmail.com\r\n\r\n${message()}`);status.textContent=root.lang==='ja'?'内容をコピーしました。メールに貼り付けてお送りください。':'Copied. Paste the message into your email.'}catch{status.textContent=root.lang==='ja'?'自動コピーできませんでした。入力内容を手動でコピーしてください。':'Automatic copying is unavailable. Please copy the form entries manually.'}});
})();

// Local demonstrations. No network requests, storage or booking submission.
(() => {
 const run=document.getElementById('run-demo');
 const status=document.getElementById('workflow-status');
 const rows=[...document.querySelectorAll('.demo-flow li')];
 let timer; let finished=false;
 const announce=()=>{if(status)status.textContent=finished?(document.documentElement.lang==='ja'?'デモ完了。内容の整理から通知までの流れを確認しました。':'Demo complete. Details organised and the notification step illustrated.') : '';};
 if(run)run.addEventListener('click',()=>{
  clearTimeout(timer);finished=false;announce();rows.forEach(row=>row.classList.remove('active'));run.disabled=true;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index=0;
  const advance=()=>{if(index<rows.length){rows[index++].classList.add('active');timer=setTimeout(advance,reduce?0:420);}else{finished=true;run.disabled=false;announce();}};
  advance();
 });
 document.getElementById('lang').addEventListener('click',announce);
 document.querySelectorAll('input[name="demo-slot"]').forEach(input=>input.addEventListener('change',()=>{document.getElementById('selected-slot').textContent=input.value;}));
})();
