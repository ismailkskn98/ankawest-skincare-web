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
      <section
        className="relative grid place-items-start overflow-hidden pt-[calc(74px+clamp(1rem,3vh,1.5rem))] pb-[clamp(2.25rem,5vh,3.25rem)] text-center nav:min-h-[clamp(28rem,58svh,40rem)] nav:place-items-center nav:pt-[calc(78px+clamp(2rem,5vh,4rem))] short-desktop:nav:min-h-[clamp(27rem,56svh,32rem)] short-desktop:nav:pt-[calc(78px+clamp(1.5rem,3vh,2.5rem))]"
        aria-labelledby="contact-title"
      >
        <div className="mx-auto max-w-[62rem]" data-page-hero-reveal style={{ "--intro-order": 0 }}>
          <h1
            id="contact-title"
            className="font-sentient text-[clamp(2.8rem,11vw,4.25rem)] leading-[0.9] font-light tracking-[-0.04em] text-[#3b3b3b] nav:text-[clamp(4.25rem,7.8vw,7.5rem)] xl:text-[clamp(5.25rem,7vw,8.5rem)]"
          >
            <span className="block italic">Birlikte</span>
            konuşalım
          </h1>
          <p className="mx-auto mt-[clamp(1.25rem,2.5vw,2.25rem)] max-w-[38rem] text-[clamp(0.9rem,1.1vw,1.08rem)] leading-[1.6] text-site-copy/62">
            Ürünler, iş birlikleri veya bakım rutinin hakkında bize yaz. Mesajını doğru kişiye ulaştırıp en kısa sürede dönüş yapalım.
          </p>
        </div>
      </section>

      <section
        id="iletisim-form"
        className="grid gap-[clamp(2rem,3.5vw,4rem)] border-t border-site-ink/10 pt-[clamp(2rem,4vh,4.5rem)] pb-[clamp(2.25rem,5vh,4.5rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] short-desktop:py-[clamp(2rem,4vh,3.5rem)]"
      >
        <div className="max-w-[58rem] lg:order-1" data-page-hero-reveal style={{ "--intro-order": 1 }}>
          <ContactForm />
        </div>

        <aside className="w-full lg:order-2 lg:ml-auto" data-page-hero-reveal style={{ "--intro-order": 2 }}>
          <p className="text-[clamp(0.58rem,0.8vw,0.68rem)] font-semibold tracking-[0.14em] text-site-copy uppercase">Bize ulaş</p>
          <h2 className="font-sentient mt-[clamp(1rem,1.8vw,1.5rem)] max-w-[10ch] text-[clamp(2.2rem,5vw,3.5rem)] leading-[0.96] font-light tracking-[-0.04em] text-site-ink lg:text-[clamp(2.6rem,3.6vw,4.4rem)]">
            Temiz ve açık iletişim
          </h2>

          <ul className="mt-[clamp(1.75rem,3vw,2.75rem)] grid">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <li className="border-b border-site-ink/12" key={detail.label}>
                  <a
                    className="group flex items-center gap-[clamp(0.9rem,1.5vw,1.25rem)] py-[clamp(1rem,1.8vw,1.5rem)] text-site-ink transition-colors duration-300 hover:text-site-copy"
                    href={detail.href}
                    target={detail.external ? "_blank" : undefined}
                    rel={detail.external ? "noreferrer" : undefined}
                  >
                    <span className="grid size-[clamp(2.75rem,3.5vw,3.25rem)] shrink-0 place-items-center rounded-full bg-[#f2f2ef] text-site-ink transition-colors duration-300 group-hover:bg-site-ink group-hover:text-site-paper">
                      <Icon size={18} weight="light" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[clamp(0.58rem,0.68vw,0.64rem)] font-semibold tracking-[0.12em] text-site-copy/60 uppercase">{detail.label}</span>
                      <span className="mt-1 block truncate text-[clamp(0.9rem,1vw,1rem)] leading-[1.4] tracking-[-0.02em]">{detail.value}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="py-[clamp(1rem,1.8vw,1.5rem)]">
            <p className="text-[clamp(0.58rem,0.68vw,0.64rem)] font-semibold tracking-[0.12em] text-site-copy/60 uppercase">Çalışma saatleri</p>
            <p className="mt-[clamp(0.65rem,1vw,0.9rem)] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.35] font-light tracking-[-0.025em] text-site-ink">Hafta içi 09:30 - 18:30</p>
            <p className="mt-[clamp(0.65rem,1vw,0.9rem)] text-[clamp(0.82rem,0.9vw,0.9rem)] leading-[1.55] text-site-copy/72">Mesajlarına iş günlerinde dönüş yapıyoruz.</p>
          </div>
        </aside>
      </section>

      <section className="fluid gridContainer bg-site-paper pb-[clamp(3rem,6vh,5.5rem)] short-desktop:py-[clamp(2.5rem,5vh,4rem)]" aria-labelledby="map-title">
        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4" data-section-reveal>
            <p className="text-[clamp(0.58rem,0.8vw,0.68rem)] font-semibold tracking-[0.14em] text-site-copy uppercase">Konum</p>
            <h2
              id="map-title"
              className="font-sentient mt-[clamp(0.9rem,1.5vw,1.5rem)] text-[clamp(2.25rem,5vw,3.6rem)] leading-[0.96] font-light tracking-[-0.045em] text-site-ink lg:text-[clamp(2.8rem,3.7vw,4.8rem)]"
            >
              Haritada bul
            </h2>
            <p className="mt-[clamp(1rem,1.8vw,1.5rem)] max-w-[32rem] text-[clamp(0.88rem,1vw,1rem)] leading-[1.6] text-site-copy/72">
              Google Haritalar üzerinden Anka West konumunu görüntüleyebilir, yol tarifi alabilirsin.
            </p>
          </div>

          <div className="overflow-hidden rounded-[clamp(0.9rem,1.6vw,1.25rem)] ring-1 ring-site-ink/10 lg:col-span-8" data-section-reveal>
            <iframe
              className="h-[clamp(16rem,68vw,30rem)] w-full border-0 lg:h-[clamp(24rem,32vw,32rem)]"
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
