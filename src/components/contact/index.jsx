import { INSTAGRAM_URL, TRENDYOL_STORE_URL } from "@/config/site-content";
import { PageHero } from "@/components/site/pageHero";

import { ContactForm } from "./form";

const contactDetails = [
  {
    label: "E-posta",
    value: "info@ankawest.com",
    href: "mailto:info@ankawest.com",
  },
  {
    label: "Telefon",
    value: "+90 533 213 99 01",
    href: "tel:+905332139901",
  },
  {
    label: "Instagram",
    value: "@ankawest_skincare",
    href: INSTAGRAM_URL,
    external: true,
  },
  {
    label: "Mağaza",
    value: "Trendyol’da keşfet",
    href: TRENDYOL_STORE_URL,
    external: true,
  },
];

export function ContactPage() {
  return (
    <div className="fluid gridContainer bg-site-paper text-site-ink" data-motion-group>
      <PageHero
        eyebrow="İletişim"
        titleLines={["Bizimle", "konuşun."]}
        displayLine="konuşun."
        cardTitle="Mesajını"
        cardTitleAccent="bırak."
        cardBody="Ürünler, iş birlikleri veya bakım rutinin hakkında soruların için buradayız. En kısa sürede dönüş yapalım."
        ctaLabel="Forma git"
        ctaHref="#iletisim-form"
        imageSrc="/images/page-hero/v3.png"
        imageAlt="Anka West Skincare ürünleri"
        imagePosition="center"
      />

      <section id="iletisim-form" className="grid gap-10 pt-[clamp(4rem,7vw,6.5rem)] pb-[clamp(4rem,9vw,8rem)] min-[1024px]:grid-cols-12 min-[1024px]:gap-10">
        <div className="min-[1024px]:col-span-4" data-section-reveal>
          <ul className="grid gap-5 border-t border-site-ink/12 pt-7">
            {contactDetails.map((detail) => (
              <li key={detail.label}>
                <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-site-copy uppercase">{detail.label}</p>
                <a
                  className="group relative mt-2 inline-flex min-h-8 items-center text-[1.02rem] tracking-[-0.02em] text-site-ink"
                  href={detail.href}
                  target={detail.external ? "_blank" : undefined}
                  rel={detail.external ? "noreferrer" : undefined}
                >
                  {detail.value}
                  <span
                    className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-[1.5rem] bg-[#20221f] p-6 text-[#f7f5ef] min-[768px]:p-7">
            <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-[#b9b8b1] uppercase">Çalışma saatleri</p>
            <p className="mt-3 text-[1.1rem] leading-[1.35] font-light tracking-[-0.02em]">Hafta içi 09:30 – 18:30</p>
            <p className="mt-3 text-[0.88rem] leading-[1.5] text-[#c5c5be]">Mesajlarına iş günlerinde dönüş yapıyoruz.</p>
          </div>
        </div>

        <div className="min-[1024px]:col-span-8" data-section-reveal>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
