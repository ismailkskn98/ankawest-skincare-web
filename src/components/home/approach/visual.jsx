import Image from "next/image";

import { ValueCard } from "./valueCard";

const values = [
  {
    icon: "sparkle",
    title: "İhtiyaca göre seçki",
    description:
      "Ton görünümü, nem, bariyer ve günlük koruma odağını anlaşılır bakım adımlarına ayırıyoruz.",
    className: "min-[1024px]:top-[13%] min-[1024px]:left-0",
    distance: -64,
  },
  {
    icon: "shield",
    title: "Aktif içeriği görünür",
    description:
      "Glutatyon, hyaluronik asit, PDRN ve bitki kaynaklı eksozom gibi öne çıkan içerikleri açıkça anlatıyoruz.",
    className: "min-[1024px]:top-0 min-[1024px]:left-[18%]",
    distance: 74,
  },
  {
    icon: "drop",
    title: "Rutine uyumlu doku",
    description:
      "Ampulden jel kreme, maskeden stick'e farklı dokuları rutindeki kullanım adımına göre sunuyoruz.",
    className: "min-[1024px]:top-[29%] min-[1024px]:right-0",
    distance: -58,
  },
  {
    icon: "sun",
    title: "Günlük bakım odağı",
    description:
      "Ürün seçkisini kullanım yönü, doku ve içerik bilgisini birlikte değerlendirebileceğin şekilde düzenliyoruz.",
    className: "min-[1024px]:right-[16%] min-[1024px]:bottom-[1%]",
    distance: 62,
  },
];

export function Visual() {
  return (
    <div
      className="relative mt-16 min-[901px]:mt-24 min-[1024px]:min-h-[1080px]"
      data-motion-group
    >
      <div
        className="relative z-1 mx-auto w-full max-w-[660px] min-[1024px]:mt-[118px] min-[1024px]:w-[min(58vw,760px)]"
        data-scroll-parallax-layer
        data-parallax-distance="82"
      >
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-[48%_52%_46%_54%/38%_36%_64%_62%] bg-[#d9e0e1] shadow-[0_42px_100px_rgba(38,46,44,0.12)]"
          data-section-reveal
        >
          <Image
            className="h-full w-full object-cover object-[50%_42%]"
            src="/images/home/approach-skin.webp"
            alt="Cilt bakım rutininde yüzüne nazikçe dokunan kadın"
            width={1122}
            height={1402}
            sizes="(min-width: 1024px) 760px, (min-width: 768px) 660px, 92vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(29,34,32,0.18)_100%)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 min-[768px]:grid-cols-2 min-[1024px]:contents">
        {values.map((value) => (
          <ValueCard key={value.title} {...value} />
        ))}
      </div>
    </div>
  );
}
