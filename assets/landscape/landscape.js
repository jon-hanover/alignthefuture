// The landscape graphic's i bubbles: tap or click an i to pin its card open;
// tap anywhere else, or Escape, to close. Used by the homepage and by
// /landscape/, which calls initLandscape() after it loads the graphic.
(function () {
  function initLandscape() {
    var infos = document.querySelectorAll('.landscape .info');
    function closeAll(except) {
      infos.forEach(function (el) {
        if (el !== except) { el.classList.remove('open'); el.querySelector('.i').setAttribute('aria-expanded', 'false'); }
      });
    }
    infos.forEach(function (el) {
      var b = el.querySelector('.i');
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !el.classList.contains('open');
        closeAll(el);
        el.classList.toggle('open', open);
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      el.querySelector('.tip').addEventListener('click', function (e) { e.stopPropagation(); });
    });
    document.addEventListener('click', function () { closeAll(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  }
  window.initLandscape = initLandscape;
  if (document.querySelector('.landscape .info')) initLandscape();
})();
