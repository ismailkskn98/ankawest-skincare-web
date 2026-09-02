import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import Image from "next/image";

import { INSTAGRAM_URL } from "@/config/site-content";

export function Community() {
  return (
    <section
      id="instagram"
      className="fluid gridContainer relative overflow-hidden bg-site-paper py-20 min-[901px]:py-32"
      aria-labelledby="community-title"
    >
      <div className="relative z-2" data-motion-group>
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase">
              Topluluğa katıl
            </p>
            <h2
              id="community-title"
              className="mx-auto mt-5 max-w-[12ch] text-[clamp(3.3rem,13vw,6.2rem)] leading-[0.86] font-normal tracking-[-0.065em] text-site-ink min-[901px]:text-[clamp(5.8rem,7.8vw,8.4rem)]"
            >
              Bakımın ritmi
              <span className="block font-editorial font-extralight tracking-[-0.04em]">
                Instagram’da.
              </span>
            </h2>
          </div>

          <div
            className="relative mt-14 min-h-[620px] min-[768px]:mt-20 min-[768px]:min-h-[860px] min-[1024px]:min-h-[980px]"
            data-scroll-parallax-section
            data-parallax-strength="1.35"
          >
            <figure className="absolute top-0 left-1/2 aspect-[4/5] w-[min(78vw,760px)] -translate-x-1/2 overflow-hidden rounded-[48%_52%_8%_8%/18%_20%_5%_5%] bg-[#d9e0db]">
              <Image
                className="object-cover object-[50%_32%]"
                src="/images/home/kadin-resmi-1.jpg"
                alt="Doğal cilt görünümüne sahip kadın portresi"
                fill
                sizes="(min-width: 1024px) 46vw, (min-width: 768px) 70vw, 78vw"
              />
            </figure>

            <figure
              className="absolute top-[12%] left-0 aspect-square w-[clamp(110px,17vw,260px)] overflow-hidden rounded-[1.5rem] bg-[#edf0ec]"
              data-scroll-parallax-layer
              data-parallax-distance="-108"
            >
              <Image
                className="object-cover object-[50%_24%]"
                src="/images/home/kadin-resmi-2.jpg"
                alt="Yüzüne bakım kremi uygulayan kadın"
                fill
                sizes="(min-width: 1024px) 17vw, 28vw"
              />
            </figure>

            <figure
              className="absolute right-0 bottom-[29%] aspect-[5/4] w-[clamp(130px,19vw,300px)] overflow-hidden rounded-[1.5rem] bg-[#eee7df] min-[768px]:bottom-[7%]"
              data-scroll-parallax-layer
              data-parallax-distance="126"
            >
              <Image
                className="object-cover object-[50%_22%]"
                src="/images/home/kadin-resmi-6.jpg"
                alt="Yaprakla doğal bakım yaklaşımını temsil eden kadın"
                fill
                sizes="(min-width: 1024px) 19vw, 32vw"
              />
            </figure>

            <div
              className="absolute bottom-28 left-0 max-w-[230px] min-[768px]:bottom-[10%] min-[768px]:max-w-[300px]"
              data-section-reveal
            >
              <p className="text-[0.92rem] leading-[1.5] text-site-copy">
                Yeni ürünleri, bakım adımlarını ve seçkinin güncel notlarını
                Instagram’da paylaşmaya devam ediyoruz.
              </p>
            </div>

            <a
              className="group absolute right-0 bottom-4 inline-flex items-center gap-4 rounded-full bg-site-ink py-2 pr-2 pl-6 text-[0.7rem] font-semibold tracking-[0.08em] text-site-paper uppercase min-[768px]:right-1/2 min-[768px]:bottom-4 min-[768px]:translate-x-1/2"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              data-section-reveal
            >
              <InstagramLogoIcon size={17} weight="light" aria-hidden="true" />
              Instagram
              <span className="grid size-10 place-items-center rounded-full bg-site-paper text-site-ink transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 motion-reduce:transition-none">
                <ArrowUpRightIcon size={17} weight="light" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
