import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import Image from "next/image";

import { INSTAGRAM_URL } from "@/config/site-content";

export function Community() {
  return (
    <section
      id="instagram"
      className="fluid gridContainer relative overflow-hidden bg-site-paper py-[clamp(3.5rem,6vw,7rem)]"
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
              className="font-canela mx-auto mt-4 max-w-[12ch] text-[clamp(2.45rem,9.5vw,4.3rem)] leading-[0.92] font-light tracking-[-0.045em] text-site-ink nav:mt-5 nav:text-[clamp(3.5rem,5.2vw,6.2rem)] xl:text-[clamp(4rem,5.8vw,6.9rem)]"
            >
              Bakımın ritmi
              <span className="block">Instagram’da.</span>
            </h2>
          </div>

          <div
            className="relative mt-8 md:mt-14 md:min-h-[clamp(560px,88vw,720px)] lg:mt-16 lg:min-h-[clamp(640px,72vw,860px)]"
            data-scroll-parallax-section
            data-parallax-strength="1.58"
          >
            <div className="relative md:contents">
              <div
                className="community-fixed-visual relative mx-auto aspect-[4/5] w-[min(82vw,420px)] overflow-hidden rounded-[48%_52%_8%_8%/18%_20%_5%_5%] bg-[#d9e0db] md:absolute md:top-0 md:left-1/2 md:w-[min(78vw,620px)] md:-translate-x-1/2 lg:w-[min(70vw,700px)]"
                style={{
                  backgroundImage: "url('/images/home/kadin-resmi-1.jpg')",
                }}
                role="img"
                aria-label="Doğal cilt görünümüne sahip kadın portresi"
              />

              <figure
                className="absolute top-[6%] left-0 z-2 aspect-square w-[clamp(88px,22vw,140px)] overflow-hidden rounded-[1.25rem] bg-[#edf0ec] md:top-[8%] md:w-[clamp(96px,14vw,200px)] md:rounded-[1.5rem] lg:top-[12%] lg:w-[clamp(110px,15vw,230px)]"
                data-scroll-parallax-layer
                data-parallax-distance="-142"
              >
                <Image
                  className="object-cover object-[50%_24%]"
                  src="/images/home/kadin-resmi-2.jpg"
                  alt="Yüzüne bakım kremi uygulayan kadın"
                  fill
                  sizes="(min-width: 64rem) 17vw, 28vw"
                />
              </figure>

              <figure
                className="absolute right-0 bottom-[8%] z-2 aspect-[5/4] w-[clamp(104px,26vw,160px)] overflow-hidden rounded-[1.25rem] bg-[#eee7df] md:bottom-[18%] md:w-[clamp(112px,15vw,220px)] md:rounded-[1.5rem] lg:bottom-[10%] lg:w-[clamp(130px,16vw,260px)]"
                data-scroll-parallax-layer
                data-parallax-distance="168"
              >
                <Image
                  className="object-cover object-[50%_22%]"
                  src="/images/home/kadin-resmi-6.jpg"
                  alt="Yaprakla doğal bakım yaklaşımını temsil eden kadın"
                  fill
                  sizes="(min-width: 64rem) 19vw, 32vw"
                />
              </figure>
            </div>

            <div
              className="relative z-2 mt-6 flex flex-col gap-5 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:flex-row md:items-end md:justify-between md:gap-8"
              data-section-reveal
            >
              <p className="max-w-[min(320px,90%)] text-[0.84rem] leading-[1.5] text-site-copy md:max-w-[280px] md:text-[0.9rem]">
                Yeni ürünleri, bakım adımlarını ve güncel notları
                Instagram’da paylaşmaya devam ediyoruz.
              </p>

              <a
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-site-ink py-1.5 pr-1.5 pl-5 text-[0.66rem] font-semibold tracking-[0.08em] text-site-paper uppercase md:gap-4 md:py-2 md:pr-2 md:pl-6 md:text-[0.7rem]"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                <InstagramLogoIcon size={17} weight="light" aria-hidden="true" />
                Instagram
                <span className="grid size-9 place-items-center rounded-full bg-site-paper text-site-ink transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 motion-reduce:transition-none md:size-10">
                  <ArrowUpRightIcon size={17} weight="light" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
