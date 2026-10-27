/**
 * Alt sayfa üreteci.
 *
 * build/content/*.mjs içindeki her sayfa tanımını şablondan geçirip
 * hizmetler/ altına yazar. İçerik dosyaları tek kaynaktır; üretilen
 * HTML elle düzenlenmemelidir.
 *
 * Çalıştırma:  node build/build-detail-pages.mjs
 */

import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

import { sayfaOlustur } from './detail-template.mjs';

const KOK     = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ICERIK  = resolve(KOK, 'build', 'content');
const HEDEF   = resolve(KOK, 'hizmetler');

const ZORUNLU = ['slug', 'metaTitle', 'metaDescription', 'h1', 'heroSub', 'breadcrumb',
                 'service', 'waText', 'intro', 'body', 'sidebar'];

await mkdir(HEDEF, { recursive: true });

const dosyalar = (await readdir(ICERIK)).filter((d) => d.endsWith('.mjs')).sort();
if (!dosyalar.length) throw new Error('build/content altında sayfa tanımı bulunamadı.');

const slugler = new Set();

for (const dosya of dosyalar) {
  const { default: sayfa } = await import(pathToFileURL(resolve(ICERIK, dosya)).href);

  for (const alan of ZORUNLU) {
    if (sayfa[alan] == null) throw new Error(`${dosya}: "${alan}" alanı eksik.`);
  }
  if (sayfa.slug !== dosya.replace(/\.mjs$/, '')) {
    throw new Error(`${dosya}: slug dosya adıyla uyuşmuyor ("${sayfa.slug}").`);
  }
  if (slugler.has(sayfa.slug)) throw new Error(`Yinelenen slug: ${sayfa.slug}`);
  slugler.add(sayfa.slug);

  await writeFile(resolve(HEDEF, `${sayfa.slug}.html`), sayfaOlustur(sayfa), 'utf8');
  console.log(`✓ hizmetler/${sayfa.slug}.html`);
}

console.log(`\n${slugler.size} sayfa üretildi.`);
