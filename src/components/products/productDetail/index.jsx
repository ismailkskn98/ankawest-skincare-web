import { PageMotionReady } from "@/components/site/pageMotionReady";

import { getProductFacts, getProductMedia, getTrendyolProductUrl } from "./helpers";
import { MobileProductCta } from "./mobileProductCta";
import { ProductHero } from "./productHero";
import { ProductInformation } from "./productInformation";
import { ProductIntro } from "./productIntro";
import { RelatedProducts } from "./relatedProducts";

export function ProductDetail({ product, relatedProducts = [] }) {
  const detailMedia = getProductMedia(product);
  const firstImage = detailMedia.find((item) => item.type === "image")?.url || null;
  const mainImage = product.transparentImageUrl || product.detailImageUrl || product.primaryImageUrl || firstImage;
  const detailUrl = getTrendyolProductUrl(product.trendyolUrl);
  const productFacts = getProductFacts(product);
  const productTitle = product.fullName || product.name;

  return (
    <article className={`fluid bg-site-paper text-site-ink ${detailUrl ? "pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0" : ""}`}>
      <PageMotionReady />
      <ProductHero
        product={product}
        detailMedia={detailMedia}
        detailUrl={detailUrl}
        productFacts={productFacts}
        productTitle={productTitle}
      />
      <ProductIntro product={product} />
      <ProductInformation product={product} mainImage={mainImage} />
      <RelatedProducts products={relatedProducts} />
      {detailUrl ? <MobileProductCta href={detailUrl} /> : null}
    </article>
  );
}
