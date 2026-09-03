import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { MotionController } from "@/components/home/motionController";

export function SiteShell({ children, mainClassName = "" }) {
  return (
    <div
      className="gridContainer relative min-h-dvh w-full max-w-[100vw] overflow-x-clip bg-site-paper font-ppmori text-site-ink [font-synthesis:none] selection:bg-site-ink selection:text-site-paper"
      data-site-root
    >
      <MotionController />

      <a
        className="fixed top-3 left-3 z-30 -translate-y-[170%] rounded-full bg-site-ink px-[15px] py-[11px] text-[0.78rem] font-semibold text-site-paper transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:translate-y-0 motion-reduce:transition-none"
        href="#main-content"
      >
        Ana içeriğe geç
      </a>

      <Header tone="light" />

      <main id="main-content" className={`fluid gridContainer min-w-0 ${mainClassName}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
