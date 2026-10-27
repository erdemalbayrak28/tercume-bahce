/**
 * NAZAY TERCÜME — Corporate Website JavaScript
 * Handles: Google Analytics bootstrap, sticky header, mobile nav,
 *          scroll animations, scroll spy, SSS akordiyonu, teklif formu,
 *          mobil alt çubuk, dönüşüm takibi
 *
 * Ayarlar config.js içindedir. Bu dosyada sabit kimlik/adres tutulmaz.
 */

'use strict';

const NAZAY = window.NAZAY_CONFIG || {};

/** Kullanıcı işletim sisteminde animasyonları kapatmış mı? */
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ============================================================
   0. Google Analytics 4 — config.js'teki kimlikle açılır
   ------------------------------------------------------------
   gaMeasurementId boşsa hiçbir istek gönderilmez, hata oluşmaz.
   ============================================================ */
function initAnalytics() {
  const id = (NAZAY.gaMeasurementId || '').trim();
  if (!/^G-[A-Z0-9]{6,}$/i.test(id)) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, {
    anonymize_ip: true,
    page_language: document.documentElement.lang || 'tr'
  });
}


/* ============================================================
   1. Sticky Header & Scroll Effects
   ============================================================ */
const header = document.getElementById('site-header');

let ticking = false;

function handleScroll() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  ticking = false;
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

function setNavOpen(isOpen) {
  if (!navLinks || !mobileToggle) return;
  navLinks.classList.toggle('open', isOpen);
  mobileToggle.classList.toggle('open', isOpen);
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
}

mobileToggle?.addEventListener('click', () => {
  setNavOpen(!navLinks.classList.contains('open'));
});

navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => setNavOpen(false));
});

document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !mobileToggle.contains(e.target)) {
    setNavOpen(false);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
    setNavOpen(false);
    mobileToggle?.focus();
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

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
});


/* ============================================================
   4. Scroll Reveal Animations
   ------------------------------------------------------------
   Hareket azaltma tercihi varsa hiç başlatılmaz; içerik baştan görünür.
   ============================================================ */
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  const elements = document.querySelectorAll(
    '.service-card, .review-card, .process-step, .contact-card, ' +
    '.highlight-row, .mini-card, .about-visual-main, .about-content, ' +
    '.section-header, .doctype-card, .faq-item, .ref-item, ' +
    '.quote-form, .quote-estimate'
  );

  elements.forEach(el => el.setAttribute('data-animate', ''));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => entry.target.classList.add('animated'), delay);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => {
    if (!el.dataset.delay) {
      const siblings = [...(el.parentElement?.children || [])];
      const idx = siblings.indexOf(el);
      if (idx > 0) el.dataset.delay = String(idx * 80);
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
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active-nav', link.getAttribute('href') === `#${id}`);
      });
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => spyObserver.observe(section));
}


/* ============================================================
   6. Floating WhatsApp Button — show after a short delay
   ============================================================ */
function initFloatingButton() {
  const floatingBtn = document.getElementById('floating-whatsapp');
  if (!floatingBtn) return;

  if (prefersReducedMotion) {
    floatingBtn.classList.remove('is-hidden');
    return;
  }

  floatingBtn.classList.add('is-hidden');
  setTimeout(() => floatingBtn.classList.remove('is-hidden'), 1200);
}


/* ============================================================
   7. Stats Counter Animation
   ------------------------------------------------------------
   data-static taşıyan rakamlar (ör. 4.5/5 Google puanı) sayılmaz;
   ondalıklı değerler sayaçla bozulur.
   ============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number:not([data-static])');
  if (!counters.length || prefersReducedMotion) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el       = entry.target;
      const numMatch = (el.textContent || '').match(/\d+/);
      if (!numMatch) return;

      const target   = parseInt(numMatch[0], 10);
      const span     = el.querySelector('span');
      const spanHTML = span ? span.outerHTML : '';

      let current    = 0;
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
   8. Dönüşüm Takibi
   ------------------------------------------------------------
   data-track="olay_adi" taşıyan her bağlantının tıklanması
   Google Analytics'e olay olarak gönderilir. Kimlik tanımlı
   değilse sessizce geçer.
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
        link_text: (el.textContent || '').trim().slice(0, 60),
        page_language: document.documentElement.lang || 'tr'
      });
    });
  });
}


/* ============================================================
   9. SSS Akordiyonu
   ============================================================ */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item, index) => {
    const question = item.querySelector('.faq-q');
    const answer   = item.querySelector('.faq-a');
    if (!question || !answer) return;

    // Ekran okuyucu soruyu cevabıyla eşleştirebilsin
    const answerId = answer.id || `faq-a-${index + 1}`;
    answer.id = answerId;
    question.setAttribute('aria-controls', answerId);

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Aynı anda tek soru açık kalsın
      items.forEach(other => {
        if (other === item) return;
        other.classList.remove('open');
        other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
        const oa = other.querySelector('.faq-a');
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
   10. Teklif Formu
   ------------------------------------------------------------
   İki çalışma kipi vardır:
   a) config.js içinde formEndpoint doluysa → talep JSON olarak
      sunucuya POST edilir (functions/api.js). Talep veritabanına
      yazılır ve e-posta ile bildirilir; mesai dışı gelen istek
      kaybolmaz. Belgeler ek olarak aynı istekte taşınır.
   b) formEndpoint boşsa → hazırlanmış WhatsApp mesajına düşer.
      Bağlantının href'i form doldukça güncellendiği için tıklama
      normal bir bağlantı tıklamasıdır; açılır pencere engelleyici
      devreye girmez.
   ============================================================ */

const MAKS_GORSEL_KENAR = 2200;   // taranmış belge için fazlasıyla yeterli
const JPEG_KALITE       = 0.82;

/** Blob/File → base64 (veri öneki olmadan) */
function base64Oku(blob) {
  return new Promise((cozumle, reddet) => {
    const okuyucu = new FileReader();
    okuyucu.onerror = () => reddet(new Error('Dosya okunamadı'));
    okuyucu.onload = () => {
      const sonuc = String(okuyucu.result || '');
      cozumle(sonuc.slice(sonuc.indexOf(',') + 1));
    };
    okuyucu.readAsDataURL(blob);
  });
}

/**
 * Telefon kamerasından gelen 4-8 MB'lık fotoğrafı okunabilirliği
 * bozmadan küçültür. PDF ve küçük dosyalar olduğu gibi geçer.
 */
async function gorselKucult(file) {
  if (!file.type.startsWith('image/')) return { blob: file, type: file.type, name: file.name };

  try {
    const bitmap = await createImageBitmap(file);
    const olcek  = Math.min(1, MAKS_GORSEL_KENAR / Math.max(bitmap.width, bitmap.height));

    if (olcek === 1 && file.size < 1.5 * 1024 * 1024) {
      bitmap.close?.();
      return { blob: file, type: file.type, name: file.name };
    }

    const tuval = document.createElement('canvas');
    tuval.width  = Math.round(bitmap.width * olcek);
    tuval.height = Math.round(bitmap.height * olcek);
    tuval.getContext('2d').drawImage(bitmap, 0, 0, tuval.width, tuval.height);
    bitmap.close?.();

    const blob = await new Promise(r => tuval.toBlob(r, 'image/jpeg', JPEG_KALITE));
    if (!blob || blob.size >= file.size) return { blob: file, type: file.type, name: file.name };

    return {
      blob,
      type: 'image/jpeg',
      name: file.name.replace(/\.[^.]+$/, '') + '.jpg'
    };
  } catch {
    // createImageBitmap desteklenmiyorsa özgün dosya gönderilir
    return { blob: file, type: file.type, name: file.name };
  }
}
function formVerisi(form) {
  return {
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
}

function talepSatirlari(data) {
  const satirlar = [
    `Belge: ${data.docType}`,
    `Dil: ${data.sourceLang} → ${data.targetLang}`,
    `Sayfa: ${data.pageCount}`,
    `Teslim: ${data.urgency}`,
    `Noter onayı: ${data.notarized}`,
    `Ad Soyad: ${data.clientName || '-'}`,
    `Telefon: ${data.clientPhone || '-'}`
  ];
  if (data.clientEmail) satirlar.push(`E-posta: ${data.clientEmail}`);
  if (data.clientNotes) satirlar.push(`Not: ${data.clientNotes}`);
  return satirlar;
}

function whatsappBaglantisi(data) {
  const numara = NAZAY.whatsappNumber || '905436439897';
  const metin  = ['Merhaba, teklif talebim:', ...talepSatirlari(data)].join('\n');
  return `https://wa.me/${numara}?text=${encodeURIComponent(metin)}`;
}

function epostaBaglantisi(data) {
  const adres  = NAZAY.contactEmail || 'nazayistanbul@gmail.com';
  const konu   = 'Tercüme Teklifi Talebi';
  const govde  = ['Merhaba,', '', ...talepSatirlari(data), '', 'Belgemin fotoğrafını bu e-postaya ekliyorum.'].join('\n');
  return `mailto:${adres}?subject=${encodeURIComponent(konu)}&body=${encodeURIComponent(govde)}`;
}

function initQuoteForm() {
  const form     = document.getElementById('quote-form');
  const status   = document.getElementById('qf-status');
  const submit   = document.getElementById('qf-submit');
  const consent  = document.getElementById('qf-consent');
  const waLink   = document.getElementById('qf-wa-link');
  const mailLink = document.getElementById('qf-mail-link');
  const fileWrap = document.getElementById('qf-file-wrap');
  const fileIn   = document.getElementById('qf-file');
  if (!form || !status || !submit) return;

  const endpoint = (NAZAY.formEndpoint || '').trim();

  // Belge yükleme yalnızca sunucu uç noktası varsa anlamlıdır
  if (fileWrap) fileWrap.hidden = !endpoint;

  // Sunucu kipinde buton metni WhatsApp'a değil gönderime işaret eder
  if (endpoint) {
    const label = document.getElementById('qf-submit-label');
    const icon  = document.getElementById('qf-submit-icon');
    if (label) {
      label.setAttribute('data-i18n', 'quote.submitServer');
      label.textContent = (window.NazayLang && NazayLang.t('quote.submitServer')) || 'Teklif Talebi Gönder';
    }
    if (icon) icon.className = 'fa-solid fa-paper-plane';
  }

  function durum(mesaj, tip, ekHtml) {
    status.className = 'qf-status qf-status-' + tip;
    status.innerHTML = mesaj + (ekHtml || '');
  }

  function ceviri(key, yedek) {
    return (window.NazayLang && NazayLang.t(key)) || yedek;
  }

  /** Yedek bağlantıların href'ini canlı tutar. */
  function yedekleriGuncelle() {
    const data = formVerisi(form);
    if (waLink)   waLink.href   = whatsappBaglantisi(data);
    if (mailLink) mailLink.href = epostaBaglantisi(data);
  }

  form.addEventListener('input', yedekleriGuncelle);
  form.addEventListener('change', yedekleriGuncelle);
  yedekleriGuncelle();

  function dogrula(data) {
    if (!data.clientName || !data.clientPhone) {
      durum(ceviri('ui.errRequired', 'Lütfen ad soyad ve telefon alanlarını doldurun.'), 'error');
      (data.clientName ? form.clientPhone : form.clientName).focus();
      return false;
    }
    if (consent && !consent.checked) {
      durum(ceviri('ui.errConsent', 'Devam etmek için KVKK metnini onaylamanız gerekiyor.'), 'error');
      consent.focus();
      return false;
    }
    return true;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = formVerisi(form);
    if (!dogrula(data)) return;

    if (endpoint) {
      gonderSunucuya(data);
    } else {
      // Bağlantıyı kullanıcı hareketi içinde tıklamak, window.open'ın
      // açılır pencere engelleyicisine yakalanma sorununu ortadan kaldırır.
      const waUrl = whatsappBaglantisi(data);
      if (waLink) waLink.href = waUrl;
      const gecici = document.createElement('a');
      gecici.href = waUrl;
      gecici.target = '_blank';
      gecici.rel = 'noopener';
      gecici.click();

      durum(
        ceviri('ui.waOpened', 'WhatsApp açıldı. Hazırlanan mesajı göndermeniz yeterli.'),
        'success',
        ` <a href="${waUrl}" target="_blank" rel="noopener" class="qf-status-link">
            <i class="fa-brands fa-whatsapp"></i> ${ceviri('ui.waOpenAgain', 'Açılmadıysa tıklayın')}
          </a>`
      );
      track('quote_whatsapp', { doc_type: data.docType, urgency: data.urgency });
    }
  });

  async function gonderSunucuya(data) {
    const maksDosya = Number(NAZAY.maxUploadFiles) || 5;
    const maksToplam = (Number(NAZAY.maxUploadMb) || 8) * 1024 * 1024;
    const dosyalar  = fileIn ? [...fileIn.files] : [];

    if (dosyalar.length > maksDosya) {
      durum(ceviri('ui.errFileCount', 'En fazla 5 dosya yükleyebilirsiniz.'), 'error');
      return;
    }

    submit.disabled = true;
    durum(ceviri('ui.sending', 'Gönderiliyor...'), 'pending');

    let ekler = [];
    try {
      const hazir = await Promise.all(dosyalar.map(gorselKucult));
      const toplam = hazir.reduce((t, d) => t + d.blob.size, 0);

      if (toplam > maksToplam) {
        durum(ceviri('ui.errFileSize', 'Belgelerin toplam boyutu çok büyük.'), 'error');
        submit.disabled = false;
        return;
      }

      ekler = await Promise.all(hazir.map(async d => ({
        name: d.name,
        type: d.type,
        dataBase64: await base64Oku(d.blob)
      })));
    } catch {
      durum(ceviri('ui.errFileRead', 'Belgeler okunamadı. Lütfen WhatsApp üzerinden gönderin.'), 'error');
      submit.disabled = false;
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          pageLanguage: document.documentElement.lang || 'tr',
          documents: ekler
        })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      form.reset();
      yedekleriGuncelle();
      durum(ceviri('ui.success', 'Talebiniz alındı. En kısa sürede size dönüş yapacağız.'), 'success');
      track('quote_submit', { doc_type: data.docType, urgency: data.urgency, files: ekler.length });
    } catch (err) {
      // Sunucu ulaşılamazsa talep kaybolmasın; kullanıcı WhatsApp'a yönlendirilir.
      const waUrl = whatsappBaglantisi(data);
      durum(
        ceviri('ui.error', 'Gönderilemedi. Lütfen WhatsApp veya telefon üzerinden bize ulaşın.'),
        'error',
        ` <a href="${waUrl}" target="_blank" rel="noopener" class="qf-status-link">
            <i class="fa-brands fa-whatsapp"></i> ${ceviri('quote.waFallback', "WhatsApp'ta aç")}
          </a>`
      );
      track('quote_submit_failed', { reason: String(err && err.message || err).slice(0, 60) });
    } finally {
      submit.disabled = false;
    }
  }

  // Dil değişirse yedek bağlantı metinleri yenilendiği için href'ler korunur
  document.addEventListener('nazay:langchange', yedekleriGuncelle);
}


/* ============================================================
   11. Mobil Alt Çubuk
   ============================================================ */
function initMobileBar() {
  const bar  = document.getElementById('mobile-bar');
  const hero = document.getElementById('hero');
  if (!bar || !hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => bar.classList.toggle('visible', !entry.isIntersecting));
  }, { threshold: 0, rootMargin: '-120px 0px 0px 0px' });

  observer.observe(hero);
}


/* ============================================================
   12. Footer Yılı
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = String(new Date().getFullYear());
}


/* ============================================================
   13. Init
   ============================================================ */
initAnalytics();

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initScrollSpy();
  initFloatingButton();
  animateCounters();
  initTracking();
  initFaq();
  initQuoteForm();
  initMobileBar();
  initFooterYear();
  handleScroll();
});
