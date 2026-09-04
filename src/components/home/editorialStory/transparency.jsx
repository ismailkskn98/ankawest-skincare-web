import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Image from "next/image";

import { ingredientStories } from "@/config/site-content";

const formulaImages = [
  {
    src: "/images/urunler-png-ham/GLOW%20THERAPY%20AMPOULE/GLUTANEX-Glow-Therapy-Ampoule-sadece-urun.webp",
    alt: "GLUTANEX Glow Therapy Ampoule şeffaf ürün görseli",
    className: "lg:mt-10 xl:mt-20",
    distance: -205,
  },
  {
    src: "/images/urunler-png-ham/AQUA%20BOOSTER/AQUA-BOOSTER.webp",
    alt: "GLUTANEX Aqua Booster şeffaf ürün görseli",
    className: "lg:mb-10 xl:mb-20",
    distance: 235,
  },
];

export function Transparency() {
  return (
    <section id="icerikler" className="fluid gridContainer relative overflow-hidden bg-[#f2f2ef] py-[clamp(3.5rem,6vw,7rem)]" aria-labelledby="transparency-title">
      <div className="relative z-2" data-motion-group>
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase">Formül yaklaşımı</p>
            <h2
              id="transparency-title"
              className="font-canela mt-4 max-w-[11ch] text-[clamp(2.5rem,9.5vw,4.4rem)] leading-[0.92] font-light tracking-[-0.045em] text-site-ink nav:mt-5 nav:text-[clamp(3.6rem,5.5vw,6.4rem)] xl:text-[clamp(4.2rem,6vw,7.2rem)]"
            >
              İçeriği
              <span className="block">saklamıyoruz.</span>
            </h2>
          </div>

          <div className="max-w-[420px] lg:col-span-4 lg:justify-self-end lg:pb-3" data-section-reveal>
            <p className="text-[clamp(0.95rem,1.2vw,1.12rem)] leading-[1.5] tracking-[-0.025em] text-site-copy">
              Üründe öne çıkan aktifleri, dokuyu ve kullanım adımını açıkça anlatıyoruz. Seçimini belirsiz vaatlerle değil, anlaşılır bilgiyle kurmanı istiyoruz.
            </p>
            <a className="group mt-5 inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.09em] text-site-ink uppercase nav:mt-7" href="#urunler">
              Ürünleri incele
              <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-site-ink text-site-paper transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none nav:size-9">
                <ArrowRightIcon size={16} weight="light" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:mt-16 lg:mt-20 lg:grid-cols-12 lg:gap-[clamp(1.75rem,4vw,5rem)]">
          <div
            className="grid grid-cols-2 items-center gap-3 lg:col-span-6 lg:gap-5"
            data-scroll-parallax-section
            data-parallax-desktop-only="true"
            data-parallax-strength="1.7"
          >
            {formulaImages.map((image) => (
              <figure className={`relative aspect-[4/5] overflow-hidden ${image.className}`} key={image.src} data-scroll-parallax-layer data-parallax-distance={image.distance}>
                <Image
                  className="object-contain p-[clamp(1rem,3.5vw,2.5rem)] drop-shadow-[0_18px_22px_rgba(59,59,59,0.1)]"
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 64rem) 25vw, 45vw"
                />
              </figure>
            ))}
          </div>

          <div className="lg:col-span-6 lg:pt-14">
            <div className="grid gap-x-6 border-t border-site-ink/15 sm:grid-cols-2 lg:gap-x-8">
              {ingredientStories.map((ingredient) => (
                <article className="border-b border-site-ink/15 py-5 sm:py-7" key={ingredient.index} data-section-reveal>
                  <span className="text-[0.62rem] font-semibold tracking-[0.13em] text-site-copy uppercase">{ingredient.index}</span>
                  <h3 className="mt-4 text-[clamp(1.35rem,2.2vw,2rem)] leading-[1] font-light tracking-[-0.045em] text-site-ink">{ingredient.name}</h3>
                  <p className="mt-4 max-w-[34ch] text-[0.88rem] leading-[1.55] text-site-copy">{ingredient.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
