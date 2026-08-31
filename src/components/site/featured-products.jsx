import Image from "next/image";

import { featuredProducts, TRENDYOL_STORE_URL } from "@/config/site-content";

import { ActionLink } from "./action-link";
import styles from "./site.module.css";

export function FeaturedProducts() {
  return (
    <section
      id="urunler"
      className={`${styles.productsSection} ${styles.contentSection}`}
      aria-labelledby="products-title"
    >
      <div className={styles.productsHeading} data-reveal>
        <div>
          <p className={styles.siteEyebrow}>Editörün seçkisi</p>
          <h2 id="products-title">Rutinin için öne çıkanlar.</h2>
        </div>
        <div className={styles.productsHeadingAside}>
          <p>
            Serumdan güneş bakımına, yüz bakımından saç derisine uzanan seçili
            ürünlerle kendi ritüelini kur.
          </p>
          <ActionLink
            href={TRENDYOL_STORE_URL}
            external
            variant="ghost"
            compact
          >
            Tüm seçki
          </ActionLink>
        </div>
      </div>

      <div className={styles.productGrid}>
        {featuredProducts.map((product, index) => (
          <article className={styles.productCard} key={product.name} data-reveal>
            <div
              className={`${styles.productMedia} ${styles[`product${product.tone}`]}`}
            >
              <div className={styles.productTopline}>
                <span>{product.brand}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <Image
                className={styles.productImage}
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 700px) 82vw, (max-width: 1100px) 45vw, 30vw"
                style={{
                  "--product-scale": product.imageScale,
                  "--product-position": product.imagePosition,
                }}
              />
              <span className={styles.productCategory}>{product.category}</span>
            </div>

            <div className={styles.productCopy}>
              <div className={styles.productTitleRow}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.fullName}</p>
                </div>
                <span>{product.size}</span>
              </div>
              <p className={styles.productDescription}>{product.description}</p>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.productFootnote} data-reveal>
        Ürün uygunluğu ve kullanım sıklığı kişiden kişiye değişebilir. Kullanım
        ve uyarı bilgilerini ürün etiketiyle birlikte değerlendirin.
      </p>
    </section>
  );
}
