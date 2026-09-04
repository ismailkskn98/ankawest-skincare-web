import {
  SITE_ASSETS,
  SITE_CONTACT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SOCIAL,
  absoluteUrl,
  getSiteUrl,
} from "@/config/site";

export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE_ASSETS.logoSchema),
      width: 1200,
      height: 435,
    },
    image: absoluteUrl(SITE_ASSETS.ogImage),
    email: SITE_CONTACT.email,
    telephone: SITE_CONTACT.phone,
    sameAs: [SITE_SOCIAL.instagram, SITE_SOCIAL.corporate, SITE_SOCIAL.trendyol].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: SITE_CONTACT.email,
        telephone: SITE_CONTACT.phone,
        availableLanguage: ["Turkish"],
        areaServed: "TR",
      },
    ],
  };
}

export function buildWebSiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    inLanguage: "tr-TR",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function buildSiteGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationSchema(), buildWebSiteSchema()],
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildProductSchema(product) {
  const path = product.slug ? `/urunler/${product.slug}` : "/urunler";
  const pageUrl = absoluteUrl(path);
  const image =
    product.primaryImageUrl ||
    product.detailImageUrl ||
    product.transparentImageUrl ||
    product.image ||
    "";
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl(SITE_ASSETS.ogImage);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName || product.name,
    description:
      product.shortDescription ||
      product.description ||
      `${product.brand || SITE_NAME} ${product.name}`,
    image: [imageUrl],
    sku: product.slug || undefined,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE_NAME,
    },
    category: product.categoryName || undefined,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
  };

  const offerUrl = product.trendyolUrl || pageUrl;

  schema.offers = {
    "@type": "Offer",
    url: offerUrl,
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return schema;
}
