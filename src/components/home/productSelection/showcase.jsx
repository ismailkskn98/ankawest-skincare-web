import Image from "next/image";

export function Showcase() {
  return (
    <figure
      className="relative isolate min-h-[620px] overflow-hidden rounded-[3rem] bg-[#d7e0e2] shadow-[0_38px_100px_rgba(41,49,46,0.1)] min-[1024px]:min-h-[820px]"
      data-section-reveal
    >
      <figcaption className="absolute top-8 left-8 z-3 max-w-[15ch] text-[0.68rem] font-semibold tracking-[0.13em] text-site-ink uppercase min-[901px]:top-10 min-[901px]:left-10">
        Günlük koruma / seçilmiş bakım
      </figcaption>

      <div
        className="absolute inset-x-[15%] top-[13%] bottom-[-8%] z-1"
        data-scroll-parallax-layer
        data-parallax-distance="78"
      >
        <Image
          className="h-full w-full object-contain mix-blend-multiply drop-shadow-[0_36px_36px_rgba(35,43,41,0.13)]"
          src="/images/deney.png"
          alt="GLUTANEX Melanin Blocking Sun Stick"
          width={444}
          height={1221}
          sizes="(min-width: 1024px) 480px, 70vw"
        />
      </div>

      <div
        className="absolute right-[4%] bottom-[7%] z-2 hidden w-[34%] min-[1024px]:block"
        data-scroll-parallax-layer
        data-parallax-distance="-54"
        aria-hidden="true"
      >
        <Image
          className="h-auto w-full drop-shadow-[0_28px_30px_rgba(29,38,35,0.18)]"
          src="/images/urunler/cutouts/glutanex-glow-booster.png"
          alt=""
          width={737}
          height={726}
          sizes="220px"
        />
      </div>

      <div
        className="absolute -bottom-[5%] -left-[3%] z-2 hidden w-[19%] min-[1024px]:block"
        data-scroll-parallax-layer
        data-parallax-distance="46"
        aria-hidden="true"
      >
        <Image
          className="h-auto w-full drop-shadow-[0_28px_30px_rgba(29,38,35,0.18)]"
          src="/images/urunler/cutouts/glutanex-eye-cream.png"
          alt=""
          width={229}
          height={983}
          sizes="120px"
        />
      </div>

      <div
        className="pointer-events-none absolute -right-[28%] -bottom-[18%] size-[68%] rounded-full border border-[rgba(59,59,59,0.17)]"
        aria-hidden="true"
      />
    </figure>
  );
}
