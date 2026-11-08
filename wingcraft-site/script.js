// 言語切り替え：選んだ言語をブラウザに保存します
(function () {
  var root = document.documentElement;
  try { var s = localStorage.getItem('wc-lang'); if (s === 'en' || s === 'ja') root.lang = s; } catch (e) {}
  document.getElementById('lang').addEventListener('click', function () {
    root.lang = root.lang === 'ja' ? 'en' : 'ja';
    try { localStorage.setItem('wc-lang', root.lang); } catch (e) {}
  });
})();
