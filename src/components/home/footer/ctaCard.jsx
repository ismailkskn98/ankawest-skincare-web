import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

import { INSTAGRAM_URL } from "@/config/site-content";

export function CtaCard() {
  return (
    <article
      className="overflow-hidden relative z-10 rounded-[1.75rem] bg-[#20231f] shadow-[0_30px_90px_rgba(24,27,24,0.16)] min-[901px]:rounded-none min-[901px]:shadow-[0_40px_110px_rgba(24,27,24,0.14)]"
      aria-labelledby="footer-cta-title"
      data-section-reveal
    >
      <div className="flex min-h-[530px] flex-col px-7 py-10 text-[#f7f6f1] min-[768px]:min-h-[590px] min-[768px]:px-12 min-[768px]:py-12 min-[901px]:min-h-[650px] min-[901px]:px-16 min-[901px]:py-14">
        <p className="text-[0.64rem] font-semibold tracking-[0.16em] text-white/52 uppercase">Anka West Skincare</p>

        <h2 id="footer-cta-title" className="mt-9 text-[clamp(3.15rem,11.5vw,5.6rem)] leading-[0.9] font-normal tracking-[-0.06em] uppercase min-[768px]:leading-[0.88] min-[901px]:mt-10">
          <span className="block">Bizden</span>
          <span className="block">haberdar ol</span>
        </h2>

        <p className="mt-8 max-w-[36ch] text-[0.9rem] leading-[1.55] tracking-[-0.018em] text-white/62 min-[901px]:mt-10">Yeni ürünleri ve kısa bakım notlarını Instagram&apos;da keşfet.</p>

        <div className="mt-auto flex flex-col items-center gap-5 border-t border-white/20 pt-9 min-[901px]:pt-11">
          <a
            className="group relative grid size-18 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f7f6f1] text-[#20231f] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none min-[768px]:size-21"
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
