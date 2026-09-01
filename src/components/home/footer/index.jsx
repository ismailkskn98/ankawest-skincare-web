import Image from "next/image";

import { CtaCard } from "./ctaCard";
import { FooterNavigation } from "./navigation";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="fluid gridContainer bg-site-paper text-site-ink"
    >
      <section
        className="fluid gridContainer relative isolate min-h-[560px] overflow-hidden min-[901px]:min-h-[820px]"
        aria-label="GLUTANEX bakım ürünleri"
      >
        <div
          className="fluid absolute inset-0 -z-2 bg-[url('/images/footer.webp')] bg-cover bg-[center_50%] bg-no-repeat min-[901px]:bg-fixed motion-reduce:bg-scroll"
          role="img"
          aria-label="Lila zemin üzerinde GLUTANEX cilt bakım ürünleri"
        />
        <div
          className="fluid pointer-events-none absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(26,29,27,0.02)_45%,rgba(26,29,27,0.3)_100%)]"
          aria-hidden="true"
        />

        <div className="flex min-h-[560px] items-end pb-8 min-[901px]:min-h-[820px] min-[901px]:pb-12">
          <p className="max-w-[25ch] rounded-full bg-[#f7f6f1]/90 px-5 py-3 text-[0.65rem] font-semibold tracking-[0.13em] text-[#2f322f] uppercase shadow-[0_12px_36px_rgba(20,24,21,0.1)]">
            Bakımın farklı dokuları, tek seçkide
          </p>
        </div>
      </section>

      <section
        id="footer-links"
        className="fluid gridContainer bg-site-paper pb-10 min-[901px]:pb-14"
      >
        <div className="relative">
          <div
            className="pt-5 min-[901px]:absolute min-[901px]:top-[-390px] min-[901px]:right-0 min-[901px]:w-[min(42vw,570px)] min-[901px]:pt-0"
            data-motion-group
          >
            <CtaCard />
          </div>

          <div className="pt-16 min-[901px]:pt-[310px]">
            <FooterNavigation />

            <div
              className="mt-20 grid gap-12 border-t border-black/15 pt-10 min-[768px]:mt-28 min-[768px]:grid-cols-[1fr_auto] min-[768px]:items-end min-[901px]:mt-36"
              data-motion-group
            >
              <div data-section-reveal>
                <a
                  className="inline-flex min-h-14 w-fit items-center"
                  href="#top"
                  aria-label="Anka West Skincare anasayfa"
                >
                  <span className="relative block h-[58px] w-[184px] overflow-hidden">
                    <Image
                      className="absolute top-[-27px] left-0 h-auto w-[184px] max-w-none"
                      src="/images/logo/ankawestskincare-logo.png"
                      alt="Anka West Skincare"
                      width={465}
                      height={287}
                      sizes="184px"
                    />
                  </span>
                </a>
                <p className="mt-5 max-w-[28ch] text-[0.85rem] leading-[1.5] text-site-copy">
                  Cildini dinleyen bakım, sana özgü.
                </p>
              </div>

              <div
                className="grid gap-3 text-left text-[0.72rem] tracking-[0.01em] text-site-copy min-[768px]:text-right"
                data-section-reveal
              >
                <p>© {currentYear} Anka West Skincare. Tüm hakları saklıdır.</p>
                <p className="tracking-[0.12em] uppercase">GLUTANEX · EXOME</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
