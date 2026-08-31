import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import { TRENDYOL_STORE_URL } from "@/config/site-content";

import styles from "./home-shell.module.css";

export function HeroSection() {
  return (
    <section id="top" className={styles.heroSection} aria-labelledby="hero-title">
      <div className={styles.heroMedia} aria-hidden="true">
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          data-hero-video
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroMessage}>
          <h1
            id="hero-title"
            className={styles.heroTitle}
            aria-label="Cildini dinleyen bakım, sana özgü."
          >
            <span className={styles.desktopTitle} aria-hidden="true">
              <span className={styles.heroTitleMask}>
                <span className={styles.heroTitleLine} data-hero-line>
                  <span className={styles.editorialWord}>Cildini</span>{" "}
                  dinleyen
                </span>
              </span>
              <span className={styles.heroTitleMask}>
                <span className={styles.heroTitleLine} data-hero-line>
                  bakım, sana{" "}
                  <span className={styles.editorialWord}>özgü.</span>
                </span>
              </span>
            </span>

            <span className={styles.mobileTitle} aria-hidden="true">
              <span className={styles.heroTitleMask}>
                <span className={styles.heroTitleLine} data-hero-line>
                  <span className={styles.editorialWord}>Cildini</span>
                </span>
              </span>
              <span className={styles.heroTitleMask}>
                <span className={styles.heroTitleLine} data-hero-line>
                  dinleyen bakım,
                </span>
              </span>
              <span className={styles.heroTitleMask}>
                <span className={styles.heroTitleLine} data-hero-line>
                  sana <span className={styles.editorialWord}>özgü.</span>
                </span>
              </span>
            </span>
          </h1>

          <p className={styles.heroLead} data-hero-support>
            GLUTANEX ve Exome seçkisini; bakım ihtiyacına, aktif içeriklerine
            ve kullanım adımlarına göre keşfet.
          </p>
        </div>

        <a
          className={styles.heroCta}
          href={TRENDYOL_STORE_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Ürün seçkisini Trendyol'da aç"
          data-hero-cta
        >
          <span>Ürün seçkisini keşfet</span>
          <span className={styles.heroCtaIcon} aria-hidden="true">
            <ArrowRightIcon size={21} weight="light" />
          </span>
        </a>
      </div>
    </section>
  );
}
