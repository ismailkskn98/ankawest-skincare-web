import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

import { INSTAGRAM_URL } from "@/config/site-content";

export function CtaCard() {
  return (
    <article
      className="overflow-hidden relative z-10 rounded-[1.75rem] bg-[#20231f] shadow-[0_30px_90px_rgba(24,27,24,0.16)] nav:rounded-none nav:shadow-[0_40px_110px_rgba(24,27,24,0.14)]"
      aria-labelledby="footer-cta-title"
      data-section-reveal
    >
      <div className="flex min-h-[clamp(440px,78vw,520px)] flex-col px-6 py-8 text-[#f7f6f1] md:min-h-[clamp(500px,68vw,560px)] md:px-10 md:py-10 nav:min-h-[clamp(540px,58vw,620px)] nav:px-12 nav:py-12 xl:px-16 xl:py-14">
        <p className="text-[0.64rem] font-semibold tracking-[0.16em] text-white/52 uppercase">Anka West Skincare</p>

        <h2 id="footer-cta-title" className="font-canela mt-7 text-[clamp(2.4rem,8.5vw,4.2rem)] leading-[0.96] font-light tracking-[-0.04em] uppercase md:mt-8 md:text-[clamp(2.7rem,5.5vw,4.5rem)] nav:mt-9">
          <span className="block">Bizden</span>
          <span className="block">haberdar ol</span>
        </h2>

        <p className="mt-6 max-w-[36ch] text-[0.86rem] leading-[1.55] tracking-[-0.018em] text-white/62 nav:mt-8 nav:text-[0.9rem]">Yeni ürünleri ve kısa bakım notlarını Instagram&apos;da keşfet.</p>

        <div className="mt-auto flex flex-col items-center gap-4 border-t border-white/20 pt-7 nav:gap-5 nav:pt-9">
          <a
            className="group relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f7f6f1] text-[#20231f] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none md:size-18 xl:size-21"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Anka West Skincare Instagram hesabını aç"
          >
            <ArrowUpRightIcon
              className="absolute transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[170%] group-hover:-translate-y-[170%] motion-reduce:transition-none"
              size={23}
              weight="light"
              aria-hidden="true"
            />
            <ArrowUpRightIcon
              className="absolute -translate-x-[170%] translate-y-[170%] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden"
              size={23}
              weight="light"
              aria-hidden="true"
            />
          </a>

          <a
            className="group inline-flex items-center text-[0.68rem] font-semibold tracking-[0.08em] uppercase underline decoration-white/35 underline-offset-4 transition-colors duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-white focus-visible:decoration-white motion-reduce:transition-none"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Instagram&apos;da takip et
          </a>
        </div>
      </div>
    </article>
  );
}
