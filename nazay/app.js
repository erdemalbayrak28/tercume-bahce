/**
 * NAZAY TERCÜME — Corporate Website JavaScript
 * Handles: Sticky header, mobile nav, scroll animations, active nav link,
 *          SSS akordiyonu, teklif formu, mobil alt çubuk, dönüşüm takibi
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
    '.section-header, .doctype-card, .faq-item, .ref-item, ' +
    '.quote-form, .quote-estimate'
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
   9. Dönüşüm Takibi
   ------------------------------------------------------------
   data-track="olay_adi" taşıyan her bağlantının tıklanması
   Google Analytics'e olay olarak gönderilir. GA kurulu değilse
   (index.html'deki snippet yorum satırındaysa) sessizce geçer.
   ============================================================ */
function track(eventName, params) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params || {});
  }
}

function initTracking() {
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
      track(el.getAttribute('data-track'), {
        link_text: (el.textContent || '').trim().slice(0, 60)
      });
    });
  });
}


/* ============================================================
   10. SSS Akordiyonu
   ============================================================ */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer   = item.querySelector('.faq-a');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Aynı anda tek soru açık kalsın
      items.forEach(other => {
        if (other === item) return;
        other.classList.remove('open');
        const oq = other.querySelector('.faq-q');
        const oa = other.querySelector('.faq-a');
        if (oq) oq.setAttribute('aria-expanded', 'false');
        if (oa) oa.style.maxHeight = null;
      });

      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';

      if (!isOpen) track('faq_open', { question: (question.textContent || '').trim().slice(0, 80) });
    });
  });

  // Dil değişince açık cevabın yüksekliği yeniden hesaplansın
  document.addEventListener('nazay:langchange', () => {
    items.forEach(item => {
      const answer = item.querySelector('.faq-a');
      if (item.classList.contains('open') && answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}


/* ============================================================
   11. Teklif Formu Gönderimi
   ============================================================ */
function whatsappYedegi(data) {
  const satirlar = [
    'Merhaba, teklif talebim:',
    `Belge: ${data.docType}`,
    `Dil: ${data.sourceLang} → ${data.targetLang}`,
    `Sayfa: ${data.pageCount}`,
    `Teslim: ${data.urgency}`,
    `Noter onayı: ${data.notarized}`,
    `Ad Soyad: ${data.clientName}`,
    `Telefon: ${data.clientPhone}`
  ];
  if (data.clientEmail) satirlar.push(`E-posta: ${data.clientEmail}`);
  if (data.clientNotes) satirlar.push(`Not: ${data.clientNotes}`);

  return 'https://wa.me/905436439897?text=' + encodeURIComponent(satirlar.join('\n'));
}

function initQuoteForm() {
  const form    = document.getElementById('quote-form');
  const status  = document.getElementById('qf-status');
  const submit  = document.getElementById('qf-submit');
  const consent = document.getElementById('qf-consent');
  if (!form || !status || !submit) return;

  function durum(mesaj, tip, ekHtml) {
    status.className = 'qf-status qf-status-' + tip;
    status.innerHTML = mesaj + (ekHtml || '');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      docType:     form.docType.value,
      sourceLang:  form.sourceLang.value,
      targetLang:  form.targetLang.value,
      pageCount:   form.pageCount.value,
      urgency:     form.urgency.options[form.urgency.selectedIndex].text,
      notarized:   form.notarized.checked ? 'Evet' : 'Hayır',
      clientName:  form.clientName.value.trim(),
      clientPhone: form.clientPhone.value.trim(),
      clientEmail: form.clientEmail.value.trim(),
      clientNotes: form.clientNotes.value.trim()
    };

    if (!data.clientName || !data.clientPhone) {
      durum(NazayLang.t('ui.errRequired') || 'Lütfen ad soyad ve telefon alanlarını doldurun.', 'error');
      return;
    }
    if (consent && !consent.checked) {
      durum(NazayLang.t('ui.errConsent') || 'Devam etmek için KVKK metnini onaylamanız gerekiyor.', 'error');
      return;
    }

    // Talep doğrudan WhatsApp mesajı olarak hazırlanır (sunucu/e-posta kullanılmaz).
    // window.open, tıklama anında çağrılmalı; araya await girerse tarayıcı açılır pencereyi engeller.
    const waUrl = whatsappYedegi(data);
    window.open(waUrl, '_blank', 'noopener');
    durum(
      NazayLang.t('ui.waOpened') || 'WhatsApp açıldı. Hazırlanan mesajı göndermeniz yeterli.',
      'success',
      ` <a href="${waUrl}" target="_blank" rel="noopener" class="qf-status-link">
          <i class="fa-brands fa-whatsapp"></i> ${NazayLang.t('ui.waOpenAgain') || 'Açılmadıysa tıklayın'}
        </a>`
    );
    track('quote_whatsapp', { doc_type: data.docType, urgency: data.urgency });
  });
}


/* ============================================================
   12. Mobil Alt Çubuk
   ------------------------------------------------------------
   Hero geçildikten sonra görünür; yüzen WhatsApp butonu
   mobilde CSS ile gizlenir (çakışmasın diye).
   ============================================================ */
function initMobileBar() {
  const bar = document.getElementById('mobile-bar');
  const heroSection = document.getElementById('hero');
  if (!bar || !heroSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      bar.classList.toggle('visible', !entry.isIntersecting);
    });
  }, { threshold: 0, rootMargin: '-120px 0px 0px 0px' });

  observer.observe(heroSection);
}


/* ============================================================
   13. Footer Yılı
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = String(new Date().getFullYear());
}


/* ============================================================
   14. Init on DOM Ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initScrollSpy();
  initFloatingButton();
  animateCounters();
  injectActiveNavStyle();
  initTracking();
  initFaq();
  initQuoteForm();
  initMobileBar();
  initFooterYear();
  handleScroll(); // run once on load
});
