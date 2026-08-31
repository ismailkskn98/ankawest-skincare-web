import { INSTAGRAM_URL, TRENDYOL_STORE_URL } from "@/config/site-content";

import { ActionLink } from "./action-link";
import styles from "./site.module.css";

const approachSteps = [
  {
    index: "01",
    title: "İhtiyaçtan başla",
    description:
      "Cilt görünümünü ve günlük bakım hedefini belirleyerek seçkini daralt.",
  },
  {
    index: "02",
    title: "İçeriği anla",
    description:
      "Aktif içerikleri, ürün dokusunu, kullanım şeklini ve uyarıları birlikte değerlendir.",
  },
  {
    index: "03",
    title: "Rutinine yerleştir",
    description:
      "Az ama anlamlı adımlarla, sürdürülebilir ve sana ait bir bakım ritmi oluştur.",
  },
];

export function ApproachSection() {
  return (
    <>
      <section
        id="yaklasim"
        className={`${styles.approachSection} ${styles.contentSection}`}
        aria-labelledby="approach-title"
      >
        <div className={styles.approachHeading} data-reveal>
          <p className={styles.siteEyebrow}>Anka West yaklaşımı</p>
          <h2 id="approach-title">
            İçeriğini bil.
            <span> Bakımını bilinçli seç.</span>
          </h2>
        </div>

        <div className={styles.approachGrid}>
          {approachSteps.map((step) => (
            <article key={step.index} data-reveal>
              <span>{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="iletisim"
        className={`${styles.finalCtaSection} ${styles.contentSection}`}
        aria-labelledby="final-cta-title"
      >
        <div className={styles.finalCtaOrb} aria-hidden="true">
          AW
        </div>
        <div className={styles.finalCtaCopy} data-reveal>
          <p className={styles.siteEyebrow}>Keşfe devam et</p>
          <h2 id="final-cta-title">
            Işıltının tek bir yolu yok.
          </h2>
          <p>
            Nem, bariyer, ton görünümü ve günlük koruma için seçilmiş bakım
            adımlarını kendi rutinine göre bir araya getir.
          </p>
          <div className={styles.finalCtaActions}>
            <ActionLink href={TRENDYOL_STORE_URL} external variant="ink">
              Trendyol seçkisini gör
            </ActionLink>
            <ActionLink href={INSTAGRAM_URL} external variant="ghost">
              Instagram’da takip et
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
