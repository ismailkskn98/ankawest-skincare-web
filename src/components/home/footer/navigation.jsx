import {
  ANKAWEST_URL,
  INSTAGRAM_URL,
  TRENDYOL_STORE_URL,
} from "@/config/site-content";

const navigationGroups = [
  {
    title: "Keşfet",
    links: [
      { label: "Ürün seçkisi", href: TRENDYOL_STORE_URL, external: true },
      { label: "Yaklaşımımız", href: "#yaklasim" },
      { label: "Bakım seçkisi", href: "#urunler" },
    ],
  },
  {
    title: "Bizi takip et",
    links: [
      { label: "Instagram", href: INSTAGRAM_URL, external: true },
      { label: "Trendyol", href: TRENDYOL_STORE_URL, external: true },
    ],
  },
  {
    title: "Anka West",
    links: [
      { label: "Kurumsal site", href: ANKAWEST_URL, external: true },
      { label: "Ana sayfaya dön", href: "#top" },
    ],
  },
];

export function FooterNavigation() {
  return (
    <nav
      className="grid gap-12 border-t border-black/15 pt-10 min-[640px]:grid-cols-3 min-[901px]:max-w-[62%] min-[901px]:gap-[clamp(36px,5vw,88px)]"
      aria-label="Footer menüsü"
      data-motion-group
    >
      {navigationGroups.map((group) => (
        <section key={group.title} data-section-reveal>
          <h3 className="text-[0.65rem] font-semibold tracking-[0.14em] text-site-copy uppercase">
            {group.title}
          </h3>
          <ul className="mt-5 grid gap-3.5">
            {group.links.map((link) => (
              <li key={link.label}>
                <a
                  className="group relative inline-flex min-h-7 items-center text-[0.95rem] tracking-[-0.025em] text-site-ink"
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
