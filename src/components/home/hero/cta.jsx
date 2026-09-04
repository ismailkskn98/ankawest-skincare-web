import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import { TRENDYOL_STORE_URL } from "@/config/site-content";

export function Cta() {
  return (
    <a
      className="group/cta grid min-h-14 w-full grid-cols-[1fr_46px] items-center justify-self-center rounded-full bg-[rgba(250,249,246,0.96)] py-[5px] pr-1.5 pl-4 text-center text-[0.66rem] font-normal tracking-[0.02em] uppercase shadow-[0_16px_48px_rgba(10,14,11,0.12)] nav:min-h-[68px] nav:w-[min(70vw,860px)] nav:grid-cols-[1fr_54px] nav:py-1.5 nav:pr-[7px] nav:pl-6 nav:text-[0.74rem] short-desktop:min-h-14 short-desktop:grid-cols-[1fr_46px]"
      href={TRENDYOL_STORE_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Ürünleri Trendyol'da aç"
      data-hero-cta
    >
      <span className="pl-[46px] text-[#2f322f] nav:pl-[54px] short-desktop:pl-[46px]">
        Ürünleri keşfet
      </span>
      <span
        data-hero-arrow
        className="relative grid size-[46px] place-items-center overflow-hidden rounded-full bg-[#2f322f] text-[#f7f6f1] nav:size-[54px] short-desktop:size-[46px]"
        aria-hidden="true"
      >
        <span
          data-arrow-primary
          className="grid size-full place-items-center transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-[145%] group-focus-visible/cta:translate-x-[145%] motion-reduce:transform-none motion-reduce:transition-none"
        >
          <ArrowRightIcon size={21} weight="light" />
        </span>
        <span
          data-arrow-secondary
          className="absolute inset-0 grid -translate-x-[145%] place-items-center transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0 group-focus-visible/cta:translate-x-0 motion-reduce:hidden motion-reduce:transition-none"
        >
          <ArrowRightIcon size={21} weight="light" />
        </span>
      </span>
    </a>
  );
}
