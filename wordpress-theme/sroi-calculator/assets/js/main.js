/**
 * SROI Calculator Theme — Main JS
 */
(function () {
  'use strict';

  // Intersection Observer for fade-in animations on scroll
  document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.section, .sroi-ratio');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }

    // Smooth scroll for anchor links (fallback for older browsers)
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
})();
