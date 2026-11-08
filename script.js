(function () {
  var root = document.documentElement, rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  try { var s = localStorage.getItem('wc-lang'); if (s === 'en' || s === 'ja') root.lang = s; } catch (e) {}
  document.getElementById('lang').addEventListener('click', function () {
    root.lang = root.lang === 'ja' ? 'en' : 'ja';
    try { localStorage.setItem('wc-lang', root.lang); } catch (e) {}
  });
  var els = [].slice.call(document.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window && !rm) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    els.forEach(function (e) { io.observe(e); });
  } else { els.forEach(function (e) { e.classList.add('in'); }); }
})();
