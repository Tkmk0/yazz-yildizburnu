'use strict';

// 1. BURGER MENU
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');
let open = false;

burger.addEventListener('click', () => {
  open = !open;
  burger.setAttribute('aria-expanded', open);
  mobMenu.classList.toggle('op', open);
  document.body.style.overflow = open ? 'hidden' : '';
  const s = burger.querySelectorAll('span');
  s[0].style.transform = open ? 'translateY(6.5px) rotate(45deg)' : '';
  s[1].style.opacity = open ? '0' : '';
  s[2].style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
});

mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  open = false;
  mobMenu.classList.remove('op');
  document.body.style.overflow = '';
  burger.setAttribute('aria-expanded', false);
  const s = burger.querySelectorAll('span');
  s[0].style.transform = s[1].style.opacity = s[2].style.transform = '';
}));

// 2. MENU TABS
document.querySelectorAll('.mtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(t => {
      t.classList.remove('act');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.mpanel').forEach(p => p.classList.remove('act'));
    tab.classList.add('act');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    panel.classList.add('act');
    // Re-observe reveal elements in the newly active panel
    panel.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => {
      el.classList.remove('on');
      setTimeout(() => {
        if (window.revealObs) window.revealObs.observe(el);
      }, 40);
    });
  });
});

// 3. GALLERY LIGHTBOX
(function () {
  // Create overlay element once
  const overlay = document.createElement('div');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Galeri görseli');
  Object.assign(overlay.style, {
    display: 'none',
    position: 'fixed',
    inset: '0',
    zIndex: '9999',
    background: 'rgba(15, 52, 50, 0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'zoom-out',
  });

  const img = document.createElement('img');
  Object.assign(img.style, {
    maxWidth: '92vw',
    maxHeight: '88vh',
    borderRadius: '8px',
    boxShadow: '0 8px 48px rgba(0,0,0,.6)',
    objectFit: 'contain',
    cursor: 'default',
  });
  img.setAttribute('alt', '');

  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Kapat');
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '20px',
    right: '24px',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '2rem',
    lineHeight: '1',
    cursor: 'pointer',
    padding: '4px 8px',
  });
  closeBtn.textContent = '×';

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.style.display = 'none';
    img.src = '';
    // Only restore overflow if burger menu is also closed
    if (!open) document.body.style.overflow = '';
  }

  // Attach click listeners to all .gi elements that contain an <img>
  document.querySelectorAll('.gi').forEach(cell => {
    // Skip placeholder cells (no real photo)
    if (cell.classList.contains('gi-ph')) return;
    const galleryImg = cell.querySelector('img');
    if (!galleryImg) return;
    cell.style.cursor = 'zoom-in';
    cell.addEventListener('click', () => {
      const src = galleryImg.dataset.src || galleryImg.src;
      openLightbox(src, galleryImg.alt);
    });
  });

  // Close on overlay background click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeLightbox();
  });

  // Close button
  closeBtn.addEventListener('click', closeLightbox);

  // Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') closeLightbox();
  });
}());
