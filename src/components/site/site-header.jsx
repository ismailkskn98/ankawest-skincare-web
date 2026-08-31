import Image from "next/image";
import Link from "next/link";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";

import {
  INSTAGRAM_URL,
  TRENDYOL_STORE_URL,
} from "@/config/site-content";

import { MobileNavigation } from "./mobile-navigation";
import styles from "./home-shell.module.css";

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
    <header className={styles.siteHeader} data-header-reveal>
      <div className={styles.headerInner}>
        <Link
          className={styles.brandLink}
          href="#top"
          aria-label="Anka West Skincare anasayfa"
        >
          <span className={styles.brandCrop}>
            <Image
              className={styles.brandImage}
              src="/images/logo/ankawestskincare-logo.png"
              alt="Anka West Skincare"
              width={465}
              height={287}
              sizes="(max-width: 900px) 138px, 164px"
            />
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Ana menü">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className={styles.headerUtility}
          role="group"
          aria-label="Hızlı bağlantılar"
        >
          <a
            className={styles.utilityLabel}
            href={TRENDYOL_STORE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Seçki
          </a>
          <span className={styles.utilityDivider} aria-hidden="true" />
          <a
            className={styles.utilityIcon}
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
