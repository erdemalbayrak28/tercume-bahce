/**
 * NAZAY TERCÜME — Dil sayfası üreteci
 * ==================================================================
 * Türkçe index.html tek kaynaktır. Bu betik ondan /en/ ve /ar/
 * altındaki gerçek statik sayfaları üretir.
 *
 * Neden: dili yalnızca tarayıcıda değiştirmek, arama motorlarının
 * üç sürümü ayrı sayfa olarak indekslemesini engeller. Her dilin
 * kendi URL'i, kendi canonical'ı ve kendi başlık/açıklaması olmalıdır.
 *
 * Çalıştırma:
 *     node build/build-pages.mjs
 *
 * index.html veya i18n.js değiştiğinde yeniden çalıştırın.
 * Üretilen dosyalar elle düzenlenmemelidir; üzerine yazılır.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK       = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE      = 'https://nazay.com.tr/nazaytercume';
const DILLER    = ['en', 'ar'];
const RTL       = new Set(['ar']);
const OG_LOCALE = { tr: 'tr_TR', en: 'en_US', ar: 'ar_AR' };

/* ==================================================================
   Sözlüğü i18n.js içinden oku
   ------------------------------------------------------------------
   Sözlük tarayıcıda da kullanıldığı için ayrı bir JSON kopyası
   tutulmaz; tek kaynak i18n.js'tir. İşaretler arası bölüm okunur.
   ================================================================== */
async function sozlukleriOku() {
  const kaynak = await readFile(resolve(KOK, 'i18n.js'), 'utf8');
  const bas = kaynak.indexOf('/* I18N_DATA_START');
  const son = kaynak.indexOf('/* I18N_DATA_END */');

  if (bas === -1 || son === -1) {
    throw new Error('i18n.js içinde I18N_DATA_START / I18N_DATA_END işaretleri bulunamadı.');
  }

  const govde = kaynak.slice(kaynak.indexOf('{', bas), kaynak.lastIndexOf('}', son) + 1);
  return new Function(`return (${govde});`)();
}

/* ==================================================================
   HTML yardımcıları
   ================================================================== */
const HTML_KACIS = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const kacir = (s) => String(s).replace(/[&<>"]/g, (c) => HTML_KACIS[c]);

/** Öznitelik değerini değiştirir: <meta name="x" content="..."> gibi. */
function ozniteligiDegistir(html, secici, oznitelik, deger) {
  const kalip = new RegExp(`(<[^>]*${secici}[^>]*\\b${oznitelik}=")([^"]*)(")`, 'i');
  if (!kalip.test(html)) throw new Error(`Öznitelik bulunamadı: ${secici} / ${oznitelik}`);
  return html.replace(kalip, `$1${kacir(deger)}$3`);
}

/**
 * data-i18n / data-i18n-html taşıyan elemanların içeriğini değiştirir.
 * Eleman içinde kendisiyle aynı etikette iç içe düğüm bulunmaz; bu yüzden
 * tembel eşleme güvenlidir. Sözlükte karşılığı olmayan anahtar sessizce
 * geçilmez, rapor edilir.
 */
function metinleriUygula(html, sozluk, eksikler) {
  const uygula = (girdi, oznitelik, kacisUygula) =>
    girdi.replace(
      new RegExp(`(<([a-zA-Z0-9]+)\\b[^>]*\\b${oznitelik}="([^"]+)"[^>]*>)([\\s\\S]*?)(</\\2>)`, 'g'),
      (tam, acilis, _etiket, anahtar, _icerik, kapanis) => {
        const deger = sozluk[anahtar];
        if (deger === undefined) {
          eksikler.add(anahtar);
          return tam;
        }
        return acilis + (kacisUygula ? kacir(deger) : deger) + kapanis;
      }
    );

  let cikti = uygula(html, 'data-i18n', true);
  cikti = uygula(cikti, 'data-i18n-html', false);

  // data-i18n-attr="placeholder:anahtar;title:anahtar2"
  cikti = cikti.replace(/<[^>]*\bdata-i18n-attr="([^"]+)"[^>]*>/g, (etiket, kurallar) => {
    let sonuc = etiket;
    for (const kural of kurallar.split(';')) {
      const [oznitelik, anahtar] = kural.split(':').map((s) => s && s.trim());
      if (!oznitelik || !anahtar) continue;
      const deger = sozluk[anahtar];
      if (deger === undefined) { eksikler.add(anahtar); continue; }
      sonuc = sonuc.replace(
        new RegExp(`\\b${oznitelik}="[^"]*"`),
        `${oznitelik}="${kacir(deger)}"`
      );
    }
    return sonuc;
  });

  return cikti;
}

/* ==================================================================
   Göreli yolları bir klasör aşağı taşı
   ================================================================== */
function yollariTasi(html) {
  const tasinacak = [
    'assets/', 'styles.css', 'config.js', 'i18n.js', 'app.js', 'kvkk.html', 'hizmetler/'
  ];

  return html.replace(/\b(src|href)="([^"#:][^":]*?)"/g, (tam, oznitelik, yol) => {
    if (/^(https?:|mailto:|tel:|\/|#)/.test(yol)) return tam;

    // Zaten bir üst dizine çıkan bağlantılar (grup ana sayfası, nazaybahce)
    // dil klasöründen bir seviye daha yukarı çıkmalıdır.
    if (yol.startsWith('../')) return `${oznitelik}="../${yol}"`;

    if (!tasinacak.some((p) => yol.startsWith(p))) return tam;
    return `${oznitelik}="../${yol}"`;
  }).replace(/\bsrcset="([^"#:][^":]*?)"/g, (tam, yol) =>
    yol.startsWith('assets/') ? `srcset="../${yol}"` : tam
  );
}

/* ==================================================================
   SSS yapısal verisi — görünen metinle birebir aynı olmak zorunda
   ================================================================== */
function sssYapisalVerisi(sozluk) {
  const sorular = [];
  for (let i = 1; sozluk[`faq.q${i}`]; i++) {
    sorular.push({
      '@type': 'Question',
      name: sozluk[`faq.q${i}`],
      acceptedAnswer: { '@type': 'Answer', text: sozluk[`faq.a${i}`] }
    });
  }
  return JSON.stringify(
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: sorular },
    null,
    2
  );
}

/**
 * FAQPage içeren JSON-LD bloğunu yenisiyle değiştirir.
 * Bloklar tek tek gezilir; tek bir açgözlü kalıp kullanılsaydı
 * önceki işletme bloğu da yutulurdu.
 */
function sssBlogunuDegistir(html, yeniJson) {
  let bulundu = false;

  const sonuc = html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (tam, govde) => {
      if (bulundu || !govde.includes('"FAQPage"')) return tam;
      bulundu = true;
      return `<script type="application/ld+json">\n${yeniJson}\n  </script>`;
    }
  );

  if (!bulundu) throw new Error('FAQPage JSON-LD bloğu bulunamadı.');
  return sonuc;
}

/* ==================================================================
   Dil seçici — her sayfada kendi diline göre yeniden yazılır
   ================================================================== */
function dilSeciciyiYaz(html, dil) {
  const hedefler = {
    tr: dil === 'tr' ? 'index.html' : '../index.html',
    en: dil === 'en' ? 'index.html' : (dil === 'tr' ? 'en/index.html' : '../en/index.html'),
    ar: dil === 'ar' ? 'index.html' : (dil === 'tr' ? 'ar/index.html' : '../ar/index.html')
  };

  return html.replace(
    /(<a role="menuitem" href=")([^"]*)("[^>]*\bdata-lang="(tr|en|ar)")([^>]*)(>)/g,
    (_tam, bas, _eskiYol, orta, kod, kuyruk, kapanis) => {
      const guncel = kuyruk.replace(/\s*aria-current="[^"]*"/, '');
      const isaret = kod === dil ? ' aria-current="true"' : '';
      return `${bas}${hedefler[kod]}${orta}${guncel}${isaret}${kapanis}`;
    }
  );
}

/* ==================================================================
   Tek bir dil sayfası üret
   ================================================================== */
function sayfaUret(kaynakHtml, dil, sozluk, eksikler) {
  let html = kaynakHtml;

  html = metinleriUygula(html, sozluk, eksikler);
  html = yollariTasi(html);
  html = dilSeciciyiYaz(html, dil);

  // <html lang dir>
  html = html.replace(/<html[^>]*>/i, `<html lang="${dil}"${RTL.has(dil) ? ' dir="rtl"' : ''}>`);

  // Başlık ve açıklama
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${kacir(sozluk['meta.title'])}</title>`);
  html = ozniteligiDegistir(html, 'name="description"', 'content', sozluk['meta.description']);

  // Kanonik adres: her dil kendini gösterir
  html = ozniteligiDegistir(html, 'rel="canonical"', 'href', `${SITE}/${dil}/`);
  html = ozniteligiDegistir(html, 'property="og:url"', 'content', `${SITE}/${dil}/`);
  html = ozniteligiDegistir(html, 'property="og:locale"', 'content', OG_LOCALE[dil]);
  html = ozniteligiDegistir(html, 'property="og:title"', 'content', sozluk['meta.title']);
  html = ozniteligiDegistir(html, 'property="og:description"', 'content', sozluk['meta.description']);
  html = ozniteligiDegistir(html, 'name="twitter:title"', 'content', sozluk['meta.title']);
  html = ozniteligiDegistir(html, 'name="twitter:description"', 'content', sozluk['meta.description']);

  // İşletme yapısal verisinde sayfa adresi
  html = html.replace(`"url": "${SITE}/"`, `"url": "${SITE}/${dil}/"`);

  // SSS yapısal verisi görünen metinle aynı dilde olmalı
  html = sssBlogunuDegistir(html, sssYapisalVerisi(sozluk));

  // Belge türü kartları Türkçe alt sayfalara gider; bu diller için
  // kullanıcıyı dilinden çıkarmamak adına teklif formuna yönlendirilir.
  html = html.replace(/href="\.\.\/hizmetler\/[a-z-]+\.html"/g, 'href="#teklif"');

  const uyari = `<!--
  BU DOSYA ÜRETİLMİŞTİR — ELLE DÜZENLEMEYİN.
  Kaynak: nazaytercume/index.html + nazaytercume/i18n.js
  Yeniden üretmek için: node build/build-pages.mjs
-->
`;

  return html.replace(/^<!DOCTYPE html>\s*/i, `<!DOCTYPE html>\n${uyari}`);
}

/* ==================================================================
   Ana akış
   ================================================================== */
const sozlukler = await sozlukleriOku();
const kaynak    = await readFile(resolve(KOK, 'index.html'), 'utf8');
const eksikler  = new Set();

for (const dil of DILLER) {
  const sozluk = sozlukler[dil];
  if (!sozluk) throw new Error(`i18n.js içinde "${dil}" sözlüğü yok.`);

  const hedefDizin = resolve(KOK, dil);
  await mkdir(hedefDizin, { recursive: true });
  await writeFile(resolve(hedefDizin, 'index.html'), sayfaUret(kaynak, dil, sozluk, eksikler), 'utf8');
  console.log(`✓ ${dil}/index.html üretildi`);
}

if (eksikler.size) {
  console.warn('\nUYARI — sözlükte karşılığı olmayan anahtarlar (Türkçe metin korundu):');
  for (const anahtar of [...eksikler].sort()) console.warn(`  • ${anahtar}`);
  process.exitCode = 1;
}
