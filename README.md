# Anka West Skincare Web

Anka West Skincare için Next.js 16 tabanlı tanıtım sayfası ve güvenli yönetim panelidir. Ana sayfa marka logosuyla hazırlanıyor durumunu gösterir; ürün, kategori, site içeriği ve panel kullanıcı yönetimi `/admin` altında yer alır.

## Gereksinimler

- Node.js 20.9 veya üzeri
- Çalışan Anka West API servisi
- Skincare veritabanı migration ve seed işlemlerinin tamamlanmış olması

## Kurulum

Ortam dosyalarını tek şablondan oluşturun:

```powershell
Copy-Item .env.example .env.development
Copy-Item .env.example .env.production
```

Geliştirme API adresini `.env.development`, canlı API adresini
`.env.production` içinde düzenleyin. `.env.example` yerel geliştirme adresini
örnek olarak içerir; production dosyasında bunu gerçek API adresiyle değiştirin.

Bu projede `.env.local` kullanmayın; Next.js yükleme sırasında bu dosyaya mod
dosyalarından daha yüksek öncelik verir ve development/production ayrımını
ezebilir.

Geliştirme örneği:

```env
ANKAWEST_SKINCARE_API_BASE_URL=http://localhost:4000/api/ankawest-skincare/v1
```

Ardından bağımlılıkları kurup geliştirme sunucusunu başlatın:

```powershell
npm install
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3001](http://localhost:3001) adresinde açılır. Yönetim girişi `/admin/login` rotasındadır. Ana AnkaWest web projesi için `3000` portu boş bırakılır.

## Komutlar

```powershell
npm run dev
npm run lint
npm run build
npm run start
```

- `npm run dev`, `.env.development` dosyasını yükler.
- `npm run build` ve `npm start`, `.env.production` dosyasını yükler.
- `.env.production` değiştirildikten sonra production çıktısını yeniden
  oluşturmak için `npm run build` komutunu tekrar çalıştırın.

## Yönetim paneli

- E-posta ve şifre girişinden sonra TOTP kurulum veya doğrulama akışı
- URL fragment içindeki tek kullanımlık token ile şifre sıfırlama
- Ürün listeleme, filtreleme, yayınlama, düzenleme ve görsel yönetimi
- Kategori ve site içeriği yönetimi
- Yalnızca `admin` rolüne açık kullanıcı, rol, erişim durumu ve TOTP sıfırlama işlemleri

Tarayıcı doğrudan API erişim tokenı tutmaz. Kısa ömürlü giriş doğrulama tokenı ve oturum tokenı ayrı `HttpOnly`, `SameSite=Strict` cookie alanlarında saklanır. Yönetim istekleri izin listeli Next.js Route Handler üzerinden API servisine iletilir. Korunan sayfalar gerçek oturum doğrulamasını sunucu tarafındaki `/auth/me` çağrısıyla yapar.

## Üretim notları

- `ANKAWEST_SKINCARE_API_BASE_URL` değerini üretim API adresine ayarlayın.
- HTTPS altında oturum cookie alanları otomatik olarak `Secure` işaretlenir.
- API CORS ve parola sıfırlama URL ayarlarına web uygulamasının üretim adresini ekleyin.
- Dağıtımdan önce `npm run lint` ve `npm run build` komutlarını çalıştırın.
