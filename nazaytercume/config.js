/**
 * NAZAY TERCÜME — Site Ayarları
 * ------------------------------------------------------------------
 * Tüm sayfalar bu dosyadan beslenir. Değer boş bırakıldığında ilgili
 * özellik sessizce kapanır; site hata vermez.
 *
 * gaMeasurementId : Google Analytics 4 ölçüm kimliği ("G-" ile başlar).
 *                   Boşken hiçbir analitik isteği gönderilmez.
 * formEndpoint    : Teklif formunun POST edileceği adres.
 *
 *                   ŞU AN BİLEREK BOŞ. Uç nokta (functions/api.js) yazılmış ve
 *                   deploy edilmiş durumda, ancak Cloud Functions v2 faturalandırma
 *                   gerektirir; proje Spark planındayken /api/** istekleri 503 döner.
 *                   Dolu bırakılsaydı kullanıcı formu gönderince önce hata görürdü.
 *
 *                   Blaze planına geçildikten ve "firebase deploy --only functions"
 *                   çalıştırıldıktan sonra aşağıdaki değeri şu hâle getirin:
 *                       formEndpoint: '/api/translation-quotes'
 *                   Böylece talepler Postgres'e yazılır, e-posta ile bildirilir ve
 *                   belge yükleme alanı görünür olur.
 *
 *                   Boş kaldığı sürece form, hazırlanmış WhatsApp mesajına düşer.
 * maxUploadMb     : Belge eklerinin toplam üst sınırı (MB). Sunucu tarafı
 *                   da aynı sınırı uygular; yalnızca ikisini birlikte
 *                   değiştirin.
 */

'use strict';

window.NAZAY_CONFIG = {
  gaMeasurementId: '',
  formEndpoint: '',
  maxUploadFiles: 5,
  maxUploadMb: 8,
  whatsappNumber: '905436439897',
  contactEmail: 'nazayistanbul@gmail.com'
};
