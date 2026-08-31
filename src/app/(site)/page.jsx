import { HeroSection } from "@/components/site/hero-section";
import { SiteHeader } from "@/components/site/site-header";
import { SiteMotionController } from "@/components/site/site-motion-controller";
import styles from "@/components/site/home-shell.module.css";

export const metadata = {
  title: "İhtiyacına Göre Kore Cilt Bakımı",
  description:
    "GLUTANEX ve Exome ürünlerini bakım ihtiyacı, aktif içerik ve kullanım adımları üzerinden keşfedin.",
  openGraph: {
    title: "Anka West Skincare",
    description:
      "Bakım ihtiyacınıza göre seçilmiş GLUTANEX ve Exome ürünlerini keşfedin.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function HomePage() {
  return (
    <div className={styles.siteRoot} data-site-root>
      <SiteMotionController />

      <a className={styles.skipLink} href="#main-content">
        Ana içeriğe geç
      </a>

      <SiteHeader />

      <main id="main-content">
        <HeroSection />
      </main>
    </div>
  );
}
