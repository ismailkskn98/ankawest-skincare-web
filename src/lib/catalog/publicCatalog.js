import "server-only";

import { apiRequest } from "@/lib/api/server";
import {
  CARD_TONES,
  TRANSPARENT_PRODUCT_IMAGES,
  demoCategories,
  demoProducts,
} from "./demoProducts";

// Demo verileri silinmeden geçici olarak devre dışı bırakıldı.
const DEMO_CATALOG_FALLBACK_ENABLED = false;
const HOMEPAGE_CAROUSEL_LIMIT = 6;

const HOMEPAGE_CAROUSEL_RULES = {
  1: {
    flag: "homepageCarousel1",
    order: "carousel1Order",
    terms: [
      ["glow therapy", 12],
      ["hydroglow", 10],
      ["aydinlatici", 6],
      ["pdrn", 5],
      ["glutatyon", 4],
      ["nemlendirici", 4],
      ["serum", 3],
      ["tonik", 3],
      ["maske", 2],
      ["krem", 1],
    ],
    penalties: [
      ["gunes", 24],
      ["spf", 24],
      ["deodorant", 14],
      ["koltuk alti", 14],
    ],
  },
  2: {
    flag: "homepageCarousel2",
    order: "carousel2Order",
    terms: [
      ["gunes", 24],
      ["spf", 24],
      ["sun", 18],
      ["uv", 18],
      ["leke karsiti", 9],
      ["ton esitleyici", 8],
      ["tonu esitleyici", 8],
      ["spot cream", 8],
      ["deodorant", 7],
      ["stick", 6],
      ["balm", 3],
    ],
    penalties: [],
  },
};

function normalizeSelectionText(value) {
  return String(value || "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

function getSelectionText(product) {
  return normalizeSelectionText([
    product.name,
    product.brand,
    product.categoryName || product.category?.name,
    product.shortDescription,
    product.description,
  ].filter(Boolean).join(" "));
}

function getCarouselScore(product, rule) {
  const selectionText = getSelectionText(product);
  const positiveScore = rule.terms.reduce(
    (score, [term, weight]) => score + (selectionText.includes(term) ? weight : 0),
    0,
  );

  return rule.penalties.reduce(
    (score, [term, weight]) => score - (selectionText.includes(term) ? weight : 0),
    positiveScore,
  );
}

function getProductIdentity(product) {
  return String(product.id || product.slug || "");
}

function getCarouselOrder(product, orderField) {
  const snakeCaseField = orderField === "carousel1Order"
    ? "carousel_1_order"
    : "carousel_2_order";

  return Number(product[orderField] ?? product[snakeCaseField] ?? 0);
}

function isUsableHomepageProduct(product) {
  const imageUrl = product.primaryImageUrl || product.image || "";
  return Boolean(product.slug && isSafeMediaUrl(imageUrl));
}

function selectHomepageProducts(rows, carouselNumber, claimedProductIds) {
  const rule = HOMEPAGE_CAROUSEL_RULES[carouselNumber];
  const otherRule = HOMEPAGE_CAROUSEL_RULES[carouselNumber === 1 ? 2 : 1];
  const eligibleRows = rows.filter((product) => {
    const productId = getProductIdentity(product);
    return productId && !claimedProductIds.has(productId) && isUsableHomepageProduct(product);
  });
  const manuallySelectedRows = eligibleRows
    .filter((product) => Boolean(product[rule.flag]))
    .sort((first, second) => (
      getCarouselOrder(first, rule.order) - getCarouselOrder(second, rule.order)
    ));
  const selectedRows = manuallySelectedRows.slice(0, HOMEPAGE_CAROUSEL_LIMIT);
  const selectedIds = new Set(selectedRows.map(getProductIdentity));
  const rankedRows = eligibleRows
    .filter((product) => !selectedIds.has(getProductIdentity(product)))
    .filter((product) => !product[otherRule.flag])
    .map((product, index) => ({
      product,
      index,
      score: getCarouselScore(product, rule),
    }))
    .filter(({ score }) => score > 0)
    .sort((first, second) => second.score - first.score || first.index - second.index);

  for (const { product } of rankedRows) {
    if (selectedRows.length >= HOMEPAGE_CAROUSEL_LIMIT) {
      break;
    }

    selectedRows.push(product);
    selectedIds.add(getProductIdentity(product));
  }

  for (const product of eligibleRows) {
    if (selectedRows.length >= HOMEPAGE_CAROUSEL_LIMIT) {
      break;
    }

    const productId = getProductIdentity(product);
    if (!selectedIds.has(productId) && !product[otherRule.flag]) {
      selectedRows.push(product);
      selectedIds.add(productId);
    }
  }

  selectedIds.forEach((productId) => claimedProductIds.add(productId));
  return selectedRows.map(normalizeProduct);
}

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
    href: product.slug ? `/urunler/${product.slug}` : null,
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

  if (
    DEMO_CATALOG_FALLBACK_ENABLED &&
    (!productRows || productRows.length === 0)
  ) {
    return {
      source: "demo",
      products: demoProducts.map(normalizeProduct),
      categories: demoCategories,
    };
  }

  return {
    source: productRows === null ? "unavailable" : "api",
    products: (productRows || []).map(normalizeProduct),
    categories:
      categoryRows && categoryRows.length > 0
        ? categoryRows.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
          }))
        : DEMO_CATALOG_FALLBACK_ENABLED
          ? demoCategories
          : [],
  };
}

export async function getPublicHomepageCarousels() {
  const productRows = await fetchPublicList(
    "/public/products/list",
    "?limit=60&sort=displayOrder&direction=ASC",
  );

  if (productRows === null) {
    return {
      available: false,
      carousel1: [],
      carousel2: [],
    };
  }

  const claimedProductIds = new Set();
  const carousel2 = selectHomepageProducts(productRows, 2, claimedProductIds);
  const carousel1 = selectHomepageProducts(productRows, 1, claimedProductIds);

  return {
    available: true,
    carousel1,
    carousel2,
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

  if (!DEMO_CATALOG_FALLBACK_ENABLED) {
    return null;
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
