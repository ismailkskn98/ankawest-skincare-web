# Product Marketing Context

**Document version:** v1  
**Last updated:** 2026-08-31

> Bu belge repo, ürün açıklamaları, SQL seed verisi, mevcut görseller ve proje görüşmelerinden otomatik taslak olarak hazırlanmıştır. “Doğrulandı” ifadesi bağımsız klinik veya hukuki doğrulama değil, yalnızca bu kaynaklarda bulunduğu anlamına gelir. Yayına girecek tüm ürün iddiaları, test sonuçları, sertifikalar, satış kanalları ve ticari unvanlar marka sahibi tarafından ayrıca doğrulanmalıdır.

## Product Overview

**One-liner:**  
Anka West Skincare, GLUTANEX ve Exome bakım ürünlerini cilt ihtiyacı, aktif içerik ve kullanım adımları üzerinden keşfetmeyi kolaylaştıran Türkçe bir marka ve ürün katalog sitesidir.

**What it does:**  
Site; ürünleri kategori, bakım ihtiyacı ve içerik odağında anlaşılır biçimde tanıtır. Ziyaretçinin ürün faydalarını, aktif içerikleri, uygunluk bilgisini, kullanım şeklini ve uyarıları tek bir düzenli deneyimde incelemesini sağlar. İlk sürümde sepet, ödeme ve site içi satın alma olmayacaktır.

**Product category:**  
Kore kozmetiği ve içerik odaklı cilt, vücut, dudak, güneş ve saç bakımı ürünleri.

**Product type:**  
B2C ürün keşif ve marka içerik sitesi; doğrudan e-ticaret değildir.

**Business model:**  
Fiziksel kozmetik ürünlerinin harici satış kanalları üzerinden satışı. Trendyol mağaza/listeleri mevcut kaynak olarak kullanılmıştır; Anka West’in ticari rolü, yetkili satıcı/distribütör ifadesi ve diğer satış noktaları **doğrulanacak**. Site içinde fiyat gösterilip gösterilmeyeceği ve dış satış kanalına yönlendirme politikası **doğrulanacak**.

**Current catalog baseline:**  
SQL v1 seed verisinde 15 kategori altında 31 taslak ürün bulunur: 23 GLUTANEX ve 8 Exome. Bu sayı canlı/yayınlanmış katalog değildir; nihai ürün seçkisi **doğrulanacak**.

## Target Audience

**Target people:**  
Türkiye’de cilt bakımını içerik ve bakım ihtiyacı üzerinden araştıran bireysel tüketiciler. Mevcut ürün yelpazesi; leke ve ton görünümü, nem ve bariyer desteği, güneş koruması, gözenek/sebum bakımı, hassasiyet, dudak-vücut bakımı ile saç ve saç derisi bakımına ilgi duyan kişilere hitap eder.

**Decision-makers:**  
B2C modelde temel karar verici ürünü kullanacak ve satın alacak kişidir. Dermatolog, estetisyen veya başka profesyonellerin satın alma kararındaki rolü **doğrulanacak**.

**Primary use case:**  
Kullanıcının bakım ihtiyacına uygun ürünleri keşfetmesi ve satın almadan önce içerik, fayda, kullanım ve uyarı bilgilerini güvenle karşılaştırması.

**Jobs to be done:**

- “Cilt veya saç bakım hedefime uygun ürünleri hızlıca daraltmak istiyorum.”
- “Ürünün ne sunduğunu, hangi aktifleri içerdiğini ve nasıl kullanılacağını açıkça anlamak istiyorum.”
- “Pazarlama gürültüsü yerine düzenli ve güven veren ürün bilgisiyle karar vermek istiyorum.”

**Use cases:**

- Kategori veya bakım ihtiyacına göre ürün keşfetme.
- GLUTANEX ve Exome ürün ailelerini inceleme.
- Aktif içerik, uygun cilt/saç ihtiyacı, kullanım ve uyarı bilgilerini okuma.
- Bir bakım rutini için tamamlayıcı ürünleri keşfetme; rutin önerilerinin kapsamı ve mevzuat uygunluğu **doğrulanacak**.
- Doğrulanmış satış noktasına geçme; nihai CTA ve kanal **doğrulanacak**.

## Personas

B2C olduğu için B2B paydaş/persona tablosu uygulanmıyor. Segment öncelikleri, demografik veriler ve gerçek müşteri araştırması henüz bulunmuyor; kullanıcı görüşmeleri veya analitik verilerle **doğrulanacak**.

## Problems & Pain Points

**Core problem:**  
Bakım ürünü arayan kullanıcılar yoğun ürün ve aktif içerik çeşitliliği içinde kendi ihtiyaçlarına uygun seçeneği, doğru kullanım sırasını ve güvenilir bilgiyi ayırt etmekte zorlanabilir.

**Why alternatives fall short — working hypotheses to validate:**

- Pazaryeri sayfaları satın alma ve kampanya odaklı olduğu için marka hikâyesini ve ürün ailesi ilişkilerini parçalı sunabilir.
- Uzun veya teknik ürün açıklamaları, bakım hedefini ilk bakışta anlamayı zorlaştırabilir.
- Sosyal medya ve kullanıcı yorumlarında doğrulanmış bilgi ile kişisel deneyim birbirine karışabilir.

**What it costs them:**  
Araştırma süresi, yanlış ürün seçme endişesi, birbiriyle uyumsuz rutin kurma riski ve markaya duyulan güvenin azalması. Bunlar mevcut kaynaklardan çıkarılan hipotezlerdir; müşteri araştırmasıyla **doğrulanacak**.

**Emotional tension:**  
“Cildime uygun mu?”, “İddialar güvenilir mi?”, “Nasıl ve ne sıklıkta kullanmalıyım?” ve “Orijinal ürünü nereden alabilirim?” soruları. Verbatim müşteri görüşmesi bulunmadığı için bu ifadeler araştırma hipotezidir.

## Competitive Landscape

**Direct:**  
Türkiye’de benzer Kore kozmetiği veya aktif içerik odaklı bakım portföyü sunan markalar. Belirli rakip listesi ve karşılaştırmalı güçlü/zayıf yönler **doğrulanacak**; mevcut kaynaklarda rakip araştırması yoktur.

**Secondary:**  
Çok markalı kozmetik mağazaları ve pazaryeri ürün sayfaları. Çalışma hipotezi: geniş seçenek sunarken marka bütünlüğü, ihtiyaç bazlı keşif ve ürünler arası bağlam sınırlı kalabilir.

**Indirect:**  
Sosyal medya önerileri, influencer içerikleri, kullanıcı yorumları ve profesyonel danışmanlık. Çalışma hipotezi: keşfi destekler ancak bilgi standardı, tarafsızlık ve ürün uygunluğu değişken olabilir.

## Differentiation

**Key differentiators:**

- GLUTANEX ve Exome ürünlerini tek, tutarlı ve Türkçe keşif deneyiminde bir araya getiren yapı.
- 15 kategoriye yayılan yüz, vücut, dudak, güneş ve saç bakımı seçkisi; nihai canlı kapsam **doğrulanacak**.
- Her ürün için fayda, aktif içerik, uygunluk, kullanım şekli ve uyarı alanlarını ayrı sunabilen içerik modeli.
- Satış baskısı yerine ürün keşfi, görsel hikâye anlatımı ve anlaşılır bilgiye odaklanan site deneyimi.

**How we do it differently:**  
Katalog dili yalnızca ürün adı ve fiyat çevresinde değil; bakım ihtiyacı, içerik, doku/kullanım deneyimi ve güvenli kullanım bilgisi çevresinde kurulacaktır. Ürün görselleri premium ve editoryal bir marka anlatımı içinde kullanılacaktır.

**Why that’s better:**  
Ziyaretçi kalabalık bir pazaryeri görünümü yerine daha sakin, karşılaştırılabilir ve marka bütünlüğü olan bir keşif süreci yaşar.

**Why customers choose us:**  
Henüz müşteri araştırması veya satış verisiyle doğrulanmış bir tercih nedeni yoktur. V1 hipotezi: düzenli ürün bilgisi, içerik odaklı keşif, güçlü görsel sunum ve farklı bakım alanlarını kapsayan seçki.

## Objections

| Objection | Response |
|---|---|
| “Hangi ürün benim ihtiyacıma uygun?” | Kategori, bakım hedefi, aktif içerik ve “kimler için” bilgisiyle seçimi kolaylaştır; tıbbi tanı veya kişiye özel tedavi vaadi verme. |
| “Bu fayda ve test iddialarına güvenebilir miyim?” | Yalnız doğrulanmış ve ürün bazında kaynaklandırılabilen iddiaları kullan; belge bulunmayan metriği veya sertifikayı yayınlama. |
| “Ürünü nereden ve nasıl satın alacağım?” | Site içi ödeme olmadığını netleştir ve yalnız doğrulanmış harici satış noktalarını göster; nihai satış kanalı **doğrulanacak**. |

**Anti-persona:**  
Tıbbi teşhis veya tedavi, reçeteli ürün, anlık/garantili sonuç ya da doğrudan site içi ödeme arayan kişiler mevcut site kapsamına uygun değildir.

## Switching Dynamics

**Push:**  
Parçalı ürün bilgisi, yoğun pazaryeri arayüzleri, aktif içerik karmaşası ve ürünün rutindeki yerini anlayamama. Bunlar araştırma hipotezidir.

**Pull:**  
İhtiyaç bazlı sade keşif, premium görsel dil, açık kullanım/uyarı bilgisi ve birbiriyle ilişkili ürün ailelerini tek yerde inceleme.

**Habit:**  
Kullanıcının alıştığı pazaryeri, marka, yorum veya influencer önerisi üzerinden doğrudan seçim yapması.

**Anxiety:**  
Cilt uyumu, hassasiyet, iddiaların güvenilirliği, ürün orijinalliği, fiyat ve satın alma kanalının belirsizliği.

## Customer Language

**How they describe the problem:**  
Verbatim müşteri görüşmesi, destek kaydı veya doğrulanmış yorum seti mevcut değildir; **doğrulanacak**.

**How they describe us:**  
Verbatim müşteri dili mevcut değildir; **doğrulanacak**.

**Words to use:**  
Bakım, destekler, yardımcı olur, görünüm, cilt bariyeri, nem dengesi, aydınlık görünüm, eşit ton görünümü, nazik, günlük rutin, aktif içerik, kullanım şekli, uyarılar, keşfet.

**Words to avoid:**  
Mucize, kesin sonuç, tedavi eder, iyileştirir, tamamen yok eder, garantili, risksiz, herkese uygundur, doktor onaylı, klinik olarak kanıtlandı veya “en iyi”; yalnız güçlü ve geçerli kanıtla izin verilen istisnalar kullanılabilir.

**Glossary:**

| Term | Meaning in this catalog |
|---|---|
| Glutatyon | Birçok GLUTANEX ürününde aydınlık ve eşit ton görünümü desteği bağlamında geçen aktif içerik. Ürün bazındaki fayda iddiası doğrulanmalıdır. |
| Eksozom | Exome ürünlerinde bitki kaynaklı teknoloji/aktif kompleks olarak geçen içerik yaklaşımı. Kaynak, oran ve fayda ürüne göre doğrulanmalıdır. |
| AHA / BHA / PHA / LHA | Arındırma, sebum/gözenek ve cilt dokusu görünümü odaklı ürünlerde geçen asit grupları. Kullanım ve uyarılar ürün bazında verilmelidir. |
| PDRN | Bazı ürün açıklamalarında vegan ve pirinç kaynaklı bakım içeriği olarak geçen terim. Teknik ve mevzuatsal ifade doğrulanmalıdır. |
| SPF / PA | Güneş koruyucu ürünlerde UVB/UVA koruma derecelerini ifade eden işaretler. Ürün testi ve etiket bilgisiyle eşleşmelidir. |
| Bariyer bakımı | Cildin nem ve konfor dengesini desteklemeyi hedefleyen bakım anlatımı; tıbbi tedavi vaadi değildir. |

## Brand Voice

**Tone:**  
Premium, sakin, güven veren, bilgili ve insan odaklı.

**Style:**  
Kısa ve anlaşılır başlıklar; teknik içeriği sadeleştiren açıklamalar; editoryal hikâye anlatımı ile klinik netlik arasında denge. Satış baskısı, aşırı ünlem, korku dili ve kanıtsız üstünlük iddiaları kullanılmaz.

**Personality:**  
Rafine, şeffaf, özenli, çağdaş, yol gösterici.

**Visual/copy direction confirmed in project conversation:**  
Truekind Skincare ana tasarım referansıdır; Rye Island’ın editoryal ürün hikâyesi ve Abhishek Jha’nın ölçülü hareket dili destekleyici referanslardır. Referans sitelerin metinleri veya ayırt edici tasarım öğeleri kopyalanmayacak; Anka West’e özgü içerik ve görsel sistem üretilecektir.

## Proof Points

**Metrics:**  
Onaylanmış marka/iş performansı metriği yoktur. Ürün açıklamalarında bazı bağımsız veya iç test yüzdeleri ve süreleri bulunur; test raporları repoda olmadığı için bu metrikler kurumsal kanıt olarak kullanılmamalı ve yayın öncesi ürün bazında **doğrulanmalıdır**.

**Customers:**  
Doğrulanmış müşteri, partner, uzman veya kurum logosu listesi yoktur.

**Testimonials:**  
Doğrulanmış testimonial yoktur; uydurma alıntı veya anonim değerlendirme kullanılmayacaktır.

**Product claims requiring evidence:**  
“Dermatolojik olarak test edilmiştir”, “cruelty free”, “Güney Kore üretimi/menşeli”, “non-irritating”, “bağımsız test” ve sayısal sonuçlar yalnız ilgili ürünün belge ve etiket kaynağı doğrulandıktan sonra kullanılmalıdır; bu ifadeler tüm ürünlere genellenemez.

**Value themes:**

| Theme | Current evidence |
|---|---|
| Katalog genişliği | V1 seed: 31 taslak ürün, 15 kategori, iki ürün markası. Canlı kapsam değildir. |
| Bilgi derinliği | Ürün modelinde açıklama, faydalar, aktif içerikler, uygunluk, kullanım ve uyarılar için ayrı alanlar bulunur. |
| İhtiyaç bazlı keşif | Seed kategorileri leke/ton, nem/bariyer, güneş, temizleme, serum, maske, vücut ve saç gibi bakım hedeflerine ayrılmıştır. |
| Görsel anlatım altyapısı | Repoda 51 ana ürün görseli ve 166 ek pazaryeri görseli vardır; telif/kullanım hakkı ve nihai seçki **doğrulanacak**. |

## Goals

**Business goal:**  
Anka West Skincare için premium ve güven veren bir dijital vitrin oluşturmak; ürün portföyünün ve marka ailelerinin keşfedilebilirliğini artırmak.

**Conversion action:**  
Birincil dönüşüm, anasayfadan kategori veya öne çıkan ürünlere geçip ürün detayını incelemektir. Harici satış noktasına yönlendirme ikincil dönüşüm adayıdır; kanal ve CTA **doğrulanacak**. Sepet ve site içi satın alma kapsam dışıdır.

**Current metrics:**  
Trafik, ürün detayına geçiş, CTA tıklaması veya satış yönlendirme metriği mevcut değildir. Ölçüm planı ve başlangıç değerleri **doğrulanacak**.

## Open Validation Checklist

- Anka West’in GLUTANEX ve Exome ile ticari/yetkili ilişkisinin yayınlanabilir ifadesi.
- Nihai ürün seçkisi, fiyat gösterim politikası ve harici satış noktaları.
- Logo, ürün fotoğrafları ve ek pazaryeri görsellerinin web kullanım hakları.
- Her ürün için etiket/INCI, menşe, cruelty-free, dermatolojik test ve klinik/bağımsız test belgeleri.
- Öncelikli hedef segmentler, gerçek müşteri dili, en sık sorular ve itirazlar.
- İletişim bilgileri, sosyal hesaplar, KVKK/çerez politikaları ve marka hikâyesi.
- Başarı KPI’ları ve analitik ölçüm planı.

## Changelog

*Newest first. One line per revision: what changed and why.*

- v1 (2026-08-31) — README, ürün açıklamaları, SQL seed, mevcut görsel yapısı ve proje kapsamından ilk otomatik pazarlama bağlamı oluşturuldu; doğrulanmamış iddia ve kararlar işaretlendi.
