'use strict';
(() => {
 const header=document.querySelector('.nav'), nav=document.getElementById('primary-nav'), button=document.querySelector('.menu-toggle');
 if(!header||!nav||!button)return;
 const mobile=matchMedia('(max-width:760px)');
 let open=false;
 function render(){
  button.setAttribute('aria-expanded',String(open));
  header.classList.toggle('menu-open',open);
  nav.inert=mobile.matches&&!open;
  button.setAttribute('aria-label',document.documentElement.lang==='ja'?(open?'メニューを閉じる':'メニューを開く'):(open?'Close menu':'Open menu'));
 }
 function close(restore=false){open=false;render();if(restore)button.focus();}
 header.classList.add('nav-enhanced');render();
 button.addEventListener('click',()=>{open=!open;render();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open){e.preventDefault();close(true);}});
 document.addEventListener('click',e=>{if(open&&!header.contains(e.target))close();});
 document.addEventListener('focusin',e=>{if(open&&!header.contains(e.target))close();});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
 mobile.addEventListener('change',()=>{close();});
 document.addEventListener('wingscraft:language',render);
})();
