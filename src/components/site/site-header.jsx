import Image from "next/image";
import Link from "next/link";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";

import {
  INSTAGRAM_URL,
  TRENDYOL_STORE_URL,
} from "@/config/site-content";

import { MobileNavigation } from "./mobile-navigation";

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

export function SiteHeader() {
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

        <Link
          className="inline-flex min-h-12 w-fit items-center rounded-[10px]"
          href="#top"
          aria-label="Anka West Skincare anasayfa"
        >
          <span className="relative block h-[46px] w-[138px] overflow-hidden min-[901px]:h-[52px] min-[901px]:w-[164px]">
            <Image
              className="absolute top-[-20px] left-0 h-auto w-[138px] max-w-none brightness-0 invert transition-[filter] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[scrolled=true]/header:brightness-100 group-data-[scrolled=true]/header:invert-0 motion-reduce:transition-none min-[901px]:top-[-24px] min-[901px]:w-[164px]"
              src="/images/logo/ankawestskincare-logo.png"
              alt="Anka West Skincare"
              width={465}
              height={287}
              sizes="(max-width: 900px) 138px, 164px"
            />
          </span>
        </Link>

        <nav
          className="hidden translate-y-[2px] items-center justify-center gap-7 min-[901px]:flex min-[1101px]:gap-[clamp(28px,3.5vw,66px)]"
          aria-label="Ana menü"
        >
          {navigationItems.map((item) => (
            <a
              className="group relative inline-flex min-h-11 items-center whitespace-nowrap text-[0.72rem] font-semibold tracking-[0.015em] uppercase opacity-[0.92]"
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.label}
              <span
                className="absolute inset-x-0 bottom-2 h-px origin-right scale-x-0 bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>

        <div
          className="hidden min-h-[54px] items-center justify-self-end rounded-full bg-[rgba(250,249,246,0.96)] py-[5px] pr-[7px] pl-5 text-[#2f322f] shadow-[0_12px_36px_rgba(12,17,13,0.1)] min-[901px]:inline-flex"
          role="group"
          aria-label="Hızlı bağlantılar"
        >
          <a
            className="inline-flex min-h-11 items-center justify-center pr-4 pl-0.5 text-[0.69rem] font-semibold tracking-[0.035em] uppercase"
            href={TRENDYOL_STORE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Seçki
          </a>
          <span
            className="h-6 w-px bg-[rgba(47,50,47,0.22)]"
            aria-hidden="true"
          />
          <a
            className="inline-flex min-h-11 w-11 items-center justify-center rounded-full transition-[background-color,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-[5deg] hover:bg-[rgba(47,50,47,0.08)] focus-visible:rotate-[5deg] focus-visible:bg-[rgba(47,50,47,0.08)] motion-reduce:transition-none"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Anka West Skincare Instagram hesabını aç"
          >
            <InstagramLogoIcon size={19} weight="thin" aria-hidden="true" />
          </a>
        </div>

        <MobileNavigation
          items={navigationItems}
          storeUrl={TRENDYOL_STORE_URL}
        />
      </div>
    </header>
  );
}
