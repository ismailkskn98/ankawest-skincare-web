import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Image from "next/image";

import { INSTAGRAM_URL } from "@/config/site-content";

const notes = [
  {
    category: "Aktif içerikler",
    title: "Aynı rutinde hangi adım önce gelir?",
    description:
      "Bakım adımlarını doku ve kullanım yönüne göre sade bir sıraya yerleştir.",
    image: "/images/home/kadin-resmi-3.jpg",
    alt: "Yüzüne bakım kremi uygulayan kadın",
    className: "min-[1024px]:col-span-6",
    imageClassName: "aspect-[4/5] min-[1024px]:aspect-[6/5]",
  },
  {
    category: "Nem & bariyer",
    title: "Cildin konforunu rutinin merkezine al",
    description:
      "Nem desteğini, arındırma adımlarını ve günlük bakım dokularını birlikte düşün.",
    image: "/images/home/kadin-resmi-4.jpg",
    alt: "Bakım maskesi uygulayan kadın",
    className: "min-[1024px]:col-span-3 min-[1024px]:mt-8 min-[1280px]:mt-16",
    imageClassName: "aspect-[4/5]",
  },
  {
    category: "Bakım ritmi",
    title: "Az adım, anlaşılır ve sürdürülebilir rutin",
    description:
      "Günün ihtiyacına göre şekillenen, takip etmesi kolay bir bakım yaklaşımı.",
    image: "/images/home/kadin-resmi-5.jpg",
    alt: "Yüzüne nazikçe masaj yapan kadın",
    className: "min-[1024px]:col-span-3 min-[1024px]:mt-16 min-[1280px]:mt-28",
    imageClassName: "aspect-[4/5]",
  },
];

export function Journal() {
  return (
    <section
      id="bakim-notlari"
      className="fluid gridContainer relative overflow-hidden bg-[#20221f]/98 py-[clamp(3.5rem,6vw,7rem)] text-[#f7f5ef]"
      aria-labelledby="journal-title"
    >
      <div className="relative z-2" data-motion-group>
        <div className="grid items-end gap-6 min-[1024px]:grid-cols-12 min-[1024px]:gap-8">
          <div className="min-[1024px]:col-span-8" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[#d2cec4] uppercase">
              Anka West bakım notları
            </p>
            <h2
              id="journal-title"
              className="font-canela mt-4 max-w-[10ch] text-[clamp(2.55rem,9.5vw,4.5rem)] leading-[0.92] font-light tracking-[-0.045em] min-[901px]:mt-5 min-[901px]:text-[clamp(3.6rem,5.4vw,6.3rem)] min-[1280px]:text-[clamp(4.2rem,5.9vw,7.1rem)]"
            >
              Ciltle konuşan
              <span className="block text-[#eee8df]">kısa notlar.</span>
            </h2>
          </div>

          <a
            className="group flex w-fit items-center gap-3 text-[0.7rem] font-semibold tracking-[0.09em] text-[#f7f5ef] uppercase min-[1024px]:col-span-4 min-[1024px]:justify-self-end min-[1024px]:gap-4 min-[1024px]:pb-3"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            data-section-reveal
          >
            Tüm notları takip et
            <span className="grid size-9 place-items-center rounded-full bg-[#f7f5ef] text-site-ink transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 motion-reduce:transition-none min-[901px]:size-11">
              <ArrowUpRightIcon size={17} weight="light" aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="mt-12 grid gap-8 min-[768px]:grid-cols-2 min-[768px]:gap-7 min-[1024px]:mt-16 min-[1024px]:grid-cols-12 min-[1024px]:gap-6">
          {notes.map((note) => (
            <article className={note.className} key={note.title} data-section-reveal>
              <div className={`relative overflow-hidden bg-[#343632] ${note.imageClassName}`}>
                <Image
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025] motion-reduce:transition-none"
                  src={note.image}
                  alt={note.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 768px) 48vw, 92vw"
                />
              </div>
              <div className="border-t border-[#f7f5ef]/20 pt-4 min-[901px]:pt-5">
                <p className="text-[0.62rem] font-semibold tracking-[0.13em] text-[#b9b8b1] uppercase">
                  {note.category}
                </p>
                <h3 className="mt-2.5 max-w-[22ch] text-[clamp(1.2rem,2vw,1.85rem)] leading-[1.08] font-light tracking-[-0.04em] text-[#f7f5ef] min-[901px]:mt-3">
                  {note.title}
                </h3>
                <p className="mt-3 max-w-[42ch] text-[0.84rem] leading-[1.55] text-[#c5c5be] min-[901px]:mt-4 min-[901px]:text-[0.86rem]">
                  {note.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
