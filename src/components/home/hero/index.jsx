import { BgVideo } from "./bgVideo";
import { Content } from "./content";
import { Cta } from "./cta";
import { ParallaxProducts } from "./parallaxProducts";

export function Hero() {
  return (
    <section
      id="top"
      className="fluid gridContainer relative isolate box-border min-h-[100svh] min-h-[100dvh] w-full max-w-[100vw] overflow-hidden [background:radial-gradient(circle_at_67%_30%,#b8aa96_0%,transparent_34%),#737a70]"
      aria-labelledby="hero-title"
      data-parallax-section
    >
      <BgVideo />
      {/* <ParallaxProducts /> */}

      <div className="relative z-2 grid min-h-svh min-h-dvh min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto] items-center pt-[88px] pb-[12px] min-[901px]:pt-[clamp(96px,11vh,132px)] min-[901px]:pb-[clamp(18px,3vh,30px)] short-desktop:pt-24 short-desktop:pb-3">
        <Content />
        <Cta />
      </div>
    </section>
  );
}
