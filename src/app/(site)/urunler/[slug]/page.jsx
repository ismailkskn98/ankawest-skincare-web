import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/products/detail";
import { JsonLd } from "@/components/site/jsonLd";
import { SITE_ASSETS } from "@/config/site";
import {
  getPublicCatalog,
  getPublicProductBySlug,
} from "@/lib/catalog/publicCatalog";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildProductSchema } from "@/lib/seo/schema";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getPublicProductBySlug(slug);

  if (!result) {
    return buildPageMetadata({
      title: "Ürün bulunamadı",
      path: `/urunler/${slug}`,
      noIndex: true,
    });
  }

  const product = result.product;
  const image =
    product.primaryImageUrl ||
    product.detailImageUrl ||
    product.transparentImageUrl ||
    SITE_ASSETS.ogImage;

  return buildPageMetadata({
    title: product.name,
    description:
      product.shortDescription ||
      `${product.brand} ${product.name} ürün detayı. Aktif içerikler, kullanım ve uygunluk bilgisi.`,
    path: `/urunler/${product.slug}`,
    image,
    type: "website",
  });
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

  const productSchema = buildProductSchema(result.product);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Anasayfa", path: "/" },
    { name: "Ürünler", path: "/urunler" },
    { name: result.product.name, path: `/urunler/${result.product.slug}` },
  ]);

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductDetail
        product={result.product}
        relatedProducts={fallbackRelated}
      />
    </>
  );
}
