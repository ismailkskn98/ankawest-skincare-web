import "server-only";

import { apiRequest } from "@/lib/api/server";
import {
  CARD_TONES,
  TRANSPARENT_PRODUCT_IMAGES,
  demoCategories,
  demoProducts,
} from "./demoProducts";

function getShortProductName(name, brand = "") {
  if (!name) {
    return "Ürün";
  }

  let shortName = String(name);

  if (brand) {
    shortName = shortName.replace(new RegExp(`^${brand}\\s*`, "i"), "");
  }

  shortName = shortName.split("|")[0].trim();

  if (shortName.length > 56) {
    shortName = `${shortName.slice(0, 53).trim()}...`;
  }

  return shortName || name;
}

function pickTone(index) {
  return CARD_TONES[index % CARD_TONES.length];
}

function isSafeMediaUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  if (value.startsWith("/") && !value.startsWith("//")) {
    return true;
  }

  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function normalizeMedia(items) {
  const seen = new Set();

  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const url = item?.url || item?.imageUrl || "";
      const type = item?.type === "video" ? "video" : "image";
      return { ...item, type, url, imageUrl: url };
    })
    .filter((item) => isSafeMediaUrl(item.url))
    .filter((item) => item.type !== "video" || item.isApproved === true)
    .filter((item) => {
      const key = `${item.type}:${item.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function resolveDetailImageUrl(primaryImageUrl) {
  if (!primaryImageUrl) {
    return "";
  }

  // urunler-png-ham doluysa transparent set; aksi halde ham görsel + soft mist bg.
  if (primaryImageUrl.includes("/urunler-png-ham/")) {
    return primaryImageUrl;
  }

  return primaryImageUrl;
}

export function normalizeProduct(product, index = 0) {
  const brand = product.brand || "GLUTANEX";
  const displayName = product.displayName || getShortProductName(product.name, brand);
  const primaryImageUrl = product.primaryImageUrl || product.image || "";
  const transparentImageUrl =
    product.transparentImageUrl ||
    product.transparent_image_url ||
    product.cutoutImageUrl ||
    product.cutout_image_url ||
    TRANSPARENT_PRODUCT_IMAGES[product.slug] ||
    "";
  const detailImageUrl =
    product.detailImageUrl ||
    product.detail_image_url ||
    transparentImageUrl ||
    resolveDetailImageUrl(primaryImageUrl) ||
    primaryImageUrl;

  const media = normalizeMedia(product.media);
  const images = normalizeMedia(product.images).filter((item) => item.type === "image");

  return {
    id: product.id,
    barcode: product.barcode || "",
    brand,
    name: displayName,
    fullName: product.name,
    slug: product.slug,
    categoryName: product.categoryName || product.category?.name || "",
    categorySlug: product.categorySlug || product.category?.slug || "",
    sizeLabel: product.sizeLabel || "",
    shortDescription: product.shortDescription || "",
    primaryImageUrl,
    hoverImageUrl: product.hoverImageUrl || product.hover_image_url || null,
    transparentImageUrl,
    detailImageUrl,
    tone: product.tone || pickTone(index),
    priceLabel: product.priceLabel || product.price_label || product.price || "",
    href: product.slug ? `/urunler/${product.slug}` : "#",
    source: product.source || "manual",
    trendyolUrl: product.trendyolUrl || product.trendyol_url || "",
    trendyolAttributes: Array.isArray(product.trendyolAttributes)
      ? product.trendyolAttributes
      : [],
    media,
    images,
    sku: product.sku || "",
    seoTitle: product.seoTitle || "",
    seoDescription: product.seoDescription || "",
    seoKeywords: product.seoKeywords || "",
    canonicalUrl: product.canonicalUrl || "",
    ogTitle: product.ogTitle || "",
    ogDescription: product.ogDescription || "",
    ogImageUrl: product.ogImageUrl || "",
    homepageCarousel1: Boolean(product.homepageCarousel1),
    homepageCarousel2: Boolean(product.homepageCarousel2),
  };
}

async function fetchPublicList(pathname, search = "") {
  try {
    const payload = await apiRequest(pathname, { search });
    return payload?.data?.records || [];
  } catch {
    return null;
  }
}

export async function getPublicCatalog() {
  const [productRows, categoryRows] = await Promise.all([
    fetchPublicList("/public/products/list", "?limit=60&sort=displayOrder&direction=ASC"),
    fetchPublicList("/public/categories/list", "?limit=40&sort=displayOrder&direction=ASC"),
  ]);

  if (!productRows || productRows.length === 0) {
    return {
      source: "demo",
      products: demoProducts.map(normalizeProduct),
      categories: demoCategories,
    };
  }

  return {
    source: "api",
    products: productRows.map(normalizeProduct),
    categories:
      categoryRows && categoryRows.length > 0
        ? categoryRows.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
          }))
        : demoCategories,
  };
}

export async function getPublicHomepageCarousels() {
  const [carousel1Rows, carousel2Rows] = await Promise.all([
    fetchPublicList(
      "/public/products/list",
      "?homepageCarousel=1&limit=6&sort=carousel1Order&direction=ASC",
    ),
    fetchPublicList(
      "/public/products/list",
      "?homepageCarousel=2&limit=6&sort=carousel2Order&direction=ASC",
    ),
  ]);

  return {
    available: carousel1Rows !== null && carousel2Rows !== null,
    carousel1: (carousel1Rows || []).slice(0, 6).map(normalizeProduct),
    carousel2: (carousel2Rows || []).slice(0, 6).map(normalizeProduct),
  };
}

export async function getPublicProductBySlug(slug) {
  try {
    const payload = await apiRequest(`/public/products/list/${slug}`);
    if (payload?.data) {
      return {
        source: "api",
        product: {
          ...normalizeProduct(payload.data),
          description: payload.data.description || "",
          benefits: payload.data.benefits || [],
          activeIngredients: payload.data.activeIngredients || [],
          suitableFor: payload.data.suitableFor || [],
          usageInstructions: payload.data.usageInstructions || "",
          warnings: payload.data.warnings || "",
          trendyolAttributes: payload.data.trendyolAttributes || [],
          trendyolUrl: payload.data.trendyolUrl || payload.data.trendyol_url || "",
        },
      };
    }
  } catch {
    // Demo kataloğa düş
  }

  const demoProduct = demoProducts.find((product) => product.slug === slug);

  if (!demoProduct) {
    return null;
  }

  return {
    source: "demo",
    product: {
      ...normalizeProduct(demoProduct),
      description: demoProduct.description || demoProduct.shortDescription || "",
      benefits: demoProduct.benefits || [],
      activeIngredients: demoProduct.activeIngredients || [],
      suitableFor: demoProduct.suitableFor || [],
      usageInstructions: demoProduct.usageInstructions || "",
      warnings: demoProduct.warnings || "",
      images: demoProduct.images || [],
      trendyolUrl: demoProduct.trendyolUrl || "",
    },
  };
}
