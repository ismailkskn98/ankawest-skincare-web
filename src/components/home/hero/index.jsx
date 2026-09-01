import { BgVideo } from "./bgVideo";
import { Content } from "./content";
import { Cta } from "./cta";
import { ParallaxProducts } from "./parallaxProducts";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate box-border min-h-[120svh] min-h-[120dvh] w-full max-w-[100vw] overflow-hidden [background:radial-gradient(circle_at_67%_30%,#b8aa96_0%,transparent_34%),#737a70]"
      aria-labelledby="hero-title"
      data-parallax-section
    >
      <BgVideo />
      <ParallaxProducts />

      <div className="relative z-2 grid min-h-svh min-h-dvh min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto] items-center px-4 pt-[106px] pb-[18px] min-[901px]:px-[clamp(18px,4.4vw,84px)] min-[901px]:pt-[clamp(118px,15vh,158px)] min-[901px]:pb-[clamp(22px,4.2vh,42px)] short-desktop:pt-28 short-desktop:pb-[18px]">
        <Content />
        <Cta />
      </div>
    </section>
  );
}
