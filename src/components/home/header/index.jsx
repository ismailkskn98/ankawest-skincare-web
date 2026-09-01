import {
  INSTAGRAM_URL,
  TRENDYOL_STORE_URL,
} from "@/config/site-content";

import { Actions } from "./actions";
import { Logo } from "./logo";
import { MobileNavbar } from "./mobileNavbar";
import { Navbar } from "./navbar";

const navigationItems = [
  {
    label: "Ürünler",
    href: TRENDYOL_STORE_URL,
    external: true,
  },
  {
    label: "Anka West",
    href: "https://www.ankawest.com/",
    external: true,
  },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    external: true,
  },
];

export function Header() {
  return (
    <header
      className="group/header fixed inset-x-0 top-0 z-20 box-border px-4 py-3.5 will-change-transform min-[901px]:px-[clamp(18px,4.4vw,84px)] min-[901px]:py-[clamp(16px,2.2vw,30px)]"
      data-header
      data-header-reveal
      data-scrolled="false"
    >
      <div className="relative isolate flex min-h-[54px] min-w-0 items-center justify-between gap-[18px] text-[#f7f6f1] transition-colors duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[scrolled=true]/header:text-[#2f322f] motion-reduce:transition-none min-[901px]:grid min-[901px]:grid-cols-[minmax(150px,1fr)_auto_minmax(150px,1fr)] min-[901px]:gap-[22px] min-[1101px]:grid-cols-[minmax(164px,1fr)_auto_minmax(164px,1fr)] min-[1101px]:gap-[clamp(24px,4vw,72px)]">
        <span
          className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 -z-1 rounded-[30px] bg-transparent transition-[background-color,box-shadow] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[scrolled=true]/header:bg-[rgba(250,249,246,0.96)] group-data-[scrolled=true]/header:shadow-[0_16px_46px_rgba(17,20,18,0.12)] motion-reduce:transition-none min-[901px]:-inset-x-4"
          aria-hidden="true"
        />

        <Logo />
        <Navbar items={navigationItems} />
        <Actions />
        <MobileNavbar
          items={navigationItems}
          storeUrl={TRENDYOL_STORE_URL}
        />
      </div>
    </header>
  );
}
