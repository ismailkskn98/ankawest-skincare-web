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
    shortDescription:
      "Retinol destekli gece göz çevresi bakımı.",
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
    shortDescription:
      "Süt dokulu, aydınlık ve nem odaklı yüz serumu.",
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
    shortDescription:
      "Yüz ve vücut için ferahlatıcı aloe vera jel krem.",
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
    primaryImageUrl:
      "/images/urunler-ham/glutanex-glutathione-night-serum.webp",
    hoverImageUrl:
      "/images/urunler-ham/glutanex-glutathione-night-serum-hover.webp",
    tone: CARD_TONES[5],
  },
];

export { CARD_TONES };
