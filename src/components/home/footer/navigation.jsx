import { SiteLink } from "@/components/site/siteLink";
import {
  INSTAGRAM_URL,
  TRENDYOL_STORE_URL,
} from "@/config/site-content";

const navigationGroups = [
  {
    title: "Keşfet",
    links: [
      { label: "Ürünler", href: "/urunler" },
      { label: "Yaklaşımımız", href: "/#yaklasim" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  {
    title: "Takip et",
    links: [
      { label: "Instagram", href: INSTAGRAM_URL, external: true },
      { label: "Trendyol", href: TRENDYOL_STORE_URL, external: true },
    ],
  },
  {
    title: "İletişim",
    links: [
      { label: "info@ankawest.com", href: "mailto:info@ankawest.com" },
      { label: "+90 533 213 99 01", href: "tel:+905332139901" },
      { label: "İletişim formu", href: "/iletisim" },
    ],
  },
];

export function FooterNavigation() {
  return (
    <nav
      className="grid gap-[clamp(2rem,6vw,3.5rem)] sm:grid-cols-3 sm:gap-[clamp(1.5rem,3vw,3.25rem)] nav:gap-[clamp(1.75rem,3vw,3.75rem)]"
      aria-label="Footer menüsü"
      data-motion-group
    >
      {navigationGroups.map((group) => (
        <section key={group.title} data-section-reveal>
          <h3 className="text-[clamp(0.58rem,0.7vw,0.66rem)] font-semibold tracking-[0.12em] text-site-copy/60 uppercase">
            {group.title}
          </h3>
          <ul className="mt-[clamp(1rem,1.6vw,1.5rem)] grid gap-[clamp(0.55rem,1vw,0.8rem)]">
            {group.links.map((link) => (
              <li key={link.label}>
                <SiteLink
                  className="group relative inline-flex min-h-7 items-center text-[clamp(0.88rem,1vw,1rem)] leading-[1.4] tracking-[-0.022em] text-site-ink"
                  href={link.href}
                  external={link.external}
                >
                  {link.label}
                  <span
                    className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </SiteLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
