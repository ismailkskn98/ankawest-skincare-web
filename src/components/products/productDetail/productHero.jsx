import { LeafIcon } from "@phosphor-icons/react/dist/ssr/Leaf";
import Link from "next/link";

import { ProductMediaGallery } from "@/components/products/mediaGallery";

import { getIngredientGroups, normalizeListItems } from "./helpers";
import { ProductCta } from "./productCta";

export function ProductHero({ product, detailMedia, detailUrl, productFacts, productTitle }) {
  const compactTitle = productTitle.length > 72;

  return (
    <section className="fluid relative bg-[#ededeb]" aria-labelledby="product-title">
      <div className="grid min-w-0 bg-white pt-[calc(74px+clamp(1rem,3vh,2rem))] xl:min-h-[clamp(44rem,100svh,62rem)] xl:items-stretch xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] nav:pt-[calc(78px+clamp(1.25rem,4vh,2.75rem))] page-hero-compact:xl:pt-[calc(78px+clamp(1rem,2.5vh,1.5rem))]">
        <div className="relative isolate z-3 flex min-h-[clamp(20rem,105vw,28rem)] min-w-0 flex-col bg-white pb-[clamp(1rem,4vw,2rem)] sm:min-h-[clamp(24rem,72vw,32rem)] md:min-h-[clamp(25rem,58svh,34rem)] xl:min-h-0 xl:pb-[clamp(1.25rem,3vw,3rem)] page-hero-compact:xl:pb-[clamp(1rem,2.5vh,1.5rem)]">
          <IntroArrow />
          <Link
            className="relative z-2 ml-[clamp(1rem,4vw,4.5rem)] inline-flex min-h-10 w-fit items-center text-[clamp(0.64rem,0.8vw,0.7rem)] font-semibold tracking-[0.1em] text-site-copy uppercase transition-opacity duration-300 hover:opacity-70"
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
        <div className="relative z-2 flex min-w-0 flex-col overflow-hidden bg-[#dbe5e9] p-[clamp(1.25rem,5vw,2rem)] sm:p-[clamp(1.75rem,4vw,3rem)] xl:min-h-full xl:-mb-[clamp(1.25rem,3vw,3.25rem)] xl:p-[clamp(2rem,3.6vw,5rem)] page-hero-compact:xl:p-[clamp(1.5rem,2.5vw,2.25rem)]">
          <div
            className="flex min-w-0 flex-1 flex-col justify-between gap-[clamp(1.75rem,4vh,2.75rem)] page-hero-compact:xl:gap-[clamp(1.25rem,2.5vh,1.75rem)]"
            data-page-hero-reveal
            style={{ "--intro-order": 1 }}
          >
            <div className="flex min-w-0 flex-col gap-[clamp(1rem,2.4vh,1.75rem)] page-hero-compact:xl:gap-[clamp(0.8rem,1.8vh,1.15rem)]">
              {product.categoryName || product.brand ? (
                <div className="flex flex-wrap items-center gap-3">
                  {product.categoryName ? (
                    <span className="inline-flex w-fit rounded-full border border-[#454545]/55 px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.42rem,1vh,0.55rem)] text-[clamp(0.61rem,0.72vw,0.67rem)] font-normal tracking-[0.08em] text-[#333333] uppercase">
                      {product.categoryName}
                    </span>
                  ) : null}
                  {product.brand ? <span className="text-[clamp(0.61rem,0.72vw,0.67rem)] font-semibold tracking-[0.12em] text-site-copy uppercase">{product.brand}</span> : null}
                </div>
              ) : null}
              <h1
                id="product-title"
                className={`${compactTitle ? "max-w-[24ch] text-[clamp(1.85rem,7.5vw,3.65rem)] sm:text-[clamp(2.1rem,5vw,3.2rem)] xl:text-[clamp(2rem,3.25vw,3.65rem)]" : "max-w-[16ch] text-[clamp(2.15rem,9vw,5rem)] sm:text-[clamp(2.45rem,6.5vw,4.25rem)] xl:text-[clamp(2.45rem,4.7vw,5rem)]"} [overflow-wrap:anywhere] leading-[1.03] font-semibold tracking-[-0.055em] text-[#3b3b3b]`}
              >
                {productTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                {product.sizeLabel ? (
                  <span className="rounded-full bg-site-ink px-[clamp(0.85rem,1.5vw,1rem)] py-[clamp(0.4rem,0.9vh,0.5rem)] text-[clamp(0.66rem,0.8vw,0.73rem)] font-semibold tracking-[0.08em] text-site-paper uppercase">
                    {product.sizeLabel}
                  </span>
                ) : null}
                {product.priceLabel ? <span className="text-[clamp(1.1rem,1.7vw,1.5rem)] font-normal tracking-[-0.02em] text-[#3f3f3f]">{product.priceLabel}</span> : null}
              </div>
              {product.shortDescription || product.description ? (
                <p className="max-w-[54ch] [overflow-wrap:anywhere] text-[clamp(0.9rem,3.8vw,1rem)] leading-[1.58] font-normal text-[#69716d] sm:text-[clamp(0.95rem,2vw,1.08rem)]">
                  {product.shortDescription || product.description}
                </p>
              ) : null}
              <HeroDetailNotes product={product} />
            </div>
            <div className="flex min-w-0 flex-col gap-[clamp(1.25rem,3.5vh,2.25rem)] page-hero-compact:xl:gap-[clamp(1rem,2vh,1.4rem)]">
              {detailUrl ? <ProductCta href={detailUrl} className="hidden md:inline-flex" /> : null}
              {productFacts.length ? (
                <div className="grid grid-cols-2 gap-x-[clamp(0.75rem,2vw,1.5rem)] gap-y-[clamp(1rem,2.5vh,1.5rem)] text-center sm:grid-cols-4">
                  {productFacts.map(({ value, label }) => (
                    <div key={label}>
                      <span className="mx-auto grid size-[clamp(3.25rem,4.5vw,3.75rem)] place-items-center rounded-full border border-white/20 bg-[#ebebe9] px-2 text-site-ink shadow-sm">
                        {value ? (
                          <span className="max-w-full [overflow-wrap:anywhere] text-[clamp(0.62rem,2.6vw,0.72rem)] leading-tight font-semibold">{value}</span>
                        ) : (
                          <LeafIcon size={22} weight="light" aria-hidden="true" />
                        )}
                      </span>
                      <p className="mt-[clamp(0.55rem,1.5vh,0.75rem)] text-[clamp(0.72rem,0.85vw,0.8rem)] leading-[1.3] text-site-copy">{label}</p>
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
    <div className="grid min-w-0 gap-[clamp(0.8rem,2vh,1.25rem)] border-t border-site-ink/10 pt-[clamp(0.5rem,1.5vh,0.8rem)] sm:grid-cols-2 sm:gap-x-[clamp(1.25rem,2.2vw,1.75rem)]">
      {notes.map((note) => (
        <article className="min-w-0 border-b border-site-ink/10 pb-[clamp(0.75rem,2vh,1rem)]" key={`${note.label}-${note.title}`}>
          <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-[#98938c] uppercase">{note.label}</p>
          <h2 className="mt-[clamp(0.35rem,1vh,0.5rem)] [overflow-wrap:anywhere] text-[clamp(0.88rem,1vw,1.02rem)] leading-[1.3] font-medium tracking-[-0.025em] text-site-ink">{note.title}</h2>
          {note.description ? (
            <p className="mt-[clamp(0.35rem,1vh,0.5rem)] line-clamp-2 [overflow-wrap:anywhere] text-[clamp(0.78rem,0.85vw,0.84rem)] leading-[1.5] font-normal text-[#6f7470]">{note.description}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function IntroArrow() {
  return (
    <svg
      className="pointer-events-none absolute top-[clamp(0rem,6vh,2rem)] right-[-4%] z-10 hidden h-auto w-[clamp(15rem,26vw,30rem)] text-site-ink xl:block"
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
