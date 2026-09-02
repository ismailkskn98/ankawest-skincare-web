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
    className: "min-[1024px]:col-span-3 min-[1024px]:mt-24",
    imageClassName: "aspect-[4/5]",
  },
  {
    category: "Bakım ritmi",
    title: "Az adım, anlaşılır ve sürdürülebilir rutin",
    description:
      "Günün ihtiyacına göre şekillenen, takip etmesi kolay bir bakım yaklaşımı.",
    image: "/images/home/kadin-resmi-5.jpg",
    alt: "Yüzüne nazikçe masaj yapan kadın",
    className: "min-[1024px]:col-span-3 min-[1024px]:mt-44",
    imageClassName: "aspect-[4/5]",
  },
];

export function Journal() {
  return (
    <section
      id="bakim-notlari"
      className="fluid gridContainer relative overflow-hidden bg-[#20221f]/98 py-20 text-[#f7f5ef] min-[901px]:py-32"
      aria-labelledby="journal-title"
    >
      <div className="relative z-2" data-motion-group>
        <div className="grid items-end gap-8 min-[1024px]:grid-cols-12">
          <div className="min-[1024px]:col-span-8" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[#d2cec4] uppercase">
              Anka West bakım notları
            </p>
            <h2
              id="journal-title"
              className="mt-5 max-w-[10ch] text-[clamp(3.4rem,13vw,6.5rem)] leading-[0.86] font-normal tracking-[-0.065em] min-[901px]:text-[clamp(6rem,8vw,8.8rem)]"
            >
              Ciltle konuşan
              <span className="block font-editorial font-extralight tracking-[-0.04em] text-[#eee8df]">
                kısa notlar.
              </span>
            </h2>
          </div>

          <a
            className="group flex w-fit items-center gap-4 text-[0.7rem] font-semibold tracking-[0.09em] text-[#f7f5ef] uppercase min-[1024px]:col-span-4 min-[1024px]:justify-self-end min-[1024px]:pb-3"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            data-section-reveal
          >
            Tüm notları takip et
            <span className="grid size-12 place-items-center rounded-full bg-[#f7f5ef] text-site-ink transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 motion-reduce:transition-none">
              <ArrowUpRightIcon size={19} weight="light" aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="mt-14 grid gap-10 min-[768px]:grid-cols-2 min-[1024px]:mt-20 min-[1024px]:grid-cols-12 min-[1024px]:gap-6">
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
              <div className="border-t border-[#f7f5ef]/20 pt-5">
                <p className="text-[0.62rem] font-semibold tracking-[0.13em] text-[#b9b8b1] uppercase">
                  {note.category}
                </p>
                <h3 className="mt-3 max-w-[22ch] text-[clamp(1.35rem,2.25vw,2.1rem)] leading-[1.04] font-light tracking-[-0.04em] text-[#f7f5ef]">
                  {note.title}
                </h3>
                <p className="mt-4 max-w-[42ch] text-[0.86rem] leading-[1.55] text-[#c5c5be]">
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
