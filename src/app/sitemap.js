import { getSiteUrl } from "@/config/site";
import { getPublicCatalog } from "@/lib/catalog/publicCatalog";

export default async function sitemap() {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/urunler`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  let productRoutes = [];

  try {
    const catalog = await getPublicCatalog();
    productRoutes = (catalog.products || [])
      .filter((product) => product.slug)
      .map((product) => ({
        url: `${siteUrl}/urunler/${product.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch {
    productRoutes = [];
  }

  return [...staticRoutes, ...productRoutes];
}
