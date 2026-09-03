import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import { TRENDYOL_STORE_URL } from "@/config/site-content";

import { ProductRail } from "./productRail";
import { Showcase } from "./showcase";

export function ProductCollection({ collection, imageSide = "left" }) {
  const imageOnRight = imageSide === "right";

  return (
    <div
      className={`${collection.backgroundClassName} grid min-[1024px]:grid-cols-2`}
      data-scroll-parallax-section
      data-parallax-strength={collection.parallaxStrength}
    >
      <Showcase
        className={imageOnRight ? "min-[1024px]:order-2" : ""}
        {...collection.showcase}
      />

      <div
        className={`min-w-0 px-[clamp(1.15rem,3.5vw,4.5rem)] py-10 min-[768px]:py-12 min-[1024px]:py-[clamp(3.25rem,5.5vw,6.25rem)] ${
          imageOnRight ? "min-[1024px]:order-1" : ""
        }`}
        data-motion-group
      >
        <div
          className="flex items-start justify-between gap-5 min-[901px]:gap-8"
          data-section-reveal
        >
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.13em] text-site-copy uppercase">
              {collection.eyebrow}
            </p>
            <h3 className="font-canela mt-2.5 text-[clamp(2.35rem,4.8vw,4.2rem)] leading-[0.96] font-light tracking-[-0.035em] text-site-ink min-[1024px]:mt-3 min-[1024px]:text-[clamp(2.6rem,3.8vw,4.6rem)]">
              {collection.title}
              <span className="block">{collection.scriptTitle}</span>
            </h3>
          </div>

          <a
            className="group grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-site-ink text-site-paper transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none min-[901px]:size-14 min-[1280px]:size-16"
            href={TRENDYOL_STORE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={`${collection.title} ${collection.scriptTitle} seçkisini Trendyol'da aç`}
          >
            <ArrowRightIcon size={22} weight="light" aria-hidden="true" />
          </a>
        </div>

        <ProductRail
          products={collection.products}
          ariaLabel={`${collection.title} ${collection.scriptTitle} ürünleri`}
          reverseAutoplay={collection.reverseAutoplay}
        />

        <div
          className="mt-5 flex flex-col gap-5 border-t border-[rgba(59,59,59,0.15)] pt-5 min-[1024px]:mt-6 min-[1024px]:flex-row min-[1024px]:items-end min-[1024px]:justify-between min-[1024px]:gap-6 min-[1024px]:pt-7"
          data-section-reveal
        >
          <p className="max-w-[460px] text-[clamp(0.88rem,1.1vw,0.94rem)] leading-[1.5] text-site-copy">
            {collection.description}
          </p>
          <a
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-site-paper py-1.5 pr-1.5 pl-5 text-[0.68rem] font-semibold tracking-[0.05em] text-site-ink uppercase transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none min-[1024px]:gap-4 min-[1024px]:pl-6 min-[1024px]:text-[0.7rem]"
            href={TRENDYOL_STORE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Tüm seçkiyi incele
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-site-ink text-site-paper min-[1024px]:size-10">
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
          </a>
        </div>
      </div>
    </div>
  );
}
