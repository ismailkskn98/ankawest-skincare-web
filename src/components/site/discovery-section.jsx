import { careNeeds } from "@/config/site-content";

import styles from "./site.module.css";

export function DiscoverySection() {
  return (
    <section
      id="ihtiyaclar"
      className={`${styles.discoverySection} ${styles.contentSection}`}
      aria-labelledby="needs-title"
    >
      <div className={styles.sectionHeading} data-reveal>
        <p className={styles.siteEyebrow}>Bakım haritası</p>
        <h2 id="needs-title">
          Önce ürün değil,
          <span> ihtiyacını seç.</span>
        </h2>
        <p>
          İyi bir rutin kalabalık olmak zorunda değil. Cildinin bugün neye
          ihtiyaç duyduğunu belirle, ardından doğru bakım dokusuna yaklaş.
        </p>
      </div>

      <div className={styles.needGrid}>
        {careNeeds.map((need) => (
          <article
            key={need.title}
            className={`${styles.needCard} ${styles[`need${need.tone}`]}`}
            data-reveal
          >
            <div className={styles.needCardTopline}>
              <span>{need.index}</span>
              <span>Bakım odağı</span>
            </div>
            <div className={styles.needSymbol} aria-hidden="true">
              {need.symbol}
            </div>
            <div className={styles.needCardCopy}>
              <h3>{need.title}</h3>
              <p>{need.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
