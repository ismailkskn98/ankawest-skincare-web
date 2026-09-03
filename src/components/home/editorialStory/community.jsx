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
              className="font-canela mx-auto mt-4 max-w-[12ch] text-[clamp(2.45rem,9.5vw,4.3rem)] leading-[0.92] font-light tracking-[-0.045em] text-site-ink min-[901px]:mt-5 min-[901px]:text-[clamp(3.5rem,5.2vw,6.2rem)] min-[1280px]:text-[clamp(4rem,5.8vw,6.9rem)]"
            >
              Bakımın ritmi
              <span className="block">Instagram’da.</span>
            </h2>
          </div>

          <div
            className="relative mt-10 min-h-[clamp(420px,118vw,560px)] min-[768px]:mt-14 min-[768px]:min-h-[clamp(560px,88vw,720px)] min-[1024px]:mt-16 min-[1024px]:min-h-[clamp(640px,72vw,860px)]"
            data-scroll-parallax-section
            data-parallax-strength="1.58"
          >
            <figure className="absolute top-0 left-1/2 aspect-[4/5] w-[min(78vw,620px)] -translate-x-1/2 overflow-hidden rounded-[48%_52%_8%_8%/18%_20%_5%_5%] bg-[#d9e0db] min-[1024px]:w-[min(70vw,700px)]">
              <Image
                className="object-cover object-[50%_32%]"
                src="/images/home/kadin-resmi-1.jpg"
                alt="Doğal cilt görünümüne sahip kadın portresi"
                fill
                sizes="(min-width: 1024px) 46vw, (min-width: 768px) 70vw, 78vw"
              />
            </figure>

            <figure
              className="absolute top-[8%] left-0 aspect-square w-[clamp(88px,14vw,200px)] overflow-hidden rounded-[1.25rem] bg-[#edf0ec] min-[768px]:rounded-[1.5rem] min-[1024px]:top-[12%] min-[1024px]:w-[clamp(110px,15vw,230px)]"
              data-scroll-parallax-layer
              data-parallax-distance="-142"
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
              className="absolute right-0 bottom-[38%] aspect-[5/4] w-[clamp(104px,15vw,220px)] overflow-hidden rounded-[1.25rem] bg-[#eee7df] min-[768px]:bottom-[18%] min-[768px]:rounded-[1.5rem] min-[1024px]:bottom-[10%] min-[1024px]:w-[clamp(130px,16vw,260px)]"
              data-scroll-parallax-layer
              data-parallax-distance="168"
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
              className="relative z-2 mt-[min(88vw,420px)] flex flex-col gap-5 min-[768px]:absolute min-[768px]:inset-x-0 min-[768px]:bottom-0 min-[768px]:mt-0 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between min-[768px]:gap-8"
              data-section-reveal
            >
              <p className="max-w-[min(280px,78vw)] text-[0.84rem] leading-[1.5] text-site-copy min-[768px]:max-w-[280px] min-[768px]:text-[0.9rem]">
                Yeni ürünleri, bakım adımlarını ve seçkinin güncel notlarını
                Instagram’da paylaşmaya devam ediyoruz.
              </p>

              <a
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-site-ink py-1.5 pr-1.5 pl-5 text-[0.66rem] font-semibold tracking-[0.08em] text-site-paper uppercase min-[768px]:gap-4 min-[768px]:py-2 min-[768px]:pr-2 min-[768px]:pl-6 min-[768px]:text-[0.7rem]"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                <InstagramLogoIcon size={17} weight="light" aria-hidden="true" />
                Instagram
                <span className="grid size-9 place-items-center rounded-full bg-site-paper text-site-ink transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 motion-reduce:transition-none min-[768px]:size-10">
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
