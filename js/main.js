(function () {
  'use strict';

  var header = document.getElementById('header');
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');
  var categoryCards = document.querySelectorAll('.category-card');
  var categoryPanels = document.querySelectorAll('.category-panel');
  var chips = document.querySelectorAll('.chip[data-category]');
  var storyTrack = document.getElementById('story-track');
  var storyDots = document.getElementById('story-dots');
  var searchInput = document.getElementById('hero-search-input');

  var placeholders = [
    '우리 동네에서 무엇을 찾고 계세요?',
    '캠핑 의자, 알바, 러닝 모임…',
    '역삼동 근처 중고거래',
    '동네 맛집 추천 받기'
  ];
  var placeholderIndex = 0;
  var storyIndex = 0;
  var storyTimer;

  /* Sticky header */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navToggle.setAttribute('aria-label', open ? '메뉴 열기' : '메뉴 닫기');
      siteNav.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', '메뉴 열기');
        siteNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Category panels */
  function openCategory(id) {
    categoryCards.forEach(function (card) {
      var active = card.dataset.category === id;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-expanded', String(active));
    });

    categoryPanels.forEach(function (panel) {
      var show = panel.dataset.panel === id;
      panel.hidden = !show;
    });
  }

  categoryCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var id = card.dataset.category;
      var isActive = card.classList.contains('is-active');
      if (isActive) {
        card.classList.remove('is-active');
        card.setAttribute('aria-expanded', 'false');
        categoryPanels.forEach(function (panel) {
          if (panel.dataset.panel === id) panel.hidden = true;
        });
      } else {
        openCategory(id);
      }
    });
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      var id = chip.dataset.category;
      if (!id) return;

      setTimeout(function () {
        var target = document.querySelector('[data-category="' + id + '"]');
        if (target) {
          target.classList.add('is-highlight');
          openCategory(id);
          setTimeout(function () {
            target.classList.remove('is-highlight');
          }, 1200);
        }
      }, 400);
    });
  });

  /* Story carousel */
  function getStories() {
    return storyTrack ? storyTrack.querySelectorAll('.story-card') : [];
  }

  function getDots() {
    return storyDots ? storyDots.querySelectorAll('button') : [];
  }

  function goToStory(index) {
    var stories = getStories();
    var dots = getDots();
    if (!stories.length) return;

    storyIndex = (index + stories.length) % stories.length;

    stories.forEach(function (card, i) {
      card.classList.toggle('is-active', i === storyIndex);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === storyIndex);
      dot.setAttribute('aria-selected', String(i === storyIndex));
    });
  }

  function startStoryAuto() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(storyTimer);
    storyTimer = setInterval(function () {
      goToStory(storyIndex + 1);
    }, 6000);
  }

  getDots().forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToStory(i);
      startStoryAuto();
    });
  });

  if (getStories().length) {
    goToStory(0);
    startStoryAuto();
  }

  /* Search placeholder rotation */
  if (searchInput && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () {
      if (document.activeElement === searchInput) return;
      placeholderIndex = (placeholderIndex + 1) % placeholders.length;
      searchInput.placeholder = placeholders[placeholderIndex];
    }, 4000);
  }
})();
