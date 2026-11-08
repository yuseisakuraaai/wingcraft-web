'use strict';
// Resolve before styles render: explicit choice, otherwise the primary browser language.
(() => {
 let preferred;
 try { preferred = localStorage.getItem('wingscraft-language-choice'); } catch {}
 const primary = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
 const automatic = /^ja(?:-|$)/i.test(primary) ? 'ja' : 'en';
 document.documentElement.lang = preferred === 'ja' || preferred === 'en' ? preferred : automatic;
})();
