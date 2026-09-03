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
        className="fluid gridContainer relative isolate min-h-[clamp(420px,70vw,520px)] overflow-hidden min-[901px]:min-h-[clamp(560px,62vw,720px)]"
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
      </section>

      <section
        id="footer-links"
        className="fluid gridContainer bg-site-paper pb-8 min-[901px]:pb-11"
      >
        <div className="grid gap-y-12 min-[901px]:grid-cols-12 min-[901px]:gap-x-[clamp(28px,3.5vw,64px)] min-[901px]:gap-y-0">
          <div
            className="order-1 -mt-16 min-[768px]:-mt-20 min-[901px]:order-2 min-[901px]:col-span-6 min-[901px]:col-start-7 min-[901px]:row-start-1 min-[901px]:-mt-[clamp(280px,36vw,380px)]"
            data-motion-group
          >
            <CtaCard />
          </div>

          <div className="order-2 min-[901px]:order-1 min-[901px]:col-span-5 min-[901px]:row-start-1 min-[901px]:pt-12 min-[1280px]:pt-16">
            <FooterNavigation />
          </div>

          <div className="order-3 min-[901px]:col-span-12 min-[901px]:row-start-2 min-[901px]:mt-20 min-[1280px]:mt-24">
            <BrandBar />
          </div>
        </div>
      </section>
    </footer>
  );
}
