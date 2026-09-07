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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Hosting yönlendirmesi yolu koruduğu için router /api altına bağlanır
app.use('/api', api);

exports.api = onRequest(
    {
        region: 'europe-west1',      // Türkiye'ye en yakın bölgelerden
        secrets: [SMTP_USER, SMTP_PASS],
        memory: '256MiB',
        timeoutSeconds: 30,
        maxInstances: 10,            // beklenmedik trafikte maliyet tavanı
        cors: false                  // aynı alan adından geldiği için gerekmiyor
    },
    app
);
