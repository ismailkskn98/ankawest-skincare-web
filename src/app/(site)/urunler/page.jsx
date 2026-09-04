import { SiteShell } from "@/components/site/shell";
import { ProductsPage } from "@/components/products";
import { getPublicCatalog } from "@/lib/catalog/publicCatalog";

export const metadata = {
  title: "Ürünler",
  description:
    "GLUTANEX ve Exome cilt bakım ürünlerini kategori, doku ve aktif içerik üzerinden keşfedin.",
  openGraph: {
    title: "Ürünler | Anka West Skincare",
    description:
      "Temiz formüller ve anlaşılır ürün bilgisi ile Anka West Skincare ürünleri.",
    type: "website",
    locale: "tr_TR",
  },
};

export default async function UrunlerPage() {
  const catalog = await getPublicCatalog();

  return (
    <SiteShell>
      <ProductsPage
        products={catalog.products}
        categories={catalog.categories}
        source={catalog.source}
      />
    </SiteShell>
  );
}
