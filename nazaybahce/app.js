/**
 * NAZAY BAHÇE - Interactive Web Application Logic
 * Phone Contact: +90 541 610 98 97
 * Instagram: @nazaybahce
 * Location: Muratreis Mah., Üsküdar / İstanbul
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSpaceTabs();
  initGallery();
  initFAQ();
  initInquiryForm();
  initSmoothScroll();
  initSlider();
  initHeroSlider();
});

/* 1. Mobile Drawer Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* 2. Space Tabs (Açık Bahçe / Cam Kış Bahçesi / Gelin Odası) */
function initSpaceTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.space-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* 3. Gallery Filtering & Lightbox Modal */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox click handler
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Nazay Bahçe';
        lightbox.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
}

/* 4. FAQ Accordion Toggle */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all active items
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 5. Direct WhatsApp Inquiry Message Generator (No Price Estimate) */
function initInquiryForm() {
  const inquiryForm = document.getElementById('inquiryForm');
  const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');

  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const eventType = document.getElementById('eventType')?.value || 'Belirtilmedi';
      const guestCount = document.getElementById('guestCount')?.value || 'Belirtilmedi';
      const cateringPref = document.getElementById('cateringPref')?.value || 'Belirtilmedi';
      const eventDate = document.getElementById('eventDate')?.value || 'Tarih belirlenmedi';
      const clientName = document.getElementById('clientName')?.value || 'Sayın Yetkili';
      const clientPhone = document.getElementById('clientPhone')?.value || '';
      const notes = document.getElementById('clientNotes')?.value || 'Yok';

      // Build structured WhatsApp inquiry text
      const messageText = 
`Merhaba Nazay Bahçe Ekibi 👋

Instagram sayfanız ve web siteniz üzerinden organizasyonumuz için bilgi almak istiyorum:

📌 *Etkinlik Türü:* ${eventType}
👥 *Kişi Sayısı:* ${guestCount}
🍽️ *İkram/Menü Tercihi:* ${cateringPref}
📅 *Tahmini Tarih:* ${eventDate}
👤 *Ad Soyad:* ${clientName}
📞 *İletişim Numarası:* ${clientPhone}
📝 *Ekstra Notlar / İstekler:* ${notes}

Müsaitlik durumunuz ve detaylı bilgi için dönüş yapmanızı rica ederim.`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/905416109897?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    });
  }
}

/* 6. Smooth Scroll for Navigation Anchors */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/* 7. Image Slider */
function initSlider() {
  const sliders = document.querySelectorAll('.custom-slider');
  
  sliders.forEach(slider => {
    const images = slider.querySelectorAll('.slider-images img');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    let currentSlide = 0;

    if (images.length > 0 && prevBtn && nextBtn) {
      function showSlide(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
      }

      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : images.length - 1;
        showSlide(currentSlide);
      });

      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide < images.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
      });
    }
  });
}

/* 8. Hero Background Slideshow */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;
  let currentIndex = 0;
  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 5000);
}
