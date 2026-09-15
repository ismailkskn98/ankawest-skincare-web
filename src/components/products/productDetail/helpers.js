const HIDDEN_PRODUCT_ATTRIBUTES = new Set([
  "içerik yazısı",
  "kullanım talimatı/uyarıları",
  "ürün güvenliği bilgisi",
  "birincil ithalatçı adı",
  "üretici adres bilgisi",
  "üretici mail adresi",
]);

function isSafeMediaUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;

  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function getProductMedia(product) {
  const media = [];
  const seen = new Set();
  const addMedia = (item) => {
    const url = item?.url || item?.imageUrl || "";
    const type = item?.type === "video" ? "video" : "image";
    const key = `${type}:${url}`;

    if (!isSafeMediaUrl(url) || seen.has(key)) return;
    if (type === "video" && item?.isApproved !== true) return;

    seen.add(key);
    media.push({ ...item, key: item?.externalId || item?.id || key, type, url });
  };

  addMedia({ type: "image", source: "website", url: product.primaryImageUrl, altText: product.fullName || product.name });
  for (const item of Array.isArray(product.media) ? product.media : []) addMedia(item);
  for (const item of Array.isArray(product.images) ? product.images : []) addMedia(item);
  addMedia({ type: "image", source: "website", url: product.transparentImageUrl, altText: product.fullName || product.name });
  addMedia({ type: "image", source: "website", url: product.detailImageUrl, altText: product.fullName || product.name });

  return media;
}

export function getTrendyolProductUrl(value) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

export function normalizeListItems(items) {
  if (!items?.length) return [];

  return items.map((item) => {
    if (typeof item === "string") {
      return { title: item.replace(/^✔\s*/, "").replace(/^[-•]\s*/, "").trim(), description: "" };
    }
    if (item && typeof item === "object") {
      return { title: item.name || item.title || "", description: item.description || "" };
    }
    return null;
  }).filter((item) => item?.title);
}

export function getIngredientGroups(items) {
  if (!items?.length) return [];

  const grouped = [];
  let current = null;
  for (const raw of items) {
    if (typeof raw !== "string") {
      if (raw?.name || raw?.title) grouped.push({ name: raw.name || raw.title, descriptions: raw.description ? [raw.description] : [] });
      continue;
    }
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("-") || line.startsWith("•")) {
      if (current) current.descriptions.push(line.replace(/^[-•]\s*/, ""));
      continue;
    }
    const separatorIndex = line.indexOf(":");
    const hasDescription = separatorIndex > 0 && separatorIndex < line.length - 1;
    current = { name: hasDescription ? line.slice(0, separatorIndex).trim() : line, descriptions: hasDescription ? [line.slice(separatorIndex + 1).trim()] : [] };
    grouped.push(current);
  }
  return grouped;
}

export function getProductFacts(product) {
  const attributes = Array.isArray(product.trendyolAttributes) ? product.trendyolAttributes : [];
  const facts = product.sizeLabel ? [{ value: product.sizeLabel, label: "Net içerik" }] : [];
  for (const attributeName of ["Cilt Tipi", "Form", "Kullanma Amacı"]) {
    const attribute = attributes.find((item) => String(item?.name || "").toLocaleLowerCase("tr-TR") === attributeName.toLocaleLowerCase("tr-TR"));
    if (attribute?.value && facts.length < 4) facts.push({ value: "", label: `${attributeName}: ${attribute.value}` });
  }
  return facts;
}

export function getDisplayAttributes(product) {
  return (Array.isArray(product.trendyolAttributes) ? product.trendyolAttributes : [])
    .filter((attribute) => attribute?.name && attribute?.value)
    .filter((attribute) => !HIDDEN_PRODUCT_ATTRIBUTES.has(String(attribute.name).toLocaleLowerCase("tr-TR").trim()))
    .filter((attribute) => String(attribute.value).toLocaleLowerCase("tr-TR").trim() !== "tehlikeli değil");
}
