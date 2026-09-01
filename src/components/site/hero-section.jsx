import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import { TRENDYOL_STORE_URL } from "@/config/site-content";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate box-border min-h-[120svh] min-h-[120dvh] w-full max-w-[100vw] overflow-hidden [background:radial-gradient(circle_at_67%_30%,#b8aa96_0%,transparent_34%),#737a70]"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-1 h-full w-full overflow-hidden bg-[#737a70]" aria-hidden="true">
        <video
          className="absolute inset-0 h-full w-full object-cover object-[55%_center] [filter:saturate(0.9)_contrast(0.96)_brightness(0.94)]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          data-hero-video
        >
          <source src="/videos/hero-background3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 h-full w-full [background:linear-gradient(180deg,rgba(9,13,10,0.46)_0%,rgba(9,13,10,0.1)_36%,rgba(9,13,10,0.16)_56%,rgba(9,13,10,0.52)_100%),linear-gradient(90deg,rgba(9,13,10,0.18),rgba(9,13,10,0.06))] min-[901px]:[background:linear-gradient(180deg,rgba(9,13,10,0.4)_0%,transparent_31%,transparent_58%,rgba(9,13,10,0.45)_100%),linear-gradient(90deg,rgba(9,13,10,0.16)_0%,rgba(9,13,10,0.05)_48%,rgba(9,13,10,0.12)_100%)]" />
      </div>

      <div className="relative z-1 grid min-h-svh min-h-dvh min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto] items-center px-4 pt-[106px] pb-[18px] min-[901px]:px-[clamp(18px,4.4vw,84px)] min-[901px]:pt-[clamp(118px,15vh,158px)] min-[901px]:pb-[clamp(22px,4.2vh,42px)] short-desktop:pt-28 short-desktop:pb-[18px]">
        <div className="w-full min-w-0 max-w-[1220px] self-center justify-self-center overflow-hidden pt-[22px] text-center min-[901px]:pt-[clamp(20px,3.5vh,46px)] short-desktop:pt-0">
          <h1
            id="hero-title"
            className="w-full text-[clamp(2.8rem,12.8vw,4.6rem)] leading-[0.96] font-normal tracking-[-0.062em] text-[#f7f6f1] text-balance max-[390px]:text-[clamp(2.55rem,12.6vw,3.1rem)] min-[901px]:text-[clamp(4rem,6.65vw,8rem)] min-[901px]:leading-[0.97] min-[901px]:tracking-[-0.068em] short-desktop:text-[clamp(3.6rem,6vw,6.8rem)]"
            aria-label="Cildini dinleyen bakım, sana özgü."
          >
            <span className="hidden min-[901px]:block" aria-hidden="true">
              <span className="mx-[-0.06em] mt-[-0.12em] mb-[-0.06em] block w-full min-w-0 overflow-hidden px-[0.06em] pt-[0.12em] pb-[0.06em]">
                <span className="block whitespace-nowrap" data-hero-line>
                  <span className="font-editorial font-normal tracking-[-0.045em]">Cildini</span> dinleyen
                </span>
              </span>
              <span className="mx-[-0.06em] mt-[-0.12em] mb-[-0.06em] block w-full min-w-0 overflow-hidden px-[0.06em] pt-[0.12em] pb-[0.06em]">
                <span className="block whitespace-nowrap" data-hero-line>
                  bakım, sana <span className="font-editorial font-normal tracking-[-0.045em]">özgü.</span>
                </span>
              </span>
            </span>

            <span className="block min-[901px]:hidden" aria-hidden="true">
              <span className="mx-[-0.06em] mt-[-0.12em] mb-[-0.06em] block w-full min-w-0 overflow-hidden px-[0.06em] pt-[0.12em] pb-[0.06em]">
                <span className="block whitespace-nowrap" data-hero-line>
                  <span className="font-editorial font-normal tracking-[-0.045em]">Cildini</span>
                </span>
              </span>
              <span className="mx-[-0.06em] mt-[-0.12em] mb-[-0.06em] block w-full min-w-0 overflow-hidden px-[0.06em] pt-[0.12em] pb-[0.06em]">
                <span className="block whitespace-nowrap" data-hero-line>
                  dinleyen bakım,
                </span>
              </span>
              <span className="mx-[-0.06em] mt-[-0.12em] mb-[-0.06em] block w-full min-w-0 overflow-hidden px-[0.06em] pt-[0.12em] pb-[0.06em]">
                <span className="block whitespace-nowrap" data-hero-line>
                  sana <span className="font-editorial font-normal tracking-[-0.045em]">özgü.</span>
                </span>
              </span>
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-[370px] text-[0.86rem] leading-[1.4] font-normal tracking-[-0.018em] text-[rgba(247,246,241,0.9)] text-balance max-[390px]:max-w-[330px] min-[901px]:mt-[clamp(24px,3.5vh,38px)] min-[901px]:max-w-[560px] min-[901px]:text-[clamp(0.88rem,1.05vw,1rem)] min-[901px]:leading-[1.35] short-desktop:mt-[22px]"
            data-hero-support
          >
            GLUTANEX ve Exome seçkisini; bakım ihtiyacına, aktif içeriklerine ve kullanım adımlarına göre keşfet.
          </p>
        </div>

        <a
          className="group/cta grid min-h-16 w-full grid-cols-[1fr_50px] items-center justify-self-center rounded-full bg-[rgba(250,249,246,0.96)] py-[5px] pr-1.5 pl-[18px] text-center text-[0.69rem] font-normal tracking-[0.02em] uppercase shadow-[0_16px_48px_rgba(10,14,11,0.12)] min-[901px]:min-h-[76px] min-[901px]:w-[min(72vw,920px)] min-[901px]:grid-cols-[1fr_58px] min-[901px]:py-1.5 min-[901px]:pr-[7px] min-[901px]:pl-7 min-[901px]:text-[0.76rem] short-desktop:min-h-16 short-desktop:grid-cols-[1fr_50px]"
          href={TRENDYOL_STORE_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Ürün seçkisini Trendyol'da aç"
          data-hero-cta
        >
          <span className="pl-[50px] text-[#2f322f] min-[901px]:pl-[58px] short-desktop:pl-[50px]">Ürün seçkisini keşfet</span>
          <span
            data-hero-arrow
            className="group/arrow relative grid size-[50px] place-items-center overflow-hidden rounded-full bg-[#2f322f] text-[#f7f6f1] transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.035] active:scale-[0.97] motion-reduce:transition-none min-[901px]:size-[58px] short-desktop:size-[50px]"
            aria-hidden="true"
          >
            <span
              data-arrow-primary
              className="grid size-full place-items-center transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/arrow:translate-x-[145%] group-focus-visible/cta:translate-x-[145%] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <ArrowRightIcon size={21} weight="light" />
            </span>
            <span
              data-arrow-secondary
              className="absolute inset-0 grid -translate-x-[145%] place-items-center transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/arrow:translate-x-0 group-focus-visible/cta:translate-x-0 motion-reduce:hidden motion-reduce:transition-none"
            >
              <ArrowRightIcon size={21} weight="light" />
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
