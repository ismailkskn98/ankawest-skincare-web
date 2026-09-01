import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import { TRENDYOL_STORE_URL } from "@/config/site-content";

export function Cta() {
  return (
    <a
      className="group/cta grid min-h-16 w-full grid-cols-[1fr_50px] items-center justify-self-center rounded-full bg-[rgba(250,249,246,0.96)] py-[5px] pr-1.5 pl-[18px] text-center text-[0.69rem] font-normal tracking-[0.02em] uppercase shadow-[0_16px_48px_rgba(10,14,11,0.12)] min-[901px]:min-h-[76px] min-[901px]:w-[min(72vw,920px)] min-[901px]:grid-cols-[1fr_58px] min-[901px]:py-1.5 min-[901px]:pr-[7px] min-[901px]:pl-7 min-[901px]:text-[0.76rem] short-desktop:min-h-16 short-desktop:grid-cols-[1fr_50px]"
      href={TRENDYOL_STORE_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Ürün seçkisini Trendyol'da aç"
      data-hero-cta
    >
      <span className="pl-[50px] text-[#2f322f] min-[901px]:pl-[58px] short-desktop:pl-[50px]">
        Ürün seçkisini keşfet
      </span>
      <span
        data-hero-arrow
        className="relative grid size-[50px] place-items-center overflow-hidden rounded-full bg-[#2f322f] text-[#f7f6f1] min-[901px]:size-[58px] short-desktop:size-[50px]"
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
