/* Harmonized Care Holdings — Simple SPA logic */

(function () {
  'use strict';

  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var allNavLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  // Navbar scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active nav highlight
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 200;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact form
  var contactForm = document.getElementById('contactForm');
  window.handleSubmit = function (e) {
    e.preventDefault();
    var btn = document.getElementById('submitBtn');
    var original = btn.textContent;
    btn.textContent = 'SENDING...';
    btn.disabled = true;
    btn.style.opacity = '0.6';

    setTimeout(function () {
      btn.textContent = '✓ SENT';
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.opacity = '1';
        contactForm.reset();
      }, 2000);
    }, 1000);
  };

})();
