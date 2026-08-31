import Image from "next/image";
import Link from "next/link";

import {
  INSTAGRAM_URL,
  siteNavigation,
  TRENDYOL_STORE_URL,
} from "@/config/site-content";

import styles from "./site.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerTop}>
        <Link className={styles.footerBrand} href="#top" aria-label="Sayfanın başına dön">
          <span className={styles.footerBrandCrop}>
            <Image
              className={styles.footerBrandImage}
              src="/images/logo/ankawestskincare-logo.svg"
              alt="Anka West Skincare"
              width={465}
              height={287}
            />
          </span>
        </Link>
        <p>
          İçerik odaklı, sakin ve bilinçli bir Kore cilt bakımı keşfi.
        </p>
      </div>

      <div className={styles.footerColumns}>
        <div>
          <p>Keşfet</p>
          {siteNavigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <p>Bizi bul</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a href={TRENDYOL_STORE_URL} target="_blank" rel="noreferrer">
            Trendyol ↗
          </a>
        </div>
        <div>
          <p>Not</p>
          <span>
            Ürün içerikleri bilgilendirme amaçlıdır; tıbbi tavsiye yerine
            geçmez.
          </span>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 Anka West Skincare</span>
        <span>İstanbul · Türkiye</span>
      </div>
    </footer>
  );
}
