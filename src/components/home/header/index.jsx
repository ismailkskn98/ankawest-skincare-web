import { ANKAWEST_URL, INSTAGRAM_URL, TRENDYOL_STORE_URL } from "@/config/site-content";

import { Actions } from "./actions";
import { Logo } from "./logo";
import { MobileNavbar } from "./mobileNavbar";
import { Navbar } from "./navbar";

const navigationItems = [
  {
    label: "Ürünler",
    href: "/urunler",
  },
  {
    label: "Anka West",
    href: ANKAWEST_URL,
    external: true,
  },
  {
    label: "İletişim",
    href: "/iletisim",
  },
];

export function Header({ tone = "dark" }) {
  const isLight = tone === "light";

  return (
    <header
      className="fluid gridContainer group/header fixed inset-x-0 top-0 z-20 h-[74px] bg-transparent transition-[background-color] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform data-[scrolled=true]:bg-white data-[scrolled=true]:after:opacity-100 motion-reduce:transition-none motion-reduce:after:transition-none nav:h-[78px]"
      data-header
      data-header-reveal
      data-header-tone={isLight ? "light" : "dark"}
      data-scrolled="false"
    >
      <div className="relative isolate flex h-full min-h-0 min-w-0 items-center justify-between gap-[18px] text-[#f7f6f1] transition-colors duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[header-tone=light]/header:text-[#2f322f] group-data-[scrolled=true]/header:text-[#2f322f] motion-reduce:transition-none nav:grid nav:grid-cols-[minmax(150px,1fr)_auto_minmax(150px,1fr)] nav:gap-[22px] nav-wide:grid-cols-[minmax(164px,1fr)_auto_minmax(164px,1fr)] nav-wide:gap-[clamp(24px,4vw,72px)]">
        <Logo />
        <Navbar items={navigationItems} />
        <Actions />
        <MobileNavbar items={navigationItems} storeUrl={TRENDYOL_STORE_URL} />
      </div>
    </header>
  );
}
