/**
 * Firebase Cloud Functions giriş noktası.
 *
 * Firebase Hosting'e gelen /api/** istekleri buraya yönlendirilir
 * (bkz. firebase.json -> hosting.rewrites).
 *
 * Statik dosyalar (HTML, CSS, görsel, video) buraya HİÇ uğramaz;
 * onları Hosting kendi CDN'inden dağıtır. Bu fonksiyon yalnızca
 * iki form isteğini karşılar.
 */

'use strict';

const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const express = require('express');

const api = require('./api');

// Kimlik bilgileri Secret Manager'da tutulur, koda veya ortam
// dosyasına yazılmaz. Tanımlamak için:
//   firebase functions:secrets:set SMTP_USER
//   firebase functions:secrets:set SMTP_PASS
const SMTP_USER = defineSecret('SMTP_USER');
const SMTP_PASS = defineSecret('SMTP_PASS');

const app = express();
// Belge ekleri JSON gövdesinde base64 olarak taşınır; varsayılan 100 kb
// sınırı yetersizdir. Üst sınır functions/api.js'teki MAX_TOTAL_BYTES ile
// uyumlu tutulmalıdır (base64 yaklaşık %33 şişirir).
app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true, limit: '12mb' }));

// Hosting yönlendirmesi yolu koruduğu için router /api altına bağlanır
app.use('/api', api);

exports.api = onRequest(
    {
        region: 'europe-west1',      // Türkiye'ye en yakın bölgelerden
        secrets: [SMTP_USER, SMTP_PASS],
        memory: '512MiB',      // base64 belge ekleri bellekte çözülür
        timeoutSeconds: 30,
        maxInstances: 10,            // beklenmedik trafikte maliyet tavanı
        cors: false                  // aynı alan adından geldiği için gerekmiyor
    },
    app
);
