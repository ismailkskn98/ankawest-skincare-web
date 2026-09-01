import { HeroSection } from "@/components/site/hero-section";
import { SiteHeader } from "@/components/site/site-header";
import { SiteMotionController } from "@/components/site/site-motion-controller";

export const metadata = {
  title: "İhtiyacına Göre Kore Cilt Bakımı",
  description:
    "GLUTANEX ve Exome ürünlerini bakım ihtiyacı, aktif içerik ve kullanım adımları üzerinden keşfedin.",
  openGraph: {
    title: "Anka West Skincare",
    description:
      "Bakım ihtiyacınıza göre seçilmiş GLUTANEX ve Exome ürünlerini keşfedin.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function HomePage() {
  return (
    <div
      className="relative min-h-dvh w-full max-w-[100vw] overflow-x-clip bg-[#72786f] font-ppmori text-[#f7f6f1] [font-synthesis:none] selection:bg-[#f7f6f1] selection:text-[#2f322f]"
      data-site-root
    >
      <SiteMotionController />

      <a
        className="fixed top-3 left-3 z-30 -translate-y-[170%] rounded-full bg-[#f7f6f1] px-[15px] py-[11px] text-[0.78rem] font-semibold transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:translate-y-0 motion-reduce:transition-none"
        href="#main-content"
      >
        <span className="text-[#2f322f]">Ana içeriğe geç</span>
      </a>

      <SiteHeader />

      <main id="main-content" className="min-w-0">
        <HeroSection />
      </main>
    </div>
  );
}
