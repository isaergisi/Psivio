# Psivio · Psikolojik danışmanlık sitesi şablonu

Psikolog, psikolojik danışman ve terapistler için tek sayfalık, sinematik kişisel web sitesi şablonu.
Hizmetler, randevu formu, yazılar, SSS ve iletişim bölümleri içerir.
Saf HTML, CSS ve JavaScript ile yazıldı; derleme adımı yok, GitHub Pages'te olduğu gibi çalışır.

Sitedeki kişi (**Defne Aral**) ve içerik kurgusal bir örnektir.

## Yeni bir danışan için siteyi hazırlama

1. **`site.config.js`** dosyasını aç ve doldur: isim, unvan, e-posta, Instagram, hizmetler, süreç adımları, alıntı, yazılar, SSS, randevu saatleri. Dosyadaki her alanın yanında açıklaması var.
   - `*yıldız arasındaki*` kelimeler italik ve renkli, `**çift yıldız**` kalın görünür.
   - Boş bırakılan isteğe bağlı alanlar (Instagram, LinkedIn, telefon, köşe yazısı, yazı bağlantıları) sitede otomatik gizlenir.
2. **Fotoğrafları** `img/` klasörüne koy ve `site.config.js` içindeki dosya adlarını güncelle. Hakkımda bölümü için danışanın kendi portresi (4:5 oranında) önerilir.
3. **Paylaşım önizlemesi:** `index.html` başındaki `og:title`, `og:description` satırlarını ve `img/share.jpg` görselini (1200×630) danışana göre güncelle. WhatsApp ve Instagram önizlemeleri JavaScript çalıştırmadığı için bu kısım ayar dosyasından okunamaz.
4. İstersen `favicon.svg` içindeki Ψ işaretini ve `css/style.css` başındaki renkleri (`:root`) değiştir.

## Dosyalar

```
site.config.js    Tüm içerik ve ayarlar (yalnızca bunu düzenlemen yeterli)
index.html        Sayfa iskeleti
css/style.css     Tasarım ve renkler
js/render.js      Ayar dosyasındaki içeriği sayfaya yerleştirir
js/main.js        Geçişler, menü, kaydırma efektleri, randevu formu
img/              Fotoğraflar ve paylaşım görseli
favicon.svg       Sekme simgesi
```

## Yerelde çalıştırma

```bash
python -m http.server 8000
```

Ardından tarayıcıda `http://localhost:8000` adresini aç. (Windows'ta `python`, macOS ve Linux'ta `python3`.)

## Yayına alma (GitHub Pages)

**Settings → Pages** sayfasında kaynak olarak `Deploy from a branch`, dal olarak `main` ve klasör olarak `/ (root)` seç.
Her danışan için ayrı bir repo açıp bu şablonu kopyalamak en temiz yöntemdir. Danışanın kendi alan adı varsa Pages ayarlarındaki **Custom domain** alanına yazılabilir.

## Randevu formu

Form, talepleri [FormSubmit](https://formsubmit.co) aracılığıyla `site.config.js` içindeki e-posta adresine gönderir; sunucu gerekmez.

- Örnek adres (`merhaba@example.com`) gerçek değildir; yayına almadan önce danışanın adresini yaz.
- **İlk talepten sonra** FormSubmit bu adrese bir *etkinleştirme e-postası* gönderir. İçindeki bağlantıya bir kez tıklamak gerekir; sonrasında tüm talepler doğrudan gelir.
- Gönderim başarısız olursa ziyaretçiye bilgileri hazır doldurulmuş bir e-posta bağlantısı gösterilir.
- Başarılı talepten sonra ziyaretçi randevuyu `.ics` dosyası olarak takvimine ekleyebilir.
- Gün sayısı, kapalı günler, saatler ve seans süresi `site.config.js` → `randevu` altında ayarlanır.

Bu form gerçek müsaitlik takibi yapmaz; aynı saate iki talep gelebilir ve onay e-postayla elle verilir.

## Fotoğraflar

Şablondaki fotoğraflar Unsplash'ten alınmıştır ve temsilîdir.
