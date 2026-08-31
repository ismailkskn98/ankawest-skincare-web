type SiteHref = "/" | `#${string}`;

type NavigationItem = Readonly<{
  label: string;
  href: SiteHref;
}>;

type FoundationItem = Readonly<{
  title: string;
  description: string;
}>;

type SiteConfig = Readonly<{
  name: string;
  locale: "tr";
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  navigation: readonly NavigationItem[];
  copy: Readonly<{
    skipLink: string;
    primaryNavigationLabel: string;
    footerNavigationLabel: string;
    header: Readonly<{
      brandParent: string;
      brandSection: string;
      homeLabel: string;
    }>;
    home: Readonly<{
      eyebrow: string;
      title: string;
      description: string;
      statusLabel: string;
      statusTitle: string;
      statusDescription: string;
      foundationEyebrow: string;
      foundationTitle: string;
      foundations: readonly FoundationItem[];
    }>;
    footer: Readonly<{
      summary: string;
    }>;
  }>;
}>;

export const siteConfig = {
  name: "Anka West Skincare",
  locale: "tr",
  metadata: {
    title: "Anka West Skincare",
    description:
      "Anka West Skincare web sitesinin hazırlık sürecine ait başlangıç sayfası.",
  },
  navigation: [
    {
      label: "Ana sayfa",
      href: "/",
    },
    {
      label: "Proje durumu",
      href: "#proje-durumu",
    },
  ],
  copy: {
    skipLink: "Ana içeriğe geç",
    primaryNavigationLabel: "Ana navigasyon",
    footerNavigationLabel: "Alt navigasyon",
    header: {
      brandParent: "Anka West",
      brandSection: "Skincare",
      homeLabel: "Anka West Skincare ana sayfa",
    },
    home: {
      eyebrow: "İlk teknik sürüm",
      title: "Anka West Skincare",
      description:
        "Doğrulanmış ürün bilgileri ve marka içerikleri hazır olduğunda bu yapı üzerinden yayınlanacaktır.",
      statusLabel: "Proje durumu",
      statusTitle: "İçerik hazırlığı sürüyor.",
      statusDescription:
        "Bu sürüm yalnızca erişilebilir, responsive ve yeni gereksinimlere uyarlanabilir başlangıç kabuğunu içerir.",
      foundationEyebrow: "Başlangıç ilkeleri",
      foundationTitle: "İçerikten önce güvenilir bir temel.",
      foundations: [
        {
          title: "Doğrulanmış içerik",
          description:
            "Ürün adları, kullanım bilgileri ve diğer beyanlar onaylı kaynak olmadan yayımlanmaz.",
        },
        {
          title: "Net proje kapsamı",
          description:
            "Bu yapı yalnızca Anka West Skincare web deneyiminin frontend temelini oluşturur.",
        },
        {
          title: "Sade teknik başlangıç",
          description:
            "Katalog, satış ve iletişim akışları iş gereksinimleri kesinleştiğinde değerlendirilir.",
        },
      ],
    },
    footer: {
      summary: "Anka West Skincare web sitesi hazırlık aşamasındadır.",
    },
  },
} as const satisfies SiteConfig;
