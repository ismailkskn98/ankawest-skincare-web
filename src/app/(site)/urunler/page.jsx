import { ProductsPage } from "@/components/products";
import { getPublicCatalog } from "@/lib/catalog/publicCatalog";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Ürünler",
  description:
    "GLUTANEX ve Exome cilt bakım ürünlerini kategori, doku ve aktif içerik üzerinden keşfedin.",
  path: "/urunler",
});

export default async function UrunlerPage() {
  const catalog = await getPublicCatalog();

  return (
    <ProductsPage
      products={catalog.products}
      categories={catalog.categories}
      source={catalog.source}
    />
  );
}
