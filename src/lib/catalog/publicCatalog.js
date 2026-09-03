import "server-only";

import { apiRequest } from "@/lib/api/server";
import { CARD_TONES, demoCategories, demoProducts } from "./demoProducts";

function formatPrice(price, currency = "TRY") {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "";
  }

  try {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${Math.round(amount)} TL`;
  }
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

export function normalizeProduct(product, index = 0) {
  const brand = product.brand || "GLUTANEX";
  const displayName = product.displayName || getShortProductName(product.name, brand);

  return {
    id: product.id,
    brand,
    name: displayName,
    fullName: product.name,
    slug: product.slug,
    categoryName: product.categoryName || product.category?.name || "",
    categorySlug: product.categorySlug || product.category?.slug || "",
    sizeLabel: product.sizeLabel || "",
    price: product.price,
    currency: product.currency || "TRY",
    priceLabel: product.priceLabel || formatPrice(product.price, product.currency),
    shortDescription: product.shortDescription || "",
    primaryImageUrl: product.primaryImageUrl || product.image || "",
    hoverImageUrl: product.hoverImageUrl || null,
    tone: product.tone || pickTone(index),
    href: product.slug ? `/urunler/${product.slug}` : "#",
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
          images: payload.data.images || [],
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
      description: demoProduct.shortDescription,
      benefits: [],
      activeIngredients: [],
      suitableFor: [],
      usageInstructions: "",
      warnings: "",
      images: [],
    },
  };
}
