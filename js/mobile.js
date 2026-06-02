'use strict';

/* ══════════════════════════════════════════════════
   YAZZ — iPhone 15 Mobil Etkileşimler
   Sadece 430px altında çalışır
   ══════════════════════════════════════════════════ */

if (window.matchMedia('(max-width: 430px)').matches) {

  /* ── Galeri: dokunma ile kaydırma ivmesi ── */
  (function () {
    var track = document.querySelector('.gal-grid');
    if (!track) return;

    var startX = 0, startScroll = 0, isDragging = false;

    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startScroll = track.scrollLeft;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var dx = startX - e.touches[0].clientX;
      track.scrollLeft = startScroll + dx;
    }, { passive: true });

    track.addEventListener('touchend', function () {
      isDragging = false;
    }, { passive: true });
  }());

  /* ── Kart dokunma efekti (hafif scale-down) ── */
  (function () {
    var cards = document.querySelectorAll('.feat, .stat, .mi');
    cards.forEach(function (el) {
      el.addEventListener('touchstart', function () {
        el.style.transition = 'transform .1s ease, opacity .1s ease';
        el.style.opacity    = '.82';
      }, { passive: true });

      function restore() {
        el.style.opacity = '';
        setTimeout(function () { el.style.transition = ''; }, 150);
      }
      el.addEventListener('touchend',   restore, { passive: true });
      el.addEventListener('touchcancel', restore, { passive: true });
    });
  }());

  /* ── Menü sekme scroll: aktif sekmeyi görünüre al ── */
  (function () {
    document.querySelectorAll('.mtab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    });
  }());

  /* ── Footer grid lang: mob-lang aktif durumu senkronizasyonu ── */
  /* main.js zaten tüm .lang-btn'leri yönetiyor, ek kod gerekmiyor */

}
