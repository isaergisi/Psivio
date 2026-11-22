/* =====================================================================
   SİTE AYARLARI · yeni bir danışan için yalnızca bu dosyayı düzenle.

   - Metinlerde *yıldız arasındaki* kelimeler italik ve renkli görünür.
   - Boş bırakılan ("") isteğe bağlı alanlar sitede gizlenir.
   - Görseller img/ klasöründe durur; dosya adını burada değiştir.
   - Aşağıdaki kişi ve içerik ÖRNEKTİR (kurgusaldır).
   ===================================================================== */
window.SITE = {

  /* --- Kişi ---------------------------------------------------------- */
  kisi: {
    ad: "Defne",                       // "Merhaba, ben ..." kısmında kullanılır
    adSoyad: "Defne Aral",             // logo, başlık, alt bilgi
    unvan: "Psikolojik Danışman",
    simge: "Ψ",                        // logo içindeki işaret
    slogan: "psikoloji · farkındalık · gelişim",
    rozet: "Haftalık birebir seanslar", // giriş ekranının sağ altındaki kısa bilgi
  },

  /* --- Arama motoru ve sekme başlığı ---------------------------------- */
  seo: {
    baslik: "Defne Aral · Psikolojik Danışmanlık",
    aciklama: "Yetişkinler için psikolojik danışmanlık: online ya da yüz yüze, 50 dakikalık birebir seanslar. Kaygı, ilişkiler, sınırlar ve kendini tanıma.",
  },

  /* --- İletişim ------------------------------------------------------- */
  iletisim: {
    eposta: "merhaba@example.com",     // sitede görünen ve randevu taleplerinin gideceği adres
    instagram: "",                     // kullanıcı adı, @ olmadan (ör. "defnearal.psk"); boşsa gizlenir
    linkedin: "",                      // tam adres; boşsa gizlenir
    telefon: "",                       // ör. "+90 5xx xxx xx xx"; boşsa gizlenir
  },

  /* --- Giriş ekranı (hero) -------------------------------------------- */
  hero: {
    ust: "Psikolojik danışmanlık · Online ve yüz yüze",
    satirlar: ["Yetişkinler için", "psikolojik danışmanlık,", "*fark etmekle başlar.*"],
    metin: "Defne Aral ile **50 dakikalık** birebir seanslar. Kaygı, ilişkiler, sınırlar ve kendini tanıma üzerine; ekran başından ya da aynı odada.",
    gorsel: "img/hero-deniz.webp",
  },

  /* --- Hakkımda ------------------------------------------------------- */
  hakkimda: {
    baslik: "Merhaba, ben *Defne.*",
    giris: "Yetişkinlerle bireysel psikolojik danışmanlık çalışıyorum; seansların bir kısmını online, bir kısmını yüz yüze yapıyorum.",
    metin: "Seanslarda sana hazır cevaplar vermiyorum. Neyi, ne zaman ve neden yaşadığını birlikte görünür kılıyoruz. Bir şeyi fark ettiğin an, onunla ne yapacağına da sen karar verebiliyorsun.",
    bilgiler: [
      { etiket: "Seans süresi", deger: "50 dk" },
      { etiket: "Görüşme şekli", deger: "Online · Yüz yüze" },
      { etiket: "Sıklık", deger: "Haftada ya da iki haftada bir" },
    ],
    baglanti: "Tanışma görüşmesi planla",
    gorsel: "img/masa-notlar.webp",    // kendi portren için 4:5 oranında bir görsel önerilir
    gorselAlt: "Açık bir defter, dolma kalem ve gözlük duran ahşap masa",
  },

  /* --- Hizmetler (kart sayısı serbest; 4 kart en iyi görünür) --------- */
  hizmetler: {
    baslik: "Birlikte çalışabileceğimiz *konular*",
    aciklama: "Her başlık bir başlangıç noktası. İlk görüşmede senin için neyin öncelikli olduğunu birlikte belirleriz.",
    liste: [
      { ad: "Bireysel danışmanlık", metin: "Kendini tanıma, karar anları, değişen hayat dönemleri. Birebir ve düzenli seanslar.", gorsel: "img/iskele.webp", alt: "Dağların arasındaki durgun gölde iskelede oturan bir kişi" },
      { ad: "Kaygı ve stres", metin: "Sürekli tetikte olma hâli, geceye taşınan düşünceler, bedendeki gerginlik. Ne zaman yükseldiğini birlikte izleriz.", gorsel: "img/dag.webp", alt: "Sisli dağlara bakan, sırtı dönük oturan bir kişi" },
      { ad: "İlişkiler ve sınırlar", metin: "Hayır diyememek, tekrar eden ilişki örüntüleri, yakınlık ile mesafe arasındaki denge.", gorsel: "img/eller.webp", alt: "Birbirine uzanan iki el" },
      { ad: "Online seans", metin: "Hangi şehirde ya da ülkede olursan ol, görüntülü görüşmeyle aynı seans düzeni.", gorsel: "img/online.webp", alt: "Dizüstü bilgisayarda yazı yazan eller", sekil: "Online" },
    ],
  },

  /* --- Süreç (kaydırdıkça değişen adımlar; 3 adım önerilir) ----------- */
  surec: {
    baslik: "İlk adımdan *düzenli seanslara*",
    adimlar: [
      { ad: "Ön görüşme", metin: "Kısa bir tanışma. Ne için geldiğini konuşur, birlikte çalışmanın sana uyup uymadığına bakarız. Karar vermek için acele yok.", gorsel: "img/cay.webp" },
      { ad: "Odağı belirlemek", metin: "İlk seanslarda neyi değiştirmek istediğini netleştiririz. Hedefler benim değil, senin cümlelerinle yazılır.", gorsel: "img/defter.webp" },
      { ad: "Düzenli seanslar", metin: "Haftada ya da iki haftada bir buluşuruz. Seansta fark ettiklerini günlük hayatına taşıdığın kısım burası.", gorsel: "img/gunbatimi.webp" },
    ],
  },

  /* --- Alıntı (kaydırdıkça kelime kelime aydınlanır) ------------------ */
  alinti: {
    ust: "Alıntılar defterinden",
    metin: "“Yol düz bir çizgi değildir; bir spiraldir. Anladığını sandığın şeylere tekrar tekrar dönersin ve her seferinde daha derin gerçekler görürsün.”",
    sahibi: "Carl Jung",
    vurgu: ["spiraldir", "derin", "gerçekler"],   // renkli görünecek kelimeler
    gorsel: "img/mum.webp",
  },

  /* --- Yazılar ve notlar ---------------------------------------------- */
  yazilar: {
    baslik: "Yazılar ve *notlar*",
    aciklama: "Seanslarda sık duyduğum sorulardan doğan kısa yazılar ve notlar.",
    // Bir dergi köşesi ya da blog varsa doldur; url boşsa bu kart gizlenir.
    kose: {
      etiket: "Köşe yazısı",
      ad: "",                          // ör. "Dergi köşem" ya da "Blog"
      metin: "",
      url: "",
      gorsel: "img/kalem.webp",
    },
    // Kısa notlar (görsel üstünde tek cümle). Instagram varsa kartlar oraya bağlanır.
    notlar: [
      { metin: "*Yavaşlamak* da bir adımdır.", gorsel: "img/istanbul.webp", alt: "Denizden görünen bir şehir silueti" },
      { metin: "Duygular *misafirdir.*", gorsel: "img/galata.webp", alt: "Eski bir kule ve çevresindeki evler" },
      { metin: "Sınır koymak *kendine saygıdır.*", gorsel: "img/sahil.webp", alt: "Gün batımında sakin bir kumsal" },
      { metin: "Kendine *nazik* ol.", gorsel: "img/oda.webp", alt: "Bitkiler, lamba ve koltukla döşenmiş aydınlık bir oda" },
    ],
    // Yazı listesi. url verilirse kart tıklanabilir olur.
    liste: [
      { baslik: "Kaygıyla tartışmak yerine onu dinlemek", ozet: "Kaygı çoğu zaman bir alarm gibi çalışır. Onu susturmaya çalışmak yerine neyi haber verdiğine bakmak üzerine.", tarih: "2026-10-12", url: "" },
      { baslik: "Hayır demek neden bu kadar zor?", ozet: "Sınır koymanın suçluluk duygusuyla ilişkisi ve küçük adımlarla nasıl pratik edilebileceği.", tarih: "2026-09-03", url: "" },
      { baslik: "Danışmanlığa başlamadan önce bilmen gerekenler", ozet: "İlk seans, gizlilik, seans süresi ve beklentiler hakkında sık sorulan sorular.", tarih: "2026-08-18", url: "" },
    ],
  },

  /* --- Randevu formu -------------------------------------------------- */
  randevu: {
    baslik: "Randevu *oluştur*",
    aciklama: "Konuyu, günü ve saati seç; talebin doğrudan e-postama gelsin. 24 saat içinde dönüp randevunu onaylarım.",
    // Taleplerin gideceği adres (FormSubmit ile). Boşsa iletisim.eposta kullanılır.
    eposta: "",
    konular: ["Ön görüşme", "Bireysel danışmanlık", "Kaygı ve stres", "İlişkiler ve sınırlar", "Online seans"],
    sekiller: ["Online", "Yüz yüze"],
    seansDakika: 50,
    gunSayisi: 14,                     // kaç günlük takvim gösterilsin
    kapaliGunler: [0],                 // 0 = Pazar, 6 = Cumartesi
    saatler: {
      hafta: ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
      cumartesi: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    },
    enYakinSaat: 2,                    // bugünden en az kaç saat sonrası seçilebilsin
    onayMetni: "Bilgilerimin yalnızca randevu için kullanılmasını kabul ediyorum.",
    gorsel: "img/oda.webp",
  },

  /* --- Sık sorulan sorular -------------------------------------------- */
  sss: {
    baslik: "Sık sorulan *sorular*",
    aciklama: "Burada cevabını bulamadığın bir şey varsa bana yazabilirsin.",
    sorular: [
      { s: "Bir seans ne kadar sürer?", c: "50 dakika. Ön görüşme daha kısa tutulur; ihtiyaçlarını ve beklentilerini konuşmak için yeterli bir süredir." },
      { s: "Online seans nasıl yapılıyor?", c: "Randevun onaylandığında görüntülü görüşme bağlantısı e-postana gelir. Sessiz bir oda, kulaklık ve sabit bir internet bağlantısı yeterli." },
      { s: "Konuştuklarımız gizli kalır mı?", c: "Evet. Seanslarda konuşulanlar gizlidir. Yasal zorunluluklar ve can güvenliğinin risk altında olduğu durumlar bu kuralın tek istisnasıdır." },
      { s: "Randevumu nasıl iptal ederim?", c: "Randevundan en az 24 saat önce e-posta ile haber vermen yeterli; birlikte yeni bir zaman buluruz." },
      { s: "Ücret ne kadar?", c: "Ücret, görüşme şekline ve seans sıklığına göre değişir. Ön görüşmede net bilgiyi paylaşırım." },
      { s: "Acil bir durumdaysam ne yapmalıyım?", c: "Bu site ve randevu formu acil destek için uygun değildir. Kendine ya da bir başkasına zarar verme riski varsa hemen **112**'yi ara ya da en yakın acil servise başvur." },
    ],
  },

  /* --- Kapanış ve alt bilgi ------------------------------------------- */
  kapanis: {
    baslik: "Bir e-posta *uzaklıktayım.*",
    gorsel: "img/kapanis.webp",
  },
  altBilgi: {
    acil: "Acil bir durumda 112'yi ara. Bu site acil destek hizmeti vermez.",
    kredi: "Fotoğraflar: Unsplash",
  },
};
