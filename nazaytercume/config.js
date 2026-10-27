/**
 * NAZAY TERCÜME — Site Ayarları
 * ------------------------------------------------------------------
 * Tüm sayfalar bu dosyadan beslenir. Değer boş bırakıldığında ilgili
 * özellik sessizce kapanır; site hata vermez.
 *
 * gaMeasurementId : Google Analytics 4 ölçüm kimliği ("G-" ile başlar).
 *                   Boşken hiçbir analitik isteği gönderilmez.
 * formEndpoint    : Teklif formunun POST edileceği adres. Varsayılan
 *                   değer projedeki mevcut uç noktadır (functions/api.js);
 *                   talep Postgres'e yazılır ve e-posta ile bildirilir.
 *                   Boşaltılırsa form hazırlanmış WhatsApp mesajına düşer.
 * maxUploadMb     : Belge eklerinin toplam üst sınırı (MB). Sunucu tarafı
 *                   da aynı sınırı uygular; yalnızca ikisini birlikte
 *                   değiştirin.
 */

'use strict';

window.NAZAY_CONFIG = {
  gaMeasurementId: '',
  formEndpoint: '/api/translation-quotes',
  maxUploadFiles: 5,
  maxUploadMb: 8,
  whatsappNumber: '905436439897',
  contactEmail: 'nazayistanbul@gmail.com'
};
