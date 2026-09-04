import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";

import { INSTAGRAM_URL, TRENDYOL_STORE_URL } from "@/config/site-content";

export function Actions() {
  return (
    <div
      className="hidden min-h-[54px] items-center justify-self-end rounded-full bg-[rgba(250,249,246,0.96)] py-[5px] pr-[7px] pl-5 text-[#2f322f] shadow-sm transition-[background-color,color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[scrolled=true]/header:bg-[#2f322f] group-data-[scrolled=true]/header:text-[#f7f6f1] group-data-[scrolled=true]/header:shadow-[0_12px_32px_rgba(12,17,13,0.16)] motion-reduce:transition-none nav:inline-flex"
      role="group"
      aria-label="Hızlı bağlantılar"
    >
      <a className="inline-flex min-h-11 items-center justify-center pr-4 pl-0.5 text-[0.69rem] font-semibold tracking-[0.035em] uppercase" href={TRENDYOL_STORE_URL} target="_blank" rel="noreferrer">
        Mağaza
      </a>
      <span
        className="h-6 w-px bg-[rgba(47,50,47,0.22)] transition-colors duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[scrolled=true]/header:bg-[rgba(247,246,241,0.3)] motion-reduce:transition-none"
        aria-hidden="true"
      />
      <a
        className="inline-flex min-h-11 w-11 items-center justify-center rounded-full transition-[background-color,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-[5deg] hover:bg-[rgba(47,50,47,0.08)] focus-visible:rotate-[5deg] focus-visible:bg-[rgba(47,50,47,0.08)] group-data-[scrolled=true]/header:hover:bg-[rgba(247,246,241,0.1)] group-data-[scrolled=true]/header:focus-visible:bg-[rgba(247,246,241,0.1)] motion-reduce:transition-none"
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Anka West Skincare Instagram hesabını aç"
      >
        <InstagramLogoIcon size={19} weight="thin" aria-hidden="true" />
      </a>
    </div>
  );
}
