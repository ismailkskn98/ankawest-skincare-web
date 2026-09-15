import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

import { INSTAGRAM_URL } from "@/config/site-content";

export function CtaCard() {
  return (
    <article
      className="relative z-10 overflow-hidden rounded-[clamp(1.35rem,3vw,1.75rem)] bg-[#20231f] shadow-[0_30px_90px_rgba(24,27,24,0.16)] nav:rounded-none nav:shadow-[0_40px_110px_rgba(24,27,24,0.14)]"
      aria-labelledby="footer-cta-title"
      data-section-reveal
    >
      <div className="flex min-h-[clamp(25rem,78vw,32.5rem)] flex-col p-[clamp(1.5rem,4vw,2.5rem)] text-[#f7f6f1] md:min-h-[clamp(29rem,62vw,35rem)] nav:min-h-[clamp(31rem,min(53vw,72svh),38rem)] nav:p-[clamp(3rem,4vw,4rem)] short-desktop:nav:min-h-[clamp(29rem,66svh,34rem)] short-desktop:nav:p-[clamp(2.5rem,3vw,3.25rem)]">
        <p className="text-[clamp(0.58rem,0.75vw,0.66rem)] font-semibold tracking-[0.16em] text-white/52 uppercase">Anka West Skincare</p>

        <h2 id="footer-cta-title" className="font-sentient mt-[clamp(1.75rem,4vw,2.5rem)] text-[clamp(2.25rem,8vw,3.8rem)] leading-[0.96] font-light tracking-[-0.04em] uppercase nav:text-[clamp(3rem,4.5vw,5.5rem)]">
          <span className="block">Bizden</span>
          <span className="block">haberdar ol</span>
        </h2>

        <p className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[34ch] text-[clamp(0.82rem,1vw,0.94rem)] leading-[1.55] tracking-[-0.018em] text-white/62">Yeni ürünleri ve kısa bakım notlarını Instagram&apos;da keşfet.</p>

        <div className="mt-auto flex flex-col items-center gap-[clamp(0.9rem,1.5vw,1.25rem)] border-t border-white/20 pt-[clamp(1.5rem,3vw,2.25rem)]">
          <a
            className="group relative grid size-[clamp(3.75rem,5vw,5.25rem)] shrink-0 place-items-center overflow-hidden rounded-full bg-[#f7f6f1] text-[#20231f] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none"
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
            className="group inline-flex items-center text-[clamp(0.65rem,0.55vw,0.72rem)] font-semibold tracking-[0.08em] uppercase underline decoration-white/35 underline-offset-4 transition-colors duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-white focus-visible:decoration-white motion-reduce:transition-none"
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
