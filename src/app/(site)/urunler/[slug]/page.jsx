import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/products/detail";
import { SiteShell } from "@/components/site/shell";
import { getPublicProductBySlug } from "@/lib/catalog/publicCatalog";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getPublicProductBySlug(slug);

  if (!result) {
    return {
      title: "Ürün bulunamadı",
    };
  }

  return {
    title: result.product.name,
    description:
      result.product.shortDescription ||
      `${result.product.brand} ${result.product.name} ürün detayı.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const result = await getPublicProductBySlug(slug);

  if (!result) {
    notFound();
  }

  return (
    <SiteShell>
      <ProductDetail product={result.product} />
    </SiteShell>
  );
}
