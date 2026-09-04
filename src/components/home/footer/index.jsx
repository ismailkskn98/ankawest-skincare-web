import { BrandBar } from "./brandBar";
import { CtaCard } from "./ctaCard";
import { FooterNavigation } from "./navigation";

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="fluid gridContainer bg-site-paper text-site-ink"
    >
      <section
        className="fluid gridContainer relative isolate min-h-[clamp(420px,70vw,520px)] overflow-hidden nav:min-h-[clamp(560px,62vw,720px)]"
        aria-label="GLUTANEX bakım ürünleri"
      >
        <div
          className="fluid absolute inset-0 -z-2 bg-[url('/images/footer.webp')] bg-cover bg-[center_50%] bg-no-repeat nav:bg-fixed motion-reduce:bg-scroll"
          role="img"
          aria-label="Lila zemin üzerinde GLUTANEX cilt bakım ürünleri"
        />
        <div
          className="fluid pointer-events-none absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(26,29,27,0.02)_45%,rgba(26,29,27,0.3)_100%)]"
          aria-hidden="true"
        />
      </section>

      <section
        id="footer-links"
        className="fluid gridContainer bg-site-paper pb-8 nav:pb-11"
      >
        <div className="grid gap-y-12 nav:grid-cols-12 nav:gap-x-[clamp(28px,3.5vw,64px)] nav:gap-y-0">
          <div
            className="order-1 -mt-16 md:-mt-20 nav:order-2 nav:col-span-6 nav:col-start-7 nav:row-start-1 nav:-mt-[clamp(280px,36vw,380px)]"
            data-motion-group
          >
            <CtaCard />
          </div>

          <div className="order-2 nav:order-1 nav:col-span-5 nav:row-start-1 nav:pt-12 xl:pt-16">
            <FooterNavigation />
          </div>

          <div className="order-3 nav:col-span-12 nav:row-start-2 nav:mt-20 xl:mt-24">
            <BrandBar />
          </div>
        </div>
      </section>
    </footer>
  );
}
