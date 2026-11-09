'use strict';
(() => {
 const form=document.getElementById('contact-form'); if(!form)return;
 const service=document.getElementById('service'), message=document.getElementById('message');
 const status=document.getElementById('form-status'), submit=document.getElementById('send-inquiry');
 const endpoint=window.WINGSCRAFT_CONFIG?.formspreeEndpoint || '';
 const direct=window.WingscraftTransport.validEndpoint(endpoint);
 const labels={general:['まずは相談したい','Not sure yet'],web:['Webサイト制作','Website development'],automation:['業務の自動化','Workflow automation'],booking:['予約ツール開発','Booking tool development']};
 const params=new URLSearchParams(location.search);
 if(Object.hasOwn(labels,params.get('service'))) service.value=params.get('service');
 const example=params.get('example')==='sumi'?'Sumi Coffee':'';
 let state='',busy=false;
 const t=(ja,en)=>document.documentElement.lang==='ja'?ja:en;
 const notices={
  sending:['送信しています。このままお待ちください。','Sending your inquiry. Please wait.'],
  success:['送信サービスがご相談を受け付けました。内容を確認してご連絡します。','The delivery service has accepted your inquiry. We will review it and get back to you.'],
  rejected:['送信できませんでした。入力内容は残っています。内容を確認して再度お試しいただくか、メールでご連絡ください。','The inquiry could not be submitted. Your entries are still here. Review them and try again, or email us directly.'],
  uncertain:['送信結果を確認できませんでした。入力内容は残っています。重複送信を避けるため、再送の前に時間をおくか、メールでお問い合わせください。','We could not confirm the result. Your entries are still here. To avoid duplicates, wait before trying again or contact us by email.'],
  limited:['送信回数の制限に達しました。少し時間をおいてお試しいただくか、メールでご連絡ください。','The submission limit was reached. Please wait before trying again, or email us directly.'],
  mail:['メールソフトへの引き渡しを試みました。まだ送信されていません。開いた画面で確認して送信してください。開かない場合は、内容をコピーしてメールに貼り付けられます。','We attempted to open your mail app. Nothing has been sent. Review and send the email there. If no app opens, copy the message and paste it into an email.'],
  copied:['内容をコピーしました。メールに貼り付けて送信できます。','Copied. Paste the message into an email to send it.'],
  copyFailed:['自動コピーできませんでした。入力内容を手動でコピーしてください。','Automatic copying was unavailable. Please copy the entries manually.'],
  blocked:['送信を開始できませんでした。ページを再読み込みするか、メールでご連絡ください。','The submission could not start. Reload the page or contact us by email.']
 };
 function render(){
  const ja=document.documentElement.lang==='ja';
  for(const option of service.options)option.textContent=option.dataset[ja?'ja':'en'];
  submit.textContent=busy?t('送信中…','Sending…'):direct?t('相談内容を送信する','Send your inquiry'):t('メールソフトで確認する','Review in mail app');
  document.getElementById('form-help').textContent=direct?t('入力内容を確認して送信してください。Wingscraft宛てにご相談をお送りします。','Review your details and submit your inquiry to Wingscraft.'):t('内容をまとめて、メールソフトで確認・送信できます。このページから直接送信はされません。','Prepare your inquiry here, then review and send it in your mail app. This page does not send the message itself.');
  document.getElementById('form-privacy').textContent=direct?t('入力内容はFormspreeを経由して送信され、ご相談への対応と連絡に使用します。機密情報は入力しないでください。','Your details are sent through Formspree and used to respond to your inquiry. Please omit confidential information.'):t('入力内容はこのサイトに送信・保存されません。メールでお送りいただいた情報は、ご相談への対応と連絡に使用します。','Your entries are not sent to or stored by this website. Information you email us is used to respond to your inquiry.');
  status.textContent=state?notices[state][ja?0:1]:'';
  status.dataset.state=state;
 }
 function setState(value){state=value;render();}
 function bodyText(){const data=new FormData(form);return [t('ご相談の種類: ','Service: ')+labels[service.value][document.documentElement.lang==='ja'?0:1],t('お名前: ','Name: ')+data.get('name'),t('返信先: ','Reply email: ')+data.get('email'),t('事業名: ','Business: ')+data.get('company'),...(example?[t('参考の制作例: ','Reference concept: ')+example]:[]),'',data.get('message')].join('\r\n');}
 function lock(value){busy=value;for(const field of form.querySelectorAll('input,textarea,select,button'))field.disabled=value;form.setAttribute('aria-busy',String(value));render();}
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;for(const field of ['name','email','message'])form.elements[field].value=form.elements[field].value.trim();if(!form.reportValidity())return;
  if(form.elements._gotcha.value){setState('blocked');return;}
  if(!direct){const url='mailto:wingscraft.studio@gmail.com?subject='+encodeURIComponent(t('Wingscraftへのお問い合わせ','Project inquiry — Wingscraft'))+'&body='+encodeURIComponent(bodyText());setState('mail');location.href=url;return;}
  const data=Object.fromEntries(new FormData(form));data._subject='Wingscraft — '+labels[service.value][1];data.language=document.documentElement.lang;if(example)data.reference=example;
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
  lock(true);setState('sending');
  try{await window.WingscraftTransport.submit(endpoint,data,controller.signal);form.reset();setState('success');}
  catch(error){setState(error.message==='rate-limit'?'limited':error.message==='rejected'?'rejected':'uncertain');}
  finally{clearTimeout(timeout);lock(false);status.focus({preventScroll:true});}
 });
 document.getElementById('copy-message').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('To: wingscraft.studio@gmail.com\r\n\r\n'+bodyText());setState('copied')}catch{setState('copyFailed')}});
 document.addEventListener('wingscraft:language',render);
 if(example){const note=document.createElement('p');note.className='field-help reference-note';note.textContent=t('参考の制作例: Sumi Coffee','Reference concept: Sumi Coffee');service.after(note);document.addEventListener('wingscraft:language',()=>note.textContent=t('参考の制作例: Sumi Coffee','Reference concept: Sumi Coffee'));}
 render();
})();
