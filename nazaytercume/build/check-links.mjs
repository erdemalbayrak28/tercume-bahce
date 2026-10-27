/**
 * Site içi bağlantı denetimi.
 *
 * Depodaki tüm HTML dosyalarını tarar; göreli href/src değerlerinin
 * karşılığında gerçek bir dosya olup olmadığını ve sayfa içi #çapa
 * hedeflerinin bulunup bulunmadığını kontrol eder.
 *
 * Dış bağlantılara (http, mailto, tel) dokunmaz; ağ isteği yapmaz.
 *
 * Çalıştırma:  npm run check:links
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEPO = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ATLA = new Set(['node_modules', '.git', 'functions', 'portfolio-video']);

async function htmlDosyalari(dizin) {
  const sonuc = [];
  for (const giris of await readdir(dizin, { withFileTypes: true })) {
    if (giris.name.startsWith('.') || ATLA.has(giris.name)) continue;
    const tam = join(dizin, giris.name);
    if (giris.isDirectory()) sonuc.push(...await htmlDosyalari(tam));
    else if (giris.name.endsWith('.html')) sonuc.push(tam);
  }
  return sonuc;
}

const varMi = async (yol) => {
  try { await stat(yol); return true; } catch { return false; }
};

const dosyalar = await htmlDosyalari(DEPO);
const hatalar = [];

for (const dosya of dosyalar) {
  // Yorum satırları örnek/yer tutucu yollar içerebilir; taramadan çıkarılır.
  const html = (await readFile(dosya, 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
  const kimlikler = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));

  for (const eslesme of html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/g)) {
    const hedef = eslesme[1].trim();

    if (!hedef || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(hedef)) continue;

    if (hedef.startsWith('#')) {
      const capa = hedef.slice(1);
      if (capa && !kimlikler.has(capa)) {
        hatalar.push(`${relative(DEPO, dosya)} → ${hedef} (sayfada böyle bir id yok)`);
      }
      continue;
    }

    const [yolKismi] = hedef.split('#');
    if (!yolKismi) continue;

    const temel = yolKismi.startsWith('/') ? DEPO : dirname(dosya);
    const mutlak = resolve(temel, yolKismi.replace(/^\//, '').split('?')[0]);
    const aday = yolKismi.endsWith('/') ? join(mutlak, 'index.html') : mutlak;

    if (!await varMi(aday)) {
      hatalar.push(`${relative(DEPO, dosya)} → ${hedef} (dosya yok)`);
    }
  }
}

console.log(`${dosyalar.length} HTML dosyası tarandı.`);

if (hatalar.length) {
  console.error(`\n${hatalar.length} kırık bağlantı:`);
  for (const hata of hatalar) console.error(`  • ${hata}`);
  process.exitCode = 1;
} else {
  console.log('Kırık bağlantı yok.');
}
