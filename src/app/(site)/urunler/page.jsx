import { Suspense } from "react";

import { ProductsCatalog } from "@/components/products/catalog";
import { ProductsCatalogSkeleton } from "@/components/products/catalogSkeleton";
import { ProductsPage } from "@/components/products";
import { getPublicCatalog } from "@/lib/catalog/publicCatalog";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Ürünler",
  description:
    "GLUTANEX ve Exome cilt bakım ürünlerini kategori, doku ve aktif içerik üzerinden keşfedin.",
  path: "/urunler",
});

async function CatalogContent() {
  const catalog = await getPublicCatalog();

  return <ProductsCatalog products={catalog.products} categories={catalog.categories} />;
}

export default function UrunlerPage() {
  const catalog = (
    <Suspense fallback={<ProductsCatalogSkeleton />}>
      <CatalogContent />
    </Suspense>
  );

  return <ProductsPage catalog={catalog} />;
}
