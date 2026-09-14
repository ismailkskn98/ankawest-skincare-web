# Anka West Admin Design System

Bu dosya admin paneli ve yönetim kimlik doğrulama ekranları için görsel kaynak noktasıdır.

## Tasarım yönü

- Ürün: skincare e-ticaret içerik ve katalog yönetimi
- Referans: Vercel Geist yaklaşımındaki sakin yoğunluk, ince sınırlar ve açık hiyerarşi
- Karakter: klinik görünmeden temiz; tüketici vitrini gibi görünmeden markaya ait
- Yoğunluk: 8/10
- Hareket: 2/10; yalnızca durum değişimi ve açılır yüzey geri bildirimleri

## Renkler

| Rol | Değer | Token |
|---|---:|---|
| Mürekkep | `#181816` | `--foreground` |
| Kağıt | `#FCFCFA` | `--surface` |
| Tuval | `#F4F4F1` | `--background` |
| İnce çizgi | `#E4E4DF` | `--border` |
| Adaçayı | `#49675A` | `--accent` |
| Adaçayı yüzey | `#EEF3F0` | `--accent-soft` |
| Hata | `#B42318` | `--danger` |

Renk tek başına durum anlatmaz; durumlarda metin veya ikon da kullanılır.

## Tipografi

- Ana aile: projede yerel bulunan PP Mori.
- Teknik ikincil bilgiler: PP Mori, daha küçük boyut ve orta ağırlık.
- Başlıklar kısa, soldan hizalı ve sıkı harf aralıklı.
- Form etiketleri görünürdür; placeholder etiket yerine kullanılmaz.

## Yerleşim

```text
┌──────── sidebar ────────┬──────────────── header ────────────────┐
│ marka                   │ breadcrumb          site / kullanıcı  │
│ ana navigasyon          ├─────────────────────────────────────────┤
│                         │ başlık + açıklama + temel aksiyon       │
│                         │ toolbar / özet                          │
│ kullanıcı               │ geniş, yoğun ama ferah çalışma alanı   │
└─────────────────────────┴─────────────────────────────────────────┘
```

- İçerik genişliği `min(96%, 100rem)` sınırında akışkandır.
- 1366px ve kısa laptop ekranlarında dikey boşluk azalır; bilgi hiyerarşisi korunur.
- Mobilde sidebar sheet olur, geniş tablolar güvenli yatay kayar.
- Kart yalnızca gerçek bir içerik grubunu ifade ettiğinde kullanılır.

## Bileşen kuralları

- Kontroller 40–44px; yoğun tablo satırları en az 64px.
- Radius: küçük kontroller 6px, paneller 10px, modal/sheet 12px.
- Gölgeler kalıcı kart dekoru değildir; yalnızca dropdown, sheet ve modal katmanını ayırır.
- Birincil buton koyu mürekkep, marka vurgusu adaçayıdır.
- Destructive işlem her zaman onay ister.
- Thumbnail alanı sabit oranlıdır; eksik görsel açıkça belirtilir.
- Icon-only kontrollerde erişilebilir ad zorunludur.
- Klavye odağı görünür, dokunma hedefi en az 44px ve reduced-motion desteklidir.

## Kaçınılacaklar

- Gradient, glassmorphism, büyük dekoratif dashboard kartları
- Her içeriği aynı radius ve gölgeye sahip kutulara bölmek
- Desteklenmeyen endpointler için sahte aksiyonlar
- Sadece hover ile açılan kritik kontroller
- Büyük Client Component sınırları ve gereksiz animasyon paketleri
