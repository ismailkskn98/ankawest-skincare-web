import { ValueCard } from "./valueCard";

const values = [
  {
    icon: "sparkle",
    title: "İhtiyaca göre seçki",
    description:
      "Ton görünümü, nem, bariyer ve günlük koruma odağını anlaşılır bakım adımlarına ayırıyoruz.",
    className: "min-[1024px]:top-[24%] min-[1024px]:left-0",
    distance: 280,
  },
  {
    icon: "shield",
    title: "Aktif içeriği görünür",
    description:
      "Glutatyon, hyaluronik asit, PDRN ve bitki kaynaklı eksozom gibi öne çıkan içerikleri açıkça anlatıyoruz.",
    className: "min-[1024px]:top-[4%] min-[1024px]:left-[34%]",
    distance: 520,
  },
  {
    icon: "drop",
    title: "Rutine uyumlu doku",
    description:
      "Ampulden jel kreme, maskeden stick'e farklı dokuları rutindeki kullanım adımına göre sunuyoruz.",
    className: "min-[1024px]:top-[29%] min-[1024px]:right-0",
    distance: 390,
  },
  {
    icon: "sun",
    title: "Günlük bakım odağı",
    description:
      "Ürün seçkisini kullanım yönü, doku ve içerik bilgisini birlikte değerlendirebileceğin şekilde düzenliyoruz.",
    className: "min-[1024px]:top-[54%] min-[1024px]:right-[35%]",
    distance: 650,
  },
];

export function Visual() {
  return (
    <div
      className="relative mt-10 min-[901px]:mt-18 min-[1024px]:h-[clamp(760px,63vw,940px)]"
      data-motion-group
      data-scroll-parallax-section
      data-parallax-strength="1.5"
      data-parallax-direction="-1"
      data-parallax-centered="true"
    >
      <div
        className="relative z-1 mx-auto w-full max-w-[720px] min-[768px]:max-w-[960px] min-[1024px]:mt-[52px] min-[1024px]:w-[min(68vw,1080px)]"
      >
        <div
          className="pointer-events-none absolute -top-[7%] -right-[7%] hidden h-[44%] w-[46%] rotate-[16deg] rounded-[50%] border-t border-r border-site-ink/35 min-[1024px]:block"
          aria-hidden="true"
        />

        <div
          className="approach-fixed-visual relative aspect-[4/5] overflow-hidden rounded-[52%_48%_44%_56%/31%_37%_63%_69%] bg-[#d9e0e1] shadow-[0_42px_100px_rgba(38,46,44,0.12)] min-[768px]:aspect-[6/5] min-[768px]:rounded-[47%_53%_39%_61%/31%_34%_66%_69%]"
          style={{
            backgroundImage: "url('/images/home/approach-skin.jpg')",
          }}
          role="img"
          aria-label="Cilt bakım rutininde yüzüne nazikçe dokunan kadın"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(29,34,32,0.18)_100%)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 min-[640px]:gap-6 min-[768px]:grid-cols-2 min-[768px]:gap-8 min-[1024px]:contents">
        {values.map((value) => (
          <ValueCard key={value.title} {...value} />
        ))}
      </div>
    </div>
  );
}
