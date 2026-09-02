import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Image from "next/image";

import { ingredientStories } from "@/config/site-content";

const formulaImages = [
  {
    src: "/images/urunler-png-ham/GLOW%20THERAPY%20AMPOULE/GLUTANEX-Glow-Therapy-Ampoule-sadece-urun.webp",
    alt: "GLUTANEX Glow Therapy Ampoule şeffaf ürün görseli",
    className: "min-[1024px]:mt-28",
    distance: -148,
  },
  {
    src: "/images/urunler-png-ham/AQUA%20BOOSTER/AQUA-BOOSTER.webp",
    alt: "GLUTANEX Aqua Booster şeffaf ürün görseli",
    className: "min-[1024px]:mb-28",
    distance: 178,
  },
];

export function Transparency() {
  return (
    <section id="icerikler" className="fluid gridContainer relative overflow-hidden bg-[#f2f2ef] py-20 min-[901px]:py-32" aria-labelledby="transparency-title">
      <div className="relative z-2" data-motion-group>
        <div className="grid items-end gap-8 min-[1024px]:grid-cols-12">
          <div className="min-[1024px]:col-span-8" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase">Formül yaklaşımı</p>
            <h2
              id="transparency-title"
              className="mt-5 max-w-[11ch] text-[clamp(3.25rem,13vw,6.4rem)] leading-[0.83] font-normal tracking-[-0.065em] text-site-ink min-[901px]:text-[clamp(6rem,8.2vw,9rem)]"
            >
              İçeriği
              <span className="block font-editorial font-extralight tracking-[-0.04em]">saklamıyoruz.</span>
            </h2>
          </div>

          <div className="max-w-[420px] min-[1024px]:col-span-4 min-[1024px]:justify-self-end min-[1024px]:pb-3" data-section-reveal>
            <p className="text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.5] tracking-[-0.025em] text-site-copy">
              Üründe öne çıkan aktifleri, dokuyu ve kullanım adımını açıkça anlatıyoruz. Seçimini belirsiz vaatlerle değil, anlaşılır bilgiyle kurmanı istiyoruz.
            </p>
            <a className="group mt-7 inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.09em] text-site-ink uppercase" href="#urunler">
              Ürünleri incele
              <span className="grid size-9 place-items-center overflow-hidden rounded-full bg-site-ink text-site-paper transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none">
                <ArrowRightIcon size={16} weight="light" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-10 min-[768px]:mt-24 min-[1024px]:grid-cols-12 min-[1024px]:gap-[clamp(2rem,5vw,6.5rem)]">
          <div className="grid grid-cols-2 items-center gap-4 min-[1024px]:col-span-6 min-[1024px]:gap-6" data-scroll-parallax-section data-parallax-strength="1.48">
            {formulaImages.map((image) => (
              <figure className={`relative aspect-[4/5] overflow-hidden ${image.className}`} key={image.src} data-scroll-parallax-layer data-parallax-distance={image.distance}>
                <Image
                  className="object-contain p-[clamp(1.25rem,4vw,3rem)] drop-shadow-[0_24px_32px_rgba(59,59,59,0.16)]"
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 45vw"
                />
              </figure>
            ))}
          </div>

          <div className="min-[1024px]:col-span-6 min-[1024px]:pt-24">
            <div className="grid gap-x-8 border-t border-site-ink/20 min-[640px]:grid-cols-2">
              {ingredientStories.map((ingredient) => (
                <article className="border-b border-site-ink/20 py-7 min-[640px]:py-9" key={ingredient.index} data-section-reveal>
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
