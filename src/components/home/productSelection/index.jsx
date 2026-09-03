import { ProductCollection } from "./collection";
import { productCollections } from "./products";

export function ProductSelection() {
  return (
    <section
      id="urunler"
      className="fluid overflow-hidden bg-site-mist pt-14 pb-0 text-site-ink min-[901px]:pt-[clamp(4.5rem,7vw,6.5rem)]"
      aria-labelledby="selection-title"
    >
      <div
        className="gridContainer"
        data-motion-group
        data-section-reveal
      >
        <p className="text-center text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase">
          Bakım seçkisi
        </p>
        <h2
          id="selection-title"
          className="font-canela mx-auto mt-5 max-w-[1080px] text-center text-[clamp(2.5rem,9vw,4.2rem)] leading-[0.96] font-light tracking-[-0.04em] text-site-ink min-[901px]:mt-6 min-[901px]:text-[clamp(3.5rem,5vw,5.8rem)] min-[1280px]:text-[clamp(4rem,5.4vw,6.1rem)]"
        >
          <span className="block">Bakımın ritmini</span>
          <span className="mt-[0.02em] block">seçkinle kur.</span>
        </h2>
      </div>

      <div className="mt-10 min-[901px]:mt-[clamp(2.75rem,5vw,4.5rem)]">
        {productCollections.map((collection, index) => (
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
