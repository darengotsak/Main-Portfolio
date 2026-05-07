/* ============================================================
   PROJECT IMAGE — MISSING FILE DETECTION
   ============================================================ */
(function () {
  document.querySelectorAll('.project-card__image img').forEach(function (img) {
    img.addEventListener('error', function () {
      console.warn('[portfolio] Missing image:', img.src, '— drop the file at', img.getAttribute('src'));
    });
  });
})();

/* ============================================================
   MOBILE MENU
   ============================================================ */
(function () {
  const hamburger = document.querySelector('.navbar__hamburger');
  const overlay   = document.querySelector('.menu-overlay');
  const closeBtn  = document.querySelector('.menu-overlay__close');
  const navLinks  = document.querySelectorAll('.menu-overlay__links a');

  function openMenu() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
(function () {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(function (el) { observer.observe(el); });
})();
