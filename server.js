/**
 * YEREL GELİŞTİRME SUNUCUSU
 * ---------------------------------------------------------------
 * Canlıda site Firebase Hosting + Cloud Functions üzerinde çalışır
 * (bkz. firebase.json). Bu dosya yalnızca siteyi kendi bilgisayarınızda
 * tek parça hâlinde çalıştırmak içindir:
 *
 *     node server.js         ->  http://localhost:3000
 *
 * Form uç noktalarının iş mantığı functions/api.js içinde durur;
 * burada da orası kullanılır, böylece yerelde test ettiğiniz kod
 * canlıda çalışan kodun aynısıdır.
 */

'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const api = require('./functions/api');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Form uç noktaları — Firebase'deki yönlendirmeyle aynı yol
app.use('/api', api);

// Statik dosyalar (canlıda bu işi Firebase Hosting'in CDN'i yapar):
//   /nazay/index.html        -> Nazay Tercüme
//   /nazay-bahce/index.html  -> Nazay Bahçe
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Yerel sunucu çalışıyor: http://localhost:${port}`);
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('UYARI: SMTP_USER / SMTP_PASS tanımlı değil — formlar e-posta göndermez.');
    }
});
