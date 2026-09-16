import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Image from "next/image";

import { INSTAGRAM_URL } from "@/config/site-content";

const notes = [
  {
    category: "Aktif içerikler",
    title: "Aynı rutinde hangi adım önce gelir?",
    description: "Bakım adımlarını doku ve kullanım yönüne göre sade bir sıraya yerleştir.",
    image: "/images/home/kadin-resim-6.webp",
    alt: "Yüzüne bakım kremi uygulayan kadın",
    className: "lg:col-span-6",
    imageClassName: "aspect-[5/4] md:aspect-[3/2] lg:aspect-[6/5]",
  },
  {
    category: "Nem & bariyer",
    title: "Cildin konforunu rutinin merkezine al",
    description: "Nem desteğini, arındırma adımlarını ve günlük bakım dokularını birlikte düşün.",
    image: "/images/home/kadin-resmi-2.webp",
    alt: "Bakım maskesi uygulayan kadın",
    className: "lg:col-span-3 lg:mt-6 xl:mt-10",
    imageClassName: "aspect-[5/4] md:aspect-[5/6] lg:aspect-[4/5]",
  },
  {
    category: "Bakım ritmi",
    title: "Az adım, anlaşılır ve sürdürülebilir rutin",
    description: "Günün ihtiyacına göre şekillenen, takip etmesi kolay bir bakım yaklaşımı.",
    image: "/images/home/kadin-resmi-4.webp",
    alt: "Yüzüne nazikçe masaj yapan kadın",
    className: "lg:col-span-3 lg:mt-10 xl:mt-16",
    imageClassName: "aspect-[5/4] md:aspect-[5/6] lg:aspect-[4/5]",
  },
];

export function Journal() {
  return (
    <section id="bakim-notlari" className="fluid gridContainer relative overflow-hidden bg-[#20221f]/98 py-[clamp(3.25rem,5vw,6rem)] text-[#f7f5ef]" aria-labelledby="journal-title">
      <div className="relative z-2" data-motion-group>
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8" data-section-reveal>
            <p className="text-[clamp(0.58rem,0.8vw,0.66rem)] font-semibold tracking-[0.16em] text-[#d2cec4] uppercase">Anka West bakım notları</p>
            <h2
              id="journal-title"
              className="font-sentient mt-3.5 max-w-[10ch] text-[clamp(2.3rem,8.5vw,3.7rem)] leading-[0.96] font-light tracking-[-0.04em] nav:mt-4 nav:text-[clamp(3rem,4.3vw,5.2rem)] xl:text-[clamp(3.4rem,4.8vw,6rem)]"
            >
              Ciltle konuşan
              <span className="block text-[#eee8df]">kısa notlar</span>
            </h2>
          </div>

          <a
            className="group flex w-fit items-center gap-3 text-[0.7rem] font-semibold tracking-[0.09em] text-[#f7f5ef] uppercase lg:col-span-4 lg:justify-self-end lg:gap-4 lg:pb-3"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            data-section-reveal
          >
            Tüm notları takip et
            <span className="grid size-9 place-items-center rounded-full bg-[#f7f5ef] text-site-ink transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 motion-reduce:transition-none nav:size-11">
              <ArrowUpRightIcon size={17} weight="light" aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="mt-10 grid gap-7 md:mt-12 md:grid-cols-2 md:gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          {notes.map((note) => (
            <article className={note.className} key={note.title} data-section-reveal>
              <div className={`relative overflow-hidden bg-[#343632] ${note.imageClassName}`}>
                <Image
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025] motion-reduce:transition-none"
                  src={note.image}
                  alt={note.alt}
                  fill
                  sizes="(min-width: 64rem) 45vw, (min-width: 48rem) 48vw, 92vw"
                />
              </div>
              <div className="border-t border-[#f7f5ef]/20 pt-3.5 nav:pt-4">
                <p className="text-[0.62rem] font-semibold tracking-[0.13em] text-[#b9b8b1] uppercase">{note.category}</p>
                <h3 className="mt-2.5 max-w-[22ch] text-[clamp(1.08rem,1.6vw,1.55rem)] leading-[1.1] font-light tracking-[-0.035em] text-[#f7f5ef] nav:mt-3">{note.title}</h3>
                <p className="mt-2.5 max-w-[42ch] text-[clamp(0.78rem,0.95vw,0.84rem)] leading-[1.55] text-[#c5c5be] nav:mt-3.5">{note.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
