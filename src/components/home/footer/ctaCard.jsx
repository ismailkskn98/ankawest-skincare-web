import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

import { INSTAGRAM_URL } from "@/config/site-content";

export function CtaCard() {
  return (
    <article
      className="overflow-hidden rounded-[1.75rem] bg-[#20231f] min-[901px]:rounded-none"
      aria-labelledby="footer-cta-title"
      data-section-reveal
    >
      <div className="flex min-h-[470px] flex-col px-7 py-9 text-[#f7f6f1] min-[768px]:min-h-[570px] min-[768px]:px-12 min-[768px]:py-12">
        <p className="text-[0.66rem] font-semibold tracking-[0.16em] text-white/55 uppercase">
          Anka West Skincare
        </p>

        <h2
          id="footer-cta-title"
          className="mt-8 max-w-[8.5ch] text-[clamp(3.15rem,13vw,5.6rem)] leading-none font-normal tracking-[-0.065em] min-[768px]:leading-[0.94]"
        >
          Bizden
          <span className="block font-editorial tracking-[-0.045em]">
            haberdar ol.
          </span>
        </h2>

        <p className="mt-8 max-w-[34ch] text-[0.9rem] leading-[1.55] tracking-[-0.02em] text-white/62 min-[768px]:mt-10">
          Yeni ürünleri, bakım içeriklerini ve Anka West seçkisini Instagram&apos;da takip et.
        </p>

        <div className="mt-auto flex items-end justify-between gap-6 border-t border-white/20 pt-7">
          <a
            className="group inline-flex items-center gap-4 text-[0.7rem] font-semibold tracking-[0.08em] uppercase underline decoration-white/35 underline-offset-4 transition-colors duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-white focus-visible:decoration-white motion-reduce:transition-none"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Instagram&apos;da takip et
          </a>

          <a
            className="group relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f7f6f1] text-[#20231f] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none min-[768px]:size-20"
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
        </div>
      </div>
    </article>
  );
}
