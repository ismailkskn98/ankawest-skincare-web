import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";

import { INSTAGRAM_URL } from "@/config/site-content";
import { PageMotionReady } from "@/components/site/pageMotionReady";

import { ContactForm } from "./form";

const contactDetails = [
  {
    label: "E-posta",
    value: "info@ankawest.com",
    href: "mailto:info@ankawest.com",
    icon: EnvelopeSimpleIcon,
  },
  {
    label: "Telefon",
    value: "+90 533 213 99 01",
    href: "tel:+905332139901",
    icon: PhoneIcon,
  },
  {
    label: "Instagram",
    value: "@ankawest_skincare",
    href: INSTAGRAM_URL,
    external: true,
    icon: InstagramLogoIcon,
  },
];

const mapUrl = "https://www.google.com/maps?q=Anka%20West%20Skincare&output=embed";

export function ContactPage() {
  return (
    <div className="fluid gridContainer bg-site-paper text-site-ink" data-motion-group>
      <PageMotionReady />
      <section className="relative grid min-h-[54svh] place-items-center overflow-hidden pt-[calc(82px+clamp(2rem,5vw,4rem))] pb-[clamp(3.25rem,6.5vw,5.75rem)] text-center" aria-labelledby="contact-title">
        <div className="mx-auto max-w-[62rem]" data-page-hero-reveal style={{ "--intro-order": 0 }}>
          <h1 id="contact-title" className="font-canela mt-8 text-[clamp(3.8rem,11.5vw,9.25rem)] leading-[0.86] font-light tracking-[-0.04em] text-[#3b3b3b]">
            <span className="block italic">birlikte</span>
            konuşalım
          </h1>
          <p className="mx-auto mt-[clamp(2rem,4vw,3.25rem)] max-w-[42rem] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.55] text-site-copy/62">
            Ürünler, iş birlikleri veya bakım rutinin hakkında bize yaz. Mesajını doğru kişiye ulaştırıp en kısa sürede dönüş yapalım.
          </p>
        </div>
      </section>

      <section
        id="iletisim-form"
        className="grid gap-[clamp(3rem,5vw,5rem)] border-t border-site-ink/10 pt-[clamp(3rem,5.5vw,4.75rem)] pb-[clamp(3.25rem,6vw,5.5rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]"
      >
        <div className="max-w-[58rem] lg:order-1" data-page-hero-reveal style={{ "--intro-order": 1 }}>
          <ContactForm />
        </div>

        <aside className="w-full lg:order-2 lg:ml-auto" data-page-hero-reveal style={{ "--intro-order": 2 }}>
          <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-site-copy uppercase">Bize ulaş</p>
          <h2 className="font-canela mt-5 max-w-[10ch] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] font-light tracking-[-0.04em] text-site-ink">temiz ve açık iletişim</h2>

          <ul className="mt-[clamp(2rem,4vw,3.25rem)] grid">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <li className="border-b border-site-ink/12" key={detail.label}>
                  <a
                    className="group flex items-center gap-4 py-5 text-site-ink transition-colors duration-300 hover:text-site-copy"
                    href={detail.href}
                    target={detail.external ? "_blank" : undefined}
                    rel={detail.external ? "noreferrer" : undefined}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f2f2ef] text-site-ink transition-colors duration-300 group-hover:bg-site-ink group-hover:text-site-paper">
                      <Icon size={18} weight="light" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-semibold tracking-[0.12em] text-site-copy/60 uppercase">{detail.label}</span>
                      <span className="mt-1 block truncate text-[0.98rem] leading-[1.35] tracking-[-0.02em]">{detail.value}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="py-5">
            <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-site-copy/60 uppercase">Çalışma saatleri</p>
            <p className="mt-3 text-[1.15rem] leading-[1.35] font-light tracking-[-0.025em] text-site-ink">Hafta içi 09:30 - 18:30</p>
            <p className="mt-3 text-[0.88rem] leading-[1.5] text-site-copy/72">Mesajlarına iş günlerinde dönüş yapıyoruz.</p>
          </div>
        </aside>
      </section>

      <section className="fluid gridContainer bg-site-paper pt-[clamp(2.25rem,4vw,3.75rem)] pb-[clamp(4rem,8vw,7rem)]" aria-labelledby="map-title">
        <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-site-copy uppercase">Konum</p>
            <h2 id="map-title" className="font-canela mt-4 text-[clamp(2.7rem,5vw,4.8rem)] leading-[0.95] font-light tracking-[-0.045em] text-site-ink">
              haritada bul
            </h2>
            <p className="mt-5 max-w-[32rem] text-[clamp(0.96rem,1.2vw,1.08rem)] leading-[1.6] text-site-copy/72">
              Google Haritalar üzerinden Anka West konumunu görüntüleyebilir, yol tarifi alabilirsin.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1rem] ring-1 ring-site-ink/10 lg:col-span-8" data-section-reveal>
            <iframe
              className="h-[clamp(21rem,46vw,34rem)] w-full border-0"
              src={mapUrl}
              title="Anka West Skincare Google Harita"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
