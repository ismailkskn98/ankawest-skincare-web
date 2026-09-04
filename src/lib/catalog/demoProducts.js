const CARD_TONES = [
  "bg-[#dbe5e9]",
  "bg-[#e8dfd9]",
  "bg-[#efe0dc]",
  "bg-[#e6e1d8]",
  "bg-[#dce7df]",
  "bg-[#e4e0ea]",
  "bg-[#e9e4d8]",
  "bg-[#dde6e3]",
];

export const TRANSPARENT_PRODUCT_IMAGES = {
  "glutanex-glow-booster-crystal-radiance-capsule-cream-50-ml":
    "/images/urunler-png-ham/GLOW%20BOOSTER/GLUTANEX-Glow-Booster-sadece-urun.webp",
  "glutanex-glow-therapy-ampoule-30-ml":
    "/images/urunler-png-ham/GLOW%20THERAPY%20AMPOULE/GLUTANEX-Glow-Therapy-Ampoule-sadece-urun.webp",
  "glutanex-aqua-booster-50-ml":
    "/images/urunler-png-ham/AQUA%20BOOSTER/AQUA-BOOSTER.webp",
  "glutanex-retinol-eye-cream-30-ml":
    "/images/urunler-png-ham/GLOW%20THERAPY%20EYE%20CREAM/GLOW-THERAPY-EYE-CREAM.webp",
  "glutanex-glow-therapy-toner-150-ml":
    "/images/urunler-png-ham/GLOW%20THERAPY%20TONER/GLOW-THERAPY-TONER.webp",
  "glutanex-glow-therapy-gel-to-foam-cleanser-100-ml":
    "/images/urunler-png-ham/FOAM%20CLEANSER/foam1.webp",
  "glutanex-sun-stick-spf50-30-g":
    "/images/urunler-png-ham/ACTIVE%20SUNSCREEN/EXOME-Active-Sunscreen-transparan%20(1).webp",
  "glutanex-glow-sun-cream-light-spf50-50-ml":
    "/images/urunler-png-ham/GLOW%20SUN%20CREAM/GLOW-SUN-CREAM.webp",
  "glutanex-glow-therapy-milky-serum-30-ml":
    "/images/urunler-png-ham/GLOW%20THERAPY%20MILKY%20SERUM/GLOW-THERAPY-MILKY-SERUM.webp",
  "glutanex-aloe-booster-200-ml":
    "/images/urunler-png-ham/ALOE%20BOOSTER/ALOE-BOOSTER.webp",
  "glutanex-deo-glow-balm-12-5-g":
    "/images/urunler-png-ham/DEO%20GLOW%20BALM/Deo%20Glow%20Balm.webp",
  "glutanex-night-serum-30-ml":
    "/images/urunler-png-ham/NIGHT%20SERUM/GLUTATHIONE-NIGHT-SERUM.webp",
};

export const demoCategories = [
  {
    id: 1,
    name: "Nemlendirici ve Bariyer Bakımı",
    slug: "nemlendirici-ve-bariyer-bakimi",
  },
  {
    id: 2,
    name: "Serum ve Ampuller",
    slug: "serum-ve-ampuller",
  },
  {
    id: 3,
    name: "Güneş Koruma",
    slug: "gunes-koruma",
  },
  {
    id: 4,
    name: "Yüz Temizleme",
    slug: "yuz-temizleme",
  },
  {
    id: 5,
    name: "Göz Çevresi Bakımı",
    slug: "goz-cevresi-bakimi",
  },
  {
    id: 6,
    name: "Tonik ve Bakım Pedleri",
    slug: "tonik-ve-bakim-pedleri",
  },
];

export const demoProducts = [
  {
    id: "demo-1",
    brand: "GLUTANEX",
    name: "Glow Booster",
    slug: "glutanex-glow-booster-crystal-radiance-capsule-cream-50-ml",
    categoryName: "Nemlendirici ve Bariyer Bakımı",
    categorySlug: "nemlendirici-ve-bariyer-bakimi",
    sizeLabel: "50 ml",
    shortDescription:
      "Lipozomal glutatyon ve PDRN içeren kapsüllü nemlendirici yüz kremi.",
    description:
      "Glutanex Glow Booster, lipozomal glutatyon ve PDRN içeren kapsüllü formülüyle cildi nemlendirirken daha aydınlık ve canlı bir görünüm kazandırmaya yardımcı olan bir yüz kremidir.\nKapsül teknolojisi aktif içeriklerin daha kararlı kalmasını destekler; düzenli kullanımda bariyer ve ışıltı görünümüne katkı sağlar.",
    benefits: [
      "Kapsüllü formül ile aktif içerik desteği",
      "Nem ve aydınlık görünüm odaklı bakım",
      "Günlük kullanıma uygun krem doku",
      "Cruelty Free",
    ],
    activeIngredients: [
      "Lipozomal Glutatyon",
      "- Cildin daha aydınlık görünmesine yardımcı olur.",
      "PDRN",
      "- Nem ve yenilenme görünümünü destekler.",
    ],
    suitableFor: [
      "- Nem ve ışıltı arayanlar",
      "- Günlük yüz kremi arayanlar",
      "- Tüm cilt tipleri",
    ],
    usageInstructions:
      "Temiz cilde yeterli miktarda uygulayın.\nNazikçe yayıp emilmesini bekleyin.\nGündüz ve gece kullanılabilir.",
    warnings:
      "- Sadece harici kullanım içindir.\n- Tahriş oluşursa kullanımı bırakın.",
    primaryImageUrl: "/images/urunler-ham/glutanex-glow-booster.webp",
    hoverImageUrl: "/images/urunler-ham/glutanex-glow-booster-hover.webp",
    tone: CARD_TONES[0],
  },
  {
    id: "demo-2",
    brand: "GLUTANEX",
    name: "Glow Therapy Ampoule",
    slug: "glutanex-glow-therapy-ampoule-30-ml",
    categoryName: "Serum ve Ampuller",
    categorySlug: "serum-ve-ampuller",
    sizeLabel: "30 ml",
    shortDescription:
      "Aydınlık görünüm odaklı glutatyon ve PDRN içeren süt yapılı ampul.",
    description:
      "Glutanex Glow Therapy Ampoule, cilt tonunu eşitlemeye, cilde aydınlık bir görünüm kazandırmaya ve nem dengesini desteklemeye yardımcı, hafif ve süt kıvamında bir ampul serumdur.\n%99 saflıkta Glutatyon ve 10.000 ppm PDRN içeren formülü; C Vitamini, Traneksamik Asit, Hyaluronik Asit ve Panthenol ile desteklenir.",
    benefits: [
      "✔ 10.000 ppm PDRN ve %99 saflıkta Glutatyon içerir",
      "✔ Cilt tonunu eşitlemeye ve aydınlık görünüm kazandırmaya yardımcı olur",
      "✔ Hafif, süt kıvamında doku; hızlı emilir",
      "✔ Günlük kullanıma uygundur",
    ],
    activeIngredients: [
      "Glutatyon",
      "- Cilt tonunu eşitlemeye yardımcı olur.",
      "PDRN (Sodyum DNA)",
      "- Yoğun nem ve besleyici bakım desteği sunar.",
      "Traneksamik Asit",
      "- Ton eşitsizliği görünümünü dengelemeye yardımcı olur.",
    ],
    suitableFor: [
      "- Mat ve yorgun cilt görünümü yaşayanlar",
      "- Ton eşitsizliği ve kırışıklık görünümüne karşı bakım isteyenler",
      "- Tüm cilt tipleri",
    ],
    usageInstructions:
      "Temizleme sonrası tonik uygulayın.\n3-4 damla ürünü yüzünüze nazikçe yayın.\nArdından nemlendirici ile rutininizi tamamlayın.",
    warnings:
      "- Sadece harici kullanım içindir.\n- Göz ile temas etmesi halinde bol su ile durulayın.",
    primaryImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-ampoule.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-ampoule-hover.webp",
    tone: CARD_TONES[1],
  },
  {
    id: "demo-3",
    brand: "GLUTANEX",
    name: "Aqua Booster",
    slug: "glutanex-aqua-booster-50-ml",
    categoryName: "Nemlendirici ve Bariyer Bakımı",
    categorySlug: "nemlendirici-ve-bariyer-bakimi",
    sizeLabel: "50 ml",
    shortDescription:
      "PDRN ve üçlü hyaluronik asit ile yoğun nem desteği sunan yüz kremi.",
    description:
      "Glutanex Aqua Booster, gün boyu süren nem, aydınlık bir görünüm ve güçlü bariyer desteği sunan yoğun nemlendirici ve aydınlatıcı bir yüz kremidir.\nSodyum DNA (PDRN), 3'lü Hyaluronik Asit, Glutatyon, Pantenol ve Niasinamid içeren formülü cildi derinlemesine nemlendirir.",
    benefits: [
      "✔ Cildi derinlemesine nemlendirir",
      "✔ Glutatyon ile daha aydınlık görünüm desteği",
      "✔ 3'lü Hyaluronik Asit ile çok katmanlı nem",
      "✔ Gündüz ve gece kullanılabilir",
    ],
    activeIngredients: [
      "Sodyum DNA (PDRN)",
      "- Nem görünümünü desteklemeye yardımcı olur.",
      "3'lü Hyaluronik Asit",
      "- Çok katmanlı nem desteği sağlar.",
      "Glutatyon",
      "- Daha aydınlık ve canlı bir görünüm kazandırır.",
    ],
    suitableFor: [
      "- Yoğun nemlendirme arayanlar",
      "- Mat ve donuk cilt görünümü yaşayanlar",
      "- Hassas ciltler dahil tüm cilt tipleri",
    ],
    usageInstructions:
      "Cilt bakım rutininizin son adımında uygulayın.\nYeterli miktarda ürünü yüzünüze eşit şekilde yayıp nazikçe yedirin.",
    warnings:
      "- Sadece harici kullanım içindir.\n- Tahriş oluşursa kullanımı bırakın.",
    primaryImageUrl: "/images/urunler-ham/glutanex-aqua-booster.webp",
    hoverImageUrl: "/images/urunler-ham/glutanex-aqua-booster-hover.webp",
    tone: CARD_TONES[2],
  },
  {
    id: "demo-4",
    brand: "GLUTANEX",
    name: "Glow Therapy Eye Cream",
    slug: "glutanex-retinol-eye-cream-30-ml",
    categoryName: "Göz Çevresi Bakımı",
    categorySlug: "goz-cevresi-bakimi",
    sizeLabel: "30 ml",
    shortDescription: "Retinol destekli gece göz çevresi bakımı.",
    description:
      "Glutanex Glow Therapy Eye Cream, göz çevresinin gece bakım rutini için özel olarak geliştirilmiş retinol destekli bir bakım kremidir.\n%0.1 stabilize retinol, glutatyon, hyalüronik asit ve Edelweiss ekstresi içeren formülü göz çevresinin daha aydınlık ve dinlenmiş görünmesini destekler.",
    benefits: [
      "✔ Retinol %0.1 içeren gece bakım kremi",
      "✔ İnce çizgi görünümünün azalmasına yardımcı olur",
      "✔ Hafif jel-krem dokusu, hızlı emilir",
    ],
    activeIngredients: [
      "Retinol %0.1",
      "- İnce çizgi ve elastikiyet görünümünün bakımına katkı sağlar.",
      "Glutatyon",
      "- Cildin berraklığını iyileştirmeye yardımcı olur.",
      "Hyalüronik Asit",
      "- Yoğun nem desteği sunar.",
    ],
    suitableFor: [
      "- Göz çevresinde nem desteği arayanlar",
      "- İnce çizgi görünümüne yönelik bakım yapmak isteyenler",
      "- Tüm cilt tipleri",
    ],
    usageInstructions:
      "Akşam temiz ve kuru göz çevresine pirinç tanesi kadar ürünü nazik tampon hareketleriyle uygulayın.\nRetinol kullanımına yeni başlayanların ilk 2 hafta gün aşırı kullanması önerilir.",
    warnings:
      "- Sadece harici kullanım içindir.\n- Gündüz mutlaka SPF ile tamamlayın.\n- Hamilelik ve emzirme döneminde sağlık uzmanına danışın.",
    primaryImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-eye-cream.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-eye-cream-hover.webp",
    tone: CARD_TONES[3],
  },
  {
    id: "demo-5",
    brand: "GLUTANEX",
    name: "Glow Therapy Toner",
    slug: "glutanex-glow-therapy-toner-150-ml",
    categoryName: "Tonik ve Bakım Pedleri",
    categorySlug: "tonik-ve-bakim-pedleri",
    sizeLabel: "150 ml",
    shortDescription:
      "Cildi bakıma hazırlayan aydınlık görünüm odaklı tonik.",
    description:
      "Glutanex Glow Therapy Toner, cildi sonraki bakım adımlarına hazırlayan, aydınlık görünüm odaklı bir toniktir.\nHafif dokusuyla ferah bir his bırakır ve günlük rutine kolayca dahil edilir.",
    benefits: [
      "Cildi bakıma hazırlar",
      "Aydınlık görünüm desteği",
      "Hafif ve ferahlatıcı doku",
    ],
    activeIngredients: [
      "Glutatyon",
      "- Daha aydınlık bir görünüm hissi destekler.",
    ],
    suitableFor: [
      "- Günlük tonik arayanlar",
      "- Aydınlık görünüm odaklı rutin kuranlar",
    ],
    usageInstructions:
      "Temiz cilde pamuk veya avuç içiyle uygulayın.\nSonraki serum ve krem adımlarına geçin.",
    warnings: "- Sadece harici kullanım içindir.",
    primaryImageUrl: "/images/urunler-ham/glutanex-glow-therapy-toner.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-toner-hover.webp",
    tone: CARD_TONES[4],
  },
  {
    id: "demo-6",
    brand: "GLUTANEX",
    name: "Gel-to-Foam Cleanser",
    slug: "glutanex-glow-therapy-gel-to-foam-cleanser-100-ml",
    categoryName: "Yüz Temizleme",
    categorySlug: "yuz-temizleme",
    sizeLabel: "100 ml",
    shortDescription:
      "AHA BHA LHA ile nazik arındırma sunan jel-köpük temizleyici.",
    description:
      "Glutanex Glow Therapy Gel-to-Foam Cleanser, arındırıcı ve peeling etkili, jelden köpüğe dönüşen 2'si 1 arada formülüyle geliştirilmiş bir yüz temizleme jelidir.\nGlutatyon, Sitrik Asit (AHA), Söğüt Kabuğu Özü (BHA), LHA ve Derma-Clear kompleksi içeren formülü cildi kurutmadan temizler.",
    benefits: [
      "✔ Jelden köpüğe dönüşen temizlik ve nazik peeling etkisi",
      "✔ Gözenekleri arındırır, cildi pürüzsüz bırakır",
      "✔ Cildi kurutmadan temizler",
    ],
    activeIngredients: [
      "Sitrik Asit (AHA)",
      "- Ölü deri görünümünü nazikçe arındırır.",
      "Söğüt Kabuğu Özü (BHA)",
      "- Sebum ve gözenek bakımını destekler.",
      "LHA",
      "- Hassas ciltler için konforlu eksfoliasyon desteği sağlar.",
    ],
    suitableFor: [
      "- Gözenek ve siyah nokta problemi yaşayanlar",
      "- Karma, yağlı ve akneye yatkın ciltler",
    ],
    usageInstructions:
      "Kuru cilde yeterli miktarda uygulayın.\n10-30 saniye bekleyerek mikro köpük oluşmasını sağlayın.\nIslak ellerle nazikçe masaj yapıp ılık su ile durulayın.",
    warnings:
      "- Sadece harici kullanım içindir.\n- Gündüz kullanımını SPF ile tamamlayın.",
    primaryImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-gel-to-foam-cleanser.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-gel-to-foam-cleanser-hover.webp",
    tone: CARD_TONES[5],
  },
  {
    id: "demo-7",
    brand: "GLUTANEX",
    name: "Sun Stick SPF50+",
    slug: "glutanex-sun-stick-spf50-30-g",
    categoryName: "Güneş Koruma",
    categorySlug: "gunes-koruma",
    sizeLabel: "30 g",
    shortDescription:
      "Pratik stick formda SPF50+ PA++++ günlük güneş koruması.",
    description:
      "Glutanex Sun Stick SPF 50+ PA++++, glutatyon destekli mineral filtreli, günlük güneş korumasını pratik hale getiren stick formda bir güneş koruyucudur.\nMat ve doğal bitiş sunar; yüz ve vücut kullanımına uygundur.",
    benefits: [
      "✔ SPF 50+ PA++++ geniş spektrum koruma",
      "✔ Stick form sayesinde pratik uygulama",
      "✔ Mat ve doğal bitiş, beyaz iz bırakmaz",
    ],
    activeIngredients: [
      "Glutatyon",
      "- Eşit cilt tonu görünümünü destekler.",
      "Tokoferol (Vitamin E)",
      "- Antioksidan destek sunar.",
    ],
    suitableFor: [
      "- Günlük güneş koruması isteyenler",
      "- Hassas, yağlı ve karma ciltler",
    ],
    usageInstructions:
      "Cilt bakımının son adımında yüz, boyun ve güneşe maruz kalan bölgelere eşit şekilde uygulayın.\nGüneşe çıkmadan 20-30 dakika önce uygulayın.",
    warnings:
      "- Sadece harici kullanım içindir.\n- Hiçbir güneş koruyucu %100 koruma sağlamaz.",
    primaryImageUrl:
      "/images/urunler-ham/glutanex-glow-sun-stick-spf50+.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glow-sun-stick-spf50+-hover.webp",
    tone: CARD_TONES[6],
  },
  {
    id: "demo-8",
    brand: "GLUTANEX",
    name: "Glow Sun Cream Light SPF50+",
    slug: "glutanex-glow-sun-cream-light-spf50-50-ml",
    categoryName: "Güneş Koruma",
    categorySlug: "gunes-koruma",
    sizeLabel: "50 ml",
    shortDescription:
      "Hafif dokulu, gündüz rutinine uygun yüksek korumalı güneş kremi.",
    description:
      "Glutanex Glow Sun Cream Light SPF50+, hafif dokulu formülüyle gündüz rutinine kolayca dahil edilen yüksek korumalı bir güneş kremidir.",
    benefits: [
      "Hafif doku, kolay yayılır",
      "Yüksek SPF koruması",
      "Gündüz rutini için uygundur",
    ],
    activeIngredients: [
      "UV Filtre Sistemi",
      "- Geniş spektrum güneş koruması sağlar.",
    ],
    suitableFor: [
      "- Hafif dokulu güneş kremi arayanlar",
      "- Günlük gündüz rutini kuranlar",
    ],
    usageInstructions:
      "Cilt bakımının son adımında yeterli miktarda uygulayın.\nGün içinde ihtiyaç duydukça yenileyin.",
    warnings: "- Sadece harici kullanım içindir.",
    primaryImageUrl:
      "/images/urunler-ham/glutanex-glow-sun-cream-light-spf50+.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glow-sun-cream-light-spf50+-hover.webp",
    tone: CARD_TONES[7],
  },
  {
    id: "demo-9",
    brand: "GLUTANEX",
    name: "Milky Serum",
    slug: "glutanex-glow-therapy-milky-serum-30-ml",
    categoryName: "Serum ve Ampuller",
    categorySlug: "serum-ve-ampuller",
    sizeLabel: "30 ml",
    shortDescription: "Süt dokulu, aydınlık ve nem odaklı yüz serumu.",
    description:
      "Glutanex Glow Therapy Milky Serum, süt dokulu formülüyle nem ve aydınlık görünüm odaklı bir yüz serumudur.",
    benefits: [
      "Süt dokulu, hızlı emilen yapı",
      "Nem ve aydınlık görünüm desteği",
    ],
    activeIngredients: [
      "Glutatyon",
      "- Aydınlık görünüm desteği sunar.",
    ],
    suitableFor: [
      "- Serum adımı arayanlar",
      "- Nem ve ışıltı odaklı rutin kuranlar",
    ],
    usageInstructions:
      "Tonik sonrası birkaç damla uygulayın.\nNemlendirici ile rutini tamamlayın.",
    warnings: "- Sadece harici kullanım içindir.",
    primaryImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-milky-serum.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glow-therapy-milky-serum-hover.webp",
    tone: CARD_TONES[0],
  },
  {
    id: "demo-10",
    brand: "GLUTANEX",
    name: "Aloe Booster",
    slug: "glutanex-aloe-booster-200-ml",
    categoryName: "Nemlendirici ve Bariyer Bakımı",
    categorySlug: "nemlendirici-ve-bariyer-bakimi",
    sizeLabel: "200 ml",
    shortDescription: "Yüz ve vücut için ferahlatıcı aloe vera jel krem.",
    description:
      "Glutanex Aloe Booster, Aloe Vera, 3'lü Hyaluronik Asit, Panthenol, Niasinamid ve Glutatyon ile zenginleştirilmiş çok amaçlı bir jel kremdir.\nHafif ve hızlı emilen jel dokusu sayesinde anında ferahlık hissi verir.",
    benefits: [
      "✔ Anında ferahlatıcı ve yatıştırıcı etki",
      "✔ Yüz ve vücut için çok amaçlı kullanım",
      "✔ Hafif jel yapısı, yapışkanlık bırakmaz",
    ],
    activeIngredients: [
      "Aloe Vera",
      "- Yatıştırıcı ve nemlendirici etki sağlar.",
      "3'lü Hyaluronik Asit",
      "- Çok katmanlı nem desteği sunar.",
      "Panthenol",
      "- Cildi onarmaya yardımcı olur.",
    ],
    suitableFor: [
      "- Kuruluk yaşayanlar",
      "- Güneş sonrası yatıştırıcı bakım isteyenler",
      "- Tüm cilt tipleri",
    ],
    usageInstructions:
      "Temiz cilde uygulayın, yüz ve vücutta nazikçe yayın.\nGünlük kullanıma uygundur.",
    warnings: "- Sadece harici kullanım içindir.",
    primaryImageUrl: "/images/urunler-ham/glutanex-aloe-booster.webp",
    hoverImageUrl: "/images/urunler-ham/glutanex-aloe-booster-hover.webp",
    tone: CARD_TONES[4],
  },
  {
    id: "demo-11",
    brand: "GLUTANEX",
    name: "Deo Glow Balm",
    slug: "glutanex-deo-glow-balm-12-5-g",
    categoryName: "Deodorant ve Bölgesel Bakım",
    categorySlug: "deodorant-ve-bolgesel-bakim",
    sizeLabel: "12.5 g",
    shortDescription:
      "Alüminyumsuz stick deodorant ve bölgesel aydınlık bakım.",
    description:
      "Glutanex Deo Glow Balm, günlük deodorant korumasını cilt bakımı desteğiyle bir araya getiren stick formda bir bakım deodorantıdır.\nGlutatyon ve Alpha-Bisabolol içeren formülü koltuk altı ve sürtünmeye açık bölgelerde aydınlık görünüm hissini destekler.",
    benefits: [
      "✔ 24 saat ferahlık hissi",
      "✔ Alüminyum, paraben, ftalat ve triklosan içermez",
      "✔ Pratik stick formu",
    ],
    activeIngredients: [
      "Glutatyon",
      "- Daha aydınlık ve temiz bir görünüm hissi verir.",
      "Alpha-Bisabolol",
      "- Cildi yatıştırmaya yardımcı olur.",
    ],
    suitableFor: [
      "- Alüminyumsuz deodorant tercih edenler",
      "- Hassas koltuk altına sahip olanlar",
    ],
    usageInstructions:
      "Kapağı açın ve stick formunu doğrudan temiz, kuru cilde uygulayın.\nGün içinde ihtiyaç duydukça tazeleyin.",
    warnings:
      "- Sadece harici kullanım içindir.\n- Tahriş oluşursa kullanımı bırakın.",
    primaryImageUrl: "/images/urunler-ham/glutanex-glow-deo-balm.webp",
    hoverImageUrl: "/images/urunler-ham/glutanex-glow-deo-balm-hover.webp",
    tone: CARD_TONES[1],
  },
  {
    id: "demo-12",
    brand: "GLUTANEX",
    name: "Night Serum",
    slug: "glutanex-night-serum-30-ml",
    categoryName: "Serum ve Ampuller",
    categorySlug: "serum-ve-ampuller",
    sizeLabel: "30 ml",
    shortDescription:
      "Gece boyunca nem ve elastikiyet görünümünü destekleyen serum.",
    description:
      "Glutanex Night Serum, glutatyon, kolajen, peptit ve vitaminlerle desteklenen formülüyle uyku sırasında cildi besleyen bir gece serumudur.\nHafif ve şeffaf dokusu ağırlık hissi bırakmadan emilir.",
    benefits: [
      "✔ Glutatyon ile ton eşitleme desteği",
      "✔ Kolajen ile nem ve elastikiyet desteği",
      "✔ Gece kullanımına uygundur",
    ],
    activeIngredients: [
      "Glutatyon",
      "- Daha aydınlık görünümü desteklemeye yardımcı olur.",
      "Kolajen",
      "- Nem ve elastikiyet desteği sunar.",
      "Peptitler",
      "- Cilt bariyerini desteklemeye yardımcı olur.",
    ],
    suitableFor: [
      "- Gece rutinine besleyici serum eklemek isteyenler",
      "- Tüm cilt tipleri",
    ],
    usageInstructions:
      "Tonik sonrası temiz cilde uygulayın.\nNazikçe yayıp emilmesini bekleyin, ardından nemlendirici ile tamamlayın.",
    warnings: "- Sadece harici kullanım içindir.",
    primaryImageUrl:
      "/images/urunler-ham/glutanex-glutathione-night-serum.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glutathione-night-serum-hover.webp",
    tone: CARD_TONES[5],
  },
];

export { CARD_TONES };
