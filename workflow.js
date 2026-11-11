'use strict';
(() => {
 const run=document.getElementById('run-demo');
 if(!run)return;
 const inquiry=document.getElementById('workflow-inquiry');
 const result=document.getElementById('workflow-result');
 const status=document.getElementById('workflow-status');
 const messageTitle=document.getElementById('workflow-message-title');
 const messageBody=document.getElementById('workflow-message-body');
 const resultType=document.getElementById('workflow-result-type');
 const resultTarget=document.getElementById('workflow-result-target');
 const resultConfirm=document.getElementById('workflow-result-confirm');
 const resultNext=document.getElementById('workflow-result-next');
 const inquiries=[
  {
   title:['店舗サイトを新しくしたい','We need a new shop website'],
   body:['メニューと店舗情報を掲載して、来月中に公開したいです。','We would like to publish our menu and shop details next month.'],
   type:['店舗サイト制作','Shop website'],target:['来月中','Next month'],confirm:['ページ数・写真・原稿','Pages, photos and copy'],next:['掲載内容と公開日を確認して返信','Confirm the content and launch date, then reply']
  },
  {
   title:['問い合わせを一つの画面で管理したい','We want one place to manage inquiries'],
   body:['メールとSNSに届く相談を一覧にして、対応状況も共有したいです。','We want to collect email and social inquiries in one list and share their status.'],
   type:['問い合わせ管理','Inquiry management'],target:['3か月以内','Within three months'],confirm:['受付経路・担当者・現在の件数','Channels, owners and current volume'],next:['現在の受付方法を確認し、画面構成を提案','Review the current intake process and propose the interface']
  },
  {
   title:['予約の受付を自動化したい','We want to automate booking intake'],
   body:['空き時間の案内と予約受付をWeb上で完結できるようにしたいです。','We want customers to view availability and book online.'],
   type:['予約ツール','Booking tool'],target:['2か月以内','Within two months'],confirm:['予約枠・スタッフ・キャンセル条件','Slots, staff and cancellation rules'],next:['必要な予約ルールを整理し、試作範囲を提案','Define the booking rules and propose a prototype scope']
  },
  {
   title:['毎週の集計作業を減らしたい','We want to reduce weekly reporting work'],
   body:['複数の表を手作業でまとめているため、自動で集計したいです。','We manually combine several sheets and want the totals prepared automatically.'],
   type:['業務の自動化','Workflow automation'],target:['時期は相談','Timing flexible'],confirm:['使用中の表・集計項目・更新頻度','Current sheets, metrics and update frequency'],next:['サンプルデータを確認し、自動化できる範囲を整理','Review sample data and define the automatable steps']
  },
  {
   title:['既存サイトに会員向け機能を追加したい','We want to add a customer area to our site'],
   body:['ログイン後に資料と申込履歴を確認できる画面が必要です。','Customers need a signed-in area for documents and application history.'],
   type:['Webアプリ開発','Web application'],target:['半年以内','Within six months'],confirm:['利用者数・権限・既存システム','User volume, permissions and existing systems'],next:['必要な画面とデータ連携を確認して見積もり','Confirm the screens and data connections, then estimate the work']
  }
 ];
 let state='ready';

 function current(){return inquiries[Number(inquiry.value)||0]}
 function populateOptions(ja){
  const selected=inquiry.value||'0';
  inquiry.replaceChildren(...inquiries.map((item,index)=>{
   const option=document.createElement('option');
   option.value=String(index);
   option.textContent=item.title[ja?0:1];
   return option;
  }));
  inquiry.value=selected;
 }
 function render(){
  const ja=document.documentElement.lang==='ja';
  const item=current();
  messageTitle.textContent=item.title[ja?0:1];
  messageBody.textContent=item.body[ja?0:1];
  resultType.textContent=item.type[ja?0:1];
  resultTarget.textContent=item.target[ja?0:1];
  resultConfirm.textContent=item.confirm[ja?0:1];
  resultNext.textContent=item.next[ja?0:1];
  run.textContent=state==='busy'?(ja?'整理しています…':'Structuring…'):(ja?'相談内容を選択する':'Select this inquiry');
  run.disabled=state==='busy';
  result.hidden=state!=='done';
  status.textContent=state==='done'?(ja?'確認事項と次の対応を整理しました。':'Key details and the next action are ready.'):'';
 }

 run.addEventListener('click',()=>{
  state='busy';render();
  setTimeout(()=>{state='done';render()},matchMedia('(prefers-reduced-motion: reduce)').matches?0:500);
 });
 inquiry.addEventListener('change',()=>{state='ready';render()});
 document.addEventListener('wingscraft:language',()=>{populateOptions(document.documentElement.lang==='ja');render()});
 populateOptions(document.documentElement.lang==='ja');
 render();
})();
