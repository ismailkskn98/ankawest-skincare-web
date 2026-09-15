import { BrandBar } from "./brandBar";
import { CtaCard } from "./ctaCard";
import { FooterNavigation } from "./navigation";

export function Footer() {
  return (
    <footer id="site-footer" className="fluid gridContainer bg-site-paper text-site-ink">
      <section className="fluid gridContainer relative isolate min-h-[clamp(22rem,68vw,32rem)] overflow-hidden nav:min-h-[clamp(31rem,min(58vw,74svh),43rem)] short-desktop:nav:min-h-[clamp(29rem,68svh,36rem)]" aria-label="GLUTANEX bakım ürünleri">
        <div
          className="fluid absolute inset-0 -z-2 bg-[url('/images/footer.webp')] bg-cover bg-[center_52%] bg-no-repeat nav:bg-fixed motion-reduce:bg-scroll"
          role="img"
          aria-label="Lila zemin üzerinde GLUTANEX cilt bakım ürünleri"
        />
        <div className="fluid pointer-events-none absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(26,29,27,0.02)_45%,rgba(26,29,27,0.3)_100%)]" aria-hidden="true" />
      </section>

      <section id="footer-links" className="fluid gridContainer bg-site-paper pb-[clamp(2.5rem,6vh,5rem)]">
        <div className="grid gap-y-[clamp(3rem,7vw,6rem)] nav:grid-cols-12 nav:gap-x-[clamp(1.75rem,3.5vw,4rem)] nav:gap-y-0">
          <div className="order-1 -mt-[clamp(4rem,11vw,6rem)] nav:order-2 nav:col-span-6 nav:col-start-7 nav:row-start-1 nav:-mt-[clamp(17.5rem,32vw,23.75rem)] short-desktop:nav:-mt-[clamp(15rem,28vw,19rem)]" data-motion-group>
            <CtaCard />
          </div>

          <div className="order-2 nav:order-1 nav:col-span-5 nav:row-start-1 nav:pt-[clamp(2.75rem,5vw,5rem)]">
            <FooterNavigation />
          </div>

          <div className="order-3 nav:col-span-12 nav:row-start-2 nav:mt-[clamp(4.5rem,7vw,8rem)] short-desktop:nav:mt-[clamp(3.5rem,5vw,5rem)]">
            <BrandBar />
          </div>
        </div>
      </section>
    </footer>
  );
}
