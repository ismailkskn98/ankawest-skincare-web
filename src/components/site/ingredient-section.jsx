import Image from "next/image";

import { ingredientStories } from "@/config/site-content";

import styles from "./site.module.css";

export function IngredientSection() {
  return (
    <section
      id="icerikler"
      className={`${styles.ingredientsSection} ${styles.contentSection}`}
      aria-labelledby="ingredients-title"
    >
      <div className={styles.ingredientIntro} data-reveal>
        <p className={styles.siteEyebrow}>Formülün dili</p>
        <h2 id="ingredients-title">
          Aktif içerikler,
          <span> anlaşılır rutinler.</span>
        </h2>
        <p>
          Teknik isimleri kalabalıklaştırmadan, her içeriğin bakım rutinindeki
          rolünü görünür kılıyoruz.
        </p>
      </div>

      <div className={styles.ingredientLayout}>
        <div className={styles.ingredientMediaBezel} data-reveal>
          <div className={styles.ingredientMedia}>
            <div className={styles.editorialImageMover} data-parallax>
              <Image
                className={styles.editorialImage}
                src="/images/TRENDYOL-DEVAM GÖRSELLER/74.png"
                alt="GLUTANEX Glow Booster ürününü tutan model ve ürün dokusu"
                fill
                sizes="(max-width: 900px) 94vw, 48vw"
              />
            </div>
            <div className={styles.ingredientMediaCaption}>
              <span>Formül / Doku / Ritüel</span>
              <span>Editorial 02</span>
            </div>
          </div>
        </div>

        <ol className={styles.ingredientList}>
          {ingredientStories.map((ingredient) => (
            <li key={ingredient.name} data-reveal>
              <span>{ingredient.index}</span>
              <div>
                <h3>{ingredient.name}</h3>
                <p>{ingredient.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
