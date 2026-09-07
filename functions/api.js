/**
 * NAZAY — Form API'si (ortak modül)
 * ---------------------------------------------------------------
 * Bu router iki yerde birden kullanılır:
 *   • functions/index.js  -> Firebase Cloud Functions (canlı)
 *   • server.js           -> yerelde test için Express sunucusu
 *
 * Böylece iş mantığı tek yerde durur, iki kopya arasında fark oluşmaz.
 *
 * Gerekli ortam değişkenleri (Firebase'de "secret" olarak tanımlanır):
 *   SMTP_USER  nazayistanbul@gmail.com
 *   SMTP_PASS  Google "Uygulama Şifresi" (normal Gmail şifresi DEĞİL)
 *   MAIL_TO    (isteğe bağlı, boşsa SMTP_USER kullanılır)
 *   DATABASE_URL (isteğe bağlı; tanımlıysa talepler Postgres'e de yazılır)
 */

'use strict';

const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

/* ============================================================
   E-posta
   ============================================================ */
const MAIL_TO = () => process.env.MAIL_TO || process.env.SMTP_USER;
const mailReady = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

let _transporter = null;
function getTransporter() {
    if (!mailReady()) return null;
    if (!_transporter) {
        _transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT || 465),
            secure: String(process.env.SMTP_SECURE || 'true') === 'true',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });
    }
    return _transporter;
}

function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

async function sendNotificationMail(subject, fields, replyTo) {
    const transporter = getTransporter();
    if (!transporter) {
        console.warn('SMTP tanımlı değil, e-posta gönderilmedi:', subject);
        return false;
    }

    const rows = Object.entries(fields).map(([label, value]) => `
        <tr>
          <td style="padding:8px 14px;border-bottom:1px solid #eee;color:#666;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #eee;color:#111;"><strong>${escapeHtml(value) || '—'}</strong></td>
        </tr>`).join('');

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;">
        <h2 style="color:#CC0000;margin:0 0 6px;">${escapeHtml(subject)}</h2>
        <p style="color:#777;font-size:13px;margin:0 0 18px;">
          nazay.com üzerinden ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })} tarihinde gönderildi.
        </p>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>
      </div>`;

    await transporter.sendMail({
        from: `"Nazay Web Sitesi" <${process.env.SMTP_USER}>`,
        to: MAIL_TO(),
        replyTo: replyTo || undefined,
        subject,
        html
    });
    return true;
}

/* ============================================================
   Veritabanı — YALNIZCA DATABASE_URL tanımlıysa devreye girer.
   Tanımlı değilse 'pg' modülü hiç yüklenmez (soğuk başlangıç hızlı kalır).
   ============================================================ */
let _pool = null;
let _poolReady = null;

function getPool() {
    if (!process.env.DATABASE_URL) return null;
    if (_pool) return _pool;

    const { Pool } = require('pg');
    _pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    _poolReady = Promise.all([
        _pool.query(`CREATE TABLE IF NOT EXISTS inquiries (
            id SERIAL PRIMARY KEY, event_type VARCHAR(255), guest_count VARCHAR(255),
            catering_pref VARCHAR(255), event_date VARCHAR(255), client_name VARCHAR(255),
            client_phone VARCHAR(255), client_notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`),
        _pool.query(`CREATE TABLE IF NOT EXISTS translation_quotes (
            id SERIAL PRIMARY KEY, doc_type VARCHAR(255), source_lang VARCHAR(255),
            target_lang VARCHAR(255), page_count VARCHAR(255), urgency VARCHAR(255),
            notarized VARCHAR(255), client_name VARCHAR(255), client_phone VARCHAR(255),
            client_email VARCHAR(255), client_notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`)
    ]).catch(err => console.error('Tablo oluşturma hatası:', err));

    return _pool;
}

async function saveToDb(sql, values) {
    const pool = getPool();
    if (!pool) return false;
    try {
        await _poolReady;
        await pool.query(sql, values);
        return true;
    } catch (err) {
        console.error('Veritabanına yazılamadı:', err);
        return false;   // e-posta gönderimini engellemesin
    }
}

/* ============================================================
   Bahçe — rezervasyon talebi
   ============================================================ */
router.post('/inquiries', async (req, res) => {
    try {
        const { eventType, guestCount, cateringPref, eventDate,
                clientName, clientPhone, clientNotes } = req.body || {};

        await saveToDb(
            `INSERT INTO inquiries
             (event_type, guest_count, catering_pref, event_date, client_name, client_phone, client_notes)
             VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [eventType, guestCount, cateringPref, eventDate, clientName, clientPhone, clientNotes]
        );

        await sendNotificationMail('Yeni Rezervasyon Talebi — Nazay Bahçe', {
            'Ad Soyad':      clientName,
            'Telefon':       clientPhone,
            'Etkinlik Türü': eventType,
            'Kişi Sayısı':   guestCount,
            'İkram Tercihi': cateringPref,
            'Tahmini Tarih': eventDate,
            'Notlar':        clientNotes
        });

        res.status(200).json({ success: true, message: 'Inquiry received' });
    } catch (error) {
        console.error('Rezervasyon talebi işlenemedi:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

/* ============================================================
   Tercüme — teklif talebi
   ============================================================ */
router.post('/translation-quotes', async (req, res) => {
    try {
        const { docType, sourceLang, targetLang, pageCount, urgency,
                notarized, clientName, clientPhone, clientEmail, clientNotes } = req.body || {};

        if (!clientName || !clientPhone) {
            return res.status(400).json({ success: false, error: 'Ad ve telefon zorunludur.' });
        }

        await saveToDb(
            `INSERT INTO translation_quotes
             (doc_type, source_lang, target_lang, page_count, urgency,
              notarized, client_name, client_phone, client_email, client_notes)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [docType, sourceLang, targetLang, pageCount, urgency,
             notarized, clientName, clientPhone, clientEmail, clientNotes]
        );

        await sendNotificationMail('Yeni Teklif Talebi — Nazay Tercüme', {
            'Ad Soyad':     clientName,
            'Telefon':      clientPhone,
            'E-posta':      clientEmail,
            'Belge Türü':   docType,
            'Dil Çifti':    `${sourceLang || '?'} → ${targetLang || '?'}`,
            'Sayfa Sayısı': pageCount,
            'Teslim':       urgency,
            'Noter Onayı':  notarized,
            'Notlar':       clientNotes
        }, clientEmail);

        res.status(200).json({ success: true, message: 'Quote request received' });
    } catch (error) {
        console.error('Teklif talebi işlenemedi:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

module.exports = router;
