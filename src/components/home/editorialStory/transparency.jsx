import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Image from "next/image";
import Link from "next/link";

import { ingredientStories } from "@/config/site-content";

const formulaImages = [
  {
    src: "/images/home/GLUTANEX-Glow-Therapy-Ampoule-sadece-urun.webp",
    alt: "GLUTANEX Glow Therapy Ampoule şeffaf ürün görseli",
    className: "lg:mt-6 xl:mt-10",
    distance: -130,
  },
  {
    src: "/images/home/AQUA-BOOSTER.webp",
    alt: "GLUTANEX Aqua Booster şeffaf ürün görseli",
    className: "lg:mb-6 xl:mb-10",
    distance: 145,
  },
];

export function Transparency() {
  return (
    <section id="icerikler" className="fluid gridContainer relative bg-[#f2f2ef] py-[clamp(3.25rem,5vw,6rem)]" aria-labelledby="transparency-title">
      <div className="relative z-2" data-motion-group>
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8" data-section-reveal>
            <p className="text-[clamp(0.58rem,0.8vw,0.66rem)] font-semibold tracking-[0.16em] text-site-copy uppercase">Formül yaklaşımı</p>
            <h2
              id="transparency-title"
              className="font-sentient mt-3.5 max-w-[11ch] text-[clamp(2.3rem,8.5vw,3.6rem)] leading-[0.96] font-light tracking-[-0.04em] text-site-ink nav:mt-4 nav:text-[clamp(3rem,4.4vw,5.2rem)] xl:text-[clamp(3.4rem,4.8vw,6rem)]"
            >
              İçeriği
              <span className="block">saklamıyoruz</span>
            </h2>
          </div>

          <div className="max-w-[390px] lg:col-span-4 lg:justify-self-end lg:pb-2" data-section-reveal>
            <p className="text-[clamp(0.88rem,1.05vw,1rem)] leading-[1.55] tracking-[-0.02em] text-site-copy">
              Üründe öne çıkan aktifleri, dokuyu ve kullanım adımını açıkça anlatıyoruz. Seçimini belirsiz vaatlerle değil, anlaşılır bilgiyle kurmanı istiyoruz.
            </p>
            <Link className="group mt-5 inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.09em] text-site-ink uppercase nav:mt-7" href="/urunler">
              <span>Ürünleri incele</span>
              <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-site-ink text-site-paper transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none nav:size-9">
                <ArrowRightIcon size={16} weight="light" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-7 md:mt-12 lg:mt-14 lg:grid-cols-12 lg:gap-[clamp(1.5rem,3vw,3.75rem)]">
          <div
            className="mx-auto grid w-full max-w-[42rem] grid-cols-2 items-center gap-3 lg:col-span-6 lg:gap-4"
            data-scroll-parallax-section
            data-parallax-desktop-only="true"
            data-parallax-strength="1.35"
          >
            {formulaImages.map((image) => (
              <figure className={`relative aspect-[5/6] overflow-hidden ${image.className}`} key={image.src} data-scroll-parallax-layer data-parallax-distance={image.distance}>
                <Image
                  className="object-contain p-[clamp(0.75rem,2.5vw,2rem)] drop-shadow-[0_18px_22px_rgba(59,59,59,0.1)]"
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 64rem) 25vw, 45vw"
                />
              </figure>
            ))}
          </div>

          <div className="lg:col-span-6 lg:pt-9">
            <div className="grid gap-x-6 border-t border-site-ink/15 sm:grid-cols-2 lg:gap-x-7">
              {ingredientStories.map((ingredient) => (
                <article className="border-b border-site-ink/15 py-4.5 sm:py-6" key={ingredient.index} data-section-reveal>
                  <span className="text-[0.62rem] font-semibold tracking-[0.13em] text-site-copy uppercase">{ingredient.index}</span>
                  <h3 className="mt-3.5 text-[clamp(1.2rem,1.8vw,1.65rem)] leading-[1.05] font-light tracking-[-0.04em] text-site-ink">{ingredient.name}</h3>
                  <p className="mt-3.5 max-w-[34ch] text-[clamp(0.8rem,1vw,0.86rem)] leading-[1.55] text-site-copy">{ingredient.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
