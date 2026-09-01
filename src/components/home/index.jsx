import { Header } from "./header";
import { Hero } from "./hero";
import { MotionController } from "./motionController";

export function Home() {
  return (
    <div
      className="relative min-h-dvh w-full max-w-[100vw] overflow-x-clip bg-[#72786f] font-ppmori text-[#f7f6f1] [font-synthesis:none] selection:bg-[#f7f6f1] selection:text-[#2f322f]"
      data-site-root
    >
      <MotionController />

      <a
        className="fixed top-3 left-3 z-30 -translate-y-[170%] rounded-full bg-[#f7f6f1] px-[15px] py-[11px] text-[0.78rem] font-semibold transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:translate-y-0 motion-reduce:transition-none"
        href="#main-content"
      >
        <span className="text-[#2f322f]">Ana içeriğe geç</span>
      </a>

      <Header />

      <main id="main-content" className="min-w-0">
        <Hero />
      </main>
      <div className="h-dvh w-full bg-pink-500"></div>
      <div className="h-dvh w-full bg-purple-800"></div>
    </div>
  );
}
