/**
 * NAZAY TERCÜME — Corporate Website JavaScript
 * Handles: Sticky header, mobile nav, scroll animations, active nav link
 */

'use strict';

/* ============================================================
   1. Sticky Header & Scroll Effects
   ============================================================ */
const header    = document.getElementById('site-header');
const topBar    = document.getElementById('top-bar');

let lastScrollY = 0;
let ticking     = false;

function handleScroll() {
  const scrollY = window.scrollY;

  // Scrolled shadow on header
  if (scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScrollY = scrollY;
  ticking     = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });


/* ============================================================
   2. Mobile Navigation Toggle
   ============================================================ */
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks     = document.getElementById('nav-links');

mobileToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  mobileToggle.classList.toggle('open', isOpen);
  mobileToggle.setAttribute('aria-expanded', isOpen.toString());
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when a link is clicked
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !mobileToggle.contains(e.target)) {
    navLinks.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});


/* ============================================================
   3. Smooth Scroll for Anchor Links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = header?.offsetHeight || 0;
    const targetTop    = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


/* ============================================================
   4. Scroll Reveal Animations
   ============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.service-card, .review-card, .process-step, .contact-card, ' +
    '.highlight-row, .mini-card, .about-visual-main, .about-content, ' +
    '.section-header'
  );

  elements.forEach(el => {
    el.setAttribute('data-animate', '');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el, index) => {
    // Auto-stagger sibling cards
    if (!el.dataset.delay) {
      const siblings = [...(el.parentElement?.children || [])];
      const idx = siblings.indexOf(el);
      if (idx > 0) {
        el.dataset.delay = String(idx * 80);
      }
    }
    observer.observe(el);
  });
}


/* ============================================================
   5. Active Navigation Highlighting (Scroll Spy)
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  if (!sections.length || !navItems.length) return;

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.classList.toggle(
            'active-nav',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => spyObserver.observe(section));
}


/* ============================================================
   6. Floating WhatsApp Button — show after scroll
   ============================================================ */
function initFloatingButton() {
  const floatingBtn = document.getElementById('floating-whatsapp');
  if (!floatingBtn) return;

  // Initially slightly below viewport, animate in
  floatingBtn.style.opacity = '0';
  floatingBtn.style.transform = 'scale(0.7) translateY(10px)';
  floatingBtn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  setTimeout(() => {
    floatingBtn.style.opacity  = '1';
    floatingBtn.style.transform = 'scale(1) translateY(0)';
  }, 1500);
}


/* ============================================================
   7. Stats Counter Animation (Hero section)
   ============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const text = el.textContent || '';
      const numMatch = text.match(/\d+/);
      if (!numMatch) return;

      const target = parseInt(numMatch[0], 10);
      const suffix  = el.innerHTML.replace(numMatch[0], '').replace(/<span>/, '').replace(/<\/span>/, '');
      const span    = el.querySelector('span');
      const spanHTML = span ? span.outerHTML : '';

      let current = 0;
      const duration = 1500;
      const step     = Math.ceil(target / (duration / 16));

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.innerHTML = `${current}${spanHTML}`;
        if (current >= target) clearInterval(timer);
      }, 16);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}


/* ============================================================
   8. Add active-nav CSS style dynamically
   ============================================================ */
function injectActiveNavStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active-nav {
      color: var(--blue) !important;
      background: rgba(30, 77, 161, 0.06);
    }
    .nav-link.active-nav::after {
      transform: translateX(-50%) scaleX(1) !important;
    }
  `;
  document.head.appendChild(style);
}


/* ============================================================
   9. Init on DOM Ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initScrollSpy();
  initFloatingButton();
  animateCounters();
  injectActiveNavStyle();
  handleScroll(); // run once on load
});
