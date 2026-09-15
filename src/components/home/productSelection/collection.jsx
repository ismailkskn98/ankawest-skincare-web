import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

import { ProductRail } from "./productRail";
import { Showcase } from "./showcase";

export function ProductCollection({ collection, imageSide = "left" }) {
  const imageOnRight = imageSide === "right";

  return (
    <div
      className={`${collection.backgroundClassName} grid lg:grid-cols-2`}
      data-scroll-parallax-section
      data-parallax-strength={collection.parallaxStrength}
    >
      <Showcase
        className={imageOnRight ? "lg:order-2" : ""}
        {...collection.showcase}
      />

      <div
        className={`min-w-0 px-[clamp(1.25rem,3.5vw,4.5rem)] py-[clamp(2.75rem,6vw,4rem)] lg:py-[clamp(3.5rem,5.5vw,6.25rem)] short-desktop:py-[clamp(2.75rem,4vh,4.5rem)] ${
          imageOnRight ? "lg:order-1" : ""
        }`}
        data-motion-group
      >
        <div
          className="flex items-start justify-between gap-[clamp(1rem,2.5vw,2rem)]"
          data-section-reveal
        >
          <div>
            <p className="text-[clamp(0.58rem,0.8vw,0.68rem)] font-semibold tracking-[0.13em] text-site-copy uppercase">
              {collection.eyebrow}
            </p>
            <h3 className="font-sentient mt-2.5 text-[clamp(2.1rem,8.5vw,3.2rem)] leading-[0.96] font-light tracking-[-0.035em] text-site-ink md:text-[clamp(2.35rem,5.2vw,3.75rem)] lg:mt-3 lg:text-[clamp(2.5rem,3.8vw,4.6rem)]">
              {collection.title}
              <span className="block">{collection.scriptTitle}</span>
            </h3>
          </div>

          <Link
            className="group grid size-[clamp(3rem,3.2vw,4rem)] shrink-0 place-items-center overflow-hidden rounded-full bg-site-ink text-site-paper transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none"
            href="/urunler"
            aria-label={`${collection.title} ${collection.scriptTitle} ürünlerini incele`}
          >
            <ArrowRightIcon size={22} weight="light" aria-hidden="true" />
          </Link>
        </div>

        {collection.products.length > 0 ? (
          <ProductRail
            products={collection.products}
            ariaLabel={`${collection.title} ${collection.scriptTitle} ürünleri`}
            reverseAutoplay={collection.reverseAutoplay}
            revealDirection={imageOnRight ? "left" : "right"}
          />
        ) : (
          <p className="mt-[clamp(2rem,3.5vw,3.75rem)] text-[clamp(0.84rem,1vw,0.94rem)] leading-[1.55] text-site-copy" role="status">
            Bu seçkide henüz yayınlanmış ürün bulunmuyor.
          </p>
        )}

        <div
          className="mt-[clamp(1.25rem,2vw,2rem)] flex flex-col gap-[clamp(1rem,2vw,1.5rem)] border-t border-[rgba(59,59,59,0.15)] pt-[clamp(1.25rem,2vw,1.75rem)] lg:flex-row lg:items-end lg:justify-between"
          data-section-reveal
        >
          <p className="max-w-[460px] text-[clamp(0.84rem,1vw,1rem)] leading-[1.55] text-site-copy">
            {collection.description}
          </p>
          <Link
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-site-paper py-[0.38rem] pr-[0.38rem] pl-[clamp(1.1rem,1.5vw,1.5rem)] text-[clamp(0.65rem,0.55vw,0.75rem)] font-semibold tracking-[0.05em] text-site-ink uppercase transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none"
            href="/urunler"
          >
            Tüm ürünleri incele
            <span className="relative grid size-[clamp(2.25rem,2.4vw,2.5rem)] place-items-center overflow-hidden rounded-full bg-site-ink text-site-paper">
              <ArrowRightIcon
                className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[170%] motion-reduce:transition-none"
                size={17}
                weight="light"
                aria-hidden="true"
              />
              <ArrowRightIcon
                className="absolute -translate-x-[170%] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0 motion-reduce:transition-none"
                size={17}
                weight="light"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
