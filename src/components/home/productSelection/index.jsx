import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import { TRENDYOL_STORE_URL } from "@/config/site-content";

import { ProductRail } from "./productRail";
import { Showcase } from "./showcase";

export function ProductSelection() {
  return (
    <section
      id="urunler"
      className="fluid gridContainer overflow-hidden bg-site-mist py-24 text-site-ink min-[901px]:py-36"
      aria-labelledby="selection-title"
      data-scroll-parallax-section
    >
      <div
        className="grid gap-6 border-t border-[rgba(59,59,59,0.15)] pt-7 text-center min-[901px]:pt-10"
        data-motion-group
        data-section-reveal
      >
        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase">
          Bakım seçkisi
        </p>
        <h2
          id="selection-title"
          className="mx-auto max-w-[900px] text-[clamp(3.2rem,12vw,5.7rem)] leading-[0.86] font-normal tracking-[-0.065em] text-site-ink min-[901px]:text-[clamp(5.2rem,7.2vw,7rem)]"
        >
          <span className="block">Bakımın ritmini</span>
          <span className="mt-[0.08em] block font-editorial tracking-[-0.045em]">
            seçkinle kur.
          </span>
        </h2>
      </div>

      <div
        className="mt-16 grid gap-10 min-[901px]:mt-24 min-[1024px]:grid-cols-[minmax(380px,0.86fr)_minmax(0,1.14fr)] min-[1024px]:items-start min-[1024px]:gap-[clamp(32px,5vw,82px)]"
        data-motion-group
      >
        <Showcase />

        <div className="min-w-0 min-[1024px]:pt-10">
          <div className="flex items-end justify-between gap-8" data-section-reveal>
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.13em] text-site-copy uppercase">
                GLUTANEX
              </p>
              <h3 className="mt-3 text-[clamp(3rem,6vw,5.4rem)] leading-[0.85] font-normal tracking-[-0.06em] text-site-ink">
                Işıltı
                <span className="block font-editorial tracking-[-0.04em]">
                  rutini
                </span>
              </h3>
            </div>

            <a
              className="group grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-site-ink text-site-paper transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none min-[901px]:size-16"
              href={TRENDYOL_STORE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Tüm Anka West Skincare seçkisini Trendyol'da aç"
            >
              <ArrowRightIcon
                className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                size={22}
                weight="light"
                aria-hidden="true"
              />
            </a>
          </div>

          <ProductRail />

          <div className="mt-6 flex flex-col gap-6 border-t border-[rgba(59,59,59,0.15)] pt-7 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between" data-section-reveal>
            <p className="max-w-[430px] text-[0.94rem] leading-[1.5] tracking-[-0.02em] text-site-copy">
              Farklı doku ve kullanım adımlarını aynı rutinde değerlendirebileceğin seçilmiş GLUTANEX ürünleri.
            </p>
            <a
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-site-paper py-1.5 pr-1.5 pl-6 text-[0.7rem] font-semibold tracking-[0.05em] text-site-ink uppercase transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] motion-reduce:transition-none"
              href={TRENDYOL_STORE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Tüm seçkiyi incele
              <span className="grid size-10 place-items-center rounded-full bg-site-ink text-site-paper">
                <ArrowRightIcon
                  className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                  size={17}
                  weight="light"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
