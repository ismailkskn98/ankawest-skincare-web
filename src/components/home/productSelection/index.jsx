import { ProductCollection } from "./collection";
import { productCollections } from "./products";

export function ProductSelection() {
  return (
    <section
      id="urunler"
      className="fluid overflow-hidden bg-site-mist pt-20 pb-0 text-site-ink min-[901px]:pt-32"
      aria-labelledby="selection-title"
    >
      <div
        className="gridContainer"
        data-motion-group
        data-section-reveal
      >
        <p className="border-t border-[rgba(59,59,59,0.15)] pt-7 text-center text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase min-[901px]:pt-10">
          Bakım seçkisi
        </p>
        <h2
          id="selection-title"
          className="mx-auto mt-6 max-w-[1080px] text-center text-[clamp(3.2rem,12vw,5.7rem)] leading-[0.94] font-normal text-site-ink min-[901px]:text-[clamp(5rem,6.7vw,7.1rem)]"
        >
          <span className="block">Bakımın ritmini</span>
          <span className="mt-[0.025em] block font-editorial">
            seçkinle kur.
          </span>
        </h2>
      </div>

      <div className="mt-14 min-[901px]:mt-24">
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
