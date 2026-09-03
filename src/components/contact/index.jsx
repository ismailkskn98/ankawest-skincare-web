import { INSTAGRAM_URL, TRENDYOL_STORE_URL } from "@/config/site-content";

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
    <div className="bg-site-paper text-site-ink" data-motion-group>
      <section
        className="relative overflow-hidden pt-[calc(74px+3.5rem)] pb-14 min-[901px]:pt-[calc(78px+5rem)] min-[901px]:pb-20"
        aria-labelledby="contact-title"
      >
        <div className="grid gap-8 min-[1024px]:grid-cols-12 min-[1024px]:items-end">
          <div className="min-[1024px]:col-span-7" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase">
              İletişim
            </p>
            <h1
              id="contact-title"
              className="font-canela mt-5 max-w-[10ch] text-[clamp(3.1rem,11vw,6.45rem)] leading-[0.9] font-light tracking-[-0.045em]"
            >
              Bizimle
              <span className="block">konuşun.</span>
            </h1>
          </div>

          <div
            className="max-w-[380px] min-[1024px]:col-span-5 min-[1024px]:justify-self-end"
            data-section-reveal
          >
            <p className="text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.5] tracking-[-0.02em] text-site-copy">
              Ürünler, iş birlikleri veya bakım rutinin hakkında soruların için
              buradayız. Mesajını bırak, en kısa sürede dönüş yapalım.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-12 pb-20 min-[1024px]:grid-cols-12 min-[1024px]:gap-10 min-[901px]:pb-32">
        <div className="min-[1024px]:col-span-4" data-section-reveal>
          <ul className="grid gap-6 border-t border-site-ink/15 pt-8">
            {contactDetails.map((detail) => (
              <li key={detail.label}>
                <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
                  {detail.label}
                </p>
                <a
                  className="group relative mt-2 inline-flex min-h-8 items-center text-[1.05rem] tracking-[-0.02em] text-site-ink"
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

          <div className="mt-12 rounded-[1.75rem] bg-[#20221f] p-7 text-[#f7f5ef]">
            <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-[#b9b8b1] uppercase">
              Çalışma saatleri
            </p>
            <p className="mt-4 text-[1.15rem] leading-[1.35] font-light tracking-[-0.02em]">
              Hafta içi 09:30 – 18:30
            </p>
            <p className="mt-3 text-[0.9rem] leading-[1.5] text-[#c5c5be]">
              Mesajlarına iş günlerinde dönüş yapıyoruz.
            </p>
          </div>
        </div>

        <div className="min-[1024px]:col-span-8" data-section-reveal>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
