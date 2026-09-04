import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/products/detail";
import {
  getPublicCatalog,
  getPublicProductBySlug,
} from "@/lib/catalog/publicCatalog";

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
  const [result, catalog] = await Promise.all([
    getPublicProductBySlug(slug),
    getPublicCatalog(),
  ]);

  if (!result) {
    notFound();
  }

  const relatedProducts = catalog.products
    .filter((product) => product.slug !== result.product.slug)
    .filter((product) =>
      result.product.categorySlug
        ? product.categorySlug === result.product.categorySlug
        : true,
    )
    .slice(0, 4);

  const fallbackRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : catalog.products
          .filter((product) => product.slug !== result.product.slug)
          .slice(0, 4);

  return (
    <ProductDetail
      product={result.product}
      relatedProducts={fallbackRelated}
    />
  );
}
