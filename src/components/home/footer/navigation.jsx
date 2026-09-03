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
      className="grid gap-10 min-[640px]:grid-cols-3 min-[640px]:gap-7 min-[901px]:gap-[clamp(28px,3vw,52px)]"
      aria-label="Footer menüsü"
      data-motion-group
    >
      {navigationGroups.map((group) => (
        <section key={group.title} data-section-reveal>
          <h3 className="text-[0.63rem] font-semibold tracking-[0.12em] text-site-copy/60 uppercase">
            {group.title}
          </h3>
          <ul className="mt-5 grid gap-3">
            {group.links.map((link) => (
              <li key={link.label}>
                <a
                  className="group relative inline-flex min-h-7 items-center text-[0.94rem] leading-[1.35] tracking-[-0.022em] text-site-ink"
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                >
                  {link.label}
                  <span
                    className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
