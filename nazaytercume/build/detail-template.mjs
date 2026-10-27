/**
 * Alt sayfa şablonu (hizmet ve belge sayfaları).
 *
 * Head, üst menü, sayfa başlığı, kenar sütunu, alt bilgi ve betikler
 * burada tek bir yerde durur. İçerik build/content/*.mjs dosyalarından
 * gelir. Böylece font yükleme veya menü değişikliği on sayfada değil
 * tek dosyada yapılır.
 */

const SITE  = 'https://nazay.com.tr/nazaytercume';
const TEL   = '+905436439897';
const TEL_G = '0543 643 98 97';
const WA    = '905436439897';
const HARITA = 'https://www.google.com/maps/dir/?api=1&destination=Murat+Reis+Mah.+Yeni+Ocak+Sk.+No:39+34664+%C3%9Csk%C3%BCdar+%C4%B0stanbul';

const FA_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
const FA_SRI = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
const SURUM  = '20261027b';

const KACIS = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const kacir = (s) => String(s).replace(/[&<>"]/g, (c) => KACIS[c]);
const wa = (metin) => `https://wa.me/${WA}?text=${encodeURIComponent(metin)}`;

/** Görünen akordiyon — JSON-LD ile aynı kaynaktan üretilir. */
function sssGorunum(faq) {
  if (!faq.length) return '';
  return `
        <h2>Sıkça sorulanlar</h2>
        <div class="faq-list">
${faq.map((s) => `          <div class="faq-item">
            <button class="faq-q" aria-expanded="false">
              <span>${kacir(s.q)}</span>
              <i class="fa-solid fa-plus faq-icon" aria-hidden="true"></i>
            </button>
            <div class="faq-a">
              <p>${s.a}</p>
            </div>
          </div>`).join('\n')}
        </div>
`;
}

function sssYapisalVeri(faq) {
  if (!faq.length) return '';
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((s) => ({
      '@type': 'Question',
      name: s.q,
      // Yapısal veri görünen metinle birebir aynı olmalı; etiketler sökülür.
      acceptedAnswer: { '@type': 'Answer', text: s.a.replace(/<[^>]+>/g, '') }
    }))
  }, null, 2);
  return `\n  <script type="application/ld+json">\n${json}\n  </script>\n`;
}

function ilgiliKartlar(related) {
  if (!related.length) return '';
  return `
        <h2>İlgili hizmetler</h2>
        <div class="related-grid">
${related.map((k) => `          <a href="${k.href}" class="related-card">
            <i class="fa-solid ${k.icon}" aria-hidden="true"></i>
            <span>${k.label}</span>
          </a>`).join('\n')}
        </div>
`;
}

export function sayfaOlustur(sayfa) {
  const url = `${SITE}/hizmetler/${sayfa.slug}.html`;

  return `<!DOCTYPE html>
<!--
  BU DOSYA ÜRETİLMİŞTİR — ELLE DÜZENLEMEYİN.
  İçerik: build/content/${sayfa.slug}.mjs
  Şablon: build/detail-template.mjs
  Yeniden üretmek için: node build/build-detail-pages.mjs
-->
<html lang="tr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${kacir(sayfa.metaTitle)}</title>
  <meta name="description" content="${kacir(sayfa.metaDescription)}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#CC0000">
  <link rel="canonical" href="${url}">

  <meta property="og:site_name" content="Nazay Tercüme">
  <meta property="og:title" content="${kacir(sayfa.ogTitle || sayfa.metaTitle)}">
  <meta property="og:description" content="${kacir(sayfa.metaDescription)}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}/assets/images/og-nazay-tercume.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Nazay Yeminli Tercüme Dil Hizmetleri">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${kacir(sayfa.ogTitle || sayfa.metaTitle)}">
  <meta name="twitter:description" content="${kacir(sayfa.metaDescription)}">
  <meta name="twitter:image" content="${SITE}/assets/images/og-nazay-tercume.jpg">

  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
  <link rel="apple-touch-icon" href="../assets/images/nazay-tercume-logo-kare.jpg">

  <script src="../config.js?v=${SURUM}"></script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../styles.css?v=${SURUM}">

  <!-- Font Awesome render engellemesin diye geç yüklenir -->
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
  <link rel="stylesheet" href="${FA_CDN}" integrity="${FA_SRI}" crossorigin="anonymous"
    referrerpolicy="no-referrer" media="print" onload="this.media='all'">
  <noscript>
    <link rel="stylesheet" href="${FA_CDN}" integrity="${FA_SRI}" crossorigin="anonymous"
      referrerpolicy="no-referrer">
  </noscript>

  <script type="application/ld+json">
${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: sayfa.service.type,
    name: sayfa.service.name,
    description: sayfa.service.description,
    url,
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://nazay.com.tr/#organization',
      name: 'Nazay Yeminli Tercüme Dil Hizmetleri Ltd. Şti.',
      telephone: TEL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Murat Reis Mah. Yeni Ocak Sk. No:39',
        addressLocality: 'Üsküdar',
        addressRegion: 'İstanbul',
        postalCode: '34664',
        addressCountry: 'TR'
      }
    },
    areaServed: { '@type': 'City', name: 'İstanbul' },
    availableLanguage: ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'Arapça', 'Rusça']
  }, null, 2)}
  </script>

  <script type="application/ld+json">
${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${SITE}/#hizmetlerimiz` },
      { '@type': 'ListItem', position: 3, name: sayfa.breadcrumb }
    ]
  }, null, 2)}
  </script>
${sssYapisalVeri(sayfa.faq || [])}</head>

<body>

  <a href="#icerik" class="skip-link">İçeriğe geç</a>

  <header class="site-header scrolled" id="site-header">
    <div class="container nav-container">
      <a href="../index.html" class="logo" aria-label="Nazay Tercüme Ana Sayfa">
        <picture>
          <source srcset="../assets/images/nazay-tercume-logo.webp" type="image/webp">
          <img src="../assets/images/nazay-tercume-logo.png" alt="Nazay Yeminli Tercüme Logo" class="logo-img"
            width="481" height="440" fetchpriority="high" decoding="async">
        </picture>
      </a>
      <nav aria-label="Ana Menü">
        <ul class="nav-links" id="nav-links">
          <li><a href="../index.html#hakkimizda" class="nav-link">Hakkımızda</a></li>
          <li><a href="../index.html#hizmetlerimiz" class="nav-link">Hizmetler</a></li>
          <li><a href="../index.html#belgeler" class="nav-link">Belgeler</a></li>
          <li><a href="../index.html#sss" class="nav-link">S.S.S.</a></li>
          <li><a href="../index.html#iletisim" class="nav-link">İletişim</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <a href="../index.html#teklif" class="btn btn-primary header-quote" data-track="quote_header">
          <i class="fa-solid fa-file-signature" aria-hidden="true"></i> <span>Teklif Al</span>
        </a>
        <a href="${wa(sayfa.waText)}" target="_blank" rel="noopener" class="btn btn-whatsapp"
          data-track="whatsapp_header">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
        </a>
        <button class="mobile-toggle" id="mobile-toggle" aria-label="Menüyü Aç/Kapat" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Sayfa yolu">
        <a href="../index.html">Ana Sayfa</a>
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
        <a href="../index.html#hizmetlerimiz">Hizmetler</a>
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
        <span>${kacir(sayfa.breadcrumb)}</span>
      </nav>
      <h1>${kacir(sayfa.h1)}</h1>
      <p>${sayfa.heroSub}</p>
    </div>
  </section>

  <main class="article-section" id="icerik">
    <div class="container article-layout">

      <article class="article-content">

        <p class="legal-intro">
          ${sayfa.intro}
        </p>
${sayfa.body}${sssGorunum(sayfa.faq || [])}${ilgiliKartlar(sayfa.related || [])}
      </article>

      <aside class="article-sidebar">
        <div class="side-cta">
          <h3>${kacir(sayfa.sidebar.title)}</h3>
          <p>${sayfa.sidebar.desc}</p>
          <a href="${wa(sayfa.sidebar.waText || sayfa.waText)}" target="_blank" rel="noopener"
            class="btn btn-whatsapp" data-track="whatsapp_sidebar">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp'tan Gönder
          </a>
          <a href="tel:${TEL}" class="btn btn-primary" data-track="phone_sidebar">
            <i class="fa-solid fa-phone" aria-hidden="true"></i> ${TEL_G}
          </a>
          <a href="../index.html#teklif" class="side-link">
            <i class="fa-solid fa-file-invoice" aria-hidden="true"></i> Teklif formunu doldur
          </a>
        </div>

        <div class="side-info">
          <h4>Özet Bilgi</h4>
          <ul>
${sayfa.sidebar.summary.map((s) => `            <li><i class="fa-solid ${s.icon}" aria-hidden="true"></i><span><strong>${kacir(s.label)}:</strong> ${kacir(s.value)}</span></li>`).join('\n')}
          </ul>
        </div>
      </aside>

    </div>
  </main>

  <footer class="site-footer">
    <div class="footer-top">
      <div class="container footer-grid">

        <div class="footer-brand">
          <div class="footer-logo-row">
            <picture>
              <source srcset="../assets/images/nazay-tercume-logo.webp" type="image/webp">
              <img src="../assets/images/nazay-tercume-logo.png" alt="Nazay Yeminli Tercüme Logo"
                class="footer-logo-img" width="481" height="440" loading="lazy" decoding="async">
            </picture>
          </div>
          <p class="footer-desc">
            Tüm dünya dillerinde noter, apostil ve konsolosluk işlemleri için profesyonel ve yeminli tercüme
            hizmetleri.
          </p>
          <div class="footer-social">
            <a href="https://www.instagram.com/nazaytercume/" target="_blank" rel="noopener" class="social-btn"
              aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="mailto:nazayistanbul@gmail.com" class="social-btn" aria-label="E-posta"><i
                class="fa-solid fa-envelope" aria-hidden="true"></i></a>
            <a href="https://wa.me/${WA}" target="_blank" rel="noopener" class="social-btn social-wa"
              aria-label="WhatsApp" data-track="whatsapp_footer"><i class="fa-brands fa-whatsapp"
                aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Hizmetlerimiz</h4>
          <ul class="footer-links">
            <li><a href="noter-onayli-tercume.html">Noter Onaylı Yeminli Tercüme</a></li>
            <li><a href="apostil-konsolosluk-onayi.html">Apostil ve Konsolosluk İşlemleri</a></li>
            <li><a href="diploma-cevirisi.html">Diploma &amp; Transkript Çevirisi</a></li>
            <li><a href="pasaport-cevirisi.html">Pasaport &amp; Kimlik Çevirisi</a></li>
            <li><a href="vekaletname-cevirisi.html">Vekaletname &amp; Sözleşme Çevirisi</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Belge Çevirileri</h4>
          <ul class="footer-links">
            <li><a href="dogum-belgesi-cevirisi.html">Doğum Belgesi Çevirisi</a></li>
            <li><a href="evlilik-cuzdani-cevirisi.html">Evlilik Cüzdanı Çevirisi</a></li>
            <li><a href="sabika-kaydi-cevirisi.html">Sabıka Kaydı Çevirisi</a></li>
            <li><a href="uskudar-yeminli-tercume.html">Üsküdar Yeminli Tercüme</a></li>
            <li><a href="../kvkk.html">KVKK &amp; Gizlilik Politikası</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">İletişim</h4>
          <ul class="footer-contact-list">
            <li><i class="fa-solid fa-phone" aria-hidden="true"></i><a href="tel:${TEL}">${TEL_G}</a></li>
            <li><i class="fa-solid fa-envelope" aria-hidden="true"></i><a
                href="mailto:nazayistanbul@gmail.com">nazayistanbul@gmail.com</a></li>
            <li><i class="fa-solid fa-clock" aria-hidden="true"></i><span>Pzt – Cmt: 09:00 – 21:00</span></li>
            <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>Murat Reis, Yeni Ocak Sk. No:39,<br>34664
                Üsküdar/İstanbul</span></li>
          </ul>
        </div>

      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; <span id="footer-year">2026</span> NAZAY TERCÜME DİL HİZMETLERİ LTD.ŞTİ. Tüm Hakları Saklıdır.</p>
        <p>Yeminli Tercüme Bürosu – Üsküdar / İstanbul</p>
      </div>
    </div>
  </footer>

  <nav class="mobile-bar visible" id="mobile-bar" aria-label="Hızlı İletişim">
    <a href="tel:${TEL}" class="mb-item" data-track="phone_mobilebar">
      <i class="fa-solid fa-phone" aria-hidden="true"></i><span>Ara</span>
    </a>
    <a href="${wa(sayfa.waText)}" target="_blank" rel="noopener" class="mb-item mb-item-wa"
      data-track="whatsapp_mobilebar">
      <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span>
    </a>
    <a href="../index.html#teklif" class="mb-item">
      <i class="fa-solid fa-file-invoice" aria-hidden="true"></i><span>Teklif</span>
    </a>
    <a href="${HARITA}" target="_blank" rel="noopener" class="mb-item" data-track="directions_mobilebar">
      <i class="fa-solid fa-diamond-turn-right" aria-hidden="true"></i><span>Yol Tarifi</span>
    </a>
  </nav>

  <script src="../app.js?v=${SURUM}"></script>
</body>

</html>
`;
}
