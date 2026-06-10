/* ============================================================
   NAVBAR — blur glass on scroll
   ============================================================ */
(function () {
  var nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 16);
  }, { passive: true });
})();

/* ============================================================
   MOBILE MENU
   ============================================================ */
(function () {
  var btn     = document.querySelector('.navbar__hamburger');
  var overlay = document.getElementById('mobile-menu');
  var close   = document.querySelector('.menu-overlay__close');
  var links   = document.querySelectorAll('.menu-overlay__links a');

  if (!btn || !overlay) return;

  function open() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    close && close.focus();
  }
  function shut() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('is-active');
    document.body.style.overflow = '';
    btn.focus();
  }

  btn.addEventListener('click', open);
  close && close.addEventListener('click', shut);
  links.forEach(function (l) { l.addEventListener('click', shut); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) shut();
  });
})();

/* ============================================================
   HERO — ROTATING PREVIEW with animated progress bar
   taste-skill: smooth, hardware-accelerated opacity transitions
   ============================================================ */
(function () {
  var slides  = document.querySelectorAll('.preview-slide');
  var dots    = document.querySelectorAll('.pdot');
  var fill    = document.getElementById('preview-fill');
  var nameEl  = document.getElementById('preview-name');
  var track   = document.getElementById('preview-slides');

  if (!slides.length) return;

  var NAMES   = ['NORD Cafe', 'PULSE', 'AURA ONE', 'HEMLOCK'];
  var DELAY   = 4000;
  var current = 0;
  var timer, progTimer;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function startFill() {
    if (!fill || reduced) return;
    fill.style.transition = 'none';
    fill.style.width = '0%';
    fill.getBoundingClientRect(); // force reflow for clean restart
    fill.style.transition = 'width ' + DELAY + 'ms linear';
    fill.style.width = '100%';
  }

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-pressed', 'false');

    current = (idx + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-pressed', 'true');
    if (nameEl) nameEl.textContent = NAMES[current];
    startFill();
  }

  function next() { goTo(current + 1); }

  if (!reduced) {
    startFill();
    timer = setInterval(next, DELAY);
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      clearInterval(timer);
      goTo(parseInt(dot.getAttribute('data-i'), 10));
      if (!reduced) timer = setInterval(next, DELAY);
    });
  });

  /* Pause on hover/focus — accessibility + UX */
  if (track) {
    track.addEventListener('mouseenter', function () { clearInterval(timer); if (fill) fill.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', function () {
      if (!reduced) {
        goTo(current); // reset fill
        timer = setInterval(next, DELAY);
      }
    });
  }
})();

/* ============================================================
   SCROLL REVEAL — IntersectionObserver for .reveal and .tquote
   taste-skill: cascade via CSS --i custom property already in HTML
   ============================================================ */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var targets = document.querySelectorAll('.reveal, .tquote');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  targets.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================
   MISSING IMAGE WARNINGS (dev)
   ============================================================ */
(function () {
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      console.warn('[portfolio] Missing:', img.src);
    });
  });
})();
