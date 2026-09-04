import { getSiteUrl, isIndexingAllowed } from "@/config/site";

export default function robots() {
  const siteUrl = getSiteUrl();
  const allowIndex = isIndexingAllowed();

  if (!allowIndex) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
