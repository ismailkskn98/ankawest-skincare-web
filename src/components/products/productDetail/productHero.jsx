import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { LeafIcon } from "@phosphor-icons/react/dist/ssr/Leaf";
import Link from "next/link";

import { ProductMediaGallery } from "@/components/products/mediaGallery";

import { getIngredientGroups, normalizeListItems } from "./helpers";

export function ProductHero({ product, detailMedia, detailUrl, productFacts, productTitle }) {
  const compactTitle = productTitle.length > 72;

  return (
    <section className="fluid relative bg-[#ededeb]" aria-labelledby="product-title">
      <div className="grid bg-white pt-[calc(74px+clamp(1.75rem,3.5vw,2.75rem))] lg:min-h-svh lg:items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] nav:pt-[calc(78px+clamp(2rem,3.8vw,3.25rem))]">
        <div className="relative isolate z-3 flex min-h-[clamp(18rem,52svh,28rem)] flex-col bg-white pb-[clamp(1.25rem,4vw,3rem)] md:min-h-[clamp(22rem,58svh,34rem)] lg:min-h-0">
          <IntroArrow />
          <Link
            className="relative z-2 ml-[clamp(1rem,4vw,4.5rem)] inline-flex min-h-10 w-fit items-center text-[0.68rem] font-semibold tracking-[0.1em] text-site-copy uppercase transition-opacity duration-300 hover:opacity-70"
            href="/urunler"
            data-page-hero-reveal
            style={{ "--intro-order": 0 }}
          >
            ← Tüm ürünler
          </Link>
          <div className="relative z-1 flex flex-1" data-page-hero-media>
            <ProductMediaGallery mediaItems={detailMedia} productName={productTitle} />
          </div>
        </div>
        <div className="relative z-2 flex flex-col bg-[#dbe5e9] p-[clamp(1.5rem,4vw,3rem)] lg:min-h-full lg:-mb-[clamp(1.5rem,4vw,3.5rem)] xl:p-[clamp(3rem,4.2vw,5.5rem)]">
          <div className="flex flex-1 flex-col justify-between gap-[clamp(1.75rem,4vh,2.75rem)]" data-page-hero-reveal style={{ "--intro-order": 1 }}>
            <div className="flex flex-col gap-[clamp(1.15rem,2.4vh,1.75rem)]">
              {product.categoryName || product.brand ? (
                <div className="flex flex-wrap items-center gap-3">
                  {product.categoryName ? (
                    <span className="inline-flex w-fit rounded-full border border-[#454545]/55 px-5 py-2 text-[0.66rem] font-normal tracking-[0.08em] text-[#333333] uppercase">
                      {product.categoryName}
                    </span>
                  ) : null}
                  {product.brand ? <span className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">{product.brand}</span> : null}
                </div>
              ) : null}
              <h1
                id="product-title"
                className={`${compactTitle ? "max-w-[24ch] text-[clamp(2rem,3.5vw,3.65rem)]" : "max-w-[16ch] text-[clamp(2.55rem,5.4vw,5rem)] xl:text-[clamp(3.8rem,4vw,5rem)]"} leading-[1.05] font-semibold tracking-[-0.055em] text-[#3b3b3b]`}
              >
                {productTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                {product.sizeLabel ? <span className="rounded-full bg-site-ink px-4 py-2 text-[0.72rem] font-semibold tracking-[0.08em] text-site-paper uppercase">{product.sizeLabel}</span> : null}
                {product.priceLabel ? <span className="text-[clamp(1.1rem,1.7vw,1.5rem)] font-normal tracking-[-0.02em] text-[#3f3f3f]">{product.priceLabel}</span> : null}
              </div>
              {product.shortDescription || product.description ? (
                <p className="max-w-[54ch] text-[clamp(0.98rem,1.16vw,1.15rem)] leading-[1.6] font-normal text-[#69716d]">{product.shortDescription || product.description}</p>
              ) : null}
              <HeroDetailNotes product={product} />
            </div>
            <div className="flex flex-col gap-[clamp(1.5rem,3.5vh,2.25rem)]">
              {detailUrl ? <DetailCta href={detailUrl} /> : null}
              {productFacts.length ? (
                <div className="grid grid-cols-2 gap-x-5 gap-y-5 text-center sm:grid-cols-4">
                  {productFacts.map(({ value, label }) => (
                    <div key={label}>
                      <span className="mx-auto grid size-14 place-items-center rounded-full border border-white/20 bg-[#ebebe9] px-2 text-site-ink shadow-sm lg:size-[3.75rem]">
                        {value ? <span className="text-[0.72rem] leading-tight font-semibold">{value}</span> : <LeafIcon size={22} weight="light" aria-hidden="true" />}
                      </span>
                      <p className="mt-3 text-[0.8rem] leading-[1.3] text-site-copy">{label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailCta({ href }) {
  return (
    <a
      className="group inline-flex min-h-14 w-full max-w-[22rem] items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-6 text-[0.7rem] font-semibold tracking-[0.08em] text-site-paper uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      Trendyol’da incele
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink">
        <ArrowUpRightIcon
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[160%] group-hover:-translate-y-[160%] motion-reduce:transition-none"
          size={18}
          weight="light"
          aria-hidden="true"
        />
        <ArrowUpRightIcon
          className="absolute -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden"
          size={18}
          weight="light"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

function HeroDetailNotes({ product }) {
  const notes = [
    ...getIngredientGroups(product.activeIngredients)
      .slice(0, 2)
      .map((item) => ({ label: "Aktif içerik", title: item.name, description: item.descriptions[0] || "" })),
    ...normalizeListItems(product.suitableFor)
      .slice(0, 2)
      .map((item) => ({ label: "Kimler için", title: item.title, description: "" })),
    ...normalizeListItems(product.benefits)
      .slice(0, 2)
      .map((item) => ({ label: "İyi olur", title: item.title, description: "" })),
  ].slice(0, 4);
  if (!notes.length) return null;
  return (
    <div className="grid gap-4 border-t border-site-ink/10 pt-2 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-5">
      {notes.map((note) => (
        <article className="border-b border-site-ink/10 pb-4" key={`${note.label}-${note.title}`}>
          <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-[#98938c] uppercase">{note.label}</p>
          <h2 className="mt-2 text-[clamp(0.92rem,1.02vw,1.02rem)] leading-[1.3] font-medium tracking-[-0.025em] text-site-ink">{note.title}</h2>
          {note.description ? <p className="mt-2 line-clamp-2 text-[0.84rem] leading-[1.5] font-normal text-[#6f7470]">{note.description}</p> : null}
        </article>
      ))}
    </div>
  );
}

function IntroArrow() {
  return (
    <svg
      className="pointer-events-none absolute top-[clamp(0rem,6vh,2rem)] right-[-2%] z-10 hidden h-auto w-[clamp(15rem,26vw,30rem)] text-site-ink lg:block xl:right-[-4%]"
      width="340"
      height="81"
      viewBox="0 0 340 81"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      data-page-hero-arrow
    >
      <path
        d="M339.216 79.8976C339.492 79.8733 339.695 79.6306 339.67 79.3555L339.274 74.873C339.25 74.5979 339.007 74.3947 338.732 74.419C338.457 74.4433 338.254 74.686 338.278 74.9611L338.63 78.9456L334.646 79.2979C334.371 79.3223 334.168 79.565 334.192 79.84C334.216 80.1151 334.459 80.3184 334.734 80.2941L339.216 79.8976ZM1.20783 31.418C72.0569 -5.46989 212.351 -26.1603 338.851 79.7829L339.493 79.0162C212.623 -27.2366 71.8787 -6.50452 0.74602 30.5311L1.20783 31.418Z"
        fill="currentColor"
      />
    </svg>
  );
}
