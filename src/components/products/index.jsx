import { PageHero } from "@/components/site/pageHero";

import { ProductsCatalog } from "./catalog";

export function ProductsPage({ products, categories }) {
  return (
    <div className="fluid gridContainer bg-site-paper text-site-ink" data-motion-group>
      <PageHero
        titleLines={["CİLDİNE GÖRE", "cilt bakımı"]}
        displayLine="cilt bakımı"
        cardTitle="İhtiyacına göre"
        cardTitleAccent="seç"
        cardBody="GLUTANEX ve Exome ürünlerini bakım ihtiyacına, dokuya ve aktif içeriğe göre keşfet. Formüller şeffaf, seçim anlaşılır."
        ctaLabel="Kataloğa bak"
        ctaHref="#urun-listesi"
        imageSrc="/images/page-hero/v2.png"
        imageAlt="Anka West Skincare cilt bakımı ürünleri"
        imagePosition="center"
        parallaxDistance={370}
      />

      <div id="urun-listesi" className="scroll-mt-[96px]">
        <ProductsCatalog products={products} categories={categories} />
      </div>
    </div>
  );
}
