import { SiteLink } from "@/components/site/siteLink";

export function Navbar({ items }) {
  return (
    <nav
      className="hidden translate-y-[2px] items-center justify-center gap-7 nav:flex nav-wide:gap-[clamp(28px,3.5vw,66px)]"
      aria-label="Ana menü"
    >
      {items.map((item) => (
        <SiteLink
          className="group relative inline-flex min-h-11 items-center whitespace-nowrap text-[0.72rem] font-semibold tracking-[0.015em] uppercase opacity-[0.92]"
          key={item.label}
          href={item.href}
          external={item.external}
        >
          {item.label}
          <span
            className="absolute inset-x-0 bottom-2 h-px origin-right scale-x-0 bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </SiteLink>
      ))}
    </nav>
  );
}
