/**
 * NAZAY TERCÜME — Çoklu Dil Desteği (TR / EN / AR)
 * ------------------------------------------------
 * Kullanım:
 *   HTML'de  data-i18n="anahtar"        → elemanın metnini değiştirir
 *            data-i18n-html="anahtar"   → elemanın iç HTML'ini değiştirir (<br>, <strong> vb. içerenler)
 *            data-i18n-attr="placeholder:anahtar" → belirtilen özniteliği değiştirir
 *
 * Yeni metin eklerken: HTML'e data-i18n ekleyin, sonra aşağıdaki üç sözlüğe de
 * aynı anahtarı ekleyin. Çeviri bulunamazsa Türkçe metin olduğu gibi kalır.
 */

'use strict';

/* I18N_DATA_START — build/build-pages.mjs bu iki işaret arasını okur. Silmeyin. */
const NAZAY_I18N = {

  /* ==========================================================
     TÜRKÇE
     ========================================================== */
  tr: {
    'meta.title': 'Nazay Tercüme | Yeminli Tercüme Dil Hizmetleri Ltd.Şti. – Üsküdar/İstanbul',
    'meta.description': 'Nazay Yeminli Tercüme Dil Hizmetleri; noter, apostil ve konsolosluk işlemleri için tüm dünya dillerinde profesyonel ve hızlı çeviri hizmeti sunmaktadır. Üsküdar/İstanbul.',

    'topbar.hours': 'Pazartesi – Cumartesi: 09:00 – 21:00',
    'topbar.address': 'Murat Reis, Yeni Ocak Sk. No:39, Üsküdar/İstanbul',

    'nav.about': 'Hakkımızda',
    'nav.services': 'Hizmetler',
    'nav.quote': 'Teklif Al',
    'nav.faq': 'S.S.S.',
    'nav.reviews': 'Yorumlar',
    'nav.contact': 'İletişim',

    'hero.badge': 'Yeminli & Noter Onaylı Tercüme Bürosu',
    'hero.title': 'Tüm Dünya Dillerinde<br><span class="gradient-text">Profesyonel ve Yeminli</span><br>Tercüme Hizmetleri',
    'hero.subtitle': 'Noter, apostil ve konsolosluk işlemleriniz için hızlı, güvenilir ve şeffaf çeviri çözümleri.',
    'hero.stat1': 'Dil Çifti',
    'hero.stat2': 'Hızlı Teslimat',
    'hero.stat3': 'Google Puanı',
    'hero.cta1': 'Hemen İletişime Geçin',
    'hero.cta2': 'Ücretsiz Fiyat Teklifi',

    'trust.1': '%100 Güvenli & Gizli',
    'trust.2': 'Hızlı Teslimat',
    'trust.3': 'Noter Onaylı',
    'trust.4': 'Tüm Dünya Dilleri',
    'trust.5': 'Google 4.5/5 Yıldız',

    'about.visualTitle': 'Yeminli Tercüme Bürosu',
    'about.visualDesc': 'Tüm resmi evraklarınız için yasal geçerliliği olan çeviriler',
    'about.mini1': 'Resmi Onaylı',
    'about.mini2': 'Hızlı Teslim',
    'about.mini3': 'Güvenilir',
    'about.v1': 'Noter Onaylı Tercüme',
    'about.v2': 'Apostil İşlemleri',
    'about.v3': 'Konsolosluk Onayları',
    'about.vs3': 'Hizmet Saatleri',
    'about.tag': 'Hakkımızda',
    'about.title': 'Nazay Yeminli Tercüme<br><span class="accent">Dil Hizmetleri</span>',
    'about.p1': 'Nazay Yeminli Tercüme Dil Hizmetleri olarak, her türlü tercüme edilecek evraklarınızın; <strong>noter, apostil ve konsolosluk işlemleri</strong> için hizmet vermekteyiz.',
    'about.p2': 'Teknik şartname, idari evrak ve diğer şahsi belge tercümelerinizde <strong>tüm dünya dillerinde yeminli tercümanlar</strong> ile çalışmaktayız.',
    'about.p3': 'En kısa sürede görüşmeyi ümit eder, çalışmalarınızda başarılar dileriz. <em>Sevgi ve Saygılarımızla.</em>',
    'about.h1t': 'Resmi Evrak Çevirileri',
    'about.h1d': 'Yasal geçerliliği olan noter ve apostil onaylı belgeler',
    'about.h2t': 'Tüm Dünya Dilleri',
    'about.h2d': "50'den fazla dil çiftinde uzman yeminli tercümanlar",
    'about.h3t': '09:00 – 21:00 Hizmet',
    'about.h3d': 'Uzun çalışma saatleriyle her zaman yanınızdayız',
    'about.cta': 'Bizimle İletişime Geçin',

    'services.tag': 'Hizmetlerimiz',
    'services.title': 'Sunduğumuz<br><span class="accent">Tercüme Hizmetleri</span>',
    'services.subtitle': 'Tüm resmi ve özel belgeleriniz için kapsamlı yeminli tercüme çözümleri sunuyoruz.',
    'services.s1t': 'Noter Onaylı Yeminli Tercüme',
    'services.s1d': 'Mahkeme, resmi kurum ve kamu idarelerine sunulmak üzere noter tarafından onaylanan yeminli tercüme hizmetleri.',
    'services.s2t': 'Apostil ve Konsolosluk İşlemleri',
    'services.s2d': 'Yurt dışında kullanılacak belgeleriniz için uluslararası geçerliliğe sahip apostil tasdiki ve konsolosluk onayı.',
    'services.s3t': 'Teknik Şartname ve İdari Evrak Çevirisi',
    'services.s3d': 'Mühendislik dokümanları, teknik şartnameler, idari kararlar ve kurumsal yazışmaların uzman çevirisi.',
    'services.s4t': 'Şahsi Belge Çevirileri',
    'services.s4d': 'Nüfus cüzdanı, doğum belgesi, diploma, evlilik cüzdanı ve benzeri tüm kişisel belge çevirileri.',
    'services.s5t': 'Tüm Dünya Dillerinde Hizmet',
    'services.s5d': "İngilizce, Almanca, Fransızca, Arapça, Rusça, Farsça, İspanyolca ve 50'den fazla dil çiftinde yeminli tercümanlık hizmeti.",
    'services.link': 'Bilgi Al',
    'services.detail': 'Detaylı Bilgi',
    'services.linkLang': 'Dilinizi Sorun',

    'lang.en': 'İngilizce',
    'lang.de': 'Almanca',
    'lang.fr': 'Fransızca',
    'lang.ar': 'Arapça',
    'lang.ru': 'Rusça',
    'lang.fa': 'Farsça',
    'lang.es': 'İspanyolca',
    'lang.more': '+40 dil daha',

    'docs.tag': 'Belge Türleri',
    'docs.title': 'En Çok Çevrilen<br><span class="accent">Belgeler</span>',
    'docs.subtitle': 'Belgenize tıklayarak süreç, gerekli evraklar ve teslim süresi hakkında detaylı bilgi alabilirsiniz.',
    'docs.d1t': 'Diploma & Transkript Çevirisi',
    'docs.d1d': 'Yurt dışı üniversite başvuruları ve denklik işlemleri için',
    'docs.d2t': 'Pasaport & Kimlik Çevirisi',
    'docs.d2d': 'Vize, oturum izni ve konsolosluk başvuruları için',
    'docs.d3t': 'Vekaletname & Sözleşme Çevirisi',
    'docs.d3d': 'Hukuki işlemler ve uluslararası ticari sözleşmeler için',
    'docs.d4t': 'Diğer Belgeleriniz',
    'docs.d4d': 'Bilanço, patent, sağlık raporu, ehliyet, askerlik belgesi ve fazlası.',
    'docs.d5t': 'Doğum Belgesi Çevirisi',
    'docs.d5d': 'Vatandaşlık, okul kaydı ve nüfus işlemleri için',
    'docs.d6t': 'Evlilik Cüzdanı Çevirisi',
    'docs.d6d': 'Aile birleşimi ve oturum izni başvuruları için',
    'docs.d7t': 'Sabıka Kaydı Çevirisi',
    'docs.d7d': 'Vize, oturum izni ve yurt dışı iş başvuruları için',
    'docs.more': 'Detaylı Bilgi',
    'docs.ask': 'Belgenizi Sorun',

    'process.tag': 'Nasıl Çalışıyoruz?',
    'process.title': 'Tercüme Süreci<br><span class="accent">4 Kolay Adım</span>',
    'process.s1t': 'Belgeyi Gönderin',
    'process.s1d': 'WhatsApp veya e-posta üzerinden belgenizin fotoğrafını paylaşın.',
    'process.s2t': 'Analiz & Teklif',
    'process.s2d': 'Ekibimiz belgenizi inceler ve net bir teklif sunar.',
    'process.s3t': 'Yeminli Çeviri',
    'process.s3d': 'Yeminli tercümanlarımız belgenizi titizlikle çevirir.',
    'process.s4t': 'Hızlı Teslim',
    'process.s4d': 'Onaylı belgeniz en kısa sürede size teslim edilir.',

    'quote.tag': 'Ücretsiz Teklif',
    'quote.title': 'Belgeniz İçin<br><span class="accent">Teklif Alın</span>',
    'quote.subtitle': 'Formu doldurun, ekibimiz belgenizi inceleyip en kısa sürede net fiyat ve teslim süresiyle size dönsün.',
    'quote.docType': 'Belge Türü',
    'quote.dt1': 'Şahsi Belge (kimlik, doğum, evlilik)',
    'quote.dt2': 'Diploma / Transkript',
    'quote.dt3': 'Pasaport / Vize Evrakı',
    'quote.dt4': 'Vekaletname / Sözleşme',
    'quote.dt5': 'Teknik Şartname / Mühendislik',
    'quote.dt6': 'Tıbbi / Sağlık Belgesi',
    'quote.dt7': 'Diğer',
    'quote.pages': 'Sayfa Sayısı',
    'quote.source': 'Kaynak Dil',
    'quote.target': 'Hedef Dil',
    'quote.otherLang': 'Diğer / Nadir Dil',
    'quote.urgency': 'Teslim Süresi',
    'quote.u1': 'Standart (2–3 iş günü)',
    'quote.u2': 'Acil (24 saat)',
    'quote.u3': 'Çok Acil (aynı gün)',
    'quote.notary': 'Noter onayı istiyorum',
    'quote.notaryHint': 'Noter harcı ayrıca hesaplanır.',
    'quote.name': 'Ad Soyad <span class="req">*</span>',
    'quote.phone': 'Telefon <span class="req">*</span>',
    'quote.email': 'E-posta',
    'quote.notes': 'Notunuz',
    'quote.notesPh': 'Belgeniz veya işleminiz hakkında eklemek istedikleriniz...',
    'quote.consent': 'Kişisel verilerimin <a href="kvkk.html" target="_blank">KVKK Aydınlatma Metni</a> kapsamında işlenmesini kabul ediyorum.',
    'quote.submit': 'WhatsApp ile Teklif İste',
    'quote.submitServer': 'Teklif Talebi Gönder',
    'quote.file': 'Belge (fotoğraf veya PDF)',
    'quote.fileHint': 'En fazla 5 dosya, dosya başına 10 MB. Belgeniz yalnızca teklif hazırlamak için kullanılır.',
    'quote.waFallback': "WhatsApp'ta aç",
    'quote.mailFallback': 'E-posta ile gönder',
    'quote.infoTitle': 'Fiyat Neye Göre Belirlenir?',
    'quote.f1': 'Kaynak ve hedef dil çifti',
    'quote.f2': 'Belgenin sayfa ve karakter sayısı',
    'quote.f3': 'Uzmanlık alanı (hukuki, tıbbi, teknik)',
    'quote.f4': 'Talep ettiğiniz teslim süresi',
    'quote.f5': 'Noter onayı gerekiyorsa noter harcı',
    'quote.infoNote': 'Belgeniz incelenmeden net fiyat vermek doğru olmaz. Bu yüzden teklifi ücretsiz hazırlıyor ve onayınız olmadan işleme başlamıyoruz.',
    'quote.altText': 'Formu doldurmak yerine belgenizin fotoğrafını doğrudan gönderin:',
    'quote.altCta': "WhatsApp'tan Gönder",

    'refs.title': 'Kurumsal Müşterilerimizin Çalıştığı Sektörler',
    'refs.subtitle': 'Bireysel müşterilerimizin yanı sıra kurumsal firmalara düzenli tercüme desteği veriyoruz.',
    'refs.1': 'Hukuk Büroları',
    'refs.2': 'Sanayi & Üretim',
    'refs.3': 'Sağlık Kuruluşları',
    'refs.4': 'Eğitim Danışmanlıkları',
    'refs.5': 'Lojistik & Dış Ticaret',
    'refs.6': 'İnşaat & Taahhüt',

    'reviews.tag': 'Müşteri Yorumları',
    'reviews.title': 'Müşterilerimizin<br><span class="accent">Görüşleri</span>',
    'reviews.onGoogle': "Google'da",
    'reviews.seeAll': 'Tüm yorumları gör',
    'reviews.verified': 'Doğrulanmış Google Yorumu',
    'reviews.r1': '"Yıllardır Nazay tercüme ile çalışıyorum, profesyonel çeviri ekibiyle işimi kaliteli ve hızlı bir şekilde teslim ettikleri için, Nazay Hanım\'ın ve ekibinin sıcaklığına teşekkür ederim."',
    'reviews.r2': '"Hem ikili iletişimde hem de işe yaklaşımlarında gerçek profesyoneller, ihtiyaca yönelik doğrudan, hızlı, güvenilir ve şeffaf bir ilişki. Oldukça memnunum."',
    'reviews.ctaTitle': 'Hızlı Hizmet<br>Almak İster misiniz?',
    'reviews.ctaDesc': 'Belgenizi gönderin, dakikalar içinde size dönelim.',
    'reviews.ctaBtn': 'Hemen Arayın',

    'faq.tag': 'Sıkça Sorulan Sorular',
    'faq.title': 'Aklınıza Takılan<br><span class="accent">Sorular</span>',
    'faq.subtitle': 'Tercüme, noter ve apostil süreçleri hakkında en çok sorulanları derledik.',
    'faq.q1': 'Yeminli tercüme nedir, normal çeviriden farkı nedir?',
    'faq.a1': 'Yeminli tercüme, noter huzurunda yemin ederek yetki almış bir tercümanın imza ve kaşesiyle onayladığı çeviridir. Normal çeviriden farkı, resmi kurumlar nezdinde yasal geçerliliğe sahip olmasıdır. Mahkemeler, noterler, konsolosluklar ve kamu kurumları yalnızca yeminli tercüman kaşesi taşıyan çevirileri kabul eder.',
    'faq.q2': 'Apostil nedir ve hangi belgelerde gerekir?',
    'faq.a2': "Apostil, bir belgenin yurt dışında da geçerli sayılmasını sağlayan uluslararası tasdik şerhidir. Lahey Sözleşmesi'ne taraf ülkelerde kullanılacak diploma, doğum belgesi, sabıka kaydı, vekaletname gibi resmi evraklarda gerekir. Türkiye'de apostil onayı kaymakamlıklar ve valilikler tarafından verilir; sözleşmeye taraf olmayan ülkelerde ise konsolosluk onayı gerekir.",
    'faq.q3': 'Noter onaylı tercüme ne kadar sürede hazır olur?',
    'faq.a3': 'Standart bir kimlik, diploma veya doğum belgesi çevirisi genellikle aynı gün içinde çevrilir, noter onayı ise 1 iş günü içinde tamamlanır. Çok sayfalı teknik şartname ve sözleşmelerde süre belge hacmine göre değişir. Acil işleriniz için aynı gün teslim seçeneğimiz mevcuttur.',
    'faq.q4': 'Tercüme ücreti neye göre belirlenir?',
    'faq.a4': 'Ücret; kaynak ve hedef dil çiftine, belgenin sayfa veya karakter sayısına, uzmanlık alanına (hukuki, tıbbi, teknik) ve teslim süresine göre belirlenir. Noter onayı istenmesi durumunda noter harcı ayrıca eklenir. Belgenizin fotoğrafını gönderdiğinizde net fiyatı ücretsiz olarak paylaşıyoruz.',
    'faq.q5': 'Belgelerimin gizliliği nasıl korunuyor?',
    'faq.a5': 'Tüm tercümanlarımız gizlilik sözleşmesine tabidir. Belgeleriniz yalnızca çeviri süreci boyunca işlenir, üçüncü kişilerle paylaşılmaz ve talebiniz üzerine teslimat sonrası sistemlerimizden silinir. Kişisel verileriniz KVKK kapsamında işlenmektedir.',
    'faq.q6': 'Belgenin aslını getirmem gerekiyor mu?',
    'faq.a6': 'Fiyat teklifi ve çeviri işlemi için belgenin net bir fotoğrafı veya taraması yeterlidir. Ancak noter onayı gereken işlemlerde noter, belgenin aslını ya da onaylı suretini talep edebilir. Bu durumda belgeyi teslim sırasında getirmeniz yeterlidir.',
    'faq.q7': 'Hangi dillerde hizmet veriyorsunuz?',
    'faq.a7': "İngilizce, Almanca, Fransızca, Arapça, Rusça, Farsça, İspanyolca ve İtalyanca başta olmak üzere 50'den fazla dil çiftinde yeminli tercüme hizmeti sunuyoruz. Listede olmayan diller için de tercüman ağımız üzerinden çözüm üretiyoruz.",
    'faq.q8': 'Çeviriyi kargoyla veya e-posta ile alabilir miyim?',
    'faq.a8': 'Onay gerektirmeyen çevirileri e-posta ile PDF olarak gönderiyoruz. Noter onaylı ıslak imzalı belgeler için ofisimizden teslim alabilir veya kargo ile adresinize gönderilmesini talep edebilirsiniz.',
    'faq.footerText': 'Sorunuzun cevabını bulamadınız mı?',
    'faq.footerCta': 'Bize Sorun',

    'contact.tag': 'İletişim',
    'contact.title': 'Bizimle<br><span class="accent">İletişime Geçin</span>',
    'contact.subtitle': 'Belgeniz için hızlı fiyat teklifi almak veya detaylı bilgi edinmek için aşağıdaki kanallardan bize ulaşın.',
    'contact.phone': 'Telefon',
    'contact.phoneCta': 'Hemen Ara',
    'contact.waDesc': '7/24 Mesaj Gönderin',
    'contact.waCta': "WhatsApp'tan Yaz",
    'contact.email': 'E-posta',
    'contact.emailCta': 'Belge Gönderin',
    'contact.hours': 'Çalışma Saatleri',
    'contact.hoursVal': 'Pzt – Cmt: 09:00 – 21:00',
    'contact.hoursCta': 'Hizmet Saatleri',
    'contact.address': 'Adres',
    'contact.addressCta': 'Yol Tarifi Al',

    'footer.desc': 'Tüm dünya dillerinde noter, apostil ve konsolosluk işlemleri için profesyonel ve yeminli tercüme hizmetleri.',
    'footer.servicesTitle': 'Hizmetlerimiz',
    'footer.contactTitle': 'İletişim',
    'footer.groupTitle': 'Nazay Business Group',
    'footer.groupHome': 'Grup Ana Sayfası',
    'footer.garden': 'Nazay Bahçe – Davet & Organizasyon',
    'footer.kvkk': 'KVKK & Gizlilik Politikası',
    'footer.local': 'Üsküdar Yeminli Tercüme',
    'footer.rights': 'Tüm Hakları Saklıdır.',
    'footer.tagline': 'Yeminli Tercüme Bürosu – Üsküdar / İstanbul',

    'float.tooltip': 'Hızlı Bilgi Al',
    'mobilebar.call': 'Ara',
    'mobilebar.quote': 'Teklif',
    'mobilebar.directions': 'Yol Tarifi',

    /* Çalışma anında JavaScript tarafından kullanılan metinler */
    'ui.sending': 'Gönderiliyor...',
    'ui.waOpened': 'WhatsApp açıldı. Hazırlanan mesajı göndermeniz yeterli.',
    'ui.waOpenAgain': 'Açılmadıysa tıklayın',
    'ui.success': 'Talebiniz alındı. En kısa sürede size dönüş yapacağız.',
    'ui.error': 'Gönderilemedi. Lütfen WhatsApp veya telefon üzerinden bize ulaşın.',
    'ui.errRequired': 'Lütfen ad soyad ve telefon alanlarını doldurun.',
    'ui.errConsent': 'Devam etmek için KVKK metnini onaylamanız gerekiyor.',
    'ui.errFileCount': 'En fazla 5 dosya yükleyebilirsiniz.',
    'ui.errFileSize': 'Belgelerin toplam boyutu çok büyük. Daha az sayfa gönderin veya WhatsApp kullanın.',
    'ui.errFileRead': 'Belgeler okunamadı. Lütfen WhatsApp üzerinden gönderin.',
    'ui.skip': 'İçeriğe geç'
  },

  /* ==========================================================
     ENGLISH
     ========================================================== */
  en: {
    'meta.title': 'Nazay Translation | Sworn & Notarised Translation Services – Üsküdar/Istanbul',
    'meta.description': 'Nazay Sworn Translation Services provides fast, professional translation in all world languages for notary, apostille and consulate procedures. Üsküdar/Istanbul.',

    'topbar.hours': 'Monday – Saturday: 09:00 – 21:00',
    'topbar.address': 'Murat Reis, Yeni Ocak St. No:39, Üsküdar/Istanbul',

    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.quote': 'Get a Quote',
    'nav.faq': 'FAQ',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',

    'hero.badge': 'Sworn & Notarised Translation Office',
    'hero.title': 'Professional and Sworn<br><span class="gradient-text">Translation Services</span><br>in All World Languages',
    'hero.subtitle': 'Fast, reliable and transparent translation solutions for your notary, apostille and consulate procedures.',
    'hero.stat1': 'Language Pairs',
    'hero.stat2': 'Fast Delivery',
    'hero.stat3': 'Google Rating',
    'hero.cta1': 'Contact Us Now',
    'hero.cta2': 'Free Price Quote',

    'trust.1': '100% Secure & Confidential',
    'trust.2': 'Fast Delivery',
    'trust.3': 'Notary Approved',
    'trust.4': 'All World Languages',
    'trust.5': 'Google 4.5/5 Stars',

    'about.visualTitle': 'Sworn Translation Office',
    'about.visualDesc': 'Legally valid translations for all your official documents',
    'about.mini1': 'Officially Certified',
    'about.mini2': 'Fast Delivery',
    'about.mini3': 'Trustworthy',
    'about.v1': 'Notarized Translation',
    'about.v2': 'Apostille Services',
    'about.v3': 'Consulate Legalization',
    'about.vs3': 'Service Hours',
    'about.tag': 'About Us',
    'about.title': 'Nazay Sworn Translation<br><span class="accent">Language Services</span>',
    'about.p1': 'At Nazay Sworn Translation Language Services, we handle every kind of document you need translated for <strong>notary, apostille and consulate procedures</strong>.',
    'about.p2': 'We work with <strong>sworn translators in all world languages</strong> for technical specifications, administrative paperwork and personal documents.',
    'about.p3': 'We look forward to hearing from you soon and wish you success in your work. <em>Kind regards.</em>',
    'about.h1t': 'Official Document Translation',
    'about.h1d': 'Legally valid notary- and apostille-certified documents',
    'about.h2t': 'All World Languages',
    'about.h2d': 'Expert sworn translators in more than 50 language pairs',
    'about.h3t': 'Open 09:00 – 21:00',
    'about.h3d': 'Long working hours mean we are always available',
    'about.cta': 'Get in Touch',

    'services.tag': 'Our Services',
    'services.title': 'The Translation Services<br><span class="accent">We Offer</span>',
    'services.subtitle': 'Comprehensive sworn translation solutions for all your official and private documents.',
    'services.s1t': 'Notarised Sworn Translation',
    'services.s1d': 'Sworn translations certified by a notary for submission to courts, official institutions and public administrations.',
    'services.s2t': 'Apostille and Consulate Procedures',
    'services.s2d': 'Internationally valid apostille certification and consulate approval for documents to be used abroad.',
    'services.s3t': 'Technical Specification & Administrative Documents',
    'services.s3d': 'Expert translation of engineering documents, technical specifications, administrative decisions and corporate correspondence.',
    'services.s4t': 'Personal Document Translation',
    'services.s4d': 'ID cards, birth certificates, diplomas, marriage certificates and all similar personal documents.',
    'services.s5t': 'Service in All World Languages',
    'services.s5d': 'Sworn translation in English, German, French, Arabic, Russian, Persian, Spanish and more than 50 language pairs.',
    'services.link': 'Learn More',
    'services.detail': 'Learn More',
    'services.linkLang': 'Ask About Your Language',

    'lang.en': 'English',
    'lang.de': 'German',
    'lang.fr': 'French',
    'lang.ar': 'Arabic',
    'lang.ru': 'Russian',
    'lang.fa': 'Persian',
    'lang.es': 'Spanish',
    'lang.more': '+40 more languages',

    'docs.tag': 'Document Types',
    'docs.title': 'Most Frequently<br><span class="accent">Translated Documents</span>',
    'docs.subtitle': 'Click on your document type for details on the process, required paperwork and delivery time.',
    'docs.d1t': 'Diploma & Transcript Translation',
    'docs.d1d': 'For overseas university applications and equivalency procedures',
    'docs.d2t': 'Passport & ID Translation',
    'docs.d2d': 'For visa, residence permit and consulate applications',
    'docs.d3t': 'Power of Attorney & Contract Translation',
    'docs.d3d': 'For legal procedures and international commercial contracts',
    'docs.d4t': 'Your Other Documents',
    'docs.d4d': 'Balance sheets, patents, medical reports, driving licences, military service records and more.',
    'docs.d5t': 'Birth Certificate Translation',
    'docs.d5d': 'For citizenship, school enrolment and civil registry procedures',
    'docs.d6t': 'Marriage Certificate Translation',
    'docs.d6d': 'For family reunification and residence permit applications',
    'docs.d7t': 'Criminal Record Translation',
    'docs.d7d': 'For visa, residence permit and overseas job applications',
    'docs.more': 'Details',
    'docs.ask': 'Ask About Your Document',

    'process.tag': 'How We Work',
    'process.title': 'The Translation Process<br><span class="accent">in 4 Easy Steps</span>',
    'process.s1t': 'Send Your Document',
    'process.s1d': 'Share a photo of your document via WhatsApp or e-mail.',
    'process.s2t': 'Review & Quote',
    'process.s2d': 'Our team examines your document and gives you a clear quote.',
    'process.s3t': 'Sworn Translation',
    'process.s3d': 'Our sworn translators translate your document with care.',
    'process.s4t': 'Fast Delivery',
    'process.s4d': 'Your certified document is delivered to you as quickly as possible.',

    'quote.tag': 'Free Quote',
    'quote.title': 'Get a Quote<br><span class="accent">for Your Document</span>',
    'quote.subtitle': 'Fill in the form and our team will review your document and get back to you with an exact price and delivery time.',
    'quote.docType': 'Document Type',
    'quote.dt1': 'Personal Document (ID, birth, marriage)',
    'quote.dt2': 'Diploma / Transcript',
    'quote.dt3': 'Passport / Visa Document',
    'quote.dt4': 'Power of Attorney / Contract',
    'quote.dt5': 'Technical Specification / Engineering',
    'quote.dt6': 'Medical / Health Document',
    'quote.dt7': 'Other',
    'quote.pages': 'Number of Pages',
    'quote.source': 'Source Language',
    'quote.target': 'Target Language',
    'quote.otherLang': 'Other / Rare Language',
    'quote.urgency': 'Delivery Time',
    'quote.u1': 'Standard (2–3 business days)',
    'quote.u2': 'Urgent (24 hours)',
    'quote.u3': 'Very Urgent (same day)',
    'quote.notary': 'I need notary certification',
    'quote.notaryHint': 'Notary fees are calculated separately.',
    'quote.name': 'Full Name <span class="req">*</span>',
    'quote.phone': 'Phone <span class="req">*</span>',
    'quote.email': 'E-mail',
    'quote.notes': 'Your Note',
    'quote.notesPh': 'Anything you would like to add about your document or procedure...',
    'quote.consent': 'I consent to the processing of my personal data under the <a href="kvkk.html" target="_blank">Privacy Notice</a>.',
    'quote.submit': 'Request a Quote via WhatsApp',
    'quote.submitServer': 'Send Quote Request',
    'quote.file': 'Document (photo or PDF)',
    'quote.fileHint': 'Up to 5 files, 10 MB each. Your document is used only to prepare the quote.',
    'quote.waFallback': 'Open in WhatsApp',
    'quote.mailFallback': 'Send by e-mail',
    'quote.infoTitle': 'What Determines the Price?',
    'quote.f1': 'The source and target language pair',
    'quote.f2': 'The number of pages and characters',
    'quote.f3': 'The field of expertise (legal, medical, technical)',
    'quote.f4': 'The delivery time you request',
    'quote.f5': 'Notary fees, if certification is required',
    'quote.infoNote': 'It would not be right to quote an exact price without seeing your document. That is why our quotes are free and we never start work without your approval.',
    'quote.altText': 'Prefer not to fill in the form? Send a photo of your document directly:',
    'quote.altCta': 'Send via WhatsApp',

    'refs.title': 'Sectors Our Corporate Clients Work In',
    'refs.subtitle': 'Alongside our individual clients, we provide ongoing translation support to corporate companies.',
    'refs.1': 'Law Firms',
    'refs.2': 'Industry & Manufacturing',
    'refs.3': 'Healthcare Institutions',
    'refs.4': 'Education Consultancies',
    'refs.5': 'Logistics & Foreign Trade',
    'refs.6': 'Construction & Contracting',

    'reviews.tag': 'Client Reviews',
    'reviews.title': 'What Our Clients<br><span class="accent">Say About Us</span>',
    'reviews.onGoogle': 'On Google',
    'reviews.seeAll': 'See all reviews',
    'reviews.verified': 'Verified Google Review (translated)',
    'reviews.r1': '"I have worked with Nazay Translation for years. They deliver my work quickly and to a high standard with their professional translation team — my thanks to Ms. Nazay and her team for their warmth."',
    'reviews.r2': '"Genuine professionals both in personal communication and in their approach to the work: direct, fast, reliable and transparent, exactly as needed. I am very satisfied."',
    'reviews.ctaTitle': 'Would You Like<br>Fast Service?',
    'reviews.ctaDesc': 'Send us your document and we will get back to you within minutes.',
    'reviews.ctaBtn': 'Call Now',

    'faq.tag': 'Frequently Asked Questions',
    'faq.title': 'Questions<br><span class="accent">You May Have</span>',
    'faq.subtitle': 'We have collected the most common questions about translation, notary and apostille procedures.',
    'faq.q1': 'What is a sworn translation and how does it differ from a regular one?',
    'faq.a1': 'A sworn translation is one certified with the signature and stamp of a translator who has taken an oath before a notary. Unlike a regular translation, it is legally valid before official institutions. Courts, notaries, consulates and public bodies only accept translations bearing a sworn translator’s stamp.',
    'faq.q2': 'What is an apostille and which documents require one?',
    'faq.a2': 'An apostille is an international certification that makes a document valid abroad. It is required for official documents such as diplomas, birth certificates, criminal record extracts and powers of attorney to be used in countries party to the Hague Convention. In Türkiye, apostilles are issued by district and provincial governorships; for non-signatory countries, consulate approval is required instead.',
    'faq.q3': 'How long does a notarised translation take?',
    'faq.a3': 'A standard ID card, diploma or birth certificate is usually translated the same day, with notary certification completed within one business day. For multi-page technical specifications and contracts, the timeline depends on document volume. Same-day delivery is available for urgent work.',
    'faq.q4': 'How is the translation fee determined?',
    'faq.a4': 'The fee depends on the source and target language pair, the number of pages or characters, the field of expertise (legal, medical, technical) and the delivery time. If notary certification is requested, the notary fee is added separately. Send us a photo of your document and we will share the exact price free of charge.',
    'faq.q5': 'How is the confidentiality of my documents protected?',
    'faq.a5': 'All our translators are bound by confidentiality agreements. Your documents are processed only for the duration of the translation, are never shared with third parties, and are deleted from our systems after delivery upon your request. Your personal data is processed in accordance with Turkish data protection law (KVKK).',
    'faq.q6': 'Do I need to bring the original document?',
    'faq.a6': 'A clear photo or scan of the document is enough for a quote and for the translation itself. However, for procedures requiring notary certification, the notary may request the original or a certified copy. In that case, simply bring it when collecting your translation.',
    'faq.q7': 'Which languages do you work in?',
    'faq.a7': 'We provide sworn translation in more than 50 language pairs, primarily English, German, French, Arabic, Russian, Persian, Spanish and Italian. For languages not listed, we find a solution through our translator network.',
    'faq.q8': 'Can I receive the translation by post or e-mail?',
    'faq.a8': 'Translations that do not require certification are sent as PDF by e-mail. Notarised, wet-signed documents can be collected from our office or shipped to your address by courier on request.',
    'faq.footerText': 'Could not find the answer to your question?',
    'faq.footerCta': 'Ask Us',

    'contact.tag': 'Contact',
    'contact.title': 'Get in<br><span class="accent">Touch With Us</span>',
    'contact.subtitle': 'Reach us through any of the channels below for a fast quote or detailed information about your document.',
    'contact.phone': 'Phone',
    'contact.phoneCta': 'Call Now',
    'contact.waDesc': 'Message Us 24/7',
    'contact.waCta': 'Write on WhatsApp',
    'contact.email': 'E-mail',
    'contact.emailCta': 'Send Your Document',
    'contact.hours': 'Working Hours',
    'contact.hoursVal': 'Mon – Sat: 09:00 – 21:00',
    'contact.hoursCta': 'Service Hours',
    'contact.address': 'Address',
    'contact.addressCta': 'Get Directions',

    'footer.desc': 'Professional and sworn translation services in all world languages for notary, apostille and consulate procedures.',
    'footer.servicesTitle': 'Our Services',
    'footer.contactTitle': 'Contact',
    'footer.groupTitle': 'Nazay Business Group',
    'footer.groupHome': 'Group Home Page',
    'footer.garden': 'Nazay Bahçe – Events & Organisation',
    'footer.kvkk': 'Privacy Policy',
    'footer.local': 'Sworn Translation in Üsküdar',
    'footer.rights': 'All Rights Reserved.',
    'footer.tagline': 'Sworn Translation Office – Üsküdar / Istanbul',

    'float.tooltip': 'Quick Info',
    'mobilebar.call': 'Call',
    'mobilebar.quote': 'Quote',
    'mobilebar.directions': 'Directions',

    'ui.sending': 'Sending...',
    'ui.waOpened': 'WhatsApp has opened. Just send the prepared message.',
    'ui.waOpenAgain': 'Click here if it did not open',
    'ui.success': 'We have received your request and will get back to you shortly.',
    'ui.error': 'Could not send. Please reach us via WhatsApp or by phone.',
    'ui.errRequired': 'Please fill in your name and phone number.',
    'ui.errConsent': 'You need to accept the privacy notice to continue.',
    'ui.errFileCount': 'You can upload at most 5 files.',
    'ui.errFileSize': 'The documents are too large in total. Send fewer pages or use WhatsApp.',
    'ui.errFileRead': 'The documents could not be read. Please send them over WhatsApp.',
    'ui.skip': 'Skip to content'
  },

  /* ==========================================================
     العربية (ARABIC)
     ========================================================== */
  ar: {
    'meta.title': 'نازاي للترجمة | خدمات الترجمة المحلفة والموثقة – أسكودار/إسطنبول',
    'meta.description': 'تقدم نازاي لخدمات الترجمة المحلفة ترجمة سريعة واحترافية بجميع لغات العالم لمعاملات كاتب العدل والأبوستيل والقنصليات. أسكودار/إسطنبول.',

    'topbar.hours': 'الاثنين – السبت: 09:00 – 21:00',
    'topbar.address': 'مراد ريس، شارع يني أوجاق رقم 39، أسكودار/إسطنبول',

    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.quote': 'اطلب عرض سعر',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.reviews': 'آراء العملاء',
    'nav.contact': 'اتصل بنا',

    'hero.badge': 'مكتب ترجمة محلفة وموثقة لدى كاتب العدل',
    'hero.title': 'خدمات ترجمة<br><span class="gradient-text">احترافية ومحلفة</span><br>بجميع لغات العالم',
    'hero.subtitle': 'حلول ترجمة سريعة وموثوقة وشفافة لمعاملات كاتب العدل والأبوستيل والقنصليات.',
    'hero.stat1': 'زوج لغوي',
    'hero.stat2': 'تسليم سريع',
    'hero.stat3': 'تقييم جوجل',
    'hero.cta1': 'تواصل معنا الآن',
    'hero.cta2': 'عرض سعر مجاني',

    'trust.1': 'سرية وأمان 100%',
    'trust.2': 'تسليم سريع',
    'trust.3': 'مصدّقة من كاتب العدل',
    'trust.4': 'جميع لغات العالم',
    'trust.5': 'تقييم جوجل 4.5/5',

    'about.visualTitle': 'مكتب ترجمة محلفة',
    'about.visualDesc': 'ترجمات ذات صلاحية قانونية لجميع وثائقكم الرسمية',
    'about.mini1': 'معتمدة رسمياً',
    'about.mini2': 'تسليم سريع',
    'about.mini3': 'جدير بالثقة',
    'about.v1': 'ترجمة موثقة لدى الكاتب العدل',
    'about.v2': 'خدمات الأبوستيل',
    'about.v3': 'تصديقات القنصلية',
    'about.vs3': 'ساعات العمل',
    'about.tag': 'من نحن',
    'about.title': 'نازاي للترجمة المحلفة<br><span class="accent">وخدمات اللغات</span>',
    'about.p1': 'نحن في نازاي لخدمات الترجمة المحلفة نتولى ترجمة جميع أنواع وثائقكم من أجل <strong>معاملات كاتب العدل والأبوستيل والقنصليات</strong>.',
    'about.p2': 'نعمل مع <strong>مترجمين محلفين بجميع لغات العالم</strong> في ترجمة المواصفات الفنية والوثائق الإدارية والمستندات الشخصية.',
    'about.p3': 'نتطلع إلى التواصل معكم في أقرب وقت، ونتمنى لكم التوفيق في أعمالكم. <em>مع خالص التقدير.</em>',
    'about.h1t': 'ترجمة الوثائق الرسمية',
    'about.h1d': 'مستندات مصدّقة من كاتب العدل والأبوستيل وذات صلاحية قانونية',
    'about.h2t': 'جميع لغات العالم',
    'about.h2d': 'مترجمون محلفون متخصصون في أكثر من 50 زوجاً لغوياً',
    'about.h3t': 'خدمة من 09:00 حتى 21:00',
    'about.h3d': 'ساعات عمل طويلة تجعلنا دائماً إلى جانبكم',
    'about.cta': 'تواصل معنا',

    'services.tag': 'خدماتنا',
    'services.title': 'خدمات الترجمة<br><span class="accent">التي نقدمها</span>',
    'services.subtitle': 'نقدم حلول ترجمة محلفة شاملة لجميع وثائقكم الرسمية والخاصة.',
    'services.s1t': 'ترجمة محلفة مصدّقة من كاتب العدل',
    'services.s1d': 'خدمات ترجمة محلفة مصدّقة من كاتب العدل لتقديمها إلى المحاكم والمؤسسات الرسمية والإدارات العامة.',
    'services.s2t': 'معاملات الأبوستيل والقنصليات',
    'services.s2d': 'تصديق أبوستيل معترف به دولياً وتصديق قنصلي للوثائق التي ستُستخدم خارج البلاد.',
    'services.s3t': 'ترجمة المواصفات الفنية والوثائق الإدارية',
    'services.s3d': 'ترجمة متخصصة للوثائق الهندسية والمواصفات الفنية والقرارات الإدارية والمراسلات المؤسسية.',
    'services.s4t': 'ترجمة الوثائق الشخصية',
    'services.s4d': 'بطاقة الهوية وشهادة الميلاد والشهادات الدراسية وعقد الزواج وجميع الوثائق الشخصية المماثلة.',
    'services.s5t': 'خدمة بجميع لغات العالم',
    'services.s5d': 'خدمة ترجمة محلفة بالإنجليزية والألمانية والفرنسية والعربية والروسية والفارسية والإسبانية وأكثر من 50 زوجاً لغوياً.',
    'services.link': 'اعرف المزيد',
    'services.detail': 'تفاصيل أكثر',
    'services.linkLang': 'اسأل عن لغتك',

    'lang.en': 'الإنجليزية',
    'lang.de': 'الألمانية',
    'lang.fr': 'الفرنسية',
    'lang.ar': 'العربية',
    'lang.ru': 'الروسية',
    'lang.fa': 'الفارسية',
    'lang.es': 'الإسبانية',
    'lang.more': '+40 لغة أخرى',

    'docs.tag': 'أنواع الوثائق',
    'docs.title': 'الوثائق الأكثر<br><span class="accent">طلباً للترجمة</span>',
    'docs.subtitle': 'اضغط على نوع وثيقتك للاطلاع على تفاصيل الإجراءات والمستندات المطلوبة ومدة التسليم.',
    'docs.d1t': 'ترجمة الشهادات وكشوف الدرجات',
    'docs.d1d': 'لطلبات الجامعات في الخارج ومعاملات معادلة الشهادات',
    'docs.d2t': 'ترجمة جواز السفر والهوية',
    'docs.d2d': 'لطلبات التأشيرة وتصريح الإقامة والمعاملات القنصلية',
    'docs.d3t': 'ترجمة الوكالات والعقود',
    'docs.d3d': 'للمعاملات القانونية والعقود التجارية الدولية',
    'docs.d4t': 'وثائقكم الأخرى',
    'docs.d4d': 'الميزانيات، براءات الاختراع، التقارير الطبية، رخص القيادة، وثائق الخدمة العسكرية وغيرها.',
    'docs.d5t': 'ترجمة شهادة الميلاد',
    'docs.d5d': 'لمعاملات الجنسية والتسجيل المدرسي والسجل المدني',
    'docs.d6t': 'ترجمة عقد الزواج',
    'docs.d6d': 'لطلبات لم شمل الأسرة وتصريح الإقامة',
    'docs.d7t': 'ترجمة السجل العدلي',
    'docs.d7d': 'لطلبات التأشيرة والإقامة والعمل في الخارج',
    'docs.more': 'تفاصيل',
    'docs.ask': 'اسأل عن وثيقتك',

    'process.tag': 'كيف نعمل؟',
    'process.title': 'مراحل الترجمة<br><span class="accent">في 4 خطوات سهلة</span>',
    'process.s1t': 'أرسل الوثيقة',
    'process.s1d': 'شارك صورة وثيقتك عبر واتساب أو البريد الإلكتروني.',
    'process.s2t': 'الدراسة وعرض السعر',
    'process.s2d': 'يقوم فريقنا بفحص وثيقتك وتقديم عرض سعر واضح.',
    'process.s3t': 'الترجمة المحلفة',
    'process.s3d': 'يقوم مترجمونا المحلفون بترجمة وثيقتك بدقة وعناية.',
    'process.s4t': 'التسليم السريع',
    'process.s4d': 'تُسلَّم وثيقتك المصدّقة إليكم في أسرع وقت ممكن.',

    'quote.tag': 'عرض سعر مجاني',
    'quote.title': 'احصل على عرض سعر<br><span class="accent">لوثيقتك</span>',
    'quote.subtitle': 'املأ النموذج وسيقوم فريقنا بفحص وثيقتك والرد عليك بالسعر النهائي ومدة التسليم في أقرب وقت.',
    'quote.docType': 'نوع الوثيقة',
    'quote.dt1': 'وثيقة شخصية (هوية، ميلاد، زواج)',
    'quote.dt2': 'شهادة دراسية / كشف درجات',
    'quote.dt3': 'جواز سفر / وثيقة تأشيرة',
    'quote.dt4': 'وكالة / عقد',
    'quote.dt5': 'مواصفات فنية / هندسية',
    'quote.dt6': 'وثيقة طبية / صحية',
    'quote.dt7': 'أخرى',
    'quote.pages': 'عدد الصفحات',
    'quote.source': 'اللغة المصدر',
    'quote.target': 'اللغة الهدف',
    'quote.otherLang': 'أخرى / لغة نادرة',
    'quote.urgency': 'مدة التسليم',
    'quote.u1': 'عادي (2–3 أيام عمل)',
    'quote.u2': 'مستعجل (24 ساعة)',
    'quote.u3': 'مستعجل جداً (نفس اليوم)',
    'quote.notary': 'أرغب في التصديق لدى كاتب العدل',
    'quote.notaryHint': 'رسوم كاتب العدل تُحسب بشكل منفصل.',
    'quote.name': 'الاسم الكامل <span class="req">*</span>',
    'quote.phone': 'رقم الهاتف <span class="req">*</span>',
    'quote.email': 'البريد الإلكتروني',
    'quote.notes': 'ملاحظاتك',
    'quote.notesPh': 'أي معلومات إضافية عن وثيقتك أو معاملتك...',
    'quote.consent': 'أوافق على معالجة بياناتي الشخصية وفقاً <a href="kvkk.html" target="_blank">لسياسة الخصوصية</a>.',
    'quote.submit': 'اطلب عرض سعر عبر واتساب',
    'quote.submitServer': 'إرسال طلب عرض السعر',
    'quote.file': 'الوثيقة (صورة أو PDF)',
    'quote.fileHint': 'حتى 5 ملفات، 10 ميغابايت لكل ملف. تُستخدم وثيقتكم لإعداد عرض السعر فقط.',
    'quote.waFallback': 'افتح في واتساب',
    'quote.mailFallback': 'أرسل بالبريد الإلكتروني',
    'quote.infoTitle': 'ما الذي يحدد السعر؟',
    'quote.f1': 'الزوج اللغوي (اللغة المصدر والهدف)',
    'quote.f2': 'عدد صفحات وأحرف الوثيقة',
    'quote.f3': 'مجال التخصص (قانوني، طبي، فني)',
    'quote.f4': 'مدة التسليم المطلوبة',
    'quote.f5': 'رسوم كاتب العدل إذا كان التصديق مطلوباً',
    'quote.infoNote': 'لا يصح تحديد سعر نهائي دون فحص وثيقتك. لذلك نُعد العرض مجاناً ولا نبدأ العمل دون موافقتكم.',
    'quote.altText': 'بدلاً من ملء النموذج، أرسل صورة وثيقتك مباشرة:',
    'quote.altCta': 'أرسل عبر واتساب',

    'refs.title': 'القطاعات التي يعمل بها عملاؤنا من الشركات',
    'refs.subtitle': 'إلى جانب عملائنا الأفراد، نقدم دعم ترجمة منتظم للشركات والمؤسسات.',
    'refs.1': 'مكاتب المحاماة',
    'refs.2': 'الصناعة والإنتاج',
    'refs.3': 'المؤسسات الصحية',
    'refs.4': 'الاستشارات التعليمية',
    'refs.5': 'الخدمات اللوجستية والتجارة الخارجية',
    'refs.6': 'الإنشاءات والمقاولات',

    'reviews.tag': 'آراء العملاء',
    'reviews.title': 'ما يقوله<br><span class="accent">عملاؤنا عنا</span>',
    'reviews.onGoogle': 'على جوجل',
    'reviews.seeAll': 'عرض جميع التقييمات',
    'reviews.verified': 'تقييم جوجل موثّق (مترجم)',
    'reviews.r1': '«أتعامل مع نازاي للترجمة منذ سنوات. يسلّمون عملي بسرعة وبجودة عالية بفضل فريق الترجمة المحترف لديهم، وأشكر السيدة نازاي وفريقها على دفء التعامل.»',
    'reviews.r2': '«محترفون حقيقيون في التواصل الشخصي وفي أسلوب العمل على حد سواء: مباشرون وسريعون وموثوقون وشفافون تمامًا كما يجب. أنا راضٍ جدًا.»',
    'reviews.ctaTitle': 'هل ترغب في<br>خدمة سريعة؟',
    'reviews.ctaDesc': 'أرسل وثيقتك وسنعاود الاتصال بك خلال دقائق.',
    'reviews.ctaBtn': 'اتصل الآن',

    'faq.tag': 'الأسئلة الشائعة',
    'faq.title': 'أسئلة<br><span class="accent">قد تخطر ببالك</span>',
    'faq.subtitle': 'جمعنا لكم أكثر الأسئلة تكراراً حول إجراءات الترجمة وكاتب العدل والأبوستيل.',
    'faq.q1': 'ما هي الترجمة المحلفة وما الفرق بينها وبين الترجمة العادية؟',
    'faq.a1': 'الترجمة المحلفة هي ترجمة يصادق عليها مترجم أدى اليمين أمام كاتب العدل بتوقيعه وختمه. والفرق عن الترجمة العادية أنها تتمتع بصلاحية قانونية أمام المؤسسات الرسمية. فالمحاكم وكتّاب العدل والقنصليات والجهات العامة لا تقبل إلا الترجمات التي تحمل ختم مترجم محلف.',
    'faq.q2': 'ما هو الأبوستيل وفي أي الوثائق يُطلب؟',
    'faq.a2': 'الأبوستيل هو تصديق دولي يجعل الوثيقة صالحة للاستخدام خارج البلاد. وهو مطلوب للوثائق الرسمية كالشهادات الدراسية وشهادات الميلاد والسجل العدلي والوكالات المراد استخدامها في الدول الأعضاء في اتفاقية لاهاي. وفي تركيا تمنح القائمقاميات والولايات تصديق الأبوستيل، أما في الدول غير الأعضاء فيُطلب التصديق القنصلي بدلاً منه.',
    'faq.q3': 'كم تستغرق الترجمة المصدّقة من كاتب العدل؟',
    'faq.a3': 'تُترجم بطاقة الهوية أو الشهادة الدراسية أو شهادة الميلاد عادةً في نفس اليوم، ويكتمل تصديق كاتب العدل خلال يوم عمل واحد. أما المواصفات الفنية والعقود متعددة الصفحات فتختلف مدتها حسب حجم الوثيقة. ويتوفر خيار التسليم في نفس اليوم للمعاملات المستعجلة.',
    'faq.q4': 'كيف يتم تحديد تكلفة الترجمة؟',
    'faq.a4': 'تُحدَّد التكلفة حسب الزوج اللغوي وعدد صفحات أو أحرف الوثيقة ومجال التخصص (قانوني، طبي، فني) ومدة التسليم. وفي حال طلب التصديق لدى كاتب العدل تُضاف رسومه بشكل منفصل. أرسل لنا صورة وثيقتك وسنوافيك بالسعر النهائي مجاناً.',
    'faq.q5': 'كيف تتم حماية سرية وثائقي؟',
    'faq.a5': 'جميع مترجمينا ملتزمون باتفاقيات سرية. تُعالج وثائقكم فقط طوال فترة الترجمة، ولا تُشارك مع أطراف ثالثة، وتُحذف من أنظمتنا بعد التسليم بناءً على طلبكم. وتُعالج بياناتكم الشخصية وفق قانون حماية البيانات التركي (KVKK).',
    'faq.q6': 'هل يجب إحضار أصل الوثيقة؟',
    'faq.a6': 'تكفي صورة واضحة أو نسخة ممسوحة ضوئياً من الوثيقة للحصول على عرض السعر ولإجراء الترجمة. لكن في المعاملات التي تتطلب تصديق كاتب العدل قد يطلب الأصل أو نسخة مصدّقة عنه، ويكفي عندها إحضارها عند الاستلام.',
    'faq.q7': 'ما اللغات التي تقدمون خدماتكم بها؟',
    'faq.a7': 'نقدم خدمة الترجمة المحلفة في أكثر من 50 زوجاً لغوياً، وفي مقدمتها الإنجليزية والألمانية والفرنسية والعربية والروسية والفارسية والإسبانية والإيطالية. وللغات غير المدرجة نوفر الحل عبر شبكة مترجمينا.',
    'faq.q8': 'هل يمكنني استلام الترجمة بالبريد أو الشحن؟',
    'faq.a8': 'نرسل الترجمات التي لا تتطلب تصديقاً بصيغة PDF عبر البريد الإلكتروني. أما الوثائق المصدّقة الموقّعة أصلياً فيمكن استلامها من مكتبنا أو طلب شحنها إلى عنوانكم.',
    'faq.footerText': 'لم تجد إجابة سؤالك؟',
    'faq.footerCta': 'اسألنا',

    'contact.tag': 'اتصل بنا',
    'contact.title': 'تواصل<br><span class="accent">معنا</span>',
    'contact.subtitle': 'تواصلوا معنا عبر إحدى القنوات أدناه للحصول على عرض سعر سريع أو معلومات تفصيلية عن وثيقتكم.',
    'contact.phone': 'الهاتف',
    'contact.phoneCta': 'اتصل الآن',
    'contact.waDesc': 'راسلنا على مدار الساعة',
    'contact.waCta': 'راسلنا على واتساب',
    'contact.email': 'البريد الإلكتروني',
    'contact.emailCta': 'أرسل وثيقتك',
    'contact.hours': 'ساعات العمل',
    'contact.hoursVal': 'الاثنين – السبت: 09:00 – 21:00',
    'contact.hoursCta': 'أوقات الخدمة',
    'contact.address': 'العنوان',
    'contact.addressCta': 'احصل على الاتجاهات',

    'footer.desc': 'خدمات ترجمة احترافية ومحلفة بجميع لغات العالم لمعاملات كاتب العدل والأبوستيل والقنصليات.',
    'footer.servicesTitle': 'خدماتنا',
    'footer.contactTitle': 'اتصل بنا',
    'footer.groupTitle': 'مجموعة نازاي',
    'footer.groupHome': 'الصفحة الرئيسية للمجموعة',
    'footer.garden': 'حديقة نازاي – المناسبات والحفلات',
    'footer.kvkk': 'سياسة الخصوصية',
    'footer.local': 'ترجمة محلفة في أسكودار',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.tagline': 'مكتب ترجمة محلفة – أسكودار / إسطنبول',

    'float.tooltip': 'معلومات سريعة',
    'mobilebar.call': 'اتصال',
    'mobilebar.quote': 'عرض سعر',
    'mobilebar.directions': 'الاتجاهات',

    'ui.sending': 'جارٍ الإرسال...',
    'ui.waOpened': 'تم فتح واتساب. يكفي أن ترسلوا الرسالة المُعدّة.',
    'ui.waOpenAgain': 'اضغطوا هنا إذا لم يُفتح',
    'ui.success': 'تم استلام طلبكم وسنعاود التواصل معكم في أقرب وقت.',
    'ui.error': 'تعذّر الإرسال. يرجى التواصل معنا عبر واتساب أو الهاتف.',
    'ui.errRequired': 'يرجى تعبئة الاسم ورقم الهاتف.',
    'ui.errConsent': 'يجب الموافقة على سياسة الخصوصية للمتابعة.',
    'ui.errFileCount': 'يمكنكم تحميل 5 ملفات كحد أقصى.',
    'ui.errFileSize': 'الحجم الإجمالي للوثائق كبير جدًا. أرسلوا صفحات أقل أو استخدموا واتساب.',
    'ui.errFileRead': 'تعذّر قراءة الوثائق. يرجى إرسالها عبر واتساب.',
    'ui.skip': 'الانتقال إلى المحتوى'
  }
};
/* I18N_DATA_END */

/* ============================================================
   Dil motoru
   ============================================================ */
const NazayLang = (function () {
  const SUPPORTED = ['tr', 'en', 'ar'];
  const RTL       = ['ar'];

  let current = 'tr';

  /**
   * Sayfanın dili HTML'de bildirilir (<html lang="...">).
   * Her dil ayrı bir URL'dir (/, /en/, /ar/); bu yüzden tarayıcı dili veya
   * kayıtlı tercihe göre otomatik yönlendirme YAPILMAZ. Otomatik yönlendirme
   * hem arama motorlarının üç sürümü ayrı indekslemesini bozar hem de
   * kullanıcının seçtiği dili elinden alır.
   */
  function detect() {
    const declared = (document.documentElement.getAttribute('lang') || '').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(declared) ? declared : 'tr';
  }

  function t(key, lang) {
    const dict = NAZAY_I18N[lang || current] || {};
    return dict[key];
  }

  function apply(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'tr';
    current = lang;

    const isRtl = RTL.includes(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir  = isRtl ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('rtl', isRtl);

    // Metin düğümleri
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = t(el.getAttribute('data-i18n'), lang);
      if (val !== undefined) el.textContent = val;
    });

    // HTML içeren düğümler
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const val = t(el.getAttribute('data-i18n-html'), lang);
      if (val !== undefined) el.innerHTML = val;
    });

    // Öznitelikler: data-i18n-attr="placeholder:anahtar;title:anahtar2"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s && s.trim());
        if (!attr || !key) return;
        const val = t(key, lang);
        if (val !== undefined) el.setAttribute(attr, val);
      });
    });

    // Sayfa başlığı ve açıklaması
    const title = t('meta.title', lang);
    if (title) document.title = title;

    const desc = t('meta.description', lang);
    const descTag = document.querySelector('meta[name="description"]');
    if (desc && descTag) descTag.setAttribute('content', desc);

    // Seçici etiketi ve hangi dilin açık olduğu
    const label = document.getElementById('lang-current-label');
    if (label) label.textContent = lang.toUpperCase();

    document.querySelectorAll('#lang-menu [data-lang]').forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });

    document.dispatchEvent(new CustomEvent('nazay:langchange', { detail: { lang } }));
  }

  /**
   * Dil menüsü — WAI-ARIA menü düzeni.
   * Öğeler gerçek bağlantıdır; klavyeyle ok tuşları, Home/End ve Escape çalışır.
   */
  function initSwitcher() {
    const switcher = document.getElementById('lang-switcher');
    const toggle   = document.getElementById('lang-current');
    const menu     = document.getElementById('lang-menu');
    if (!switcher || !toggle || !menu) return;

    const items = [...menu.querySelectorAll('[role="menuitem"]')];

    function ac(odakla) {
      switcher.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      if (odakla) items[0]?.focus();
    }

    function kapat(odakToggle) {
      switcher.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (odakToggle) toggle.focus();
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (switcher.classList.contains('open')) kapat(false); else ac(false);
    });

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ac(true);
      }
    });

    menu.addEventListener('keydown', (e) => {
      const i = items.indexOf(document.activeElement);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          items[(i + 1) % items.length]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          items[(i - 1 + items.length) % items.length]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          items[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;
        case 'Escape':
          e.preventDefault();
          kapat(true);
          break;
        case 'Tab':
          kapat(false);
          break;
      }
    });

    document.addEventListener('click', (e) => {
      if (!switcher.contains(e.target)) kapat(false);
    });
  }

  function init() {
    apply(detect());
    initSwitcher();
  }

  return {
    init,
    apply,
    t: (key) => t(key),
    get current() { return current; }
  };
})();

document.addEventListener('DOMContentLoaded', NazayLang.init);
