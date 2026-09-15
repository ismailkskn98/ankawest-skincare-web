import { ProductCollection } from "./collection";
import { productCollections } from "./products";
import { getPublicHomepageCarousels } from "@/lib/catalog/publicCatalog";

export async function ProductSelection() {
  const homepageProducts = await getPublicHomepageCarousels();
  const collections = productCollections.map((collection, index) => {
    const products = index === 0
      ? homepageProducts.carousel1
      : homepageProducts.carousel2;

    return {
      ...collection,
      products,
    };
  });

  return (
    <section
      id="urunler"
      className="fluid overflow-hidden bg-site-mist pt-[clamp(3.5rem,8vh,7rem)] pb-0 text-site-ink short-desktop:pt-[clamp(3.25rem,6vh,4.5rem)]"
      aria-labelledby="selection-title"
    >
      <div
        className="gridContainer"
        data-motion-group
        data-section-reveal
      >
        <p className="text-center text-[clamp(0.58rem,0.8vw,0.68rem)] font-semibold tracking-[0.16em] text-site-copy uppercase">
          Cilt bakımı
        </p>
        <h2
          id="selection-title"
          className="font-sentient mx-auto mt-[clamp(1rem,1.8vw,1.5rem)] max-w-[12ch] text-center text-[clamp(2.4rem,8.5vw,3.6rem)] leading-[0.96] font-light tracking-[-0.04em] text-site-ink nav:text-[clamp(3.25rem,4.8vw,5.8rem)] xl:text-[clamp(3.75rem,5.2vw,6.1rem)]"
        >
          <span className="block">Bakımın ritmini</span>
          <span className="mt-[0.02em] block">cildinle kur</span>
        </h2>
      </div>

      <div className="mt-[clamp(2.5rem,5vw,5.5rem)] short-desktop:mt-[clamp(2.25rem,4vw,3.5rem)]">
        {collections.map((collection, index) => (
          <ProductCollection
            key={`${collection.title}-${collection.scriptTitle}`}
            collection={collection}
            imageSide={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </section>
  );
}
