import Image from "next/image";

export function Community() {
  return (
    <section id="instagram" className="fluid gridContainer relative bg-site-paper py-[clamp(3.25rem,5vw,6rem)]" aria-labelledby="community-title">
      <div className="relative z-2" data-motion-group>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center" data-section-reveal>
            <p className="text-[clamp(0.58rem,0.8vw,0.66rem)] font-semibold tracking-[0.16em] text-site-copy uppercase">Topluluğa katıl</p>
            <h2
              id="community-title"
              className="font-sentient mx-auto mt-3.5 max-w-[12ch] text-[clamp(2.25rem,8.4vw,3.5rem)] leading-[0.96] font-light tracking-[-0.04em] text-site-ink nav:mt-4 nav:text-[clamp(2.9rem,4.2vw,5rem)] xl:text-[clamp(3.3rem,4.7vw,5.8rem)]"
            >
              Bakımın ritmi
              <span className="block">Instagram’da</span>
            </h2>
          </div>

          <div
            className="relative mt-7 md:mt-10 md:min-h-[clamp(38rem,78vw,42rem)] lg:mt-12 lg:min-h-[clamp(42rem,60vw,46rem)] xl:min-h-[clamp(44rem,43vw,50rem)] short-desktop:min-h-[38rem]"
            data-scroll-parallax-section
            data-parallax-desktop-only="true"
            data-parallax-strength="1.2"
          >
            <div className="relative md:contents">
              <div
                className="community-fixed-visual relative mx-auto aspect-[4/5] w-[min(80vw,360px)] overflow-hidden rounded-[48%_52%_8%_8%/18%_20%_5%_5%] bg-[#d9e0db] md:absolute md:top-0 md:left-[52%] md:w-[min(62vw,520px)] md:-translate-x-1/2 lg:left-1/2 lg:w-[min(52vw,580px)] xl:w-[min(44vw,620px)] short-desktop:w-[min(42vw,480px)]"
                style={{
                  backgroundImage: "url('/images/center2.webp')",
                }}
                role="img"
                aria-label="Doğal cilt görünümüne sahip kadın portresi"
              />

              <figure
                className="absolute top-[7%] left-0 z-2 aspect-square w-[clamp(78px,21vw,112px)] overflow-hidden rounded-[1rem] bg-[#edf0ec] md:top-[10%] md:w-[clamp(92px,12vw,160px)] md:rounded-[1.3rem] lg:w-[clamp(104px,12vw,190px)]"
                data-scroll-parallax-layer
                data-parallax-distance="-96"
              >
                <Image
                  className="object-cover object-[50%_24%]"
                  src="/images/center5.webp"
                  alt="Yüzüne bakım kremi uygulayan kadın"
                  fill
                  sizes="(min-width: 64rem) 12vw, (min-width: 48rem) 14vw, 24vw"
                />
              </figure>

              <figure
                className="absolute right-0 bottom-[7%] z-2 aspect-[5/4] w-[clamp(94px,25vw,140px)] overflow-hidden rounded-[1rem] bg-[#eee7df] md:bottom-[16%] md:w-[clamp(106px,13vw,180px)] md:rounded-[1.3rem] lg:bottom-[12%] lg:w-[clamp(118px,13vw,210px)]"
                data-scroll-parallax-layer
                data-parallax-distance="112"
              >
                <Image
                  className="object-cover object-[50%_22%]"
                  src="/images/center.webp"
                  alt="Yaprakla doğal bakım yaklaşımını temsil eden kadın"
                  fill
                  sizes="(min-width: 64rem) 13vw, (min-width: 48rem) 15vw, 28vw"
                />
              </figure>
            </div>

            <div className="relative z-2 mt-5 flex flex-col gap-4 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:flex-row md:items-end md:justify-between md:gap-7" data-section-reveal>
              <p className="max-w-[34ch] text-[clamp(0.78rem,2.8vw,0.86rem)] leading-[1.55] text-site-copy md:max-w-[210px] md:text-[0.8rem] lg:max-w-[240px] lg:text-[0.84rem]">
                Yeni ürünleri, bakım adımlarını ve güncel notları Instagram’da paylaşmaya devam ediyoruz.
              </p>

              {/* <a
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
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
