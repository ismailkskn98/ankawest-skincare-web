import {
  ANKAWEST_URL,
  INSTAGRAM_URL,
  TRENDYOL_STORE_URL,
} from "@/config/site-content";

export const SITE_NAME = "Anka West Skincare";
export const SITE_NAME_SHORT = "Anka West";
export const SITE_LOCALE = "tr_TR";
export const SITE_LANGUAGE = "tr";

export const SITE_DESCRIPTION =
  "GLUTANEX ve Exome cilt bakım ürünlerini bakım ihtiyacı, aktif içerik ve kullanım adımları üzerinden keşfedin.";

export const SITE_TAGLINE = "Cildini dinleyen bakım, sana özgü.";

/** Logo ve sosyal paylaşım asset yolları (public köküne göre). */
export const SITE_ASSETS = {
  logoWebp: "/images/logo/ankawestskincare-logo.webp",
  logoPng: "/images/logo/ankawestskincare-logo.png",
  logoSvg: "/images/logo/ankawestskincare-logo.svg",
  logoSchema: "/images/logo/ankawestskincare-logo-1200.webp",
  icon512: "/images/logo/icon-512.png",
  favicon48: "/images/logo/favicon-48.png",
  favicon96: "/images/logo/favicon-96.png",
  appleTouchIcon: "/apple-touch-icon.png",
  ogImage: "/og-default.jpg",
  faviconIco: "/favicon.ico",
};

export const SITE_SOCIAL = {
  instagram: INSTAGRAM_URL,
  trendyol: TRENDYOL_STORE_URL,
  corporate: ANKAWEST_URL,
};

export const SITE_CONTACT = {
  email: "info@ankawest.com",
  phone: "+905332139901",
  phoneDisplay: "+90 533 213 99 01",
};

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

  if (fromEnv) {
    return fromEnv;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "http://localhost:3011";
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "" : normalized}` || base;
}

/** Staging’de false; canlıda true veya tanımsız bırakın. */
export function isIndexingAllowed() {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
}
