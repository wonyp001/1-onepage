(function () {
  'use strict';

  var header     = document.getElementById('header');
  var navToggle  = document.querySelector('.nav-toggle');
  var siteNav    = document.getElementById('site-nav');

  /* Sticky header */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      var next = !open;
      navToggle.setAttribute('aria-expanded', String(next));
      navToggle.setAttribute('aria-label', next ? '메뉴 닫기' : '메뉴 열기');
      siteNav.classList.toggle('is-open', next);
      document.body.style.overflow = next ? 'hidden' : '';
    });

    /* Close nav on link click */
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', '메뉴 열기');
        siteNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Scroll-reveal: add .is-visible when element enters viewport */
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.service-card, .how-step, .item-card, .trust-card, .story-card'
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
