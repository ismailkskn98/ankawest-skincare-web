import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

export function ProductCta({ href, className = "inline-flex" }) {
  return (
    <a
      className={`group min-h-[clamp(3.25rem,7vh,3.75rem)] w-full max-w-[22rem] items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-[clamp(1.25rem,2.5vw,1.5rem)] text-[clamp(0.66rem,0.76vw,0.71rem)] font-semibold tracking-[0.08em] text-site-paper uppercase shadow-[0_14px_38px_rgba(29,31,29,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      Trendyol’da incele
      <span className="relative grid size-[clamp(2.5rem,5vh,2.75rem)] place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink">
        <ArrowUpRightIcon
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[160%] group-hover:-translate-y-[160%] motion-reduce:transition-none"
          size={18}
          weight="light"
          aria-hidden="true"
        />
        <ArrowUpRightIcon
          className="absolute -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden"
          size={18}
          weight="light"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
