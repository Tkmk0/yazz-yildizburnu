'use strict';

// 1. NAV SCROLL + HERO REVEAL + HERO OUT/IN
const nav  = document.getElementById('nav');
const hero = document.getElementById('home');
let heroRevealed = false;

window.addEventListener('scroll', () => {
  nav.classList.toggle('sc', scrollY > 50);

  if (!hero) return;

  // İlk kez scroll — reveal
  if (!heroRevealed && scrollY > 25) {
    heroRevealed = true;
    hero.classList.add('hero-revealed');
    // Geçişler bittikten sonra hero-ready ekle (gecikmeleri sıfırlar)
    setTimeout(() => hero.classList.add('hero-ready'), 1400);
  }

  // Hero'nun ekrandaki alt kenarını ölç
  // bottom < %25 viewport → hero görünümden çıktı → gizle
  // bottom > %35 viewport → hero geri geldi → göster
  if (heroRevealed) {
    const bottom = hero.getBoundingClientRect().bottom;
    const vh     = window.innerHeight;
    if (bottom < vh * 0.25) {
      hero.classList.add('hero-out');
    } else if (bottom > vh * 0.35) {
      hero.classList.remove('hero-out');
    }
  }
}, { passive: true });

// 1b. LOGO SPLASH — FLIP: ortadan nav'a uçar
(function () {
  var splash    = document.getElementById('logoSplash');
  if (!splash) return;
  var splashImg = splash.querySelector('.logo-splash-img');
  var done      = false;

  window.addEventListener('scroll', function fly() {
    if (done || window.scrollY < 25) return;
    done = true;

    var navImg = document.querySelector('.nav-logo-img');
    if (!navImg || !splashImg) { splash.style.display = 'none'; return; }

    var sr = splashImg.getBoundingClientRect();
    var nr = navImg.getBoundingClientRect();

    var dx = (nr.left + nr.width  / 2) - (sr.left + sr.width  / 2);
    var dy = (nr.top  + nr.height / 2) - (sr.top  + sr.height / 2);
    var sc = nr.height / sr.height;

    /* Önce nav'ı göster ki hedef pozisyon hesaplanabilsin */
    nav.classList.add('sc');

    /* Splash uçuşu */
    splash.style.transition = 'transform .48s cubic-bezier(.16,1,.3,1), opacity .22s ease .28s';
    splash.style.transform  = 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) scale(' + sc + ')';
    splash.style.opacity    = '0';

    /* Nav logosu: splash inerken belirir */
    var logoEl = document.querySelector('.logo');
    if (logoEl) {
      logoEl.style.transition   = 'opacity .35s ease .3s';
      logoEl.style.opacity      = '0.7';
      logoEl.style.pointerEvents = 'auto';
    }

    setTimeout(function () { splash.style.display = 'none'; }, 650);
  }, { passive: true });
})();

// 2. REVEAL OBSERVER
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.1, rootMargin: '0px 0px -44px 0px' });

document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s').forEach(el => revealObs.observe(el));

// Export observer globally so interactions.js can reuse it for tab switching
window.revealObs = revealObs;

// 3. LANGUAGE SWITCHER
let lang = localStorage.getItem('yazz-lang') || 'tr';

function setLang(l) {
  lang = l;
  document.documentElement.setAttribute('lang', l);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('act', b.dataset.lang === l);
    b.setAttribute('aria-pressed', b.dataset.lang === l);
  });
  document.querySelectorAll('[data-' + l + ']').forEach(el => {
    const v = el.getAttribute('data-' + l);
    if (!v) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = v;
    else el.innerHTML = v;
  });
  localStorage.setItem('yazz-lang', l);
}

document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
setLang(lang);

// 4. FORM
document.getElementById('resForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('.fsub-btn');
  const orig = btn.textContent;
  btn.textContent = lang === 'tr' ? 'Gönderiliyor...' : 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '.7';
  setTimeout(() => {
    btn.textContent = lang === 'tr' ? '✓ Rezervasyonunuz Alındı!' : '✓ Reservation Received!';
    btn.style.background = '#16a34a';
    btn.style.opacity = '1';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      this.reset();
    }, 3000);
  }, 1200);
});

// 5. MIN DATE
const dtIn = document.getElementById('dt');
if (dtIn) {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  dtIn.min = d.toISOString().split('T')[0];
}
