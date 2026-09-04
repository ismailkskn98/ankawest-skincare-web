import { ValueCard } from "./valueCard";

const values = [
  {
    icon: "sparkle",
    title: "İhtiyaca göre seçki",
    description: "Ton görünümü, nem, bariyer ve günlük koruma odağını anlaşılır bakım adımlarına ayırıyoruz.",
    className: "lg:top-[29%] lg:left-0",
    distance: 280,
  },
  {
    icon: "shield",
    title: "Aktif içeriği görünür",
    description: "Glutatyon, hyaluronik asit, PDRN ve bitki kaynaklı eksozom gibi öne çıkan içerikleri açıkça anlatıyoruz.",
    className: "lg:top-[3%] lg:left-[calc(34%_-_clamp(7rem,11vw,11.25rem))]",
    distance: 520,
  },
  {
    icon: "drop",
    title: "Rutine uyumlu doku",
    description: "Ampulden jel kreme, maskeden stick'e farklı dokuları rutindeki kullanım adımına göre sunuyoruz.",
    className: "lg:top-[37%] lg:right-0",
    distance: 390,
  },
  {
    icon: "sun",
    title: "Günlük bakım odağı",
    description: "Ürün seçkisini kullanım yönü, doku ve içerik bilgisini birlikte değerlendirebileceğin şekilde düzenliyoruz.",
    className: "lg:top-[75%] lg:right-[calc(35%_-_clamp(7rem,11vw,11.25rem))]",
    distance: 650,
  },
];

export function Visual() {
  return (
    <div
      className="relative mt-8 nav:mt-12 lg:mt-14 lg:h-[clamp(720px,68vw,1020px)]"
      data-motion-group
      data-scroll-parallax-section
      data-parallax-desktop-only="true"
      data-parallax-strength="1.5"
      data-parallax-direction="-1"
      data-parallax-centered="true"
    >
      <div className="relative z-1 mx-auto w-full max-w-[720px] md:max-w-[960px] lg:mt-[52px] lg:w-[min(68vw,1080px)]">
        <div
          className="pointer-events-none absolute -top-[7%] -right-[7%] hidden h-[44%] w-[46%] rotate-[16deg] rounded-[50%] border-t border-r border-site-ink/35 lg:block"
          aria-hidden="true"
        />

        <div
          className="approach-fixed-visual relative aspect-[4/5] overflow-hidden rounded-[52%_48%_44%_56%/31%_37%_63%_69%] bg-[#d9e0e1] shadow-[0_42px_100px_rgba(38,46,44,0.12)] md:aspect-[6/5] md:rounded-[47%_53%_39%_61%/31%_34%_66%_69%]"
          style={{
            backgroundImage: "url('/images/home/approach-skin/image-1.jpg')",
          }}
          role="img"
          aria-label="Cilt bakım rutininde yüzüne nazikçe dokunan kadın"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(29,34,32,0.18)_100%)]" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:contents">
        {values.map((value) => (
          <ValueCard key={value.title} {...value} />
        ))}
      </div>
    </div>
  );
}
